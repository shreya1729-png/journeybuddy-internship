from app.tools import calculate_trip_budget, generate_travel_checklist


def test_budget_calculation():
    result = calculate_trip_budget("Mysuru", 2, 2, 500, 200, 1500, 3000)
    assert result["estimated_accommodation_cost"] == 1500
    assert result["estimated_total_cost"] == 7300


def test_budget_validation():
    assert "error" in calculate_trip_budget("Goa", 0, 2, 1, 1, 1, 1)


def test_checklist_changes_by_type():
    result = generate_travel_checklist("Goa", 3, "beach")
    assert "Sunscreen" in result["checklist"]


def test_checklist_validation():
    assert "error" in generate_travel_checklist("Goa", 3, "space")
