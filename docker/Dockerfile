FROM python:3.10.11
WORKDIR /app
COPY docker/main.py .
COPY requirements.txt .
RUN pip install -r requirements.txt
CMD ["python", "main.py"]