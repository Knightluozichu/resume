/**
 * <EppTemplatesGenericsDiagram>：C++ 模板与实例化图（cpp-primer-plus 模板与泛型章）。
 *
 * 左侧两张卡片展示函数模板与类模板的定义骨架；
 * 右侧展示编译器按调用实参实例化出 T=int / T=double / T=string 三份具体代码。
 * 中间箭头表示「一次定义 → 多份实例化」，底部总结点出模板是类型安全的泛型复用。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×470、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 双列主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 470;

const INST: readonly { type: string; color: string }[] = [
  { type: "T = int", color: "var(--accent)" },
  { type: "T = double", color: "var(--success)" },
  { type: "T = string", color: "var(--warning)" },
];

export function EppTemplatesGenericsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 模板与实例化图。左侧函数模板 template typename T T max(T a, T b) 与类模板 template typename T class Stack。右侧编译器按调用实参实例化出 T=int、T=double、T=string 三份具体代码。中间箭头表示一次定义多份实例化。底部总结：模板是类型安全的泛型复用，编译期生成不损失类型检查。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 模板与实例化
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            一次定义 → 编译期按实参生成多份类型安全的实例
          </text>

          {/* ===== 左侧函数模板 ===== */}
          <rect x="32" y="108" width="320" height="120" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x="32" y="108" width="320" height="28" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="48" y="127" fontSize="13" fontWeight="700" fill="var(--accent)">函数模板</text>
          <text x="48" y="158" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{`template <typename T>`}</text>
          <text x="48" y="178" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{`T max(T a, T b) {`}</text>
          <text x="48" y="198" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{`  return a > b ? a : b;`}</text>
          <text x="48" y="218" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{`}`}</text>

          {/* ===== 左侧类模板 ===== */}
          <rect x="32" y="240" width="320" height="120" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x="32" y="240" width="320" height="28" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="48" y="259" fontSize="13" fontWeight="700" fill="var(--success)">类模板</text>
          <text x="48" y="290" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{`template <typename T>`}</text>
          <text x="48" y="310" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{`class Stack {`}</text>
          <text x="48" y="330" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{`  void push(const T&);`}</text>
          <text x="48" y="350" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{`};`}</text>

          {/* ===== 中间实例化箭头 ===== */}
          <text x="388" y="120" fontSize="12" fontWeight="700" fill="var(--text-secondary)">实例化 ↓</text>
          <line x1="356" y1="168" x2="384" y2="168" stroke="var(--accent)" strokeWidth="1.6" strokeOpacity="0.5" />
          <polygon points="382,164 382,172 390,168" fill="var(--accent)" fillOpacity="0.6" />
          <line x1="356" y1="300" x2="384" y2="300" stroke="var(--success)" strokeWidth="1.6" strokeOpacity="0.5" />
          <polygon points="382,296 382,304 390,300" fill="var(--success)" fillOpacity="0.6" />

          {/* ===== 右侧实例化结果 ===== */}
          {INST.map((it, i) => {
            const y = 132 + i * 96;
            return (
              <g key={it.type}>
                <rect x="392" y={y} width="296" height="84" rx="8" fill={it.color} fillOpacity="0.05" stroke={it.color} strokeWidth="1.2" strokeOpacity="0.5" />
                <text x="408" y={y + 22} fontSize="12" fontWeight="700" fill={it.color}>{it.type}</text>
                <text x="408" y={y + 46} fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{i === 0 ? "int max(int, int);" : i === 1 ? "double max(double, double);" : "string max(string, string);"}</text>
                <text x="408" y={y + 66} fontSize="11" fill="var(--text-secondary)">{i === 0 ? "Stack<int> 实例" : i === 1 ? "Stack<double> 实例" : "Stack<string> 实例"}</text>
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            模板 = 类型参数化：编译期按实参生成具体代码，零运行期开销且不损失类型检查
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ 模板把类型参数化：函数模板与类模板写一次，编译器按调用实参实例化出 int、double、string 等具体版本。模板在编译期展开，是类型安全的泛型复用，零运行期开销。
      </figcaption>
    </figure>
  );
}
