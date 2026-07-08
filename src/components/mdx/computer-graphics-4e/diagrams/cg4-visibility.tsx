/**
 * <Cg4VisibilityDiagram>：可见性与深度缓冲示意图
 *
 * 展示 Z-buffer 算法如何解决可见性问题。
 */

export function Cg4VisibilityDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="可见性与深度缓冲" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">深度缓冲（Z-Buffer）算法</text>
          <text x="360" y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">用深度值判断哪个片段可见</text>

          {/* 三个重叠的矩形代表不同深度的片段 */}
          <text x="130" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">片段 A（z=0.3）</text>
          <rect x="60" y="100" width="120" height="80" rx="4" fill="var(--accent)" fillOpacity="0.3" stroke="var(--accent)" strokeWidth="1.5" />

          <text x="280" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">片段 B（z=0.8）</text>
          <rect x="220" y="110" width="120" height="80" rx="4" fill="var(--success)" fillOpacity="0.3" stroke="var(--success)" strokeWidth="1.5" />

          <text x="430" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">片段 C（z=0.5）</text>
          <rect x="370" y="105" width="120" height="80" rx="4" fill="var(--warning)" fillOpacity="0.3" stroke="var(--warning)" strokeWidth="1.5" />

          {/* Z-Buffer 判定逻辑 */}
          <line x1="280" y1="220" x2="280" y2="250" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#cg4-vis-arrow)" />

          <rect x="120" y="260" width="480" height="80" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="284" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">Z-Buffer 判定规则</text>
          <text x="360" y="306" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">若 fragment.z &lt; zbuffer[x][y]：更新颜色与深度</text>
          <text x="360" y="324" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">若 fragment.z >= zbuffer[x][y]：丢弃该片段</text>

          <text x="360" y="372" textAnchor="middle" fontSize="11" fill="var(--accent)">结论：片段 A 最近（z 最小），写入帧缓冲</text>

          <defs>
            <marker id="cg4-vis-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Z-Buffer 逐像素比较深度值，保留最近的片段作为可见像素</figcaption>
    </figure>
  );
}
