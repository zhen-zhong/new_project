'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// 1. 扩展 Theme 类型，增加 'system'
// 'custom' 模式我们后面通过 CSS 变量的方式实现，状态上不直接体现
type Theme = 'light' | 'dark' | 'system';

type ThemeContextType = {
  // `theme` 是用户在 UI 上选择的模式，可能是 'system'
  theme: Theme;
  setTheme: (theme: Theme) => void;
  // `resolvedTheme` 是实际应用到页面的主题，'system' 会被解析成 'light' 或 'dark'
  resolvedTheme: 'light' | 'dark';
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // `theme` 状态现在可以存储 'system'
  const [theme, setTheme] = useState<Theme>('system');
  // `resolvedTheme` 状态存储实际的主题
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // 2. 核心逻辑：处理 'system' 模式
  const handleSystemThemeChange = useCallback(() => {
    // 检查媒体查询
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setResolvedTheme(isDarkMode ? 'dark' : 'light');
  }, []);

  // 首次加载时，从 localStorage 读取用户选择
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme('system'); // 默认就是跟随系统
    }
  }, []);

  // 3. 监听 theme 和系统主题的变化
  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === 'system') {
      // 如果是 'system' 模式，就根据系统偏好来设置
      handleSystemThemeChange();
      
      // 并且监听系统主题的变化
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', handleSystemThemeChange);

      // 组件卸载时移除监听器
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    } else {
      // 如果是 'light' 或 'dark'，直接设置
      setResolvedTheme(theme);
    }
  }, [theme, handleSystemThemeChange]);

  // 4. 将 resolvedTheme 应用到 DOM 和 localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    // 我们只保存用户的选择（light, dark, system），而不是解析后的结果
    localStorage.setItem('theme', theme);
  }, [resolvedTheme, theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}