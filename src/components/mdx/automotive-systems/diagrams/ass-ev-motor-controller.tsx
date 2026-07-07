/**
 * <AssEvMotorControllerDiagram>：电驱系统架构图。
 *
 * 上部为高压动力流（左→右）：
 *   高压电池 → 逆变器（DC/AC，IGBT 三相桥）→ 驱动电机（PMSM 永磁同步）→ 减速器 → 车轮
 *   标注 DC / AC / 机械 三段能量形式。
 * 控制层：VCU 整车控制器下发扭矩需求 → MCU 电机控制器 → SVPWM 驱动 IGBT；
 *   电机位置传感器反馈至 MCU 构成闭环。
 * 下部为电机扭矩 / 功率-转速曲线：基速以下恒扭矩、基速以上恒功率（扭矩随转速下降）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×510（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 510;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

// 动力流部件
interface FlowPart {
  label: string;
  sub: string;
  w: number;
  hot?: boolean;
}
const FLOW: readonly FlowPart[] = [
  { label: "高压电池", sub: "DC 高压", w: 92 },
  { label: "逆变器", sub: "DC/AC · IGBT", w: 104, hot: true },
  { label: "驱动电机", sub: "PMSM 永磁同步", w: 96 },
  { label: "减速器", sub: "单级减速", w: 80 },
  { label: "车轮", sub: "驱动行驶", w: 76 },
];
const FLOW_GAP = 12;
const flowTotal = FLOW.reduce((a, b) => a + b.w, 0) + (FLOW.length - 1) * FLOW_GAP;
const flowStart = (VIEW_W - flowTotal) / 2;
const flowX = (i: number) => flowStart + FLOW.slice(0, i).reduce((a, b) => a + b.w + FLOW_GAP, 0);
const FLOW_Y = 84;
const FLOW_H = 50;
const FLOW_LABELS = ["DC", "AC 三相", "机械", "机械"];

// 控制层
const VCU = { x: 80, y: 156, w: 120, h: 40 };
const MCU = { x: 216, y: 156, w: 104, h: 40 };

// 曲线坐标
const PL_X0 = 110; // 0 rpm
const PL_X1 = 620; // 12000 rpm
const PL_Y0 = 410; // 0%
const PL_Y1 = 235; // 100%
const rpmX = (rpm: number) => PL_X0 + (rpm / 1000) * 42.5;
const valY = (v: number) => PL_Y0 - (v / 100) * (PL_Y0 - PL_Y1);

const TORQUE: readonly (readonly number[])[] = [[0, 100], [2000, 100], [4000, 100], [6000, 67], [8000, 50], [10000, 40], [12000, 33]];
const POWER: readonly (readonly number[])[] = [[0, 0], [2000, 50], [4000, 100], [6000, 100], [8000, 100], [10000, 100], [12000, 100]];
const toPts = (arr: readonly (readonly number[])[]) => arr.map((p) => `${rpmX(p[0]).toFixed(1)},${valY(p[1]).toFixed(1)}`).join(" ");
const BASE_RPM = 4000;

export function AssEvMotorControllerDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="电驱系统架构图。上部动力流：高压电池（DC）经逆变器（DC/AC，IGBT 三相桥）转交流驱动 PMSM 永磁同步电机，经减速器驱动车轮。控制层：VCU 整车控制器下发扭矩需求给 MCU 电机控制器，MCU 经 SVPWM 驱动 IGBT，电机位置反馈构成闭环。下部电机扭矩功率转速曲线：基速以下恒扭矩、基速以上恒功率。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="aem-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="aem-arrow-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={accent} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            电驱系统 · 电池到车轮
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill={secondary}>
            高压 DC → 逆变 AC → 电机机械 → 减速驱动，VCU/MCU 全电控
          </text>

          {/* 动力流 */}
          {FLOW.map((f, i) => {
            const x = flowX(i);
            return (
              <g key={f.label}>
                <rect x={x} y={FLOW_Y} width={f.w} height={FLOW_H} rx="8" fill={f.hot ? accent : primary} fillOpacity={f.hot ? 0.16 : 0.06} stroke={f.hot ? accent : primary} strokeWidth={f.hot ? 1.8 : 1.4} />
                <text x={x + f.w / 2} y={FLOW_Y + 22} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>{f.label}</text>
                <text x={x + f.w / 2} y={FLOW_Y + 40} textAnchor="middle" fontSize="11" fill={secondary}>{f.sub}</text>
                {i < FLOW.length - 1 && (
                  <line x1={x + f.w + 2} y1={FLOW_Y + FLOW_H / 2} x2={flowX(i + 1) - 4} y2={FLOW_Y + FLOW_H / 2} stroke={secondary} strokeWidth="1.6" markerEnd="url(#aem-arrow)" />
                )}
              </g>
            );
          })}
          {/* 能量形式标注 */}
          {FLOW_LABELS.map((lb, i) => {
            const x = flowX(i) + FLOW[i].w + FLOW_GAP / 2;
            return <text key={i} x={x} y={FLOW_Y + FLOW_H / 2 - 8} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>{lb}</text>;
          })}

          {/* 控制层：VCU → MCU → 逆变器 */}
          <rect x={VCU.x} y={VCU.y} width={VCU.w} height={VCU.h} rx="7" fill={success} fillOpacity="0.12" stroke={success} strokeWidth="1.5" />
          <text x={VCU.x + VCU.w / 2} y={VCU.y + 17} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>VCU 整车控制器</text>
          <text x={VCU.x + VCU.w / 2} y={VCU.y + 33} textAnchor="middle" fontSize="11" fill={secondary}>扭矩需求</text>

          <rect x={MCU.x} y={MCU.y} width={MCU.w} height={MCU.h} rx="7" fill={accent} fillOpacity="0.14" stroke={accent} strokeWidth="1.6" />
          <text x={MCU.x + MCU.w / 2} y={MCU.y + 17} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>MCU 电机控制器</text>
          <text x={MCU.x + MCU.w / 2} y={MCU.y + 33} textAnchor="middle" fontSize="11" fill={secondary}>SVPWM · IGBT 驱动</text>

          {/* VCU → MCU */}
          <line x1={VCU.x + VCU.w + 2} y1={MCU.y + MCU.h / 2} x2={MCU.x - 4} y2={MCU.y + MCU.h / 2} stroke={success} strokeWidth="1.6" markerEnd="url(#aem-arrow)" />
          {/* MCU → 逆变器（上） */}
          <line x1={MCU.x + MCU.w / 2} y1={MCU.y} x2={MCU.x + MCU.w / 2} y2={FLOW_Y + FLOW_H + 4} stroke={accent} strokeWidth="1.6" markerEnd="url(#aem-arrow-accent)" />
          <text x={MCU.x + MCU.w / 2 + 8} y={MCU.y - 6} fontSize="11" fill={accent}>PWM 驱动</text>
          {/* 电机位置反馈（虚线，从电机到 MCU） */}
          <path d={`M ${flowX(2) + FLOW[2].w / 2} ${FLOW_Y + FLOW_H} L ${flowX(2) + FLOW[2].w / 2} ${MCU.y + MCU.h + 14} L ${MCU.x + MCU.w} ${MCU.y + MCU.h + 14}`} fill="none" stroke={warning} strokeWidth="1.3" strokeDasharray="4 3" markerEnd="url(#aem-arrow)" />
          <text x={flowX(2) + FLOW[2].w / 2 + 6} y={MCU.y + MCU.h + 10} fontSize="11" fill={warning}>位置反馈</text>

          {/* 分隔线 */}
          <line x1={40} y1={214} x2={VIEW_W - 40} y2={214} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* ===== 曲线区 ===== */}
          <text x={40} y={232} fontSize="13" fontWeight="700" fill={primary}>电机扭矩 / 功率 - 转速曲线</text>

          {/* 坐标轴 */}
          <line x1={PL_X0 - 10} y1={PL_Y0} x2={PL_X1 + 14} y2={PL_Y0} stroke={primary} strokeWidth="1.4" markerEnd="url(#aem-arrow)" />
          <line x1={PL_X0} y1={PL_Y0 + 8} x2={PL_X0} y2={PL_Y1 - 10} stroke={primary} strokeWidth="1.4" markerEnd="url(#aem-arrow)" />
          <text x={PL_X1 + 20} y={PL_Y0 + 4} fontSize="11" fontWeight="700" fill={primary}>rpm</text>
          <text x={PL_X0 - 16} y={PL_Y1 - 14} fontSize="11" fontWeight="700" fill={primary}>%</text>

          {/* 转速刻度 */}
          {[0, 2, 4, 6, 8, 10, 12].map((k) => (
            <g key={k}>
              <line x1={rpmX(k * 1000)} y1={PL_Y0} x2={rpmX(k * 1000)} y2={PL_Y0 + 4} stroke={secondary} strokeWidth="1" />
              <text x={rpmX(k * 1000)} y={PL_Y0 + 18} textAnchor="middle" fontSize="11" fill={secondary}>{k}k</text>
            </g>
          ))}

          {/* 基速分界线 */}
          <line x1={rpmX(BASE_RPM)} y1={PL_Y1} x2={rpmX(BASE_RPM)} y2={PL_Y0} stroke={border} strokeWidth="1.2" strokeDasharray="3 3" />
          <text x={rpmX(BASE_RPM) - 6} y={PL_Y1 - 6} textAnchor="end" fontSize="11" fontWeight="700" fill={secondary}>恒扭矩区</text>
          <text x={rpmX(BASE_RPM) + 6} y={PL_Y1 - 6} fontSize="11" fontWeight="700" fill={secondary}>恒功率区</text>
          <text x={rpmX(BASE_RPM)} y={PL_Y0 + 32} textAnchor="middle" fontSize="11" fill={accent}>基速 4k rpm</text>

          {/* 扭矩 / 功率曲线 */}
          <polyline points={toPts(TORQUE)} fill="none" stroke={accent} strokeWidth="2.6" />
          <polyline points={toPts(POWER)} fill="none" stroke={success} strokeWidth="2.6" strokeDasharray="5 4" />

          {/* 图例 */}
          <g>
            <line x1={120} y1={445} x2={150} y2={445} stroke={accent} strokeWidth="2.6" />
            <text x={156} y={449} fontSize="11" fill={secondary}>扭矩 Torque</text>
            <line x1={280} y1={445} x2={310} y2={445} stroke={success} strokeWidth="2.6" strokeDasharray="5 4" />
            <text x={316} y={449} fontSize="11" fill={secondary}>功率 Power</text>
          </g>

          {/* 底部总结 */}
          <line x1={40} y1={466} x2={VIEW_W - 40} y2={466} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={488} textAnchor="middle" fontSize="12" fill={secondary}>
            基速以下恒扭矩（起步强劲）· 基速以上恒功率（高速持久）——电机构型决定外特性
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        电驱系统：高压电池经逆变器（DC/AC，IGBT 三相桥）转交流驱动 PMSM 永磁同步电机，经减速器驱动车轮。VCU 下发扭矩需求、MCU 经 SVPWM 驱动 IGBT 并以电机位置反馈构成闭环。扭矩-转速曲线呈基速以下恒扭矩、基速以上恒功率特性。
      </figcaption>
    </figure>
  );
}
