/**
 * <AddCqrsEventSourcingDiagram>：CQRS + 事件溯源架构图（architecture-domain 架构实践章）。
 *
 * 左侧 Command 侧（Write Model，accent 紫），右侧 Query 侧（Read Model，success 绿）。
 * 中间通过 Event Store / Event Bus 连接。
 * 写路径：Command → Command Handler → Domain → Event Store → Event Bus
 * 读路径：Event Bus → Read Model (Materialized View) → Query
 * 用颜色区分写路径（accent）和读路径（success）。
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

// 写路径节点（左侧，accent 紫）
const CMD = { x: 36, y: 96, w: 132, h: 52 };
const HANDLER = { x: 36, y: 176, w: 132, h: 52 };
const DOMAIN = { x: 36, y: 256, w: 132, h: 52 };
const EVENT_STORE = { x: 200, y: 256, w: 140, h: 52 };

// 中间连接
const EVENT_BUS = { x: 380, y: 176, w: 140, h: 52 };

// 读路径节点（右侧，success 绿）
const READ_MODEL = { x: 552, y: 176, w: 132, h: 52 };
const QUERY = { x: 552, y: 96, w: 132, h: 52 };

// 写模型存储（Event Store 下方注释）
const WRITE_DB = { x: 200, y: 336, w: 140, h: 44 };

export function AddCqrsEventSourcingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CQRS + 事件溯源架构图。左侧 Command 侧（写模型，紫色）：Command → Command Handler → Domain → Event Store。中间通过 Event Bus 连接。右侧 Query 侧（读模型，绿色）：Event Bus → Read Model（物化视图）→ Query。用颜色区分写路径（紫色）和读路径（绿色）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="cqrs-write" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
            <marker id="cqrs-read" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={success} />
            </marker>
            <marker id="cqrs-event" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={warning} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            CQRS + 事件溯源
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            读写分离——写路径产生事件，读路径消费事件
          </text>

          {/* 侧标题 */}
          <text x={CMD.x + CMD.w / 2} y={76} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            Command（写路径）
          </text>
          <text x={QUERY.x + QUERY.w / 2} y={76} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            Query（读路径）
          </text>

          {/* ===== 写路径节点（左侧，accent 紫） ===== */}
          {/* Command */}
          <g>
            <rect x={CMD.x} y={CMD.y} width={CMD.w} height={CMD.h} rx="10" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.8" />
            <text x={CMD.x + CMD.w / 2} y={CMD.y + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent} fontFamily="monospace">Command</text>
            <text x={CMD.x + CMD.w / 2} y={CMD.y + 40} textAnchor="middle" fontSize="11" fill={secondary}>CreateOrder</text>
          </g>
          {/* Command Handler */}
          <g>
            <rect x={HANDLER.x} y={HANDLER.y} width={HANDLER.w} height={HANDLER.h} rx="10" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.8" />
            <text x={HANDLER.x + HANDLER.w / 2} y={HANDLER.y + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent} fontFamily="monospace">Handler</text>
            <text x={HANDLER.x + HANDLER.w / 2} y={HANDLER.y + 40} textAnchor="middle" fontSize="11" fill={secondary}>命令处理器</text>
          </g>
          {/* Domain */}
          <g>
            <rect x={DOMAIN.x} y={DOMAIN.y} width={DOMAIN.w} height={DOMAIN.h} rx="10" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.8" />
            <text x={DOMAIN.x + DOMAIN.w / 2} y={DOMAIN.y + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent} fontFamily="monospace">Domain</text>
            <text x={DOMAIN.x + DOMAIN.w / 2} y={DOMAIN.y + 40} textAnchor="middle" fontSize="11" fill={secondary}>聚合根 · 业务规则</text>
          </g>
          {/* Event Store */}
          <g>
            <rect x={EVENT_STORE.x} y={EVENT_STORE.y} width={EVENT_STORE.w} height={EVENT_STORE.h} rx="10" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.8" />
            <text x={EVENT_STORE.x + EVENT_STORE.w / 2} y={EVENT_STORE.y + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning} fontFamily="monospace">Event Store</text>
            <text x={EVENT_STORE.x + EVENT_STORE.w / 2} y={EVENT_STORE.y + 40} textAnchor="middle" fontSize="11" fill={secondary}>事件存储（追加写）</text>
          </g>

          {/* ===== 中间：Event Bus ===== */}
          <g>
            <rect x={EVENT_BUS.x} y={EVENT_BUS.y} width={EVENT_BUS.w} height={EVENT_BUS.h} rx="10" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="2" />
            <text x={EVENT_BUS.x + EVENT_BUS.w / 2} y={EVENT_BUS.y + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning} fontFamily="monospace">Event Bus</text>
            <text x={EVENT_BUS.x + EVENT_BUS.w / 2} y={EVENT_BUS.y + 40} textAnchor="middle" fontSize="11" fill={secondary}>事件总线 · 发布/订阅</text>
          </g>

          {/* ===== 读路径节点（右侧，success 绿） ===== */}
          {/* Read Model */}
          <g>
            <rect x={READ_MODEL.x} y={READ_MODEL.y} width={READ_MODEL.w} height={READ_MODEL.h} rx="10" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.8" />
            <text x={READ_MODEL.x + READ_MODEL.w / 2} y={READ_MODEL.y + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={success} fontFamily="monospace">Read Model</text>
            <text x={READ_MODEL.x + READ_MODEL.w / 2} y={READ_MODEL.y + 40} textAnchor="middle" fontSize="11" fill={secondary}>物化视图</text>
          </g>
          {/* Query */}
          <g>
            <rect x={QUERY.x} y={QUERY.y} width={QUERY.w} height={QUERY.h} rx="10" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.8" />
            <text x={QUERY.x + QUERY.w / 2} y={QUERY.y + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={success} fontFamily="monospace">Query</text>
            <text x={QUERY.x + QUERY.w / 2} y={QUERY.y + 40} textAnchor="middle" fontSize="11" fill={secondary}>GetOrderById</text>
          </g>

          {/* Write DB 标注 */}
          <g>
            <rect x={WRITE_DB.x} y={WRITE_DB.y} width={WRITE_DB.w} height={WRITE_DB.h} rx="8" fill={warning} fillOpacity="0.04" stroke={warning} strokeWidth="1" strokeOpacity="0.5" strokeDasharray="4 3" />
            <text x={WRITE_DB.x + WRITE_DB.w / 2} y={WRITE_DB.y + 28} textAnchor="middle" fontSize="11" fill={secondary} fontStyle="italic">只追加写入</text>
          </g>

          {/* ===== 写路径箭头（accent 紫） ===== */}
          <line x1={CMD.x + CMD.w / 2} y1={CMD.y + CMD.h} x2={HANDLER.x + HANDLER.w / 2} y2={HANDLER.y - 2} stroke={accent} strokeWidth="1.8" markerEnd="url(#cqrs-write)" />
          <line x1={HANDLER.x + HANDLER.w / 2} y1={HANDLER.y + HANDLER.h} x2={DOMAIN.x + DOMAIN.w / 2} y2={DOMAIN.y - 2} stroke={accent} strokeWidth="1.8" markerEnd="url(#cqrs-write)" />
          <line x1={DOMAIN.x + DOMAIN.w} y1={DOMAIN.y + DOMAIN.h / 2} x2={EVENT_STORE.x - 2} y2={EVENT_STORE.y + EVENT_STORE.h / 2} stroke={accent} strokeWidth="1.8" markerEnd="url(#cqrs-write)" />
          <text x={(DOMAIN.x + DOMAIN.w + EVENT_STORE.x) / 2} y={DOMAIN.y + DOMAIN.h / 2 - 8} textAnchor="middle" fontSize="11" fill={accent}>产生事件</text>

          {/* Event Store → Event Bus（warning 黄） */}
          <line x1={EVENT_STORE.x + EVENT_STORE.w / 2} y1={EVENT_STORE.y} x2={EVENT_BUS.x + 30} y2={EVENT_BUS.y + EVENT_BUS.h} stroke={warning} strokeWidth="1.8" markerEnd="url(#cqrs-event)" />
          <text x={EVENT_STORE.x + EVENT_STORE.w / 2 + 16} y={EVENT_STORE.y - 8} textAnchor="middle" fontSize="11" fill={warning}>发布</text>

          {/* Event Bus → Read Model（success 绿） */}
          <line x1={EVENT_BUS.x + EVENT_BUS.w} y1={EVENT_BUS.y + EVENT_BUS.h / 2} x2={READ_MODEL.x - 2} y2={READ_MODEL.y + READ_MODEL.h / 2} stroke={success} strokeWidth="1.8" markerEnd="url(#cqrs-read)" />
          <text x={(EVENT_BUS.x + EVENT_BUS.w + READ_MODEL.x) / 2} y={EVENT_BUS.y + EVENT_BUS.h / 2 - 8} textAnchor="middle" fontSize="11" fill={success}>投影</text>

          {/* Read Model → Query（success 绿） */}
          <line x1={READ_MODEL.x + READ_MODEL.w / 2} y1={READ_MODEL.y} x2={QUERY.x + QUERY.w / 2} y2={QUERY.y + QUERY.h} stroke={success} strokeWidth="1.8" markerEnd="url(#cqrs-read)" />

          {/* Event Store → Write DB */}
          <line x1={EVENT_STORE.x + EVENT_STORE.w / 2} y1={EVENT_STORE.y + EVENT_STORE.h} x2={WRITE_DB.x + WRITE_DB.w / 2} y2={WRITE_DB.y - 2} stroke={warning} strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="4 3" />

          {/* ===== 图例 ===== */}
          <line x1={36} y1={408} x2={VIEW_W - 36} y2={408} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <g>
            <line x1={56} y1={436} x2={84} y2={436} stroke={accent} strokeWidth="1.8" markerEnd="url(#cqrs-write)" />
            <text x={92} y={440} fontSize="11" fill={primary}>写路径（Command）</text>
            <line x1={240} y1={436} x2={268} y2={436} stroke={success} strokeWidth="1.8" markerEnd="url(#cqrs-read)" />
            <text x={276} y={440} fontSize="11" fill={primary}>读路径（Query）</text>
            <line x1={424} y1={436} x2={452} y2={436} stroke={warning} strokeWidth="1.8" markerEnd="url(#cqrs-event)" />
            <text x={460} y={440} fontSize="11" fill={primary}>事件流（Event）</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CQRS + 事件溯源：写路径（Command → Handler → Domain → Event Store）产生事件，通过 Event Bus 发布；读路径（Event Bus → Read Model → Query）消费事件构建物化视图。读写完全分离，各自优化。
      </figcaption>
    </figure>
  );
}
