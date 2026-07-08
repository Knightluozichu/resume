/**
 * <UhmUiFrameworkDiagram>：UI 框架与布局系统图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UhmUiFrameworkDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="UI 框架与布局系统图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            UGUI 三层架构
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            容器层 → 组件层 → 数据层
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="580" height="52" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="100" y="124" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--success)">容器层（Canvas）</text>
          <text x="100" y="140" textAnchor="start" fontSize="11" fill="var(--text-secondary)">渲染模式：Overlay / Camera / World Space</text>
          <text x="520" y="130" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">CanvasScaler</text>

          <text x={VIEW_W / 2} y="168" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="90" y="180" width="540" height="52" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="120" y="204" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--accent)">布局层（Layout Group）</text>
          <text x="120" y="220" textAnchor="start" fontSize="11" fill="var(--text-secondary)">Horizontal / Vertical / Grid + ContentSizeFitter</text>
          <text x="500" y="210" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">锚点/轴心</text>

          <text x={VIEW_W / 2} y="248" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="110" y="260" width="500" height="52" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="284" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--warning)">组件层（UI Element）</text>
          <text x="140" y="300" textAnchor="start" fontSize="11" fill="var(--text-secondary)">Text / Image / Button / Slider / Toggle</text>

          <text x={VIEW_W / 2} y="334" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            Canvas 重建策略：频繁更新元素 → 独立子 Canvas
          </text>
          <text x={VIEW_W / 2} y="352" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            层级控制：3-5 层为宜，超过 10 层重建成本指数增长
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        UGUI 三层架构——从 Canvas 容器到布局组件到 UI 元素
      </figcaption>
    </figure>
  );
}
