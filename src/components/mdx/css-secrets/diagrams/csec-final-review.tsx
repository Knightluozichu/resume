/**
 * <CsecFinalReviewDiagram>：全书总复习图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function CsecFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CSS揭秘全书总复习图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            《CSS揭秘》全书总复习——视觉旅程
          </text>

          {/* 中心卡片 */}
          <rect x="250" y="55" width="240" height="70" rx="10" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="82" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">一个卡片从背景到动效</text>
          <text x="370" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">全书十章视觉旅程串联</text>
          <text x="370" y="116" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">渲染层心智模型：用副作用做非标用途</text>

          {/* 第 2-3 章：背景与形状 */}
          <rect x="40" y="150" width="300" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="190" y="172" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">背景与形状（第 2-3 章）</text>
          <text x="190" y="190" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">linear-gradient 铺底 + box-shadow 多重边框 + border-radius 圆角</text>

          {/* 第 4-5 章：裁剪与伪元素 */}
          <rect x="400" y="150" width="300" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="550" y="172" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">裁剪与伪元素（第 4-5 章）</text>
          <text x="550" y="190" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">clip-path 裁斜角 + ::after 伪元素画 tooltip 箭头</text>

          <text x="190" y="224" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <text x="550" y="224" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 第 6-7 章：排版与字体 */}
          <rect x="40" y="238" width="300" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="190" y="260" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">排版与字体（第 6-7 章）</text>
          <text x="190" y="278" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">background-clip:text 渐变文字 + tabular-nums 等宽数字</text>

          {/* 第 8-9 章：交互与动效 */}
          <rect x="400" y="238" width="300" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="550" y="260" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">交互与动效（第 8-9 章）</text>
          <text x="550" y="278" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">scroll-behavior 平滑 + :focus-visible + transform hover</text>

          <text x="190" y="312" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <text x="550" y="312" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 选型判断矩阵 */}
          <rect x="40" y="326" width="660" height="120" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="60" y="350" fontSize="13" fontWeight="600" fill="var(--text-primary)">选型判断矩阵</text>

          <text x="60" y="372" fontSize="10" fill="var(--accent)">条纹背景 → repeating-linear-gradient（矢量、零请求）</text>
          <text x="60" y="388" fontSize="10" fill="var(--accent)">多重边框 → box-shadow spread（不增 DOM）</text>
          <text x="60" y="404" fontSize="10" fill="var(--accent)">三角形 → clip-path: polygon（矢量、可动画）</text>
          <text x="60" y="420" fontSize="10" fill="var(--accent)">渐变文字 → background-clip: text（可搜索）</text>

          <text x="380" y="372" fontSize="10" fill="var(--warning)">tooltip 箭头 → 伪元素 + border（不增 DOM）</text>
          <text x="380" y="388" fontSize="10" fill="var(--warning)">平滑跳转 → scroll-behavior: smooth（纯 CSS）</text>
          <text x="380" y="404" fontSize="10" fill="var(--warning)">暗色主题 → prefers-color-scheme（跟随系统）</text>
          <text x="380" y="420" fontSize="10" fill="var(--warning)">hover 动效 → transform（只合成不重排）</text>

          <text x={VIEW_W / 2} y="450" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            核心心智模型：用 CSS 属性的渲染副作用做非标用途
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书总复习——四阶段视觉旅程串联十章，选型判断矩阵指导方案选择
      </figcaption>
    </figure>
  );
}
