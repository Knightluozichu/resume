/**
 * <SharedPtrInternalsDiagram step={1|2|3|4}>：「动态内存」§3 SharedPtr 内部结构 <Stepper> 四步配图（C 实战型）。
 *
 * 同一套「控制块+引用计数+堆对象」内存布局，按 step 演示 shared_ptr 生命周期：
 *  ①创建：make_shared<T> 一次分配，引用计数=1
 *  ②拷贝：sp2 = sp1，引用计数+1
 *  ③重置：sp1.reset()，引用计数-1
 *  ④析构：最后一个 shared_ptr 离开作用域，use_count→0
 *
 * Server Component（纯展示，静态 SVG）。
 */

type SharedPtrStep = 1 | 2 | 3 | 4;

const ARIA: Record<SharedPtrStep, string> = {
  1: "shared_ptr 生命周期第一步，创建。make_shared 一次分配控制块和堆对象，引用计数初始值为 1。",
  2: "shared_ptr 生命周期第二步，拷贝。sp2 = sp1 后引用计数加 1，两个 shared_ptr 共享同一控制块和堆对象。",
  3: "shared_ptr 生命周期第三步，重置。sp1.reset() 后引用计数减 1 变为 1，只剩 sp2 仍指向堆对象。",
  4: "shared_ptr 生命周期第四步，析构。最后一个 shared_ptr 离开作用域，use_count 归零，自动析构堆对象并释放控制块。",
};

export function SharedPtrInternalsDiagram({ step }: { step: SharedPtrStep }) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const elevated = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";
  const danger = "rgb(229,103,92)";

  const w = 660;
  const h = 320;
  const cx = w / 2;
  const stackY = 180;
  const heapY = 250;

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label={ARIA[step]}
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          <text x={cx} y={24} fontSize={14} fontWeight={600} fill={primary} textAnchor="middle">
            shared_ptr 内存布局与生命周期
          </text>

          {/* 栈 | 堆 分隔线 */}
          <line x1={30} y1={155} x2={w - 30} y2={155} stroke={border} strokeWidth={1} strokeDasharray="8 4" />
          <text x={50} y={170} fontSize={10} fill={secondary}>栈（Stack）</text>
          <text x={50} y={290} fontSize={10} fill={secondary}>堆（Heap）</text>

          {/* ===== 控制块 + 堆对象 ===== */}
          <rect x={cx - 56} y={heapY - 28} width={112} height={36} rx={6}
            fill={accent} opacity={0.12} stroke={accent} strokeWidth={1.5} />
          <text x={cx} y={heapY - 9} fontSize={10} fill={accent} textAnchor="middle" fontFamily="monospace">
            use: {step === 4 ? "0" : step === 3 ? "1" : step === 2 ? "2" : "1"}
          </text>
          <text x={cx} y={heapY + 3} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">
            weak: 0
          </text>
          <text x={cx + 90} y={heapY - 12} fontSize={9} fill={accent} fontFamily="monospace">← 控制块</text>

          {/* 被管理的堆对象 */}
          <rect x={cx - 70} y={heapY + 18} width={140} height={30} rx={6}
            fill={step === 4 ? "none" : good} opacity={step === 4 ? 1 : 0.15}
            stroke={step === 4 ? danger : good}
            strokeWidth={1.5}
            strokeDasharray={step === 4 ? "5 3" : "none"} />
          <text x={cx} y={heapY + 37} fontSize={10} fill={step === 4 ? danger : good} textAnchor="middle" fontFamily="monospace">
            {step === 4 ? "T object (已释放)" : "T object"}
          </text>

          {/* ===== sp1 ===== */}
          <rect x={cx - 150} y={stackY - 14} width={110} height={28} rx={6}
            fill={elevated}
            stroke={step === 4 ? border : (step === 3 ? danger : accent)}
            strokeWidth={(step >= 1 && step <= 3) ? 1.5 : 1}
            strokeDasharray={step === 3 ? "4 3" : "none"} />
          <text x={cx - 95} y={stackY + 4} fontSize={10}
            fill={step === 3 ? danger : (step === 4 ? secondary : primary)}
            textAnchor="middle" fontFamily="monospace">
            {step === 3 ? "sp₁ (null)" : step === 4 ? "sp₁ (gone)" : "sp₁"}
          </text>
          {step <= 2 && (
            <line x1={cx - 95} y1={stackY + 14} x2={cx - 10} y2={heapY - 28}
              stroke={accent} strokeWidth={1.2} markerEnd="url(#siArrowA)" />
          )}
          {step === 3 && (
            <line x1={cx - 95} y1={stackY + 14} x2={cx - 95} y2={stackY + 30}
              stroke={danger} strokeWidth={1} strokeDasharray="4 3" />
          )}

          {/* ===== sp2 ===== */}
          {step >= 2 && (
            <g opacity={step === 4 ? 0.3 : 1}>
              <rect x={cx + 40} y={stackY - 14} width={110} height={28} rx={6}
                fill={elevated}
                stroke={step >= 2 ? (step === 4 ? border : accent) : border}
                strokeWidth={step >= 2 ? 1.5 : 1} />
              <text x={cx + 95} y={stackY + 4} fontSize={10}
                fill={step === 4 ? secondary : primary}
                textAnchor="middle" fontFamily="monospace">sp₂</text>
              {step >= 2 && (
                <line x1={cx + 95} y1={stackY + 14} x2={cx + 10} y2={heapY - 28}
                  stroke={accent} strokeWidth={1.2} markerEnd="url(#siArrowA)" />
              )}
            </g>
          )}

          {/* ===== 步骤标注 ===== */}
          {step === 1 && (
            <g>
              <text x={cx - 95} y={stackY + 52} fontSize={9} fill={good} textAnchor="middle" fontFamily="monospace">
                make_shared&lt;T&gt;(args)
              </text>
              <text x={cx} y={heapY - 44} fontSize={9} fill={accent} textAnchor="middle">
                一次分配控制块+对象 (use_count=1)
              </text>
            </g>
          )}
          {step === 2 && (
            <g>
              <line x1={cx - 40} y1={stackY} x2={cx + 38} y2={stackY} stroke={accent} strokeWidth={1.5} markerEnd="url(#siArrowA2)" />
              <text x={cx} y={stackY - 22} fontSize={9} fill={accent} textAnchor="middle" fontFamily="monospace">
                sp₂ = sp₁ (拷贝)
              </text>
              <text x={cx} y={heapY - 44} fontSize={9} fill={accent} textAnchor="middle">
                use_count 增至 2 → 同指一对象
              </text>
            </g>
          )}
          {step === 3 && (
            <g>
              <text x={cx - 95} y={stackY + 36} fontSize={9} fill={danger} textAnchor="middle" fontFamily="monospace">
                sp₁.reset()
              </text>
              <text x={cx} y={heapY - 44} fontSize={9} fill={accent} textAnchor="middle">
                use_count 减至 1 → 只剩 sp₂ 持有
              </text>
            </g>
          )}
          {step === 4 && (
            <g>
              <text x={cx + 95} y={stackY + 52} fontSize={9} fill={danger} textAnchor="middle" fontFamily="monospace">
                sp₂ 离开作用域
              </text>
              <text x={cx} y={heapY - 44} fontSize={9} fill={danger} textAnchor="middle">
                use_count→0 → 析构对象 + 释放控制块
              </text>
              <rect x={cx - 90} y={heapY - 54} width={180} height={20} rx={10}
                fill={danger} opacity={0.08} stroke={danger} strokeWidth={1} />
            </g>
          )}

          {/* 底部步骤指示器 */}
          <g transform={`translate(0, ${h - 30})`}>
            {[
              { s: 1 as SharedPtrStep, label: "① 创建 make_shared" },
              { s: 2 as SharedPtrStep, label: "② 拷贝 sp₂=sp₁" },
              { s: 3 as SharedPtrStep, label: "③ 重置 sp₁.reset()" },
              { s: 4 as SharedPtrStep, label: "④ 析构 use_count→0" },
            ].map(({ s, label }, i) => (
              <g key={i} transform={`translate(${40 + i * 150}, 0)`}>
                <rect x={0} y={0} width={130} height={20} rx={10}
                  fill={step === s ? accent : "none"}
                  opacity={step === s ? 0.15 : 1}
                  stroke={step === s ? accent : border} strokeWidth={1} />
                <text x={65} y={14} fontSize={9} fontFamily="monospace"
                  fill={step === s ? accent : secondary} textAnchor="middle">
                  {label}
                </text>
              </g>
            ))}
          </g>

          <defs>
            <marker id="siArrowA" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
              <path d="M0,1 L5,3 L0,5" fill={accent} />
            </marker>
            <marker id="siArrowA2" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
              <path d="M0,1 L7,4 L0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && <><strong>① 创建</strong>：<code>make_shared&lt;T&gt;()</code> 一次分配控制块和堆对象在连续内存，引用计数初始为 1。优于先 <code>new T</code> 再传 <code>shared_ptr</code> 的两步分配。</>}
        {step === 2 && <><strong>② 拷贝</strong>：<code>sp₂ = sp₁</code> 后两个 shared_ptr 指向同一控制块，引用计数增至 2。两个指针共享同一堆对象——谁最后离开谁负责析构。</>}
        {step === 3 && <><strong>③ 重置</strong>：<code>sp₁.reset()</code> 将 sp₁ 置空并减少引用计数（从 2 变为 1）。只剩 sp₂ 持有对象，等 sp₂ 离开作用域时析构。</>}
        {step === 4 && <><strong>④ 析构</strong>：最后一个 shared_ptr 离开作用域时 <code>use_count → 0</code>，自动析构堆对象并释放控制块。整个过程无需手动 <code>delete</code>。</>}
      </figcaption>
    </figure>
  );
}
