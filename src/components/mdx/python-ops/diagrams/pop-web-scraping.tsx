/**
 * <PopWebScrapingDiagram>：网页抓取四阶段管道与礼貌爬虫要点。
 *
 * 请求 → 解析 → 清洗 → 存储 的四阶段管道；下方为限速/UA/robots 等礼貌要点。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 ≥32，字号 ≥11。
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

const STAGES = [
  { x: 36, w: 156, color: accent, title: "① 请求", body: "requests.get(url,\n  headers=UA,\n  timeout=10)" },
  { x: 212, w: 156, color: success, title: "② 解析", body: "BeautifulSoup(\n  r.text, 'html.parser')\n  soup.select(sel)" },
  { x: 388, w: 156, color: warning, title: "③ 清洗", body: "strip/replace\n类型转换\n去重去空" },
  { x: 564, w: 120, color: danger, title: "④ 存储", body: "CSV / JSON\nSQLite / DB" },
];

const ETIQUETTE = [
  { x: 48, w: 200, color: danger, title: "限速", body: "time.sleep / 令牌桶\n避免压垮目标" },
  { x: 260, w: 200, color: warning, title: "UA 与 headers", body: "设真实 UA\n带 Referer" },
  { x: 472, w: 200, color: accent, title: "robots 与合规", body: "遵守 robots.txt\n尊重 ToS" },
];

export function PopWebScrapingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="网页抓取四阶段管道：请求、解析、清洗、存储；礼貌爬虫要点限速、UA、robots合规。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            网页抓取：四阶段管道
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            请求拿页面 → 解析提取 → 清洗规范化 → 存储落地
          </text>

          {/* 四阶段 */}
          {STAGES.map((s, i) => {
            const lines = s.body.split("\n");
            return (
              <g key={s.title}>
                <rect x={s.x} y={84} width={s.w} height={92} rx="8" fill={s.color} fillOpacity="0.10" stroke={s.color} strokeWidth="1.4" strokeOpacity="0.55" />
                <text x={s.x + s.w / 2} y={108} textAnchor="middle" fontSize="13" fontWeight="700" fill={s.color}>
                  {s.title}
                </text>
                {lines.map((ln, li) => (
                  <text key={li} x={s.x + s.w / 2} y={128 + li * 16} textAnchor="middle" fontSize="10" fill={primary}>
                    {ln}
                  </text>
                ))}
                {i < STAGES.length - 1 && (
                  <line x1={s.x + s.w + 2} y1={130} x2={STAGES[i + 1].x - 6} y2={130} stroke={accent} strokeWidth="1.6" markerEnd="url(#pop-ws-arrow)" />
                )}
              </g>
            );
          })}

          {/* 礼貌爬虫 */}
          <text x={48} y={208} fontSize="12" fontWeight="700" fill={secondary}>
            礼貌爬虫三要点（别把人家站点搞挂）
          </text>
          <line x1={32} y1={202} x2={VIEW_W - 32} y2={202} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          {ETIQUETTE.map((e) => {
            const lines = e.body.split("\n");
            return (
              <g key={e.title}>
                <rect x={e.x} y={218} width={e.w} height={76} rx="8" fill={elevated} stroke={e.color} strokeWidth="1.4" strokeOpacity="0.5" />
                <text x={e.x + e.w / 2} y={242} textAnchor="middle" fontSize="13" fontWeight="700" fill={e.color}>
                  {e.title}
                </text>
                {lines.map((ln, li) => (
                  <text key={li} x={e.x + e.w / 2} y={262 + li * 16} textAnchor="middle" fontSize="11" fill={primary}>
                    {ln}
                  </text>
                ))}
              </g>
            );
          })}

          <defs>
            <marker id="pop-ws-arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={314} x2={VIEW_W - 32} y2={314} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={336} textAnchor="middle" fontSize="11" fill={secondary}>
            解析：select 用 CSS 选择器、find_all 按标签属性；优先结构化数据（JSON API）而非 HTML
          </text>
          <text x={VIEW_W / 2} y={356} textAnchor="middle" fontSize="11" fill={secondary}>
            动态渲染页面用 Playwright/Selenium；纯静态用 requests + BeautifulSoup 足矣
          </text>
          <text x={VIEW_W / 2} y={376} textAnchor="middle" fontSize="11" fill={secondary}>
            存储：小量用 CSV/JSON，结构化查询用 SQLite，团队共享用数据库
          </text>
          <text x={VIEW_W / 2} y={394} textAnchor="middle" fontSize="11" fill={danger}>
            合规第一：遵守 robots.txt 和服务条款，抓取敏感数据需授权
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        网页抓取的四阶段管道与礼貌要点。
      </figcaption>
    </figure>
  );
}
