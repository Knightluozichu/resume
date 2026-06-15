/**
 * <AccessibilityTreeDiagram />：《Android 编程权威指南》intent-data/accessibility 章
 * 「无障碍语义树 / TalkBack 朗读顺序」配图（HEL-187）。
 *
 * 画面内容：
 *  左侧——一部手机界面，从上到下放四个控件，对应四种无障碍处理方式：
 *   · ImageButton（拍照图标）→ 可聚焦、可点击，必须设 contentDescription，否则 TalkBack
 *     读「未加标签的按钮」。
 *   · TextView（标题文字）→ 文本控件，文本本身即朗读内容，可聚焦。
 *   · 装饰性分割图（ImageView）→ 纯装饰，设 importantForAccessibility="no"，TalkBack 跳过。
 *   · 可点击列表项（一行 item）→ 可聚焦、可点击，朗读其文本。
 *  右侧——与界面一一对应的无障碍语义树 / 朗读顺序：
 *   每个「可聚焦」控件一个节点（accent 色 + 焦点序号 1→2→3），标出它的
 *   contentDescription / 朗读文本（success 色）与「可点击」状态；唯独那张装饰图被
 *   标成「跳过」节点（text-secondary 虚线框），不进入焦点遍历，序号也跳过它。
 *  关键标注（图下注 + 图内文字）：
 *   ① ImageButton/ImageView 必须设 contentDescription，否则 TalkBack 读「未加标签的按钮」；
 *   ② 纯装饰图设 importantForAccessibility="no" 被跳过；
 *   ③ TalkBack 按从上到下、从左到右遍历焦点；
 *   ④ 触摸探索（手指划过朗读）+ 双击激活。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（accent = 可聚焦节点 / text-secondary = 跳过的装饰 /
 * success = 朗读文本 / text-primary / border / bg / bg-elevated），无裸 hex，rx 圆角，
 * 无阴影，几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 界面控件：每个控件映射到一种无障碍处理；focusOrder = 焦点遍历序号（装饰图为 null = 被跳过）。 ——
type Control = {
  /** 控件类型（类名）。 */
  kind: string;
  /** 控件在界面里的可见标签（图标用符号，文本用文字）。 */
  glyph: string;
  /** TalkBack 朗读文本 = contentDescription / 文本内容；装饰图无朗读文本。 */
  spoken: string | null;
  /** 焦点遍历序号（1 起）；null 表示被 importantForAccessibility="no" 跳过、不进焦点。 */
  focusOrder: number | null;
  /** 是否可点击（双击激活）。 */
  clickable: boolean;
};

const CONTROLS: readonly Control[] = [
  {
    kind: "ImageButton",
    glyph: "◉ 拍照",
    spoken: "拍照",
    focusOrder: 1,
    clickable: true,
  },
  {
    kind: "TextView",
    glyph: "犯罪现场照片",
    spoken: "犯罪现场照片",
    focusOrder: 2,
    clickable: false,
  },
  {
    kind: "ImageView（装饰分割图）",
    glyph: "▬▬▬▬▬",
    spoken: null,
    focusOrder: null,
    clickable: false,
  },
  {
    kind: "列表项（可点击）",
    glyph: "2024-03-12 已处理",
    spoken: "2024 年 3 月 12 日，已处理，按钮",
    focusOrder: 3,
    clickable: true,
  },
];

// —— 布局常量（间距走 4 倍数语言）。 ——
const TOP = 72; // 内容区顶部 y（标题留白）
const ROW_H = 64; // 每个控件占一行的高度
const ROW_GAP = 16; // 控件行间距

// 左侧手机外框。
const PHONE_X = 24; // 手机外框左边距
const PHONE_W = 256; // 手机外框宽
const SCREEN_PAD = 16; // 手机外框到屏幕内容的内边距

// 右侧语义树节点列。
const NODE_X = 360; // 节点卡片左边距
const NODE_W = 372; // 节点卡片宽
const ORDER_R = 12; // 焦点序号圆徽半径
const CONNECT_X = 312; // 界面 → 节点 的连线在中间的折点 x

// 焦点遍历箭头竖线 x（穿过每个序号徽标中心左侧一点）。
const FOCUS_RAIL_X = NODE_X - 24;

const VIEW_W = 760;
const VIEW_H = TOP + CONTROLS.length * (ROW_H + ROW_GAP) + 96;

/** 可聚焦控件用 accent，被跳过的装饰用 text-secondary。 */
function nodeColor(c: Control): string {
  return c.focusOrder === null ? "var(--text-secondary)" : "var(--accent)";
}

export function AccessibilityTreeDiagram() {
  // 手机屏幕内容区。
  const screenX = PHONE_X + SCREEN_PAD;
  const screenW = PHONE_W - SCREEN_PAD * 2;
  const phoneH = CONTROLS.length * (ROW_H + ROW_GAP) + SCREEN_PAD * 2 - ROW_GAP;

  // 已分配焦点序号的节点（用于画从上到下的焦点遍历轨道）。
  const focusRows = CONTROLS.map((c, i) => ({ c, i })).filter(
    (r) => r.c.focusOrder !== null,
  );

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android 无障碍语义树与 TalkBack 朗读顺序示意图。左侧画一部手机，屏幕里从上到下放四个控件：第一个是 ImageButton 拍照图标按钮，第二个是 TextView 标题文字「犯罪现场照片」，第三个是一张纯装饰性的分割线图片 ImageView，第四个是一行可点击的列表项「2024-03-12 已处理」。右侧是与界面一一对应的无障碍语义树和焦点遍历顺序：每一个可被聚焦的控件对应一个节点，用品牌紫色加一个焦点序号圆徽标记，序号按从上到下、从左到右的顺序是 1、2、3；节点里用绿色标出 TalkBack 会朗读的文本，也就是它的 contentDescription 或文本内容——ImageButton 朗读「拍照」、TextView 朗读「犯罪现场照片」、可点击列表项朗读「2024 年 3 月 12 日，已处理，按钮」，并标注这些节点是否可点击、可双击激活。唯独第三个装饰性分割图被设成 importantForAccessibility 等于 no，对应的节点用次要灰色虚线框标成「跳过」，不进入焦点遍历，所以焦点序号从它身上跳过去。一条带箭头的竖向轨道把序号 1、2、3 串起来，表示 TalkBack 的焦点遍历方向。关键结论：图标类控件 ImageButton 和 ImageView 必须设置 contentDescription，否则 TalkBack 只会读「未加标签的按钮」；纯装饰图要设 importantForAccessibility 等于 no 让屏幕阅读器跳过；TalkBack 按从上到下、从左到右遍历焦点，用户用手指划过屏幕做触摸探索来听内容，再双击激活当前焦点控件。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* —— 标题 —— */}
          <text
            x={PHONE_X}
            y="28"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            无障碍语义树：界面控件 → TalkBack 朗读什么、按什么顺序读
          </text>
          <text
            x={PHONE_X}
            y="46"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            每个可聚焦控件 = 一个语义节点；TalkBack 从上到下、从左到右遍历焦点，触摸探索 + 双击激活
          </text>

          {/* —— 左右两栏的小标题 —— */}
          <text
            x={PHONE_X}
            y={TOP - 16}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            界面（用户看到的）
          </text>
          <text
            x={NODE_X}
            y={TOP - 16}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            无障碍语义树（TalkBack 听到的）
          </text>

          {/* —— 左侧：手机外框 —— */}
          <rect
            x={PHONE_X}
            y={TOP}
            width={PHONE_W}
            height={phoneH}
            rx="18"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.6"
          />

          {/* —— 焦点遍历轨道：把所有可聚焦节点的序号圆徽从上到下串成一条带箭头竖线 —— */}
          {focusRows.length >= 2 &&
            (() => {
              const first = focusRows[0];
              const last = focusRows[focusRows.length - 1];
              const y1 = TOP + first.i * (ROW_H + ROW_GAP) + ROW_H / 2;
              const y2 = TOP + last.i * (ROW_H + ROW_GAP) + ROW_H / 2;
              return (
                <g>
                  <line
                    x1={FOCUS_RAIL_X}
                    y1={y1}
                    x2={FOCUS_RAIL_X}
                    y2={y2 - ORDER_R - 4}
                    stroke="var(--accent)"
                    strokeWidth="1.4"
                    strokeDasharray="4 3"
                  />
                  {/* 轨道末端向下箭头 = 焦点遍历方向 */}
                  <path
                    d={`M ${FOCUS_RAIL_X} ${y2 - ORDER_R}
                        l -4 -8 l 8 0 Z`}
                    fill="var(--accent)"
                  />
                  <text
                    x={FOCUS_RAIL_X - 8}
                    y={(y1 + y2) / 2}
                    textAnchor="end"
                    fontSize="9"
                    fontWeight="600"
                    fill="var(--accent)"
                  >
                    焦点
                  </text>
                  <text
                    x={FOCUS_RAIL_X - 8}
                    y={(y1 + y2) / 2 + 12}
                    textAnchor="end"
                    fontSize="9"
                    fontWeight="600"
                    fill="var(--accent)"
                  >
                    遍历
                  </text>
                </g>
              );
            })()}

          {/* —— 每个控件一行：左界面控件 + 中间连线 + 右语义节点 —— */}
          {CONTROLS.map((c, i) => {
            const rowY = TOP + i * (ROW_H + ROW_GAP);
            const cy = rowY + ROW_H / 2;
            const skipped = c.focusOrder === null;
            const color = nodeColor(c);

            // 左侧界面控件框（在屏幕内边距内）。
            const ctrlX = screenX;
            const ctrlY = rowY + 8;
            const ctrlW = screenW;
            const ctrlH = ROW_H - 16;

            return (
              <g key={`${c.kind}-${i}`}>
                {/* —— 左：界面控件 —— */}
                <rect
                  x={ctrlX}
                  y={ctrlY}
                  width={ctrlW}
                  height={ctrlH}
                  rx="6"
                  fill={skipped ? "var(--bg)" : "var(--text-primary)"}
                  fillOpacity={skipped ? "1" : "0.06"}
                  stroke={skipped ? "var(--text-secondary)" : "var(--border)"}
                  strokeWidth="1.2"
                  strokeDasharray={skipped ? "4 3" : undefined}
                />
                <text
                  x={ctrlX + 12}
                  y={cy - 4}
                  fontSize="11"
                  fontWeight="600"
                  fill={skipped ? "var(--text-secondary)" : "var(--text-primary)"}
                >
                  {c.glyph}
                </text>
                <text
                  x={ctrlX + 12}
                  y={cy + 12}
                  fontSize="8.5"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-secondary)"
                >
                  {c.kind}
                </text>

                {/* —— 中间：界面控件 → 语义节点 的折线连接 —— */}
                <polyline
                  points={`${ctrlX + ctrlW},${cy} ${CONNECT_X},${cy} ${CONNECT_X},${cy} ${NODE_X},${cy}`}
                  fill="none"
                  stroke={skipped ? "var(--text-secondary)" : "var(--border)"}
                  strokeWidth="1.2"
                  strokeDasharray={skipped ? "3 3" : undefined}
                  opacity={skipped ? "0.7" : "1"}
                />

                {/* —— 右：语义节点 —— */}
                <rect
                  x={NODE_X}
                  y={ctrlY}
                  width={NODE_W}
                  height={ctrlH}
                  rx="8"
                  fill={color}
                  fillOpacity={skipped ? "0.04" : "0.08"}
                  stroke={color}
                  strokeWidth="1.3"
                  strokeDasharray={skipped ? "4 3" : undefined}
                />
                {/* 左侧色条 */}
                <rect
                  x={NODE_X}
                  y={ctrlY}
                  width="4"
                  height={ctrlH}
                  rx="2"
                  fill={color}
                />

                {skipped ? (
                  <>
                    {/* 被跳过：无焦点序号，标「跳过」 */}
                    <text
                      x={NODE_X + 20}
                      y={cy - 3}
                      fontSize="11"
                      fontWeight="700"
                      fill="var(--text-secondary)"
                    >
                      ⊘ 跳过（不进焦点遍历）
                    </text>
                    <text
                      x={NODE_X + 20}
                      y={cy + 13}
                      fontSize="8.5"
                      fontFamily="var(--font-mono)"
                      fill="var(--text-secondary)"
                    >
                      importantForAccessibility=&quot;no&quot;
                    </text>
                  </>
                ) : (
                  <>
                    {/* 焦点序号圆徽 */}
                    <circle
                      cx={FOCUS_RAIL_X}
                      cy={cy}
                      r={ORDER_R}
                      fill="var(--bg)"
                      stroke="var(--accent)"
                      strokeWidth="1.6"
                    />
                    <text
                      x={FOCUS_RAIL_X}
                      y={cy + 4}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="700"
                      fill="var(--accent)"
                    >
                      {c.focusOrder}
                    </text>
                    {/* 朗读文本（success 色）= contentDescription / 文本内容 */}
                    <text
                      x={NODE_X + 20}
                      y={cy - 3}
                      fontSize="9"
                      fill="var(--text-secondary)"
                    >
                      朗读：
                    </text>
                    <text
                      x={NODE_X + 50}
                      y={cy - 3}
                      fontSize="11"
                      fontWeight="700"
                      fill="var(--success)"
                    >
                      「{c.spoken}」
                    </text>
                    {/* 可点击状态 */}
                    <text
                      x={NODE_X + 20}
                      y={cy + 13}
                      fontSize="8.5"
                      fontFamily="var(--font-mono)"
                      fill="var(--text-secondary)"
                    >
                      {c.clickable
                        ? "clickable=true → 双击激活"
                        : "clickable=false → 仅朗读"}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* —— 底部关键标注 —— */}
          <text
            x={PHONE_X}
            y={VIEW_H - 64}
            fontSize="10"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            记住四条：
          </text>
          <text
            x={PHONE_X}
            y={VIEW_H - 46}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            ① ImageButton / ImageView 不设 contentDescription，TalkBack 只会读「未加标签的按钮」
          </text>
          <text
            x={PHONE_X}
            y={VIEW_H - 30}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            ② 纯装饰图设 importantForAccessibility=&quot;no&quot; 被跳过　③ 焦点从上到下、从左到右遍历
          </text>
          <text
            x={PHONE_X}
            y={VIEW_H - 14}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            ④ 用户用手指划过屏幕触摸探索（朗读当前控件），再双击激活它
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        TalkBack 看到的不是像素，而是这棵<strong> 无障碍语义树 </strong>：每个可聚焦控件是一个节点，朗读它的{" "}
        <code>contentDescription</code> 或文本，并按从上到下、从左到右<strong> 遍历焦点 </strong>。图标类控件不设{" "}
        <code>contentDescription</code> 就会被读成「未加标签的按钮」；纯装饰图设{" "}
        <code>importantForAccessibility=&quot;no&quot;</code> 让阅读器跳过。用户靠触摸探索朗读、双击激活。
      </figcaption>
    </figure>
  );
}
