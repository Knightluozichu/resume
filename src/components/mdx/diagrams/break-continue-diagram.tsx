/**
 * <BreakContinueDiagram>：循环体中 break vs continue 的语义对比图。
 *
 * 三步展示：① 正常迭代 ② break 跳出 ③ continue 跳过本轮
 * 支持 step prop (1-3)，默认 3 展示全流程。
 */

interface BreakContinueDiagramProps {
  step?: 1 | 2 | 3;
}

export function BreakContinueDiagram({ step = 3 }: BreakContinueDiagramProps) {
  const cx = 320;
  const marginL = 36;

  const bTopY = 28;
  const bBoxTop = bTopY + 26;
  const bBoxH = 38;
  const bStepH = 38;

  const bStepY = bBoxTop + bBoxH + 18;
  const bStep1x = 96;
  const bStep2x = 260;
  const bStep3x = 424;
  const bStepMid = (y: number) => y + bStepH / 2;

  const bEndY = bStepY + bStepH + 42;

  const cTopY = bEndY + 40;
  const cBoxTop = cTopY + 26;
  const cBoxH = 38;
  const cStepY = cBoxTop + cBoxH + 18;
  const cEndY = cStepY + bStepH + 56;

  const showBreak = step >= 2;
  const showContinue = step >= 3;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 480"
          role="img"
          aria-label="循环体中 break 跳出整个循环 vs continue 跳到下一轮的语义对比图"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={marginL + 6} y={bTopY} fontSize="16" fontWeight="700" fill={"var(--accent)"} fontFamily="monospace">
            break —— 直接跳出整个循环
          </text>

          <g opacity={step >= 1 ? 1 : 0.3}>
            <rect x={cx - 100} y={bBoxTop} width={200} height={bBoxH} rx="8" fill={"var(--accent)"} fillOpacity={0.12} stroke={"var(--accent)"} strokeWidth="2" />
            <text x={cx} y={bBoxTop + bBoxH / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={"var(--accent)"} fontFamily="monospace">
              for (int i = 0; i &lt; 10; i++)
            </text>

            <rect x={bStep1x - 64} y={bStepY} width={128} height={bStepH} rx="6" fill={"var(--bg)"} stroke={"var(--border)"} strokeWidth="1.5" />
            <text x={bStep1x} y={bStepMid(bStepY) + 5} textAnchor="middle" fontSize="13" fontWeight="600" fill={"var(--text-primary)"} fontFamily="monospace">
              ① i=0..2 正常
            </text>
          </g>

          <g opacity={showBreak ? 1 : 0.25}>
            <rect x={bStep2x - 64} y={bStepY} width={128} height={bStepH} rx="6" fill={"var(--accent)"} fillOpacity={0.15} stroke={"var(--accent)"} strokeWidth="2" />
            <text x={bStep2x} y={bStepMid(bStepY) + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={"var(--accent)"} fontFamily="monospace">
              ② i=3 break
            </text>

            <rect x={bStep3x - 64} y={bStepY} width={128} height={bStepH} rx="6" fill={"var(--bg)"} stroke={"var(--border)"} strokeWidth="1.5" strokeDasharray="5 3" />
            <text x={bStep3x} y={bStepMid(bStepY) + 5} textAnchor="middle" fontSize="12" fontWeight="600" fill={"var(--text-secondary)"} fontFamily="monospace">
              i=4..9 跳过
            </text>

            <text x={bStep1x + 64 + 14} y={bStepMid(bStepY) + 5} textAnchor="middle" fontSize="16" fill={"var(--border)"}>
              →
            </text>
            <text x={bStep2x + 64 + 14} y={bStepMid(bStepY) + 5} textAnchor="middle" fontSize="16" fill={"var(--accent)"} fontWeight="700">
              →
            </text>

            <line x1={bStep2x} y1={bStepY + bStepH} x2={bStep2x} y2={bEndY - 8} stroke={"var(--accent)"} strokeWidth="2" markerEnd="url(#bc-arrow)" />
            <text x={bStep2x} y={bEndY + 16} textAnchor="middle" fontSize="12" fontWeight="700" fill={"var(--accent)"} fontFamily="monospace">
              break —— 跳出循环体
            </text>
          </g>

          <rect x={bStep1x - 64} y={bEndY - 28} width={128} height={24} rx="4" fill={"var(--bg)"} stroke={"var(--border)"} strokeWidth="1" />
          <text x={bStep1x} y={bEndY - 28 + 17} textAnchor="middle" fontSize="11" fill={"var(--text-secondary)"} fontFamily="monospace">
            循环之后的代码
          </text>

          <line x1={marginL} y1={bEndY + 40} x2={640 - marginL} y2={bEndY + 40} stroke={"var(--border)"} strokeWidth="1" strokeDasharray="6 4" />

          <text x={marginL + 6} y={cTopY} fontSize="16" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
            continue —— 跳过本轮，进入下一轮
          </text>

          <g opacity={showContinue ? 1 : 0.25}>
            <rect x={cx - 100} y={cBoxTop} width={200} height={cBoxH} rx="8" fill={"var(--bg)"} stroke={"var(--text-primary)"} strokeWidth="2" />
            <text x={cx} y={cBoxTop + cBoxH / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
              for (int i = 0; i &lt; 5; i++)
            </text>

            <rect x={bStep1x - 64} y={cStepY} width={128} height={bStepH} rx="6" fill={"var(--bg)"} stroke={"var(--border)"} strokeWidth="1.5" />
            <text x={bStep1x} y={bStepMid(cStepY) + 5} textAnchor="middle" fontSize="13" fontWeight="600" fill={"var(--text-primary)"} fontFamily="monospace">
              i=0..2 正常
            </text>

            <rect x={bStep2x - 64} y={cStepY} width={128} height={bStepH} rx="6" fill={"var(--accent)"} fillOpacity={0.12} stroke={"var(--accent)"} strokeWidth="2" />
            <text x={bStep2x} y={bStepMid(cStepY) + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={"var(--accent)"} fontFamily="monospace">
              ③ i=3 continue
            </text>

            <rect x={bStep3x - 64} y={cStepY} width={128} height={bStepH} rx="6" fill={"var(--bg)"} stroke={"var(--border)"} strokeWidth="1.5" />
            <text x={bStep3x} y={bStepMid(cStepY) + 5} textAnchor="middle" fontSize="13" fontWeight="600" fill={"var(--text-primary)"} fontFamily="monospace">
              i=4 继续执行
            </text>

            <text x={bStep1x + 64 + 14} y={bStepMid(cStepY) + 5} textAnchor="middle" fontSize="16" fill={"var(--border)"}>
              →
            </text>
            <text x={bStep2x + 64 + 14} y={bStepMid(cStepY) + 5} textAnchor="middle" fontSize="16" fill={"var(--accent)"} fontWeight="700">
              →
            </text>

            <line x1={bStep2x} y1={cStepY} x2={bStep2x} y2={cBoxTop + cBoxH / 2} stroke={"var(--accent)"} strokeWidth="2" />
            <line x1={bStep2x} y1={cBoxTop + cBoxH / 2} x2={bStep1x} y2={cBoxTop + cBoxH / 2} stroke={"var(--accent)"} strokeWidth="2" />
            <line x1={bStep1x} y1={cBoxTop + cBoxH / 2} x2={bStep1x} y2={cBoxTop + cBoxH + 32} stroke={"var(--accent)"} strokeWidth="2" markerEnd="url(#bc-arrow)" />

            <text x={bStep2x} y={cEndY - 18} textAnchor="middle" fontSize="12" fontWeight="700" fill={"var(--accent)"} fontFamily="monospace">
              continue —— 回到循环体顶部
            </text>
          </g>

          <text x={marginL} y={466} fontSize="13" fontWeight="600" fill={"var(--accent)"} fontFamily="monospace">
            break = 永久退出      continue = 跳过本轮剩余代码
          </text>

          <defs>
            <marker id="bc-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={"var(--accent)"} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        break 一刀切断循环，之后的迭代永不执行；continue 只跳过当前这一轮循环体的剩余代码，循环本身继续跑下一轮。
      </figcaption>
    </figure>
  );
}
