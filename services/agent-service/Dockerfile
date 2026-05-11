FROM vrip-shared-base:latest

WORKDIR /app

COPY services/agent-service/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY services/agent-service/ /app/services/agent-service/
COPY scripts/ /app/scripts/

ENV PYTHONPATH=/app

EXPOSE 8001

CMD ["uvicorn", "services.agent-service.main:app", "--host", "0.0.0.0", "--port", "8001"]
