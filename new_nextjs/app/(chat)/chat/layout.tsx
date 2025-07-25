'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, ReactNode } from 'react';
import { Plus, MessageSquare, PanelLeftClose, PanelLeftOpen, Settings } from 'lucide-react';

// 类型定义和模拟 API 函数保持不变
interface Conversation {
  id: string;
  title: string;
}
async function getConversations(): Promise<Conversation[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: '1a2b', title: '与 AI 的第一次对话' },
    { id: '3c4d', title: '关于 Next.js 路由' },
    { id: '1', title: '测试1' },
    { id: '2', title: '测试2' },
    { id: '3', title: '测试3' },
    { id: '4', title: '测试4' },
    { id: '5', title: '测试5' },
    { id: '6', title: '测试6' },
    { id: '7', title: '测试7' },
    { id: '8', title: '测试8' },
    { id: '9', title: '测试9' },
    { id: '10', title: '测试10' },
    { id: '11', title: '测试11' },
    { id: '12', title: '测试12' },
    { id: '13', title: '测试13' },
    { id: '14', title: '测试14' },
    { id: '15', title: '测试15' },
    { id: '16', title: '测试16' },
    { id: '17', title: '测试17' },
    { id: '18', title: '测试18' },
    { id: '19', title: '测试19' },
    { id: '20', title: '测试20' },
  ];
}

const SidebarSkeleton = () => (
  <div className="px-2 space-y-2 animate-pulse">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-10 bg-gray-200/50 rounded-md"></div>
    ))}
  </div>
);

const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-6 h-6 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-md"></div>
    <span className="font-bold text-lg">MyAI</span>
  </div>
);


export default function RefinedChatLayout({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    getConversations()
      .then(data => setConversations(data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden flex bg-gray-100">

      <aside
        className={`
          bg-white border-r border-gray-200 flex flex-col
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'w-64' : 'w-20'} 
        `}
      >
        <div className="p-4 space-y-4 border-b border-gray-200 shrink-0">
          <div className="flex items-center justify-between h-8">
            <div className={`transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
              {isSidebarOpen && <Logo />}
            </div>

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {isSidebarOpen ? <PanelLeftClose className="h-5 w-5 text-gray-500" /> : <PanelLeftOpen className="h-5 w-5 text-gray-500" />}
            </button>
          </div>

          <Link
            href="/chat/new"
            className={`
              flex items-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors
              ${isSidebarOpen ? 'justify-start' : 'justify-center'}
            `}
          >
            <Plus className="h-5 w-5 text-gray-600 shrink-0" />
            <span
              className={`
                ml-3 text-sm font-medium text-gray-700
                ${isSidebarOpen ? 'block' : 'hidden'}
              `}
            >
              新建聊天
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {isLoading ? <SidebarSkeleton /> : conversations.map((conv) => {
            const isActive = pathname === `/chat/${conv.id}`;
            return (
              <Link key={conv.id} href={`/chat/${conv.id}`} title={conv.title}>
                <div
                  className={`
                    flex items-center p-3 rounded-md cursor-pointer transition-colors
                    ${isSidebarOpen ? 'justify-start' : 'justify-center'} 
                    ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
                `}
                >
                  <MessageSquare className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  {isSidebarOpen && (
                    <span className="ml-3 text-sm font-medium truncate flex-1">
                      {conv.title}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="p-2 border-t border-gray-200 shrink-0">
          <div className="p-3 rounded-md hover:bg-gray-100 cursor-pointer flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white shrink-0">
              U
            </div>
            {/* 当侧边栏展开时显示文字 */}
            <div className={`ml-3 overflow-hidden transition-all duration-200 ${isSidebarOpen ? 'w-full opacity-100' : 'w-0 opacity-0'}`}>
              <p className="text-sm font-semibold truncate">User Name</p>
              <p className="text-xs text-gray-500 truncate">user@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ======================= 主内容区 ======================= */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}