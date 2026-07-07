/**
 * <VsiPathPlanningDiagram>：路径规划图解（全局 + 局部）。
 *
 * 左半为道路俯视场景：自车位于中车道，前方有障碍车；多条候选轨迹
 * （直线绕不过、左变道、右变道），其中右变道为最优轨迹高亮。
 * 标注行为预测模块对障碍车的运动预测。
 * 右半上：全局规划（A* 与 Dijkstra 在路网图上搜索最短路径）。
 * 右半下：局部规划（Frenet 坐标系 s-l 下轨迹优化）。
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

// 道路几何
const ROAD_X = 70;
const ROAD_W = 300;
const ROAD_Y = 90;
const ROAD_H = 340;
const LANE_W = ROAD_W / 3; // 100
const LANE_C = [ROAD_X + LANE_W / 2, ROAD_X + LANE_W * 1.5, ROAD_X + LANE_W * 2.5]; // 220, 320, 420

const EGO_X = LANE_C[1];
const EGO_Y = ROAD_Y + ROAD_H - 60; // 370

export function VsiPathPlanningDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="路径规划图解。左半道路俯视：自车在中车道，前方中车道有障碍车，左车道也有车；三条候选轨迹——直线绕不过（黄色虚线）、左变道（灰色虚线）、右变道（紫色高亮最优）；行为预测模块预测障碍车运动。右半上为全局规划 A*/Dijkstra 路网搜索；右半下为局部规划 Frenet 坐标系轨迹优化。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="vpp-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="vpp-arrow-acc" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
            <marker id="vpp-arrow-warn" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={warning} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            路径规划 · 全局寻路 + 局部轨迹优化
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            全局定终点 · 局部避障碍 · 多候选择优 · 行为预测兜底
          </text>

          {/* ========== 左半 道路场景 ========== */}
          <rect x={ROAD_X} y={ROAD_Y} width={ROAD_W} height={ROAD_H} rx="8" fill={primary} fillOpacity="0.03" stroke={border} strokeWidth="1.2" />
          {/* 车道虚线 */}
          <line x1={ROAD_X + LANE_W} y1={ROAD_Y + 8} x2={ROAD_X + LANE_W} y2={ROAD_Y + ROAD_H - 8} stroke={secondary} strokeWidth="1.2" strokeDasharray="10 8" strokeOpacity="0.5" />
          <line x1={ROAD_X + LANE_W * 2} y1={ROAD_Y + 8} x2={ROAD_X + LANE_W * 2} y2={ROAD_Y + ROAD_H - 8} stroke={secondary} strokeWidth="1.2" strokeDasharray="10 8" strokeOpacity="0.5" />
          {/* 车道标签 */}
          <text x={LANE_C[0]} y={ROAD_Y + 16} textAnchor="middle" fontSize="11" fill={secondary}>左车道</text>
          <text x={LANE_C[1]} y={ROAD_Y + 16} textAnchor="middle" fontSize="11" fill={secondary}>中车道</text>
          <text x={LANE_C[2]} y={ROAD_Y + 16} textAnchor="middle" fontSize="11" fill={secondary}>右车道</text>

          {/* 候选轨迹 A：直线（被阻挡，黄色虚线） */}
          <path d={`M ${EGO_X} ${EGO_Y} L ${EGO_X} ${ROAD_Y + 50}`} fill="none" stroke={warning} strokeWidth="2" strokeDasharray="6 5" strokeOpacity="0.7" />
          {/* 候选轨迹 B：左变道（灰色虚线） */}
          <path d={`M ${EGO_X} ${EGO_Y} C ${EGO_X} ${EGO_Y - 80}, ${LANE_C[0]} ${EGO_Y - 120}, ${LANE_C[0]} ${ROAD_Y + 60}`} fill="none" stroke={secondary} strokeWidth="2" strokeDasharray="6 5" strokeOpacity="0.7" />
          {/* 候选轨迹 C：右变道（最优，紫色高亮实线） */}
          <path d={`M ${EGO_X} ${EGO_Y} C ${EGO_X} ${EGO_Y - 80}, ${LANE_C[2]} ${EGO_Y - 120}, ${LANE_C[2]} ${ROAD_Y + 60}`} fill="none" stroke={accent} strokeWidth="3" />
          {/* 最优轨迹终点箭头 */}
          <line x1={LANE_C[2]} y1={ROAD_Y + 62} x2={LANE_C[2]} y2={ROAD_Y + 48} stroke={accent} strokeWidth="2" markerEnd="url(#vpp-arrow-acc)" />

          {/* 障碍车 1：中车道前方（阻挡直线） */}
          <g>
            <rect x={EGO_X - 18} y={EGO_Y - 150} width="36" height="56" rx="6" fill={warning} fillOpacity="0.18" stroke={warning} strokeWidth="1.6" />
            <text x={EGO_X} y={EGO_Y - 118} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>障碍车</text>
            {/* 行为预测：向上箭头 */}
            <line x1={EGO_X + 26} y1={EGO_Y - 122} x2={EGO_X + 26} y2={EGO_Y - 168} stroke={warning} strokeWidth="1.6" markerEnd="url(#vpp-arrow-warn)" />
            <text x={EGO_X + 60} y={EGO_Y - 140} fontSize="11" fill={warning}>预测直行</text>
          </g>

          {/* 障碍车 2：左车道 */}
          <g>
            <rect x={LANE_C[0] - 18} y={EGO_Y - 100} width="36" height="56" rx="6" fill={warning} fillOpacity="0.18" stroke={warning} strokeWidth="1.6" />
            <text x={LANE_C[0]} y={EGO_Y - 68} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>障碍车</text>
          </g>

          {/* 自车 */}
          <g>
            <rect x={EGO_X - 20} y={EGO_Y - 28} width="40" height="60" rx="8" fill={accent} fillOpacity="0.22" stroke={accent} strokeWidth="2.2" />
            <text x={EGO_X} y={EGO_Y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>自车</text>
          </g>

          {/* 轨迹图例 */}
          <g>
            <line x1={ROAD_X + 10} y1={ROAD_Y + ROAD_H + 24} x2={ROAD_X + 34} y2={ROAD_Y + ROAD_H + 24} stroke={accent} strokeWidth="3" />
            <text x={ROAD_X + 40} y={ROAD_Y + ROAD_H + 28} fontSize="11" fill={primary}>最优轨迹</text>
            <line x1={ROAD_X + 120} y1={ROAD_Y + ROAD_H + 24} x2={ROAD_X + 144} y2={ROAD_Y + ROAD_H + 24} stroke={secondary} strokeWidth="2" strokeDasharray="6 5" />
            <text x={ROAD_X + 150} y={ROAD_Y + ROAD_H + 28} fontSize="11" fill={secondary}>候选轨迹</text>
            <line x1={ROAD_X + 230} y1={ROAD_Y + ROAD_H + 24} x2={ROAD_X + 254} y2={ROAD_Y + ROAD_H + 24} stroke={warning} strokeWidth="2" strokeDasharray="6 5" />
            <text x={ROAD_X + 260} y={ROAD_Y + ROAD_H + 28} fontSize="11" fill={warning}>受阻轨迹</text>
          </g>

          {/* 行为预测模块标注 */}
          <rect x={ROAD_X + 8} y={ROAD_Y + ROAD_H + 44} width={ROAD_W - 16} height="26" rx="6" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.2" strokeDasharray="4 3" />
          <text x={ROAD_X + ROAD_W / 2} y={ROAD_Y + ROAD_H + 61} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>
            行为预测模块 · 预测他车未来轨迹
          </text>

          {/* ========== 右半 全局规划 ========== */}
          <rect x={420} y={90} width={270} height={160} rx="12" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <rect x={420} y={90} width={270} height="26" rx="12" fill={accent} fillOpacity="0.16" stroke={accent} strokeWidth="1.2" />
          <text x={555} y={108} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            全局规划 · A* / Dijkstra
          </text>
          {/* 路网图节点 */}
          {[
            { id: "S", x: 444, y: 152, label: "起点" },
            { id: "A", x: 510, y: 138, label: "" },
            { id: "B", x: 510, y: 196, label: "" },
            { id: "C", x: 600, y: 152, label: "" },
            { id: "G", x: 666, y: 196, label: "终点" },
          ].map((n) => (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r="12" fill="var(--bg)" stroke={accent} strokeWidth="1.6" />
              <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>{n.id}</text>
              {n.label && <text x={n.x} y={n.y - 18} textAnchor="middle" fontSize="11" fill={secondary}>{n.label}</text>}
            </g>
          ))}
          {/* 路网边 */}
          <line x1="444" y1="152" x2="510" y2="138" stroke={secondary} strokeWidth="1.2" strokeOpacity="0.5" />
          <line x1="444" y1="152" x2="510" y2="196" stroke={secondary} strokeWidth="1.2" strokeOpacity="0.5" />
          <line x1="510" y1="138" x2="600" y2="152" stroke={secondary} strokeWidth="1.2" strokeOpacity="0.5" />
          <line x1="510" y1="196" x2="600" y2="152" stroke={secondary} strokeWidth="1.2" strokeOpacity="0.5" />
          <line x1="600" y1="152" x2="666" y2="196" stroke={secondary} strokeWidth="1.2" strokeOpacity="0.5" />
          <line x1="510" y1="138" x2="510" y2="196" stroke={secondary} strokeWidth="1.2" strokeOpacity="0.5" />
          {/* 最短路径高亮 S→A→C→G */}
          <polyline points="444,152 510,138 600,152 666,196" fill="none" stroke={accent} strokeWidth="2.6" />
          <text x={555} y={232} textAnchor="middle" fontSize="11" fill={secondary}>
            路网图搜索最短路径 · 启发式估价 f = g + h
          </text>

          {/* ========== 右半 局部规划 Frenet ========== */}
          <rect x={420} y={266} width={270} height={164} rx="12" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <rect x={420} y={266} width={270} height="26" rx="12" fill={success} fillOpacity="0.16" stroke={success} strokeWidth="1.2" />
          <text x={555} y={284} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            局部规划 · Frenet 轨迹优化
          </text>
          {/* Frenet 坐标系：s 纵向、l 横向 */}
          <line x1="448" y1={400} x2="666" y2={400} stroke={success} strokeWidth="1.4" markerEnd="url(#vpp-arrow)" />
          <text x="672" y={404} fontSize="11" fontWeight="700" fill={success}>s</text>
          <line x1="448" y1={400} x2="448" y2={312} stroke={success} strokeWidth="1.4" markerEnd="url(#vpp-arrow)" />
          <text x="444" y={306} textAnchor="end" fontSize="11" fontWeight="700" fill={success}>l</text>
          {/* 参考线（中心） */}
          <line x1="448" y1={356} x2="666" y2={356} stroke={secondary} strokeWidth="1" strokeDasharray="4 3" />
          <text x="670" y={360} fontSize="11" fill={secondary}>参考线</text>
          {/* 候选轨迹（l 偏移） */}
          <path d="M 448 356 Q 520 332, 600 356 T 660 356" fill="none" stroke={secondary} strokeWidth="1.6" strokeDasharray="4 3" />
          <path d="M 448 356 Q 520 380, 600 356 T 660 356" fill="none" stroke={secondary} strokeWidth="1.6" strokeDasharray="4 3" />
          {/* 最优轨迹 */}
          <path d="M 448 356 Q 540 344, 620 360 T 660 358" fill="none" stroke={accent} strokeWidth="2.6" />
          <text x={555} y={422} textAnchor="middle" fontSize="11" fill={secondary}>
            (s, l) 坐标 · 横纵向解耦 · 代价最优
          </text>

          {/* 底部总结 */}
          <line x1={32} y1={454} x2={VIEW_W - 32} y2={454} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={476} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            规 = 全局寻路 · 控 = 局部轨迹
          </text>
          <text x={VIEW_W / 2} y={498} textAnchor="middle" fontSize="11" fill={secondary}>
            全局规划定终点路线 · 局部规划在 Frenet 坐标下生成可执行轨迹 · 行为预测约束候选集
          </text>
          <text x={VIEW_W / 2} y={524} textAnchor="middle" fontSize="11" fill={secondary}>
            先粗后细 · 多候选择优 · 安全舒适可执行
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        路径规划图解：左半道路俯视场景中自车在中车道，前方障碍车阻挡直行，三条候选轨迹（直线受阻黄色虚线、左变道灰色虚线、右变道紫色最优高亮），行为预测模块预测他车运动；右半上为全局规划 A*/Dijkstra 在路网图搜索最短路径，右半下为局部规划 Frenet 坐标系（s 纵向、l 横向）下的轨迹优化。
      </figcaption>
    </figure>
  );
}
