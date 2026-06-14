/**
 * <AdvancedFeatureTable>：六种 C++ 高级特性速查表。
 *
 * placement new / RTTI / enum class / union / 成员指针 / 嵌套类。
 *
 * Server Component（纯展示，静态 SVG 表格，无交互）。token 色，无阴影。
 */

export function AdvancedFeatureTable() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const good = "rgb(63,185,127)";

  const w = 840;
  const h = 440;
  const cx = w / 2;

  const features = [
    {
      name: "placement new",
      keyword: "new (ptr) T(args)",
      purpose: "在已分配内存上构造对象",
      scenario: "内存池、重复使用缓冲区",
      caution: "必须显式析构，禁止 delete",
    },
    {
      name: "RTTI",
      keyword: "typeid / dynamic_cast",
      purpose: "运行时识别/安全向下转型",
      scenario: "基类指针→派生类特有操作",
      caution: "需要虚函数（vtable）",
    },
    {
      name: "enum class",
      keyword: "enum class Name : int",
      purpose: "类型安全的限定作用域枚举",
      scenario: "状态机、选项、错误码",
      caution: "不能隐式转 int（需 static_cast）",
    },
    {
      name: "union",
      keyword: "union U { ... }",
      purpose: "成员共享同一块内存",
      scenario: "多类型值复用、内存解释",
      caution: "手动管理活跃成员/析构",
    },
    {
      name: "成员指针",
      keyword: "int C::*p = &C::m",
      purpose: "指向类成员的偏移量",
      scenario: "回调表、命令映射",
      caution: "语法复杂——.* 和 ->*",
    },
    {
      name: "嵌套类",
      keyword: "class Outer { class Inner {...} }",
      purpose: "隐藏实现细节的辅助类",
      scenario: "迭代器、节点、策略类",
      caution: "不自动访问封闭类私有成员",
    },
  ];

  const colWidths = [120, 156, 150, 140, 164, 86]; // sum = 816
  const colStarts = colWidths.reduce(
    (acc, w, i) => {
      if (i < colWidths.length - 1) acc.push(acc[i] + w);
      return acc;
    },
    [12],
  );
  const headers = ["特性", "关键词/语法", "核心作用", "典型场景", "⚠ 注意", "推荐度"];

  const rowH = 54;
  const headerY = 36;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="六种 C++ 高级特性速查表"
          className="mx-auto block h-auto w-full max-w-[840px]"
        >
          <text x={cx} y="22" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            C++ 高级特性速查表：六个特殊工具
          </text>

          {/* Header row */}
          <rect x="6" y={headerY} width={w - 12} height="24" rx="4" fill={accent} fillOpacity="0.08" stroke={border} />
          {headers.map((h, i) => (
            <text
              key={i}
              x={colStarts[i] + colWidths[i] / 2}
              y={headerY + 17}
              fontSize="9"
              fontWeight="700"
              fill={accent}
              textAnchor="middle"
            >
              {h}
            </text>
          ))}

          {/* Data rows */}
          {features.map((f, i) => {
            const y = headerY + 32 + i * rowH;
            return (
              <g key={f.name}>
                <rect
                  x="6"
                  y={y}
                  width={w - 12}
                  height={rowH - 4}
                  rx="6"
                  fill="var(--code-bg)"
                  stroke={border}
                  strokeWidth="0.5"
                />
                {/* Feature name */}
                <text x={colStarts[0] + colWidths[0] / 2} y={y + rowH / 2 + 2} fontSize="10" fontWeight="700" fill={primary} textAnchor="middle">
                  {f.name}
                </text>
                {/* Keyword */}
                <text x={colStarts[1] + colWidths[1] / 2} y={y + rowH / 2 + 2} fontSize="9" fill={accent} textAnchor="middle" fontFamily="monospace">
                  {f.keyword}
                </text>
                {/* Purpose */}
                <text x={colStarts[2] + colWidths[2] / 2} y={y + rowH / 2 + 2} fontSize="9" fill={primary} textAnchor="middle">
                  {f.purpose}
                </text>
                {/* Scenario */}
                <text x={colStarts[3] + colWidths[3] / 2} y={y + rowH / 2 + 2} fontSize="9" fill={secondary} textAnchor="middle">
                  {f.scenario}
                </text>
                {/* Caution */}
                <text x={colStarts[4] + colWidths[4] / 2} y={y + rowH / 2 + 2} fontSize="8" fill="rgb(229,181,103)" textAnchor="middle">
                  {f.caution}
                </text>
                {/* Rating */}
                <text x={colStarts[5] + colWidths[5] / 2} y={y + rowH / 2 + 2} fontSize="10" fill={good} fontWeight="700" textAnchor="middle">
                  ★★★★★
                </text>
              </g>
            );
          })}

          {/* Bottom summary */}
          <rect
            x="6"
            y={headerY + 32 + 6 * rowH + 8}
            width={w - 12}
            height="30"
            rx="6"
            fill={accent} fillOpacity="0.04"
            stroke={border}
          />
          <text
            x={cx}
            y={headerY + 32 + 6 * rowH + 27}
            fontSize="9"
            fill={secondary}
            textAnchor="middle"
          >
            六个特性能覆盖 C++ 高级场景的 90%：placement new → 内存控制、RTTI → 运行时类型安全、enum class → 编译期枚举安全、union → 共享内存、成员指针 → 回调机制、嵌套类 → 类型隔离
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        六种高级工具的关系：placement new 和 RTTI 是运行时特性（动态内存+类型识别），enum class 和 union 是编译期类型特性（安全枚举+共享存储），成员指针和嵌套类是代码组织特性（回调+封装）。
      </figcaption>
    </figure>
  );
}
