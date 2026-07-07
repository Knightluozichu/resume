/**
 * <AddCleanArchitectureDiagram>：整洁架构同心圆图（architecture-domain 架构原则章）。
 *
 * 从外到内四层同心圆：
 *   - 最外层 Frameworks & Drivers（Web, DB, Devices, External APIs）
 *   - Interface Adapters（Controllers, Gateways, Presenters）
 *   - Use Cases（Application Business Rules, Interactors）
 *   - Entities（Enterprise Business Rules，最内核心）
 * 箭头从外指向内，标注「依赖方向向内」。每层标注代表性组件。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×560（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 560;

const CX = 360;
const CY = 300;

// 四层同心圆半径（从外到内）
const R4 = 210; // Frameworks & Drivers
const R3 = 158; // Interface Adapters
const R2 = 108; // Use Cases
const R1 = 60;  // Entities

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function AddCleanArchitectureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="整洁架构同心圆图。从外到内四层：最外层 Frameworks & Drivers（Web、DB、Devices、External APIs）、Interface Adapters（Controllers、Gateways、Presenters）、Use Cases（Interactors）、Entities（Enterprise Business Rules，最内核心）。箭头从外指向内，标注依赖方向向内。每层标注代表性组件。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ca-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            整洁架构 · 同心圆
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            依赖方向向内——外层依赖内层，内层不知道外层的存在
          </text>

          {/* 第四层：Frameworks & Drivers（最外） */}
          <circle cx={CX} cy={CY} r={R4} fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1.5" strokeOpacity="0.4" />
          {/* 第三层：Interface Adapters */}
          <circle cx={CX} cy={CY} r={R3} fill={warning} fillOpacity="0.05" stroke={warning} strokeWidth="1.5" strokeOpacity="0.5" />
          {/* 第二层：Use Cases */}
          <circle cx={CX} cy={CY} r={R2} fill={accent} fillOpacity="0.07" stroke={accent} strokeWidth="1.5" strokeOpacity="0.55" />
          {/* 第一层：Entities（最内） */}
          <circle cx={CX} cy={CY} r={R1} fill={success} fillOpacity="0.12" stroke={success} strokeWidth="2" />

          {/* 层标签 */}
          {/* Entities（中心） */}
          <text x={CX} y={CY - 8} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>Entities</text>
          <text x={CX} y={CY + 10} textAnchor="middle" fontSize="10" fill={secondary}>Enterprise</text>
          <text x={CX} y={CY + 24} textAnchor="middle" fontSize="10" fill={secondary}>Business Rules</text>

          {/* Use Cases（上方弧标签） */}
          <text x={CX} y={CY - R2 - 8} textAnchor="middle" fontSize="12" fontWeight="600" fill={accent}>Use Cases</text>
          <text x={CX} y={CY - R2 - 22} textAnchor="middle" fontSize="10" fill={secondary}>Application Business Rules · Interactors</text>

          {/* Interface Adapters（左上弧标签） */}
          <text x={CX - R3 - 4} y={CY - R3 + 24} textAnchor="end" fontSize="12" fontWeight="600" fill={warning}>Interface</text>
          <text x={CX - R3 - 4} y={CY - R3 + 40} textAnchor="end" fontSize="12" fontWeight="600" fill={warning}>Adapters</text>
          <text x={CX - R3 - 4} y={CY - R3 + 56} textAnchor="end" fontSize="10" fill={secondary}>Controllers / Gateways / Presenters</text>

          {/* Frameworks & Drivers（右上弧标签） */}
          <text x={CX + R4 - 56} y={56} textAnchor="middle" fontSize="12" fontWeight="600" fill={accent}>Frameworks &amp; Drivers</text>
          <text x={CX + R4 - 56} y={72} textAnchor="middle" fontSize="10" fill={secondary}>Web · DB · Devices · External APIs</text>

          {/* 代表性组件标注（外层四个方向） */}
          <text x={CX} y={CY + R4 - 12} textAnchor="middle" fontSize="11" fill={accent} fontFamily="monospace">DB / Frameworks</text>
          <text x={CX - R3 + 20} y={CY + R3 - 4} textAnchor="start" fontSize="11" fill={warning} fontFamily="monospace">Presenters</text>
          <text x={CX + R3 - 20} y={CY + R3 - 4} textAnchor="end" fontSize="11" fill={warning} fontFamily="monospace">Gateways</text>
          <text x={CX - R2 + 16} y={CY + R2 - 4} textAnchor="start" fontSize="11" fill={accent} fontFamily="monospace">Interactors</text>

          {/* 依赖方向箭头（从外指向内，左侧） */}
          <line x1={CX - R4 + 16} y1={CY} x2={CX - R1 - 6} y2={CY} stroke={accent} strokeWidth="2" markerEnd="url(#ca-arrow)" />
          <text x={CX - R4 + 24} y={CY - 12} fontSize="11" fontWeight="600" fill={accent}>依赖方向向内</text>

          {/* 图例 */}
          <g>
            <circle cx={56} cy={510} r="6" fill={success} fillOpacity="0.12" stroke={success} strokeWidth="1.5" />
            <text x={70} y={514} fontSize="11" fill={primary}>Entities（最内，不依赖任何外层）</text>
            <circle cx={320} cy={510} r="6" fill={accent} fillOpacity="0.07" stroke={accent} strokeWidth="1.5" />
            <text x={334} y={514} fontSize="11" fill={primary}>Use Cases / Frameworks</text>
            <circle cx={520} cy={510} r="6" fill={warning} fillOpacity="0.05" stroke={warning} strokeWidth="1.5" />
            <text x={534} y={514} fontSize="11" fill={primary}>Interface Adapters</text>
          </g>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={544} textAnchor="middle" fontSize="12" fill={secondary}>
            外层是机制（怎么交付），内层是策略（业务规则）——机制依赖策略，策略不依赖机制
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        整洁架构四层同心圆：从外到内是 Frameworks & Drivers、Interface Adapters、Use Cases、Entities。依赖方向始终向内，最内的 Entities 不依赖任何外层。
      </figcaption>
    </figure>
  );
}
