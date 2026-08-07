/**
 * <Poeaa24Pattern13ForeignKeyMapping step={1|2|3}>：外键映射的三步边界图。
 *
 * 三个步骤复用同一副对象图—关系表骨架，只改变编号流向与边界状态：
 *   1. 加载时用 orders.customer_id 找到 Customer；
 *   2. 保存时把 Order.customer.id 写回 orders.customer_id；
 *   3. 没有关联时写 NULL，删除策略不能由默认级联替代业务决定。
 *
 * Server Component；由章节专属 <Stepper> 驱动步骤切换。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 430;
const OBJECT = "var(--success)";
const FLOW = "var(--accent)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

export type Poeaa24Pattern13ForeignKeyMappingStep = 1 | 2 | 3;

export type Poeaa24Pattern13ForeignKeyMappingProps = {
  step?: Poeaa24Pattern13ForeignKeyMappingStep;
};

export function Poeaa24Pattern13ForeignKeyMapping({
  step = 1,
}: Poeaa24Pattern13ForeignKeyMappingProps) {
  const loading = step === 1;
  const edgeCase = step === 3;
  const flowColor = edgeCase ? WARNING : FLOW;
  const flowLabel = loading
    ? "读取 FK → 解析引用"
    : edgeCase
      ? "NULL / 删除策略"
      : "引用 → 写回 FK";
  const stepStatus = loading
    ? "对象引用已由编号解析"
    : edgeCase
      ? "空值与删除边界待决"
      : "外键列与对象引用对齐";
  const orderCustomer = edgeCase ? "customer: null" : "customer: Customer";
  const orderCustomerId = edgeCase ? "customer_id: NULL" : "customer_id: 7";
  const customerLabel = edgeCase ? "Customer（可不存在）" : "Customer";
  const customerId = edgeCase ? "id: —" : "id: 7";
  const markerId = "poeaa24-foreign-key-arrow";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`外键映射步骤${step}：${stepStatus}。左侧对象图中的 Order 与 Customer，通过 orders.customer_id 指向 customers.id。${edgeCase ? "没有关联时写入 NULL，删除策略需要明确选择 RESTRICT、SET NULL 或 CASCADE。" : loading ? "加载时读取外键编号并解析为对象引用。" : "保存时从对象引用取出客户编号并写回外键列。"}`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id={markerId}
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L7 4 L0 8 Z" fill={flowColor} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="Foreign Key Mapping：对象引用 ↔ 外键列"
          />
          <text
            x={VIEW_W / 2}
            y="54"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            {loading
              ? "从关系表的编号建立可导航的对象引用"
              : edgeCase
                ? "关系缺失与父行删除都要落在显式边界上"
                : "从对象引用取得编号，写回子表的外键列"}
          </text>

          {/* 对象图：左侧展示引用关系，但不复制客户资料。 */}
          <rect
            x="40"
            y="78"
            width="250"
            height="94"
            rx="8"
            fill={T.bg}
            stroke={OBJECT}
            strokeWidth="1.5"
          />
          <rect
            x="40"
            y="78"
            width="250"
            height="30"
            rx="8"
            fill={OBJECT}
            fillOpacity="0.12"
          />
          <text
            x="165"
            y="99"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={OBJECT}
          >
            Order（对象）
          </text>
          <text
            x="58"
            y="128"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            id: 42
          </text>
          <text
            x="58"
            y="148"
            fontSize="11"
            fontFamily="monospace"
            fill={edgeCase ? WARNING : FLOW}
          >
            {orderCustomer}
          </text>

          <rect
            x="40"
            y="192"
            width="250"
            height="94"
            rx="8"
            fill={T.bg}
            stroke={OBJECT}
            strokeWidth="1.5"
          />
          <rect
            x="40"
            y="192"
            width="250"
            height="30"
            rx="8"
            fill={OBJECT}
            fillOpacity="0.12"
          />
          <text
            x="165"
            y="213"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={OBJECT}
          >
            {customerLabel}
          </text>
          <text
            x="58"
            y="242"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            {customerId}
          </text>
          <text
            x="58"
            y="262"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            name: "Alice"
          </text>

          <line
            x1="165"
            y1="172"
            x2="165"
            y2="192"
            stroke={edgeCase ? WARNING : OBJECT}
            strokeWidth="1.5"
          />
          <text
            x="177"
            y="186"
            fontSize="11"
            fill={edgeCase ? WARNING : OBJECT}
          >
            {edgeCase ? "可空" : "引用"}
          </text>

          {/* 关系表：右侧保持主键与外键的可见对应。 */}
          <rect
            x="430"
            y="78"
            width="250"
            height="94"
            rx="8"
            fill={T.bg}
            stroke={WARNING}
            strokeWidth="1.5"
          />
          <rect
            x="430"
            y="78"
            width="250"
            height="30"
            rx="8"
            fill={WARNING}
            fillOpacity="0.12"
          />
          <text
            x="555"
            y="99"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={WARNING}
          >
            orders（关系行）
          </text>
          <text
            x="448"
            y="128"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            id: 42
          </text>
          <text
            x="448"
            y="148"
            fontSize="11"
            fontFamily="monospace"
            fill={edgeCase ? WARNING : FLOW}
          >
            {orderCustomerId}
          </text>

          <rect
            x="430"
            y="192"
            width="250"
            height="94"
            rx="8"
            fill={T.bg}
            stroke={WARNING}
            strokeWidth="1.5"
          />
          <rect
            x="430"
            y="192"
            width="250"
            height="30"
            rx="8"
            fill={WARNING}
            fillOpacity="0.12"
          />
          <text
            x="555"
            y="213"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={WARNING}
          >
            customers（目标表）
          </text>
          <text
            x="448"
            y="242"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            {edgeCase ? "id: deleted?" : "id: 7  ← PK"}
          </text>
          <text
            x="448"
            y="262"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            name: "Alice"
          </text>

          <line
            x1={loading ? "430" : "290"}
            y1="138"
            x2={loading ? "290" : "430"}
            y2="138"
            stroke={flowColor}
            strokeWidth="1.8"
            strokeDasharray={edgeCase ? "5 4" : undefined}
            markerEnd={`url(#${markerId})`}
          />
          <text
            x={VIEW_W / 2}
            y="127"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={flowColor}
          >
            {flowLabel}
          </text>

          <line
            x1="555"
            y1="172"
            x2="555"
            y2="192"
            stroke={edgeCase ? WARNING : FLOW}
            strokeWidth="1.5"
          />
          <text x="568" y="186" fontSize="11" fill={edgeCase ? WARNING : FLOW}>
            {edgeCase ? "策略" : "FK → PK"}
          </text>

          {/* 每一步的验收状态。 */}
          <rect
            x="40"
            y="318"
            width="640"
            height="72"
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={edgeCase ? DANGER : T.border}
            strokeWidth="1"
          />
          <text
            x="58"
            y="342"
            fontSize="12"
            fontWeight="700"
            fill={edgeCase ? WARNING : FLOW}
          >
            步骤 {step} · {stepStatus}
          </text>
          <text x="58" y="365" fontSize="11" fill={T.secondary}>
            {loading
              ? "orders.customer_id=7 让 Order.customer 指向 Customer(id=7)，客户字段仍由 customers 表拥有。"
              : edgeCase
                ? "可选关系写 NULL；删除父行前先决定 RESTRICT、SET NULL 或 CASCADE，不能让框架默认替业务裁决。"
                : "Order.customer.id=7 只产生一个写入值：orders.customer_id=7；客户行不会被订单保存逻辑复制。"}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        外键映射让对象引用与关系表编号互相转换；编号的有效性、空值语义和删除策略都必须可检查。
      </figcaption>
    </figure>
  );
}

// 保留现有章节注册表的导出名，同时提供以 Diagram 结尾的成员名供 MDX 语义识别。
Object.assign(Poeaa24Pattern13ForeignKeyMapping, {
  Diagram: Poeaa24Pattern13ForeignKeyMapping,
});
