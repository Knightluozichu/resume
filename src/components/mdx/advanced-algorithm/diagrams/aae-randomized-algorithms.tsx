/**
 * <AaeRandomizedAlgorithmsDiagram>：随机算法分类图（advanced-algorithm 概率算法章）。
 *
 * 顶部「随机数生成器 RNG」作为随机性来源，向下分两大类：
 *   - Las Vegas 算法（accent 紫）：结果总正确，运行时间随机（如随机快排）
 *   - Monte Carlo 算法（warning 暖）：运行时间固定，结果可能出错（如 Miller-Rabin 素性测试）
 * 每类列出特征、代表算法、时间复杂度、错误概率。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

// 顶部 RNG 节点
const RNG = { x: 288, y: 78, w: 144, h: 46 };

// 两类卡片
const LV = { x: 40, y: 188, w: 308, h: 248 }; // Las Vegas
const MC = { x: 372, y: 188, w: 308, h: 248 }; // Monte Carlo

interface Row {
  label: string;
  value: string;
}

const LV_ROWS: Row[] = [
  { label: "特征", value: "结果总正确，运行时间随机" },
  { label: "代表", value: "随机快排 Random Quicksort" },
  { label: "期望时间", value: "O(n log n)" },
  { label: "最坏时间", value: "O(n²)（概率极低）" },
  { label: "错误概率", value: "0（只可能更慢，不会出错）" },
];

const MC_ROWS: Row[] = [
  { label: "特征", value: "运行时间固定，结果可能出错" },
  { label: "代表", value: "Miller-Rabin 素性测试" },
  { label: "时间", value: "O(k · log³ n)" },
  { label: "错误概率", value: "≤ 4⁻ᵏ" },
  { label: "降错", value: "重复 k 次可指数级降低错误率" },
];

export function AaeRandomizedAlgorithmsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="随机算法分类图。顶部随机数生成器 RNG 作为随机性来源，向下分两大类：Las Vegas 算法（紫色，结果总正确、运行时间随机，代表随机快排，期望 O(n log n)，错误概率 0）；Monte Carlo 算法（暖色，运行时间固定、结果可能出错，代表 Miller-Rabin 素性测试，错误概率 ≤ 4^-k）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ra-lv" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
            <marker id="ra-mc" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={warning} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            随机算法 · 两大分类
          </text>

          {/* 顶部 RNG 节点 */}
          <rect x={RNG.x} y={RNG.y} width={RNG.w} height={RNG.h} rx="10" fill={success} fillOpacity="0.12" stroke={success} strokeWidth="1.8" />
          <text x={RNG.x + RNG.w / 2} y={RNG.y + 20} textAnchor="middle" fontSize="13" fontWeight="700" fill={success} fontFamily="monospace">
            Random RNG
          </text>
          <text x={RNG.x + RNG.w / 2} y={RNG.y + 38} textAnchor="middle" fontSize="10.5" fill={secondary}>
            随机数生成器 · 随机性来源
          </text>

          {/* 分叉箭头 */}
          <path
            d={`M ${RNG.x + 40} ${RNG.y + RNG.h} C ${RNG.x + 40} ${RNG.y + 80}, ${LV.x + LV.w / 2} ${RNG.y + 70}, ${LV.x + LV.w / 2} ${LV.y - 4}`}
            fill="none"
            stroke={accent}
            strokeWidth="1.6"
            markerEnd="url(#ra-lv)"
          />
          <path
            d={`M ${RNG.x + RNG.w - 40} ${RNG.y + RNG.h} C ${RNG.x + RNG.w - 40} ${RNG.y + 80}, ${MC.x + MC.w / 2} ${RNG.y + 70}, ${MC.x + MC.w / 2} ${LV.y - 4}`}
            fill="none"
            stroke={warning}
            strokeWidth="1.6"
            markerEnd="url(#ra-mc)"
          />

          {/* ===== Las Vegas 卡片 ===== */}
          <g>
            <rect x={LV.x} y={LV.y} width={LV.w} height={LV.h} rx="12" fill={accent} fillOpacity="0.05" stroke={accent} strokeWidth="1.6" strokeOpacity="0.6" />
            <rect x={LV.x} y={LV.y} width={LV.w} height={40} rx="12" fill={accent} fillOpacity="0.14" />
            <rect x={LV.x} y={LV.y + 20} width={LV.w} height={20} fill={accent} fillOpacity="0.14" />
            <text x={LV.x + LV.w / 2} y={LV.y + 26} textAnchor="middle" fontSize="14" fontWeight="700" fill={accent}>
              Las Vegas 算法
            </text>
            {LV_ROWS.map((r, i) => (
              <g key={r.label}>
                <rect x={LV.x + 14} y={LV.y + 58 + i * 36} width={56} height={20} rx="4" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
                <text x={LV.x + 42} y={LV.y + 72 + i * 36} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={accent}>
                  {r.label}
                </text>
                <text x={LV.x + 80} y={LV.y + 72 + i * 36} fontSize="11.5" fill={primary} fontFamily={r.label === "代表" ? "monospace" : "sans-serif"}>
                  {r.value}
                </text>
              </g>
            ))}
          </g>

          {/* ===== Monte Carlo 卡片 ===== */}
          <g>
            <rect x={MC.x} y={MC.y} width={MC.w} height={MC.h} rx="12" fill={warning} fillOpacity="0.05" stroke={warning} strokeWidth="1.6" strokeOpacity="0.6" />
            <rect x={MC.x} y={MC.y} width={MC.w} height={40} rx="12" fill={warning} fillOpacity="0.14" />
            <rect x={MC.x} y={MC.y + 20} width={MC.w} height={20} fill={warning} fillOpacity="0.14" />
            <text x={MC.x + MC.w / 2} y={MC.y + 26} textAnchor="middle" fontSize="14" fontWeight="700" fill={warning}>
              Monte Carlo 算法
            </text>
            {MC_ROWS.map((r, i) => (
              <g key={r.label}>
                <rect x={MC.x + 14} y={MC.y + 58 + i * 36} width={56} height={20} rx="4" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1" strokeOpacity="0.5" />
                <text x={MC.x + 42} y={MC.y + 72 + i * 36} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={warning}>
                  {r.label}
                </text>
                <text x={MC.x + 80} y={MC.y + 72 + i * 36} fontSize="11.5" fill={primary} fontFamily={r.label === "代表" ? "monospace" : "sans-serif"}>
                  {r.value}
                </text>
              </g>
            ))}
          </g>

          {/* 底部对比总结 */}
          <line x1={32} y1={452} x2={VIEW_W - 32} y2={452} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={472} textAnchor="middle" fontSize="11.5" fill={secondary}>
            Las Vegas 赌时间不赌正确性 · Monte Carlo 赌正确性不赌时间
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        随机算法分两类：Las Vegas（紫色，结果总正确、运行时间随机，如随机快排，期望 O(n log n)，错误率 0）；Monte Carlo（暖色，运行时间固定、结果可能出错，如 Miller-Rabin，错误率 ≤ 4⁻ᵏ，可重复降低）。
      </figcaption>
    </figure>
  );
}
