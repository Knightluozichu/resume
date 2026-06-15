/**
 * <CValuePassingDiagram>：C 语言值传递示意图（形参副本 vs 实参原变量）。
 *
 * 四步：① 调用前实参 ② 拷贝到形参 ③ 函数内改形参 ④ 返回后实参不变
 * 支持 step prop (1-4)。
 */

interface CValuePassingDiagramProps {
  step?: 1 | 2 | 3 | 4;
}

export function CValuePassingDiagram({ step = 4 }: CValuePassingDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  const callerX = 48;
  const calleeX = 360;
  const boxW = 220;
  const memY = 100;

  const highlight = (s: number) => (step === s ? 1 : step > s ? 0.7 : 0.35);

  const callerVal = 5;
  const paramVal = step >= 3 ? 99 : 5;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="C 值传递：形参是实参的独立副本，修改形参不影响调用方的原变量"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            C 值传递：void try_change(int n)
          </text>

          <g opacity={highlight(1)}>
            <text x={callerX} y={56} fontSize="13" fontWeight="700" fill={primary}>
              调用方 main()
            </text>
            <rect x={callerX} y={memY} width={boxW} height={100} rx="10" fill={bg} stroke={step <= 2 ? accent : border} strokeWidth={step <= 2 ? 2 : 1.5} />
            <text x={callerX + 16} y={memY + 28} fontSize="12" fill={secondary} fontFamily="monospace">
              int num = 5;
            </text>
            <rect x={callerX + 16} y={memY + 40} width={boxW - 32} height={44} rx="6" fill={accent} opacity={0.12} stroke={accent} strokeWidth="1.5" />
            <text x={callerX + 24} y={memY + 58} fontSize="11" fill={secondary} fontFamily="monospace">
              num
            </text>
            <text x={callerX + 80} y={memY + 68} fontSize="14" fontWeight="700" fill={primary} fontFamily="monospace">
              {callerVal}
            </text>
            <text x={callerX + 140} y={memY + 58} fontSize="9" fill={secondary} fontFamily="monospace">
              0x100
            </text>
            {step >= 2 && step < 4 && (
              <text x={callerX + 16} y={memY + 92} fontSize="11" fill={secondary} fontFamily="monospace">
                try_change(num);
              </text>
            )}
            {step === 4 && (
              <text x={callerX + 16} y={memY + 92} fontSize="11" fontWeight="600" fill={accent} fontFamily="monospace">
                返回后 num 仍是 5
              </text>
            )}
          </g>

          <g opacity={step >= 2 ? highlight(Math.max(2, step)) : 0.3}>
            <text x={calleeX} y={56} fontSize="13" fontWeight="700" fill={primary}>
              被调函数 try_change()
            </text>
            <rect x={calleeX} y={memY} width={boxW} height={100} rx="10" fill={bg} stroke={step >= 2 ? accent : border} strokeWidth={step >= 2 && step <= 3 ? 2 : 1.5} />
            <text x={calleeX + 16} y={memY + 28} fontSize="12" fill={secondary} fontFamily="monospace">
              void try_change(int n)
            </text>
            <rect x={calleeX + 16} y={memY + 40} width={boxW - 32} height={44} rx="6" fill={accent} opacity={step === 3 ? 0.2 : 0.1} stroke={accent} strokeWidth="1.5" />
            <text x={calleeX + 24} y={memY + 58} fontSize="11" fill={secondary} fontFamily="monospace">
              形参 n（副本）
            </text>
            <text x={calleeX + 120} y={memY + 68} fontSize="14" fontWeight="700" fill={step === 3 ? accent : primary} fontFamily="monospace">
              {paramVal}
            </text>
            <text x={calleeX + 170} y={memY + 58} fontSize="9" fill={secondary} fontFamily="monospace">
              0x200
            </text>
            {step === 3 && (
              <text x={calleeX + 16} y={memY + 92} fontSize="11" fill={accent} fontFamily="monospace">
                n = 99; /* 只改副本 */
              </text>
            )}
          </g>

          <g opacity={step === 2 ? 1 : step > 2 ? 0.5 : 0.25}>
            <path d="M 280 150 L 340 150" stroke={accent} strokeWidth="2" markerEnd="url(#cPassArrow)" />
            <text x={310} y={138} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>
              拷贝值 5
            </text>
          </g>

          <text x={24} y={230} fontSize="13" fontWeight="700" fill={accent}>
            {step === 1 && "① 调用前：num 在 main 的栈帧里"}
            {step === 2 && "② 调用时：把 num 的值拷贝给形参 n"}
            {step === 3 && "③ 函数内：修改 n 只动 0x200 的副本"}
            {step === 4 && "④ 返回后：num 仍是 5，与 n 无关"}
          </text>
          <text x={24} y={252} fontSize="11" fill={secondary}>
            C 对 int/double/struct 等一律值传递——形参是实参值的副本，两块独立内存。
          </text>

          <rect x={24} y={268} width={592} height={56} rx="8" fill={bg} stroke={border} strokeWidth="1" />
          <text x={40} y={290} fontSize="11" fontFamily="monospace" fill={primary}>
            void try_change(int n) {"{"} n = 99; {"}"}   int num = 5; try_change(num);  // num 还是 5
          </text>
          <text x={40} y={310} fontSize="10" fill={accent}>
            要让函数改调用方的变量，需传指针（下一章）或 return 新值
          </text>

          <defs>
            <marker id="cPassArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        值传递在栈上为形参开辟新内存并拷贝实参的值。函数内改形参不会回写 main 里的原变量。
      </figcaption>
    </figure>
  );
}
