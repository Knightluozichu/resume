/**
 * <PmPermutationsDiagram>：排列与组合概念图（pm-permutations 章）。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function PmPermutationsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="排列组合计数体系" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">排列组合计数体系</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">乘法/加法原理 → 排列/组合 → 容斥原理</text>
          <g>
            <rect x="40" y="100" width="300" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" />
            <circle cx="56" cy="120" r="4" fill="var(--accent)" />
            <text x="68" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">排列</text>
            <text x="56" y="148" fontSize="11" fill="var(--text-secondary)">有序 P(n,k)</text>
            <text x="56" y="166" fontSize="12" fontWeight="600" fill="var(--accent)">n!/(n-k)!</text>
          </g>
          <g>
            <rect x="380" y="100" width="300" height="80" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" />
            <circle cx="396" cy="120" r="4" fill="var(--success)" />
            <text x="408" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">组合</text>
            <text x="396" y="148" fontSize="11" fill="var(--text-secondary)">无序 C(n,k)</text>
            <text x="396" y="166" fontSize="12" fontWeight="600" fill="var(--success)">n!/(k!(n-k)!)</text>
          </g>
          <g>
            <rect x="40" y="210" width="300" height="80" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
            <circle cx="56" cy="230" r="4" fill="var(--warning)" />
            <text x="68" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">乘法原理</text>
            <text x="56" y="258" fontSize="11" fill="var(--text-secondary)">分步 m×n</text>
            <text x="56" y="276" fontSize="12" fontWeight="600" fill="var(--warning)">连续步骤</text>
          </g>
          <g>
            <rect x="380" y="210" width="300" height="80" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.4" />
            <circle cx="396" cy="230" r="4" fill="var(--danger)" />
            <text x="408" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">容斥原理</text>
            <text x="396" y="258" fontSize="11" fill="var(--text-secondary)">多退少补</text>
            <text x="396" y="276" fontSize="12" fontWeight="600" fill="var(--danger)">|A∪B|=|A|+|B|-|A∩B|</text>
          </g>
          <rect x="40" y="340" width={VIEW_W - 80} height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="365" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">乘法/加法原理 → 排列/组合 → 容斥原理</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">乘法/加法原理 → 排列/组合 → 容斥原理</figcaption>
    </figure>
  );
}
