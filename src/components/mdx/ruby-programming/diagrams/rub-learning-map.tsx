/**
 * <RubLearningMapDiagram>：Ruby 基础教程全书学习地图。
 *
 * 四大板块（Ruby基础 · 核心语法 · 类与模块 · 元编程与实战）及 10 章的依赖关系。
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
  { title: "Ruby 基础", color: accent, chapters: ["学习地图", "对象与变量"], y: 92 },
  { title: "核心语法", color: success, chapters: ["字符串", "控制流"], y: 175 },
  { title: "类与模块", color: warning, chapters: ["类", "模块与 Mixin", "块与 Proc"], y: 258 },
  { title: "元编程与实战", color: danger, chapters: ["元编程", "Gems 与 Bundler", "总复习"], y: 341 },
];

const COL_X = [60, 190, 320, 450, 580];
const CH_W = 110;
const CH_H = 52;

export function RubLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Ruby 基础教程全书学习地图。四个板块：Ruby基础（学习地图、对象与变量）、核心语法（字符串、控制流）、类与模块（类、模块与Mixin、块与Proc）、元编程与实战（元编程、Gems与Bundler、总复习）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Ruby 基础教程全书学习地图
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            一切皆对象 · 块是灵魂 · 模块实现多重继承 · 元编程打开黑箱
          </text>

          {SECTIONS.map((sec) => (
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
                const chIdx = SECTIONS.slice(0, SECTIONS.indexOf(sec)).reduce((acc, s) => acc + s.chapters.length, 0) + i + 1;
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

              {sec.title !== "元编程与实战" && (
                <line x1={86} y1={sec.y + CH_H - 16} x2={86} y2={sec.y + CH_H - 2} stroke={secondary} strokeWidth="1.4" markerEnd="url(#rub-lm-arrow)" />
              )}
            </g>
          ))}

          <defs>
            <marker id="rub-lm-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          <line x1={32} y1={396} x2={VIEW_W - 32} y2={396} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={412} textAnchor="middle" fontSize="11" fill={secondary}>
            对象模型打底 · 块+模块搭骨 · 元编程拓展边界 · Gems 生态收尾
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Ruby 基础教程全书四大板块与十章依赖关系。
      </figcaption>
    </figure>
  );
}
