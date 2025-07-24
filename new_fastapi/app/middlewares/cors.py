# my_fastapi_project/app/middlewares/cors.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 定义允许访问的源（你的前端地址）
# 在生产环境部署时，务必将 "http://localhost:3000" 替换为你实际的前端域名
origins = [
    "http://localhost:3000",  # 开发环境前端地址
    # "http://localhost:3001", # 如果有其他开发地址
    # "https://www.your-frontend-site.com", # 生产环境前端域名
]

def setup_cors_middleware(app: FastAPI):
    """
    为 FastAPI 应用配置 CORS 中间件。
    此函数应在 FastAPI 应用实例创建后调用。
    """
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,          # 允许访问的源列表
        allow_credentials=True,         # 是否支持 cookie 凭证
        allow_methods=["*"],            # 允许所有 HTTP 方法 (GET, POST, PUT, DELETE, OPTIONS, etc.)
        allow_headers=["*"],            # 允许所有请求头
    )
    print("CORS middleware configured.")