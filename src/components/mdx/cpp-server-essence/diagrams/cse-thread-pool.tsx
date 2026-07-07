/**
 * <CseThreadPoolDiagram>：线程池架构与任务流转图。
 *
 * 展示线程池的核心结构：任务队列（左）→ 线程池（中，多个工作线程）
 * → 任务执行（右）。中间用泳道展示每个 worker 从队列取任务的竞争关系，
 * 底部标注线程池的关键参数。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function CseThreadPoolDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="线程池架构图。左侧任务队列中有待处理任务，中间线程池包含 4 个工作线程，每个线程从队列取任务执行。右侧为执行结果。底部标注线程池参数：核心线程数、最大线程数、队列容量。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            线程池：任务队列 + 工作线程
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            生产者投递任务，消费者线程竞争取任务执行
          </text>

          {/* 任务队列（左） */}
          <rect x="48" y="100" width="140" height="180" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="118" y="122" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">任务队列</text>
          <line x1="60" y1="130" x2="176" y2="130" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.3" />

          {/* 队列中的任务 */}
          {["Task A", "Task B", "Task C", "Task D"].map((task, i) => (
            <g key={task}>
              <rect x="64" y={142 + i * 32} width="108" height="26" rx="5" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
              <text x="118" y={142 + i * 32 + 17} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{task}</text>
            </g>
          ))}

          {/* 生产者箭头 */}
          <text x="118" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">submit() 投递</text>
          <line x1="118" y1="84" x2="118" y2="96" stroke="var(--accent)" strokeWidth="1.4" markerEnd="url(#tp-arrow)" />

          {/* 线程池（中） */}
          <rect x="260" y="100" width="200" height="180" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="360" y="122" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">线程池（4 workers）</text>
          <line x1="272" y1="130" x2="448" y2="130" stroke="var(--warning)" strokeWidth="0.8" strokeOpacity="0.3" />

          {/* 4 个工作线程 */}
          {["worker 1", "worker 2", "worker 3", "worker 4"].map((worker, i) => {
            const wy = 142 + i * 32;
            const active = i < 2;
            return (
              <g key={worker}>
                <rect x="278" y={wy} width="164" height="26" rx="5" fill={active ? "var(--success)" : "var(--bg)"} fillOpacity={active ? "0.1" : "1"} stroke={active ? "var(--success)" : "var(--border)"} strokeWidth="1" />
                <circle cx="294" cy={wy + 13} r="4" fill={active ? "var(--success)" : "var(--text-secondary)"} />
                <text x="360" y={wy + 17} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{worker}{active ? "（执行中）" : "（空闲）"}</text>
              </g>
            );
          })}

          {/* 取任务箭头（队列→线程池） */}
          <line x1="190" y1="180" x2="256" y2="180" stroke="var(--text-secondary)" strokeWidth="1.4" markerEnd="url(#tp-arrow)" />
          <text x="223" y="172" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">取</text>

          {/* 执行结果（右） */}
          <rect x="532" y="100" width="140" height="180" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" />
          <text x="602" y="122" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">执行完成</text>
          <line x1="544" y1="130" x2="660" y2="130" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.3" />

          {["result 1", "result 2"].map((r, i) => (
            <g key={r}>
              <rect x="548" y={142 + i * 32} width="108" height="26" rx="5" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
              <text x="602" y={142 + i * 32 + 17} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{r}</text>
            </g>
          ))}

          {/* 执行箭头（线程池→结果） */}
          <line x1="462" y1="180" x2="528" y2="180" stroke="var(--text-secondary)" strokeWidth="1.4" markerEnd="url(#tp-arrow)" />
          <text x="495" y="172" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">完成</text>

          {/* 箭头标记 */}
          <defs>
            <marker id="tp-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L6,4 L0,8" fill="none" stroke="var(--text-secondary)" strokeWidth="1.2" />
            </marker>
          </defs>

          {/* 底部参数 */}
          <rect x="60" y="316" width={VIEW_W - 120} height="68" rx="12" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x={VIEW_W / 2} y="338" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">线程池关键参数</text>
          <text x="160" y="362" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            <tspan fontWeight="600" fill="var(--accent)">corePoolSize</tspan>
            <tspan>{"　核心线程（常驻）"}</tspan>
          </text>
          <text x="360" y="362" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            <tspan fontWeight="600" fill="var(--warning)">maxPoolSize</tspan>
            <tspan>{"　峰值扩容上限"}</tspan>
          </text>
          <text x="560" y="362" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            <tspan fontWeight="600" fill="var(--success)">queueCapacity</tspan>
            <tspan>{"　排队上限"}</tspan>
          </text>
          <text x={VIEW_W / 2} y="378" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">任务数 &gt; corePoolSize → 入队列；队列满 → 扩到 maxPoolSize；仍满 → 拒绝策略</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        线程池复用线程避免频繁创建销毁。任务先入队列，空闲 worker 取走执行。核心参数控制线程数与背压：核心线程常驻，峰值扩容，队列满时触发拒绝策略。
      </figcaption>
    </figure>
  );
}
