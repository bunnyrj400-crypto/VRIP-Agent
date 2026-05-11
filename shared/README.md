# Shared Core Library

This directory contains the foundational logic shared across all VRIP microservices.

## Components

### 1. `models/`
- [**`domain.py`**](models/domain.py): Pydantic models for core entities (Vendor, Incident, RiskScore, etc.) defined in the platform ontology.

### 2. `config.py`
- Centralized configuration management using `pydantic-settings`.
- Handles environment variable resolution and Docker-internal hostnames.

### 3. `logging_config.py`
- Structured JSON logging for production observability.
- Integrated with Python's standard logging module.

### 4. `Dockerfile.base`
- The base container image used by all Python microservices to ensure environment consistency.

## Installation

This library is designed to be installed as a package within each service container:
```bash
pip install -e /app/shared
```
