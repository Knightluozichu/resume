/**
 * <OcclusionCullingDiagram mode="off|on">：
 * 遮挡剔除：被墙体挡住的物体是否仍提交绘制。
 */

type OcclusionMode = "off" | "on";

interface Props {
  mode?: OcclusionMode;
}

export function OcclusionCullingDiagram({ mode = "off" }: Props) {
  const culled = mode === "on";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 240"
          role="img"
          aria-label="遮挡剔除：墙体后的物体在 Occlusion Culling 开启时不绘制"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* 相机视锥 */}
          <path
            d="M 40 120 L 120 60 L 120 180 Z"
            fill="var(--accent)"
            opacity="0.12"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text x="56" y="124" fontSize="10" fill="var(--text-primary)">
            视锥
          </text>

          {/* 遮挡墙 */}
          <rect
            x="200"
            y="48"
            width="24"
            height="144"
            rx="4"
            fill="var(--text-secondary)"
            opacity="0.85"
          />
          <text x="212" y="40" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            Occluder
          </text>

          {/* 可见物体 */}
          <rect
            x="140"
            y="100"
            width="48"
            height="48"
            rx="6"
            fill="var(--accent)"
            opacity="0.75"
          />
          <text x="164" y="128" textAnchor="middle" fontSize="10" fill="var(--text-primary)">
            可见
          </text>

          {/* 被挡物体 */}
          <rect
            x="280"
            y="88"
            width="56"
            height="56"
            rx="6"
            fill={culled ? "var(--border)" : "var(--warning)"}
            opacity={culled ? 0.25 : 0.7}
            stroke={culled ? "var(--text-secondary)" : "var(--warning)"}
            strokeWidth="2"
            strokeDasharray={culled ? "6 4" : undefined}
          />
          <text
            x="308"
            y="120"
            textAnchor="middle"
            fontSize="10"
            fill={culled ? "var(--text-secondary)" : "var(--text-primary)"}
          >
            {culled ? "已剔除" : "仍绘制!"}
          </text>

          {/* 远处仍可见 */}
          <rect
            x="400"
            y="96"
            width="48"
            height="48"
            rx="6"
            fill="var(--accent)"
            opacity="0.75"
          />
          <text x="424" y="124" textAnchor="middle" fontSize="10" fill="var(--text-primary)">
            可见
          </text>

          {/* 烘焙数据提示 */}
          <rect
            x="40"
            y="196"
            width="560"
            height="32"
            rx="6"
            fill="var(--bg)"
            stroke="var(--border)"
          />
          <text x="320" y="216" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            {mode === "off"
              ? "仅 Frustum Culling：视锥内但被挡的物体仍会 Draw → Overdraw / Vertex 浪费"
              : "Occlusion Culling 烘焙后：被 Occluder 挡住的 Renderer 跳过 Draw Call"}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Window → Rendering → Occlusion Culling 烘焙 Occluder/Occludee；适合室内、城市峡谷等静态遮挡。
      </figcaption>
    </figure>
  );
}
