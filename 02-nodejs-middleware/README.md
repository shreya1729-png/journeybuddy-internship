# Module 2 — Node.js & Middleware Architecture

## Objective

Build a Node.js server demonstrating middleware-based request processing, including logging, request timing, and authentication.

## Technologies

* Node.js
* Express.js
* JavaScript

## Middleware Architecture

The application processes requests through multiple middleware layers before reaching protected route handlers.

```text
Client Request
      ↓
Logging Middleware
      ↓
Timing Middleware
      ↓
Authentication Middleware
      ↓
Route Handler
      ↓
Response
```

## Middleware Components

### Logging Middleware

Logs the HTTP method and URL of every incoming request.

Example:

```text
GET /dashboard
```

### Timing Middleware

Measures and logs how long a request takes to complete.

Example:

```text
GET /dashboard - 10ms
```

### Authentication Middleware

Checks for an `Authorization` header before allowing access to protected routes.

Requests without authentication receive:

```text
401 Unauthorized
```

Requests containing an authorization header are allowed to continue to the route handler.

## Routes

### `GET /`

Public endpoint that confirms the API is running.

### `GET /dashboard`

Protected endpoint requiring authentication.

## Testing

The middleware was tested using browser requests and PowerShell.

### Without Authorization Header

Result:

```text
401 Unauthorized
```

### With Authorization Header

Example:

```text
Authorization: Bearer test-token
```

Result:

```text
200 OK
```

## Task Completion

The implementation demonstrates:

* Node.js server setup
* Express routing
* Request logging middleware
* Request timing middleware
* Authentication middleware
* Public and protected routes
* Middleware-based request flow

## Architecture Documentation

The detailed request-flow architecture is documented in [`ARCHITECTURE.md`](./ARCHITECTURE.md).
