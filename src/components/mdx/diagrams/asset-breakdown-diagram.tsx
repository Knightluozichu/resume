/**
 * <AssetBreakdownDiagram />：内存资源分类占用堆叠条形图。
 *
 * 横向堆叠条展示 Textures（最大）、Meshes、Audio、Scripts、Shaders 各自占比。
 */

export function AssetBreakdownDiagram() {
  const segments = [
    { label: "Textures", pct: 45, color: "var(--accent)" },
    { label: "Meshes", pct: 22, color: "var(--success)" },
    { label: "Audio", pct: 16, color: "var(--warning)" },
    { label: "Scripts", pct: 10, color: "var(--info)" },
    { label: "Shaders", pct: 7, color: "var(--accent)", opacity: 0.5 },
  ];

  const barY = 80;
  const barH = 48;
  const barX = 40;
  const barW = 480;

  let cumX = barX;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 300"
          role="img"
          aria-label="内存资源分类：纹理占最大比例，其次是网格、音频、脚本、着色器"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* Title */}
          <text
            x="280"
            y="28"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            内存资源分类占用
          </text>
          <text
            x="280"
            y="48"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            典型 Unity 项目的 Native Memory 分布
          </text>

          {/* Stacked bar */}
          {segments.map((seg, i) => {
            const w = (seg.pct / 100) * barW;
            const x = cumX;
            cumX += w;
            return (
              <g key={seg.label}>
                <rect
                  x={x}
                  y={barY}
                  width={w}
                  height={barH}
                  rx={i === 0 ? 6 : 0}
                  fill={seg.color}
                  opacity={seg.opacity ?? 0.85}
                />
                {/* Percentage label inside bar (only if wide enough) */}
                {w > 40 && (
                  <text
                    x={x + w / 2}
                    y={barY + barH / 2 + 4}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill="white"
                  >
                    {seg.pct}%
                  </text>
                )}
              </g>
            );
          })}

          {/* Round the right end */}
          <rect
            x={barX + barW - 6}
            y={barY}
            width="6"
            height={barH}
            rx="0"
            fill={segments[segments.length - 1].color}
            opacity={segments[segments.length - 1].opacity ?? 0.85}
          />

          {/* Legend */}
          {(() => {
            const legendY = 160;
            const colW = 110;
            const startX = 280 - (segments.length * colW) / 2;
            return segments.map((seg, i) => (
              <g key={`legend-${seg.label}`}>
                <rect
                  x={startX + i * colW}
                  y={legendY}
                  width="14"
                  height="14"
                  rx="3"
                  fill={seg.color}
                  opacity={seg.opacity ?? 0.85}
                />
                <text
                  x={startX + i * colW + 20}
                  y={legendY + 11}
                  fontSize="11"
                  fill="var(--text-primary)"
                >
                  {seg.label}
                </text>
              </g>
            ));
          })()}

          {/* Breakdown details */}
          {[
            { label: "Textures", detail: "2048x2048 RGBA ≈ 16MB/张", y: 210 },
            { label: "Meshes", detail: "10 万顶点 ≈ 10MB+/模型", y: 230 },
            { label: "Audio", detail: "Decompress On Load ≈ 30-50MB/首", y: 250 },
            { label: "Scripts", detail: "Mono/IL2CPP 托管堆", y: 270 },
            { label: "Shaders", detail: "编译后变体占显存", y: 290 },
          ].map((item) => (
            <text
              key={item.label}
              x="280"
              y={item.y}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              {item.label}：{item.detail}
            </text>
          ))}
        </svg>
      </div>
    </figure>
  );
}
