# Storage & Data Engineering (Phase 4)

This phase implements the platform's "Memory" using a hybrid storage strategy: PostgreSQL for transactional data and Qdrant for semantic data.

## Transactional Storage (PostgreSQL)

We use SQLAlchemy as our ORM to manage the structured vendor risk data.
- **`vendors`**: The master list of business entities.
- **`incidents`**: Discrete events (breaches, lawsuits) linked to vendors.
- **`risk_scores`**: Historical and current risk ratings across 4 dimensions.
- **`audit_logs`**: A tamper-evident record of all agent and user actions.

## Semantic Storage (Qdrant)

Qdrant stores unstructured evidence as high-dimensional vectors, enabling the **ResearchAgent** to find relevant proof.
- **Collection: `vendor_documents`**: Stores parsed PDFs and web content.
- **Collection: `incidents`**: Stores detailed incident narratives for similarity search.

## Orchestration (Airflow)

Airflow DAGs handle the background intelligence gathering:
1.  **`ingest_feeds_dag`**: Periodic scraping of cyber incident RSS feeds.
2.  **`process_docs_dag`**: OCR and embedding generation for new uploads.
3.  **`decay_risk_dag`**: Adjusting confidence scores based on data age.

### 💡 Small Real-World Example

**Scenario**: A user uploads a 50-page "2024 Cybersecurity Audit" for Vendor X.

1.  **Ingress**: The file is dropped into `data/raw/vendor_x/`.
2.  **Trigger**: Airflow detects the file and triggers the `process_docs_dag`.
3.  **Extraction**: The `mcp-files` server parses the PDF and extracts text.
4.  **Embedding**: Text chunks are turned into vectors.
5.  **Storage**: The vectors are saved to **Qdrant**, tagged with `vendor_id=X`.
6.  **Update**: A new entry is added to `audit_logs` in **Postgres**: *"New compliance evidence processed for Vendor X."*
