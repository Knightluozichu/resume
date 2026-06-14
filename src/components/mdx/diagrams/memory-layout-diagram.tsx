/**
 * <MemoryLayoutDiagram step={1|2}>：堆/栈/placement new 三区对比图。
 *
 * Step 1: 普通 new/delete——堆上分配+构造（两步合一）
 * Step 2: placement new——预分配内存上仅构造（分离内存与构造）
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

interface MemoryLayoutDiagramProps {
  step?: 1 | 2;
}

export function MemoryLayoutDiagram({ step = 1 }: MemoryLayoutDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const warn = "rgb(229,181,103)";

  const w = 800;
  const h = 420;
  const cx = w / 2;

  const stackColor = "rgb(99,179,237)";
  const heapColor = "rgb(237,137,99)";
  const poolColor = "rgb(99,237,179)";

  const stackX = 40;
  const heapX = 210;
  const poolX = 380;
  const memW = 140;
  const memH = 80;
  const topY = 90;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="内存布局——堆、栈、placement new 三种内存区域对比"
          className="mx-auto block h-auto w-full max-w-[800px]"
        >
          <text x={cx} y="30" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            内存管理三种方式：普通 new vs placement new
          </text>

          {/* ── Stack ── */}
          <rect x={stackX} y={topY - 24} width={memW} height={24} rx="4" fill={stackColor} fillOpacity="0.12" />
          <text x={stackX + memW / 2} y={topY - 9} fontSize="11" fontWeight="600" fill={stackColor} textAnchor="middle">
            栈 Stack
          </text>
          <rect x={stackX} y={topY} width={memW} height={memH} rx="8" fill="var(--code-bg)" stroke={stackColor} strokeWidth="1.5" />
          <text x={stackX + memW / 2} y={topY + 28} fontSize="11" fill={stackColor} textAnchor="middle">int x = 42;</text>
          <text x={stackX + memW / 2} y={topY + 48} fontSize="9" fill={secondary} textAnchor="middle">自动分配，自动析构</text>
          <text x={stackX + memW / 2} y={topY + 64} fontSize="9" fill={secondary} textAnchor="middle">离开作用域即释放</text>

          {/* ── Heap (普通 new) ── */}
          <rect x={heapX} y={topY - 24} width={memW} height={24} rx="4" fill={heapColor} fillOpacity="0.12" />
          <text x={heapX + memW / 2} y={topY - 9} fontSize="11" fontWeight="600" fill={heapColor} textAnchor="middle">
            堆 Heap（普通 new）
          </text>
          <rect x={heapX} y={topY} width={memW} height={memH} rx="8" fill="var(--code-bg)" stroke={heapColor} strokeWidth={step === 1 ? 2.5 : 1} />
          <text x={heapX + memW / 2} y={topY + 24} fontSize="10" fill={heapColor} textAnchor="middle">auto* p = new T();</text>
          <text x={heapX + memW / 2} y={topY + 40} fontSize="9" fill={step === 1 ? primary : secondary} textAnchor="middle">① operator new——分配内存</text>
          <text x={heapX + memW / 2} y={topY + 54} fontSize="9" fill={step === 1 ? primary : secondary} textAnchor="middle">② 构造函数——初始化对象</text>
          <text x={heapX + memW / 2} y={topY + 70} fontSize="9" fill={step === 1 ? warn : secondary} textAnchor="middle">delete p: 析构 + 释放内存</text>

          {/* ── Pool/Placement new ── */}
          <rect x={poolX} y={topY - 24} width={memW * 2 + 32} height={24} rx="4" fill={poolColor} fillOpacity="0.12" />
          <text x={poolX + (memW * 2 + 32) / 2} y={topY - 9} fontSize="11" fontWeight="600" fill={poolColor} textAnchor="middle">
            预分配内存池 + Placement New
          </text>

          {/* Raw memory block */}
          <rect x={poolX} y={topY} width={memW * 2 + 32} height={memH - 8} rx="8" fill="var(--code-bg)" stroke={border} strokeWidth="1" />
          <text x={poolX + (memW * 2 + 32) / 2} y={topY + 22} fontSize="10" fill={poolColor} textAnchor="middle">void* buf = operator new(N * sizeof(T));</text>
          <text x={poolX + (memW * 2 + 32) / 2} y={topY + 38} fontSize="9" fill={secondary} textAnchor="middle">预分配一大块原始内存（无类型、未初始化）</text>

          {/* Placement new annotation */}
          {step === 2 && (
            <g>
              <rect x={poolX + 12} y={topY + memH + 16} width={memW * 2 + 8} height={34} rx="6" fill={poolColor} fillOpacity="0.1" stroke={poolColor} strokeWidth="2" />
              <text x={poolX + (memW * 2 + 32) / 2} y={topY + memH + 36} fontSize="11" fontWeight="600" fill={poolColor} textAnchor="middle">
                new (buf) T(args);  ← 只构造，不分配！
              </text>
              {/* Arrow */}
              <line x1={poolX + memW + 16} y1={topY + memH - 8} x2={poolX + memW + 16} y2={topY + memH + 16} stroke={poolColor} strokeWidth="1.5" markerEnd="url(#arrowP)" />
            </g>
          )}
        </svg>

        {/* Step indicator bar */}
        <text x={cx} y={h - 72} fontSize="11" fill={accent} textAnchor="middle" fontFamily="monospace">
          {step === 1 && "① 普通 new：operator new 分配内存 + 构造函数初始化 —— 两步合一"}
          {step === 2 && "② 分离关注点：operator new 预分配原始内存 + placement new 在原地构造对象 —— 内存只分配一次"}
        </text>

        {/* Key difference callout */}
        <rect x={40} y={h - 52} width={w - 80} height="36" rx="6" fill={accent} fillOpacity="0.06" stroke={border} />
        <text x={cx} y={h - 32} fontSize="11" fill={primary} textAnchor="middle">
          {step === 1 && "核心差异：普通 new 分配+构造一步完成；delete 析构+释放一步完成。易用但内存频繁分配/释放——开销大。"}
          {step === 2 && "placement new 的核心价值：内存和对象构造分离！析构后内存可复用——内存池、容器优化、嵌入式系统的基石。"}
        </text>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && "第一步：普通 new = 分配内存 + 构造对象（两步合一）"}
        {step === 2 && "第二步：placement new 把分配和构造拆开，预分配大块再用 placement new 逐个构造。注意：placement new 构造的对象必须显式析构而不能 delete。"}
      </figcaption>
    </figure>
  );
}
