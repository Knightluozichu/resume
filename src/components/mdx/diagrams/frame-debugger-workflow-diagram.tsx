/**
 * <FrameDebuggerWorkflowDiagram />：Frame Debugger 工作流四步。
 *
 * 水平四步流程：Open Frame Debugger → 逐 Draw Call 前进 →
 * 查看 Shader/材质/状态 → 找冗余 Draw Call。
 */

export function FrameDebuggerWorkflowDiagram() {
  const steps = [
    "Open\nFrame Debugger",
    "逐 Draw Call\n前进",
    "查看 Shader\n材质 / 状态",
    "找冗余\nDraw Call",
  ];
  const boxW = 110;
  const boxH = 56;
  const startX = 20;
  const gap = 16;
  const y = 60;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 180"
          role="img"
          aria-label="Frame Debugger 工作流：四步从打开到找冗余 Draw Call"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <defs>
            <marker
              id="frameDbg-arrow"
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
            y="24"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Frame Debugger 工作流
          </text>

          {steps.map((step, i) => {
            const x = startX + i * (boxW + gap);
            const lines = step.split("\n");
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
                  stroke={i === steps.length - 1 ? "var(--success)" : "var(--border)"}
                  strokeWidth="1.5"
                />
                {/* Step number */}
                <circle
                  cx={x + 16}
                  cy={y - 6}
                  r="10"
                  fill="var(--accent)"
                />
                <text
                  x={x + 16}
                  y={y - 2}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {i + 1}
                </text>
                {/* Text lines */}
                {lines.map((line, li) => (
                  <text
                    key={li}
                    x={x + boxW / 2}
                    y={y + 24 + li * 16}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight={li === 0 ? "600" : "400"}
                    fill="var(--text-primary)"
                  >
                    {line}
                  </text>
                ))}
                {/* Arrow to next */}
                {i < steps.length - 1 && (
                  <line
                    x1={x + boxW + 2}
                    y1={y + boxH / 2}
                    x2={x + boxW + gap - 2}
                    y2={y + boxH / 2}
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    markerEnd="url(#frameDbg-arrow)"
                  />
                )}
              </g>
            );
          })}

          {/* Bottom note */}
          <text
            x="280"
            y="148"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            逐帧回放每个 Draw Call，精确定位冗余绘制和 Shader 问题
          </text>
          <text
            x="280"
            y="166"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            Window → Analysis → Frame Debugger
          </text>
        </svg>
      </div>
    </figure>
  );
}
