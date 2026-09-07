# LangChain Framework

## 1. Objective

This module demonstrates a dynamic context-augmented retrieval pipeline using LangChain.

The pipeline accepts a user question, retrieves relevant information from a knowledge base, injects the retrieved context into a structured prompt, prepares the prompt for model invocation, and parses the resulting output.

---

## 2. HR Task

### Exercise

Design a dynamic context-augmented retrieval pipeline specifying:

- Dynamic input slots
- Vector search injection points
- Model invocation steps
- Output parsing rules

### GitHub Deliverable

The module requires:

- Pipeline specification
- Retrieval flow documentation

---

## 3. Pipeline Overview

The implemented pipeline follows these stages:

1. User Input
2. Context Retrieval
3. Context Construction
4. Dynamic Prompt Creation
5. Model Invocation Preparation
6. Output Parsing
7. Final Response

The pipeline is implemented in `pipeline.py`.

---

## 4. Dynamic Input

The pipeline accepts a user question through the `question` input.

Example:

    What is Redis used for?

The question is inserted dynamically into the LangChain prompt.

The prompt uses two dynamic fields:

- `{question}` - The user's current question.
- `{context}` - Information retrieved from the knowledge base.

---

## 5. Context Retrieval

A small sample knowledge base is used to demonstrate the retrieval process.

The knowledge base contains information about:

- Next.js
- FastAPI
- Redis
- Docker

The `retrieve_context()` function identifies relevant documents based on the user's query.

For example, a query about Redis retrieves the Redis-related knowledge entry.

In a production system, this retrieval stage could be extended with vector search using MongoDB Atlas Vector Search or Pinecone.

---

## 6. Context Injection

Retrieved documents are converted into a context string using the `build_context()` function.

The resulting context is inserted into the `{context}` field of the LangChain prompt.

The prompt therefore combines:

- Retrieved context
- User question

This creates a context-augmented input for the model.

---

## 7. Model Invocation

The formatted LangChain prompt represents the input that would be passed to a language model.

The current implementation demonstrates this stage without requiring a live external model API.

A production implementation could connect this stage to an LLM through a LangChain model integration.

---

## 8. Output Parsing

The implementation uses LangChain's `StrOutputParser`.

The parser converts model output into a clean string representation.

This parsed result can then be returned to the application.

---

## 9. Retrieval Flow

The complete retrieval workflow is:

    User Question
          |
          v
    Context Retrieval
          |
          v
    Retrieved Documents
          |
          v
    Context Construction
          |
          v
    Dynamic Prompt
          |
          v
    Model Invocation
          |
          v
    Output Parser
          |
          v
    Final Response

---

## 10. Vector Search Extension

The current demonstration uses a small local knowledge base.

For a production implementation, the retrieval stage can be replaced or extended with vector search.

Possible vector retrieval architecture:

    User Question
          |
          v
    Embedding Generation
          |
          v
    Vector Search
          |
          +----------------------+
          |                      |
          v                      v
    MongoDB Atlas           Pinecone
    Vector Search           Vector Database
          |                      |
          +----------+-----------+
                     |
                     v
              Retrieved Context
                     |
                     v
              LangChain Prompt
                     |
                     v
                    LLM
                     |
                     v
               Output Parser
                     |
                     v
              Final Response

This provides a possible path for connecting the LangChain pipeline with the vector database technologies studied in earlier modules.

---

## 11. Project Files

The module contains:

    10-langchain/
    |
    ├── pipeline.py
    ├── ARCHITECTURE.md
    └── README.md

---

## 12. Technologies Used

- Python
- LangChain
- LangChain Core
- LangChain OpenAI integration

---

## 13. Design Decisions

### Dynamic Input

The pipeline uses dynamic input variables so that the same prompt structure can process different questions.

### Context-Augmented Generation

Retrieved information is inserted into the prompt before model invocation.

### Modular Pipeline

Retrieval, context construction, prompt creation, model invocation, and output parsing are treated as separate stages.

### Vector Search Extension

The retrieval stage is designed so that it can later be connected to MongoDB Atlas Vector Search or Pinecone.

---

## 14. Task Completion

### Completed

- [x] Created dynamic input structure.
- [x] Implemented context retrieval.
- [x] Implemented context construction.
- [x] Implemented dynamic prompt creation.
- [x] Defined model invocation stage.
- [x] Implemented output parsing.
- [x] Documented retrieval flow.
- [x] Documented vector-search extension.
- [x] Created architecture documentation.
- [x] Created module README.

---

## 15. Reference Documentation

LangChain documentation:

https://python.langchain.com/docs/

---

## 16. Conclusion

This module demonstrates a dynamic context-augmented retrieval pipeline using LangChain.

The pipeline accepts dynamic user input, retrieves relevant context, injects the context into a structured prompt, prepares the prompt for model invocation, and parses the resulting output.

The architecture can be extended with vector search using MongoDB Atlas Vector Search or Pinecone and a production language model.

The implementation and documentation satisfy the LangChain module requirement for a dynamic context-augmented retrieval pipeline and retrieval flow documentation.