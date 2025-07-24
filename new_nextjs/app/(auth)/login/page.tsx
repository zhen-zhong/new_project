"use client";
import React, { useEffect, useState } from "react"; // 1. 导入 useState
import { register } from "@/services/api"; 

export default function LoginPage() {
  // 2. 创建状态变量
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("用户名:", username);
    console.log("邮箱:", email);
    console.log("密码:", password);
    const res = await register({ username, email, password });
    console.log("Test API Response:", res);
  };

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">登录</h1>
        <p className="mt-2 text-muted-foreground">
          欢迎回来！请输入您的凭据。
        </p>
      </div>
      <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm space-y-4">
        <div>
          {/* 4. 修正 id 和 htmlFor，并绑定 value 和 onChange */}
          <label htmlFor="usernameInput" className="block text-sm font-medium text-foreground">用户名</label>
          <input
            type="text" // 用户名通常是 text 类型，而不是 email
            id="usernameInput" // 确保 ID 唯一
            placeholder="admin"
            className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm"
            value={username} // 绑定值
            onChange={(e) => setUsername(e.target.value)} // 更新状态
          />
        </div>
        <div>
          {/* 4. 修正 id 和 htmlFor，并绑定 value 和 onChange */}
          <label htmlFor="emailInput" className="block text-sm font-medium text-foreground">邮箱</label>
          <input
            type="email"
            id="emailInput" // 确保 ID 唯一
            placeholder="m@example.com"
            className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm"
            value={email} // 绑定值
            onChange={(e) => setEmail(e.target.value)} // 更新状态
          />
        </div>
        <div>
          {/* 4. 修正 id 和 htmlFor，并绑定 value 和 onChange */}
          <label htmlFor="passwordInput" className="block text-sm font-medium text-foreground">密码</label>
          <input
            type="password"
            id="passwordInput" // 确保 ID 唯一
            className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm"
            value={password} // 绑定值
            onChange={(e) => setPassword(e.target.value)} // 更新状态
          />
        </div>
        <button onClick={handleLogin} className="w-full h-10 inline-flex items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground">
          登录
        </button>
      </div>
    </div>
  );
}