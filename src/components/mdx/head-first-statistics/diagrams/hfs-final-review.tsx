/**
 * <HfsFinalReviewDiagram>：深入浅出统计学总复习知识网络图（hfs-final-review 章）。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function HfsFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="深入浅出统计学知识网络" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">深入浅出统计学知识网络</text>
          <ellipse cx={VIEW_W / 2} cy={VIEW_H / 2} rx="60" ry="40" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="2" />
          <text x={VIEW_W / 2} y={VIEW_H / 2 - 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">统计学</text>
          <text x={VIEW_W / 2} y={VIEW_H / 2 + 14} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">知识网络</text>
          <line x1="360.0" y1="200.0" x2="120.0" y2="120.0" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="360.0" y1="200.0" x2="600.0" y2="120.0" stroke="var(--success)" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="360.0" y1="200.0" x2="120.0" y2="280.0" stroke="var(--warning)" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="360.0" y1="200.0" x2="600.0" y2="280.0" stroke="var(--danger)" strokeWidth="1.5" strokeOpacity="0.4" />
          <g>
            <rect x="20.0" y="85.0" width="200" height="70" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" />
            <text x="120.0" y="108.0" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">统计基础</text>
            <text x="120.0" y="126.0" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">频率表·直方图</text>
            <text x="120.0" y="144.0" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">数据可视化</text>
          </g>
          <g>
            <rect x="500.0" y="85.0" width="200" height="70" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" />
            <text x="600.0" y="108.0" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">描述统计</text>
            <text x="600.0" y="126.0" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">均值·标准差</text>
            <text x="600.0" y="144.0" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">分布特征</text>
          </g>
          <g>
            <rect x="20.0" y="245.0" width="200" height="70" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
            <text x="120.0" y="268.0" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">概率分布</text>
            <text x="120.0" y="286.0" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">正态·二项·泊松</text>
            <text x="120.0" y="304.0" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">数学模型</text>
          </g>
          <g>
            <rect x="500.0" y="245.0" width="200" height="70" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.4" />
            <text x="600.0" y="268.0" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">统计推断</text>
            <text x="600.0" y="286.0" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">抽样·置信区间</text>
            <text x="600.0" y="304.0" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">从样本推总体</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">四大板块的因果关系与中心极限定理的桥梁作用</figcaption>
    </figure>
  );
}
