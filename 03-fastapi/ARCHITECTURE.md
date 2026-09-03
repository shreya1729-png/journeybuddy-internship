# FastAPI Validation Architecture

## Request Flow

Client Request
      |
      v
FastAPI Endpoint
      |
      v
Query Parameter Validation
      |
      +----------------------+
      |                      |
   Valid Input           Invalid Input
      |                      |
      v                      v
Filter Data             422 Error
      |                      |
      v                      v
JSON Response       Structured Error JSON


## Schema Validation Rules

### min_id

- Type: integer
- Default value: 1
- Constraint: greater than 0
- Invalid example: `min_id=0`

### Item Schema

- `id`: integer greater than 0
- `name`: string between 2 and 50 characters

## Automated Error Serialization

FastAPI uses Pydantic validation to validate incoming parameters.

When malformed input is received, FastAPI automatically returns a
structured JSON error response with:

- Error type
- Location of the invalid input
- Human-readable error message
- The received input
- Validation context

For example, requesting:

`/items?min_id=0`

returns HTTP status `422 Unprocessable Entity` with validation details.

## OpenAPI Documentation

FastAPI automatically generates interactive API documentation from
the defined routes and schemas.

Swagger UI is available at:

`/docs`