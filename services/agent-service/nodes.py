from langchain_groq import ChatGroq
from shared.config import settings
from .state import AgentState
import json

# Initialize the LLM with Groq
llm = ChatGroq(
    api_key=settings.GROQ_API_KEY,
    model=settings.DEFAULT_LLM_MODEL,
    temperature=0.1
)

async def planner_node(state: AgentState):
    """
    PlannerAgent: Decomposes the user request into a step-by-step investigation.
    """
    vendor_name = state.get("vendor_name")
    prompt = f"Plan a risk assessment for vendor: {vendor_name}. Break it down into 3-4 clear research steps."
    
    # In a real app, we'd use structured output (tools or JSON mode)
    response = await llm.ainvoke(prompt)
    
    return {
        "status": "researching",
        "plan": [response.content], # Simplified for this version
        "current_step": 0,
        "messages": [response]
    }

async def research_node(state: AgentState):
    """
    ResearchAgent: Uses MCP tools to gather evidence.
    """
    vendor_name = state.get("vendor_name")
    # Simulation of calling MCP Gateway
    evidence = [
        {"source": "mcp-web", "content": f"Found breach news for {vendor_name}", "reliability": 0.6}
    ]
    
    return {
        "evidence": evidence,
        "status": "evaluating"
    }

async def risk_evaluator_node(state: AgentState):
    """
    RiskAgent: Evaluates evidence using the Epistemic Model.
    """
    evidence = state.get("evidence", [])
    prompt = f"Evaluate the risk for the following evidence: {json.dumps(evidence)}"
    
    response = await llm.ainvoke(prompt)
    
    return {
        "risk_scores": {"security": 75, "compliance": 90},
        "reasoning_trace": [response.content],
        "status": "reviewing",
        "messages": [response]
    }

async def critic_node(state: AgentState):
    """
    CriticAgent: Validates the reasoning.
    """
    # Logic to decide whether to loop back or move to recommendation
    return {"status": "complete"}
