/**
 * <MemorySnapshotWorkflowDiagram />：Memory Snapshot 工作流五步。
 *
 * 水平五步：拍快照 A → 执行操作 → 拍快照 B → Diff 对比 → 定位泄漏。
 */

export function MemorySnapshotWorkflowDiagram() {
  const steps = [
    { label: "拍快照 A", sub: "基线" },
    { label: "执行操作", sub: "加载/卸载场景" },
    { label: "拍快照 B", sub: "操作后" },
    { label: "Diff 对比", sub: "A vs B" },
    { label: "定位泄漏", sub: "只增不减的对象" },
  ];
  const boxW = 88;
  const boxH = 56;
  const startX = 14;
  const gap = 12;
  const y = 58;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 180"
          role="img"
          aria-label="Memory Snapshot 工作流：拍快照 A → 操作 → 拍快照 B → Diff → 定位泄漏"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <defs>
            <marker
              id="memSnap-arrow"
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

          {/* Title */}
          <text
            x="280"
            y="22"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Memory Snapshot 对比工作流
          </text>

          {steps.map((step, i) => {
            const x = startX + i * (boxW + gap);
            const isLast = i === steps.length - 1;
            return (
              <g key={i}>
                {/* Box */}
                <rect
                  x={x}
                  y={y}
                  width={boxW}
                  height={boxH}
                  rx="8"
                  fill="var(--surface-raised)"
                  stroke={isLast ? "var(--danger)" : "var(--border)"}
                  strokeWidth="1.5"
                />
                {/* Step number */}
                <circle
                  cx={x + 14}
                  cy={y - 6}
                  r="10"
                  fill="var(--accent)"
                />
                <text
                  x={x + 14}
                  y={y - 2}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {i + 1}
                </text>
                {/* Label */}
                <text
                  x={x + boxW / 2}
                  y={y + 24}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {step.label}
                </text>
                {/* Sub */}
                <text
                  x={x + boxW / 2}
                  y={y + 42}
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--text-secondary)"
                >
                  {step.sub}
                </text>
                {/* Arrow */}
                {i < steps.length - 1 && (
                  <line
                    x1={x + boxW + 2}
                    y1={y + boxH / 2}
                    x2={x + boxW + gap - 2}
                    y2={y + boxH / 2}
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    markerEnd="url(#memSnap-arrow)"
                  />
                )}
              </g>
            );
          })}

          {/* Bottom note */}
          <text
            x="280"
            y="146"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            两次快照 Diff = 只看增量，精确捕获操作过程中的内存泄漏
          </text>
          <text
            x="280"
            y="164"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            Window → Analysis → Memory Profiler
          </text>
        </svg>
      </div>
    </figure>
  );
}
