/**
 * <ProfilerExportDiagram>：Profiler 数据导出流程示意图。
 *
 * 三步导出链路：录制并保存 .data → Profile Analyzer 批量导入 → 统计对比导出 CSV/报告。
 */

export function ProfilerExportDiagram() {
  const steps = [
    {
      step: 1,
      label: "录制 .data",
      detail: "Profiler 窗口\nSave 按钮保存采样",
      color: "var(--accent)",
    },
    {
      step: 2,
      label: "批量导入",
      detail: "Profile Analyzer\n拖入多份 .data 对齐",
      color: "var(--accent-secondary)",
    },
    {
      step: 3,
      label: "统计导出",
      detail: "中位数/标准差/回归\n导出 CSV·PNG·报告",
      color: "var(--text-primary)",
    },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 600 170"
          role="img"
          aria-label="Profiler 数据导出流程：录制 .data → 批量导入 Profile Analyzer → 统计导出 CSV/PNG/报告"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          {steps.map((s, i) => {
            const x = 30 + i * 190;
            return (
              <g key={s.label}>
                <rect
                  x={x}
                  y="32"
                  width="160"
                  height="100"
                  rx="8"
                  fill="var(--bg-elevated)"
                  stroke={s.color}
                  strokeWidth="2"
                />
                <circle cx={x + 20} cy="52" r="10" fill={s.color} />
                <text
                  x={x + 20}
                  y="56"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--bg)"
                >
                  {s.step}
                </text>
                <text
                  x={x + 80}
                  y="56"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {s.label}
                </text>
                <line
                  x1={x + 16}
                  y1="70"
                  x2={x + 144}
                  y2="70"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <text
                  x={x + 80}
                  y="90"
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {s.detail.split("\n")[0]}
                </text>
                <text
                  x={x + 80}
                  y="108"
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {s.detail.split("\n")[1]}
                </text>
                {i < steps.length - 1 && (
                  <>
                    <line
                      x1={x + 164}
                      y1="82"
                      x2={x + 178}
                      y2="82"
                      stroke="var(--border)"
                      strokeWidth="2"
                    />
                    <path
                      d={`M${x + 178} 82 l-8 -4 l0 8 z`}
                      fill="var(--border)"
                    />
                  </>
                )}
              </g>
            );
          })}
          <text
            x="300"
            y="158"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            不是一次录制就完——多份采样 + 统计对比才能排除偶然波动
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Profiler 数据导出链路：录制 → 批量导入 Profile Analyzer →
        统计导出。多份采样相互印证。
      </figcaption>
    </figure>
  );
}
