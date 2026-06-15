/**
 * <XmlDrawableTypesDiagram />：《Android 编程权威指南》intent-data/xml-drawables 章
 * 「XML drawable 类型」配图（HEL-191）。
 *
 * 画面内容：把四种常用 XML drawable 类型画成 2×2 并列卡片，每张卡含
 * 一个小预览（直观画出该类型长什么样）+ mono 字体的根标签 + 一句用途：
 *  - shape：根 <shape>，预览圆角矩形带渐变 + 描边 —— 纯矢量背景
 *  - layer-list：根 <layer-list>，预览两三层错位叠放的矩形 —— 多层叠加
 *  - selector / state-list：根 <selector>，预览同一按钮的 default / pressed 两态 —— 按 state 切换
 *  - ripple：根 <ripple>，预览带波纹圈的方块 —— Material 点击波纹
 * 底部一句总结：XML drawable 矢量可缩放、按状态自动切换、省图片资源、可在 android:background 引用。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色，无裸 hex，rx 圆角，无阴影，几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 一种 drawable 类型：root 根标签、use 用途、color 该卡语义色 token、kind 决定预览画法。 ——
type DrawableType = {
  /** 类型名（卡片标题）。 */
  name: string;
  /** XML 根标签（mono 显示）。 */
  root: string;
  /** 用途说明。 */
  use: string;
  /** 该卡语义色 token。 */
  color: string;
  /** 预览画法标识。 */
  kind: "shape" | "layerList" | "selector" | "ripple";
};

const TYPES: readonly DrawableType[] = [
  {
    name: "Shape",
    root: "<shape>",
    use: "纯矢量背景：圆角 / 渐变 / 描边 / 纯色",
    color: "var(--accent)",
    kind: "shape",
  },
  {
    name: "Layer-List",
    root: "<layer-list>",
    use: "多层叠加，如阴影 / 边框组合",
    color: "var(--success)",
    kind: "layerList",
  },
  {
    name: "Selector / State-List",
    root: "<selector>",
    use: "按 state 自动切换：pressed / focused / checked / default",
    color: "var(--warning)",
    kind: "selector",
  },
  {
    name: "Ripple",
    root: "<ripple>",
    use: "Material 点击波纹反馈",
    color: "var(--danger)",
    kind: "ripple",
  },
];

// —— 布局常量（间距走 4 倍数）。 ——
const VIEW_W = 640;
const PAD_X = 24; // 左右外边距
const TOP = 64; // 卡片网格起点 y（标题 + 副标题之下）
const COL_GAP = 24; // 列间距
const ROW_GAP = 20; // 行间距
const CARD_W = (VIEW_W - PAD_X * 2 - COL_GAP) / 2; // 单卡宽（两列）
const CARD_H = 168; // 单卡高
const PREVIEW_X = 20; // 预览区相对卡片左内边距
const PREVIEW_Y = 44; // 预览区相对卡片顶内边距
const PREVIEW_W = 96; // 预览区宽
const PREVIEW_H = 72; // 预览区高
const FOOT_H = 56; // 底部总结条高
const VIEW_H = TOP + CARD_H * 2 + ROW_GAP + 20 + FOOT_H + 16;

// —— 单卡内的预览图：按 kind 画出该 drawable 类型的直观示意。 ——
function Preview({ kind, color }: { kind: DrawableType["kind"]; color: string }) {
  // 预览区中心（相对卡片原点），供各画法对齐用。
  const cx = PREVIEW_X + PREVIEW_W / 2;
  const cy = PREVIEW_Y + PREVIEW_H / 2;

  if (kind === "shape") {
    // 圆角矩形：渐变填充（线性）+ 描边。渐变用具名 id 引用（url(#id) 非裸 hex 颜色）。
    return (
      <g>
        <defs>
          <linearGradient id="xmlDrawableShapeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.36" />
            <stop offset="100%" stopColor={color} stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <rect
          x={PREVIEW_X + 8}
          y={PREVIEW_Y + 12}
          width={PREVIEW_W - 16}
          height={PREVIEW_H - 24}
          rx="12"
          fill="url(#xmlDrawableShapeGrad)"
          stroke={color}
          strokeWidth="2"
        />
      </g>
    );
  }

  if (kind === "layerList") {
    // 三层错位叠放的矩形：从后到前逐层偏移，体现「多层叠加」。
    return (
      <g>
        {[0, 1, 2].map((layer) => (
          <rect
            key={layer}
            x={PREVIEW_X + 12 + layer * 12}
            y={PREVIEW_Y + 8 + layer * 12}
            width={PREVIEW_W - 36}
            height={PREVIEW_H - 36}
            rx="6"
            fill={color}
            fillOpacity={0.1 + layer * 0.12}
            stroke={color}
            strokeWidth="1.6"
          />
        ))}
      </g>
    );
  }

  if (kind === "selector") {
    // 两个按钮：左 default（浅），右 pressed（深），中间箭头表示「按 state 切换」。
    const btnW = 32;
    const btnH = 24;
    const leftX = PREVIEW_X + 4;
    const rightX = PREVIEW_X + PREVIEW_W - btnW - 4;
    const btnY = cy - btnH / 2;
    return (
      <g>
        {/* default 态 */}
        <rect
          x={leftX}
          y={btnY}
          width={btnW}
          height={btnH}
          rx="6"
          fill={color}
          fillOpacity="0.14"
          stroke={color}
          strokeWidth="1.6"
        />
        <text
          x={leftX + btnW / 2}
          y={btnY + btnH / 2 + 3}
          textAnchor="middle"
          fontSize="7"
          fill="var(--text-secondary)"
        >
          default
        </text>
        {/* 切换箭头 */}
        <line
          x1={leftX + btnW + 4}
          y1={cy}
          x2={rightX - 4}
          y2={cy}
          stroke={color}
          strokeWidth="1.4"
        />
        <path
          d={`M ${rightX - 4} ${cy} l -5 -3 l 0 6 z`}
          fill={color}
        />
        {/* pressed 态（实心更深） */}
        <rect
          x={rightX}
          y={btnY}
          width={btnW}
          height={btnH}
          rx="6"
          fill={color}
          fillOpacity="0.5"
          stroke={color}
          strokeWidth="1.6"
        />
        <text
          x={rightX + btnW / 2}
          y={btnY + btnH / 2 + 3}
          textAnchor="middle"
          fontSize="7"
          fontWeight="700"
          fill="var(--text-primary)"
        >
          pressed
        </text>
      </g>
    );
  }

  // ripple：方块 + 两圈同心波纹（点击点在中心）。
  return (
    <g>
      <rect
        x={PREVIEW_X + 12}
        y={PREVIEW_Y + 8}
        width={PREVIEW_W - 24}
        height={PREVIEW_H - 16}
        rx="8"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        strokeWidth="1.6"
      />
      <circle cx={cx} cy={cy} r="20" fill="none" stroke={color} strokeWidth="2" strokeOpacity="0.32" />
      <circle cx={cx} cy={cy} r="12" fill={color} fillOpacity="0.24" stroke={color} strokeWidth="1.6" />
      <circle cx={cx} cy={cy} r="3" fill={color} />
    </g>
  );
}

export function XmlDrawableTypesDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="XML drawable 类型解剖图，以 2×2 并列卡片展示四种常用 XML drawable，每张卡含小预览、XML 根标签和用途。第一张 Shape，根标签 shape，预览是一个带渐变和描边的圆角矩形，用途是纯矢量背景，可设圆角、渐变、描边、纯色。第二张 Layer-List，根标签 layer-list，预览是三层错位叠放的矩形，用途是多层叠加，如阴影与边框组合。第三张 Selector 或称 State-List，根标签 selector，预览是同一按钮的 default 与 pressed 两个状态，用途是按 state 自动切换，覆盖 pressed、focused、checked、default。第四张 Ripple，根标签 ripple，预览是一个带同心波纹圈的方块，用途是 Material 点击波纹反馈。底部总结：XML drawable 矢量可缩放、按状态自动切换、省图片资源，可在 android:background 中引用。"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* 标题 */}
          <text
            x={PAD_X}
            y="28"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            四种常用 XML drawable 类型
          </text>
          <text
            x={PAD_X}
            y="46"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            每种由不同的根标签声明，覆盖背景、叠层、状态切换、点击反馈
          </text>

          {/* —— 2×2 卡片网格 —— */}
          {TYPES.map((t, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const cardX = PAD_X + col * (CARD_W + COL_GAP);
            const cardY = TOP + row * (CARD_H + ROW_GAP);
            return (
              <g key={t.name} transform={`translate(${cardX} ${cardY})`}>
                {/* 卡片外框 */}
                <rect
                  x="0"
                  y="0"
                  width={CARD_W}
                  height={CARD_H}
                  rx="10"
                  fill="var(--bg)"
                  stroke={t.color}
                  strokeWidth="1.4"
                  strokeOpacity="0.6"
                />
                {/* 顶部色条（语义色） */}
                <rect x="0" y="0" width={CARD_W} height="4" rx="2" fill={t.color} />
                {/* 卡片标题 */}
                <text
                  x="16"
                  y="28"
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {t.name}
                </text>

                {/* 小预览 */}
                <Preview kind={t.kind} color={t.color} />

                {/* 根标签（mono） */}
                <text
                  x={PREVIEW_X + PREVIEW_W + 16}
                  y={PREVIEW_Y + 20}
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="var(--font-mono)"
                  fill={t.color}
                >
                  {t.root}
                </text>
                <text
                  x={PREVIEW_X + PREVIEW_W + 16}
                  y={PREVIEW_Y + 36}
                  fontSize="9"
                  fill="var(--text-secondary)"
                >
                  根标签
                </text>

                {/* 用途（卡片底部，两行内） */}
                <foreignObject
                  x="16"
                  y={PREVIEW_Y + PREVIEW_H + 12}
                  width={CARD_W - 32}
                  height="44"
                >
                  <div
                    style={{
                      fontSize: "10.5px",
                      lineHeight: 1.35,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {t.use}
                  </div>
                </foreignObject>
              </g>
            );
          })}

          {/* —— 底部总结条 —— */}
          <rect
            x={PAD_X}
            y={TOP + CARD_H * 2 + ROW_GAP + 20}
            width={VIEW_W - PAD_X * 2}
            height={FOOT_H}
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x={VIEW_W / 2}
            y={TOP + CARD_H * 2 + ROW_GAP + 20 + 24}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            XML drawable：矢量可缩放、按状态自动切换、省图片资源
          </text>
          <text
            x={VIEW_W / 2}
            y={TOP + CARD_H * 2 + ROW_GAP + 20 + 42}
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            android:background=&quot;@drawable/xxx&quot; 即可引用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四种常用 XML drawable：shape（纯矢量背景）、layer-list（多层叠加）、selector（按 state
        切换）、ripple（点击波纹）。都用 XML 根标签声明，矢量可缩放、省图片资源，在 android:background 中引用。
      </figcaption>
    </figure>
  );
}
