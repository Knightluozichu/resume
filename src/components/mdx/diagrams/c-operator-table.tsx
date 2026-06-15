/**
 * <COperatorTable>：C语言运算符速查表——算术/关系/逻辑/赋值/自增自减/优先级/结合律。
 *
 * 表格分四大类展示 C 语言主要运算符：算术、关系与逻辑、赋值与自增自减、优先级速查。
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

export function COperatorTable() {
  const marginL = 24;
  const marginR = 24;
  const w = 640;

  // 表格参数
  const colX = [marginL, 182, 340, 472];
  const colW = [156, 156, 130, 110];
  const rowH = 28;
  const headerY = 50;
  const header2Y = 82;

  const cats = [
    {
      title: "算术运算符",
      rows: [
        { op: "+", meaning: "加法/正号", example: "a + b, +a", prec: "低", assoc: "左→右" },
        { op: "-", meaning: "减法/负号", example: "a - b, -a", prec: "低", assoc: "左→右" },
        { op: "*", meaning: "乘法", example: "a * b", prec: "低", assoc: "左→右" },
        { op: "/", meaning: "除法", example: "a / b", prec: "低", assoc: "左→右" },
        { op: "%", meaning: "求余(模运算)", example: "a % b", prec: "低", assoc: "左→右" },
      ],
    },
    {
      title: "关系与逻辑运算符",
      rows: [
        { op: "< > <= >=", meaning: "大小关系比较", example: "a < b", prec: "中", assoc: "左→右" },
        { op: "== !=", meaning: "相等/不等", example: "a == b", prec: "中", assoc: "左→右" },
        { op: "&&", meaning: "逻辑与（AND）", example: "a && b", prec: "低", assoc: "左→右" },
        { op: "||", meaning: "逻辑或（OR）", example: "a || b", prec: "低", assoc: "左→右" },
        { op: "!", meaning: "逻辑非（NOT）", example: "!a", prec: "高(一元)", assoc: "右→左" },
      ],
    },
    {
      title: "赋值与自增自减运算符",
      rows: [
        { op: "=", meaning: "简单赋值", example: "a = 5", prec: "最低", assoc: "右→左" },
        { op: "+= -= *= /=", meaning: "复合赋值", example: "a += 3", prec: "最低", assoc: "右→左" },
        { op: "++i (前缀)", meaning: "先加后用", example: "b = ++a", prec: "高(一元)", assoc: "右→左" },
        { op: "i++ (后缀)", meaning: "先用后加", example: "b = a++", prec: "高(一元)", assoc: "右→左" },
        { op: "--i / i--", meaning: "自减（前缀/后缀）", example: "b = --a", prec: "高(一元)", assoc: "右→左" },
      ],
    },
  ];

  const totalH = 50 + 30 + cats.reduce((s, c) => s + 30 + c.rows.length * rowH + 16, 0) + 60;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3">
        <svg
          viewBox={`0 0 ${w} ${totalH}`}
          role="img"
          aria-label="C语言运算符速查表：算术、关系、逻辑、赋值与自增自减运算符以及优先级规则"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* 标题 */}
          <text x={marginL} y={30} fontSize="17" fontWeight="700" fill="var(--text-primary)" fontFamily="system-ui">
            C语言运算符速查表
          </text>

          {(() => {
            const elements: React.ReactNode[] = [];
            let curY = 68;

            cats.forEach((cat, ci) => {
              // 分类标题行（accent 背景条）
              elements.push(
                <rect key={`cat-bg-${ci}`} x={marginL} y={curY - rowH + 2} width={w - marginL - marginR} height={rowH - 2} rx="4" fill="var(--accent)" opacity="0.1" />,
              );
              elements.push(
                <text key={`cat-t-${ci}`} x={marginL + 10} y={curY - 2} fontSize="13" fontWeight="700" fill="var(--accent)" fontFamily="system-ui">
                  {cat.title}
                </text>,
              );

              curY += rowH - 4;

              // 表头
              const headers = ["运算符", "含义", "示例", "优先级"];
              headers.forEach((h, hi) => {
                elements.push(
                  <text key={`hdr-${ci}-${hi}`} x={colX[hi] + 8} y={curY + 18} fontSize="11" fontWeight="600" fill="var(--text-secondary)" fontFamily="system-ui" textAnchor="start">
                    {h}
                  </text>,
                );
              });

              // 分隔线
              elements.push(
                <line key={`sep-${ci}`} x1={marginL} y1={curY + 28} x2={w - marginR} y2={curY + 28} stroke="var(--border)" strokeWidth="1" />,
              );

              curY += rowH;

              // 表格行
              cat.rows.forEach((row, ri) => {
                const rowY = curY + ri * rowH;
                if (ri % 2 === 0) {
                  elements.push(
                    <rect key={`rowbg-${ci}-${ri}`} x={marginL} y={rowY + 1} width={w - marginL - marginR} height={rowH - 2} rx="3" fill="var(--bg)" opacity="0.5" />,
                  );
                }
                elements.push(
                  <text key={`row-${ci}-${ri}-a`} x={colX[0] + 8} y={rowY + 19} fontSize="11" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace" textAnchor="start">{row.op}</text>,
                );
                elements.push(
                  <text key={`row-${ci}-${ri}-b`} x={colX[1] + 8} y={rowY + 19} fontSize="11" fill="var(--text-secondary)" fontFamily="system-ui" textAnchor="start">{row.meaning}</text>,
                );
                elements.push(
                  <text key={`row-${ci}-${ri}-c`} x={colX[2] + 8} y={rowY + 19} fontSize="11" fill="var(--text-secondary)" fontFamily="monospace" textAnchor="start">{row.example}</text>,
                );
                elements.push(
                  <text key={`row-${ci}-${ri}-d`} x={colX[3] + 8} y={rowY + 19} fontSize="11" fill="var(--text-secondary)" fontFamily="system-ui" textAnchor="start">{row.prec}</text>,
                );
              });

              curY += cat.rows.length * rowH + 16;
            });

            // 优先级总结
            const noteY = curY - 4;
            elements.push(
              <text key="note" x={marginL + 4} y={noteY} fontSize="11" fill="var(--accent)" fontFamily="system-ui">
                优先级越高越先算；同级看结合律方向。一元运算符（++/--/!）优先于二元运算符。赋值（=）优先级最低。
              </text>,
            );

            return elements;
          })()}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C语言常用运算符的完整分类速查。整本书的重点不是死记优先级，而是通过括号显式控制求值顺序。
      </figcaption>
    </figure>
  );
}
