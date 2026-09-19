"""Deterministic travel tools used by the Google ADK agent."""
from typing import Any


def _positive_number(value: Any, name: str, integer: bool = False) -> float:
    try:
        number = int(value) if integer else float(value)
    except (TypeError, ValueError):
        raise ValueError(f"{name} must be a number.")
    if number <= 0 or (integer and number != int(number)):
        raise ValueError(f"{name} must be greater than zero.")
    return number


def calculate_trip_budget(destination: str, number_of_days: int, number_of_travelers: int,
                          daily_food_cost: float, daily_local_transport_cost: float,
                          accommodation_cost_per_night: float, travel_cost: float) -> dict[str, Any]:
    """Calculate a transparent estimated trip budget. Values are user-provided estimates."""
    if not str(destination).strip():
        return {"error": "destination must not be empty."}
    try:
        days = int(_positive_number(number_of_days, "number_of_days", True))
        travelers = int(_positive_number(number_of_travelers, "number_of_travelers", True))
        food = _positive_number(daily_food_cost, "daily_food_cost")
        transport = _positive_number(daily_local_transport_cost, "daily_local_transport_cost")
        stay = _positive_number(accommodation_cost_per_night, "accommodation_cost_per_night")
        travel = _positive_number(travel_cost, "travel_cost")
    except ValueError as exc:
        return {"error": str(exc)}
    accommodation = stay * max(days - 1, 0)
    food_total = food * days * travelers
    transport_total = transport * days * travelers
    total = accommodation + food_total + transport_total + travel
    return {"destination": destination.strip(), "number_of_days": days,
            "number_of_travelers": travelers, "estimated_accommodation_cost": round(accommodation, 2),
            "estimated_food_cost": round(food_total, 2),
            "estimated_local_transportation_cost": round(transport_total, 2),
            "travel_cost": round(travel, 2), "estimated_total_cost": round(total, 2),
            "note": "These are estimates based on the supplied inputs, not live market prices."}


def generate_travel_checklist(destination: str, number_of_days: int, travel_type: str = "general") -> dict[str, Any]:
    """Generate a practical packing and preparation checklist."""
    if not str(destination).strip():
        return {"error": "destination must not be empty."}
    try:
        days = int(_positive_number(number_of_days, "number_of_days", True))
    except ValueError as exc:
        return {"error": str(exc)}
    kind = str(travel_type).strip().lower()
    if kind not in {"beach", "trekking", "city", "general"}:
        return {"error": "travel_type must be beach, trekking, city, or general."}
    items = ["Identification documents", "Booking confirmations", "Phone charger", "Power bank",
             "Required medicines", f"Clothing for approximately {days} day(s)", "Toiletries",
             "Weather-appropriate items", "Emergency contacts"]
    extras = {"beach": ["Swimwear", "Sunscreen", "Hat and sunglasses", "Quick-dry towel"],
              "trekking": ["Comfortable trekking shoes", "Water bottle", "Rain jacket", "First-aid kit", "Torch"],
              "city": ["Comfortable walking shoes", "Small day bag", "Offline map or transit details"],
              "general": ["Reusable water bottle", "Small day bag"]}
    return {"destination": destination.strip(), "number_of_days": days, "travel_type": kind,
            "checklist": items + extras[kind]}
