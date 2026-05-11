# Vendor Risk Intelligence Platform (VRIP) - AI Agent OS

VRIP is a production-grade, enterprise-style AI Agent Operating System designed to autonomously ingest, process, and evaluate vendor operational, compliance, and financial risks.

## 🚀 Overview

The system utilizes a distributed microservice architecture, orchestrated by **LangGraph** and abstracted by the **Model Context Protocol (MCP)**. It leverages **Groq** for high-performance LLM inference.

## 📂 Repository Structure

- [**`services/`**](services/README.md): Microservice implementations (API Gateway, Agent Service, MCP Servers).
- [**`shared/`**](shared/README.md): Core domain models, configuration management, and shared utilities.
- [**`docs/`**](docs/README.md): Epistemic foundation, ontology, entropy models, and Architecture Decision Records (ADRs).
- [**`airflow/`**](airflow/README.md): ETL pipelines and data orchestration DAGs.
- [**`data/`**](data/README.md): Local Data Lake (Raw, Processed, Curated zones).
- [**`scripts/`**](scripts/README.md): Deployment and maintenance scripts.

## 🛠 Tech Stack

- **Reasoning**: Groq (Llama 3.1 / Mixtral)
- **Orchestration**: LangGraph
- **Infrastructure Abstraction**: Model Context Protocol (MCP)
- **Persistence**: PostgreSQL, Qdrant (Vector DB), Redis (Cache/Queue)
- **Deployment**: Docker Compose
- **Data Engineering**: Apache Airflow

## ⚡ Quick Start

1.  **Configure Environment**:
    ```bash
    cp .env.example .env
    # Add your GROQ_API_KEY
    ```

2.  **Launch Platform**:
    ```bash
    docker-compose up -d
    ```

## 📖 Documentation

Detailed architectural documentation can be found in the [`docs/`](docs/) directory:
- [Epistemology](docs/epistemology.md)
- [System Ontology](docs/ontology.md)
- [Entropy Model](docs/entropy_model.md)
- [Cognitive Architecture](docs/cognitive_architecture.md)
