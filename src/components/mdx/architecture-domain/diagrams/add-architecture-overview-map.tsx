/**
 * <AddArchitectureOverviewMap>：全书架构地图（architecture-domain 入门章）。
 *
 * 三大板块横向排布，展示「架构原则 → 领域驱动设计 → 架构实践」的进阶关系：
 *   - 左列「架构原则」（accent 紫）：SOLID → 分层架构 → 整洁架构
 *   - 中列「领域驱动设计」（success 绿）：限界上下文 → 实体聚合 → 上下文映射
 *   - 右列「架构实践」（warning 黄）：CQRS/ES → 六边形架构 → 微服务
 * 列间用箭头连接表示进阶与互补关系。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const COL_W = 192;
const COL_GAP = 36;
const COL_MARGIN = 32;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const ITEM_H = 72;
const ITEM_GAP = 16;
const ITEM_START_Y = 108;

const itemY = (i: number) => ITEM_START_Y + i * (ITEM_H + ITEM_GAP);

interface Column {
  title: string;
  subtitle: string;
  color: string;
  items: string[];
}

const COLUMNS: readonly Column[] = [
  {
    title: "架构原则",
    subtitle: "Principles",
    color: "var(--accent)",
    items: ["SOLID 原则", "分层架构", "整洁架构"],
  },
  {
    title: "领域驱动设计",
    subtitle: "Domain-Driven Design",
    color: "var(--success)",
    items: ["限界上下文", "实体与聚合", "上下文映射"],
  },
  {
    title: "架构实践",
    subtitle: "Practice",
    color: "var(--warning)",
    items: ["CQRS / 事件溯源", "六边形架构", "微服务"],
  },
];

export function AddArchitectureOverviewMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="架构与领域设计全书地图。三列纵向排列：左列架构原则（紫色）包含 SOLID 原则、分层架构、整洁架构；中列领域驱动设计（绿色）包含限界上下文、实体与聚合、上下文映射；右列架构实践（黄色）包含 CQRS/事件溯源、六边形架构、微服务。列间用箭头连接表示进阶与互补关系。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="aom-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="7"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L7 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text
            x={VIEW_W / 2}
            y={36}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            架构与领域设计 · 全书地图
          </text>
          <text
            x={VIEW_W / 2}
            y={58}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            从原则到领域，从领域到实践——三块拼图构成完整视角
          </text>

          {/* 三列 */}
          {COLUMNS.map((col, ci) => {
            const cx = colX(ci);
            return (
              <g key={col.title}>
                {/* 列标题区 */}
                <rect
                  x={cx}
                  y={76}
                  width={COL_W}
                  height={28}
                  rx="6"
                  fill={col.color}
                  fillOpacity="0.12"
                  stroke={col.color}
                  strokeWidth="1.5"
                />
                <text
                  x={cx + COL_W / 2}
                  y={95}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={col.color}
                >
                  {col.title}
                </text>

                {/* 列内条目 */}
                {col.items.map((item, ii) => {
                  const y = itemY(ii);
                  return (
                    <g key={item}>
                      <rect
                        x={cx}
                        y={y}
                        width={COL_W}
                        height={ITEM_H}
                        rx="10"
                        fill={col.color}
                        fillOpacity="0.06"
                        stroke={col.color}
                        strokeWidth="1.5"
                        strokeOpacity="0.5"
                      />
                      <text
                        x={cx + COL_W / 2}
                        y={y + ITEM_H / 2 + 5}
                        textAnchor="middle"
                        fontSize="13"
                        fontWeight="600"
                        fill="var(--text-primary)"
                      >
                        {item}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 列间进阶箭头：第 1 列 → 第 2 列 */}
          <line
            x1={colX(0) + COL_W + 6}
            y1={itemY(1) + ITEM_H / 2}
            x2={colX(1) - 6}
            y2={itemY(1) + ITEM_H / 2}
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            markerEnd="url(#aom-arrow)"
          />
          <text
            x={(colX(0) + COL_W + colX(1)) / 2}
            y={itemY(1) + ITEM_H / 2 - 10}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            沉淀
          </text>

          {/* 列间进阶箭头：第 2 列 → 第 3 列 */}
          <line
            x1={colX(1) + COL_W + 6}
            y1={itemY(1) + ITEM_H / 2}
            x2={colX(2) - 6}
            y2={itemY(1) + ITEM_H / 2}
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            markerEnd="url(#aom-arrow)"
          />
          <text
            x={(colX(1) + COL_W + colX(2)) / 2}
            y={itemY(1) + ITEM_H / 2 - 10}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            落地
          </text>

          {/* 底部总结 */}
          <line
            x1={32}
            y1={408}
            x2={VIEW_W - 32}
            y2={408}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x={VIEW_W / 2}
            y={432}
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            原则约束方向，领域建模核心，实践落地结构——三者缺一不可
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书三大板块：架构原则（SOLID、分层、整洁架构）奠定方向，领域驱动设计（限界上下文、聚合、上下文映射）建模核心，架构实践（CQRS/ES、六边形、微服务）落地结构。
      </figcaption>
    </figure>
  );
}
