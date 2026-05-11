# ADR-002: Use LangGraph for Multi-Agent Orchestration

## Status
Accepted

## Context
Simple linear agent chains are insufficient for complex risk reasoning that requires planning, critiquing, and iterative evaluation.

## Decision
We will use LangGraph as the orchestration framework.

## Rationale
- **Cyclic Graphs**: Supports loops (e.g., Risk Agent -> Critic -> Risk Agent) which are essential for quality control.
- **State Management**: Built-in persistence and state management for multi-step workflows.
- **Controllability**: Provides fine-grained control over execution flow compared to fully autonomous agents.
- **Traceability**: Easier to visualize and audit the reasoning path.

## Consequences
- Steeper learning curve compared to simple LangChain chains.
- Requires careful design of the graph state to avoid "state bloat".
