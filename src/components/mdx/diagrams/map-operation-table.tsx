/**
 * <MapOperationTable>：map 常用操作速查表（insert/erase/find/[]/count/at）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--xxx)），无阴影。
 */

export function MapOperationTable() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const elevated = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";
  const err = "rgb(229,103,92)";

  const w = 820;
  const colX = [0, 160, 230, 410, 700];
  const colW = [150, 60, 170, 110, 100];

  const rows: { op: string; sig: string; desc: string; complexity: string; set: string }[] = [
    {
      op: "insert",
      sig: "m.insert({k,v})",
      desc: "插入 key→value 对。若 key 已存在则忽略（不覆盖）",
      complexity: "O(log n)",
      set: "s.insert(v)",
    },
    {
      op: "insert+提示",
      sig: "m.insert(p).second",
      desc: "insert 返回 pair<iter,bool> —— second=true 表示插入成功",
      complexity: "O(log n)",
      set: "s.insert(v).second",
    },
    {
      op: "erase(k)",
      sig: "m.erase(k)",
      desc: "删除 key 对应的元素。返回删除个数（0 或 1）",
      complexity: "O(log n)",
      set: "s.erase(v)",
    },
    {
      op: "find",
      sig: "m.find(k)",
      desc: "查找 key。找到返回指向该元素的迭代器，找不到返回 end()",
      complexity: "O(log n)",
      set: "s.find(v)",
    },
    {
      op: "count",
      sig: "m.count(k)",
      desc: "返回 key 的出现次数（map 中只能是 0 或 1）",
      complexity: "O(log n)",
      set: "s.count(v)",
    },
    {
      op: "operator[]",
      sig: "m[k]",
      desc: "访问 key 对应的 value——若 key 不存在则插入默认值并返回引用。**仅 map/unordered_map 支持**",
      complexity: "O(log n)",
      set: "—（set 无 []）",
    },
    {
      op: "at",
      sig: "m.at(k)",
      desc: "访问 key 对应的 value——若 key 不存在则抛出 out_of_range 异常",
      complexity: "O(log n)",
      set: "—（set 无 at）",
    },
    {
      op: "size/empty",
      sig: "m.size() / m.empty()",
      desc: "返回元素数 / 判断是否为空",
      complexity: "O(1)",
      set: "s.size()",
    },
    {
      op: "lower_bound",
      sig: "m.lower_bound(k)",
      desc: "返回第一个 key ≥ k 的迭代器",
      complexity: "O(log n)",
      set: "s.lower_bound(v)",
    },
    {
      op: "upper_bound",
      sig: "m.upper_bound(k)",
      desc: "返回第一个 key > k 的迭代器",
      complexity: "O(log n)",
      set: "s.upper_bound(v)",
    },
  ];

  const rowH = 36;
  const headerH = 36;
  const h = headerH + rows.length * rowH + 60;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="map/set 常用操作速查表：insert/erase/find/[]/count/at 及其时间复杂度和语法"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          {/* 标题 */}
          <text x={w / 2} y="20" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            map / set 核心操作速查
          </text>

          {/* 表头 */}
          <g transform={`translate(0, 36)`}>
            <rect x={colX[0]} y="0" width={colW[0]} height={headerH} rx="0" fill={elevated} stroke={border} />
            <rect x={colX[1]} y="0" width={colW[1]} height={headerH} rx="0" fill={elevated} stroke={border} />
            <rect x={colX[2]} y="0" width={colW[2]} height={headerH} rx="0" fill={elevated} stroke={border} />
            <rect x={colX[3]} y="0" width={colW[3]} height={headerH} rx="0" fill={elevated} stroke={border} />
            <rect x={colX[4]} y="0" width={colW[4]} height={headerH} rx="0" fill={elevated} stroke={border} />

            {["操作", "返回", "用法说明", "复杂度", "set 对应"].map((hdr, i) => (
              <text
                key={i}
                x={colX[i] + colW[i] / 2}
                y={headerH / 2 + 4}
                fontSize="11"
                fontWeight="600"
                fill={primary}
                textAnchor="middle"
              >
                {hdr}
              </text>
            ))}
          </g>

          {/* 各行 */}
          {rows.map((row, ri) => {
            const y = 36 + headerH + ri * rowH;
            const bgColor = ri % 2 === 0 ? "transparent" : "var(--bg)";
            return (
              <g key={ri} transform={`translate(0, ${y})`}>
                <rect x={colX[0]} y="0" width={colW[0]} height={rowH} fill={bgColor} />
                <rect x={colX[1]} y="0" width={colW[1]} height={rowH} fill={bgColor} />
                <rect x={colX[2]} y="0" width={colW[2]} height={rowH} fill={bgColor} />
                <rect x={colX[3]} y="0" width={colW[3]} height={rowH} fill={bgColor} />
                <rect x={colX[4]} y="0" width={colW[4]} height={rowH} fill={bgColor} />

                {/* 操作名 */}
                <text x={colX[0] + 8} y={rowH / 2 + 4} fontSize="11" fontWeight="600" fill={accent} fontFamily="monospace">
                  {row.op}
                </text>

                {/* 语法签名 */}
                <text x={colX[1] + 8} y={rowH / 2 + 4} fontSize="10" fill={primary} fontFamily="monospace">
                  {row.sig}
                </text>

                {/* 说明 */}
                <text x={colX[2] + 8} y={rowH / 2 + 4} fontSize="10" fill={secondary}>
                  {row.desc}
                </text>

                {/* 复杂度 */}
                <text
                  x={colX[3] + colW[3] / 2}
                  y={rowH / 2 + 4}
                  fontSize="10"
                  fill={row.complexity === "O(1)" ? good : (row.complexity.includes("n²") ? warn : primary)}
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {row.complexity}
                </text>

                {/* set 对应 */}
                <text
                  x={colX[4] + colW[4] / 2}
                  y={rowH / 2 + 4}
                  fontSize="9"
                  fill={row.set === "—（set 无 []）" ? err : secondary}
                  fontFamily={row.set.startsWith("s.") ? "monospace" : undefined}
                  textAnchor="middle"
                >
                  {row.set}
                </text>
              </g>
            );
          })}

          {/* 底部提醒 */}
          <text x={w / 2} y={headerH + rows.length * rowH + 55} fontSize="10" fill={warn} textAnchor="middle">
            ⚠ operator[] 仅在 map/unordered_map 可用 —— set 无 []；查找时应优先用 find() 而非 []（[]
            会在 key 不存在时插入默认值）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        map 和 set 的常用操作速查表。operator[] 是 map 独有的便利接口——但它会在 key 不存在时静默插入默认值，调试时容易产生副作用。
      </figcaption>
    </figure>
  );
}
