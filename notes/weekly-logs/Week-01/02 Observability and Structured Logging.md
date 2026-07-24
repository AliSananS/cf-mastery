---
week: Week 01
status: in_progress
mode: 🔴 UNASSISTED
tags:
  - cloudflare
  - performance
date: 2026-07-24
---
# Week 01: Observability and Structured Logging

> Understanding workers observability, traces, and analytics.

## Key Learnings
* Logs should always output structured JSON instead of raw strings in `console.log()`
* Logs & traces can get expensive if sampling rate is not properly configured through `[observability.logs.head_sampling_rate] = 0.1 # 1 by default`


## Logs

There are several types of logs in workers
#### 1. Workers Logs (Persistent Storage)
>Automatically collects, stores, filters, and analyzes logs written to your Cloudflare account. Queryable in the dashboard per-Worker.

**Limits**

| Constraint           | Value                                                                          |
| -------------------- | ------------------------------------------------------------------------------ |
| Max log retention    | **7 days** (Paid), **3 days** (Free)                                           |
| Max logs/account/day | **5 billion** (after exceeded, auto-drops to 1% sampling for remainder of day) |
| Max single log size  | **256 KB** (truncated if exceeded; `$cloudflare.truncated` set to `true`)      |

**Pricing**

| Plan     | Included    | Overage                          | Retention |
| -------- | ----------- | -------------------------------- | --------- |
| **Free** | 200,000/day | N/A                              | 3 days    |
| **Paid** | 20M/month   | **$0.60 per additional million** | 7 days    |

**Best practices**

```ts

// Wrong
console.log("user_id: " + 123)

// Correct
console.log({user_id: 123})

```

#### 2. Real-Time Logs (Live Debugging)
> Near real-time streaming of log events globally. For immediate feedback during development/deployments. **Not persisted.** (Free of course)

Real time logs access through either cli using `wrangler tail` or from the dashboard

**Use when**
- Deploying and version of the script that needs live monitoring in production
- Projects where logging is not necessary or risky

**Limits**
- **Non persistent**
- Sampling rate **drops** on **high traffic**
- Durable objects logs appear in the dashboard
- Websocket `console.log()` is **buffered** until `close()` event
- **Not available** on Cloudflare China Network.
- **Max 10** concurrent clients
#### 3. Tail Workers (Custom Log Pipeline)
>  A separate Worker with a `tail()` handler that receives execution telemetry from a "producer" Worker after it finishes. Use for custom filtering, transformation, forwarding to any HTTP endpoint, or writing to KV/databases.

> [!NOTE]
Cloudflare recommends **OTel export over Tail Workers**

**Availability:** Workers **Paid** and **Enterprise** only. Billed by **CPU time**, not request count.

**How it works:**

1. Create a Worker with a `tail()` handler.
2. Attach it to the producer via `tail_consumers` in the producer's wrangler config.

**Tail Worker code:**

```ts
export default {
  async tail(events) {
    fetch("https://example.com/endpoint" /* Custom server for saving log events */, { 
      method: "POST",
      body: JSON.stringify(events),
    });
  },
};
```


**Key details:**

- Captures events across the full request lifecycle including **Service Binding** and **Dynamic Dispatch** sub-requests.
- Can write to **Analytics Engine** for aggregated metrics (counts by endpoint, response times by customer, etc.).
- **CF now recommends OTel export over Tail Workers** for standard use cases (batched delivery vs per-invocation). Use Tail Workers only for custom logic not built into the platform.

#### 4. Workers Logpush (Bulk Export)
> Sends **Workers Trace Event Logs** to supported destinations (R2, S3, logging providers) via Cloudflare Logpush

**Availability:** At least Workers **Paid** plan as of July 2026
#### Truncation Rules

- `logs` + `exceptions` combined limit: **16,384 characters**.
- Counting order: exception names → exception messages → log messages.
- Once limit is hit, fields are replaced with `"<<<Logpush: *field* truncated>>>"` then subsequent entries are dropped completely.

**Creating a Logpush job (cURL example to R2):**

```bash
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logpush/jobs" \
  --header 'X-Auth-Key: <API_KEY>' \
  --header 'X-Auth-Email: <EMAIL>' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "workers-logpush",
    "output_options": {
      "field_names": ["Event", "EventTimestampMs", "Outcome", "Exceptions", "Logs", "ScriptName"]
    },
    "destination_conf": "r2://<BUCKET_PATH>/{DATE}?account-id=...",
    "dataset": "workers_trace_events",
    "enabled": true
  }'
```


## Traces

> End-to-end visibility into request lifecycle across Workers and connected services. Answers: what caused a long-running request? How long do subrequests/KV/R2/DO calls take?

**Automatic instrumentation**
- **Fetch calls** — outbound HTTP requests with timing, status codes, metadata
- **Binding calls** — KV reads/writes, R2 operations, Durable Object invocations
- **Handler calls** — full lifecycle: fetch, scheduled, queue handlers

Unlike Logs, traces are not enabled by default. 
**Enabling traces**
```toml
[observability.traces]
enabled = true
head_sampling_rate = 0.1  # optional, default = 1 (100%)
```

**OTel-compliant**; Export to Honeycomb, Grafana Cloud, Axiom, Sentry, etc.

**Pricing**

|Plan|Included|Overage|Retention|
|---|---|---|---|
|**Free**|200,000/day|N/A|3 days|
|**Paid**|10M events/month|$0.60/million|7 days|

## Metrics & Analytics

Two data sources: **Worker-level metrics** and **Zone-level analytics**.

**Available charts:**
- **Requests**
- **Subrequests**
- **Wall Time/execution**
- **CPU Time/execution**
- **Execution Duration (GB-s)**
- **Memory Usage**
- **Request Duration**

**Retention:** Up to 3 months

### Invocation Statuses

|Status|Meaning|Error Code|
|---|---|---|
|**Success**|Executed successfully|—|
|**Client disconnected**|Browser disconnected before completion|—|
|**Worker threw exception**|Unhandled JS exception|1101|
|**Exceeded resources**|Runtime limits hit (CPU, startup, free tier)|1102, 1027|
|**Internal error**|CF runtime failure (not your code; not billed)|—|
### GraphQL API

Worker metrics are powered by GraphQL. Queryable via the Analytics GraphQL API.


## Query Builder
> Structured query interface in the dashboard for investigating Workers Logs data. Available to all developers, no enablement needed (requires Workers Logs enabled).

**Configuration for full query support:**

```toml
[observability.logs]
invocation_logs = true
```

You can query logs from the dashboard with a very simple and clean syntax similar to SQL.


**Some useful filters**:

| Data Type | Operators                                                                 |
| --------- | ------------------------------------------------------------------------- |
| Numeric   | `=`, `!=`, `>`, `>=`, `<`, `<=`, exists, not exists                       |
| String    | `=`, `!=`, includes, not includes, regex, exists, not exists, starts with |

This allows filtering invocations with high amount of CPU or Wall time filtration.

## Export Open Telemetry (OTel) Data
> Export OTel-compliant **traces and logs** to any OTLP endpoint. Integrates with existing monitoring stacks. **Metrics export not yet supported.**

Uses OTLP protocol over HTTP using JSON payloads.

Supports OTel platforms like **Honeycomb**, **Grafana Cloud**, **Axiom**, etc.

### Setup

1. Create a destination in the dashboard (name, type, OTLP endpoint, auth headers).
2. Reference it in wrangler config:

```toml
[observability.traces]
enabled = true
destinations = ["tracing-destination-name"]
persist = false  # optional: skip dashboard storage

[observability.logs]
enabled = true
destinations = ["logs-destination-name"]
persist = false
```

**`persist` flag (default: `true`):**
- `true` = data goes to destination AND stored in CF dashboard (billed separately).
- `false` = data goes to destination only (no dashboard storage, no dashboard billing).
#### Pricing (July 2026)

| Plan     | Included                                            | Overage                          |
| -------- | --------------------------------------------------- | -------------------------------- |
| **Free** | Not available                                       | —                                |
| **Paid** | 10M events/month (traces) + 10M events/month (logs) | **$0.05 per million additional** |

**Note:** OTel overage rate ($0.05/M) is different from Workers Logs dashboard overage ($0.60/M).

## Decision Matrix: Which Logging Mechanism to Use

| Need                                         | Solution                                               |
| -------------------------------------------- | ------------------------------------------------------ |
| Quick debugging during deploy                | **Real-time logs** (`wrangler tail` or dashboard Live) |
| Persistent searchable logs in CF dashboard   | **Workers Logs**                                       |
| Export to 3rd-party (standard)               | **OTel Export** (batched, zero code)                   |
| Export to 3rd-party (custom logic/transform) | **Tail Workers** (per-invocation, full control)        |
| Bulk archival to R2/S3                       | **Logpush**                                            |
| Aggregated custom metrics                    | **Analytics Engine** (via Tail Worker or direct)       |
| End-to-end request tracing                   | **Traces** (auto-instrumented)                         |
| Ad-hoc log investigation                     | **Query Builder**                                      |

## Code & Practice Notes

No practices were performed during this session but I was able to profile some latency problems by tracing auto instrumented data from the dashboard.

This helped me identify which requests were being served from cache and which ones were from origin.

It also helped me optimized individual endpoints to reduce latency.

```json
// wrangler.jsonc

// Enabled traces in one of my projects with sufficient sampling rate
"observability": {
    "enabled": true,
    "head_sampling_rate": 0.25,
    "traces": {
      "enabled": true,
      "head_sampling_rate": 0.1,
    },
  }
```

**Problem I found with my frontend app:**
> The cached pages were served from KV cache but cache revalidation data was stored in D1 which takes slightly more time to query compared to KV 

#### Before

![[Toolsweb walltime before KV tag cache.png]]

> **Notice here** the script spends most of the checking page validation data from **D1 database.**

#### After

![[Toolsweb after using kv.png]]

> **Win:** Validation lookup is almost identical cache lookup and **~75%** faster than **D1** 

#### Performance Increase

|Operation|Before|After|Improvement|
|---|--:|--:|--:|
|Main database read|182 ms (D1)|36 ms (KV)|**80.2% faster**|
|Main database read|182 ms (D1)|48 ms (KV)|**73.6% faster**
#### Biggest wins

- **Homepage:** **77.4%** faster (124 → 28 ms)
- **Calculators page:** up to **84.6%** faster (201 → 31 ms)
- **Primary data fetch:** **73–80%** faster by replacing a ~182 ms D1 query with KV reads.

---


> [!NOTE]
> **Yes**, KV is eventually consistent and cause problems when using multiple tags for one page. Since this website was fully SSG, meaning it was using 1 tag per page, KV tag cache was safe to use. 

To be safe I left a `TODO` for changing it back to `d1NextTagCache` when using cache components in Next.js or using `"use cache"`

## Verdict
Observability options for Cloudflare Workers is seriously powerful and extremely helpful to squeeze every bit of information about Worker performance or script's lifecycle. 