/**
 * <Ec7TypesVariablesDiagram>：C# 类型系统——值类型与引用类型。
 *
 * 左右两栏对照：
 *   - 左栏 值类型（accent 紫）：栈上分配、直接存储数据、赋值=拷贝
 *     子项：简单类型(int/double/bool)、结构体(struct)、枚举(enum)、可空类型(int?)
 *   - 右栏 引用类型（warning 暖）：堆上分配、存储引用、赋值=共享
 *     子项：类(class)、数组、接口、委托、字符串(string)
 * 中间用分隔线与对比箭头表示差异。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

interface Side {
  title: string;
  subtitle: string;
  color: string;
  items: string[];
  x: number;
}

const PANAL_W = 290;
const LEFT_X = 40;
const RIGHT_X = VIEW_W - 40 - PANAL_W;

const SIDES: readonly Side[] = [
  {
    title: "值类型",
    subtitle: "栈分配 · 直接存数据 · 赋值=拷贝",
    color: accent,
    x: LEFT_X,
    items: ["简单类型 int / double / bool / char", "结构体 struct（如 DateTime）", "枚举 enum", "可空类型 int? / bool?"],
  },
  {
    title: "引用类型",
    subtitle: "堆分配 · 存引用 · 赋值=共享",
    color: warning,
    x: RIGHT_X,
    items: ["类 class（自定义类型）", "数组 int[] / string[]", "接口 interface", "委托 delegate / string"],
  },
];

const ITEM_H = 44;
const ITEM_GAP = 10;
const ITEM_START_Y = 130;

export function Ec7TypesVariablesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C# 类型系统对照。左栏值类型（紫色）：栈分配、直接存储数据、赋值等于拷贝，包含简单类型、结构体、枚举、可空类型；右栏引用类型（暖色）：堆分配、存储引用、赋值等于共享，包含类、数组、接口、委托、字符串。中间对比箭头表示差异。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            C# 类型系统：值类型 vs 引用类型
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill={secondary}>
            栈 vs 堆 · 拷贝 vs 共享——理解类型决定行为
          </text>

          {/* 两栏 */}
          {SIDES.map((side) => {
            const panelH = ITEM_START_Y - 100 + side.items.length * (ITEM_H + ITEM_GAP) + 16;
            return (
              <g key={side.title}>
                <rect x={side.x} y={82} width={PANAL_W} height={panelH} rx="10" fill={elevated} stroke={side.color} strokeWidth="1.6" strokeOpacity="0.5" />
                <rect x={side.x} y={82} width={PANAL_W} height={36} rx="10" fill={side.color} fillOpacity="0.14" />
                <rect x={side.x} y={104} width={PANAL_W} height={14} fill={side.color} fillOpacity="0.14" />
                <text x={side.x + PANAL_W / 2} y={105} textAnchor="middle" fontSize="13" fontWeight="700" fill={side.color}>
                  {side.title}
                </text>
                <text x={side.x + PANAL_W / 2} y={119} textAnchor="middle" fontSize="10.5" fill={secondary}>
                  {side.subtitle}
                </text>
                {side.items.map((item, ii) => {
                  const y = ITEM_START_Y + ii * (ITEM_H + ITEM_GAP);
                  return (
                    <g key={item}>
                      <rect x={side.x + 12} y={y} width={PANAL_W - 24} height={ITEM_H} rx="8" fill={side.color} fillOpacity="0.06" stroke={side.color} strokeWidth="1.2" strokeOpacity="0.4" />
                      <text x={side.x + PANAL_W / 2} y={y + ITEM_H / 2 + 4} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={primary}>
                        {item}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 中间对比箭头 */}
          <line x1={LEFT_X + PANAL_W + 6} y1={210} x2={RIGHT_X - 6} y2={210} stroke={secondary} strokeWidth="1.4" strokeDasharray="5 3" />
          <text x={VIEW_W / 2} y={204} textAnchor="middle" fontSize="11" fontWeight="600" fill={secondary}>
            拷贝 ←
          </text>
          <text x={VIEW_W / 2} y={226} textAnchor="middle" fontSize="11" fontWeight="600" fill={secondary}>
            → 共享
          </text>

          {/* 底部说明 */}
          <line x1={32} y1={376} x2={VIEW_W - 32} y2={376} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={400} textAnchor="middle" fontSize="11.5" fill={secondary}>
            string 是引用类型但行为像值类型（不可变性） · int? 装箱后变引用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        值类型在栈上分配、赋值拷贝数据；引用类型在堆上分配、赋值共享引用。string 是特殊引用类型（不可变）。
      </figcaption>
    </figure>
  );
}
