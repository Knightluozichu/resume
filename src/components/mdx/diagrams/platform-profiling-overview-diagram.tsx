/**
 * <PlatformProfilingOverviewDiagram>：Ch7 平台专项 Profiling §3「五平台差异总览」核心图示。
 *
 * 五列卡片式布局：Console / PC / Mobile / XR / Web，每列标注平台名、推荐工具链、
 * 典型瓶颈特征。一眼看清五个平台的 Profiling 全景，选对工具、读对自己平台的数据。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--danger/
 * --bg/--bg-elevated/--border/--text-primary/--text-secondary），无阴影、无裸 hex（硬规则 5）。
 */
export function PlatformProfilingOverviewDiagram() {
  const platforms = [
    {
      name: "Console",
      tools: "PIX\nSN Systems\nNintendo TM",
      bottleneck: "帧预算硬限制\n16.67ms",
      accent: "var(--accent)",
    },
    {
      name: "PC",
      tools: "Profiler\nRenderDoc\nNSight/GPA",
      bottleneck: "配置不统一\n驱动差异",
      accent: "var(--success)",
    },
    {
      name: "Mobile",
      tools: "Profiler 远程\nPerfdog\nXcode Inst.",
      bottleneck: "温控降频\n功耗 > 帧率",
      accent: "var(--warning)",
    },
    {
      name: "XR",
      tools: "OVR Metrics\nPerf HUD\nTimeWarp",
      bottleneck: "≥72 FPS 硬要求\n晕动症红线",
      accent: "var(--danger)",
    },
    {
      name: "Web",
      tools: "Chrome DevTools\nPerformance\nMemory",
      bottleneck: "浏览器 GC 尖刺\n沙箱限制",
      accent: "#6C6CF0",
    },
  ];

  const colW = 104;
  const startX = 32;
  const gap = 12;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 640 290"
          role="img"
          aria-label="五平台 Profiling 工具链总览图。五列卡片从左到右分别是 Console、PC、Mobile、XR、Web，每列标注：平台名、推荐工具链、典型瓶颈特征。Console 用 PIX/SN Systems 厂商工具，帧预算硬限制 16.67ms；PC 用 Unity Profiler 加 RenderDoc 加显卡厂商工具，配置不统一、驱动差异大；Mobile 用 Unity Profiler 远程连接加 Perfdog 移动端监控，温控降频是最大威胁、省电比帧率峰值更重要；XR 用 OVR Metrics Tool 加 Perf HUD，必须稳定 72 FPS 以上否则晕动症；Web 只能用 Chrome DevTools Performance 和 Memory 面板，受浏览器 GC 尖刺和沙箱限制。底部一句话：每个平台有自己的工具链和瓶颈特征，换平台不换工具、百分之百出问题。"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* 背景层 */}
          <rect
            x="12"
            y="8"
            width="616"
            height="242"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* 五列 */}
          {platforms.map((p, i) => {
            const x = startX + i * (colW + gap);
            return (
              <g key={p.name}>
                {/* 列背景卡片 */}
                <rect
                  x={x}
                  y="20"
                  width={colW}
                  height="220"
                  rx="6"
                  fill="var(--bg-elevated)"
                  stroke="var(--border)"
                  strokeWidth="1"
                />

                {/* 顶部色条（平台标识） */}
                <rect
                  x={x + 8}
                  y="28"
                  width={colW - 16}
                  height="4"
                  rx="2"
                  fill={p.accent}
                />

                {/* 平台名 */}
                <text
                  x={x + colW / 2}
                  y="60"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {p.name}
                </text>

                {/* 工具链标签 */}
                <text
                  x={x + colW / 2}
                  y="84"
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                >
                  工具链
                </text>
                {p.tools.split("\n").map((line, li) => (
                  <text
                    key={li}
                    x={x + colW / 2}
                    y={100 + li * 13}
                    textAnchor="middle"
                    fontSize="8.5"
                    fontFamily="monospace"
                    fill="var(--text-primary)"
                  >
                    {line}
                  </text>
                ))}

                {/* 分隔线 */}
                <line
                  x1={x + 12}
                  y1={150}
                  x2={x + colW - 12}
                  y2={150}
                  stroke="var(--border)"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                />

                {/* 瓶颈特征 */}
                <text
                  x={x + colW / 2}
                  y={168}
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                >
                  典型瓶颈
                </text>
                {p.bottleneck.split("\n").map((line, li) => (
                  <text
                    key={li}
                    x={x + colW / 2}
                    y={184 + li * 13}
                    textAnchor="middle"
                    fontSize="8"
                    fill={li === 0 ? p.accent : "var(--text-secondary)"}
                    fontWeight={li === 0 ? "600" : "400"}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          {/* 底部总结 */}
          <text
            x="320"
            y="278"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            每个平台有自己的工具链和瓶颈特征——换平台不换工具，百分之百出问题
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        五个平台各有专属工具链和标志性瓶颈。Console 帧预算硬限制、Mobile
        温控降频是头号敌人、XR 低于 72 FPS 就晕动症、Web 受浏览器沙箱调度干扰。
      </figcaption>
    </figure>
  );
}
