/**
 * <SolidPrinciplesDiagram>：SOLID 五大原则图解（design-patterns 课程入门章）。
 *
 * 五个圆角卡片横向排列，每个卡片：大号字母（带彩色圆形徽章）+ 原则英文全名 + 一句话中文解释。
 * 五个字母 S-O-L-I-D 拼成 SOLID，每张卡片用不同强调色边框区分：
 *   S=success（单一职责，做一件事）/ O=accent（开闭，扩展）/ L=warning（里氏替换，替换）/
 *   I=danger（接口隔离，小而专）/ D=accent（依赖倒置，依赖抽象）。
 *
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 宽 720（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻卡片间距 ≥8、同类元素（卡片/徽章/字号）尺寸统一（R11）。
 */

const VIEW_W = 720;
const VIEW_H = 280;

// 五卡片几何：宽 120、间距 12、左右各留 36。
const CARD_W = 120;
const CARD_GAP = 12;
const CARD_MARGIN = 36;
const CARD_H = 216;
const CARD_Y = 32;
const cardX = (i: number) => CARD_MARGIN + i * (CARD_W + CARD_GAP);

type Principle = {
  letter: string;
  enLines: string[]; // 英文全名，1 或 2 行
  zhLines: string[]; // 中文一句话解释，固定 2 行
  color: string;
};

const PRINCIPLES: readonly Principle[] = [
  {
    letter: "S",
    enLines: ["Single", "Responsibility"],
    zhLines: ["一个类", "只做一件事"],
    color: "var(--success)",
  },
  {
    letter: "O",
    enLines: ["Open-Closed"],
    zhLines: ["对扩展开放，", "对修改关闭"],
    color: "var(--accent)",
  },
  {
    letter: "L",
    enLines: ["Liskov", "Substitution"],
    zhLines: ["子类必须能", "替换父类"],
    color: "var(--warning)",
  },
  {
    letter: "I",
    enLines: ["Interface", "Segregation"],
    zhLines: ["接口要", "小而专"],
    color: "var(--danger)",
  },
  {
    letter: "D",
    enLines: ["Dependency", "Inversion"],
    zhLines: ["依赖抽象，", "不依赖具体"],
    color: "var(--accent)",
  },
];

export function SolidPrinciplesDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="SOLID 五大原则图解。五个卡片横向排列：S 单一职责（一个类只做一件事）、O 开闭原则（对扩展开放，对修改关闭）、L 里氏替换（子类必须能替换父类）、I 接口隔离（接口要小而专）、D 依赖倒置（依赖抽象，不依赖具体）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {PRINCIPLES.map((p, i) => {
            const x = cardX(i);
            const cx = x + CARD_W / 2;
            return (
              <g key={p.letter}>
                {/* 卡片底框：类别色淡底 + 类别色边框 */}
                <rect
                  x={x}
                  y={CARD_Y}
                  width={CARD_W}
                  height={CARD_H}
                  rx="12"
                  fill={p.color}
                  fillOpacity="0.07"
                  stroke={p.color}
                  strokeWidth="1.8"
                />
                {/* 字母圆形徽章 */}
                <circle
                  cx={cx}
                  cy="84"
                  r="26"
                  fill={p.color}
                  fillOpacity="0.16"
                  stroke={p.color}
                  strokeWidth="1"
                  strokeOpacity="0.45"
                />
                <text
                  x={cx}
                  y="96"
                  textAnchor="middle"
                  fontSize="38"
                  fontWeight="700"
                  fill={p.color}
                >
                  {p.letter}
                </text>

                {/* 英文原则全名：1 行居中 / 2 行分排 */}
                {p.enLines.length === 1 ? (
                  <text
                    x={cx}
                    y="142"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill="var(--text-primary)"
                  >
                    {p.enLines[0]}
                  </text>
                ) : (
                  <>
                    <text
                      x={cx}
                      y="134"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill="var(--text-primary)"
                    >
                      {p.enLines[0]}
                    </text>
                    <text
                      x={cx}
                      y="150"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill="var(--text-primary)"
                    >
                      {p.enLines[1]}
                    </text>
                  </>
                )}

                {/* 分隔线 */}
                <line
                  x1={x + 18}
                  y1="164"
                  x2={x + CARD_W - 18}
                  y2="164"
                  stroke="var(--border)"
                  strokeWidth="1"
                />

                {/* 中文一句话解释：固定 2 行 */}
                <text
                  x={cx}
                  y="190"
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--text-secondary)"
                >
                  {p.zhLines[0]}
                </text>
                <text
                  x={cx}
                  y="210"
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--text-secondary)"
                >
                  {p.zhLines[1]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        SOLID
        五原则是面向对象设计的基石：单一职责、开闭、里氏替换、接口隔离、依赖倒置——守住它们，代码才容易被扩展和修改。
      </figcaption>
    </figure>
  );
}
