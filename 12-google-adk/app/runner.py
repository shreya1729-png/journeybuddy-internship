"""ADK runner helpers."""
import os
from google.genai import types
from google.adk.apps import App
from google.adk.runners import InMemoryRunner
from .agent import create_agent


def build_runner():
    agent = create_agent()
    app = App(name="journeybuddy_travel_app", root_agent=agent)
    return InMemoryRunner(app=app, auto_create_session=True)


async def ask_agent(runner, question: str, user_id: str = "cli-user", session_id: str = "cli-session") -> str:
    parts = []
    message = types.Content(role="user", parts=[types.Part.from_text(text=question)])
    async for event in runner.run_async(user_id=user_id, session_id=session_id, new_message=message):
        if event.content and event.content.parts:
            for part in event.content.parts:
                if getattr(part, "text", None):
                    parts.append(part.text)
    return "\n".join(parts).strip() or "The agent did not return text."
