// components/ThemeSwitcher.tsx
'use client';

import { useTheme } from '@/contexts/ThemeContext'; // 确保路径正确
import { Sun, Moon, Laptop } from 'lucide-react'; // 引入图标
import { useState, useEffect, useRef } from 'react';

export function ThemeSwitcher() {
  // 从我们的 ThemeContext 中获取需要的状态和方法
  const { theme, setTheme } = useTheme();
  // 控制下拉菜单的显示/隐藏
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击组件外部时关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    // 添加事件监听
    document.addEventListener('mousedown', handleClickOutside);
    // 组件卸载时移除事件监听
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // 根据当前主题选择要显示的图标
  const CurrentThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'dark':
        return <Moon className="h-5 w-5" />;
      case 'system':
        return <Laptop className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 主按钮，点击打开/关闭下拉菜单 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        aria-label="Toggle theme"
      >
        <CurrentThemeIcon />
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-36 rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          <button
            onClick={() => {
              setTheme('light');
              setIsOpen(false);
            }}
            className={`w-full text-left px-2 py-1.5 text-sm flex items-center space-x-2 rounded-sm hover:bg-accent ${
              theme === 'light' ? 'bg-accent' : ''
            }`}
          >
            <Sun className="h-4 w-4" />
            <span>亮色</span>
          </button>
          <button
            onClick={() => {
              setTheme('dark');
              setIsOpen(false);
            }}
            className={`w-full text-left px-2 py-1.5 text-sm flex items-center space-x-2 rounded-sm hover:bg-accent ${
              theme === 'dark' ? 'bg-accent' : ''
            }`}
          >
            <Moon className="h-4 w-4" />
            <span>暗色</span>
          </button>
          <button
            onClick={() => {
              setTheme('system');
              setIsOpen(false);
            }}
            className={`w-full text-left px-2 py-1.5 text-sm flex items-center space-x-2 rounded-sm hover:bg-accent ${
              theme === 'system' ? 'bg-accent' : ''
            }`}
          >
            <Laptop className="h-4 w-4" />
            <span>跟随系统</span>
          </button>
        </div>
      )}
    </div>
  );
}