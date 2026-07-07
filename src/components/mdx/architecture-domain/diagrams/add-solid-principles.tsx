/**
 * <AddSolidPrinciplesDiagram>：SOLID 五原则图解（architecture-domain 架构原则章）。
 *
 * 五个圆角矩形竖向排列，每个矩形包含：
 *   - 原则缩写与全名（左上）
 *   - 一句话中文定义（左中）
 *   - 代码级示例（右下，monospace）
 * SRP（单一职责）、OCP（开闭原则）、LSP（里氏替换）、ISP（接口隔离）、DIP（依赖倒置）。
 * 用不同 CSS 变量色区分：S=success / O=accent / L=warning / I=accent / D=success。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×520（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 520;

const CARD_W = 624;
const CARD_H = 76;
const CARD_GAP = 12;
const CARD_X = 48;
const CARD_START_Y = 76;
const cardY = (i: number) => CARD_START_Y + i * (CARD_H + CARD_GAP);

interface Principle {
  abbr: string;
  fullName: string;
  definition: string;
  example: string;
  color: string;
}

const PRINCIPLES: readonly Principle[] = [
  {
    abbr: "SRP",
    fullName: "Single Responsibility Principle",
    definition: "一个类只该有一个被修改的原因",
    example: "class InvoicePrinter { print() }  // 只管打印",
    color: "var(--success)",
  },
  {
    abbr: "OCP",
    fullName: "Open-Closed Principle",
    definition: "对扩展开放，对修改关闭",
    example: "interface Shape { area() }  // 新形状加类即可",
    color: "var(--accent)",
  },
  {
    abbr: "LSP",
    fullName: "Liskov Substitution Principle",
    definition: "子类必须能替换父类而不出错",
    example: "class Penguin extends Bird { fly() → throw }  // 违反",
    color: "var(--warning)",
  },
  {
    abbr: "ISP",
    fullName: "Interface Segregation Principle",
    definition: "接口要小而专，不强迫实现无用方法",
    example: "interface Readable { read() }  // 拆分胖接口",
    color: "var(--accent)",
  },
  {
    abbr: "DIP",
    fullName: "Dependency Inversion Principle",
    definition: "依赖抽象，不依赖具体实现",
    example: "class Service { ctor(repo: IRepository) }  // 注入接口",
    color: "var(--success)",
  },
];

export function AddSolidPrinciplesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="SOLID 五原则图解。五个圆角矩形竖向排列：SRP 单一职责（一个类只该有一个被修改的原因）、OCP 开闭原则（对扩展开放对修改关闭）、LSP 里氏替换（子类必须能替换父类）、ISP 接口隔离（接口要小而专）、DIP 依赖倒置（依赖抽象不依赖具体）。每个矩形内含原则缩写、全名、一句话定义和代码级示例。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text
            x={VIEW_W / 2}
            y={36}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            SOLID 五原则
          </text>
          <text
            x={VIEW_W / 2}
            y={56}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            面向对象设计的五块基石——守住它们，代码才容易被扩展和修改
          </text>

          {/* 五个原则卡片 */}
          {PRINCIPLES.map((p, i) => {
            const y = cardY(i);
            const cx = CARD_X + 44;
            return (
              <g key={p.abbr}>
                <rect
                  x={CARD_X}
                  y={y}
                  width={CARD_W}
                  height={CARD_H}
                  rx="10"
                  fill={p.color}
                  fillOpacity="0.06"
                  stroke={p.color}
                  strokeWidth="1.5"
                  strokeOpacity="0.55"
                />
                {/* 缩写徽章 */}
                <rect
                  x={CARD_X + 12}
                  y={y + 14}
                  width={64}
                  height={28}
                  rx="6"
                  fill={p.color}
                  fillOpacity="0.16"
                  stroke={p.color}
                  strokeWidth="1.2"
                />
                <text
                  x={CARD_X + 44}
                  y={y + 33}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={p.color}
                  fontFamily="monospace"
                >
                  {p.abbr}
                </text>

                {/* 全名 */}
                <text
                  x={cx + 72}
                  y={y + 24}
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {p.fullName}
                </text>
                {/* 定义 */}
                <text
                  x={cx + 72}
                  y={y + 42}
                  fontSize="12"
                  fill="var(--text-secondary)"
                >
                  {p.definition}
                </text>
                {/* 代码示例 */}
                <text
                  x={cx + 72}
                  y={y + 62}
                  fontSize="11"
                  fill={p.color}
                  fontFamily="monospace"
                  fontStyle="italic"
                >
                  {p.example}
                </text>
              </g>
            );
          })}

          {/* 底部总结 */}
          <line
            x1={48}
            y1={484}
            x2={VIEW_W - 48}
            y2={484}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x={VIEW_W / 2}
            y={506}
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            SRP 定职责 · OCP 管扩展 · LSP 保替换 · ISP 拆接口 · DIP 转依赖
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        SOLID 五原则：单一职责定边界、开闭管扩展、里氏保替换、接口隔离拆胖接口、依赖倒置转依赖方向——从职责到依赖逐层提升设计质量。
      </figcaption>
    </figure>
  );
}
