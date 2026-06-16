/**
 * <WindowManagerDiagram />：《Android 进阶解密》core-services/window-manager 章
 * 「Window / View / WindowManager 关系」配图（HEL-204）。
 *
 * 画面内容：三条横向带，自上而下讲清「一块界面是怎么被一个 Window 托起来的」。
 *  上带——Activity 的 PhoneWindow → DecorView（顶层 View）→ View 树：
 *   一个 Activity 对应一个 Window（PhoneWindow），DecorView 是这个 Window 里的顶层 View，
 *   它往下挂出整棵 View 树（标题栏区 + 内容区）。
 *  中带——WindowManager 接口体系（接口 → 实现 → 单例）：
 *   WindowManager（接口，App 拿到的就是它）→ WindowManagerImpl（具体实现，每个 Window 各一个）→
 *   WindowManagerGlobal（进程级单例，管理本进程所有 Window 的 ViewRootImpl/DecorView 两份列表）。
 *  下带——一个 Window 的「绘制三件套」：
 *   一个 Window 对应一个 ViewRootImpl + 一个 Surface；ViewRootImpl 是 View 树与 WMS 通信的桥梁，
 *   Surface 是这块窗口最终画到的画布。addView(decorView, params) 把 DecorView 关联到新建的 Window。
 *  右上角窗口类型图例：type 决定 z-order 层级——应用窗口 / 子窗口 / 系统窗口，值越大越在上面。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（accent / success / warning / text-primary /
 * text-secondary / border / bg / bg-elevated），无裸 hex，rx 圆角，无阴影，
 * 几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 窗口类型图例项：label = 类型名；range = type 取值范围；color = 语义色 token。 ——
type WinType = {
  /** 窗口类型名。 */
  label: string;
  /** type 取值范围。 */
  range: string;
  /** 举例。 */
  example: string;
  /** 语义色 token。 */
  color: string;
};

const WIN_TYPES: readonly WinType[] = [
  {
    label: "应用窗口",
    range: "1–99",
    example: "Activity 窗口",
    color: "var(--success)",
  },
  {
    label: "子窗口",
    range: "1000–1999",
    example: "Dialog / PopupWindow",
    color: "var(--accent)",
  },
  {
    label: "系统窗口",
    range: "2000–2999",
    example: "Toast / 状态栏 / 输入法",
    color: "var(--warning)",
  },
];

// —— 中带 WindowManager 接口三级链：tag = 名称；kind = 角色；note = 一句话职责。 ——
type WmNode = {
  /** 类 / 接口名。 */
  tag: string;
  /** 角色（接口 / 实现 / 单例）。 */
  kind: string;
  /** 职责说明。 */
  note: string;
};

const WM_CHAIN: readonly WmNode[] = [
  {
    tag: "WindowManager",
    kind: "接口",
    note: "App 拿到的窗口管理器（Binder 客户端代理）",
  },
  {
    tag: "WindowManagerImpl",
    kind: "实现",
    note: "接口的具体实现，每个 Window 各持一个",
  },
  {
    tag: "WindowManagerGlobal",
    kind: "进程单例",
    note: "管本进程所有 Window 的 ViewRootImpl/DecorView 列表",
  },
];

// —— 布局常量（间距走 4 倍数语言）。 ——
const MARGIN_X = 24; // 内容区左右边距
const TOP = 72; // 第一带顶部 y（标题留白）

// 上带：PhoneWindow → DecorView → View 树（三块满宽横向排开 + 右箭头）。
const TOP_CARD_W = 208; // 上带卡片宽
const TOP_CARD_H = 96; // 上带卡片高
const TOP_GAP = 44; // 上带卡片间距（容纳右向箭头）

// 中带（左列）：WindowManager 接口三级链（三块竖向排开 + 下箭头）。
const MID_TOP = TOP + TOP_CARD_H + 64; // 中带顶部 y
const MID_CARD_W = 336; // 中带卡片宽
const MID_CARD_H = 72; // 中带卡片高
const MID_GAP = 36; // 中带卡片竖向间距（容纳「↓ 委托」箭头）
const MID_X = MARGIN_X; // 中带左列 x

// 右列：上半窗口类型图例，下半「一个 Window 的绘制三件套」（ViewRootImpl / Surface）。
const RIGHT_X = MID_X + MID_CARD_W + 64; // 右列左边距
const RIGHT_W = 304; // 右列卡片/图例宽

// 右列上半：窗口类型图例块。
const LEGEND_ROW_H = 36; // 图例行高
const LEGEND_PAD = 16; // 图例块内边距（上下各半）
const LEGEND_TOP = MID_TOP; // 图例块顶部 y（与中带首块齐平）
const LEGEND_H = WIN_TYPES.length * LEGEND_ROW_H + LEGEND_PAD; // 图例块高

// 右列下半：ViewRootImpl + Surface 两张「绘制三件套」卡片。
const BIND_TOP = LEGEND_TOP + LEGEND_H + 44; // 绑定卡片区顶部 y（图例下方留出标题空间）
const BIND_H = 64; // 绑定卡片高
const BIND_GAP = 28; // 绑定卡片间距

const ARROW = 5; // 箭头三角半高

// 中带底部 y（决定整图高度，取左/右两列更深者）。
const MID_BOTTOM = MID_TOP + WM_CHAIN.length * MID_CARD_H + (WM_CHAIN.length - 1) * MID_GAP;
const RIGHT_BOTTOM = BIND_TOP + 2 * BIND_H + BIND_GAP;

const VIEW_W = 760;
const VIEW_H = Math.max(MID_BOTTOM, RIGHT_BOTTOM) + 48;

/** 中带第 i 块的顶部 y。 */
function midTop(i: number): number {
  return MID_TOP + i * (MID_CARD_H + MID_GAP);
}

export function WindowManagerDiagram() {
  // 上带三块的 x 起点。
  const topCardX = (i: number) => MARGIN_X + i * (TOP_CARD_W + TOP_GAP);
  const topRoles: readonly { tag: string; sub: string; color: string }[] = [
    { tag: "PhoneWindow", sub: "Activity 的 Window", color: "var(--success)" },
    { tag: "DecorView", sub: "Window 的顶层 View", color: "var(--accent)" },
    { tag: "View 树", sub: "标题栏 + 内容区", color: "var(--text-primary)" },
  ];

  // 下带：ViewRootImpl + Surface 两张「绘制三件套」卡片，与中带 WindowManagerGlobal 行对齐。
  const bindCards: readonly { tag: string; note: string; color: string }[] = [
    {
      tag: "ViewRootImpl",
      note: "View 树 ↔ WMS 的通信桥梁，驱动 measure/layout/draw",
      color: "var(--accent)",
    },
    {
      tag: "Surface",
      note: "这块 Window 最终绘制到的画布",
      color: "var(--warning)",
    },
  ];
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Window、View 与 WindowManager 三者关系图，分三条横向带。最上面一带表达一个 Activity 对应一个 Window：Activity 持有一个 PhoneWindow，PhoneWindow 里装着 DecorView，DecorView 是这个 Window 的顶层 View，它再往下挂出整棵 View 树（标题栏区加内容区），三者用向右的箭头依次相连。中间一带是 WindowManager 的接口体系，竖向三级、用向下的委托箭头串起来：最上是 WindowManager，它是一个接口，也是 App 实际拿到的窗口管理器，本质是一个 Binder 客户端代理；它委托给 WindowManagerImpl，这是接口的具体实现，每个 Window 各持有一个；WindowManagerImpl 又把活儿交给 WindowManagerGlobal，这是一个进程级单例，集中管理本进程所有 Window 的 ViewRootImpl 列表和 DecorView 列表。右侧下方一带表达一个 Window 的绘制三件套：一个 Window 对应一个 ViewRootImpl 加一个 Surface；ViewRootImpl 是 View 树与窗口管理服务 WMS 通信的桥梁，负责驱动 measure、layout、draw 流程；Surface 是这块窗口最终绘制到的画布。底部点明 addView 把 DecorView 加进 params 描述的新 Window，由 WindowManagerGlobal 为它新建 ViewRootImpl。右上角是窗口类型图例，说明 WindowManager.LayoutParams 的 type 决定 z-order 层级，值越大越在上：应用窗口范围 1 到 99，例如 Activity 窗口；子窗口范围 1000 到 1999，例如 Dialog 和 PopupWindow；系统窗口范围 2000 到 2999，例如 Toast、状态栏和输入法。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* —— 标题 —— */}
          <text
            x={MARGIN_X}
            y="28"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Window / View / WindowManager：一块界面是怎么被一个 Window 托起来的
          </text>
          <text
            x={MARGIN_X}
            y="46"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            一个 Activity 一个 Window；WindowManager 接口背后是进程单例 WindowManagerGlobal
          </text>

          {/* —— 上带：PhoneWindow → DecorView → View 树 —— */}
          <text
            x={MARGIN_X}
            y={TOP - 12}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一个 Activity = 一个 Window：PhoneWindow → DecorView → View 树
          </text>
          {topRoles.map((r, i) => {
            const x = topCardX(i);
            return (
              <g key={r.tag}>
                <rect
                  x={x}
                  y={TOP}
                  width={TOP_CARD_W}
                  height={TOP_CARD_H}
                  rx="8"
                  fill={r.color}
                  fillOpacity="0.08"
                  stroke={r.color}
                  strokeWidth="1.4"
                />
                {/* 左侧语义色条 */}
                <rect
                  x={x}
                  y={TOP}
                  width="4"
                  height={TOP_CARD_H}
                  rx="2"
                  fill={r.color}
                />
                <text
                  x={x + 16}
                  y={TOP + 32}
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill={r.color}
                >
                  {r.tag}
                </text>
                <text
                  x={x + 16}
                  y={TOP + 54}
                  fontSize="10"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {r.sub}
                </text>
                {/* 卡片间向右箭头 + 关系标签 */}
                {i < topRoles.length - 1 && (
                  <>
                    <line
                      x1={x + TOP_CARD_W}
                      y1={TOP + TOP_CARD_H / 2}
                      x2={x + TOP_CARD_W + TOP_GAP - ARROW}
                      y2={TOP + TOP_CARD_H / 2}
                      stroke="var(--text-secondary)"
                      strokeWidth="1.6"
                    />
                    <path
                      d={`M ${x + TOP_CARD_W + TOP_GAP} ${TOP + TOP_CARD_H / 2}
                          l -${ARROW * 1.6} -${ARROW}
                          l 0 ${ARROW * 2} Z`}
                      fill="var(--text-secondary)"
                    />
                    <text
                      x={x + TOP_CARD_W + TOP_GAP / 2}
                      y={TOP + TOP_CARD_H / 2 - 8}
                      textAnchor="middle"
                      fontSize="9"
                      fill="var(--text-secondary)"
                    >
                      {i === 0 ? "持有" : "挂出"}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* —— 中带：WindowManager 接口三级链（接口 → 实现 → 单例）—— */}
          <text
            x={MID_X}
            y={MID_TOP - 14}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            WindowManager 接口体系：接口 → 实现 → 进程单例
          </text>
          {WM_CHAIN.map((n, i) => {
            const y = midTop(i);
            const isSingleton = i === WM_CHAIN.length - 1;
            const color = isSingleton ? "var(--success)" : "var(--accent)";
            return (
              <g key={n.tag}>
                <rect
                  x={MID_X}
                  y={y}
                  width={MID_CARD_W}
                  height={MID_CARD_H}
                  rx="8"
                  fill={color}
                  fillOpacity={isSingleton ? "0.1" : "0.07"}
                  stroke={color}
                  strokeWidth="1.4"
                />
                {/* 左侧语义色条 */}
                <rect
                  x={MID_X}
                  y={y}
                  width="4"
                  height={MID_CARD_H}
                  rx="2"
                  fill={color}
                />
                <text
                  x={MID_X + 16}
                  y={y + 24}
                  fontSize="12.5"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill={color}
                >
                  {n.tag}
                </text>
                {/* 角色徽标（接口 / 实现 / 进程单例） */}
                <text
                  x={MID_X + MID_CARD_W - 12}
                  y={y + 24}
                  textAnchor="end"
                  fontSize="9.5"
                  fontWeight="700"
                  fill={color}
                >
                  〔{n.kind}〕
                </text>
                <text
                  x={MID_X + 16}
                  y={y + 46}
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                >
                  {n.note}
                </text>
                {/* 段间向下「委托」箭头 */}
                {i < WM_CHAIN.length - 1 && (
                  <g>
                    <line
                      x1={MID_X + MID_CARD_W / 2}
                      y1={y + MID_CARD_H}
                      x2={MID_X + MID_CARD_W / 2}
                      y2={y + MID_CARD_H + MID_GAP - ARROW}
                      stroke="var(--text-secondary)"
                      strokeWidth="1.6"
                    />
                    <path
                      d={`M ${MID_X + MID_CARD_W / 2} ${y + MID_CARD_H + MID_GAP}
                          l -${ARROW} -${ARROW * 1.6}
                          l ${ARROW * 2} 0 Z`}
                      fill="var(--text-secondary)"
                    />
                    <text
                      x={MID_X + MID_CARD_W / 2 + 12}
                      y={y + MID_CARD_H + MID_GAP / 2 + 4}
                      fontSize="9"
                      fill="var(--text-secondary)"
                    >
                      委托
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* —— 上带 DecorView → 中带 WindowManager：addView 关联虚线 —— */}
          <line
            x1={topCardX(1) + TOP_CARD_W / 2}
            y1={TOP + TOP_CARD_H}
            x2={MID_X + MID_CARD_W / 2}
            y2={MID_TOP}
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeDasharray="5 4"
          />
          <path
            d={`M ${MID_X + MID_CARD_W / 2} ${MID_TOP}
                l -${ARROW} -${ARROW * 1.6}
                l ${ARROW * 2} 0 Z`}
            fill="var(--accent)"
          />
          <text
            x={(topCardX(1) + TOP_CARD_W / 2 + MID_X + MID_CARD_W / 2) / 2 + 8}
            y={(TOP + TOP_CARD_H + MID_TOP) / 2 + 4}
            fontSize="9.5"
            fontWeight="600"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            addView(decorView, params)
          </text>

          {/* —— 右列上半：窗口类型图例（type 决定 z-order 层级）—— */}
          <text
            x={RIGHT_X}
            y={LEGEND_TOP - 14}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            type 决定 z-order（值越大越在上）
          </text>
          <rect
            x={RIGHT_X}
            y={LEGEND_TOP}
            width={RIGHT_W}
            height={LEGEND_H}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          {WIN_TYPES.map((t, i) => {
            const rowY = LEGEND_TOP + LEGEND_PAD / 2 + i * LEGEND_ROW_H;
            return (
              <g key={t.label}>
                {/* 类型色点 */}
                <circle cx={RIGHT_X + 18} cy={rowY + LEGEND_ROW_H / 2} r="5" fill={t.color} />
                <text
                  x={RIGHT_X + 32}
                  y={rowY + LEGEND_ROW_H / 2 - 2}
                  fontSize="10.5"
                  fontWeight="700"
                  fill={t.color}
                >
                  {t.label}
                </text>
                <text
                  x={RIGHT_X + 32}
                  y={rowY + LEGEND_ROW_H / 2 + 12}
                  fontSize="9"
                  fill="var(--text-secondary)"
                >
                  type {t.range}：{t.example}
                </text>
              </g>
            );
          })}

          {/* —— 右列下半：一个 Window 的绘制三件套（ViewRootImpl + Surface）—— */}
          <text
            x={RIGHT_X}
            y={BIND_TOP - 14}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一个 Window ↔ 一个 ViewRootImpl + 一个 Surface
          </text>
          {bindCards.map((c, i) => {
            const y = BIND_TOP + i * (BIND_H + BIND_GAP);
            return (
              <g key={c.tag}>
                <rect
                  x={RIGHT_X}
                  y={y}
                  width={RIGHT_W}
                  height={BIND_H}
                  rx="8"
                  fill={c.color}
                  fillOpacity="0.08"
                  stroke={c.color}
                  strokeWidth="1.4"
                />
                {/* 左侧语义色条 */}
                <rect
                  x={RIGHT_X}
                  y={y}
                  width="4"
                  height={BIND_H}
                  rx="2"
                  fill={c.color}
                />
                <text
                  x={RIGHT_X + 16}
                  y={y + 26}
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill={c.color}
                >
                  {c.tag}
                </text>
                <text
                  x={RIGHT_X + 16}
                  y={y + 46}
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                >
                  {c.note}
                </text>
                {/* 卡片间向下连线（ViewRootImpl 持有 Surface） */}
                {i < bindCards.length - 1 && (
                  <>
                    <line
                      x1={RIGHT_X + RIGHT_W / 2}
                      y1={y + BIND_H}
                      x2={RIGHT_X + RIGHT_W / 2}
                      y2={y + BIND_H + BIND_GAP - ARROW}
                      stroke="var(--text-secondary)"
                      strokeWidth="1.4"
                      strokeDasharray="4 3"
                    />
                    <path
                      d={`M ${RIGHT_X + RIGHT_W / 2} ${y + BIND_H + BIND_GAP}
                          l -${ARROW} -${ARROW * 1.6}
                          l ${ARROW * 2} 0 Z`}
                      fill="var(--text-secondary)"
                    />
                    <text
                      x={RIGHT_X + RIGHT_W / 2 + 12}
                      y={y + BIND_H + BIND_GAP / 2 + 4}
                      fontSize="9"
                      fill="var(--text-secondary)"
                    >
                      持有
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* —— 中带单例 → 右列绑定区：「为每个 Window 建一套 ViewRootImpl + Surface」关联线 —— */}
          <line
            x1={MID_X + MID_CARD_W}
            y1={midTop(2) + MID_CARD_H / 2}
            x2={RIGHT_X - ARROW}
            y2={BIND_TOP + BIND_H / 2}
            stroke="var(--success)"
            strokeWidth="1.6"
            strokeDasharray="5 4"
          />
          <path
            d={`M ${RIGHT_X} ${BIND_TOP + BIND_H / 2}
                l -${ARROW * 1.6} -${ARROW}
                l 0 ${ARROW * 2} Z`}
            fill="var(--success)"
          />
          <text
            x={(MID_X + MID_CARD_W + RIGHT_X) / 2}
            y={(midTop(2) + MID_CARD_H / 2 + BIND_TOP + BIND_H / 2) / 2 - 6}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="var(--success)"
          >
            为每个 Window 建一套
          </text>

          {/* —— 底部点睛：addView 把 DecorView 关联到新 Window —— */}
          <text
            x={MARGIN_X}
            y={VIEW_H - 28}
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            wm.addView(decorView, params)
          </text>
          <text
            x={MARGIN_X}
            y={VIEW_H - 12}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            → DecorView 关联到 params 描述的新 Window，WindowManagerGlobal 为它建一套 ViewRootImpl + Surface
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一个 Activity 对应一个 <code>Window</code>（<code>PhoneWindow</code>），
        <code> DecorView</code> 是它的顶层 View、往下挂出整棵 View 树。App 拿到的{" "}
        <code>WindowManager</code> 是接口，背后是 <code>WindowManagerImpl</code> →
        进程单例 <code>WindowManagerGlobal</code>（统管所有 Window 的{" "}
        <code>ViewRootImpl</code>/<code>DecorView</code> 列表）。一个 Window 对应一个{" "}
        <code>ViewRootImpl</code>（View 树与 WMS 通信的桥梁）+ 一个{" "}
        <code>Surface</code>（画布）；<code>type</code> 决定窗口的 z-order 层级。
      </figcaption>
    </figure>
  );
}
