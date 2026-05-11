from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import httpx
from shared.config import settings
from shared.logging_config import setup_logging
from shared.models.domain import Vendor, RiskScore

logger = setup_logging(settings.LOG_LEVEL)

app = FastAPI(title="VRIP API Gateway", version="0.1.0")

# Internal service URLs
AGENT_SERVICE_URL = "http://agent-service:8001"
POSTGRES_MCP_URL = "http://mcp-postgres:8001"

class VendorCreate(BaseModel):
    name: str
    domain: str
    industry: str

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.post("/vendors")
async def create_vendor(vendor: VendorCreate):
    logger.info(f"Registering new vendor: {vendor.name}")
    # Logic to save to Postgres via MCP
    return {"status": "created", "vendor_id": "temp-uuid"}

@app.post("/analyze")
async def trigger_analysis(vendor_id: str):
    logger.info(f"Triggering analysis for vendor: {vendor_id}")
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{AGENT_SERVICE_URL}/analyze",
                json={"vendor_name": "Unknown Vendor", "vendor_id": vendor_id},
                timeout=120.0
            )
            return response.json()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

@app.get("/risk-report/{vendor_id}")
async def get_risk_report(vendor_id: str):
    return {"vendor_id": vendor_id, "score": 75, "status": "monitored"}
