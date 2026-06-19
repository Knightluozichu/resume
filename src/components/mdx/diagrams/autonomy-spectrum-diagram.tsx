/**
 * <AutonomySpectrumDiagram>：自主性光谱（autonomy spectrum）（HEL-275，第 1 章）。
 *
 * 一条横向光谱条，从左到右自主性递增，把五种「让程序帮你做事」的方案排成谱：
 *   纯代码 → 单次 LLM 调用 → LLM+工具 → 固定工作流 → 自主 Agent
 * 越往右，LLM 自己拿主意的成分越多。下方一行注：越往右越灵活，但越难控制、越贵、越慢。
 *
 * 目的：破除「Agent 越自主越好」的迷信 —— 自主性是一根可调的旋钮，不是越大越好；
 * 选方案 = 在「灵活」与「可控/便宜/快」之间按任务取一个点。
 *
 * 纯展示 Server 组件（无交互）。五段用「单一 x 公式」segX(i) 排布，等宽（禁双算法）。
 * 配色全部走 DESIGN token（无裸 hex）；几何常量具名、为 4 的倍数（硬规则 5）。
 * 几何自检：五段零重叠、文字落在自己段内、四周留白 ≥ 12px、字号 ≥ 10px。
 */

// —— 整体画布。 ——
const VIEW_W = 720;
const VIEW_H = 244;

// —— 光谱条几何（横贯，五等分）。 ——
const BAR_X = 24;
const BAR_W = 672; // 余右 24
const BAR_Y = 92;
const BAR_H = 64;
const SEG_COUNT = 5;
const SEG_W = BAR_W / SEG_COUNT; // 134.4
/** 第 i 段左边界 x（单一公式，禁双算法）。 */
const segX = (i: number) => BAR_X + i * SEG_W;
/** 第 i 段中心 x。 */
const segCX = (i: number) => segX(i) + SEG_W / 2;

type Stage = {
  /** 段标题 */
  name: string;
  /** 一句话举例 */
  eg: string;
};

// 从左（最不自主）到右（最自主）。
const STAGES: readonly Stage[] = [
  { name: "纯代码", eg: "if/else 写死" },
  { name: "单次 LLM 调用", eg: "问一句答一句" },
  { name: "LLM + 工具", eg: "会调一次工具" },
  { name: "固定工作流", eg: "几步串成流水线" },
  { name: "自主 Agent", eg: "循环里自己决定" },
];

export function AutonomySpectrumDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="自主性光谱图。一条横向的光谱条分成五段，从左到右自主性逐渐增加：第一段是纯代码，例如用 if/else 把逻辑写死；第二段是单次 LLM 调用，问一句答一句；第三段是 LLM 加工具，会调用一次工具；第四段是固定工作流，把几步串成流水线；第五段是自主 Agent，在循环里自己决定每一步。越往右，LLM 自己拿主意的成分越多。底部的总结：越往右越灵活，能应付越开放的任务，但同时也越难控制、越贵、越慢。核心结论是自主性是一根可以调节的旋钮，不是越大越好，选方案就是在灵活与可控、便宜、快之间，按任务需要取一个合适的点。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="auto-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 标题 */}
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            自主性光谱：从「写死」到「自己拿主意」
          </text>

          {/* 顶部「自主性递增」指向箭头 */}
          <text
            x={BAR_X}
            y={62}
            fontSize="11"
            fill="var(--text-secondary)"
          >
            自主性 低
          </text>
          <text
            x={BAR_X + BAR_W}
            y={62}
            textAnchor="end"
            fontSize="11"
            fontWeight="700"
            fill="var(--accent)"
          >
            自主性 高
          </text>
          <line
            x1={BAR_X + 64}
            y1={58}
            x2={BAR_X + BAR_W - 64}
            y2={58}
            stroke="var(--accent)"
            strokeWidth="1.4"
            opacity="0.6"
            markerEnd="url(#auto-arrow)"
          />

          {/* 五段光谱条（最右段高亮 = 最自主） */}
          {STAGES.map((s, i) => {
            const last = i === SEG_COUNT - 1;
            return (
              <g key={s.name}>
                <rect
                  x={segX(i)}
                  y={BAR_Y}
                  width={SEG_W}
                  height={BAR_H}
                  rx={i === 0 ? 8 : 0}
                  fill={last ? "var(--accent-glow)" : "var(--bg)"}
                  stroke={last ? "var(--accent)" : "var(--border)"}
                  strokeWidth={last ? 2 : 1.2}
                />
                <text
                  x={segCX(i)}
                  y={BAR_Y + 26}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={last ? "var(--accent)" : "var(--text-primary)"}
                >
                  {s.name}
                </text>
                <text
                  x={segCX(i)}
                  y={BAR_Y + 46}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {s.eg}
                </text>
              </g>
            );
          })}

          {/* 下方权衡注 */}
          <text
            x={VIEW_W / 2}
            y={BAR_Y + BAR_H + 36}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            越往右越灵活 —— 但也越难控制、越贵、越慢
          </text>
          <text
            x={VIEW_W / 2}
            y={BAR_Y + BAR_H + 56}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            自主性是一根旋钮，不是越大越好：按任务在「灵活」和「可控 / 便宜 / 快」之间取一个点
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        自主性是一道连续的光谱，不是「是 / 不是 Agent」的二选一。任务越开放就往右挪，任务越固定就往左挪 —— 能用代码或工作流解决的，没必要上自主 Agent。
      </figcaption>
    </figure>
  );
}
