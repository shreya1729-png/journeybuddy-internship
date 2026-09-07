from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser


knowledge_base = [
    {
        "topic": "Next.js",
        "content": "Next.js is a React framework used for building modern web applications."
    },
    {
        "topic": "FastAPI",
        "content": "FastAPI is a Python framework for building high-performance APIs."
    },
    {
        "topic": "Redis",
        "content": "Redis is an in-memory data store commonly used for caching and fast data access."
    },
    {
        "topic": "Docker",
        "content": "Docker packages applications and their dependencies into portable containers."
    }
]


def retrieve_context(query):
    query_words = set(query.lower().split())

    relevant_documents = []

    for document in knowledge_base:
        document_words = set(document["content"].lower().split())

        if query_words.intersection(document_words):
            relevant_documents.append(document)

    return relevant_documents


prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a helpful technical assistant. "
            "Answer the user's question using the provided context."
        ),
        (
            "human",
            "Context:\n{context}\n\n"
            "User Question:\n{question}"
        ),
    ]
)


output_parser = StrOutputParser()


def build_context(documents):
    if not documents:
        return "No relevant context was found."

    return "\n".join(
        f"{document['topic']}: {document['content']}"
        for document in documents
    )


def run_pipeline(question):

    documents = retrieve_context(question)

    context = build_context(documents)

    formatted_prompt = prompt.invoke(
        {
            "context": context,
            "question": question,
        }
    )

    model_response = (
        "Model input successfully prepared.\n\n"
        + formatted_prompt.to_string()
    )

    final_response = output_parser.invoke(model_response)

    return final_response


if __name__ == "__main__":

    user_question = "What is Redis used for?"

    result = run_pipeline(user_question)

    print("===== LangChain Retrieval Pipeline =====")
    print(result)