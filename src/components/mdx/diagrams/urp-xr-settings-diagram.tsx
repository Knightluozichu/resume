/**
 * <UrpXrSettingsDiagram highlight="rendering|input|all">：
 * URP XR 项目设置与 XR 输入/追踪 CPU 开销示意。
 */

type XrHighlight = "rendering" | "input" | "all";

interface Props {
  highlight?: XrHighlight;
}

const ROWS: { key: XrHighlight; label: string; items: string[]; y: number }[] = [
  {
    key: "rendering",
    label: "URP · XR 渲染",
    items: [
      "XR Plug-in Management（OpenXR / Oculus）",
      "URP Renderer · Single Pass Instanced",
      "Render Scale / MSAA / FFR 等级",
      "Late Latch / Application SpaceWarp",
    ],
    y: 56,
  },
  {
    key: "input",
    label: "XR · 输入与追踪",
    items: [
      "XR Input Subsystem · 每帧 Poll",
      "Hand / Controller 追踪数据",
      "Haptic · 物理射线 UI 命中",
      "Input System + XR Interaction Toolkit",
    ],
    y: 148,
  },
];

export function UrpXrSettingsDiagram({ highlight = "all" }: Props) {
  const active = (key: XrHighlight) => highlight === "all" || highlight === key;

  const captions: Record<XrHighlight, string> = {
    all: "Project Settings 中 XR 与 URP 需成对配置；输入追踪与渲染同帧竞争 CPU 预算。",
    rendering: "优先 Single Pass Instanced、合理 Render Scale；Post 与全屏 Pass 在 XR 下成本翻倍感知。",
    input: "XR 输入每帧 Poll 设备姿态；过多 Raycast / UI 交互与 Hand 骨骼更新会抬 CPU ms。",
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 520 280"
          role="img"
          aria-label="URP XR 设置与输入开销"
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          <text x="20" y="28" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            URP XR 设置 · 渲染 vs 输入 CPU
          </text>

          {ROWS.map((row) => {
            const on = active(row.key);
            return (
              <g key={row.key}>
                <rect
                  x="20"
                  y={row.y}
                  width="480"
                  height="82"
                  rx="8"
                  fill={on ? "var(--bg-elevated)" : "var(--bg)"}
                  stroke={on ? "var(--accent)" : "var(--border)"}
                  strokeWidth={on ? 2 : 1.5}
                />
                <text
                  x="36"
                  y={row.y + 22}
                  fontSize="11"
                  fontWeight="600"
                  fill={on ? "var(--accent)" : "var(--text-primary)"}
                >
                  {row.label}
                </text>
                {row.items.map((item, i) => (
                  <text
                    key={item}
                    x="36"
                    y={row.y + 40 + i * 14}
                    fontSize="9"
                    fill="var(--text-secondary)"
                  >
                    • {item}
                  </text>
                ))}
                {row.key === "input" && on && (
                  <text x="380" y={row.y + 50} fontSize="10" fill="var(--danger)" fontWeight="600">
                    CPU ↑
                  </text>
                )}
                {row.key === "rendering" && on && (
                  <text x="380" y={row.y + 50} fontSize="10" fill="var(--accent)" fontWeight="600">
                    GPU ↑
                  </text>
                )}
              </g>
            );
          })}

          {/* 帧内时间线 */}
          <text x="20" y="252" fontSize="9" fill="var(--text-secondary)">
            单帧顺序：Input Poll → Script Update → XR 渲染(双眼) → EndFrame · Profiler 分开看 XR 与 PlayerLoop
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {captions[highlight]}
      </figcaption>
    </figure>
  );
}
