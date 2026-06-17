/**
 * <RetrievalFlowDiagram>：检索（Retrieval）四步流程 —— RAG 直觉（HEL-291，第 2 章）。
 *
 * 一张静态 SVG，横向 4 步单一 x 公式排布，把「检索增强」的直觉一图讲清：
 *   ① 用户问题 → ② 在知识库里检索相关片段 → ③ 把片段拼进上下文 → ④ LLM 带着资料作答。
 * 强调「LLM 不是凭记忆瞎答，而是先去外部知识库捞到对的资料、再带着资料回答」（RAG，篇 5 深讲）。
 *
 * 横向 4 步用「单一 x 公式」stepX(i) 排布，等宽等距，禁止双算法（svg-diagram-quality 硬规则）。
 *
 * 纯展示 Server 组件（无交互）。配色全部走 DESIGN token（无裸 hex）；
 * 几何常量具名、为 4 的倍数（硬规则 5）。几何自检：四步零重叠、文字落在自己框内、
 * 四周留白 ≥ 12px、字号 ≥ 10px、viewBox 利用率适中。
 */

// —— 整体画布。 ——
const VIEW_W = 760;
const VIEW_H = 232;

// —— 横向四步等宽布局（单一 x 公式）。 ——
// 右边界 = MARGIN + 3*(STEP_W+STEP_GAP) + STEP_W = 24 + 3*180 + 148 = 712 → 右留白 48。
const STEP_W = 148;
const STEP_H = 100;
const STEP_GAP = 32;
const STEP_MARGIN = 24;
const STEP_Y = 72;
/** 第 i 步左上角 x（单一公式，禁双算法）。 */
const stepX = (i: number) => STEP_MARGIN + i * (STEP_W + STEP_GAP);

type Step = {
  /** 步号标签 */
  tag: string;
  /** 框内主标题 */
  title: string;
  /** 框内一行说明 */
  desc: string;
  /** 是否高亮（③ 拼进上下文 = 检索的落点，重点）。 */
  highlight: boolean;
};

const STEPS: readonly Step[] = [
  { tag: "①", title: "用户问题", desc: "「这单能退吗？」", highlight: false },
  { tag: "②", title: "检索相关片段", desc: "去知识库捞退货政策", highlight: false },
  { tag: "③", title: "拼进上下文", desc: "片段塞进 prompt", highlight: true },
  { tag: "④", title: "带资料作答", desc: "LLM 有依据地答", highlight: false },
];

export function RetrievalFlowDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="检索 Retrieval 四步流程图，从左到右横向排布。第一步：用户问题，比如「这单能退吗？」。第二步：检索相关片段，系统拿着这个问题去外部知识库里捞出和退货政策相关的资料。第三步（本图重点，高亮）：把捞到的片段拼进上下文，也就是塞进给 LLM 的 prompt 里。第四步：LLM 带着这份资料有依据地作答。四步之间有箭头依次相连。核心直觉：LLM 不是凭自己的记忆瞎答，而是先去外部知识库检索到对的资料、再把资料拼进上下文，最后带着资料回答——这就是 RAG（检索增强生成）的基本思路。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker
              id="rf-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 标题行 */}
          <text
            x={VIEW_W / 2}
            y={32}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            检索增强：先捞对资料，再带着资料回答
          </text>

          {/* 步间连接箭头（单一公式：第 i 步右边 → 第 i+1 步左边） */}
          {STEPS.slice(0, -1).map((_, i) => (
            <line
              key={`rf-link-${i}`}
              x1={stepX(i) + STEP_W + 2}
              y1={STEP_Y + STEP_H / 2}
              x2={stepX(i + 1) - 4}
              y2={STEP_Y + STEP_H / 2}
              stroke="var(--accent)"
              strokeWidth="1.6"
              opacity="0.6"
              markerEnd="url(#rf-arrow)"
            />
          ))}

          {/* 四步卡片 */}
          {STEPS.map((step, i) => {
            const cx = stepX(i) + STEP_W / 2;
            return (
              <g key={`rf-step-${i}`}>
                <rect
                  x={stepX(i)}
                  y={STEP_Y}
                  width={STEP_W}
                  height={STEP_H}
                  rx="10"
                  fill={step.highlight ? "var(--accent-glow)" : "var(--bg)"}
                  stroke={step.highlight ? "var(--accent)" : "var(--border)"}
                  strokeWidth={step.highlight ? 2 : 1.4}
                />
                <text
                  x={cx}
                  y={STEP_Y + 28}
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  {step.tag}
                </text>
                <text
                  x={cx}
                  y={STEP_Y + 56}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {step.title}
                </text>
                <text
                  x={cx}
                  y={STEP_Y + 78}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {step.desc}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        检索（Retrieval）就是：拿用户问题去外部知识库捞出相关片段，拼进上下文，让 LLM 带着对的资料回答 —— 这套「先检索、后生成」的做法就是 RAG（篇 5 深讲）。
      </figcaption>
    </figure>
  );
}
