/**
 * <ArrayMemoryLayoutDiagram>：一维数组在连续内存中的排布。
 *
 * 展示 int ar[5] 各元素下标、值与相邻地址关系。
 * Server Component，token 色，无阴影。
 */

export function ArrayMemoryLayoutDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  const values = [10, 20, 30, 40, 50];
  const cellW = 96;
  const startX = 72;
  const memY = 88;
  const cellH = 56;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 280"
          role="img"
          aria-label="一维数组 int ar[5] 在内存中连续排布示意图"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            int ar[5] = {"{10, 20, 30, 40, 50};"}
          </text>
          <text x={24} y={52} fontSize="12" fill={secondary}>
            数组元素在内存中占一段连续区域，下标从 0 开始
          </text>

          <text x={24} y={78} fontSize="11" fontWeight="600" fill={secondary}>
            下标 i
          </text>
          {values.map((_, i) => (
            <text
              key={`idx-${i}`}
              x={startX + i * cellW + cellW / 2}
              y={78}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              [{i}]
            </text>
          ))}

          <rect
            x={startX - 8}
            y={memY - 8}
            width={values.length * cellW + 8}
            height={cellH + 16}
            rx="10"
            fill={bg}
            stroke={border}
            strokeWidth="1.5"
          />

          {values.map((v, i) => (
            <g key={`cell-${i}`}>
              <rect
                x={startX + i * cellW}
                y={memY}
                width={cellW - 4}
                height={cellH}
                rx="6"
                fill={accent}
                opacity={0.1}
                stroke={accent}
                strokeWidth="1.5"
              />
              <text
                x={startX + i * cellW + (cellW - 4) / 2}
                y={memY + 34}
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill={primary}
                fontFamily="monospace"
              >
                {v}
              </text>
              <text
                x={startX + i * cellW + (cellW - 4) / 2}
                y={memY + cellH + 18}
                textAnchor="middle"
                fontSize="10"
                fill={secondary}
                fontFamily="monospace"
              >
                ar[{i}]
              </text>
            </g>
          ))}

          <text x={24} y={memY + cellH + 44} fontSize="11" fill={secondary} fontFamily="monospace">
            地址 → 0x1000
          </text>
          {values.map((_, i) => (
            <text
              key={`addr-${i}`}
              x={startX + i * cellW + (cellW - 4) / 2}
              y={memY + cellH + 44}
              textAnchor="middle"
              fontSize="9"
              fill={secondary}
              fontFamily="monospace"
            >
              +{i * 4}
            </text>
          ))}

          <path
            d={`M ${startX + 12} ${memY + cellH + 58} L ${startX + values.length * cellW - 20} ${memY + cellH + 58}`}
            stroke={accent}
            strokeWidth="1.5"
            markerEnd="url(#arrMemArrow)"
          />
          <text x={startX + values.length * cellW / 2} y={memY + cellH + 76} textAnchor="middle" fontSize="11" fill={accent}>
            连续内存（int 通常 4 字节/格）
          </text>

          <text x={24} y={248} fontSize="11" fill={secondary}>
            `sizeof ar` = 5 × sizeof(int) = 20 字节。`ar[0]` 与 `ar[4]` 相邻，中间没有「空洞」。
          </text>

          <defs>
            <marker id="arrMemArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        一维数组的所有元素紧挨着存放在内存里。知道起始地址和下标，就能算出每个元素的位置。
      </figcaption>
    </figure>
  );
}
