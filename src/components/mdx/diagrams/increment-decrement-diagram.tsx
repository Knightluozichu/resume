/**
 * <IncrementDecrementDiagram>：`++i`（前缀）vs `i++`（后缀）的时序对比图。
 *
 * 用时间线方式对比两种写法在"先加还是先用"上的差异：
 * - `++i`：先自增 1，再用新值。
 * - `i++`：先用旧值，再自增。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */

export function IncrementDecrementDiagram() {
  const marginL = 40;
  const top1 = 68;
  const top2 = 210;
  const stepW = 160;

  // 三列的 x 中心
  const s1x = marginL + 110;
  const s2x = s1x + stepW;
  const s3x = s2x + stepW;
  const boxW = 120;
  const boxH = 36;

  const rowY = (t: number) => t + boxH / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 580 380"
          role="img"
          aria-label="++i（前缀递增）vs i++（后缀递增）的时序差异对比"
          className="mx-auto block h-auto w-full max-w-[580px]"
        >
          {/* ---- 上半部分：++i（前缀递增）---- */}
          <text
            x={marginL + 6}
            y={top1 - 20}
            fontSize="16"
            fontWeight="700"
            fill="var(--accent)"
            fontFamily="monospace"
          >
            ++i（前缀递增）—— 先加，后用
          </text>

          {/* 步骤 1：初始值 i=5 */}
          <rect x={s1x - boxW / 2} y={top1} width={boxW} height={boxH} rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={s1x} y={rowY(top1) + 5} textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-secondary)">
            i = 5
          </text>

          {/* 步骤 2：先自增为 6 */}
          <rect x={s2x - boxW / 2} y={top1} width={boxW} height={boxH} rx="8" fill="var(--accent)" opacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x={s2x} y={rowY(top1) + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            ++i → i=6
          </text>

          {/* 步骤 3：用新值 6 */}
          <rect x={s3x - boxW / 2} y={top1} width={boxW} height={boxH} rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x={s3x} y={rowY(top1) + 5} textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">
            返回新值 6
          </text>

          {/* 上半注释 */}
          <text x={s1x} y={top1 + boxH + 22} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">初始</text>
          <text x={s2x} y={top1 + boxH + 22} textAnchor="middle" fontSize="11" fill="var(--accent)">先自增 +1</text>
          <text x={s3x} y={top1 + boxH + 22} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">再用新值</text>

          {/* 上排箭头 */}
          <text x={s1x + boxW / 2 + 14} y={rowY(top1) + 5} textAnchor="middle" fontSize="16" fill="var(--accent)" fontWeight="700">→</text>
          <text x={s2x + boxW / 2 + 14} y={rowY(top1) + 5} textAnchor="middle" fontSize="16" fill="var(--accent)" fontWeight="700">→</text>

          {/* ---- 分隔线 ---- */}
          <line x1={marginL} y1={190} x2={580 - marginL} y2={190} stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />

          {/* ---- 下半部分：i++（后缀递增）---- */}
          <text
            x={marginL + 6}
            y={top2 - 20}
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
            fontFamily="monospace"
          >
            i++（后缀递增）—— 先用，后加
          </text>

          {/* 步骤 1：初始值 i=5 */}
          <rect x={s1x - boxW / 2} y={top2} width={boxW} height={boxH} rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={s1x} y={rowY(top2) + 5} textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-secondary)">i = 5</text>

          {/* 步骤 2：先返回旧值 5 */}
          <rect x={s2x - boxW / 2} y={top2} width={boxW} height={boxH} rx="8" fill="var(--accent)" opacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x={s2x} y={rowY(top2) + 1} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            返回旧值 5
          </text>
          <text x={s2x} y={rowY(top2) + 17} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">（背后 i → 6）</text>

          {/* 步骤 3：表达式结果是旧值 5 */}
          <rect x={s3x - boxW / 2} y={top2} width={boxW} height={boxH} rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={s3x} y={rowY(top2) + 5} textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">表达式 = 5</text>

          {/* 下半注释 */}
          <text x={s1x} y={top2 + boxH + 22} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">初始</text>
          <text x={s2x} y={top2 + boxH + 22} textAnchor="middle" fontSize="11" fill="var(--accent)">先用旧值</text>
          <text x={s3x} y={top2 + boxH + 22} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">然后 i 才变</text>

          {/* 下排箭头 */}
          <text x={s1x + boxW / 2 + 14} y={rowY(top2) + 5} textAnchor="middle" fontSize="16" fill="var(--text-secondary)" fontWeight="700">→</text>
          <text x={s2x + boxW / 2 + 14} y={rowY(top2) + 5} textAnchor="middle" fontSize="16" fill="var(--text-secondary)" fontWeight="700">→</text>

          {/* ---- 底部总结 ---- */}
          <text x={marginL} y={370} fontSize="12" fill="var(--accent)" fontFamily="monospace">
            `++i = 先加再用`    `i++ = 先用再加`  —— 区分就看 ++ 在变量名前还是后。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        `++i`（前缀）先自增再使用；`i++`（后缀）先返回旧值再自增。二者对 `i` 的最终值影响相同，但表达式返回值不同。
      </figcaption>
    </figure>
  );
}
