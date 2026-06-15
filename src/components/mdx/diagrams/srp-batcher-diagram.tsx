/**
 * <SrpBatcherDiagram>：GPU Instancing 与 SRP Batcher 对比示意。
 */

type Mode = "instancing" | "srp" | "all";

interface Props {
  /** 高亮 Instancing 或 SRP Batcher 路径 */
  mode?: Mode;
}

export function SrpBatcherDiagram({ mode = "all" }: Props) {
  const instActive = mode === "all" || mode === "instancing";
  const srpActive = mode === "all" || mode === "srp";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 260"
          role="img"
          aria-label="GPU Instancing 与 SRP Batcher：前者一次 draw 画多份相同网格，后者按兼容 Shader 批量提交不同材质"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* GPU Instancing */}
          <rect
            x="24"
            y="24"
            width="280"
            height="200"
            rx="8"
            fill={instActive ? "var(--bg-elevated)" : "var(--bg)"}
            stroke={instActive ? "var(--accent)" : "var(--border)"}
            strokeWidth={instActive ? 2 : 1.5}
          />
          <text
            x="164"
            y="48"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            GPU Instancing
          </text>
          <text
            x="164"
            y="68"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            相同网格 + 相同材质
          </text>
          {/* Same mesh repeated */}
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={80 + i * 56}
              y="88"
              width="40"
              height="40"
              rx="4"
              fill="var(--bg)"
              stroke="var(--success)"
              strokeWidth="1.5"
            />
          ))}
          <text
            x="164"
            y="150"
            textAnchor="middle"
            fontSize="10"
            fontFamily="monospace"
            fill="var(--success)"
          >
            1 Draw · instanceCount=N
          </text>
          <text
            x="164"
            y="168"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            材质勾选 Enable GPU Instancing
          </text>
          <text
            x="164"
            y="204"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            适合：草、子弹、相同 Prefab 海
          </text>

          {/* SRP Batcher */}
          <rect
            x="336"
            y="24"
            width="280"
            height="200"
            rx="8"
            fill={srpActive ? "var(--bg-elevated)" : "var(--bg)"}
            stroke={srpActive ? "var(--accent)" : "var(--border)"}
            strokeWidth={srpActive ? 2 : 1.5}
          />
          <text
            x="476"
            y="48"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            SRP Batcher
          </text>
          <text
            x="476"
            y="68"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            URP/HDRP · 兼容 Shader
          </text>
          {/* Different materials, one batch lane */}
          <rect
            x="360"
            y="88"
            width="48"
            height="40"
            rx="4"
            fill="var(--bg)"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <rect
            x="420"
            y="88"
            width="48"
            height="40"
            rx="4"
            fill="var(--bg)"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <rect
            x="480"
            y="88"
            width="48"
            height="40"
            rx="4"
            fill="var(--bg)"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <rect
            x="360"
            y="136"
            width="168"
            height="20"
            rx="4"
            fill="var(--bg-elevated)"
            stroke="var(--success)"
            strokeWidth="2"
          />
          <text
            x="444"
            y="150"
            textAnchor="middle"
            fontSize="9"
            fill="var(--success)"
          >
            统一 CB 布局 · 少 SetPass
          </text>
          <text
            x="476"
            y="176"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            不同材质参数 · 同 Shader 变体
          </text>
          <text
            x="476"
            y="204"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            适合：大量不同颜色/参数的 Lit 物体
          </text>

          <text
            x="320"
            y="248"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            二者可叠加：Instancing 管「同网格多份」，SRP Batcher 管「兼容 Shader 批量提交」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        GPU Instancing 用一次 draw 画 N 个相同物体；SRP Batcher（URP/HDRP）按兼容
        Shader 批量提交，减少材质切换——现代管线里常比 Dynamic Batching 更实用。
      </figcaption>
    </figure>
  );
}
