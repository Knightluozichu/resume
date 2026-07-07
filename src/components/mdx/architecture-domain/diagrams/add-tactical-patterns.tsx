/**
 * <AddTacticalPatternsDiagram>：战术模式图解（architecture-domain 领域驱动设计章）。
 *
 * 展示 Aggregate Root → Entity → Value Object 的层级关系。
 * 一个订单聚合：Aggregate Root（Order）包含多个 Entity（OrderItem）和
 * Value Object（Address, Money）。Repository 在聚合外侧通过 ID 引用。
 * 用箭头标注关联关系（聚合内用实线，聚合边界用虚线，Repository 引用用虚线箭头）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

// 聚合边界框
const AGG = { x: 80, y: 96, w: 400, h: 312 };

// Aggregate Root: Order
const ORDER = { x: 160, y: 120, w: 240, h: 80 };

// Entity: OrderItem ×2
const ITEM1 = { x: 104, y: 240, w: 156, h: 64 };
const ITEM2 = { x: 104, y: 320, w: 156, h: 64 };

// Value Object: Address, Money
const ADDR = { x: 300, y: 240, w: 160, h: 64 };
const MONEY = { x: 300, y: 320, w: 160, h: 64 };

// Repository（聚合外）
const REPO = { x: 540, y: 200, w: 140, h: 72 };

export function AddTacticalPatternsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="战术模式图解。一个订单聚合：Aggregate Root（Order，紫色）包含多个 Entity（OrderItem，绿色）和 Value Object（Address、Money，黄色）。聚合边界用虚线框标注。Repository（紫色）在聚合外侧通过 ID 引用聚合根。聚合内用实线箭头标注关联，Repository 用虚线箭头标注引用。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="tp-arrow-solid" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="tp-arrow-dashed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={accent} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            战术模式 · 聚合结构
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            Aggregate Root 是唯一入口——外部只通过 ID 引用聚合根
          </text>

          {/* 聚合边界（虚线框） */}
          <rect
            x={AGG.x}
            y={AGG.y}
            width={AGG.w}
            height={AGG.h}
            rx="12"
            fill="none"
            stroke={border}
            strokeWidth="1.5"
            strokeDasharray="8 4"
          />
          <text x={AGG.x + 12} y={AGG.y + 18} fontSize="11" fill={secondary} fontStyle="italic">
            Order Aggregate 边界
          </text>

          {/* Aggregate Root: Order */}
          <g>
            <rect x={ORDER.x} y={ORDER.y} width={ORDER.w} height={ORDER.h} rx="10" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="2" />
            <text x={ORDER.x + ORDER.w / 2} y={ORDER.y + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent} fontFamily="monospace">
              Order（Aggregate Root）
            </text>
            <line x1={ORDER.x + 12} y1={ORDER.y + 30} x2={ORDER.x + ORDER.w - 12} y2={ORDER.y + 30} stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
            <text x={ORDER.x + 16} y={ORDER.y + 48} fontSize="11" fill={primary} fontFamily="monospace">- id: OrderId</text>
            <text x={ORDER.x + 16} y={ORDER.y + 64} fontSize="11" fill={primary} fontFamily="monospace">- items: List&lt;OrderItem&gt;</text>
            <text x={ORDER.x + 16} y={ORDER.y + 78} fontSize="11" fill={primary} fontFamily="monospace">+ addItem()</text>
          </g>

          {/* Entity: OrderItem ×2 */}
          {[ITEM1, ITEM2].map((item, i) => (
            <g key={`item-${i}`}>
              <rect x={item.x} y={item.y} width={item.w} height={item.h} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.5" />
              <text x={item.x + item.w / 2} y={item.y + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill={success} fontFamily="monospace">
                OrderItem {i === 0 ? "①" : "②"}
              </text>
              <text x={item.x + item.w / 2} y={item.y + 34} textAnchor="middle" fontSize="10" fill={secondary}>Entity</text>
              <line x1={item.x + 8} y1={item.y + 40} x2={item.x + item.w - 8} y2={item.y + 40} stroke={success} strokeWidth="0.8" strokeOpacity="0.4" />
              <text x={item.x + 12} y={item.y + 54} fontSize="11" fill={primary} fontFamily="monospace">- productId</text>
            </g>
          ))}

          {/* Value Object: Address, Money */}
          <g>
            <rect x={ADDR.x} y={ADDR.y} width={ADDR.w} height={ADDR.h} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.5" />
            <text x={ADDR.x + ADDR.w / 2} y={ADDR.y + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning} fontFamily="monospace">
              Address
            </text>
            <text x={ADDR.x + ADDR.w / 2} y={ADDR.y + 34} textAnchor="middle" fontSize="10" fill={secondary}>Value Object</text>
            <line x1={ADDR.x + 8} y1={ADDR.y + 40} x2={ADDR.x + ADDR.w - 8} y2={ADDR.y + 40} stroke={warning} strokeWidth="0.8" strokeOpacity="0.4" />
            <text x={ADDR.x + 12} y={ADDR.y + 54} fontSize="11" fill={primary} fontFamily="monospace">city, street, zip</text>
          </g>
          <g>
            <rect x={MONEY.x} y={MONEY.y} width={MONEY.w} height={MONEY.h} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.5" />
            <text x={MONEY.x + MONEY.w / 2} y={MONEY.y + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning} fontFamily="monospace">
              Money
            </text>
            <text x={MONEY.x + MONEY.w / 2} y={MONEY.y + 34} textAnchor="middle" fontSize="10" fill={secondary}>Value Object</text>
            <line x1={MONEY.x + 8} y1={MONEY.y + 40} x2={MONEY.x + MONEY.w - 8} y2={MONEY.y + 40} stroke={warning} strokeWidth="0.8" strokeOpacity="0.4" />
            <text x={MONEY.x + 12} y={MONEY.y + 54} fontSize="11" fill={primary} fontFamily="monospace">amount, currency</text>
          </g>

          {/* 关联箭头：Order → OrderItem */}
          <line x1={ORDER.x + 40} y1={ORDER.y + ORDER.h} x2={ITEM1.x + ITEM1.w / 2} y2={ITEM1.y - 2} stroke={secondary} strokeWidth="1.4" markerEnd="url(#tp-arrow-solid)" />
          <line x1={ORDER.x + 80} y1={ORDER.y + ORDER.h} x2={ITEM2.x + ITEM2.w / 2} y2={ITEM2.y - 2} stroke={secondary} strokeWidth="1.4" markerEnd="url(#tp-arrow-solid)" />
          {/* 关联箭头：Order → Address */}
          <line x1={ORDER.x + ORDER.w - 60} y1={ORDER.y + ORDER.h} x2={ADDR.x + ADDR.w / 2} y2={ADDR.y - 2} stroke={secondary} strokeWidth="1.4" markerEnd="url(#tp-arrow-solid)" />
          {/* 关联箭头：Order → Money */}
          <line x1={ORDER.x + ORDER.w - 20} y1={ORDER.y + ORDER.h} x2={MONEY.x + MONEY.w / 2} y2={MONEY.y - 2} stroke={secondary} strokeWidth="1.4" markerEnd="url(#tp-arrow-solid)" />

          {/* Repository（聚合外） */}
          <g>
            <rect x={REPO.x} y={REPO.y} width={REPO.w} height={REPO.h} rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.8" strokeDasharray="5 3" />
            <text x={REPO.x + REPO.w / 2} y={REPO.y + 22} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">
              «interface»
            </text>
            <text x={REPO.x + REPO.w / 2} y={REPO.y + 40} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent} fontFamily="monospace">
              OrderRepository
            </text>
            <line x1={REPO.x + 12} y1={REPO.y + 48} x2={REPO.x + REPO.w - 12} y2={REPO.y + 48} stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
            <text x={REPO.x + 12} y={REPO.y + 64} fontSize="11" fill={primary} fontFamily="monospace">findById(id)</text>
          </g>

          {/* Repository → Order 虚线引用箭头 */}
          <line x1={REPO.x} y1={REPO.y + REPO.h / 2} x2={ORDER.x + ORDER.w + 2} y2={ORDER.y + ORDER.h / 2} stroke={accent} strokeWidth="1.6" strokeDasharray="5 3" markerEnd="url(#tp-arrow-dashed)" />
          <text x={(REPO.x + ORDER.x + ORDER.w) / 2} y={REPO.y + REPO.h / 2 - 8} textAnchor="middle" fontSize="11" fill={accent} fontStyle="italic">
            by OrderId
          </text>

          {/* 图例 */}
          <g>
            <rect x={80} y={436} width="14" height="12" rx="3" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.4" />
            <text x={100} y={446} fontSize="11" fill={primary}>Aggregate Root</text>
            <rect x={220} y={436} width="14" height="12" rx="3" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.4" />
            <text x={240} y={446} fontSize="11" fill={primary}>Entity</text>
            <rect x={320} y={436} width="14" height="12" rx="3" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.4" />
            <text x={340} y={446} fontSize="11" fill={primary}>Value Object</text>
            <rect x={460} y={436} width="14" height="12" rx="3" fill="none" stroke={border} strokeWidth="1.4" strokeDasharray="4 2" />
            <text x={480} y={446} fontSize="11" fill={primary}>聚合边界</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        订单聚合的战术结构：Order 是 Aggregate Root，包含 OrderItem（Entity）和 Address、Money（Value Object）。Repository 在聚合外部，仅通过 OrderId 引用聚合根——外部对象不直接访问聚合内部。
      </figcaption>
    </figure>
  );
}
