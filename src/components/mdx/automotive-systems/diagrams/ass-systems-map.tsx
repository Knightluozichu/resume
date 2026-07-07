/**
 * <AssSystemsMap>：汽车系统专项全书学习地图（入门章）。
 *
 * 四大板块以 2×2 网格排布，标注进阶路径与编号 ①→②→③→④：
 *   - ① 发动机与动力（accent 紫）：热力学循环、增压、变速器、传动
 *   - ② 底盘与控制（success 绿）：悬架、转向、制动
 *   - ③ 汽车电子（warning 暖）：ECU/CAN、传感器执行器、车身电子
 *   - ④ 新能源三电（accent 紫）：电机电控、BMS、热管理
 * 板块间用箭头表示「机械动力 → 底盘承载 → 电子化 → 电动化」的进阶关系。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

// 2×2 网格几何
const BLOCK_W = 300;
const BLOCK_H = 140;
const GAP = 40;
const MARGIN_X = (VIEW_W - 2 * BLOCK_W - GAP) / 2; // 40
const TOP_Y = 96;

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
    title: "发动机与动力",
    subtitle: "Powertrain",
    color: accent,
    items: ["热力学循环", "增压技术", "变速器 / 传动"],
    x: MARGIN_X,
    y: TOP_Y,
  },
  {
    no: "②",
    title: "底盘与控制",
    subtitle: "Chassis",
    color: success,
    items: ["悬架系统", "转向系统", "制动系统"],
    x: MARGIN_X + BLOCK_W + GAP,
    y: TOP_Y,
  },
  {
    no: "③",
    title: "汽车电子",
    subtitle: "Electronics",
    color: warning,
    items: ["ECU / CAN 总线", "传感器与执行器", "车身电子"],
    x: MARGIN_X,
    y: TOP_Y + BLOCK_H + GAP,
  },
  {
    no: "④",
    title: "新能源三电",
    subtitle: "EV Power",
    color: accent,
    items: ["电机电控", "BMS 电池管理", "热管理"],
    x: MARGIN_X + BLOCK_W + GAP,
    y: TOP_Y + BLOCK_H + GAP,
  },
];

export function AssSystemsMap() {
  const tl = BLOCKS[0];
  const tr = BLOCKS[1];
  const bl = BLOCKS[2];
  const br = BLOCKS[3];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="汽车系统专项全书学习地图。四大板块以 2×2 网格排布：左上①发动机与动力（紫色，含热力学循环、增压技术、变速器与传动）；右上②底盘与控制（绿色，含悬架、转向、制动）；左下③汽车电子（黄色，含 ECU/CAN 总线、传感器与执行器、车身电子）；右下④新能源三电（紫色，含电机电控、BMS、热管理）。箭头表示从机械动力到电动化的进阶路径。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="asm-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="7"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={40} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            汽车系统专项 · 全书学习地图
          </text>
          <text x={VIEW_W / 2} y={62} textAnchor="middle" fontSize="11" fill={secondary}>
            机械动力 → 底盘承载 → 电子化 → 电动化，四块拼图构成完整视角
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
              {/* 编号徽章 */}
              <circle cx={b.x + 26} cy={b.y + 26} r="15" fill={b.color} fillOpacity="0.18" stroke={b.color} strokeWidth="1.4" />
              <text x={b.x + 26} y={b.y + 31} textAnchor="middle" fontSize="14" fontWeight="700" fill={b.color}>
                {b.no}
              </text>
              {/* 标题 */}
              <text x={b.x + 52} y={b.y + 28} fontSize="15" fontWeight="700" fill={b.color}>
                {b.title}
              </text>
              <text x={b.x + 52} y={b.y + 46} fontSize="11" fill={secondary}>
                {b.subtitle}
              </text>
              {/* 子条目 */}
              {b.items.map((item, ii) => (
                <text
                  key={item}
                  x={b.x + 20}
                  y={b.y + 74 + ii * 22}
                  fontSize="12"
                  fontWeight="600"
                  fill={primary}
                >
                  · {item}
                </text>
              ))}
            </g>
          ))}

          {/* 进阶箭头：①→②（顶部横向） */}
          <line
            x1={tl.x + BLOCK_W + 6}
            y1={tl.y + BLOCK_H / 2}
            x2={tr.x - 6}
            y2={tr.y + BLOCK_H / 2}
            stroke={secondary}
            strokeWidth="1.6"
            markerEnd="url(#asm-arrow)"
          />
          <text x={(tl.x + BLOCK_W + tr.x) / 2} y={tl.y + BLOCK_H / 2 - 8} textAnchor="middle" fontSize="11" fill={secondary}>
            动力延伸
          </text>

          {/* 进阶箭头：②→④（右侧纵向） */}
          <line
            x1={tr.x + BLOCK_W / 2}
            y1={tr.y + BLOCK_H + 6}
            x2={br.x + BLOCK_W / 2}
            y2={br.y - 6}
            stroke={secondary}
            strokeWidth="1.6"
            markerEnd="url(#asm-arrow)"
          />
          <text x={tr.x + BLOCK_W / 2 + 12} y={(tr.y + BLOCK_H + br.y) / 2 + 4} fontSize="11" fill={secondary}>
            智能升级
          </text>

          {/* 进阶箭头：③→④（底部横向） */}
          <line
            x1={bl.x + BLOCK_W + 6}
            y1={bl.y + BLOCK_H / 2}
            x2={br.x - 6}
            y2={br.y + BLOCK_H / 2}
            stroke={secondary}
            strokeWidth="1.6"
            markerEnd="url(#asm-arrow)"
          />
          <text x={(bl.x + BLOCK_W + br.x) / 2} y={bl.y + BLOCK_H / 2 - 8} textAnchor="middle" fontSize="11" fill={secondary}>
            电动进化
          </text>

          {/* 进阶箭头：①→③（左侧纵向，虚线表示铺垫关系） */}
          <line
            x1={tl.x + BLOCK_W / 2}
            y1={tl.y + BLOCK_H + 6}
            x2={bl.x + BLOCK_W / 2}
            y2={bl.y - 6}
            stroke={secondary}
            strokeWidth="1.4"
            strokeDasharray="4 3"
            markerEnd="url(#asm-arrow)"
          />
          <text x={tl.x + BLOCK_W / 2 - 12} y={(tl.y + BLOCK_H + bl.y) / 2 + 4} textAnchor="end" fontSize="11" fill={secondary}>
            机电结合
          </text>

          {/* 底部总结 */}
          <line x1={40} y1={414} x2={VIEW_W - 40} y2={414} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={438} textAnchor="middle" fontSize="12" fill={secondary}>
            动力是源 · 底盘是骨 · 电子是神经 · 三电是未来
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书四大板块：① 发动机与动力（热力学、增压、变速器、传动）奠定动力源；② 底盘与控制（悬架、转向、制动）承载与控车；③ 汽车电子（ECU/CAN、传感器、车身电子）实现智能化；④ 新能源三电（电机电控、BMS、热管理）面向电动未来。
      </figcaption>
    </figure>
  );
}
