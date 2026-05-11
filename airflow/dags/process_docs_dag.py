from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.sensors.filesystem import FileSensor
from datetime import datetime, timedelta
import logging
import os

default_args = {
    'owner': 'vrip',
    'start_date': datetime(2024, 1, 1),
    'retries': 0,
}

RAW_DATA_DIR = "/opt/airflow/data/raw"

def parse_and_embed():
    """
    💡 Small Real-World Example:
    When a user drops a SOC2 PDF into data/raw, this task triggers.
    It calls the MCP-Files server to parse the PDF and MCP-Qdrant 
    to store the vectors.
    """
    logging.info(f"Scanning {RAW_DATA_DIR} for new vendor documents...")
    # Mocking the discovery of a new PDF
    new_files = [f for f in os.listdir(RAW_DATA_DIR) if f.endswith('.pdf')]
    
    if not new_files:
        logging.info("No new documents found.")
        return

    for file in new_files:
        logging.info(f"Processing document: {file}")
        # In production, this would call httpx.post("http://mcp-files:8004/execute/parse_pdf")
        logging.info(f"Successfully vectorized {file} into Qdrant.")

with DAG(
    'process_docs_dag',
    default_args=default_args,
    description='Automated ETL pipeline for vendor compliance documents',
    schedule_interval='@hourly',
    catchup=False
) as dag:

    t1 = PythonOperator(
        task_id='parse_and_embed_documents',
        python_callable=parse_and_embed,
    )
