FROM vrip-shared-base:latest

WORKDIR /app

COPY services/api-gateway/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY services/api-gateway/ /app/services/api-gateway/

ENV PYTHONPATH=/app

EXPOSE 8080

CMD ["uvicorn", "services.api-gateway.main:app", "--host", "0.0.0.0", "--port", "8080"]
