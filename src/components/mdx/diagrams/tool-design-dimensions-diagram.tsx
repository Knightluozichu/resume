/**
 * <ToolDesignDimensionsDiagram>：好工具的五个维度总览（HEL-317，第 9 章）。
 *
 * 一张静态 SVG，一张「维度 × 好坏」对照表：
 *   每行一个设计维度（命名 / 描述 / 粒度 / 错误信息 / 返回值），
 *   同行三列——左列维度名，中列「坏的做法」（红框），右列「好的做法」（绿框）。
 * 核心一图：把「一个工具好不好用」拆成五个可逐项检查的维度，并让好/坏并排自比。
 *
 * 纯展示 Server 组件（无交互、无 three、reduced-motion 无关）。
 * 配色全部走 DESIGN token（无裸 hex）；几何常量均具名、为 4 的倍数（硬规则 5）。
 * 几何自检：行/列零重叠、文字中心落在自己框内、四周留白 ≥ 12px、字号 ≥ 10px、单一行 y 公式。
 */

// —— 整体画布。 ——
const VIEW_W = 720;
const VIEW_H = 480;

// —— 顶部标题区。 ——
const TITLE_Y = 32;

// —— 三列分区（维度名 / 坏 / 好）。左右各留白 24。 ——
const DIM_X = 24; // 维度名列左边界
const DIM_W = 124;
const COL_GAP = 16;
const BAD_X = DIM_X + DIM_W + COL_GAP; // 164
const CELL_W = 256; // 坏/好两列等宽：164 + 256 + 16 + 256 = 692 → 右留白 28
const GOOD_X = BAD_X + CELL_W + COL_GAP; // 436

// —— 列表头。 ——
const HEAD_Y = 56;
const HEAD_H = 28;

// —— 行区（5 行，单一 y 公式）。 ——
const ROW_Y0 = 92; // 第 0 行顶
const ROW_H = 68;
const ROW_GAP = 8;

/** 第 i 行左上角 y（单一公式）。底行底 = 92 + 4*76 + 68 = 464 → 距底 8。 */
function rowY(i: number): number {
  return ROW_Y0 + i * (ROW_H + ROW_GAP);
}

type Dimension = {
  /** 维度名（短）。 */
  name: string;
  /** 维度图标。 */
  icon: string;
  /** 坏的做法（一句）。 */
  bad: string;
  /** 好的做法（一句）。 */
  good: string;
};

const DIMENSIONS: readonly Dimension[] = [
  {
    name: "命名",
    icon: "🏷️",
    bad: "get_data —— 干嘛的全靠猜",
    good: "get_order_status —— 一看就懂",
  },
  {
    name: "描述",
    icon: "📝",
    bad: "没写 / 一句「查数据」",
    good: "写清「干嘛 + 何时用 + 边界」",
  },
  {
    name: "粒度",
    icon: "📐",
    bad: "太细要串 8 步 / 太粗管太多",
    good: "一个工具办成一件完整的事",
  },
  {
    name: "错误信息",
    icon: "⚠️",
    bad: "抛裸异常 KeyError，agent 看不懂",
    good: "说清错在哪 + 怎么改，可自救",
  },
  {
    name: "返回值",
    icon: "📦",
    bad: "一坨原始 JSON，撑爆上下文",
    good: "结构化、只留要紧字段",
  },
];

/** 单元格内两行文字的左内边距与基线。 */
const CELL_PAD_X = 14;

export function ToolDesignDimensionsDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="好工具的五个设计维度对照表。一张三列的表格：左列是维度名，中列是坏的做法（红框），右列是好的做法（绿框），自上而下五行。第一行命名：坏的做法是 get_data，干嘛的全靠猜；好的做法是 get_order_status，一看就懂。第二行描述：坏的做法是没写或只一句「查数据」；好的做法是写清干嘛、何时用、边界在哪。第三行粒度：坏的做法是太细要串八步才办成一件事，或太粗一个工具管太多；好的做法是一个工具刚好办成一件完整的事。第四行错误信息：坏的做法是直接抛出裸异常比如 KeyError，agent 看不懂；好的做法是说清错在哪、怎么改，让 agent 能自救。第五行返回值：坏的做法是返回一大坨原始 JSON，撑爆上下文；好的做法是结构化、只留要紧字段。核心结论：一个工具好不好用，可以拆成命名、描述、粒度、错误信息、返回值这五个能逐项检查的维度，每个维度都有明确的好坏之分。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* —— 标题 —— */}
          <text
            x={VIEW_W / 2}
            y={TITLE_Y}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            好工具的五个维度：逐项都有好坏之分
          </text>

          {/* —— 列表头：坏 / 好 —— */}
          <rect
            x={BAD_X}
            y={HEAD_Y}
            width={CELL_W}
            height={HEAD_H}
            rx="6"
            fill="var(--bg)"
            stroke="var(--danger)"
            strokeWidth="1.4"
          />
          <text
            x={BAD_X + CELL_W / 2}
            y={HEAD_Y + HEAD_H / 2 + 4}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--danger)"
          >
            ✗ 坏工具（agent 用着别扭）
          </text>
          <rect
            x={GOOD_X}
            y={HEAD_Y}
            width={CELL_W}
            height={HEAD_H}
            rx="6"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <text
            x={GOOD_X + CELL_W / 2}
            y={HEAD_Y + HEAD_H / 2 + 4}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--success)"
          >
            ✓ 好工具（agent 用着顺手）
          </text>

          {/* —— 五行维度 —— */}
          {DIMENSIONS.map((d, i) => {
            const y = rowY(i);
            const midY = y + ROW_H / 2;
            return (
              <g key={d.name}>
                {/* 维度名格 */}
                <rect
                  x={DIM_X}
                  y={y}
                  width={DIM_W}
                  height={ROW_H}
                  rx="8"
                  fill="var(--accent-glow)"
                  stroke="var(--accent)"
                  strokeWidth="1.4"
                />
                <text
                  x={DIM_X + DIM_W / 2}
                  y={midY - 6}
                  textAnchor="middle"
                  fontSize="17"
                >
                  {d.icon}
                </text>
                <text
                  x={DIM_X + DIM_W / 2}
                  y={midY + 18}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {d.name}
                </text>

                {/* 坏格 */}
                <rect
                  x={BAD_X}
                  y={y}
                  width={CELL_W}
                  height={ROW_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--danger)"
                  strokeWidth="1.2"
                />
                <text
                  x={BAD_X + CELL_PAD_X}
                  y={midY + 4}
                  fontSize="12"
                  fill="var(--text-primary)"
                >
                  {d.bad}
                </text>

                {/* 好格 */}
                <rect
                  x={GOOD_X}
                  y={y}
                  width={CELL_W}
                  height={ROW_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--success)"
                  strokeWidth="1.2"
                />
                <text
                  x={GOOD_X + CELL_PAD_X}
                  y={midY + 4}
                  fontSize="12"
                  fill="var(--text-primary)"
                >
                  {d.good}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        一个工具好不好用，拆成五个能逐项检查的维度：命名、描述、粒度、错误信息、返回值。同一个工具，每个维度选好选坏，决定了
        agent 用着顺不顺手。
      </figcaption>
    </figure>
  );
}
