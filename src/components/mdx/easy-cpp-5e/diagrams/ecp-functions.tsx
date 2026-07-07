/**
 * <EcpFunctionsDiagram>：C++ 函数解剖图（easy-cpp-5e 函数章）。
 *
 * 左侧用标注线拆解函数声明的六个部分（返回类型、函数名、参数列表、函数体、return）。
 * 右侧对比值传递 vs 引用传递：实参 → 形参的内存关系。
 * 底部总结函数重载与默认参数。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×440、四周留白 ≥32、字号 ≥11、间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 440;

export function EcpFunctionsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 函数解剖图。左上区域用标注线拆解函数声明的各部分：返回类型 int、函数名 add、参数列表 int a int b、函数体 return a+b。左下区域展示函数重载（同名不同参数列表）和默认参数。右上区域对比值传递（复制副本）与引用传递（别名直接改实参），右侧展示内存关系。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 函数解剖与参数传递
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            左：函数结构 · 右：值传递 vs 引用传递
          </text>

          {/* ===== 左侧：函数结构标注 ===== */}
          <rect x="40" y="76" width="320" height="140" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="56" y="96" fontSize="11" fontWeight="700" fill="var(--text-secondary)">函数声明</text>

          {/* 代码行 */}
          <text x="80" y="130" fontSize="14" fontFamily="monospace" fill="var(--accent)" fontWeight="700">int</text>
          <text x="120" y="130" fontSize="14" fontFamily="monospace" fill="var(--success)" fontWeight="700">add</text>
          <text x="160" y="130" fontSize="14" fontFamily="monospace" fill="var(--text-primary)">(int a, int b) {`{`}</text>
          <text x="96" y="156" fontSize="14" fontFamily="monospace" fill="var(--text-primary)">return a + b;</text>
          <text x="80" y="182" fontSize="14" fontFamily="monospace" fill="var(--text-primary)">{`}`}</text>

          {/* 标注线 */}
          <line x1="100" y1="130" x2="100" y2="108" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="100" y="104" textAnchor="middle" fontSize="10" fill="var(--accent)">返回类型</text>

          <line x1="138" y1="130" x2="138" y2="200" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="138" y="214" textAnchor="middle" fontSize="10" fill="var(--success)">函数名</text>

          <line x1="210" y1="130" x2="210" y2="108" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="210" y="104" textAnchor="middle" fontSize="10" fill="var(--warning)">参数列表</text>

          <line x1="130" y1="156" x2="56" y2="156" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="52" y="160" textAnchor="end" fontSize="10" fill="var(--text-secondary)">函数体</text>

          {/* ===== 左下：重载与默认参数 ===== */}
          <rect x="40" y="232" width="320" height="76" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="56" y="252" fontSize="11" fontWeight="700" fill="var(--text-secondary)">重载 & 默认参数</text>
          <text x="56" y="272" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">void swap(int &a, int &b);</text>
          <text x="56" y="288" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">void swap(double &a, double &b);</text>
          <text x="56" y="302" fontSize="10" fill="var(--text-secondary)">同名不同参数列表 = 重载</text>

          {/* ===== 右侧：值传递 vs 引用传递 ===== */}
          <rect x="380" y="76" width="300" height="232" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="396" y="96" fontSize="11" fontWeight="700" fill="var(--text-secondary)">参数传递对比</text>

          {/* 值传递 */}
          <rect x="396" y="108" width="268" height="88" rx="6" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <text x="408" y="126" fontSize="12" fontWeight="700" fill="var(--success)">值传递 void f(int x)</text>
          <rect x="408" y="136" width="80" height="24" rx="4" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" />
          <text x="448" y="152" textAnchor="middle" fontSize="11" fill="var(--text-primary)">实参 n=5</text>
          <text x="500" y="152" fontSize="14" fill="var(--text-secondary)">→</text>
          <rect x="520" y="136" width="80" height="24" rx="4" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="560" y="152" textAnchor="middle" fontSize="11" fill="var(--text-primary)">副本 x=5</text>
          <text x="408" y="184" fontSize="10" fill="var(--text-secondary)">改 x 不影响 n，安全但复制有成本</text>

          {/* 引用传递 */}
          <rect x="396" y="204" width="268" height="92" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" />
          <text x="408" y="222" fontSize="12" fontWeight="700" fill="var(--accent)">引用传递 void f(int &x)</text>
          <rect x="408" y="232" width="80" height="24" rx="4" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" />
          <text x="448" y="248" textAnchor="middle" fontSize="11" fill="var(--text-primary)">实参 n=5</text>
          <text x="500" y="248" fontSize="14" fill="var(--text-secondary)">⇒</text>
          <rect x="520" y="232" width="80" height="24" rx="4" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="560" y="248" textAnchor="middle" fontSize="11" fill="var(--accent)">别名 x=n</text>
          <text x="408" y="276" fontSize="10" fill="var(--text-secondary)">改 x 直接改 n，省复制、可修改实参</text>
          <text x="408" y="290" fontSize="10" fill="var(--text-secondary)">只读大对象用 const 引用</text>

          {/* ===== 底部总结栏 ===== */}
          <rect x="40" y="332" width={VIEW_W - 80} height="76" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="354" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
            函数设计要点
          </text>
          <text x={VIEW_W / 2} y="374" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            值传递适合小对象 · 引用传递适合大对象或需修改实参 · const 引用只读不复制
          </text>
          <text x={VIEW_W / 2} y="392" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            重载：同名不同参数列表 · 默认参数：从右往左连续设置 · inline：短函数展开省调用开销
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        函数由返回类型、函数名、参数列表、函数体构成。值传递复制实参不影响原值，引用传递通过别名直接操作实参。重载让同名函数适配不同类型，默认参数简化常用调用。
      </figcaption>
    </figure>
  );
}
