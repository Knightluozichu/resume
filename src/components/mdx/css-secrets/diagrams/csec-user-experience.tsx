/**
 * <CsecUserExperienceDiagram>：用户体验技巧图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function CsecUserExperienceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CSS揭秘用户体验技巧图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            用户体验技巧：滚动、焦点、暗色主题
          </text>

          {/* 平滑滚动 */}
          <rect x="40" y="50" width="200" height="150" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="140" y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">平滑滚动</text>
          <line x1="80" y1="90" x2="80" y2="185" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="2 2" />
          <rect x="70" y="95" width="20" height="30" rx="3" fill="var(--accent)" fillOpacity="0.4" />
          <text x="105" y="114" fontSize="9" fill="var(--text-secondary)">起始位置</text>
          <rect x="70" y="145" width="20" height="30" rx="3" fill="var(--success)" fillOpacity="0.5" />
          <text x="105" y="164" fontSize="9" fill="var(--text-secondary)">目标位置</text>
          {/* 箭头 */}
          <path d="M 80,128 Q 120,120 80,142" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#csec-arrow)" />
          <defs>
            <marker id="csec-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0,0 6,3 0,6" fill="var(--accent)" />
            </marker>
          </defs>
          <text x="140" y="190" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">scroll-behavior: smooth</text>

          {/* 焦点高亮 */}
          <rect x="270" y="50" width="200" height="150" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">焦点高亮</text>
          {/* 键盘 Tab - 有焦点环 */}
          <rect x="295" y="90" width="60" height="28" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="2" />
          <text x="325" y="108" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Tab</text>
          <text x="370" y="108" fontSize="9" fill="var(--accent)">:focus-visible</text>
          <text x="370" y="120" fontSize="9" fill="var(--accent)">有焦点环</text>
          {/* 鼠标点击 - 无焦点环 */}
          <rect x="295" y="140" width="60" height="28" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="none" />
          <text x="325" y="158" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Click</text>
          <text x="370" y="158" fontSize="9" fill="var(--text-tertiary)">:focus:not(:focus-visible)</text>
          <text x="370" y="170" fontSize="9" fill="var(--text-tertiary)">无焦点环</text>

          {/* 暗色主题 */}
          <rect x="500" y="50" width="200" height="150" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="600" y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">暗色主题</text>
          {/* 亮色卡片 */}
          <rect x="520" y="90" width="70" height="50" rx="4" fill="#ffffff" stroke="var(--text-tertiary)" strokeWidth="0.5" />
          <text x="555" y="110" textAnchor="middle" fontSize="9" fill="#333333">Light</text>
          <text x="555" y="124" textAnchor="middle" fontSize="8" fill="#666666">#fff / #333</text>
          {/* 暗色卡片 */}
          <rect x="610" y="90" width="70" height="50" rx="4" fill="#1a1a2e" stroke="var(--text-tertiary)" strokeWidth="0.5" />
          <text x="645" y="110" textAnchor="middle" fontSize="9" fill="#e0e0e0">Dark</text>
          <text x="645" y="124" textAnchor="middle" fontSize="8" fill="#a0a0a0">#1a1a2e / #e0e0e0</text>
          {/* 箭头 */}
          <text x="600" y="160" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&harr;</text>
          <text x="600" y="180" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">prefers-color-scheme</text>
          <text x="600" y="194" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">非简单取反！需调灰度饱和度</text>

          {/* 三者对比表 */}
          <rect x="40" y="220" width="660" height="175" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="60" y="244" fontSize="13" fontWeight="600" fill="var(--text-primary)">三种技巧对比</text>

          <text x="60" y="270" fontSize="11" fontWeight="600" fill="var(--accent)">scroll-behavior: smooth</text>
          <text x="60" y="286" fontSize="9" fill="var(--text-tertiary)">纯 CSS 无 JS、锚点跳转平滑过渡</text>
          <text x="60" y="300" fontSize="9" fill="var(--text-tertiary)">设在 html 影响全局、设在容器影响局部</text>
          <text x="60" y="314" fontSize="9" fill="var(--text-tertiary)">不影响手动滚轮，只影响程序化滚动</text>

          <text x="60" y="340" fontSize="11" fontWeight="600" fill="var(--warning)">:focus-visible</text>
          <text x="60" y="356" fontSize="9" fill="var(--text-tertiary)">浏览器智能判断：键盘导航才显焦点环</text>
          <text x="60" y="370" fontSize="9" fill="var(--text-tertiary)">鼠标点击不触发、Tab 才触发</text>
          <text x="60" y="384" fontSize="9" fill="var(--text-tertiary)">配合 :focus:not(:focus-visible) 去默认环</text>

          <text x="380" y="270" fontSize="11" fontWeight="600" fill="var(--success)">prefers-color-scheme</text>
          <text x="380" y="286" fontSize="9" fill="var(--text-tertiary)">CSS 媒体查询检测系统偏好</text>
          <text x="380" y="300" fontSize="9" fill="var(--text-tertiary)">配合 CSS 变量实现自动切换</text>
          <text x="380" y="314" fontSize="9" fill="var(--text-tertiary)">非简单取反：深灰非纯黑、浅灰非纯白</text>
          <text x="380" y="340" fontSize="9" fill="var(--text-tertiary)">彩色需提亮饱和度保持视觉一致</text>
          <text x="380" y="356" fontSize="9" fill="var(--text-tertiary)">阴影更深更不透明</text>
          <text x="380" y="384" fontSize="9" fill="var(--danger)">注意 FOUC 闪烁：内联关键 CSS 可避免</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        用户体验技巧——scroll-behavior 平滑滚动、:focus-visible 智能焦点、prefers-color-scheme 暗色主题
      </figcaption>
    </figure>
  );
}
