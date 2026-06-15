/**
 * <CStringNullTerminatorDiagram>：字符数组 + '\0' 终止符内存布局。
 *
 * 强调「可见字符」与结尾空字符 \0 的关系，以及 strlen 停在哪里。
 */

export function CStringNullTerminatorDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const nullColor = "rgb(229,181,103)";

  const chars = [
    { ch: "C", idx: 0 },
    { ch: "a", idx: 1 },
    { ch: "t", idx: 2 },
    { ch: "\\0", idx: 3, isNull: true },
  ];
  const cellW = 58;
  const startX = 24;
  const memY = 72;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="C 字符串以空字符 \0 结尾的内存布局"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="14" fontWeight="700" fill={primary} fontFamily="monospace">
            char animal[10] = "Cat";
          </text>
          <text x={24} y={48} fontSize="11" fill={secondary}>
            字面量 "Cat" 带来 4 个字符：C、a、t、\0；数组总长 10，其余字节为 0
          </text>

          {chars.map(({ ch, idx, isNull }) => {
            const x = startX + idx * cellW;
            const color = isNull ? nullColor : accent;
            return (
              <g key={idx}>
                <rect
                  x={x}
                  y={memY}
                  width={cellW - 4}
                  height={52}
                  rx="6"
                  fill={color}
                  opacity={isNull ? 0.22 : 0.16}
                  stroke={color}
                  strokeWidth="2"
                />
                <text
                  x={x + (cellW - 4) / 2}
                  y={memY + 30}
                  textAnchor="middle"
                  fontSize={isNull ? "14" : "18"}
                  fontWeight="700"
                  fill={color}
                  fontFamily="monospace"
                >
                  {ch}
                </text>
                <text
                  x={x + (cellW - 4) / 2}
                  y={memY + 68}
                  textAnchor="middle"
                  fontSize="11"
                  fill={secondary}
                  fontFamily="monospace"
                >
                  [{idx}]
                </text>
              </g>
            );
          })}

          {/* 未用空间 */}
          {[4, 5, 6, 7, 8, 9].map((idx) => {
            const x = startX + idx * cellW;
            return (
              <g key={`pad-${idx}`} opacity={0.45}>
                <rect
                  x={x}
                  y={memY}
                  width={cellW - 4}
                  height={52}
                  rx="6"
                  fill={bg}
                  stroke={border}
                  strokeWidth="1"
                  strokeDasharray="4 3"
                />
                <text
                  x={x + (cellW - 4) / 2}
                  y={memY + 30}
                  textAnchor="middle"
                  fontSize="12"
                  fill={secondary}
                  fontFamily="monospace"
                >
                  \0
                </text>
                <text
                  x={x + (cellW - 4) / 2}
                  y={memY + 68}
                  textAnchor="middle"
                  fontSize="10"
                  fill={secondary}
                >
                  [{idx}]
                </text>
              </g>
            );
          })}

          <line
            x1={startX - 4}
            y1={memY + 80}
            x2={startX + 4 * cellW - 4}
            y2={memY + 80}
            stroke="rgb(63,185,127)"
            strokeWidth="2"
            markerEnd="url(#nullTermArrow)"
          />
          <text x={startX + 2 * cellW} y={memY + 96} textAnchor="middle" fontSize="11" fontWeight="700" fill="rgb(63,185,127)">
            strlen → 3（数到 \0 之前）
          </text>

          <rect x={startX + 3 * cellW + 8} y={memY - 4} width={cellW - 4} height={60} rx="6" fill="none" stroke={nullColor} strokeWidth="2" strokeDasharray="5 3" />
          <text x={startX + 3 * cellW + (cellW - 4) / 2 + 8} y={memY + 100} textAnchor="middle" fontSize="10" fontWeight="600" fill={nullColor}>
            字符串结束标记
          </text>

          <text x={24} y={212} fontSize="12" fontWeight="600" fill={accent}>
            铁律：所有 string.h 函数都靠 \0 判断「字符串到哪结束」
          </text>
          <text x={24} y={234} fontSize="11" fill={secondary}>
            没有 \0 → strlen/strcpy 会一直往后读，直到撞上别的内存（未定义行为）。
          </text>
          <text x={24} y={256} fontSize="11" fill={secondary}>
            char ar[n] 初始化不足时，剩余元素自动填 \0；手动逐字赋值时你必须自己写上结尾 \0。
          </text>

          <defs>
            <marker id="nullTermArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill="rgb(63,185,127)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C 字符串 = 连续 char + 结尾 \0。strlen 只数可见字符；sizeof 数整个数组占用的字节。
      </figcaption>
    </figure>
  );
}
