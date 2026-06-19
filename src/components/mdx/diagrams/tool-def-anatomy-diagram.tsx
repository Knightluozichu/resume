/**
 * <ToolDefAnatomyDiagram>：一个工具定义的解剖图（HEL-300，第 4 章）。
 *
 * 一张静态 SVG：把「定义一个工具」拆成四部分，让读者看清一个工具到底由什么构成 ——
 *   ① 名字（name）：LLM 用它来「点名」要调哪个工具
 *   ② 描述（description）：用人话讲清这个工具干啥、什么时候该调（LLM 靠它判断）
 *   ③ 参数（parameters / schema）：声明要传哪些参数、各是什么类型
 *   ④ 实现（function）：真正干活的那段 Python 函数体
 * 前三部分是「给 LLM 看的说明书（schema）」，第四部分是「给机器跑的实现」——
 * 这条分界是本章的关键认知：LLM 不执行工具，它只产出「调哪个、传什么」，由我们的代码去跑。
 *
 * 纯展示 Server 组件（无交互、无 three、reduced-motion 无关）。
 * 配色全部走 DESIGN token（无裸 hex）；几何常量均具名且为 4 的倍数（硬规则 5）。
 * 几何自检：四部分框零重叠、文字中心落在自己框内、四周留白 ≥ 12px、字号 ≥ 10px。
 */

// —— 整体画布。 ——
const VIEW_W = 700;
const VIEW_H = 480;

// —— 顶部「一个工具定义」标题条。 ——
const TITLE_X = 24;
const TITLE_W = 652;
const TITLE_Y = 24;
const TITLE_H = 44;

// —— 四部分框（竖排，统一尺寸；单一 y 公式）。 ——
const PART_X = 24;
const PART_W = 652;
const PART_H = 76;
const PART_Y0 = 96; // 第 0 部分顶
const PART_GAP = 16;

/** 第 i 部分左上角 y（单一公式）。 */
function partY(i: number): number {
  return PART_Y0 + i * (PART_H + PART_GAP);
}

type ToolPart = {
  /** 部分标题 */
  title: string;
  /** 一句话作用 */
  role: string;
  /** 对应代码（等宽显示） */
  code: string;
  /** 归属：schema（给 LLM 看）/ impl（给机器跑） */
  group: "schema" | "impl";
};

const PARTS: readonly ToolPart[] = [
  {
    title: "① 名字 name",
    role: "LLM 用它「点名」要调哪个工具",
    code: "\"get_weather\"",
    group: "schema",
  },
  {
    title: "② 描述 description",
    role: "用人话讲清干啥、何时该调——LLM 靠它判断要不要用",
    code: "\"查某城市今天的天气\"",
    group: "schema",
  },
  {
    title: "③ 参数 parameters",
    role: "声明要传哪些参数、各是什么类型",
    code: "{ \"city\": \"string\" }",
    group: "schema",
  },
  {
    title: "④ 实现 function",
    role: "真正干活的那段 Python 函数体",
    code: "def get_weather(city): …",
    group: "impl",
  },
];

const GROUP_LABEL: Record<ToolPart["group"], string> = {
  schema: "给 LLM 看的说明书",
  impl: "给机器跑的实现",
};

export function ToolDefAnatomyDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="一个工具定义的解剖图。顶部标题条写着「一个工具 = 说明书 + 实现」。下面竖排四部分。第一部分是名字 name，作用是 LLM 用它来点名要调哪个工具，对应代码是字符串 get_weather。第二部分是描述 description，作用是用人话讲清这个工具干啥、什么时候该调，LLM 靠它判断要不要用，对应代码是一句中文描述。第三部分是参数 parameters，作用是声明要传哪些参数、各是什么类型，对应代码是一个 city 为 string 的字典。这前三部分右侧都标着「给 LLM 看的说明书」，也就是 schema。第四部分是实现 function，作用是真正干活的那段 Python 函数体，对应代码是 def get_weather city，右侧标着「给机器跑的实现」。核心结论：一个工具由四部分构成，前三部分是给 LLM 看的说明书 schema，让它知道有这个工具、什么时候调、怎么传参；第四部分才是真正执行的代码。关键认知是 LLM 不执行工具，它只产出调哪个、传什么，由我们的代码去跑。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* —— 顶部标题条 —— */}
          <rect
            x={TITLE_X}
            y={TITLE_Y}
            width={TITLE_W}
            height={TITLE_H}
            rx="10"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x={TITLE_X + TITLE_W / 2}
            y={TITLE_Y + 28}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🔧 一个工具 = 给 LLM 看的说明书（前三部分）+ 给机器跑的实现（第四部分）
          </text>

          {/* —— 四部分框 —— */}
          {PARTS.map((p, i) => {
            const y = partY(i);
            const isImpl = p.group === "impl";
            const groupColor = isImpl ? "var(--success)" : "var(--accent)";
            return (
              <g key={`tool-part-${i}`}>
                <rect
                  x={PART_X}
                  y={y}
                  width={PART_W}
                  height={PART_H}
                  rx="10"
                  fill="var(--bg)"
                  stroke={groupColor}
                  strokeWidth="1.5"
                />
                {/* 标题 + 作用（左半） */}
                <text
                  x={PART_X + 20}
                  y={y + 30}
                  fontSize="14"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {p.title}
                </text>
                <text
                  x={PART_X + 20}
                  y={y + 54}
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {p.role}
                </text>
                {/* 对应代码（右半，等宽） */}
                <text
                  x={PART_X + PART_W - 20}
                  y={y + 32}
                  textAnchor="end"
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fill={groupColor}
                >
                  {p.code}
                </text>
                {/* 归属标签（右下角） */}
                <text
                  x={PART_X + PART_W - 20}
                  y={y + 54}
                  textAnchor="end"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {GROUP_LABEL[p.group]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        一个工具拆成四部分：名字 / 描述 / 参数是「给 LLM 看的 schema」（它据此决定调不调、怎么传），实现才是真正跑的代码。LLM
        只负责「点名 + 传参」，执行由你的代码完成。
      </figcaption>
    </figure>
  );
}
