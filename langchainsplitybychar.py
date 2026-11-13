from langchain_text_splitters import CharacterTextSplitter

with open("alice-in-wonderland.txt", encoding="utf-8") as f:
    aliceinwonderland = f.read()

text_splitter = CharacterTextSplitter(
    separator="\n\n",
    chunk_size=100,
    chunk_overlap=10,
    length_function=len,
    is_separator_regex=False,
)

texts = text_splitter.create_documents([aliceinwonderland])
print(f"{len(texts)} chunks")
print(texts[0].page_content)
print(texts[1].page_content)