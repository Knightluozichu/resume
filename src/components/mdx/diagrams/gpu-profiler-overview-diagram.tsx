/**
 * <GPUProfilerOverviewDiagram />：GPU Profiler 模块概览。
 *
 * 堆叠柱状图展示 Opaque / Transparent / Shadow / PostProcess 各 pass 耗时，
 * 11.1ms 预算线标注（90fps XR 目标）。
 */

export function GPUProfilerOverviewDiagram() {
  const passes = [
    { label: "Opaque", ms: 4.2, color: "var(--info)" },
    { label: "Shadow", ms: 2.8, color: "var(--warning)" },
    { label: "Transparent", ms: 2.0, color: "var(--accent)" },
    { label: "PostProcess", ms: 3.1, color: "var(--success)" },
  ];
  const maxMs = 14;
  const barW = 80;
  const barMaxH = 120;
  const baseY = 160;
  const startX = 80;
  const gap = 30;
  const budgetMs = 11.1;
  const budgetY = baseY - (budgetMs / maxMs) * barMaxH;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 220"
          role="img"
          aria-label="GPU Profiler 各 Pass 耗时柱状图 + 11.1ms 预算线"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* Title */}
          <text
            x="280"
            y="22"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            GPU Profiler Module Overview
          </text>

          {/* Baseline */}
          <line
            x1="60"
            y1={baseY}
            x2="520"
            y2={baseY}
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* Bars */}
          {passes.map((pass, i) => {
            const x = startX + i * (barW + gap);
            const h = (pass.ms / maxMs) * barMaxH;
            return (
              <g key={pass.label}>
                <rect
                  x={x}
                  y={baseY - h}
                  width={barW}
                  height={h}
                  rx="6"
                  fill={pass.color}
                  opacity="0.8"
                />
                <text
                  x={x + barW / 2}
                  y={baseY - h - 6}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill={pass.color}
                >
                  {pass.ms} ms
                </text>
                <text
                  x={x + barW / 2}
                  y={baseY + 16}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {pass.label}
                </text>
              </g>
            );
          })}

          {/* Budget line at 11.1ms */}
          <line
            x1="60"
            y1={budgetY}
            x2="520"
            y2={budgetY}
            stroke="var(--danger)"
            strokeWidth="1.5"
            strokeDasharray="5 3"
          />
          <text
            x="524"
            y={budgetY + 4}
            fontSize="10"
            fontWeight="600"
            fill="var(--danger)"
          >
            11.1 ms
          </text>

          {/* Bottom note */}
          <text
            x="280"
            y="205"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            GPU 帧预算 = 1000 / 目标帧率（90fps XR = 11.1ms）
          </text>
        </svg>
      </div>
    </figure>
  );
}
