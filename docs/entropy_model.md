# Entropy & Information Model - VRIP

This document defines how the platform manages data freshness, uncertainty accumulation, and evidence conflict.

## 1. Information Freshness
Freshness ($F$) is a time-dependent decay function:
$F(t) = (1 - \alpha) e^{-\lambda (t - t_0)}$

Where:
- $t_0$: Time of observation.
- $\lambda$: Decay rate specific to the entity type (e.g., Cyber $\lambda$ > Compliance $\lambda$).
- $\alpha$: Initial noise floor of the source.

## 2. Evidence Entropy
The system measures the "disorder" of incoming information about a vendor.
$H(V) = -\sum P(x) \log P(x)$

- **Low Entropy**: Multiple Tier 1 sources agree on a risk state.
- **High Entropy**: Conflicting reports from Tier 3 and Tier 4 sources.

## 3. Conflict Reasoning
When `Evidence_A` contradicts `Evidence_B`:
1.  **Source Tier Check**: Tier 1 always overrides Tier 4.
2.  **Temporal Precedence**: If Tiers are equal, the most recent evidence is weighted higher.
3.  **Uncertainty Propagation**: The aggregate `RiskScore.confidence` is reduced proportional to the magnitude of the conflict.

## 4. Stale Data Handling
- **Soft Delete**: Data older than $3 \times$ its half-life is moved to a `historical` archive and excluded from active reasoning.
- **Auto-Refresh**: High-criticality vendors trigger an automated `ResearchAgent` task when key evidence passes its "stale" threshold.
