/**
 * <AssBodyElectronicsDiagram>：车身电子系统图。
 *
 * 以 BCM（车身控制模块）为中心，连接四大子系统：
 *   - 照明 Lighting（LIN）：大灯、转向灯、雾灯
 *   - 安防 Security（CAN）：门锁、防盗、遥控钥匙
 *   - 舒适 Comfort（LIN）：空调、座椅、车窗
 *   - 信息 Info（CAN）：仪表、HUD
 * BCM 作为网关，向上经 CAN 总线对接整车，向下经 LIN 总线驱动低成本子网节点。
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

const LIN = warning; // 低成本子网
const CAN = accent; // 主干总线

interface Sub {
  key: string;
  name: string;
  en: string;
  color: string;
  bus: "LIN" | "CAN";
  items: string[];
  x: number;
  y: number;
}

const SUB_W = 180;
const SUB_H = 128;

const SUBS: readonly Sub[] = [
  { key: "light", name: "照明", en: "Lighting", color: success, bus: "LIN", items: ["大灯", "转向灯", "雾灯"], x: 56, y: 92 },
  { key: "sec", name: "安防", en: "Security", color: accent, bus: "CAN", items: ["门锁", "防盗", "遥控钥匙"], x: 484, y: 92 },
  { key: "comfort", name: "舒适", en: "Comfort", color: success, bus: "LIN", items: ["空调", "座椅", "车窗"], x: 56, y: 268 },
  { key: "info", name: "信息", en: "Info", color: accent, bus: "CAN", items: ["仪表", "HUD"], x: 484, y: 268 },
];

const BCM = { x: 300, y: 186, w: 120, h: 108, cx: 360, cy: 240 };

export function AssBodyElectronicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="车身电子系统图。中心 BCM 车身控制模块连接四大子系统：左上照明（LIN 总线，含大灯、转向灯、雾灯）；右上安防（CAN 总线，含门锁、防盗、遥控钥匙）；左下舒适（LIN 总线，含空调、座椅、车窗）；右下信息（CAN 总线，含仪表、HUD）。BCM 作为网关，向上对接 CAN 主干，向下驱动 LIN 低成本子网。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="abe-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            车身电子系统 · BCM 为中枢
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill={secondary}>
            BCM 网关：上接 CAN 主干，下驱 LIN 子网
          </text>

          {/* 连接线（先画，置于底层） */}
          {SUBS.map((s) => {
            const isLeft = s.x < BCM.cx;
            const isTop = s.y < BCM.cy;
            const subEdgeX = isLeft ? s.x + SUB_W : s.x;
            const subEdgeY = s.y + SUB_H / 2;
            const bcmEdgeX = isLeft ? BCM.x : BCM.x + BCM.w;
            const bcmEdgeY = isTop ? BCM.y + 24 : BCM.y + BCM.h - 24;
            const busColor = s.bus === "LIN" ? LIN : CAN;
            return (
              <g key={`line-${s.key}`}>
                <line
                  x1={subEdgeX}
                  y1={subEdgeY}
                  x2={bcmEdgeX}
                  y2={bcmEdgeY}
                  stroke={busColor}
                  strokeWidth="2"
                  strokeDasharray={s.bus === "LIN" ? "5 3" : "none"}
                />
                <rect x={(subEdgeX + bcmEdgeX) / 2 - 18} y={(subEdgeY + bcmEdgeY) / 2 - 9} width="36" height="18" rx="4" fill="var(--bg-elevated)" stroke={busColor} strokeWidth="1" />
                <text x={(subEdgeX + bcmEdgeX) / 2} y={(subEdgeY + bcmEdgeY) / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={busColor}>{s.bus}</text>
              </g>
            );
          })}

          {/* BCM 中心 */}
          <rect x={BCM.x} y={BCM.y} width={BCM.w} height={BCM.h} rx="12" fill={primary} fillOpacity="0.08" stroke={primary} strokeWidth="2" />
          <text x={BCM.cx} y={BCM.y + 30} textAnchor="middle" fontSize="15" fontWeight="700" fill={primary}>BCM</text>
          <text x={BCM.cx} y={BCM.y + 48} textAnchor="middle" fontSize="11" fill={secondary}>车身控制模块</text>
          <line x1={BCM.x + 16} y1={BCM.y + 58} x2={BCM.x + BCM.w - 16} y2={BCM.y + 58} stroke={border} strokeWidth="1" />
          <text x={BCM.cx} y={BCM.y + 76} textAnchor="middle" fontSize="11" fill={primary}>网关 / 协议路由</text>
          <text x={BCM.cx} y={BCM.y + 94} textAnchor="middle" fontSize="11" fill={primary}>负载驱动 · 诊断</text>

          {/* 四个子系统 */}
          {SUBS.map((s) => {
            const busColor = s.bus === "LIN" ? LIN : CAN;
            return (
              <g key={s.key}>
                <rect x={s.x} y={s.y} width={SUB_W} height={SUB_H} rx="10" fill={s.color} fillOpacity="0.05" stroke={s.color} strokeWidth="1.4" />
                <rect x={s.x} y={s.y} width={SUB_W} height="28" rx="10" fill={s.color} fillOpacity="0.14" />
                <rect x={s.x} y={s.y + 16} width={SUB_W} height="12" fill={s.color} fillOpacity="0.14" />
                <text x={s.x + SUB_W / 2} y={s.y + 19} textAnchor="middle" fontSize="13" fontWeight="700" fill={s.color}>{s.name}</text>
                <text x={s.x + SUB_W / 2} y={s.y + 42} textAnchor="middle" fontSize="11" fill={secondary}>{s.en}</text>
                {s.items.map((it, i) => (
                  <g key={it}>
                    <rect x={s.x + 18} y={s.y + 58 + i * 20} width={SUB_W - 36} height="16" rx="4" fill={busColor} fillOpacity="0.1" stroke={busColor} strokeWidth="0.8" strokeOpacity="0.5" />
                    <text x={s.x + SUB_W / 2} y={s.y + 70 + i * 20} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{it}</text>
                  </g>
                ))}
              </g>
            );
          })}

          {/* 图例 */}
          <g>
            <line x1={120} y1={416} x2={150} y2={416} stroke={CAN} strokeWidth="2" />
            <text x={156} y={420} fontSize="11" fill={secondary}>CAN 总线（主干 / 高速）</text>
            <line x1={400} y1={416} x2={430} y2={416} stroke={LIN} strokeWidth="2" strokeDasharray="5 3" />
            <text x={436} y={420} fontSize="11" fill={secondary}>LIN 总线（子网 / 低成本）</text>
          </g>

          {/* 底部总结 */}
          <line x1={40} y1={436} x2={VIEW_W - 40} y2={436} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={458} textAnchor="middle" fontSize="10" fill={secondary}>
            BCM 统筹车身功能：CAN 承载关键高速数据，LIN 驱动量大面广的低速节点
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        车身电子系统以 BCM 为中枢，连接照明（大灯、转向灯、雾灯，LIN）、安防（门锁、防盗、遥控，CAN）、舒适（空调、座椅、车窗，LIN）、信息（仪表、HUD，CAN）四大子系统。BCM 作为网关，上接 CAN 主干总线，下驱 LIN 低成本子网。
      </figcaption>
    </figure>
  );
}
