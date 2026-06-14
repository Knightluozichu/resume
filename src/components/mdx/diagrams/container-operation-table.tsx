/**
 * <ContainerOperationTable>：各容器支持的插入/删除操作速查表。
 *
 * 列出 push_back / push_front / insert / erase / emplace 等操作在各容器上的支持情况。
 * ✓ 支持，✗ 不支持，⚠ 慢但支持，空 不适用。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--xxx)），无阴影。
 */
export function ContainerOperationTable() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const elevated = "var(--bg-elevated)";
  const warn = "rgb(229,181,103)";

  const w = 800;
  const h = 460;

  const colHeaders = ["操作", "vector", "deque", "list", "forward_list", "array", "string"];

  const rows: { name: string; cells: (string | { text: string; color: string })[] }[] = [
    {
      name: "push_back",
      cells: [
        { text: "✓ O(1)∗", color: "rgb(63,185,127)" },
        { text: "✓ O(1)", color: "rgb(63,185,127)" },
        { text: "✓ O(1)", color: "rgb(63,185,127)" },
        { text: "✗", color: secondary },
        { text: "✗", color: secondary },
        { text: "✓ O(1)∗", color: "rgb(63,185,127)" },
      ],
    },
    {
      name: "push_front",
      cells: [
        { text: "✗", color: secondary },
        { text: "✓ O(1)", color: "rgb(63,185,127)" },
        { text: "✓ O(1)", color: "rgb(63,185,127)" },
        { text: "✓ O(1)", color: "rgb(63,185,127)" },
        { text: "✗", color: secondary },
        { text: "✗", color: secondary },
      ],
    },
    {
      name: "insert(iter, val)",
      cells: [
        { text: "✓ O(n)", color: warn },
        { text: "✓ O(n)", color: warn },
        { text: "✓ O(1)", color: "rgb(63,185,127)" },
        { text: "✓ O(1)∗∗", color: "rgb(63,185,127)" },
        { text: "✗", color: secondary },
        { text: "✓ O(n)", color: warn },
      ],
    },
    {
      name: "erase(iter)",
      cells: [
        { text: "✓ O(n)", color: warn },
        { text: "✓ O(n)", color: warn },
        { text: "✓ O(1)", color: "rgb(63,185,127)" },
        { text: "✓ O(1)∗∗", color: "rgb(63,185,127)" },
        { text: "✗", color: secondary },
        { text: "✓ O(n)", color: warn },
      ],
    },
    {
      name: "emplace_back",
      cells: [
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✗", color: secondary },
        { text: "✗", color: secondary },
        { text: "✓", color: "rgb(63,185,127)" },
      ],
    },
    {
      name: "emplace_front",
      cells: [
        { text: "✗", color: secondary },
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✗", color: secondary },
        { text: "✗", color: secondary },
      ],
    },
    {
      name: "operator[]",
      cells: [
        { text: "✓ O(1)", color: "rgb(63,185,127)" },
        { text: "✓ O(1)", color: "rgb(63,185,127)" },
        { text: "✗", color: secondary },
        { text: "✗", color: secondary },
        { text: "✓ O(1)", color: "rgb(63,185,127)" },
        { text: "✓ O(1)", color: "rgb(63,185,127)" },
      ],
    },
    {
      name: "at() (带边界检查)",
      cells: [
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✗", color: secondary },
        { text: "✗", color: secondary },
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✓", color: "rgb(63,185,127)" },
      ],
    },
    {
      name: "front() / back()",
      cells: [
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✓ front only", color: warn },
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✓", color: "rgb(63,185,127)" },
      ],
    },
    {
      name: "resize",
      cells: [
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✗", color: secondary },
        { text: "✓", color: "rgb(63,185,127)" },
      ],
    },
    {
      name: "reserve / capacity",
      cells: [
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✗", color: secondary },
        { text: "✗", color: secondary },
        { text: "✗", color: secondary },
        { text: "✗", color: secondary },
        { text: "✓", color: "rgb(63,185,127)" },
      ],
    },
    {
      name: "shrink_to_fit",
      cells: [
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✓", color: "rgb(63,185,127)" },
        { text: "✗", color: secondary },
        { text: "✗", color: secondary },
        { text: "✗", color: secondary },
        { text: "✓", color: "rgb(63,185,127)" },
      ],
    },
  ];

  const colW = 104;
  const rowH = 28;
  const headerH = 36;
  const leftPad = 180;
  const topPad = 30;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="顺序容器操作速查表：push_back / push_front / insert / erase 等操作在各容器上的支持情况与时间复杂度"
          className="mx-auto block h-auto w-full max-w-[800px]"
        >
          {/* 表头背景 */}
          <rect x={leftPad} y={topPad} width={colW * 6} height={headerH} rx="6" fill={accent} opacity="0.08" />
          <rect x="0" y={topPad} width={leftPad} height={headerH} rx="6" fill={accent} opacity="0.08" />
          <text x={leftPad / 2} y={topPad + headerH / 2 + 4} fontSize="12" fontWeight="700" fill={primary} textAnchor="middle">
            {colHeaders[0]}
          </text>
          {colHeaders.slice(1).map((h, i) => (
            <text
              key={h}
              x={leftPad + (i + 0.5) * colW}
              y={topPad + headerH / 2 + 4}
              fontSize="12"
              fontWeight="700"
              fill={accent}
              textAnchor="middle"
              fontFamily="monospace"
            >
              {h}
            </text>
          ))}

          {/* 数据行 */}
          {rows.map((row, ri) => {
            const y = topPad + headerH + ri * rowH;
            const bgFill = ri % 2 === 0 ? "transparent" : (accent + "0A");

            return (
              <g key={row.name}>
                {/* 行背景 */}
                <rect x="0" y={y} width={w} height={rowH} rx="4" fill={bgFill} />
                {/* 行分隔线 */}
                <line x1={leftPad} y1={y + rowH} x2={leftPad + colW * 6} y2={y + rowH} stroke={border} opacity="0.4" />

                {/* 操作名 */}
                <text
                  x={leftPad / 2}
                  y={y + rowH / 2 + 4}
                  fontSize="12"
                  fill={primary}
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {row.name}
                </text>

                {/* 各列值 */}
                {row.cells.map((cell, ci) => {
                  const text = typeof cell === "string" ? cell : cell.text;
                  const color = typeof cell === "string" ? secondary : cell.color;
                  return (
                    <text
                      key={ci}
                      x={leftPad + (ci + 0.5) * colW}
                      y={y + rowH / 2 + 4}
                      fontSize={text.length > 8 ? "10" : "11"}
                      fill={color}
                      textAnchor="middle"
                      fontFamily={text.startsWith("✗") || text.startsWith("✓") ? undefined : "monospace"}
                    >
                      {text}
                    </text>
                  );
                })}
              </g>
            );
          })}

          {/* 底部注释 */}
          <text x={leftPad} y={topPad + headerH + rows.length * rowH + 20} fontSize="10" fill={secondary}>
            ✓ 原生高效支持  |  ✗ 不支持  |  ✓ O(n) 支持但慢  |  ∗ 均摊 O(1)（扩容重分配）  |  ∗∗ forward_list insert/erase 只能在给定位置"之后"操作
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        各容器对常用操作的支持情况与时间复杂度速查。注意 forward_list 只有单向遍历，其 insert/erase 操作只能在给定迭代器<strong>之后</strong>执行。push_back 对 vector/string 为均摊 O(1)——偶尔的扩容重分配使单个操作可能 O(n)，但均摊到 N 次插入仍是 O(1)。
      </figcaption>
    </figure>
  );
}
