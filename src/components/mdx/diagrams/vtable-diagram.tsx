/**
 * <VTableDiagram>：C++ 虚函数表与动态绑定机制图。三步展示：vptr → vtable → function dispatch.
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */
export function VTableDiagram({ step = 1 }: { step?: number }) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";

  const w = 720;
  const h = 420;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label={`VTable and dynamic dispatch - step ${step}`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={w / 2} y={22} fontSize={15} fontWeight={700} fill={primary} textAnchor="middle">
            vptr → vtable → function address : How virtual dispatch works
          </text>
          <text x={w / 2} y={42} fontSize={10} fill={secondary} textAnchor="middle">
            {step === 1 && "Step 1: Each object with virtual functions has a hidden vptr pointing to its vtable"}
            {step === 2 && "Step 2: The vtable is an array of function pointers - each virtual function occupies one slot"}
            {step === 3 && "Step 3: At runtime, vptr → vtable → function pointer resolves which version to call"}
          </text>

          {/* Step progress dots */}
          {[1, 2, 3].map((s) => (
            <g key={s}>
              <circle cx={200 + (s - 1) * 160} cy={66} r={step === s ? 8 : 6}
                fill={step === s ? accent : elevated} stroke={step >= s ? accent : border}
                strokeWidth={step === s ? 2.5 : 1.5} />
              <text x={200 + (s - 1) * 160} y={71} textAnchor="middle" fontSize="9" fontWeight="700"
                fill={step >= s ? accent : secondary}>{s}</text>
              {s < 3 && (
                <line x1={200 + (s - 1) * 160 + 8} y1={66} x2={200 + s * 160 - 8} y2={66}
                  stroke={step > s ? accent : border} strokeWidth={1.5} />
              )}
            </g>
          ))}

          {/* step=1 */}
          {step === 1 && (
            <>
              <rect x={50} y={90} width={260} height={200} rx={8} fill={elevated} stroke={accent} strokeWidth={1.5} />
              <text x={180} y={116} fontSize={13} fontWeight={700} fill={accent} textAnchor="middle">Quote object (base)</text>
              <rect x={70} y={128} width={220} height={30} rx={4} fill={accent} opacity={0.1} stroke={accent} strokeWidth={1.5} />
              <text x={180} y={148} fontSize="11" fontWeight="600" fill={accent} textAnchor="middle" fontFamily="monospace">vptr → Quote vtable</text>
              <rect x={70} y={166} width={220} height={54} rx={4} fill={bg} stroke={border} strokeWidth={1} />
              <text x={84} y={184} fontSize="10" fill={primary} fontFamily="monospace">string bookNo  (data)</text>
              <text x={84} y={200} fontSize="10" fill={primary} fontFamily="monospace">double price    (data)</text>
              <text x={84} y={214} fontSize="9" fill={secondary}>Non-virtual: not in vtable</text>
              <text x={180} y={302} fontSize="9" fill={secondary} textAnchor="middle">8 bytes (64-bit) vptr at obj start</text>

              <rect x={360} y={90} width={310} height={240} rx={8} fill={elevated} stroke={border} strokeWidth={1.5} />
              <text x={515} y={116} fontSize={13} fontWeight={700} fill={primary} textAnchor="middle">Bulk_quote object (derived)</text>
              <rect x={380} y={128} width={270} height={30} rx={4} fill={accent} opacity={0.1} stroke={accent} strokeWidth={1.5} />
              <text x={515} y={148} fontSize="11" fontWeight="600" fill={accent} textAnchor="middle" fontFamily="monospace">vptr → Bulk_quote vtable</text>
              <rect x={380} y={166} width={270} height={86} rx={4} fill={bg} stroke={border} strokeWidth={1} />
              <text x={394} y={184} fontSize="10" fill={secondary} fontFamily="monospace">string bookNo (base part)</text>
              <text x={394} y={200} fontSize="10" fill={secondary} fontFamily="monospace">double price   (base part)</text>
              <line x1={388} y1={208} x2={642} y2={208} stroke={border} strokeWidth={0.5} />
              <text x={394} y={222} fontSize="10" fill={primary} fontFamily="monospace">size_t min_qty (derived new)</text>
              <text x={394} y={238} fontSize="10" fill={primary} fontFamily="monospace">double discount(derived new)</text>

              <text x={50} y={340} fontSize="9" fill={secondary}>Key: each object's vptr points to a different vtable</text>
              <text x={50} y={356} fontSize="9" fill={secondary}>vptr is set during construction - layer by layer</text>
            </>
          )}

          {/* step=2 */}
          {step === 2 && (
            <>
              <rect x={30} y={100} width={200} height={130} rx={8} fill={elevated} stroke={accent} strokeWidth={1.5} />
              <text x={130} y={122} fontSize={12} fontWeight={700} fill={accent} textAnchor="middle">Quote object</text>
              <rect x={50} y={132} width={160} height={24} rx={4} fill={accent} opacity={0.1} stroke={accent} strokeWidth={1} />
              <text x={130} y={149} fontSize="10" fontWeight="600" fill={accent} textAnchor="middle" fontFamily="monospace">vptr</text>
              <text x={130} y={180} fontSize="10" fill={primary} fontFamily="monospace">bookNo, price ...</text>

              <rect x={270} y={100} width={200} height={130} rx={8} fill={bg} stroke={border} strokeWidth={1.5} />
              <text x={370} y={122} fontSize={12} fontWeight={700} fill={primary} textAnchor="middle">Quote vtable</text>
              <rect x={290} y={132} width={160} height={24} rx={4} fill={bg} stroke={good} strokeWidth={1} />
              <text x={370} y={149} fontSize="10" fill={good} textAnchor="middle" fontFamily="monospace">&Quote::net_price</text>
              <text x={370} y={172} fontSize="8" fill={secondary} textAnchor="middle">slot 0: base version addr</text>

              <path d="M210,144 L260,144" stroke={accent} strokeWidth={1.5} markerEnd="url(#vtArrow)" />

              <rect x={30} y={260} width={200} height={130} rx={8} fill={elevated} stroke={border} strokeWidth={1.5} />
              <text x={130} y={282} fontSize={12} fontWeight={700} fill={primary} textAnchor="middle">Bulk_quote obj</text>
              <rect x={50} y={292} width={160} height={24} rx={4} fill={accent} opacity={0.1} stroke={accent} strokeWidth={1} />
              <text x={130} y={309} fontSize="10" fontWeight="600" fill={accent} textAnchor="middle" fontFamily="monospace">vptr</text>
              <text x={130} y={340} fontSize="10" fill={primary} fontFamily="monospace">min_qty, discount ...</text>

              <rect x={270} y={260} width={200} height={130} rx={8} fill={bg} stroke={border} strokeWidth={1.5} />
              <text x={370} y={282} fontSize={12} fontWeight={700} fill={primary} textAnchor="middle">Bulk_quote vtable</text>
              <rect x={290} y={292} width={160} height={24} rx={4} fill={bg} stroke={good} strokeWidth={1} />
              <text x={370} y={309} fontSize="10" fill={good} textAnchor="middle" fontFamily="monospace">Bulk_quote::net_price</text>
              <text x={370} y={332} fontSize="8" fill={secondary} textAnchor="middle">slot 0: derived override addr</text>

              <path d="M210,304 L260,304" stroke={accent} strokeWidth={1.5} markerEnd="url(#vtArrow)" />

              <text x={560} y={156} fontSize="10" fill={secondary}>Base vtable slot 0</text>
              <text x={560} y={172} fontSize="10" fill={secondary}>→ Quote::net_price</text>
              <text x={560} y={316} fontSize="10" fill={secondary}>Derived vtable slot 0</text>
              <text x={560} y={332} fontSize="10" fill={secondary}>→ Bulk_quote::net_price</text>
              <text x={560} y={356} fontSize="9" fill={accent}>Same slot, diff addr</text>
              <text x={560} y={372} fontSize="9" fill={accent}>→ this is dynamic dispatch</text>
            </>
          )}

          {/* step=3 */}
          {step === 3 && (
            <>
              <text x={360} y={90} fontSize={12} fontWeight={700} fill={primary} textAnchor="middle" fontFamily="monospace">
                double print_total(ostream &os, const Quote &item, size_t n)
              </text>

              <rect x={180} y={105} width={360} height={28} rx={4} fill={elevated} stroke={accent} strokeWidth={1.5} />
              <text x={360} y={124} fontSize="11" fill={primary} textAnchor="middle">item is const Quote& - compiler only knows base type</text>

              <path d="M360,133 L360,150" stroke={accent} strokeWidth={2} markerEnd="url(#vtArrow)" />

              <rect x={80} y={155} width={560} height={100} rx={8} fill={elevated} stroke={good} strokeWidth={1.5} />
              <text x={360} y={178} fontSize="12" fontWeight={700} fill={good} textAnchor="middle">At runtime: item may actually reference a Bulk_quote object!</text>

              <text x={140} y={206} fontSize="11" fill={primary} fontFamily="monospace">item.net_price(n) -- compiler generates:</text>

              <rect x={140} y={216} width={120} height={28} rx={4} fill={accent} opacity={0.08} stroke={accent} strokeWidth={1} />
              <text x={200} y={235} fontSize="10" fontWeight="600" fill={accent} textAnchor="middle">item.vptr</text>
              <text x={268} y={234} fontSize="16" fill={secondary} textAnchor="middle">→</text>
              <rect x={284} y={216} width={120} height={28} rx={4} fill={accent} opacity={0.12} stroke={accent} strokeWidth={1} />
              <text x={344} y={235} fontSize="10" fontWeight="600" fill={accent} textAnchor="middle">vtable[0]</text>
              <text x={412} y={234} fontSize="16" fill={secondary} textAnchor="middle">→</text>
              <rect x={428} y={216} width={160} height={28} rx={4} fill={good} opacity={0.1} stroke={good} strokeWidth={1.5} />
              <text x={508} y={235} fontSize="10" fontWeight="600" fill={good} textAnchor="middle">&Bulk_quote::net_price</text>

              <text x={360} y={290} fontSize="10" fill={secondary} textAnchor="middle">
                Compile time: only knows net_price is virtual; Runtime: resolves via vtable
              </text>
              <text x={360} y={308} fontSize="10" fill={secondary} textAnchor="middle">
                This is the complete mechanism of C++ virtual dispatch
              </text>

              <rect x={130} y={326} width={460} height={56} rx={6} fill={bg} stroke={border} strokeWidth={1} />
              <text x={360} y={346} fontSize="11" fontWeight={700} fill={accent} textAnchor="middle">Complete chain (3-hop)</text>
              <text x={360} y={366} fontSize="10" fill={primary} textAnchor="middle" fontFamily="monospace">
                object → vptr → vtable[slot] → &function → invoke
              </text>
            </>
          )}

          <defs>
            <marker id="vtArrow" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
              <path d="M0,1 L5,3 L0,5" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && "Each object with virtual functions has a <strong>vptr</strong> (virtual pointer) at its start. Base and derived objects have different vptrs pointing to different vtables."}
        {step === 2 && "The <strong>vtable</strong> is a function pointer array. Each virtual function occupies a fixed slot. Derived classes replace slot entries with their own versions."}
        {step === 3 && "When calling through a base pointer/reference: compile-time static type is Base, but runtime <strong>dynamic dispatch</strong> follows vptr → vtable → function address to the correct version."}
      </figcaption>
    </figure>
  );
}
