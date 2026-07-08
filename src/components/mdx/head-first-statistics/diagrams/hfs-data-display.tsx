/**
 * <HfsDataDisplayDiagram>：数据展示与可视化概念图（hfs-data-display 章）。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function HfsDataDisplayDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="数据类型与可视化选择" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">数据类型与可视化选择</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">名目型→条形图/饼图，数值型→直方图/折线图</text>
          <g>
            <rect x="40" y="100" width="300" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" />
            <circle cx="56" cy="120" r="4" fill="var(--accent)" />
            <text x="68" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">名目型数据</text>
            <text x="56" y="148" fontSize="11" fill="var(--text-secondary)">无序类别</text>
            <text x="56" y="166" fontSize="12" fontWeight="600" fill="var(--accent)">条形图·饼图</text>
          </g>
          <g>
            <rect x="380" y="100" width="300" height="80" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" />
            <circle cx="396" cy="120" r="4" fill="var(--success)" />
            <text x="408" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">数值型数据</text>
            <text x="396" y="148" fontSize="11" fill="var(--text-secondary)">有大小关系</text>
            <text x="396" y="166" fontSize="12" fontWeight="600" fill="var(--success)">直方图·折线图</text>
          </g>
          <g>
            <rect x="40" y="210" width="300" height="80" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
            <circle cx="56" cy="230" r="4" fill="var(--warning)" />
            <text x="68" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">频率表</text>
            <text x="56" y="258" fontSize="11" fill="var(--text-secondary)">分组统计频数</text>
            <text x="56" y="276" fontSize="12" fontWeight="600" fill="var(--warning)">组距=(max-min)/k</text>
          </g>
          <g>
            <rect x="380" y="210" width="300" height="80" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.4" />
            <circle cx="396" cy="230" r="4" fill="var(--danger)" />
            <text x="408" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">累积频率</text>
            <text x="396" y="258" fontSize="11" fill="var(--text-secondary)">逐组累加</text>
            <text x="396" y="276" fontSize="12" fontWeight="600" fill="var(--danger)">读百分位数</text>
          </g>
          <rect x="40" y="340" width={VIEW_W - 80} height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="365" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">名目型→条形图/饼图，数值型→直方图/折线图</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">名目型→条形图/饼图，数值型→直方图/折线图</figcaption>
    </figure>
  );
}
