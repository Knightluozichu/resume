/**
 * <FacadePatternDiagram>：外观模式结构图（design-patterns 课程）。
 *
 * 展示外观模式的核心结构：
 *   - 上方 Client 类
 *   - 中间 Facade 类（简化接口，暴露 simpleMethod()）
 *   - 下方 4 个子系统类（SubsystemA/B/C/D，各有复杂方法）
 *   - 箭头：Client→Facade（调用 simpleMethod，实线实心箭头）；
 *     Facade→各 Subsystem（委托，虚线箭头）
 *   - 底部文字：「外观：为复杂子系统提供统一简化入口」
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×400（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / 主体 / 底部总结）。
 * 间距用 4 的倍数，主要坐标均为 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 400;

// Client 框（上方居中）
const CLIENT = { x: 280, y: 56, w: 160, h: 52 };
// Facade 框（中间居中）
const FACADE = { x: 260, y: 140, w: 200, h: 84 };
// 子系统框尺寸
const SUB_W = 144;
const SUB_H = 76;
const SUB_Y = 256;
// SubsystemA/B/C/D（下方一排）
const SUB_A = { x: 36, y: SUB_Y };
const SUB_B = { x: 196, y: SUB_Y };
const SUB_C = { x: 356, y: SUB_Y };
const SUB_D = { x: 516, y: SUB_Y };

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const warning = "var(--warning)";
const success = "var(--success)";

export function FacadePatternDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="外观模式结构图。上方是 Client 类。中间是 Facade 类，提供简化接口 simpleMethod()。下方是四个子系统类 SubsystemA、SubsystemB、SubsystemC、SubsystemD，各有复杂的 operationA/B/C/D 方法。实线实心箭头从 Client 指向 Facade，标注调用 simpleMethod()；虚线箭头从 Facade 分别指向四个子系统，表示委托调用。底部说明：外观为复杂子系统提供统一简化入口。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 调用：实心三角箭头（accent） */}
            <marker
              id="facade-call-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={accent} />
            </marker>
            {/* 委托：开放箭头（V形，secondary） */}
            <marker
              id="facade-delegate-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="5"
              orient="auto"
            >
              <path
                d="M0 0 L9 5 L0 10"
                fill="none"
                stroke={secondary}
                strokeWidth="1.5"
              />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            外观模式 · 结构
          </text>

          {/* ===== Client 框（上方居中） ===== */}
          <g>
            <rect
              x={CLIENT.x}
              y={CLIENT.y}
              width={CLIENT.w}
              height={CLIENT.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={CLIENT.x + CLIENT.w / 2}
              y={CLIENT.y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Client
            </text>
            <line
              x1={CLIENT.x}
              y1={CLIENT.y + 30}
              x2={CLIENT.x + CLIENT.w}
              y2={CLIENT.y + 30}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CLIENT.x + 14}
              y={CLIENT.y + 46}
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              {"// 调用 Facade"}
            </text>
          </g>

          {/* ===== Facade 框（中间居中） ===== */}
          <g>
            <rect
              x={FACADE.x}
              y={FACADE.y}
              width={FACADE.w}
              height={FACADE.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
            />
            <text
              x={FACADE.x + FACADE.w / 2}
              y={FACADE.y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              Facade
            </text>
            <line
              x1={FACADE.x}
              y1={FACADE.y + 32}
              x2={FACADE.x + FACADE.w}
              y2={FACADE.y + 32}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={FACADE.x + 14}
              y={FACADE.y + 52}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + simpleMethod()
            </text>
            <text
              x={FACADE.x + 14}
              y={FACADE.y + 70}
              fontSize="11"
              fill={accent}
              fontStyle="italic"
            >
              {"// 委托子系统"}
            </text>
          </g>

          {/* ===== 调用箭头：Client → Facade（实线实心箭头） ===== */}
          <line
            x1={CLIENT.x + CLIENT.w / 2}
            y1={CLIENT.y + CLIENT.h}
            x2={FACADE.x + FACADE.w / 2}
            y2={FACADE.y - 2}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#facade-call-arrow)"
          />
          <text
            x={CLIENT.x + CLIENT.w / 2 + 14}
            y={(CLIENT.y + CLIENT.h + FACADE.y) / 2}
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            调用
          </text>

          {/* ===== 委托箭头：Facade → SubsystemA/B/C/D（虚线开放箭头） ===== */}
          <line
            x1={FACADE.x + 36}
            y1={FACADE.y + FACADE.h}
            x2={SUB_A.x + SUB_W / 2}
            y2={SUB_A.y - 2}
            stroke={secondary}
            strokeWidth="1.4"
            strokeDasharray="5 3"
            markerEnd="url(#facade-delegate-arrow)"
          />
          <line
            x1={FACADE.x + 76}
            y1={FACADE.y + FACADE.h}
            x2={SUB_B.x + SUB_W / 2}
            y2={SUB_B.y - 2}
            stroke={secondary}
            strokeWidth="1.4"
            strokeDasharray="5 3"
            markerEnd="url(#facade-delegate-arrow)"
          />
          <line
            x1={FACADE.x + FACADE.w - 76}
            y1={FACADE.y + FACADE.h}
            x2={SUB_C.x + SUB_W / 2}
            y2={SUB_C.y - 2}
            stroke={secondary}
            strokeWidth="1.4"
            strokeDasharray="5 3"
            markerEnd="url(#facade-delegate-arrow)"
          />
          <line
            x1={FACADE.x + FACADE.w - 36}
            y1={FACADE.y + FACADE.h}
            x2={SUB_D.x + SUB_W / 2}
            y2={SUB_D.y - 2}
            stroke={secondary}
            strokeWidth="1.4"
            strokeDasharray="5 3"
            markerEnd="url(#facade-delegate-arrow)"
          />
          <text
            x={FACADE.x + FACADE.w / 2}
            y={FACADE.y + FACADE.h + 16}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
            fontStyle="italic"
          >
            委托
          </text>

          {/* ===== SubsystemA 框 ===== */}
          <g>
            <rect
              x={SUB_A.x}
              y={SUB_A.y}
              width={SUB_W}
              height={SUB_H}
              rx="8"
              fill={elevated}
              stroke={warning}
              strokeWidth="1.6"
            />
            <text
              x={SUB_A.x + SUB_W / 2}
              y={SUB_A.y + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              SubsystemA
            </text>
            <line
              x1={SUB_A.x}
              y1={SUB_A.y + 32}
              x2={SUB_A.x + SUB_W}
              y2={SUB_A.y + 32}
              stroke={warning}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={SUB_A.x + 12}
              y={SUB_A.y + 50}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + operationA()
            </text>
            <text
              x={SUB_A.x + 12}
              y={SUB_A.y + 66}
              fontSize="11"
              fill={warning}
              fontStyle="italic"
            >
              {"// 复杂逻辑"}
            </text>
          </g>

          {/* ===== SubsystemB 框 ===== */}
          <g>
            <rect
              x={SUB_B.x}
              y={SUB_B.y}
              width={SUB_W}
              height={SUB_H}
              rx="8"
              fill={elevated}
              stroke={success}
              strokeWidth="1.6"
            />
            <text
              x={SUB_B.x + SUB_W / 2}
              y={SUB_B.y + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              SubsystemB
            </text>
            <line
              x1={SUB_B.x}
              y1={SUB_B.y + 32}
              x2={SUB_B.x + SUB_W}
              y2={SUB_B.y + 32}
              stroke={success}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={SUB_B.x + 12}
              y={SUB_B.y + 50}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + operationB()
            </text>
            <text
              x={SUB_B.x + 12}
              y={SUB_B.y + 66}
              fontSize="11"
              fill={success}
              fontStyle="italic"
            >
              {"// 复杂逻辑"}
            </text>
          </g>

          {/* ===== SubsystemC 框 ===== */}
          <g>
            <rect
              x={SUB_C.x}
              y={SUB_C.y}
              width={SUB_W}
              height={SUB_H}
              rx="8"
              fill={elevated}
              stroke={warning}
              strokeWidth="1.6"
            />
            <text
              x={SUB_C.x + SUB_W / 2}
              y={SUB_C.y + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              SubsystemC
            </text>
            <line
              x1={SUB_C.x}
              y1={SUB_C.y + 32}
              x2={SUB_C.x + SUB_W}
              y2={SUB_C.y + 32}
              stroke={warning}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={SUB_C.x + 12}
              y={SUB_C.y + 50}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + operationC()
            </text>
            <text
              x={SUB_C.x + 12}
              y={SUB_C.y + 66}
              fontSize="11"
              fill={warning}
              fontStyle="italic"
            >
              {"// 复杂逻辑"}
            </text>
          </g>

          {/* ===== SubsystemD 框 ===== */}
          <g>
            <rect
              x={SUB_D.x}
              y={SUB_D.y}
              width={SUB_W}
              height={SUB_H}
              rx="8"
              fill={elevated}
              stroke={success}
              strokeWidth="1.6"
            />
            <text
              x={SUB_D.x + SUB_W / 2}
              y={SUB_D.y + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              SubsystemD
            </text>
            <line
              x1={SUB_D.x}
              y1={SUB_D.y + 32}
              x2={SUB_D.x + SUB_W}
              y2={SUB_D.y + 32}
              stroke={success}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <text
              x={SUB_D.x + 12}
              y={SUB_D.y + 50}
              fontSize="11"
              fill={primary}
              fontFamily="monospace"
            >
              + operationD()
            </text>
            <text
              x={SUB_D.x + 12}
              y={SUB_D.y + 66}
              fontSize="11"
              fill={success}
              fontStyle="italic"
            >
              {"// 复杂逻辑"}
            </text>
          </g>

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="372"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            外观：为复杂子系统提供统一简化入口
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Facade 把 SubsystemA/B/C/D 的复杂调用封装在一个 simpleMethod() 里。
        Client 只需与 Facade 交互，无需了解子系统内部的依赖关系和调用顺序——
        降低了客户端与复杂子系统之间的耦合度。
      </figcaption>
    </figure>
  );
}
