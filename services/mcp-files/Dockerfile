FROM vrip-shared-base:latest

WORKDIR /app

COPY services/mcp-files/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY services/mcp-files/ /app/services/mcp-files/

ENV PYTHONPATH=/app

EXPOSE 8004

CMD ["uvicorn", "services.mcp-files.main:app", "--host", "0.0.0.0", "--port", "8004"]
