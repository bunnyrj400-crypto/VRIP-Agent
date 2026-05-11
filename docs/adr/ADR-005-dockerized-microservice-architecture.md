# ADR-005: Dockerized Microservice Architecture

## Status
Accepted

## Context
The platform consists of multiple heterogeneous components (FastAPI, LangGraph, MCP Servers, Airflow, Postgres, Qdrant, Redis). Managing these dependencies and service-to-service communication on a host machine is complex and error-prone.

## Decision
We will adopt a "Docker-first" architecture where every service is containerized and orchestrated using Docker Compose.

## Rationale
- **Environment Consistency**: Ensures the platform runs identically in development and production.
- **Dependency Isolation**: Prevents conflicts between service-specific dependencies (e.g., Airflow vs. LangGraph).
- **Service Discovery**: Leverages the Docker internal network for reliable service-to-service communication using service names as hostnames.
- **Resource Control**: Allows for defining resource limits (CPU/Memory) per service.
- **Ease of Deployment**: The entire OS can be started with a single command: `docker-compose up`.

## Consequences
- Requires `docker` and `docker-compose` on the developer's machine.
- Local volume mounting is necessary for persistent data (Postgres, Qdrant) and log visibility.
- Network complexity increases; services must communicate via the Docker bridge network.
