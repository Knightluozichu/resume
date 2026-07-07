/**
 * <FactoryMethodDiagram>：工厂方法模式演进图（design-patterns 课程）。
 *
 * 展示从「简单工厂」到「工厂方法」的演进：
 *   - 顶部居中 Product 接口（虚线边框、斜体类名、«interface»），所有产品实现此接口
 *   - 左侧「简单工厂」：SimpleFactory 根据 type 参数用 if-else 返回不同产品（ProductA / ProductB）
 *   - 右侧「工厂方法」：Creator «abstract» 声明 factoryMethod()，两个子类
 *     ConcreteCreatorA / ConcreteCreatorB 各自返回 ConcreteProductA / ConcreteProductB
 *   - 中间箭头标注「演进：消除 if-else，用子类替代条件分支」
 *   - 虚线空心三角箭头 = 实现接口（具体创建者 → Creator）；实线箭头 = 创建/返回
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×440（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / 主体对比 / 底部总结）。
 * 间距用 4 的倍数，主要坐标均为 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 440;

// Product 接口框（顶部居中）
const PRODUCT = { x: 284, y: 60, w: 152, h: 64 };
// 左侧 SimpleFactory 框
const SIMPLE = { x: 40, y: 172, w: 248, h: 80 };
// 左侧两个产品框
const PROD_A = { x: 40, y: 284, w: 112, h: 68 };
const PROD_B = { x: 176, y: 284, w: 112, h: 68 };
// 右侧 Creator 抽象框
const CREATOR = { x: 420, y: 172, w: 260, h: 80 };
// 右侧两个具体创建者框
const CONC_A = { x: 412, y: 284, w: 130, h: 80 };
const CONC_B = { x: 558, y: 284, w: 130, h: 80 };

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const warning = "var(--warning)";

export function FactoryMethodDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="工厂方法模式演进图。顶部居中是 Product 接口（虚线边框、斜体），声明 operation() 方法，所有产品实现此接口。左侧是「简单工厂」：SimpleFactory 类的 create(type) 方法用 if-else 判断 type 参数，返回 ProductA 或 ProductB。右侧是「工厂方法」：Creator 抽象类声明 factoryMethod()，两个子类 ConcreteCreatorA 与 ConcreteCreatorB 各自重写 factoryMethod() 返回 ConcreteProductA 与 ConcreteProductB，以虚线空心三角箭头指向 Creator 表示实现关系。中间箭头标注「演进：消除 if-else，用子类替代条件分支」。底部说明：工厂方法把对象创建延迟到子类，新增产品只需新增子类，无需改父类。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 实现关系：空心三角箭头（指向接口/抽象类），UML realization */}
            <marker
              id="factory-impl-arrow"
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
            {/* 创建 / 返回：实心三角箭头 */}
            <marker
              id="factory-create-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={warning} />
            </marker>
            {/* 演进箭头：实心三角（accent） */}
            <marker
              id="factory-evolve-arrow"
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
            工厂方法模式 · 从简单工厂演进
          </text>

          {/* ===== Product 接口框（顶部居中） ===== */}
          <g>
            <rect
              x={PRODUCT.x}
              y={PRODUCT.y}
              width={PRODUCT.w}
              height={PRODUCT.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={PRODUCT.x + PRODUCT.w / 2}
              y={PRODUCT.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={PRODUCT.x + PRODUCT.w / 2}
              y={PRODUCT.y + 36}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Product
            </text>
            <line
              x1={PRODUCT.x}
              y1={PRODUCT.y + 46}
              x2={PRODUCT.x + PRODUCT.w}
              y2={PRODUCT.y + 46}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={PRODUCT.x + 14}
              y={PRODUCT.y + 60}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + operation()
            </text>
          </g>
          <text
            x={VIEW_W / 2}
            y={PRODUCT.y + PRODUCT.h + 18}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
            fontStyle="italic"
          >
            所有产品实现此接口
          </text>

          {/* ===== 区段标签 ===== */}
          <text
            x={SIMPLE.x + SIMPLE.w / 2}
            y="158"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={warning}
          >
            简单工厂
          </text>
          <text
            x={CREATOR.x + CREATOR.w / 2}
            y="158"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={accent}
          >
            工厂方法
          </text>

          {/* ===== SimpleFactory 框（左） ===== */}
          <g>
            <rect
              x={SIMPLE.x}
              y={SIMPLE.y}
              width={SIMPLE.w}
              height={SIMPLE.h}
              rx="10"
              fill={elevated}
              stroke={warning}
              strokeWidth="1.8"
            />
            <text
              x={SIMPLE.x + SIMPLE.w / 2}
              y={SIMPLE.y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              SimpleFactory
            </text>
            <line
              x1={SIMPLE.x}
              y1={SIMPLE.y + 32}
              x2={SIMPLE.x + SIMPLE.w}
              y2={SIMPLE.y + 32}
              stroke={warning}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={SIMPLE.x + 14}
              y={SIMPLE.y + 52}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + create(type): Product
            </text>
            <text
              x={SIMPLE.x + 14}
              y={SIMPLE.y + 70}
              fontSize="11"
              fill={warning}
              fontStyle="italic"
            >
              // if-else 判断 type
            </text>
          </g>

          {/* ===== if-else 分支箭头：SimpleFactory → ProductA / ProductB ===== */}
          <line
            x1={SIMPLE.x + 80}
            y1={SIMPLE.y + SIMPLE.h}
            x2={PROD_A.x + PROD_A.w / 2}
            y2={PROD_A.y - 2}
            stroke={warning}
            strokeWidth="1.6"
            markerEnd="url(#factory-create-arrow)"
          />
          <text
            x={SIMPLE.x + 52}
            y={SIMPLE.y + SIMPLE.h + 18}
            fontSize="11"
            fontWeight="600"
            fill={warning}
          >
            if ‘a’
          </text>
          <line
            x1={SIMPLE.x + SIMPLE.w - 80}
            y1={SIMPLE.y + SIMPLE.h}
            x2={PROD_B.x + PROD_B.w / 2}
            y2={PROD_B.y - 2}
            stroke={warning}
            strokeWidth="1.6"
            markerEnd="url(#factory-create-arrow)"
          />
          <text
            x={SIMPLE.x + SIMPLE.w - 64}
            y={SIMPLE.y + SIMPLE.h + 18}
            fontSize="11"
            fontWeight="600"
            fill={warning}
          >
            else
          </text>

          {/* ===== ProductA / ProductB 框 ===== */}
          <g>
            <rect
              x={PROD_A.x}
              y={PROD_A.y}
              width={PROD_A.w}
              height={PROD_A.h}
              rx="8"
              fill={elevated}
              stroke={border}
              strokeWidth="1.6"
            />
            <text
              x={PROD_A.x + PROD_A.w / 2}
              y={PROD_A.y + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ProductA
            </text>
            <line
              x1={PROD_A.x}
              y1={PROD_A.y + 32}
              x2={PROD_A.x + PROD_A.w}
              y2={PROD_A.y + 32}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={PROD_A.x + 12}
              y={PROD_A.y + 52}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + operation()
            </text>
          </g>
          <g>
            <rect
              x={PROD_B.x}
              y={PROD_B.y}
              width={PROD_B.w}
              height={PROD_B.h}
              rx="8"
              fill={elevated}
              stroke={border}
              strokeWidth="1.6"
            />
            <text
              x={PROD_B.x + PROD_B.w / 2}
              y={PROD_B.y + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ProductB
            </text>
            <line
              x1={PROD_B.x}
              y1={PROD_B.y + 32}
              x2={PROD_B.x + PROD_B.w}
              y2={PROD_B.y + 32}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={PROD_B.x + 12}
              y={PROD_B.y + 52}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + operation()
            </text>
          </g>

          {/* ===== 演进箭头：SimpleFactory → Creator ===== */}
          <line
            x1={SIMPLE.x + SIMPLE.w + 4}
            y1="212"
            x2={CREATOR.x - 4}
            y2="212"
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#factory-evolve-arrow)"
          />
          <text
            x={(SIMPLE.x + SIMPLE.w + CREATOR.x) / 2}
            y="200"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            演进：消除 if-else
          </text>
          <text
            x={(SIMPLE.x + SIMPLE.w + CREATOR.x) / 2}
            y="228"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            用子类替代条件分支
          </text>

          {/* ===== Creator 抽象框（右） ===== */}
          <g>
            <rect
              x={CREATOR.x}
              y={CREATOR.y}
              width={CREATOR.w}
              height={CREATOR.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={CREATOR.x + CREATOR.w / 2}
              y={CREATOR.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «abstract»
            </text>
            <text
              x={CREATOR.x + CREATOR.w / 2}
              y={CREATOR.y + 36}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Creator
            </text>
            <line
              x1={CREATOR.x}
              y1={CREATOR.y + 46}
              x2={CREATOR.x + CREATOR.w}
              y2={CREATOR.y + 46}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={CREATOR.x + 14}
              y={CREATOR.y + 66}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + factoryMethod(): Product
            </text>
          </g>

          {/* ===== 实现关系：ConcreteCreatorA / B → Creator（虚线空心三角） ===== */}
          <line
            x1={CONC_A.x + CONC_A.w / 2}
            y1={CONC_A.y}
            x2={CREATOR.x + 64}
            y2={CREATOR.y + CREATOR.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#factory-impl-arrow)"
          />
          <line
            x1={CONC_B.x + CONC_B.w / 2}
            y1={CONC_B.y}
            x2={CREATOR.x + CREATOR.w - 64}
            y2={CREATOR.y + CREATOR.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#factory-impl-arrow)"
          />
          <text
            x={CREATOR.x + CREATOR.w / 2}
            y={CREATOR.y + CREATOR.h + 18}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
            fontStyle="italic"
          >
            «implements»
          </text>

          {/* ===== ConcreteCreatorA 框 ===== */}
          <g>
            <rect
              x={CONC_A.x}
              y={CONC_A.y}
              width={CONC_A.w}
              height={CONC_A.h}
              rx="8"
              fill={elevated}
              stroke={border}
              strokeWidth="1.6"
            />
            <text
              x={CONC_A.x + CONC_A.w / 2}
              y={CONC_A.y + 20}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ConcreteCreatorA
            </text>
            <line
              x1={CONC_A.x}
              y1={CONC_A.y + 30}
              x2={CONC_A.x + CONC_A.w}
              y2={CONC_A.y + 30}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CONC_A.x + 10}
              y={CONC_A.y + 48}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + factoryMethod()
            </text>
            <text
              x={CONC_A.x + 10}
              y={CONC_A.y + 66}
              fontSize="11"
              fontWeight="600"
              fill={accent}
              fontFamily="monospace"
            >
              → ConcreteProductA
            </text>
          </g>

          {/* ===== ConcreteCreatorB 框 ===== */}
          <g>
            <rect
              x={CONC_B.x}
              y={CONC_B.y}
              width={CONC_B.w}
              height={CONC_B.h}
              rx="8"
              fill={elevated}
              stroke={border}
              strokeWidth="1.6"
            />
            <text
              x={CONC_B.x + CONC_B.w / 2}
              y={CONC_B.y + 20}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ConcreteCreatorB
            </text>
            <line
              x1={CONC_B.x}
              y1={CONC_B.y + 30}
              x2={CONC_B.x + CONC_B.w}
              y2={CONC_B.y + 30}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CONC_B.x + 10}
              y={CONC_B.y + 48}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + factoryMethod()
            </text>
            <text
              x={CONC_B.x + 10}
              y={CONC_B.y + 66}
              fontSize="11"
              fontWeight="600"
              fill={accent}
              fontFamily="monospace"
            >
              → ConcreteProductB
            </text>
          </g>

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="412"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            工厂方法把对象创建延迟到子类——新增产品只需新增子类，无需改父类
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        简单工厂用 if-else 集中判断类型，新增产品要改工厂代码；工厂方法把判断下沉到子类，
        每个子类只负责创建一种产品，符合开闭原则。
      </figcaption>
    </figure>
  );
}
