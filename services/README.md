# Microservices

This directory contains the implementations of the distributed VRIP microservices.

## Services (Phase 3+)

- **`api-gateway/`**: FastAPI implementation for external access.
- **`agent-service/`**: LangGraph-based multi-agent orchestration.
- **`mcp-gateway/`**: The security and abstraction boundary between agents and infrastructure.
- **`mcp-postgres/`**: Specialized MCP server for SQL interactions.
- **`mcp-qdrant/`**: Specialized MCP server for vector retrieval.
- **`mcp-web/`**: Specialized MCP server for web intelligence gathering.
- **`mcp-files/`**: Specialized MCP server for document processing.
- **`mcp-risk-engine/`**: Specialized MCP server for deterministic risk calculations.
