/**
 * <RtrFinalReviewDiagram>：实时渲染第4版总复习图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function RtrFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="实时渲染第4版总复习知识图谱"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            实时渲染第4版总复习
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            九大知识点串联与核心关系图
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Center node */}
          <circle cx="360" cy="200" r="50" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="360" y="195" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">实时渲染</text>
          <text x="360" y="212" textAnchor="middle" fontSize="10" fill="var(--accent)">核心</text>

          {/* Surrounding nodes */}
          <rect x="80" y="100" width="110" height="44" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="135" y="127" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">管线</text>

          <rect x="305" y="100" width="110" height="44" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="360" y="127" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">变换</text>

          <rect x="530" y="100" width="110" height="44" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="585" y="127" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">着色</text>

          <rect x="60" y="260" width="110" height="44" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="115" y="287" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">纹理</text>

          <rect x="305" y="260" width="110" height="44" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="360" y="287" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">BRDF</text>

          <rect x="550" y="260" width="110" height="44" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="605" y="287" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">阴影GI</text>

          {/* Connections */}
          <line x1="190" y1="122" x2="310" y2="175" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />
          <line x1="360" y1="144" x2="360" y2="150" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />
          <line x1="530" y1="122" x2="410" y2="175" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />
          <line x1="170" y1="282" x2="310" y2="230" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />
          <line x1="360" y1="260" x2="360" y2="250" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />
          <line x1="550" y1="282" x2="410" y2="230" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />

          {/* Key relationships */}
          <text x="360" y="345" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            管线→变换→着色（基础链路） | 纹理→BRDF→阴影GI（质量提升） | 优化（贯穿全程）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        实时渲染第4版总复习——九大知识点核心关系图
      </figcaption>
    </figure>
  );
}
