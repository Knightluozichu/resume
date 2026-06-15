/**
 * <FunctionPrototypeDiagram>：函数声明 vs 定义 vs 调用关系图。
 *
 * 四步：① 原型声明 ② 函数定义 ③ 调用点 ④ 编译/链接把三者串起来
 * 支持 step prop (1-4)。
 */

interface FunctionPrototypeDiagramProps {
  step?: 1 | 2 | 3 | 4;
}

export function FunctionPrototypeDiagram({ step = 4 }: FunctionPrototypeDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  const isActive = (s: number) => step >= s;
  const highlight = (s: number) => (step === s ? 1 : isActive(s) ? 0.85 : 0.35);

  const protoX = 40;
  const defX = 40;
  const callX = 360;
  const boxW = 280;
  const boxH = 88;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 680 400"
          role="img"
          aria-label="函数原型声明、函数定义与调用点三者关系示意图"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            声明 · 定义 · 调用
          </text>

          {/* ① 原型声明 */}
          <g opacity={highlight(1)}>
            <rect x={protoX} y={48} width={boxW} height={boxH} rx="10" fill={bg} stroke={step === 1 ? accent : border} strokeWidth={step === 1 ? 2.5 : 1.5} />
            <text x={protoX + 16} y={72} fontSize="13" fontWeight="700" fill={step === 1 ? accent : primary}>
              ① 函数原型（声明）
            </text>
            <text x={protoX + 16} y={96} fontSize="12" fill={secondary} fontFamily="monospace">
              double cube(double x);
            </text>
            <text x={protoX + 16} y={118} fontSize="11" fill={secondary}>
              告诉编译器：名字、参数类型、返回类型
            </text>
          </g>

          {/* ② 函数定义 */}
          <g opacity={highlight(2)}>
            <rect x={defX} y={156} width={boxW} height={boxH + 24} rx="10" fill={bg} stroke={step === 2 ? accent : border} strokeWidth={step === 2 ? 2.5 : 1.5} />
            <text x={defX + 16} y={180} fontSize="13" fontWeight="700" fill={step === 2 ? accent : primary}>
              ② 函数定义
            </text>
            <text x={defX + 16} y={204} fontSize="12" fill={secondary} fontFamily="monospace">
              double cube(double x) {"{"}
            </text>
            <text x={defX + 28} y={224} fontSize="12" fill={secondary} fontFamily="monospace">
              return x * x * x;
            </text>
            <text x={defX + 16} y={244} fontSize="12" fill={secondary} fontFamily="monospace">
              {"}"}
            </text>
            <text x={defX + 16} y={266} fontSize="11" fill={secondary}>
              提供函数体——真正干活的代码
            </text>
          </g>

          {/* ③ 调用 */}
          <g opacity={highlight(3)}>
            <rect x={callX} y={48} width={boxW} height={boxH} rx="10" fill={bg} stroke={step === 3 ? accent : border} strokeWidth={step === 3 ? 2.5 : 1.5} />
            <text x={callX + 16} y={72} fontSize="13" fontWeight="700" fill={step === 3 ? accent : primary}>
              ③ 调用点（main 内）
            </text>
            <text x={callX + 16} y={96} fontSize="12" fill={secondary} fontFamily="monospace">
              double y = cube(2.0);
            </text>
            <text x={callX + 16} y={118} fontSize="11" fill={secondary}>
              用实参 2.0 触发 cube 执行
            </text>
          </g>

          {/* 连接线：声明 → 调用（编译期检查） */}
          <g opacity={step >= 3 ? 1 : 0.25}>
            <path
              d={`M ${protoX + boxW / 2} ${48 + boxH} L ${protoX + boxW / 2} 300 L ${callX + boxW / 2} 300 L ${callX + boxW / 2} ${48 + boxH}`}
              fill="none"
              stroke={accent}
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
            <text x={340} y={318} textAnchor="middle" fontSize="11" fill={accent}>
              编译器用原型检查调用是否类型匹配
            </text>
          </g>

          {/* 连接线：定义 → 链接 */}
          <g opacity={step >= 4 ? 1 : 0.25}>
            <path
              d={`M ${defX + boxW} ${156 + (boxH + 24) / 2} L ${callX - 20} ${156 + (boxH + 24) / 2}`}
              fill="none"
              stroke={accent}
              strokeWidth="2"
              markerEnd="url(#protoArrow)"
            />
            <text x={340} y={200} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>
              链接器把调用地址绑到定义
            </text>
          </g>

          {/* ④ 汇总 */}
          <g opacity={highlight(4)}>
            <rect x={40} y={332} width={600} height={52} rx="8" fill={accent} opacity={0.1} stroke={accent} strokeWidth="1.5" />
            <text x={56} y={354} fontSize="12" fontWeight="700" fill={accent}>
              ④ 一条调用链
            </text>
            <text x={56} y={374} fontSize="11" fill={primary}>
              声明让编译器认识 cube；定义提供实现；链接器把 main 里的 cube(2.0) 跳到定义处；返回后 y 得到 8.0
            </text>
          </g>

          <defs>
            <marker id="protoArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        原型是「名片」、定义是「车间」、调用是「下单」。编译期靠原型验类型，链接期把调用绑到真正的函数体。
      </figcaption>
    </figure>
  );
}
