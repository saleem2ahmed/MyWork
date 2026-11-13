from llama_index.readers.web import SimpleWebPageReader

loader = SimpleWebPageReader(html_to_text=True)

docs = loader.load_data(urls=["https://developers.llamaindex.ai/llamaparse/"])
print(docs[0].text[:500])
