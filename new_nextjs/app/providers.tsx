// app/providers.tsx
'use client'; // 关键！将这个组件标记为客户端组件

import { ThemeProvider } from '@/contexts/ThemeContext'; // 导入我们之前创建的 ThemeProvider
import { ReactNode } from 'react';

// 这个组件接收子组件作为 props
export function Providers({ children }: { children: ReactNode }) {
  // 在这里包裹所有需要客户端上下文的 Provider
  // 目前我们只有一个 ThemeProvider，但未来你可能还会有其他 Provider
  // 比如用于数据请求的 SWRConfig，或状态管理的 Redux Provider 等。
  return <ThemeProvider>{children}</ThemeProvider>;
}