/**
 * <ConstMemberDiagram>：const 对象 vs 非 const 对象的成员函数调用权示意图。
 *
 * 左侧展示非 const 对象可以调用所有成员函数；
 * 右侧展示 const 对象只能调用 const 成员函数，调用非 const 函数编译报错。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */

export function ConstMemberDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 330"
          role="img"
          aria-label="const 成员函数示意图：对比非 const 对象与 const 对象的可调用函数集合"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ── 标题 ── */}
          <text x={320} y={24} textAnchor="middle" fontSize="13" fontWeight="600" fill={primary}>
            const 对象 vs 非 const 对象：谁能调用谁
          </text>

          {/* ═══════ 左栏：非 const 对象 ═══════ */}
          <rect x={16} y={40} width={294} height={270} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />

          {/* 对象标签 */}
          <rect x={36} y={56} width={140} height={42} rx="6" fill="var(--accent-glow)" stroke={primary} strokeWidth="1.5" />
          <text x={106} y={72} textAnchor="middle" fontSize="12" fill={primary} fontWeight="600">
            Sales_data item;
          </text>
          <text x={106} y={88} textAnchor="middle" fontSize="9" fill={secondary}>
            非 const 对象
          </text>

          {/* 可调用函数列表 */}
          <text x={36} y={124} fontSize="11" fill={primary} fontWeight="600">
            可调用所有函数：
          </text>

          <text x={36} y={148} fontSize="11" fill="var(--success)" fontFamily="monospace">✓ isbn() const</text>
          <text x={36} y={170} fontSize="11" fill="var(--success)" fontFamily="monospace">✓ avg_price() const</text>
          <text x={36} y={192} fontSize="11" fill="var(--success)" fontFamily="monospace">✓ combine(rhs)</text>
          <text x={36} y={214} fontSize="11" fill="var(--success)" fontFamily="monospace">✓ print()</text>

          {/* 底部说明 */}
          <text x={36} y={252} fontSize="9" fill={secondary}>const 成员函数：承诺不改 this</text>
          <text x={36} y={268} fontSize="9" fill={secondary}>非 const 成员函数：允许改 this</text>
          <text x={36} y={284} fontSize="9" fill={secondary}>item.isbn() → this 类型: Sales_data*</text>

          {/* ═══════ 右栏：const 对象 ═══════ */}
          <rect x={330} y={40} width={294} height={270} rx="8" fill={bg} stroke={accent} strokeWidth="2" />

          {/* const 标签 */}
          <rect x={36} y={8} width={40} height={16} rx="3" fill={accent} />
          <text x={56} y={19} textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">const</text>

          {/* 对象标签 */}
          <rect x={350} y={56} width={154} height={42} rx="6" fill="var(--accent-glow)" stroke={accent} strokeWidth="1.5" />
          <text x={427} y={72} textAnchor="middle" fontSize="12" fill={accent} fontWeight="600">
            const Sales_data c;
          </text>
          <text x={427} y={88} textAnchor="middle" fontSize="9" fill={secondary}>
            const 对象
          </text>

          {/* 可调用函数列表 */}
          <text x={350} y={124} fontSize="11" fill={primary} fontWeight="600">
            只能调 const 函数：
          </text>

          <text x={350} y={148} fontSize="11" fill="var(--success)" fontFamily="monospace">✓ isbn() const</text>
          <text x={350} y={170} fontSize="11" fill="var(--success)" fontFamily="monospace">✓ avg_price() const</text>
          <text x={350} y={192} fontSize="11" fill="var(--danger)" fontFamily="monospace">✗ combine(rhs)</text>
          <text x={520} y={192} fontSize="8" fill="var(--danger)">编译错误</text>
          <text x={350} y={214} fontSize="11" fill="var(--danger)" fontFamily="monospace">✗ print()</text>
          <text x={520} y={214} fontSize="8" fill="var(--danger)">编译错误</text>

          {/* 底部说明 */}
          <text x={350} y={252} fontSize="9" fill={secondary}>只读承诺升级：const 对象 →</text>
          <text x={350} y={268} fontSize="9" fill={secondary}>this 指针变成 const Sales_data*</text>
          <text x={350} y={284} fontSize="9" fill={secondary}>非 const 函数期待 Sales_data* → 不匹配</text>

          {/* ── 中间箭头 ── */}
          <defs>
            <marker id="arrowCon" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={secondary} />
            </marker>
          </defs>
          <line x1={316} y1={130} x2={326} y2={130} stroke={secondary} strokeWidth="1" markerEnd="url(#arrowCon)" />
          <text x={320} y={120} textAnchor="middle" fontSize="8" fill={secondary}>对比</text>

          {/* ── 底部图例 ── */}
          <text x={16} y={322} fontSize="10" fill={secondary}>
            🟢 绿色 ✓ = 可调用 &nbsp;&nbsp; 🔴 红色 ✗ = 编译错误（const 对象不能调用非 const 成员函数）&nbsp;&nbsp;
            const 成员函数 = 声明末尾加 const 关键字，承诺不修改 *this
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        const 对象只能调用 const 成员函数。const 成员函数把 this 指针的类型从 T* 变成 const T*——不能修改 *this。非 const 对象两者都能调。
      </figcaption>
    </figure>
  );
}
