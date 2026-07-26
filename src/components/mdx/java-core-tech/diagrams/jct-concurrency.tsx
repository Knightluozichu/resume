/**
 * <JctConcurrencyDiagram>：并发编程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function JctConcurrencyDiagram() {
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
            并发编程——线程、锁与并发工具
          </text>

          {/* 线程创建 */}
          <rect x="30" y="48" width="340" height="120" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="200" y="70" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">线程创建三种方式</text>
          <text x="45" y="90" fontSize="11" fill="var(--text-secondary)">1. Runnable: new Thread(runnable).start()</text>
          <text x="45" y="106" fontSize="11" fill="var(--text-secondary)">2. Callable+Future: 有返回值, 可抛异常</text>
          <text x="45" y="122" fontSize="11" fill="var(--text-secondary)">3. 线程池: Executors.newFixedThreadPool(n)</text>
          <text x="45" y="142" fontSize="11" fill="var(--text-secondary)">Future&lt;T&gt; f = pool.submit(callable);</text>
          <text x="45" y="158" fontSize="11" fill="var(--text-secondary)">T result = f.get();  // 阻塞等待结果</text>

          {/* 线程状态 */}
          <rect x="390" y="48" width="320" height="120" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="550" y="70" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">线程状态机</text>
          <text x="405" y="90" fontSize="11" fill="var(--text-secondary)">NEW &rarr; start() &rarr; RUNNABLE</text>
          <text x="405" y="106" fontSize="11" fill="var(--text-secondary)">RUNNABLE &harr; BLOCKED (等synchronized)</text>
          <text x="405" y="122" fontSize="11" fill="var(--text-secondary)">RUNNABLE &rarr; WAITING (wait/join)</text>
          <text x="405" y="138" fontSize="11" fill="var(--text-secondary)">RUNNABLE &rarr; TIMED_WAITING (sleep)</text>
          <text x="405" y="154" fontSize="11" fill="var(--text-secondary)">RUNNABLE &rarr; TERMINATED (run结束)</text>

          {/* 同步机制 */}
          <text x={VIEW_W / 2} y="194" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">
            同步机制与并发工具
          </text>

          <rect x="30" y="208" width="220" height="80" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="140" y="228" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">synchronized</text>
          <text x="45" y="246" fontSize="11" fill="var(--text-secondary)">方法锁 / 块锁</text>
          <text x="45" y="260" fontSize="11" fill="var(--text-secondary)">可重入, 自动释放</text>
          <text x="45" y="274" fontSize="11" fill="var(--text-secondary)">保证原子性+可见性</text>

          <rect x="260" y="208" width="220" height="80" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="228" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">ReentrantLock</text>
          <text x="275" y="246" fontSize="11" fill="var(--text-secondary)">lock() / unlock()</text>
          <text x="275" y="260" fontSize="11" fill="var(--text-secondary)">tryLock() 超时获取</text>
          <text x="275" y="274" fontSize="11" fill="var(--text-secondary)">公平锁 / Condition</text>

          <rect x="490" y="208" width="220" height="80" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="600" y="228" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">volatile</text>
          <text x="505" y="246" fontSize="11" fill="var(--text-secondary)">保证可见性, 不保证原子性</text>
          <text x="505" y="260" fontSize="11" fill="var(--text-secondary)">禁止指令重排序</text>
          <text x="505" y="274" fontSize="11" fill="var(--text-secondary)">轻量级, 适合状态标志</text>

          {/* 并发集合与原子类 */}
          <rect x="30" y="304" width="340" height="100" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="200" y="324" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">并发集合</text>
          <text x="45" y="342" fontSize="11" fill="var(--text-secondary)">ConcurrentHashMap: 分段锁/CAS</text>
          <text x="45" y="358" fontSize="11" fill="var(--text-secondary)">CopyOnWriteArrayList: 写时复制</text>
          <text x="45" y="374" fontSize="11" fill="var(--text-secondary)">BlockingQueue: 生产者-消费者</text>
          <text x="45" y="390" fontSize="11" fill="var(--text-secondary)">ConcurrentSkipListMap: 跳表</text>

          <rect x="390" y="304" width="320" height="100" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="550" y="324" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">原子类与CAS</text>
          <text x="405" y="342" fontSize="11" fill="var(--text-secondary)">AtomicInteger / AtomicReference</text>
          <text x="405" y="358" fontSize="11" fill="var(--text-secondary)">CAS: compareAndSet(expected, new)</text>
          <text x="405" y="374" fontSize="11" fill="var(--text-secondary)">  无锁原子操作, 乐观策略</text>
          <text x="405" y="390" fontSize="11" fill="var(--text-secondary)">LongAdder: 高并发计数器</text>

          {/* 线程池 */}
          <rect x="30" y="420" width="680" height="84" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="440" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">ThreadPoolExecutor 七参数</text>
          <text x="45" y="458" fontSize="11" fill="var(--text-secondary)">corePoolSize / maximumPoolSize / keepAliveTime / unit / workQueue / threadFactory / handler</text>
          <text x="45" y="474" fontSize="11" fill="var(--text-secondary)">流程: 核心线程 &rarr; 队列 &rarr; 非核心线程 &rarr; 拒绝策略</text>
          <text x="45" y="490" fontSize="11" fill="var(--text-secondary)">CompletableFuture: 链式异步编排, thenApply / thenCompose / allOf</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        并发编程——线程三种创建方式与状态机、synchronized/ReentrantLock/volatile同步、并发集合CAS原子类、线程池七参数
      </figcaption>
    </figure>
  );
}
