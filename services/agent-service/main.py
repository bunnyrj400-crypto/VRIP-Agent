from fastapi import FastAPI
from pydantic import BaseModel
from .graph import vrip_app
from .state import AgentState
import uuid

app = FastAPI(title="VRIP Agent Service", version="0.1.0")

class AnalysisRequest(BaseModel):
    vendor_name: str
    vendor_id: str = None

@app.post("/analyze")
async def analyze_vendor(request: AnalysisRequest):
    # Initial state
    initial_state = {
        "messages": [],
        "vendor_name": request.vendor_name,
        "vendor_id": request.vendor_id or str(uuid.uuid4()),
        "status": "planning",
        "current_step": 0,
        "plan": [],
        "evidence": [],
        "risk_scores": {},
        "reasoning_trace": []
    }
    
    # Run the graph
    result = await vrip_app.ainvoke(initial_state)
    
    return {
        "vendor_id": result["vendor_id"],
        "status": result["status"],
        "risk_scores": result["risk_scores"],
        "summary": result["reasoning_trace"]
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "agent-service"}
