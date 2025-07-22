# tests/test_todos.py

from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings

# 使用 TestClient，它允许你向 FastAPI 应用发送请求，而无需启动真实的服务器
client = TestClient(app)

# API 前缀
API_V1_STR = settings.API_V1_STR

def test_read_root():
    """测试根路径 /"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Todo API!"}

def test_create_todo():
    """测试创建待办事项"""
    # 准备测试数据
    todo_data = {"title": "Test Todo", "description": "This is a test description."}
    
    # 发送 POST 请求
    response = client.post(f"{API_V1_STR}/todos/", json=todo_data)
    
    # 断言（检查）响应是否符合预期
    assert response.status_code == 201
    
    data = response.json()
    assert data["title"] == todo_data["title"]
    assert data["description"] == todo_data["description"]
    assert data["completed"] is False
    assert "id" in data

def test_read_todos():
    """测试获取所有待办事项"""
    response = client.get(f"{API_V1_STR}/todos/")
    assert response.status_code == 200
    
    data = response.json()
    assert isinstance(data, list) # 确保返回的是一个列表
    assert len(data) > 0 # 确保列表不为空 (基于我们模拟的数据库)

def test_read_one_todo():
    """测试获取单个待办事项"""
    # 假设 ID=1 的待办事项存在于我们的模拟数据库中
    response = client.get(f"{API_V1_STR}/todos/1")
    assert response.status_code == 200
    
    data = response.json()
    assert data["id"] == 1
    assert data["title"] == "Learn FastAPI"

def test_read_one_todo_not_found():
    """测试获取一个不存在的待办事项"""
    response = client.get(f"{API_V1_STR}/todos/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Todo not found"}

def test_update_todo():
    """测试更新一个待办事项"""
    update_data = {"title": "Updated Title", "completed": True}
    
    # 假设 ID=2 的待办事项存在
    response = client.put(f"{API_V1_STR}/todos/2", json=update_data)
    assert response.status_code == 200
    
    data = response.json()
    assert data["title"] == update_data["title"]
    assert data["completed"] == update_data["completed"]
    assert data["id"] == 2