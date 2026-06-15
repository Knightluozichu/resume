/**
 * <StyleThemeInheritanceDiagram />：《Android 编程权威指南》intent-data/styles-themes 章
 * 「样式继承 vs 主题作用域 + 属性优先级」配图（HEL-190）。
 *
 * 画面内容：左右两栏对比 Style 与 Theme，底部一条属性优先级标尺。
 *  左栏 —— Style 继承链（accent 色）：
 *   - 父 style `Widget.Material3.Button`（系统内置）。
 *   - 自定义 `MyButton`：parent 指向父 style，只覆盖部分属性（如 textColor），其余沿用父。
 *   - 应用到单个 `<Button style="@style/MyButton">`——style 只作用在这一个 View 上。
 *   两段带箭头实线：父 →(继承+覆盖)→ MyButton →(应用)→ 单个 Button。
 *  右栏 —— Theme 作用域（success 色）：
 *   - 在 `<application android:theme>`（或 Activity 级）声明一次，作用于整个界面。
 *   - 界面里多个控件用 `?attr/colorPrimary` 从主题取色——主题属性渗透到全体 Material 组件。
 *   画一个「界面」框，里面多个控件都标 ?attr/colorPrimary，一条总线从 theme 渗透进框。
 *  底部 —— 属性最终值优先级标尺（warning 色）：
 *   theme < style < 布局内联 xml < 代码 setXxx（左低右高，后者覆盖前者）。
 *
 * 关键区别（也写进图与 figcaption）：
 *  ① style 作用于单个 View；theme 作用于整个 Activity/App，且其属性可被 ?attr 引用。
 *  ② 同名属性最终值优先级：theme < style < 内联 xml < 代码 setXxx。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（accent / success / warning / text-primary /
 * text-secondary / border / bg），无裸 hex，rx 圆角，无阴影，几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 链节点：title = 主标题；sub = 副标题（形态/作用）；notes = 多行说明。 ——
type ChainStep = {
  /** 主标题（style 名 / 控件）。 */
  title: string;
  /** 副标题：形态或角色。 */
  sub: string;
  /** 多行说明。 */
  notes: readonly string[];
};

// 左栏 Style 继承链：父 style → 自定义 MyButton → 单个 Button。
const STYLE_CHAIN: readonly ChainStep[] = [
  {
    title: "Widget.Material3.Button",
    sub: "父 style（系统内置）",
    notes: ["定义按钮的默认外观", "圆角 / 内边距 / 字号 …"],
  },
  {
    title: "MyButton",
    sub: "自定义 style（parent 指向父）",
    notes: ["parent=Widget.Material3.Button", "只覆盖 textColor，其余沿用父"],
  },
  {
    title: '<Button style="@style/MyButton">',
    sub: "应用到单个 View",
    notes: ["style 只作用在这一个按钮上"],
  },
];

// 右栏 Theme 作用域：界面内多个控件都从主题取色。
const THEME_WIDGETS: readonly string[] = ["Button", "TextView", "Switch"];

// 底部属性优先级标尺：左低右高，后者覆盖前者。
const PRIORITY: readonly string[] = [
  "theme",
  "style",
  "布局内联 xml",
  "代码 setXxx",
];

// —— 布局常量（间距走 4 倍数语言）。 ——
const PAD = 24; // 画布左右内边距
const TITLE_TOP = 28; // 大标题 baseline
const SUBTITLE_TOP = 48; // 副标题 baseline
const COL_TOP = 76; // 两栏内容顶部 y（小节标题之上留白）

// 左栏（Style 链）几何。
const STYLE_X = 24; // 左栏左边距
const STEP_W = 320; // 链节点卡片宽
const STEP_H = 80; // 链节点卡片高
const STEP_GAP = 44; // 链节点竖向间距（容纳箭头 + 标签）

// 右栏（Theme）几何。
const THEME_X = 408; // 右栏左边距
const THEME_W = 328; // 右栏宽
const THEME_BAR_H = 56; // 顶部「theme 声明」条高
const SCREEN_GAP = 48; // theme 声明条到界面框的竖向间距（容纳渗透箭头）
const SCREEN_H = 168; // 「整个界面」框高
const WIDGET_H = 36; // 界面内控件条高
const WIDGET_GAP = 12; // 界面内控件间距

const ARROW = 5; // 箭头三角半高

// 底部优先级标尺几何。
const SCALE_H = 44; // 标尺段高
const SCALE_PAD_TOP = 56; // 链/界面区底部到标尺标题的间距

/** 第 i 个 Style 链节点的顶部 y。 */
function styleStepTop(i: number): number {
  return COL_TOP + i * (STEP_H + STEP_GAP);
}

// 左栏链底部 y（用于推导标尺纵向位置）。
const STYLE_CHAIN_BOTTOM = COL_TOP + STYLE_CHAIN.length * STEP_H + (STYLE_CHAIN.length - 1) * STEP_GAP;
// 右栏界面框底部 y。
const THEME_BLOCK_BOTTOM = COL_TOP + THEME_BAR_H + SCREEN_GAP + SCREEN_H;
// 两栏中较低者作为标尺起点基准。
const COLUMNS_BOTTOM = Math.max(STYLE_CHAIN_BOTTOM, THEME_BLOCK_BOTTOM);

const SCALE_TITLE_Y = COLUMNS_BOTTOM + SCALE_PAD_TOP; // 标尺标题 baseline
const SCALE_TOP = SCALE_TITLE_Y + 12; // 标尺段顶部 y

const VIEW_W = 760;
const VIEW_H = SCALE_TOP + SCALE_H + 44;

export function StyleThemeInheritanceDiagram() {
  // 右栏：theme 声明条与界面框的中心 x（用于渗透总线）。
  const themeBarCx = THEME_X + THEME_W / 2;
  const barBottom = COL_TOP + THEME_BAR_H;
  const screenTop = barBottom + SCREEN_GAP;
  // 界面框内控件起始 y。
  const widgetX = THEME_X + 16;
  const widgetW = THEME_W - 32;
  const widgetsTop = screenTop + 44;

  // 底部标尺：四段等宽 + 段间「<」覆盖关系。
  const scaleW = VIEW_W - PAD * 2;
  const segGap = 8;
  const segW = (scaleW - segGap * (PRIORITY.length - 1)) / PRIORITY.length;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Style 继承与 Theme 作用域对比图，外加属性优先级标尺。左栏画 Style 继承链，用品牌紫色表达，自上而下三块：第一块是系统内置的父 style Widget.Material3.Button，定义按钮默认外观，比如圆角、内边距、字号；第二块是自定义 style MyButton，它用 parent 指向父 style Widget.Material3.Button，只覆盖 textColor 这一个属性，其余全部沿用父 style，这一步用一条带箭头的实线表达继承加覆盖；第三块是把这个 style 应用到单个 View，写法是 Button 标签上 style 等于 at style 斜杠 MyButton，强调 style 只作用在这一个按钮上，这一步也用带箭头的实线连接。右栏画 Theme 作用域，用绿色表达：顶部一条是在 application 标签的 android colon theme 属性里声明一次主题，也可以在 Activity 级声明，然后一条总线从主题声明渗透进下方一个代表整个界面的大框，框里有 Button、TextView、Switch 三个控件，它们都用问号 attr 斜杠 colorPrimary 从主题里取色，说明主题属性会渗透到整个界面的所有 Material 组件。图底部是一条属性最终值优先级标尺，用黄色表达，从左到右四段、优先级由低到高：theme 最低，然后是 style，再是布局内联 xml，最高是代码里的 setXxx，段与段之间用小于号连接，表示右边的来源会覆盖左边，也就是后者覆盖前者。整图点明两条关键区别：第一，style 作用于单个 View，theme 作用于整个 Activity 或 App 且它的属性可以被问号 attr 引用；第二，同名属性的最终值优先级是 theme 小于 style 小于布局内联 xml 小于代码 setXxx。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* —— 大标题 —— */}
          <text
            x={PAD}
            y={TITLE_TOP}
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Style 改一个控件，Theme 管整个界面；同名属性看优先级
          </text>
          <text
            x={PAD}
            y={SUBTITLE_TOP}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            左：style 继承链作用于单个 View　右：theme 作用域覆盖整个 Activity/App
          </text>

          {/* —— 左栏小节标题 —— */}
          <text
            x={STYLE_X}
            y={COL_TOP - 10}
            fontSize="11"
            fontWeight="700"
            fill="var(--accent)"
          >
            ① Style 继承链：父 → 自定义 → 单个 View
          </text>

          {/* —— 左栏：Style 链节点间箭头（继承+覆盖 / 应用）—— */}
          {["继承父属性，只覆盖 textColor", "应用到这一个 Button"].map((label, i) => {
            const fromBottom = styleStepTop(i) + STEP_H;
            const toTop = styleStepTop(i + 1);
            const x = STYLE_X + STEP_W / 2;
            return (
              <g key={label}>
                <line
                  x1={x}
                  y1={fromBottom}
                  x2={x}
                  y2={toTop - ARROW}
                  stroke="var(--accent)"
                  strokeWidth="1.6"
                />
                <path
                  d={`M ${x} ${toTop}
                      l -${ARROW} -${ARROW * 1.6}
                      l ${ARROW * 2} 0 Z`}
                  fill="var(--accent)"
                />
                <text
                  x={x + STEP_W / 2 - 8}
                  y={(fromBottom + toTop) / 2 + 4}
                  textAnchor="end"
                  fontSize="9.5"
                  fontWeight="600"
                  fill="var(--accent)"
                >
                  ↓ {label}
                </text>
              </g>
            );
          })}

          {/* —— 左栏：Style 三节点卡片 —— */}
          {STYLE_CHAIN.map((s, i) => {
            const y = styleStepTop(i);
            return (
              <g key={s.title}>
                <rect
                  x={STYLE_X}
                  y={y}
                  width={STEP_W}
                  height={STEP_H}
                  rx="8"
                  fill="var(--accent)"
                  fillOpacity="0.08"
                  stroke="var(--accent)"
                  strokeWidth="1.4"
                />
                {/* 左侧 accent 色条 */}
                <rect
                  x={STYLE_X}
                  y={y}
                  width="4"
                  height={STEP_H}
                  rx="2"
                  fill="var(--accent)"
                />
                <text
                  x={STYLE_X + 16}
                  y={y + 24}
                  fontSize="11.5"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill="var(--accent)"
                >
                  {s.title}
                </text>
                <text
                  x={STYLE_X + 16}
                  y={y + 42}
                  fontSize="10"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {s.sub}
                </text>
                {s.notes.map((n, j) => (
                  <text
                    key={n}
                    x={STYLE_X + 16}
                    y={y + 58 + j * 14}
                    fontSize="9.5"
                    fill="var(--text-secondary)"
                  >
                    {n}
                  </text>
                ))}
              </g>
            );
          })}

          {/* —— 右栏小节标题 —— */}
          <text
            x={THEME_X}
            y={COL_TOP - 10}
            fontSize="11"
            fontWeight="700"
            fill="var(--success)"
          >
            ② Theme 作用域：声明一次，渗透整个界面
          </text>

          {/* —— 右栏：theme 声明条 —— */}
          <rect
            x={THEME_X}
            y={COL_TOP}
            width={THEME_W}
            height={THEME_BAR_H}
            rx="8"
            fill="var(--success)"
            fillOpacity="0.1"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <text
            x={THEME_X + 14}
            y={COL_TOP + 22}
            fontSize="10.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--success)"
          >
            &lt;application android:theme=&quot;@style/Theme.MyApp&quot;&gt;
          </text>
          <text
            x={THEME_X + 14}
            y={COL_TOP + 40}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            声明一次（或 Activity 级）→ colorPrimary 等属性全局生效
          </text>

          {/* —— 渗透总线：theme 声明 → 整个界面 —— */}
          <line
            x1={themeBarCx}
            y1={barBottom}
            x2={themeBarCx}
            y2={screenTop - ARROW}
            stroke="var(--success)"
            strokeWidth="1.6"
            strokeDasharray="5 4"
          />
          <path
            d={`M ${themeBarCx} ${screenTop}
                l -${ARROW} -${ARROW * 1.6}
                l ${ARROW * 2} 0 Z`}
            fill="var(--success)"
          />
          <text
            x={themeBarCx + 10}
            y={(barBottom + screenTop) / 2 + 4}
            fontSize="9.5"
            fontWeight="600"
            fill="var(--success)"
          >
            渗透到整个界面
          </text>

          {/* —— 整个界面框 —— */}
          <rect
            x={THEME_X}
            y={screenTop}
            width={THEME_W}
            height={SCREEN_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={THEME_X + 14}
            y={screenTop + 22}
            fontSize="10"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            整个 Activity 界面
          </text>

          {/* 界面内多个控件：都用 ?attr/colorPrimary 取色 */}
          {THEME_WIDGETS.map((w, i) => {
            const y = widgetsTop + i * (WIDGET_H + WIDGET_GAP);
            return (
              <g key={w}>
                <rect
                  x={widgetX}
                  y={y}
                  width={widgetW}
                  height={WIDGET_H}
                  rx="6"
                  fill="var(--success)"
                  fillOpacity="0.07"
                  stroke="var(--success)"
                  strokeWidth="1.2"
                />
                <text
                  x={widgetX + 12}
                  y={y + WIDGET_H / 2 + 4}
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {w}
                </text>
                <text
                  x={widgetX + widgetW - 10}
                  y={y + WIDGET_H / 2 + 4}
                  textAnchor="end"
                  fontSize="9.5"
                  fontFamily="var(--font-mono)"
                  fill="var(--success)"
                >
                  ?attr/colorPrimary
                </text>
              </g>
            );
          })}

          {/* —— 底部：属性最终值优先级标尺 —— */}
          <text
            x={PAD}
            y={SCALE_TITLE_Y}
            fontSize="11"
            fontWeight="700"
            fill="var(--warning)"
          >
            ③ 同名属性最终值优先级（左低右高，后者覆盖前者）
          </text>
          {PRIORITY.map((p, i) => {
            const x = PAD + i * (segW + segGap);
            const isTop = i === PRIORITY.length - 1;
            return (
              <g key={p}>
                <rect
                  x={x}
                  y={SCALE_TOP}
                  width={segW}
                  height={SCALE_H}
                  rx="8"
                  fill="var(--warning)"
                  fillOpacity={0.06 + i * 0.05}
                  stroke="var(--warning)"
                  strokeWidth={isTop ? 1.8 : 1.3}
                />
                <text
                  x={x + segW / 2}
                  y={SCALE_TOP + 19}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight={isTop ? 700 : 600}
                  fontFamily="var(--font-mono)"
                  fill={isTop ? "var(--warning)" : "var(--text-primary)"}
                >
                  {p}
                </text>
                <text
                  x={x + segW / 2}
                  y={SCALE_TOP + 35}
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--text-secondary)"
                >
                  {isTop ? "优先级最高" : "被右侧覆盖"}
                </text>
                {/* 段间「<」覆盖关系标记 */}
                {i < PRIORITY.length - 1 && (
                  <text
                    x={x + segW + segGap / 2}
                    y={SCALE_TOP + SCALE_H / 2 + 4}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill="var(--warning)"
                  >
                    {"<"}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        <strong>Style</strong> 是「单个 View 的穿搭模板」：用点记法/<code>parent</code>{" "}
        继承父 style，只覆盖少量属性，再以 <code>style=&quot;@style/MyButton&quot;</code>{" "}
        套到某个控件上。<strong>Theme</strong> 是「整个界面的皮肤」：在{" "}
        <code>android:theme</code> 声明一次便作用于整个 Activity/App，控件用{" "}
        <code>?attr/colorPrimary</code> 从主题取色。同名属性最终值优先级：
        <code> theme &lt; style &lt; 布局内联 xml &lt; 代码 setXxx</code>——后者覆盖前者。
      </figcaption>
    </figure>
  );
}
