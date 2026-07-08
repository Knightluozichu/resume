/**
 * <HfsBookMap>：深入浅出统计学全书学习地图（head-first-statistics 入门章）。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 460;
const COL_W = 156;
const COL_GAP = 12;
const COL_MARGIN = 36;
const CARDS_TOP_Y = 168;
const CARD_H = 32;
const CARD_GAP = 10;
const CARD_ROW = CARD_H + CARD_GAP;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const COLUMNS: readonly { name: string; color: string; chapters: string[] }[] = [
  { name: "统计基础", color: "var(--accent)", chapters: ["0. 学习地图", "1. 数据展示"] },
  { name: "集中趋势", color: "var(--success)", chapters: ["2. 集中趋势", "3. 离散程度"] },
  { name: "概率分布", color: "var(--warning)", chapters: ["4. 概率", "5. 离散分布", "6. 连续分布"] },
  { name: "统计推断", color: "var(--danger)", chapters: ["7. 抽样", "8. 置信区间", "9. 总复习"] },
];

export function HfsBookMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="从数据展示 → 集中趋势 → 概率分布 → 统计推断，四段递进从描述到推断" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">深入浅出统计学 · 全书学习地图</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">从数据展示 → 集中趋势 → 概率分布 → 统计推断，四段递进从描述到推断</text>
          <rect x={COL_MARGIN} y="76" width={VIEW_W - COL_MARGIN * 2} height="32" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="97" textAnchor="middle" fontSize="12" fill="var(--text-secondary)"><tspan fontWeight="700" fill="var(--accent)" fontSize="13">学习路径</tspan><tspan>{"　"}</tspan><tspan fill="var(--text-primary)">展示 → 描述 → 建模 → 推断</tspan></text>
          {COLUMNS.map((col, ci) => {
            const x = colX(ci);
            return (
              <g key={col.name}>
                <rect x={x} y="124" width={COL_W} height="32" rx="8" fill={col.color} fillOpacity="0.12" stroke={col.color} strokeWidth="1.2" />
                <text x={x + COL_W / 2} y="145" textAnchor="middle" fontSize="13" fontWeight="700" fill={col.color}>{col.name}（{col.chapters.length}）</text>
                {col.chapters.map((name, pi) => {
                  const cy = CARDS_TOP_Y + pi * CARD_ROW;
                  return (
                    <g key={name}>
                      <rect x={x} y={cy} width={COL_W} height={CARD_H} rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                      <circle cx={x + 12} cy={cy + CARD_H / 2} r="3" fill={col.color} />
                      <text x={x + COL_W / 2} y={cy + CARD_H / 2 + 4} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{name}</text>
                      {pi < col.chapters.length - 1 && (<line x1={x + COL_W / 2} y1={cy + CARD_H} x2={x + COL_W / 2} y2={cy + CARD_ROW - 2} stroke={col.color} strokeWidth="1.4" strokeOpacity="0.6" />)}
                    </g>
                  );
                })}
              </g>
            );
          })}
          <rect x="60" y="384" width={VIEW_W - 120} height="52" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="407" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">全书 10 章 · 四段递进</text>
          <text x={VIEW_W / 2} y="426" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">先展示数据，再描述分布，然后建立概率模型，最后从样本推断总体</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">从数据展示 → 集中趋势 → 概率分布 → 统计推断，四段递进从描述到推断</figcaption>
    </figure>
  );
}
