/**
 * <CqcThreadSafetyDiagram>：线程安全 · 同步机制与并发策略。
 *
 * 上半部分展示三种线程安全策略对比：
 *   加锁（lock）→ 细粒度锁 → 无锁（CAS）
 * 下半部分展示竞态条件的产生与修复。
 * 右侧标注 Concurrent 集合与同步原语的选择。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function CqcThreadSafetyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="线程安全同步机制与并发策略。上半部分对比加锁、细粒度锁、无锁 CAS 三种策略。下半部分展示竞态条件的产生与修复。右侧列出并发集合与同步原语选择。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            线程安全 · 同步机制与并发策略
          </text>

          {/* ===== 上半：竞态条件 ===== */}
          <text x="360" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">竞态条件：两个线程同时修改共享数据</text>

          {/* 线程A */}
          <rect x="40" y="70" width="120" height="28" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.3" />
          <text x="100" y="89" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">线程 A</text>

          <rect x="40" y="104" width="120" height="24" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="100" y="121" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">读 count=0</text>

          <rect x="40" y="132" width="120" height="24" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="100" y="149" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">计算 0+1=1</text>

          <rect x="40" y="160" width="120" height="24" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="100" y="177" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">写 count=1</text>

          {/* 线程B */}
          <rect x="180" y="70" width="120" height="28" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.3" />
          <text x="240" y="89" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">线程 B</text>

          <rect x="180" y="104" width="120" height="24" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="240" y="121" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">读 count=0</text>

          <rect x="180" y="132" width="120" height="24" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="240" y="149" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">计算 0+1=1</text>

          <rect x="180" y="160" width="120" height="24" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="240" y="177" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">写 count=1</text>

          {/* 结果 */}
          <line x1="160" y1="172" x2="320" y2="172" stroke="var(--danger)" strokeWidth="1.2" strokeDasharray="3 2" />

          <rect x="320" y="120" width="120" height="52" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.6" />
          <text x="380" y="140" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">结果：count=1</text>
          <text x="380" y="158" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">应为 2，丢失一次更新</text>

          {/* ===== 右侧：三种修复策略 ===== */}
          <text x="560" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">修复策略</text>

          {/* 策略1：lock */}
          <rect x="470" y="70" width="220" height="48" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="580" y="89" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--accent)">lock 互斥锁</text>
          <text x="580" y="106" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">简单可靠，串行化临界区</text>

          {/* 策略2：细粒度锁 */}
          <rect x="470" y="126" width="220" height="48" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="580" y="145" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--warning)">ReaderWriterLockSlim</text>
          <text x="580" y="162" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">读多写少，读锁并发</text>

          {/* 策略3：无锁 */}
          <rect x="470" y="182" width="220" height="48" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.4" />
          <text x="580" y="201" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--success)">Interlocked / CAS</text>
          <text x="580" y="218" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">原子操作，无阻塞</text>

          {/* ===== 底部：并发集合选择 ===== */}
          <rect x="36" y="240" width={VIEW_W - 72} height="160" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.35" />
          <text x="52" y="262" fontSize="13" fontWeight="700" fill="var(--success)">并发场景的正确选择</text>

          {/* 左列 */}
          <text x="52" y="286" fontSize="11.5" fontWeight="700" fill="var(--accent)">并发集合（内置线程安全）</text>
          <text x="52" y="306" fontSize="11" fill="var(--text-secondary)">ConcurrentDictionary：细粒度锁，读写并发</text>
          <text x="52" y="324" fontSize="11" fill="var(--text-secondary)">ConcurrentQueue：无锁 CAS，FIFO 入队出队</text>
          <text x="52" y="342" fontSize="11" fill="var(--text-secondary)">ConcurrentBag：无序，同线程无锁</text>
          <text x="52" y="360" fontSize="11" fill="var(--text-secondary)">Channel：生产者-消费者异步管道</text>

          {/* 右列 */}
          <text x="380" y="286" fontSize="11.5" fontWeight="700" fill="var(--warning)">同步原语选择</text>
          <text x="380" y="306" fontSize="11" fill="var(--text-secondary)">lock：保护临界区，勿锁 this / typeof</text>
          <text x="380" y="324" fontSize="11" fill="var(--text-secondary)">Interlocked：原子计数，count++ 用 Increment</text>
          <text x="380" y="342" fontSize="11" fill="var(--text-secondary)">SemaphoreSlim：限制并发数，异步等待</text>
          <text x="380" y="360" fontSize="11" fill="var(--text-secondary)">Monitor.TryEnter：带超时的锁，防死锁</text>

          <text x="52" y="388" fontSize="11" fontWeight="600" fill="var(--danger)">原则：能用并发集合就不用 lock，能用 Interlocked 就不用 lock</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        竞态条件源于读-改-写非原子。修复策略从粗到细：lock 串行化、ReaderWriterLockSlim 读写分离、Interlocked CAS 无锁原子。优先用并发集合。
      </figcaption>
    </figure>
  );
}
