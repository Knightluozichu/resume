/**
 * <AddBoundedContextDiagram>：限界上下文图（architecture-domain 领域驱动设计章）。
 *
 * 展示电商系统的多个限界上下文：三个圆角矩形分别是
 *   - 订单上下文（Order）—— Customer = {id, name, shippingAddress}
 *   - 库存上下文（Inventory）—— Customer = {id, warehouse}
 *   - 物流上下文（Shipping）—— Customer = {id, address, phone}
 * 每个上下文内有自己的 Customer 概念（字段不同），上下文之间用虚线连接表示集成。
 * 标注「同名异义」概念在不同上下文中的差异。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const CTX_W = 196;
const CTX_H = 220;
const CTX_GAP = 36;
const CTX_MARGIN = 48;
const ctxX = (i: number) => CTX_MARGIN + i * (CTX_W + CTX_GAP);
const CTX_Y = 100;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

interface BContext {
  name: string;
  color: string;
  customerFields: string[];
  otherEntities: string[];
}

const CONTEXTS: readonly BContext[] = [
  {
    name: "Order",
    color: accent,
    customerFields: ["id: UUID", "name: string", "shippingAddress: Address"],
    otherEntities: ["Order", "OrderItem"],
  },
  {
    name: "Inventory",
    color: success,
    customerFields: ["id: UUID", "warehouse: string"],
    otherEntities: ["Stock", "Product"],
  },
  {
    name: "Shipping",
    color: warning,
    customerFields: ["id: UUID", "address: Address", "phone: string"],
    otherEntities: ["Shipment", "Tracking"],
  },
];

export function AddBoundedContextDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="限界上下文图。三个圆角矩形：订单上下文 Order（紫色），Customer 包含 id、name、shippingAddress；库存上下文 Inventory（绿色），Customer 包含 id、warehouse；物流上下文 Shipping（黄色），Customer 包含 id、address、phone。上下文之间用虚线连接表示集成。标注同名异义：Customer 在不同上下文中字段不同。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            限界上下文 · 同名异义
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            同一个「Customer」在不同上下文中有不同含义——边界即语义
          </text>

          {/* 三个上下文 */}
          {CONTEXTS.map((ctx, ci) => {
            const cx = ctxX(ci);
            return (
              <g key={ctx.name}>
                {/* 上下文外框 */}
                <rect
                  x={cx}
                  y={CTX_Y}
                  width={CTX_W}
                  height={CTX_H}
                  rx="12"
                  fill={ctx.color}
                  fillOpacity="0.04"
                  stroke={ctx.color}
                  strokeWidth="1.8"
                />
                {/* 上下文标题 */}
                <rect
                  x={cx}
                  y={CTX_Y}
                  width={CTX_W}
                  height={32}
                  rx="12"
                  fill={ctx.color}
                  fillOpacity="0.12"
                />
                <text
                  x={cx + CTX_W / 2}
                  y={CTX_Y + 21}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={ctx.color}
                  fontFamily="monospace"
                >
                  {ctx.name} Context
                </text>

                {/* Customer 概念（重点框） */}
                <rect
                  x={cx + 12}
                  y={CTX_Y + 44}
                  width={CTX_W - 24}
                  height={92}
                  rx="8"
                  fill={ctx.color}
                  fillOpacity="0.08"
                  stroke={ctx.color}
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <text
                  x={cx + CTX_W / 2}
                  y={CTX_Y + 62}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={ctx.color}
                  fontFamily="monospace"
                >
                  Customer
                </text>
                <line x1={cx + 16} y1={CTX_Y + 68} x2={cx + CTX_W - 16} y2={CTX_Y + 68} stroke={ctx.color} strokeWidth="0.8" strokeOpacity="0.4" />
                {ctx.customerFields.map((f, fi) => (
                  <text
                    key={f}
                    x={cx + 20}
                    y={CTX_Y + 84 + fi * 16}
                    fontSize="11"
                    fill={primary}
                    fontFamily="monospace"
                  >
                    {f}
                  </text>
                ))}

                {/* 其他实体 */}
                <text
                  x={cx + 12}
                  y={CTX_Y + 156}
                  fontSize="11"
                  fill={secondary}
                >
                  其他实体：
                </text>
                {ctx.otherEntities.map((e, ei) => (
                  <text
                    key={e}
                    x={cx + 12}
                    y={CTX_Y + 174 + ei * 16}
                    fontSize="11"
                    fill={primary}
                    fontFamily="monospace"
                  >
                    {e}
                  </text>
                ))}
              </g>
            );
          })}

          {/* 虚线连接：上下文间集成 */}
          <line x1={ctxX(0) + CTX_W + 4} y1={CTX_Y + CTX_H / 2} x2={ctxX(1) - 4} y2={CTX_Y + CTX_H / 2} stroke={secondary} strokeWidth="1.4" strokeDasharray="6 4" />
          <line x1={ctxX(1) + CTX_W + 4} y1={CTX_Y + CTX_H / 2} x2={ctxX(2) - 4} y2={CTX_Y + CTX_H / 2} stroke={secondary} strokeWidth="1.4" strokeDasharray="6 4" />
          <text x={(ctxX(0) + CTX_W + ctxX(1)) / 2} y={CTX_Y + CTX_H / 2 - 8} textAnchor="middle" fontSize="11" fill={secondary}>集成</text>
          <text x={(ctxX(1) + CTX_W + ctxX(2)) / 2} y={CTX_Y + CTX_H / 2 - 8} textAnchor="middle" fontSize="11" fill={secondary}>集成</text>

          {/* 底部注释：同名异义 */}
          <line x1={48} y1={372} x2={VIEW_W - 48} y2={372} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={396} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>
            「同名异义」：Customer 在三个上下文中字段完全不同
          </text>
          <text x={VIEW_W / 2} y={416} textAnchor="middle" fontSize="11" fill={secondary}>
            Order 关心收货地址 · Inventory 关心仓库归属 · Shipping 关心电话与地址
          </text>
          <text x={VIEW_W / 2} y={444} textAnchor="middle" fontSize="11" fill={secondary}>
            限界上下文为同名概念赋予不同语义——边界之内，模型自治
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        电商系统三个限界上下文：Order、Inventory、Shipping。同一个「Customer」在不同上下文中字段不同——订单关心收货地址，库存关心仓库，物流关心电话。虚线表示上下文间的集成。
      </figcaption>
    </figure>
  );
}
