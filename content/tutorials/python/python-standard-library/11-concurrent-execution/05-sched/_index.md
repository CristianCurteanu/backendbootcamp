---
title: 'Event scheduler'
description: 'Schedule functions to run at a later time with sched. Use priorities and delays, and know when a job queue or cron is a better tool.'
linkTitle: 'Event scheduler'
weight: 5
---

{{< part "concept" "Why sched" >}}

**sched** is a small scheduler: "run this function in 2 seconds, and that one in 1 second". It runs events in time order, in your program. It is good for simple timers inside one process.

For real scheduled jobs (daily reports), use `cron`, a task queue, or a library such as APScheduler. `sched` forgets everything when the program stops.

{{< part "code" "Run events in order" >}}

```python {output=auto}
import sched
import time

scheduler = sched.scheduler(time.monotonic, time.sleep)
log: list[str] = []

scheduler.enter(0.10, 1, lambda: log.append("third"))
scheduler.enter(0.02, 1, lambda: log.append("first"))
scheduler.enter(0.05, 1, log.append, argument=("second",))

scheduler.run()
print(log)

event = scheduler.enter(1, 1, lambda: log.append("never"))
scheduler.cancel(event)
print(scheduler.empty())
```

```text {filename="Output"}
['first', 'second', 'third']
True
```

- `enter(delay, priority, action, argument=())` schedules after a delay. Lower priority numbers run first when times are equal.
- `run()` blocks until all events are done.
- `cancel(event)` removes an event.

{{< part "ops" "Pitfalls and checks" >}}

- `run()` **blocks** the current thread. Run it in a thread if the program must do other work.
- A slow action delays later events. Keep actions short.
- Use `time.monotonic` so a clock change does not move your timers.
- Nothing is saved. Events are lost on restart.

| Need | Better tool |
|---|---|
| Daily or weekly job | cron, systemd timer, cloud scheduler |
| Background jobs with retries | Celery, RQ, Arq |
| Async timers | `asyncio.sleep`, `loop.call_later` |

{{< part "impact" "What you can do now" >}}

- Run small delayed tasks in order.
- Cancel scheduled events.
- Pick a real job system when you need reliability.

{{< quiz id="sc1" q="What happens to scheduled events when the program stops?" options="They are saved|They are lost|They run on the next start" answer="2" explain="sched keeps events only in memory." >}}
