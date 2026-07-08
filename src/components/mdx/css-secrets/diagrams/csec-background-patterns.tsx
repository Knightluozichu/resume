/**
 * <CsecBackgroundPatternsDiagram>：背景与条纹图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function CsecBackgroundPatternsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CSS揭秘背景与条纹图案图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            背景与条纹：纯 CSS 图案生成
          </text>

          {/* 水平条纹 */}
          <rect x="40" y="50" width="200" height="140" rx="6" fill="var(--accent)" fillOpacity="0.15" />
          <rect x="40" y="50" width="200" height="20" fill="var(--accent)" fillOpacity="0.5" />
          <rect x="40" y="90" width="200" height="20" fill="var(--accent)" fillOpacity="0.5" />
          <rect x="40" y="130" width="200" height="20" fill="var(--accent)" fillOpacity="0.5" />
          <rect x="40" y="170" width="200" height="20" fill="var(--accent)" fillOpacity="0.5" />
          <text x="140" y="210" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">水平条纹</text>
          <text x="140" y="226" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">repeating-linear-gradient</text>
          <text x="140" y="238" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">to bottom, 色标重合</text>

          {/* 垂直条纹 */}
          <rect x="270" y="50" width="200" height="140" rx="6" fill="var(--warning)" fillOpacity="0.1" />
          <rect x="270" y="50" width="20" height="140" fill="var(--warning)" fillOpacity="0.5" />
          <rect x="310" y="50" width="20" height="140" fill="var(--warning)" fillOpacity="0.5" />
          <rect x="350" y="50" width="20" height="140" fill="var(--warning)" fillOpacity="0.5" />
          <rect x="390" y="50" width="20" height="140" fill="var(--warning)" fillOpacity="0.5" />
          <rect x="430" y="50" width="20" height="140" fill="var(--warning)" fillOpacity="0.5" />
          <text x="370" y="210" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">垂直条纹</text>
          <text x="370" y="226" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">repeating-linear-gradient</text>
          <text x="370" y="238" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">to right, 色标重合</text>

          {/* 网格背景 */}
          <rect x="500" y="50" width="200" height="140" rx="6" fill="var(--success)" fillOpacity="0.08" />
          <line x1="540" y1="50" x2="540" y2="190" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.5" />
          <line x1="580" y1="50" x2="580" y2="190" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.5" />
          <line x1="620" y1="50" x2="620" y2="190" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.5" />
          <line x1="660" y1="50" x2="660" y2="190" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.5" />
          <line x1="500" y1="85" x2="700" y2="85" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.5" />
          <line x1="500" y1="120" x2="700" y2="120" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.5" />
          <line x1="500" y1="155" x2="700" y2="155" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="600" y="210" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">网格背景</text>
          <text x="600" y="226" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">多重 background 叠加</text>
          <text x="600" y="238" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">水平线 + 垂直线</text>

          {/* 色标重合原理说明 */}
          <rect x="40" y="270" width="660" height="130" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="60" y="294" fontSize="13" fontWeight="600" fill="var(--text-primary)">色标重合产生硬边原理</text>

          {/* 渐变条：平滑过渡 */}
          <text x="60" y="318" fontSize="10" fill="var(--text-secondary)">色标有间距 → 平滑渐变：</text>
          <defs>
            <linearGradient id="csec-grad-smooth" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--warning)" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <rect x="240" y="308" width="300" height="16" rx="3" fill="url(#csec-grad-smooth)" />

          {/* 渐变条：硬边条纹 */}
          <text x="60" y="348" fontSize="10" fill="var(--text-secondary)">色标重合 → 硬边条纹：</text>
          <defs>
            <linearGradient id="csec-grad-stripe" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.6" />
              <stop offset="33%" stopColor="var(--accent)" stopOpacity="0.6" />
              <stop offset="33%" stopColor="var(--warning)" stopOpacity="0.6" />
              <stop offset="66%" stopColor="var(--warning)" stopOpacity="0.6" />
              <stop offset="66%" stopColor="var(--success)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--success)" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <rect x="240" y="338" width="300" height="16" rx="3" fill="url(#csec-grad-stripe)" />

          <text x="60" y="378" fontSize="10" fill="var(--text-tertiary)">
            关键：相邻色标位置相同 → 插值区间为零 → 颜色瞬间跳变 → 硬边
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        背景与条纹——用 repeating-linear-gradient 色标重合生成纯 CSS 条纹、网格等周期性图案
      </figcaption>
    </figure>
  );
}
