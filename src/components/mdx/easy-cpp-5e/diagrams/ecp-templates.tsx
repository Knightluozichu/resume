/**
 * <EcpTemplatesDiagram>：C++ 模板机制图（easy-cpp-5e 模板入门章）。
 *
 * 左侧展示函数模板 → 编译器实例化 → 生成具体版本的过程。
 * 右侧展示类模板 Box&lt;T&gt; → Box&lt;int&gt; / Box&lt;string&gt; 的实例化。
 * 底部总结模板的零开销特性与注意事项。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×440、四周留白 ≥32、字号 ≥11、间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 440;

export function EcpTemplatesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 模板机制图。左侧展示函数模板 maxOf(T a, T b) 经过编译器实例化，分别生成 maxOf(int) 和 maxOf(double) 两个具体版本。右侧展示类模板 Box 经过实例化生成 Box-int 和 Box-string 两个具体类。底部总结模板的零开销特性和注意事项。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 模板：蓝图与实例化
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            左：函数模板实例化 · 右：类模板实例化
          </text>

          {/* ===== 左侧：函数模板 ===== */}
          <rect x="40" y="76" width="310" height="80" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="56" y="96" fontSize="11" fontWeight="700" fill="var(--accent)">函数模板（蓝图）</text>
          <text x="56" y="116" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">template &lt;typename T&gt;</text>
          <text x="56" y="134" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">T maxOf(T a, T b) {`{`}</text>
          <text x="72" y="150" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">return (a &gt; b) ? a : b; {`}`}</text>

          {/* 实例化箭头 */}
          <line x1="195" y1="156" x2="120" y2="184" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.5" />
          <text x="130" y="174" fontSize="10" fill="var(--success)">maxOf(3,5)</text>
          <line x1="195" y1="156" x2="270" y2="184" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.5" />
          <text x="230" y="174" fontSize="10" fill="var(--warning)">maxOf(2.5,1.5)</text>

          {/* int 版本 */}
          <rect x="56" y="184" width="130" height="52" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="64" y="202" fontSize="10" fontWeight="700" fill="var(--success)">T = int</text>
          <text x="64" y="220" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">int maxOf(int,int)</text>

          {/* double 版本 */}
          <rect x="206" y="184" width="130" height="52" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="214" y="202" fontSize="10" fontWeight="700" fill="var(--warning)">T = double</text>
          <text x="214" y="220" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">double maxOf(...)</text>

          {/* ===== 右侧：类模板 ===== */}
          <rect x="380" y="76" width="300" height="80" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="396" y="96" fontSize="11" fontWeight="700" fill="var(--accent)">类模板（蓝图）</text>
          <text x="396" y="116" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">template &lt;typename T&gt;</text>
          <text x="396" y="134" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">class Box {`{ T value; `}</text>
          <text x="396" y="150" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{`  void set(T); T get(); };`}</text>

          {/* 实例化箭头 */}
          <line x1="480" y1="156" x2="430" y2="184" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.5" />
          <text x="420" y="174" fontSize="10" fill="var(--success)">Box&lt;int&gt;</text>
          <line x1="580" y1="156" x2="620" y2="184" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.5" />
          <text x="590" y="174" fontSize="10" fill="var(--warning)">Box&lt;string&gt;</text>

          {/* Box<int> */}
          <rect x="396" y="184" width="130" height="52" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="404" y="202" fontSize="10" fontWeight="700" fill="var(--success)">Box&lt;int&gt;</text>
          <text x="404" y="220" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">int value; set/get</text>

          {/* Box<string> */}
          <rect x="546" y="184" width="130" height="52" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="554" y="202" fontSize="10" fontWeight="700" fill="var(--warning)">Box&lt;string&gt;</text>
          <text x="554" y="220" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">string value; set/get</text>

          {/* ===== 特性说明区 ===== */}
          <rect x="40" y="260" width={VIEW_W - 80} height="108" rx="10" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="56" y="280" fontSize="12" fontWeight="700" fill="var(--text-primary)">模板特性</text>

          <circle cx="64" cy="300" r="4" fill="var(--success)" />
          <text x="76" y="304" fontSize="11" fill="var(--text-primary)">编译期实例化：遇到具体类型才生成代码，运行时零类型开销</text>

          <circle cx="64" cy="320" r="4" fill="var(--accent)" />
          <text x="76" y="324" fontSize="11" fill="var(--text-primary)">类型安全：每个实例化是强类型，编译器完整检查</text>

          <circle cx="64" cy="340" r="4" fill="var(--warning)" />
          <text x="76" y="344" fontSize="11" fill="var(--text-primary)">注意：代码膨胀（每类型一份）、定义须放头文件、错误信息冗长</text>

          <circle cx="64" cy="360" r="4" fill="var(--danger)" />
          <text x="76" y="364" fontSize="11" fill="var(--text-primary)">模板是蓝图不是代码——泛型编程的基石，STL 全部基于模板</text>

          {/* ===== 底部总结栏 ===== */}
          <rect x="40" y="384" width={VIEW_W - 80} height="36" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="406" textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            一份蓝图 → 编译器自动生成多种类型版本 → 零开销抽象 + 最大复用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        模板是编译期蓝图，编译器根据实际类型自动实例化出具体代码。函数模板和类模板实现泛型编程，零运行时开销但可能增加编译时间和代码体积。
      </figcaption>
    </figure>
  );
}
