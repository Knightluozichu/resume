/**
 * <LkdSchedulingDiagram>：CFS完全公平调度器——红黑树与vruntime图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkdSchedulingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CFS完全公平调度器红黑树与vruntime图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            CFS完全公平调度器——红黑树与虚拟运行时间
          </text>

          {/* vruntime 公式区 */}
          <rect x="30" y="46" width="680" height="50" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="66" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">vruntime += delta_exec * NICE_0_LOAD / weight</text>
          <text x="370" y="84" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">实际运行时间越长 vruntime 越大 / 权重越大 vruntime 增长越慢 / 选 vruntime 最小者运行</text>

          {/* 红黑树运行队列 */}
          <rect x="30" y="108" width="450" height="300" rx="8" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="255" y="128" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">CFS 运行队列（rbtree，按 vruntime 排序）</text>

          {/* 树根节点 */}
          <circle cx="255" cy="158" r="20" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1" />
          <text x="255" y="162" textAnchor="middle" fontSize="9" fill="var(--text-primary)">vr=50</text>

          {/* 第二层 */}
          <circle cx="165" cy="210" r="20" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1" />
          <text x="165" y="214" textAnchor="middle" fontSize="9" fill="var(--text-primary)">vr=30</text>

          <circle cx="345" cy="210" r="20" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1" />
          <text x="345" y="214" textAnchor="middle" fontSize="9" fill="var(--text-primary)">vr=80</text>

          {/* 第三层 */}
          <circle cx="100" cy="265" r="20" fill="var(--success)" fillOpacity="0.30" stroke="var(--success)" strokeWidth="2" />
          <text x="100" y="269" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--success)">vr=10</text>

          <circle cx="220" cy="265" r="20" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1" />
          <text x="220" y="269" textAnchor="middle" fontSize="9" fill="var(--text-primary)">vr=40</text>

          <circle cx="290" cy="265" r="20" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1" />
          <text x="290" y="269" textAnchor="middle" fontSize="9" fill="var(--text-primary)">vr=60</text>

          <circle cx="400" cy="265" r="20" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1" />
          <text x="400" y="269" textAnchor="middle" fontSize="9" fill="var(--text-primary)">vr=90</text>

          {/* 树连线 */}
          <line x1="242" y1="172" x2="178" y2="195" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="268" y1="172" x2="332" y2="195" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="152" y1="226" x2="114" y2="249" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="178" y1="226" x2="206" y2="249" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="332" y1="226" x2="304" y2="249" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="358" y1="226" x2="390" y2="249" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* leftmost 标注 */}
          <text x="100" y="300" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">&lt;-- leftmost</text>
          <text x="100" y="314" textAnchor="middle" fontSize="9" fill="var(--success)">pick_next_task</text>

          {/* 操作复杂度 */}
          <text x="255" y="340" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">查找最小: O(1)（最左节点） / 插入删除: O(log n)</text>
          <text x="255" y="356" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">平衡保证: 红黑树最坏情况不退化为链表</text>

          {/* nice值与权重映射 */}
          <rect x="500" y="108" width="210" height="180" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="605" y="128" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">nice值 → 权重映射</text>
          <text x="520" y="148" fontSize="9" fill="var(--text-secondary)">nice -5: weight 3121 (75%)</text>
          <text x="520" y="164" fontSize="9" fill="var(--text-secondary)">nice -1: weight 1277</text>
          <text x="520" y="180" fontSize="9" fontWeight="600" fill="var(--warning)">nice  0: weight 1024 (基准)</text>
          <text x="520" y="196" fontSize="9" fill="var(--text-secondary)">nice +1: weight  820</text>
          <text x="520" y="212" fontSize="9" fill="var(--text-secondary)">nice +5: weight  335</text>
          <text x="520" y="228" fontSize="9" fill="var(--text-secondary)">nice+10: weight  110</text>
          <text x="520" y="250" fontSize="9" fill="var(--text-tertiary)">每差1级 nice, CPU份额差约10%</text>
          <text x="520" y="266" fontSize="9" fill="var(--text-tertiary)">份额 = weight / sum(all weights)</text>

          {/* 上下文切换流程 */}
          <rect x="500" y="300" width="210" height="108" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="605" y="320" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">上下文切换流程</text>
          <text x="515" y="338" fontSize="9" fill="var(--text-secondary)">1. schedule()</text>
          <text x="515" y="352" fontSize="9" fill="var(--text-secondary)">2. pick_next_task()</text>
          <text x="515" y="366" fontSize="9" fill="var(--text-secondary)">3. switch_mm() 切页表</text>
          <text x="515" y="380" fontSize="9" fill="var(--text-secondary)">4. switch_to() 切寄存器</text>
          <text x="515" y="396" fontSize="9" fill="var(--text-tertiary)">开销: TLB刷新 + Cache冷启动</text>

          {/* 底部 */}
          <rect x="30" y="420" width="680" height="60" rx="6" fill="var(--text-primary)" fillOpacity="0.05" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="50" y="440" fontSize="10" fontWeight="600" fill="var(--text-primary)">调度策略: 每次选 vruntime 最小的进程运行, 运行后 vruntime 增长, 自然轮转到下一个最小者</text>
          <text x="50" y="456" fontSize="9" fill="var(--text-secondary)">nice越低权重越大 → vruntime增长越慢 → 获得更多CPU时间, 但低优先级进程不会饿死</text>
          <text x="50" y="470" fontSize="9" fill="var(--text-tertiary)">时间片 = sched_period * weight / sum(weights), 非固定值, 随负载动态调整</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CFS完全公平调度器——红黑树按vruntime排序选leftmost运行，nice值映射权重控制CPU份额分配
      </figcaption>
    </figure>
  );
}
