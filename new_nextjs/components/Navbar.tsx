// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Github, Menu, X } from 'lucide-react';

// 导航链接数据
const navLinks = [
  { name: '主页', href: '/home' },
  { name: '博客', href: '/blog' },
  { name: '项目', href: '/projects' },
  { name: '关于', href: '/about' },
];

export function Navbar() {
  // 用于移动端菜单的开关状态
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // 获取当前路径，用于高亮激活的链接
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* 左侧：Logo */}
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Nexty</span>
          </Link>
        </div>

        {/* 中间：桌面端导航 */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-foreground/80 ${
                pathname === link.href ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 右侧：功能区 */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* 主题切换器 */}
          <ThemeSwitcher />

          {/* GitHub 图标 */}
          <Link href="https://github.com/your-username/your-repo" target="_blank" rel="noopener noreferrer">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
              <Github className="h-5 w-5" />
            </div>
          </Link>

          {/* 登录按钮 */}
          <Link href="/login">
            <div className="hidden sm:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              登录
            </div>
          </Link>
          
          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden rounded-md p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* 移动端展开菜单 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm">
          <nav className="flex flex-col items-start space-y-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)} // 点击链接后关闭菜单
                className={`w-full rounded-md p-2 text-left transition-colors hover:bg-accent ${
                  pathname === link.href ? 'font-bold text-primary' : 'text-foreground/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* 移动端也显示登录按钮 */}
            <Link href="/login" className="w-full">
                <div className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                    登录
                </div>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}