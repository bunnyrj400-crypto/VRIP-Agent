FROM vrip-shared-base:latest

WORKDIR /app

COPY services/mcp-web/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY services/mcp-web/ /app/services/mcp-web/

ENV PYTHONPATH=/app

EXPOSE 8003

CMD ["uvicorn", "services.mcp-web.main:app", "--host", "0.0.0.0", "--port", "8003"]
