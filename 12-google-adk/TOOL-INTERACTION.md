# Agent–Tool Interaction

## What are agents and tools?
An agent is an AI component that interprets a request and decides what action to take. A tool is a callable function that performs a specific operation and returns structured data.

Tools are useful because they make calculations and repeatable operations reliable and inspectable instead of asking a language model to perform every operation from memory.

## Available tools

### `calculate_trip_budget`
Inputs: `destination`, `number_of_days`, `number_of_travelers`, `daily_food_cost`, `daily_local_transport_cost`, `accommodation_cost_per_night`, and `travel_cost`.

Formula:
- Accommodation = nightly cost × (days − 1)
- Food = daily food cost × days × travelers
- Local transport = daily transport cost × days × travelers
- Total = accommodation + food + local transport + travel cost

Output: a dictionary containing each subtotal, the total, and an estimate disclaimer.

### `generate_travel_checklist`
Inputs: `destination`, `number_of_days`, and `travel_type` (`beach`, `trekking`, `city`, or `general`).

Output: a dictionary containing destination details and a checklist. Extra items vary by travel type.

## Interaction flow
1. The user asks a travel question.
2. The ADK agent reads its instruction and available tool descriptions.
3. If a budget or checklist is needed, the model requests a tool call with arguments.
4. Google ADK executes the Python function.
5. The tool returns structured data or an error.
6. The agent explains the result to the user and labels estimates clearly.

## Example: budget request
User: “Calculate a budget for two travelers visiting Mysuru for two days.”

The agent should ask for or infer clearly stated input assumptions, call `calculate_trip_budget`, and explain the returned accommodation, food, transport, travel, and total estimates.

## Example: checklist request
User: “What should I pack for a trekking trip?”

The agent calls `generate_travel_checklist` with `travel_type="trekking"` and presents the returned checklist, including trekking shoes, water, rain protection, and a torch.

## Error examples
- Negative or zero days: the budget tool returns an error.
- Unsupported travel type: the checklist tool returns an error.
- Empty destination: both tools return an error.

## Live versus demo mode
Live mode uses the Google ADK runner and a configured model/API key. Demo mode directly invokes deterministic tools and labels its responses `[DEMO MODE]`; it does not claim that a language model generated them.
