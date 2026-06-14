/**
 * <SignedUnsignedDiagram>：同一个二进制位模式在 signed/unsigned 解读下的不同含义。
 *
 * 对比展示：11111111（8-bit）→ unsigned 解读为 255，signed 解读为 −1。
 * 列出多个关键位模式的两种解读对照，辅助理解「同一个 bit 串，解读方式不同值就不同」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary /
 * --text-secondary），无阴影。
 */

interface BitRow {
  pattern: string;
  unsigned: string;
  signed: string;
  highlight?: boolean;
}

export function SignedUnsignedDiagram() {
  const rows: BitRow[] = [
    { pattern: "0000 0000", unsigned: "0", signed: "0" },
    { pattern: "0000 0001", unsigned: "1", signed: "1" },
    { pattern: "0111 1111", unsigned: "127", signed: "127", highlight: true },
    { pattern: "1000 0000", unsigned: "128", signed: "−128", highlight: true },
    { pattern: "1111 1111", unsigned: "255", signed: "−1", highlight: true },
  ];

  const colX = { bits: 50, arrow: 224, unsigned: 310, signed: 440 };
  const startY = 72;
  const rowH = 52;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 400"
          role="img"
          aria-label="同一个 8-bit 位模式在 unsigned（无符号）和 signed（有符号/补码）解读下的不同值对比"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* 表头 */}
          <rect x="20" y="28" width="520" height="28" rx="4" fill="var(--accent)" opacity="0.15" />
          <text x={colX.bits + 90} y="48" fontSize="12" fontWeight="700" fill="var(--accent)" textAnchor="middle">8-bit 位模式</text>
          <text x={colX.unsigned + 60} y="48" fontSize="12" fontWeight="700" fill="var(--accent)" textAnchor="middle">unsigned 值</text>
          <text x={colX.signed + 50} y="48" fontSize="12" fontWeight="700" fill="var(--accent)" textAnchor="middle">signed 值（补码）</text>

          {/* 数据行 */}
          {rows.map((r, i) => {
            const y = startY + i * rowH;
            const isHi = r.highlight;
            const rowBg = isHi ? "var(--accent)" : (i % 2 === 0 ? "var(--bg)" : "var(--bg-elevated)");
            const rowOpacity = isHi ? "0.12" : "1";
            const textFill = isHi ? "var(--accent)" : "var(--text-primary)";

            return (
              <g key={r.pattern}>
                {/* 行背景 */}
                <rect
                  x="20"
                  y={y - 12}
                  width="520"
                  height={rowH - 8}
                  rx="4"
                  fill={rowBg}
                  opacity={rowOpacity}
                />

                {/* 位模式 —— 逐 bit 绘制圆圈 + 数字 */}
                {r.pattern.split("").map((ch, bi) => {
                  if (ch === " ") return null;
                  const bitX = colX.bits + bi * 20;
                  const color = ch === "1" ? "var(--accent)" : "var(--border)";
                  return (
                    <g key={bi}>
                      <circle cx={bitX} cy={y + 8} r="10" fill={color} opacity={ch === "1" ? 0.3 : 0.15} />
                      <text
                        x={bitX}
                        y={y + 12}
                        textAnchor="middle"
                        fontSize="13"
                        fontWeight="600"
                        fill={ch === "1" ? "var(--accent)" : "var(--text-secondary)"}
                        fontFamily="monospace"
                      >
                        {ch}
                      </text>
                    </g>
                  );
                })}

                {/* 箭头 → */}
                <text
                  x={colX.arrow}
                  y={y + 10}
                  textAnchor="middle"
                  fontSize="14"
                  fill="var(--text-secondary)"
                >
                  →
                </text>

                {/* unsigned 值 */}
                <text
                  x={colX.unsigned + 60}
                  y={y + 10}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight={isHi ? 700 : 500}
                  fill={textFill}
                  fontFamily="monospace"
                >
                  {r.unsigned}
                </text>

                {/* signed 值 */}
                <text
                  x={colX.signed + 50}
                  y={y + 10}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight={isHi ? 700 : 500}
                  fill={textFill}
                  fontFamily="monospace"
                >
                  {r.signed}
                </text>
              </g>
            );
          })}

          {/* 分割说明栏 */}
          <line x1="32" y1={startY + 2.5 * rowH - 4} x2="528" y2={startY + 2.5 * rowH - 4} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />

          {/* 底部说明 */}
          <text x="32" y="340" fontSize="12" fill="var(--text-secondary)">
            同一个 8-bit 位模式，用 unsigned 看最大值 255，用 signed（补码）看是 −128 ~ 127。
          </text>
          <text x="32" y="358" fontSize="12" fill="var(--text-secondary)">
            关键规律：高位是 1 时 signed 解读为负数，是 0 时非负；最高位是「符号位」。
          </text>
          <text x="32" y="378" fontSize="11" fill="var(--accent)">
            unsigned 范围 [0, 2ⁿ−1]；signed 补码范围 [−2ⁿ⁻¹, 2ⁿ⁻¹−1]
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        同一个二进制位模式，unsigned 解读全是 ≥0，signed（补码）把高位为 1 的解读为负数。
        理解这一差别是避免 signed/unsigned 混用导致 bug 的关键。
      </figcaption>
    </figure>
  );
}
