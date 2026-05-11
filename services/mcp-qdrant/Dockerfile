FROM vrip-shared-base:latest

WORKDIR /app

COPY services/mcp-qdrant/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY services/mcp-qdrant/ /app/services/mcp-qdrant/

ENV PYTHONPATH=/app

EXPOSE 8002

CMD ["uvicorn", "services.mcp-qdrant.main:app", "--host", "0.0.0.0", "--port", "8002"]
