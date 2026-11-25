---
title: 'General calendar-related functions'
description: 'Use the calendar module to print month tables, find weekdays, count days in a month and check leap years.'
linkTitle: 'General calendar-related functions'
weight: 2
---

{{< part "concept" "Why use calendar" >}}

Sometimes you need calendar facts, not clock time: how many days are in February, or on which weekday a month starts. **calendar** gives you these answers without manual math.

For exact moments in time, use `datetime`. Use `calendar` for month and year structure, billing days or schedules.

{{< part "code" "Month tables and day counts" >}}

```python {output=auto}
import calendar

print(calendar.month(2026, 11))
print("Leap year 2028:", calendar.isleap(2028))
first_weekday, days = calendar.monthrange(2026, 2)
print("February 2026 has", days, "days")
print("Starts on:", calendar.day_name[first_weekday])
```

```text {filename="Output"}
   November 2026
Mo Tu We Th Fr Sa Su
                   1
 2  3  4  5  6  7  8
 9 10 11 12 13 14 15
16 17 18 19 20 21 22
23 24 25 26 27 28 29
30

Leap year 2028: True
February 2026 has 28 days
Starts on: Sunday
```

- `calendar.month(year, month)` returns a text table. Weeks start on Monday by default.
- `monthrange` returns two values: the weekday of day 1 (Monday is `0`) and the number of days.
- `calendar.day_name` and `calendar.month_name` are lists of names.

```python {output=auto}
import calendar

last_day = calendar.monthrange(2026, 2)[1]
print("Invoice date:", f"2026-02-{last_day}")
print(calendar.weekday(2026, 11, 25), calendar.day_name[calendar.weekday(2026, 11, 25)])
```

```text {filename="Output"}
Invoice date: 2026-02-28
2 Wednesday
```

{{< part "ops" "Pitfalls and checks" >}}

- Weekday numbers start at **Monday = 0**, not Sunday.
- Change the first day with `calendar.setfirstweekday(calendar.SUNDAY)` if your users expect it. It changes the setting for the whole program.
- Month numbers are `1` to `12`. `monthrange(2026, 13)` raises an error.

| Symptom | Likely cause | First action |
|---|---|---|
| Wrong weekday | Assumed Sunday = 0 | Print `calendar.day_name[n]` |
| `IllegalMonthError` | Month outside 1-12 | Check your input |

{{< part "impact" "What you can do now" >}}

- Find the last day of any month.
- Check leap years.
- Print a month calendar in the terminal.

{{< quiz id="cal1" q="What number is Monday in the calendar module?" options="0|1|7" answer="1" explain="Weekdays start at 0 for Monday." >}}
