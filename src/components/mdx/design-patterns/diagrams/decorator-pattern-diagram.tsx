/**
 * <DecoratorPatternDiagram>：装饰器模式包装链图（design-patterns 课程）。
 *
 * 展示装饰器模式的「洋葱式包装」结构：
 *   - 顶部居中 Component 接口（«interface»，声明 operation()）
 *   - 左下 ConcreteComponent 实现 operation()
 *   - 右侧 Decorator 抽象装饰器（«abstract»，也实现 Component，持有 Component 引用）
 *   - Decorator 下挂 ConcreteDecoratorA / B，各自新增 addedBehavior()
 *   - 实线实心箭头 = 持有（Decorator → Component）
 *   - 虚线空心三角箭头 = 实现接口（ConcreteComponent / Decorator → Component；
 *     ConcreteDecoratorA/B → Decorator）
 *   - 底部用嵌套圆角矩形（俄罗斯套娃）展示包装链：B 包 A 包 Component
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×500（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / UML 主体 / 底部包装链+总结）。
 * 间距用 4 的倍数，主要坐标均为 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 500;

// Component 接口框（顶部居中）
const COMPONENT = { x: 268, y: 64, w: 152, h: 76 };
// ConcreteComponent 框（左下）
const CONCRETE_COMP = { x: 48, y: 196, w: 168, h: 64 };
// Decorator 抽象装饰器框（右侧）
const DECORATOR = { x: 460, y: 116, w: 180, h: 88 };
// 两个具体装饰器框（Decorator 下方）
const CONCRETE_DEC = { w: 140, h: 76, y: 228 };
const CONCRETE_DEC_A_X = 396;
const CONCRETE_DEC_B_X = 548;

// 底部包装链：嵌套圆角矩形（俄罗斯套娃）
const CHAIN_B = { x: 80, y: 338, w: 560, h: 112 };
const CHAIN_A = { x: 140, y: 370, w: 440, h: 64 };
const CHAIN_CORE = { x: 220, y: 394, w: 280, h: 28 };

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

export function DecoratorPatternDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="装饰器模式包装链图。顶部居中是 Component 接口，声明 operation() 方法。左下 ConcreteComponent 实现了 operation()。右侧 Decorator 是抽象装饰器，也实现 Component 接口，并持有一个 Component 引用，其 operation() 将请求委托给内部组件。Decorator 下挂两个具体装饰器：ConcreteDecoratorA 和 ConcreteDecoratorB，各自新增 addedBehavior() 方法。实线箭头从 Decorator 指向 Component 表示持有关系；虚线空心三角箭头从具体类指向接口表示实现关系。底部用嵌套圆角矩形展示包装链：最外层 ConcreteDecoratorB 包裹 ConcreteDecoratorA，再包裹最内层的 ConcreteComponent，调用时由外向内层层委托。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 实现关系：空心三角箭头（指向接口/抽象类），UML realization */}
            <marker
              id="decorator-impl-arrow"
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
            {/* 关联 / 持有：实心三角箭头（指向被持有者） */}
            <marker
              id="decorator-holds-arrow"
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
            y="40"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            装饰器模式 · 包装链
          </text>

          {/* ===== Component 接口框（顶部居中） ===== */}
          <g>
            <rect
              x={COMPONENT.x}
              y={COMPONENT.y}
              width={COMPONENT.w}
              height={COMPONENT.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={COMPONENT.x + COMPONENT.w / 2}
              y={COMPONENT.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={COMPONENT.x + COMPONENT.w / 2}
              y={COMPONENT.y + 36}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Component
            </text>
            <line
              x1={COMPONENT.x}
              y1={COMPONENT.y + 46}
              x2={COMPONENT.x + COMPONENT.w}
              y2={COMPONENT.y + 46}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={COMPONENT.x + 14}
              y={COMPONENT.y + 64}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + operation()
            </text>
          </g>

          {/* ===== ConcreteComponent 框（左下） ===== */}
          <g>
            <rect
              x={CONCRETE_COMP.x}
              y={CONCRETE_COMP.y}
              width={CONCRETE_COMP.w}
              height={CONCRETE_COMP.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={CONCRETE_COMP.x + CONCRETE_COMP.w / 2}
              y={CONCRETE_COMP.y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ConcreteComponent
            </text>
            <line
              x1={CONCRETE_COMP.x}
              y1={CONCRETE_COMP.y + 32}
              x2={CONCRETE_COMP.x + CONCRETE_COMP.w}
              y2={CONCRETE_COMP.y + 32}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CONCRETE_COMP.x + 14}
              y={CONCRETE_COMP.y + 50}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + operation()
            </text>
          </g>

          {/* ===== Decorator 抽象装饰器框（右侧） ===== */}
          <g>
            <rect
              x={DECORATOR.x}
              y={DECORATOR.y}
              width={DECORATOR.w}
              height={DECORATOR.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={DECORATOR.x + DECORATOR.w / 2}
              y={DECORATOR.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «abstract»
            </text>
            <text
              x={DECORATOR.x + DECORATOR.w / 2}
              y={DECORATOR.y + 36}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Decorator
            </text>
            <line
              x1={DECORATOR.x}
              y1={DECORATOR.y + 46}
              x2={DECORATOR.x + DECORATOR.w}
              y2={DECORATOR.y + 46}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={DECORATOR.x + 14}
              y={DECORATOR.y + 64}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              # component: Component
            </text>
            <text
              x={DECORATOR.x + 14}
              y={DECORATOR.y + 82}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + operation()
            </text>
          </g>

          {/* ===== 持有 关联箭头：Decorator → Component ===== */}
          <line
            x1={DECORATOR.x}
            y1={DECORATOR.y + 52}
            x2={COMPONENT.x + COMPONENT.w - 38}
            y2={COMPONENT.y + COMPONENT.h - 28}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#decorator-holds-arrow)"
          />
          <text
            x={(DECORATOR.x + COMPONENT.x + COMPONENT.w) / 2}
            y={(DECORATOR.y + COMPONENT.y + COMPONENT.h) / 2 - 8}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            持有
          </text>

          {/* ===== 实现关系：ConcreteComponent → Component（虚线空心三角） ===== */}
          <line
            x1={CONCRETE_COMP.x + CONCRETE_COMP.w / 2}
            y1={CONCRETE_COMP.y}
            x2={COMPONENT.x + 22}
            y2={COMPONENT.y + COMPONENT.h}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#decorator-impl-arrow)"
          />

          {/* ===== 实现关系：ConcreteDecoratorA → Decorator（虚线空心三角） ===== */}
          <line
            x1={CONCRETE_DEC_A_X + CONCRETE_DEC.w / 2}
            y1={CONCRETE_DEC.y}
            x2={DECORATOR.x + 44}
            y2={DECORATOR.y + DECORATOR.h}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#decorator-impl-arrow)"
          />

          {/* ===== 实现关系：ConcreteDecoratorB → Decorator（虚线空心三角） ===== */}
          <line
            x1={CONCRETE_DEC_B_X + CONCRETE_DEC.w / 2}
            y1={CONCRETE_DEC.y}
            x2={DECORATOR.x + DECORATOR.w - 44}
            y2={DECORATOR.y + DECORATOR.h}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#decorator-impl-arrow)"
          />

          {/* ===== ConcreteDecoratorA 框 ===== */}
          <g>
            <rect
              x={CONCRETE_DEC_A_X}
              y={CONCRETE_DEC.y}
              width={CONCRETE_DEC.w}
              height={CONCRETE_DEC.h}
              rx="10"
              fill={elevated}
              stroke={warning}
              strokeWidth="1.8"
            />
            <text
              x={CONCRETE_DEC_A_X + CONCRETE_DEC.w / 2}
              y={CONCRETE_DEC.y + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ConcreteDecoratorA
            </text>
            <line
              x1={CONCRETE_DEC_A_X}
              y1={CONCRETE_DEC.y + 32}
              x2={CONCRETE_DEC_A_X + CONCRETE_DEC.w}
              y2={CONCRETE_DEC.y + 32}
              stroke={warning}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={CONCRETE_DEC_A_X + 12}
              y={CONCRETE_DEC.y + 50}
              fontSize="11"
              fontWeight="600"
              fill={accent}
              fontFamily="monospace"
            >
              + addedBehavior()
            </text>
            <text
              x={CONCRETE_DEC_A_X + 12}
              y={CONCRETE_DEC.y + 67}
              fontSize="11"
              fill={secondary}
              fontFamily="monospace"
            >
              + operation()
            </text>
          </g>

          {/* ===== ConcreteDecoratorB 框 ===== */}
          <g>
            <rect
              x={CONCRETE_DEC_B_X}
              y={CONCRETE_DEC.y}
              width={CONCRETE_DEC.w}
              height={CONCRETE_DEC.h}
              rx="10"
              fill={elevated}
              stroke={danger}
              strokeWidth="1.8"
            />
            <text
              x={CONCRETE_DEC_B_X + CONCRETE_DEC.w / 2}
              y={CONCRETE_DEC.y + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ConcreteDecoratorB
            </text>
            <line
              x1={CONCRETE_DEC_B_X}
              y1={CONCRETE_DEC.y + 32}
              x2={CONCRETE_DEC_B_X + CONCRETE_DEC.w}
              y2={CONCRETE_DEC.y + 32}
              stroke={danger}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={CONCRETE_DEC_B_X + 12}
              y={CONCRETE_DEC.y + 50}
              fontSize="11"
              fontWeight="600"
              fill={accent}
              fontFamily="monospace"
            >
              + addedBehavior()
            </text>
            <text
              x={CONCRETE_DEC_B_X + 12}
              y={CONCRETE_DEC.y + 67}
              fontSize="11"
              fill={secondary}
              fontFamily="monospace"
            >
              + operation()
            </text>
          </g>

          {/* ===== 底部：包装链示意（嵌套圆角矩形，俄罗斯套娃） ===== */}
          <text
            x={VIEW_W / 2}
            y="324"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            包装链示意：调用由外向内层层委托
          </text>

          {/* 最外层：ConcreteDecoratorB */}
          <rect
            x={CHAIN_B.x}
            y={CHAIN_B.y}
            width={CHAIN_B.w}
            height={CHAIN_B.h}
            rx="14"
            fill={danger}
            fillOpacity="0.06"
            stroke={danger}
            strokeWidth="1.8"
          />
          <text
            x={CHAIN_B.x + 16}
            y={CHAIN_B.y + 20}
            fontSize="11"
            fontWeight="600"
            fill={danger}
            fontFamily="monospace"
          >
            ConcreteDecoratorB · addedBehavior()
          </text>

          {/* 中间层：ConcreteDecoratorA */}
          <rect
            x={CHAIN_A.x}
            y={CHAIN_A.y}
            width={CHAIN_A.w}
            height={CHAIN_A.h}
            rx="12"
            fill={warning}
            fillOpacity="0.06"
            stroke={warning}
            strokeWidth="1.8"
          />
          <text
            x={CHAIN_A.x + 16}
            y={CHAIN_A.y + 20}
            fontSize="11"
            fontWeight="600"
            fill={warning}
            fontFamily="monospace"
          >
            ConcreteDecoratorA · addedBehavior()
          </text>

          {/* 最内层：ConcreteComponent */}
          <rect
            x={CHAIN_CORE.x}
            y={CHAIN_CORE.y}
            width={CHAIN_CORE.w}
            height={CHAIN_CORE.h}
            rx="8"
            fill={success}
            fillOpacity="0.1"
            stroke={success}
            strokeWidth="1.8"
          />
          <text
            x={CHAIN_CORE.x + CHAIN_CORE.w / 2}
            y={CHAIN_CORE.y + 18}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={success}
            fontFamily="monospace"
          >
            ConcreteComponent · operation()
          </text>

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="472"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            实线箭头 = 持有（Decorator 内嵌 Component）；虚线箭头 = 实现接口
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        装饰器用「持有」代替「继承」：每个装饰器都实现 Component
        接口，同时持有一个 Component 引用。operation() 先做自己的
        addedBehavior()，再把请求委托给内部组件——
        像俄罗斯套娃一样层层包裹，运行时可自由组合装饰顺序。
      </figcaption>
    </figure>
  );
}
