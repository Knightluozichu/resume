/**
 * <EnumUnionDiagram>：enum class / enum / union 三区并排对比图。
 *
 * 对比维度：作用域、隐式转换、底层类型、前置声明、存储模型。
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

export function EnumUnionDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";
  const err = "rgb(229,103,92)";

  // Layout：dim-label 单独放左 gutter，避免和数据列重叠（修复 HEL-241）
  const labelGutterW = 96;
  const labelGutterX = 16;
  const gap = 12;
  const colW = 220;
  const col1X = labelGutterX + labelGutterW + gap; // 124
  const col2X = col1X + colW + gap;                // 356
  const col3X = col2X + colW + gap;                // 588
  const w = col3X + colW + 16;                     // 824
  const startY = 64;
  const rowH = 70;
  const rowGap = 6;
  // 高度 = title gap + 6 行 + verdict (56) + legend (20) + 上下边距
  const h = startY + 6 * (rowH + rowGap) + 56 + 20 + 32; // 64 + 456 + 56 + 20 + 32 = 628
  const cx = w / 2;

  const dimensions = [
    {
      label: "namespace",
      left: "Color::Red · Color::Green",
      mid: "全局 Red · Green（污染）",
      right: "union 成员在包围作用域",
      leftGood: true, midBad: true, rightBad: false,
    },
    {
      label: "scope_resolution",
      left: "必须 Color::Red",
      mid: "Red 就够了（重名冲突）",
      right: "u.i · u.d · u.s",
      leftGood: true, midBad: true, rightBad: false,
    },
    {
      label: "implicit_integer_conversion",
      left: "禁止——需要 static_cast<int>",
      mid: "允许——int c = Red",
      right: "每个成员都从地址 0 开始",
      leftGood: true, midBad: true, rightBad: false,
    },
    {
      label: "underlying_type",
      left: "默认 int，可 :uint8_t",
      mid: "编译器自选——不可控",
      right: "sizeof = 最大成员的大小",
      leftGood: true, midBad: true, rightBad: false,
    },
    {
      label: "forward_declaration",
      left: "支持（需指定或默认 int）",
      mid: "不支持",
      right: "非匿名 union 可前置声明",
      leftGood: true, midBad: true, rightBad: false,
    },
    {
      label: "storage_model",
      left: "int 范围值（~4字节）",
      mid: "编译器选定整型",
      right: "所有成员重叠存储（共享起始地址）",
      leftGood: true, midBad: true, rightBad: false,
    },
  ];

  const dimLabels: Record<string, string> = {
    namespace: "名称空间",
    scope_resolution: "作用域限定",
    implicit_integer_conversion: "隐式整数转换",
    underlying_type: "底层类型",
    forward_declaration: "前置声明",
    storage_model: "存储模型",
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="enum class vs enum vs union 三区并排对比——作用域、类型安全、存储模型"
          className="mx-auto block h-auto w-full max-w-[824px]"
        >
          <text x={cx} y="26" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            enum class vs enum vs union：三区对比
          </text>

          {/* Column headers */}
          <rect x={col1X} y="36" width={colW} height="22" rx="4" fill={accent} fillOpacity="0.1" />
          <text x={col1X + colW / 2} y="51" fontSize="11" fontWeight="700" fill={accent} textAnchor="middle">enum class（推荐）</text>

          <rect x={col2X} y="36" width={colW} height="22" rx="4" fill={warn} fillOpacity="0.12" />
          <text x={col2X + colW / 2} y="51" fontSize="11" fontWeight="700" fill={warn} textAnchor="middle">传统 enum（遗留）</text>

          <rect x={col3X} y="36" width={colW} height="22" rx="4" fill={good} fillOpacity="0.1" />
          <text x={col3X + colW / 2} y="51" fontSize="11" fontWeight="700" fill={good} textAnchor="middle">union（联合体）</text>

          {/* Dimension rows */}
          {dimensions.map((dim, i) => {
            const y = startY + i * (rowH + rowGap);
            const labelRectH = 22;
            const labelRectY = y + rowH / 2 - labelRectH / 2;
            return (
              <g key={dim.label}>
                {/* Dimension label —— 单独放在左 gutter，竖向居中，完全不与数据列重叠 */}
                <rect x={labelGutterX} y={labelRectY} width={labelGutterW} height={labelRectH} rx="4" fill="var(--code-bg)" stroke={border} />
                <text x={labelGutterX + labelGutterW / 2} y={labelRectY + labelRectH / 2 + 3} fontSize="10" fill={secondary} textAnchor="middle">
                  {dimLabels[dim.label]}
                </text>

                {/* Row backgrounds */}
                <rect x={col1X} y={y} width={colW} height={rowH} rx="6" fill="var(--code-bg)" stroke={dim.leftGood ? border : accent} strokeWidth={dim.leftGood ? 1 : 2} />
                <rect x={col2X} y={y} width={colW} height={rowH} rx="6" fill="var(--code-bg)" stroke={dim.midBad ? warn : border} strokeWidth={dim.midBad ? 2 : 1} />
                <rect x={col3X} y={y} width={colW} height={rowH} rx="6" fill="var(--code-bg)" stroke={good} strokeWidth={1.5} />

                {/* Content */}
                <text x={col1X + colW / 2} y={y + rowH / 2 + 4} fontSize="10" fill={primary} textAnchor="middle">
                  {dim.left}
                </text>
                <text x={col2X + colW / 2} y={y + rowH / 2 + 4} fontSize="10" fill={primary} textAnchor="middle">
                  {dim.mid}
                </text>
                <text x={col3X + colW / 2} y={y + rowH / 2 + 4} fontSize="10" fill={primary} textAnchor="middle">
                  {dim.right}
                </text>
              </g>
            );
          })}

          {/* Bottom verdict —— 跨数据列三段（不含左 gutter） */}
          {(() => {
            const verdictY = startY + 6 * (rowH + rowGap);
            const verdictW = colW * 3 + gap * 2;
            return (
              <g>
                <rect x={col1X} y={verdictY} width={verdictW} height="56" rx="8" fill={accent} fillOpacity="0.05" stroke={accent} strokeWidth="1.5" />
                <text x={col1X + colW / 2} y={verdictY + 22} fontSize="10" fill={good} fontWeight="700" textAnchor="middle">
                  新代码一律用 enum class
                </text>
                <text x={col2X + colW / 2} y={verdictY + 22} fontSize="10" fill={warn} fontWeight="700" textAnchor="middle">
                  传统 enum——只维护老代码
                </text>
                <text x={col3X + colW / 2} y={verdictY + 22} fontSize="10" fill={good} fontWeight="700" textAnchor="middle">
                  C++17 优先用 variant 代替 union
                </text>
                <text x={col1X + verdictW / 2} y={verdictY + 42} fontSize="10" fill={secondary} textAnchor="middle">
                  enum class：类型安全 + 作用域限定 → 编译期防错。union：共享内存 → 手动管理 ≡ variant 更安全。
                </text>
              </g>
            );
          })()}

          {/* Legend bar —— verdict 下方 ≥12px、距 viewBox 底 ≥12px */}
          {(() => {
            const legendY = startY + 6 * (rowH + rowGap) + 56 + 12;
            return (
              <g>
                <rect x={cx - 200} y={legendY} width="400" height="20" rx="4" fill="var(--code-bg)" stroke={border} />
                <text x={cx} y={legendY + 14} fontSize="10" fill={secondary} textAnchor="middle">
                  ⬤ enum class = 类型安全 {'{'} 推荐 &#xa0;&#xa0; ⬤ 传统 enum = 有风险 &#xa0;&#xa0; ⬤ union = C++17 variant 可替代
                </text>
              </g>
            );
          })()}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        enum class 是 C++ 推荐的枚举写法——类型安全、作用域限定、不隐式转整数。传统 enum 只有在维护老代码库时碰到。union 在 C++17 后有 std::variant（自动追踪活跃成员）更安全——但理解 union 对底层编程依然重要。
      </figcaption>
    </figure>
  );
}
