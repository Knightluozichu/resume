/**
 * <GwpLearningMapDiagram>: Go Web 编程全书学习地图。
 *
 * 四大板块（Web基础 · 路由与中间件 · 数据层 · 生产部署）及 10 章依赖关系。
 * 纯静态 SVG，Server Component。viewBox 720x400，CSS 变量配色。
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
  { title: "Web 基础", color: accent, chapters: ["学习地图", "HTTP 基础"], y: 82 },
  { title: "路由与中间件", color: success, chapters: ["路由", "中间件"], y: 164 },
  { title: "数据层", color: warning, chapters: ["数据库", "模板", "JSON API"], y: 246 },
  { title: "生产部署", color: danger, chapters: ["认证", "部署", "总复习"], y: 328 },
];

const COL_X = [60, 190, 320, 450, 580];
const CH_W = 110;
const CH_H = 50;

export function GwpLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Go Web 编程全书学习地图。四个板块：Web基础（学习地图、HTTP基础）、路由与中间件（路由、中间件）、数据层（数据库、模板、JSON API）、生产部署（认证、部署、总复习）。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Go Web 编程全书学习地图
          </text>
          <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize="11" fill={secondary}>
            HTTP 打底 · 路由分发 · 数据持久 · 生产加固
          </text>

          {SECTIONS.map((sec, si) => (
            <g key={sec.title}>
              <rect x={36} y={sec.y - 14} width={100} height={CH_H} rx="8" fill={sec.color} fillOpacity="0.12" stroke={sec.color} strokeWidth="1.4" strokeOpacity="0.5" />
              <text x={86} y={sec.y + 6} textAnchor="middle" fontSize="11" fontWeight="700" fill={sec.color}>
                {sec.title}
              </text>
              <text x={86} y={sec.y + 24} textAnchor="middle" fontSize="10" fill={secondary}>
                {`${sec.chapters.length} 章`}
              </text>

              {sec.chapters.map((ch, i) => {
                const x = COL_X[i];
                const chIdx = SECTIONS.slice(0, si).reduce((acc, s) => acc + s.chapters.length, 0) + i + 1;
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
                <line x1={86} y1={sec.y + CH_H - 14} x2={86} y2={sec.y + CH_H - 2} stroke={secondary} strokeWidth="1.4" markerEnd="url(#gwp-lm-arrow)" />
              )}
            </g>
          ))}

          <defs>
            <marker id="gwp-lm-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          <line x1={32} y1={380} x2={VIEW_W - 32} y2={380} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={394} textAnchor="middle" fontSize="11" fill={secondary}>
            请求进 → 路由分发 → 数据存取 → 响应出 → 上线加固
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Go Web 编程四大板块与十章依赖关系。
      </figcaption>
    </figure>
  );
}
