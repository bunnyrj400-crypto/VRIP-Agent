from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta
import logging

default_args = {
    'owner': 'vrip',
    'depends_on_past': False,
    'start_date': datetime(2024, 1, 1),
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

def ingest_rss_feeds():
    """
    💡 Small Real-World Example:
    This task simulates hitting the CISA or BleepingComputer RSS feeds
    to find news related to our monitored vendors.
    """
    logging.info("Checking external RSS feeds for cyber incidents...")
    # Mocking ingestion logic
    found_incidents = [
        {"vendor": "VendorX", "incident": "Phishing campaign detected", "source": "CISA"}
    ]
    logging.info(f"Ingested {len(found_incidents)} new signals.")
    return found_incidents

def process_signals(**kwargs):
    ti = kwargs['ti']
    signals = ti.xcom_pull(task_ids='ingest_rss_feeds')
    logging.info(f"Processing {len(signals)} signals for vectorization...")

with DAG(
    'ingest_feeds_dag',
    default_args=default_args,
    description='Proactively monitors external feeds for vendor risk signals',
    schedule_interval=timedelta(hours=6),
    catchup=False
) as dag:

    t1 = PythonOperator(
        task_id='ingest_rss_feeds',
        python_callable=ingest_rss_feeds,
    )

    t2 = PythonOperator(
        task_id='process_signals',
        python_callable=process_signals,
    )

    t1 >> t2
