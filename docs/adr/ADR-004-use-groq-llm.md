# ADR-004: Use Groq for High-Performance Inference

## Status
Accepted

## Context
The platform requires low-latency, high-throughput LLM inference for multi-agent orchestration and reasoning. The user's local system does not have sufficient resources to host large LLMs via Ollama.

## Decision
We will use Groq as the primary LLM inference provider.

## Rationale
- **Performance**: Groq provides extremely fast inference speeds (LPU technology), which is critical for complex multi-agent workflows where multiple LLM calls are chained.
- **Model Support**: Supports state-of-the-art models like `llama-3.1-70b-versatile` and `mixtral-8x7b-32768`.
- **API Reliability**: Provides a production-grade API with predictable performance.
- **Cost-Efficiency**: Competitive pricing compared to other cloud LLM providers.

## Consequences
- Requires a `GROQ_API_KEY` in the environment configuration.
- Dependency on an external cloud provider for reasoning.
- Need to implement rate limiting and retry handling for API calls.
