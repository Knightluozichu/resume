/**
 * <GncCongestionControlDiagram>：拥塞控制——AIMD 锯齿图与 BBR vs CUBIC 对比。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function GncCongestionControlDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="拥塞控制算法 AIMD 与 BBR 对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            拥塞控制：AIMD 锯齿与 BBR vs CUBIC
          </text>

          {/* 左侧：AIMD 锯齿图 */}
          <rect x="20" y="48" width="340" height="340" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="190" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">AIMD：加性增 / 乘性减</text>

          {/* 坐标轴 */}
          <line x1="60" y1="90" x2="60" y2="360" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="60" y1="360" x2="330" y2="360" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="50" y="100" textAnchor="end" fontSize="9" fill="var(--text-secondary)">cwnd</text>
          <text x="335" y="374" textAnchor="end" fontSize="9" fill="var(--text-secondary)">时间</text>

          {/* 锯齿折线：线性上升到峰值，丢包后减半，再线性上升 */}
          <polyline
            points="60,340 100,300 140,260 180,220 180,290 220,250 260,210 260,275 300,235 330,195"
            fill="none"
            stroke="var(--success)"
            strokeWidth="2"
          />
          {/* 丢包标记 */}
          <circle cx="180" cy="220" r="4" fill="var(--danger)" />
          <text x="188" y="216" fontSize="9" fill="var(--danger)">丢包减半</text>
          <circle cx="260" cy="210" r="4" fill="var(--danger)" />
          <text x="268" y="206" fontSize="9" fill="var(--danger)">丢包减半</text>

          {/* 标注 */}
          <text x="120" y="282" fontSize="9" fill="var(--success)">加性增（每 RTT +1）</text>
          <text x="195" y="312" fontSize="9" fill="var(--danger)">乘性减（减半）</text>

          <text x="190" y="378" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">正常时线性增长，丢包时减半</text>

          {/* 右侧：BBR vs CUBIC 延迟对比 */}
          <rect x="380" y="48" width="340" height="340" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="550" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">BBR vs CUBIC：延迟表现</text>

          {/* 坐标轴 */}
          <line x1="420" y1="90" x2="420" y2="360" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="420" y1="360" x2="690" y2="360" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="410" y="100" textAnchor="end" fontSize="9" fill="var(--text-secondary)">延迟</text>
          <text x="695" y="374" textAnchor="end" fontSize="9" fill="var(--text-secondary)">时间</text>

          {/* CUBIC 曲线：延迟随时间飙升 */}
          <polyline
            points="420,330 460,320 500,300 540,260 580,200 620,150 660,120 690,110"
            fill="none"
            stroke="var(--danger)"
            strokeWidth="2"
          />
          <text x="640" y="105" fontSize="10" fontWeight="600" fill="var(--danger)">CUBIC</text>
          <text x="560" y="190" fontSize="9" fill="var(--danger)">bufferbloat</text>
          <text x="560" y="204" fontSize="9" fill="var(--danger)">延迟飙升</text>

          {/* BBR 曲线：延迟平稳 */}
          <polyline
            points="420,335 460,333 500,334 540,332 580,334 620,333 660,334 690,333"
            fill="none"
            stroke="var(--success)"
            strokeWidth="2"
          />
          <text x="640" y="328" fontSize="10" fontWeight="600" fill="var(--success)">BBR</text>
          <text x="540" y="322" fontSize="9" fill="var(--success)">延迟 ≈ 最小 RTT</text>

          {/* BDP 标注 */}
          <line x1="420" y1="333" x2="690" y2="333" stroke="var(--success)" strokeWidth="0.5" strokeDasharray="3,3" />
          <text x="550" y="350" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">cwnd = BDP = 带宽 × RTT</text>

          <text x="550" y="378" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">BBR 不等丢包，主动探测带宽</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        拥塞控制算法——AIMD 锯齿型窗口调节与 BBR/CUBIC 延迟表现对比
      </figcaption>
    </figure>
  );
}
