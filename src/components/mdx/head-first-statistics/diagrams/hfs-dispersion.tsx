/**
 * <HfsDispersionDiagram>：离散程度度量概念图（hfs-dispersion 章）。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function HfsDispersionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="离散程度度量体系" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">离散程度度量体系</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">极差（简单）→ IQR（鲁棒）→ 标准差（精确）</text>
          <g>
            <rect x="40" y="100" width="300" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" />
            <circle cx="56" cy="120" r="4" fill="var(--accent)" />
            <text x="68" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">极差</text>
            <text x="56" y="148" fontSize="11" fill="var(--text-secondary)">max-min</text>
            <text x="56" y="166" fontSize="12" fontWeight="600" fill="var(--accent)">简单但怕异常</text>
          </g>
          <g>
            <rect x="380" y="100" width="300" height="80" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" />
            <circle cx="396" cy="120" r="4" fill="var(--success)" />
            <text x="408" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">四分位距</text>
            <text x="396" y="148" fontSize="11" fill="var(--text-secondary)">Q3-Q1</text>
            <text x="396" y="166" fontSize="12" fontWeight="600" fill="var(--success)">鲁棒·箱线图</text>
          </g>
          <g>
            <rect x="40" y="210" width="300" height="80" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
            <circle cx="56" cy="230" r="4" fill="var(--warning)" />
            <text x="68" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">标准差</text>
            <text x="56" y="258" fontSize="11" fill="var(--text-secondary)">√(Σ(x-x̄)²/(n-1))</text>
            <text x="56" y="276" fontSize="12" fontWeight="600" fill="var(--warning)">利用所有数据</text>
          </g>
          <g>
            <rect x="380" y="210" width="300" height="80" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.4" />
            <circle cx="396" cy="230" r="4" fill="var(--danger)" />
            <text x="408" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">变异系数</text>
            <text x="396" y="258" fontSize="11" fill="var(--text-secondary)">s/x̄</text>
            <text x="396" y="276" fontSize="12" fontWeight="600" fill="var(--danger)">无量纲比较</text>
          </g>
          <rect x="40" y="340" width={VIEW_W - 80} height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="365" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">极差（简单）→ IQR（鲁棒）→ 标准差（精确）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">极差（简单）→ IQR（鲁棒）→ 标准差（精确）</figcaption>
    </figure>
  );
}
