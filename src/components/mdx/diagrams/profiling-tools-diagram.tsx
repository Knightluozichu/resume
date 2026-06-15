/**
 * <ProfilingToolsDiagram>：Frame Debugger 与 Profile Analyzer 辅助工具示意。
 */

export function ProfilingToolsDiagram() {
  const tools = [
    {
      title: "Frame Debugger",
      desc: "逐帧看 Draw Call\n检查材质·合批",
      x: 40,
    },
    {
      title: "Profile Analyzer",
      desc: "多份采样对比\n统计回归趋势",
      x: 280,
    },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 520 180"
          role="img"
          aria-label="Frame Debugger 与 Profile Analyzer 辅助分析工具"
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          {tools.map((t) => (
            <g key={t.title}>
              <rect
                x={t.x}
                y="24"
                width="200"
                height="120"
                rx="8"
                fill="var(--bg-elevated)"
                stroke="var(--border)"
                strokeWidth="1.5"
              />
              <text
                x={t.x + 100}
                y="52"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {t.title}
              </text>
              <text
                x={t.x + 100}
                y="78"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                {t.desc.split("\n")[0]}
              </text>
              <text
                x={t.x + 100}
                y="94"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                {t.desc.split("\n")[1]}
              </text>
              <rect
                x={t.x + 24}
                y="108"
                width="152"
                height="24"
                rx="4"
                fill="var(--bg)"
                stroke="var(--accent)"
                strokeWidth="1"
              />
              <text
                x={t.x + 100}
                y="124"
                textAnchor="middle"
                fontSize="10"
                fill="var(--accent)"
              >
                Window → Analysis
              </text>
            </g>
          ))}
          <text
            x="260"
            y="162"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Profiler 定位「哪慢」；这两个工具帮你看清「为什么慢」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Frame Debugger 逐帧审查渲染；Profile Analyzer 批量对比多次采样。
      </figcaption>
    </figure>
  );
}
