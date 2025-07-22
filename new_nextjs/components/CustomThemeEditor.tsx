// components/CustomThemeEditor.tsx
'use client';

import { useEffect, useState } from 'react';

export function CustomThemeEditor() {
  // 使用 state 来控制 input 的值
  const [primaryColor, setPrimaryColor] = useState('#0070f3');

  // 当颜色变化时，用 JS 修改 CSS 变量
  useEffect(() => {
    // 这里我们添加一个新的 CSS 变量，比如 --primary-color
    document.documentElement.style.setProperty('--primary-color', primaryColor);
  }, [primaryColor]);

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
      <h3 className="font-bold text-lg text-gray-900 dark:text-white">自定义主题颜色</h3>
      <div className="mt-2">
        <label htmlFor="primary-color" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          主色调 (Primary Color)
        </label>
        <input
          id="primary-color"
          type="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
          className="mt-1 block w-full h-10"
        />
      </div>
    </div>
  );
}