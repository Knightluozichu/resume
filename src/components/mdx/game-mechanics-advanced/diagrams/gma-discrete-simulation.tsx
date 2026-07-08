/**
 * <GmaDiscreteSimulationDiagram>：离散事件模拟图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GmaDiscreteSimulationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="离散事件模拟图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            离散事件模拟：事件队列驱动
          </text>

          {/* 时间轴 */}
          <line x1="60" y1="340" x2="660" y2="340" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <polygon points="655,335 665,340 655,345" fill="var(--text-tertiary)" />
          <text x="670" y="344" fontSize="11" fill="var(--text-secondary)">t</text>

          {/* 事件标记 */}
          {[80, 200, 340, 480, 600].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="330" x2={x} y2="350" stroke="var(--text-tertiary)" strokeWidth="1" />
              <text x={x} y="366" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">{`t${i + 1}`}</text>
            </g>
          ))}

          {/* 事件队列框 */}
          <rect x="40" y="60" width="640" height="60" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="60" y="82" fontSize="12" fontWeight="600" fill="var(--accent)">事件队列（按时间排序）</text>

          {/* 队列中的事件 */}
          {["E1: 生成敌人", "E2: 玩家攻击", "E3: 敌人死亡", "E4: 掉落物品", "E5: 回合结束"].map((label, i) => (
            <g key={i}>
              <rect x={60 + i * 120} y="92" width="110" height="22" rx="4" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.8" />
              <text x={115 + i * 120} y="107" textAnchor="middle" fontSize="9" fill="var(--text-primary)">{label}</text>
            </g>
          ))}

          {/* 处理循环 */}
          <rect x="180" y="160" width="360" height="140" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="360" y="184" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">模拟循环</text>

          {/* 步骤 */}
          <rect x="200" y="200" width="140" height="30" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="270" y="220" textAnchor="middle" fontSize="10" fill="var(--text-primary)">1. 取出最早事件</text>

          <rect x="380" y="200" width="140" height="30" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="450" y="220" textAnchor="middle" fontSize="10" fill="var(--text-primary)">2. 执行事件处理</text>

          <rect x="200" y="244" width="140" height="30" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="270" y="264" textAnchor="middle" fontSize="10" fill="var(--text-primary)">3. 产生新事件</text>

          <rect x="380" y="244" width="140" height="30" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="450" y="264" textAnchor="middle" fontSize="10" fill="var(--text-primary)">4. 入队（按时间）</text>

          {/* 箭头连接步骤 */}
          <line x1="340" y1="215" x2="380" y2="215" stroke="var(--text-tertiary)" strokeWidth="1" />
          <polygon points="375,211 385,215 375,219" fill="var(--text-tertiary)" />
          <line x1="450" y1="230" x2="450" y2="244" stroke="var(--text-tertiary)" strokeWidth="1" />
          <polygon points="446,239 450,249 454,239" fill="var(--text-tertiary)" />
          <line x1="380" y1="259" x2="340" y2="259" stroke="var(--text-tertiary)" strokeWidth="1" />
          <polygon points="345,255 335,259 345,263" fill="var(--text-tertiary)" />

          {/* 队列 → 循环箭头 */}
          <line x1="360" y1="120" x2="360" y2="160" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.5" />
          <polygon points="356,155 360,165 364,155" fill="var(--accent)" fillOpacity="0.5" />

          {/* 循环 → 队列（新事件入队） */}
          <path d="M 540 230 Q 620 230 620 100" fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="4 3" />
          <polygon points="616,105 620,95 624,105" fill="var(--accent)" fillOpacity="0.4" />
          <text x="630" y="170" fontSize="9" fill="var(--text-secondary)">新事件</text>

          {/* 底部说明 */}
          <text x={VIEW_W / 2} y="388" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            时间不连续推进——跳到下一个事件时刻，执行后继续
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        离散事件模拟——事件队列驱动的时间跳跃式推进
      </figcaption>
    </figure>
  );
}
