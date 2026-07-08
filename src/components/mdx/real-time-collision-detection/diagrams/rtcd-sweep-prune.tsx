/**
 * <RtcdSweepPruneDiagram>：Sweep and Prune 粗粒度碰撞检测图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function RtcdSweepPruneDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Sweep and Prune 一维排序法粗粒度碰撞检测图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Sweep and Prune：一维排序端点法
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            对每条轴的 min/max 端点排序，扫掠时维护活动列表检测区间重叠
          </text>

          {/* 数轴 */}
          <line x1="40" y1="200" x2="700" y2="200" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <polygon points="700,200 692,196 692,204" fill="var(--text-tertiary)" />
          <text x="708" y="204" fontSize="11" fill="var(--text-tertiary)">x</text>

          {/* 刻度 */}
          {[100, 200, 300, 400, 500, 600].map((px) => (
            <line key={px} x1={px} y1="197" x2={px} y2="203" stroke="var(--text-tertiary)" strokeWidth="1" />
          ))}

          {/* 物体 A 区间 [80, 220] */}
          <line x1="80" y1="170" x2="220" y2="170" stroke="var(--success)" strokeWidth="3" />
          <circle cx="80" cy="170" r="5" fill="var(--success)" />
          <circle cx="220" cy="170" r="5" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="1.5" />
          <text x="80" y="158" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">A.min</text>
          <text x="220" y="158" textAnchor="middle" fontSize="10" fill="var(--success)">A.max</text>
          <text x="150" y="186" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">A</text>

          {/* 物体 B 区间 [160, 320]（与 A 重叠） */}
          <line x1="160" y1="225" x2="320" y2="225" stroke="var(--warning)" strokeWidth="3" />
          <circle cx="160" cy="225" r="5" fill="var(--warning)" />
          <circle cx="320" cy="225" r="5" fill="var(--warning)" fillOpacity="0.4" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="160" y="244" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">B.min</text>
          <text x="320" y="244" textAnchor="middle" fontSize="10" fill="var(--warning)">B.max</text>
          <text x="240" y="216" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">B</text>

          {/* 重叠区域标记 */}
          <rect x="160" y="166" width="60" height="62" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" />
          <text x="190" y="200" textAnchor="middle" fontSize="9" fill="var(--accent)">重叠</text>

          {/* 物体 C 区间 [450, 620]（与 A、B 都不重叠） */}
          <line x1="450" y1="170" x2="620" y2="170" stroke="var(--text-tertiary)" strokeWidth="3" />
          <circle cx="450" cy="170" r="5" fill="var(--text-tertiary)" />
          <circle cx="620" cy="170" r="5" fill="var(--text-tertiary)" fillOpacity="0.4" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="535" y="186" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-secondary)">C</text>

          {/* 扫掠指针 */}
          <line x1="160" y1="130" x2="160" y2="265" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3" />
          <polygon points="155,128 165,128 160,118" fill="var(--accent)" />
          <text x="160" y="110" textAnchor="middle" fontSize="10" fill="var(--accent)">扫掠指针</text>

          {/* 排序后的端点序列 */}
          <rect x="30" y="286" width="680" height="120" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="50" y="308" fontSize="12" fontWeight="600" fill="var(--accent)">排序后端点序列（升序扫掠）</text>

          {/* 端点方块 */}
          <g fontSize="9">
            <rect x="70" y="320" width="56" height="24" rx="4" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="1" />
            <text x="98" y="335" textAnchor="middle" fill="var(--success)">A.min</text>

            <rect x="134" y="320" width="56" height="24" rx="4" fill="var(--warning)" fillOpacity="0.2" stroke="var(--warning)" strokeWidth="1" />
            <text x="162" y="335" textAnchor="middle" fill="var(--warning)">B.min</text>

            <rect x="198" y="320" width="56" height="24" rx="4" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
            <text x="226" y="335" textAnchor="middle" fill="var(--success)">A.max</text>

            <rect x="262" y="320" width="56" height="24" rx="4" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
            <text x="290" y="335" textAnchor="middle" fill="var(--warning)">B.max</text>

            <rect x="326" y="320" width="56" height="24" rx="4" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1" />
            <text x="354" y="335" textAnchor="middle" fill="var(--text-secondary)">C.min</text>

            <rect x="390" y="320" width="56" height="24" rx="4" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="1" />
            <text x="418" y="335" textAnchor="middle" fill="var(--text-secondary)">C.max</text>
          </g>

          <text x="50" y="368" fontSize="10" fill="var(--text-secondary)">
            规则：遇到 .min 加入活动集，遇到 .max 移出；活动集内两两配对为候选对
          </text>
          <text x="50" y="386" fontSize="10" fill="var(--success)">
            A.min 入集 → B.min 入集（A 在集中，配对 A-B）→ A.max 出集 → B.max 出集
          </text>
          <text x="50" y="400" fontSize="10" fill="var(--text-tertiary)">
            C.min/C.max 期间活动集内无其他物体，C 不产生候选对——高效剔除
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Sweep and Prune——排序端点后扫掠，活动集内物体配对为粗粒度候选对
      </figcaption>
    </figure>
  );
}
