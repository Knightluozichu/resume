/**
 * <DalvikArtCompareDiagram />：《Android 进阶解密》low-level-tech/dalvik-art 章
 * 「Dalvik JIT vs ART AOT 编译模型对比」配图（HEL-207）。
 *
 * 画面内容：从同一份 .dex 字节码出发，左右两条编译路线对照：
 *  顶部共同起点：.dex 字节码（--accent）—— 两个虚拟机吃的都是同一份输入。
 *  左列 Dalvik（--warning，Android 4.4 及以前）：
 *   - 安装时只做 dexopt，不编译机器码（安装快）。
 *   - 运行时 JIT 即时编译：解释执行为主，把热点字节码翻译成机器码；每次启动重新来。
 *   - 标注：安装快 / 运行较慢 / 耗电。
 *  右列 ART（--success，Android 5.0+）：
 *   - 安装时 dex2oat AOT 预编译：把 dex 编成 OAT/机器码（首次安装慢、占存储）。
 *   - 运行时直接跑机器码（启动快、运行快、省电）。
 *   - 标注：7.0+ 改混合模式（解释 + JIT + 基于 profile 的 AOT），安装快 + 运行快兼得。
 *  底部对比表：编译时机 / 启动速度 / 安装耗时 / 存储占用 / 耗电 五行，
 *  Dalvik 列与 ART 列逐项对照。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（accent / success / warning / text-primary /
 * text-secondary / border / bg），无裸 hex，rx 圆角，无阴影，几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 编译路线某一阶段：阶段标题 + 多行说明。 ——
type Stage = {
  /** 阶段标题（安装时 / 运行时）。 */
  phase: string;
  /** 该阶段做什么（多行，避免依赖自动换行）。 */
  lines: readonly string[];
};

// —— 一条编译路线（Dalvik 或 ART）：栏标题 + 副标题 + 语义色 + 两阶段 + 一句话权衡。 ——
type Pipeline = {
  /** 虚拟机名。 */
  name: string;
  /** 适用 Android 版本。 */
  era: string;
  /** 语义色 token。 */
  color: string;
  /** 安装时 / 运行时两阶段。 */
  stages: readonly [Stage, Stage];
  /** 一句话权衡标注（多行）。 */
  tradeoff: readonly string[];
};

const PIPELINES: readonly [Pipeline, Pipeline] = [
  {
    name: "Dalvik",
    era: "Android 4.4 及以前",
    color: "var(--warning)",
    stages: [
      {
        phase: "安装时",
        lines: ["只做 dexopt 优化", "不编译成机器码"],
      },
      {
        phase: "运行时 · JIT 即时编译",
        lines: [
          "以解释执行为主，每次运行把",
          "热点字节码 JIT 成机器码；",
          "每次启动都要重新编译",
        ],
      },
    ],
    tradeoff: ["安装快 · 运行较慢 · 耗电"],
  },
  {
    name: "ART",
    era: "Android 5.0+",
    color: "var(--success)",
    stages: [
      {
        phase: "安装时 · dex2oat AOT 预编译",
        lines: [
          "安装时把 dex 编译成",
          "OAT / 机器码文件；",
          "首次安装慢、占存储",
        ],
      },
      {
        phase: "运行时",
        lines: ["直接跑预编译好的机器码", "启动快 · 运行快 · 省电"],
      },
    ],
    tradeoff: [
      "7.0+ 改混合模式：解释 + JIT +",
      "基于 profile 的 AOT —— 安装快 + 运行快兼得",
    ],
  },
];

// —— 底部对比表的行（维度 + Dalvik 取值 + ART 取值）。 ——
type CompareRow = {
  /** 对比维度。 */
  dimension: string;
  /** Dalvik 列取值。 */
  dalvik: string;
  /** ART 列取值。 */
  art: string;
};

const COMPARE_ROWS: readonly CompareRow[] = [
  { dimension: "编译时机", dalvik: "运行时 JIT", art: "安装时 AOT" },
  { dimension: "启动速度", dalvik: "较慢", art: "快" },
  { dimension: "安装耗时", dalvik: "快", art: "慢（首次）" },
  { dimension: "存储占用", dalvik: "小", art: "大（OAT）" },
  { dimension: "耗电", dalvik: "较高", art: "低" },
];

// —— 布局常量（间距走 4 的倍数）。 ——
const VIEW_W = 760;
const PAD_X = 24; // 画布左右内边距
const TITLE_TOP = 28; // 主标题 y

// 共同起点 .dex 块（顶部居中）。
const DEX_W = 200;
const DEX_H = 40;
const DEX_X = (VIEW_W - DEX_W) / 2;
const DEX_Y = 60;

// 左右两列编译路线。
const COL_GAP = 32; // 两列之间留白
const COL_W = (VIEW_W - PAD_X * 2 - COL_GAP) / 2; // 单列宽
const COL_L_X = PAD_X; // 左列（Dalvik）左边距
const COL_R_X = PAD_X + COL_W + COL_GAP; // 右列（ART）左边距
const COL_TOP = 132; // 列标题卡顶部 y
const HEAD_H = 40; // 列标题卡高
const STAGE_GAP = 12; // 阶段块竖向间距
const STAGE1_H = 72; // 安装时阶段块高
const STAGE2_H = 92; // 运行时阶段块高
const TRADE_H = 44; // 权衡标注卡高

const ARROW = 5; // 箭头三角半高

// 底部对比表。
const TBL_TOP = 460; // 对比表顶部 y
const TBL_ROW_H = 28; // 表行高
const TBL_HEAD_H = 28; // 表头行高
const TBL_DIM_W = 132; // 维度列宽
const TBL_VAL_W = (VIEW_W - PAD_X * 2 - TBL_DIM_W) / 2; // 取值列宽

const VIEW_H = TBL_TOP + TBL_HEAD_H + COMPARE_ROWS.length * TBL_ROW_H + 32;

export function DalvikArtCompareDiagram() {
  // 安装时阶段块顶部 y（紧跟列标题卡）。
  const stage1Top = COL_TOP + HEAD_H + STAGE_GAP + 16;
  // 运行时阶段块顶部 y。
  const stage2Top = stage1Top + STAGE1_H + STAGE_GAP;
  // 权衡标注卡顶部 y。
  const tradeTop = stage2Top + STAGE2_H + STAGE_GAP;
  // .dex 块底部中心（向两列分叉的起点）。
  const dexBottomY = DEX_Y + DEX_H;
  const dexCx = DEX_X + DEX_W / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Dalvik 与 ART 编译模型对比图。最上方是两条路线共同的起点：一份 .dex 字节码，两个虚拟机吃的都是同一份输入。从 .dex 向左右分叉成两条编译路线。左列是 Dalvik，适用于 Android 4.4 及以前，用黄色标识：安装时只做 dexopt 优化、不编译成机器码；运行时采用 JIT 即时编译，以解释执行为主，每次运行时把热点字节码即时编译成机器码，而且每次启动都要重新编译；权衡是安装快、运行较慢、耗电。右列是 ART，适用于 Android 5.0 及以后，用绿色标识：安装时通过 dex2oat 做 AOT 预编译，把 dex 提前编译成 OAT 机器码文件，代价是首次安装慢、占用存储；运行时直接执行预编译好的机器码，所以启动快、运行快、省电；并且从 Android 7.0 开始改为混合模式，结合解释执行、JIT 和基于 profile 的 AOT，做到安装快和运行快兼得。最下方是一张对比表，逐项对照 Dalvik 与 ART：编译时机是运行时 JIT 对安装时 AOT；启动速度是较慢对快；安装耗时是快对首次安装慢；存储占用是小对大（OAT 文件）；耗电是较高对低。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* —— 标题 —— */}
          <text
            x={PAD_X}
            y={TITLE_TOP}
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Dalvik JIT vs ART AOT：同一份 .dex，两种编译时机
          </text>
          <text
            x={PAD_X}
            y={TITLE_TOP + 18}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            Dalvik 把编译推迟到运行时（装得快、跑得慢）；ART 把编译提前到安装时（装得慢、跑得快）
          </text>

          {/* —— 共同起点：.dex 字节码 —— */}
          <rect
            x={DEX_X}
            y={DEX_Y}
            width={DEX_W}
            height={DEX_H}
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x={dexCx}
            y={DEX_Y + DEX_H / 2 + 4}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            .dex 字节码
          </text>

          {/* —— 从 .dex 向左右两列分叉的连接线 + 箭头 —— */}
          {PIPELINES.map((p, i) => {
            const colX = i === 0 ? COL_L_X : COL_R_X;
            const targetCx = colX + COL_W / 2;
            return (
              <g key={`fork-${p.name}`}>
                {/* 折线：从 .dex 底部中心 → 横向移到目标列中线 → 下扎到列标题卡顶部 */}
                <path
                  d={`M ${dexCx} ${dexBottomY}
                      L ${dexCx} ${(dexBottomY + COL_TOP) / 2}
                      L ${targetCx} ${(dexBottomY + COL_TOP) / 2}
                      L ${targetCx} ${COL_TOP - ARROW}`}
                  fill="none"
                  stroke={p.color}
                  strokeWidth="1.6"
                />
                <path
                  d={`M ${targetCx} ${COL_TOP}
                      l -${ARROW} -${ARROW * 1.6}
                      l ${ARROW * 2} 0 Z`}
                  fill={p.color}
                />
              </g>
            );
          })}

          {/* —— 左右两列编译路线 —— */}
          {PIPELINES.map((p, i) => {
            const colX = i === 0 ? COL_L_X : COL_R_X;
            const innerX = colX + 16; // 列内文字左边距
            return (
              <g key={p.name}>
                {/* 列标题卡：虚拟机名 + 适用版本 */}
                <rect
                  x={colX}
                  y={COL_TOP}
                  width={COL_W}
                  height={HEAD_H}
                  rx="8"
                  fill={p.color}
                  fillOpacity="0.12"
                  stroke={p.color}
                  strokeWidth="1.4"
                />
                <text
                  x={innerX}
                  y={COL_TOP + 18}
                  fontSize="14"
                  fontWeight="700"
                  fill={p.color}
                >
                  {p.name}
                </text>
                <text
                  x={innerX}
                  y={COL_TOP + 33}
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                >
                  {p.era}
                </text>

                {/* 标题卡 → 安装时阶段块：连接线 + 箭头 */}
                <line
                  x1={colX + COL_W / 2}
                  y1={COL_TOP + HEAD_H}
                  x2={colX + COL_W / 2}
                  y2={stage1Top - ARROW}
                  stroke={p.color}
                  strokeWidth="1.4"
                />
                <path
                  d={`M ${colX + COL_W / 2} ${stage1Top}
                      l -${ARROW} -${ARROW * 1.6}
                      l ${ARROW * 2} 0 Z`}
                  fill={p.color}
                />

                {/* 安装时阶段块 */}
                <rect
                  x={colX}
                  y={stage1Top}
                  width={COL_W}
                  height={STAGE1_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.3"
                />
                <text
                  x={innerX}
                  y={stage1Top + 20}
                  fontSize="10.5"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {p.stages[0].phase}
                </text>
                {p.stages[0].lines.map((line, li) => (
                  <text
                    key={line}
                    x={innerX}
                    y={stage1Top + 38 + li * 14}
                    fontSize="9.5"
                    fill="var(--text-secondary)"
                  >
                    {line}
                  </text>
                ))}

                {/* 安装时 → 运行时阶段块：连接线 + 箭头 */}
                <line
                  x1={colX + COL_W / 2}
                  y1={stage1Top + STAGE1_H}
                  x2={colX + COL_W / 2}
                  y2={stage2Top - ARROW}
                  stroke={p.color}
                  strokeWidth="1.4"
                />
                <path
                  d={`M ${colX + COL_W / 2} ${stage2Top}
                      l -${ARROW} -${ARROW * 1.6}
                      l ${ARROW * 2} 0 Z`}
                  fill={p.color}
                />

                {/* 运行时阶段块 */}
                <rect
                  x={colX}
                  y={stage2Top}
                  width={COL_W}
                  height={STAGE2_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.3"
                />
                <text
                  x={innerX}
                  y={stage2Top + 20}
                  fontSize="10.5"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {p.stages[1].phase}
                </text>
                {p.stages[1].lines.map((line, li) => (
                  <text
                    key={line}
                    x={innerX}
                    y={stage2Top + 38 + li * 14}
                    fontSize="9.5"
                    fill="var(--text-secondary)"
                  >
                    {line}
                  </text>
                ))}

                {/* 权衡标注卡（语义色描边，点明这条路的取舍） */}
                <rect
                  x={colX}
                  y={tradeTop}
                  width={COL_W}
                  height={TRADE_H}
                  rx="8"
                  fill={p.color}
                  fillOpacity="0.08"
                  stroke={p.color}
                  strokeWidth="1.3"
                />
                {p.tradeoff.map((line, li) => (
                  <text
                    key={line}
                    x={colX + COL_W / 2}
                    y={
                      tradeTop +
                      (p.tradeoff.length === 1
                        ? TRADE_H / 2 + 4
                        : 18 + li * 14)
                    }
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="600"
                    fill={p.color}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          {/* —— 底部对比表 —— */}
          <text
            x={PAD_X}
            y={TBL_TOP - 12}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            五维对比：编译时机决定了其余四项的权衡
          </text>
          {/* 表头行 */}
          <rect
            x={PAD_X}
            y={TBL_TOP}
            width={VIEW_W - PAD_X * 2}
            height={TBL_HEAD_H}
            rx="6"
            fill="var(--border)"
            fillOpacity="0.4"
          />
          <text
            x={PAD_X + 12}
            y={TBL_TOP + TBL_HEAD_H / 2 + 4}
            fontSize="10"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            维度
          </text>
          <text
            x={PAD_X + TBL_DIM_W + TBL_VAL_W / 2}
            y={TBL_TOP + TBL_HEAD_H / 2 + 4}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="var(--warning)"
          >
            Dalvik（JIT）
          </text>
          <text
            x={PAD_X + TBL_DIM_W + TBL_VAL_W + TBL_VAL_W / 2}
            y={TBL_TOP + TBL_HEAD_H / 2 + 4}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="var(--success)"
          >
            ART（AOT）
          </text>
          {/* 数据行 */}
          {COMPARE_ROWS.map((row, ri) => {
            const y = TBL_TOP + TBL_HEAD_H + ri * TBL_ROW_H;
            const midY = y + TBL_ROW_H / 2 + 4;
            return (
              <g key={row.dimension}>
                {/* 行分隔线 */}
                <line
                  x1={PAD_X}
                  y1={y}
                  x2={VIEW_W - PAD_X}
                  y2={y}
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <text
                  x={PAD_X + 12}
                  y={midY}
                  fontSize="10"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {row.dimension}
                </text>
                <text
                  x={PAD_X + TBL_DIM_W + TBL_VAL_W / 2}
                  y={midY}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {row.dalvik}
                </text>
                <text
                  x={PAD_X + TBL_DIM_W + TBL_VAL_W + TBL_VAL_W / 2}
                  y={midY}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {row.art}
                </text>
              </g>
            );
          })}
          {/* 列分隔竖线（维度列 / Dalvik 列 / ART 列） */}
          <line
            x1={PAD_X + TBL_DIM_W}
            y1={TBL_TOP}
            x2={PAD_X + TBL_DIM_W}
            y2={TBL_TOP + TBL_HEAD_H + COMPARE_ROWS.length * TBL_ROW_H}
            stroke="var(--border)"
            strokeWidth="1"
          />
          <line
            x1={PAD_X + TBL_DIM_W + TBL_VAL_W}
            y1={TBL_TOP}
            x2={PAD_X + TBL_DIM_W + TBL_VAL_W}
            y2={TBL_TOP + TBL_HEAD_H + COMPARE_ROWS.length * TBL_ROW_H}
            stroke="var(--border)"
            strokeWidth="1"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同一份 <code>.dex</code> 字节码，两种编译时机：<strong>Dalvik</strong> 把编译推迟到
        <strong> 运行时 JIT</strong>（装得快、跑得慢、费电），<strong>ART</strong> 把编译提前到
        <strong> 安装时 dex2oat AOT</strong>（首次装得慢、占存储，但跑得快、省电）。Android 7.0+ 的
        ART 改用混合模式，把解释 + JIT + 基于 profile 的 AOT 拼起来，做到安装快与运行快兼得。
      </figcaption>
    </figure>
  );
}
