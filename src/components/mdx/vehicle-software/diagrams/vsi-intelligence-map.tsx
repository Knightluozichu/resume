/**
 * <VsiIntelligenceMap>：车载软件与智能化全书学习地图（入门章）。
 *
 * 四大板块以 2×2 网格排布，编号 ①→②→③→④：
 *   - ① 智能座舱（accent 紫）：HMI 交互、多屏互动、IVI 娱乐、车控
 *   - ② 车载中间件（success 绿）：AUTOSAR AP、SOME/IP、DDS、OTA 升级
 *   - ③ 感知融合（warning 黄）：传感器体系、前/后融合、检测分割
 *   - ④ 规控与系统工程（accent 紫）：路径规划、MPC/PID、ISO 26262、信息安全
 * 底部一条递进带：硬件层 → 软件层 → 算法层 → 系统层，箭头表示认知深入方向。
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

const BLOCK_W = 300;
const BLOCK_H = 132;
const GAP = 36;
const MARGIN_X = (VIEW_W - 2 * BLOCK_W - GAP) / 2; // 42
const TOP_Y = 92;

interface Block {
  no: string;
  title: string;
  subtitle: string;
  color: string;
  items: string[];
  x: number;
  y: number;
}

const BLOCKS: readonly Block[] = [
  {
    no: "①",
    title: "智能座舱",
    subtitle: "Cockpit & HMI",
    color: accent,
    items: ["HMI 交互", "多屏互动", "IVI 娱乐", "车控互联"],
    x: MARGIN_X,
    y: TOP_Y,
  },
  {
    no: "②",
    title: "车载中间件",
    subtitle: "Middleware",
    color: success,
    items: ["AUTOSAR AP", "SOME/IP", "DDS", "OTA 升级"],
    x: MARGIN_X + BLOCK_W + GAP,
    y: TOP_Y,
  },
  {
    no: "③",
    title: "感知融合",
    subtitle: "Perception & Fusion",
    color: warning,
    items: ["传感器体系", "前 / 后融合", "检测与分割"],
    x: MARGIN_X,
    y: TOP_Y + BLOCK_H + GAP,
  },
  {
    no: "④",
    title: "规控与系统工程",
    subtitle: "Planning & Safety",
    color: accent,
    items: ["路径规划", "MPC / PID", "ISO 26262", "信息安全"],
    x: MARGIN_X + BLOCK_W + GAP,
    y: TOP_Y + BLOCK_H + GAP,
  },
];

const LAYERS = ["硬件层", "软件层", "算法层", "系统层"] as const;

export function VsiIntelligenceMap() {
  const tl = BLOCKS[0];
  const tr = BLOCKS[1];
  const bl = BLOCKS[2];
  const br = BLOCKS[3];

  // 底部递进带几何
  const bandY = 414;
  const bandH = 30;
  const bandX0 = 60;
  const bandX1 = VIEW_W - 60;
  const segW = (bandX1 - bandX0) / LAYERS.length;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="车载软件与智能化全书学习地图。四大板块 2×2 排布：左上①智能座舱（紫色，含 HMI 交互、多屏互动、IVI 娱乐、车控互联）；右上②车载中间件（绿色，含 AUTOSAR AP、SOME/IP、DDS、OTA 升级）；左下③感知融合（黄色，含传感器体系、前/后融合、检测与分割）；右下④规控与系统工程（紫色，含路径规划、MPC/PID、ISO 26262、信息安全）。底部递进带从硬件层到系统层。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="vim-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={40} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            车载软件与智能化 · 全书学习地图
          </text>
          <text x={VIEW_W / 2} y={62} textAnchor="middle" fontSize="11" fill={secondary}>
            座舱先入局 → 中间件搭骨 → 感知融合开眼 → 规控安全落地
          </text>

          {/* 四个板块 */}
          {BLOCKS.map((b) => (
            <g key={b.title}>
              <rect
                x={b.x}
                y={b.y}
                width={BLOCK_W}
                height={BLOCK_H}
                rx="12"
                fill={b.color}
                fillOpacity="0.06"
                stroke={b.color}
                strokeWidth="1.6"
              />
              <circle cx={b.x + 26} cy={b.y + 26} r="15" fill={b.color} fillOpacity="0.18" stroke={b.color} strokeWidth="1.4" />
              <text x={b.x + 26} y={b.y + 31} textAnchor="middle" fontSize="14" fontWeight="700" fill={b.color}>
                {b.no}
              </text>
              <text x={b.x + 52} y={b.y + 28} fontSize="15" fontWeight="700" fill={b.color}>
                {b.title}
              </text>
              <text x={b.x + 52} y={b.y + 46} fontSize="11" fill={secondary}>
                {b.subtitle}
              </text>
              {b.items.map((item, ii) => (
                <text key={item} x={b.x + 20} y={b.y + 74 + ii * 20} fontSize="12" fontWeight="600" fill={primary}>
                  · {item}
                </text>
              ))}
            </g>
          ))}

          {/* 进阶箭头：①→② 顶部横向 */}
          <line
            x1={tl.x + BLOCK_W + 6}
            y1={tl.y + BLOCK_H / 2}
            x2={tr.x - 6}
            y2={tr.y + BLOCK_H / 2}
            stroke={secondary}
            strokeWidth="1.6"
            markerEnd="url(#vim-arrow)"
          />
          <text x={(tl.x + BLOCK_W + tr.x) / 2} y={tl.y + BLOCK_H / 2 - 8} textAnchor="middle" fontSize="11" fill={secondary}>
            软件承上
          </text>

          {/* 进阶箭头：②→④ 右侧纵向 */}
          <line
            x1={tr.x + BLOCK_W / 2}
            y1={tr.y + BLOCK_H + 6}
            x2={br.x + BLOCK_W / 2}
            y2={br.y - 6}
            stroke={secondary}
            strokeWidth="1.6"
            markerEnd="url(#vim-arrow)"
          />
          <text x={tr.x + BLOCK_W / 2 + 12} y={(tr.y + BLOCK_H + br.y) / 2 + 4} fontSize="11" fill={secondary}>
            安全闭环
          </text>

          {/* 进阶箭头：③→④ 底部横向 */}
          <line
            x1={bl.x + BLOCK_W + 6}
            y1={bl.y + BLOCK_H / 2}
            x2={br.x - 6}
            y2={br.y + BLOCK_H / 2}
            stroke={secondary}
            strokeWidth="1.6"
            markerEnd="url(#vim-arrow)"
          />
          <text x={(bl.x + BLOCK_W + br.x) / 2} y={bl.y + BLOCK_H / 2 - 8} textAnchor="middle" fontSize="11" fill={secondary}>
            感知到规控
          </text>

          {/* 进阶箭头：①→③ 左侧纵向（虚线表示铺垫） */}
          <line
            x1={tl.x + BLOCK_W / 2}
            y1={tl.y + BLOCK_H + 6}
            x2={bl.x + BLOCK_W / 2}
            y2={bl.y - 6}
            stroke={secondary}
            strokeWidth="1.4"
            strokeDasharray="4 3"
            markerEnd="url(#vim-arrow)"
          />
          <text x={tl.x + BLOCK_W / 2 - 12} y={(tl.y + BLOCK_H + bl.y) / 2 + 4} textAnchor="end" fontSize="11" fill={secondary}>
            座舱铺垫
          </text>

          {/* 底部递进带：硬件层 → 软件层 → 算法层 → 系统层 */}
          <text x={VIEW_W / 2} y={bandY - 10} textAnchor="middle" fontSize="12" fontWeight="700" fill={secondary}>
            认知递进 · 从底层硬件到顶层系统
          </text>
          {LAYERS.map((layer, i) => {
            const sx = bandX0 + i * segW;
            const cx = sx + segW / 2;
            return (
              <g key={layer}>
                <rect
                  x={sx + 4}
                  y={bandY}
                  width={segW - 8}
                  height={bandH}
                  rx="6"
                  fill={accent}
                  fillOpacity={0.05 + i * 0.04}
                  stroke={accent}
                  strokeWidth="1.2"
                  strokeOpacity="0.5"
                />
                <text x={cx} y={bandY + 19} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
                  {layer}
                </text>
                {i < LAYERS.length - 1 && (
                  <line
                    x1={sx + segW - 6}
                    y1={bandY + bandH / 2}
                    x2={sx + segW + 10}
                    y2={bandY + bandH / 2}
                    stroke={secondary}
                    strokeWidth="1.4"
                    markerEnd="url(#vim-arrow)"
                  />
                )}
              </g>
            );
          })}

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={496} textAnchor="middle" fontSize="12" fill={secondary}>
            座舱是面 · 中间件是骨 · 感知是眼 · 规控安全是魂
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书四大板块：① 智能座舱（HMI、多屏互动、IVI、车控）；② 车载中间件（AUTOSAR AP、SOME/IP、DDS、OTA）；③ 感知融合（传感器、前/后融合、检测分割）；④ 规控与系统工程（规划、MPC/PID、ISO 26262、信息安全）。底部递进带从硬件层贯通到系统层。
      </figcaption>
    </figure>
  );
}
