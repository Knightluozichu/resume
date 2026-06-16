/**
 * <ContextHierarchyDiagram />：《Android 进阶解密》core-services/context 章
 * 「Context 继承体系 + 一个 App 里有多少个 Context」配图（HEL-203）。
 *
 * 画面分左右两部分：
 *  左：Context 类继承树（缩进树 + 折线连接，参考 ViewHierarchyDiagram 的树画法）：
 *   - 根 Context（抽象基类，text-secondary）→ ContextWrapper（装饰器基类，text-secondary）。
 *   - ContextWrapper 下分两支：
 *       · ContextThemeWrapper（带主题）→ Activity（accent，UI 分支）。
 *       · Service / Application 直接继承 ContextWrapper（Application 用 success）。
 *   - 标注：ContextImpl 是真正实现 Context 所有方法的类；ContextWrapper 持有 mBase
 *     字段指向 ContextImpl（装饰器模式——调用全转发给 mBase）。
 *  右：一个 App 里 Context 的数量——
 *   - Context 总数 = 1 个 Application + N 个 Activity + M 个 Service，画几个实例方块。
 *   - 标注：Activity / Service 自己就是 Context；用错 Context 致内存泄漏
 *     （长生命周期对象持有 Activity Context）→ danger 警示；
 *     getApplicationContext() 返回 Application 单例，适合长生命周期。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（基类 text-secondary / Activity 分支 accent /
 * Application success / 泄漏警示 danger / border / bg），无裸 hex，rx 圆角，无阴影，
 * 几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 继承树节点：depth = 缩进层级；branch 决定配色（基类灰 / Activity 紫 / Application 绿）；
//    note = 右侧一句话注释（可选）；impl = 是否为「真正实现」标记。 ——
type TreeNode = {
  /** 显示文本（类名）。 */
  label: string;
  /** 缩进层级（0 = 根 Context）。 */
  depth: number;
  /** base = 抽象基类 / 装饰器基类；activity = UI 主题分支；app = Application 分支；node = 其它子类。 */
  branch: "base" | "activity" | "app" | "node";
  /** 右侧一句话注释；缺省则不画注释。 */
  note?: string;
};

const NODES: readonly TreeNode[] = [
  { label: "Context", depth: 0, branch: "base", note: "抽象基类：声明全部能力" },
  { label: "ContextWrapper", depth: 1, branch: "base", note: "装饰器基类：持有 mBase，调用全转发" },
  { label: "ContextThemeWrapper", depth: 2, branch: "activity", note: "在 Wrapper 上再加「主题」" },
  { label: "Activity", depth: 3, branch: "activity", note: "有主题、有 Window Token（UI 用它）" },
  { label: "Service", depth: 2, branch: "node", note: "直接继承 Wrapper，无主题" },
  { label: "Application", depth: 2, branch: "app", note: "全局单例，生命周期 = 进程" },
];

// —— 布局常量（间距走 4 倍数语言）。 ——
const ROW_H = 40; // 树行高
const INDENT = 24; // 每层缩进
const TREE_X0 = 24; // 第一列文本左边距
const ICON_W = 16; // 行首图标占位宽
const TREE_TOP = 72; // 第一行 baseline 之上的标题留白
const NOTE_X = 248; // 树右侧注释统一左对齐起点

// ContextImpl 旁注块（装饰器目标）。
const IMPL_X = 24; // ContextImpl 旁注块左边距
const IMPL_W = 416; // ContextImpl 旁注块宽
const IMPL_H = 48; // ContextImpl 旁注块高
const IMPL_TOP = TREE_TOP + NODES.length * ROW_H + 16; // ContextImpl 旁注块顶部 y

// 右侧「一个 App 里有多少 Context」面板。
const PANEL_X = 468; // 面板左边距
const PANEL_TOP = 72; // 面板顶部 y
const PANEL_W = 268; // 面板宽
const COUNT_BOX_W = 116; // 实例方块宽
const COUNT_BOX_H = 40; // 实例方块高
const COUNT_GAP = 12; // 实例方块竖向间距

const VIEW_W = 760;
const VIEW_H = IMPL_TOP + IMPL_H + 40;

/** 行首文本 x（按缩进推进）。 */
function rowTextX(depth: number): number {
  return TREE_X0 + depth * INDENT + ICON_W;
}

/** 分支语义色：基类灰、Activity 紫、Application 绿、其它子类正文色。 */
function branchColor(branch: TreeNode["branch"]): string {
  if (branch === "activity") return "var(--accent)";
  if (branch === "app") return "var(--success)";
  if (branch === "base") return "var(--text-secondary)";
  return "var(--text-primary)";
}

export function ContextHierarchyDiagram() {
  // 右侧实例方块：Application(1) / Activity(N) / Service(M)。
  const countRows: readonly { label: string; sub: string; color: string }[] = [
    { label: "Application × 1", sub: "全局单例", color: "var(--success)" },
    { label: "Activity × N", sub: "每个页面一个", color: "var(--accent)" },
    { label: "Service × M", sub: "每个服务一个", color: "var(--text-primary)" },
  ];
  const countTop = PANEL_TOP + 32; // 公式标题下方开始排实例方块

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Context 继承体系与一个 App 里 Context 数量示意图。左侧是 Context 的类继承树，靠缩进和折线表达父子关系：根是抽象基类 Context，它声明了全部能力；它下面是装饰器基类 ContextWrapper，ContextWrapper 持有一个 mBase 字段指向真正的实现类 ContextImpl，并把所有方法调用转发给 mBase，这就是装饰器模式。ContextWrapper 下面分三支：第一支是 ContextThemeWrapper，它在 Wrapper 之上再加上主题概念，它的子类是 Activity，Activity 有主题、有 Window Token，是 UI 操作要用的 Context；第二支是 Service，直接继承 ContextWrapper，没有主题；第三支是 Application，也直接继承 ContextWrapper，它是全局单例，生命周期和进程一样长。树下方有一个旁注说明：ContextImpl 才是真正实现 Context 所有方法的类，ContextWrapper 通过 mBase 字段持有它。右侧面板讲一个 App 里到底有多少个 Context：Context 总数等于 1 个 Application 加 N 个 Activity 加 M 个 Service，因为 Activity 和 Service 它们自己就是 Context。面板底部用红色警示：如果让生命周期很长的对象，比如单例，持有 Activity 的 Context，会导致内存泄漏；正确做法是调用 getApplicationContext，它返回 Application 这个单例 Context，适合长生命周期持有。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* —— 标题 —— */}
          <text
            x={TREE_X0}
            y="28"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Context 继承体系：一棵树 + 一个装饰器
          </text>
          <text
            x={TREE_X0}
            y="48"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            ContextWrapper 持 mBase 指向 ContextImpl（真正实现），调用全转发——装饰器模式
          </text>

          {/* —— 树状连线：每个非根节点画「从父级竖干引出的横枝」。 —— */}
          {NODES.map((n, i) => {
            if (n.depth === 0) return null;
            const y = TREE_TOP + i * ROW_H + ROW_H / 2;
            const trunkX = TREE_X0 + (n.depth - 1) * INDENT + ICON_W / 2;
            const branchEndX = TREE_X0 + n.depth * INDENT + ICON_W / 2 - 2;
            // 找上一个 depth = n.depth-1 的父节点行号，竖干从父行中心延到本行中心。
            let parentRow = i - 1;
            for (let k = i - 1; k >= 0; k--) {
              if (NODES[k].depth === n.depth - 1) {
                parentRow = k;
                break;
              }
            }
            const parentY = TREE_TOP + parentRow * ROW_H + ROW_H / 2;
            return (
              <g key={`edge-${n.label}-${i}`}>
                <line
                  x1={trunkX}
                  y1={parentY}
                  x2={trunkX}
                  y2={y}
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                <line
                  x1={trunkX}
                  y1={y}
                  x2={branchEndX}
                  y2={y}
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
              </g>
            );
          })}

          {/* —— 节点行：色点标记 + 类名 + 右侧一句话注释 —— */}
          {NODES.map((n, i) => {
            const y = TREE_TOP + i * ROW_H + ROW_H / 2;
            const tx = rowTextX(n.depth);
            const color = branchColor(n.branch);
            const isBase = n.branch === "base";
            const iconCx = tx - ICON_W / 2 - 2;
            return (
              <g key={`node-${n.label}-${i}`}>
                {/* 行首标记：基类用空心圈（抽象/装饰器基类），具体子类用实心圆点（语义色） */}
                {isBase ? (
                  <circle
                    cx={iconCx}
                    cy={y}
                    r="5"
                    fill="var(--bg)"
                    stroke={color}
                    strokeWidth="1.4"
                  />
                ) : (
                  <circle cx={iconCx} cy={y} r="5" fill={color} opacity="0.9" />
                )}
                {/* 类名文本 */}
                <text
                  x={tx}
                  y={y + 4}
                  fontSize={n.depth === 0 ? 13 : 12}
                  fontWeight={isBase ? 700 : 600}
                  fontFamily="var(--font-mono)"
                  fill={color}
                >
                  {n.label}
                </text>

                {/* 右侧一句话注释（有 note 才画）+ 引导虚线 */}
                {n.note && (
                  <>
                    <line
                      x1={tx + n.label.length * 7 + 10}
                      y1={y}
                      x2={NOTE_X - 6}
                      y2={y}
                      stroke="var(--border)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      opacity="0.6"
                    />
                    <text
                      x={NOTE_X}
                      y={y + 3.5}
                      fontSize="9.5"
                      fill="var(--text-secondary)"
                    >
                      {n.note}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* —— ContextImpl 旁注块：装饰器真正转发的目标 —— */}
          <rect
            x={IMPL_X}
            y={IMPL_TOP}
            width={IMPL_W}
            height={IMPL_H}
            rx="8"
            fill="var(--text-secondary)"
            fillOpacity="0.07"
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
          <text
            x={IMPL_X + 14}
            y={IMPL_TOP + 20}
            fontSize="11"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            ContextImpl
          </text>
          <text
            x={IMPL_X + 14}
            y={IMPL_TOP + 37}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            唯一真正实现 Context 所有方法的类；ContextWrapper.mBase 即指向它
          </text>

          {/* —— 右侧面板：一个 App 里有多少个 Context —— */}
          <text
            x={PANEL_X}
            y={PANEL_TOP - 24}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一个 App 里有多少个 Context？
          </text>
          {/* 公式行：总数 = 1 + N + M */}
          <text
            x={PANEL_X}
            y={PANEL_TOP}
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            总数 = 1 (Application) + N (Activity) + M (Service)
          </text>

          {/* 三个实例方块（Application / Activity / Service 各一类） */}
          {countRows.map((c, i) => {
            const y = countTop + i * (COUNT_BOX_H + COUNT_GAP);
            return (
              <g key={c.label}>
                <rect
                  x={PANEL_X}
                  y={y}
                  width={COUNT_BOX_W}
                  height={COUNT_BOX_H}
                  rx="8"
                  fill={c.color}
                  fillOpacity="0.1"
                  stroke={c.color}
                  strokeWidth="1.4"
                />
                <text
                  x={PANEL_X + COUNT_BOX_W / 2}
                  y={y + 18}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill={c.color}
                >
                  {c.label}
                </text>
                <text
                  x={PANEL_X + COUNT_BOX_W / 2}
                  y={y + 33}
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--text-secondary)"
                >
                  {c.sub}
                </text>
                {/* 右侧一句话：自己就是 Context */}
                <text
                  x={PANEL_X + COUNT_BOX_W + 12}
                  y={y + COUNT_BOX_H / 2 + 3.5}
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                >
                  {i === 0
                    ? "长生命周期就用它"
                    : "它自己就是一个 Context"}
                </text>
              </g>
            );
          })}

          {/* —— 内存泄漏警示块（danger） —— */}
          {(() => {
            const warnTop = countTop + countRows.length * (COUNT_BOX_H + COUNT_GAP) + 8;
            const warnH = 92;
            return (
              <g>
                <rect
                  x={PANEL_X}
                  y={warnTop}
                  width={PANEL_W}
                  height={warnH}
                  rx="8"
                  fill="var(--danger)"
                  fillOpacity="0.08"
                  stroke="var(--danger)"
                  strokeWidth="1.4"
                />
                {/* 左侧 danger 色条 */}
                <rect
                  x={PANEL_X}
                  y={warnTop}
                  width="4"
                  height={warnH}
                  rx="2"
                  fill="var(--danger)"
                />
                <text
                  x={PANEL_X + 16}
                  y={warnTop + 20}
                  fontSize="10.5"
                  fontWeight="700"
                  fill="var(--danger)"
                >
                  用错 Context = 内存泄漏
                </text>
                {[
                  "长生命周期对象（单例/静态）持有 Activity",
                  "Context → Activity 销毁后无法回收，连带",
                  "整棵 View 树一起泄漏。",
                  "改用 getApplicationContext() → Application 单例。",
                ].map((line, j) => (
                  <text
                    key={line}
                    x={PANEL_X + 16}
                    y={warnTop + 38 + j * 14}
                    fontSize="9.5"
                    fill="var(--text-secondary)"
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })()}

          {/* —— 面板左竖分隔线（视觉分区左右两部分） —— */}
          <line
            x1={PANEL_X - 24}
            y1={PANEL_TOP - 40}
            x2={PANEL_X - 24}
            y2={IMPL_TOP + IMPL_H}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="2 4"
            opacity="0.6"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Context 是一棵继承树：<code>Context</code>（抽象基类）→ <code>ContextWrapper</code>
        （装饰器基类，持 <code>mBase</code> 指向真正实现 <code>ContextImpl</code>）→ 三支落地——
        <code>ContextThemeWrapper</code> → <code>Activity</code>（带主题，UI 用它）、以及直接继承的
        <code> Service</code> / <code>Application</code>。一个 App 的 Context 总数 = 1 个 Application
        + N 个 Activity + M 个 Service；让长生命周期对象持有 Activity Context 会内存泄漏，长期持有请用
        <code> getApplicationContext()</code> 拿到的 Application 单例。
      </figcaption>
    </figure>
  );
}
