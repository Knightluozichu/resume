/**
 * <LambdaSyntaxDiagram>：lambda 表达式语法拆解标注图。
 *
 * 将 lambda 拆解为带颜色标注的语法图：
 *   [capture] (params) mutable -> ret { body }
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--xxx)），无阴影。
 */
export function LambdaSyntaxDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";
  const bad = "rgb(229,103,92)";
  const purple = "rgb(124,92,255)";

  const w = 840;
  const h = 520;

  const captureColor = warn;
  const paramColor = good;
  const retColor = purple;
  const bodyColor = accent;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="Lambda 表达式语法拆解：[capture](params)->ret { body } 五部分标注"
          className="mx-auto block h-auto w-full max-w-[840px]"
        >
          <text x={w / 2} y="24" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            Lambda 表达式语法拆解
          </text>

          {/* ========== 主语法行 ========== */}
          <g transform="translate(40, 120)">
            {/* 1. 捕获列表 */}
            <g>
              <rect x="0" y="-40" width="142" height="36" rx="6" fill={captureColor} fillOpacity="0.1" stroke={captureColor} />
              <text x="71" y="-16" fontSize="20" fontWeight="700" fill={captureColor} textAnchor="middle" fontFamily="monospace">
                [&amp;, x]
              </text>
              <text x="71" y="-50" fontSize="10" fill={captureColor} textAnchor="middle" fontWeight="600" fontFamily="monospace">
                ① 捕获列表
              </text>
            </g>

            {/* 2. 参数列表 */}
            <g>
              <rect x="156" y="-40" width="148" height="36" rx="6" fill={paramColor} fillOpacity="0.1" stroke={paramColor} />
              <text x="230" y="-16" fontSize="20" fontWeight="700" fill={paramColor} textAnchor="middle" fontFamily="monospace">
                (int a, int b)
              </text>
              <text x="230" y="-50" fontSize="10" fill={paramColor} textAnchor="middle" fontWeight="600" fontFamily="monospace">
                ② 参数列表
              </text>
            </g>

            {/* 3. 返回类型 */}
            <g>
              <rect x="318" y="-40" width="116" height="36" rx="6" fill={retColor} fillOpacity="0.1" stroke={retColor} />
              <text x="376" y="-16" fontSize="20" fontWeight="700" fill={retColor} textAnchor="middle" fontFamily="monospace">
                -&gt; int
              </text>
              <text x="376" y="-50" fontSize="10" fill={retColor} textAnchor="middle" fontWeight="600" fontFamily="monospace">
                ③ 返回类型
              </text>
            </g>

            {/* 4. 函数体 */}
            <g>
              <rect x="448" y="-40" width="240" height="36" rx="6" fill={bodyColor} fillOpacity="0.1" stroke={bodyColor} />
              <text x="568" y="-16" fontSize="20" fontWeight="700" fill={bodyColor} textAnchor="middle" fontFamily="monospace">
                {"{ return a + b; }"}
              </text>
              <text x="568" y="-50" fontSize="10" fill={bodyColor} textAnchor="middle" fontWeight="600" fontFamily="monospace">
                ④ 函数体
              </text>
            </g>

            {/* 整体外框 */}
            <rect x="-10" y="-56" width={718} height="60" rx="12" fill="none" stroke={border} strokeWidth="1" strokeDasharray="5 3" />
          </g>

          {/* ========== 捕获列表详细拆解 ========== */}
          <g transform="translate(40, 220)">
            <text x="0" y="0" fontSize="12" fontWeight="700" fill={captureColor} fontFamily="monospace">
              ① Capture 捕获列表——决定 lambda 如何访问外部变量
            </text>

            <g transform="translate(0, 18)">
              {[
                { label: "[=]", desc: "按值捕获全部", x: 0 },
                { label: "[&amp;]", desc: "按引用捕获全部", x: 136 },
                { label: "[x, &amp;y]", desc: "x 按值，y 按引用", x: 310 },
                { label: "[this]", desc: "捕获 this 指针", x: 518 },
              ].map((c) => (
                <g key={c.label} transform={`translate(${c.x}, 0)`}>
                  <rect x="0" y="0" width="122" height="48" rx="6" fill={captureColor} fillOpacity="0.08" stroke={captureColor} strokeWidth="1" />
                  <text x="61" y="20" fontSize="14" fontWeight="600" fill={captureColor} textAnchor="middle" fontFamily="monospace">
                    {c.label}
                  </text>
                  <text x="61" y="38" fontSize="10" fill={secondary} textAnchor="middle">
                    {c.desc}
                  </text>
                </g>
              ))}
            </g>
          </g>

          {/* ========== 返回值类型 ========== */}
          <g transform="translate(40, 310)">
            <text x="0" y="0" fontSize="12" fontWeight="700" fill={retColor} fontFamily="monospace">
              ③ 返回值类型——可省略（编译器自动推导）
            </text>
            <g transform="translate(0, 18)">
              <rect x="0" y="0" width="370" height="40" rx="6" fill={retColor} fillOpacity="0.06" stroke={border} />
              <text x="14" y="18" fontSize="11" fill={primary} fontFamily="monospace">[x](int a) -&gt; int {"{ return a + x; }"}  // 完整写法</text>
              <text x="14" y="34" fontSize="11" fill={good} fontFamily="monospace">[x](int a) {"{ return a + x; }"}  // 省略 -&gt; int（自动推导）</text>
            </g>
          </g>

          {/* ========== 函数体 ========== */}
          <g transform="translate(440, 310)">
            <text x="0" y="0" fontSize="12" fontWeight="700" fill={bodyColor} fontFamily="monospace">
              ④ 函数体——必须有 {} 大括号
            </text>
            <g transform="translate(0, 18)">
              <rect x="0" y="0" width="370" height="40" rx="6" fill={bodyColor} fillOpacity="0.06" stroke={border} />
              <text x="14" y="18" fontSize="11" fill={primary} fontFamily="monospace">[](int a, int b) {"{ return a + b; }"}  // 显式 return</text>
              <text x="14" y="34" fontSize="11" fill={good} fontFamily="monospace">[](int a, int b) {"{ return a + b; }"}  // C++11 必须 return</text>
            </g>
          </g>

          {/* ========== 完整示例 ========== */}
          <g transform="translate(40, 400)">
            <text x="0" y="0" fontSize="11" fontWeight="700" fill={primary} fontFamily="monospace">
              实际使用：
            </text>
            <rect x="130" y="-14" width={540} height="32" rx="6" fill={accent} fillOpacity="0.05" stroke={border} />
            <text x="400" y="8" fontSize="12" fill={primary} textAnchor="middle" fontFamily="monospace">
              <tspan fill={captureColor}>[&amp;total]</tspan>
              (int x)
              <tspan fill={bodyColor}>{"{ total += x; }"}</tspan>
            </text>
          </g>

          {/* 右侧提示 */}
          <g transform="translate(700, 60)">
            <rect x="0" y="0" width="120" height="70" rx="8" fill={accent} fillOpacity="0.06" stroke={border} />
            <text x="60" y="18" fontSize="10" fontWeight="600" fill={accent} textAnchor="middle">lambda 本质</text>
            <text x="60" y="36" fontSize="9" fill={secondary} textAnchor="middle">编译器生成</text>
            <text x="60" y="50" fontSize="9" fill={secondary} textAnchor="middle">匿名函数对象</text>
            <text x="60" y="64" fontSize="9" fill={secondary} textAnchor="middle">（闭包）</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Lambda 表达式由四部分构成：捕获列表（如何访问外部变量）、参数列表（与普通函数相同）、返回类型（可省略，自动推导）、函数体。编译器将其展开为匿名函数对象。
      </figcaption>
    </figure>
  );
}
