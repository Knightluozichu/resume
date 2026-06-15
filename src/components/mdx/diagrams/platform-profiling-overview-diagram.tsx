/**
 * <PlatformProfilingOverviewDiagram>：五平台 Profiling 工具总览。
 *
 * Console / PC / Mobile / XR / Web —— 各平台的 Profiler 连接方式、推荐工具、关键差异总览。
 */

export function PlatformProfilingOverviewDiagram() {
  const platforms = [
    {
      name: "Console",
      sub: "PS5 / Xbox / Switch",
      connection: "DevKit 网络",
      tools: "平台 SDK 自带\nGPU 捕获工具",
      key: "需开发机授权\n功能受限",
      x: 28,
      w: 110,
      color: "#7C5CFF",
    },
    {
      name: "PC",
      sub: "Win / Mac / Linux",
      connection: "本地直连",
      tools: "Unity Profiler\nRenderDoc / NSight",
      key: "Editor 直测\n最方便",
      x: 152,
      w: 110,
      color: "#3FB97F",
    },
    {
      name: "Mobile",
      sub: "Android / iOS",
      connection: "USB / WiFi ADB",
      tools: "Profiler Remote\nXcode / Perfdog",
      key: "需 Development\nBuild + 连线",
      x: 276,
      w: 110,
      color: "#E5B567",
    },
    {
      name: "XR",
      sub: "Quest / Vision Pro",
      connection: "ADB / WiFi",
      tools: "Oculus Debug\nRenderDoc",
      key: "帧预算极紧\n11ms/帧",
      x: 400,
      w: 110,
      color: "#E5675C",
    },
    {
      name: "Web",
      sub: "WebGL / WASM",
      connection: "浏览器 DevTools",
      tools: "Chrome DevTools\nPerformance 面板",
      key: "浏览器沙箱\n无法连 Profiler",
      x: 524,
      w: 110,
      color: "#9B59B6",
    },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 660 220"
          role="img"
          aria-label="五平台 Profiler 工具总览：Console/PC/Mobile/XR/Web 的连接方式与推荐工具"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* Header row */}
          <text
            x="330"
            y="22"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            五平台 Profiling 工具链总览
          </text>
          {platforms.map((p) => (
            <g key={p.name}>
              <rect
                x={p.x}
                y={36}
                width={p.w}
                height="160"
                rx="8"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1.5"
              />
              {/* Color bar at top */}
              <rect
                x={p.x}
                y={36}
                width={p.w}
                height="4"
                rx="2"
                fill={p.color}
              />
              {/* Platform name */}
              <text
                x={p.x + p.w / 2}
                y={58}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {p.name}
              </text>
              <text
                x={p.x + p.w / 2}
                y={74}
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {p.sub}
              </text>
              {/* Connection section */}
              <text
                x={p.x + p.w / 2}
                y="94"
                textAnchor="middle"
                fontSize="9"
                fontWeight="600"
                fill="var(--text-secondary)"
              >
                连接方式
              </text>
              <text
                x={p.x + p.w / 2}
                y="108"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-primary)"
              >
                {p.connection}
              </text>
              {/* Tools section */}
              <text
                x={p.x + p.w / 2}
                y="128"
                textAnchor="middle"
                fontSize="9"
                fontWeight="600"
                fill="var(--text-secondary)"
              >
                推荐工具
              </text>
              {p.tools.split("\n").map((line, li) => (
                <text
                  key={li}
                  x={p.x + p.w / 2}
                  y={142 + li * 13}
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--text-primary)"
                >
                  {line}
                </text>
              ))}
              {/* Key diff */}
              <rect
                x={p.x + 4}
                y={168}
                width={p.w - 8}
                height="22"
                rx="4"
                fill="var(--bg-elevated)"
              />
              <text
                x={p.x + p.w / 2}
                y={182}
                textAnchor="middle"
                fontSize="8"
                fill="var(--text-secondary)"
              >
                {p.key}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        不同平台的 Profiling 工具和连接方式差异巨大——选对工具链、学会连上目标设备是平台专项 Profiling 的第一步。
      </figcaption>
    </figure>
  );
}
