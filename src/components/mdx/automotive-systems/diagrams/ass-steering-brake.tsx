/**
 * <AssSteeringBrakeDiagram>：转向与制动系统图。
 *
 * 上半部分转向系统（主流程 + EPS 控制逻辑）：
 *   方向盘 → 转向柱 → EPS 电子助力 → 转向齿条 → 左右车轮
 *   EPS 控制闭环：扭矩传感器 → ECU → 助力电机（按车速调节助力大小）
 * 下半部分制动系统（主流程 + ABS 控制逻辑）：
 *   刹车踏板 → 真空助力器 → ABS 模块 → 制动卡钳 → 刹车盘
 *   ABS 控制闭环：轮速传感器 → ABS ECU → 液压调节（高频点刹防抱死）
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

// 转向主流程部件
const STEER = [
  { label: "方向盘", w: 96 },
  { label: "转向柱", w: 88 },
  { label: "EPS 电子助力", w: 112, hot: true },
  { label: "转向齿条", w: 104 },
  { label: "左右车轮", w: 96 },
] as const;
const FLOW_GAP = 16;
const steerTotal = STEER.reduce((a, b) => a + b.w, 0) + (STEER.length - 1) * FLOW_GAP;
const steerStart = (VIEW_W - steerTotal) / 2;
const flowX = (start: number, arr: readonly { w: number }[], i: number) =>
  start + arr.slice(0, i).reduce((a, b) => a + b.w + FLOW_GAP, 0);
const steerX = (i: number) => flowX(steerStart, STEER, i);
const STEER_Y = 104;
const FLOW_H = 46;

// 制动主流程部件
const BRAKE = [
  { label: "刹车踏板", w: 88 },
  { label: "真空助力器", w: 96 },
  { label: "ABS 模块", w: 96, hot: true },
  { label: "制动卡钳", w: 104 },
  { label: "刹车盘", w: 112 },
] as const;
const brakeTotal = BRAKE.reduce((a, b) => a + b.w, 0) + (BRAKE.length - 1) * FLOW_GAP;
const brakeStart = (VIEW_W - brakeTotal) / 2;
const brakeX = (i: number) => flowX(brakeStart, BRAKE, i);
const BRAKE_Y = 288;

// 控制逻辑框
const LOGIC_BOX = { x: 140, w: 440, h: 74 };

const EPS_LOGIC = [
  { label: "扭矩传感器", w: 88 },
  { label: "ECU", w: 56 },
  { label: "助力电机", w: 80 },
] as const;
const EPS_BOX_Y = 170;
const epsStart = LOGIC_BOX.x + 36;
const epsX = (i: number) => flowX(epsStart, EPS_LOGIC, i);

const ABS_LOGIC = [
  { label: "轮速传感器", w: 92 },
  { label: "ABS ECU", w: 64 },
  { label: "液压调节", w: 80 },
] as const;
const ABS_BOX_Y = 354;
const absStart = LOGIC_BOX.x + 36;
const absX = (i: number) => flowX(absStart, ABS_LOGIC, i);

const LG_GAP = 18;
const lgX = (start: number, arr: readonly { w: number }[], i: number) =>
  start + arr.slice(0, i).reduce((a, b) => a + b.w + LG_GAP, 0);

function FlowRow({ items, xs, y, h }: { items: readonly { label: string; w: number; hot?: boolean }[]; xs: (i: number) => number; y: number; h: number }) {
  return (
    <>
      {items.map((it, i) => {
        const x = xs(i);
        return (
          <g key={it.label}>
            <rect x={x} y={y} width={it.w} height={h} rx="7" fill={it.hot ? accent : primary} fillOpacity={it.hot ? 0.16 : 0.06} stroke={it.hot ? accent : primary} strokeWidth={it.hot ? 1.8 : 1.4} />
            <text x={x + it.w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>{it.label}</text>
            {i < items.length - 1 && (
              <line x1={x + it.w + 2} y1={y + h / 2} x2={xs(i + 1) - 4} y2={y + h / 2} stroke={secondary} strokeWidth="1.6" markerEnd="url(#asb-arrow)" />
            )}
          </g>
        );
      })}
    </>
  );
}

export function AssSteeringBrakeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="转向与制动系统图。上半部分转向系统：方向盘、转向柱、EPS 电子助力、转向齿条、左右车轮依次连接；EPS 控制逻辑为扭矩传感器、ECU、助力电机的闭环助力。下半部分制动系统：刹车踏板、真空助力器、ABS 模块、制动卡钳、刹车盘依次连接；ABS 控制逻辑为轮速传感器、ABS ECU、液压调节的高频点刹防抱死。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="asb-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="asb-arrow-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={accent} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            转向系统 与 制动系统
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill={secondary}>
            上：转向传递 + EPS 电控助力 · 下：制动传递 + ABS 防抱死
          </text>

          {/* ===== 转向系统 ===== */}
          <text x={40} y={82} fontSize="13" fontWeight="700" fill={success}>转向系统 Steering</text>
          <text x={680} y={82} textAnchor="end" fontSize="11" fill={secondary}>改变行驶方向</text>
          <FlowRow items={STEER} xs={steerX} y={STEER_Y} h={FLOW_H} />

          {/* EPS 控制逻辑框 */}
          <rect x={LOGIC_BOX.x} y={EPS_BOX_Y} width={LOGIC_BOX.w} height={LOGIC_BOX.h} rx="8" fill={accent} fillOpacity="0.05" stroke={accent} strokeWidth="1.2" strokeDasharray="4 3" />
          <text x={LOGIC_BOX.x + 12} y={EPS_BOX_Y + 18} fontSize="12" fontWeight="700" fill={accent}>EPS 电子助力控制逻辑</text>
          {EPS_LOGIC.map((it, i) => {
            const x = lgX(epsStart, EPS_LOGIC, i);
            return (
              <g key={it.label}>
                <rect x={x} y={EPS_BOX_Y + 30} width={it.w} height="30" rx="5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.2" />
                <text x={x + it.w / 2} y={EPS_BOX_Y + 49} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{it.label}</text>
                {i < EPS_LOGIC.length - 1 && (
                  <line x1={x + it.w + 2} y1={EPS_BOX_Y + 45} x2={lgX(epsStart, EPS_LOGIC, i + 1) - 4} y2={EPS_BOX_Y + 45} stroke={accent} strokeWidth="1.4" markerEnd="url(#asb-arrow-accent)" />
                )}
              </g>
            );
          })}
          <text x={LOGIC_BOX.x + LOGIC_BOX.w - 12} y={EPS_BOX_Y + 62} textAnchor="end" fontSize="11" fill={accent}>按车速调节助力 · 扭矩闭环</text>

          {/* 分隔线 */}
          <line x1={40} y1={262} x2={VIEW_W - 40} y2={262} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* ===== 制动系统 ===== */}
          <text x={40} y={282} fontSize="13" fontWeight="700" fill={warning}>制动系统 Brake</text>
          <text x={680} y={282} textAnchor="end" fontSize="11" fill={secondary}>减速 / 停车 · 保持稳定</text>
          <FlowRow items={BRAKE} xs={brakeX} y={BRAKE_Y} h={FLOW_H} />

          {/* ABS 控制逻辑框 */}
          <rect x={LOGIC_BOX.x} y={ABS_BOX_Y} width={LOGIC_BOX.w} height={LOGIC_BOX.h} rx="8" fill={accent} fillOpacity="0.05" stroke={accent} strokeWidth="1.2" strokeDasharray="4 3" />
          <text x={LOGIC_BOX.x + 12} y={ABS_BOX_Y + 18} fontSize="12" fontWeight="700" fill={accent}>ABS 防抱死控制逻辑</text>
          {ABS_LOGIC.map((it, i) => {
            const x = lgX(absStart, ABS_LOGIC, i);
            return (
              <g key={it.label}>
                <rect x={x} y={ABS_BOX_Y + 30} width={it.w} height="30" rx="5" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.2" />
                <text x={x + it.w / 2} y={ABS_BOX_Y + 49} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{it.label}</text>
                {i < ABS_LOGIC.length - 1 && (
                  <line x1={x + it.w + 2} y1={ABS_BOX_Y + 45} x2={lgX(absStart, ABS_LOGIC, i + 1) - 4} y2={ABS_BOX_Y + 45} stroke={accent} strokeWidth="1.4" markerEnd="url(#asb-arrow-accent)" />
                )}
              </g>
            );
          })}
          <text x={LOGIC_BOX.x + LOGIC_BOX.w - 12} y={ABS_BOX_Y + 62} textAnchor="end" fontSize="11" fill={accent}>高频点刹 · 维持转向能力</text>

          {/* 底部总结 */}
          <line x1={40} y1={446} x2={VIEW_W - 40} y2={446} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={470} textAnchor="middle" fontSize="12" fill={secondary}>
            转向靠 EPS 精准助力 · 制动靠 ABS 防抱死保稳——电控让机械更智能
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        转向系统：方向盘→转向柱→EPS 电子助力→转向齿条→左右车轮，EPS 由扭矩传感器经 ECU 驱动助力电机形成闭环。制动系统：刹车踏板→真空助力器→ABS 模块→制动卡钳→刹车盘，ABS 由轮速传感器经 ECU 液压调节实现高频点刹防抱死，维持转向能力。
      </figcaption>
    </figure>
  );
}
