/**
 * <TupleLayoutDiagram step={1|2|3|4}>：tuple 内存布局与 get<> 访问过程图。
 *
 * Step 1: tuple 整体——连续内存存储所有元素
 * Step 2: get<0> 访问——通过索引在编译期定位元素0
 * Step 3: get<1> 访问——索引1定位第二个元素
 * Step 4: 结构化绑定——auto [a,b,c] 语法糖批量解包
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

interface TupleLayoutDiagramProps {
  step?: 1 | 2 | 3 | 4;
}

export function TupleLayoutDiagram({ step = 1 }: TupleLayoutDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const good = "rgb(63,185,127)";

  const w = 800;
  const h = 390;
  const cx = w / 2;

  const elements = [
    { name: "int", value: "42", color: "rgb(99,179,237)" },
    { name: "double", value: "3.14", color: "rgb(237,137,99)" },
    { name: "string", value: "\"hello\"", color: "rgb(99,237,179)" },
  ];

  const boxW = 140;
  const boxH = 56;
  const gap = 4;
  const totalW = 3 * boxW + 2 * gap;
  const startX = (w - totalW) / 2;
  const topY = 80;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="tuple 内存布局——连续存储异构类型的三元素组"
          className="mx-auto block h-auto w-full max-w-[800px]"
        >
          <text x={cx} y="30" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            tuple 内存布局：连续存储异构类型
          </text>

          {/* Tuple type declaration */}
          <text x={cx} y="58" fontSize="11" fill={secondary} textAnchor="middle" fontFamily="monospace">
            tuple&lt;int, double, string&gt; t(42, 3.14, "hello");
          </text>

          {/* Memory blocks */}
          {elements.map((el, i) => {
            const x = startX + i * (boxW + gap);
            const y = topY;
            const isHighlighted = step >= i + 1;
            const isActive = step === i + 2 || (step === 4 && i < 3);
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width={boxW}
                  height={boxH}
                  rx="8"
                  fill={isActive ? `${el.color}1A` : "var(--code-bg)"}
                  stroke={isActive ? el.color : border}
                  strokeWidth={isActive ? 2.5 : 1}
                />
                {/* Index label */}
                <text x={x + boxW / 2} y={y + 20} fontSize="11" fontWeight="600" fill={isActive ? el.color : primary} textAnchor="middle">
                  [{i}]
                </text>
                {/* Type name */}
                <text x={x + 8} y={y + 36} fontSize="10" fill={isActive ? el.color : secondary} fontFamily="monospace">
                  {el.name}
                </text>
                {/* Value */}
                <text x={x + boxW - 8} y={y + 36} fontSize="10" fill={primary} textAnchor="end" fontFamily="monospace">
                  {el.value}
                </text>
                {/* Get<> annotation */}
                {(isHighlighted || i === 0 && step === 1) && (
                  <text
                    x={x + boxW / 2}
                    y={y + 52}
                    fontSize="9"
                    fill={accent}
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {i === 0 && step >= 1 ? `get<${i}>(t)` : ""}
                    {i === 1 && step >= 2 ? `get<${i}>(t)` : ""}
                    {i === 2 && step >= 3 ? `get<${i}>(t)` : ""}
                  </text>
                )}
              </g>
            );
          })}

          {/* Connecting arrows between blocks */}
          {[0, 1].map((i) => (
            <g key={`arrow-${i}`}>
              <line
                x1={startX + i * (boxW + gap) + boxW}
                y1={topY + boxH / 2}
                x2={startX + (i + 1) * (boxW + gap)}
                y2={topY + boxH / 2}
                stroke={border}
                strokeWidth={1}
              />
            </g>
          ))}

          {/* Step 4: structured binding visualization */}
          {step === 4 && (
            <g transform="translate(0, topY + boxH + 30)">
              {/* Arrow down from each element */}
              {elements.map((el, i) => {
                const elX = startX + i * (boxW + gap) + boxW / 2;
                return (
                  <g key={`bind-arrow-${i}`}>
                    <line
                      x1={elX}
                      y1={0}
                      x2={elX}
                      y2={28}
                      stroke={accent}
                      strokeWidth={1.5}
                      strokeDasharray="4,3"
                    />
                    <text x={elX} y={20} fontSize="9" fill={accent} textAnchor="middle" fontFamily="monospace">
                      ↓
                    </text>
                  </g>
                );
              })}

              {/* auto [a, b, c] = t; */}
              <g transform={`translate(${startX - 16}, 36)`}>
                <rect x="0" y="0" width={totalW + 32} height="42" rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="2" />
                <text x={(totalW + 32) / 2} y="18" fontSize="11" fontWeight="700" fill={accent} textAnchor="middle">
                  结构化绑定：auto [a, b, c] = t;
                </text>
                <text x={(totalW + 32) / 2} y="34" fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">
                  a=42  b=3.14  c="hello"
                </text>
              </g>
            </g>
          )}

          {/* Step indicator bar */}
          <rect x={cx - 220} y={h - 42} width="440" height="28" rx="6" fill={accent} fillOpacity="0.06" stroke={border} />
          <text x={cx} y={h - 22} fontSize="11" fill={accent} textAnchor="middle" fontFamily="monospace">
            {step === 1 && "① tuple 把不同类型的数据打包成一个对象——连续存储在内存中"}
            {step === 2 && "② get<0>(t) 在编译期根据索引定位到 int 元素——返回引用"}
            {step === 3 && "③ get<1>(t) / get<2>(t) 依次访问后续元素——索引写错编译期就报错"}
            {step === 4 && "④ C++17 结构化绑定：auto [a,b,c] = t 一次性拆成三个独立变量"}
          </text>

          {/* Source code panel */}
          <g transform={`translate(40, ${h - 88})`}>
            <rect x="0" y="0" width={w - 80} height="36" rx="6" fill="var(--code-bg)" stroke={border} />
            <text x="16" y="14" fontSize="10" fill={secondary} fontFamily="monospace">
              {step <= 3 && "// get<N>(tuple) —— 编译期取第 N 个元素，返回该类型的引用"}
              {step === 1 && ' int x = get<0>(t);'}
              {step === 2 && ' double y = get<1>(t);'}
              {step === 3 && ' string z = get<2>(t);'}
              {step === 4 && ' auto [x, y, z] = t;  // 等价于上面三行的语法糖'}
            </text>
            <text x="16" y="28" fontSize="10" fill={step >= 1 ? good : secondary} fontFamily="monospace">
              {step === 1 && "// x = 42"}
              {step === 2 && "// x = 42, y = 3.14"}
              {step === 3 && "// x = 42, y = 3.14, z = \"hello\""}
              {step === 4 && "// x = 42, y = 3.14, z = \"hello\"  (一行搞定)"}
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && "第一步：tuple 将不同类型的值打包成一个连续内存块——索引 0 是 int，索引 1 是 double，索引 2 是 string。"}
        {step === 2 && "第二步：get<0>(t) 在编译期按索引找到第一个元素。类型已在编译期确定——返回 int&。"}
        {step === 3 && "第三步：get<N>(t) 的 N 必须是编译期常量。写成 get<" + `3` + ">(t) 编译器直接报错——因为只有三个元素（索引 0-2）。"}
        {step === 4 && "第四步：C++17 结构化绑定是 get<> 的语法糖——auto [a,b,c] = t 把三个元素一次性拆包成独立变量。"}
      </figcaption>
    </figure>
  );
}
