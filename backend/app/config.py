from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    # This class loads settings from environment variables or a .env file.
    # We use pydantic-settings which automatically converts and validates types.
    
    DATABASE_URL: str = "sqlite:///./engineering_os.db"
    APP_NAME: str = "Engineering OS API"
    DEBUG: bool = True
    GROQ_API_KEY: Optional[str] = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
