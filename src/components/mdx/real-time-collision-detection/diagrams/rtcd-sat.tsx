/**
 * <RtcdSatDiagram>：SAT 分离轴定理图解（投影区间与分离轴判定）。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 430;

export function RtcdSatDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="SAT 分离轴定理投影区间与分离判定图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            SAT 分离轴定理：投影区间分离即无碰撞
          </text>

          {/* 上半部分：两个分离的凸体 + 分离轴 */}
          <rect x="20" y="50" width="700" height="180" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="40" y="72" fontSize="12" fontWeight="600" fill="var(--success)">情形 A：存在分离轴 → 未碰撞</text>

          {/* 凸体 A（矩形，略旋转） */}
          <g transform="rotate(-8 180 150)">
            <rect x="130" y="115" width="100" height="70" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.5" />
          </g>
          <text x="180" y="155" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">A</text>

          {/* 凸体 B（矩形） */}
          <rect x="400" y="120" width="100" height="70" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="450" y="160" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">B</text>

          {/* 分离轴 L（水平方向） */}
          <line x1="80" y1="210" x2="560" y2="210" stroke="var(--accent)" strokeWidth="1.5" />
          <polygon points="560,210 552,206 552,214" fill="var(--accent)" />
          <text x="570" y="214" fontSize="11" fill="var(--accent)">L（分离轴）</text>

          {/* 投影虚线 */}
          <line x1="180" y1="185" x2="180" y2="210" stroke="var(--text-tertiary)" strokeWidth="0.6" strokeDasharray="2 2" />
          <line x1="450" y1="190" x2="450" y2="210" stroke="var(--text-tertiary)" strokeWidth="0.6" strokeDasharray="2 2" />

          {/* 投影区间 A（在 L 上） */}
          <line x1="130" y1="210" x2="230" y2="210" stroke="var(--success)" strokeWidth="4" />
          <text x="180" y="225" textAnchor="middle" fontSize="9" fill="var(--success)">proj(A)</text>

          {/* 投影区间 B（在 L 上，与 A 分离） */}
          <line x1="400" y1="210" x2="500" y2="210" stroke="var(--warning)" strokeWidth="4" />
          <text x="450" y="225" textAnchor="middle" fontSize="9" fill="var(--warning)">proj(B)</text>

          {/* 间隙标记 */}
          <text x="315" y="206" textAnchor="middle" fontSize="14" fill="var(--accent)">&harr;</text>
          <text x="315" y="196" textAnchor="middle" fontSize="9" fill="var(--accent)">间隙 &gt; 0</text>

          {/* 下半部分：两个重叠的凸体，无分离轴 */}
          <rect x="20" y="246" width="700" height="170" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="40" y="268" fontSize="12" fontWeight="600" fill="var(--warning)">情形 B：所有轴投影都重叠 → 碰撞</text>

          {/* 凸体 A */}
          <g transform="rotate(-8 200 340)">
            <rect x="140" y="300" width="120" height="80" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.5" />
          </g>
          <text x="200" y="345" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">A</text>

          {/* 凸体 B（与 A 重叠） */}
          <g transform="rotate(10 340 345)">
            <rect x="280" y="305" width="120" height="80" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1.5" />
          </g>
          <text x="340" y="350" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">B</text>

          {/* 候选轴 1：A 的面法向 */}
          <line x1="120" y1="395" x2="480" y2="395" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.6" />
          <text x="490" y="399" fontSize="10" fill="var(--accent)">轴1</text>
          <line x1="140" y1="395" x2="260" y2="395" stroke="var(--success)" strokeWidth="3" />
          <line x1="200" y1="395" x2="380" y2="395" stroke="var(--warning)" strokeWidth="3" />

          {/* 候选轴 2：B 的面法向 */}
          <line x1="120" y1="378" x2="480" y2="378" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="490" y="382" fontSize="10" fill="var(--text-tertiary)">轴2</text>
          <line x1="150" y1="378" x2="280" y2="378" stroke="var(--success)" strokeWidth="3" />
          <line x1="220" y1="378" x2="400" y2="378" stroke="var(--warning)" strokeWidth="3" />

          <text x="180" y="412" fontSize="9" fill="var(--text-secondary)">两轴投影都重叠</text>

          {/* 右侧公式 */}
          <rect x="540" y="290" width="170" height="100" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="625" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">SAT 判定</text>
          <text x="555" y="332" fontSize="10" fill="var(--text-secondary)">候选轴 = A 面法向</text>
          <text x="555" y="348" fontSize="10" fill="var(--text-secondary)">  + B 面法向</text>
          <text x="555" y="366" fontSize="10" fill="var(--text-secondary)">  + 叉积（3D）</text>
          <text x="555" y="384" fontSize="10" fontWeight="600" fill="var(--accent)">全重叠 &rArr; 碰撞</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        SAT——将两凸体投影到候选轴上，任一轴区间分离即未碰撞，全部重叠则碰撞
      </figcaption>
    </figure>
  );
}
