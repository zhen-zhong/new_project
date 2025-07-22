// app/(auth)/login/page.tsx
export default function LoginPage() {
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
            <label htmlFor="email" className="block text-sm font-medium text-foreground">邮箱</label>
            <input type="email" id="email" placeholder="m@example.com" className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground">密码</label>
            <input type="password" id="password" className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm" />
          </div>
          <button className="w-full h-10 inline-flex items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground">
            登录
          </button>
        </div>
      </div>
    );
  }