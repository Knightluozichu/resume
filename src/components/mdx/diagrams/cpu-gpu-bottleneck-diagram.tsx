/**
 * <CpuGpuBottleneckDiagram mode="cpu|gpu|balanced">：
 * CPU bound vs GPU bound 判断示意——哪一侧柱子顶满帧预算。
 */

type BottleneckMode = "cpu" | "gpu" | "balanced";

interface Props {
  mode?: BottleneckMode;
}

export function CpuGpuBottleneckDiagram({ mode = "balanced" }: Props) {
  const budget = 80;
  const cpuH =
    mode === "cpu" ? 72 : mode === "gpu" ? 28 : 40;
  const gpuH =
    mode === "gpu" ? 74 : mode === "cpu" ? 22 : 38;

  const cpuActive = mode === "cpu" || mode === "balanced";
  const gpuActive = mode === "gpu" || mode === "balanced";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 400 220"
          role="img"
          aria-label="CPU bound 与 GPU bound 帧预算对比示意"
          className="mx-auto block h-auto w-full max-w-[400px]"
        >
          {/* 帧预算线 */}
          <line
            x1="40"
            y1="40"
            x2="360"
            y2="40"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <text x="40" y="32" fontSize="10" fill="var(--accent)">
            16.6ms 帧预算 (60 FPS)
          </text>

          {/* CPU 柱 */}
          <rect
            x="80"
            y={40 + budget - cpuH}
            width="100"
            height={cpuH}
            rx="4"
            fill={cpuActive ? "var(--accent)" : "var(--border)"}
            opacity={cpuActive ? 0.85 : 0.4}
          />
          <text
            x="130"
            y={30 + budget - cpuH}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            CPU
          </text>
          <text
            x="130"
            y={55 + budget}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            脚本·物理
          </text>

          {/* GPU 柱 */}
          <rect
            x="220"
            y={40 + budget - gpuH}
            width="100"
            height={gpuH}
            rx="4"
            fill={gpuActive ? "var(--accent)" : "var(--border)"}
            opacity={gpuActive ? 0.85 : 0.4}
          />
          <text
            x="270"
            y={30 + budget - gpuH}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            GPU
          </text>
          <text
            x="270"
            y={55 + budget}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            绘制·着色
          </text>

          <text
            x="200"
            y="175"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-primary)"
          >
            {mode === "cpu" &&
              "CPU 柱顶满预算 → CPU bound：先查脚本与主线程"}
            {mode === "gpu" &&
              "GPU 柱顶满预算 → GPU bound：先查渲染与 Overdraw"}
            {mode === "balanced" &&
              "两侧都高 → 可能双瓶颈；先解决更高的那一侧"}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        对比 CPU ms 与 GPU ms：哪一侧更接近帧预算上限，就先优化哪一侧。
      </figcaption>
    </figure>
  );
}
