/**
 * <CPUUsageTimelineDiagram />：CPU 帧时间分段示意。
 *
 * 水平时间条展示一帧内 CPU 时间分配：Scripts / Rendering / Physics / GC，
 * 16.6ms 预算线标注目标帧率 60fps。
 */

export function CPUUsageTimelineDiagram() {
  /* segment widths (total = 460, fits in 560 viewBox with padding) */
  const segments = [
    { label: "Scripts", w: 160, color: "var(--accent)" },
    { label: "Rendering", w: 120, color: "var(--info)" },
    { label: "Physics", w: 100, color: "var(--warning)" },
    { label: "GC", w: 50, color: "var(--danger)" },
  ];
  const barX = 50;
  const barY = 80;
  const barH = 40;
  const budgetX = barX + 340; /* ~16.6ms mark within 460 total */

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 200"
          role="img"
          aria-label="CPU 帧时间分段：Scripts、Rendering、Physics、GC 段 + 16.6ms 预算线"
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
            CPU Usage Timeline（单帧）
          </text>

          {/* Frame label */}
          <text
            x={barX}
            y={barY - 10}
            fontSize="11"
            fill="var(--text-secondary)"
          >
            0 ms
          </text>

          {/* Segments */}
          {segments.reduce<React.JSX.Element[]>((acc, seg, i) => {
            const x =
              barX +
              segments.slice(0, i).reduce((s, prev) => s + prev.w, 0);
            acc.push(
              <g key={seg.label}>
                <rect
                  x={x}
                  y={barY}
                  width={seg.w}
                  height={barH}
                  rx={i === 0 ? 6 : 0}
                  fill={seg.color}
                  opacity="0.85"
                />
                <text
                  x={x + seg.w / 2}
                  y={barY + barH / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {seg.label}
                </text>
              </g>,
            );
            return acc;
          }, [])}

          {/* Last segment round right corners overlay */}
          <rect
            x={barX + 430 - 6}
            y={barY}
            width={6}
            height={barH}
            rx={0}
            fill={segments[segments.length - 1].color}
            opacity="0.85"
          />

          {/* 16.6ms budget line */}
          <line
            x1={budgetX}
            y1={barY - 14}
            x2={budgetX}
            y2={barY + barH + 8}
            stroke="var(--danger)"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <text
            x={budgetX + 4}
            y={barY - 6}
            fontSize="10"
            fontWeight="600"
            fill="var(--danger)"
          >
            16.6 ms (60fps)
          </text>

          {/* End ms label */}
          <text
            x={barX + 460}
            y={barY - 10}
            textAnchor="end"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            ~22 ms
          </text>

          {/* Legend */}
          {segments.map((seg, i) => {
            const lx = 60 + i * 125;
            return (
              <g key={`legend-${seg.label}`}>
                <rect
                  x={lx}
                  y={155}
                  width="12"
                  height="12"
                  rx="2"
                  fill={seg.color}
                  opacity="0.85"
                />
                <text
                  x={lx + 16}
                  y={166}
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {seg.label}
                </text>
              </g>
            );
          })}

          {/* Bottom note */}
          <text
            x="280"
            y="192"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            超出 16.6ms 预算 = 掉帧（Profiler 红线标记）
          </text>
        </svg>
      </div>
    </figure>
  );
}
