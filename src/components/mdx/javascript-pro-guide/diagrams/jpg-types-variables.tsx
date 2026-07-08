/**
 * <JpgTypesVariablesDiagram>：数据类型与变量图解（原始类型 vs 引用类型 + let/const/var 对比）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JpgTypesVariablesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="数据类型与变量：原始类型与引用类型的内存模型图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            原始类型 vs 引用类型的内存模型
          </text>
          <text x={VIEW_W / 2} y="46" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            原始类型存栈中按值访问；引用类型存堆中按引用访问
          </text>

          {/* 栈区 */}
          <rect x="40" y="64" width="300" height="240" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="190" y="84" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">栈（Stack）——原始类型</text>
          <rect x="60" y="98" width="260" height="30" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="74" y="118" fontSize="11" fill="var(--text-primary)">let age = 25</text>
          <text x="310" y="118" textAnchor="end" fontSize="10" fill="var(--text-secondary)">值 25 直接存栈</text>
          <rect x="60" y="134" width="260" height="30" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="74" y="154" fontSize="11" fill="var(--text-primary)">let name = &quot;JS&quot;</text>
          <text x="310" y="154" textAnchor="end" fontSize="10" fill="var(--text-secondary)">不可变字符串</text>
          <rect x="60" y="170" width="260" height="30" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="74" y="190" fontSize="11" fill="var(--text-primary)">let isOn = true</text>
          <text x="310" y="190" textAnchor="end" fontSize="10" fill="var(--text-secondary)">布尔占 1 字节</text>
          <rect x="60" y="206" width="260" height="30" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="74" y="226" fontSize="11" fill="var(--text-primary)">let big = 9007199254740993n</text>
          <text x="310" y="226" textAnchor="end" fontSize="10" fill="var(--text-secondary)">BigInt 任意精度</text>
          <text x="190" y="262" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Symbol / null / undefined 同属原始类型</text>
          <text x="190" y="278" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">复制 = 拷贝值，互不影响</text>

          {/* 堆区 */}
          <rect x="400" y="64" width="300" height="240" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="550" y="84" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">堆（Heap）——引用类型</text>
          <rect x="420" y="98" width="260" height="50" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="434" y="116" fontSize="11" fill="var(--text-primary)">let obj = &lbrace; x: 1 &rbrace;</text>
          <text x="670" y="116" textAnchor="end" fontSize="10" fill="var(--text-secondary)">栈存地址 → 堆存对象</text>
          <text x="434" y="136" fontSize="10" fill="var(--text-secondary)">堆：&lbrace; x: 1 &rbrace;</text>
          <rect x="420" y="156" width="260" height="50" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="434" y="174" fontSize="11" fill="var(--text-primary)">let arr = [1, 2, 3]</text>
          <text x="670" y="174" textAnchor="end" fontSize="10" fill="var(--text-secondary)">数组也是引用</text>
          <text x="434" y="194" fontSize="10" fill="var(--text-secondary)">堆：[1, 2, 3]</text>
          <rect x="420" y="214" width="260" height="40" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="434" y="232" fontSize="11" fill="var(--text-primary)">let fn = function() &lbrace;&rbrace;</text>
          <text x="670" y="232" textAnchor="end" fontSize="10" fill="var(--text-secondary)">函数即对象</text>
          <text x="550" y="278" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">复制 = 拷贝地址，共享同一对象</text>

          {/* 连接线 */}
          <path d="M320 113 C 360 113, 380 113, 420 113" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" fill="none" />
          <path d="M320 113 L 410 113" stroke="var(--text-tertiary)" strokeWidth="1" fill="none" markerEnd="url(#arr)" />
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          {/* 下方：let/const/var 对比 */}
          <rect x="40" y="320" width="660" height="120" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="340" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">let / const / var 声明对比</text>
          <rect x="60" y="352" width="190" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="155" y="368" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">var</text>
          <text x="155" y="382" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">函数作用域·提升·可重复声明</text>
          <rect x="275" y="352" width="190" height="36" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="368" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">let</text>
          <text x="370" y="382" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">块级作用域·暂时性死区·可重赋值</text>
          <rect x="490" y="352" width="190" height="36" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="585" y="368" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">const</text>
          <text x="585" y="382" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">块级作用域·必须初始化·不可重绑</text>
          <text x="370" y="412" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">const 冻结绑定不冻结内容：const obj=&lbrace;&rbrace; 仍可改 obj.x</text>
          <text x="370" y="428" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">现代代码默认 const，需重赋值才用 let，禁用 var</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        原始类型按值存栈、引用类型按引用存堆；let/const 提供块级作用域，var 已被淘汰
      </figcaption>
    </figure>
  );
}
