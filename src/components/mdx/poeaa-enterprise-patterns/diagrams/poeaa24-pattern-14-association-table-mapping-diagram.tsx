/**
 * <Poeaa24Pattern14AssociationTableMapping>：关联表映射三步教学图。
 *
 * 同一张图按 Stepper 的步骤切换教学焦点：
 *   1. 对象两侧的集合引用落成两条关系行；
 *   2. 两端外键与复合唯一约束守住关系；
 *   3. 事务内只删除目标关系行，端点对象保持不变。
 *
 * Server Component；由章节专属 <Stepper> 驱动步骤切换。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 430;
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";

type Step = 1 | 2 | 3;

const STEP_LABELS: Record<Step, string> = {
  1: "对象图：两个集合之间的连接落成关系行",
  2: "约束：两端外键 + 复合唯一身份",
  3: "写回：事务内只改关系，不误删端点",
};

function stepOpacity(itemStep: Step, activeStep: Step): number {
  return itemStep === activeStep ? 1 : 0.34;
}

export function Poeaa24Pattern14AssociationTableMapping({
  step = 1,
}: {
  step?: Step;
}) {
  const activeStep = step;
  const highlight = activeStep === 3 ? SUCCESS : T.accent;
  const rowTone = activeStep === 3 ? WARNING : T.accent;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`关联表映射第${activeStep}步：${STEP_LABELS[activeStep]}。左侧 Order 与右侧 Product 通过 order_product 关联表连接；第 3 步只删除关系行，不删除端点对象。`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="poeaa24-association-table-arrow"
              markerWidth="10"
              markerHeight="8"
              refX="9"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L9 4 L0 8 Z" fill={T.primary} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={30}
            text="Association Table：对象集合 ↔ 关系行"
          />
          <text
            x={VIEW_W / 2}
            y={52}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            {STEP_LABELS[activeStep]}
          </text>

          {/* 步骤提示条：保留完整路径，降低切换时的认知跳跃。 */}
          {[1, 2, 3].map((item) => {
            const current = item as Step;
            const x = 40 + (current - 1) * 214;
            const tone = current === activeStep ? highlight : T.secondary;
            return (
              <g
                key={`stage-${current}`}
                opacity={stepOpacity(current, activeStep)}
              >
                <rect
                  x={x}
                  y={68}
                  width={190}
                  height={28}
                  rx="7"
                  fill={tone}
                  fillOpacity="0.08"
                  stroke={tone}
                  strokeWidth="1.2"
                />
                <text
                  x={x + 95}
                  y={87}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={tone}
                >
                  {current}.{" "}
                  {current === 1
                    ? "对象图"
                    : current === 2
                      ? "约束"
                      : "安全写回"}
                </text>
              </g>
            );
          })}

          {/* 对象端点：无论当前步骤如何，端点身份都保持不变。 */}
          <rect
            x="40"
            y="124"
            width="200"
            height="118"
            rx="8"
            fill={SUCCESS}
            fillOpacity="0.06"
            stroke={SUCCESS}
            strokeWidth="1.5"
          />
          <rect
            x="40"
            y="124"
            width="200"
            height="30"
            rx="8"
            fill={SUCCESS}
            fillOpacity="0.12"
          />
          <rect
            x="40"
            y="146"
            width="200"
            height="8"
            fill={SUCCESS}
            fillOpacity="0.12"
          />
          <text
            x="140"
            y="145"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={SUCCESS}
          >
            Order
          </text>
          <text
            x="58"
            y="178"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            id: 42
          </text>
          <text
            x="58"
            y="200"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            products: Product[]
          </text>
          <text x="58" y="224" fontSize="11" fill={T.secondary}>
            端点对象 · 不因断开而删除
          </text>

          <rect
            x="480"
            y="124"
            width="200"
            height="118"
            rx="8"
            fill={SUCCESS}
            fillOpacity="0.06"
            stroke={SUCCESS}
            strokeWidth="1.5"
          />
          <rect
            x="480"
            y="124"
            width="200"
            height="30"
            rx="8"
            fill={SUCCESS}
            fillOpacity="0.12"
          />
          <rect
            x="480"
            y="146"
            width="200"
            height="8"
            fill={SUCCESS}
            fillOpacity="0.12"
          />
          <text
            x="580"
            y="145"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={SUCCESS}
          >
            Product
          </text>
          <text
            x="498"
            y="178"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            id: 7
          </text>
          <text
            x="498"
            y="200"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            orders: Order[]
          </text>
          <text x="498" y="224" fontSize="11" fill={T.secondary}>
            端点对象 · 可被其他订单引用
          </text>

          {/* 对象集合到关系表的两端连线。 */}
          <line
            x1="240"
            y1="184"
            x2="292"
            y2="294"
            stroke={T.accent}
            strokeWidth="1.5"
            markerEnd="url(#poeaa24-association-table-arrow)"
            opacity={activeStep === 1 ? 1 : 0.55}
          />
          <line
            x1="480"
            y1="184"
            x2="428"
            y2="294"
            stroke={T.accent}
            strokeWidth="1.5"
            markerEnd="url(#poeaa24-association-table-arrow)"
            opacity={activeStep === 1 ? 1 : 0.55}
          />
          <text
            x="264"
            y="238"
            textAnchor="middle"
            fontSize="11"
            fill={T.accent}
          >
            products
          </text>
          <text
            x="456"
            y="238"
            textAnchor="middle"
            fontSize="11"
            fill={T.accent}
          >
            orders
          </text>

          {/* 关联表：第二步突出约束，第三步突出目标删除行。 */}
          <rect
            x="220"
            y="284"
            width="280"
            height="110"
            rx="8"
            fill={rowTone}
            fillOpacity="0.06"
            stroke={rowTone}
            strokeWidth={activeStep === 2 || activeStep === 3 ? "1.8" : "1.2"}
          />
          <rect
            x="220"
            y="284"
            width="280"
            height="30"
            rx="8"
            fill={rowTone}
            fillOpacity="0.12"
          />
          <rect
            x="220"
            y="306"
            width="280"
            height="8"
            fill={rowTone}
            fillOpacity="0.12"
          />
          <text
            x="360"
            y="305"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={rowTone}
          >
            order_product
          </text>
          <text
            x="238"
            y="336"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            order_id: 42
          </text>
          <text
            x="238"
            y="356"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            product_id: 7
          </text>
          <text
            x="238"
            y="378"
            fontSize="11"
            fill={activeStep === 3 ? SUCCESS : T.secondary}
          >
            {activeStep === 1
              ? "一行 = 一对端点的连接"
              : activeStep === 2
                ? "PK(order_id, product_id) · 两列 FK"
                : "DELETE (42, 7) · 端点仍保留"}
          </text>

          {/* 第三步给出第二条关系，说明只删目标行。 */}
          {activeStep === 3 && (
            <g>
              <rect
                x="516"
                y="302"
                width="164"
                height="54"
                rx="7"
                fill={SUCCESS}
                fillOpacity="0.08"
                stroke={SUCCESS}
                strokeWidth="1.2"
              />
              <text
                x="598"
                y="323"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={SUCCESS}
              >
                仍保留的连接
              </text>
              <text
                x="598"
                y="343"
                textAnchor="middle"
                fontSize="11"
                fontFamily="monospace"
                fill={T.primary}
              >
                (42, 9)
              </text>
            </g>
          )}

          <rect x="40" y="398" width="640" height="1" fill={T.border} />
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 10}
            text="关联表承载连接事实；端点身份、删除策略与关系唯一性分别评审"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        关联表把两个独立端点的集合引用落成可约束、可重试的关系行；断开一条关系不会销毁订单或商品。
      </figcaption>
    </figure>
  );
}

// 保留现有章节注册表的导出名，同时提供以 Diagram 结尾的成员名供 MDX 语义识别。
Object.assign(Poeaa24Pattern14AssociationTableMapping, {
  Diagram: Poeaa24Pattern14AssociationTableMapping,
});
