/**
 * <StaticBatchingDiagram>：Static Batching 与标记 Static 的流程。
 */

export function StaticBatchingDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 240"
          role="img"
          aria-label="Static Batching：勾选 Static 标记后，构建期合并网格，运行时不再移动"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* Step 1: Inspector Static */}
          <rect
            x="24"
            y="32"
            width="160"
            height="100"
            rx="8"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="104"
            y="56"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Inspector
          </text>
          <rect
            x="44"
            y="68"
            width="14"
            height="14"
            rx="2"
            fill="var(--accent)"
            stroke="var(--accent)"
          />
          <text
            x="66"
            y="80"
            fontSize="11"
            fill="var(--text-primary)"
          >
            Static ✓
          </text>
          <text
            x="104"
            y="100"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            Batching Static
          </text>
          <text
            x="104"
            y="116"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            勾选后不可移动
          </text>

          <path
            d="M188 82 l28 0 l-8 -5 l0 10 z"
            fill="var(--accent)"
          />

          {/* Step 2: Build merge */}
          <rect
            x="220"
            y="32"
            width="160"
            height="100"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="300"
            y="56"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            构建期合并
          </text>
          <text
            x="300"
            y="78"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            同材质静态物
          </text>
          <text
            x="300"
            y="94"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            → 大网格 + 子网格
          </text>
          <text
            x="300"
            y="116"
            textAnchor="middle"
            fontSize="9"
            fill="var(--warning)"
          >
            占更多内存
          </text>

          <path
            d="M384 82 l28 0 l-8 -5 l0 10 z"
            fill="var(--accent)"
          />

          {/* Step 3: Runtime */}
          <rect
            x="416"
            y="32"
            width="200"
            height="100"
            rx="8"
            fill="var(--bg-elevated)"
            stroke="var(--success)"
            strokeWidth="2"
          />
          <text
            x="516"
            y="56"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            运行时
          </text>
          <text
            x="516"
            y="78"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            一次 Draw Call 画整片
          </text>
          <text
            x="516"
            y="94"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            无 CPU 顶点合并
          </text>
          <text
            x="516"
            y="116"
            textAnchor="middle"
            fontSize="9"
            fill="var(--success)"
          >
            Batches ↓ 稳定
          </text>

          {/* Scene example */}
          <rect
            x="40"
            y="152"
            width="560"
            height="72"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x="320"
            y="174"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            典型用途：关卡静态道具、建筑、地形装饰
          </text>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect
              key={i}
              x={100 + i * 56}
              y="186"
              width="40"
              height="24"
              rx="3"
              fill="var(--bg-elevated)"
              stroke="var(--success)"
              strokeWidth="1"
            />
          ))}
          <text
            x="320"
            y="214"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            移动 Static 物体会打断合批并触发重建——只适合永不动的物体
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        勾选 Static（Batching Static）后，构建期合并同材质网格；运行时 CPU
        不再逐物体提交，但会占用额外内存且物体不可移动。
      </figcaption>
    </figure>
  );
}
