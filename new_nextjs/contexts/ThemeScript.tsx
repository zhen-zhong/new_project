// 防闪烁
import Script from 'next/script';

const setInitialTheme = `
(function() {
  function getInitialTheme() {
    // 1. 优先从 localStorage 获取用户设置
    const storedTheme = window.localStorage.getItem('theme');
    // 如果用户明确选择了 'light' 或 'dark'，则直接使用
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    // 2. 如果是 'system' 或 localStorage 中无记录，则解析系统偏好
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.matches) {
      return 'dark';
    }

    // 3. 默认返回 'light'
    return 'light';
  }

  const theme = getInitialTheme();
  document.documentElement.classList.add(theme);
})();
`;

export function ThemeScript() {
  return (
    <Script
      id="theme-initializer"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: setInitialTheme }}
    />
  );
}