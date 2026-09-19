"""Local web dashboard for JourneyBuddy."""
import asyncio, os
from flask import Flask, jsonify, request, send_from_directory
from dotenv import load_dotenv
from .tools import calculate_trip_budget, generate_travel_checklist
from .cli import demo_answer

load_dotenv()
app = Flask(__name__, static_folder="../web", static_url_path="")
_runner = None

def _get_runner():
    global _runner
    if _runner is None:
        from .runner import build_runner
        _runner = build_runner()
    return _runner

@app.get("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.get("/api/health")
def health():
    live = bool(os.getenv("GOOGLE_API_KEY") or os.getenv("GOOGLE_GENAI_USE_VERTEXAI"))
    return jsonify({"ok": True, "mode": "live" if live else "demo"})

@app.post("/api/chat")
def chat():
    data = request.get_json(silent=True) or {}
    question = str(data.get("message", "")).strip()
    if not question: return jsonify({"error":"Please enter a message."}), 400
    live = bool(os.getenv("GOOGLE_API_KEY") or os.getenv("GOOGLE_GENAI_USE_VERTEXAI"))
    if live:
        try:
            from .runner import ask_agent
            answer = asyncio.run(ask_agent(_get_runner(), question, user_id="web-user", session_id="web-session"))
            return jsonify({"answer": answer, "mode":"live"})
        except Exception as exc:
            return jsonify({"answer": demo_answer(question).replace("[DEMO MODE] ", ""), "mode":"demo", "notice":f"Live mode unavailable: {exc}"})
    return jsonify({"answer": demo_answer(question).replace("[DEMO MODE] ", ""), "mode":"demo"})

@app.post("/api/budget")
def budget():
    data=request.get_json(silent=True) or {}
    try:
        result=calculate_trip_budget(data.get("destination",""), int(data.get("number_of_days",0)), int(data.get("number_of_travelers",0)), float(data.get("daily_food_cost",0)), float(data.get("daily_local_transport_cost",0)), float(data.get("accommodation_cost_per_night",0)), float(data.get("travel_cost",0)))
        return jsonify(result)
    except (TypeError, ValueError) as exc: return jsonify({"error":str(exc)}),400

@app.post("/api/checklist")
def checklist():
    data=request.get_json(silent=True) or {}
    try: return jsonify(generate_travel_checklist(data.get("destination",""), int(data.get("number_of_days",0)), data.get("travel_type","general")))
    except (TypeError, ValueError) as exc: return jsonify({"error":str(exc)}),400

if __name__ == "__main__": app.run(host="127.0.0.1", port=8000, debug=False)
