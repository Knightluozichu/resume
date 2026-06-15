/**
 * <MacroExpansionDiagram>：#define 文本替换示意（宏展开前后对照）。
 */

export function MacroExpansionDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 300"
          role="img"
          aria-label="#define 宏展开：源码中的标识符被替换成 replacement 文本"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            #define PI 3.14159
          </text>

          {/* 展开前 */}
          <rect x={24} y={48} width={280} height={100} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={36} y={72} fontSize="11" fontWeight="600" fill={secondary}>
            展开前（源码）
          </text>
          <text x={36} y={98} fontSize="12" fill={primary} fontFamily="monospace">
            double r = 2.0;
          </text>
          <text x={36} y={118} fontSize="12" fill={primary} fontFamily="monospace">
            double c = 2 *{" "}
            <tspan fill={accent} fontWeight="700">
              PI
            </tspan>{" "}
            * r;
          </text>

          {/* 箭头 */}
          <text x={320} y={108} textAnchor="middle" fontSize="22" fill={accent}>
            →
          </text>
          <text x={320} y={132} textAnchor="middle" fontSize="10" fill={secondary}>
            预处理器
          </text>
          <text x={320} y={146} textAnchor="middle" fontSize="10" fill={secondary}>
            纯文本替换
          </text>

          {/* 展开后 */}
          <rect x={360} y={48} width={256} height={100} rx="8" fill={bg} stroke={accent} strokeWidth="2" />
          <text x={372} y={72} fontSize="11" fontWeight="600" fill={accent}>
            展开后（.i 中可见）
          </text>
          <text x={372} y={98} fontSize="12" fill={primary} fontFamily="monospace">
            double r = 2.0;
          </text>
          <text x={372} y={118} fontSize="12" fill={primary} fontFamily="monospace">
            double c = 2 *{" "}
            <tspan fill={accent} fontWeight="700">
              3.14159
            </tspan>{" "}
            * r;
          </text>

          {/* 带参宏 */}
          <rect x={24} y={168} width={592} height={112} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={36} y={192} fontSize="11" fontWeight="600" fill={secondary}>
            带参宏同理
          </text>
          <text x={36} y={216} fontSize="12" fill={primary} fontFamily="monospace">
            #define SQUARE(x) ((x) * (x))
          </text>
          <text x={36} y={240} fontSize="12" fill={primary} fontFamily="monospace">
            int n = SQUARE(5); → int n = ((5) * (5));
          </text>
          <text x={36} y={264} fontSize="11" fill={secondary} fontFamily="system-ui">
            宏不是函数调用：没有类型检查，也不分配栈帧，只是「找词替换」。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        #define 把标识符替换成 replacement 文本；带参宏把实参文本代入形参位置。编译器看到的是展开后的结果。
      </figcaption>
    </figure>
  );
}
