# FastAPI 标准项目模板

这是一个遵循 FastAPI 官方推荐和社区最佳实践构建的入门级项目模板。它包含了一个清晰、可扩展的目录结构，适用于构建生产级别的 API 服务。

该项目实现了一个简单的待办事项（Todo）API，并集成了自动化测试。

## ✨ 特性

-   **FastAPI**: 高性能的现代 Python Web 框架。
-   **Pydantic**: 用于数据验证和设置管理。
-   **标准目录结构**: 将配置、路由、模型、Schema 分离，易于维护和扩展。
-   **API 版本控制**: 通过 `/api/v1/` 路径前缀实现。
-   **自动化测试**: 使用 `pytest` 和 `TestClient` 编写。
-   **依赖管理**: 使用虚拟环境和 `requirements.txt`。
-   **配置管理**: 通过 `.env` 文件进行环境特定配置。

## 🚀 快速开始

### 1. 环境准备

-   确保你已经安装了 Python 3.8 或更高版本。
-   克隆本项目（或者，如果你是从零创建，请跳过此步）。

    ```bash
    git clone <your-repository-url>
    cd my_fastapi_project
    ```

### 2. 创建并激活虚拟环境

为了隔离项目依赖，建议使用虚拟环境。

```bash
# 创建虚拟环境
python3 -m venv venv

# 激活虚拟环境
# macOS / Linux:
source venv/bin/activate
# Windows:
# .\venv\Scripts\activate

### 3. 安装依赖
pip install -r requirements.txt

### 4. 配置环境变量
# .env
PROJECT_NAME="My Awesome Todo API"

### 5. 运行应用
uvicorn app.main:app --reload

## 同步requirements.txt
pip freeze > requirements.txt

### 6. 访问 API 文档
1. Swagger UI: http://127.0.0.1:8000/docs
2. ReDoc: http://127.0.0.1:8000/redoc

本项目使用 pytest 进行自动化测试。

pytest -v

项目结构

my_fastapi_project/
├── app/                  # 主要的应用代码目录
│   ├── main.py           # FastAPI 应用入口
│   ├── api/              # API 路由
│   │   └── v1/           # API 版本 v1
│   │       └── endpoints/
│   │           └── todos.py
│   ├── core/             # 核心逻辑 (配置等)
│   ├── models/           # 数据库 ORM 模型
│   └── schemas/          # Pydantic 数据校验模型
├── tests/                # 测试文件目录
├── .env                  # 环境变量文件 (不应提交到 git)
├── .gitignore            # Git 忽略文件
├── README.md             # 项目说明文件
└── requirements.txt      # 项目依赖