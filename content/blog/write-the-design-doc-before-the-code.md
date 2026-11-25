---
title: Write the design doc before the code
description: A one-page doc finds the expensive mistakes while they still cost an afternoon.
date: 2026-10-21
lastmod: 2026-10-21
categories: [Mindsets]
tags: [design-docs, ownership, process]
banner:
  - text: "1 page"
  - text: "5 questions"
    dark: true
faq:
  - q: How long should a design doc be?
    a: One page is enough for most changes. If you cannot explain the problem and the chosen approach in a page, the problem is probably not understood yet.
---

Most expensive backend mistakes are decided in the first hour and discovered in the third month. A short design doc moves the discovery to the first afternoon.

## Why a doc beats a meeting

Writing forces you to pick words for things you were only picturing. A missing edge case shows up as a sentence you cannot finish. A reviewer can read the doc alone, at their own pace, and comment on the exact line.

## The one-page template

Answer five questions, in this order:

1. **What problem are we solving, and for whom?** One paragraph. Include the number that tells you it is a problem.
2. **What are we not solving?** Non-goals prevent half of the scope arguments.
3. **What is the proposed approach?** A diagram or a few paragraphs.
4. **What did we reject, and why?** The reasoning is the part future readers need most.
5. **How will we know it worked?** A metric and a threshold, such as p95 latency under 200 ms.

## Keep it honest

- Put the risks in the doc, not in your head.
- Date it and name an owner, so people know who to ask.
- When the plan changes, edit the doc. A stale doc is worse than none.

## What it costs

About an hour of writing and a day of review. Compare that with rebuilding a service because nobody asked how it would be rolled back.
