---
week: Week 01
task: 1.3 Tail Workers
status: in_progress
mode: 🔴 UNASSISTED
tags: [cloudflare, performance]
date: 2026-07-24
---
# 1.3 Tail Workers

> Understanding and implementing tail workers

## Key Learnings

* Available to paid plan & enterprise customers.
* Billed by `CPU Time` rather than *request count*.
* Tail workers can have nested tail workers (increase cost)
* Tail workers can have access to bindings (e.g. KV, D1, R2, etc.)
* Tail workers cannot access the bindings of producer's bindings.

#### Billing

Tail Workers are billed as **regular Workers** under the Standard pricing model. Specifically by  **CPU time** , not by request count:

| Dimension          | Included         | Overage               |
| ------------------ | ---------------- | --------------------- |
| **Requests** | 10M/month        | +$0.30/million        |
| **CPU time** | 30M CPU-ms/month | +$0.02/million CPU-ms |
| **Duration** | No charge        | —                    |

#### Basic usage

```TypeScript
export default {
  async tail(events, env) {
    for (const event of events) {
      for (const event of events) {
      switch (event.outcome) {
        case "exceededCpu":
          await env.KV.put(`exceededCpu:${new Date().toISOString()}`, JSON.stringify(event), {
            expirationTtl: 259200 /* 3 days */,
          });
          break;
      // ....
     }
    }
   }
  },
};
```

There are infinite number of ways to store, query, and view your logs with the primitives `tail()` provides.

## Verdict

* Tail worker is a really powerful and simple way to collect and store logs without your own way of handling them.
* You can store your logs in a custom database, file, or any third party telemetry software.
