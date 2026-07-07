/**
 * <CseLearningMapDiagram>：《C++ 服务器开发精髓》全书学习地图。
 *
 * 四列布局对应全书四大板块：
 *   服务器基础（紫）/ 网络与IO（绿）/ 并发架构（橙）/ 工程实践（红）
 * 每列顶部彩色标题 pill，章节卡片纵向排列，箭头串成学习路径。
 * 底部总结栏点出全书主线：从单连接到高并发，从阻塞到事件驱动。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×420、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 四列主体 / 底部总结）。
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
    id: "basics",
    name: "服务器基础",
    color: "var(--accent)",
    chapters: ["1. 学习地图", "2. IO 模型"],
  },
  {
    id: "netio",
    name: "网络与IO",
    color: "var(--success)",
    chapters: ["3. 事件驱动", "4. 线程池"],
  },
  {
    id: "concurrency",
    name: "并发架构",
    color: "var(--warning)",
    chapters: ["5. 连接管理", "6. 缓冲区设计", "7. 协议设计"],
  },
  {
    id: "engineering",
    name: "工程实践",
    color: "var(--danger)",
    chapters: ["8. 定时器", "9. 性能调优", "10. 总复习"],
  },
];

export function CseLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 服务器开发精髓全书学习地图。四列从左到右对应四大板块：服务器基础（紫色，2 章）、网络与IO（绿色，2 章）、并发架构（橙色，3 章）、工程实践（红色，3 章）。卡片间箭头表示由基础到工程的递进学习路径。底部总结：从单连接到高并发，从阻塞到事件驱动。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 服务器开发精髓 · 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从服务器基础 → 网络与IO → 并发架构 → 工程实践，四段递进
          </text>

          {/* ===== 顶部路径箭头条 ===== */}
          <rect x={COL_MARGIN} y="74" width={VIEW_W - COL_MARGIN * 2} height="30" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="94" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            <tspan fontWeight="700" fill="var(--accent)" fontSize="13">学习路径</tspan>
            <tspan>{"　"}</tspan>
            <tspan fill="var(--text-primary)">阻塞 → 非阻塞 → 事件驱动 → 高并发</tspan>
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
            全书 10 章 · 四段递进
          </text>
          <text x={VIEW_W / 2} y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            先理解 IO 模型与事件驱动，再攻克并发架构与连接管理，最后落到工程调优
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书分四大板块：服务器基础建立 IO 模型与事件驱动的心智模型，网络与IO解决线程调度与任务分发，并发架构处理连接、缓冲与协议，工程实践落地定时器、性能调优与总复习。
      </figcaption>
    </figure>
  );
}
