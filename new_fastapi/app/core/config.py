# my_fastapi_project/app/core/config.py

import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

# 确保 .env 文件被加载一次
load_dotenv()

class Settings(BaseSettings):
    # 项目名称
    PROJECT_NAME: str = "My Awesome API"

    # Pydantic Settings V2 的配置模型
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    # JWT 配置
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_DAYS: int = 7

    # 数据库连接信息
    DB_HOST: str
    DB_PORT: str
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str

    @property
    def DATABASE_URL(self) -> str:
        return f"mysql+aiomysql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

# 实例化配置
settings = Settings()