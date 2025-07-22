# 1. 从 pydantic_settings 导入 SettingsConfigDict
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "My Awesome FastAPI Project"
    API_V1_STR: str = "/api/v1"
    DEEPSEEK_API_KEY: str
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()