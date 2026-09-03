# Module 1 — Next.js Frontend Architecture

## Objective

Architect a client-server boundary layout for a multi-page dashboard by distinguishing Server Components from interactive Client Components.

## Dashboard Pages

The application contains three pages:

* `/dashboard` — Main dashboard
* `/analytics` — Analytics and filtering
* `/settings` — User preferences

## Server Components

Server Components are used for UI that does not require browser-side state or event handling.

| Component          | Purpose                        |
| ------------------ | ------------------------------ |
| `RevenueCard`      | Displays revenue information   |
| `UserStats`        | Displays user statistics       |
| `ActivityTable`    | Displays recent activity       |
| `AnalyticsSummary` | Displays analytics information |

## Client Components

Client Components are used where browser-side interaction and React state are required.

| Component        | Purpose                                         |
| ---------------- | ----------------------------------------------- |
| `SearchBar`      | Allows users to enter search queries            |
| `LiveStatus`     | Allows live status interaction                  |
| `FilterControls` | Allows users to filter analytics data           |
| `Preferences`    | Allows users to change notification preferences |

## Architecture

The application follows a clear client-server boundary:

* Static and non-interactive dashboard content is implemented using Server Components.
* Interactive elements are implemented using Client Components.
* Client Components use React state and event handlers where required.
* Pages compose both Server and Client Components.

The detailed architecture diagram is available in [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Technologies

* Next.js
* React
* TypeScript
* Tailwind CSS
* App Router

## Task Completion

The module demonstrates:

* Multi-page dashboard architecture
* Server and Client Component separation
* Interactive search functionality
* Interactive filtering controls
* Interactive live status card
* Interactive user preferences
* Conceptual client-server boundary documentation

## Reference

Next.js documentation: https://nextjs.org/docs
