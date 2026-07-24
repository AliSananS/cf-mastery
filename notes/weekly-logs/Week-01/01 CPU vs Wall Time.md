---
week: Week 01
task: 1.1 CPU time vs wall time limits
status: finished
mode: 🔴 UNASSISTED
tags:
  - cloudflare
  - performance
date: 2026-07-23
---

# 1.1 CPU Time vs Wall Time Limits

> Understanding CPU time vs wall time execution limits in Cloudflare Workers.

## Key Learnings

* CPU time measures active V8 execution time (JS instructions, loops, parsing, crypto). Free tier limit is 10ms per request; Paid tier limit is 30ms (Standard) or up to 3000ms (Unbound).
* Wall time measures total elapsed clock time from request arrival to response completion. This includes waiting for async I/O subrequests like fetch, D1, KV, or R2.
* Workers yield the CPU core during I/O waits. You are not charged CPU time while waiting for external network or storage responses.
* CPU bottlenecks stem from heavy JSON parsing, synchronous crypto/hashing, and regex operations on large payloads.
* WebCrypto API runs native C++ bindings outside JS execution overhead, saving significant CPU time.

## Code & Practice Notes

```typescript
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const wallStart = performance.now();
    
    // CPU-intensive task
    const cpuStart = performance.now();
    let count = 0;
    for (let i = 0; i < 1_000_000; i++) {
      count += Math.sqrt(i);
    }
    const cpuDuration = performance.now() - cpuStart;

    // Async I/O task (adds to Wall time, not CPU time)
    const ioStart = performance.now();
    await fetch("https://httpbin.org/delay/1");
    const ioDuration = performance.now() - ioStart;

    return Response.json({
      cpu_time_ms: cpuDuration.toFixed(2),
      io_time_ms: ioDuration.toFixed(2),
      wall_time_ms: (performance.now() - wallStart).toFixed(2)
    });
  }
};
```

## Verdict

* Understood the distinction between CPU limit errors (Worker Exceeded CPU Limit) and Wall time timeouts.
* Next focus: Workers Observability, structured log formats, and Tail Workers.
