/**
 * <RTTIDiagram step={1|2|3}>：dynamic_cast 运行时类型安全检查流程图。
 *
 * Step 1: 基类指针指向派生类对象——无法直接调用派生类特有方法
 * Step 2: dynamic_cast<T*> 尝试向下转型——成功返回有效指针，失败返回 nullptr
 * Step 3: dynamic_cast<T&> 尝试向下转型——成功干活，失败抛 bad_cast
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

interface RTTIDiagramProps {
  step?: 1 | 2 | 3;
}

export function RTTIDiagram({ step = 1 }: RTTIDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";
  const err = "rgb(229,103,92)";

  const w = 800;
  const h = 440;
  const cx = w / 2;

  const baseColor = "rgb(99,179,237)";
  const derivedColor = "rgb(237,137,99)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="RTTI—dynamic_cast 运行时类型安全检查与导航"
          className="mx-auto block h-auto w-full max-w-[800px]"
        >
          <text x={cx} y="28" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            RTTI：运行时类型识别与安全向下转型
          </text>

          {/* ── Class hierarchy box ── */}
          <g transform="translate(28, 48)">
            <rect x="0" y="0" width="290" height="122" rx="8" fill="var(--code-bg)" stroke={border} />
            <text x="145" y="20" fontSize="10" fontWeight="600" fill={secondary} textAnchor="middle">类的继承关系</text>

            {/* Base class box */}
            <rect x="50" y="30" width="190" height="30" rx="6" fill={baseColor} fillOpacity="0.1" stroke={baseColor} strokeWidth="1.5" />
            <text x="145" y="50" fontSize="11" fontWeight="600" fill={baseColor} textAnchor="middle">{'class Base { virtual ~Base() ... }'}</text>

            {/* Derived class boxes */}
            <rect x="30" y="72" width="110" height="30" rx="6" fill={derivedColor} fillOpacity="0.1" stroke={derivedColor} strokeWidth="1" />
            <text x="85" y="91" fontSize="10" fill={derivedColor} textAnchor="middle">class DerivedA</text>

            <rect x="150" y="72" width="110" height="30" rx="6" fill={derivedColor} fillOpacity="0.1" stroke={derivedColor} strokeWidth={step >= 2 ? 2.5 : 1} />
            <text x="205" y="91" fontSize="10" fill={step >= 2 ? derivedColor : secondary} textAnchor="middle">class DerivedB</text>

            {/* Inheritance arrows */}
            <line x1="85" y1="72" x2="145" y2="60" stroke={border} strokeWidth="1" />
            <line x1="205" y1="72" x2="145" y2="60" stroke={border} strokeWidth="1" />
          </g>

          {/* ── Right side: base pointer to derived ── */}
          <g transform="translate(360, 48)">
            <rect x="0" y="0" width="410" height="122" rx="8" fill="var(--code-bg)" stroke={border} />
            <text x="205" y="20" fontSize="10" fontWeight="600" fill={secondary} textAnchor="middle">通过基类指针操作派生类对象</text>

            {/* Code block */}
            <text x="14" y="42" fontSize="10" fill={primary} fontFamily="monospace">Base* bp = new DerivedB();</text>
            <text x="14" y="58" fontSize="10" fill={secondary} fontFamily="monospace">// bp 是 Base*——只能调 Base 的方法</text>

            {step >= 2 && (
              <>
                <text x="14" y="78" fontSize="10" fill={accent} fontFamily="monospace">auto* db = dynamic_cast&lt;DerivedB*&gt;(bp);</text>
                {step === 2 && (
                  <text x="14" y="96" fontSize="10" fill={good} fontFamily="monospace">{'if (db) { db->derivedOnlyMethod(); }    // 转型成功！'}</text>
                )}
                {step === 3 && (
                  <>
                    <text x="14" y="96" fontSize="10" fill={good} fontFamily="monospace">// 指针版本：失败返回 nullptr{' → '}安全判空</text>
                    <text x="14" y="112" fontSize="10" fill={warn} fontFamily="monospace">// 引用版本：失败抛 std::bad_cast{' → '}需要 try/catch</text>
                  </>
                )}
              </>
            )}
          </g>

          {/* ── Step flowchart section ── */}
          {step >= 2 && (
            <g transform="translate(28, 195)">
              <rect x="0" y="0" width="742" height={step === 3 ? 130 : 95} rx="8" fill={accent} fillOpacity="0.04" stroke={border} />
              <text x="371" y="18" fontSize="11" fontWeight="600" fill={accent} textAnchor="middle">
                {step === 2 ? "dynamic_cast&lt;T*&gt; 安全检查流程" : "dynamic_cast：指针 vs 引用——两种失败处理方式"}
              </text>

              {step === 2 && (
                <>
                  {/* Flow nodes */}
                  <rect x="80" y="34" width="160" height="34" rx="6" fill={baseColor} fillOpacity="0.1" stroke={baseColor} strokeWidth="1.5" />
                  <text x="160" y="55" fontSize="10" fill={primary} textAnchor="middle">bp 指向的对象类型？</text>

                  <rect x="310" y="34" width="160" height="34" rx="6" fill={good} fillOpacity="0.1" stroke={good} strokeWidth="1.5" />
                  <text x="390" y="55" fontSize="10" fill={good} textAnchor="middle">是 DerivedB → 返回有效指针</text>

                  <rect x="540" y="34" width="160" height="34" rx="6" fill={err} fillOpacity="0.1" stroke={err} strokeWidth="1.5" />
                  <text x="620" y="55" fontSize="10" fill={err} textAnchor="middle">不是 → 返回 nullptr</text>

                  {/* Arrows */}
                  <text x="258" y="55" fontSize="14" fill={accent} textAnchor="middle">→</text>
                  <text x="488" y="55" fontSize="14" fill={accent} textAnchor="middle">→</text>
                </>
              )}

              {step === 3 && (
                <>
                  <rect x="40" y="34" width="320" height="78" rx="6" fill={good} fillOpacity="0.06" stroke={good} strokeWidth="1.5" />
                  <text x="200" y="52" fontSize="10" fontWeight="700" fill={good} textAnchor="middle">dynamic_cast&lt;T*&gt;(ptr)</text>
                  <text x="200" y="70" fontSize="9" fill={primary} textAnchor="middle">类型匹配时返回 T* 指针</text>
                  <text x="200" y="88" fontSize="9" fill={good} textAnchor="middle">不匹配时返回 nullptr——if (p) 判空</text>
                  <text x="200" y="104" fontSize="9" fill={secondary} textAnchor="middle">推荐：指针版不会抛异常，逻辑清晰</text>

                  <rect x="400" y="34" width="320" height="78" rx="6" fill={warn} fillOpacity="0.06" stroke={warn} strokeWidth="1.5" />
                  <text x="560" y="52" fontSize="10" fontWeight="700" fill={warn} textAnchor="middle">dynamic_cast&lt;T&amp;&gt;(ref)</text>
                  <text x="560" y="70" fontSize="9" fill={primary} textAnchor="middle">类型匹配时返回 T&amp; 引用</text>
                  <text x="560" y="88" fontSize="9" fill={warn} textAnchor="middle">不匹配时抛出 std::bad_cast</text>
                  <text x="560" y="104" fontSize="9" fill={secondary} textAnchor="middle">场景：确定一定会成功——失败用 catch 捕获</text>
                </>
              )}
            </g>
          )}

          {/* ── Bottom info bar ── */}
          <g transform={`translate(28, ${h - 78})`}>
            <rect x="0" y="0" width="742" height="56" rx="6" fill={step === 1 ? accent : good} fillOpacity="0.05" stroke={border} />
            <text x="371" y="18" fontSize="10" fontWeight="600" fill={step === 1 ? accent : good} textAnchor="middle">
              {step === 1 && "① 问题：基类指针 bp 看不到派生类特有成员——编译期只知道静态类型 Base*"}
              {step === 2 && "② dynamic_cast&lt;T*&gt; 在运行时检查实际类型→匹配就返回有效指针、不匹配返回 nullptr→判空即可"}
              {step === 3 && "③ 指针版 vs 引用版——指针失败返 nullptr 好处理，引用失败抛异常；日常编程优先用指针版"}
            </text>
            <text x="371" y="38" fontSize="9" fill={secondary} textAnchor="middle">
              {step === 1 && "RTTI 的前提：类必须至少有一个虚函数（通常是虚析构）——dynamic_cast 需要 vtable 中的运行时类型信息。"}
              {step === 2 && "RTTI 的前提：vtable 提供运行时类型信息。没有虚函数 = 无法 dynamic_cast——编译报错。"}
              {step === 3 && "typeid：只查询不转换。dynamic_cast：查询+转换一步到位。两者都依赖 RTTI 和虚函数。"}
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && "第一步：基类指针只能看到基类接口，派生类方法暂时不可见"}
        {step === 2 && "第二步：dynamic_cast 运行时查真实类型，成功返回有效指针，失败返 nullptr"}
        {step === 3 && "第三步：指针版失败返 nullptr（常用），引用版失败抛 bad_cast 异常"}
      </figcaption>
    </figure>
  );
}
