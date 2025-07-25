// app/(chat)/chat/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, ReactNode } from 'react';
import { Plus } from 'lucide-react'; // 引入一个加号图标，提升 UI 效果

// 定义会话列表项的数据结构，方便类型检查
interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
}

// 模拟从 API 获取会话列表的函数
// 在真实应用中，这里会是一个 fetch 或 axios API 调用
async function getConversations(): Promise<Conversation[]> {
  console.log("正在获取会话列表...");
  
  // 为了演示，我们返回一些硬编码的模拟数据
  // 在真实应用中，这些数据应该来自你的数据库
  return [
    { id: '1a2b', title: '与 AI 的第一次对话', lastMessage: '好的，这是一个非常棒的进阶需求！...' },
    { id: '3c4d', title: '关于 Next.js 路由', lastMessage: '当然！让我们用一个清晰的比喻来解释...' },
    { id: '5e6f', title: '我的 FastAPI 项目', lastMessage: '是的，我们可以用 Pydantic 模型...' },
    { id: '7g8h', title: '周末出游计划', lastMessage: '听起来不错，我们周六早上出发吧。' },
  ];
}


// 这是共享布局组件，它会包裹所有 /chat/* 路径下的页面
export default function ChatHistoryLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 使用 state 来存储从 API 获取的会话列表
  const [conversations, setConversations] = useState<Conversation[]>([]);
  // 使用 usePathname hook 来获取当前的 URL 路径，例如 "/chat/1a2b"
  const pathname = usePathname();

  // 使用 useEffect 在组件首次加载时获取数据
  useEffect(() => {
    getConversations().then(data => {
      setConversations(data);
    });
  }, []); // 空依赖数组 [] 意味着这个 effect 只在组件挂载时运行一次

  return (
    // 使用 Flexbox 构建整体的两栏布局
    <div className="flex h-full overflow-hidden">
      
      {/* 侧边栏：会话列表 */}
      <aside className="w-1/4 min-w-[250px] max-w-[300px] border-r bg-muted/40 flex flex-col">
        
        {/* 侧边栏头部 */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-foreground">会话</h2>
          {/* "新建聊天" 按钮，链接到 /chat 根路径 */}
          <Link href="/chat" className="p-2 rounded-md hover:bg-accent">
            <Plus className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
        
        {/* 会话列表容器 */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map((conv) => {
            // 判断当前链接是否为激活状态
            const isActive = pathname === `/chat/${conv.id}`;
            
            return (
              // 使用 Next.js 的 Link 组件进行客户端导航
              <Link key={conv.id} href={`/chat/${conv.id}`}>
                <div
                  className={`cursor-pointer rounded-md p-3 transition-colors ${
                    // 根据是否激活来应用不同的背景色
                    isActive 
                      ? 'bg-accent text-accent-foreground' 
                      : 'hover:bg-accent/50 text-foreground'
                  }`}
                >
                  <p className="font-semibold truncate text-sm">{conv.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* 主内容区：这里会渲染子页面 */}
      <main className="flex-1 flex flex-col">
        {/* ✨ {children} 是一个插槽，Next.js 会在这里插入匹配到的页面组件 */}
        {/* 例如，当访问 /chat/1a2b 时，这里会渲染 app/(chat)/chat/[chatId]/page.tsx 的内容 */}
        {children}
      </main>
    </div>
  );
}