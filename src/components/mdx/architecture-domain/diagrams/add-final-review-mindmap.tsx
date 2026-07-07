/**
 * <AddFinalReviewMindMap>：总复习思维导图（architecture-domain 总结章）。
 *
 * 中心节点「架构与领域设计」，四条分支：
 *   - 架构原则（accent 紫）：SOLID, 依赖倒置, 分层架构, 整洁架构
 *   - 领域设计（success 绿）：统一语言, 限界上下文, 实体聚合, 上下文映射
 *   - 架构模式（warning 黄）：CQRS/ES, 六边形架构, 微服务
 *   - 实践要点（accent 紫）：边界, 依赖方向, 测试策略
 * 左右各两支分支，每支展开 3-4 个子节点。
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

const CX = 360;
const CY = 260;

// 四条分支：左上、左下、右上、右下
interface Branch {
  label: string;
  color: string;
  bx: number; // 分支节点 x
  by: number; // 分支节点 y
  children: string[];
  childSide: "left" | "right";
}

const BRANCHES: readonly Branch[] = [
  {
    label: "架构原则",
    color: accent,
    bx: 180,
    by: 120,
    childSide: "left",
    children: ["SOLID", "依赖倒置", "分层架构", "整洁架构"],
  },
  {
    label: "领域设计",
    color: success,
    bx: 180,
    by: 400,
    childSide: "left",
    children: ["统一语言", "限界上下文", "实体聚合", "上下文映射"],
  },
  {
    label: "架构模式",
    color: warning,
    bx: 540,
    by: 120,
    childSide: "right",
    children: ["CQRS / ES", "六边形架构", "微服务"],
  },
  {
    label: "实践要点",
    color: accent,
    bx: 540,
    by: 400,
    childSide: "right",
    children: ["边界", "依赖方向", "测试策略"],
  },
];

export function AddFinalReviewMindMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="总复习思维导图。中心节点「架构与领域设计」向四方展开四条分支：左上架构原则（紫色，含 SOLID、依赖倒置、分层架构、整洁架构）；左下领域设计（绿色，含统一语言、限界上下文、实体聚合、上下文映射）；右上架构模式（黄色，含 CQRS/ES、六边形架构、微服务）；右下实践要点（紫色，含边界、依赖方向、测试策略）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            架构与领域设计 · 总复习
          </text>

          {/* 中心 → 分支 连线 */}
          {BRANCHES.map((b) => (
            <line
              key={`line-${b.label}`}
              x1={CX}
              y1={CY}
              x2={b.bx}
              y2={b.by}
              stroke={b.color}
              strokeWidth="2"
              strokeOpacity="0.5"
            />
          ))}

          {/* 分支节点 + 子节点 */}
          {BRANCHES.map((b) => {
            const childStartY = b.by - (b.children.length - 1) * 18;
            return (
              <g key={b.label}>
                {/* 分支节点 */}
                <rect
                  x={b.bx - 52}
                  y={b.by - 16}
                  width="104"
                  height="32"
                  rx="8"
                  fill={b.color}
                  fillOpacity="0.14"
                  stroke={b.color}
                  strokeWidth="1.8"
                />
                <text
                  x={b.bx}
                  y={b.by + 5}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={b.color}
                >
                  {b.label}
                </text>

                {/* 子节点连线 + 节点 */}
                {b.children.map((child, ci) => {
                  const cy = childStartY + ci * 36;
                  const lineX = b.childSide === "left" ? b.bx - 52 : b.bx + 52;
                  const childX = b.childSide === "left" ? lineX - 16 : lineX + 16;
                  const childBoxX = b.childSide === "left" ? childX - 96 : childX;
                  return (
                    <g key={child}>
                      {/* 连线 */}
                      <line
                        x1={lineX}
                        y1={b.by}
                        x2={childX}
                        y2={cy}
                        stroke={b.color}
                        strokeWidth="1.2"
                        strokeOpacity="0.4"
                      />
                      {/* 子节点 */}
                      <rect
                        x={childBoxX}
                        y={cy - 14}
                        width="96"
                        height="28"
                        rx="6"
                        fill={b.color}
                        fillOpacity="0.06"
                        stroke={b.color}
                        strokeWidth="1.2"
                        strokeOpacity="0.5"
                      />
                      <text
                        x={childBoxX + 48}
                        y={cy + 4}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="600"
                        fill={primary}
                      >
                        {child}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 中心节点 */}
          <circle cx={CX} cy={CY} r="56" fill={primary} fillOpacity="0.06" stroke={primary} strokeWidth="2.5" />
          <text x={CX} y={CY - 6} textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>
            架构与
          </text>
          <text x={CX} y={CY + 12} textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>
            领域设计
          </text>

          {/* 底部总结 */}
          <line x1={48} y1={480} x2={VIEW_W - 48} y2={480} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={504} textAnchor="middle" fontSize="12" fill={secondary}>
            原则约束方向 · 领域建模核心 · 模式落地结构 · 实践保障质量
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        总复习思维导图：以「架构与领域设计」为中心，四大分支覆盖架构原则（SOLID、依赖倒置、分层、整洁架构）、领域设计（统一语言、限界上下文、实体聚合、上下文映射）、架构模式（CQRS/ES、六边形、微服务）、实践要点（边界、依赖方向、测试策略）。
      </figcaption>
    </figure>
  );
}
