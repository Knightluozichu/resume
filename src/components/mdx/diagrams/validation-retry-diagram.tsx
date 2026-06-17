/**
 * <ValidationRetryDiagram>：校验 + 重试流程图（HEL-309，第 7 章）。
 *
 * 一张静态流程图（横向主链 + 一条回流）：
 *   模型输出 → parse（解析）→ 按 schema 校验 → 判定「合法吗」 → 分叉：
 *     ✓ 通过 → 用结果（绿色出口，最右一格）；
 *     ✗ 不合 → 把错误信息塞回提示，让模型重出（红色回流箭头绕回「模型输出」）。
 * 让读者一眼看清：拿到输出别直接信，先 parse 再按 schema 校验，不合就带着错误反馈重试。
 *
 * 主链四节点 + 绿色出口共 5 格用「单一 x 公式」cellX(i) 等距排布；回流箭头走底部折线，
 * 文字落各自框内、距 viewBox 各边 ≥ 12px。
 * 纯展示 Server 组件（无交互）。配色全部走 DESIGN token（无裸 hex）；几何常量具名、
 * 为 4 的倍数（硬规则 5）。
 */

// —— 整体画布。 ——
const VIEW_W = 720;
const VIEW_H = 256;

// —— 主链 4 节点 + 绿色出口共 5 格（横向等距，单一 x 公式）。 ——
const CELL_W = 108;
const CELL_H = 68;
const CELL_GAP = 24;
const CELL_MARGIN = 24;
const CELL_TOP = 72;
/** 第 i 格左上角 x（单一公式）。右边界 = 24 + 4*132 + 108 = 660 → 右留白 60；左留白 24。 */
const cellX = (i: number) => CELL_MARGIN + i * (CELL_W + CELL_GAP);

// 第 4 格（下标 4）是绿色「用结果」出口；前 4 格（0~3）是主链。
const PASS_INDEX = 4;

type Cell = {
  /** 节点标题 */
  title: string;
  /** 节点副文字（小字） */
  sub: string;
  /** 是否等宽副文字 */
  mono: boolean;
};

const CELLS: readonly Cell[] = [
  { title: "① 模型输出", sub: "一段 JSON 文本", mono: false },
  { title: "② parse", sub: "json.loads(…)", mono: true },
  { title: "③ 按 schema 校验", sub: "字段·类型·必填", mono: false },
  { title: "🔀 合法吗？", sub: "✓ 过 / ✗ 不合", mono: false },
  { title: "🎉 用结果", sub: "交给下游", mono: false },
];

export function ValidationRetryDiagram() {
  const chainMidY = CELL_TOP + CELL_H / 2;
  // 回流折线的底部 y（= 228；距 viewBox 底 256-228 = 28px，留足箭头与标签）。
  const loopY = CELL_TOP + CELL_H + 88;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="校验加重试的流程图。主链从左到右四步：第一步模型输出，吐出一段 JSON 文本；第二步 parse 解析，用 json.loads 把文本读成对象；第三步按 schema 校验，检查字段、类型、必填项；第四步是个判定「合法吗」，分两条路。如果通过，走绿色出口「用结果」，把这份可靠的结构化数据交给下游。如果不合法，走一条红色回流箭头：把具体的错误信息（比如缺了某字段、类型不对）塞回提示里，绕回到第一步让模型重新生成一次。核心要点：拿到模型输出别直接就信、直接就用，先 parse 再按 schema 校验；校验不过时不是直接报错崩掉，而是带着错误反馈让模型重出一次——这就是「校验加重试」让结构化输出真正可靠的兜底机制。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* —— 标题行 —— */}
          <text
            x={VIEW_W / 2}
            y={32}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            别直接信：parse → 校验 → 不合就带错误重试
          </text>

          {/* —— 主链节点间箭头（0→1, 1→2, 2→3 灰；3→4 绿，带 ✓）—— */}
          {[0, 1, 2, 3].map((i) => {
            const x1 = cellX(i) + CELL_W;
            const x2 = cellX(i + 1);
            const isPass = i === 3;
            const color = isPass ? "var(--success)" : "var(--text-secondary)";
            return (
              <g key={`arrow-${i}`}>
                <line
                  x1={x1 + 2}
                  y1={chainMidY}
                  x2={x2 - 10}
                  y2={chainMidY}
                  stroke={color}
                  strokeWidth={isPass ? 2 : 1.8}
                />
                <path
                  d={`M ${x2 - 10} ${chainMidY} l -9 -5 v 10 z`}
                  fill={color}
                />
                {isPass && (
                  <text
                    x={(x1 + x2) / 2}
                    y={chainMidY - 8}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill="var(--success)"
                  >
                    ✓
                  </text>
                )}
              </g>
            );
          })}

          {/* —— 5 格节点 —— */}
          {CELLS.map((c, i) => {
            const x = cellX(i);
            const isDecision = i === 3;
            const isPass = i === PASS_INDEX;
            const color = isPass
              ? "var(--success)"
              : isDecision
                ? "var(--warning)"
                : "var(--accent)";
            return (
              <g key={`cell-${i}`}>
                {isPass && (
                  <rect
                    x={x}
                    y={CELL_TOP}
                    width={CELL_W}
                    height={CELL_H}
                    rx="10"
                    fill="var(--success)"
                    opacity="0.14"
                  />
                )}
                <rect
                  x={x}
                  y={CELL_TOP}
                  width={CELL_W}
                  height={CELL_H}
                  rx="10"
                  fill={isPass ? "none" : "var(--bg)"}
                  stroke={color}
                  strokeWidth="1.6"
                />
                <text
                  x={x + CELL_W / 2}
                  y={CELL_TOP + 28}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={color}
                >
                  {c.title}
                </text>
                <text
                  x={x + CELL_W / 2}
                  y={CELL_TOP + 48}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily={c.mono ? "var(--font-mono)" : undefined}
                  fill="var(--text-secondary)"
                >
                  {c.sub}
                </text>
              </g>
            );
          })}

          {/* —— 红色回流（✗ 不合，从判定节点底部绕回「模型输出」）——
               判定底部 → 下 → 横向左 → 上接到节点 0 底部。 */}
          <line
            x1={cellX(3) + CELL_W / 2}
            y1={CELL_TOP + CELL_H}
            x2={cellX(3) + CELL_W / 2}
            y2={loopY}
            stroke="var(--danger)"
            strokeWidth="2"
          />
          <line
            x1={cellX(3) + CELL_W / 2}
            y1={loopY}
            x2={cellX(0) + CELL_W / 2}
            y2={loopY}
            stroke="var(--danger)"
            strokeWidth="2"
          />
          <line
            x1={cellX(0) + CELL_W / 2}
            y1={loopY}
            x2={cellX(0) + CELL_W / 2}
            y2={CELL_TOP + CELL_H + 10}
            stroke="var(--danger)"
            strokeWidth="2"
          />
          <path
            d={`M ${cellX(0) + CELL_W / 2} ${CELL_TOP + CELL_H + 10} l -5 9 h 10 z`}
            fill="var(--danger)"
          />
          {/* 回流标签（落在底部折线上方，距 viewBox 底 ≥ 12px） */}
          <text
            x={(cellX(0) + cellX(3)) / 2 + CELL_W / 2}
            y={loopY - 12}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--danger)"
          >
            ✗ 不合：把错误信息塞回提示，让模型重出一次
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        拿到输出别直接信：先 parse、再按 schema
        校验；通过就用，不合就带着具体错误反馈让模型重出一次——这层兜底让结构化输出真正可靠。
      </figcaption>
    </figure>
  );
}
