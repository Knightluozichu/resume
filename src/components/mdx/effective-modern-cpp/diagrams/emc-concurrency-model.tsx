/**
 * <EmcConcurrencyModelDiagram>：C++ 并发模型四类构建块。
 *
 * 四象限展示并发 API 的四类工具：
 *   - 左上「std::thread」（accent 紫）：原生线程，join/detach，析构必须 unjoinable
 *   - 右上「std::atomic」（success 绿）：无锁原子操作，比 mutex 更细粒度
 *   - 左下「std::mutex」（warning 暖）：基于锁的共享数据保护
 *   - 右下「std::future / async」（danger 红）：基于任务的异步与一次性事件
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

interface Quadrant {
  title: string;
  subtitle: string;
  color: string;
  x: number;
  y: number;
  points: string[];
}

const QUAD_W = 318;
const QUAD_H = 168;
const M = 32;
const GAP = 12;

const QUADRANTS: readonly Quadrant[] = [
  {
    title: "std::thread",
    subtitle: "线程式",
    color: "var(--accent)",
    x: M,
    y: 96,
    points: [
      "原生线程：t = std::thread(fn);",
      "join 等待 / detach 分离",
      "析构前必须 unjoinable（条款 37）",
      "异常或提前 return 易导致 std::terminate",
    ],
  },
  {
    title: "std::atomic",
    subtitle: "无锁",
    color: "var(--success)",
    x: M + QUAD_W + GAP,
    y: 96,
    points: [
      "原子操作：load / store / fetch_add",
      "比 mutex 更细粒度、更低开销",
      "适合计数器、标志位",
      "volatile 不是 atomic（条款 40）",
    ],
  },
  {
    title: "std::mutex",
    subtitle: "锁式",
    color: "var(--warning)",
    x: M,
    y: 96 + QUAD_H + GAP,
    points: [
      "lock_guard / unique_lock RAII",
      "保护多变量不变式的共享数据",
      "注意死锁与持锁回调",
      "条件变量需配合 mutex",
    ],
  },
  {
    title: "std::future / async",
    subtitle: "任务式",
    color: "var(--danger)",
    x: M + QUAD_W + GAP,
    y: 96 + QUAD_H + GAP,
    points: [
      "async + launch::async 异步执行",
      "future::get 取结果并传播异常",
      "promise/future 一次性事件通信",
      "优先 task 而非 thread（条款 35）",
    ],
  },
];

export function EmcConcurrencyModelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 并发模型四象限。左上 std::thread（紫色，原生线程，join/detach，析构必须 unjoinable）；右上 std::atomic（绿色，无锁原子操作，比 mutex 细粒度）；左下 std::mutex（暖色，基于锁保护共享数据，RAII 锁守护）；右下 std::future/async（红色，基于任务的异步与一次性事件，优先 task 而非 thread）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 并发 API 四类构建块
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            条款 35-40 · 线程 · 原子 · 互斥 · 任务
          </text>

          {/* 四象限 */}
          {QUADRANTS.map((q) => (
            <g key={q.title}>
              <rect x={q.x} y={q.y} width={QUAD_W} height={QUAD_H} rx="10" fill={q.color} fillOpacity="0.05" stroke={q.color} strokeWidth="1.5" strokeOpacity="0.55" />
              {/* 标题条 */}
              <rect x={q.x} y={q.y} width={QUAD_W} height={32} rx="10" fill={q.color} fillOpacity="0.14" />
              <rect x={q.x} y={q.y + 16} width={QUAD_W} height={16} fill={q.color} fillOpacity="0.14" />
              <text x={q.x + 16} y={q.y + 22} fontSize="13" fontWeight="700" fill={q.color} fontFamily="monospace">
                {q.title}
              </text>
              <text x={q.x + QUAD_W - 14} y={q.y + 22} textAnchor="end" fontSize="11" fill="var(--text-secondary)">
                {q.subtitle}
              </text>

              {/* 要点 */}
              {q.points.map((pt, pi) => (
                <text key={pi} x={q.x + 16} y={q.y + 56 + pi * 24} fontSize="11" fill="var(--text-primary)">
                  · {pt}
                </text>
              ))}
            </g>
          ))}

          {/* 中心十字分隔 */}
          <line x1={M + QUAD_W + GAP / 2} y1={96} x2={M + QUAD_W + GAP / 2} y2={96 + 2 * QUAD_H + GAP} stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={M} y1={96 + QUAD_H + GAP / 2} x2={VIEW_W - M} y2={96 + QUAD_H + GAP / 2} stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />

          {/* 底部总结 */}
          <line x1={32} y1={450} x2={VIEW_W - 32} y2={450} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={472} textAnchor="middle" fontSize="11.5" fill="var(--text-secondary)">
            默认优先 task（future/async）；共享数据用 atomic，多变量不变式才上 mutex；线程析构必 unjoinable
          </text>
          <text x={VIEW_W / 2} y={490} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
            atomic 管并发，volatile 管特殊内存——二者不可互换
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ 并发 API 分四类：std::thread（原生线程）、std::atomic（无锁原子）、std::mutex（锁式保护）、std::future/async（任务式异步）。默认优先任务式，能用原子就不用锁。
      </figcaption>
    </figure>
  );
}
