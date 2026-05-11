# VRIP Testing & Verification Guide

This guide provides step-by-step instructions for verifying the full functionality of the Vendor Risk Intelligence Platform (VRIP) OS.

## 🟢 Level 1: Infrastructure Verification
Ensure all 10+ services are running and communicating correctly.

1.  **Start the OS**:
    ```bash
    docker-compose up --build -d
    ```
2.  **Check Service Health**:
    *   **API Gateway**: `curl http://localhost:8080/health`
    *   **MCP Gateway**: `curl http://localhost:8000/health`
    *   **Agent Service**: `curl http://localhost:8001/health`

---

## 🟡 Level 2: The "Brain" Test (Agent Execution)
Trigger a full multi-agent analysis for a hypothetical vendor.

1.  **Trigger Analysis**:
    ```bash
    curl -X POST http://localhost:8080/analyze \
         -H "Content-Type: application/json" \
         -d '{"vendor_name": "CloudScale Solutions"}'
    ```
2.  **What to look for in logs**:
    *   `PlannerAgent`: Should log the creation of an investigation plan.
    *   `ResearchAgent`: Should log calls to the `mcp-web` tool.
    *   `RiskAgent`: Should show risk score calculations based on the Groq output.
    *   `CriticAgent`: Should show validation of the final reasoning.

---

## 🔴 Level 3: Data & Evidence Test
Verify that the system's "Memory" is working.

1.  **Check Audit Logs**:
    Query the **mcp-postgres** tool to see if the analysis was recorded:
    ```bash
    curl http://localhost:8001/audit-log/CloudScale
    ```
2.  **Verify Semantic Memory**:
    Check if **Qdrant** collections were initialized correctly by running the bootstrap script:
    ```bash
    docker-compose exec agent-service python scripts/init_qdrant.py
    ```

---

## 💡 Small Real-World Test Scenario

**The "New Vendor" Workflow**:
1.  **Step 1**: Drop a mock PDF (e.g., `audit.pdf`) into `data/raw/`.
2.  **Step 2**: Wait 1 minute for **Airflow** to detect and process it.
3.  **Step 3**: Run the `analyze` curl command above.
4.  **Expectation**: The Agent should say: *"Found local evidence in Qdrant (SOC2 Audit) and combined it with fresh web search results."*

---

## 🛠 Troubleshooting
- **Groq API Errors**: Check your `GROQ_API_KEY` in the `.env` file.
- **Connection Refused**: Ensure the Docker network is healthy (`docker network inspect aiagentsys_default`).
- **Wait Time**: The first build may take 3-5 minutes as it compiles the `vrip-shared-base` image.
