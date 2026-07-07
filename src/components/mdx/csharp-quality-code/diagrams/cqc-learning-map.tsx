/**
 * <CqcLearningMapDiagram>：《编写高质量代码：改善 C# 程序的 157 个建议》全书学习地图。
 *
 * 四列布局对应全书四大质量维度：
 *   语法质量（紫）/ 设计质量（绿）/ 性能质量（橙）/ 工程质量（红）
 * 每列顶部彩色标题 pill，章节卡片纵向排列，箭头串成学习路径。
 * 底部总结栏点出全书主线：从语法正确到工程可靠，四段递进。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const COL_W = 156;
const COL_GAP = 12;
const COL_MARGIN = 30;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const CARD_H = 30;
const CARD_GAP = 10;
const CARD_ROW = CARD_H + CARD_GAP;
const CARDS_TOP_Y = 152;

type Column = {
  id: string;
  name: string;
  color: string;
  chapters: string[];
};

const COLUMNS: readonly Column[] = [
  {
    id: "syntax",
    name: "语法质量",
    color: "var(--accent)",
    chapters: ["1. 学习地图", "2. 可空引用"],
  },
  {
    id: "design",
    name: "设计质量",
    color: "var(--success)",
    chapters: ["3. 异常实践", "4. 异步模式"],
  },
  {
    id: "perf",
    name: "性能质量",
    color: "var(--warning)",
    chapters: ["5. 集合选择", "6. LINQ 性能", "7. 内存分配"],
  },
  {
    id: "eng",
    name: "工程质量",
    color: "var(--danger)",
    chapters: ["8. 线程安全", "9. API 设计", "10. 总复习"],
  },
];

export function CqcLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="编写高质量代码全书学习地图。四列从左到右对应四大质量维度：语法质量（紫色，2 章）、设计质量（绿色，2 章）、性能质量（橙色，3 章）、工程质量（红色，3 章）。卡片间箭头表示由语法正确到工程可靠的递进学习路径。底部总结：从语法正确到工程可靠，四段递进。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            编写高质量代码 · 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从语法质量 → 设计质量 → 性能质量 → 工程质量，四段递进
          </text>

          {/* ===== 顶部路径箭头条 ===== */}
          <rect x={COL_MARGIN} y="74" width={VIEW_W - COL_MARGIN * 2} height="30" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="94" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            <tspan fontWeight="700" fill="var(--accent)" fontSize="13">学习路径</tspan>
            <tspan>{"　"}</tspan>
            <tspan fill="var(--text-primary)">语法正确 → 设计合理 → 性能高效 → 工程可靠</tspan>
          </text>

          {/* ===== 四列 ===== */}
          {COLUMNS.map((col, ci) => {
            const x = colX(ci);
            return (
              <g key={col.id}>
                {/* 列头彩色 pill */}
                <rect x={x} y="118" width={COL_W} height="30" rx="8" fill={col.color} fillOpacity="0.12" stroke={col.color} strokeWidth="1.2" />
                <text x={x + COL_W / 2} y="138" textAnchor="middle" fontSize="13" fontWeight="700" fill={col.color}>{col.name}（{col.chapters.length}）</text>

                {/* 章节卡片 */}
                {col.chapters.map((name, pi) => {
                  const cy = CARDS_TOP_Y + pi * CARD_ROW;
                  return (
                    <g key={name}>
                      <rect x={x} y={cy} width={COL_W} height={CARD_H} rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                      <circle cx={x + 14} cy={cy + CARD_H / 2} r="3" fill={col.color} />
                      <text x={x + COL_W / 2} y={cy + CARD_H / 2 + 4} textAnchor="middle" fontSize="12" fill="var(--text-primary)">{name}</text>
                      {pi < col.chapters.length - 1 && (
                        <line x1={x + COL_W / 2} y1={cy + CARD_H} x2={x + COL_W / 2} y2={cy + CARD_ROW - 2} stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.6" />
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y="348" width={VIEW_W - 120} height="52" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="371" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            全书 10 章 · 157 条建议 · 四段递进
          </text>
          <text x={VIEW_W / 2} y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            先保证语法正确与空安全，再合理设计异常与异步，然后优化集合与内存，最后落到线程安全与 API 设计
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书分四大板块：语法质量建立空安全与类型正确的心智模型，设计质量处理异常与异步，性能质量优化集合选择与内存分配，工程质量落地线程安全与 API 设计。
      </figcaption>
    </figure>
  );
}
