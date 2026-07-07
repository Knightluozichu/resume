/**
 * <AddDddCoreConceptsDiagram>：DDD 核心概念图（architecture-domain 领域驱动设计章）。
 *
 * 中心是「领域模型 Domain Model」，周围环绕：
 *   - 战术模式（accent 紫）：Entity, Value Object, Aggregate, Repository, Domain Event, Factory
 *   - 战略模式（success 绿）：Bounded Context, Context Map, Subdomain
 * 用两种颜色区分战术和战略，虚线连接中心与外围概念。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×560（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 560;

const CX = 360;
const CY = 300;

const accent = "var(--accent)";
const success = "var(--success)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

// 战术模式（6 个，accent 紫）—— 外圈
const TACTICAL: { label: string; angle: number }[] = [
  { label: "Entity", angle: -90 },
  { label: "Value Object", angle: -30 },
  { label: "Aggregate", angle: 30 },
  { label: "Repository", angle: 90 },
  { label: "Domain Event", angle: 150 },
  { label: "Factory", angle: 210 },
];

// 战略模式（3 个，success 绿）—— 内圈
const STRATEGIC: { label: string; angle: number }[] = [
  { label: "Bounded Context", angle: -50 },
  { label: "Context Map", angle: 70 },
  { label: "Subdomain", angle: 190 },
];

const TACTICAL_R = 210;
const STRATEGIC_R = 130;

function polar(r: number, angleDeg: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

export function AddDddCoreConceptsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="DDD 核心概念图。中心是「领域模型 Domain Model」。周围环绕战术模式（紫色）：Entity、Value Object、Aggregate、Repository、Domain Event、Factory。以及战略模式（绿色）：Bounded Context、Context Map、Subdomain。用两种颜色区分战术和战略，虚线连接中心与外围概念。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            DDD 核心概念全景
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            战略模式划边界，战术模式填细节——围绕领域模型协同
          </text>

          {/* 连接线：战术模式 → 中心 */}
          {TACTICAL.map((t) => {
            const p = polar(TACTICAL_R, t.angle);
            return (
              <line
                key={`line-${t.label}`}
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
                stroke={accent}
                strokeWidth="1"
                strokeOpacity="0.3"
                strokeDasharray="3 3"
              />
            );
          })}

          {/* 连接线：战略模式 → 中心 */}
          {STRATEGIC.map((s) => {
            const p = polar(STRATEGIC_R, s.angle);
            return (
              <line
                key={`line-${s.label}`}
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
                stroke={success}
                strokeWidth="1.2"
                strokeOpacity="0.35"
              />
            );
          })}

          {/* 战术模式节点（外圈，accent 紫） */}
          {TACTICAL.map((t) => {
            const p = polar(TACTICAL_R, t.angle);
            const w = 116;
            const h = 32;
            return (
              <g key={t.label}>
                <rect
                  x={p.x - w / 2}
                  y={p.y - h / 2}
                  width={w}
                  height={h}
                  rx="8"
                  fill={accent}
                  fillOpacity="0.08"
                  stroke={accent}
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                />
                <text
                  x={p.x}
                  y={p.y + 5}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill={primary}
                >
                  {t.label}
                </text>
              </g>
            );
          })}

          {/* 战略模式节点（内圈，success 绿） */}
          {STRATEGIC.map((s) => {
            const p = polar(STRATEGIC_R, s.angle);
            const w = 130;
            const h = 32;
            return (
              <g key={s.label}>
                <rect
                  x={p.x - w / 2}
                  y={p.y - h / 2}
                  width={w}
                  height={h}
                  rx="8"
                  fill={success}
                  fillOpacity="0.1"
                  stroke={success}
                  strokeWidth="1.5"
                />
                <text
                  x={p.x}
                  y={p.y + 5}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill={success}
                >
                  {s.label}
                </text>
              </g>
            );
          })}

          {/* 中心：领域模型 */}
          <circle cx={CX} cy={CY} r="52" fill={primary} fillOpacity="0.06" stroke={primary} strokeWidth="2" />
          <text x={CX} y={CY - 4} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            领域模型
          </text>
          <text x={CX} y={CY + 14} textAnchor="middle" fontSize="11" fill={secondary}>
            Domain Model
          </text>

          {/* 图例 */}
          <g>
            <rect x={48} y={500} width="16" height="12" rx="3" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" />
            <text x={72} y={510} fontSize="11" fill={primary}>战术模式：代码级构建块</text>
            <rect x={280} y={500} width="16" height="12" rx="3" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.4" />
            <text x={304} y={510} fontSize="11" fill={primary}>战略模式：系统级边界</text>
            <line x1={500} y1={506} x2={524} y2={506} stroke={secondary} strokeWidth="1" strokeDasharray="3 3" />
            <text x={532} y={510} fontSize="11" fill={primary}>关联关系</text>
          </g>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={540} textAnchor="middle" fontSize="12" fill={secondary}>
            战略模式决定「怎么切」，战术模式决定「怎么建」——都服务于领域模型
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        DDD 核心概念：中心是领域模型。战术模式（Entity、Value Object、Aggregate、Repository、Domain Event、Factory）负责代码级建模；战略模式（Bounded Context、Context Map、Subdomain）负责系统级边界划分。
      </figcaption>
    </figure>
  );
}
