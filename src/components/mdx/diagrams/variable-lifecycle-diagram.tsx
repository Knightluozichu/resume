/**
 * <VariableLifecycleDiagram step={2|4|5}>：变量生命周期分阶段栈状态示意图。
 *
 * 展示程序运行时栈（stack）上变量的出生/存在/遮蔽/死亡：
 *  step 2 = main 函数 local 出生后（global + local 都在）
 *  step 4 = 离开内层块后（innerOnly 和内层 local 已销毁，外层复活）
 *  step 5 = main 结束后（全部清理，仅说明）
 *
 * Server Component（纯展示，静态 SVG）。
 * token 色：var(--accent) / --border / --bg / --bg-elevated / --text-primary / --text-secondary。
 */

type LifecycleStep = 2 | 4 | 5;

interface Props {
  step?: LifecycleStep;
}

export function VariableLifecycleDiagram({ step = 2 }: Props) {
  const boxW = 140;
  const boxH = 28;
  const startX = 180;
  const globalY = 42;
  const outerY = 82;
  const innerLabelY = 132;
  const innerY = 152;
  const stackW = 340;
  const stackH = step === 4 ? 220 : 200;

  const accent = "var(--accent)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const bgElevated = "var(--bg-elevated)";
  const textPrimary = "var(--text-primary)";
  const textSecondary = "var(--text-secondary)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 500 ${stackH}`}
          role="img"
          aria-label="C++ 变量生命周期：栈上各变量在不同阶段的存在状态"
          className="mx-auto block h-auto w-full max-w-[500px]"
        >
          {/* 全局区 */}
          <rect x={startX} y={globalY} width={boxW} height={boxH} rx="4" fill={bgElevated} stroke={accent} strokeWidth="1.5" />
          <text x={startX + boxW / 2} y={globalY + 19} textAnchor="middle" fontSize="12" fontWeight="600" fill={textPrimary} fontFamily="monospace">global = 42</text>
          <text x={startX - 10} y={globalY + 19} textAnchor="end" fontSize="11" fill={textSecondary}>全局区</text>

          {/* main 局部：local */}
          <rect x={startX} y={outerY} width={boxW} height={boxH} rx="4" fill={bg} stroke={step === 5 ? border : accent} strokeWidth="1.5" />
          <text x={startX + boxW / 2} y={outerY + 19} textAnchor="middle" fontSize="12" fill={step === 5 ? textSecondary : textPrimary} fontFamily="monospace">local = 10</text>

          {/* main 作用域标签 */}
          <text x={startX - 10} y={outerY + 19} textAnchor="end" fontSize="11" fill={textSecondary}>main</text>

          {/* inner 区域：仅在 step≠4 且 step≠5 时高亮存在，step=4 时显示为已销毁 */}
          {step !== 5 && (
            <>
              <text x={startX - 10} y={innerLabelY + 2} textAnchor="end" fontSize="11" fill={textSecondary}>内层块</text>
              {/* inner local */}
              <rect
                x={startX + 20}
                y={innerY}
                width={boxW}
                height={boxH}
                rx="4"
                fill={step === 4 ? bg : bg}
                stroke={step === 4 ? border : accent}
                strokeWidth="1.5"
                strokeDasharray={step === 4 ? "4 3" : undefined}
                opacity={step === 4 ? 0.4 : 1}
              />
              <text
                x={startX + 20 + boxW / 2}
                y={innerY + 19}
                textAnchor="middle"
                fontSize="12"
                fontFamily="monospace"
                fill={step === 4 ? textSecondary : textPrimary}
                opacity={step === 4 ? 0.4 : 1}
              >
                local = 20
              </text>
              {step === 4 && (
                <text x={startX + 20 + boxW + 12} y={innerY + 19} fontSize="16" fill={border}>✕</text>
              )}

              {/* innerOnly */}
              <rect
                x={startX + 20}
                y={innerY + 38}
                width={boxW}
                height={boxH}
                rx="4"
                fill={step === 4 ? bg : bg}
                stroke={step === 4 ? border : "var(--accent)"}
                strokeWidth="1.5"
                strokeDasharray={step === 4 ? "4 3" : undefined}
                opacity={step === 4 ? 0.4 : 1}
              />
              <text
                x={startX + 20 + boxW / 2}
                y={innerY + 38 + 19}
                textAnchor="middle"
                fontSize="12"
                fontFamily="monospace"
                fill={step === 4 ? textSecondary : textPrimary}
                opacity={step === 4 ? 0.4 : 1}
              >
                innerOnly = 30
              </text>
              {step === 4 && (
                <text x={startX + 20 + boxW + 12} y={innerY + 38 + 19} fontSize="16" fill={border}>✕</text>
              )}
            </>
          )}

          {/* 步骤说明 */}
          {step === 2 && (
            <text x={250} y={stackH - 12} textAnchor="middle" fontSize="12" fill={textPrimary}>
              ② main 函数体内：local 出生在栈上，global 仍在全局区
            </text>
          )}
          {step === 4 && (
            <text x={250} y={stackH - 12} textAnchor="middle" fontSize="12" fill={textPrimary}>
              ④ 离开内层块：内层变量销毁 ✕，外层 local=10 重新可见
            </text>
          )}
          {step === 5 && (
            <text x={250} y={stackH - 12} textAnchor="middle" fontSize="12" fill={textPrimary}>
              ⑤ main 结束：local 销毁，程序退出，global 自动清理
            </text>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 2 && "程序运行时栈上的变量状态：main 函数 local 已出生，global 始终在全局区。内层块尚未执行。"}
        {step === 4 && "内层块已退出：innerOnly 和内层 local 离开作用域被销毁，外层 local=10 重新可见。"}
        {step === 5 && "main 函数结束：local 销毁。程序退出时全局变量也自动清理，整个生命周期闭环。"}
      </figcaption>
    </figure>
  );
}
