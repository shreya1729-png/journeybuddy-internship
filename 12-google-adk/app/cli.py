"""Interactive CLI with an offline fallback."""

import asyncio
import os

from .tools import calculate_trip_budget, generate_travel_checklist


def demo_answer(question: str) -> str:
    """Return a friendly offline response for common travel requests."""
    q = question.lower()

    if "checklist" in q or "pack" in q:
        kind = next(
            (x for x in ("beach", "trekking", "city") if x in q),
            "general",
        )

        result = generate_travel_checklist(
            "your destination",
            3,
            kind,
        )

        return (
            "Here is your travel checklist:\n\n"
            + "\n".join(f"✓ {item}" for item in result["checklist"])
        )

    if "budget" in q or "cost" in q:
        result = calculate_trip_budget(
            "your destination",
            3,
            1,
            500,
            200,
            1500,
            3000,
        )

        return (
            "✈️ Trip Budget Estimate\n\n"
            f"🏨 Accommodation: ₹{result['estimated_accommodation_cost']:,.2f}\n"
            f"🍽️ Food: ₹{result['estimated_food_cost']:,.2f}\n"
            f"🚌 Local transport: ₹{result['estimated_local_transportation_cost']:,.2f}\n"
            f"🚆 Travel: ₹{result['travel_cost']:,.2f}\n\n"
            f"💰 Estimated total: ₹{result['estimated_total_cost']:,.2f}\n\n"
            f"Note: {result['note']}"
        )

    return (
        "I can help you estimate a trip budget or create a travel checklist. "
        "Try asking for a budget estimate or packing checklist."
    )


def main() -> None:
    print("\nJourneyBuddy Travel Assistant\nType 'exit' to quit.\n")

    use_live = bool(
        os.getenv("GOOGLE_API_KEY")
        or os.getenv("GOOGLE_GENAI_USE_VERTEXAI")
    )

    runner = None

    if use_live:
        try:
            from .runner import build_runner

            runner = build_runner()
            print("Live Google ADK mode enabled.\n")
        except Exception as exc:
            print(f"Live mode unavailable ({exc}); using demo mode.\n")
    else:
        print("No API key found; using offline demo mode.\n")

    while True:
        question = input("You: ").strip()

        if question.lower() in {"exit", "quit"}:
            print("Goodbye!")
            break

        if not question:
            continue

        if runner:
            try:
                from .runner import ask_agent

                print(
                    "Assistant:",
                    asyncio.run(ask_agent(runner, question)),
                    "\n",
                )
                continue
            except Exception as exc:
                print(f"Live request failed ({exc}); using demo mode.")

        print("Assistant:", demo_answer(question), "\n")


if __name__ == "__main__":
    main()