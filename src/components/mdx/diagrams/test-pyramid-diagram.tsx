/**
 * <TestPyramidDiagram />：《Android 编程权威指南》intent-data/audio-unit-testing 章
 * 「测试金字塔」配图（HEL-189）。
 *
 * 画面内容：经典三层测试金字塔（底宽顶窄），从下到上：
 *  - 底层 单元测试（最宽，--success）：JVM 上跑、多 / 快 / 廉，测 ViewModel / 纯逻辑，
 *    用 JUnit + Mockito / MockK。
 *  - 中层 集成测试（--accent）：组件间协作，用 Robolectric 等。
 *  - 顶层 UI 测试（最窄，--warning）：Espresso、真机 / 模拟器，少 / 慢 / 贵。
 * 右侧三条标注：
 *  ① 越往下越多、越快、越廉；越往上越少、越慢、越贵。
 *  ② 用依赖注入 / 接口替身（test double）隔离外部依赖——把 SoundPool 包成接口便于 mock，
 *     纯逻辑才好测。
 *  ③ 一句话点明：本章把音频播放逻辑抽到可测的类里，才能进金字塔底层快测。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色，无裸 hex，rx 圆角，无阴影，几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 金字塔某一层：标题、技术栈、规模/速度/成本一句话、语义色 token、底宽占比。 ——
type PyramidLayer = {
  /** 层标题。 */
  title: string;
  /** 用什么测。 */
  tech: string;
  /** 多/快/廉 还是 少/慢/贵 的一句话。 */
  scale: string;
  /** 语义色 token。 */
  color: string;
  /** 该层底边相对金字塔最大底宽的占比（0–1，自上而下递增）。 */
  widthRatio: number;
};

// 自上而下排列（顶窄底宽）：UI 测试 → 集成测试 → 单元测试。
const LAYERS: readonly PyramidLayer[] = [
  {
    title: "UI 测试",
    tech: "Espresso · 真机 / 模拟器",
    scale: "少 / 慢 / 贵",
    color: "var(--warning)",
    widthRatio: 0.34,
  },
  {
    title: "集成测试",
    tech: "Robolectric · 组件间协作",
    scale: "适中",
    color: "var(--accent)",
    widthRatio: 0.66,
  },
  {
    title: "单元测试",
    tech: "JUnit + Mockito / MockK · JVM 上跑",
    scale: "多 / 快 / 廉 — 测 ViewModel / 纯逻辑",
    color: "var(--success)",
    widthRatio: 1,
  },
];

// —— 布局常量（间距走 4 的倍数）。 ——
const VIEW_W = 760;
const VIEW_H = 412;
const TITLE_X = 32; // 标题左边距
const PY_CX = 196; // 金字塔水平中线 x
const PY_TOP = 88; // 金字塔顶部 y
const LAYER_H = 76; // 每层高度
const LAYER_GAP = 8; // 层间留白
const PY_MAX_W = 288; // 金字塔最大底宽（最底层）
const NOTE_X = 396; // 右侧标注栏左边距
const NOTE_W = VIEW_W - NOTE_X - 32; // 右侧标注栏宽
const NOTE_TOP = 84; // 右侧标注栏顶部 y
const NOTE_ROW_H = 92; // 每条标注卡高度
const NOTE_GAP = 12; // 标注卡间距

// —— 右侧三条标注（编号 + 标题 + 正文，正文用换行数组逐行画）。 ——
type Annotation = {
  /** 圆圈编号。 */
  badge: string;
  /** 标注标题。 */
  heading: string;
  /** 正文逐行（避免依赖自动换行）。 */
  lines: readonly string[];
  /** 编号圆圈语义色 token。 */
  color: string;
};

const ANNOTATIONS: readonly Annotation[] = [
  {
    badge: "①",
    heading: "越往下越多、越快、越廉",
    lines: [
      "底层单元测试数量最多、毫秒级、不花钱；",
      "顶层 UI 测试数量最少、跑得慢、开销大。",
    ],
    color: "var(--success)",
  },
  {
    badge: "②",
    heading: "用依赖注入 / 接口替身隔离外部依赖",
    lines: [
      "把 SoundPool 包成接口，测试时塞 test double（mock）；",
      "纯逻辑不碰系统资源，才进得了金字塔底层快测。",
    ],
    color: "var(--accent)",
  },
  {
    badge: "③",
    heading: "本章的做法",
    lines: [
      "把音频播放逻辑抽到一个可测的类里 ——",
      "依赖接口而非具体 MediaPlayer / SoundPool，即可单测。",
    ],
    color: "var(--warning)",
  },
];

export function TestPyramidDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="测试金字塔图。一个底宽顶窄的三层金字塔，从下到上分别是：底层单元测试（最宽，绿色），在 JVM 上跑，数量多、速度快、成本廉，用来测 ViewModel 和纯逻辑，技术栈是 JUnit 加 Mockito 或 MockK；中层集成测试（中等宽，品牌紫色），测组件间协作，用 Robolectric 等工具；顶层 UI 测试（最窄，黄色），用 Espresso 在真机或模拟器上跑，数量少、速度慢、成本贵。右侧三条标注：第一，越往金字塔下层越多、越快、越廉，越往上层越少、越慢、越贵，所以应该把大量测试压在底层。第二，用依赖注入或接口替身（test double）来隔离外部依赖，比如把 SoundPool 包成接口，测试时塞进 mock 假对象，让纯逻辑不直接碰系统资源，这样才进得了金字塔底层做快速单元测试。第三，本章的做法是把音频播放逻辑抽到一个可测试的类里，让它依赖接口而不是具体的 MediaPlayer 或 SoundPool 实现，从而可以方便地写单元测试。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* 标题 */}
          <text
            x={TITLE_X}
            y="36"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            测试金字塔：大量快测压在底层，少量贵测放在顶层
          </text>
          <text
            x={TITLE_X}
            y="56"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            底宽顶窄 —— 越往下越多、越快、越廉；越往上越少、越慢、越贵
          </text>

          {/* —— 金字塔三层（梯形堆叠，自上而下变宽） —— */}
          {LAYERS.map((layer, i) => {
            const topY = PY_TOP + i * (LAYER_H + LAYER_GAP);
            const botY = topY + LAYER_H;
            // 本层上边宽：取上一层的底宽占比（顶层退化为一个尖点）。
            const topRatio = i === 0 ? 0 : LAYERS[i - 1].widthRatio;
            const topHalf = (PY_MAX_W * topRatio) / 2;
            const botHalf = (PY_MAX_W * layer.widthRatio) / 2;
            return (
              <g key={layer.title}>
                {/* 梯形层块 */}
                <path
                  d={`M ${PY_CX - topHalf} ${topY}
                      L ${PY_CX + topHalf} ${topY}
                      L ${PY_CX + botHalf} ${botY}
                      L ${PY_CX - botHalf} ${botY} Z`}
                  fill={layer.color}
                  fillOpacity="0.14"
                  stroke={layer.color}
                  strokeWidth="1.6"
                />
                {/* 层标题 */}
                <text
                  x={PY_CX}
                  y={topY + 26}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={layer.color}
                >
                  {layer.title}
                </text>
                {/* 技术栈 */}
                <text
                  x={PY_CX}
                  y={topY + 44}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-secondary)"
                >
                  {layer.tech}
                </text>
                {/* 规模 / 速度 / 成本一句话 */}
                <text
                  x={PY_CX}
                  y={topY + 60}
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--text-secondary)"
                >
                  {layer.scale}
                </text>
              </g>
            );
          })}

          {/* —— 左侧「多 ↑↓ 少 / 快 慢 / 廉 贵」纵向坐标提示 —— */}
          <line
            x1={TITLE_X + 8}
            y1={PY_TOP}
            x2={TITLE_X + 8}
            y2={PY_TOP + LAYERS.length * (LAYER_H + LAYER_GAP) - LAYER_GAP}
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <path
            d={`M ${TITLE_X + 8} ${PY_TOP}
                l -4 8
                l 8 0 Z`}
            fill="var(--border)"
          />
          <text
            x={TITLE_X + 16}
            y={PY_TOP + 16}
            fontSize="9"
            fill="var(--text-secondary)"
          >
            少 / 慢 / 贵
          </text>
          <text
            x={TITLE_X + 16}
            y={PY_TOP + LAYERS.length * (LAYER_H + LAYER_GAP) - LAYER_GAP - 8}
            fontSize="9"
            fill="var(--text-secondary)"
          >
            多 / 快 / 廉
          </text>

          {/* —— 右侧三条标注卡 —— */}
          {ANNOTATIONS.map((a, i) => {
            const y = NOTE_TOP + i * (NOTE_ROW_H + NOTE_GAP);
            return (
              <g key={a.badge}>
                <rect
                  x={NOTE_X}
                  y={y}
                  width={NOTE_W}
                  height={NOTE_ROW_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke={a.color}
                  strokeWidth="1.3"
                />
                {/* 编号圆圈 */}
                <circle
                  cx={NOTE_X + 24}
                  cy={y + 24}
                  r="12"
                  fill={a.color}
                  fillOpacity="0.16"
                  stroke={a.color}
                  strokeWidth="1.3"
                />
                <text
                  x={NOTE_X + 24}
                  y={y + 28}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={a.color}
                >
                  {a.badge}
                </text>
                {/* 标注标题 */}
                <text
                  x={NOTE_X + 44}
                  y={y + 28}
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {a.heading}
                </text>
                {/* 标注正文逐行 */}
                {a.lines.map((line, li) => (
                  <text
                    key={line}
                    x={NOTE_X + 16}
                    y={y + 52 + li * 18}
                    fontSize="9.5"
                    fill="var(--text-secondary)"
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        测试金字塔：把大量又快又廉的单元测试压在底层（JUnit + Mockito 测
        ViewModel / 纯逻辑），少量又慢又贵的 UI 测试（Espresso）放在顶层。想测得动，先把
        音频播放逻辑抽成依赖接口的可测类，再用 test double 隔离 SoundPool 这类系统资源。
      </figcaption>
    </figure>
  );
}
