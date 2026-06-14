/**
 * <OperatorOverloadTable>：常用运算符重载方式速查表。
 *
 * 展示常用运算符的建议实现方式（成员/非成员）、返回值类型、参数个数。
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */
export function OperatorOverloadTable() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";
  const purple = "rgb(124,92,255)";

  const w = 820;
  const h = 520;
  const cx = w / 2;

  const colW = [220, 170, 200, 210];
  const colX = [0, 220, 390, 590];
  const headerY = 40;
  const rowH = 36;
  const startY = 76;

  const rows = [
    { op: "operator<", impl: "成员函数", ret: "std::ostream&", param: "(std::ostream&, const T&)" },
    { op: "operator>>", impl: "成员函数", ret: "std::istream&", param: "(std::istream&, T&)" },
    { op: "operator+", impl: "非成员", ret: "T", param: "(const T&, const T&)" },
    { op: "operator-", impl: "非成员", ret: "T", param: "(const T&, const T&)" },
    { op: "operator==", impl: "非成员", ret: "bool", param: "(const T&, const T&)" },
    { op: "operator<", impl: "非成员", ret: "bool", param: "(const T&, const T&)" },
    { op: "operator=", impl: "成员（必须）", ret: "T&", param: "(const T&)" },
    { op: "operator+=", impl: "成员", ret: "T&", param: "(const T&)" },
    { op: "operator[]", impl: "成员（必须）", ret: "Elem&", param: "(std::size_t n)" },
    { op: "operator++", impl: "成员", ret: "T& / T", param: "() / (int)" },
    { op: "operator()", impl: "成员（必须）", ret: "任意", param: "(Args...)" },
    { op: "operator bool", impl: "成员", ret: "bool", param: "() const" },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="常用运算符重载方式速查表：运算符、实现方式、返回值、参数"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x={cx} y="24" fontSize="15" fontWeight="700" fill={primary} textAnchor="middle">
            常用运算符重载方式速查表
          </text>

          {/* 表头 */}
          {["运算符", "实现方式", "返回值", "参数"].map((t, i) => (
            <g key={t}>
              <rect x={colX[i]} y={headerY} width={colW[i] - 1} height={28} rx="4" fill={accent} fillOpacity="0.15" />
              <text x={colX[i] + 14} y={headerY + 19} fontSize="11" fontWeight="700" fill={accent} fontFamily="monospace">
                {t}
              </text>
            </g>
          ))}

          {/* 数据行 */}
          {rows.map((r, ri) => {
            const y = startY + ri * rowH;
            const isEven = ri % 2 === 0;
            return (
              <g key={`${r.op}-${ri}`}>
                {isEven && (
                  <rect x={0} y={y} width={colX[3] + colW[3]} height={rowH} rx="2" fill={border} fillOpacity="0.15" />
                )}
                <text x={colX[0] + 14} y={y + 22} fontSize="12" fontWeight="700" fill={good} fontFamily="monospace">
                  {r.op}
                </text>
                <text x={colX[1] + 14} y={y + 22} fontSize="11" fill={primary} fontFamily="monospace">
                  {r.impl.includes("必须") ? (
                    <>
                      <tspan fill={warn}>{r.impl}</tspan>
                    </>
                  ) : (
                    r.impl
                  )}
                </text>
                <text x={colX[2] + 14} y={y + 22} fontSize="11" fill={purple} fontFamily="monospace">
                  {r.ret}
                </text>
                <text x={colX[3] + 14} y={y + 22} fontSize="11" fill={secondary} fontFamily="monospace">
                  {r.param}
                </text>
              </g>
            );
          })}

          {/* 底部说明 */}
          <rect x={0} y={startY + rows.length * rowH + 18} width={w} height={64} rx="8" fill={accent} fillOpacity="0.05" stroke={border} />
          <text x={14} y={startY + rows.length * rowH + 42} fontSize="11" fill={secondary}>
            ⚠ 赋值 `=`、下标 `[]`、调用 `()`、箭头 `-&gt;` 必须是成员函数——不能重载为非成员。
          </text>
          <text x={14} y={startY + rows.length * rowH + 60} fontSize="11" fill={secondary}>
            💡 算术/关系运算符推荐非成员——支持隐式转换两个操作数；复合赋值 `+=` 推荐成员——返回 `*this` 支持链式。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        常用运算符推荐实现方式：赋值/下标/调用/箭头必须是成员函数；输入输出必须是非成员；算术/关系推荐非成员以支持双侧隐式转换；复合赋值推荐成员返回 *this 以支持链式。
      </figcaption>
    </figure>
  );
}
