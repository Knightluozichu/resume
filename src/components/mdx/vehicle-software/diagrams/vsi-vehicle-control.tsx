/**
 * <VsiVehicleControlDiagram>：车辆控制架构图（纵向 + 横向 + 反馈回路）。
 *
 * 闭环反馈主链：
 *   规划轨迹 → 误差计算 → 控制器 → 车辆动力学 → 状态反馈 →（回）误差计算
 * 控制器分两支：
 *   - 纵向控制（PID）：油门 / 刹车 → 加速度
 *   - 横向控制（MPC）：方向盘 → 转向角
 * 标注车辆动力学模型（自行车模型：x, y, ψ, v）。
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

// 中心列几何
const COL_X = 250;
const COL_W = 220;
const COL_CX = COL_X + COL_W / 2; // 360

export function VsiVehicleControlDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="车辆控制架构图。闭环：规划轨迹 → 误差计算 → 控制器 → 车辆动力学 → 状态反馈回到误差计算。控制器分两支：纵向控制 PID（油门/刹车→加速度）、横向控制 MPC（方向盘→转向角）。标注车辆动力学自行车模型（x,y,ψ,v）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="vvc-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="vvc-arrow-acc" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
            <marker id="vvc-arrow-success" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={success} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            车辆控制 · 纵向 PID + 横向 MPC 闭环
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            纵向控速度 · 横向控方向 · 反馈闭环消除误差
          </text>

          {/* 规划轨迹 */}
          <rect x={COL_X} y={84} width={COL_W} height={42} rx="8" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
          <text x={COL_CX} y={110} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            规划轨迹
          </text>

          {/* 误差计算 */}
          <line x1={COL_CX} y1={126} x2={COL_CX} y2={150} stroke={secondary} strokeWidth="1.5" markerEnd="url(#vvc-arrow)" />
          <rect x={COL_X} y={152} width={COL_W} height={42} rx="8" fill={primary} fillOpacity="0.05" stroke={primary} strokeWidth="1.5" />
          <text x={COL_CX} y={178} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            误差计算
          </text>
          <text x={COL_X - 8} y={176} textAnchor="end" fontSize="11" fill={secondary}>
            e = x_des − x
          </text>

          {/* 控制器面板 */}
          <line x1={COL_CX} y1={194} x2={COL_CX} y2={214} stroke={secondary} strokeWidth="1.5" markerEnd="url(#vvc-arrow)" />
          <rect x={60} y={216} width={600} height={120} rx="12" fill={primary} fillOpacity="0.03" stroke={border} strokeWidth="1.2" />
          <text x={360} y={236} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            控制器
          </text>

          {/* 纵向控制 PID */}
          <rect x={84} y={248} width={280} height={76} rx="10" fill={success} fillOpacity="0.07" stroke={success} strokeWidth="1.5" />
          <text x={224} y={270} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            纵向控制 · PID
          </text>
          <text x={224} y={288} textAnchor="middle" fontSize="11" fill={primary}>
            油门 / 刹车
          </text>
          <line x1={224} y1={294} x2={224} y2={306} stroke={success} strokeWidth="1.4" markerEnd="url(#vvc-arrow-success)" />
          <text x={224} y={320} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>
            → 加速度 a
          </text>

          {/* 横向控制 MPC */}
          <rect x={356} y={248} width={280} height={76} rx="10" fill={warning} fillOpacity="0.07" stroke={warning} strokeWidth="1.5" />
          <text x={496} y={270} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>
            横向控制 · MPC
          </text>
          <text x={496} y={288} textAnchor="middle" fontSize="11" fill={primary}>
            方向盘
          </text>
          <line x1={496} y1={294} x2={496} y2={306} stroke={warning} strokeWidth="1.4" markerEnd="url(#vvc-arrow)" />
          <text x={496} y={320} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>
            → 转向角 δ
          </text>

          {/* 车辆动力学（自行车模型） */}
          <line x1={224} y1={336} x2={224} y2={358} stroke={success} strokeWidth="1.5" markerEnd="url(#vvc-arrow-success)" />
          <line x1={496} y1={336} x2={496} y2={358} stroke={warning} strokeWidth="1.5" markerEnd="url(#vvc-arrow)" />
          <rect x={COL_X} y={360} width={COL_W} height={56} rx="10" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.6" />
          <text x={COL_CX} y={382} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            车辆动力学 · 自行车模型
          </text>
          <text x={COL_CX} y={400} textAnchor="middle" fontSize="11" fill={secondary}>
            ẋ=v·cosψ · ẏ=v·sinψ · ψ̇=v·tanδ/L
          </text>

          {/* 自行车模型示意（右侧） */}
          <g>
            <line x1={540} y1={388} x2={640} y2={388} stroke={primary} strokeWidth="1.6" markerEnd="url(#vvc-arrow)" />
            <circle cx={560} cy={388} r="4" fill={primary} />
            <circle cx={620} cy={388} r="4" fill={primary} />
            <line x1={560} y1={388} x2={552} y2={372} stroke={primary} strokeWidth="1.4" />
            <line x1={620} y1={388} x2={628} y2={372} stroke={primary} strokeWidth="1.4" />
            <text x={600} y={376} textAnchor="middle" fontSize="11" fill={secondary}>L（轴距）</text>
            <text x={660} y={392} fontSize="11" fill={secondary}>x</text>
          </g>

          {/* 状态输出 */}
          <line x1={COL_CX} y1={416} x2={COL_CX} y2={436} stroke={accent} strokeWidth="1.5" markerEnd="url(#vvc-arrow-acc)" />
          <rect x={COL_X} y={438} width={COL_W} height={36} rx="8" fill={primary} fillOpacity="0.05" stroke={primary} strokeWidth="1.4" />
          <text x={COL_CX} y={461} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            状态反馈：x, y, ψ, v
          </text>

          {/* 反馈回路：状态 → 左侧 → 上到误差计算 */}
          <path
            d={`M ${COL_X} ${456} L 36 ${456} L 36 ${173} L ${COL_X - 2} ${173}`}
            fill="none"
            stroke={secondary}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#vvc-arrow)"
          />
          <text x={28} y={316} textAnchor="middle" fontSize="11" fill={secondary} transform="rotate(-90 28 316)">
            状态反馈闭环
          </text>

          {/* 底部总结 */}
          <line x1={32} y1={496} x2={VIEW_W - 32} y2={496} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={516} textAnchor="middle" fontSize="11" fill={secondary}>
            PID 简单稳纵向 · MPC 预测优横向 · 自行车模型是动力学抽象
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        车辆控制闭环架构：规划轨迹 → 误差计算 → 控制器（纵向 PID 控油门/刹车输出加速度、横向 MPC 控方向盘输出转向角）→ 车辆动力学自行车模型（ẋ=v·cosψ、ẏ=v·sinψ、ψ̇=v·tanδ/L）→ 状态反馈（x, y, ψ, v）回误差计算，形成闭环。
      </figcaption>
    </figure>
  );
}
