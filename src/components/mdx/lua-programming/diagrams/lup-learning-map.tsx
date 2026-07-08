/**
 * <LupLearningMapDiagram>：Lua 程序设计全书学习地图。
 *
 * 四大板块（Lua基础 · 核心机制 · 高级特性 · 元编程与C交互）及10章依赖关系。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

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
  { title: "Lua 基础", color: accent, chapters: ["学习地图", "类型与值"], y: 92 },
  { title: "核心机制", color: success, chapters: ["表达式", "语句"], y: 175 },
  { title: "高级特性", color: warning, chapters: ["函数", "闭包", "协程"], y: 258 },
  { title: "元编程与C交互", color: danger, chapters: ["元表", "C API", "总复习"], y: 341 },
];

const COL_X = [60, 190, 320, 450, 580];
const CH_W = 110;
const CH_H = 52;

export function LupLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Lua程序设计全书学习地图。四个板块：Lua基础（学习地图、类型与值）、核心机制（表达式、语句）、高级特性（函数、闭包、协程）、元编程与C交互（元表、C API、总复习）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Lua 程序设计 全书学习地图
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            类型值打底 · 表达式语句强骨 · 函数闭包协程拓边界 · 元表C API收全貌
          </text>

          {SECTIONS.map((sec, secIdx) => (
            <g key={sec.title}>
              <rect x={36} y={sec.y - 16} width={100} height={CH_H} rx="8" fill={sec.color} fillOpacity="0.12" stroke={sec.color} strokeWidth="1.4" strokeOpacity="0.5" />
              <text x={86} y={sec.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={sec.color}>
                {sec.title}
              </text>
              <text x={86} y={sec.y + 22} textAnchor="middle" fontSize="10" fill={secondary}>
                {`${sec.chapters.length} 章`}
              </text>

              {sec.chapters.map((ch, i) => {
                const x = COL_X[i];
                const prevCount = SECTIONS.slice(0, secIdx).reduce((acc, s) => acc + s.chapters.length, 0);
                const chIdx = prevCount + i + 1;
                return (
                  <g key={ch}>
                    <rect x={x} y={sec.y - 16} width={CH_W} height={CH_H} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
                    <text x={x + CH_W / 2} y={sec.y + 6} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>
                      {ch}
                    </text>
                    <text x={x + CH_W / 2} y={sec.y + 24} textAnchor="middle" fontSize="10" fill={secondary}>
                      {`第 ${chIdx} 章`}
                    </text>
                    {i > 0 && (
                      <line x1={COL_X[i - 1] + CH_W} y1={sec.y + 10} x2={x} y2={sec.y + 10} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
                    )}
                  </g>
                );
              })}

              {secIdx < SECTIONS.length - 1 && (
                <line x1={86} y1={sec.y + CH_H - 16} x2={86} y2={sec.y + CH_H - 2} stroke={secondary} strokeWidth="1.4" markerEnd="url(#lup-lm-arrow)" />
              )}
            </g>
          ))}

          <defs>
            <marker id="lup-lm-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          <line x1={32} y1={396} x2={VIEW_W - 32} y2={396} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={412} textAnchor="middle" fontSize="11" fill={secondary}>
            table是唯一数据结构 · 函数是一等公民 · 闭包捕获变量 · 元表实现OOP
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Lua 程序设计全书四大板块与十章依赖关系。
      </figcaption>
    </figure>
  );
}
