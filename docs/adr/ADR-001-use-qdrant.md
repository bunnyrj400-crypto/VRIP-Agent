# ADR-001: Use Qdrant as Vector Database

## Status
Accepted

## Context
The platform requires semantic retrieval capabilities to reason over unstructured compliance documents, news feeds, and incident reports.

## Decision
We will use Qdrant as the primary vector database.

## Rationale
- **Performance**: High-performance similarity search with support for large datasets.
- **Filtering**: Native support for complex payload filtering (e.g., filtering by `vendor_id` or `industry` before vector search).
- **Ease of Use**: Robust REST/gRPC API and Python client.
- **Local Runtime**: Easily containerized for local development and production-parity.

## Consequences
- Requires management of embedding models (Nomic/OpenAI).
- Need to implement consistency checks between Postgres and Qdrant.
