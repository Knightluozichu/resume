/**
 * <IntegerRangeDiagram>：有符号/无符号整数不同位宽的取值范围数轴对比图。
 *
 * 把 8/16/32/64-bit 四种位宽的 signed/unsigned 范围并排展示在数轴上，
 * 直观看出 unsigned 把负数区间「搬到」正数区。
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

interface RangeBar {
  label: string;
  signedMin: string;
  signedMax: string;
  unsignedMax: string;
  color: string;
}

export function IntegerRangeDiagram() {
  const bars: RangeBar[] = [
    { label: "8-bit", signedMin: "−128", signedMax: "127", unsignedMax: "255", color: "rgb(99,179,237)" },
    { label: "16-bit", signedMin: "−32,768", signedMax: "32,767", unsignedMax: "65,535", color: "rgb(99,237,179)" },
    { label: "32-bit", signedMin: "≈ −21 亿", signedMax: "≈ 21 亿", unsignedMax: "≈ 43 亿", color: "var(--accent)" },
    { label: "64-bit", signedMin: "≈ −9.2×10¹⁸", signedMax: "≈ 9.2×10¹⁸", unsignedMax: "≈ 1.8×10¹⁹", color: "rgb(237,137,99)" },
  ];

  const barH = 56;
  const startY = 60;
  const leftX = 20;
  const centerX = 360;
  const barW = 256;
  const gap = 16;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 620 380"
          role="img"
          aria-label="有符号/无符号整数取值范围数轴对比：8/16/32/64-bit 各宽度 signed 和 unsigned 的区间"
          className="mx-auto block h-auto w-full max-w-[620px]"
        >
          {/* 标题 */}
          <text x="310" y="28" fontSize="14" fontWeight="700" fill="var(--text-primary)" textAnchor="middle">
            有符号（signed）与无符号（unsigned）取值范围对比
          </text>
          <text x="310" y="44" fontSize="11" fill="var(--text-secondary)" textAnchor="middle">
            同一宽度下，unsigned 把负数区间「映射」到正数高端
          </text>

          {bars.map((bar, i) => {
            const y = startY + i * (barH + gap);
            const halfW = barW / 2;

            return (
              <g key={bar.label}>
                {/* 标签 */}
                <text
                  x={leftX}
                  y={y + 24}
                  fontSize="13"
                  fontWeight="700"
                  fill={bar.color}
                  fontFamily="monospace"
                >
                  {bar.label}
                </text>

                {/* Signed 数轴 */}
                <text x={centerX - halfW - 16} y={y + 24} fontSize="10" fill="var(--text-secondary)" textAnchor="end">
                  signed
                </text>
                <rect
                  x={centerX - halfW}
                  y={y + 10}
                  width={barW}
                  height="20"
                  rx="4"
                  fill={bar.color}
                  opacity="0.2"
                  stroke={bar.color}
                  strokeWidth="1"
                />
                {/* 0 刻度线 */}
                <line
                  x1={centerX}
                  y1={y + 6}
                  x2={centerX}
                  y2={y + 34}
                  stroke={bar.color}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text x={centerX - halfW + 4} y={y + 24} fontSize="9" fill={bar.color} fontFamily="monospace">
                  {bar.signedMin}
                </text>
                <text x={centerX + 4} y={y + 24} fontSize="9" fill="var(--text-primary)" fontFamily="monospace">
                  0
                </text>
                <text x={centerX + halfW - 4} y={y + 24} fontSize="9" fill={bar.color} textAnchor="end" fontFamily="monospace">
                  {bar.signedMax}
                </text>

                {/* Unsigned 数轴 */}
                <text x={centerX - halfW - 16} y={y + 45} fontSize="10" fill="var(--text-secondary)" textAnchor="end">
                  unsigned
                </text>
                <rect
                  x={centerX - halfW}
                  y={y + 32}
                  width={barW}
                  height="20"
                  rx="4"
                  fill="rgb(229,181,103)"
                  opacity="0.15"
                  stroke="rgb(229,181,103)"
                  strokeWidth="1"
                />
                <text x={centerX + 4} y={y + 46} fontSize="9" fill="rgb(229,181,103)" fontFamily="monospace">
                  0
                </text>
                <text x={centerX + halfW - 4} y={y + 46} fontSize="9" fill="rgb(229,181,103)" textAnchor="end" fontFamily="monospace">
                  {bar.unsignedMax}
                </text>
              </g>
            );
          })}

          {/* 底部说明 */}
          <text x="620" y={startY + bars.length * (barH + gap) + 12} fontSize="11" fill="var(--accent)" textAnchor="end">
            signed 范围 [−2ⁿ⁻¹, 2ⁿ⁻¹−1] · unsigned 范围 [0, 2ⁿ−1]
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        四种位宽下 signed 和 unsigned 的数值区间对比。unsigned 没有负数段，
        但高端可以表示比 signed 最大值更大的正数。
      </figcaption>
    </figure>
  );
}
