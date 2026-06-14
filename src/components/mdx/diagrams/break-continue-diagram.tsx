/**
 * <BreakContinueDiagram>：循环体中 break vs continue 的语义对比图。
 *
 * 上半部分展示 break——直接跳出整个循环；下半部分展示 continue——跳过本轮剩余代码、进入下一轮迭代。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */

export function BreakContinueDiagram() {
  const cx = 320;
  const marginL = 36;

  // 上半部分：break
  const bTopY = 28;
  const bBoxTop = bTopY + 26;
  const bBoxH = 38;
  const bStepW = 140;
  const bStepH = 38;

  const bStepY = bBoxTop + bBoxH + 18;
  const bStep1x = 96;
  const bStep2x = 260;
  const bStep3x = 424;
  const bStepMid = (y: number) => y + bStepH / 2;

  const bEndY = bStepY + bStepH + 42;

  // 下半部分：continue
  const cTopY = bEndY + 40;
  const cBoxTop = cTopY + 26;
  const cBoxH = 38;
  const cStepY = cBoxTop + cBoxH + 18;
  const cEndY = cStepY + bStepH + 56;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 480"
          role="img"
          aria-label="循环体中 break 跳出整个循环 vs continue 跳到下一轮的语义对比图"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ═══════ 上半部分：break ═══════ */}
          <text x={marginL + 6} y={bTopY} fontSize="16" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            break —— 直接跳出整个循环
          </text>

          {/* 循环入口框 */}
          <rect x={cx - 100} y={bBoxTop} width={200} height={bBoxH} rx="8" fill="var(--accent)" opacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x={cx} y={bBoxTop + bBoxH / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            for (int i = 0; i &lt; 10; i++)
          </text>

          {/* 三个步骤 */}
          {/* 步骤 1: 正常迭代 */}
          <rect x={bStep1x - 64} y={bStepY} width={128} height={bStepH} rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={bStep1x} y={bStepMid(bStepY) + 5} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
            i=0..2 正常执行
          </text>

          {/* 步骤 2: 遇到 break */}
          <rect x={bStep2x - 64} y={bStepY} width={128} height={bStepH} rx="6" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="2" />
          <text x={bStep2x} y={bStepMid(bStepY) + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            i=3 遇到 break
          </text>

          {/* 步骤 3: 已跳出 */}
          <rect x={bStep3x - 64} y={bStepY} width={128} height={bStepH} rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="5 3" />
          <text x={bStep3x} y={bStepMid(bStepY) + 5} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-secondary)" fontFamily="monospace">
            i=4..9 不再执行
          </text>

          {/* 箭头 */}
          <text x={bStep1x + 64 + 14} y={bStepMid(bStepY) + 5} textAnchor="middle" fontSize="16" fill="var(--border)">→</text>
          <text x={bStep2x + 64 + 14} y={bStepMid(bStepY) + 5} textAnchor="middle" fontSize="16" fill="var(--accent)" fontWeight="700">→</text>

          {/* break 箭头：从步骤 2 往下拐到结束 */}
          <line x1={bStep2x} y1={bStepY + bStepH} x2={bStep2x} y2={bEndY - 8} stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrowHeadAccent)" />

          {/* 跳出的说明 */}
          <text x={bStep2x} y={bEndY + 16} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            break —— 跳出循环体
          </text>

          {/* 底部：循环后的代码 */}
          <rect x={bStep1x - 64} y={bEndY - 28} width={128} height={24} rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x={bStep1x} y={bEndY - 28 + 17} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
            循环之后的代码
          </text>

          {/* ═══════ 分隔线 ═══════ */}
          <line x1={marginL} y1={bEndY + 40} x2={640 - marginL} y2={bEndY + 40} stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />

          {/* ═══════ 下半部分：continue ═══════ */}
          <text x={marginL + 6} y={cTopY} fontSize="16" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            continue —— 跳过本轮剩余代码，立即开始下一轮
          </text>

          <rect x={cx - 100} y={cBoxTop} width={200} height={cBoxH} rx="8" fill="var(--bg)" stroke="var(--text-primary)" strokeWidth="2" />
          <text x={cx} y={cBoxTop + cBoxH / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            for (int i = 0; i &lt; 5; i++)
          </text>

          {/* continue 的每一步 */}
          {/* 步骤 1 */}
          <rect x={bStep1x - 64} y={cStepY} width={128} height={bStepH} rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={bStep1x} y={bStepMid(cStepY) + 5} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
            i=0..2 正常执行
          </text>

          {/* 步骤 2: 遇到 continue */}
          <rect x={bStep2x - 64} y={cStepY} width={128} height={bStepH} rx="6" fill="var(--accent)" opacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x={bStep2x} y={bStepMid(cStepY) + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            i=3 遇 continue
          </text>

          {/* 步骤 3: 跳到下一轮 */}
          <rect x={bStep3x - 64} y={cStepY} width={128} height={bStepH} rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={bStep3x} y={bStepMid(cStepY) + 5} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
            i=4 继续执行
          </text>

          {/* 箭头 */}
          <text x={bStep1x + 64 + 14} y={bStepMid(cStepY) + 5} textAnchor="middle" fontSize="16" fill="var(--border)">→</text>
          <text x={bStep2x + 64 + 14} y={bStepMid(cStepY) + 5} textAnchor="middle" fontSize="16" fill="var(--accent)" fontWeight="700">→</text>

          {/* continue 箭头：从步骤 2 往上绕到步骤 0（回到循环开头） */}
          <line x1={bStep2x} y1={cStepY} x2={bStep2x} y2={cBoxTop + cBoxH / 2} stroke="var(--accent)" strokeWidth="2" />
          <line x1={bStep2x} y1={cBoxTop + cBoxH / 2} x2={bStep1x} y2={cBoxTop + cBoxH / 2} stroke="var(--accent)" strokeWidth="2" />
          <line x1={bStep1x} y1={cBoxTop + cBoxH / 2} x2={bStep1x} y2={cBoxTop + cBoxH + 32} stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrowHeadAccent)" />

          {/* 说明 */}
          <text x={bStep2x} y={cEndY - 18} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            continue —— 回到循环体顶部
          </text>

          {/* continue 步骤下的说明 */}
          <text x={bStep1x} y={cStepY + bStepH + 18} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每次都跑</text>
          <text x={bStep2x} y={cStepY + bStepH + 18} textAnchor="middle" fontSize="10" fill="var(--accent)">跳过本轮剩余</text>
          <text x={bStep3x} y={cStepY + bStepH + 18} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">接着跑</text>

          {/* ── 底部总结 ── */}
          <text x={marginL} y={466} fontSize="13" fontWeight="600" fill="var(--accent)" fontFamily="monospace">
            break = 永久退出（循环就此结束）      continue = 跳过本轮（下一轮照常执行）
          </text>

          <defs>
            <marker id="arrowHeadAccent" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        `break` 一刀切断循环——之后的所有迭代永不执行；`continue` 只跳过当前这一轮循环体的剩余代码，循环本身继续跑下一轮。
      </figcaption>
    </figure>
  );
}
