# VRIP: Use Case Example

This document provides a concrete example of how the Vendor Risk Intelligence Platform (VRIP) operates, from input to final recommendation.

## 🌟 The Elevator Pitch
VRIP is an **Autonomous AI Operating System** that acts like a 24/7 Security & Financial Analyst. It doesn't just store data; it **reasons** over it to tell you if a vendor is safe to work with.

---

## 🏢 Scenario: Evaluating "CyberStream Inc."

Imagine your company wants to hire **CyberStream Inc.** for cloud hosting. However, there are rumors of a recent data breach and some financial instability.

### 1. The Input (What you do)
You enter the following into the VRIP Dashboard:
- **Vendor Name**: CyberStream Inc.
- **Domain**: cyberstream.io
- **Task**: "Perform a full risk assessment. Pay special attention to recent security incidents and their latest SOC2 compliance."

---

### 2. The Architecture Walkthrough (What happens inside)

| Layer | What Happens "Under the Hood" |
| :--- | :--- |
| **1. The Planner** | The **PlannerAgent** breaks the request into 3 tasks: <br>1. Search for data breaches in the last 6 months. <br>2. Retrieve the latest SOC2 report from the Data Lake. <br>3. Check quarterly financial signals. |
| **2. The Researchers** | The **ResearchAgent** uses **MCP-Web** to find a news article about a breach in July. It uses **MCP-Qdrant** to find a SOC2 report uploaded last year. |
| **3. The Evaluator** | The **RiskAgent** notices the SOC2 is 14 months old. Based on the **Entropy Model**, it marks this evidence as "Stale" (Low Confidence). It then compares the breach news with the vendor's public statement. |
| **4. The Critic** | The **CriticAgent** challenges the RiskAgent: *"You haven't confirmed if the July breach affected our region. Requesting a more specific web search."* |
| **5. The Strategist** | Once validated, the **RecommendationAgent** synthesizes the final report. |

---

### 3. The Output (The Business Value)

VRIP presents a high-fidelity report on your dashboard:

- **Risk Score**: 68/100 (Elevated)
- **Confidence**: 0.85 (High)
- **The "Why"**: 
    > "While CyberStream has strong encryption protocols, their SOC2 compliance has expired, and a confirmed breach in July 2024 leaked metadata for 500+ clients. Financial signals show a 15% dip in liquidity."
- **Actionable Advice**: 
    > **DO NOT** sign the contract yet. Request the 2025 SOC2 Audit and include an 'Indemnity Clause' for the July breach in the legal terms.

---

## 🛠 Why this is better than a spreadsheet?
1.  **No Hallucinations**: Every claim is linked to a specific piece of evidence (a URL or a Document ID).
2.  **Temporal Awareness**: It knows that a 2-year-old audit is less valuable than a 1-week-old news report.
3.  **Autonomous Scalability**: It can analyze 100 vendors simultaneously while your team focuses on the high-risk escalations.
