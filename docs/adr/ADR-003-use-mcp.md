# ADR-003: Use Model Context Protocol (MCP) for Infrastructure Abstraction

## Status
Accepted

## Context
Agents need to interact with various infrastructure components (Postgres, Qdrant, Web, Files). Direct coupling creates security risks and makes the system fragile.

## Decision
We will implement the Model Context Protocol (MCP) as a middleware layer between agents and infrastructure.

## Rationale
- **Decoupling**: Agents interact with standardized tools rather than specific database clients.
- **Security**: The MCP layer acts as a security boundary, enforcing permissions and sanitizing inputs.
- **Auditability**: All infrastructure interactions are logged at the MCP gateway level.
- **Portability**: Different infrastructure can be swapped behind the MCP server without changing agent logic.

## Consequences
- Added latency due to the extra hop.
- Increased complexity in the initial setup.
