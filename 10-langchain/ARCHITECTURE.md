# LangChain Retrieval Pipeline Architecture

## 1. Overview

This module demonstrates a dynamic context-augmented retrieval pipeline using LangChain.

The pipeline accepts a user question, retrieves relevant information from a knowledge base, injects the retrieved information into a prompt, prepares the prompt for model invocation, and parses the resulting output.

The architecture follows these stages:

1. User Input
2. Context Retrieval
3. Context Construction
4. Dynamic Prompt Creation
5. Model Invocation
6. Output Parsing

---

## 2. Pipeline Architecture

The retrieval pipeline follows this flow:

    User Question
          |
          v
    Dynamic Input Slot
        {question}
          |
          v
    Context Retrieval
      Knowledge Base
          |
          v
    Context Builder
        {context}
          |
          v
    Dynamic Prompt
    Context + Question
          |
          v
    Model Invocation
          |
          v
    Output Parser
    StrOutputParser
          |
          v
    Final Response

---

## 3. Dynamic Input

The pipeline accepts a user question through the `question` input.

Example:

    What is Redis used for?

The question is dynamically passed into the prompt template.

The prompt contains two dynamic fields:

- `{question}` - The user's current question.
- `{context}` - Information retrieved from the knowledge base.

This allows the same pipeline to process different user questions.

---

## 4. Knowledge Retrieval

The system contains a small sample knowledge base containing information about:

- Next.js
- FastAPI
- Redis
- Docker

The `retrieve_context()` function compares words from the user's question with words contained in the knowledge base.

Relevant documents are returned as the retrieval result.

For example, when the user asks:

    What is Redis used for?

The retrieval stage identifies the Redis document as relevant.

In a production system, this retrieval stage could be replaced or extended with a vector database such as MongoDB Atlas Vector Search or Pinecone.

---

## 5. Context Construction

The retrieved documents are passed to the `build_context()` function.

The function converts the retrieved documents into a single context string.

Example retrieved context:

    Redis: Redis is an in-memory data store commonly used for caching and fast data access.

This context becomes the `{context}` input of the prompt.

---

## 6. Dynamic Prompt

LangChain's `ChatPromptTemplate` is used to create the prompt structure.

The prompt contains a system instruction and a human input section.

The human input receives:

- Retrieved context
- User question

The resulting prompt structure is:

    Context:
    {context}

    User Question:
    {question}

This allows the same prompt template to be reused for different queries and retrieved contexts.

---

## 7. Model Invocation

After retrieval and prompt construction, the formatted prompt is prepared for model invocation.

The current implementation demonstrates the model invocation stage without requiring a live external model API.

The code creates the model input and prepares it for processing.

In a production implementation, the formatted prompt could be passed to an LLM such as an OpenAI model through the LangChain integration.

---

## 8. Output Parsing

The pipeline uses `StrOutputParser` from LangChain.

The output parser is responsible for converting the model output into a clean string representation.

The parsed output can then be returned to the application or user interface.

---

## 9. Complete Retrieval Flow

The complete pipeline can be represented as:

    User Question
          |
          v
    Retrieve Relevant Documents
          |
          v
    Build Context
          |
          v
    Inject Context + Question
          |
          v
    Create Dynamic Prompt
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

## 10. Example Execution

### Input

    What is Redis used for?

### Retrieval

The retrieval function identifies the Redis knowledge entry.

### Retrieved Context

    Redis: Redis is an in-memory data store commonly used for caching and fast data access.

### Prompt Construction

The retrieved context and the user's question are inserted into the dynamic prompt.

### Model Stage

The formatted prompt is prepared for model invocation.

### Output Stage

`StrOutputParser` processes the model output into a string.

---

## 11. Production Extension

The current implementation uses a small local knowledge base for demonstration.

A production version can replace the local retrieval mechanism with a vector database.

A possible production architecture is:

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

This architecture would allow semantic retrieval over a larger collection of documents.

---

## 12. Design Decisions

### Dynamic Input Slots

Dynamic variables allow the same prompt structure to process different user questions.

### Context Injection

Retrieved information is inserted into the prompt so that the model can use external knowledge when generating a response.

### Separation of Pipeline Stages

Retrieval, context construction, prompt creation, model invocation, and output parsing are kept as separate stages.

This makes the pipeline easier to understand, test, and extend.

### Vector Database Extension

The retrieval stage can later be connected to MongoDB Atlas Vector Search or Pinecone for semantic retrieval.

---

## 13. Project Implementation

The main implementation is contained in:

    pipeline.py

The Python file demonstrates:

- Sample knowledge storage
- Context retrieval
- Dynamic input
- Context construction
- LangChain prompt creation
- Model invocation preparation
- Output parsing

---

## 14. Conclusion

This LangChain pipeline demonstrates a context-augmented retrieval architecture.

The system accepts dynamic user input, retrieves relevant context, injects the context into a structured prompt, prepares the prompt for model invocation, and parses the resulting output.

The design provides a foundation that can later be extended with real LLM calls and vector database retrieval.

This implementation and architecture documentation satisfy the LangChain module requirement for a dynamic context-augmented retrieval pipeline and retrieval flow documentation.