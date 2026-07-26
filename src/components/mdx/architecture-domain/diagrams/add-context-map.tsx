/**
 * <AddContextMapDiagram>：上下文映射图（architecture-domain 领域驱动设计章）。
 *
 * 展示多个限界上下文之间的集成模式。5 个上下文矩形：
 *   Sales, Order, Inventory, Billing, Shipping
 * 它们之间用不同样式的箭头连接，标注集成模式：
 *   Partnership（合作关系）、Customer-Supplier（客户-供应商）、
 *   Conformist（遵奉者）、ACL（防腐层）、OHS（开放主机服务）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×520（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 520;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

// 5 个上下文布局
const SALES = { x: 40, y: 96, w: 140, h: 56 };
const ORDER = { x: 290, y: 80, w: 140, h: 56 };
const INVENTORY = { x: 540, y: 96, w: 140, h: 56 };
const BILLING = { x: 180, y: 260, w: 140, h: 56 };
const SHIPPING = { x: 400, y: 260, w: 140, h: 56 };

interface ContextNode {
  box: { x: number; y: number; w: number; h: number };
  label: string;
  color: string;
}

const NODES: Record<string, ContextNode> = {
  sales: { box: SALES, label: "Sales", color: accent },
  order: { box: ORDER, label: "Order", color: accent },
  inventory: { box: INVENTORY, label: "Inventory", color: success },
  billing: { box: BILLING, label: "Billing", color: warning },
  shipping: { box: SHIPPING, label: "Shipping", color: success },
};

export function AddContextMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="上下文映射图。5 个限界上下文矩形：Sales、Order、Inventory、Billing、Shipping。它们之间用不同样式的箭头连接，标注集成模式：Partnership（合作关系）、Customer-Supplier（客户-供应商）、Conformist（遵奉者）、ACL（防腐层）、OHS（开放主机服务）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 实线箭头 */}
            <marker id="cm-solid" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
            {/* 虚线箭头（ACL） */}
            <marker id="cm-dashed" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
            {/* 开放主机服务箭头（双线） */}
            <marker id="cm-ohs" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={success} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            上下文映射 · 集成模式
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            5 个限界上下文通过 5 种集成模式协作
          </text>

          {/* 5 个上下文节点 */}
          {Object.entries(NODES).map(([key, node]) => (
            <g key={key}>
              <rect
                x={node.box.x}
                y={node.box.y}
                width={node.box.w}
                height={node.box.h}
                rx="10"
                fill={node.color}
                fillOpacity="0.08"
                stroke={node.color}
                strokeWidth="1.8"
              />
              <text
                x={node.box.x + node.box.w / 2}
                y={node.box.y + node.box.h / 2 + 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={primary}
                fontFamily="monospace"
              >
                {node.label}
              </text>
            </g>
          ))}

          {/* ===== 集成箭头 ===== */}

          {/* Sales ↔ Order: Partnership（双向实线） */}
          <line x1={SALES.x + SALES.w} y1={SALES.y + SALES.h / 2} x2={ORDER.x} y2={ORDER.y + ORDER.h / 2} stroke={secondary} strokeWidth="1.8" markerEnd="url(#cm-solid)" />
          <line x1={ORDER.x} y1={ORDER.y + ORDER.h / 2 + 4} x2={SALES.x + SALES.w} y2={SALES.y + SALES.h / 2 + 4} stroke={secondary} strokeWidth="1.8" markerEnd="url(#cm-solid)" />
          <text x={(SALES.x + SALES.w + ORDER.x) / 2} y={SALES.y + SALES.h / 2 - 10} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Partnership</text>
          <text x={(SALES.x + SALES.w + ORDER.x) / 2} y={SALES.y + SALES.h / 2 + 22} textAnchor="middle" fontSize="11" fill={secondary}>合作关系</text>

          {/* Order → Inventory: Customer-Supplier（实线箭头） */}
          <line x1={ORDER.x + ORDER.w} y1={ORDER.y + ORDER.h / 2} x2={INVENTORY.x} y2={INVENTORY.y + INVENTORY.h / 2} stroke={secondary} strokeWidth="1.6" markerEnd="url(#cm-solid)" />
          <text x={(ORDER.x + ORDER.w + INVENTORY.x) / 2} y={ORDER.y + ORDER.h / 2 - 10} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Customer-Supplier</text>
          <text x={(ORDER.x + ORDER.w + INVENTORY.x) / 2} y={INVENTORY.y + INVENTORY.h / 2 + 20} textAnchor="middle" fontSize="11" fill={secondary}>客户-供应商</text>

          {/* Order → Billing: ACL（虚线箭头，accent 紫） */}
          <line x1={ORDER.x + 60} y1={ORDER.y + ORDER.h} x2={BILLING.x + BILLING.w / 2} y2={BILLING.y} stroke={accent} strokeWidth="1.6" strokeDasharray="6 3" markerEnd="url(#cm-dashed)" />
          <text x={ORDER.x + 40} y={BILLING.y - 10} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>ACL</text>
          <text x={ORDER.x + 40} y={BILLING.y + 4} textAnchor="middle" fontSize="11" fill={secondary}>防腐层</text>

          {/* Order → Shipping: OHS（开放主机服务，success 绿双线） */}
          <line x1={ORDER.x + 100} y1={ORDER.y + ORDER.h} x2={SHIPPING.x + SHIPPING.w / 2} y2={SHIPPING.y} stroke={success} strokeWidth="1.8" markerEnd="url(#cm-ohs)" />
          <line x1={ORDER.x + 104} y1={ORDER.y + ORDER.h} x2={SHIPPING.x + SHIPPING.w / 2 + 4} y2={SHIPPING.y} stroke={success} strokeWidth="1" strokeOpacity="0.5" />
          <text x={SHIPPING.x + SHIPPING.w / 2 + 30} y={SHIPPING.y - 10} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>OHS</text>
          <text x={SHIPPING.x + SHIPPING.w / 2 + 30} y={SHIPPING.y + 4} textAnchor="middle" fontSize="11" fill={secondary}>开放主机服务</text>

          {/* Billing → Shipping: Conformist（实线箭头，warning 黄） */}
          <line x1={BILLING.x + BILLING.w} y1={BILLING.y + BILLING.h / 2} x2={SHIPPING.x} y2={SHIPPING.y + SHIPPING.h / 2} stroke={warning} strokeWidth="1.6" markerEnd="url(#cm-solid)" />
          <text x={(BILLING.x + BILLING.w + SHIPPING.x) / 2} y={BILLING.y + BILLING.h / 2 - 10} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>Conformist</text>
          <text x={(BILLING.x + BILLING.w + SHIPPING.x) / 2} y={BILLING.y + BILLING.h / 2 + 20} textAnchor="middle" fontSize="11" fill={secondary}>遵奉者</text>

          {/* ===== 图例 ===== */}
          <line x1={40} y1={380} x2={VIEW_W - 40} y2={380} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          <g>
            {/* Partnership */}
            <line x1={56} y1={408} x2={84} y2={408} stroke={secondary} strokeWidth="1.6" />
            <line x1={56} y1={412} x2={84} y2={412} stroke={secondary} strokeWidth="1.6" />
            <text x={92} y={412} fontSize="11" fill={primary}>Partnership 合作</text>

            {/* Customer-Supplier */}
            <line x1={236} y1={410} x2={264} y2={410} stroke={secondary} strokeWidth="1.6" markerEnd="url(#cm-solid)" />
            <text x={272} y={414} fontSize="11" fill={primary}>Customer-Supplier 客供</text>

            {/* Conformist */}
            <line x1={440} y1={410} x2={468} y2={410} stroke={warning} strokeWidth="1.6" markerEnd="url(#cm-solid)" />
            <text x={476} y={414} fontSize="11" fill={primary}>Conformist 遵奉</text>
          </g>
          <g>
            {/* ACL */}
            <line x1={56} y1={446} x2={84} y2={446} stroke={accent} strokeWidth="1.6" strokeDasharray="6 3" markerEnd="url(#cm-dashed)" />
            <text x={92} y={450} fontSize="11" fill={primary}>ACL 防腐层</text>

            {/* OHS */}
            <line x1={236} y1={446} x2={264} y2={446} stroke={success} strokeWidth="1.8" markerEnd="url(#cm-ohs)" />
            <text x={272} y={450} fontSize="11" fill={primary}>OHS 开放主机服务</text>
          </g>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={492} textAnchor="middle" fontSize="12" fill={secondary}>
            集成模式决定上下文间的耦合程度——ACL 隔离变化，OHS 暴露标准协议
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        5 个限界上下文通过 5 种集成模式协作：Sales 与 Order 是 Partnership，Order 对 Inventory 是 Customer-Supplier，Order 通过 ACL 访问 Billing、通过 OHS 对 Shipping 开放，Billing 对 Shipping 是 Conformist。
      </figcaption>
    </figure>
  );
}
