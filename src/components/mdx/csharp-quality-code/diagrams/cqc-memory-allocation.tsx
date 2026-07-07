/**
 * <CqcMemoryAllocationDiagram>：内存分配 · 栈 vs 堆与装箱拆箱。
 *
 * 左侧对比值类型（栈）与引用类型（堆）的内存布局。
 * 右侧展示装箱拆箱的开销：值类型 → 堆上对象 → 拆箱回值类型。
 * 底部点出减少分配的策略：Span、stackalloc、对象池、ref struct。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function CqcMemoryAllocationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="内存分配：栈与堆对比及装箱拆箱开销。左侧对比值类型在栈上分配与引用类型在堆上分配。右侧展示装箱拆箱三步开销。底部列出减少分配策略。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            内存分配 · 栈 vs 堆与装箱拆箱
          </text>

          {/* ===== 左侧：栈 vs 堆 ===== */}
          <text x="160" y="58" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">值类型 vs 引用类型</text>

          {/* 栈区 */}
          <rect x="40" y="72" width="240" height="150" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.3" strokeOpacity="0.4" />
          <text x="160" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">栈（Stack）</text>

          <rect x="56" y="102" width="208" height="28" rx="5" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="160" y="121" textAnchor="middle" fontSize="11" fill="var(--text-primary)">int x = 42 （值类型）</text>

          <rect x="56" y="136" width="208" height="28" rx="5" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="160" y="155" textAnchor="middle" fontSize="11" fill="var(--text-primary)">struct Point （值类型）</text>

          <text x="160" y="184" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">分配释放：函数进出自动</text>
          <text x="160" y="200" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">开销：极低（移动栈指针）</text>
          <text x="160" y="216" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">GC 不介入</text>

          {/* 堆区 */}
          <rect x="40" y="232" width="240" height="68" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.3" strokeOpacity="0.4" />
          <text x="160" y="252" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">堆（Heap）</text>

          <rect x="56" y="262" width="208" height="28" rx="5" fill="var(--bg)" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="160" y="281" textAnchor="middle" fontSize="11" fill="var(--text-primary)">class Person （引用类型）</text>

          {/* ===== 右侧：装箱拆箱 ===== */}
          <text x="500" y="58" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">装箱拆箱开销</text>

          {/* 装箱步骤 */}
          <rect x="320" y="72" width="160" height="36" rx="8" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.4" />
          <text x="400" y="89" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">int value = 42</text>
          <text x="400" y="102" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">栈上的值类型</text>

          {/* 箭头 */}
          <line x1="400" y1="108" x2="400" y2="122" stroke="var(--warning)" strokeWidth="1.6" />
          <polygon points="400,122 396,116 404,116" fill="var(--warning)" />
          <text x="470" y="118" fontSize="10" fill="var(--warning)">装箱 box</text>

          {/* 装箱结果 */}
          <rect x="320" y="126" width="160" height="36" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="400" y="143" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">object boxed = value</text>
          <text x="400" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">堆上新建对象 + 拷贝值</text>

          {/* 箭头 */}
          <line x1="400" y1="162" x2="400" y2="176" stroke="var(--warning)" strokeWidth="1.6" />
          <polygon points="400,176 396,170 404,170" fill="var(--warning)" />
          <text x="470" y="172" fontSize="10" fill="var(--warning)">拆箱 unbox</text>

          {/* 拆箱结果 */}
          <rect x="320" y="180" width="160" height="36" rx="8" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.4" />
          <text x="400" y="197" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">int y = (int)boxed</text>
          <text x="400" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">拷贝回栈 + 类型检查</text>

          {/* 开销说明 */}
          <rect x="320" y="226" width="360" height="74" rx="8" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.35" />
          <text x="500" y="246" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">每次装箱的开销</text>
          <text x="500" y="264" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">1. 堆分配新对象 2. 值拷贝到堆 3. GC 需回收</text>
          <text x="500" y="282" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">循环中装箱 = 大量垃圾 → GC 压力暴增</text>

          {/* ===== 底部：减少分配策略 ===== */}
          <rect x="36" y="312" width={VIEW_W - 72} height="88" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.35" />
          <text x="52" y="334" fontSize="12" fontWeight="700" fill="var(--accent)">减少分配的策略</text>

          <text x="52" y="356" fontSize="11" fontWeight="600" fill="var(--success)">Span&lt;T&gt;</text>
          <text x="52" y="372" fontSize="11" fill="var(--text-secondary)">栈上切片，零拷贝操作数组与字符串</text>

          <text x="52" y="392" fontSize="11" fontWeight="600" fill="var(--success)">stackalloc</text>
          <text x="52" y="408" fontSize="11" fill="var(--text-secondary)">小数组直接在栈上分配</text>

          <text x="260" y="356" fontSize="11" fontWeight="600" fill="var(--success)">ObjectPool</text>
          <text x="260" y="372" fontSize="11" fill="var(--text-secondary)">复用对象避免重复 GC</text>

          <text x="260" y="392" fontSize="11" fontWeight="600" fill="var(--success)">泛型集合</text>
          <text x="260" y="408" fontSize="11" fill="var(--text-secondary)">List&lt;int&gt; 避免 ArrayList 装箱</text>

          <text x="480" y="356" fontSize="11" fontWeight="600" fill="var(--success)">StringBuilder</text>
          <text x="480" y="372" fontSize="11" fill="var(--text-secondary)">循环拼接字符串不产生中间串</text>

          <text x="480" y="392" fontSize="11" fontWeight="600" fill="var(--success)">ref struct</text>
          <text x="480" y="408" fontSize="11" fill="var(--text-secondary)">强制只在栈上，不进堆</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        值类型在栈上分配、GC 不介入，引用类型在堆上分配、GC 负责回收。装箱把值类型包成堆对象产生 GC 压力，用泛型集合和 Span 消除装箱。
      </figcaption>
    </figure>
  );
}
