/**
 * <VsiSensorFusionDiagram>：多传感器融合架构图（前融合 vs 后融合）。
 *
 * 左半区后融合（Late Fusion）：各传感器独立检测 → 结果级融合。
 * 右半区前融合（Early Fusion）：原始数据级融合 → 统一检测。
 * 中间纵向标注卡尔曼滤波流程：预测 → 更新 → 状态估计。
 * 底部对照两种融合范式在信息损失、算力、实现难度上的权衡。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×560（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 560;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

// 三面板几何
const LEFT_X = 24;
const LEFT_W = 270;
const MID_X = 308;
const MID_W = 104;
const RIGHT_X = 426;
const RIGHT_W = 270;

const SENSORS = [
  { name: "摄像头", color: accent },
  { name: "毫米波", color: warning },
  { name: "激光雷达", color: success },
];

export function VsiSensorFusionDiagram() {
  // 后融合：3 传感器 → 3 独立检测 → 结果融合
  const lateSensorY = 112;
  const lateDetY = 188;
  const lateFuseY = 300;
  // 前融合：3 传感器 → 数据级融合 → 统一检测
  const earlySensorY = 112;
  const earlyFuseY = 224;
  const earlyDetY = 336;

  const sensorBoxW = 76;
  const sensorBoxH = 36;
  const panelInnerLeft = LEFT_X + 16;
  const laneGap = (LEFT_W - 32 - sensorBoxW * 3) / 2; // 3 lanes
  const laneXs = [
    panelInnerLeft,
    panelInnerLeft + sensorBoxW + laneGap,
    panelInnerLeft + 2 * (sensorBoxW + laneGap),
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="多传感器融合架构图。左半后融合 Late Fusion：摄像头、毫米波、激光雷达各自独立检测，再结果级融合；右半前融合 Early Fusion：三类传感器原始数据先数据级融合，再统一检测；中间纵向卡尔曼滤波流程：预测、更新、状态估计。底部对照信息损失、算力、实现难度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="vsf-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="vsf-arrow-acc" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            多传感器融合 · 前融合 vs 后融合
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            后融合各自为战再合议 · 前融合原始数据先合体再决策
          </text>

          {/* ========== 左半区 后融合 ========== */}
          <rect x={LEFT_X} y={76} width={LEFT_W} height={326} rx="12" fill={warning} fillOpacity="0.04" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <rect x={LEFT_X} y={76} width={LEFT_W} height="28" rx="12" fill={warning} fillOpacity="0.16" stroke={warning} strokeWidth="1.2" />
          <text x={LEFT_X + LEFT_W / 2} y={95} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>
            后融合 · Late Fusion
          </text>

          {/* 3 传感器独立检测 */}
          {SENSORS.map((s, i) => {
            const x = laneXs[i];
            return (
              <g key={`late-${s.name}`}>
                <rect x={x} y={lateSensorY} width={sensorBoxW} height={sensorBoxH} rx="6" fill={s.color} fillOpacity="0.16" stroke={s.color} strokeWidth="1.3" />
                <text x={x + sensorBoxW / 2} y={lateSensorY + 22} textAnchor="middle" fontSize="11" fontWeight="700" fill={s.color}>
                  {s.name}
                </text>
                <rect x={x} y={lateDetY} width={sensorBoxW} height={sensorBoxH} rx="6" fill="var(--bg)" stroke={s.color} strokeWidth="1.1" strokeOpacity="0.6" />
                <text x={x + sensorBoxW / 2} y={lateDetY + 22} textAnchor="middle" fontSize="11" fill={primary}>
                  独立检测
                </text>
                <line x1={x + sensorBoxW / 2} y1={lateSensorY + sensorBoxH} x2={x + sensorBoxW / 2} y2={lateDetY} stroke={secondary} strokeWidth="1.2" markerEnd="url(#vsf-arrow)" />
              </g>
            );
          })}
          <text x={LEFT_X + LEFT_W / 2} y={lateDetY + sensorBoxH + 14} textAnchor="middle" fontSize="11" fill={secondary}>
            各传感器输出检测结果（框 / 点 / 簇）
          </text>

          {/* 结果级融合盒 */}
          <rect x={LEFT_X + 30} y={lateFuseY} width={LEFT_W - 60} height={56} rx="10" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.6" />
          <text x={LEFT_X + LEFT_W / 2} y={lateFuseY + 24} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            结果级融合
          </text>
          <text x={LEFT_X + LEFT_W / 2} y={lateFuseY + 42} textAnchor="middle" fontSize="11" fill={secondary}>
            关联匹配 · 航迹融合
          </text>
          {/* 3 检测 → 融合 汇聚箭头 */}
          {laneXs.map((x, i) => (
            <line
              key={`late-merge-${i}`}
              x1={x + sensorBoxW / 2}
              y1={lateDetY + sensorBoxH}
              x2={LEFT_X + LEFT_W / 2}
              y2={lateFuseY}
              stroke={secondary}
              strokeWidth="1.2"
              markerEnd="url(#vsf-arrow)"
            />
          ))}
          {/* 输出 */}
          <line x1={LEFT_X + LEFT_W / 2} y1={lateFuseY + 56} x2={LEFT_X + LEFT_W / 2} y2={lateFuseY + 78} stroke={accent} strokeWidth="1.6" markerEnd="url(#vsf-arrow-acc)" />
          <text x={LEFT_X + LEFT_W / 2} y={lateFuseY + 96} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>
            融合目标列表
          </text>

          {/* ========== 中间 卡尔曼滤波 ========== */}
          <rect x={MID_X} y={76} width={MID_W} height={326} rx="12" fill={primary} fillOpacity="0.03" stroke={border} strokeWidth="1.2" />
          <text x={MID_X + MID_W / 2} y={95} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            卡尔曼滤波
          </text>
          {[
            { label: "预测", detail: "x̂⁻ = A·x̂", y: 120 },
            { label: "更新", detail: "K = P Hᵀ S⁻¹", y: 200 },
            { label: "状态估计", detail: "x̂ = x̂⁻ + K·y", y: 280 },
          ].map((s, i, arr) => (
            <g key={s.label}>
              <rect x={MID_X + 2} y={s.y} width={MID_W - 4} height={56} rx="8" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.3" />
              <text x={MID_X + MID_W / 2} y={s.y + 22} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
                {s.label}
              </text>
              <text x={MID_X + MID_W / 2} y={s.y + 40} textAnchor="middle" fontSize="11" fill={secondary}>
                {s.detail}
              </text>
              {i < arr.length - 1 && (
                <line x1={MID_X + MID_W / 2} y1={s.y + 56} x2={MID_X + MID_W / 2} y2={arr[i + 1].y} stroke={accent} strokeWidth="1.4" markerEnd="url(#vsf-arrow-acc)" />
              )}
            </g>
          ))}
          <text x={MID_X + MID_W / 2} y={360} textAnchor="middle" fontSize="11" fill={secondary}>
            预测-更新循环
          </text>
          <text x={MID_X + MID_W / 2} y={378} textAnchor="middle" fontSize="11" fill={secondary}>
            最优状态估计
          </text>

          {/* ========== 右半区 前融合 ========== */}
          <rect x={RIGHT_X} y={76} width={RIGHT_W} height={326} rx="12" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <rect x={RIGHT_X} y={76} width={RIGHT_W} height="28" rx="12" fill={success} fillOpacity="0.16" stroke={success} strokeWidth="1.2" />
          <text x={RIGHT_X + RIGHT_W / 2} y={95} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            前融合 · Early Fusion
          </text>

          {/* 3 传感器原始数据 */}
          {SENSORS.map((s, i) => {
            const x = RIGHT_X + 16 + i * (sensorBoxW + laneGap);
            return (
              <g key={`early-${s.name}`}>
                <rect x={x} y={earlySensorY} width={sensorBoxW} height={sensorBoxH} rx="6" fill={s.color} fillOpacity="0.16" stroke={s.color} strokeWidth="1.3" />
                <text x={x + sensorBoxW / 2} y={earlySensorY + 22} textAnchor="middle" fontSize="11" fontWeight="700" fill={s.color}>
                  {s.name}
                </text>
                <text x={x + sensorBoxW / 2} y={earlySensorY + sensorBoxH + 14} textAnchor="middle" fontSize="11" fill={secondary}>
                  原始数据
                </text>
              </g>
            );
          })}

          {/* 数据级融合盒 */}
          <rect x={RIGHT_X + 30} y={earlyFuseY} width={RIGHT_W - 60} height={56} rx="10" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.6" />
          <text x={RIGHT_X + RIGHT_W / 2} y={earlyFuseY + 24} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            数据级融合
          </text>
          <text x={RIGHT_X + RIGHT_W / 2} y={earlyFuseY + 42} textAnchor="middle" fontSize="11" fill={secondary}>
            BEV 特征对齐 · 时空同步
          </text>
          {/* 3 传感器 → 融合 汇聚箭头 */}
          {SENSORS.map((s, i) => {
            const x = RIGHT_X + 16 + i * (sensorBoxW + laneGap) + sensorBoxW / 2;
            return (
              <line
                key={`early-merge-${s.name}`}
                x1={x}
                y1={earlySensorY + sensorBoxH + 18}
                x2={RIGHT_X + RIGHT_W / 2}
                y2={earlyFuseY}
                stroke={secondary}
                strokeWidth="1.2"
                markerEnd="url(#vsf-arrow)"
              />
            );
          })}

          {/* 统一检测 */}
          <rect x={RIGHT_X + 40} y={earlyDetY} width={RIGHT_W - 80} height={48} rx="8" fill={success} fillOpacity="0.16" stroke={success} strokeWidth="1.5" />
          <text x={RIGHT_X + RIGHT_W / 2} y={earlyDetY + 22} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            统一检测
          </text>
          <text x={RIGHT_X + RIGHT_W / 2} y={earlyDetY + 38} textAnchor="middle" fontSize="11" fill={secondary}>
            单模型联合感知
          </text>
          <line x1={RIGHT_X + RIGHT_W / 2} y1={earlyFuseY + 56} x2={RIGHT_X + RIGHT_W / 2} y2={earlyDetY} stroke={accent} strokeWidth="1.6" markerEnd="url(#vsf-arrow-acc)" />
          <line x1={RIGHT_X + RIGHT_W / 2} y1={earlyDetY + 48} x2={RIGHT_X + RIGHT_W / 2} y2={earlyDetY + 70} stroke={success} strokeWidth="1.6" markerEnd="url(#vsf-arrow)" />
          <text x={RIGHT_X + RIGHT_W / 2} y={earlyDetY + 88} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>
            融合目标列表
          </text>

          {/* ========== 底部对照 ========== */}
          <line x1={32} y1={420} x2={VIEW_W - 32} y2={420} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={440} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            融合范式权衡
          </text>
          {[
            { dim: "信息损失", late: "大 · 已丢原始细节", early: "小 · 保留全部信息", x: 36 },
            { dim: "算力需求", late: "低 · 各自轻量", early: "高 · 联合大模型", x: 264 },
            { dim: "实现难度", late: "低 · 模块解耦", early: "高 · 时空强同步", x: 492 },
          ].map((c) => (
            <g key={c.dim}>
              <rect x={c.x} y={452} width={192} height={84} rx="8" fill={primary} fillOpacity="0.03" stroke={border} strokeWidth="1" />
              <text x={c.x + 96} y={470} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>
                {c.dim}
              </text>
              <text x={c.x + 12} y={492} fontSize="11" fill={warning}>后融合</text>
              <text x={c.x + 56} y={492} fontSize="11" fill={secondary}>{c.late}</text>
              <text x={c.x + 12} y={514} fontSize="11" fill={success}>前融合</text>
              <text x={c.x + 56} y={514} fontSize="11" fill={secondary}>{c.early}</text>
            </g>
          ))}

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={556} textAnchor="middle" fontSize="11" fill={secondary}>
            后融合易落地 · 前融合上限高 · 卡尔曼滤波是状态估计的通用引擎
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        多传感器融合架构：左半后融合（摄像头/毫米波/激光雷达各自独立检测，再结果级融合关联匹配）；右半前融合（三类传感器原始数据先数据级融合做 BEV 特征对齐，再统一检测）；中间卡尔曼滤波流程（预测 → 更新 → 状态估计）。底部对照信息损失、算力、实现难度——后融合易落地，前融合上限高。
      </figcaption>
    </figure>
  );
}
