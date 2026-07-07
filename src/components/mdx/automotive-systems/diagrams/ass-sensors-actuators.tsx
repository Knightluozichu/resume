/**
 * <AssSensorsActuatorsDiagram>：传感器与执行器图解。
 *
 * 三列布局：左侧传感器 → 中间 ECU 处理 → 右侧执行器。
 *   - 传感器（6）：MAF 空气流量、氧传感器 O₂、曲轴位置 CKP、凸轮轴位置 CMP、轮速 WSS、温度
 *   - 执行器（5）：喷油嘴、点火线圈、节气门、EGR 阀、VVT 电磁阀
 * 中间 ECU 接收传感器信号（反馈输入），经计算后驱动执行器（控制输出），
 * 箭头表示信号流向：传感器 → ECU → 执行器。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

interface Item {
  name: string;
  desc: string;
}

const SENSORS: readonly Item[] = [
  { name: "MAF 空气流量", desc: "进气量 g/s" },
  { name: "氧传感器 O₂", desc: "空燃比 λ" },
  { name: "曲轴位置 CKP", desc: "转速 / 相位" },
  { name: "凸轮轴位置 CMP", desc: "气门正时" },
  { name: "轮速 WSS", desc: "车速 / 滑移率" },
  { name: "温度传感器", desc: "水温 / 油温" },
];

const ACTUATORS: readonly Item[] = [
  { name: "喷油嘴", desc: "喷油量 / 时序" },
  { name: "点火线圈", desc: "点火提前角" },
  { name: "电子节气门", desc: "进气节流" },
  { name: "EGR 阀", desc: "废气再循环" },
  { name: "VVT 电磁阀", desc: "可变气门正时" },
];

const ROW_H = 48;
const ROW_GAP = 10;
const STEP = ROW_H + ROW_GAP;

const SENS_X = 40;
const SENS_W = 210;
const SENS_START_Y = 92;
const sensY = (i: number) => SENS_START_Y + i * STEP;

const ACT_X = 470;
const ACT_W = 210;
const actStartY = SENS_START_Y + ((SENSORS.length - ACTUATORS.length) * STEP) / 2;
const actY = (i: number) => actStartY + i * STEP;

const ECU_X = 295;
const ECU_W = 130;
const ECU_Y = 108;
const ECU_H = SENSORS.length * STEP - ROW_GAP; // 覆盖全部传感器行高

export function AssSensorsActuatorsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="传感器与执行器图解。左侧六种传感器（MAF 空气流量、氧传感器、曲轴位置、凸轮轴位置、轮速、温度）箭头指向中间 ECU；ECU 处理后箭头指向右侧五种执行器（喷油嘴、点火线圈、节气门、EGR 阀、VVT 电磁阀）。信号流向为传感器到 ECU 到执行器，ECU 为感知输入与控制输出的中枢。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="asa-arrow-in" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={success} />
            </marker>
            <marker id="asa-arrow-out" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={warning} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            传感器 → ECU → 执行器
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill={secondary}>
            感知输入经 ECU 决策，驱动执行器构成闭环控制
          </text>

          {/* 列标题 */}
          <text x={SENS_X + SENS_W / 2} y={82} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>传感器 Sensors</text>
          <text x={ECU_X + ECU_W / 2} y={82} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>ECU 处理</text>
          <text x={ACT_X + ACT_W / 2} y={82} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>执行器 Actuators</text>

          {/* ECU 中枢盒 */}
          <rect x={ECU_X} y={ECU_Y} width={ECU_W} height={ECU_H} rx="12" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.8" />
          <text x={ECU_X + ECU_W / 2} y={ECU_Y + 28} textAnchor="middle" fontSize="14" fontWeight="700" fill={accent}>ECU</text>
          <text x={ECU_X + ECU_W / 2} y={ECU_Y + 48} textAnchor="middle" fontSize="11" fill={secondary}>电子控制单元</text>
          <line x1={ECU_X + 18} y1={ECU_Y + 60} x2={ECU_X + ECU_W - 18} y2={ECU_Y + 60} stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x={ECU_X + ECU_W / 2} y={ECU_Y + 80} textAnchor="middle" fontSize="11" fill={primary}>信号采集</text>
          <text x={ECU_X + ECU_W / 2} y={ECU_Y + 100} textAnchor="middle" fontSize="11" fill={primary}>标定查表</text>
          <text x={ECU_X + ECU_W / 2} y={ECU_Y + 120} textAnchor="middle" fontSize="11" fill={primary}>闭环 PID</text>
          <text x={ECU_X + ECU_W / 2} y={ECU_Y + 140} textAnchor="middle" fontSize="11" fill={primary}>驱动输出</text>
          <text x={ECU_X + ECU_W / 2} y={ECU_Y + ECU_H - 18} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>决策中枢</text>

          {/* 传感器行 + 箭头 */}
          {SENSORS.map((s, i) => {
            const y = sensY(i);
            const cy = y + ROW_H / 2;
            return (
              <g key={s.name}>
                <rect x={SENS_X} y={y} width={SENS_W} height={ROW_H} rx="7" fill={success} fillOpacity="0.07" stroke={success} strokeWidth="1.3" />
                <text x={SENS_X + 14} y={cy + 1} fontSize="12" fontWeight="700" fill={primary}>{s.name}</text>
                <text x={SENS_X + 14} y={cy + 17} fontSize="11" fill={secondary}>{s.desc}</text>
                <line x1={SENS_X + SENS_W + 2} y1={cy} x2={ECU_X - 4} y2={cy} stroke={success} strokeWidth="1.4" markerEnd="url(#asa-arrow-in)" />
              </g>
            );
          })}

          {/* 执行器行 + 箭头 */}
          {ACTUATORS.map((a, i) => {
            const y = actY(i);
            const cy = y + ROW_H / 2;
            return (
              <g key={a.name}>
                <rect x={ACT_X} y={y} width={ACT_W} height={ROW_H} rx="7" fill={warning} fillOpacity="0.07" stroke={warning} strokeWidth="1.3" />
                <text x={ACT_X + 14} y={cy + 1} fontSize="12" fontWeight="700" fill={primary}>{a.name}</text>
                <text x={ACT_X + 14} y={cy + 17} fontSize="11" fill={secondary}>{a.desc}</text>
                <line x1={ECU_X + ECU_W + 2} y1={cy} x2={ACT_X - 4} y2={cy} stroke={warning} strokeWidth="1.4" markerEnd="url(#asa-arrow-out)" />
              </g>
            );
          })}

          {/* 信号流标注 */}
          <text x={SENS_X + SENS_W + 16} y={ECU_Y - 4} fontSize="11" fontWeight="700" fill={success}>反馈输入</text>
          <text x={ECU_X + ECU_W + 14} y={ECU_Y - 4} fontSize="11" fontWeight="700" fill={warning}>控制输出</text>

          {/* 底部总结 */}
          <line x1={40} y1={456} x2={VIEW_W - 40} y2={456} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={478} textAnchor="middle" fontSize="12" fill={secondary}>
            传感器感知状态 · ECU 标定决策 · 执行器动作——构成「感知 → 决策 → 执行」闭环
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        传感器（MAF、氧传感器、曲轴/凸轮轴位置、轮速、温度）将状态信号输入 ECU，ECU 经标定查表与闭环 PID 决策后驱动执行器（喷油嘴、点火线圈、节气门、EGR 阀、VVT 电磁阀），构成「感知→决策→执行」的闭环控制。
      </figcaption>
    </figure>
  );
}
