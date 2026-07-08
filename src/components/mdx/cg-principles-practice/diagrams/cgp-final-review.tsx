/**
 * <CgpFinalReviewDiagram>：计算机图形学：原理及实践 总复习图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function CgpFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="计算机图形学原理及实践总复习知识图谱"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            计算机图形学：原理及实践 总复习
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            九大知识点串联与核心关系图
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Center node */}
          <circle cx="360" cy="200" r="50" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="360" y="195" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">计算机</text>
          <text x="360" y="212" textAnchor="middle" fontSize="10" fill="var(--accent)">图形学</text>

          {/* Surrounding nodes */}
          <rect x="80" y="100" width="110" height="44" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="135" y="127" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">导论</text>

          <rect x="305" y="100" width="110" height="44" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="360" y="127" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">光栅</text>

          <rect x="530" y="100" width="110" height="44" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="585" y="127" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">2D/3D</text>

          <rect x="60" y="260" width="110" height="44" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="115" y="287" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">渲染</text>

          <rect x="195" y="260" width="110" height="44" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="250" y="287" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">光照</text>

          <rect x="415" y="260" width="110" height="44" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="470" y="287" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">建模</text>

          <rect x="550" y="260" width="110" height="44" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="605" y="287" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">高级</text>

          {/* Connections */}
          <line x1="190" y1="122" x2="310" y2="175" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />
          <line x1="360" y1="144" x2="360" y2="150" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />
          <line x1="530" y1="122" x2="410" y2="175" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />
          <line x1="170" y1="282" x2="310" y2="235" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />
          <line x1="250" y1="260" x2="330" y2="240" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />
          <line x1="470" y1="260" x2="390" y2="240" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />
          <line x1="550" y1="282" x2="410" y2="235" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />

          <text x="360" y="345" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            导论→光栅→2D/3D（基础链路） | 渲染→光照→建模→高级（应用深化）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        计算机图形学原理及实践总复习——九大知识点核心关系图
      </figcaption>
    </figure>
  );
}
