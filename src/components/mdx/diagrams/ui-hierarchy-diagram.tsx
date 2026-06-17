/**
 * <UIHierarchyDiagram>：辅图（静态）——「UI 必备层级：Canvas + 元素 + EventSystem」（HEL-287）。
 *
 * 左侧一棵以 Canvas 为根的层级树：Canvas（根，标注 render mode = Screen Space - Overlay）
 * 下挂若干常用 UI 元素（Text / Image / Button / Slider）。右侧并列一个独立的 EventSystem
 * 对象，醒目标注「必须有，否则按钮一概不响应」。让读者建立「Canvas + 元素 + EventSystem」
 * 的基本结构认知——这是所有 UI 的起手式。
 *
 * 纯静态图（无 anime，无可交互徽章）。所有坐标整数常量；token-only 无裸 hex；
 * 所有 <text> 距 viewBox 任意边 ≥14px；节点互不重叠、连线不压文字。
 */

const VIEW_W = 736;
// VIEW_H=356：最低内容是第 4 个子元素底 330，下留 26px。纵向利用率 ~93%。
const VIEW_H = 356;

// ── 左侧 Canvas 树 ──
const CANVAS_X = 40;
const CANVAS_Y = 64;
const CANVAS_W = 196;
const CANVAS_H = 64;
const CANVAS_CX = CANVAS_X + CANVAS_W / 2; // 138

// 四个子元素（竖排），统一尺寸。第一个距 Canvas 底（128）24px。
const CHILD_X = 96;
const CHILD_W = 200;
const CHILD_H = 40;
const CHILD_Y0 = 152; // 第一个子元素 y
const CHILD_DY = 46; // 行距（4 个：152→330）

// 树连线竖干 x（从 Canvas 底中心下垂）。
const TRUNK_X = CANVAS_X + 24; // 64

// ── 右侧 EventSystem 对象 ──
const ES_X = 440;
const ES_Y = 176; // 与左侧子元素区竖向居中对齐
const ES_W = 256;
const ES_H = 84;
const ES_CX = ES_X + ES_W / 2; // 568

const children = [
  { t: "Text", d: "显示文字（分数 / 提示）" },
  { t: "Image", d: "显示图片（图标 / 血条底）" },
  { t: "Button", d: "可点击的按钮" },
  { t: "Slider", d: "滑条（音量 / 进度）" },
];

export function UIHierarchyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="UI 必备层级结构示意图。左侧是一棵以 Canvas 为根的层级树：Canvas 是所有 UI 的根容器，标注渲染模式为 Screen Space - Overlay，它下面挂着四个常用 UI 元素，分别是 Text 显示文字、Image 显示图片、Button 可点击按钮、Slider 滑条。右侧并列一个独立的 EventSystem 对象，醒目标注：场景里必须有它，否则按钮、拖拽等 UI 输入一概不响应。核心是搭 UI 的起手式就是 Canvas 加上各种元素，再加一个 EventSystem 处理输入。"
          className="mx-auto block h-auto w-full max-w-[736px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            UI 的起手式：Canvas（根）+ 各种元素 + EventSystem（管输入）
          </text>

          {/* ============ 左侧：Canvas 层级树 ============ */}
          {/* 树竖干（从 Canvas 底中心下垂到最后一个子元素） */}
          <line
            x1={TRUNK_X}
            y1={CANVAS_Y + CANVAS_H}
            x2={TRUNK_X}
            y2={CHILD_Y0 + (children.length - 1) * CHILD_DY + CHILD_H / 2}
            stroke="var(--border)"
            strokeWidth="1.6"
          />
          {/* 每个子元素的横向接入线 */}
          {children.map((c, i) => (
            <line
              key={`branch-${c.t}`}
              x1={TRUNK_X}
              y1={CHILD_Y0 + i * CHILD_DY + CHILD_H / 2}
              x2={CHILD_X}
              y2={CHILD_Y0 + i * CHILD_DY + CHILD_H / 2}
              stroke="var(--border)"
              strokeWidth="1.6"
            />
          ))}

          {/* Canvas 根节点 */}
          <rect
            x={CANVAS_X}
            y={CANVAS_Y}
            width={CANVAS_W}
            height={CANVAS_H}
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={CANVAS_CX}
            y={CANVAS_Y + 26}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            Canvas（根容器）
          </text>
          <text
            x={CANVAS_CX}
            y={CANVAS_Y + 46}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            render mode：Screen Space - Overlay
          </text>

          {/* 四个子元素节点 */}
          {children.map((c, i) => (
            <g key={c.t}>
              <rect
                x={CHILD_X}
                y={CHILD_Y0 + i * CHILD_DY}
                width={CHILD_W}
                height={CHILD_H}
                rx="8"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1.4"
              />
              <text
                x={CHILD_X + 14}
                y={CHILD_Y0 + i * CHILD_DY + 25}
                textAnchor="start"
                fontSize="11"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {c.t}
              </text>
              <text
                x={CHILD_X + CHILD_W - 12}
                y={CHILD_Y0 + i * CHILD_DY + 25}
                textAnchor="end"
                fontSize="8.5"
                fill="var(--text-secondary)"
              >
                {c.d}
              </text>
            </g>
          ))}

          {/* ============ 右侧：EventSystem 对象 ============ */}
          <rect
            x={ES_X}
            y={ES_Y}
            width={ES_W}
            height={ES_H}
            rx="10"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="2"
          />
          <text
            x={ES_CX}
            y={ES_Y + 26}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--warning)"
          >
            EventSystem
          </text>
          <text
            x={ES_CX}
            y={ES_Y + 46}
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            场景里的独立对象，负责处理 UI 输入
          </text>
          <text
            x={ES_CX}
            y={ES_Y + 64}
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="700"
            fill="var(--warning)"
          >
            点击 / 拖拽全靠它
          </text>
          {/* 醒目警示标签 */}
          <text
            x={ES_CX}
            y={ES_Y - 12}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--warning)"
          >
            ⚠ 必须有，否则按钮一概不响应
          </text>

          {/* 右侧补充说明：两者各司其职 */}
          <text
            x={ES_CX}
            y={ES_Y + ES_H + 36}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            Canvas 管「画什么、画在哪」
          </text>
          <text
            x={ES_CX}
            y={ES_Y + ES_H + 52}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            EventSystem 管「点了谁、拖了谁」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        所有 UI 都挂在 `Canvas` 这个根容器下（它决定 UI 画在屏幕最上层还是放进
        3D 世界）；常用元素 `Text` / `Image` / `Button` / `Slider`
        都是它的子节点。另外场景里还得有一个独立的 `EventSystem`
        对象——**没有它，按钮、拖拽等一切交互都不响应**。记住这套「Canvas + 元素
        + EventSystem」的起手式。
      </figcaption>
    </figure>
  );
}
