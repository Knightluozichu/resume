/**
 * <AbstractFactoryDiagram>：抽象工厂模式结构图（design-patterns 课程）。
 *
 * 展示抽象工厂「产品族」结构：
 *   - 顶部居中 AbstractFactory 接口（虚线边框、斜体、«interface»），声明 createA() / createB()
 *   - 顶部左侧 AbstractProductA 接口（success 族）、顶部右侧 AbstractProductB 接口（warning 族）
 *   - 左下 ConcreteFactory1 生产 ProductA1 + ProductB1；右下 ConcreteFactory2 生产 ProductA2 + ProductB2
 *   - 实现关系（虚线空心三角 rake）：两个具体工厂 → AbstractFactory，标 «implements»
 *   - 创建关系（虚线箭头标 «create»）：具体工厂 → 对应具体产品
 *   - 同族产品用 success / warning 色彩分组，与对应抽象产品呼应
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / 主体 / 底部总结）。
 * 间距用 4 的倍数，主要坐标均为 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 460;

// AbstractFactory 接口框（顶部居中）
const ABS_FACTORY = { x: 248, y: 64, w: 224, h: 96 };
// AbstractProductA 接口框（顶部左）
const ABS_PROD_A = { x: 40, y: 72, w: 196, h: 64 };
// AbstractProductB 接口框（顶部右）
const ABS_PROD_B = { x: 484, y: 72, w: 196, h: 64 };
// 两个具体工厂框（底部）
const CONC_FACT_1 = { x: 80, y: 236, w: 240, h: 92 };
const CONC_FACT_2 = { x: 400, y: 236, w: 240, h: 92 };
// 四个具体产品框（最底部）
const PROD_A1 = { x: 80, y: 356, w: 112, h: 56 };
const PROD_B1 = { x: 208, y: 356, w: 112, h: 56 };
const PROD_A2 = { x: 400, y: 356, w: 112, h: 56 };
const PROD_B2 = { x: 528, y: 356, w: 112, h: 56 };
// 实现关系 rake
const BUS_Y = 200;

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const success = "var(--success)";
const warning = "var(--warning)";

export function AbstractFactoryDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="抽象工厂模式结构图。顶部居中是 AbstractFactory 接口（虚线边框、斜体），声明 createA() 与 createB() 方法。顶部左侧是 AbstractProductA 接口（绿色族），顶部右侧是 AbstractProductB 接口（黄色族）。左下 ConcreteFactory1 生产 ProductA1 与 ProductB1；右下 ConcreteFactory2 生产 ProductA2 与 ProductB2。两个具体工厂以虚线空心三角箭头（rake）指向 AbstractFactory 表示实现关系，标注 «implements»。每个具体工厂以虚线箭头指向其生产的两个具体产品，标注 «create»。同族产品用绿色 / 黄色分组，与对应抽象产品呼应。底部说明：抽象工厂创建一系列相关产品的工厂族。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 实现关系：空心三角箭头（指向接口），UML realization */}
            <marker
              id="abf-impl-arrow"
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
            {/* 创建关系：实心三角箭头（accent） */}
            <marker
              id="abf-create-arrow"
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
            抽象工厂模式 · 结构图
          </text>

          {/* ===== AbstractFactory 接口框（顶部居中） ===== */}
          <g>
            <rect
              x={ABS_FACTORY.x}
              y={ABS_FACTORY.y}
              width={ABS_FACTORY.w}
              height={ABS_FACTORY.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={ABS_FACTORY.x + ABS_FACTORY.w / 2}
              y={ABS_FACTORY.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={ABS_FACTORY.x + ABS_FACTORY.w / 2}
              y={ABS_FACTORY.y + 36}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              AbstractFactory
            </text>
            <line
              x1={ABS_FACTORY.x}
              y1={ABS_FACTORY.y + 46}
              x2={ABS_FACTORY.x + ABS_FACTORY.w}
              y2={ABS_FACTORY.y + 46}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={ABS_FACTORY.x + 14}
              y={ABS_FACTORY.y + 64}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + createA(): AbstractProductA
            </text>
            <text
              x={ABS_FACTORY.x + 14}
              y={ABS_FACTORY.y + 82}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + createB(): AbstractProductB
            </text>
          </g>

          {/* ===== AbstractProductA 接口框（顶部左，success 族） ===== */}
          <g>
            <rect
              x={ABS_PROD_A.x}
              y={ABS_PROD_A.y}
              width={ABS_PROD_A.w}
              height={ABS_PROD_A.h}
              rx="10"
              fill={success}
              fillOpacity="0.08"
              stroke={success}
              strokeWidth="1.6"
              strokeDasharray="6 4"
            />
            <text
              x={ABS_PROD_A.x + ABS_PROD_A.w / 2}
              y={ABS_PROD_A.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={ABS_PROD_A.x + ABS_PROD_A.w / 2}
              y={ABS_PROD_A.y + 36}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={success}
              fontStyle="italic"
              fontFamily="monospace"
            >
              AbstractProductA
            </text>
            <line
              x1={ABS_PROD_A.x}
              y1={ABS_PROD_A.y + 46}
              x2={ABS_PROD_A.x + ABS_PROD_A.w}
              y2={ABS_PROD_A.y + 46}
              stroke={success}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={ABS_PROD_A.x + 14}
              y={ABS_PROD_A.y + 60}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + operationA()
            </text>
          </g>

          {/* ===== AbstractProductB 接口框（顶部右，warning 族） ===== */}
          <g>
            <rect
              x={ABS_PROD_B.x}
              y={ABS_PROD_B.y}
              width={ABS_PROD_B.w}
              height={ABS_PROD_B.h}
              rx="10"
              fill={warning}
              fillOpacity="0.08"
              stroke={warning}
              strokeWidth="1.6"
              strokeDasharray="6 4"
            />
            <text
              x={ABS_PROD_B.x + ABS_PROD_B.w / 2}
              y={ABS_PROD_B.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={ABS_PROD_B.x + ABS_PROD_B.w / 2}
              y={ABS_PROD_B.y + 36}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={warning}
              fontStyle="italic"
              fontFamily="monospace"
            >
              AbstractProductB
            </text>
            <line
              x1={ABS_PROD_B.x}
              y1={ABS_PROD_B.y + 46}
              x2={ABS_PROD_B.x + ABS_PROD_B.w}
              y2={ABS_PROD_B.y + 46}
              stroke={warning}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={ABS_PROD_B.x + 14}
              y={ABS_PROD_B.y + 60}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + operationB()
            </text>
          </g>

          {/* ===== 实现关系 rake：两具体工厂 → AbstractFactory ===== */}
          {/* 横向 bus */}
          <line
            x1={CONC_FACT_1.x + CONC_FACT_1.w / 2}
            y1={BUS_Y}
            x2={CONC_FACT_2.x + CONC_FACT_2.w / 2}
            y2={BUS_Y}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
          />
          {/* 主干 → AbstractFactory 底部 */}
          <line
            x1={VIEW_W / 2}
            y1={BUS_Y}
            x2={VIEW_W / 2}
            y2={ABS_FACTORY.y + ABS_FACTORY.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#abf-impl-arrow)"
          />
          {/* 两条 drop：具体工厂顶部 → bus */}
          <line
            x1={CONC_FACT_1.x + CONC_FACT_1.w / 2}
            y1={CONC_FACT_1.y}
            x2={CONC_FACT_1.x + CONC_FACT_1.w / 2}
            y2={BUS_Y}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
          />
          <line
            x1={CONC_FACT_2.x + CONC_FACT_2.w / 2}
            y1={CONC_FACT_2.y}
            x2={CONC_FACT_2.x + CONC_FACT_2.w / 2}
            y2={BUS_Y}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
          />
          <text
            x={VIEW_W / 2 + 12}
            y={BUS_Y - 8}
            fontSize="11"
            fill={secondary}
            fontStyle="italic"
          >
            «implements»
          </text>

          {/* ===== ConcreteFactory1 框（左下） ===== */}
          <g>
            <rect
              x={CONC_FACT_1.x}
              y={CONC_FACT_1.y}
              width={CONC_FACT_1.w}
              height={CONC_FACT_1.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={CONC_FACT_1.x + CONC_FACT_1.w / 2}
              y={CONC_FACT_1.y + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ConcreteFactory1
            </text>
            <line
              x1={CONC_FACT_1.x}
              y1={CONC_FACT_1.y + 32}
              x2={CONC_FACT_1.x + CONC_FACT_1.w}
              y2={CONC_FACT_1.y + 32}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CONC_FACT_1.x + 14}
              y={CONC_FACT_1.y + 50}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + createA(): ProductA1
            </text>
            <text
              x={CONC_FACT_1.x + 14}
              y={CONC_FACT_1.y + 68}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + createB(): ProductB1
            </text>
            <text
              x={CONC_FACT_1.x + 14}
              y={CONC_FACT_1.y + 84}
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              // 生产 A1 + B1
            </text>
          </g>

          {/* ===== ConcreteFactory2 框（右下） ===== */}
          <g>
            <rect
              x={CONC_FACT_2.x}
              y={CONC_FACT_2.y}
              width={CONC_FACT_2.w}
              height={CONC_FACT_2.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={CONC_FACT_2.x + CONC_FACT_2.w / 2}
              y={CONC_FACT_2.y + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ConcreteFactory2
            </text>
            <line
              x1={CONC_FACT_2.x}
              y1={CONC_FACT_2.y + 32}
              x2={CONC_FACT_2.x + CONC_FACT_2.w}
              y2={CONC_FACT_2.y + 32}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CONC_FACT_2.x + 14}
              y={CONC_FACT_2.y + 50}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + createA(): ProductA2
            </text>
            <text
              x={CONC_FACT_2.x + 14}
              y={CONC_FACT_2.y + 68}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + createB(): ProductB2
            </text>
            <text
              x={CONC_FACT_2.x + 14}
              y={CONC_FACT_2.y + 84}
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              // 生产 A2 + B2
            </text>
          </g>

          {/* ===== 创建关系：具体工厂 → 具体产品（虚线箭头标 «create»） ===== */}
          {/* ConcreteFactory1 → ProductA1 / ProductB1 */}
          <line
            x1={CONC_FACT_1.x + 60}
            y1={CONC_FACT_1.y + CONC_FACT_1.h}
            x2={PROD_A1.x + PROD_A1.w / 2}
            y2={PROD_A1.y - 2}
            stroke={accent}
            strokeWidth="1.4"
            strokeDasharray="5 3"
            markerEnd="url(#abf-create-arrow)"
          />
          <line
            x1={CONC_FACT_1.x + CONC_FACT_1.w - 60}
            y1={CONC_FACT_1.y + CONC_FACT_1.h}
            x2={PROD_B1.x + PROD_B1.w / 2}
            y2={PROD_B1.y - 2}
            stroke={accent}
            strokeWidth="1.4"
            strokeDasharray="5 3"
            markerEnd="url(#abf-create-arrow)"
          />
          <text
            x={CONC_FACT_1.x + CONC_FACT_1.w / 2}
            y={CONC_FACT_1.y + CONC_FACT_1.h + 18}
            textAnchor="middle"
            fontSize="11"
            fill={accent}
            fontStyle="italic"
          >
            «create»
          </text>

          {/* ConcreteFactory2 → ProductA2 / ProductB2 */}
          <line
            x1={CONC_FACT_2.x + 60}
            y1={CONC_FACT_2.y + CONC_FACT_2.h}
            x2={PROD_A2.x + PROD_A2.w / 2}
            y2={PROD_A2.y - 2}
            stroke={accent}
            strokeWidth="1.4"
            strokeDasharray="5 3"
            markerEnd="url(#abf-create-arrow)"
          />
          <line
            x1={CONC_FACT_2.x + CONC_FACT_2.w - 60}
            y1={CONC_FACT_2.y + CONC_FACT_2.h}
            x2={PROD_B2.x + PROD_B2.w / 2}
            y2={PROD_B2.y - 2}
            stroke={accent}
            strokeWidth="1.4"
            strokeDasharray="5 3"
            markerEnd="url(#abf-create-arrow)"
          />
          <text
            x={CONC_FACT_2.x + CONC_FACT_2.w / 2}
            y={CONC_FACT_2.y + CONC_FACT_2.h + 18}
            textAnchor="middle"
            fontSize="11"
            fill={accent}
            fontStyle="italic"
          >
            «create»
          </text>

          {/* ===== 四个具体产品框 ===== */}
          {/* ProductA1（success 族） */}
          <g>
            <rect
              x={PROD_A1.x}
              y={PROD_A1.y}
              width={PROD_A1.w}
              height={PROD_A1.h}
              rx="8"
              fill={success}
              fillOpacity="0.08"
              stroke={success}
              strokeWidth="1.6"
            />
            <text
              x={PROD_A1.x + PROD_A1.w / 2}
              y={PROD_A1.y + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ProductA1
            </text>
            <line
              x1={PROD_A1.x}
              y1={PROD_A1.y + 32}
              x2={PROD_A1.x + PROD_A1.w}
              y2={PROD_A1.y + 32}
              stroke={success}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={PROD_A1.x + 12}
              y={PROD_A1.y + 48}
              fontSize="11"
              fill={secondary}
              fontFamily="monospace"
            >
              + operationA()
            </text>
          </g>
          {/* ProductB1（warning 族） */}
          <g>
            <rect
              x={PROD_B1.x}
              y={PROD_B1.y}
              width={PROD_B1.w}
              height={PROD_B1.h}
              rx="8"
              fill={warning}
              fillOpacity="0.08"
              stroke={warning}
              strokeWidth="1.6"
            />
            <text
              x={PROD_B1.x + PROD_B1.w / 2}
              y={PROD_B1.y + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ProductB1
            </text>
            <line
              x1={PROD_B1.x}
              y1={PROD_B1.y + 32}
              x2={PROD_B1.x + PROD_B1.w}
              y2={PROD_B1.y + 32}
              stroke={warning}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={PROD_B1.x + 12}
              y={PROD_B1.y + 48}
              fontSize="11"
              fill={secondary}
              fontFamily="monospace"
            >
              + operationB()
            </text>
          </g>
          {/* ProductA2（success 族） */}
          <g>
            <rect
              x={PROD_A2.x}
              y={PROD_A2.y}
              width={PROD_A2.w}
              height={PROD_A2.h}
              rx="8"
              fill={success}
              fillOpacity="0.08"
              stroke={success}
              strokeWidth="1.6"
            />
            <text
              x={PROD_A2.x + PROD_A2.w / 2}
              y={PROD_A2.y + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ProductA2
            </text>
            <line
              x1={PROD_A2.x}
              y1={PROD_A2.y + 32}
              x2={PROD_A2.x + PROD_A2.w}
              y2={PROD_A2.y + 32}
              stroke={success}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={PROD_A2.x + 12}
              y={PROD_A2.y + 48}
              fontSize="11"
              fill={secondary}
              fontFamily="monospace"
            >
              + operationA()
            </text>
          </g>
          {/* ProductB2（warning 族） */}
          <g>
            <rect
              x={PROD_B2.x}
              y={PROD_B2.y}
              width={PROD_B2.w}
              height={PROD_B2.h}
              rx="8"
              fill={warning}
              fillOpacity="0.08"
              stroke={warning}
              strokeWidth="1.6"
            />
            <text
              x={PROD_B2.x + PROD_B2.w / 2}
              y={PROD_B2.y + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ProductB2
            </text>
            <line
              x1={PROD_B2.x}
              y1={PROD_B2.y + 32}
              x2={PROD_B2.x + PROD_B2.w}
              y2={PROD_B2.y + 32}
              stroke={warning}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={PROD_B2.x + 12}
              y={PROD_B2.y + 48}
              fontSize="11"
              fill={secondary}
              fontFamily="monospace"
            >
              + operationB()
            </text>
          </g>

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="436"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            抽象工厂：创建一系列相关产品的工厂族
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        抽象工厂在工厂方法基础上升级：每个具体工厂生产一「族」相关产品（A + B），
        切换工厂即可整族替换，保证产品间的兼容性。
      </figcaption>
    </figure>
  );
}
