"""Google ADK agent definition. Imports are lazy so offline tools remain usable."""
from .tools import calculate_trip_budget, generate_travel_checklist

INSTRUCTION = """You are JourneyBuddy Travel Assistant. Help users plan simple trips.
Use calculate_trip_budget for budget estimates and generate_travel_checklist for packing lists.
Explain when you use a tool, clearly label all figures as estimates, never invent live prices,
and answer concisely in beginner-friendly language. After a tool call, explain the result."""


def create_agent():
    """Create an ADK Agent/LlmAgent using the installed Google ADK version."""
    try:
        from google.adk.agents import Agent
        agent_class = Agent
    except ImportError:
        from google.adk.agents import LlmAgent
        agent_class = LlmAgent
    import os
    model = os.getenv("GOOGLE_ADK_MODEL", "gemini-2.0-flash")
    return agent_class(name="journeybuddy_travel_assistant", model=model,
                       description="A beginner-friendly travel planning assistant.",
                       instruction=INSTRUCTION,
                       tools=[calculate_trip_budget, generate_travel_checklist])
