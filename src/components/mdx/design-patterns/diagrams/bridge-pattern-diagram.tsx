/**
 * <BridgePatternDiagram>：桥接模式结构图（design-patterns 课程）。
 *
 * 展示桥接模式的核心结构：
 *   - 左上 Abstraction 类（持有 Implementor 引用，有 operation() 方法）
 *   - 左下 RefinedAbstraction（继承 Abstraction）
 *   - 右上 Implementor 接口（虚线边框、斜体类名、«interface»），声明 operationImpl()
 *   - 右下 ConcreteImplementorA、ConcreteImplementorB（各实现 operationImpl()）
 *   - 箭头：Abstraction→Implementor（持有，实线实心箭头，标注「桥」）；
 *     RefinedAbstraction→Abstraction（继承，实线空心三角）；
 *     ConcreteImpl→Implementor（实现，虚线空心三角）
 *   - 底部文字：「桥接：将抽象与实现分离，使二者可独立变化」
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×420（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / UML 主体 / 底部总结）。
 * 间距用 4 的倍数，主要坐标均为 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 420;

// Abstraction 框（左上）
const ABSTRACTION = { x: 40, y: 72, w: 220, h: 100 };
// Implementor 接口框（右上）
const IMPLEMENTOR = { x: 434, y: 72, w: 200, h: 84 };
// RefinedAbstraction 框（左下）
const REFINED = { x: 40, y: 232, w: 220, h: 72 };
// ConcreteImplementorA 框（右下左）
const CONC_IMPL_A = { x: 384, y: 220, w: 144, h: 84 };
// ConcreteImplementorB 框（右下右）
const CONC_IMPL_B = { x: 540, y: 220, w: 144, h: 84 };

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const success = "var(--success)";
const warning = "var(--warning)";

export function BridgePatternDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="桥接模式结构图。左上是 Abstraction 类，持有 Implementor 引用，有 operation() 方法。左下是 RefinedAbstraction，继承 Abstraction。右上是 Implementor 接口（虚线边框、斜体），声明 operationImpl() 方法。右下是 ConcreteImplementorA 和 ConcreteImplementorB，各自实现 operationImpl()。实线实心箭头从 Abstraction 指向 Implementor，标注「桥」，表示持有关系。实线空心三角箭头从 RefinedAbstraction 指向 Abstraction 表示继承关系。虚线空心三角箭头从两个 ConcreteImplementor 指向 Implementor 表示实现关系。底部说明：桥接将抽象与实现分离，使二者可独立变化。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 实现 / 继承关系：空心三角箭头（指向接口/父类），UML realization/generalization */}
            <marker
              id="bridge-impl-arrow"
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
            {/* 持有 / 桥：实心三角箭头（指向被持有者） */}
            <marker
              id="bridge-holds-arrow"
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
            桥接模式 · 结构
          </text>

          {/* ===== Abstraction 框（左上） ===== */}
          <g>
            <rect
              x={ABSTRACTION.x}
              y={ABSTRACTION.y}
              width={ABSTRACTION.w}
              height={ABSTRACTION.h}
              rx="10"
              fill={elevated}
              stroke={accent}
              strokeWidth="1.8"
            />
            <text
              x={ABSTRACTION.x + ABSTRACTION.w / 2}
              y={ABSTRACTION.y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Abstraction
            </text>
            <line
              x1={ABSTRACTION.x}
              y1={ABSTRACTION.y + 32}
              x2={ABSTRACTION.x + ABSTRACTION.w}
              y2={ABSTRACTION.y + 32}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={ABSTRACTION.x + 14}
              y={ABSTRACTION.y + 50}
              fontSize="11"
              fill={secondary}
              fontFamily="monospace"
            >
              # implementor: Implementor
            </text>
            <text
              x={ABSTRACTION.x + 14}
              y={ABSTRACTION.y + 68}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + operation()
            </text>
            <text
              x={ABSTRACTION.x + 14}
              y={ABSTRACTION.y + 88}
              fontSize="11"
              fill={accent}
              fontStyle="italic"
            >
              // 委托 implementor
            </text>
          </g>

          {/* ===== Implementor 接口框（右上） ===== */}
          <g>
            <rect
              x={IMPLEMENTOR.x}
              y={IMPLEMENTOR.y}
              width={IMPLEMENTOR.w}
              height={IMPLEMENTOR.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={IMPLEMENTOR.x + IMPLEMENTOR.w / 2}
              y={IMPLEMENTOR.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={IMPLEMENTOR.x + IMPLEMENTOR.w / 2}
              y={IMPLEMENTOR.y + 36}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Implementor
            </text>
            <line
              x1={IMPLEMENTOR.x}
              y1={IMPLEMENTOR.y + 46}
              x2={IMPLEMENTOR.x + IMPLEMENTOR.w}
              y2={IMPLEMENTOR.y + 46}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={IMPLEMENTOR.x + 14}
              y={IMPLEMENTOR.y + 64}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + operationImpl()
            </text>
          </g>

          {/* ===== RefinedAbstraction 框（左下） ===== */}
          <g>
            <rect
              x={REFINED.x}
              y={REFINED.y}
              width={REFINED.w}
              height={REFINED.h}
              rx="10"
              fill={elevated}
              stroke={success}
              strokeWidth="1.8"
            />
            <text
              x={REFINED.x + REFINED.w / 2}
              y={REFINED.y + 24}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              RefinedAbstraction
            </text>
            <line
              x1={REFINED.x}
              y1={REFINED.y + 34}
              x2={REFINED.x + REFINED.w}
              y2={REFINED.y + 34}
              stroke={success}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={REFINED.x + 14}
              y={REFINED.y + 54}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + operation()
            </text>
          </g>

          {/* ===== ConcreteImplementorA 框（右下左） ===== */}
          <g>
            <rect
              x={CONC_IMPL_A.x}
              y={CONC_IMPL_A.y}
              width={CONC_IMPL_A.w}
              height={CONC_IMPL_A.h}
              rx="8"
              fill={elevated}
              stroke={warning}
              strokeWidth="1.8"
            />
            <text
              x={CONC_IMPL_A.x + CONC_IMPL_A.w / 2}
              y={CONC_IMPL_A.y + 22}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ConcreteImplementorA
            </text>
            <line
              x1={CONC_IMPL_A.x}
              y1={CONC_IMPL_A.y + 32}
              x2={CONC_IMPL_A.x + CONC_IMPL_A.w}
              y2={CONC_IMPL_A.y + 32}
              stroke={warning}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={CONC_IMPL_A.x + 12}
              y={CONC_IMPL_A.y + 52}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + operationImpl()
            </text>
            <text
              x={CONC_IMPL_A.x + 12}
              y={CONC_IMPL_A.y + 70}
              fontSize="11"
              fill={warning}
              fontStyle="italic"
            >
              // 实现方式 A
            </text>
          </g>

          {/* ===== ConcreteImplementorB 框（右下右） ===== */}
          <g>
            <rect
              x={CONC_IMPL_B.x}
              y={CONC_IMPL_B.y}
              width={CONC_IMPL_B.w}
              height={CONC_IMPL_B.h}
              rx="8"
              fill={elevated}
              stroke={warning}
              strokeWidth="1.8"
            />
            <text
              x={CONC_IMPL_B.x + CONC_IMPL_B.w / 2}
              y={CONC_IMPL_B.y + 22}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ConcreteImplementorB
            </text>
            <line
              x1={CONC_IMPL_B.x}
              y1={CONC_IMPL_B.y + 32}
              x2={CONC_IMPL_B.x + CONC_IMPL_B.w}
              y2={CONC_IMPL_B.y + 32}
              stroke={warning}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={CONC_IMPL_B.x + 12}
              y={CONC_IMPL_B.y + 52}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + operationImpl()
            </text>
            <text
              x={CONC_IMPL_B.x + 12}
              y={CONC_IMPL_B.y + 70}
              fontSize="11"
              fill={warning}
              fontStyle="italic"
            >
              // 实现方式 B
            </text>
          </g>

          {/* ===== 持有 / 桥箭头：Abstraction → Implementor（实线实心箭头） ===== */}
          <line
            x1={ABSTRACTION.x + ABSTRACTION.w}
            y1={ABSTRACTION.y + 50}
            x2={IMPLEMENTOR.x - 2}
            y2={IMPLEMENTOR.y + 42}
            stroke={accent}
            strokeWidth="2"
            markerEnd="url(#bridge-holds-arrow)"
          />
          <text
            x={(ABSTRACTION.x + ABSTRACTION.w + IMPLEMENTOR.x) / 2}
            y={ABSTRACTION.y + 40}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={accent}
          >
            桥 · 持有
          </text>

          {/* ===== 继承箭头：RefinedAbstraction → Abstraction（实线空心三角） ===== */}
          <line
            x1={REFINED.x + REFINED.w / 2}
            y1={REFINED.y}
            x2={ABSTRACTION.x + ABSTRACTION.w / 2}
            y2={ABSTRACTION.y + ABSTRACTION.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            markerEnd="url(#bridge-impl-arrow)"
          />
          <text
            x={REFINED.x + REFINED.w / 2 + 12}
            y={(REFINED.y + ABSTRACTION.y + ABSTRACTION.h) / 2}
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            继承
          </text>

          {/* ===== 实现箭头：ConcreteImplA → Implementor（虚线空心三角） ===== */}
          <line
            x1={CONC_IMPL_A.x + CONC_IMPL_A.w / 2}
            y1={CONC_IMPL_A.y}
            x2={IMPLEMENTOR.x + IMPLEMENTOR.w / 2 - 28}
            y2={IMPLEMENTOR.y + IMPLEMENTOR.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#bridge-impl-arrow)"
          />

          {/* ===== 实现箭头：ConcreteImplB → Implementor（虚线空心三角） ===== */}
          <line
            x1={CONC_IMPL_B.x + CONC_IMPL_B.w / 2}
            y1={CONC_IMPL_B.y}
            x2={IMPLEMENTOR.x + IMPLEMENTOR.w / 2 + 28}
            y2={IMPLEMENTOR.y + IMPLEMENTOR.h + 2}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#bridge-impl-arrow)"
          />
          <text
            x={IMPLEMENTOR.x + IMPLEMENTOR.w / 2}
            y={IMPLEMENTOR.y + IMPLEMENTOR.h + 20}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
            fontStyle="italic"
          >
            «implements»
          </text>

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="392"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            桥接：将抽象与实现分离，使二者可独立变化
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Abstraction 通过持有一个 Implementor 引用搭建「桥」：operation()
        把具体实现委托给 implementor.operationImpl()。抽象层级（Abstraction /
        RefinedAbstraction）和实现层级（Implementor / ConcreteImplementor）
        可以各自独立扩展，互不影响——避免多层继承爆炸。
      </figcaption>
    </figure>
  );
}
