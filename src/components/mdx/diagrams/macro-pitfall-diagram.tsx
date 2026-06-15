/**
 * <MacroPitfallDiagram>：带参宏缺少括号的经典陷阱 SQUARE(a+b)。
 */

export function MacroPitfallDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const bad = "rgb(229,103,103)";
  const good = "rgb(237,137,99)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 360"
          role="img"
          aria-label="带参宏陷阱：错误写法 SQUARE(x) x*x 在 SQUARE(a+b) 时展开为 a+b*a+b"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            SQUARE(a + b) 展开对比
          </text>

          {/* 错误宏 */}
          <rect x={24} y={44} width={280} height={140} rx="8" fill={bg} stroke={bad} strokeWidth="2" />
          <text x={36} y={68} fontSize="11" fontWeight="600" fill={bad}>
            错误：#define SQUARE(x) x * x
          </text>
          <text x={36} y={92} fontSize="12" fill={primary} fontFamily="monospace">
            SQUARE(a + b)
          </text>
          <text x={36} y={116} fontSize="11" fill={secondary}>
            展开为（无括号）：
          </text>
          <text x={36} y={136} fontSize="12" fill={bad} fontFamily="monospace" fontWeight="600">
            a + b * a + b
          </text>
          <text x={36} y={160} fontSize="11" fill={secondary} fontFamily="system-ui">
            * 优先于 + → 得 a + (b*a) + b，不是 (a+b)²
          </text>

          {/* 正确宏 */}
          <rect x={336} y={44} width={280} height={140} rx="8" fill={bg} stroke={good} strokeWidth="2" />
          <text x={348} y={68} fontSize="11" fontWeight="600" fill={good}>
            正确：#define SQUARE(x) ((x) * (x))
          </text>
          <text x={348} y={92} fontSize="12" fill={primary} fontFamily="monospace">
            SQUARE(a + b)
          </text>
          <text x={348} y={116} fontSize="11" fill={secondary}>
            展开为：
          </text>
          <text x={348} y={136} fontSize="12" fill={good} fontFamily="monospace" fontWeight="600">
            ((a + b) * (a + b))
          </text>
          <text x={348} y={160} fontSize="11" fill={secondary} fontFamily="system-ui">
            实参与整体都加括号，优先级安全
          </text>

          {/* 数值示例 a=2 b=3 */}
          <rect x={24} y={200} width={592} height={140} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={36} y={224} fontSize="11" fontWeight="600" fill={accent}>
            数值：a = 2, b = 3
          </text>
          <text x={36} y={252} fontSize="12" fill={primary} fontFamily="monospace">
            期望 (a+b)² = 25
          </text>
          <text x={36} y={276} fontSize="12" fill={bad} fontFamily="monospace">
            错误宏：2 + 3*2 + 3 = 11
          </text>
          <text x={36} y={300} fontSize="12" fill={good} fontFamily="monospace">
            正确宏：((2 + 3) * (2 + 3)) = 25
          </text>
          <text x={36} y={324} fontSize="10" fill={secondary} fontFamily="system-ui">
            副作用宏（如 MAX(a++, b++)）还会因多次求值踩坑 — 复杂逻辑优先用 inline 函数或 enum。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        带参宏是文本替换：形参和 replacement 整体都要加括号，否则运算符优先级与多次求值会产出意外结果。
      </figcaption>
    </figure>
  );
}
