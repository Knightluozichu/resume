/**
 * <TypeConversionOperatorDiagram>：类类型与内置类型之间的转换路径图。
 *
 * 展示三条转换路径：
 *   ① 转换构造函数：内置类型 → 类类型
 *   ② explicit 转换构造函数：显式转换
 *   ③ 类型转换运算符：类类型 → 内置类型（含 explicit operator bool）
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */
export function TypeConversionOperatorDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";

  const w = 820;
  const h = 460;
  const cx = w / 2;

  // Colors
  const builtinColor = good;
  const classColor = accent;
  const explicitColor = warn;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="类类型与内置类型转换路径图：转换构造函数、explicit、类型转换运算符三条路径"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x={cx} y="28" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            类类型 ↔ 内置类型：三条转换路径
          </text>

          {/* 左侧：内置类型 */}
          <g transform="translate(60, 180)">
            <rect x="0" y="-30" width="140" height="60" rx="12" fill={builtinColor} fillOpacity="0.1" stroke={builtinColor} strokeWidth="2" />
            <text x="70" y="-4" fontSize="13" fontWeight="700" fill={builtinColor} textAnchor="middle">
              内置类型
            </text>
            <text x="70" y="14" fontSize="11" fill={secondary} textAnchor="middle" fontFamily="monospace">
              int, double, bool...
            </text>
          </g>

          {/* 右侧：类类型 */}
          <g transform="translate(580, 180)">
            <rect x="0" y="-30" width="180" height="60" rx="12" fill={classColor} fillOpacity="0.1" stroke={classColor} strokeWidth="2" />
            <text x="90" y="-4" fontSize="13" fontWeight="700" fill={classColor} textAnchor="middle">
              类类型
            </text>
            <text x="90" y="14" fontSize="11" fill={secondary} textAnchor="middle" fontFamily="monospace">
              SalesData, SmallInt...
            </text>
          </g>

          {/* ── 路径 ①：转换构造函数（内置→类）── */}
          <g>
            {/* 箭头 */}
            <line x1="210" y1="195" x2="560" y2="195" stroke={good} strokeWidth="2.5" markerEnd="url(#arrowGreen)" />
            {/* 标签 */}
            <rect x="260" y="168" width="250" height="52" rx="8" fill={good} fillOpacity="0.06" stroke={good} strokeWidth="1" />
            <text x="385" y="188" fontSize="12" fontWeight="700" fill={good} textAnchor="middle">
              ① 转换构造函数
            </text>
            <text x="385" y="206" fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">
              SalesData(double price)  // 非 explicit
            </text>
          </g>

          {/* ── 路径 ②：explicit 转换构造 ── */}
          <g>
            <line x1="210" y1="260" x2="560" y2="260" stroke={explicitColor} strokeWidth="2.5" strokeDasharray="8 3" markerEnd="url(#arrowWarn)" />
            <rect x="260" y="280" width="250" height="40" rx="8" fill={explicitColor} fillOpacity="0.06" stroke={explicitColor} strokeWidth="1" />
            <text x="385" y="300" fontSize="11" fontWeight="700" fill={explicitColor} textAnchor="middle">
              ② explicit 转换构造（加 explicit 防隐式）
            </text>
            <text x="385" y="316" fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">
              必须显式写 SmallInt si(num); / static_cast
            </text>
          </g>

          {/* ── 路径 ③：类型转换运算符（类→内置）── */}
          <g>
            <line x1="560" y1="350" x2="210" y2="350" stroke={accent} strokeWidth="2.5" markerEnd="url(#arrowAccentReverse)" />
            <rect x="260" y="370" width="250" height="52" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" />
            <text x="385" y="390" fontSize="12" fontWeight="700" fill={accent} textAnchor="middle">
              ③ 类型转换运算符
            </text>
            <text x="385" y="408" fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">
              operator double() const;  // 类→double
            </text>
          </g>

          {/* 关键词标注 */}
          <g transform="translate(40, 56)">
            <rect x="0" y="0" width={w - 80} height="40" rx="8" fill={accent} fillOpacity="0.05" stroke={border} />
            <text x={cx - 50} y="16" fontSize="11" fontWeight="600" fill={accent} fontFamily="monospace">
              explicit operator bool()
            </text>
            <text x={cx - 50} y="32" fontSize="10" fill={secondary}>
              必须显式转换 bool——防止隐式的条件判断混乱（if(obj) 可以，int x = obj; 不行）
            </text>
          </g>

          <defs>
            <marker id="arrowGreen" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
              <polygon points="0,1 8,4 0,7" fill={good} />
            </marker>
            <marker id="arrowWarn" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
              <polygon points="0,1 8,4 0,7" fill={explicitColor} />
            </marker>
            <marker id="arrowAccentReverse" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
              <polygon points="0,1 8,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        转换构造函数（非 explicit）支持隐式转换：内置类型 → 类类型。explicit 阻止隐式转换。类型转换运算符（operator int/double/bool）支持类类型 → 内置类型。explicit operator bool 在条件判断中仍可用，但禁止隐式转为 int。
      </figcaption>
    </figure>
  );
}
