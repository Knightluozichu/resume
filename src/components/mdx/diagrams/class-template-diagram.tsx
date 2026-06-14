/**
 * <ClassTemplateDiagram>：类模板代码结构拆解图。
 *
 * 展示类模板的四个维度：
 *   ① template 声明（template<typename T> 前缀）
 *   ② 类型参数（T 是占位符，实例化时替换为具体类型）
 *   ③ 成员函数定义（类内+类外两种定义语法）
 *   ④ 实例化视角（Blob<int> 和 Blob<string> 是两个完全独立的类）
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */
export function ClassTemplateDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const green = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";

  const w = 880;
  const h = 520;
  const cx = w / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="类模板代码结构拆解：声明、类型参数、成员函数定义、实例化"
          className="mx-auto block h-auto w-full max-w-[880px]"
        >
          {/* Title */}
          <text x={cx} y="28" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            类模板的代码结构拆解
          </text>

          {/* ── ① template 声明 ── */}
          <g transform="translate(20, 50)">
            <rect x="0" y="0" width="255" height="85" rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.5" />
            <rect x="0" y="0" width="255" height="26" rx="10" fill={accent} fillOpacity="0.12" />
            <text x="127" y="18" fontSize="11" fontWeight="700" fill={accent} textAnchor="middle">
              ① template 声明
            </text>
            <text x="10" y="44" fontSize="10" fill={primary} fontFamily="monospace">
              template&lt;typename T&gt;
            </text>
            <text x="10" y="62" fontSize="10" fill={secondary}>
              template + &lt;&gt; = 模板前缀
            </text>
            <text x="10" y="78" fontSize="10" fill={secondary}>
              typename/class = 类型参数关键字
            </text>
          </g>

          {/* ── ② 类型参数 ── */}
          <g transform="translate(295, 50)">
            <rect x="0" y="0" width="255" height="85" rx="10" fill={warn} fillOpacity="0.06" stroke={warn} strokeWidth="1.5" />
            <rect x="0" y="0" width="255" height="26" rx="10" fill={warn} fillOpacity="0.12" />
            <text x="127" y="18" fontSize="11" fontWeight="700" fill={warn} textAnchor="middle">
              ② 类型参数 T
            </text>
            <text x="10" y="44" fontSize="10" fill={primary} fontFamily="monospace">
              T 是占位符——编译前不确定
            </text>
            <text x="10" y="62" fontSize="10" fill={secondary}>
              实例化时 T → int / string / ...
            </text>
            <text x="10" y="78" fontSize="10" fill={secondary}>
              可多个：&lt;typename T, typename U&gt;
            </text>
          </g>

          {/* ── ③ 类体 + 成员函数定义 ── */}
          <g transform="translate(570, 50)">
            <rect x="0" y="0" width="290" height="85" rx="10" fill={green} fillOpacity="0.06" stroke={green} strokeWidth="1.5" />
            <rect x="0" y="0" width="290" height="26" rx="10" fill={green} fillOpacity="0.12" />
            <text x="145" y="18" fontSize="11" fontWeight="700" fill={green} textAnchor="middle">
              ③ 类体 + 成员函数
            </text>
            <text x="10" y="44" fontSize="10" fill={primary} fontFamily="monospace">
              class Blob {'{'} T data; void push(T); {'}'}
            </text>
            <text x="10" y="62" fontSize="10" fill={secondary}>
              成员用 T 声明——类内可省略前缀
            </text>
            <text x="10" y="78" fontSize="10" fill={secondary}>
              类外定义需重写 template 前缀
            </text>
          </g>

          {/* ── 代码区：完整 Blob 类模板 ── */}
          <g transform="translate(20, 155)">
            <rect x="0" y="0" width="840" height="150" rx="8" fill="var(--code-bg)" stroke={border} />

            <text x="16" y="20" fontSize="10" fill={accent} fontWeight="700" fontFamily="monospace">
              {`// 类模板定义`}
            </text>
            <text x="16" y="38" fontSize="10" fill={primary} fontFamily="monospace">
              template&lt;typename T&gt;
            </text>
            <text x="16" y="56" fontSize="10" fill={primary} fontFamily="monospace">
              {`class Blob {`}
            </text>
            <text x="30" y="74" fontSize="10" fill={primary} fontFamily="monospace">
              {`std::vector<T> data;`}
            </text>
            <text x="30" y="92" fontSize="10" fill={primary} fontFamily="monospace">
              {`void push_back(const T &t);  // 类内声明`}
            </text>
            <text x="16" y="110" fontSize="10" fill={primary} fontFamily="monospace">
              {'};'}
            </text>

            {/* 类外定义区 */}
            <text x="16" y="132" fontSize="10" fill={accent} fontWeight="700" fontFamily="monospace">
              {`// 类外定义——必须重写 template 前缀 + 作用域限定`}
            </text>
            <text x="16" y="148" fontSize="10" fill={warn} fontFamily="monospace">
              {`template<typename T>                    // 必须重写`}
            </text>
            <text x="16" y="163" fontSize="10" fill={warn} fontFamily="monospace">
              {`void Blob<T>::push_back(const T &t) {   // Blob<T> 作用域`}
            </text>
            <text x="16" y="178" fontSize="10" fill={warn} fontFamily="monospace">
              {`    data.push_back(t);`}
            </text>
            <text x="16" y="193" fontSize="10" fill={warn} fontFamily="monospace">
              {'}'}
            </text>
          </g>

          {/* ── ④ 实例化视角 ── */}
          <g transform="translate(20, 325)">
            <rect x="0" y="0" width="840" height="150" rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1.5" />

            <text x={cx - 20} y="22" fontSize="12" fontWeight="700" fill={accent} textAnchor="middle">
              ④ 实例化视角：Blob&lt;int&gt; 和 Blob&lt;string&gt; 是两个完全独立的类
            </text>

            {/* Blob<int> */}
            <g transform="translate(40, 44)">
              <rect x="0" y="0" width="350" height="42" rx="6" fill={green} fillOpacity="0.08" stroke={green} strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="700" fill={green} fontFamily="monospace">
                Blob&lt;int&gt;
              </text>
              <text x="120" y="18" fontSize="9" fill={secondary} fontFamily="monospace">
                T → int | vector&lt;int&gt; data
              </text>
              <text x="120" y="34" fontSize="9" fill={secondary} fontFamily="monospace">
                push_back(const int&amp;)
              </text>
            </g>

            {/* != */}
            <text x={cx - 40} y="70" fontSize="14" fontWeight="700" fill={warn} textAnchor="middle" fontFamily="monospace">
              ≠
            </text>

            {/* Blob<string> */}
            <g transform="translate(450, 44)">
              <rect x="0" y="0" width="350" height="42" rx="6" fill={warn} fillOpacity="0.08" stroke={warn} strokeWidth="1" />
              <text x="10" y="18" fontSize="10" fontWeight="700" fill={warn} fontFamily="monospace">
                Blob&lt;string&gt;
              </text>
              <text x="140" y="18" fontSize="9" fill={secondary} fontFamily="monospace">
                T → string | vector&lt;string&gt; data
              </text>
              <text x="140" y="34" fontSize="9" fill={secondary} fontFamily="monospace">
                push_back(const string&amp;)
              </text>
            </g>

            {/* Bottom note */}
            <text x={cx - 20} y="112" fontSize="10" fill={secondary} textAnchor="middle">
              每个不同的模板实参组合 = 一份全新的类定义（独立的 static 成员 + 独立的函数）
            </text>
            <text x={cx - 20} y="130" fontSize="10" fill={warn} textAnchor="middle" fontFamily="monospace">
              Blob&lt;int&gt; 和 Blob&lt;string&gt; 彼此没有任何关系——不是父子、不是友元
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        类模板 = template 前缀 + 类型参数 + 类体。类内成员函数可用简写（如 push_back），类外必须重写 template 前缀 +
        ClassName&lt;T&gt;:: 作用域。每个实例化生成独立的类——Blob&lt;int&gt; 和 Blob&lt;string&gt; 是两个不同类。
      </figcaption>
    </figure>
  );
}
