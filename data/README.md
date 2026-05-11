# Local Data Lake

Structured storage for vendor intelligence artifacts.

## Zones

### 1. `raw/`
- Immutable storage for incoming raw data (CSVs, PDF downloads, JSON feeds).
- Data is stored exactly as received.

### 2. `processed/`
- Normalized and validated data.
- Text extracted from PDFs, cleaned CSVs, etc.

### 3. `curated/`
- Final, high-confidence entities ready for production reasoning.
- Linked evidence packets and finalized risk scores.

### 💡 Small Real-World Example

**Scenario**: Processing a "Security Breach" news report.

1.  **Raw**: `data/raw/news_2024_05_12.json` (Original API response from web search).
2.  **Processed**: `data/processed/breach_summary_v1.txt` (Cleaned text, removing ads and HTML).
3.  **Curated**: `data/curated/incident_ID_992.json` (Structured JSON linked to **Vendor_ID** and **Risk_Score**).
