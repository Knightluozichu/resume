/**
 * <LinearHdrPipelineDiagram />：「PBR·光照」§3「线性空间与 HDR 管线」配图（HEL-163，C 实战型）。
 *
 * 管线示意：从左到右四个阶段——
 *   线性空间输入 → HDR 累积（Lo 可超 1.0）→ 色调映射 Reinhard → Gamma 校正 → sRGB 输出
 * 每个阶段下方标注数值范围（0-∞ → 0-1 → 0-1 sRGB）。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * 视觉语言：token 色，无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function LinearHdrPipelineDiagram() {
  const stages = [
    {
      label: "线性空间输入",
      sub: "albedo / light 均在线性空间",
      range: "值域：0 ~ ∞",
      color: "var(--text-primary)",
      bg: "var(--bg)",
    },
    {
      label: "HDR 累积",
      sub: "Lo += radiance × NdotL",
      range: "可能 > 1.0",
      color: "var(--warning)",
      bg: "var(--bg)",
    },
    {
      label: "Reinhard 色调映射",
      sub: "c / (c + 1)",
      range: "压缩到 0 ~ 1",
      color: "var(--accent)",
      bg: "var(--bg)",
    },
    {
      label: "Gamma 校正",
      sub: "pow(c, 1/2.2)",
      range: "0 ~ 1 sRGB",
      color: "var(--success)",
      bg: "var(--bg)",
    },
  ];

  const boxW = 110;
  const boxH = 56;
  const gap = 22;
  const startX = 20;
  const baseY = 60;
  const totalW = stages.length * boxW + (stages.length - 1) * gap + startX * 2;

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${totalW} 170`}
          role="img"
          aria-label="线性 HDR 渲染管线示意图。四个阶段从左到右：线性空间输入（值域 0 到无穷），HDR 累积（Lo 值可能超过 1），Reinhard 色调映射（压缩到 0 到 1），Gamma 校正（输出 sRGB）。说明 PBR 必须在线性空间做光照计算，最后经色调映射和 gamma 校正才能正确显示。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <text
            x={totalW / 2}
            y="22"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            线性空间 → HDR → 色调映射 → Gamma 管线
          </text>

          <defs>
            <marker
              id="lhp-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {stages.map((s, i) => {
            const x = startX + i * (boxW + gap);
            return (
              <g key={i}>
                {/* box */}
                <rect
                  x={x}
                  y={baseY}
                  width={boxW}
                  height={boxH}
                  rx="6"
                  fill={s.bg}
                  stroke={s.color}
                  strokeWidth="1.5"
                />
                <text
                  x={x + boxW / 2}
                  y={baseY + 18}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="600"
                  fill={s.color}
                >
                  {s.label}
                </text>
                <text
                  x={x + boxW / 2}
                  y={baseY + 32}
                  textAnchor="middle"
                  fontSize="7.5"
                  fill="var(--text-secondary)"
                >
                  {s.sub}
                </text>
                <text
                  x={x + boxW / 2}
                  y={baseY + 46}
                  textAnchor="middle"
                  fontSize="7"
                  fill="var(--text-secondary)"
                  opacity="0.7"
                >
                  {s.range}
                </text>
                {/* arrow to next */}
                {i < stages.length - 1 && (
                  <line
                    x1={x + boxW}
                    y1={baseY + boxH / 2}
                    x2={x + boxW + gap}
                    y2={baseY + boxH / 2}
                    stroke="var(--text-secondary)"
                    strokeWidth="1.2"
                    markerEnd="url(#lhp-arrow)"
                  />
                )}
              </g>
            );
          })}

          {/* warning callout below */}
          <rect
            x={startX}
            y="140"
            width={totalW - startX * 2}
            height="22"
            rx="6"
            fill="var(--warning)"
            opacity="0.1"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          <text
            x={totalW / 2}
            y="155"
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="var(--warning)"
          >
            在 sRGB 空间做光照计算 = 物理错误（最常见 PBR 误区之一）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        PBR 要求在<strong>线性空间</strong>做所有光照运算。光源辐射度可以很大（HDR），
        累积后用 <strong>Reinhard 色调映射</strong>把高动态范围压缩到 0~1，
        最后做 <strong>gamma 校正</strong>输出到屏幕的 sRGB 色彩空间。
      </figcaption>
    </figure>
  );
}
