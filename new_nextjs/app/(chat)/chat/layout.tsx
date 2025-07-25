// app/(chat)/chat/layout.tsx
'use client';
import { ReactNode } from 'react';
import Sidebar from './modal/sidebar';

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen overflow-hidden flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <div className="flex-1 h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}