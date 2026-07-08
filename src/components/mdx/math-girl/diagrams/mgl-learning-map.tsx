/**
 * <MglBookMap>：《数学女孩》系列全书学习地图（math-girl 入门章）。
 *
 * 四列布局对应全书四大板块：
 *   数学与编程（紫，2 章）/ 代数世界（绿，2 章）/ 离散数学（橙，3 章）/ 算法与ML（红，3 章）
 *
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const COL_W = 156;
const COL_GAP = 12;
const COL_MARGIN = 36;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const CARD_H = 32;
const CARD_GAP = 10;
const CARD_ROW = CARD_H + CARD_GAP;
const CARDS_TOP_Y = 168;

type Column = { id: string; name: string; color: string; chapters: string[] };

const COLUMNS: readonly Column[] = [
  { id: "intro", name: "数学与编程", color: "var(--accent)", chapters: ["0. 学习地图", "1. 数论基础"] },
  { id: "algebra", name: "代数世界", color: "var(--success)", chapters: ["2. 方程求解", "3. 函数论"] },
  { id: "discrete", name: "离散数学", color: "var(--warning)", chapters: ["4. 组合计数", "5. 图论", "6. 概率论"] },
  { id: "advanced", name: "算法与ML", color: "var(--danger)", chapters: ["7. 算法设计", "8. 机器学习", "9. 总复习"] },
];

export function MglBookMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="数学女孩系列全书学习地图。四列从左到右：数学与编程（紫色，2 章：学习地图、数论基础）、代数世界（绿色，2 章：方程求解、函数论）、离散数学（橙色，3 章：组合计数、图论、概率论）、算法与ML（红色，3 章：算法设计、机器学习、总复习）。底部总结：从数论到代数到离散到算法与ML，四段递进。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">数学女孩系列 · 全书学习地图</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">从数论 → 代数 → 离散 → 算法与ML，数学驱动计算</text>

          <rect x={COL_MARGIN} y="76" width={VIEW_W - COL_MARGIN * 2} height="32" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="97" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            <tspan fontWeight="700" fill="var(--accent)" fontSize="13">学习路径</tspan>
            <tspan>{"　"}</tspan>
            <tspan fill="var(--text-primary)">数学基础 → 代数工具 → 离散建模 → 算法应用</tspan>
          </text>

          {COLUMNS.map((col, ci) => {
            const x = colX(ci);
            return (
              <g key={col.id}>
                <rect x={x} y="124" width={COL_W} height="32" rx="8" fill={col.color} fillOpacity="0.12" stroke={col.color} strokeWidth="1.2" />
                <text x={x + COL_W / 2} y="145" textAnchor="middle" fontSize="13" fontWeight="700" fill={col.color}>{col.name}（{col.chapters.length}）</text>
                {col.chapters.map((name, pi) => {
                  const cy = CARDS_TOP_Y + pi * CARD_ROW;
                  return (
                    <g key={name}>
                      <rect x={x} y={cy} width={COL_W} height={CARD_H} rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                      <circle cx={x + 12} cy={cy + CARD_H / 2} r="3" fill={col.color} />
                      <text x={x + COL_W / 2} y={cy + CARD_H / 2 + 4} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{name}</text>
                      {pi < col.chapters.length - 1 && (
                        <line x1={x + COL_W / 2} y1={cy + CARD_H} x2={x + COL_W / 2} y2={cy + CARD_ROW - 2} stroke={col.color} strokeWidth="1.4" strokeOpacity="0.6" />
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          <rect x="60" y="384" width={VIEW_W - 120} height="52" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="407" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">全书 10 章 · 四段递进</text>
          <text x={VIEW_W / 2} y="426" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">数学是算法的理论基础，从数论到机器学习，数学驱动计算</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书分四大板块：数学与编程讲数论基础，代数世界提供方程与函数工具，离散数学建立组合图论概率模型，算法与ML把数学转化为计算方法。
      </figcaption>
    </figure>
  );
}
