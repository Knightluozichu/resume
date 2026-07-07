/**
 * <AssEcuCanBusDiagram>：ECU 与 CAN 总线架构图。
 *
 * 中心为 CAN 总线（双绞线 CAN_H / CAN_L 差分信号），两端各接 120Ω 终端电阻。
 * 周围连接 5 个 ECU 节点：
 *   - 上排：发动机 ECU、变速箱 TCU、车身 BCM
 *   - 下排：ABS ECU、仪表盘 Cluster
 * 标注差分信号抗扰原理、终端电阻匹配（120Ω×2 = 60Ω 总线阻抗）、
 * 以及 ID 仲裁消息优先级（ID 越小优先级越高）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const BUS_CY = 240;
const BUS_X0 = 110;
const BUS_X1 = 610;

// 双绞线点（正弦交织）
const twistPoints = (sign: number) => {
  const pts: string[] = [];
  for (let x = BUS_X0; x <= BUS_X1; x += 8) {
    const y = BUS_CY + sign * 5 * Math.sin((x - BUS_X0) / 22);
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return pts.join(" ");
};
const CAN_H_PTS = twistPoints(1);
const CAN_L_PTS = twistPoints(-1);

interface Ecu {
  label: string;
  sub: string;
  cx: number;
  top: boolean;
  color: string;
}

const ECUS: readonly Ecu[] = [
  { label: "发动机 ECU", sub: "Engine", cx: 150, top: true, color: accent },
  { label: "变速箱 TCU", sub: "Transmission", cx: 360, top: true, color: success },
  { label: "车身 BCM", sub: "Body Control", cx: 570, top: true, color: warning },
  { label: "ABS ECU", sub: "Brake Control", cx: 150, top: false, color: accent },
  { label: "仪表盘", sub: "Cluster", cx: 570, top: false, color: success },
];

const ECU_W = 116;
const ECU_H = 46;
const TOP_Y = 100;
const BOT_Y = 314;

export function AssEcuCanBusDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="ECU 与 CAN 总线架构图。中心为 CAN 总线双绞线（CAN_H 紫色与 CAN_L 灰色差分信号），两端各接 120 欧终端电阻。上排连接发动机 ECU、变速箱 TCU、车身 BCM 三个节点，下排连接 ABS ECU、仪表盘两个节点。标注差分信号抗干扰、终端电阻 120 欧乘 2 等于 60 欧总线阻抗、以及 ID 仲裁消息优先级（ID 越小优先级越高）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="acb-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            ECU 与 CAN 总线架构
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill={secondary}>
            多 ECU 共享双绞差分总线，ID 仲裁决定消息优先级
          </text>

          {/* CAN 总线双绞线 */}
          <polyline points={CAN_H_PTS} fill="none" stroke={accent} strokeWidth="2" />
          <polyline points={CAN_L_PTS} fill="none" stroke={secondary} strokeWidth="2" />
          <text x={BUS_X0 - 6} y={BUS_CY - 14} textAnchor="end" fontSize="11" fontWeight="700" fill={accent}>CAN_H</text>
          <text x={BUS_X0 - 6} y={BUS_CY + 18} textAnchor="end" fontSize="11" fontWeight="700" fill={secondary}>CAN_L</text>

          {/* 终端电阻（左右两端） */}
          {[BUS_X0, BUS_X1].map((rx, i) => (
            <g key={i}>
              <path
                d={`M ${rx} ${BUS_CY - 16} L ${rx + 5} ${BUS_CY - 12} L ${rx - 5} ${BUS_CY - 8} L ${rx + 5} ${BUS_CY - 4} L ${rx - 5} ${BUS_CY} L ${rx + 5} ${BUS_CY + 4} L ${rx - 5} ${BUS_CY + 8} L ${rx + 5} ${BUS_CY + 12} L ${rx} ${BUS_CY + 16}`}
                fill="none"
                stroke={primary}
                strokeWidth="1.4"
              />
              <text x={rx} y={BUS_CY + 30} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>120Ω</text>
            </g>
          ))}
          <text x={BUS_X0 - 6} y={BUS_CY + 44} textAnchor="end" fontSize="11" fill={secondary}>终端电阻</text>
          <text x={(BUS_X0 + BUS_X1) / 2} y={BUS_CY + 44} textAnchor="middle" fontSize="11" fill={secondary}>总线阻抗 ≈ 60Ω（两 120Ω 并联）</text>

          {/* ECU 节点 + 连接线 */}
          {ECUS.map((e) => {
            const boxX = e.cx - ECU_W / 2;
            const boxY = e.top ? TOP_Y : BOT_Y;
            const connectY1 = e.top ? TOP_Y + ECU_H : BOT_Y;
            return (
              <g key={e.label}>
                {/* 连接到总线 */}
                <line x1={e.cx} y1={connectY1} x2={e.cx} y2={BUS_CY} stroke={secondary} strokeWidth="1.2" />
                {/* 节点点 */}
                <circle cx={e.cx} cy={BUS_CY} r="4" fill={e.color} stroke={primary} strokeWidth="1" />
                {/* ECU 盒 */}
                <rect x={boxX} y={boxY} width={ECU_W} height={ECU_H} rx="8" fill={e.color} fillOpacity="0.1" stroke={e.color} strokeWidth="1.6" />
                <text x={e.cx} y={boxY + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>{e.label}</text>
                <text x={e.cx} y={boxY + 36} textAnchor="middle" fontSize="11" fill={secondary}>{e.sub}</text>
              </g>
            );
          })}

          {/* ID 仲裁优先级说明框 */}
          <rect x={80} y={384} width={VIEW_W - 160} height="48" rx="8" fill={accent} fillOpacity="0.05" stroke={accent} strokeWidth="1.2" strokeDasharray="4 3" />
          <text x={96} y={404} fontSize="12" fontWeight="700" fill={accent}>ID 仲裁（消息优先级）</text>
          <text x={96} y={422} fontSize="11" fill={primary}>多 ECU 同时发送时，ID 越小优先级越高（如制动 ID &lt; 舒适 ID），显性位覆盖隐性位，无损仲裁</text>

          {/* 底部总结 */}
          <line x1={40} y1={446} x2={VIEW_W - 40} y2={446} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={466} textAnchor="middle" fontSize="10" fill={secondary}>
            差分信号抗扰 + 终端电阻匹配 + ID 仲裁 = 可靠的多主总线通信
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CAN 总线以双绞差分线（CAN_H/CAN_L）连接发动机 ECU、变速箱 TCU、车身 BCM、ABS ECU、仪表盘等节点，两端各配 120Ω 终端电阻（并联 60Ω）。多主节点通过 ID 仲裁确定优先级（ID 越小优先级越高），差分信号抗干扰、无损仲裁保障可靠通信。
      </figcaption>
    </figure>
  );
}
