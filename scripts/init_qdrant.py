import os
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams
import logging

# Setup basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_qdrant():
    """
    💡 Small Real-World Example:
    Bootstrapping the memory of our AI OS. We create 'collections' 
    which are like tables but for semantic vectors.
    """
    host = os.getenv("QDRANT_HOST", "localhost")
    port = int(os.getenv("QDRANT_PORT", 6333))
    
    logger.info(f"Connecting to Qdrant at {host}:{port}...")
    client = QdrantClient(host=host, port=port)

    # 1. Vendor Documents Collection
    # Used for storing SOC2, ISO27001, and other compliance docs.
    if not client.collection_exists("vendor_documents"):
        logger.info("Creating collection: vendor_documents")
        client.create_collection(
            collection_name="vendor_documents",
            vectors_config=VectorParams(size=768, distance=Distance.COSINE), # Size for Nomic or LlamaEmbed
        )

    # 2. Incidents Collection
    # Used for storing historical news and breach reports.
    if not client.collection_exists("incidents"):
        logger.info("Creating collection: incidents")
        client.create_collection(
            collection_name="incidents",
            vectors_config=VectorParams(size=768, distance=Distance.COSINE),
        )

    logger.info("Qdrant initialization complete.")

if __name__ == "__main__":
    init_qdrant()
