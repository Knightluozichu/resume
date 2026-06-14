/**
 * <SmartPointerOverviewDiagram>：shared_ptr / unique_ptr / weak_ptr 三栏并排对比（所有权模型+内存布局+典型场景）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--xxx)），无阴影。
 */
export function SmartPointerOverviewDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";
  const danger = "rgb(229,103,92)";

  const w = 840;
  const h = 520;
  const colW = 256;
  const colGap = 20;
  const cols = [20, 20 + colW + colGap, 20 + 2 * (colW + colGap)];
  const cardInnerW = colW - 20;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="三种智能指针并排对比：shared_ptr（共享所有权+引用计数）、unique_ptr（独占所有权+不可拷贝）、weak_ptr（弱引用+破除循环引用）"
          className="mx-auto block h-auto w-full max-w-[840px]"
        >
          <text x={w / 2} y={22} fontSize={15} fontWeight={700} fill={primary} textAnchor="middle">
            C++ 智能指针三兄弟
          </text>

          {/* ====== Column 1: shared_ptr ====== */}
          <g transform={`translate(${cols[0]}, 36)`}>
            <rect x={0} y={0} width={colW} height={456} rx={10} fill={bg} stroke={border} />
            <text x={colW / 2} y={26} fontSize={14} fontWeight={700} fill={accent} textAnchor="middle">
              shared_ptr
            </text>
            <text x={colW / 2} y={46} fontSize={11} fill={secondary} textAnchor="middle">
              共享所有权
            </text>

            {/* 内存布局 */}
            <g transform="translate(12, 64)">
              <rect x={0} y={0} width={cardInnerW} height={38} rx={6} fill={elevated} stroke={border} />
              <text x={cardInnerW / 2} y={16} fontSize={10} fill={primary} textAnchor="middle" fontFamily="monospace">
                shared_ptr
              </text>
              <text x={cardInnerW / 2} y={30} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">
                ptr → | ctrl →
              </text>

              <line x1={cardInnerW / 2} y1={38} x2={cardInnerW / 2 - 50} y2={68} stroke={accent} strokeWidth={1.5} markerEnd="url(#spArrowA)" />
              <line x1={cardInnerW / 2} y1={38} x2={cardInnerW / 2 + 50} y2={68} stroke={accent} strokeWidth={1.5} markerEnd="url(#spArrowA)" />

              <rect x={cardInnerW / 2 - 72} y={70} width={72} height={44} rx={6} fill={good} opacity={0.12} stroke={good} />
              <text x={cardInnerW / 2 - 36} y={94} fontSize={10} fill={good} textAnchor="middle">堆对象</text>
              <text x={cardInnerW / 2 - 36} y={108} fontSize={9} fill={good} textAnchor="middle" fontFamily="monospace">T object</text>

              <rect x={cardInnerW / 2 + 8} y={70} width={72} height={44} rx={6} fill={accent} opacity={0.12} stroke={accent} />
              <text x={cardInnerW / 2 + 44} y={86} fontSize={10} fill={accent} textAnchor="middle">控制块</text>
              <text x={cardInnerW / 2 + 44} y={100} fontSize={9} fill={accent} textAnchor="middle" fontFamily="monospace">use: 1</text>
              <text x={cardInnerW / 2 + 44} y={112} fontSize={9} fill={accent} textAnchor="middle" fontFamily="monospace">weak: 0</text>

              <g transform="translate(0, 128)">
                <rect x={cardInnerW / 2 - 72} y={0} width={36} height={28} rx={5} fill={elevated} stroke={border} />
                <text x={cardInnerW / 2 - 54} y={18} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">sp₁</text>
                <rect x={cardInnerW / 2 - 28} y={0} width={36} height={28} rx={5} fill={elevated} stroke={border} />
                <text x={cardInnerW / 2 - 10} y={18} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">sp₂</text>
                <line x1={cardInnerW / 2 - 54} y1={28} x2={cardInnerW / 2 - 54} y2={46} stroke={accent} strokeWidth={1} />
                <line x1={cardInnerW / 2 - 10} y1={28} x2={cardInnerW / 2 - 10} y2={46} stroke={accent} strokeWidth={1} />
                <rect x={cardInnerW / 2 - 72} y={48} width={cardInnerW} height={20} rx={5} fill={good} opacity={0.1} stroke={good} />
                <text x={cardInnerW / 2} y={62} fontSize={9} fill={good} textAnchor="middle">
                  两个 shared_ptr 指向同一堆对象 → 共享
                </text>
              </g>
            </g>

            <g transform="translate(12, 306)">
              {[
                ["所有权", "共享（多个shared_ptr同指一个对象）"],
                ["引用计数", "use_count() 记录共享者数量"],
                ["拷贝语义", "允许拷贝（计数器+1）"],
                ["销毁时机", "最后一个 shared_ptr 销毁→delete"],
                ["适用场景", "不确定唯一所有者时"],
              ].map(([label, desc], i) => (
                <g key={i} transform={`translate(0, ${i * 22})`}>
                  <text x={0} y={12} fontSize={10} fontWeight={600} fill={primary}>{label}</text>
                  <text x={64} y={12} fontSize={9} fill={secondary}>{desc}</text>
                </g>
              ))}
            </g>
          </g>

          {/* ====== Column 2: unique_ptr ====== */}
          <g transform={`translate(${cols[1]}, 36)`}>
            <rect x={0} y={0} width={colW} height={456} rx={10} fill={bg} stroke={border} />
            <text x={colW / 2} y={26} fontSize={14} fontWeight={700} fill={warn} textAnchor="middle">
              unique_ptr
            </text>
            <text x={colW / 2} y={46} fontSize={11} fill={secondary} textAnchor="middle">
              独占所有权
            </text>

            <g transform="translate(12, 64)">
              <rect x={0} y={0} width={cardInnerW} height={30} rx={6} fill={elevated} stroke={border} />
              <text x={cardInnerW / 2} y={18} fontSize={10} fill={primary} textAnchor="middle" fontFamily="monospace">unique_ptr →</text>

              <line x1={cardInnerW / 2} y1={30} x2={cardInnerW / 2} y2={56} stroke={warn} strokeWidth={1.5} markerEnd="url(#spArrowW)" />

              <rect x={cardInnerW / 2 - 52} y={58} width={104} height={40} rx={6} fill={warn} opacity={0.12} stroke={warn} />
              <text x={cardInnerW / 2} y={76} fontSize={10} fill={warn} textAnchor="middle">堆对象</text>
              <text x={cardInnerW / 2} y={90} fontSize={9} fill={warn} textAnchor="middle" fontFamily="monospace">T object</text>

              <g transform="translate(0, 112)">
                <text x={cardInnerW / 2} y={12} fontSize={10} fontWeight={600} fill={danger} textAnchor="middle">
                  ✕ 禁止拷贝
                </text>
                <rect x={cardInnerW / 2 - 52} y={20} width={48} height={28} rx={5} fill={elevated} stroke={border} />
                <text x={cardInnerW / 2 - 28} y={38} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">up₁</text>
                <rect x={cardInnerW / 2 + 4} y={20} width={48} height={28} rx={5} fill={elevated} stroke={danger} strokeDasharray="4 3" />
                <text x={cardInnerW / 2 + 28} y={38} fontSize={9} fill={danger} textAnchor="middle" fontFamily="monospace">up₂?</text>
                <line x1={cardInnerW / 2 - 2} y1={34} x2={cardInnerW / 2 + 2} y2={34} stroke={danger} strokeWidth={2} />
              </g>

              <g transform="translate(0, 172)">
                <text x={cardInnerW / 2} y={12} fontSize={10} fontWeight={600} fill={good} textAnchor="middle">
                  ✓ 可以移动
                </text>
                <rect x={cardInnerW / 2 - 52} y={20} width={48} height={28} rx={5} fill={elevated} stroke={border} />
                <text x={cardInnerW / 2 - 28} y={38} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">up₁</text>
                <rect x={cardInnerW / 2 + 4} y={20} width={48} height={28} rx={5} fill={elevated} stroke={good} />
                <text x={cardInnerW / 2 + 28} y={38} fontSize={9} fill={good} textAnchor="middle" fontFamily="monospace">up₂</text>
                <line x1={cardInnerW / 2 - 2} y1={34} x2={cardInnerW / 2} y2={34} stroke={good} strokeWidth={1.5} markerEnd="url(#spArrowG)" />
                <text x={cardInnerW / 2} y={56} fontSize={9} fill={secondary} textAnchor="middle">std::move 转移所有权</text>
              </g>
            </g>

            <g transform="translate(12, 306)">
              {[
                ["所有权", "独占（同一时刻只有一个unique_ptr拥有）"],
                ["引用计数", "无（不需要计数，开销更低）"],
                ["拷贝语义", "禁止拷贝（已删除拷贝构造/赋值）"],
                ["销毁时机", "unique_ptr 离开作用域→delete"],
                ["适用场景", "明确唯一所有者、工厂函数返回"],
              ].map(([label, desc], i) => (
                <g key={i} transform={`translate(0, ${i * 22})`}>
                  <text x={0} y={12} fontSize={10} fontWeight={600} fill={primary}>{label}</text>
                  <text x={64} y={12} fontSize={9} fill={secondary}>{desc}</text>
                </g>
              ))}
            </g>
          </g>

          {/* ====== Column 3: weak_ptr ====== */}
          <g transform={`translate(${cols[2]}, 36)`}>
            <rect x={0} y={0} width={colW} height={456} rx={10} fill={bg} stroke={border} />
            <text x={colW / 2} y={26} fontSize={14} fontWeight={700} fill={good} textAnchor="middle">
              weak_ptr
            </text>
            <text x={colW / 2} y={46} fontSize={11} fill={secondary} textAnchor="middle">
              弱引用 / 旁观者
            </text>

            <g transform="translate(12, 64)">
              <rect x={0} y={0} width={cardInnerW} height={30} rx={6} fill={elevated} stroke={border} />
              <text x={cardInnerW / 2} y={18} fontSize={10} fill={primary} textAnchor="middle" fontFamily="monospace">weak_ptr ↷</text>

              <line x1={cardInnerW / 2} y1={30} x2={cardInnerW / 2 + 50} y2={56} stroke={good} strokeWidth={1.5} strokeDasharray="5 3" markerEnd="url(#spArrowG)" />

              <rect x={0} y={58} width={cardInnerW - 70} height={24} rx={5} fill={elevated} stroke={border} />
              <text x={(cardInnerW - 70) / 2} y={74} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">sp</text>
              <line x1={(cardInnerW - 70) / 2} y1={82} x2={cardInnerW / 2 - 36} y2={100} stroke={accent} strokeWidth={1} />

              <rect x={cardInnerW / 2 + 8} y={58} width={80} height={44} rx={6} fill={accent} opacity={0.12} stroke={accent} />
              <text x={cardInnerW / 2 + 48} y={74} fontSize={9} fill={accent} textAnchor="middle" fontFamily="monospace">use: 1</text>
              <text x={cardInnerW / 2 + 48} y={88} fontSize={9} fill={good} textAnchor="middle" fontFamily="monospace">weak: 1</text>
              <text x={cardInnerW / 2 + 48} y={100} fontSize={8} fill={secondary} textAnchor="middle">← wp 增的是它</text>

              <line x1={cardInnerW / 2 + 8} y1={102} x2={cardInnerW / 2 - 36} y2={102} stroke={good} strokeWidth={1} strokeDasharray="4 3" />
              <rect x={cardInnerW / 2 - 52} y={108} width={104} height={32} rx={6} fill={elevated} opacity={0.5} stroke={good} strokeDasharray="4 3" />
              <text x={cardInnerW / 2} y={128} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">堆对象（可能已释放）</text>

              <g transform="translate(0, 156)">
                <text x={cardInnerW / 2} y={12} fontSize={10} fontWeight={600} fill={good} textAnchor="middle">
                  核心作用：破除循环引用
                </text>
                <text x={cardInnerW / 2} y={28} fontSize={9} fill={secondary} textAnchor="middle">
                  A.sp→B  B.sp→A → 谁都不释放
                </text>
                <text x={cardInnerW / 2} y={42} fontSize={9} fill={good} textAnchor="middle">
                  A.sp→B  B.wp→A → 正常释放
                </text>
              </g>
            </g>

            <g transform="translate(12, 306)">
              {[
                ["所有权", "不拥有（weak_ptr 不影响生命周期）"],
                ["引用计数", "增加 weak_count()（非 use_count）"],
                ["拷贝语义", "允许拷贝（旁观者可以多份）"],
                ["销毁时机", "不影响堆对象存活（只影响控制块）"],
                ["适用场景", "观察者、缓存、破除循环引用"],
              ].map(([label, desc], i) => (
                <g key={i} transform={`translate(0, ${i * 22})`}>
                  <text x={0} y={12} fontSize={10} fontWeight={600} fill={primary}>{label}</text>
                  <text x={64} y={12} fontSize={9} fill={secondary}>{desc}</text>
                </g>
              ))}
            </g>
          </g>

          <text x={w / 2} y={h - 10} fontSize={10} fill={secondary} textAnchor="middle">
            shared_ptr→共享借用 | unique_ptr→独占传递 | weak_ptr→旁观避循环 —— 选对指针，告别手动 delete 和内存泄漏
          </text>

          <defs>
            <marker id="spArrowA" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
              <path d="M0,1 L6,3.5 L0,6" fill={accent} />
            </marker>
            <marker id="spArrowW" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
              <path d="M0,1 L6,3.5 L0,6" fill={warn} />
            </marker>
            <marker id="spArrowG" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
              <path d="M0,1 L6,3.5 L0,6" fill={good} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong>shared_ptr</strong>：多个指针共享一个堆对象，引用计数为零时自动释放；<strong>unique_ptr</strong>：独享堆对象，禁止拷贝只能移动；<strong>weak_ptr</strong>：不增加引用计数的弱引用，专治循环引用造成的内存泄漏。
      </figcaption>
    </figure>
  );
}
