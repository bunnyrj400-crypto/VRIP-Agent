FROM vrip-shared-base:latest

WORKDIR /app

COPY services/mcp-risk-engine/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY services/mcp-risk-engine/ /app/services/mcp-risk-engine/

ENV PYTHONPATH=/app

EXPOSE 8005

CMD ["uvicorn", "services.mcp-risk-engine.main:app", "--host", "0.0.0.0", "--port", "8005"]
