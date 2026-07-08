/**
 * <DsvStacksQueuesDiagram>：栈与队列操作模型对比图（dsv-stacks-queues 章）。
 *
 * 左侧栈：垂直容器展示 push/pop 方向（LIFO）；右侧队列：水平容器展示 enqueue/dequeue 方向（FIFO）。
 * 底部总结栏列出各自典型应用场景。
 *
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function DsvStacksQueuesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="栈与队列操作模型对比。左侧为栈：垂直容器，从顶部 push 压入、从顶部 pop 弹出，后进先出。右侧为队列：水平容器，从右端 enqueue 入队、从左端 dequeue 出队，先进先出。底部列出典型应用：栈用于函数调用、括号匹配、撤销；队列用于 BFS、任务调度、生产者消费者。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            栈（LIFO） vs 队列（FIFO）
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>
            栈只操作栈顶，后进先出　队列两端各管一头，先进先出
          </text>

          {/* ===== 栈区域 ===== */}
          <text x="140" y="92" textAnchor="middle" fontSize="14" fontWeight="700" fill={accent}>栈 Stack</text>
          <text x="140" y="110" textAnchor="middle" fontSize="11" fill={secondary}>后进先出 LIFO</text>

          {/* push 箭头 */}
          <line x1="140" y1="124" x2="140" y2="144" stroke={success} strokeWidth="2" markerEnd="" />
          <polygon points="135,144 145,144 140,150" fill={success} />
          <text x="170" y="138" fontSize="11" fill={success}>push</text>

          {/* 栈容器 */}
          <rect x="96" y="150" width="88" height="160" rx="4" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="6 3" />
          {/* 栈内元素 */}
          {[
            { v: "1（先入）", y: 280, color: secondary },
            { v: "2", y: 252, color: secondary },
            { v: "3", y: 224, color: secondary },
            { v: "4", y: 196, color: secondary },
            { v: "5（后入）", y: 168, color: accent },
          ].map((item, i) => (
            <g key={i}>
              <rect x="104" y={item.y} width="72" height="24" rx="3" fill={i === 4 ? accent : border} fillOpacity={i === 4 ? 0.12 : 0.5} stroke={i === 4 ? accent : border} strokeWidth="1" />
              <text x="140" y={item.y + 16} textAnchor="middle" fontSize="11" fontWeight={i === 4 ? "600" : "400"} fill={i === 4 ? accent : primary}>{item.v}</text>
            </g>
          ))}

          {/* pop 箭头 */}
          <line x1="140" y1="144" x2="200" y2="144" stroke={danger} strokeWidth="2" />
          <polygon points="200,139 200,149 208,144" fill={danger} />
          <text x="210" y="148" fontSize="11" fill={danger}>pop ← 栈顶</text>

          {/* 栈应用 */}
          <text x="60" y="338" fontSize="11" fontWeight="700" fill={secondary}>典型应用</text>
          <text x="60" y="356" fontSize="11" fill={primary}>· 函数调用栈</text>
          <text x="60" y="372" fontSize="11" fill={primary}>· 括号匹配</text>
          <text x="60" y="388" fontSize="11" fill={primary}>· 撤销 Undo</text>

          {/* 分隔线 */}
          <line x1="340" y1="80" x2="340" y2="400" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 队列区域 ===== */}
          <text x="530" y="92" textAnchor="middle" fontSize="14" fontWeight="700" fill={success}>队列 Queue</text>
          <text x="530" y="110" textAnchor="middle" fontSize="11" fill={secondary}>先进先出 FIFO</text>

          {/* dequeue 箭头 */}
          <line x1="380" y1="200" x2="356" y2="200" stroke={danger} strokeWidth="2" />
          <polygon points="356,195 356,205 348,200" fill={danger} />
          <text x="350" y="190" textAnchor="end" fontSize="11" fill={danger}>dequeue</text>
          <text x="350" y="218" textAnchor="end" fontSize="11" fill={secondary}>出队←</text>

          {/* 队列容器 */}
          <rect x="380" y="176" width="300" height="48" rx="4" fill="none" stroke={success} strokeWidth="1.5" strokeDasharray="6 3" />
          {/* 队列内元素 */}
          {[
            { v: "1（先入）", x: 388, color: accent },
            { v: "2", x: 448, color: secondary },
            { v: "3", x: 508, color: secondary },
            { v: "4", x: 568, color: secondary },
            { v: "5（后入）", x: 628, color: secondary },
          ].map((item, i) => (
            <g key={i}>
              <rect x={item.x} y="184" width="52" height="32" rx="3" fill={i === 0 ? accent : border} fillOpacity={i === 0 ? 0.12 : 0.5} stroke={i === 0 ? accent : border} strokeWidth="1" />
              <text x={item.x + 26} y="204" textAnchor="middle" fontSize="11" fontWeight={i === 0 ? "600" : "400"} fill={i === 0 ? accent : primary}>{item.v}</text>
            </g>
          ))}

          {/* enqueue 箭头 */}
          <line x1="708" y1="200" x2="684" y2="200" stroke={success} strokeWidth="2" />
          <polygon points="684,195 684,205 676,200" fill={success} />
          <text x="680" y="190" textAnchor="end" fontSize="11" fill={success}>← enqueue</text>
          <text x="680" y="218" textAnchor="end" fontSize="11" fill={secondary}>入队</text>

          {/* 队列应用 */}
          <text x="380" y="280" fontSize="11" fontWeight="700" fill={secondary}>典型应用</text>
          <text x="380" y="298" fontSize="11" fill={primary}>· BFS 广度优先搜索</text>
          <text x="380" y="314" fontSize="11" fill={primary}>· 任务调度（先来先服务）</text>
          <text x="380" y="330" fontSize="11" fill={primary}>· 生产者-消费者模型</text>

          {/* 底部总结 */}
          <rect x="48" y="402" width="0" height="0" fill="none" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        栈只在栈顶操作（LIFO），适合回退、撤销、递归模拟；队列两端各管一头（FIFO），适合调度、缓冲、BFS。限制操作端反而带来清晰语义。
      </figcaption>
    </figure>
  );
}
