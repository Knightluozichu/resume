/**
 * <MgaInterestManagementDiagram>：AOI 兴趣管理图解（九宫格 + 十字链表）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function MgaInterestManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="AOI 兴趣管理图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            AOI 兴趣管理：九宫格 vs 十字链表
          </text>

          {/* 九宫格 AOI */}
          <text x="170" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">九宫格 AOI</text>

          {/* 9 个格子 */}
          {[
            { x: 60, y: 70, label: "" },
            { x: 140, y: 70, label: "" },
            { x: 220, y: 70, label: "" },
            { x: 60, y: 150, label: "" },
            { x: 140, y: 150, label: "中心", highlight: true },
            { x: 220, y: 150, label: "" },
            { x: 60, y: 230, label: "" },
            { x: 140, y: 230, label: "" },
            { x: 220, y: 230, label: "" },
          ].map((g, i) => (
            <g key={i}>
              <rect
                x={g.x}
                y={g.y}
                width="80"
                height="80"
                fill={g.highlight ? "var(--success)" : "var(--success)"}
                fillOpacity={g.highlight ? 0.2 : 0.06}
                stroke="var(--success)"
                strokeWidth={g.highlight ? 1.5 : 0.8}
              />
              {g.highlight && (
                <text x={g.x + 40} y={g.y + 44} textAnchor="middle" fontSize="9" fill="var(--success)">玩家</text>
              )}
            </g>
          ))}

          {/* 散点实体 */}
          <circle cx="100" cy="105" r="3" fill="var(--accent)" />
          <circle cx="180" cy="95" r="3" fill="var(--accent)" />
          <circle cx="260" cy="115" r="3" fill="var(--accent)" />
          <circle cx="90" cy="190" r="3" fill="var(--accent)" />
          <circle cx="260" cy="200" r="3" fill="var(--accent)" />
          <circle cx="110" cy="270" r="3" fill="var(--accent)" />
          <circle cx="200" cy="280" r="3" fill="var(--accent)" />
          <circle cx="270" cy="260" r="3" fill="var(--accent)" />
          <circle cx="55" cy="115" r="3" fill="var(--text-tertiary)" />
          <circle cx="300" cy="190" r="3" fill="var(--text-tertiary)" />

          {/* 九宫格高亮区域标注 */}
          <rect x="60" y="70" width="240" height="240" fill="none" stroke="var(--success)" strokeWidth="1.5" strokeDasharray="6,3" strokeOpacity="0.5" />
          <text x="170" y="332" textAnchor="middle" fontSize="10" fill="var(--success)">查询：周围 9 格内实体</text>
          <text x="170" y="348" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">O(1) 定位 + O(K) 遍历</text>
          <text x="170" y="368" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">适合：密度均匀</text>

          {/* 十字链表 AOI */}
          <text x="570" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">十字链表 AOI</text>

          {/* 十字线 */}
          <line x1="430" y1="190" x2="710" y2="190" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="570" y1="70" x2="570" y2="310" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.3" />

          {/* X 轴链表节点 */}
          {[
            { x: 460, y: 190 },
            { x: 500, y: 190 },
            { x: 540, y: 190, highlight: true },
            { x: 600, y: 190 },
            { x: 650, y: 190 },
            { x: 695, y: 190 },
          ].map((n, i) => (
            <g key={`x${i}`}>
              <circle cx={n.x} cy={n.y} r={n.highlight ? 6 : 4} fill={n.highlight ? "var(--warning)" : "var(--accent)"} />
              {n.highlight && <text x={n.x} y={n.y - 12} textAnchor="middle" fontSize="8" fill="var(--warning)">P</text>}
            </g>
          ))}

          {/* Y 轴链表节点 */}
          {[
            { x: 570, y: 90 },
            { x: 570, y: 130 },
            { x: 570, y: 250 },
            { x: 570, y: 290 },
          ].map((n, i) => (
            <circle key={`y${i}`} cx={n.x} cy={n.y} r="4" fill="var(--accent)" />
          ))}

          {/* 视野范围框 */}
          <rect x="490" y="150" width="120" height="80" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.5" strokeDasharray="4,3" />

          {/* 散布的实体 */}
          <circle cx="475" cy="190" r="3" fill="var(--accent)" />
          <circle cx="525" cy="190" r="3" fill="var(--accent)" />
          <circle cx="615" cy="190" r="3" fill="var(--accent)" />
          <circle cx="570" cy="110" r="3" fill="var(--accent)" />
          <circle cx="570" cy="270" r="3" fill="var(--accent)" />

          <text x="570" y="332" textAnchor="middle" fontSize="10" fill="var(--warning)">查询：X/Y 范围取交集</text>
          <text x="570" y="348" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">O(logN) 定位 + O(K) 遍历</text>
          <text x="570" y="368" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--warning)">适合：稀疏不均匀</text>

          {/* 底部对比 */}
          <rect x="40" y="390" width="660" height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="408" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">
            流量对比：无 AOI O(N²) → 有 AOI O(N×K)
          </text>
          <text x={VIEW_W / 2} y="424" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            万人同服 N=10000, K=50 → 流量降 200 倍
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        AOI 兴趣管理——九宫格（密度均匀）与十字链表（稀疏不均匀）的对比
      </figcaption>
    </figure>
  );
}
