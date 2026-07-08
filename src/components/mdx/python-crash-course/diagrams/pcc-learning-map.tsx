/**
 * <PccLearningMapDiagram>：Python编程：从入门到实践 全书学习地图。
 *
 * 四大板块（Python基础 · 控制流与函数 · 类与文件 · 项目实战）及10章依赖关系。
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
  { title: "Python 基础", color: accent, chapters: ["学习地图", "变量与列表"], y: 92 },
  { title: "控制流与函数", color: success, chapters: ["条件与循环", "函数"], y: 175 },
  { title: "类与文件", color: warning, chapters: ["类与对象", "文件与异常", "测试代码"], y: 258 },
  { title: "项目实战", color: danger, chapters: ["游戏开发", "数据可视化", "总复习"], y: 341 },
];

const COL_X = [60, 190, 320, 450, 580];
const CH_W = 110;
const CH_H = 52;

export function PccLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Python编程从入门到实践全书学习地图。四个板块：Python基础（学习地图、变量与列表）、控制流与函数（条件与循环、函数）、类与文件（类与对象、文件与异常、测试代码）、项目实战（游戏开发、数据可视化、总复习）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Python 编程：从入门到实践 全书学习地图
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            基础语法打底 · 控制流与函数强骨 · 类与文件拓边界 · 项目实战收全貌
          </text>

          {/* 四大板块 */}
          {SECTIONS.map((sec, secIdx) => (
            <g key={sec.title}>
              {/* 板块标签 */}
              <rect x={36} y={sec.y - 16} width={100} height={CH_H} rx="8" fill={sec.color} fillOpacity="0.12" stroke={sec.color} strokeWidth="1.4" strokeOpacity="0.5" />
              <text x={86} y={sec.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={sec.color}>
                {sec.title}
              </text>
              <text x={86} y={sec.y + 22} textAnchor="middle" fontSize="10" fill={secondary}>
                {`${sec.chapters.length} 章`}
              </text>

              {/* 章节卡片 */}
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
                    {/* 连接线 */}
                    {i > 0 && (
                      <line x1={COL_X[i - 1] + CH_W} y1={sec.y + 10} x2={x} y2={sec.y + 10} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
                    )}
                  </g>
                );
              })}

              {/* 板块间箭头 */}
              {secIdx < SECTIONS.length - 1 && (
                <line x1={86} y1={sec.y + CH_H - 16} x2={86} y2={sec.y + CH_H - 2} stroke={secondary} strokeWidth="1.4" markerEnd="url(#pcc-lm-arrow)" />
              )}
            </g>
          ))}

          <defs>
            <marker id="pcc-lm-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={396} x2={VIEW_W - 32} y2={396} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={412} textAnchor="middle" fontSize="11" fill={secondary}>
            变量列表是地基 · 控制流函数是骨架 · 类文件异常是进阶 · 项目实战串联全书
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Python 编程：从入门到实践 全书四大板块与十章依赖关系。
      </figcaption>
    </figure>
  );
}
