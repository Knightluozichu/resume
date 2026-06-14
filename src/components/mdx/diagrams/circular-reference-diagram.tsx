/**
 * <CircularReferenceDiagram>：shared_ptr 循环引用问题 vs weak_ptr 解法，并排对比。
 *
 * 左侧：A.shared_ptr→B + B.shared_ptr→A → 互相持有 → 内存泄漏
 * 右侧：A.shared_ptr→B + B.weak_ptr→A → 不增加引用计数 → 正常析构
 *
 * Server Component（纯展示，静态 SVG）。
 */
export function CircularReferenceDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";
  const danger = "rgb(229,103,92)";

  const w = 760;
  const h = 440;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="shared_ptr 循环引用问题：左图两个 shared_ptr 互相引用导致内存泄漏，右图将一个改为 weak_ptr 解决循环引用"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x={w / 2} y={22} fontSize={15} fontWeight={700} fill={primary} textAnchor="middle">
            循环引用：shared_ptr 的死锁 vs weak_ptr 的解法
          </text>

          {/* ====== 左侧：循环引用问题 ====== */}
          <g transform="translate(14, 34)">
            <rect x={0} y={0} width={358} height={376} rx={10} fill={bg} stroke={border} />
            <text x={179} y={24} fontSize={13} fontWeight={700} fill={danger} textAnchor="middle">
              ✕ shared_ptr 循环引用 = 内存泄漏
            </text>
            <text x={179} y={44} fontSize={10} fill={secondary} textAnchor="middle">
              离开作用域后 spA/spB 的引用计数各剩 1 → 都不释放
            </text>

            <rect x={79} y={62} width={200} height={32} rx={5} fill={elevated} stroke={border} />
            <text x={179} y={82} fontSize={10} fill={primary} textAnchor="middle" fontFamily="monospace">
              spA → A | spB → B
            </text>

            <line x1={110} y1={94} x2={80} y2={130} stroke={danger} strokeWidth={1.5} markerEnd="url(#crRedArr)" />
            <line x1={248} y1={94} x2={278} y2={130} stroke={danger} strokeWidth={1.5} markerEnd="url(#crRedArr)" />

            <rect x={40} y={132} width={110} height={50} rx={8} fill={danger} opacity={0.08} stroke={danger} strokeWidth={1.5} />
            <text x={95} y={152} fontSize={11} fontWeight={600} fill={danger} textAnchor="middle">对象 A</text>
            <text x={95} y={168} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">shared_ptr&lt;B&gt;</text>

            <rect x={208} y={132} width={110} height={50} rx={8} fill={danger} opacity={0.08} stroke={danger} strokeWidth={1.5} />
            <text x={263} y={152} fontSize={11} fontWeight={600} fill={danger} textAnchor="middle">对象 B</text>
            <text x={263} y={168} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">shared_ptr&lt;A&gt;</text>

            <path d="M 100 182 C 100 240, 145 240, 155 210" fill="none" stroke={danger} strokeWidth={2} markerEnd="url(#crRedArr)" />
            <path d="M 258 182 C 258 240, 213 240, 203 210" fill="none" stroke={danger} strokeWidth={2} markerEnd="url(#crRedArr)" />

            <rect x={40} y={258} width={278} height={36} rx={6} fill={danger} opacity={0.08} stroke={danger} strokeWidth={1} strokeDasharray="4 3" />
            <text x={179} y={272} fontSize={10} fontWeight={600} fill={danger} textAnchor="middle">
              spA/spB 离开作用域后引用计数 = 1（互相持有）
            </text>
            <text x={179} y={286} fontSize={10} fill={danger} textAnchor="middle">
              → A 和 B 永远留在堆上 → 内存泄漏
            </text>

            <text x={179} y={320} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">
              spA→ptr_B; spB→ptr_A; // 循环
            </text>
            <text x={179} y={336} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">
              // 离开 scope → 两个都活着
            </text>
          </g>

          {/* ====== 右侧：weak_ptr 解法 ====== */}
          <g transform="translate(386, 34)">
            <rect x={0} y={0} width={358} height={376} rx={10} fill={bg} stroke={border} />
            <text x={179} y={24} fontSize={13} fontWeight={700} fill={good} textAnchor="middle">
              ✓ weak_ptr 破除循环 = 正常释放
            </text>
            <text x={179} y={44} fontSize={10} fill={secondary} textAnchor="middle">
              B 持有 A 的 weak_ptr → 不增加引用计数 → 正常析构
            </text>

            <rect x={79} y={62} width={200} height={32} rx={5} fill={elevated} stroke={border} />
            <text x={179} y={82} fontSize={10} fill={primary} textAnchor="middle" fontFamily="monospace">
              spA → A | spB → B
            </text>

            <line x1={110} y1={94} x2={80} y2={130} stroke={good} strokeWidth={1.5} markerEnd="url(#crGreenArr)" />
            <line x1={248} y1={94} x2={278} y2={130} stroke={good} strokeWidth={1.5} markerEnd="url(#crGreenArr)" />

            <rect x={40} y={132} width={110} height={50} rx={8} fill={good} opacity={0.08} stroke={good} strokeWidth={1.5} />
            <text x={95} y={152} fontSize={11} fontWeight={600} fill={good} textAnchor="middle">对象 A</text>
            <text x={95} y={168} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">shared_ptr&lt;B&gt;</text>

            <rect x={208} y={132} width={110} height={50} rx={8} fill={good} opacity={0.08} stroke={good} strokeWidth={1.5} />
            <text x={263} y={152} fontSize={11} fontWeight={600} fill={good} textAnchor="middle">对象 B</text>
            <text x={263} y={168} fontSize={9} fill={accent} textAnchor="middle" fontFamily="monospace">weak_ptr&lt;A&gt;</text>

            <path d="M 258 182 C 258 240, 213 240, 203 210" fill="none" stroke={accent} strokeWidth={2} strokeDasharray="5 3" markerEnd="url(#crPurpleArr)" />
            <path d="M 100 182 C 100 240, 145 240, 155 210" fill="none" stroke={good} strokeWidth={2} markerEnd="url(#crGreenArr)" />

            <rect x={40} y={258} width={278} height={36} rx={6} fill={good} opacity={0.08} stroke={good} strokeWidth={1} />
            <text x={179} y={272} fontSize={10} fontWeight={600} fill={good} textAnchor="middle">
              spA/spB 离开作用域后→ A 的引用计数 = 1（只有 spA）
            </text>
            <text x={179} y={286} fontSize={10} fill={good} textAnchor="middle">
              → 先析构 A（spA 释放）→ B 的计数变 0 → 再析构 B
            </text>

            <text x={179} y={320} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">
              spA→ptr_B; spB→weak_ptr&lt;A&gt;;
            </text>
            <text x={179} y={336} fontSize={9} fill={good} textAnchor="middle" fontFamily="monospace">
              // 离开 scope → 正常释放 ✓
            </text>
          </g>

          <text x={w / 2} y={h - 10} fontSize={10} fill={secondary} textAnchor="middle">
            口诀：A 持有 B 用 shared，B 回看 A 用 weak —— 单向 shared + 反向 weak 是安全公式
          </text>

          <defs>
            <marker id="crRedArr" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
              <path d="M0,1 L5,3 L0,5" fill={danger} />
            </marker>
            <marker id="crGreenArr" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
              <path d="M0,1 L5,3 L0,5" fill={good} />
            </marker>
            <marker id="crPurpleArr" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
              <path d="M0,1 L5,3 L0,5" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong>左侧（循环引用）</strong>：A 和 B 各持对方的 shared_ptr，离开作用域后引用计数各剩 1，谁都不释放 → <strong>内存泄漏</strong>。<strong>右侧（weak_ptr 解法）</strong>：B 改用 weak_ptr 观察 A，不增加 A 的引用计数 → 正常析构顺序释放。
      </figcaption>
    </figure>
  );
}
