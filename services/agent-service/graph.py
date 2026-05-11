from langgraph.graph import StateGraph, END
from .state import AgentState
from .nodes import planner_node, research_node, risk_evaluator_node, critic_node

def create_vrip_graph():
    # 1. Initialize the Graph
    workflow = StateGraph(AgentState)

    # 2. Add Nodes
    workflow.add_node("planner", planner_node)
    workflow.add_node("researcher", research_node)
    workflow.add_node("evaluator", risk_evaluator_node)
    workflow.add_node("critic", critic_node)

    # 3. Define Edges (Transitions)
    workflow.set_entry_point("planner")
    
    workflow.add_edge("planner", "researcher")
    workflow.add_edge("researcher", "evaluator")
    workflow.add_edge("evaluator", "critic")
    
    # Conditional logic for Critic
    def should_continue(state: AgentState):
        if state.get("status") == "complete":
            return END
        return "researcher" # Simplified loop back

    workflow.add_conditional_edges(
        "critic",
        should_continue
    )

    return workflow.compile()

# Master Graph Instance
vrip_app = create_vrip_graph()
