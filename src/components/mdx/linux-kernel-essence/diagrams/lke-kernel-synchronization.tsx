/**
 * <LkeKernelSynchronizationDiagram>：Linux内核同步机制对比图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkeKernelSynchronizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux内核同步机制对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            内核同步机制——按场景选择正确的原语
          </text>

          {/* 表头 */}
          <rect x="20" y="42" width="700" height="28" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="80" y="60" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">原语</text>
          <text x="230" y="60" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">可睡眠?</text>
          <text x="370" y="60" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">适用场景</text>
          <text x="590" y="60" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">关键特征</text>

          {/* 自旋锁 */}
          <rect x="20" y="72" width="700" height="38" rx="4" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="0.6" />
          <text x="80" y="90" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">spinlock</text>
          <text x="230" y="90" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">否（忙等）</text>
          <text x="370" y="88" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">短临界区 / 中断上下文</text>
          <text x="370" y="102" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">&lt;10us 轻量</text>
          <text x="590" y="88" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">关抢占，多核忙等</text>
          <text x="590" y="102" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">spin_lock_irqsave 关中断</text>

          {/* 互斥锁 */}
          <rect x="20" y="112" width="700" height="38" rx="4" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="0.6" />
          <text x="80" y="130" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">mutex</text>
          <text x="230" y="130" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">是（睡眠）</text>
          <text x="370" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">长临界区 / 进程上下文</text>
          <text x="370" y="142" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">&gt;10us 可睡眠</text>
          <text x="590" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">争用时加入等待队列</text>
          <text x="590" y="142" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">仅进程上下文可用</text>

          {/* 信号量 */}
          <rect x="20" y="152" width="700" height="38" rx="4" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="0.6" />
          <text x="80" y="170" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">semaphore</text>
          <text x="230" y="170" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">是（可计数）</text>
          <text x="370" y="168" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">限制并发数</text>
          <text x="370" y="182" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">down / up</text>
          <text x="590" y="168" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">计数信号量</text>
          <text x="590" y="182" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">可允许多个持有者</text>

          {/* RCU */}
          <rect x="20" y="192" width="700" height="38" rx="4" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="0.6" />
          <text x="80" y="210" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">RCU</text>
          <text x="230" y="210" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">读不锁</text>
          <text x="370" y="208" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">读多写少 / 指针数据</text>
          <text x="370" y="222" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">链表/树</text>
          <text x="590" y="208" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">读端零开销</text>
          <text x="590" y="222" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">写端延迟回收，需宽限期</text>

          {/* 原子操作 */}
          <rect x="20" y="232" width="700" height="38" rx="4" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.6" />
          <text x="80" y="250" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">atomic_t</text>
          <text x="230" y="250" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">否</text>
          <text x="370" y="248" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">单个计数器</text>
          <text x="370" y="262" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">引用计数</text>
          <text x="590" y="248" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">原子读改写指令</text>
          <text x="590" y="262" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">无锁，单条CPU指令</text>

          {/* percpu */}
          <rect x="20" y="272" width="700" height="38" rx="4" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="0.6" />
          <text x="80" y="290" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">percpu</text>
          <text x="230" y="290" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">否</text>
          <text x="370" y="288" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">统计计数器</text>
          <text x="370" y="302" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">per-CPU变量</text>
          <text x="590" y="288" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">每核独立，无争用</text>
          <text x="590" y="302" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">汇总时需加锁</text>

          {/* seqlock */}
          <rect x="20" y="312" width="700" height="38" rx="4" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="0.6" />
          <text x="80" y="330" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-tertiary)">seqlock</text>
          <text x="230" y="330" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">读不锁</text>
          <text x="370" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">读多写少 / 简单值</text>
          <text x="370" y="342" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">时钟/jiffies</text>
          <text x="590" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">序号+重读</text>
          <text x="590" y="342" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">写端递增序号，读端检测</text>

          {/* 决策流程 */}
          <rect x="20" y="360" width="700" height="125" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="378" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">选择决策树</text>
          <text x="40" y="396" fontSize="9" fill="var(--text-secondary)">1. 临界区在中断上下文？ → spin_lock_irqsave（必须关中断防死锁）</text>
          <text x="40" y="412" fontSize="9" fill="var(--text-secondary)">2. 临界区可睡眠？ → mutex（争用时睡眠，不浪费CPU）</text>
          <text x="40" y="428" fontSize="9" fill="var(--text-secondary)">3. 读远多于写且数据是指针链表？ → RCU（读端零开销，写端延迟回收）</text>
          <text x="40" y="444" fontSize="9" fill="var(--text-secondary)">4. 只保护单个整数？ → atomic_t / atomic_long_t（单条指令，无锁）</text>
          <text x="40" y="460" fontSize="9" fill="var(--text-secondary)">5. 每核独立统计？ → percpu 变量（无争用，汇总时加锁）</text>
          <text x="40" y="476" fontSize="9" fill="var(--text-tertiary)">核心原则：关抢占/关中断的范围最小化，持有锁的时间最短化</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        内核同步原语按场景选择：短临界区用自旋锁，可睡眠用互斥锁，读多写少用RCU，单值用原子操作，统计用percpu
      </figcaption>
    </figure>
  );
}
