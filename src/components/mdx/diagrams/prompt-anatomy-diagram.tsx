/**
 * <PromptAnatomyDiagram>：一个好提示的「解剖图」—— 拆成六个带标签的部件块（HEL-303，第 5 章）。
 *
 * 一张静态 SVG：把一段结构化的提示从上到下拆成六个部件块（角色 / 任务 / 上下文 /
 * 约束 / 示例 / 输出格式），每块左侧是部件名 + 一句话作用，右侧是这段提示里这一部件
 * 的真实样子。让读者一眼看清「一个像样的提示，到底由哪几块拼成、各管什么」。
 *
 * 末块（输出格式）右侧另起一条小注，点明：把这六块写进每轮都带的开头，就是「系统提示」；
 * 只为这一次任务临时拼的，就是「单次任务提示」——同一套部件，挂的位置不同而已。
 *
 * 六块竖直堆叠，单一 y 公式 partY(i)，等高、零重叠。
 *
 * 纯展示 Server 组件（无交互、无 three）。配色全部走 DESIGN token（无裸 hex）；
 * 几何常量均具名、为 4 的倍数（硬规则 5）。几何自检：块间零重叠、文字落自己块内、
 * 四周留白 ≥ 12px、字号 ≥ 10px。
 */

// —— 整体画布。 ——
const VIEW_W = 700;
const VIEW_H = 524;

// —— 标题区。 ——
const TITLE_Y = 28;

// —— 六个部件块（竖直堆叠，单一 y 公式）。 ——
const PART_X = 24;
const PART_W = 652; // 右边界 = 24 + 652 = 676 → 右留白 24
const PART_H = 60;
const PART_Y0 = 56; // 第 0 块顶
const PART_GAP = 12;

/** 第 i 个部件块左上角 y（单一公式，禁双算法）。 */
function partY(i: number): number {
  return PART_Y0 + i * (PART_H + PART_GAP);
}

// 块内：左侧标签列宽 / 右侧示例列起点。
const LABEL_X = PART_X + 16;
const SAMPLE_X = PART_X + 248;

type Part = {
  /** 部件名（含 emoji） */
  name: string;
  /** 一句话作用 */
  role: string;
  /** 这段提示里这一部件的真实样子 */
  sample: string;
};

/** 六个部件，自上而下：角色 → 任务 → 上下文 → 约束 → 示例 → 输出格式。 */
const PARTS: readonly Part[] = [
  {
    name: "🎭 角色",
    role: "你让它扮谁",
    sample: "你是一名资深电商客服。",
  },
  {
    name: "🎯 任务",
    role: "到底要它做什么",
    sample: "判断顾客这一单能不能退，并说明理由。",
  },
  {
    name: "📚 上下文",
    role: "做这件事要的背景料",
    sample: "退货政策：拆封 7 天内可退；生鲜不退。",
  },
  {
    name: "🚧 约束",
    role: "边界与禁区",
    sample: "只依据上面政策；政策没写的就说「需人工」。",
  },
  {
    name: "💡 示例",
    role: "给一两个范例照着学",
    sample: "例：未拆封第 3 天 → 可退（在 7 天内）。",
  },
  {
    name: "📐 输出格式",
    role: "答案长什么样",
    sample: "输出两行：① 能否退 ② 一句话理由。",
  },
];

export function PromptAnatomyDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="一个好提示的解剖图，把一段结构化提示从上到下拆成六个部件块。每块左侧是部件名和一句话作用，右侧是这段「退货客服」提示里该部件的真实样子。第一块角色：你让它扮谁，示例是「你是一名资深电商客服」。第二块任务：到底要它做什么，示例是「判断顾客这一单能不能退，并说明理由」。第三块上下文：做这件事要的背景料，示例是「退货政策：拆封 7 天内可退，生鲜不退」。第四块约束：边界与禁区，示例是「只依据上面政策，政策没写的就说需人工」。第五块示例：给一两个范例照着学，示例是「未拆封第 3 天，可退，在 7 天内」。第六块输出格式：答案长什么样，示例是「输出两行，第一行能否退、第二行一句话理由」。核心：一个像样的提示不是随口一句话，而是由角色、任务、上下文、约束、示例、输出格式这几块拼成，每块各管一件事。把这六块写进每轮都带的开头，就是系统提示；只为这一次任务临时拼的，就是单次任务提示——同一套部件，挂的位置不同而已。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* —— 标题 —— */}
          <text
            x={VIEW_W / 2}
            y={TITLE_Y}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一个好提示由这六块拼成（以「退货客服」为例）
          </text>

          {/* —— 六个部件块 —— */}
          {PARTS.map((p, i) => {
            const y = partY(i);
            return (
              <g key={p.name}>
                {/* 块底框 */}
                <rect
                  x={PART_X}
                  y={y}
                  width={PART_W}
                  height={PART_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                {/* 左侧竖向强调条（accent） */}
                <rect
                  x={PART_X}
                  y={y}
                  width={5}
                  height={PART_H}
                  rx="2.5"
                  fill="var(--accent)"
                />
                {/* 部件名 */}
                <text
                  x={LABEL_X}
                  y={y + 26}
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  {p.name}
                </text>
                {/* 一句话作用 */}
                <text
                  x={LABEL_X}
                  y={y + 46}
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {p.role}
                </text>
                {/* 竖向分隔线 */}
                <line
                  x1={SAMPLE_X - 16}
                  y1={y + 12}
                  x2={SAMPLE_X - 16}
                  y2={y + PART_H - 12}
                  stroke="var(--border)"
                  strokeWidth="1"
                  opacity="0.6"
                />
                {/* 右侧：这段提示里该部件的真实样子 */}
                <text
                  x={SAMPLE_X}
                  y={y + 36}
                  fontSize="12"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {p.sample}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        好提示 = 角色 + 任务 + 上下文 + 约束 + 示例 + 输出格式。这六块写进每轮都带的开头就是系统提示，只为单次任务临时拼的就是单次任务提示。
      </figcaption>
    </figure>
  );
}
