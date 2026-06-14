/**
 * <InheritanceLifetimeDiagram>：C++ 派生类构造/析构链顺序图。
 * 四阶段时间线: base ctor → derived ctor → derived dtor → base dtor.
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */
export function InheritanceLifetimeDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";
  const danger = "rgb(229,103,92)";

  const w = 720;
  const h = 460;

  const stages = [
    { x: 30, y: 100, color: accent,  title: "1. Base ctor", fn: "Quote::Quote()", detail: ["Init base part first:", "bookNo, price members", "vptr → Quote vtable"] },
    { x: 210, y: 100, color: good,   title: "2. Derived ctor", fn: "Bulk_quote::Bulk_quote()", detail: ["Then init derived part:", "min_qty, discount", "vptr → Bulk_quote vtable"] },
    { x: 390, y: 100, color: warn,   title: "3. Derived dtor", fn: "~Bulk_quote()", detail: ["Destroy derived part first:", "min_qty, discount (reverse)", "vptr falls back to Quote vtable"] },
    { x: 570, y: 100, color: danger, title: "4. Base dtor", fn: "~Quote()", detail: ["Finally destroy base part:", "price, bookNo (reverse)", "object lifetime ends"] },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="C++ derived class construction and destruction chain: base ctor → derived ctor → derived dtor → base dtor"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={w / 2} y={22} fontSize={15} fontWeight={700} fill={primary} textAnchor="middle">
            Derived Object Lifecycle: Strict 4-Stage Order
          </text>
          <text x={w / 2} y={42} fontSize={10} fill={secondary} textAnchor="middle">
            Construction: base first, then derived (bottom-up) | Destruction: derived first, then base (top-down)
          </text>

          {/* Time axis */}
          <line x1={60} y1={82} x2={660} y2={82} stroke={border} strokeWidth={3} />
          <text x={360} y={76} fontSize="9" fill={secondary} textAnchor="middle">Time →</text>

          {stages.map((s, i) => (
            <g key={i}>
              <circle cx={s.x + 50} cy={82} r={12} fill={bg} stroke={s.color} strokeWidth={2.5} />
              <text x={s.x + 50} y={87} textAnchor="middle" fontSize="11" fontWeight="700" fill={s.color}>
                {i + 1}
              </text>
              {i < stages.length - 1 && (
                <path d={`M ${s.x + 64} 82 L ${stages[i + 1].x + 36} 82`}
                  stroke={border} strokeWidth={1.5} markerEnd="url(#lifeArrow)" />
              )}
            </g>
          ))}

          {stages.map((s, i) => (
            <g key={`detail-${i}`}>
              <rect x={s.x} y={108} width={130} height={150} rx={8} fill={elevated} stroke={s.color} strokeWidth={1.5} />
              <text x={s.x + 65} y={130} fontSize="11" fontWeight="700" fill={s.color} textAnchor="middle">{s.title}</text>
              <line x1={s.x + 10} y1={138} x2={s.x + 120} y2={138} stroke={border} strokeWidth={0.5} />
              <rect x={s.x + 6} y={144} width={118} height={20} rx={4} fill={bg} stroke={s.color} strokeWidth={1} />
              <text x={s.x + 65} y={158} fontSize="9" fontWeight="600" fill={primary} textAnchor="middle" fontFamily="monospace">{s.fn}</text>
              {s.detail.map((line, j) => (
                <text key={j} x={s.x + 8} y={176 + j * 14} fontSize="8" fill={secondary}>{line}</text>
              ))}
            </g>
          ))}

          {/* Memory layout changes */}
          <rect x={30} y={280} width={660} height={100} rx={8} fill={bg} stroke={border} strokeWidth={1} />
          <text x={360} y={300} fontSize="11" fontWeight={700} fill={primary} textAnchor="middle">Object Memory Layout Changes During Lifecycle</text>

          <rect x={50} y={312} width={140} height={56} rx={4} fill={accent} opacity={0.08} stroke={accent} strokeWidth={1.5} />
          <text x={120} y={330} fontSize="9" fontWeight="600" fill={accent} textAnchor="middle">Base: initialized</text>
          <text x={120} y={346} fontSize="9" fill={primary} fontFamily="monospace" textAnchor="middle">vptr → Quote vtable</text>
          <text x={120} y={360} fontSize="8" fill={secondary} textAnchor="middle">Derived: uninitialized</text>

          <text x={198} y={345} fontSize="14" fill={good} textAnchor="middle">→</text>

          <rect x={215} y={312} width={140} height={56} rx={4} fill={good} opacity={0.08} stroke={good} strokeWidth={1.5} />
          <text x={285} y={330} fontSize="9" fontWeight="600" fill={good} textAnchor="middle">Fully constructed</text>
          <text x={285} y={346} fontSize="9" fill={primary} fontFamily="monospace" textAnchor="middle">vptr → Bulk vtable</text>
          <text x={285} y={360} fontSize="8" fill={secondary} textAnchor="middle">Ready to use</text>

          <text x={363} y={345} fontSize="14" fill={warn} textAnchor="middle">→</text>

          <rect x={380} y={312} width={140} height={56} rx={4} fill={warn} opacity={0.08} stroke={warn} strokeWidth={1.5} />
          <text x={450} y={330} fontSize="9" fontWeight="600" fill={warn} textAnchor="middle">Derived destroyed</text>
          <text x={450} y={346} fontSize="9" fill={primary} fontFamily="monospace" textAnchor="middle">vptr → Quote vtable</text>
          <text x={450} y={360} fontSize="8" fill={secondary} textAnchor="middle">Only base part left</text>

          <text x={528} y={345} fontSize="14" fill={danger} textAnchor="middle">→</text>

          <rect x={545} y={312} width={130} height={56} rx={4} fill={danger} opacity={0.08} stroke={danger} strokeWidth={1.5} />
          <text x={610} y={330} fontSize="9" fontWeight="600" fill={danger} textAnchor="middle">All destroyed</text>
          <text x={610} y={346} fontSize="9" fill={secondary} textAnchor="middle">Memory released</text>

          {/* Key principles */}
          <rect x={30} y={396} width={660} height={50} rx={6} fill={accent} opacity={0.05} stroke={accent} strokeWidth={1.5} />
          <text x={360} y={418} fontSize="11" fontWeight="700" fill={accent} textAnchor="middle">
            Rule: construct foundation first, then the building; destruct building first, then the foundation
          </text>
          <text x={360} y={436} fontSize="9" fill={secondary} textAnchor="middle">
            Destruction order is strict reverse of construction | vptr switches layer by layer | Base destructor MUST be virtual
          </text>

          <defs>
            <marker id="lifeArrow" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
              <path d="M0,1 L5,3 L0,5" fill={secondary} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Construction: <strong>base → derived</strong>. Destruction: <strong>derived → base</strong> (reverse).
        <code>vptr</code> updates layer by layer during construction and destruction.
        Base destructor must be <code>virtual</code> for correct cleanup through base pointer.
      </figcaption>
    </figure>
  );
}
