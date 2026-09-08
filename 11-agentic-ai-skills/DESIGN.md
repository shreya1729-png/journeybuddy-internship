# Module 11 — Agentic AI / Skills (agentskills.io)

## 1. Core Concept

Agentic AI systems move beyond single-turn text generation into a feedback loop: **Plan → Act → Observe → Iterate**. Instead of producing one static answer, the agent evaluates the task, chooses an external tool if needed, inspects the tool's result, and decides whether it has enough information to answer or needs another step.

This module documents that decision process as it would apply to the JourneyBuddy Intelligent Assistant System — specifically, how the LangChain agent (used in the final integration project) decides between answering directly, querying a knowledge base, or calling an external tool.

## 2. Autonomous Tool-Calling Decision Tree

User Query
     |
     v
[Step 1: Parse Intent]
Does the query require external
information, or can it be answered
from general knowledge / conversation
context alone?
     |
     +-- No external info needed --> [Final Synthesis] --> Respond directly
     |
     +-- External info needed
             |
             v
     [Step 2: Tool Selection]
     What kind of information is needed?
             |
             +-- Semantic/contextual match against
             |   known knowledge (e.g. "destinations
             |   similar to X") --> Use Vector Search
             |   (MongoDB Atlas / Pinecone hybrid query)
             |
             +-- Real-time or external fact (e.g.
             |   "current weather in Goa") --> Use Web
             |   Search / External API tool
             |
             +-- Structured operational data (e.g.
                 "my booking status") --> Use Internal
                 Database Query
             |
             v
     [Step 3: Result Evaluation]
     Did the tool call return relevant,
     sufficient information?
             |
             +-- No / Insufficient --> Loop back to
             |   Step 2 with a refined query, or try
             |   a different tool (max N retries)
             |
             +-- Yes
                     |
                     v
             [Step 4: Final Synthesis]
             Combine retrieved context with the
             original query, generate a grounded
             response, and return it to the user.

## 3. Step-by-Step Breakdown

### Step 1 — Intent & Necessity Evaluation
The agent first checks whether the query can be answered from its own reasoning/context window (e.g. "what's a good beach destination?" as a general question) versus whether it genuinely needs fresh or specific data (e.g. "what's the cheapest budget beach trip in India in our database?"). This avoids unnecessary tool calls, which cost latency and money.

### Step 2 — Tool Selection
If a tool is needed, the agent chooses among the available tools based on the type of information required:

| Query Type | Tool Selected |
|---|---|
| Semantic/conceptual match against known destinations | Vector Search (MongoDB Atlas / Pinecone) |
| Live/external/real-time fact | Web Search API |
| User-specific structured data | Internal Database (MongoDB) |

### Step 3 — Result Evaluation
After a tool returns a result, the agent checks: is this actually relevant and sufficient to answer the user's question? If the vector search returns low-similarity-score matches, or a web search returns nothing useful, the agent can retry with a rephrased query or fall back to a different tool — up to a bounded number of retries to avoid infinite loops.

### Step 4 — Final Synthesis
Once sufficient information is gathered (or retries are exhausted), the agent combines the retrieved context with the original user query and generates a final natural-language response, citing or grounding it in the retrieved data where relevant.

## 4. Why This Matters for JourneyBuddy

This decision loop is what turns the final Intelligent Assistant System from a simple "search and return" tool into something closer to an actual assistant — it can recognize when its existing knowledge base is enough, when it needs to look something up, and when it should ask an external source, rather than blindly calling every tool for every query.

## 5. Reference

https://agentskills.io/home