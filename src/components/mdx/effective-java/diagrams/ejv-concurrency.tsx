/**
 * <EjvConcurrencyDiagram>：并发编程图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function EjvConcurrencyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="并发编程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            并发——同步、线程池、并发集合
          </text>

          {/* 同步原则 */}
          <rect x="30" y="50" width="330" height="200" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="195" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">同步原则</text>
          <text x="45" y="96" fontSize="11" fill="var(--text-secondary)">1. 只在必要时同步</text>
          <text x="45" y="114" fontSize="11" fill="var(--text-secondary)">2. 同步块尽量小</text>
          <text x="45" y="132" fontSize="11" fill="var(--text-secondary)">3. 不要在同步块中调用</text>
          <text x="45" y="150" fontSize="11" fill="var(--text-secondary)">   外部方法（可能死锁）</text>
          <text x="45" y="176" fontSize="11" fill="var(--danger)">volatile 的局限:</text>
          <text x="45" y="194" fontSize="11" fill="var(--danger)"> 保证可见性，不保证原子性</text>
          <text x="45" y="212" fontSize="11" fill="var(--danger)"> count++ 仍不安全</text>
          <text x="45" y="230" fontSize="11" fill="var(--success)">AtomicLong 解决原子操作</text>

          {/* 线程池 */}
          <rect x="380" y="50" width="330" height="200" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="545" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">线程池 (Executor)</text>
          <text x="395" y="96" fontSize="11" fill="var(--text-secondary)">ExecutorService pool =</text>
          <text x="395" y="114" fontSize="11" fill="var(--text-secondary)">  Executors.newFixedThreadPool(n);</text>
          <text x="395" y="140" fontSize="11" fill="var(--danger)">避免:</text>
          <text x="395" y="158" fontSize="11" fill="var(--danger)"> newCachedThreadPool (无上限)</text>
          <text x="395" y="176" fontSize="11" fill="var(--danger)"> newFixedThreadPool (队列无上限)</text>
          <text x="395" y="202" fontSize="11" fill="var(--success)">推荐: ThreadPoolExecutor</text>
          <text x="395" y="220" fontSize="11" fill="var(--success)"> 手动配置核心/最大线程数</text>
          <text x="395" y="238" fontSize="11" fill="var(--success)"> 和有界队列 + 拒绝策略</text>

          {/* 并发集合 */}
          <rect x="30" y="270" width="330" height="100" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="195" y="294" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">并发集合</text>
          <text x="45" y="316" fontSize="11" fill="var(--text-secondary)">ConcurrentHashMap: 并发 HashMap</text>
          <text x="45" y="334" fontSize="11" fill="var(--text-secondary)">CopyOnWriteArrayList: 读多写少</text>
          <text x="45" y="352" fontSize="11" fill="var(--text-secondary)">BlockingQueue: 生产者-消费者</text>

          {/* 安全发布 */}
          <rect x="380" y="270" width="330" height="100" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="545" y="294" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">安全发布与不可变</text>
          <text x="395" y="316" fontSize="11" fill="var(--text-secondary)">不可变对象天然线程安全</text>
          <text x="395" y="334" fontSize="11" fill="var(--text-secondary)">安全发布: static final / volatile</text>
          <text x="395" y="352" fontSize="11" fill="var(--text-secondary)">final 字段: 构造完成即对所有线程可见</text>

          {/* 底部原则 */}
          <rect x="30" y="390" width="680" height="80" rx="10" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="414" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">并发核心原则</text>
          <text x="370" y="434" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">优先使用并发集合而非 Collections.synchronizedXxx——更细粒度的锁，更高并发度</text>
          <text x="370" y="452" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">文档记录线程安全级别: 不可变 / 无条件线程安全 / 有条件线程安全 / 非线程安全</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        并发编程——同步原则(最小化同步块)、线程池(避免无界队列)、并发集合(ConcurrentHashMap)、安全发布(不可变+volatile)
      </figcaption>
    </figure>
  );
}
