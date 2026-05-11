# Epistemic Architecture - Vendor Risk Intelligence Platform

This document defines the formal rules governing knowledge, belief, and uncertainty within the VRIP Operating System.

## 1. Definition of Knowledge
In VRIP, "Knowledge" is defined as a triplet: `(Claim, Evidence, Confidence)`.
*   **Claim**: A statement about a vendor (e.g., "Vendor X had a data breach").
*   **Evidence**: The underlying source(s) supporting the claim.
*   **Confidence**: A scalar value [0, 1] representing the system's certainty.

## 2. Evidence Hierarchy
Evidence is weighted based on its source type and age:

| Tier | Source Type | Initial Weight | Reliability Notes |
| :--- | :--- | :--- | :--- |
| **Tier 1** | Official Compliance Docs (SOC2, ISO) | 1.0 | High reliability, legally binding. |
| **Tier 2** | Audited Financial Statements | 0.9 | High reliability, point-in-time. |
| **Tier 3** | Government Regulatory Feeds | 0.8 | Authoritative, often delayed. |
| **Tier 4** | Major News Outlets | 0.6 | Fast, prone to sensationalism. |
| **Tier 5** | Social Media / Unverified Forums | 0.2 | High noise, early warning only. |

## 3. Confidence Computation
The system uses a Bayesian-inspired approach to update confidence as new evidence arrives.
`Confidence = (Base_Reliability * Information_Freshness) + Σ (Supporting_Evidence_Weights) - Σ (Conflicting_Evidence_Weights)`

*   **Freshness**: $f(t) = e^{-\lambda t}$, where $\lambda$ is the decay constant and $t$ is time since observation.

## 4. Hallucination Boundaries & Abstention
Agents must adhere to the following constraints:
*   **Zero-Shot Abstention**: If no evidence exists for a claim, return `UNKNOWN` (0.0).
*   **Source Mandatory**: Every claim must link to at least one UUID in the `Evidence` table.
*   **Uncertainty Thresholds**:
    *   `< 0.3`: Informational.
    *   `0.3 - 0.7`: Uncertain (requires manual review).
    *   `> 0.7`: Actionable.

## 5. Information Decay
*   **Cyber Incidents**: Half-life of 6 months.
*   **Compliance Status**: Invalidated after 1 year.
*   **Financial Health**: Quarterly updates expected.
