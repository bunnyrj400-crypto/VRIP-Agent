FROM vrip-shared-base:latest

WORKDIR /app

# Copy service-specific requirements
COPY services/mcp-gateway/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy service code
COPY services/mcp-gateway/ /app/services/mcp-gateway/

# Set environment variables
ENV PYTHONPATH=/app

EXPOSE 8000

CMD ["uvicorn", "services.mcp-gateway.main:app", "--host", "0.0.0.0", "--port", "8000"]
