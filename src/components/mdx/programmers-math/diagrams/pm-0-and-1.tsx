/**
 * <PmZeroAndOneDiagram>：0 的故事与二进制概念图（pm-0-and-1 章）。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function PmZeroAndOneDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="从 0 到二进制到布尔代数" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">从 0 到二进制到布尔代数</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">0 的意义 → 二进制表示 → 布尔逻辑运算</text>
          <g>
            <rect x="40" y="100" width="300" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" />
            <circle cx="56" cy="120" r="4" fill="var(--accent)" />
            <text x="68" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">零</text>
            <text x="56" y="148" fontSize="11" fill="var(--text-secondary)">占位符·原点·没有</text>
            <text x="56" y="166" fontSize="12" fontWeight="600" fill="var(--accent)">位值制基础</text>
          </g>
          <g>
            <rect x="380" y="100" width="300" height="80" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" />
            <circle cx="396" cy="120" r="4" fill="var(--success)" />
            <text x="408" y="125" fontSize="13" fontWeight="700" fill="var(--text-primary)">二进制</text>
            <text x="396" y="148" fontSize="11" fill="var(--text-secondary)">基数为2的记数法</text>
            <text x="396" y="166" fontSize="12" fontWeight="600" fill="var(--success)">13→1101</text>
          </g>
          <g>
            <rect x="40" y="210" width="300" height="80" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
            <circle cx="56" cy="230" r="4" fill="var(--warning)" />
            <text x="68" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">布尔代数</text>
            <text x="56" y="258" fontSize="11" fill="var(--text-secondary)">AND/OR/NOT/XOR</text>
            <text x="56" y="276" fontSize="12" fontWeight="600" fill="var(--warning)">逻辑运算基础</text>
          </g>
          <g>
            <rect x="380" y="210" width="300" height="80" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.4" />
            <circle cx="396" cy="230" r="4" fill="var(--danger)" />
            <text x="408" y="235" fontSize="13" fontWeight="700" fill="var(--text-primary)">位运算应用</text>
            <text x="396" y="258" fontSize="11" fill="var(--text-secondary)">权限·颜色·地址</text>
            <text x="396" y="276" fontSize="12" fontWeight="600" fill="var(--danger)">位掩码管理</text>
          </g>
          <rect x="40" y="340" width={VIEW_W - 80} height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="365" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">0 的意义 → 二进制表示 → 布尔逻辑运算</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">0 的意义 → 二进制表示 → 布尔逻辑运算</figcaption>
    </figure>
  );
}
