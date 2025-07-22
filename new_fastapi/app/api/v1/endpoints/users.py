# app/api/v1/endpoints/users.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/me", response_model=dict)
def read_current_user():
    """获取当前用户信息 (V1)"""
    # 在实际应用中，这里会返回已认证用户的信息
    return {"user_id": "user123", "username": "fake_current_user", "api_version": "v1"}