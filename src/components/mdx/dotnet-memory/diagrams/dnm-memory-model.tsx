/**
 * <DnmMemoryModelDiagram>：.NET 内存管理宝典全书学习地图。
 *
 * 四大板块（内存基础 · SOS调试工具 · 内存模式 · 高级主题）及 10 章的依赖关系。
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
  { title: "内存基础", color: accent, chapters: ["学习地图", "内存模型"], y: 92 },
  { title: "SOS 调试", color: success, chapters: ["SOS 转储", "SOS 堆分析"], y: 175 },
  { title: "内存模式", color: warning, chapters: ["大对象堆", "对象固定", "终结化"], y: 258 },
  { title: "高级主题", color: danger, chapters: ["内存压力", "碎片优化", "总复习"], y: 341 },
];

const COL_X = [60, 190, 320, 450, 580];
const CH_W = 110;
const CH_H = 52;

export function DnmMemoryModelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label=".NET 内存管理宝典全书学习地图。四个板块：内存基础（学习地图、内存模型）、SOS 调试（SOS 转储、SOS 堆分析）、内存模式（大对象堆、对象固定、终结化）、高级主题（内存压力、碎片优化、总复习）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            .NET 内存管理宝典 全书学习地图
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            内存模型打底 · SOS 调试探查 · 模式定位 · 优化收全貌
          </text>

          {/* 四大板块 */}
          {SECTIONS.map((sec, secIdx) => {
            const prevChapters = SECTIONS.slice(0, secIdx).reduce((acc, s) => acc + s.chapters.length, 0);
            return (
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
                  const chIdx = prevChapters + i + 1;
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
                  <line x1={86} y1={sec.y + CH_H - 16} x2={86} y2={sec.y + CH_H - 2} stroke={secondary} strokeWidth="1.4" markerEnd="url(#dnm-mm-arrow)" />
                )}
              </g>
            );
          })}

          <defs>
            <marker id="dnm-mm-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={396} x2={VIEW_W - 32} y2={396} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={412} textAnchor="middle" fontSize="11" fill={secondary}>
            托管堆是地基 · SOS 是探查器 · 模式决定性能 · 优化收官闭环
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        .NET 内存管理宝典全书四大板块与十章依赖关系。
      </figcaption>
    </figure>
  );
}
