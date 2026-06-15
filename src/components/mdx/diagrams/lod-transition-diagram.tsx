/**
 * <LodTransitionDiagram lod={0|1|2|culled}>：
 * LOD Group 随相机距离切换网格精度示意。
 */

type LodLevel = 0 | 1 | 2 | "culled";

interface Props {
  lod?: LodLevel;
}

const LOD_INFO: Record<
  Exclude<LodLevel, "culled">,
  { tris: string; dist: string; detail: number }
> = {
  0: { tris: "~12k tris", dist: "0–20m", detail: 8 },
  1: { tris: "~4k tris", dist: "20–50m", detail: 4 },
  2: { tris: "~800 tris", dist: "50–100m", detail: 2 },
};

export function LodTransitionDiagram({ lod = 0 }: Props) {
  const showCulled = lod === "culled";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 260"
          role="img"
          aria-label="LOD Group 随距离切换：LOD0 高精度近处，LOD1/LOD2 远处，超出 Culled"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* 相机 */}
          <polygon
            points="48,130 72,118 72,142"
            fill="var(--accent)"
            opacity="0.9"
          />
          <text x="60" y="160" textAnchor="middle" fontSize="10" fill="var(--text-primary)">
            Camera
          </text>

          {/* 距离轴 */}
          <line x1="90" y1="130" x2="580" y2="130" stroke="var(--border)" strokeWidth="2" />
          {[0, 1, 2].map((level) => {
            const x = 180 + level * 140;
            const isActive = !showCulled && lod === level;
            const info = LOD_INFO[level as 0 | 1 | 2];
            const segments = info.detail;
            return (
              <g key={level}>
                <rect
                  x={x - 36}
                  y={isActive ? 88 : 96}
                  width="72"
                  height={isActive ? 64 : 48}
                  rx="6"
                  fill={isActive ? "var(--bg-elevated)" : "var(--bg)"}
                  stroke={isActive ? "var(--accent)" : "var(--border)"}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                {/* 简化的树/物体网格 */}
                {Array.from({ length: segments }).map((_, i) => (
                  <line
                    key={i}
                    x1={x}
                    y1={isActive ? 108 : 112}
                    x2={x - 20 + (i * 40) / segments}
                    y2={isActive ? 132 : 128}
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    opacity={0.5 + i * 0.08}
                  />
                ))}
                <text
                  x={x}
                  y={isActive ? 100 : 104}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  LOD{level}
                </text>
                <text
                  x={x}
                  y="168"
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--text-secondary)"
                >
                  {info.dist}
                </text>
                <text
                  x={x}
                  y="182"
                  textAnchor="middle"
                  fontSize="9"
                  fill={isActive ? "var(--accent)" : "var(--text-secondary)"}
                >
                  {info.tris}
                </text>
              </g>
            );
          })}

          {/* Culled */}
          <g opacity={showCulled ? 1 : 0.35}>
            <rect
              x="528"
              y={showCulled ? 88 : 96}
              width="72"
              height="48"
              rx="6"
              fill="var(--bg)"
              stroke={showCulled ? "var(--accent)" : "var(--border)"}
              strokeWidth={showCulled ? 2.5 : 1.5}
              strokeDasharray="6 4"
            />
            <text x="564" y="124" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              Culled
            </text>
            <text x="564" y="168" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              &gt;100m
            </text>
          </g>

          <text x="320" y="220" textAnchor="middle" fontSize="11" fill="var(--text-primary)">
            {showCulled &&
              "超出最大距离 → 不渲染；LOD Group 在 Inspector 配置各级网格与切换阈值"}
            {!showCulled &&
              lod === 0 &&
              "近处 LOD0：最高面数，玩家能看清细节"}
            {!showCulled &&
              lod === 1 &&
              "中距 LOD1：面数约降 60–70%，轮廓仍可读"}
            {!showCulled &&
              lod === 2 &&
              "远距 LOD2：极简 proxy；再远则 Culled 完全不提交"}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        LOD Group 按与相机距离自动切换 Renderer 网格；跨级切换可用 fade 或 hysteresis 减 pop。
      </figcaption>
    </figure>
  );
}
