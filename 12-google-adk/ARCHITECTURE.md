# Architecture

## Overview
The project separates deterministic business tools, the ADK agent definition, execution runner, and CLI.

## Diagram
```text
User
  |
  v
CLI (app/cli.py)
  |
  +--> Offline demo --> deterministic tools
  |
  +--> ADK Runner --> Google ADK Agent --> tool call
                                      |       |
                                      |       +--> calculate_trip_budget
                                      |       +--> generate_travel_checklist
                                      v
                                  Final response
```

## Responsibilities
- `tools.py`: validates inputs and returns JSON-like dictionaries.
- `agent.py`: configures the model, instruction, and tools.
- `runner.py`: creates an `App`, `InMemoryRunner`, and sends messages.
- `cli.py`: handles repeated user input and gracefully falls back to demo mode.

## Flow
1. The user enters a request.
2. The CLI chooses live mode if credentials are available; otherwise it uses demo mode.
3. In live mode, the ADK runner sends a `Content` message to the agent.
4. The model may call one of the registered Python functions.
5. ADK returns events; text parts are collected and displayed.
6. Errors are caught and reported without exposing secrets.

## Offline mode
Offline mode calls the same deterministic tools directly. It demonstrates tool behavior without claiming that an LLM was used.

## Error handling and security
Tools validate numeric values and supported travel types. Missing credentials do not crash the CLI. API keys are read from environment variables and excluded by `.gitignore`.

## Future improvements
Add persistent sessions, richer destination data, a web UI, structured event logging, and more comprehensive integration tests.
