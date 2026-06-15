/**
 * <DynamicBatchingDiagram>：Dynamic Batching 条件与限制示意。
 */

export function DynamicBatchingDiagram() {
  const items = [
    { label: "同材质", ok: true, x: 48 },
    { label: "顶点 ≤900", ok: true, x: 168 },
    { label: "无多 Pass", ok: true, x: 288 },
    { label: "非 Skinned", ok: false, x: 408 },
    { label: "缩放一致", ok: true, x: 528 },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 220"
          role="img"
          aria-label="Dynamic Batching 条件：同材质、低顶点数、单 Pass、非蒙皮网格等；不满足则各自单独 Draw Call"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text
            x="320"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Dynamic Batching：运行时自动合批
          </text>

          {items.map((it) => (
            <g key={it.label}>
              <rect
                x={it.x}
                y="44"
                width="96"
                height="56"
                rx="8"
                fill={it.ok ? "var(--bg-elevated)" : "var(--bg)"}
                stroke={it.ok ? "var(--success)" : "var(--danger)"}
                strokeWidth="1.5"
              />
              <text
                x={it.x + 48}
                y="68"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {it.label}
              </text>
              <text
                x={it.x + 48}
                y="86"
                textAnchor="middle"
                fontSize="10"
                fill={it.ok ? "var(--success)" : "var(--danger)"}
              >
                {it.ok ? "✓ 可合" : "✗ 打断"}
              </text>
            </g>
          ))}

          {/* Before / after */}
          <text
            x="160"
            y="130"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            合批前
          </text>
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={`b-${i}`}
              x={80 + i * 36}
              y="140"
              width="28"
              height="28"
              rx="4"
              fill="var(--bg)"
              stroke="var(--danger)"
              strokeWidth="1"
            />
          ))}
          <text
            x="160"
            y="188"
            textAnchor="middle"
            fontSize="10"
            fill="var(--danger)"
          >
            4 Draw Calls
          </text>

          <path
            d="M220 156 l24 0 l-8 -6 l0 12 z"
            fill="var(--accent)"
          />

          <text
            x="420"
            y="130"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            合批后
          </text>
          <rect
            x="360"
            y="140"
            width="120"
            height="28"
            rx="4"
            fill="var(--bg-elevated)"
            stroke="var(--success)"
            strokeWidth="2"
          />
          <text
            x="420"
            y="188"
            textAnchor="middle"
            fontSize="10"
            fill="var(--success)"
          >
            1 Batch（CPU 合并顶点）
          </text>

          <text
            x="320"
            y="212"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            代价：CPU 每帧合并顶点缓冲；移动平台默认常关，顶点数限制更严
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Dynamic Batching 在运行时把满足条件的小网格合并提交；蒙皮网格、多 Pass
        材质、顶点过多都会打断合批。
      </figcaption>
    </figure>
  );
}
