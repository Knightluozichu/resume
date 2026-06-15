/**
 * <BitwiseOperatorsDiagram>：按位与或异或取反 & | ^ ~ 真值表可视化。
 */

export function BitwiseOperatorsDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";

  const cell = (x: number, y: number, val: string, highlight = false) => (
    <g key={`${x}-${y}-${val}`}>
      <rect
        x={x}
        y={y}
        width={36}
        height={28}
        rx="4"
        fill={highlight ? `${good}22` : bg}
        stroke={highlight ? good : border}
        strokeWidth="1"
      />
      <text x={x + 18} y={y + 19} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary} fontFamily="monospace">
        {val}
      </text>
    </g>
  );

  const truthTable = (
    title: string,
    op: string,
    rows: [string, string, string][],
    ox: number,
    oy: number,
  ) => (
    <g>
      <text x={ox} y={oy} fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">
        {title}
      </text>
      <text x={ox} y={oy + 14} fontSize="10" fill={secondary}>
        {op}
      </text>
      {["A", "B", "结果"].map((h, i) => (
        <text key={h} x={ox + i * 44 + 18} y={oy + 30} textAnchor="middle" fontSize="9" fill={secondary}>
          {h}
        </text>
      ))}
      {rows.map(([a, b, r], ri) => (
        <g key={`${title}-${ri}`}>
          {cell(ox, oy + 36 + ri * 32, a)}
          {cell(ox + 44, oy + 36 + ri * 32, b)}
          {cell(ox + 88, oy + 36 + ri * 32, r, r === "1")}
        </g>
      ))}
    </g>
  );

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 380"
          role="img"
          aria-label="按位与或异或取反运算符真值表"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            按位运算符真值表（逐 bit 运算）
          </text>

          {truthTable(
            "& 按位与",
            "两位都为 1 才 1",
            [
              ["0", "0", "0"],
              ["0", "1", "0"],
              ["1", "0", "0"],
              ["1", "1", "1"],
            ],
            24,
            44,
          )}

          {truthTable(
            "| 按位或",
            "有 1 则 1",
            [
              ["0", "0", "0"],
              ["0", "1", "1"],
              ["1", "0", "1"],
              ["1", "1", "1"],
            ],
            180,
            44,
          )}

          {truthTable(
            "^ 按位异或",
            "不同为 1",
            [
              ["0", "0", "0"],
              ["0", "1", "1"],
              ["1", "0", "1"],
              ["1", "1", "0"],
            ],
            336,
            44,
          )}

          <rect x={24} y={210} width={592} height={72} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={44} y={234} fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">
            ~ 按位取反（一元）
          </text>
          <text x={44} y={256} fontSize="11" fill={primary} fontFamily="monospace">
            ~0 → 全 1 位模式；~1 → …11111110（依类型宽度）
          </text>
          <text x={44} y={274} fontSize="10" fill={secondary}>
            对 unsigned 直观；signed 取反遵循补码规则
          </text>

          <rect x={24} y={298} width={592} height={68} rx="8" fill={bg} stroke={warn} strokeWidth="1" strokeDasharray="4 3" />
          <text x={44} y={322} fontSize="11" fontWeight="600" fill={primary} fontFamily="monospace">
            示例：0b1100 & 0b1010 = 0b1000
          </text>
          <text x={44} y={342} fontSize="10" fill={secondary}>
            1100 与 1010 逐位 & → 1000；常用于**掩码**保留特定位、清零标志
          </text>
          <text x={44} y={358} fontSize="10" fill={secondary}>
            flags |= MASK 置位；flags &amp; ~MASK 清位；flags ^ MASK 翻转
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        按位运算在每一位上独立进行，与逻辑 &amp;&amp; || 不同——后者只看「真/假」短路，不逐 bit 组合。
      </figcaption>
    </figure>
  );
}
