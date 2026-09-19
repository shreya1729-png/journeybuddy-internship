# JourneyBuddy Travel Assistant — Module 11: Google ADK

A small command-line travel assistant demonstrating a Google ADK agent and two callable Python tools.

## Assignment connection
- **Basic agent:** `app/agent.py` defines the JourneyBuddy agent.
- **Tool integration:** the agent receives `calculate_trip_budget` and `generate_travel_checklist`.
- **Interaction documentation:** see `TOOL-INTERACTION.md`.
- **Commit-ready implementation:** this folder is self-contained and contains tests and documentation.

## Features
- Budget estimation with transparent calculations.
- Travel checklist generation for beach, trekking, city, and general trips.
- Live Google ADK mode when `GOOGLE_API_KEY` is configured.
- Offline demo mode for testing without a paid API.
- Unit tests for the deterministic tools.

## Structure
```text
11-google-adk/
├── app/          # Agent, runner, CLI, and tools
├── tests/        # Unit tests
├── main.py
├── requirements.txt
├── .env.example
├── README.md
├── ARCHITECTURE.md
└── TOOL-INTERACTION.md
```

## Prerequisites
Python 3.10+ and PowerShell. Python 3.11 or 3.12 is recommended.

## Windows PowerShell setup
```powershell
cd journeybuddy-internship\11-google-adk
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
Copy-Item .env.example .env
python main.py
```

The `.env` file is optional for demo mode. To enable live mode, replace the placeholder with a valid Gemini API key. Do not commit `.env`.

## Demo mode
If no API key is configured, the CLI still demonstrates the tools. Try:
- `Calculate a budget for a 3-day trip`
- `Give me a beach travel checklist`

Demo mode is deliberately labeled and does not pretend that an LLM generated the response.

## Example questions
- Plan a budget trip to Goa for 3 days.
- Calculate a budget for 2 travelers visiting Mysuru for 2 days.
- Give me a checklist for a beach trip.
- What should I pack for a trekking trip?

## Tests
```powershell
python -m pytest -q
```

## Common issues
- **PowerShell activation blocked:** run `Set-ExecutionPolicy -Scope Process Bypass` in the current terminal.
- **Python not found:** install Python and ensure the `py` launcher works.
- **Live mode errors:** verify the API key, internet connection, and installed Google ADK version. Demo mode remains available.

## Security notes
Never hardcode or commit API keys. Keep `.env` local. Cost values are user-provided estimates, not real-time prices.

## Conclusion
This module demonstrates a basic Google ADK agent, callable tools, a runner, offline testing, and clear agent-tool documentation.


## Web dashboard

This version includes a local web dashboard with chat, budget planning, and checklist generation. Start it with:

```powershell
python main.py
```

Open `http://127.0.0.1:8000` in your browser. Without `GOOGLE_API_KEY`, the dashboard uses clearly labeled offline demo mode. With a valid key, chat attempts to use the Google ADK runner.
