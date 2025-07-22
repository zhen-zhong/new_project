# app/schemas/llm.py
from pydantic import BaseModel

class LLMRequest(BaseModel):
    """的请求体"""
    prompt: str

class LLMResponse(BaseModel):
    """响应体"""
    prompt: str
    response: str