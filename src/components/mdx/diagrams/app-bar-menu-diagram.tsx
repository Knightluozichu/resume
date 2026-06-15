/**
 * <AppBarMenuDiagram />：《Android 编程权威指南》ui-fragment/app-bar 章
 * 「AppBar（Toolbar）与菜单解剖」配图（HEL-183）。
 *
 * 画面内容：
 *  上半——画一条横向 AppBar（Toolbar），从左到右分区并用引导线标注各区作用：
 *   导航图标（返回 / 汉堡）、标题 title、若干 action 按钮（图标，showAsAction 有空间就显示在栏上）、
 *   溢出菜单入口（overflow，三个点 ⋮）。
 *  下半右侧——溢出菜单展开样子：⋮ 点开后竖直列出未显示在栏上的菜单项（showAsAction=never）。
 *  下半左侧——三条关键代码点：onCreateOptionsMenu(menu, inflater) 加载 res/menu/*.xml；
 *   app:showAsAction="ifRoom|always|never" 决定该项显示在栏上还是收进溢出菜单；
 *   onOptionsItemSelected(item) 处理点击。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（栏 bg-elevated / action 图标 accent / 溢出项 text-primary /
 * text-secondary / success / warning / border / bg），无裸 hex，rx 圆角，无阴影，
 * 几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— AppBar 上的一个分区：label 名称、note 作用、color 语义色 token。 ——
type BarRegion = {
  /** 分区名称（标在引导线末端）。 */
  label: string;
  /** 该分区作用说明。 */
  note: string;
  /** 语义色 token。 */
  color: string;
};

// —— 溢出菜单展开后竖排的菜单项：title = 文案；hint = 为何在溢出里。 ——
type OverflowItem = {
  /** 菜单项文案。 */
  title: string;
  /** 旁注（为何收进溢出菜单）。 */
  hint: string;
};

// —— 三条关键代码点：code = 等宽片段；note = 一句话职责；color = 语义色 token。 ——
type CodePoint = {
  /** 等宽展示的代码 / 属性片段。 */
  code: string;
  /** 职责说明。 */
  note: string;
  /** 语义色 token。 */
  color: string;
};

const OVERFLOW_ITEMS: readonly OverflowItem[] = [
  { title: "设置", hint: 'showAsAction="never"' },
  { title: "分享", hint: "栏上放不下，收进来" },
  { title: "关于", hint: "低频项默认进溢出" },
];

const CODE_POINTS: readonly CodePoint[] = [
  {
    code: "onCreateOptionsMenu(menu, inflater)",
    note: "加载 res/menu/*.xml 填充菜单",
    color: "var(--accent)",
  },
  {
    code: 'app:showAsAction="ifRoom|always|never"',
    note: "决定该项显示在栏上还是收进溢出菜单",
    color: "var(--warning)",
  },
  {
    code: "onOptionsItemSelected(item)",
    note: "按 item.itemId 分发点击；处理完 return true",
    color: "var(--success)",
  },
];

// —— 布局常量（间距走 4 倍数语言）。 ——
const VIEW_W = 760;
const PAD_X = 24; // 左右边距

// AppBar（Toolbar）横条。
const BAR_X = PAD_X;
const BAR_Y = 72; // 顶栏色块顶部 y（标题留白）
const BAR_W = VIEW_W - PAD_X * 2; // 顶栏总宽
const BAR_H = 56; // 顶栏高（≈ actionBarSize）

// 顶栏内各槽位（从左到右）。
const SLOT_GAP = 16; // 槽位水平间距
const NAV_X = BAR_X + 16; // 导航图标左缘
const NAV_W = 32; // 导航图标方块宽
const TITLE_X = NAV_X + NAV_W + SLOT_GAP; // 标题左缘
const OVERFLOW_W = 32; // 溢出入口方块宽
const OVERFLOW_X = BAR_X + BAR_W - 16 - OVERFLOW_W; // 溢出入口左缘
const ACTION_W = 32; // 单个 action 图标方块宽
const ACTION_2_X = OVERFLOW_X - SLOT_GAP - ACTION_W; // 右二（靠近溢出）
const ACTION_1_X = ACTION_2_X - SLOT_GAP - ACTION_W; // 右一

// 引导线下方分区注释行。
const NOTE_Y = BAR_Y + BAR_H + 56; // 分区注释基线 y

// 下半区：左侧代码点 + 右侧溢出菜单。
const LOWER_Y = 224; // 下半区起点 y
const CODE_X = PAD_X; // 代码点列左缘
const CODE_W = 432; // 代码点卡片宽
const CODE_H = 56; // 代码点卡片高
const CODE_GAP = 16; // 代码点卡片间距

// 溢出菜单弹层（右侧，从 ⋮ 下方掉出）。
const MENU_W = 196; // 溢出弹层宽
const MENU_X = VIEW_W - PAD_X - MENU_W; // 溢出弹层左缘（右对齐）
const MENU_Y = LOWER_Y; // 溢出弹层顶部 y
const MENU_HEAD_H = 28; // 弹层标题条高
const MENU_ROW_H = 44; // 溢出项行高

const VIEW_H =
  LOWER_Y +
  Math.max(
    CODE_POINTS.length * (CODE_H + CODE_GAP),
    MENU_HEAD_H + OVERFLOW_ITEMS.length * MENU_ROW_H,
  ) +
  40;

// 顶栏从左到右四个分区（用于下方引导线 + 注释）。各分区的引导锚点 x 取该槽位中心。
const REGIONS: readonly (BarRegion & { anchorX: number })[] = [
  {
    label: "导航图标",
    note: "返回 ← / 汉堡 ☰",
    color: "var(--text-secondary)",
    anchorX: NAV_X + NAV_W / 2,
  },
  {
    label: "标题 title",
    note: "当前界面名",
    color: "var(--text-primary)",
    anchorX: TITLE_X + 56,
  },
  {
    label: "action 按钮",
    note: "高频项，图标直接上栏",
    color: "var(--accent)",
    anchorX: (ACTION_1_X + ACTION_2_X + ACTION_W) / 2,
  },
  {
    label: "溢出菜单 ⋮",
    note: "点开看其余项",
    color: "var(--warning)",
    anchorX: OVERFLOW_X + OVERFLOW_W / 2,
  },
];

export function AppBarMenuDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="AppBar（Toolbar）与菜单解剖图。上半部分画一条横向的 AppBar（Toolbar），从左到右分成四个区，并用虚线引导线在下方逐区标注作用：最左是导航图标区（返回箭头或汉堡菜单），接着是标题 title（显示当前界面名），右侧是 action 按钮区（两个图标按钮，属于高频操作、设置 showAsAction 后有空间就直接显示在栏上，用强调色），最右是溢出菜单入口（三个竖点 ⋮，点开后查看其余菜单项）。下半部分左侧竖排三条关键代码点：第一，onCreateOptionsMenu(menu, inflater) 负责加载 res/menu 下的 xml 资源来填充菜单；第二，属性 app:showAsAction，取值 ifRoom、always 或 never，决定某个菜单项是显示在栏上还是收进溢出菜单；第三，onOptionsItemSelected(item) 按 item.itemId 分发点击，处理完返回 true。下半部分右侧画溢出菜单展开后的样子：从 ⋮ 下方掉出一个竖直弹层，列出未显示在栏上的菜单项——设置、分享、关于，这些项的 showAsAction 多为 never 或因栏上放不下而被收纳。整张图说明：菜单项在 menu xml 里统一声明，showAsAction 决定它落在栏上还是溢出里，点击最终都回到 onOptionsItemSelected 处理。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* —— 标题 —— */}
          <text
            x={PAD_X}
            y="28"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            AppBar（Toolbar）拆开看：导航 · 标题 · action · 溢出菜单
          </text>
          <text
            x={PAD_X}
            y="46"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            菜单项在 menu XML 里声明，showAsAction 决定它落在栏上还是收进 ⋮
          </text>

          {/* —— AppBar 横条（bg-elevated + border）—— */}
          <rect
            x={BAR_X}
            y={BAR_Y}
            width={BAR_W}
            height={BAR_H}
            rx="10"
            fill="var(--bg-elevated)"
            stroke="var(--border)"
            strokeWidth="1.6"
          />

          {/* 导航图标槽（返回 ←，text-secondary） */}
          <rect
            x={NAV_X}
            y={BAR_Y + (BAR_H - NAV_W) / 2}
            width={NAV_W}
            height={NAV_W}
            rx="8"
            fill="var(--text-secondary)"
            fillOpacity="0.12"
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
          />
          <text
            x={NAV_X + NAV_W / 2}
            y={BAR_Y + BAR_H / 2 + 6}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            ←
          </text>

          {/* 标题 title */}
          <text
            x={TITLE_X}
            y={BAR_Y + BAR_H / 2 + 5}
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            犯罪记录
          </text>

          {/* action 按钮 1（accent，图标直接上栏） */}
          <rect
            x={ACTION_1_X}
            y={BAR_Y + (BAR_H - ACTION_W) / 2}
            width={ACTION_W}
            height={ACTION_W}
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.16"
            stroke="var(--accent)"
            strokeWidth="1.3"
          />
          <text
            x={ACTION_1_X + ACTION_W / 2}
            y={BAR_Y + BAR_H / 2 + 6}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--accent)"
          >
            +
          </text>

          {/* action 按钮 2（accent，图标直接上栏） */}
          <rect
            x={ACTION_2_X}
            y={BAR_Y + (BAR_H - ACTION_W) / 2}
            width={ACTION_W}
            height={ACTION_W}
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.16"
            stroke="var(--accent)"
            strokeWidth="1.3"
          />
          <text
            x={ACTION_2_X + ACTION_W / 2}
            y={BAR_Y + BAR_H / 2 + 6}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--accent)"
          >
            ⌕
          </text>

          {/* 溢出菜单入口 ⋮（warning，点开看其余项） */}
          <rect
            x={OVERFLOW_X}
            y={BAR_Y + (BAR_H - OVERFLOW_W) / 2}
            width={OVERFLOW_W}
            height={OVERFLOW_W}
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.14"
            stroke="var(--warning)"
            strokeWidth="1.3"
          />
          <text
            x={OVERFLOW_X + OVERFLOW_W / 2}
            y={BAR_Y + BAR_H / 2 + 6}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--warning)"
          >
            ⋮
          </text>

          {/* —— 各分区引导线 → 下方注释 —— */}
          {REGIONS.map((r) => (
            <g key={r.label}>
              {/* 引导线：从栏底掉到注释行上方 */}
              <line
                x1={r.anchorX}
                y1={BAR_Y + BAR_H + 4}
                x2={r.anchorX}
                y2={NOTE_Y - 26}
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.7"
              />
              {/* 分区名 */}
              <text
                x={r.anchorX}
                y={NOTE_Y - 12}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="700"
                fill={r.color}
              >
                {r.label}
              </text>
              {/* 作用说明 */}
              <text
                x={r.anchorX}
                y={NOTE_Y + 4}
                textAnchor="middle"
                fontSize="9.5"
                fill="var(--text-secondary)"
              >
                {r.note}
              </text>
            </g>
          ))}

          {/* —— 分隔线 —— */}
          <line
            x1={PAD_X}
            y1={LOWER_Y - 24}
            x2={VIEW_W - PAD_X}
            y2={LOWER_Y - 24}
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* —— 下半左侧：三条关键代码点 —— */}
          <text
            x={CODE_X}
            y={LOWER_Y - 6}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            菜单是怎么来的、怎么落位、点击怎么处理
          </text>
          {CODE_POINTS.map((c, i) => {
            const y = LOWER_Y + 8 + i * (CODE_H + CODE_GAP);
            return (
              <g key={c.code}>
                <rect
                  x={CODE_X}
                  y={y}
                  width={CODE_W}
                  height={CODE_H}
                  rx="8"
                  fill={c.color}
                  fillOpacity="0.08"
                  stroke={c.color}
                  strokeWidth="1.3"
                />
                {/* 左侧语义色条 */}
                <rect
                  x={CODE_X}
                  y={y}
                  width="4"
                  height={CODE_H}
                  rx="2"
                  fill={c.color}
                />
                {/* 等宽代码片段 */}
                <text
                  x={CODE_X + 16}
                  y={y + 22}
                  fontSize="10.5"
                  fontFamily="var(--font-mono)"
                  fontWeight="600"
                  fill={c.color}
                >
                  {c.code}
                </text>
                {/* 职责说明 */}
                <text
                  x={CODE_X + 16}
                  y={y + 42}
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {c.note}
                </text>
              </g>
            );
          })}

          {/* —— 下半右侧：⋮ 点开后掉出的溢出菜单弹层 —— */}
          {/* 从溢出入口到弹层的引导线 */}
          <line
            x1={OVERFLOW_X + OVERFLOW_W / 2}
            y1={BAR_Y + BAR_H + 4}
            x2={MENU_X + MENU_W - 16}
            y2={MENU_Y}
            stroke="var(--warning)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            opacity="0.8"
          />
          {/* 弹层标题条 */}
          <rect
            x={MENU_X}
            y={MENU_Y}
            width={MENU_W}
            height={MENU_HEAD_H}
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.14"
            stroke="var(--warning)"
            strokeWidth="1.3"
          />
          <text
            x={MENU_X + 12}
            y={MENU_Y + 18}
            fontSize="10.5"
            fontWeight="700"
            fill="var(--warning)"
          >
            ⋮ 溢出菜单（点开后）
          </text>
          {/* 弹层主体（承载竖排菜单项） */}
          <rect
            x={MENU_X}
            y={MENU_Y + MENU_HEAD_H}
            width={MENU_W}
            height={OVERFLOW_ITEMS.length * MENU_ROW_H}
            rx="8"
            fill="var(--bg-elevated)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          {OVERFLOW_ITEMS.map((item, i) => {
            const rowY = MENU_Y + MENU_HEAD_H + i * MENU_ROW_H;
            return (
              <g key={item.title}>
                {/* 行间分隔线（除首行外） */}
                {i > 0 && (
                  <line
                    x1={MENU_X + 8}
                    y1={rowY}
                    x2={MENU_X + MENU_W - 8}
                    y2={rowY}
                    stroke="var(--border)"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                )}
                {/* 菜单项文案（text-primary） */}
                <text
                  x={MENU_X + 16}
                  y={rowY + 20}
                  fontSize="11.5"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {item.title}
                </text>
                {/* 旁注（为何在溢出里） */}
                <text
                  x={MENU_X + 16}
                  y={rowY + 36}
                  fontSize="9"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-secondary)"
                >
                  {item.hint}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        <code>AppBar</code>（Toolbar）从左到右是导航图标、标题、若干 action 图标和溢出入口{" "}
        <code>⋮</code>。菜单项统一在 <code>res/menu/*.xml</code> 里声明，由{" "}
        <code>onCreateOptionsMenu</code> 加载；<code>app:showAsAction</code>（
        <code>ifRoom</code>/<code>always</code>/<code>never</code>
        ）决定它显示在栏上还是收进 <code>⋮</code>；点击最终都回到{" "}
        <code>onOptionsItemSelected</code> 按 <code>itemId</code> 分发处理。
      </figcaption>
    </figure>
  );
}
