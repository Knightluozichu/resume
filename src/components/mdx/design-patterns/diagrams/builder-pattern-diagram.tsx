/**
 * <BuilderPatternDiagram>：建造者模式分步构建流程图（design-patterns 课程）。
 *
 * 展示建造者模式的结构与分步流程：
 *   - 左侧 Director 类：持有 Builder 引用，construct() 编排构建步骤
 *   - 中间 Builder 接口（虚线边框、斜体、«interface»）：声明 buildPartA/B/C() 与 getResult()
 *   - 右侧 ConcreteBuilder 实现：内部 product 引用，逐步装配
 *   - 实线箭头 = 持有（Director → Builder）；虚线空心三角 = 实现接口（ConcreteBuilder → Builder）
 *   - 底部分步流水线：buildPartA → buildPartB → buildPartC → getResult，箭头连接
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×440（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / UML 主体 / 底部流水线+总结）。
 * 间距用 4 的倍数，主要坐标均为 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 440;

// Director 类框（左）
const DIRECTOR = { x: 40, y: 68, w: 180, h: 108 };
// Builder 接口框（中）
const BUILDER = { x: 270, y: 68, w: 180, h: 148 };
// ConcreteBuilder 框（右）
const CONCRETE = { x: 500, y: 68, w: 180, h: 148 };
// 底部流水线四个步骤框
const STEP_W = 140;
const STEP_H = 56;
const STEP_Y = 280;
const STEP_X = [56, 212, 368, 524] as const;

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const success = "var(--success)";

export function BuilderPatternDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="建造者模式分步构建流程图。左侧 Director 类持有 Builder 引用，construct() 方法编排构建步骤（实线箭头标「持有」指向 Builder）。中间 Builder 接口（虚线边框、斜体、«interface»）声明 buildPartA()、buildPartB()、buildPartC() 与 getResult() 方法。右侧 ConcreteBuilder 实现该接口，内部持有 product 引用，逐步装配各部件（虚线空心三角箭头指向 Builder 表示实现关系）。底部分步流水线展示构建顺序：buildPartA → buildPartB → buildPartC → getResult，用箭头连接如流水线，getResult 返回最终 Product。底部说明：建造者将复杂对象的构造与表示分离，分步骤创建。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 实现关系：空心三角箭头（指向接口），UML realization */}
            <marker
              id="builder-impl-arrow"
              markerWidth="12"
              markerHeight="12"
              refX="11"
              refY="6"
              orient="auto"
            >
              <path
                d="M1 1 L11 6 L1 11 z"
                fill={elevated}
                stroke={accent}
                strokeWidth="1"
              />
            </marker>
            {/* 关联 / 持有：实心三角箭头 */}
            <marker
              id="builder-holds-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={accent} />
            </marker>
            {/* 流水线箭头：实心三角（accent） */}
            <marker
              id="builder-flow-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={accent} />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="38"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            建造者模式 · 分步构建
          </text>

          {/* ===== Director 类框（左） ===== */}
          <g>
            <rect
              x={DIRECTOR.x}
              y={DIRECTOR.y}
              width={DIRECTOR.w}
              height={DIRECTOR.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={DIRECTOR.x + DIRECTOR.w / 2}
              y={DIRECTOR.y + 24}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Director
            </text>
            <line
              x1={DIRECTOR.x}
              y1={DIRECTOR.y + 34}
              x2={DIRECTOR.x + DIRECTOR.w}
              y2={DIRECTOR.y + 34}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={DIRECTOR.x + 14}
              y={DIRECTOR.y + 54}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - builder: Builder
            </text>
            <line
              x1={DIRECTOR.x}
              y1={DIRECTOR.y + 64}
              x2={DIRECTOR.x + DIRECTOR.w}
              y2={DIRECTOR.y + 64}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={DIRECTOR.x + 14}
              y={DIRECTOR.y + 84}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + construct()
            </text>
            <text
              x={DIRECTOR.x + 14}
              y={DIRECTOR.y + 100}
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              {"// 编排构建步骤"}
            </text>
          </g>

          {/* ===== 持有 关联箭头：Director → Builder ===== */}
          <line
            x1={DIRECTOR.x + DIRECTOR.w}
            y1={DIRECTOR.y + 44}
            x2={BUILDER.x - 2}
            y2={DIRECTOR.y + 44}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#builder-holds-arrow)"
          />
          <text
            x={(DIRECTOR.x + DIRECTOR.w + BUILDER.x) / 2}
            y={DIRECTOR.y + 34}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            持有
          </text>

          {/* ===== Builder 接口框（中） ===== */}
          <g>
            <rect
              x={BUILDER.x}
              y={BUILDER.y}
              width={BUILDER.w}
              height={BUILDER.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={BUILDER.x + BUILDER.w / 2}
              y={BUILDER.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={BUILDER.x + BUILDER.w / 2}
              y={BUILDER.y + 36}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Builder
            </text>
            <line
              x1={BUILDER.x}
              y1={BUILDER.y + 46}
              x2={BUILDER.x + BUILDER.w}
              y2={BUILDER.y + 46}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={BUILDER.x + 14}
              y={BUILDER.y + 64}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + buildPartA()
            </text>
            <text
              x={BUILDER.x + 14}
              y={BUILDER.y + 82}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + buildPartB()
            </text>
            <text
              x={BUILDER.x + 14}
              y={BUILDER.y + 100}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + buildPartC()
            </text>
            <text
              x={BUILDER.x + 14}
              y={BUILDER.y + 118}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + getResult()
            </text>
            <text
              x={BUILDER.x + 14}
              y={BUILDER.y + 136}
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              {"// 声明构建步骤"}
            </text>
          </g>

          {/* ===== 实现关系：ConcreteBuilder → Builder（虚线空心三角） ===== */}
          <line
            x1={CONCRETE.x}
            y1={CONCRETE.y + 44}
            x2={BUILDER.x + BUILDER.w + 2}
            y2={CONCRETE.y + 44}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#builder-impl-arrow)"
          />
          <text
            x={(BUILDER.x + BUILDER.w + CONCRETE.x) / 2}
            y={CONCRETE.y + 34}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            «implements»
          </text>

          {/* ===== ConcreteBuilder 框（右） ===== */}
          <g>
            <rect
              x={CONCRETE.x}
              y={CONCRETE.y}
              width={CONCRETE.w}
              height={CONCRETE.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={CONCRETE.x + CONCRETE.w / 2}
              y={CONCRETE.y + 24}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ConcreteBuilder
            </text>
            <line
              x1={CONCRETE.x}
              y1={CONCRETE.y + 34}
              x2={CONCRETE.x + CONCRETE.w}
              y2={CONCRETE.y + 34}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CONCRETE.x + 14}
              y={CONCRETE.y + 52}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - product: Product
            </text>
            <line
              x1={CONCRETE.x}
              y1={CONCRETE.y + 62}
              x2={CONCRETE.x + CONCRETE.w}
              y2={CONCRETE.y + 62}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CONCRETE.x + 14}
              y={CONCRETE.y + 80}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + buildPartA()
            </text>
            <text
              x={CONCRETE.x + 14}
              y={CONCRETE.y + 98}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + buildPartB()
            </text>
            <text
              x={CONCRETE.x + 14}
              y={CONCRETE.y + 116}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + buildPartC()
            </text>
            <text
              x={CONCRETE.x + 14}
              y={CONCRETE.y + 134}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + getResult()
            </text>
          </g>

          {/* ===== 底部分步流水线 ===== */}
          <text
            x={VIEW_W / 2}
            y="264"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            分步构建流程
          </text>

          {/* 四个步骤框 */}
          {(
            [
              { name: "buildPartA()", note: "构建部件 A", color: accent, i: 0 },
              { name: "buildPartB()", note: "构建部件 B", color: accent, i: 1 },
              { name: "buildPartC()", note: "构建部件 C", color: accent, i: 2 },
              {
                name: "getResult()",
                note: "返回 Product",
                color: success,
                i: 3,
              },
            ] as const
          ).map((step) => {
            const x = STEP_X[step.i];
            return (
              <g key={step.name}>
                <rect
                  x={x}
                  y={STEP_Y}
                  width={STEP_W}
                  height={STEP_H}
                  rx="8"
                  fill={step.color}
                  fillOpacity="0.08"
                  stroke={step.color}
                  strokeWidth="1.6"
                />
                <text
                  x={x + STEP_W / 2}
                  y={STEP_Y + 24}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={step.color}
                  fontFamily="monospace"
                >
                  {step.name}
                </text>
                <text
                  x={x + STEP_W / 2}
                  y={STEP_Y + 44}
                  textAnchor="middle"
                  fontSize="11"
                  fill={secondary}
                >
                  {step.note}
                </text>
              </g>
            );
          })}

          {/* 流水线箭头：步骤间连接 */}
          <line
            x1={STEP_X[0] + STEP_W}
            y1={STEP_Y + STEP_H / 2}
            x2={STEP_X[1] - 2}
            y2={STEP_Y + STEP_H / 2}
            stroke={accent}
            strokeWidth="1.6"
            markerEnd="url(#builder-flow-arrow)"
          />
          <line
            x1={STEP_X[1] + STEP_W}
            y1={STEP_Y + STEP_H / 2}
            x2={STEP_X[2] - 2}
            y2={STEP_Y + STEP_H / 2}
            stroke={accent}
            strokeWidth="1.6"
            markerEnd="url(#builder-flow-arrow)"
          />
          <line
            x1={STEP_X[2] + STEP_W}
            y1={STEP_Y + STEP_H / 2}
            x2={STEP_X[3] - 2}
            y2={STEP_Y + STEP_H / 2}
            stroke={accent}
            strokeWidth="1.6"
            markerEnd="url(#builder-flow-arrow)"
          />

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="408"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            建造者：将复杂对象的构造与表示分离，分步骤创建
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Director 只负责编排步骤顺序，Builder
        负责具体装配——同一套构建流程可以搭配不同 ConcreteBuilder
        产出不同表示，新增表示只需新增建造者，无需改 Director。
      </figcaption>
    </figure>
  );
}
