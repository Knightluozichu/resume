/**
 * <MrsLearningMapDiagram>：精通 Rust 第2版 全书学习地图。
 *
 * 四大板块（Rust进阶基础 · 内存与并发 · 元编程 · 生态与工程）及10章依赖关系。
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
  { title: "Rust 进阶基础", color: accent, chapters: ["学习地图", "高级类型"], y: 92 },
  { title: "内存与并发", color: success, chapters: ["内存管理", "并发深入"], y: 175 },
  { title: "元编程", color: warning, chapters: ["宏深入", "Trait 进阶", "Unsafe 深入"], y: 258 },
  { title: "生态与工程", color: danger, chapters: ["WebAssembly", "网络编程", "总复习"], y: 341 },
];

const COL_X = [60, 190, 320, 450, 580];
const CH_W = 110;
const CH_H = 52;

export function MrsLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="精通Rust第2版全书学习地图。四个板块：Rust进阶基础（学习地图、高级类型）、内存与并发（内存管理、并发深入）、元编程（宏深入、Trait进阶、Unsafe深入）、生态与工程（WebAssembly、网络编程、总复习）。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            精通 Rust 第2版 全书学习地图
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            进阶基础打底 · 内存并发强骨 · 元编程拓界 · 生态工程收全貌
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
                    {i > 0 && (
                      <line x1={COL_X[i - 1] + CH_W} y1={sec.y + 10} x2={x} y2={sec.y + 10} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
                    )}
                  </g>
                );
              })}

              {/* 板块间箭头 */}
              {secIdx < SECTIONS.length - 1 && (
                <line x1={86} y1={sec.y + CH_H - 16} x2={86} y2={sec.y + CH_H - 2} stroke={secondary} strokeWidth="1.4" markerEnd="url(#mrs-lm-arrow)" />
              )}
            </g>
          ))}

          <defs>
            <marker id="mrs-lm-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={396} x2={VIEW_W - 32} y2={396} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={412} textAnchor="middle" fontSize="11" fill={secondary}>
            类型系统是地基 · 内存并发是核心 · 元编程是利器 · 生态工程是落地
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        精通 Rust 第2版 全书四大板块与十章依赖关系。
      </figcaption>
    </figure>
  );
}
