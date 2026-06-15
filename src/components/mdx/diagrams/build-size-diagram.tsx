/**
 * <BuildSizeDiagram>：Build Settings 包体优化核心流程示意图。
 *
 * 从 Editor Log Build Report 出发 → 按资源类别定位 → 执行减包操作 → 验证。
 * 四步流程 + 底部速查表。
 */

export function BuildSizeDiagram() {
  const steps = [
    {
      label: "打开 Build Report",
      sub: "Editor Log",
      detail: "Console → Open Editor Log\n搜索 Build Report",
    },
    {
      label: "按类别定位",
      sub: "排序找大户",
      detail: "纹理 · 网格 · 音频 · 代码\nShaders · Assembly",
    },
    {
      label: "逐平台压缩",
      sub: "Platform Overrides",
      detail: "ASTC/ETC2 纹理\nVorbis 音频 · Strip 代码",
    },
    {
      label: "验证包体",
      sub: "Build & Run",
      detail: "同一配置 Build 对比\n记录每类资源前后大小",
    },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 520 150"
          role="img"
          aria-label="Build 包体优化流程：打开 Build Report → 按类别定位 → 逐平台压缩 → 验证包体"
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          {steps.map((s, i) => {
            const x = 20 + i * 130;
            return (
              <g key={s.label}>
                <rect
                  x={x}
                  y="24"
                  width="110"
                  height="90"
                  rx="6"
                  fill="var(--bg)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                />
                {/* 序号圆圈放在左上角 */}
                <circle
                  cx={x + 14}
                  cy="36"
                  r="9"
                  fill="var(--accent)"
                />
                <text
                  x={x + 14}
                  y="40"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill="var(--bg)"
                >
                  {i + 1}
                </text>
                {/* 步骤标题居中，在圆圈正下方 */}
                <text
                  x={x + 55}
                  y="56"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {s.label}
                </text>
                <text
                  x={x + 55}
                  y="70"
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {s.sub}
                </text>
                {s.detail.split("\n").map((line, j) => (
                  <text
                    key={j}
                    x={x + 55}
                    y={84 + j * 12}
                    textAnchor="middle"
                    fontSize="9"
                    fill="var(--text-secondary)"
                  >
                    {line}
                  </text>
                ))}
                {i < steps.length - 1 && (
                  <path
                    d={`M${x + 112} 66 l10 0 l-4 -4 m4 4 l-4 4`}
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                )}
              </g>
            );
          })}
        </svg>
        <div className="mt-3 rounded-md border border-border bg-bg p-2">
          <p className="text-center text-[11px] font-semibold text-accent">
            减包速查：Texture 压缩 40-70% · Mesh 30-50% · Audio 60-80% · Strip Code 5-20MB
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Build Report 是减包的起点——先看谁占空间最大，再逐类设 Platform Overrides。
      </figcaption>
    </figure>
  );
}
