/**
 * <CtcLearningMapDiagram>：C# 10 核心技术指南全书学习地图。
 *
 * 四列布局对应全书四大板块：
 *   语言核心（紫，2 章）/ 类型系统（绿，2 章）/ 异步并发（橙，2 章）/ 现代特性（红，4 章）
 * 每列顶部彩色标题 pill，每个章节是一张圆角小卡片，左缘一颗板块色小圆点。
 * 卡片间箭头串成「类型系统→泛型委托→异步并行→现代特性」的学习路径。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11，间距用 4 的倍数。
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

type Column = {
  id: string;
  name: string;
  color: string;
  chapters: string[];
};

const COLUMNS: readonly Column[] = [
  {
    id: "lang",
    name: "语言核心",
    color: accent,
    chapters: ["1. 学习地图", "2. 类型系统总览"],
  },
  {
    id: "types",
    name: "类型系统",
    color: success,
    chapters: ["3. 泛型深入", "4. 委托与事件"],
  },
  {
    id: "async",
    name: "异步并发",
    color: warning,
    chapters: ["5. 异步深入", "6. 并行与 TPL"],
  },
  {
    id: "modern",
    name: "现代特性",
    color: danger,
    chapters: ["7. 模式匹配", "8. Record与结构体", "9. 源生成器", "10. 总复习"],
  },
];

const COL_W = 152;
const COL_GAP = 16;
const COL_MARGIN = 32;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const CARD_H = 30;
const CARD_GAP = 8;
const CARD_ROW = CARD_H + CARD_GAP;
const CARDS_TOP_Y = 150;

export function CtcLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C# 10 核心技术指南全书学习地图。四列从左到右对应四大板块：语言核心（紫色，2 章）、类型系统（绿色，2 章）、异步并发（橙色，2 章）、现代特性（红色，4 章）。卡片间箭头表示从类型系统到现代特性的递进学习路径。底部总结：四大板块递进，类型系统是地基。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            C# 10 核心技术指南 · 全书学习地图
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            从类型系统到现代特性，四段递进 · 十章核心
          </text>

          {/* 路径箭头条 */}
          <rect x={COL_MARGIN} y={68} width={VIEW_W - COL_MARGIN * 2} height="28" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={86} textAnchor="middle" fontSize="12" fill={secondary}>
            <tspan fontWeight="700" fill={accent} fontSize="12">学习路径</tspan>
            <tspan>{"　"}</tspan>
            <tspan fill={primary}>类型系统 → 泛型委托 → 异步并行 → 现代特性</tspan>
          </text>

          {/* 四列 */}
          {COLUMNS.map((col, ci) => {
            const x = colX(ci);
            return (
              <g key={col.id}>
                {/* 列头 pill */}
                <rect x={x} y={112} width={COL_W} height="28" rx="8" fill={col.color} fillOpacity="0.12" stroke={col.color} strokeWidth="1.2" />
                <text x={x + COL_W / 2} y={131} textAnchor="middle" fontSize="12" fontWeight="700" fill={col.color}>{col.name}</text>

                {/* 章节卡片 */}
                {col.chapters.map((name, pi) => {
                  const cy = CARDS_TOP_Y + pi * CARD_ROW;
                  const isLast = pi === col.chapters.length - 1;
                  return (
                    <g key={name}>
                      <rect x={x} y={cy} width={COL_W} height={CARD_H} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
                      <circle cx={x + 12} cy={cy + CARD_H / 2} r="3" fill={col.color} />
                      <text x={x + COL_W / 2} y={cy + CARD_H / 2 + 4} textAnchor="middle" fontSize="11" fill={primary}>{name}</text>
                      {!isLast && (
                        <line x1={x + COL_W / 2} y1={cy + CARD_H} x2={x + COL_W / 2} y2={cy + CARD_ROW - 2} stroke={col.color} strokeWidth="1.2" strokeOpacity="0.5" />
                      )}
                    </g>
                  );
                })}

                {/* 列间箭头 */}
                {ci < COLUMNS.length - 1 && (
                  <path
                    d={`M ${x + COL_W + 2} ${CARDS_TOP_Y + 20} L ${colX(ci + 1) - 4} ${CARDS_TOP_Y + 20}`}
                    fill="none"
                    stroke={secondary}
                    strokeWidth="1.4"
                    strokeOpacity="0.5"
                    markerEnd="url(#ctc-lm-arrow)"
                  />
                )}
              </g>
            );
          })}

          {/* 底部总结 */}
          <rect x="60" y={CARDS_TOP_Y + 4 * CARD_ROW + 8} width={VIEW_W - 120} height="48" rx="12" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={CARDS_TOP_Y + 4 * CARD_ROW + 30} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            四大板块递进 · 类型系统是地基
          </text>
          <text x={VIEW_W / 2} y={CARDS_TOP_Y + 4 * CARD_ROW + 48} textAnchor="middle" fontSize="11" fill={secondary}>
            每个特性建立在前一个基础上：泛型是类型参数化，委托是类型安全回调
          </text>

          <defs>
            <marker id="ctc-lm-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书分四大板块：语言核心建立类型系统认知，类型系统深入泛型与委托，异步并发覆盖 async/await 与并行 TPL，现代特性收束模式匹配、Record 与源生成器。
      </figcaption>
    </figure>
  );
}
