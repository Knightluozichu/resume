/**
 * <AgentSkeletonDiagram>：最小 Agent 的四块骨架（HEL-300，第 4 章）。
 *
 * 一张静态 SVG：一个虚线外框「最小 Agent」把四块骨架竖排框在一起，自上而下是
 *   ① 系统提示（身份与规矩）② 工具表（能调哪些工具 + schema）
 *   ③ LLM 调用（让模型决定下一步）④ 带刹车的循环（for + max_steps + is_done）。
 * 每块右侧挂一个「对应代码」标签，把这一块在代码里长什么样点出来，让读者把
 * 「概念骨架」和「待会儿要写的代码」一一对上——这是 C 实战型「拼零件」的总览图。
 *
 * 这呼应前三章：系统提示 / 工具 = 第 1、2 章的「指令 / 工具」外挂，循环 = 第 3 章的
 * for+max_steps 骨架；本章把它们亲手拼成一台能转的机器。
 *
 * 纯展示 Server 组件（无交互、无 three、reduced-motion 无关）。
 * 配色全部走 DESIGN token（无裸 hex）；几何常量均具名且为 4 的倍数（硬规则 5）。
 * 几何自检：四块与代码标签零重叠、文字中心落在自己框内、四周留白 ≥ 12px、字号 ≥ 10px。
 */

// —— 整体画布。 ——
const VIEW_W = 700;
const VIEW_H = 460;

// —— 外框「最小 Agent」容器（虚线框，把四块包住）。 ——
const AGENT_X = 24;
const AGENT_Y = 24;
const AGENT_W = 388;
const AGENT_H = 412;

// —— 四块骨架（容器内竖排，统一尺寸；单一 y 公式）。 ——
const BLOCK_X = 48;
const BLOCK_W = 340;
const BLOCK_H = 72;
const BLOCK_Y0 = 64; // 第 0 块顶
const BLOCK_GAP = 20;

/** 第 i 块骨架左上角 y（单一公式）。 */
function blockY(i: number): number {
  return BLOCK_Y0 + i * (BLOCK_H + BLOCK_GAP);
}

// —— 右侧「对应代码」标签（与每块对齐，统一尺寸）。 ——
const CODE_X = 452;
const CODE_W = 224;
const CODE_H = 64;

/** 第 i 个代码标签左上角 y（与块垂直居中对齐）。 */
function codeY(i: number): number {
  return blockY(i) + (BLOCK_H - CODE_H) / 2;
}

type SkelBlock = {
  /** 骨架块标题 */
  title: string;
  /** 一句话人话作用 */
  role: string;
  /** 对应代码（等宽显示） */
  code: string;
};

const BLOCKS: readonly SkelBlock[] = [
  {
    title: "① 系统提示",
    role: "告诉它身份、目标和规矩",
    code: "SYSTEM_PROMPT = \"…\"",
  },
  {
    title: "② 工具表",
    role: "能调哪些工具 + 给 LLM 看的 schema",
    code: "TOOLS = { … }",
  },
  {
    title: "③ LLM 调用",
    role: "让模型看上下文、决定下一步",
    code: "call_llm(messages)",
  },
  {
    title: "④ 带刹车的循环",
    role: "for + max_steps + is_done",
    code: "for _ in range(max_steps)",
  },
];

export function AgentSkeletonDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="最小 Agent 的四块骨架图。一个虚线外框代表「最小 Agent」，把四块骨架自上而下竖排框在一起。第一块是系统提示，作用是告诉它身份、目标和规矩，对应代码是 SYSTEM_PROMPT 字符串。第二块是工具表，作用是声明能调哪些工具以及给 LLM 看的 schema，对应代码是 TOOLS 字典。第三块是 LLM 调用，作用是让模型看着上下文决定下一步，对应代码是 call_llm 函数。第四块是带刹车的循环，作用是用 for 加 max_steps 加 is_done 把前三块反复转起来直到收尾，对应代码是 for in range max_steps。每块右侧各有一个对应代码标签，用一条箭头连过去，把概念骨架和待会儿要写的代码一一对上。核心结论：一个能跑的最小 Agent，就是这四块拼起来——系统提示定身份、工具表给能力、LLM 调用做决策、带刹车的循环把它们转起来。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          <defs>
            <marker
              id="skeleton-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* —— 外框「最小 Agent」容器（虚线）—— */}
          <rect
            x={AGENT_X}
            y={AGENT_Y}
            width={AGENT_W}
            height={AGENT_H}
            rx="16"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.6"
            strokeDasharray="6 5"
            opacity="0.9"
          />
          <text
            x={AGENT_X + 16}
            y={AGENT_Y + 28}
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            🤖 最小 Agent = 这四块拼起来
          </text>

          {/* —— 每块 → 对应代码标签的连线（先画）—— */}
          {BLOCKS.map((b, i) => (
            <line
              key={`skel-line-${i}`}
              x1={BLOCK_X + BLOCK_W + 2}
              y1={blockY(i) + BLOCK_H / 2}
              x2={CODE_X - 4}
              y2={codeY(i) + CODE_H / 2}
              stroke="var(--accent)"
              strokeWidth="1.4"
              opacity="0.5"
              markerEnd="url(#skeleton-arrow)"
            />
          ))}

          {/* —— 四块骨架 —— */}
          {BLOCKS.map((b, i) => {
            const y = blockY(i);
            return (
              <g key={`skel-block-${i}`}>
                <rect
                  x={BLOCK_X}
                  y={y}
                  width={BLOCK_W}
                  height={BLOCK_H}
                  rx="10"
                  fill="var(--bg-elevated)"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                <text
                  x={BLOCK_X + 20}
                  y={y + 32}
                  fontSize="15"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {b.title}
                </text>
                <text
                  x={BLOCK_X + 20}
                  y={y + 56}
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {b.role}
                </text>
              </g>
            );
          })}

          {/* —— 右侧「对应代码」标签 —— */}
          {BLOCKS.map((b, i) => {
            const y = codeY(i);
            const cx = CODE_X + CODE_W / 2;
            return (
              <g key={`skel-code-${i}`}>
                <rect
                  x={CODE_X}
                  y={y}
                  width={CODE_W}
                  height={CODE_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--accent)"
                  strokeWidth="1.4"
                />
                <text
                  x={cx}
                  y={y + 24}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  对应代码
                </text>
                <text
                  x={cx}
                  y={y + 46}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {b.code}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        最小 Agent 的四块骨架：系统提示（定身份）、工具表（给能力）、LLM
        调用（做决策）、带刹车的循环（转起来）。本章就是把这四块亲手拼成一台能跑的机器。
      </figcaption>
    </figure>
  );
}
