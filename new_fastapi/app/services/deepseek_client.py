# app/services/deepseek_client.py

import httpx
from app.core.config import settings

DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions"

async def get_deepseek_completion(prompt: str) -> str:
    """
    异步调用 DeepSeek API 并获取模型的响应。

    Args:
        prompt: 发送给模型的用户提示。

    Returns:
        模型的文本响应。
        
    Raises:
        httpx.HTTPStatusError: 如果 API 返回错误状态码。
    """
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {settings.DEEPSEEK_API_KEY}"
    }
    
    payload = {
        "model": "deepseek-chat",  # 或者使用 deepseek-coder
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(DEEPSEEK_API_URL, headers=headers, json=payload, timeout=30.0)
        
        # 检查 API 调用是否成功，如果不成功则会抛出异常
        response.raise_for_status()
        
        data = response.json()
        # 提取并返回模型生成的文本内容
        return data["choices"][0]["message"]["content"]