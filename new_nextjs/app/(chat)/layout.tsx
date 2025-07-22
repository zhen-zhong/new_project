// app/(chat)/layout.tsx

// 这个布局只应用于 (chat) 路由组下的所有页面
export default function ChatLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      // 创建一个占据整个视口高度的 flex 容器
      // 这使得子页面可以轻松实现全屏或复杂的侧边栏+主内容布局
      <main className="flex h-screen flex-col">
        {children}
      </main>
    );
  }