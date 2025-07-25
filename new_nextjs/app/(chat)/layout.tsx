// app/(chat)/layout.tsx

// 这个布局只应用于 (chat) 路由组下的所有页面
export default function ChatLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <main className="flex h-screen flex-col">
        {children}
      </main>
    );
  }