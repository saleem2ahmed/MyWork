from openai import OpenAI
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import TokenTextSplitter

load_dotenv()  # reads OPENAI_API_KEY from .env

with open("alice-in-wonderland.txt", encoding="utf-8") as f:
    aliceinwonderland = f.read()

# chunk_size and chunk_overlap are measured in tokens, not characters
text_splitter = TokenTextSplitter(
    encoding_name="cl100k_base",
    chunk_size=100,
    chunk_overlap=10,
)

texts = text_splitter.create_documents([aliceinwonderland])
print(f"{len(texts)} chunks")
print(texts[0].page_content)
print(texts[1].page_content)


client = OpenAI()  # uses OPENAI_API_KEY from the environment
response = client.embeddings.create(input=texts[0].page_content, model="text-embedding-ada-002")
embedding = response.data[0].embedding
print(f"{len(embedding)} dimensions: {embedding[:6]}")


# Embed every chunk and store it in Chroma, saved to disk in chroma_db/
embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")
db = Chroma(
    collection_name="alice-in-wonderland",
    embedding_function=embeddings,
    persist_directory="chroma_db",
)

# Only embed on the first run; later runs reuse what's already on disk
if not db.get(limit=1)["ids"]:
    db.add_documents(texts)
print(f"{len(db.get()['ids'])} chunks stored in Chroma")

results = db.similarity_search("Who is the White Rabbit?", k=3)
for doc in results:
    print("---")
    print(doc.page_content)