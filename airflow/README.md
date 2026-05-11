# Data Orchestration (Airflow)

This directory contains Apache Airflow DAGs for orchestrating the platform's ETL and continuous intelligence pipelines.

## Pipelines

- **Ingestion DAGs**: Scheduled retrieval of news, RSS, and incident feeds.
- **Embedding DAGs**: Processing new documents through embedding models for Qdrant.
- **Risk Analysis DAGs**: Periodic re-calculation of vendor risk scores based on data freshness.
