/**
 * <AssFinalReviewMindMap>：总复习思维导图（汽车系统专项总结章）。
 *
 * 中心节点「汽车系统专项」，四条分支辐射到四角：
 *   - 发动机与动力（accent 紫）：热力学循环、增压技术、变速器、传动系统
 *   - 底盘与控制（success 绿）：悬架系统、转向系统、制动系统
 *   - 汽车电子（warning 暖）：ECU / CAN 总线、传感器执行器、车身电子
 *   - 新能源三电（accent 紫）：电机电控、BMS 电池管理、热管理
 * 每个分支展开 3-4 个子节点。
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
const CY = 270;

interface Branch {
  label: string;
  color: string;
  bx: number;
  by: number;
  children: string[];
  childSide: "left" | "right";
}

const BRANCHES: readonly Branch[] = [
  {
    label: "发动机与动力",
    color: accent,
    bx: 180,
    by: 130,
    childSide: "left",
    children: ["热力学循环", "增压技术", "变速器", "传动系统"],
  },
  {
    label: "底盘与控制",
    color: success,
    bx: 180,
    by: 410,
    childSide: "left",
    children: ["悬架系统", "转向系统", "制动系统"],
  },
  {
    label: "汽车电子",
    color: warning,
    bx: 540,
    by: 130,
    childSide: "right",
    children: ["ECU / CAN 总线", "传感器执行器", "车身电子"],
  },
  {
    label: "新能源三电",
    color: accent,
    bx: 540,
    by: 410,
    childSide: "right",
    children: ["电机电控", "BMS 电池管理", "热管理"],
  },
];

export function AssFinalReviewMindMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="总复习思维导图。中心节点「汽车系统专项」向四方展开四条分支：左上发动机与动力（紫色，含热力学循环、增压技术、变速器、传动系统）；左下底盘与控制（绿色，含悬架、转向、制动）；右上汽车电子（黄色，含 ECU/CAN 总线、传感器执行器、车身电子）；右下新能源三电（紫色，含电机电控、BMS 电池管理、热管理）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            汽车系统专项 · 总复习
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
                  x={b.bx - 56}
                  y={b.by - 16}
                  width="112"
                  height="32"
                  rx="8"
                  fill={b.color}
                  fillOpacity="0.14"
                  stroke={b.color}
                  strokeWidth="1.8"
                />
                <text x={b.bx} y={b.by + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={b.color}>
                  {b.label}
                </text>

                {/* 子节点连线 + 节点 */}
                {b.children.map((child, ci) => {
                  const cy = childStartY + ci * 36;
                  const lineX = b.childSide === "left" ? b.bx - 56 : b.bx + 56;
                  const childX = b.childSide === "left" ? lineX - 16 : lineX + 16;
                  const childBoxX = b.childSide === "left" ? childX - 104 : childX;
                  return (
                    <g key={child}>
                      <line
                        x1={lineX}
                        y1={b.by}
                        x2={childX}
                        y2={cy}
                        stroke={b.color}
                        strokeWidth="1.2"
                        strokeOpacity="0.4"
                      />
                      <rect
                        x={childBoxX}
                        y={cy - 14}
                        width="104"
                        height="28"
                        rx="6"
                        fill={b.color}
                        fillOpacity="0.06"
                        stroke={b.color}
                        strokeWidth="1.2"
                        strokeOpacity="0.5"
                      />
                      <text
                        x={childBoxX + 52}
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
          <circle cx={CX} cy={CY} r="58" fill={primary} fillOpacity="0.06" stroke={primary} strokeWidth="2.5" />
          <text x={CX} y={CY - 6} textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>
            汽车系统
          </text>
          <text x={CX} y={CY + 14} textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>
            专项
          </text>

          {/* 底部总结 */}
          <line x1={48} y1={484} x2={VIEW_W - 48} y2={484} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={506} textAnchor="middle" fontSize="12" fill={secondary}>
            动力是源 · 底盘是骨 · 电子是神经 · 三电是未来——四域贯通方见整车
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        总复习思维导图：以「汽车系统专项」为中心，四大分支覆盖发动机与动力（热力学循环、增压、变速器、传动）、底盘与控制（悬架、转向、制动）、汽车电子（ECU/CAN、传感器执行器、车身电子）、新能源三电（电机电控、BMS、热管理）。
      </figcaption>
    </figure>
  );
}
