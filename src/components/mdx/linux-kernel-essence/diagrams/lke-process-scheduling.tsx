/**
 * <LkeProcessSchedulingDiagram>：Linux进程管理与CFS调度器图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkeProcessSchedulingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux进程管理与CFS调度器图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            CFS完全公平调度器——红黑树与虚拟运行时间
          </text>

          {/* task_struct */}
          <rect x="30" y="50" width="200" height="140" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="130" y="72" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">task_struct</text>
          <text x="45" y="92" fontSize="9" fill="var(--text-secondary)">pid / tgid / state</text>
          <text x="45" y="108" fontSize="9" fill="var(--text-secondary)">se (sched_entity)</text>
          <text x="45" y="124" fontSize="9" fill="var(--text-secondary)">  .vruntime  ← 虚拟运行时间</text>
          <text x="45" y="140" fontSize="9" fill="var(--text-secondary)">  .load      ← 权重</text>
          <text x="45" y="156" fontSize="9" fill="var(--text-secondary)">mm / fs / files</text>
          <text x="45" y="172" fontSize="9" fill="var(--text-secondary)">signal / pending</text>

          {/* 红黑树 */}
          <rect x="260" y="50" width="450" height="200" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="485" y="72" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">CFS 运行队列（rbtree，按 vruntime 排序）</text>

          {/* 树节点 */}
          <circle cx="485" cy="100" r="18" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1" />
          <text x="485" y="104" textAnchor="middle" fontSize="9" fill="var(--text-primary)">vr=5</text>

          <circle cx="395" cy="145" r="18" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1" />
          <text x="395" y="149" textAnchor="middle" fontSize="9" fill="var(--text-primary)">vr=3</text>

          <circle cx="575" cy="145" r="18" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1" />
          <text x="575" y="149" textAnchor="middle" fontSize="9" fill="var(--text-primary)">vr=8</text>

          <circle cx="340" cy="195" r="18" fill="var(--success)" fillOpacity="0.25" stroke="var(--success)" strokeWidth="1.5" />
          <text x="340" y="199" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">vr=1</text>

          <circle cx="440" cy="195" r="18" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1" />
          <text x="440" y="199" textAnchor="middle" fontSize="9" fill="var(--text-primary)">vr=4</text>

          <circle cx="530" cy="195" r="18" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1" />
          <text x="530" y="199" textAnchor="middle" fontSize="9" fill="var(--text-primary)">vr=7</text>

          <circle cx="630" cy="195" r="18" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1" />
          <text x="630" y="199" textAnchor="middle" fontSize="9" fill="var(--text-primary)">vr=9</text>

          {/* 树连线 */}
          <line x1="475" y1="115" x2="405" y2="132" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="495" y1="115" x2="565" y2="132" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="385" y1="160" x2="348" y2="180" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="405" y1="160" x2="430" y2="180" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="565" y1="160" x2="542" y2="180" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="585" y1="160" x2="622" y2="180" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* leftmost 标注 */}
          <text x="340" y="230" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">&uarr; leftmost（vruntime 最小）</text>
          <text x="340" y="243" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CFS 总选此节点运行</text>

          {/* 箭头 task_struct → 红黑树 */}
          <line x1="230" y1="120" x2="260" y2="120" stroke="var(--text-tertiary)" strokeWidth="1.2" markerEnd="url(#arr)" />
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          {/* 调度类 */}
          <rect x="30" y="210" width="200" height="110" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="130" y="230" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">调度类优先级</text>
          <rect x="45" y="240" width="170" height="20" rx="4" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="130" y="254" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Stop（最高）</text>
          <rect x="45" y="263" width="170" height="20" rx="4" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="130" y="277" textAnchor="middle" fontSize="9" fill="var(--text-primary)">DL（Deadline）</text>
          <rect x="45" y="286" width="170" height="20" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="130" y="300" textAnchor="middle" fontSize="9" fill="var(--text-primary)">RT（实时 FIFO/RR）</text>
          <rect x="45" y="309" width="170" height="7" rx="3" fill="var(--success)" fillOpacity="0.25" stroke="var(--success)" strokeWidth="0.8" />
          <text x="130" y="316" textAnchor="middle" fontSize="8" fill="var(--success)">CFS（公平）</text>

          {/* vruntime 计算 */}
          <rect x="30" y="340" width="680" height="60" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="370" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">vruntime 计算公式</text>
          <text x="370" y="378" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">vruntime += delta_exec * NICE_0_LOAD / se.load.weight</text>
          <text x="370" y="392" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">高权重进程 vruntime 增长慢 → 获得更多CPU时间 → 公平</text>

          {/* 上下文切换 */}
          <rect x="30" y="415" width="680" height="70" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="370" y="435" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">上下文切换流程</text>
          <text x="370" y="453" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">schedule() → pick_next_task() → context_switch() → switch_mm() + switch_to()</text>
          <text x="370" y="468" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">切换页表（CR3寄存器）+ 保存/恢复寄存器与栈指针</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CFS调度器用红黑树按虚拟运行时间（vruntime）排序，总选leftmost节点运行；vruntime增长速度由进程权重决定，实现完全公平
      </figcaption>
    </figure>
  );
}
