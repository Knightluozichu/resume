/**
 * <PatternCategoryMap>：GoF 23 设计模式全景分类图（design-patterns 课程入门章）。
 *
 * 三列布局：创建型（5，绿）/ 结构型（7，紫）/ 行为型（11，黄），每列顶部彩色标题，
 * 每个模式名是一张圆角小卡片，左缘一颗类别色小圆点把卡片系回所属类别。底部「复合模式」
 * 横条标注 MVC = Observer + Strategy + Composite，三个模式名分别用所属类别的语义色高亮
 * （Observer/Strategy 行为型黄、Composite 结构型紫），点出「模式可组合」的全书伏笔。
 *
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 宽 720（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 三列主体 / 底部复合模式）。
 */

const VIEW_W = 720;
const VIEW_H = 600;

// 三列几何：宽 200、列间距 28、左右各留 32。
const COL_W = 200;
const COL_GAP = 28;
const COL_MARGIN = 32;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

// 卡片几何：高 28、垂直间距 8（满足 R5 ≥8）。
const CARD_H = 28;
const CARD_GAP = 8;
const CARD_ROW = CARD_H + CARD_GAP; // 36
const CARDS_TOP_Y = 114; // 标题 + 列头之下

type Category = {
  id: string;
  name: string;
  color: string;
  patterns: string[];
};

const CATEGORIES: readonly Category[] = [
  {
    id: "creational",
    name: "创建型",
    color: "var(--success)",
    patterns: ["单例", "工厂方法", "抽象工厂", "建造者", "原型"],
  },
  {
    id: "structural",
    name: "结构型",
    color: "var(--accent)",
    patterns: ["适配器", "桥接", "组合", "装饰器", "外观", "享元", "代理"],
  },
  {
    id: "behavioral",
    name: "行为型",
    color: "var(--warning)",
    patterns: [
      "责任链",
      "命令",
      "解释器",
      "迭代器",
      "中介者",
      "备忘录",
      "观察者",
      "状态",
      "策略",
      "模板方法",
      "访问者",
    ],
  },
];

export function PatternCategoryMap() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="GoF 23 设计模式全景分类图。三列分别列出创建型 5 个（单例、工厂方法、抽象工厂、建造者、原型，绿色）、结构型 7 个（适配器、桥接、组合、装饰器、外观、享元、代理，紫色）、行为型 11 个（责任链、命令、解释器、迭代器、中介者、备忘录、观察者、状态、策略、模板方法、访问者，黄色）。底部复合模式横条标注 MVC = Observer + Strategy + Composite。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            GoF 23 设计模式全景图
          </text>
          <text
            x={VIEW_W / 2}
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            按用途分三大类：创建型 · 结构型 · 行为型
          </text>

          {/* ===== 三列 ===== */}
          {CATEGORIES.map((cat, ci) => {
            const x = colX(ci);
            return (
              <g key={cat.id}>
                {/* 列头彩色 pill */}
                <rect
                  x={x}
                  y="76"
                  width={COL_W}
                  height="30"
                  rx="8"
                  fill={cat.color}
                  fillOpacity="0.12"
                  stroke={cat.color}
                  strokeWidth="1.2"
                />
                <text
                  x={x + COL_W / 2}
                  y="96"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={cat.color}
                >
                  {cat.name}（{cat.patterns.length}）
                </text>

                {/* 模式卡片 */}
                {cat.patterns.map((name, pi) => {
                  const cy = CARDS_TOP_Y + pi * CARD_ROW;
                  return (
                    <g key={name}>
                      <rect
                        x={x}
                        y={cy}
                        width={COL_W}
                        height={CARD_H}
                        rx="6"
                        fill="var(--bg)"
                        stroke="var(--border)"
                        strokeWidth="1"
                      />
                      {/* 类别色小圆点：把卡片系回所属类别 */}
                      <circle
                        cx={x + 14}
                        cy={cy + CARD_H / 2}
                        r="3"
                        fill={cat.color}
                      />
                      <text
                        x={x + COL_W / 2}
                        y={cy + CARD_H / 2 + 4}
                        textAnchor="middle"
                        fontSize="12"
                        fill="var(--text-primary)"
                      >
                        {name}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* ===== 底部复合模式横条（三段分层之底部总结）===== */}
          <rect
            x="100"
            y="516"
            width="520"
            height="56"
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeOpacity="0.5"
          />
          {/* 第一行：MVC 方程，三个模式名按所属类别语义色高亮 */}
          <text
            x={VIEW_W / 2}
            y="540"
            textAnchor="middle"
            fontSize="13"
            fill="var(--text-primary)"
          >
            <tspan fontWeight="700" fill="var(--accent)">
              复合模式
            </tspan>
            <tspan fill="var(--text-secondary)">：MVC = </tspan>
            <tspan fontWeight="600" fill="var(--warning)">
              Observer
            </tspan>
            <tspan fill="var(--text-secondary)"> + </tspan>
            <tspan fontWeight="600" fill="var(--warning)">
              Strategy
            </tspan>
            <tspan fill="var(--text-secondary)"> + </tspan>
            <tspan fontWeight="600" fill="var(--accent)">
              Composite
            </tspan>
          </text>
          {/* 第二行：一句话注解 */}
          <text
            x={VIEW_W / 2}
            y="560"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            多个基础模式组合协作，解决更复杂的问题
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        23 个模式按「创建 / 结构 / 行为」三大类组织；模式并非孤立，复合模式（如
        MVC）把多个基础模式组合起来解决一类问题。
      </figcaption>
    </figure>
  );
}
