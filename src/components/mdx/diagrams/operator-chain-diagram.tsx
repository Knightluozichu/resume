/**
 * <OperatorChainDiagram step={1|2|3}>：运算符重载链式调用示意图。
 *
 * Step 1: 链式赋值 `a = b = c` 的返回 *this 机制。
 * Step 2: 链式输出 `cout << a << b` 返回 ostream&。
 * Step 3: 复合赋值 `a += b += c` 的链式展开。
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

interface OperatorChainDiagramProps {
  step?: 1 | 2 | 3;
}

export function OperatorChainDiagram({ step = 1 }: OperatorChainDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";

  const w = 780;
  const h = step === 2 ? 400 : 360;
  const cx = w / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="运算符链式调用 —— 展示 return *this 如何让操作串联工作"
          className="mx-auto block h-auto w-full max-w-[780px]"
        >
          {step === 1 && (
            <>
              <text x={cx} y="28" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
                {`链式赋值 a = b = c`}
              </text>

              {/* 表达式 */}
              <text x={cx} y="68" fontSize="20" fontWeight="700" fill={accent} textAnchor="middle" fontFamily="monospace">
                a = b = c
              </text>
              <text x={cx} y="94" fontSize="11" fill={secondary} textAnchor="middle">
                结合性：右结合 &nbsp;|&nbsp; 等价于
              </text>
              <text x={cx} y="116" fontSize="15" fontWeight="600" fill={primary} textAnchor="middle" fontFamily="monospace">
                a = (b = c)
              </text>

              {/* 第一步 */}
              <g transform="translate(60, 150)">
                <rect x="0" y="0" width="660" height="52" rx="8" fill={good} fillOpacity="0.06" stroke={good} strokeWidth="1" />
                <text x="14" y="20" fontSize="11" fontWeight="700" fill={good} fontFamily="monospace">
                  ① 先执行 b = c
                </text>
                <text x="14" y="38" fontSize="11" fill={primary} fontFamily="monospace">
                  operator=(const T&amp; c) → 拷贝 c 的数据到 b → return *this（返回 b 的引用）
                </text>
              </g>

              {/* 箭头 */}
              <text x={cx} y="224" fontSize="18" fill={accent} textAnchor="middle" fontWeight="700">
                ↓ b 的引用成为左操作数
              </text>

              {/* 第二步 */}
              <g transform="translate(60, 246)">
                <rect x="0" y="0" width="660" height="52" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" />
                <text x="14" y="20" fontSize="11" fontWeight="700" fill={accent} fontFamily="monospace">
                  ② 再执行 a = (b=c 的返回值)
                </text>
                <text x="14" y="38" fontSize="11" fill={primary} fontFamily="monospace">
                  operator=(const T&amp; rhs) → rhs 是上一步 return *this 返回的 b 的引用 → 拷贝到 a → return *this
                </text>
              </g>
            </>
          )}

          {step === 2 && (
            <>
              <text x={cx} y="28" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
                {`链式输出 cout << a << b`}
              </text>

              <text x={cx} y="68" fontSize="20" fontWeight="700" fill={accent} textAnchor="middle" fontFamily="monospace">
                {`cout << a << b`}
              </text>
              <text x={cx} y="94" fontSize="11" fill={secondary} textAnchor="middle">
                结合性：左结合 &nbsp;|&nbsp; 等价于
              </text>
              <text x={cx} y="116" fontSize="15" fontWeight="600" fill={primary} textAnchor="middle" fontFamily="monospace">
                {`(cout << a) << b`}
              </text>

              {/* 第一步 */}
              <g transform="translate(40, 150)">
                <rect x="0" y="0" width="700" height="60" rx="8" fill={good} fillOpacity="0.06" stroke={good} strokeWidth="1" />
                <text x="14" y="22" fontSize="11" fontWeight="700" fill={good} fontFamily="monospace">
                  ① 先执行 cout &lt;&lt; a
                </text>
                <text x="14" y="42" fontSize="11" fill={primary} fontFamily="monospace">
                  operator&lt;&lt;(ostream&amp; os, const T&amp; val) → 把 val 写入 os → return os（返回 ostream 引用）
                </text>
              </g>

              {/* 箭头 */}
              <text x={cx} y="238" fontSize="18" fill={accent} textAnchor="middle" fontWeight="700">
                ↓ 返回的 ostream&amp; 成为左操作数
              </text>

              {/* 第二步 */}
              <g transform="translate(40, 260)">
                <rect x="0" y="0" width="700" height="60" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" />
                <text x="14" y="22" fontSize="11" fontWeight="700" fill={accent} fontFamily="monospace">
                  ② 再执行 (cout&lt;&lt;a 的返回值) &lt;&lt; b
                </text>
                <text x="14" y="42" fontSize="11" fill={primary} fontFamily="monospace">
                  operator&lt;&lt;(ostream&amp; os, const T&amp; val) → 左参数 os 就是上一步的返回值 &lt;ostream&amp;&gt; → 写入 b 后 return os
                </text>
              </g>

              {/* 底部说明 */}
              <rect x="40" y="340" width="700" height="40" rx="6" fill={warn} fillOpacity="0.06" stroke={border} />
              <text x={cx} y="364" fontSize="11" fill={secondary} textAnchor="middle">
                ⚠ 为什么不能是成员函数？成员函数左操作数是 this（自身类型），但 cout &lt;&lt; a 中左操作数必须是 ostream
              </text>
            </>
          )}

          {step === 3 && (
            <>
              <text x={cx} y="28" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
                {`链式复合赋值 a += b += c`}
              </text>

              <text x={cx} y="68" fontSize="20" fontWeight="700" fill={accent} textAnchor="middle" fontFamily="monospace">
                a += b += c
              </text>
              <text x={cx} y="94" fontSize="11" fill={secondary} textAnchor="middle">
                结合性：右结合 &nbsp;|&nbsp; 等价于
              </text>
              <text x={cx} y="116" fontSize="15" fontWeight="600" fill={primary} textAnchor="middle" fontFamily="monospace">
                a += (b += c)
              </text>

              <g transform="translate(60, 150)">
                <rect x="0" y="0" width="660" height="52" rx="8" fill={good} fillOpacity="0.06" stroke={good} strokeWidth="1" />
                <text x="14" y="20" fontSize="11" fontWeight="700" fill={good} fontFamily="monospace">
                  ① 先执行 b += c
                </text>
                <text x="14" y="38" fontSize="11" fill={primary} fontFamily="monospace">
                  operator+=(const T&amp; c) → b = b + c → return *this（返回 b 的引用）
                </text>
              </g>

              <text x={cx} y="224" fontSize="18" fill={accent} textAnchor="middle" fontWeight="700">
                ↓ b 的引用成为右操作数
              </text>

              <g transform="translate(60, 246)">
                <rect x="0" y="0" width="660" height="52" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" />
                <text x="14" y="20" fontSize="11" fontWeight="700" fill={accent} fontFamily="monospace">
                  ② 再执行 a += (b+=c 的返回值)
                </text>
                <text x="14" y="38" fontSize="11" fill={primary} fontFamily="monospace">
                  operator+=(const T&amp; rhs) → rhs 是 b（已被 + c 更新）的引用 → a = a + b → return *this
                </text>
              </g>
            </>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && "链式赋值的关键是 operator= 返回 *this 的引用——每一步的返回值作为下一步的左操作数。右结合保证从右往左执行。"}
        {step === 2 && "链式输出的关键是返回 ostream& 引用——这使得 (cout<<a) 的结果仍是 ostream，可以继续 <<b。输入输出必须是非成员函数。"}
        {step === 3 && "链式复合赋值的关键是 operator+= 返回 *this 的引用——b+=c 返回 b 自身，a+=(b) 再用 b 作为右操作数。推荐成员实现以返回 *this。"}
      </figcaption>
    </figure>
  );
}
