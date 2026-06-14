/**
 * <AlgorithmArchitectureDiagram>：容器 ↹ 迭代器 ↹ 算法的三层解耦架构图。
 *
 * 展示泛型算法的核心设计哲学：算法不与具体容器耦合，
 * 而是通过迭代器作为中间抽象层来操作范围 [begin, end)。
 * 同一算法可作用于任何提供迭代器的容器。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--xxx)），无阴影。
 */
export function AlgorithmArchitectureDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";

  const w = 800;
  const h = 500;

  // 三层布局：容器(上) → 迭代器(中) → 算法(下)
  const cx = 400;
  const leftCol = 140;
  const midCol = 370;
  const rightCol = 620;

  // 容器层 Y
  const containerY = 38;
  // 迭代器层 Y
  const iterY = 210;
  // 算法层 Y
  const algoY = 370;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="泛型算法三层解耦架构：容器层通过迭代器层与算法层分离，算法只认迭代器不认容器"
          className="mx-auto block h-auto w-full max-w-[800px]"
        >
          {/* 标题 */}
          <text x={w / 2} y="22" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            泛型算法的三层解耦架构
          </text>

          {/* ========== 第一层：容器 ========== */}
          <text x={leftCol - 20} y={containerY + 56} fontSize="11" fontWeight="600" fill={secondary} textAnchor="middle">
            容器层
          </text>

          {/* vector 容器 */}
          <g transform={`translate(${leftCol}, ${containerY})`}>
            <rect x="0" y="0" width="180" height="120" rx="10" fill={accent} opacity="0.05" stroke={border} />
            <text x="90" y="20" fontSize="12" fontWeight="700" fill={accent} textAnchor="middle" fontFamily="monospace">
              vector
            </text>
            {/* 内部元素 */}
            {["a", "b", "c", "d", "?"].map((ch, i) => (
              <g key={i}>
                <rect
                  x={18 + i * 32}
                  y="36"
                  width="28"
                  height="32"
                  rx="4"
                  fill={i < 4 ? accent : "none"}
                  fillOpacity={i < 4 ? 0.15 : 1}
                  stroke={i < 4 ? accent : border}
                  strokeDasharray={i < 4 ? undefined : "3 3"}
                />
                <text
                  x={32 + i * 32}
                  y="57"
                  fontSize="13"
                  fill={i < 4 ? accent : secondary}
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {ch}
                </text>
              </g>
            ))}
            <text x="90" y="88" fontSize="9" fill={secondary} textAnchor="middle">
              连续存储 [0..N)
            </text>
            {/* 底部 begin/end 标记 */}
            <text x="36" y="108" fontSize="8" fill={good} fontFamily="monospace">begin()</text>
            <text x="148" y="108" fontSize="8" fill={warn} fontFamily="monospace">end()</text>
          </g>

          {/* list 容器 */}
          <g transform={`translate(${midCol}, ${containerY})`}>
            <rect x="0" y="0" width="180" height="120" rx="10" fill={accent} opacity="0.05" stroke={border} />
            <text x="90" y="20" fontSize="12" fontWeight="700" fill={accent} textAnchor="middle" fontFamily="monospace">
              list
            </text>
            {/* 链表示意 */}
            {[
              { x: 20, ch: "x" },
              { x: 60, ch: "y" },
              { x: 100, ch: "z" },
              { x: 140, ch: "w" },
            ].map(({ x: nx, ch }, i) => (
              <g key={i}>
                <circle cx={nx} cy="52" r="12" fill={accent} opacity="0.12" stroke={accent} />
                <text x={nx} y="56" fontSize="11" fill={accent} textAnchor="middle" fontFamily="monospace">
                  {ch}
                </text>
              </g>
            ))}
            {/* 箭头 */}
            {[40, 80, 120].map((sx, i) => (
              <line key={i} x1={sx + 2} y1="52" x2={sx + 18} y2="52" stroke={accent} strokeWidth="1.5" markerEnd="url(#arrSmall)" />
            ))}
            <text x="90" y="88" fontSize="9" fill={secondary} textAnchor="middle">
              链式节点，每个存 prev + next
            </text>
            <text x="36" y="108" fontSize="8" fill={good} fontFamily="monospace">begin()</text>
            <text x="148" y="108" fontSize="8" fill={warn} fontFamily="monospace">end()</text>
          </g>

          {/* deque 容器 */}
          <g transform={`translate(${rightCol}, ${containerY})`}>
            <rect x="0" y="0" width="160" height="120" rx="10" fill={accent} opacity="0.05" stroke={border} />
            <text x="80" y="20" fontSize="12" fontWeight="700" fill={accent} textAnchor="middle" fontFamily="monospace">
              deque
            </text>
            {/* 分段示意 */}
            <rect x="10" y="36" width="60" height="22" rx="4" fill={accent} opacity="0.08" stroke={border} />
            <rect x="14" y="39" width="16" height="16" rx="3" fill={accent} opacity="0.15" stroke={accent} />
            <rect x="32" y="39" width="16" height="16" rx="3" fill={accent} opacity="0.15" stroke={accent} />
            <rect x="50" y="39" width="16" height="16" rx="3" fill="none" stroke={border} strokeDasharray="2 2" />
            <rect x="10" y="64" width="60" height="22" rx="4" fill={accent} opacity="0.06" stroke={border} />
            <rect x="14" y="67" width="16" height="16" rx="3" fill={accent} opacity="0.15" stroke={accent} />
            <rect x="32" y="67" width="16" height="16" rx="3" fill={accent} opacity="0.15" stroke={accent} />
            <text x="88" y="52" fontSize="9" fill={secondary} fontFamily="monospace">中控</text>
            <text x="88" y="66" fontSize="9" fill={secondary} fontFamily="monospace">数组</text>
            <text x="80" y="105" fontSize="9" fill={secondary} textAnchor="middle">
              分段存储
            </text>
            <text x="20" y="122" fontSize="8" fill={good} fontFamily="monospace">begin()</text>
            <text x="128" y="122" fontSize="8" fill={warn} fontFamily="monospace">end()</text>
          </g>

          {/* 容器→迭代器的向下箭头 */}
          {[
            { fromX: leftCol + 90, toX: leftCol + 90 },
            { fromX: midCol + 90, toX: midCol + 90 },
            { fromX: rightCol + 80, toX: leftCol + 90 },
          ].map(({ fromX, toX }, i) => (
            <line
              key={`c2i-${i}`}
              x1={fromX}
              y1={containerY + 120}
              x2={toX}
              y2={iterY}
              stroke={i === 2 ? secondary : accent}
              strokeWidth="1.5"
              strokeDasharray={i === 2 ? "6 4" : undefined}
              markerEnd={i === 2 ? undefined : "url(#arrAccent)"}
              opacity={i === 2 ? 0.3 : 1}
            />
          ))}

          {/* ========== 第二层：迭代器 ========== */}
          <text x={leftCol - 20} y={iterY + 40} fontSize="11" fontWeight="600" fill={secondary} textAnchor="middle">
            迭代器层
          </text>

          {/* 迭代器可视化 */}
          <g transform={`translate(${leftCol + 20}, ${iterY + 6})`}>
            <rect x="0" y="0" width="560" height="68" rx="10" fill={good} opacity="0.04" stroke={border} />
            <text x="280" y="18" fontSize="12" fontWeight="700" fill={good} textAnchor="middle" fontFamily="monospace">
              统一迭代器接口
            </text>
            {/* 迭代器属性 */}
            <g>
              {[
                { label: "begin()", x: 40, desc: "首元素" },
                { label: "end()", x: 155, desc: "尾后哨兵" },
                { label: "*iter", x: 270, desc: "解引用读/写" },
                { label: "++iter", x: 385, desc: "前进" },
                { label: "iter==end", x: 500, desc: "范围终点" },
              ].map(({ label: lbl, x: ix, desc }, i) => (
                <g key={i}>
                  <text x={ix} y="44" fontSize="10" fontWeight="600" fill={primary} textAnchor="middle" fontFamily="monospace">
                    {lbl}
                  </text>
                  <text x={ix} y="58" fontSize="8" fill={secondary} textAnchor="middle">
                    {desc}
                  </text>
                </g>
              ))}
            </g>
          </g>

          {/* 迭代器→算法的向下箭头 */}
          <g>
            <line
              x1={leftCol + 300}
              y1={iterY + 80}
              x2={leftCol + 300}
              y2={algoY - 2}
              stroke={accent}
              strokeWidth="2"
              markerEnd="url(#arrAccent)"
            />
            <text x={leftCol + 316} y={iterY + 120} fontSize="10" fill={secondary}>
              算法只需 begin/end，
            </text>
            <text x={leftCol + 316} y={iterY + 136} fontSize="10" fill={secondary}>
              不关心是什么容器
            </text>
          </g>

          {/* ========== 第三层：算法 ========== */}
          <text x={leftCol - 20} y={algoY + 36} fontSize="11" fontWeight="600" fill={secondary} textAnchor="middle">
            算法层
          </text>

          {/* 算法盒子 */}
          <g transform={`translate(${leftCol + 20}, ${algoY})`}>
            <rect x="0" y="0" width="560" height="72" rx="10" fill={accent} opacity="0.06" stroke={accent} />
            <text x="280" y="20" fontSize="12" fontWeight="700" fill={accent} textAnchor="middle" fontFamily="monospace">
              泛型算法（与容器类型无关）
            </text>
            {/* 算法名称 */}
            {[
              { name: "find", x: 46 },
              { name: "sort", x: 134 },
              { name: "copy", x: 220 },
              { name: "fill", x: 308 },
              { name: "count", x: 390 },
              { name: "accumulate", x: 480 },
            ].map(({ name, x: ax }, i) => (
              <g key={i}>
                <rect x={ax - 28} y="34" width="56" height="28" rx="6" fill={accent} opacity="0.12" stroke={accent} strokeWidth="1" />
                <text x={ax} y="53" fontSize="11" fontWeight="600" fill={accent} textAnchor="middle" fontFamily="monospace">
                  {name}
                </text>
              </g>
            ))}
          </g>

          {/* 右侧解耦说明 */}
          <g transform={`translate(${rightCol + 18}, ${algoY - 10})`}>
            <text x="0" y="0" fontSize="10" fill={secondary}>
              <tspan x="0" dy="0" fill={accent} fontWeight="600">算法</tspan>
              {" "}不认容器
            </text>
            <text x="0" y="16" fontSize="10" fill={secondary}>
              <tspan x="0" dy="0" fill={good} fontWeight="600">只认迭代器</tspan>
              {" "}范围
            </text>
            <text x="0" y="36" fontSize="9" fill={secondary}>
              find(begin, end, val)
            </text>
            <text x="0" y="50" fontSize="9" fill={secondary}>
              sort(begin, end)
            </text>
            <text x="0" y="64" fontSize="9" fill={secondary}>
              copy(src_begin, src_end, dst)
            </text>
          </g>

          {/* 图例 */}
          <g transform={`translate(${leftCol + 20}, ${h - 20})`}>
            <line x1="0" y1="4" x2="28" y2="4" stroke={accent} strokeWidth="2" markerEnd="url(#arrAccent)" />
            <text x="36" y="8" fontSize="9" fill={secondary}>
              算法作用于容器的数据流方向
            </text>
          </g>

          <defs>
            <marker id="arrAccent" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0,1 7,4 0,7" fill={accent} />
            </marker>
            <marker id="arrSmall" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0,1 5,3 0,5" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        泛型算法的三层解耦：容器层负责存储；迭代器层提供遍历接口（begin/end）；算法层只认迭代器范围，不依赖具体容器类型。同一算法可作用于任何提供迭代器的容器。
      </figcaption>
    </figure>
  );
}
