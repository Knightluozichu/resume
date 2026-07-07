/**
 * <CfpLearningMapDiagram>：C# 函数式编程全书学习地图。
 *
 * 四大板块（函数式基础 · 高阶函数 · 不可变性 · 函数式实践）及 10 章的依赖关系。
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
  { title: "函数式基础", color: accent, chapters: ["学习地图", "函数优先"], y: 92 },
  { title: "高阶函数", color: success, chapters: ["高阶函数", "柯里化与偏应用"], y: 175 },
  { title: "不可变性", color: warning, chapters: ["不可变数据", "函数式模式匹配"], y: 258 },
  { title: "函数式实践", color: danger, chapters: ["延迟求值", "Monad与链式", "函数式错误处理", "总复习"], y: 341 },
];

const CH_W = 104;
const CH_H = 52;

export function CfpLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C# 函数式编程全书学习地图。四个板块：函数式基础（学习地图、函数优先）、高阶函数（高阶函数、柯里化与偏应用）、不可变性（不可变数据、函数式模式匹配）、函数式实践（延迟求值、Monad与链式、函数式错误处理、总复习）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            C# 函数式编程全书学习地图
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            函数是一等公民 · 高阶抽象组合 · 不可变数据建模 · 实践模式落地
          </text>

          {/* 四大板块 */}
          {SECTIONS.map((sec) => {
            const startX = 160;
            const gap = CH_W + 16;
            return (
              <g key={sec.title}>
                {/* 板块标签 */}
                <rect x={36} y={sec.y - 16} width={108} height={CH_H} rx="8" fill={sec.color} fillOpacity="0.12" stroke={sec.color} strokeWidth="1.4" strokeOpacity="0.5" />
                <text x={90} y={sec.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={sec.color}>
                  {sec.title}
                </text>
                <text x={90} y={sec.y + 22} textAnchor="middle" fontSize="10" fill={secondary}>
                  {sec.chapters.length} 章
                </text>

                {/* 章节卡片 */}
                {sec.chapters.map((ch, i) => {
                  const x = startX + i * gap;
                  return (
                    <g key={ch}>
                      <rect x={x} y={sec.y - 16} width={CH_W} height={CH_H} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
                      <text x={x + CH_W / 2} y={sec.y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>
                        {ch.length > 6 ? ch.substring(0, 6) + ".." : ch}
                      </text>
                      <text x={x + CH_W / 2} y={sec.y + 22} textAnchor="middle" fontSize="10" fill={secondary}>
                        {`第 ${SECTIONS.indexOf(sec) * 2 + i + 1} 章`}
                      </text>
                      {i > 0 && (
                        <line x1={startX + (i - 1) * gap + CH_W} y1={sec.y + 10} x2={x} y2={sec.y + 10} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
                      )}
                    </g>
                  );
                })}

                {/* 板块间箭头 */}
                {sec.title !== "函数式实践" && (
                  <line x1={90} y1={sec.y + CH_H - 16} x2={90} y2={sec.y + CH_H - 2} stroke={secondary} strokeWidth="1.4" markerEnd="url(#cfp-lm-arrow)" />
                )}
              </g>
            );
          })}

          <defs>
            <marker id="cfp-lm-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={396} x2={VIEW_W - 32} y2={396} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={412} textAnchor="middle" fontSize="11" fill={secondary}>
            函数是一等公民 · 高阶函数是组合引擎 · 不可变性是安全基石 · Monad是抽象工具箱
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C# 函数式编程全书四大板块与十章依赖关系。
      </figcaption>
    </figure>
  );
}
