/**
 * <FlpLearningMapDiagram>：流畅的 Python 全书学习地图。
 *
 * 四大板块（Python 数据模型 · 数据结构 · 函数与对象 · 高级特性）及 10 章依赖关系。
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
  { title: "Python 数据模型", color: accent, chapters: ["学习地图", "数据模型"], y: 84 },
  { title: "数据结构", color: success, chapters: ["序列类型", "字典与集合"], y: 156 },
  { title: "函数与对象", color: warning, chapters: ["一等函数", "类型提示", "协议与 ABC"], y: 228 },
  { title: "高级特性", color: danger, chapters: ["闭包与装饰器", "生成器", "总复习"], y: 300 },
];

const COL_X = [180, 320, 460];
const CH_W = 124;
const CH_H = 50;

export function FlpLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="流畅的Python全书学习地图。四个板块：Python数据模型（学习地图、数据模型）、数据结构（序列类型、字典与集合）、函数与对象（一等函数、类型提示、协议与ABC）、高级特性（闭包与装饰器、生成器、总复习）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            流畅的 Python 全书学习地图
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            数据模型立心 · 数据结构筑基 · 函数对象塑形 · 高级特性升华
          </text>

          {/* 四大板块 */}
          {SECTIONS.map((sec, secIdx) => (
            <g key={sec.title}>
              {/* 板块标签 */}
              <rect x={36} y={sec.y - 16} width={120} height={CH_H} rx="8" fill={sec.color} fillOpacity="0.12" stroke={sec.color} strokeWidth="1.4" strokeOpacity="0.5" />
              <text x={96} y={sec.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={sec.color}>
                {sec.title}
              </text>
              <text x={96} y={sec.y + 22} textAnchor="middle" fontSize="10" fill={secondary}>
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

              {/* 板块间箭头 */}
              {secIdx < SECTIONS.length - 1 && (
                <line x1={96} y1={sec.y + CH_H - 16} x2={96} y2={sec.y + CH_H - 2} stroke={secondary} strokeWidth="1.4" markerEnd="url(#flp-lm-arrow)" />
              )}
            </g>
          ))}

          <defs>
            <marker id="flp-lm-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={352} x2={VIEW_W - 32} y2={352} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={372} textAnchor="middle" fontSize="11" fill={secondary}>
            数据模型是 Python 的世界观 · 序列字典是其骨架 · 函数对象是其脉络 · 闭包生成器是其内功
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        流畅的 Python 四大板块与十章依赖关系。
      </figcaption>
    </figure>
  );
}
