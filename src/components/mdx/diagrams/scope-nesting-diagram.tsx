/**
 * <ScopeNestingDiagram>：C++ 嵌套作用域示意图。
 *
 * 外层作用域 → 内层作用域，用方框嵌套表示。
 * 每个作用域内标注可以访问的变量名，用不同颜色区分内外层的同名变量遮蔽。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary /
 * --text-secondary），无阴影。
 */

export function ScopeNestingDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 620 540"
          role="img"
          aria-label="C++ 嵌套作用域：全局域→main 内层块，嵌套方框标注各层可见变量，展示同名变量遮蔽（shadowing）"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ===== 最外层：全局作用域 ===== */}
          <rect
            x="24"
            y="32"
            width="572"
            height="468"
            rx="12"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="6 3"
          />
          <text x="40" y="56" fontSize="13" fontWeight="700" fill="var(--text-secondary)">
            全局作用域（整个文件可见）
          </text>

          {/* 全局变量 */}
          <rect x="40" y="68" width="110" height="28" rx="6" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="95" y="87" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)" fontFamily="monospace">
            int global = 42;
          </text>

          <text x="164" y="87" fontSize="11" fill="var(--text-secondary)">
            ← 整个程序都能看到它
          </text>

          {/* ===== 中层：main 函数作用域 ===== */}
          <rect
            x="48"
            y="112"
            width="528"
            height="340"
            rx="10"
            fill="var(--bg-elevated)"
            stroke="var(--border)"
            strokeWidth="2"
            opacity="0.95"
          />
          <rect x="48" y="112" width="528" height="28" rx="10" fill="var(--accent)" opacity="0.08" />
          <rect x="48" y="132" width="528" height="8" fill="var(--accent)" opacity="0.08" />
          <text x="66" y="132" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            main 函数作用域
          </text>

          {/* main 内的变量 */}
          <rect x="66" y="152" width="130" height="28" rx="6" fill="var(--accent)" opacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="131" y="171" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)" fontFamily="monospace">
            int local = 10;
          </text>
          <text x="210" y="171" fontSize="11" fill="var(--text-secondary)">
            ← main 范围内可见
          </text>

          {/* ===== 内层：代码块作用域 ===== */}
          <rect
            x="80"
            y="200"
            width="472"
            height="220"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2"
            opacity="0.7"
          />
          <rect x="80" y="200" width="472" height="26" rx="8" fill="var(--accent)" opacity="0.1" />
          <rect x="80" y="218" width="472" height="8" fill="var(--accent)" opacity="0.1" />
          <text x="98" y="218" fontSize="12" fontWeight="700" fill="var(--accent)">
            内层代码块 {'{}'} 作用域
          </text>

          {/* 内层变量：遮蔽同名 */}
          <rect x="98" y="240" width="170" height="28" rx="6" fill="var(--accent)" opacity="0.18" stroke="var(--accent)" strokeWidth="2" />
          <text x="183" y="259" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            int local = 20;
          </text>
          <text x="280" y="259" fontSize="11" fill="var(--accent)">
            ← 遮蔽了外层的 local！
          </text>

          <rect x="98" y="280" width="140" height="28" rx="6" fill="var(--accent)" opacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="168" y="299" textAnchor="middle" fontSize="12" fontWeight="500" fill="var(--text-primary)" fontFamily="monospace">
            int innerOnly = 30;
          </text>
          <text x="252" y="299" fontSize="11" fill="var(--text-secondary)">
            ← 只在这里面存在
          </text>

          {/* 内层可访问变量提示 */}
          <rect x="98" y="330" width="430" height="70" rx="6" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="1" opacity="0.7" />
          <text x="114" y="350" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            此作用域内可以访问：
          </text>
          <text x="114" y="368" fontSize="11" fill="var(--accent)">
            ✓ global（全局）   ✓ local=20（当前块，遮蔽了外层的 10）
          </text>
          <text x="114" y="384" fontSize="11" fill="var(--text-primary)">
            ✓ innerOnly（本块）   ✗ 无法访问外层的 local=10（被同名遮蔽了）
          </text>

          {/* 跨层连接线指示遮蔽 */}
          <line x1="516" y1="175" x2="516" y2="248" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <text x="526" y="215" fontSize="10" fill="var(--text-secondary)">
            同名
          </text>
          <text x="526" y="227" fontSize="10" fill="var(--text-secondary)">
            遮蔽
          </text>

          {/* 底部说明 */}
          <text x="40" y="458" fontSize="11" fill="var(--text-secondary)">
            内层作用域可以看见外层的变量，但同名声明会遮蔽（shadow）外层的。出了内层块，innerOnly 就销毁了。
          </text>
          <text x="40" y="475" fontSize="11" fill="var(--accent)">
            规则：从声明点到所在块结束的花括号 {'}'} 就是它的「寿命」区间，越界即消失。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C++ 嵌套作用域：全局 → main 函数 → 内层代码块。每层花括号 {'{...}'} 定义一个作用域，
        内层可访问外层变量；同名声明在内层会遮蔽外层；变量仅在声明它的块内存在。
      </figcaption>
    </figure>
  );
}
