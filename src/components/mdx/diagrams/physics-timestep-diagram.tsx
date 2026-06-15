/**
 * <PhysicsTimestepDiagram highlight="update|fixed|physics">：
 * Update（渲染帧）与 FixedUpdate（固定物理步）时间线对比。
 */

type Highlight = "update" | "fixed" | "physics" | "all";

interface Props {
  highlight?: Highlight;
}

export function PhysicsTimestepDiagram({ highlight = "all" }: Props) {
  const active = (key: Highlight) => highlight === "all" || highlight === key;

  const frameW = 72;
  const frames = [0, 1, 2, 3, 4];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 280"
          role="img"
          aria-label="Update 渲染帧与 FixedUpdate 固定物理步时间线"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* 时间轴 */}
          <line x1="40" y1="48" x2="600" y2="48" stroke="var(--border)" strokeWidth="2" />
          {frames.map((f, i) => (
            <g key={f}>
              <line
                x1={56 + i * frameW}
                y1="42"
                x2={56 + i * frameW}
                y2="54"
                stroke="var(--text-secondary)"
                strokeWidth="1"
              />
              <text
                x={56 + i * frameW}
                y="36"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {f === 0 ? "0ms" : `+${(f * 16.6).toFixed(0)}ms`}
              </text>
            </g>
          ))}

          {/* Update 行 */}
          <text x="16" y="76" fontSize="11" fontWeight="600" fill={active("update") ? "var(--accent)" : "var(--text-secondary)"}>
            Update
          </text>
          {frames.map((f, i) => (
            <rect
              key={`u-${f}`}
              x={40 + i * frameW}
              y="80"
              width={frameW - 8}
              height="24"
              rx="4"
              fill={active("update") ? "var(--accent)" : "var(--border)"}
              opacity={active("update") ? 0.35 : 0.25}
              stroke={active("update") ? "var(--accent)" : "var(--border)"}
              strokeWidth={1.5}
            />
          ))}
          <text x="320" y="118" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            每渲染帧 1 次 · 间隔随 FPS 变化
          </text>

          {/* FixedUpdate 行 — 0.02s = 50Hz，在 60FPS 下部分帧 0 次、部分 2 次 */}
          <text x="16" y="146" fontSize="11" fontWeight="600" fill={active("fixed") ? "var(--accent)" : "var(--text-secondary)"}>
            FixedUpdate
          </text>
          {[0, 1, 2, 3].map((step, i) => {
            const x = 48 + step * (frameW * 1.25);
            return (
              <rect
                key={`f-${step}`}
                x={x}
                y="150"
                width={frameW - 12}
                height="24"
                rx="4"
                fill={active("fixed") ? "var(--accent)" : "var(--border)"}
                opacity={active("fixed") ? 0.7 : 0.3}
                stroke={active("fixed") ? "var(--accent)" : "var(--border)"}
                strokeWidth={1.5}
              />
            );
          })}
          <text x="320" y="190" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            固定 0.02s（50Hz）· 与帧率解耦
          </text>

          {/* PhysX 模拟行 */}
          <text x="16" y="218" fontSize="11" fontWeight="600" fill={active("physics") ? "var(--accent)" : "var(--text-secondary)"}>
            PhysX
          </text>
          {[0, 1, 2, 3].map((step, i) => {
            const x = 48 + step * (frameW * 1.25);
            return (
              <g key={`p-${step}`}>
                <rect
                  x={x}
                  y="222"
                  width={frameW - 12}
                  height="24"
                  rx="4"
                  fill={active("physics") ? "var(--accent)" : "var(--border)"}
                  opacity={active("physics") ? 0.55 : 0.25}
                  stroke={active("physics") ? "var(--accent)" : "var(--border)"}
                  strokeWidth={1.5}
                />
                <text x={x + (frameW - 12) / 2} y="238" textAnchor="middle" fontSize="9" fill="var(--text-primary)">
                  sim
                </text>
              </g>
            );
          })}
          <text x="320" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            碰撞检测 + 求解 · 成本随刚体/接触对数上升
          </text>

          <text x="320" y="278" textAnchor="middle" fontSize="11" fill="var(--text-primary)">
            {highlight === "update" && "在 Update 里改 Rigidbody 速度会被下一物理步覆盖——用 FixedUpdate 或 ForceMode"}
            {highlight === "fixed" && "Fixed Timestep 越小，每秒物理步越多，CPU 物理 ms 线性上涨"}
            {highlight === "physics" && "Profiler → Physics 看 FixedUpdate 与 PhysX 是否顶满帧预算"}
            {highlight === "all" && "渲染帧与物理步不同步：逻辑分 Update（看）与 FixedUpdate（推）"}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        物理在固定时间步推进；渲染帧快时一帧可能跑 0～2 次 FixedUpdate。
      </figcaption>
    </figure>
  );
}
