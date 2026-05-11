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
