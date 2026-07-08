/**
 * <CsecBorderShapesDiagram>：边框与形状图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function CsecBorderShapesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CSS揭秘边框与形状图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            边框与形状：多重边框与圆角
          </text>

          {/* 单层边框 */}
          <rect x="50" y="55" width="120" height="80" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="3" />
          <text x="110" y="155" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">单层边框</text>
          <text x="110" y="171" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">border: 3px solid</text>

          {/* 多重边框 box-shadow */}
          <rect x="220" y="55" width="120" height="80" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="3" />
          <rect x="215" y="50" width="130" height="90" rx="8" fill="none" stroke="var(--warning)" strokeWidth="3" />
          <rect x="210" y="45" width="140" height="100" rx="10" fill="none" stroke="var(--success)" strokeWidth="3" />
          <text x="280" y="155" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">多重边框</text>
          <text x="280" y="171" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">box-shadow spread 叠加</text>

          {/* outline 方案 */}
          <rect x="390" y="55" width="120" height="80" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="3" />
          <rect x="382" y="47" width="136" height="96" rx="8" fill="none" stroke="var(--danger)" strokeWidth="3" strokeDasharray="4 2" />
          <text x="450" y="155" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">outline 边框</text>
          <text x="450" y="171" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">outline + offset 间距</text>

          {/* 圆角正圆 */}
          <circle cx="630" cy="95" r="38" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="2" />
          <text x="630" y="155" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">正圆</text>
          <text x="630" y="171" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">border-radius: 50%</text>

          {/* spread radius 原理说明 */}
          <rect x="40" y="200" width="660" height="190" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="60" y="224" fontSize="13" fontWeight="600" fill="var(--text-primary)">box-shadow spread radius 多重边框原理</text>

          {/* 原理图：三层环 */}
          <rect x="100" y="245" width="160" height="80" rx="6" fill="var(--accent)" fillOpacity="0.2" stroke="var(--accent)" strokeWidth="2" />
          <text x="180" y="290" textAnchor="middle" fontSize="11" fill="var(--accent)">元素 + border</text>

          <rect x="88" y="233" width="184" height="104" rx="10" fill="none" stroke="var(--warning)" strokeWidth="2" />
          <text x="280" y="262" fontSize="9" fill="var(--warning)">第 1 层 spread: 5px</text>

          <rect x="76" y="221" width="208" height="128" rx="14" fill="none" stroke="var(--success)" strokeWidth="2" />
          <text x="290" y="290" fontSize="9" fill="var(--success)">第 2 层 spread: 10px</text>

          {/* 公式说明 */}
          <text x="420" y="250" fontSize="11" fontWeight="600" fill="var(--text-primary)">spread 递增公式：</text>
          <text x="420" y="272" fontSize="10" fill="var(--text-secondary)">每层 spread = 前面所有层宽度之和</text>
          <text x="420" y="288" fontSize="10" fill="var(--text-secondary)">+ 当前层宽度</text>
          <text x="420" y="316" fontSize="10" fill="var(--text-tertiary)">第 1 层: 5px</text>
          <text x="420" y="332" fontSize="10" fill="var(--text-tertiary)">第 2 层: 5+5 = 10px</text>
          <text x="420" y="348" fontSize="10" fill="var(--text-tertiary)">第 3 层: 5+5+5 = 15px</text>
          <text x="420" y="370" fontSize="10" fill="var(--text-tertiary)">注意：不占布局空间、不响应事件</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        边框与形状——用 box-shadow spread radius 叠加模拟多重边框，outline 控制间距
      </figcaption>
    </figure>
  );
}
