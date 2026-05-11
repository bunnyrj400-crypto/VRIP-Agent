from typing import Literal
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # Core
    ENVIRONMENT: Literal["development", "production", "test"] = "development"
    PROJECT_NAME: str = "Vendor Risk Intelligence Platform"
    LOG_LEVEL: str = "INFO"

    # Infrastructure
    POSTGRES_USER: str = "vrip_admin"
    POSTGRES_PASSWORD: str = "vrip_password"
    POSTGRES_DB: str = "vrip_db"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432

    QDRANT_HOST: str = "localhost"
    QDRANT_PORT: int = 6333

    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379

    # AI & LLM
    GROQ_API_KEY: str = Field(..., description="API Key for Groq Cloud")
    DEFAULT_LLM_MODEL: str = "llama-3.1-70b-versatile"
    EMBEDDING_MODEL: str = "nomic-embed-text"

    # MCP
    MCP_GATEWAY_URL: str = "http://mcp-gateway:8000"

    @property
    def postgres_url(self) -> str:
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

settings = Settings()
