/**
 * <FoveatedRenderingDiagram level="off|medium|high">：
 * 注视点渲染：中心高分辨率、周边降采样示意。
 */

type FoveatedLevel = "off" | "medium" | "high";

interface Props {
  level?: FoveatedLevel;
}

const RINGS: Record<FoveatedLevel, { radii: number[]; opacities: number[]; label: string }> = {
  off: {
    radii: [90],
    opacities: [1],
    label: "均匀分辨率 · 周边与中心同采样密度",
  },
  medium: {
    radii: [28, 58, 90],
    opacities: [1, 0.65, 0.35],
    label: "中等注视点：中心 1× · 中环 0.5× · 外环 0.25×",
  },
  high: {
    radii: [22, 48, 72, 90],
    opacities: [1, 0.55, 0.3, 0.15],
    label: "激进注视点：仅 fovea 全分辨率，外围大幅降采样",
  },
};

export function FoveatedRenderingDiagram({ level = "medium" }: Props) {
  const cfg = RINGS[level];
  const cx = 130;
  const cy = 118;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 480 240"
          role="img"
          aria-label="注视点渲染分辨率分布示意"
          className="mx-auto block h-auto w-full max-w-[480px]"
        >
          <text x="20" y="26" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            Foveated Rendering（注视点渲染）
          </text>
          <text x="20" y="44" fontSize="10" fill="var(--text-secondary)">
            人眼周边视觉分辨率低 · GPU 在周边用更少像素/shader 采样
          </text>

          {/* 左眼视图 */}
          <text x="130" y="68" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            单眼视场（俯视）
          </text>
          <circle cx={cx} cy={cy} r="92" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          {[...cfg.radii].reverse().map((r, i) => {
            const idx = cfg.radii.length - 1 - i;
            const op = cfg.opacities[idx];
            return (
              <circle
                key={r}
                cx={cx}
                cy={cy}
                r={r}
                fill="var(--accent)"
                opacity={op * 0.55}
                stroke="var(--accent)"
                strokeWidth={idx === 0 ? 2 : 1}
                strokeOpacity={0.6}
              />
            );
          })}
          <circle cx={cx} cy={cy} r="4" fill="var(--accent)" />
          <text x={cx} y={cy + 4} textAnchor="middle" fontSize="8" fill="var(--bg)" fontWeight="600">
            ●
          </text>
          <text x={cx} y={cy + 108} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            注视方向
          </text>

          {/* 图例 */}
          <g transform="translate(280, 72)">
            <text x="0" y="0" fontSize="10" fontWeight="600" fill="var(--text-primary)">
              采样密度
            </text>
            {level === "off" ? (
              <text x="0" y="24" fontSize="9" fill="var(--text-secondary)">
                全屏统一 · Fill rate 最高
              </text>
            ) : (
              cfg.radii.map((r, i) => (
                <g key={r} transform={`translate(0, ${20 + i * 22})`}>
                  <rect
                    x="0"
                    y="-8"
                    width="14"
                    height="14"
                    rx="2"
                    fill="var(--accent)"
                    opacity={cfg.opacities[i] * 0.7}
                  />
                  <text x="22" y="4" fontSize="9" fill="var(--text-secondary)">
                    {i === 0 ? "Fovea 1.0×" : i === 1 ? "Mid 0.5×" : i === 2 ? "Periph 0.25×" : "Far 0.125×"}
                  </text>
                </g>
              ))
            )}
          </g>

          {/* 平台说明 */}
          <rect x="20" y="168" width="440" height="58" rx="6" fill="var(--bg)" stroke="var(--border)" />
          <text x="36" y="188" fontSize="9" fill="var(--text-secondary)">
            Quest / OpenXR：Fixed Foveated Rendering (FFR) · PSVR2：Gaze-contingent（需眼动）
          </text>
          <text x="36" y="204" fontSize="9" fill="var(--text-secondary)">
            URP：XR Plug-in 或设备 SDK 暴露 FFR 等级 · 与 MSAA/动态分辨率叠加需 Profiler 验证
          </text>
          <text x="36" y="218" fontSize="9" fontWeight="500" fill="var(--accent)">
            {cfg.label}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        注视点渲染把像素预算集中在视线中心，周边降采样可显著降 Fragment 成本，边缘过激进会出现「游泳」伪影。
      </figcaption>
    </figure>
  );
}
