/**
 * <GmaContinuousSimulationDiagram>：连续模拟与反馈系统图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GmaContinuousSimulationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="连续模拟与反馈系统图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            连续模拟：积分器与反馈环路
          </text>

          {/* 上半部分：积分器示意 */}
          <text x="160" y="60" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">欧拉积分</text>

          <rect x="60" y="76" width="80" height="36" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="100" y="99" textAnchor="middle" fontSize="10" fill="var(--text-primary)">v(t)</text>

          <line x1="140" y1="94" x2="180" y2="94" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <polygon points="175,90 185,94 175,98" fill="var(--text-tertiary)" />

          <rect x="190" y="76" width="80" height="36" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="230" y="92" textAnchor="middle" fontSize="10" fill="var(--text-primary)">积分</text>
          <text x="230" y="105" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">x += v*dt</text>

          <line x1="270" y1="94" x2="310" y2="94" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <polygon points="305,90 315,94 305,98" fill="var(--text-tertiary)" />

          <rect x="320" y="76" width="80" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="360" y="99" textAnchor="middle" fontSize="10" fill="var(--text-primary)">x(t)</text>

          {/* 时间步标注 */}
          <text x="230" y="132" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">每帧更新——dt 为时间步长</text>

          {/* 下半部分：反馈环路 */}
          <line x1="40" y1="160" x2="680" y2="160" stroke="var(--border)" strokeWidth="1" />

          <text x={VIEW_W / 2} y="186" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">反馈环路</text>

          {/* 正反馈环 */}
          <rect x="50" y="210" width="280" height="150" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="190" y="234" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">正反馈（增强）</text>

          <rect x="70" y="250" width="100" height="30" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="120" y="270" textAnchor="middle" fontSize="10" fill="var(--text-primary)">击杀→经验↑</text>

          <line x1="170" y1="265" x2="210" y2="265" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <polygon points="205,261 215,265 205,269" fill="var(--success)" fillOpacity="0.5" />

          <rect x="220" y="250" width="100" height="30" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="270" y="270" textAnchor="middle" fontSize="10" fill="var(--text-primary)">升级→更强</text>

          {/* 回环箭头 */}
          <path d="M 270 280 Q 270 320 120 320 Q 120 300 120 280" fill="none" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 3" />
          <polygon points="116,285 120,275 124,285" fill="var(--success)" fillOpacity="0.4" />
          <text x="195" y="340" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">滚雪球效应</text>

          {/* 负反馈环 */}
          <rect x="390" y="210" width="280" height="150" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="530" y="234" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">负反馈（平衡）</text>

          <rect x="410" y="250" width="100" height="30" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="460" y="270" textAnchor="middle" fontSize="10" fill="var(--text-primary)">领先→ handicap↑</text>

          <line x1="510" y1="265" x2="550" y2="265" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.5" />
          <polygon points="545,261 555,265 545,269" fill="var(--warning)" fillOpacity="0.5" />

          <rect x="560" y="250" width="100" height="30" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="610" y="270" textAnchor="middle" fontSize="10" fill="var(--text-primary)">追赶更容易</text>

          {/* 回环箭头 */}
          <path d="M 610 280 Q 610 320 460 320 Q 460 300 460 280" fill="none" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 3" />
          <polygon points="456,285 460,275 464,285" fill="var(--warning)" fillOpacity="0.4" />
          <text x="535" y="340" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">橡皮筋效应</text>

          {/* 底部对比 */}
          <text x={VIEW_W / 2} y="384" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            正反馈放大差异（滚雪球），负反馈缩小差异（橡皮筋）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        连续模拟——积分器每帧更新状态，正/负反馈环路塑造动态行为
      </figcaption>
    </figure>
  );
}
