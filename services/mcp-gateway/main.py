from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import httpx
import logging
from shared.logging_config import setup_logging
from shared.config import settings

# Initialize logging
logger = setup_logging(settings.LOG_LEVEL)

app = FastAPI(title="VRIP MCP Gateway", version="0.1.0")

# Registry of MCP servers
MCP_SERVERS = {
    "postgres": "http://mcp-postgres:8001",
    "qdrant": "http://mcp-qdrant:8002",
    "web": "http://mcp-web:8003",
    "files": "http://mcp-files:8004",
    "risk": "http://mcp-risk-engine:8005",
}

class ToolCall(BaseModel):
    server: str
    tool: str
    arguments: Dict[str, Any]

@app.get("/health")
async def health():
    return {"status": "healthy", "servers_registered": list(MCP_SERVERS.keys())}

@app.get("/tools")
async def list_tools():
    """
    Discover all available tools across registered MCP servers.
    """
    all_tools = {}
    async with httpx.AsyncClient() as client:
        for name, url in MCP_SERVERS.items():
            try:
                response = await client.get(f"{url}/tools", timeout=5.0)
                if response.status_code == 200:
                    all_tools[name] = response.json()
            except Exception as e:
                logger.error(f"Failed to fetch tools from {name}: {str(e)}")
                all_tools[name] = {"error": "Server unreachable"}
    return all_tools

@app.post("/execute")
async def execute_tool(call: ToolCall):
    """
    Route a tool execution request to the appropriate MCP server.
    """
    if call.server not in MCP_SERVERS:
        raise HTTPException(status_code=404, detail=f"MCP Server '{call.server}' not found")
    
    server_url = MCP_SERVERS[call.server]
    async with httpx.AsyncClient() as client:
        try:
            logger.info(f"Routing tool call '{call.tool}' to '{call.server}'")
            response = await client.post(
                f"{server_url}/execute/{call.tool}",
                json=call.arguments,
                timeout=30.0
            )
            return response.json()
        except httpx.TimeoutException:
            logger.error(f"Timeout executing tool '{call.tool}' on '{call.server}'")
            raise HTTPException(status_code=504, detail="Tool execution timed out")
        except Exception as e:
            logger.error(f"Error executing tool '{call.tool}': {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))
