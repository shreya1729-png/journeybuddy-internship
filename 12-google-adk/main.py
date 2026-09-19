"""Launch the JourneyBuddy web dashboard."""
from app.web_server import app

if __name__ == "__main__":
    print("\nJourneyBuddy dashboard: http://127.0.0.1:8000\nPress Ctrl+C to stop.\n")
    app.run(host="127.0.0.1", port=8000, debug=False)
