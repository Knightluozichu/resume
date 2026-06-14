/**
 * <MoveSemanticsDiagram>：对象移动前后的指针所有权转移图。
 *
 * 展示 std::move 或移动构造前后，堆资源的指针所有权如何从源对象转移到目标对象。
 * 支持 step prop（1-3）：1=移动前、2=移动中（转移）、3=移动后。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */

interface MoveSemanticsDiagramProps {
  step?: number;
}

export function MoveSemanticsDiagram({ step = 0 }: MoveSemanticsDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";

  const w = 680;
  const h = 380;

  const showAll = step <= 0 || step > 3;
  const show1 = showAll || step === 1;
  const show2 = showAll || step === 2;
  const show3 = showAll || step === 3;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="移动语义示意图：展示堆资源所有权从源对象转移到目标对象的三个步骤"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          <text x={w / 2} y={22} fontSize={15} fontWeight={700} fill={primary} textAnchor="middle">
            移动语义：资源所有权的转移
          </text>
          {showAll && (
            <text x={w / 2} y={40} fontSize={10} fill={secondary} textAnchor="middle">
              移动构造 / std::move 不拷贝数据，只转移堆资源的指针所有权
            </text>
          )}

          {/* ====== Step 1: 移动前 ====== */}
          <g opacity={show1 ? 1 : 0.2}>
            <rect x={20} y={55} width={300} height={80} rx={8} fill={elevated} stroke={border} strokeWidth={1.5} />
            <text x={170} y={78} fontSize={12} fontWeight={700} fill={primary} textAnchor="middle">
              源对象（source）
            </text>
            <text x={170} y={100} fontSize={10} fill={secondary} textAnchor="middle" fontFamily="monospace">
              ptr = 0x1000 | size = 100
            </text>
            <text x={170} y={120} fontSize={9} fill={secondary} textAnchor="middle">
              持有堆资源的所有权——正常使用中
            </text>

            {/* 堆数据 */}
            <rect x={20} y={150} width={300} height={60} rx={6} fill={accent} opacity={0.08} stroke={accent} strokeWidth={1.5} />
            <text x={170} y={172} fontSize={11} fontWeight={600} fill={accent} textAnchor="middle">
              堆资源 @ 0x1000
            </text>
            <text x={170} y={192} fontSize={10} fill={secondary} textAnchor="middle" fontFamily="monospace">
              [100 个 int 的数据...]
            </text>

            {/* 指针连线 */}
            <line x1={170} y1={135} x2={170} y2={147} stroke={accent} strokeWidth={2} markerEnd="url(#msAccentArr)" />

            {/* 目标对象 */}
            <rect x={360} y={55} width={300} height={80} rx={8} fill={bg} stroke={border} strokeWidth={1.5} strokeDasharray="4 3" />
            <text x={510} y={78} fontSize={12} fontWeight={700} fill={secondary} textAnchor="middle">
              目标对象（destination）
            </text>
            <text x={510} y={100} fontSize={10} fill={secondary} textAnchor="middle" fontFamily="monospace">
              ptr = nullptr
            </text>
            <text x={510} y={120} fontSize={9} fill={secondary} textAnchor="middle">
              尚未被构造/赋值——等待接管资源
            </text>
          </g>

          {/* ====== Step 2: 移动中 ====== */}
          <g opacity={show2 ? 1 : 0.2}>
            <rect x={100} y={225} width={480} height={40} rx={6} fill={warn} opacity={0.1} stroke={warn} strokeWidth={1} />
            <text x={340} y={242} fontSize={11} fontWeight={600} fill={warn} textAnchor="middle" fontFamily="monospace">
              target.ptr = source.ptr; source.ptr = nullptr;
            </text>
            <text x={340} y={258} fontSize={9} fill={warn} textAnchor="middle">
              ← 两步原子操作：先接管指针，再把源指针置空
            </text>
          </g>

          {/* ====== Step 3: 移动后 ====== */}
          <g opacity={show3 ? 1 : 0.2}>
            <rect x={20} y={280} width={300} height={80} rx={8} fill={bg} stroke={border} strokeWidth={1.5} strokeDasharray="4 3" />
            <text x={170} y={303} fontSize={12} fontWeight={700} fill={secondary} textAnchor="middle">
              源对象（source）
            </text>
            <text x={170} y={325} fontSize={10} fill={warn} textAnchor="middle" fontFamily="monospace">
              ptr = nullptr
            </text>
            <text x={170} y={345} fontSize={9} fill={secondary} textAnchor="middle">
              不再持有资源 · 处于"有效但未指定"状态
            </text>

            {/* 目标对象持有堆数据 */}
            <rect x={360} y={280} width={300} height={80} rx={8} fill={elevated} stroke={good} strokeWidth={1.5} />
            <text x={510} y={303} fontSize={12} fontWeight={700} fill={good} textAnchor="middle">
              目标对象（destination）
            </text>
            <text x={510} y={325} fontSize={10} fill={primary} textAnchor="middle" fontFamily="monospace">
              ptr = 0x1000 | size = 100
            </text>
            <text x={510} y={345} fontSize={9} fill={good} textAnchor="middle">
              接管了堆资源的所有权 ✓ — 负责释放
            </text>

            {/* 新的指针连线 */}
            <line x1={510} y1={280} x2={510} y2={217} stroke={good} strokeWidth={2} markerEnd="url(#msGoodArr)" />
          </g>

          <defs>
            <marker id="msAccentArr" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
              <path d="M0,1 L5,3 L0,5" fill={accent} />
            </marker>
            <marker id="msGoodArr" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
              <path d="M0,1 L5,3 L0,5" fill={good} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong>Step 1</strong>：源持有资源，目标为空。<strong>Step 2</strong>：执行 ptr 转移 + 源指针置空（O(1) 常数时间，无内存分配）。<strong>Step 3</strong>：目标接管资源负责释放，源处于「有效但未指定」状态（可安全析构或重新赋值）。
      </figcaption>
    </figure>
  );
}
