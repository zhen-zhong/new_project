# my_fastapi_project/app/core/database.py

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base

from app.core.config import settings # <-- 关键：从 config 导入 settings

# 创建异步数据库引擎
# DATABASE_URL 现在直接从 settings.DATABASE_URL 获取
engine = create_async_engine(settings.DATABASE_URL, echo=True)

# 创建异步会话工厂
AsyncSessionLocal = async_sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

# 声明式基类 - 用于定义你的数据库模型
Base = declarative_base()

# 初始化数据库（创建所有表） - 通常在应用启动时调用一次
async def init_db():
    async with engine.begin() as conn:
        # 创建所有在 Base 中定义的表
        # 注意：在生产环境中，更推荐使用 Alembic 进行数据库迁移管理
        await conn.run_sync(Base.metadata.create_all)

# 依赖注入函数 - 用于在 FastAPI 路由中获取数据库会话
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()