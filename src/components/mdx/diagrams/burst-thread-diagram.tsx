/**
 * <BurstThreadDiagram />：Burst 编译器多线程示意图。
 *
 * Main Thread 顶部一个主线程框，箭头向下分发到 4 条 Worker Thread。
 * 展示 Job System 把工作拆给 Burst 编译线程并行执行的结构。
 */

export function BurstThreadDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 300"
          role="img"
          aria-label="Burst 编译器多线程：主线程通过 Job System 分发到 4 条 Worker Thread"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* Title */}
          <text
            x="280"
            y="24"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Burst + Job System 多线程
          </text>

          {/* Main Thread box */}
          <rect
            x="180"
            y="44"
            width="200"
            height="48"
            rx="8"
            fill="var(--surface-raised)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="280"
            y="64"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Main Thread
          </text>
          <text
            x="280"
            y="80"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            调度 Job → Complete()
          </text>

          {/* Job System label */}
          <text
            x="280"
            y="118"
            textAnchor="middle"
            fontSize="11"
            fontWeight="500"
            fill="var(--accent)"
          >
            Job System 分发
          </text>

          {/* Arrows from main thread to workers */}
          {[0, 1, 2, 3].map((i) => {
            const wx = 80 + i * 130;
            return (
              <line
                key={`arrow-${i}`}
                x1="280"
                y1="92"
                x2={wx + 50}
                y2="140"
                stroke="var(--accent)"
                strokeWidth="1.5"
                markerEnd="url(#burst-arrow)"
              />
            );
          })}

          {/* Arrow marker */}
          <defs>
            <marker
              id="burst-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* Worker Thread boxes */}
          {[0, 1, 2, 3].map((i) => {
            const wx = 80 + i * 130;
            return (
              <g key={`worker-${i}`}>
                <rect
                  x={wx}
                  y="144"
                  width="100"
                  height="72"
                  rx="8"
                  fill="var(--surface-raised)"
                  stroke="var(--border)"
                  strokeWidth="1.5"
                />
                <text
                  x={wx + 50}
                  y="166"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  Worker {i}
                </text>
                <text
                  x={wx + 50}
                  y="182"
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--text-secondary)"
                >
                  Burst Job
                </text>
                {/* Progress bar to indicate work */}
                <rect
                  x={wx + 12}
                  y="194"
                  width="76"
                  height="8"
                  rx="4"
                  fill="var(--border)"
                />
                <rect
                  x={wx + 12}
                  y="194"
                  width={20 + i * 14}
                  height="8"
                  rx="4"
                  fill="var(--accent)"
                  opacity="0.7"
                />
              </g>
            );
          })}

          {/* Bottom label */}
          <text
            x="280"
            y="250"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            主线程调度，Worker Thread 并行执行 Burst 编译的 Job
          </text>
          <text
            x="280"
            y="268"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            Profiler 的 CPU Usage 里每条 Worker Thread 有独立时间线
          </text>
        </svg>
      </div>
    </figure>
  );
}
