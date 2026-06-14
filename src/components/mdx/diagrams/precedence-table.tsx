/**
 * <PrecedenceTable>：C++ 运算符优先级速查表（SVG 表格）。
 *
 * 按优先级从高到低列出常用运算符，分 4 组（后缀/一元、乘除取余、加减、移位/关系/赋值/逗号），
 * 标注结合律方向（左结合 ← 或右结合 →）。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */

interface OpRow {
  precedence: string;
  operators: string;
  name: string;
  associativity: string;
  highlight?: boolean;
}

export function PrecedenceTable() {
  const rows: OpRow[] = [
    { precedence: "最高", operators: "()  []  .  ->", name: "函数/下标/成员", associativity: "左 ←" },
    { precedence: "", operators: "++  --  +  -  !  ~  &  *  (type)", name: "一元（后缀/前缀）", associativity: "右 →", highlight: true },
    { precedence: "", operators: "*  /  %", name: "乘除取余", associativity: "左 ←", highlight: true },
    { precedence: "", operators: "+  -", name: "加减", associativity: "左 ←", highlight: true },
    { precedence: "", operators: "<<  >>", name: "移位", associativity: "左 ←" },
    { precedence: "", operators: "<  <=  >  >=", name: "关系比较", associativity: "左 ←" },
    { precedence: "", operators: "==  !=", name: "相等比较", associativity: "左 ←" },
    { precedence: "", operators: "&&", name: "逻辑与", associativity: "左 ←", highlight: true },
    { precedence: "", operators: "||", name: "逻辑或", associativity: "左 ←", highlight: true },
    { precedence: "", operators: "=  +=  -=  *=  /=  %=", name: "赋值", associativity: "右 →", highlight: true },
    { precedence: "最低", operators: ",", name: "逗号", associativity: "左 ←" },
  ];

  const colX = { prec: 52, op: 130, name: 360, assoc: 490 };
  const startY = 64;
  const rowH = 32;
  const headerY = 38;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 580 460"
          role="img"
          aria-label="C++ 运算符优先级速查表，从高到低列出常用运算符、名称和结合律方向"
          className="mx-auto block h-auto w-full max-w-[580px]"
        >
          {/* 表头背景 */}
          <rect x="20" y={headerY - 16} width="540" height="26" rx="4" fill="var(--accent)" opacity="0.15" />

          <text x={colX.prec} y={headerY + 4} fontSize="11" fontWeight="700" fill="var(--accent)" textAnchor="middle">优先级</text>
          <text x={colX.op + 110} y={headerY + 4} fontSize="11" fontWeight="700" fill="var(--accent)" textAnchor="middle">运算符</text>
          <text x={colX.name + 50} y={headerY + 4} fontSize="11" fontWeight="700" fill="var(--accent)" textAnchor="middle">含义</text>
          <text x={colX.assoc} y={headerY + 4} fontSize="11" fontWeight="700" fill="var(--accent)" textAnchor="middle">结合律</text>

          {/* 数据行 */}
          {rows.map((r, i) => {
            const y = startY + i * rowH;
            const isHi = r.highlight;
            const rowBg = isHi ? "var(--accent)" : (i % 2 === 0 ? "var(--bg)" : "var(--bg-elevated)");
            const rowOpacity = isHi ? "0.08" : "1";
            const textFill = isHi ? "var(--accent)" : "var(--text-primary)";
            const secFill = isHi ? "var(--accent)" : "var(--text-secondary)";

            return (
              <g key={`${r.operators}-${i}`}>
                <rect
                  x="20" y={y - 12} width="540" height={rowH - 4} rx="4"
                  fill={rowBg} opacity={rowOpacity}
                />

                <text x={colX.prec} y={y + 5} textAnchor="middle" fontSize="12" fontWeight={isHi ? 700 : 500} fill={textFill}>
                  {r.precedence}
                </text>

                <text
                  x={colX.op + 110} y={y + 5} textAnchor="middle"
                  fontSize="13" fontWeight="600"
                  fill={textFill} fontFamily="monospace"
                >
                  {r.operators}
                </text>

                <text x={colX.name + 50} y={y + 5} textAnchor="middle" fontSize="12" fill={secFill}>
                  {r.name}
                </text>

                <text x={colX.assoc} y={y + 5} textAnchor="middle" fontSize="12" fontWeight={isHi ? 600 : 500} fill={textFill} fontFamily="monospace">
                  {r.associativity}
                </text>
              </g>
            );
          })}

          {/* 底部记忆口诀 */}
          <text x="300" y={startY + rows.length * rowH + 24} textAnchor="middle" fontSize="12" fill="var(--accent)">
            记忆口诀：乘除→加减，同级左结合。赋值最低，逗号垫底。+ + * * 注意结合方向！
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        上表按优先级从高到低排列。同级运算符按结合律方向执行。标紫行的运算符是日常使用频率最高的。
      </figcaption>
    </figure>
  );
}
