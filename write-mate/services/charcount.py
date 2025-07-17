def get_char_count(text: str):
    return {
        "chars": len(text),
        "words": len(text.split())
    }
