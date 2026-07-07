/**
 * <AddDependencyRuleDiagram>：依赖倒置规则图（architecture-domain 架构原则章）。
 *
 * 上下三层分层，展示依赖方向全部朝内指向 Entity：
 *   - 上层 Controller（accent 紫）
 *   - 中层 Use Case（warning 黄）—— 内含 Gateway 接口定义（虚线边框）
 *   - 下层 Entity（success 绿）+ 外侧 Gateway 实现（实线边框）
 * 关键：Gateway 接口在 Use Case 层定义，实现在外层。所有箭头朝内指向 Entity。
 * 虚线边框 = 接口，实线边框 = 实现。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

// 三层盒子
const CONTROLLER = { x: 200, y: 76, w: 320, h: 56 };
const USECASE = { x: 160, y: 176, w: 400, h: 72 };
const ENTITY = { x: 240, y: 300, w: 240, h: 56 };
const GATEWAY_IFACE = { x: 440, y: 184, w: 100, h: 24 };
const GATEWAY_IMPL = { x: 520, y: 300, w: 160, h: 56 };

export function AddDependencyRuleDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="依赖倒置规则图。三层从上到下：Controller（上层，紫色）、Use Case（中层，黄色，内含 Gateway 接口定义，虚线边框）、Entity（下层，绿色）。Gateway 实现在外层右侧（实线边框）。所有依赖箭头朝内指向 Entity 层。虚线边框表示接口，实线边框表示实现。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="dr-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="7"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
            <marker
              id="dr-arrow-impl"
              markerWidth="9"
              markerHeight="9"
              refX="7"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L7 3 L0 6 z" fill={warning} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            依赖倒置规则 · 依赖方向向内
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            所有依赖箭头朝内指向 Entity——Gateway 接口在 Use Case 层定义，实现在外层
          </text>

          {/* Controller 层 */}
          <g>
            <rect
              x={CONTROLLER.x}
              y={CONTROLLER.y}
              width={CONTROLLER.w}
              height={CONTROLLER.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
            />
            <text
              x={CONTROLLER.x + CONTROLLER.w / 2}
              y={CONTROLLER.y + 24}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              Controller
            </text>
            <text
              x={CONTROLLER.x + CONTROLLER.w / 2}
              y={CONTROLLER.y + 44}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
            >
              上层：接收请求、返回响应
            </text>
          </g>

          {/* Use Case 层 */}
          <g>
            <rect
              x={USECASE.x}
              y={USECASE.y}
              width={USECASE.w}
              height={USECASE.h}
              rx="10"
              fill={warning}
              fillOpacity="0.06"
              stroke={warning}
              strokeWidth="1.8"
            />
            <text
              x={USECASE.x + 80}
              y={USECASE.y + 24}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={warning}
              fontFamily="monospace"
            >
              Use Case
            </text>
            <text
              x={USECASE.x + 80}
              y={USECASE.y + 44}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
            >
              中层：业务逻辑编排
            </text>
            {/* Gateway 接口（虚线边框） */}
            <rect
              x={GATEWAY_IFACE.x}
              y={GATEWAY_IFACE.y}
              width={GATEWAY_IFACE.w}
              height={GATEWAY_IFACE.h}
              rx="5"
              fill={warning}
              fillOpacity="0.1"
              stroke={warning}
              strokeWidth="1.4"
              strokeDasharray="5 3"
            />
            <text
              x={GATEWAY_IFACE.x + GATEWAY_IFACE.w / 2}
              y={GATEWAY_IFACE.y + 16}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill={warning}
              fontFamily="monospace"
            >
              «interface»
            </text>
            <text
              x={GATEWAY_IFACE.x + GATEWAY_IFACE.w / 2}
              y={GATEWAY_IFACE.y + 58}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
            >
              Gateway 接口（定义在此层）
            </text>
          </g>

          {/* Entity 层 */}
          <g>
            <rect
              x={ENTITY.x}
              y={ENTITY.y}
              width={ENTITY.w}
              height={ENTITY.h}
              rx="10"
              fill={success}
              fillOpacity="0.06"
              stroke={success}
              strokeWidth="1.8"
            />
            <text
              x={ENTITY.x + ENTITY.w / 2}
              y={ENTITY.y + 24}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={success}
              fontFamily="monospace"
            >
              Entity
            </text>
            <text
              x={ENTITY.x + ENTITY.w / 2}
              y={ENTITY.y + 44}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
            >
              核心：业务规则与模型
            </text>
          </g>

          {/* Gateway 实现（实线边框） */}
          <g>
            <rect
              x={GATEWAY_IMPL.x}
              y={GATEWAY_IMPL.y}
              width={GATEWAY_IMPL.w}
              height={GATEWAY_IMPL.h}
              rx="10"
              fill={warning}
              fillOpacity="0.1"
              stroke={warning}
              strokeWidth="1.8"
            />
            <text
              x={GATEWAY_IMPL.x + GATEWAY_IMPL.w / 2}
              y={GATEWAY_IMPL.y + 24}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={warning}
              fontFamily="monospace"
            >
              GatewayImpl
            </text>
            <text
              x={GATEWAY_IMPL.x + GATEWAY_IMPL.w / 2}
              y={GATEWAY_IMPL.y + 44}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
            >
              外层实现（依赖接口）
            </text>
          </g>

          {/* 依赖箭头：Controller → Use Case */}
          <line
            x1={CONTROLLER.x + CONTROLLER.w / 2}
            y1={CONTROLLER.y + CONTROLLER.h}
            x2={USECASE.x + USECASE.w / 2}
            y2={USECASE.y - 2}
            stroke={secondary}
            strokeWidth="1.6"
            markerEnd="url(#dr-arrow)"
          />

          {/* 依赖箭头：Use Case → Entity */}
          <line
            x1={ENTITY.x + ENTITY.w / 2}
            y1={USECASE.y + USECASE.h}
            x2={ENTITY.x + ENTITY.w / 2}
            y2={ENTITY.y - 2}
            stroke={secondary}
            strokeWidth="1.6"
            markerEnd="url(#dr-arrow)"
          />
          <text
            x={ENTITY.x + ENTITY.w / 2 + 14}
            y={USECASE.y + USECASE.h + 16}
            fontSize="11"
            fill={secondary}
          >
            依赖向内
          </text>

          {/* 实现箭头：GatewayImpl → Gateway 接口（虚线） */}
          <line
            x1={GATEWAY_IMPL.x + 20}
            y1={GATEWAY_IMPL.y}
            x2={GATEWAY_IFACE.x + GATEWAY_IFACE.w / 2}
            y2={GATEWAY_IFACE.y + GATEWAY_IFACE.h}
            stroke={warning}
            strokeWidth="1.4"
            strokeDasharray="5 3"
            markerEnd="url(#dr-arrow-impl)"
          />
          <text
            x={(GATEWAY_IMPL.x + GATEWAY_IFACE.x) / 2 + 20}
            y={(GATEWAY_IMPL.y + GATEWAY_IFACE.y + GATEWAY_IFACE.h) / 2 - 4}
            fontSize="11"
            fill={warning}
            fontStyle="italic"
          >
            implements
          </text>

          {/* 图例 */}
          <g>
            <rect x={48} y={392} width="20" height="14" rx="3" fill="none" stroke={secondary} strokeWidth="1.4" strokeDasharray="5 3" />
            <text x={76} y={403} fontSize="11" fill={primary}>虚线 = 接口</text>
            <rect x={200} y={392} width="20" height="14" rx="3" fill="none" stroke={secondary} strokeWidth="1.4" />
            <text x={228} y={403} fontSize="11" fill={primary}>实线 = 实现</text>
            <line x1={360} y1={399} x2={384} y2={399} stroke={secondary} strokeWidth="1.6" markerEnd="url(#dr-arrow)" />
            <text x={392} y={403} fontSize="11" fill={primary}>箭头 = 依赖方向</text>
          </g>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={436} textAnchor="middle" fontSize="12" fill={secondary}>
            接口属于使用它的层，实现属于外层——核心不依赖外部
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        依赖倒置规则：Controller 依赖 Use Case，Use Case 依赖 Entity，所有箭头朝内。Gateway 接口在 Use Case 层定义，实现在外层——核心逻辑不依赖任何外部实现。
      </figcaption>
    </figure>
  );
}
