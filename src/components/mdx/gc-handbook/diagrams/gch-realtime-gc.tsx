/**
 * <GchRealtimeGcDiagram>：实时GC——工作量调度与截止时间。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function GchRealtimeGcDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="实时GC工作量调度与截止时间保证"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            实时GC：可预测的停顿截止时间
          </text>

          {/* 普通 vs 实时对比 */}
          <text x="185" y="54" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">普通GC：停顿不可预测</text>
          <rect x="40" y="64" width="290" height="80" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" />

          <rect x="50" y="76" width="40" height="24" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.6" />
          <rect x="90" y="76" width="100" height="24" fill="var(--danger)" fillOpacity="0.3" stroke="var(--danger)" strokeWidth="0.6" />
          <text x="140" y="92" textAnchor="middle" fontSize="11" fill="var(--danger)">GC（不可预测）</text>
          <rect x="190" y="76" width="30" height="24" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.6" />
          <rect x="220" y="76" width="50" height="24" fill="var(--danger)" fillOpacity="0.3" stroke="var(--danger)" strokeWidth="0.6" />
          <text x="245" y="92" textAnchor="middle" fontSize="11" fill="var(--danger)">GC?</text>
          <rect x="270" y="76" width="50" height="24" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.6" />

          <text x="185" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">堆越大 → 停顿越长</text>
          <text x="185" y="130" textAnchor="middle" fontSize="11" fill="var(--danger)">无法保证截止时间</text>

          <line x1="370" y1="40" x2="370" y2="160" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />

          <text x="555" y="54" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">实时GC：停顿 ≤ 截止时间</text>
          <rect x="410" y="64" width="290" height="80" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />

          {/* 时间片 */}
          <rect x="420" y="76" width="28" height="24" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.6" />
          <rect x="448" y="76" width="10" height="24" fill="var(--accent)" fillOpacity="0.4" stroke="var(--accent)" strokeWidth="0.6" />
          <rect x="458" y="76" width="28" height="24" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.6" />
          <rect x="486" y="76" width="10" height="24" fill="var(--accent)" fillOpacity="0.4" stroke="var(--accent)" strokeWidth="0.6" />
          <rect x="496" y="76" width="28" height="24" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.6" />
          <rect x="524" y="76" width="10" height="24" fill="var(--accent)" fillOpacity="0.4" stroke="var(--accent)" strokeWidth="0.6" />
          <rect x="534" y="76" width="28" height="24" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.6" />
          <rect x="562" y="76" width="10" height="24" fill="var(--accent)" fillOpacity="0.4" stroke="var(--accent)" strokeWidth="0.6" />
          <rect x="572" y="76" width="28" height="24" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.6" />
          <rect x="600" y="76" width="10" height="24" fill="var(--accent)" fillOpacity="0.4" stroke="var(--accent)" strokeWidth="0.6" />
          <rect x="610" y="76" width="28" height="24" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.6" />
          <rect x="638" y="76" width="10" height="24" fill="var(--accent)" fillOpacity="0.4" stroke="var(--accent)" strokeWidth="0.6" />
          <rect x="648" y="76" width="28" height="24" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.6" />

          <text x="433" y="92" textAnchor="middle" fontSize="11" fill="var(--success)">m</text>
          <text x="453" y="92" textAnchor="middle" fontSize="11" fill="var(--accent)">g</text>

          <text x="555" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">每个时间片：mutator + 少量GC工作</text>
          <text x="555" y="130" textAnchor="middle" fontSize="11" fill="var(--success)">停顿 ≤ 预算（如1ms）</text>

          {/* 工作量模型 */}
          <line x1="30" y1="165" x2="710" y2="165" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
          <text x={VIEW_W / 2} y="187" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">工作量模型与 Slack 调度</text>

          {/* Slack图 */}
          <rect x="40" y="200" width="660" height="120" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" />

          {/* 时间轴 */}
          <line x1="60" y1="260" x2="680" y2="260" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="60" y="275" fontSize="11" fill="var(--text-tertiary)">t0</text>
          <text x="340" y="275" fontSize="11" fill="var(--text-tertiary)">t1</text>
          <text x="680" y="275" fontSize="11" fill="var(--text-tertiary)">deadline</text>

          {/* mutator工作 */}
          <rect x="60" y="225" width="280" height="28" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="200" y="243" textAnchor="middle" fontSize="11" fill="var(--success)">mutator工作（分配对象）</text>

          {/* GC工作 */}
          <rect x="60" y="262" width="280" height="20" fill="var(--accent)" fillOpacity="0.2" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="200" y="275" textAnchor="middle" fontSize="11" fill="var(--accent)">GC增量工作</text>

          {/* Slack */}
          <rect x="340" y="225" width="340" height="28" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="0.8" strokeDasharray="3 3" />
          <text x="510" y="243" textAnchor="middle" fontSize="11" fill="var(--warning)">Slack（空闲余量）</text>

          <text x="60" y="300" fontSize="11" fill="var(--text-secondary)">工作量 W = 分配率 × 时间 → 每个周期必须完成的GC工作量</text>
          <text x="60" y="315" fontSize="11" fill="var(--text-secondary)">Slack = 预算时间 - 必需GC时间 → 正值 = 安全，负值 = 溢出</text>

          {/* Metronome调度 */}
          <line x1="30" y1="335" x2="710" y2="335" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
          <text x={VIEW_W / 2} y="357" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">Metronome 调度策略</text>

          <rect x="60" y="370" width="300" height="76" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <text x="210" y="390" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">时间片调度</text>
          <text x="75" y="408" fontSize="11" fill="var(--text-secondary)">固定周期（如1ms）分配预算：</text>
          <text x="75" y="422" fontSize="11" fill="var(--text-secondary)">{`  - 60% mutator, 40% GC`}</text>
          <text x="75" y="436" fontSize="11" fill="var(--text-tertiary)">IBM Metronome 经典实现</text>

          <rect x="380" y="370" width="300" height="76" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" />
          <text x="530" y="390" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Slack-based 调度</text>
          <text x="395" y="408" fontSize="11" fill="var(--text-secondary)">动态调整GC工作时机：</text>
          <text x="395" y="422" fontSize="11" fill="var(--text-secondary)">{`  - Slack大 → 少做GC`}</text>
          <text x="395" y="436" fontSize="11" fill="var(--text-tertiary)">{`  - Slack小 → 多做GC`}</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        实时GC通过工作量模型和Metronome/Slack调度策略，将GC工作分散到每个时间片中，保证停顿不超过预设截止时间
      </figcaption>
    </figure>
  );
}
