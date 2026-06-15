/**
 * <FrameDebuggerBatchDiagram>：Frame Debugger 验证合批效果。
 */

interface Props {
  /** true = 合批成功视图；false = 未合批对照 */
  batched?: boolean;
}

export function FrameDebuggerBatchDiagram({ batched = true }: Props) {
  const rows = batched
    ? [
        { label: "Batch #1 · Static", draws: "Draw 0–47", color: "var(--success)" },
        { label: "Batch #2 · SRP", draws: "Draw 48–120", color: "var(--success)" },
        { label: "Batch #3 · UI", draws: "Draw 121–130", color: "var(--accent)" },
      ]
    : [
        { label: "Draw #0 · Cube A", draws: "材质 A", color: "var(--danger)" },
        { label: "Draw #1 · Cube B", draws: "材质 B", color: "var(--danger)" },
        { label: "Draw #2 · Cube C", draws: "材质 C", color: "var(--danger)" },
        { label: "… × 120", draws: "各自提交", color: "var(--danger)" },
      ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 520 240"
          role="img"
          aria-label="Frame Debugger 事件列表：合批成功时多条 Draw 归入同一 Batch；未合批时每物体单独一行"
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          <rect
            x="24"
            y="16"
            width="472"
            height="28"
            rx="6"
            fill="var(--bg)"
            stroke="var(--border)"
          />
          <text
            x="40"
            y="34"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Frame Debugger — Event List
          </text>
          <text
            x="400"
            y="34"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            {batched ? "Batches: 3" : "Draw Calls: 120+"}
          </text>

          {rows.map((r, i) => (
            <g key={r.label}>
              <rect
                x="24"
                y={52 + i * 44}
                width="472"
                height="36"
                rx="6"
                fill={i === 0 && batched ? "var(--bg-elevated)" : "var(--bg)"}
                stroke={r.color}
                strokeWidth={i === 0 ? 2 : 1}
              />
              <text
                x="40"
                y={74 + i * 44}
                fontSize="11"
                fontWeight={i === 0 ? "600" : "400"}
                fill="var(--text-primary)"
              >
                {r.label}
              </text>
              <text
                x="400"
                y={74 + i * 44}
                textAnchor="end"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {r.draws}
              </text>
            </g>
          ))}

          <text
            x="260"
            y="210"
            textAnchor="middle"
            fontSize="11"
            fill={batched ? "var(--success)" : "var(--danger)"}
          >
            {batched
              ? "✓ 同 Batch 内多条 Draw → 合批生效"
              : "✗ 每物体单独 Draw → 检查材质/Static/Instancing"}
          </text>
          <text
            x="260"
            y="228"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            Window → Analysis → Frame Debugger · Enable 后逐事件展开
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Frame Debugger 列出每帧每个 Draw Call；合批成功时多个物体归入同一
        Batch 条目，Profiler 里 Batches 会明显下降。
      </figcaption>
    </figure>
  );
}
