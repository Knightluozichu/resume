/**
 * <ViewHierarchyDiagram />：《Android 编程权威指南》ui-fragment/layouts-widgets 章
 * 「视图层级」配图（HEL-179）。
 *
 * 画面内容：左侧一棵视图层级树 + 右侧一小块 ConstraintLayout 约束示意。
 *  左树（缩进树 + 折线连接，参考 AndroidProjectStructureDiagram 的树画法）：
 *   - 根 ViewGroup（ConstraintLayout）下嵌一层 LinearLayout，叶子是 TextView / Button /
 *     EditText / ImageView 等部件。
 *   - 两类节点区分清楚：
 *       · ViewGroup（容器，能装子 View、负责测量/布局子节点）→ accent 色 + 实心圆点标记。
 *       · View（叶子部件，可见 UI，自己不再装子节点）→ text-primary 色 + 空心方块标记。
 *     图例在树下方说明两类标记的含义。
 *  右块 ConstraintLayout 约束示意：一个部件（save_button）用约束锚定到父布局与兄弟控件——
 *   app:layout_constraintStart_toStartOf="parent"（左边贴父布局左边）、
 *   app:layout_constraintTop_toBottomOf="@id/crime_title"（顶部接在兄弟标题下方）、
 *   app:layout_constraintEnd_toEndOf="parent"（右边贴父布局右边），用三条带箭头的约束线连到
 *   父布局边与兄弟控件边，点明「约束 = 控件该和谁是邻居」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（accent / text-primary / text-secondary / border / success），
 * 无裸 hex，rx 圆角，无阴影，几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 树节点：depth = 缩进层级；kind 决定「容器 vs 叶子部件」配色与标记；note = 右侧一句话注释（可选）。 ——
type TreeNode = {
  /** 显示文本（类名 / 部件名）。 */
  label: string;
  /** 缩进层级（0 = 根 ViewGroup）。 */
  depth: number;
  /** group = ViewGroup 容器（能装子 View）；view = 叶子部件（可见 UI，不再装子节点）。 */
  kind: "group" | "view";
  /** 右侧一句话注释；缺省则不画注释。 */
  note?: string;
};

const NODES: readonly TreeNode[] = [
  { label: "ConstraintLayout", depth: 0, kind: "group", note: "根容器：测量/布局所有子节点" },
  { label: "TextView", depth: 1, kind: "view", note: "标题文字（叶子部件）" },
  { label: "LinearLayout", depth: 1, kind: "group", note: "子容器：把内部控件竖向排开" },
  { label: "EditText", depth: 2, kind: "view", note: "输入框（叶子部件）" },
  { label: "CheckBox", depth: 2, kind: "view", note: "复选框（叶子部件）" },
  { label: "ImageView", depth: 1, kind: "view", note: "图片（叶子部件）" },
  { label: "Button", depth: 1, kind: "view", note: "按钮（叶子部件）" },
];

// —— 布局常量（间距走 4 倍数语言）。 ——
const ROW_H = 36; // 树行高
const INDENT = 28; // 每层缩进
const TREE_X0 = 24; // 第一列文本左边距
const ICON_W = 16; // 行首图标占位宽
const TREE_TOP = 64; // 第一行 baseline 之上的标题留白
const NOTE_X = 232; // 树右侧注释统一左对齐起点
const LEGEND_Y = TREE_TOP + NODES.length * ROW_H + 24; // 图例 y

// 右侧 ConstraintLayout 约束示意小块。
const PANEL_X = 444; // 约束示意块左边距
const PANEL_TOP = 64; // 约束示意块顶部 y
const PANEL_W = 292; // 约束示意块宽
const PANEL_H = 232; // 约束示意块高（= 模拟手机屏幕框）
const ARROW_R = 4; // 约束箭头三角半高

const VIEW_W = 760;
const VIEW_H = LEGEND_Y + 48;

/** 行首文本 x（按缩进推进）。 */
function rowTextX(depth: number): number {
  return TREE_X0 + depth * INDENT + ICON_W;
}

/** 容器用 accent、叶子部件用 text-primary。 */
function nodeColor(kind: TreeNode["kind"]): string {
  return kind === "group" ? "var(--accent)" : "var(--text-primary)";
}

export function ViewHierarchyDiagram() {
  // 右侧约束示意：父布局内边 + 两个控件（兄弟标题 title、被约束的按钮 btn）。
  const innerX = PANEL_X + 16;
  const innerY = PANEL_TOP + 16;
  const innerW = PANEL_W - 32;
  const innerR = PANEL_X + PANEL_W - 16; // 父布局右内边
  // 兄弟控件 crime_title：顶部一条横块。
  const titleY = innerY + 20;
  const titleH = 28;
  // 被约束的 save_button：贴在标题下方、左右各贴父边。
  const btnY = titleY + titleH + 36;
  const btnH = 28;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android 视图层级树与 ConstraintLayout 约束示意图。左侧是一棵视图层级树，靠缩进和折线表达父子关系：根是 ConstraintLayout，它是一个 ViewGroup 容器，负责测量和布局所有子节点；它下面挂着 TextView 标题（叶子部件）、一个 LinearLayout 子容器，以及 ImageView 图片和 Button 按钮（都是叶子部件）；LinearLayout 这个子容器内部又装了 EditText 输入框和 CheckBox 复选框两个叶子部件。图中用两类标记区分：ViewGroup 容器用品牌紫色加实心圆点，它能装子 View 并负责测量布局子节点；View 叶子部件用正文色加空心方块，它是可见的 UI 控件、自己不再装子节点。树下方有图例说明这两类标记。右侧是一块 ConstraintLayout 约束示意，画成一个模拟屏幕的父布局框，里面有一个 crime_title 标题控件和一个 save_button 按钮；save_button 用三条带箭头的约束线锚定：Start_toStartOf parent 把它的左边约束到父布局左边，End_toEndOf parent 把它的右边约束到父布局右边，Top_toBottomOf at id crime_title 把它的顶部约束到兄弟标题控件的底部。说明约束就是告诉控件该和父布局或兄弟控件的哪条边对齐。"
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
            视图层级：ViewGroup 套 View 的一棵树
          </text>
          <text
            x={TREE_X0}
            y="46"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            容器（ViewGroup）能装子节点并负责测量/布局；部件（View）是可见的叶子控件
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

          {/* —— 节点行：标记 + 标签 + 右侧一句话注释 —— */}
          {NODES.map((n, i) => {
            const y = TREE_TOP + i * ROW_H + ROW_H / 2;
            const tx = rowTextX(n.depth);
            const color = nodeColor(n.kind);
            const isGroup = n.kind === "group";
            const iconCx = tx - ICON_W / 2 - 2;
            return (
              <g key={`node-${n.label}-${i}`}>
                {/* 行首标记：容器用实心圆点（accent），叶子部件用空心方块（text-secondary 描边） */}
                {isGroup ? (
                  <circle cx={iconCx} cy={y} r="5" fill={color} opacity="0.9" />
                ) : (
                  <rect
                    x={iconCx - 4}
                    y={y - 4}
                    width="8"
                    height="8"
                    rx="2"
                    fill="var(--bg)"
                    stroke="var(--text-secondary)"
                    strokeWidth="1.4"
                  />
                )}
                {/* 标签文本 */}
                <text
                  x={tx}
                  y={y + 4}
                  fontSize={n.depth === 0 ? 13 : 12}
                  fontWeight={isGroup ? 700 : 500}
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
                      fontSize="10"
                      fill="var(--text-secondary)"
                    >
                      {n.note}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* —— 图例：两类标记含义 —— */}
          <circle cx={TREE_X0 + 5} cy={LEGEND_Y} r="5" fill="var(--accent)" opacity="0.9" />
          <text
            x={TREE_X0 + 18}
            y={LEGEND_Y + 4}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            实心点 = ViewGroup（容器，装子 View，负责测量/布局）
          </text>
          <rect
            x={TREE_X0 + 1}
            y={LEGEND_Y + 16}
            width="8"
            height="8"
            rx="2"
            fill="var(--bg)"
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
          />
          <text
            x={TREE_X0 + 18}
            y={LEGEND_Y + 24}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            空心方块 = View（叶子部件，可见 UI，不再装子节点）
          </text>

          {/* —— 右侧：ConstraintLayout 约束示意小块 —— */}
          <text
            x={PANEL_X}
            y={PANEL_TOP - 12}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            约束：告诉控件「和谁的哪条边对齐」
          </text>
          {/* 父布局框（模拟屏幕） */}
          <rect
            x={PANEL_X}
            y={PANEL_TOP}
            width={PANEL_W}
            height={PANEL_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={PANEL_X + PANEL_W - 8}
            y={PANEL_TOP + 16}
            textAnchor="end"
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            parent
          </text>

          {/* 兄弟控件 crime_title */}
          <rect
            x={innerX}
            y={titleY}
            width={innerW}
            height={titleH}
            rx="6"
            fill="var(--text-primary)"
            fillOpacity="0.06"
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
          />
          <text
            x={innerX + 10}
            y={titleY + titleH / 2 + 4}
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            @id/crime_title
          </text>

          {/* 被约束的 save_button（accent 强调） */}
          <rect
            x={innerX}
            y={btnY}
            width={innerW}
            height={btnH}
            rx="6"
            fill="var(--accent)"
            fillOpacity="0.12"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
          <text
            x={innerX + innerW / 2}
            y={btnY + btnH / 2 + 4}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            save_button
          </text>

          {/* 约束①：Top_toBottomOf="@id/crime_title" —— 按钮顶部接在兄弟标题底部 */}
          <line
            x1={innerX + innerW / 2}
            y1={titleY + titleH}
            x2={innerX + innerW / 2}
            y2={btnY}
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeDasharray="4 3"
          />
          <path
            d={`M ${innerX + innerW / 2} ${btnY}
                l -${ARROW_R} -${ARROW_R * 2}
                l ${ARROW_R * 2} 0 Z`}
            fill="var(--accent)"
          />
          {/* 约束②：Start_toStartOf="parent" —— 按钮左边贴父布局左边 */}
          <line
            x1={PANEL_X}
            y1={btnY + btnH / 2}
            x2={innerX}
            y2={btnY + btnH / 2}
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeDasharray="4 3"
          />
          <path
            d={`M ${innerX} ${btnY + btnH / 2}
                l -${ARROW_R * 2} -${ARROW_R}
                l 0 ${ARROW_R * 2} Z`}
            fill="var(--accent)"
          />
          {/* 约束③：End_toEndOf="parent" —— 按钮右边贴父布局右边 */}
          <line
            x1={innerR}
            y1={btnY + btnH / 2}
            x2={innerX + innerW}
            y2={btnY + btnH / 2}
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeDasharray="4 3"
          />
          <path
            d={`M ${innerX + innerW} ${btnY + btnH / 2}
                l ${ARROW_R * 2} -${ARROW_R}
                l 0 ${ARROW_R * 2} Z`}
            fill="var(--accent)"
          />

          {/* 约束属性清单 */}
          {[
            "Top_toBottomOf=@id/crime_title",
            "Start_toStartOf=parent",
            "End_toEndOf=parent",
          ].map((t, i) => (
            <text
              key={t}
              x={PANEL_X + 12}
              y={btnY + btnH + 28 + i * 16}
              fontSize="9"
              fontFamily="var(--font-mono)"
              fill="var(--text-secondary)"
            >
              {`app:layout_constraint${t}`}
            </text>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每个界面都是一棵树：ViewGroup（容器）负责测量/布局自己的子节点，View（叶子部件）只管把自己画出来。在
        ConstraintLayout 里，子控件靠
        <code> app:layout_constraintStart_toStartOf / Top_toBottomOf </code>
        这类约束钉到父布局或兄弟控件的某条边上——不写坐标，写「和谁是邻居」。
      </figcaption>
    </figure>
  );
}
