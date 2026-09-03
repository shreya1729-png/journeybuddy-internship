# Next.js Frontend Architecture

## Client-Server Boundary

```text
                    Next.js Application
                           |
                           |
                 +---------+---------+
                 |                   |
          Server Components     Client Components
                 |                   |
                 |                   |
        Static / Data UI        Interactive UI
                 |                   |
        +--------+--------+    +-----+----------+
        |        |        |    |        |       |
     Revenue   Users   Activity  Search  Live   Filters
      Card     Stats    Table     Bar   Status  Controls
        |
        |
    Analytics
     Summary

Pages
├── /dashboard
├── /analytics
└── /settings