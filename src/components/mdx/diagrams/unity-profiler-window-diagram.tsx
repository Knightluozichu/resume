/**
 * <UnityProfilerWindowDiagram highlight="cpu|rendering|memory|audio|none">：
 * Unity Profiler 窗口示意，标注 CPU Usage / Rendering / Memory / Audio 区域。
 */

type ModuleHighlight = "none" | "cpu" | "rendering" | "memory" | "audio";

interface Props {
  highlight?: ModuleHighlight;
}

export function UnityProfilerWindowDiagram({
  highlight = "none",
}: Props) {
  const modules: {
    id: ModuleHighlight;
    label: string;
    sub: string;
    y: number;
    h: number;
  }[] = [
    { id: "cpu", label: "CPU Usage", sub: "脚本·物理·动画", y: 52, h: 44 },
    {
      id: "rendering",
      label: "Rendering",
      sub: "Draw Call·GPU 时间",
      y: 100,
      h: 44,
    },
    { id: "memory", label: "Memory", sub: "堆·纹理·网格", y: 148, h: 44 },
    { id: "audio", label: "Audio", sub: "混音·DSP", y: 196, h: 36 },
  ];

  const isOn = (id: ModuleHighlight) =>
    highlight === "none" || highlight === id;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 520 260"
          role="img"
          aria-label="Unity Profiler 窗口：CPU Usage、Rendering、Memory、Audio 模块"
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          {/* 窗口标题栏 */}
          <rect
            x="16"
            y="16"
            width="488"
            height="28"
            rx="6"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="32"
            y="34"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Profiler — Play Mode
          </text>
          <text x="400" y="34" fontSize="10" fill="var(--text-secondary)">
            Record · Deep Profile
          </text>

          {/* 时间轴 */}
          <line
            x1="32"
            y1="48"
            x2="488"
            y2="48"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text x="32" y="46" fontSize="9" fill="var(--text-secondary)">
            0ms ——— 16ms (60 FPS) ——— 33ms
          </text>

          {modules.map((m) => {
            const active = isOn(m.id);
            return (
              <g key={m.id}>
                <rect
                  x="24"
                  y={m.y}
                  width="472"
                  height={m.h}
                  rx="6"
                  fill={active ? "var(--bg-elevated)" : "var(--bg)"}
                  stroke={active ? "var(--accent)" : "var(--border)"}
                  strokeWidth={active && highlight !== "none" ? 2 : 1}
                />
                <text
                  x="40"
                  y={m.y + 18}
                  fontSize="12"
                  fontWeight="600"
                  fill={
                    active ? "var(--text-primary)" : "var(--text-secondary)"
                  }
                >
                  {m.label}
                </text>
                <text
                  x="40"
                  y={m.y + 32}
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {m.sub}
                </text>
                {/* 模拟波形条 */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((bar) => (
                  <rect
                    key={bar}
                    x={160 + bar * 38}
                    y={m.y + 12}
                    width="28"
                    height={m.h - 24}
                    rx="2"
                    fill={
                      active
                        ? "var(--accent)"
                        : "var(--border)"
                    }
                    opacity={0.3 + (bar % 3) * 0.2}
                  />
                ))}
              </g>
            );
          })}

          {highlight === "none" && (
            <text
              x="260"
              y="248"
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-secondary)"
            >
              四大模块各司其职——下文逐块拆开看
            </text>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Unity Profiler 主窗口：纵向堆叠的 CPU、渲染、内存、音频模块，每帧采样耗时。
      </figcaption>
    </figure>
  );
}
