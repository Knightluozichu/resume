/**
 * <CallableConceptDiagram>：可调用对象概念对比图。
 *
 * 展示 C++ 中三类可调用对象的关系：
 *   ① 函数指针——最基础、无状态
 *   ② lambda 表达式——匿名函数对象，可捕获上下文
 *   ③ 重载 operator() 的函数对象——有状态、可复用
 *
 * 三者最终都对应到「可调用」这一共同概念，通过类型擦除（function/模板）统一使用。
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */
export function CallableConceptDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";

  const w = 820;
  const h = 500;
  const cx = w / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="C++ 可调用对象对比：函数指针、lambda、重载 operator() 三类可调用对象关系图"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x={cx} y="28" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            C++ 三类可调用对象
          </text>

          {/* ── ① 函数指针 ── */}
          <g transform="translate(48, 60)">
            <rect x="0" y="0" width="220" height="140" rx="10" fill={good} fillOpacity="0.06" stroke={good} strokeWidth="1.5" />
            <rect x="0" y="0" width="220" height="30" rx="10" fill={good} fillOpacity="0.12" />
            <text x="110" y="20" fontSize="12" fontWeight="700" fill={good} textAnchor="middle">
              ① 函数指针
            </text>

            <text x="14" y="52" fontSize="10" fill={primary} fontFamily="monospace">
              int (*pf)(int, int)
            </text>
            <text x="14" y="72" fontSize="10" fill={secondary}>
              最基础的可调用对象
            </text>
            <text x="14" y="92" fontSize="10" fill={secondary}>
              ✗ 无状态——只指向一个函数
            </text>
            <text x="14" y="110" fontSize="10" fill={secondary}>
              ✗ 不能捕获外部变量
            </text>
            <text x="14" y="128" fontSize="10" fill={good}>
              ✓ 类型安全、C 兼容
            </text>
          </g>

          {/* ── ② Lambda ── */}
          <g transform="translate(300, 60)">
            <rect x="0" y="0" width="220" height="140" rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.5" />
            <rect x="0" y="0" width="220" height="30" rx="10" fill={accent} fillOpacity="0.12" />
            <text x="110" y="20" fontSize="12" fontWeight="700" fill={accent} textAnchor="middle">
              ② Lambda 表达式
            </text>

            <text x="14" y="52" fontSize="10" fill={primary} fontFamily="monospace">
              [x](int a){'{ return a+x; }'}
            </text>
            <text x="14" y="72" fontSize="10" fill={secondary}>
              编译器生成匿名函数对象
            </text>
            <text x="14" y="92" fontSize="10" fill={accent}>
              ✓ 可捕获上下文（闭包）
            </text>
            <text x="14" y="110" fontSize="10" fill={accent}>
              ✓ 本质是重载了 operator()
            </text>
            <text x="14" y="128" fontSize="10" fill={secondary}>
              ✗ 每个 lambda 是独立类型
            </text>
          </g>

          {/* ── ③ 重载 operator() ── */}
          <g transform="translate(552, 60)">
            <rect x="0" y="0" width="220" height="140" rx="10" fill={warn} fillOpacity="0.06" stroke={warn} strokeWidth="1.5" />
            <rect x="0" y="0" width="220" height="30" rx="10" fill={warn} fillOpacity="0.12" />
            <text x="110" y="20" fontSize="12" fontWeight="700" fill={warn} textAnchor="middle">
              ③ 函数对象（Functor）
            </text>

            <text x="14" y="52" fontSize="10" fill={primary} fontFamily="monospace">
              class Abs{'{ operator()(int x)'}
            </text>
            <text x="14" y="72" fontSize="10" fill={secondary}>
              一个类，重载了 operator()
            </text>
            <text x="14" y="92" fontSize="10" fill={warn}>
              ✓ 拥有独立状态（成员变量）
            </text>
            <text x="14" y="110" fontSize="10" fill={warn}>
              ✓ 可复用——多次调用同一实例
            </text>
            <text x="14" y="128" fontSize="10" fill={secondary}>
              可配合标准算法使用
            </text>
          </g>

          {/* ── 底部：统一汇聚 ── */}
          {/* 三条竖线向下 */}
          <line x1="158" y1="210" x2="158" y2="270" stroke={good} strokeWidth="1.5" strokeDasharray="5 3" />
          <line x1="410" y1="210" x2="410" y2="270" stroke={accent} strokeWidth="1.5" strokeDasharray="5 3" />
          <line x1="662" y1="210" x2="662" y2="270" stroke={warn} strokeWidth="1.5" strokeDasharray="5 3" />

          {/* 汇聚框 */}
          <g transform="translate(48, 276)">
            <rect x="0" y="0" width={w - 96} height="80" rx="12" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="2" />

            <text x={cx - 50} y="24" fontSize="13" fontWeight="700" fill={accent} textAnchor="middle">
              统一抽象：可调用对象（Callable）
            </text>

            <text x={cx - 50} y="46" fontSize="11" fill={secondary} textAnchor="middle">
              三者通过 std::function / 模板参数统一使用——只要满足「能用 () 调用」即可
            </text>

            <text x={cx - 50} y="66" fontSize="10" fill={primary} textAnchor="middle" fontFamily="monospace">
              std::function&lt;int(int,int)&gt; f = lambda;  // 可持有任意可调用对象
            </text>
          </g>

          {/* ── 右侧：对比表 ── */}
          <g transform="translate(48, 378)">
            <rect x="0" y="0" width={w - 96} height="52" rx="8" fill={bg} stroke={border} />
            <text x="110" y="18" fontSize="10" fontWeight="600" fill={primary} textAnchor="middle">
              特性对比
            </text>
            {["有状态？", "捕获外部变量？", "可复用（同一类型）？", "可直接用标准算法？"].map((label, i) => (
              <text key={i} x={72 + i * 180} y="36" fontSize="9" fill={secondary} textAnchor="middle">
                {label}
              </text>
            ))}
          </g>

          <g transform="translate(48, 430)">
            {/* 函数指针行 */}
            {["✗", "✗", "✓", "✓"].map((val, i) => (
              <text key={`fp-${i}`} x={72 + i * 180} y="14" fontSize="11" fill={good} textAnchor="middle" fontFamily="monospace">
                {val}
              </text>
            ))}

            {/* Lambda 行 */}
            {["✗（捕获后是）", "✓", "✗（每个独特类型）", "✓"].map((val, i) => (
              <text key={`lm-${i}`} x={72 + i * 180} y="30" fontSize="11" fill={accent} textAnchor="middle" fontFamily="monospace">
                {val}
              </text>
            ))}

            {/* functor 行 */}
            {["✓", "✓（通过构造函数）", "✓", "✓"].map((val, i) => (
              <text key={`fn-${i}`} x={72 + i * 180} y="46" fontSize="11" fill={warn} textAnchor="middle" fontFamily="monospace">
                {val}
              </text>
            ))}
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        函数指针：最基础、无状态、C 兼容。Lambda：编译器生成的匿名函数对象——可捕获上下文、本质是重载 operator()。函数对象：手动定义类并重载 operator()——有独立状态、可复用。三者通过 std::function 或模板统一使用。
      </figcaption>
    </figure>
  );
}
