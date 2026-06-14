/**
 * <AndroidArchLayersDiagram>：Android 系统分层架构图。
 *
 * 展示 Android 经典五层架构：应用层 → 应用框架层 → ART/原生库 → HAL → Linux 内核。
 * 每层高亮关键组件，右侧标注各层职责。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 */

const LAYERS = [
  {
    label: "应用层",
    en: "Applications",
    y: 16,
    h: 38,
    color: "var(--accent)",
    bgAlpha: 0.12,
    items: ["系统应用（电话/短信/相机）", "第三方应用", "Launcher"],
  },
  {
    label: "应用框架层",
    en: "Application Framework",
    y: 60,
    h: 56,
    color: "#3FB97F",
    bgAlpha: 0.08,
    items: [
      "Activity Manager",
      "Window Manager",
      "Content Providers",
      "Package Manager",
      "Notification Manager",
    ],
  },
  {
    label: "系统运行库层",
    en: "ART + Native Libraries",
    y: 122,
    h: 56,
    color: "#E5B567",
    bgAlpha: 0.08,
    items: [
      "Android Runtime (ART)",
      "OpenGL/ES · SQLite",
      "WebKit · SSL",
      "Media Framework",
    ],
  },
  {
    label: "硬件抽象层",
    en: "HAL",
    y: 184,
    h: 38,
    color: "#E5675C",
    bgAlpha: 0.08,
    items: ["Audio HAL", "Camera HAL", "Sensor HAL", "Graphics HAL"],
  },
  {
    label: "Linux 内核层",
    en: "Linux Kernel",
    y: 228,
    h: 38,
    color: "#7C5CFF",
    bgAlpha: 0.05,
    items: ["进程管理", "内存管理", "Binder IPC", "电源管理"],
  },
];

export function AndroidArchLayersDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 700 300"
          role="img"
          aria-label="Android 系统五层架构：应用层 → 应用框架层 → ART/原生库 → HAL 硬件抽象层 → Linux 内核"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {LAYERS.map((layer) => (
            <g key={layer.label}>
              {/* 层背景 */}
              <rect
                x="8"
                y={layer.y}
                width="460"
                height={layer.h}
                rx="6"
                fill={layer.color}
                fillOpacity={layer.bgAlpha}
                stroke={layer.color}
                strokeWidth="1.5"
              />
              {/* 层标题 */}
              <text
                x="22"
                y={layer.y + 16}
                fontSize="12"
                fontWeight="600"
                fill={layer.color}
              >
                {layer.label}
                <tspan fill="var(--text-secondary)" fontSize="10">
                  {" "}
                  ({layer.en})
                </tspan>
              </text>
              {/* 层内组件 */}
              {layer.items.map((item, j) => {
                const cols = layer.items.length;
                const cellW = 420 / cols;
                const cx = 22 + j * cellW + cellW / 2;
                return (
                  <g key={item}>
                    <rect
                      x={22 + j * cellW + 4}
                      y={layer.y + 20}
                      width={cellW - 8}
                      height={layer.h - 26}
                      rx="4"
                      fill="var(--bg)"
                      stroke="var(--border)"
                      strokeWidth="0.8"
                    />
                    <text
                      x={cx}
                      y={layer.y + 32 + (layer.h - 40) / 2}
                      textAnchor="middle"
                      fontSize="10"
                      fill="var(--text-secondary)"
                    >
                      {item}
                    </text>
                  </g>
                );
              })}

              {/* 右侧职责说明 */}
              <text
                x="480"
                y={layer.y + layer.h / 2 + 5}
                fontSize="11"
                fill="var(--text-secondary)"
              >
                {layer.label === "应用层" && "用户直接交互的 App"}
                {layer.label === "应用框架层" && "提供 API，管理组件与资源"}
                {layer.label === "系统运行库层" && "C/C++ 库 + Java 运行时"}
                {layer.label === "硬件抽象层" && "封装硬件差异，统一接口"}
                {layer.label === "Linux 内核层" && "底层驱动与系统服务"}
              </text>
            </g>
          ))}

          {/* 层级箭头连接线 */}
          {LAYERS.slice(0, -1).map((layer, i) => {
            const next = LAYERS[i + 1];
            const cx = 240;
            const y1 = layer.y + layer.h;
            const y2 = next.y;
            const midY = (y1 + y2) / 2;
            return (
              <g key={`arrow-${i}`}>
                <line
                  x1={cx}
                  y1={y1}
                  x2={cx}
                  y2={y2}
                  stroke="var(--border)"
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />
                <path
                  d={`M${cx} ${y2} l-4 -5 l8 0 z`}
                  fill="var(--border)"
                />
              </g>
            );
          })}

          {/* 底部调用方向标注 */}
          <text
            x="16"
            y="282"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            上层依赖下层（调用方向 ↓），下层不感知上层
          </text>
          <text
            x="16"
            y="296"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            Binder IPC 跨越层级实现进程间通信
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Android 系统五层架构：每层各司其职，上层通过 API 调用下层服务。
        应用开发者主要工作在应用层和应用框架层，系统工程师则需要理解从 Kernel 到 Framework 的全链路。
      </figcaption>
    </figure>
  );
}
