/**
 * <CpuGpuBottleneckDiagram mode="cpu|gpu|balanced">：
 * CPU bound vs GPU bound 判断示意——哪一侧柱子顶满帧预算。
 */

type BottleneckMode = "cpu" | "gpu" | "balanced";

interface Props {
  mode?: BottleneckMode;
}

export function CpuGpuBottleneckDiagram({ mode = "balanced" }: Props) {
  /* barTop = y=80, barBottom = y=180, total bar range = 100 */
  const barTop = 80;
  const barBottom = 180;
  const barRange = barBottom - barTop; // 100

  const cpuH =
    mode === "cpu" ? 90 : mode === "gpu" ? 35 : 50;
  const gpuH =
    mode === "gpu" ? 92 : mode === "cpu" ? 27 : 47;

  const cpuActive = mode === "cpu" || mode === "balanced";
  const gpuActive = mode === "gpu" || mode === "balanced";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 400 240"
          role="img"
          aria-label="CPU bound 与 GPU bound 帧预算对比示意"
          className="mx-auto block h-auto w-full max-w-[400px]"
        >
          {/* 帧预算线 at y=80，标签在 y=72（8px 间距） */}
          <text x="40" y="70" fontSize="10" fill="var(--accent)">
            16.6ms 帧预算 (60 FPS)
          </text>
          <line
            x1="40"
            y1={barTop}
            x2="360"
            y2={barTop}
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />

          {/* CPU 柱 — 从底部 barBottom 向上画 */}
          <text
            x="130"
            y={barBottom - cpuH - 8}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            CPU
          </text>
          <rect
            x="80"
            y={barBottom - cpuH}
            width="100"
            height={cpuH}
            rx="4"
            fill={cpuActive ? "var(--accent)" : "var(--border)"}
            opacity={cpuActive ? 0.85 : 0.4}
          />
          <text
            x="130"
            y={barBottom + 18}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            脚本·物理
          </text>

          {/* GPU 柱 */}
          <text
            x="270"
            y={barBottom - gpuH - 8}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            GPU
          </text>
          <rect
            x="220"
            y={barBottom - gpuH}
            width="100"
            height={gpuH}
            rx="4"
            fill={gpuActive ? "var(--accent)" : "var(--border)"}
            opacity={gpuActive ? 0.85 : 0.4}
          />
          <text
            x="270"
            y={barBottom + 18}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            绘制·着色
          </text>

          <text
            x="200"
            y="218"
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
