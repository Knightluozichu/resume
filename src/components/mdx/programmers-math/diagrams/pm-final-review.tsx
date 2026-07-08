/**
 * <PmFinalReviewDiagram>：程序员的数学总复习知识网络图（pm-final-review 章）。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function PmFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="程序员的数学知识网络" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">程序员的数学知识网络</text>
          <ellipse cx={VIEW_W / 2} cy={VIEW_H / 2} rx="60" ry="40" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="2" />
          <text x={VIEW_W / 2} y={VIEW_H / 2 - 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">数学思维</text>
          <text x={VIEW_W / 2} y={VIEW_H / 2 + 14} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">知识网络</text>
          <line x1="360.0" y1="200.0" x2="120.0" y2="120.0" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="360.0" y1="200.0" x2="600.0" y2="120.0" stroke="var(--success)" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="360.0" y1="200.0" x2="120.0" y2="280.0" stroke="var(--warning)" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="360.0" y1="200.0" x2="600.0" y2="280.0" stroke="var(--danger)" strokeWidth="1.5" strokeOpacity="0.4" />
          <g>
            <rect x="20.0" y="85.0" width="200" height="70" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" />
            <text x="120.0" y="108.0" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">数学基础</text>
            <text x="120.0" y="126.0" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">0和1·二进制·布尔</text>
            <text x="120.0" y="144.0" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">表示工具</text>
          </g>
          <g>
            <rect x="500.0" y="85.0" width="200" height="70" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" />
            <text x="600.0" y="108.0" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">概率思维</text>
            <text x="600.0" y="126.0" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">排列组合·贝叶斯</text>
            <text x="600.0" y="144.0" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">推理工具</text>
          </g>
          <g>
            <rect x="20.0" y="245.0" width="200" height="70" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
            <text x="120.0" y="268.0" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">统计思维</text>
            <text x="120.0" y="286.0" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">均值·方差·分布</text>
            <text x="120.0" y="304.0" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">分析工具</text>
          </g>
          <g>
            <rect x="500.0" y="245.0" width="200" height="70" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.4" />
            <text x="600.0" y="268.0" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">高级数学</text>
            <text x="600.0" y="286.0" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">递归·加密·RSA</text>
            <text x="600.0" y="304.0" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">综合应用</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">四大板块的因果关系与综合应用</figcaption>
    </figure>
  );
}
