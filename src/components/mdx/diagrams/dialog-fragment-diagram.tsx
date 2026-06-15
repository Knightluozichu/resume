/**
 * <DialogFragmentDiagram />：《Android 编程权威指南》ui-fragment/dialogs 章
 * 「DialogFragment：配置变更的安全网」配图（HEL-182）。
 *
 * 画面内容：
 *  左侧——一个宿主界面（Activity/Fragment 的列表界面），上方覆一层半透明遮罩 scrim
 *  表示宿主失焦；scrim 之上「浮起」一张 dialog 卡片（标题 + 消息 + 取消/确定两个按钮），
 *  卡片用 --bg-elevated + border + 左侧 accent 色条表达「浮于宿主之上」的层叠关系。
 *  右侧——竖排四条 DialogFragment 相对裸 AlertDialog 的优势卡片：
 *   ① 由 FragmentManager 管理生命周期；
 *   ② 屏幕旋转/配置变更时自动重建保活（裸 AlertDialog 会消失）；
 *   ③ show(fragmentManager, tag) 显示；
 *   ④ onCreateDialog 返回 AlertDialog。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（accent / success / warning / text-primary /
 * text-secondary / border / bg / bg-elevated），无裸 hex，rx 圆角，无阴影，
 * 几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 右侧优势卡片：tag = 序号；title = 一句话优势；color = 语义色 token。 ——
type Advantage = {
  /** 圆角徽标里的序号。 */
  tag: string;
  /** 优势说明（一句话）。 */
  title: string;
  /** 语义色 token。 */
  color: string;
};

const ADVANTAGES: readonly Advantage[] = [
  {
    tag: "①",
    title: "由 FragmentManager 管理生命周期",
    color: "var(--accent)",
  },
  {
    tag: "②",
    title: "旋转 / 配置变更自动重建保活（裸 AlertDialog 会消失）",
    color: "var(--success)",
  },
  {
    tag: "③",
    title: "show(fragmentManager, tag) 显示",
    color: "var(--warning)",
  },
  {
    tag: "④",
    title: "onCreateDialog() 返回 AlertDialog",
    color: "var(--accent)",
  },
];

// —— 布局常量（间距走 4 倍数语言）。 ——
const TOP = 64; // 内容区顶部 y（标题留白）

// 左侧宿主「手机」外框。
const PHONE_X = 24; // 手机外框左边距
const PHONE_W = 280; // 手机外框宽
const PHONE_H = 380; // 手机外框高
const SCREEN_PAD = 16; // 手机外框到屏幕内容的内边距

// 宿主列表行（被 scrim 压在底下）。
const LIST_ROW_H = 36; // 列表行高
const LIST_ROW_GAP = 12; // 列表行间距

// 浮起的 dialog 卡片。
const DIALOG_W = 224; // dialog 卡片宽
const DIALOG_H = 168; // dialog 卡片高
const DIALOG_BTN_H = 32; // dialog 按钮高

// 右侧优势卡片列。
const ADV_X = 336; // 优势卡片左边距
const ADV_W = 384; // 优势卡片宽
const ADV_H = 72; // 优势卡片高
const ADV_GAP = 16; // 优势卡片间距

const VIEW_W = 744;
const VIEW_H = TOP + PHONE_H + 40;

export function DialogFragmentDiagram() {
  // 手机屏幕内容区。
  const screenX = PHONE_X + SCREEN_PAD;
  const screenY = TOP + SCREEN_PAD;
  const screenW = PHONE_W - SCREEN_PAD * 2;
  const screenH = PHONE_H - SCREEN_PAD * 2;

  // dialog 卡片居中浮在屏幕上。
  const dialogX = screenX + (screenW - DIALOG_W) / 2;
  const dialogY = screenY + (screenH - DIALOG_H) / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="DialogFragment 工作示意图。左侧画一部手机：屏幕里是宿主界面（一个列表界面，几行列表项），列表上覆盖了一层半透明遮罩 scrim，表示宿主界面已失焦、被压在底下。遮罩之上浮起一张对话框卡片，卡片用更亮的背景色、边框和左侧强调色条表现它悬浮于宿主之上；卡片内从上到下是标题「删除这条记录？」、一行消息说明、底部两个按钮「取消」和「确定」。右侧竖排四条 DialogFragment 相对裸 AlertDialog 的优势：第一，由 FragmentManager 管理生命周期；第二，屏幕旋转或配置变更时自动重建保活，而裸 AlertDialog 会直接消失、用户选择丢失；第三，用 show(fragmentManager, tag) 方法显示；第四，重写 onCreateDialog() 方法返回一个 AlertDialog。整张图说明：DialogFragment 是把对话框包进 Fragment 的安全壳，让对话框跟随 Fragment 一起被 FragmentManager 保存与恢复。"
          className="mx-auto block h-auto w-full max-w-[744px]"
        >
          {/* —— 标题 —— */}
          <text
            x={PHONE_X}
            y="28"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            DialogFragment：浮在宿主之上的「对话框安全壳」
          </text>
          <text
            x={PHONE_X}
            y="46"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            宿主失焦置灰，对话框浮起；整个对话框交给 FragmentManager 托管
          </text>

          {/* —— 左侧：手机外框 —— */}
          <rect
            x={PHONE_X}
            y={TOP}
            width={PHONE_W}
            height={PHONE_H}
            rx="20"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.6"
          />

          {/* —— 宿主界面：标题栏 + 列表行（被 scrim 压住）—— */}
          {/* 宿主顶部标题栏 */}
          <rect
            x={screenX}
            y={screenY}
            width={screenW}
            height="28"
            rx="6"
            fill="var(--text-primary)"
            fillOpacity="0.08"
          />
          <text
            x={screenX + 12}
            y={screenY + 19}
            fontSize="10.5"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            宿主：记录列表（CrimeListFragment）
          </text>
          {/* 宿主列表行（4 行，置于底层） */}
          {[0, 1, 2, 3].map((r) => {
            const rowY = screenY + 40 + r * (LIST_ROW_H + LIST_ROW_GAP);
            return (
              <rect
                key={`row-${r}`}
                x={screenX}
                y={rowY}
                width={screenW}
                height={LIST_ROW_H}
                rx="6"
                fill="var(--text-primary)"
                fillOpacity="0.05"
                stroke="var(--border)"
                strokeWidth="1"
              />
            );
          })}

          {/* —— scrim 遮罩：低透明 text-primary 覆盖整块屏幕，表示宿主失焦 —— */}
          <rect
            x={screenX}
            y={screenY}
            width={screenW}
            height={screenH}
            rx="8"
            fill="var(--text-primary)"
            fillOpacity="0.4"
          />
          <text
            x={screenX + screenW / 2}
            y={screenY + 26}
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="600"
            fill="var(--bg)"
          >
            ▒ scrim 遮罩：宿主失焦、不可点 ▒
          </text>

          {/* —— 浮起的 dialog 卡片（更亮背景 + 边框 + 左侧 accent 色条 = 浮于其上）—— */}
          <rect
            x={dialogX}
            y={dialogY}
            width={DIALOG_W}
            height={DIALOG_H}
            rx="12"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          {/* 左侧 accent 色条 */}
          <rect
            x={dialogX}
            y={dialogY}
            width="4"
            height={DIALOG_H}
            rx="2"
            fill="var(--accent)"
          />
          {/* dialog 标题 */}
          <text
            x={dialogX + 20}
            y={dialogY + 32}
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            删除这条记录？
          </text>
          {/* dialog 消息 */}
          <text
            x={dialogX + 20}
            y={dialogY + 56}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            删除后无法恢复，确定继续吗？
          </text>
          {/* dialog 浮起说明 */}
          <text
            x={dialogX + 20}
            y={dialogY + 76}
            fontSize="9"
            fontStyle="italic"
            fill="var(--accent)"
          >
            ↑ 浮于宿主之上，独占焦点
          </text>
          {/* dialog 两个按钮：取消（ghost）/ 确定（accent） */}
          <rect
            x={dialogX + 20}
            y={dialogY + DIALOG_H - DIALOG_BTN_H - 16}
            width="88"
            height={DIALOG_BTN_H}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <text
            x={dialogX + 20 + 44}
            y={dialogY + DIALOG_H - DIALOG_BTN_H - 16 + DIALOG_BTN_H / 2 + 4}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            取消
          </text>
          <rect
            x={dialogX + DIALOG_W - 88 - 20}
            y={dialogY + DIALOG_H - DIALOG_BTN_H - 16}
            width="88"
            height={DIALOG_BTN_H}
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.16"
            stroke="var(--accent)"
            strokeWidth="1.3"
          />
          <text
            x={dialogX + DIALOG_W - 20 - 44}
            y={dialogY + DIALOG_H - DIALOG_BTN_H - 16 + DIALOG_BTN_H / 2 + 4}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="700"
            fill="var(--accent)"
          >
            确定
          </text>

          {/* —— 右侧：DialogFragment 相对裸 AlertDialog 的优势 —— */}
          <text
            x={ADV_X}
            y={TOP - 12}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            为什么用 DialogFragment 包，而不是裸 AlertDialog.show()
          </text>
          {ADVANTAGES.map((a, i) => {
            const y = TOP + i * (ADV_H + ADV_GAP);
            const cy = y + ADV_H / 2;
            return (
              <g key={a.tag}>
                <rect
                  x={ADV_X}
                  y={y}
                  width={ADV_W}
                  height={ADV_H}
                  rx="8"
                  fill={a.color}
                  fillOpacity="0.08"
                  stroke={a.color}
                  strokeWidth="1.3"
                />
                {/* 左侧语义色条 */}
                <rect
                  x={ADV_X}
                  y={y}
                  width="4"
                  height={ADV_H}
                  rx="2"
                  fill={a.color}
                />
                {/* 序号徽标 */}
                <text
                  x={ADV_X + 24}
                  y={cy + 7}
                  textAnchor="middle"
                  fontSize="20"
                  fontWeight="700"
                  fill={a.color}
                >
                  {a.tag}
                </text>
                {/* 优势说明 */}
                <text
                  x={ADV_X + 48}
                  y={cy + 5}
                  fontSize="11.5"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {a.title}
                </text>
              </g>
            );
          })}

          {/* —— 底部点睛：show(fm, tag) 把对话框交给 FragmentManager —— */}
          <text
            x={ADV_X}
            y={TOP + ADVANTAGES.length * (ADV_H + ADV_GAP) + 8}
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            DeleteDialog().show(childFragmentManager, &quot;delete&quot;)
          </text>
          <text
            x={ADV_X}
            y={TOP + ADVANTAGES.length * (ADV_H + ADV_GAP) + 26}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            → 对话框被 FragmentManager 接管，旋转屏幕也不丢
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        <code>DialogFragment</code> 是对话框的「安全壳」：宿主界面被 scrim
        遮罩压在底下、失焦，对话框浮于其上独占焦点。和裸{" "}
        <code>AlertDialog.show()</code> 不同，它由 FragmentManager
        管理生命周期，屏幕旋转 / 配置变更时随 Fragment 自动重建保活；用{" "}
        <code>show(fragmentManager, tag)</code> 显示、重写{" "}
        <code>onCreateDialog()</code> 返回 AlertDialog。
      </figcaption>
    </figure>
  );
}
