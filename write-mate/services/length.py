def analyze_length(text: str):
    # 예시: 문장 길이 분석 결과
    sentences = [s for s in text.split('.') if s.strip()]
    lengths = [len(s.strip()) for s in sentences]
    return {"sentence_lengths": lengths, "average_length": sum(lengths)/len(lengths) if lengths else 0}
