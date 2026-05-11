# System Ontology - Vendor Risk Intelligence Platform

Formal data structures and relationships governing the VRIP knowledge graph.

## 1. Core Entities

### Vendor
The root business entity.
- `id`: UUID
- `legal_name`: String
- `domain`: String
- `industry`: Enum (FinTech, SaaS, Manufacturing, etc.)
- `criticality`: Enum (Low, Medium, High, Mission-Critical)

### Incident
A discrete event impacting risk.
- `id`: UUID
- `vendor_id`: UUID
- `type`: Enum (Cyber, Financial, Operational, Compliance)
- `severity`: Scalar [0, 10]
- `detected_at`: Timestamp

### ComplianceDocument
Structured compliance artifacts.
- `id`: UUID
- `type`: Enum (SOC2, ISO27001, HIPAA, GDPR)
- `status`: Enum (Valid, Expired, Pending)
- `valid_until`: Date

### RiskScore
The computed risk metric.
- `vendor_id`: UUID
- `dimension`: Enum (Security, Financial, Operational, Compliance)
- `value`: Scalar [0, 100]
- `confidence`: Scalar [0, 1]
- `calculated_at`: Timestamp

### Evidence
The atomic unit of proof.
- `id`: UUID
- `source_url`: URL
- `source_reliability`: Scalar [0, 1]
- `extracted_text`: Text

## 2. Relationships

- `Vendor` **HAS** `VendorProfile` (1:1)
- `Vendor` **EXPERIENCES** `Incident` (1:N)
- `Vendor` **PROVIDES** `ComplianceDocument` (1:N)
- `Incident` **CONTRIBUTES_TO** `RiskScore` (N:1)
- `Evidence` **SUPPORTS** `Incident` / `ComplianceDocument` (N:M)
