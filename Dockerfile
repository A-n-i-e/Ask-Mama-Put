# Use official Python image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy dependency list
COPY requirements.txt .

# Create and activate virtual environment
RUN python -m venv .venv
RUN .venv/bin/activate

# Upgrade pip
RUN pip install --upgrade pip

# Install dependencies
RUN pip install --no-cache-dir -r requirements.

# Copy the rest of the backend code
COPY . .

# Expose the FastAPI port
EXPOSE 8000

# Start the server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
