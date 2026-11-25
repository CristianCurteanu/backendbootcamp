---
title: 'Basic date and time types'
description: 'Work with dates, times, time zones and durations using datetime. Parse, format, compare and store time safely in UTC.'
linkTitle: 'Basic date and time types'
weight: 1
---

{{< part "concept" "Why time is hard" >}}

Time bugs are common in backend systems: a server in one country, a user in another, and a clock change twice a year. The **datetime** module gives you types for dates, times and durations.

The most important rule: **store time in UTC**, and convert to the user's time zone only when you show it.

{{< part "code" "Create, format and calculate" >}}

```python {output=auto}
from datetime import datetime, timedelta, timezone

created = datetime(2026, 11, 25, 14, 30, tzinfo=timezone.utc)
expires = created + timedelta(days=7, hours=2)

print(created.isoformat())
print(expires - created)
print(created.strftime("%d %b %Y, %H:%M"))
print(datetime.fromisoformat("2026-12-01T09:00:00+00:00") > created)
```

```text {filename="Output"}
2026-11-25T14:30:00+00:00
7 days, 2:00:00
25 Nov 2026, 14:30
True
```

```python {output=auto}
from datetime import datetime
from zoneinfo import ZoneInfo

utc_time = datetime(2026, 7, 1, 12, 0, tzinfo=ZoneInfo("UTC"))
print(utc_time.astimezone(ZoneInfo("Europe/Chisinau")))
print(utc_time.astimezone(ZoneInfo("America/New_York")))
```

```text {filename="Output"}
2026-07-01 15:00:00+03:00
2026-07-01 08:00:00-04:00
```

- A **timedelta** is a length of time. Subtract two datetimes to get one.
- `isoformat()` and `fromisoformat()` are the best way to save and read time as text.
- `zoneinfo.ZoneInfo` knows daylight saving rules. Use `astimezone()` to convert.

{{< part "ops" "Pitfalls and checks" >}}

- A **naive** datetime has no time zone. An **aware** datetime has one. You cannot compare them: Python raises `TypeError`.
- Use `datetime.now(timezone.utc)`. Avoid `datetime.utcnow()`, which is deprecated and returns a naive value.
- Never add `timedelta(days=1)` to a local time and expect "same hour tomorrow" across a clock change. Convert to UTC, add, and convert back.

```python {expect=error}
from datetime import datetime, timezone

naive = datetime(2026, 1, 1)
aware = datetime(2026, 1, 1, tzinfo=timezone.utc)
print(naive < aware)
```

```text {filename="Output"}
TypeError: can't compare offset-naive and offset-aware datetimes
```

{{< part "impact" "What you can do now" >}}

- Save timestamps as UTC ISO text and read them back.
- Show the same moment in any user's time zone.
- Calculate expiry times with `timedelta`.

{{< quiz id="dt1" q="What is the safest way to store a time in a database?" options="Local time as text|UTC with a time zone|Only the hour and minute" answer="2" explain="Store UTC. Convert to local time only for display." >}}
