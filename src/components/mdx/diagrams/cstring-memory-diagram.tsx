/**
 * <CStringMemoryDiagram>：C 字符串 "Hello" 在内存中的 6 字节布局。
 *
 * 展示 char str[] = "Hello"; 在栈上的连续字节：H e l l o \0。
 * 右侧标注 strlen(str) = 5（不含 \0） vs sizeof(str) = 6（含 \0）。
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色。
 */
export function CStringMemoryDiagram() {
  const token = {
    accent: "var(--accent)",
    border: "var(--border)",
    bg: "var(--bg)",
    bgElevated: "var(--bg-elevated)",
    textPrimary: "var(--text-primary)",
    textSecondary: "var(--text-secondary)",
  };

  const chars = ["H", "e", "l", "l", "o", "\\0"];
  const cellColors = [
    "var(--accent)",
    "var(--accent)",
    "var(--accent)",
    "var(--accent)",
    "var(--accent)",
    "rgb(229,181,103)",
  ];
  const cellW = 56;
  const cellH = 48;
  const gap = 2;
  const startX = 40;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 620 340"
          role="img"
          aria-label='C 字符串 "Hello" 在内存中的 6 字节布局：H e l l o \0，标注 strlen=5（不含\0）与 sizeof=6（含\0）'
          className="mx-auto block h-auto w-full max-w-[620px]"
        >
          {/* 标题 */}
          <text x="310" y="28" fontSize="14" fontWeight="700" fill={token.textPrimary} textAnchor="middle" fontFamily="monospace">
            char str[] = "Hello";
          </text>

          {/* 内存格子 */}
          {chars.map((ch, i) => {
            const x = startX + i * (cellW + gap);
            const isNull = i === 5;

            return (
              <g key={i}>
                <rect
                  x={x}
                  y={50}
                  width={cellW}
                  height={cellH}
                  rx="6"
                  fill={cellColors[i]}
                  opacity={isNull ? 0.2 : 0.18}
                  stroke={cellColors[i]}
                  strokeWidth="2"
                />
                <text
                  x={x + cellW / 2}
                  y={80}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="700"
                  fill={cellColors[i]}
                  fontFamily="monospace"
                >
                  {ch}
                </text>
                {/* 下标 */}
                <text
                  x={x + cellW / 2}
                  y={114}
                  textAnchor="middle"
                  fontSize="11"
                  fill={token.textSecondary}
                  fontFamily="monospace"
                >
                  str[{i}]
                </text>
                {/* 字节编号 */}
                <text
                  x={x + cellW / 2}
                  y={128}
                  textAnchor="middle"
                  fontSize="10"
                  fill={token.textSecondary}
                  opacity="0.6"
                >
                  字节{i + 1}
                </text>
              </g>
            );
          })}

          {/* strlen 标注（前5个字符） */}
          <line x1={startX - 12} y1={60} x2={startX - 12} y2={138} stroke="rgb(63,185,127)" strokeWidth="2" />
          <line x1={startX - 12} y1={60} x2={startX + 5 * (cellW + gap) - cellW / 2} y2={60} stroke="rgb(63,185,127)" strokeWidth="2" strokeDasharray="6 3" />
          <line x1={startX - 12} y1={138} x2={startX + 5 * (cellW + gap) - cellW / 2} y2={138} stroke="rgb(63,185,127)" strokeWidth="2" strokeDasharray="6 3" />

          <text
            x={startX - 12}
            y={170}
            textAnchor="start"
            fontSize="12"
            fontWeight="700"
            fill="rgb(63,185,127)"
            fontFamily="monospace"
          >
            strlen(str) = 5
          </text>

          {/* sizeof 标注（全部6个字节） */}
          <line x1={startX + 6 * (cellW + gap) + 12} y1={60} x2={startX + 6 * (cellW + gap) + 12} y2={138} stroke="rgb(99,179,237)" strokeWidth="2" />
          <line x1={startX + cellW / 2} y1={60} x2={startX + 6 * (cellW + gap) + 12} y2={60} stroke="rgb(99,179,237)" strokeWidth="2" strokeDasharray="6 3" />
          <line x1={startX + cellW / 2} y1={138} x2={startX + 6 * (cellW + gap) + 12} y2={138} stroke="rgb(99,179,237)" strokeWidth="2" strokeDasharray="6 3" />

          <text
            x={startX + 6 * (cellW + gap) + 22}
            y={170}
            textAnchor="start"
            fontSize="12"
            fontWeight="700"
            fill="rgb(99,179,237)"
            fontFamily="monospace"
          >
            sizeof(str) = 6
          </text>

          {/* 空字符说明 */}
          <text
            x={startX + 5 * (cellW + gap) + cellW / 2}
            y={155}
            textAnchor="middle"
            fontSize="10"
            fill="rgb(229,181,103)"
            fontWeight="600"
          >
            ↑ 字符串结束标记
          </text>

          {/* 底部解释 */}
          <rect x="20" y="200" width="580" height="110" rx="6" fill={token.bg} stroke={token.border} />
          <text x="36" y="226" fontSize="12" fontWeight="700" fill={token.textPrimary}>
            C 字符串的两条铁律：
          </text>

          <text x="36" y="252" fontSize="11" fill={token.textSecondary}>
            ① 字符串就是 char 数组——字符一个接一个连续放在内存里，每个字符占 1 字节。
          </text>
          <text x="36" y="272" fontSize="11" fill={token.textSecondary}>
            ② 结尾一定是空字符 \0（ASCII 0）——C 靠它来知道"字符串到这儿结束"，没有它就是普通字符数组而不是字符串。
          </text>
          <text x="36" y="296" fontSize="11" fill={token.textSecondary}>
            ③ strlen() 数到 \0 之前就停了（得 5）；sizeof() 数数组的全部字节（得 6）——差的那 1 个字节就是结尾的 \0。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C 字符串 = 连续字符 + \0 结尾。strlen 不算 \0，sizeof 算上 \0——两者差 1 不是 bug，是 C 的底层设计。
      </figcaption>
    </figure>
  );
}
