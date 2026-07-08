/**
 * <PopLearningMapDiagram>：Python 自动化运维全书学习地图。
 *
 * 四大板块（运维基础 · 系统管理 · 网络自动化 · 高级运维）及 10 章依赖关系。
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

interface SectionCard {
  title: string;
  color: string;
  chapters: string[];
  y: number;
}

const SECTIONS: readonly SectionCard[] = [
  { title: "运维基础", color: accent, chapters: ["学习地图", "运维基础"], y: 84 },
  { title: "系统管理", color: success, chapters: ["文件操作", "进程管理"], y: 156 },
  { title: "网络自动化", color: warning, chapters: ["网络自动化", "SSH·paramiko", "网页抓取"], y: 228 },
  { title: "高级运维", color: danger, chapters: ["监控告警", "配置管理", "总复习"], y: 300 },
];

const COL_X = [180, 320, 460];
const CH_W = 124;
const CH_H = 50;

export function PopLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Python自动化运维全书学习地图。四个板块：运维基础（学习地图、运维基础）、系统管理（文件操作、进程管理）、网络自动化（网络自动化、SSH·paramiko、网页抓取）、高级运维（监控告警、配置管理、总复习）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Python 自动化运维全书学习地图
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            基础筑底 · 系统练手 · 网络成网 · 高阶闭环
          </text>

          {/* 四大板块 */}
          {SECTIONS.map((sec, secIdx) => (
            <g key={sec.title}>
              <rect x={36} y={sec.y - 16} width={120} height={CH_H} rx="8" fill={sec.color} fillOpacity="0.12" stroke={sec.color} strokeWidth="1.4" strokeOpacity="0.5" />
              <text x={96} y={sec.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={sec.color}>
                {sec.title}
              </text>
              <text x={96} y={sec.y + 22} textAnchor="middle" fontSize="10" fill={secondary}>
                {`${sec.chapters.length} 章`}
              </text>

              {sec.chapters.map((ch, i) => {
                const x = COL_X[i];
                const prevCount = SECTIONS.slice(0, secIdx).reduce((acc, s) => acc + s.chapters.length, 0);
                const chIdx = prevCount + i + 1;
                return (
                  <g key={ch}>
                    <rect x={x} y={sec.y - 16} width={CH_W} height={CH_H} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
                    <text x={x + CH_W / 2} y={sec.y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>
                      {ch}
                    </text>
                    <text x={x + CH_W / 2} y={sec.y + 22} textAnchor="middle" fontSize="10" fill={secondary}>
                      {`第 ${chIdx} 章`}
                    </text>
                    {i > 0 && (
                      <line x1={COL_X[i - 1] + CH_W} y1={sec.y + 9} x2={x} y2={sec.y + 9} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
                    )}
                  </g>
                );
              })}

              {secIdx < SECTIONS.length - 1 && (
                <line x1={96} y1={sec.y + CH_H - 16} x2={96} y2={sec.y + CH_H - 2} stroke={secondary} strokeWidth="1.4" markerEnd="url(#pop-lm-arrow)" />
              )}
            </g>
          ))}

          <defs>
            <marker id="pop-lm-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={352} x2={VIEW_W - 32} y2={352} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={372} textAnchor="middle" fontSize="11" fill={secondary}>
            从「能跑脚本」到「批量、可重复、可监控」——用代码替代手工，让运维变工程
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Python 自动化运维四大板块与十章依赖关系。
      </figcaption>
    </figure>
  );
}
