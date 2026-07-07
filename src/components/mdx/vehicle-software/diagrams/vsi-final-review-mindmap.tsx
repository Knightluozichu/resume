/**
 * <VsiFinalReviewMindMap>：总复习思维导图。
 *
 * 中心节点「车载软件与智能化」向四角辐射四条分支：
 *   - 智能座舱（accent 紫）：HMI 交互、IVI 娱乐、多屏互动
 *   - 中间件（success 绿）：AUTOSAR、SOME/IP、DDS、OTA
 *   - 感知融合（warning 黄）：传感器、前/后融合、检测分割
 *   - 规控安全（accent 紫）：路径规划、MPC/PID、ISO 26262、信息安全
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×540（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 540;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const CENTER = { x: 285, y: 248, w: 150, h: 48, cx: 360, cy: 272 };

interface Branch {
  name: string;
  color: string;
  // 分支节点中心
  bx: number;
  by: number;
  leaves: { label: string; lx: number; ly: number }[];
}

const BRANCHES: readonly Branch[] = [
  {
    name: "智能座舱",
    color: accent,
    bx: 180,
    by: 116,
    leaves: [
      { label: "HMI 交互", lx: 78, ly: 66 },
      { label: "IVI 娱乐", lx: 78, ly: 116 },
      { label: "多屏互动", lx: 78, ly: 166 },
    ],
  },
  {
    name: "中间件",
    color: success,
    bx: 540,
    by: 116,
    leaves: [
      { label: "AUTOSAR", lx: 642, ly: 56 },
      { label: "SOME/IP", lx: 642, ly: 100 },
      { label: "DDS", lx: 642, ly: 144 },
      { label: "OTA 升级", lx: 642, ly: 188 },
    ],
  },
  {
    name: "感知融合",
    color: warning,
    bx: 180,
    by: 428,
    leaves: [
      { label: "传感器体系", lx: 78, ly: 378 },
      { label: "前 / 后融合", lx: 78, ly: 428 },
      { label: "检测与分割", lx: 78, ly: 478 },
    ],
  },
  {
    name: "规控安全",
    color: accent,
    bx: 540,
    by: 428,
    leaves: [
      { label: "路径规划", lx: 642, ly: 356 },
      { label: "MPC / PID", lx: 642, ly: 400 },
      { label: "ISO 26262", lx: 642, ly: 444 },
      { label: "信息安全", lx: 642, ly: 488 },
    ],
  },
];

export function VsiFinalReviewMindMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="总复习思维导图。中心车载软件与智能化，四条分支：智能座舱（HMI 交互、IVI 娱乐、多屏互动）；中间件（AUTOSAR、SOME/IP、DDS、OTA 升级）；感知融合（传感器体系、前/后融合、检测与分割）；规控安全（路径规划、MPC/PID、ISO 26262、信息安全）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="15" fontWeight="700" fill={primary}>
            车载软件与智能化 · 总复习思维导图
          </text>

          {/* 中心 → 分支 连线 */}
          {BRANCHES.map((b) => (
            <path
              key={`link-${b.name}`}
              d={`M ${CENTER.cx} ${CENTER.cy} Q ${(CENTER.cx + b.bx) / 2} ${(CENTER.cy + b.by) / 2}, ${b.bx} ${b.by}`}
              fill="none"
              stroke={b.color}
              strokeWidth="2"
              strokeOpacity="0.55"
            />
          ))}

          {/* 分支 → 叶子 连线 */}
          {BRANCHES.map((b) =>
            b.leaves.map((lf) => (
              <line
                key={`leaf-link-${b.name}-${lf.label}`}
                x1={b.bx}
                y1={b.by}
                x2={lf.lx}
                y2={lf.ly}
                stroke={b.color}
                strokeWidth="1.3"
                strokeOpacity="0.45"
              />
            ))
          )}

          {/* 叶子节点 */}
          {BRANCHES.map((b) =>
            b.leaves.map((lf) => (
              <g key={`leaf-${b.name}-${lf.label}`}>
                <rect x={lf.lx - 52} y={lf.ly - 13} width="104" height="26" rx="6" fill={b.color} fillOpacity="0.1" stroke={b.color} strokeWidth="1.2" strokeOpacity="0.6" />
                <text x={lf.lx} y={lf.ly + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>
                  {lf.label}
                </text>
              </g>
            ))
          )}

          {/* 分支节点 */}
          {BRANCHES.map((b) => (
            <g key={`branch-${b.name}`}>
              <rect x={b.bx - 58} y={b.by - 18} width="116" height="36" rx="9" fill={b.color} fillOpacity="0.18" stroke={b.color} strokeWidth="1.8" />
              <text x={b.bx} y={b.by + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={b.color}>
                {b.name}
              </text>
            </g>
          ))}

          {/* 中心节点 */}
          <rect x={CENTER.x} y={CENTER.y} width={CENTER.w} height={CENTER.h} rx="12" fill={accent} fillOpacity="0.14" stroke={accent} strokeWidth="2.2" />
          <text x={CENTER.cx} y={CENTER.cy - 2} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            车载软件
          </text>
          <text x={CENTER.cx} y={CENTER.cy + 16} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            与智能化
          </text>

          {/* 四角分支定位辅助标签（方位） */}
          <text x={40} y={528} fontSize="11" fill={secondary}>座舱 · 体验入口</text>
          <text x={VIEW_W - 40} y={528} textAnchor="end" fontSize="11" fill={secondary}>规控 · 安全闭环</text>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={524} textAnchor="middle" fontSize="11" fill={secondary}>
            一图统四域 · 座舱是面 · 中间件是骨 · 感知是眼 · 规控安全是魂
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        总复习思维导图：中心「车载软件与智能化」辐射四分支——智能座舱（HMI 交互、IVI 娱乐、多屏互动）、中间件（AUTOSAR、SOME/IP、DDS、OTA 升级）、感知融合（传感器体系、前/后融合、检测与分割）、规控安全（路径规划、MPC/PID、ISO 26262、信息安全）。
      </figcaption>
    </figure>
  );
}
