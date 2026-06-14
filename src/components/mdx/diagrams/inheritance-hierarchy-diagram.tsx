/**
 * <InheritanceHierarchyDiagram>：C++ 继承层次结构图。
 * 展示基类 Quote 与派生类 Bulk_quote 之间的继承关系。
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */
export function InheritanceHierarchyDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";

  const w = 720;
  const h = 500;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="C++ 继承层次结构图：基类 Quote 与派生类 Bulk_quote 的成员继承与虚函数覆盖关系"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={w / 2} y={22} fontSize={15} fontWeight={700} fill={primary} textAnchor="middle">
            继承层次：基类与派生类的成员关系
          </text>
          <text x={w / 2} y={42} fontSize={10} fill={secondary} textAnchor="middle">
            protected 成员可被派生类访问但对用户不可见；virtual 函数支持覆盖（override）
          </text>

          {/* ====== 基类 Quote ====== */}
          <rect x={160} y={60} width={400} height={160} rx={10} fill={elevated} stroke={accent} strokeWidth={2} />
          <text x={360} y={82} fontSize={14} fontWeight={700} fill={accent} textAnchor="middle">class Quote（基类）</text>

          <rect x={180} y={92} width={360} height={50} rx={4} fill={bg} stroke={border} strokeWidth={1} />
          <text x={194} y={108} fontSize={10} fill={secondary}>private:</text>
          <text x={200} y={124} fontSize={10} fill={primary} fontFamily="monospace">std::string bookNo;</text>
          <text x={200} y={138} fontSize={10} fill={primary} fontFamily="monospace">double price = 0.0;</text>

          <rect x={180} y={148} width={360} height={25} rx={4} fill={warn} opacity={0.08} stroke={warn} strokeWidth={1} />
          <text x={194} y={166} fontSize={10} fill={warn}>protected: （派生类可访问，用户不可访问）</text>

          <rect x={180} y={178} width={360} height={34} rx={4} fill={good} opacity={0.06} stroke={good} strokeWidth={1} />
          <text x={194} y={194} fontSize={10} fill={good}>public:</text>
          <text x={200} y={208} fontSize={10} fill={primary} fontFamily="monospace">virtual double net_price(size_t) const;</text>

          <polygon points="360,222 348,254 372,254" fill={bg} stroke={border} strokeWidth={1.5} />
          <text x={390} y={246} fontSize={10} fill={secondary} fontFamily="monospace">: public Quote</text>

          {/* ====== 派生类 Bulk_quote ====== */}
          <rect x={90} y={260} width={540} height={200} rx={10} fill={elevated} stroke={border} strokeWidth={1.5} />
          <text x={360} y={282} fontSize={14} fontWeight={700} fill={primary} textAnchor="middle">class Bulk_quote : public Quote（派生类）</text>

          <rect x={110} y={292} width={500} height={50} rx={4} fill={bg} stroke={border} strokeWidth={1} />
          <text x={124} y={308} fontSize={10} fill={secondary}>private:</text>
          <text x={130} y={324} fontSize={10} fill={primary} fontFamily="monospace">std::size_t min_qty = 0;</text>
          <text x={130} y={338} fontSize={10} fill={primary} fontFamily="monospace">double discount = 0.0;</text>

          <rect x={110} y={348} width={500} height={60} rx={4} fill={good} opacity={0.06} stroke={good} strokeWidth={1} />
          <text x={124} y={364} fontSize={10} fill={good}>public:</text>
          <text x={130} y={380} fontSize={10} fill={good} fontFamily="monospace">double net_price(size_t) const override;</text>
          <text x={430} y={380} fontSize={9} fill={accent}>overrides the base virtual function</text>
          <text x={130} y={396} fontSize={9} fill={secondary}>// isbn() and other non-virtual members inherited as-is</text>

          <rect x={110} y={414} width={500} height={38} rx={4} fill={accent} opacity={0.05} stroke={border} strokeWidth={1} />
          <text x={360} y={430} fontSize={10} fill={secondary} textAnchor="middle">Inherited from base: bookNo (not directly accessible, private)</text>
          <text x={360} y={444} fontSize={10} fill={secondary} textAnchor="middle">Inherited from base: isbn() (public, directly usable) / net_price (overridden)</text>

          {/* 右侧标注 */}
          <rect x={610} y={60} width={90} height={120} rx={6} fill={bg} stroke={border} strokeWidth={1} />
          <text x={655} y={82} fontSize={10} fontWeight={700} fill={accent} textAnchor="middle">Visibility</text>
          <line x1={618} y1={90} x2={692} y2={90} stroke={border} strokeWidth={0.5} />
          <rect x={620} y={96} width={70} height={16} rx={3} fill={good} opacity={0.12} />
          <text x={655} y={108} fontSize={9} fill={good} textAnchor="middle">public</text>
          <rect x={620} y={116} width={70} height={16} rx={3} fill={warn} opacity={0.12} />
          <text x={655} y={128} fontSize={9} fill={warn} textAnchor="middle">protected</text>
          <rect x={620} y={136} width={70} height={16} rx={3} fill={secondary} opacity={0.12} />
          <text x={655} y={148} fontSize={9} fill={secondary} textAnchor="middle">private</text>
          <text x={655} y={170} fontSize={8} fill={secondary} textAnchor="middle">base private</text>
          <text x={655} y={182} fontSize={8} fill={secondary} textAnchor="middle">not visible</text>
          <text x={655} y={194} fontSize={8} fill={secondary} textAnchor="middle">to derived</text>

          <text x={360} y={490} fontSize={10} fill={accent} textAnchor="middle">
            Core rule: base class private members exist in derived objects but are not directly accessible
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Base class <code>Quote</code> defines <code>bookNo</code>/<code>price</code> (private) and virtual <code>net_price</code> (public).
        Derived <code>Bulk_quote</code> inherits via <code>public</code> all base members and <strong>overrides</strong> <code>net_price</code>.
        Base private members exist in the derived object but cannot be directly accessed.
      </figcaption>
    </figure>
  );
}
