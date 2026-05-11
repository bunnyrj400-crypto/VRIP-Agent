from typing import Annotated, List, Dict, Any, Union
from typing_extensions import TypedDict
from langgraph.graph.message import add_messages
from pydantic import BaseModel

class AgentState(TypedDict):
    """
    The state of the VRIP reasoning graph.
    """
    # Standard conversation messages
    messages: Annotated[List[Any], add_messages]
    
    # Domain-specific state
    vendor_id: str
    vendor_name: str
    
    # Task planning
    plan: List[str]
    current_step: int
    
    # Gathered evidence
    evidence: List[Dict[str, Any]]
    
    # Evaluation results
    risk_scores: Dict[str, Any]
    reasoning_trace: List[str]
    
    # Metadata
    confidence: float
    status: str # "planning", "researching", "evaluating", "reviewing", "complete"
