/**
 * <ParameterPassingDiagram>：值传递 vs 引用传递 内存布局对比图。
 *
 * 左侧展示值传递——形参是实参的独立副本，修改形参不影响实参；
 * 右侧展示引用传递——形参是实参的别名，修改形参直接改实参。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 *
 * 可选 step (1-4)：C 语言值传递分步示意（单栏）。无 step 时展示 C++ 值传递 vs 引用传递对比。
 */

import { CValuePassingDiagram } from "./c-value-passing-diagram";

interface ParameterPassingDiagramProps {
  step?: 1 | 2 | 3 | 4;
}

export function ParameterPassingDiagram({ step }: ParameterPassingDiagramProps) {
  if (step !== undefined) {
    return <CValuePassingDiagram step={step} />;
  }
  const marginL = 20;
  const midX = 320;

  // 上半部分：内存布局
  const memTop = 42;
  const memBlockW = 240;
  const memBlockH = 160;

  // 值传递框
  const valX = marginL;
  // 引用传递框
  const refX = midX + 20;

  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 440"
          role="img"
          aria-label="值传递（拷贝）与引用传递（别名）的内存布局对比图：左侧值传递中实参和形参是两块独立内存，右侧引用传递中形参和实参指向同一块内存"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ═══════ 标题 ═══════ */}
          <text x={valX + memBlockW / 2} y={28} textAnchor="middle" fontSize="17" fontWeight="700" fill={accent} fontFamily="monospace">
            值传递（void f(int x)）
          </text>
          <text x={refX + memBlockW / 2} y={28} textAnchor="middle" fontSize="17" fontWeight="700" fill={primary} fontFamily="monospace">
            引用传递（void g(int &x)）
          </text>

          {/* ═══════ 值传递：内存块 ═══════ */}
          <rect x={valX} y={memTop} width={memBlockW} height={memBlockH} rx="10" fill={bg} stroke={accent} strokeWidth="2" />

          {/* 实参 a */}
          <rect x={valX + 24} y={memTop + 20} width={190} height={40} rx="6" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={valX + 32} y={memTop + 39} fontSize="12" fill={secondary} fontFamily="monospace">int a = 5;</text>
          <text x={valX + 140} y={memTop + 39} fontSize="12" fontWeight="700" fill={primary} fontFamily="monospace">a: 5</text>

          {/* 实参内存地址标注 */}
          <text x={valX + 190} y={memTop + 32} fontSize="9" fill={secondary} fontFamily="monospace">0x100</text>

          {/* 分隔 */}
          <line x1={valX + 24} y1={memTop + 74} x2={valX + memBlockW - 24} y2={memTop + 74} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 形参 x */}
          <rect x={valX + 24} y={memTop + 84} width={190} height={40} rx="6" fill={accent} opacity={0.12} stroke={accent} strokeWidth="1.5" />
          <text x={valX + 32} y={memTop + 103} fontSize="12" fill={secondary} fontFamily="monospace">int x = a;</text>
          <text x={valX + 140} y={memTop + 103} fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">x: 5</text>

          {/* 形参内存地址标注 */}
          <text x={valX + 190} y={memTop + 96} fontSize="9" fill={secondary} fontFamily="monospace">0x200</text>

          {/* 拷贝箭头 */}
          <text x={valX + 14} y={memTop + 82} fontSize="18" fill={accent}>⬇</text>
          <text x={valX + 8} y={memTop + 68} fontSize="9" fill={accent}>拷贝</text>

          {/* 结论 */}
          <text x={valX + memBlockW / 2} y={memTop + 150} textAnchor="middle" fontSize="12" fontWeight="600" fill={accent} fontFamily="monospace">
            修改 x 不会影响 a —— 两块独立内存
          </text>

          {/* ═══════ 引用传递：内存块 ═══════ */}
          <rect x={refX} y={memTop} width={memBlockW} height={memBlockH} rx="10" fill={bg} stroke={primary} strokeWidth="2" />

          {/* 实参 a */}
          <rect x={refX + 24} y={memTop + 20} width={190} height={40} rx="6" fill={accent} opacity={0.15} stroke={accent} strokeWidth="2" />
          <text x={refX + 32} y={memTop + 39} fontSize="12" fill={secondary} fontFamily="monospace">int a = 5;</text>
          <text x={refX + 140} y={memTop + 39} fontSize="12" fontWeight="700" fill={primary} fontFamily="monospace">a: 5</text>

          {/* 高亮一整块 */}
          <text x={refX + 14} y={memTop + 12} fontSize="10" fill={accent} fontWeight="700">同一块内存</text>

          {/* 形参 x：别名（虚线框指向同一地址） */}
          <rect x={refX + 24} y={memTop + 84} width={190} height={40} rx="6" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="5 3" />
          <text x={refX + 32} y={memTop + 103} fontSize="12" fill={secondary} fontFamily="monospace">int &x = a;</text>
          <text x={refX + 140} y={memTop + 103} fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">x: 5</text>

          {/* 别名标注 */}
          <text x={refX + 14} y={memTop + 109} fontSize="10" fill={accent}>别名</text>

          {/* 指向箭头 */}
          <path
            d={`M ${refX + 150} ${memTop + 84} L ${refX + 150} ${memTop + 62}`}
            stroke={accent}
            strokeWidth="2"
            markerEnd="url(#arrowHeadAccent)"
          />
          <text x={refX + 160} y={memTop + 68} fontSize="9" fill={accent}>引用</text>

          {/* 结论 */}
          <text x={refX + memBlockW / 2} y={memTop + 150} textAnchor="middle" fontSize="12" fontWeight="600" fill={accent} fontFamily="monospace">
            修改 x 直接改变 a —— 同一块内存
          </text>

          {/* ═══════ 下半部分：行为对比 ═══════ */}
          <line x1={marginL} y1={memTop + memBlockH + 32} x2={640 - marginL} y2={memTop + memBlockH + 32} stroke={border} strokeWidth="1" strokeDasharray="6 4" />

          <text x={marginL + 10} y={memTop + memBlockH + 58} fontSize="14" fontWeight="700" fill={primary}>
            行为对比
          </text>

          {/* 值传递例子 */}
          <rect x={marginL + 10} y={memTop + memBlockH + 70} width={295} height={96} rx="8" fill={bg} stroke={border} strokeWidth="1" />
          <text x={marginL + 24} y={memTop + memBlockH + 94} fontSize="12" fontWeight="700" fill={primary} fontFamily="monospace">
            void addOne(int x) {"{"} x = x + 1; {"}"}
          </text>
          <text x={marginL + 24} y={memTop + memBlockH + 118} fontSize="12" fill={secondary} fontFamily="monospace">
            int a = 5;
          </text>
          <text x={marginL + 24} y={memTop + memBlockH + 138} fontSize="12" fill={secondary} fontFamily="monospace">
            addOne(a);  // a 还是 5
          </text>
          <text x={marginL + 24} y={memTop + memBlockH + 156} fontSize="11" fontWeight="600" fill={accent} fontFamily="monospace">
            ✗ 无法修改实参
          </text>

          {/* 引用传递例子 */}
          <rect x={midX + 10} y={memTop + memBlockH + 70} width={295} height={96} rx="8" fill={bg} stroke={border} strokeWidth="1" />
          <text x={midX + 24} y={memTop + memBlockH + 94} fontSize="12" fontWeight="700" fill={primary} fontFamily="monospace">
            void addOne(int &x) {"{"} x = x + 1; {"}"}
          </text>
          <text x={midX + 24} y={memTop + memBlockH + 118} fontSize="12" fill={secondary} fontFamily="monospace">
            int a = 5;
          </text>
          <text x={midX + 24} y={memTop + memBlockH + 138} fontSize="12" fill={secondary} fontFamily="monospace">
            addOne(a);  // a 变成 6
          </text>
          <text x={midX + 24} y={memTop + memBlockH + 156} fontSize="11" fontWeight="600" fill={accent} fontFamily="monospace">
            ✓ 能修改实参
          </text>

          {/* 底部总结 */}
          <text x={marginL + 10} y={432} fontSize="12" fontWeight="600" fill={accent} fontFamily="monospace">
            const T& → "只读借阅，不拷贝"（传大对象必用） &nbsp;&nbsp; T& → "读写别名"（函数要改原值时用） &nbsp;&nbsp; T → "独立副本"（开销大）
          </text>

          <defs>
            <marker id="arrowHeadAccent" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        值传递在栈上开辟新内存拷贝实参——修改形参不会影响原变量。引用传递让形参直接「指向」实参的内存——修改形参就是修改原变量。
      </figcaption>
    </figure>
  );
}
