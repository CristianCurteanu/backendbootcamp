---
title: 'Data Engineering Tools'
description: 'Free browser-based data engineering tools. SQL formatter, JSON to SQL schema, dbt model generator, cron expression builder, Kafka validator, and more.'
weight: 5
---

Tools that fit into the daily data engineering workflow — SQL, dbt, Kafka, and cron.

{{< cards >}}
  {{< card link="sql-formatter" title="SQL Formatter & Beautifier" subtitle="Format SQL across dialects: PostgreSQL, BigQuery, Snowflake, DuckDB" >}}
  {{< card link="json-to-sql-schema" title="JSON to SQL Schema Generator" subtitle="Paste JSON → generate CREATE TABLE statement for target DB" >}}
  {{< card link="dbt-model-generator" title="dbt Model Generator" subtitle="Paste a SQL SELECT → generate dbt model file with sources.yml" >}}
  {{< card link="cron-expression-builder" title="Cron Expression Builder & Explainer" subtitle="Build cron expressions with human-readable preview + next 5 runs" >}}
  {{< card link="kafka-topic-validator" title="Kafka Topic Naming Validator" subtitle="Validate topic naming against conventions, generate compliant names" >}}
  {{< card link="data-volume-estimator" title="Data Volume Estimator" subtitle="Estimate storage/cost for rows × schema × retention in Snowflake/BQ" >}}
  {{< card link="iceberg-table-inspector" title="Apache Iceberg Table Inspector" subtitle="Paste Iceberg metadata JSON → visualize partitions and snapshots" >}}
{{< /cards >}}
