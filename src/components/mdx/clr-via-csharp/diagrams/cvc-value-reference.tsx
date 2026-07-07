/**
 * <CvcValueReferenceDiagram>：值类型与引用类型的内存布局对比。
 *
 * 上半：值类型（栈上直接存储）vs 引用类型（堆上存储 + 栈上指针）。
 * 下半：装箱机制的内存变化。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function CvcValueReferenceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="值类型与引用类型对比。上半展示值类型在栈上直接存储、引用类型在堆上存储加栈上指针。下半展示装箱操作将值类型从栈复制到堆。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            值类型 vs 引用类型：内存布局
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            值类型栈上直接存储 · 引用类型堆上存储+栈上指针 · 装箱复制到堆
          </text>

          {/* 左侧：值类型 */}
          <text x={170} y={82} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            值类型（struct / int）
          </text>

          {/* 栈 */}
          <rect x={60} y={92} width={220} height={120} rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={80} y={110} fontSize="11" fontWeight="700" fill={accent}>栈（Stack）</text>

          {/* p1 */}
          <rect x={80} y={120} width={80} height={36} rx="4" fill={elevated} stroke={accent} strokeWidth="1" />
          <text x={120} y={134} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary} fontFamily="monospace">p1</text>
          <text x={120} y={148} textAnchor="middle" fontSize="10" fill={accent} fontFamily="monospace">X=1, Y=2</text>

          {/* p2 */}
          <rect x={175} y={120} width={80} height={36} rx="4" fill={elevated} stroke={accent} strokeWidth="1" />
          <text x={215} y={134} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary} fontFamily="monospace">p2</text>
          <text x={215} y={148} textAnchor="middle" fontSize="10" fill={accent} fontFamily="monospace">X=1, Y=2</text>

          <text x={170} y={176} textAnchor="middle" fontSize="10" fill={secondary}>p2 = p1 → 复制整个值</text>
          <text x={170} y={192} textAnchor="middle" fontSize="10" fill={secondary}>两份独立数据 · 改 p2 不影响 p1</text>

          {/* 右侧：引用类型 */}
          <text x={530} y={82} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            引用类型（class）
          </text>

          {/* 栈 */}
          <rect x={440} y={92} width={120} height={120} rx="8" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={460} y={110} fontSize="11" fontWeight="700" fill={success}>栈</text>

          <rect x={455} y={120} width={90} height={30} rx="4" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={500} y={140} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary} fontFamily="monospace">d1 → 0x100</text>

          <rect x={455} y={158} width={90} height={30} rx="4" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={500} y={178} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary} fontFamily="monospace">d2 → 0x100</text>

          <text x={500} y={200} textAnchor="middle" fontSize="10" fill={secondary}>d2 = d1 → 复制引用</text>

          {/* 堆 */}
          <rect x={585} y={92} width={110} height={80} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={640} y={110} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>GC 堆</text>
          <rect x={600} y={120} width={80} height={40} rx="4" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={640} y={136} textAnchor="middle" fontSize="10" fill={success} fontFamily="monospace">0x100</text>
          <text x={640} y={150} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">Name=&quot;Rex&quot;</text>

          {/* 箭头 d1/d2 → 堆 */}
          <path d="M 545 135 L 595 135" fill="none" stroke={secondary} strokeWidth="1.2" markerEnd="url(#cvc-vr-arrow)" />
          <path d="M 545 173 L 595 150" fill="none" stroke={secondary} strokeWidth="1.2" markerEnd="url(#cvc-vr-arrow)" />

          <text x={530} y={200} textAnchor="middle" fontSize="10" fill={secondary}>两个指针指向同一对象</text>

          {/* 分隔线 */}
          <line x1={32} y1={232} x2={VIEW_W - 32} y2={232} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：装箱机制 */}
          <text x={VIEW_W / 2} y={254} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>
            装箱（Boxing）：值类型 → 引用类型
          </text>

          {/* 装箱前：int 在栈上 */}
          <rect x={50} y={270} width={140} height={56} rx="6" fill={elevated} stroke={accent} strokeWidth="1.2" />
          <text x={120} y={288} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>装箱前</text>
          <text x={120} y={304} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">int x = 42</text>
          <text x={120} y={320} textAnchor="middle" fontSize="10" fill={accent}>栈上 · 4 字节</text>

          {/* 箭头 */}
          <line x1={190} y1={298} x2={270} y2={298} stroke={warning} strokeWidth="1.4" markerEnd="url(#cvc-vr-warn)" />
          <text x={230} y={290} textAnchor="middle" fontSize="10" fill={warning}>list.Add(x)</text>
          <text x={230} y={312} textAnchor="middle" fontSize="10" fill={warning}>object 参数</text>

          {/* 装箱后：object 在堆上 */}
          <rect x={270} y={270} width={180} height={56} rx="6" fill={elevated} stroke={warning} strokeWidth="1.2" />
          <text x={360} y={288} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>装箱后</text>
          <text x={360} y={304} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">object boxed = 42</text>
          <text x={360} y={320} textAnchor="middle" fontSize="10" fill={warning}>堆上 · 类型指针+值 · GC 管理</text>

          {/* 代价说明 */}
          <rect x={470} y={270} width={210} height={56} rx="6" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeDasharray="4 3" />
          <text x={575} y={288} textAnchor="middle" fontSize="11" fontWeight="700" fill={danger}>性能代价</text>
          <text x={575} y={304} textAnchor="middle" fontSize="10" fill={secondary}>堆分配 + 数据复制</text>
          <text x={575} y={320} textAnchor="middle" fontSize="10" fill={secondary}>增加 GC 压力 · 循环中致命</text>

          {/* 泛型对比 */}
          <line x1={32} y1={348} x2={VIEW_W - 32} y2={348} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={370} textAnchor="middle" fontSize="12" fontWeight="600" fill={success}>
            泛型 List&lt;int&gt; 消除装箱：int 直接存在数组中，零堆分配
          </text>
          <text x={VIEW_W / 2} y={390} textAnchor="middle" fontSize="11" fill={secondary}>
            ArrayList.Add(int) → 每次装箱 · List&lt;int&gt;.Add(int) → 无装箱 · 泛型是性能优化不仅是类型安全
          </text>

          <defs>
            <marker id="cvc-vr-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker id="cvc-vr-warn" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={warning} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        值类型在栈上直接存储（复制值），引用类型在堆上存储（复制指针），装箱将值类型复制到堆。
      </figcaption>
    </figure>
  );
}
