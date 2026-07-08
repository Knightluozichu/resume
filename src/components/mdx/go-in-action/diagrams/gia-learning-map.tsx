/**
 * <GiaLearningMapDiagram>：Go 语言实战全书学习地图。
 *
 * 四大板块（Go入门 · 核心类型 · 并发模型 · 工程实践）及 10 章依赖。
 * Server Component，viewBox 720×400，CSS 变量配色。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

interface SectionCard {
  title: string;
  color: string;
  chapters: string[];
  y: number;
}

const SECTIONS: readonly SectionCard[] = [
  { title: "Go 入门", color: accent, chapters: ["学习地图", "Go 哲学"], y: 86 },
  { title: "核心类型", color: success, chapters: ["数组与切片", "Map 与 Struct"], y: 162 },
  { title: "并发模型", color: warning, chapters: ["Goroutine", "Channel", "并发模式"], y: 238 },
  { title: "工程实践", color: danger, chapters: ["测试打包", "标准库", "总复习"], y: 314 },
];

const COL_X = [190, 320, 450, 580, 660];
const CH_W = 108;
const CH_H = 48;

export function GiaLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Go 语言实战全书学习地图。四个板块：Go入门（学习地图、Go哲学）、核心类型（数组与切片、Map与Struct）、并发模型（Goroutine、Channel、并发模式）、工程实践（测试打包、标准库、总复习）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Go 语言实战全书学习地图
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill={secondary}>
            少即是多 · 并发原生 · 工程优先
          </text>

          {SECTIONS.map((sec, si) => {
            const startIdx = SECTIONS.slice(0, si).reduce((a, s) => a + s.chapters.length, 0);
            return (
              <g key={sec.title}>
                <rect x={36} y={sec.y - 14} width={110} height={CH_H} rx="8" fill={sec.color} fillOpacity="0.12" stroke={sec.color} strokeWidth="1.4" strokeOpacity="0.5" />
                <text x={91} y={sec.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={sec.color}>
                  {sec.title}
                </text>
                <text x={91} y={sec.y + 22} textAnchor="middle" fontSize="10" fill={secondary}>
                  {`${sec.chapters.length} 章`}
                </text>
                {sec.chapters.map((ch, i) => {
                  const x = COL_X[i];
                  const chIdx = startIdx + i + 1;
                  return (
                    <g key={ch}>
                      <rect x={x} y={sec.y - 14} width={CH_W} height={CH_H} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
                      <text x={x + CH_W / 2} y={sec.y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>
                        {ch}
                      </text>
                      <text x={x + CH_W / 2} y={sec.y + 22} textAnchor="middle" fontSize="10" fill={secondary}>
                        {`第 ${chIdx} 章`}
                      </text>
                      {i > 0 && (
                        <line x1={COL_X[i - 1] + CH_W} y1={sec.y + 10} x2={x} y2={sec.y + 10} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
                      )}
                    </g>
                  );
                })}
                {si < SECTIONS.length - 1 && (
                  <line x1={91} y1={sec.y + CH_H - 14} x2={91} y2={sec.y + CH_H} stroke={secondary} strokeWidth="1.4" markerEnd="url(#gia-lm-arrow)" />
                )}
              </g>
            );
          })}

          <defs>
            <marker id="gia-lm-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Go 语言实战四大板块与十章依赖：核心类型是基础，并发模型是灵魂，工程实践是落地。
      </figcaption>
    </figure>
  );
}
