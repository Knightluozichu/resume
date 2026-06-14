/**
 * <RuleOfFiveDiagram>：C++ 五法则（Rule of Five）关系图。
 *
 * 展示五个特殊成员函数之间的关系：析构函数是基础，拷贝/移动构造与赋值围绕它展开。
 * 依赖链：析构 → 拷贝构造 → 拷贝赋值 → 移动构造 → 移动赋值。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */
export function RuleOfFiveDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";

  const w = 700;
  const h = 480;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="C++ 五法则关系图：析构函数是基础，拷贝构造和拷贝赋值构成拷贝控制，移动构造和移动赋值构成移动控制"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          <text x={w / 2} y={22} fontSize={15} fontWeight={700} fill={primary} textAnchor="middle">
            五法则（Rule of Five）：五个特殊成员函数的关系
          </text>
          <text x={w / 2} y={42} fontSize={10} fill={secondary} textAnchor="middle">
            如果自定义了其中任何一个，通常就需要定义全部五个
          </text>

          {/* ====== 析构函数（底部基础） ====== */}
          <rect x={220} y={370} width={260} height={70} rx={8} fill={accent} opacity={0.08} stroke={accent} strokeWidth={2} />
          <text x={350} y={396} fontSize={13} fontWeight={700} fill={primary} textAnchor="middle" fontFamily="monospace">~ClassName()</text>
          <text x={350} y={416} fontSize={11} fontWeight={600} fill={accent} textAnchor="middle">析构函数（Destructor）</text>
          <text x={350} y={432} fontSize={9} fill={secondary} textAnchor="middle">释放资源 · 对象销毁时自动调用 · 只能有一个</text>

          {/* 从析构向上的连接线 */}
          <line x1={280} y1={370} x2={180} y2={230} stroke={border} strokeWidth={1.5} />
          <line x1={420} y1={370} x2={520} y2={230} stroke={border} strokeWidth={1.5} />

          {/* ====== 拷贝组（左上） ====== */}
          <g>
            {/* 拷贝构造 */}
            <rect x={40} y={120} width={240} height={70} rx={8} fill={elevated} stroke={border} strokeWidth={1.5} />
            <text x={160} y={146} fontSize={12} fontWeight={700} fill={primary} textAnchor="middle" fontFamily="monospace">ClassName(const ClassName&)</text>
            <text x={160} y={164} fontSize={11} fontWeight={600} fill={secondary} textAnchor="middle">拷贝构造函数</text>
            <text x={160} y={180} fontSize={9} fill={secondary} textAnchor="middle">用已有对象初始化新对象 · 应做深拷贝</text>

            {/* 拷贝赋值 */}
            <rect x={40} y={220} width={240} height={70} rx={8} fill={elevated} stroke={border} strokeWidth={1.5} />
            <text x={160} y={246} fontSize={12} fontWeight={700} fill={primary} textAnchor="middle" fontFamily="monospace">ClassName& operator=(const ClassName&)</text>
            <text x={160} y={264} fontSize={11} fontWeight={600} fill={secondary} textAnchor="middle">拷贝赋值运算符</text>
            <text x={160} y={280} fontSize={9} fill={secondary} textAnchor="middle">将已有对象赋值给另一个已有对象 · 应释放旧资源</text>
          </g>

          {/* 拷贝组内部竖线 */}
          <line x1={160} y1={190} x2={160} y2={215} stroke={border} strokeWidth={1.5} />

          {/* ====== 移动组（右上） ====== */}
          <g>
            {/* 移动构造 */}
            <rect x={420} y={120} width={240} height={70} rx={8} fill={elevated} stroke={good} strokeWidth={1.5} />
            <text x={540} y={146} fontSize={12} fontWeight={700} fill={primary} textAnchor="middle" fontFamily="monospace">ClassName(ClassName&&) noexcept</text>
            <text x={540} y={164} fontSize={11} fontWeight={600} fill={good} textAnchor="middle">移动构造函数（C++11）</text>
            <text x={540} y={180} fontSize={9} fill={secondary} textAnchor="middle">"窃取"源对象资源 · 源对象置为可析构状态</text>

            {/* 移动赋值 */}
            <rect x={420} y={220} width={240} height={70} rx={8} fill={elevated} stroke={good} strokeWidth={1.5} />
            <text x={540} y={246} fontSize={12} fontWeight={700} fill={primary} textAnchor="middle" fontFamily="monospace">ClassName& operator=(ClassName&&) noexcept</text>
            <text x={540} y={264} fontSize={11} fontWeight={600} fill={good} textAnchor="middle">移动赋值运算符（C++11）</text>
            <text x={540} y={280} fontSize={9} fill={secondary} textAnchor="middle">释放当前资源 · 接管源对象资源 · 源对象置空</text>
          </g>

          {/* 移动组内部竖线 */}
          <line x1={540} y1={190} x2={540} y2={215} stroke={good} strokeWidth={1.5} />

          {/* 上半区标签 */}
          <rect x={60} y={80} width={200} height={28} rx={4} fill={accent} opacity={0.08} />
          <text x={160} y={98} fontSize={10} fill={accent} textAnchor="middle">📋 左值拷贝语义 —— 不修改源</text>

          <rect x={440} y={80} width={200} height={28} rx={4} fill={good} opacity={0.08} />
          <text x={540} y={98} fontSize={10} fill={good} textAnchor="middle">🔄 右值移动语义 —— 窃取资源</text>

          {/* 从拷贝组到底部析构的连线标注 */}
          <text x={230} y={300} fontSize={9} fill={secondary} textAnchor="middle">拷贝后也需</text>
          <text x={230} y={314} fontSize={9} fill={secondary} textAnchor="middle">各自释放</text>

          <text x={470} y={300} fontSize={9} fill={secondary} textAnchor="middle">移动后也需</text>
          <text x={470} y={314} fontSize={9} fill={secondary} textAnchor="middle">释放旧资源</text>

          {/* 口诀 */}
          <text x={w / 2} y={60} fontSize={10} fill={accent} textAnchor="middle">
            💡 法则：如果你需要自定义析构、拷贝或移动中的任意一个，大概率这五个全都要管
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        析构函数是资源管理的基础。拷贝控制（左）用 const 左值引用、不修改源对象。移动控制（右）用右值引用、窃取源对象资源并把源置为可安全析构状态。<strong>五法则</strong>：自定义了其中任一个，通常这五个都需要显式定义或显式 = default / = delete。
      </figcaption>
    </figure>
  );
}
