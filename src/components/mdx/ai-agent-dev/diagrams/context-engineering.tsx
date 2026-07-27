import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentDev_ContextEngineering
const officialQualityProps = {
  title: "上下文工程与压缩",
  stages: [
    "上下文工程与压缩",
    "桌子就那么大，该摆什么、怎么摆，是门讲究",
    "上下文工程：在有限窗口里安排「放什么、放多少、怎么排」",
    "上下文预算分配：窗口是一笔有限预算，分给好几样",
    "压缩 / 摘要：太长了就浓缩成几句要点",
  ],
  sourceLabel: "Anthropic Building effective agents",
} as const;

export function OfficialAiAgentDevContextEngineeringMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentDevContextEngineeringExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentDevContextEngineeringEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}

/**
 * <ContextBudgetDiagram>：上下文窗口预算分配 + lost-in-the-middle U 形注意力曲线。
 * 上半：有限窗口是一笔预算，分给系统提示/RAG/对话历史/工具结果/预留输出。
 * 下半：注意力呈 U 形（首尾高、中间低），重要信息要放首尾。
 * 纯静态 SVG，viewBox 720×420。
 */
const BUDGET_SEGMENTS = [
  { label: "系统提示", pct: 0.15, color: "#C792EA" },
  { label: "RAG 检索", pct: 0.25, color: "#5AA9E6" },
  { label: "对话历史", pct: 0.3, color: "#3FB97F" },
  { label: "工具结果", pct: 0.15, color: "#E5B567" },
  { label: "预留输出", pct: 0.2, color: "#8892A6" },
] as const;

export function ContextBudgetDiagram() {
  const barX = 70;
  const barW = 580;
  const barY = 70;
  const barH = 56;
  // U 形注意力曲线坐标（x: 上下文位置，y: 注意力高低）
  const curveY0 = 250; // 高注意力
  const curveY1 = 370; // 低注意力
  const cx0 = 80;
  const cx1 = 640;
  const mid = (cx0 + cx1) / 2;
  const uPath = `M ${cx0} ${curveY0 + 8} C ${cx0 + 90} ${curveY1 - 6}, ${mid - 70} ${curveY1}, ${mid} ${curveY1} C ${mid + 70} ${curveY1}, ${cx1 - 90} ${curveY1 - 6}, ${cx1} ${curveY0}`;
  let accX = barX;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label="上下文工程图。上半：上下文窗口是一笔有限预算，分配给系统提示、RAG检索、对话历史、工具结果、预留输出五部分。下半：注意力呈U形曲线，开头和结尾注意力高、中间低（lost-in-the-middle），所以重要信息要放在上下文的首尾。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="34" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            上下文窗口：一笔有限预算
          </text>
          {/* 预算条 */}
          <rect x={barX} y={barY} width={barW} height={barH} rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          {BUDGET_SEGMENTS.map((seg) => {
            const w = barW * seg.pct;
            const el = (
              <g key={seg.label}>
                <rect x={accX} y={barY} width={w} height={barH} fill={seg.color} fillOpacity="0.22" stroke={seg.color} strokeWidth="1" />
                <text x={accX + w / 2} y={barY + barH / 2 - 2} textAnchor="middle" fontSize="11" fontWeight="700" fill={seg.color}>
                  {seg.label}
                </text>
                <text x={accX + w / 2} y={barY + barH / 2 + 14} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
                  {Math.round(seg.pct * 100)}%
                </text>
              </g>
            );
            accX += w;
            return el;
          })}
          <text x="360" y={barY + barH + 20} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            窗口装不下所有——要决定「放什么、放多少、怎么排」，太长的先压缩/摘要
          </text>
          {/* U 形注意力曲线 */}
          <text x="360" y="228" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            lost-in-the-middle：注意力呈 U 形
          </text>
          <line x1={cx0} y1={curveY1 + 6} x2={cx1} y2={curveY1 + 6} stroke="var(--border)" strokeWidth="1" />
          <line x1={cx0} y1={curveY0 - 6} x2={cx0} y2={curveY1 + 6} stroke="var(--border)" strokeWidth="1" />
          <path d={uPath} fill="none" stroke="#E5B567" strokeWidth="2.5" />
          <text x={cx0 + 6} y={curveY0 - 2} fontSize="10" fontWeight="700" fill="#3FB97F">开头·高</text>
          <text x={cx1 - 6} y={curveY0 - 8} textAnchor="end" fontSize="10" fontWeight="700" fill="#3FB97F">结尾·高</text>
          <text x={mid} y={curveY1 + 24} textAnchor="middle" fontSize="10" fontWeight="700" fill="#E5534B">中间·注意力最低</text>
          <text x="360" y={curveY1 + 44} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            重要信息放首尾，中间容易被「忽略」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        上下文窗口是有限预算，要合理分配给系统提示、检索、历史、工具结果；
        注意力呈 U 形（lost-in-the-middle），关键信息应放在上下文首尾。
      </figcaption>
    </figure>
  );
}
