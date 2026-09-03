# Node.js & Middleware Architecture

## Request Flow

```text
Client Request
      |
      v
Logging Middleware
      |
      v
Timing Middleware
      |
      v
Authentication Middleware
      |
      +------------------+
      |                  |
   No Token          Token Present
      |                  |
      v                  v
401 Unauthorized      Route Handler
                         |
                         v
                      Response