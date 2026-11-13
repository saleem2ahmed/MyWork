from langchain_community.document_loaders import YoutubeLoader

# add_video_info=True relies on pytube, which currently fails with HTTP 400
loader = YoutubeLoader.from_youtube_url("https://www.youtube.com/watch?v=qTgPSKKjfVg",
                                        add_video_info=False)

docs = loader.load()
print(docs[0].metadata)
print(docs[0].page_content[:500])
