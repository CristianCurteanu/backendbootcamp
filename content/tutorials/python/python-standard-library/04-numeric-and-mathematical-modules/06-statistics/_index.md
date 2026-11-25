---
title: 'Mathematical statistics functions'
description: 'Calculate mean, median, mode, standard deviation and percentiles of data with the statistics module.'
linkTitle: 'Mathematical statistics functions'
weight: 6
---

{{< part "concept" "Why statistics" >}}

Backend teams measure response times, order sizes and error counts. The **statistics** module gives you the basic numbers to describe data. A single **mean** can hide problems, so look at median and percentiles too.

{{< part "code" "Summarize a list of numbers" >}}

```python {output=auto}
import statistics as st

latency_ms = [120, 95, 110, 105, 2300, 98, 102]

print("mean  ", round(st.mean(latency_ms), 1))
print("median", st.median(latency_ms))
print("mode  ", st.mode([1, 2, 2, 3]))
print("stdev ", round(st.stdev(latency_ms), 1))
print("p90   ", st.quantiles(latency_ms, n=10)[-1])
```

```text {filename="Output"}
mean   418.6
median 105
mode   2
stdev  829.7
p90    2736.0
```

- **mean** is the average. One very large value moves it a lot.
- **median** is the middle value. It ignores extreme values.
- `quantiles(data, n=10)` returns cut points. The last one is about the 90th percentile.

{{< part "ops" "Pitfalls and checks" >}}

- In the example, one slow request (2300 ms) makes the mean much larger than the median. Report the median and a high percentile (p95, p99).
- `stdev` is for a **sample**. Use `pstdev` for a full population.
- An empty list raises `StatisticsError`. Check `if data:` first.
- For millions of values, NumPy is faster.

```python {expect=error}
import statistics

statistics.mean([])
```

```text {filename="Output"}
statistics.StatisticsError: mean requires at least one data point
```

{{< part "impact" "What you can do now" >}}

- Describe response times with median and percentiles.
- See when one outlier hides the real picture.
- Choose `stdev` or `pstdev` correctly.

{{< quiz id="st1" q="Which value is least changed by one extreme outlier?" options="mean|median|sum" answer="2" explain="The median depends on the middle, not on extreme values." >}}
