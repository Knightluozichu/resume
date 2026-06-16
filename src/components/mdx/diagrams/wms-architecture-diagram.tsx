/**
 * <WmsArchitectureDiagram />：《Android 进阶解密》core-services/wms 章
 * 「WMS 架构与三方协作」配图（HEL-205）。
 *
 * 画面内容：三方横向并排的三大角色框 + 它们之间的关系箭头 + 底部显示器 + 输入分发标注。
 *  左框——App 进程（accent 色）：
 *   ViewRootImpl（View 树 ↔ WMS 的通信端）+ Surface（这块窗口的画布）。
 *  中框——system_server / WMS（warning 色）：
 *   WindowManagerService——统管所有应用窗口的布局 / 层级（z-order）/ 动画 / 输入焦点；
 *   内部维护窗口树（一组 WindowState）。
 *  右框——SurfaceFlinger（success 色）：
 *   拿各窗口的 Surface 做合成（composite），最终把整屏画面上屏到显示器。
 *  关系箭头（带标签）：
 *   ① App 的 ViewRootImpl ↔ WMS 经 Binder（IWindowSession）双向通信：申请窗口 / 更新布局；
 *      WMS 反过来决定每个窗口的位置 / 大小 / 层级。
 *   ② 各窗口的 Surface → SurfaceFlinger 提交缓冲区，由 SurfaceFlinger 合成。
 *   ③ SurfaceFlinger 合成后 → 显示器上屏。
 *  分点睛标注：
 *   WMS 只管「窗口的管理」（位置 / 层级 / 焦点），SurfaceFlinger 管「实际像素合成」；
 *   输入事件经 InputManagerService → WMS 分发到当前焦点窗口。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（accent / success / warning / text-primary /
 * text-secondary / border / bg / bg-elevated），无裸 hex，rx 圆角，无阴影，
 * 几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 三方角色框：tag = 角色名；sub = 一句话定位；notes = 职责行；color = 语义色 token。 ——
type Actor = {
  /** 角色名（App 进程 / WMS / SurfaceFlinger）。 */
  tag: string;
  /** 副标题：所在进程或定位。 */
  sub: string;
  /** 职责说明（多行）。 */
  notes: readonly string[];
  /** 语义色 token。 */
  color: string;
};

const ACTORS: readonly Actor[] = [
  {
    tag: "App 进程",
    sub: "你的应用",
    notes: ["ViewRootImpl：View 树 ↔ WMS 通信端", "Surface：这块窗口的画布"],
    color: "var(--accent)",
  },
  {
    tag: "WMS",
    sub: "system_server 进程",
    notes: [
      "统管所有窗口的布局 / 层级",
      "z-order / 动画 / 输入焦点",
      "维护窗口树（一组 WindowState）",
    ],
    color: "var(--warning)",
  },
  {
    tag: "SurfaceFlinger",
    sub: "独立系统进程",
    notes: ["拿各窗口的 Surface 做合成", "composite → 最终上屏"],
    color: "var(--success)",
  },
];

// —— 布局常量（间距走 4 倍数语言）。 ——
const VIEW_W = 760;

const PAD_X = 24; // 左右内边距
const TOP = 76; // 第一排角色框顶部 y（标题留白）

const ACTOR_W = 224; // 角色框宽
const ACTOR_H = 132; // 角色框高
const ACTOR_GAP = 32; // 角色框横向间距（容纳关系箭头）

const ARROW = 5; // 箭头三角半高

// 底部显示器框（SurfaceFlinger 合成后上屏处）。
const SCREEN_W = 224; // 显示器框宽
const SCREEN_H = 56; // 显示器框高
const SCREEN_TOP = TOP + ACTOR_H + 64; // 显示器框顶部 y（角色排下方留出箭头空间）

// 底部分工点睛带。
const NOTE_TOP = SCREEN_TOP + SCREEN_H + 48; // 分工标注顶部 y
const NOTE_H = 88; // 分工标注卡片高

const VIEW_H = NOTE_TOP + NOTE_H + 28;

/** 第 i 个角色框的左边 x。 */
function actorX(i: number): number {
  return PAD_X + i * (ACTOR_W + ACTOR_GAP);
}

export function WmsArchitectureDiagram() {
  // 角色框中心点速查（连线用）。
  const acx = (i: number) => actorX(i) + ACTOR_W / 2;
  const acy = TOP + ACTOR_H / 2;

  // 右框（SurfaceFlinger）与底部显示器框左缘对齐。
  const screenX = actorX(2);
  const screenCx = screenX + SCREEN_W / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="WMS 架构与三方协作图。画面上方并排三个角色框。左框是 App 进程，也就是你的应用，里面有两样东西：ViewRootImpl 是 View 树与 WMS 通信的端点，Surface 是这块窗口最终绘制到的画布。中框是 WMS，全名 WindowManagerService，跑在 system_server 进程里，它统管所有应用窗口的布局和层级，负责 z-order 层级、窗口动画和输入焦点，内部维护一棵窗口树，也就是一组 WindowState。右框是 SurfaceFlinger，跑在独立的系统进程里，它拿各个窗口的 Surface 做合成 composite，最终把整屏画面上屏。三框之间有带标签的关系箭头：左框 App 的 ViewRootImpl 与中框 WMS 之间是一条双向箭头，经 Binder 接口 IWindowSession 通信，App 向 WMS 申请窗口、更新布局，WMS 反过来决定每个窗口的位置、大小和层级。左框 App 的 Surface 有一条箭头指向右框 SurfaceFlinger，表示把绘制好的缓冲区提交过去合成。右框 SurfaceFlinger 向下有一条箭头连到底部的显示器框，表示合成后的画面上屏显示。图底部是分工点睛：WMS 只管窗口的管理，也就是位置、层级和焦点；SurfaceFlinger 管的是实际的像素合成。另外，输入事件先经 InputManagerService 交给 WMS，再由 WMS 分发到当前的焦点窗口。"
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
            WMS 架构与三方协作：谁管窗口、谁管像素、谁负责上屏
          </text>
          <text
            x={PAD_X}
            y="46"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            App 申请窗口 → WMS 排布局与层级 → SurfaceFlinger 合成各 Surface → 上屏
          </text>

          {/* —— App 的 Surface → SurfaceFlinger：提交合成箭头（画在框下层）—— */}
          <line
            x1={actorX(0) + ACTOR_W}
            y1={acy + ACTOR_H / 2 - 16}
            x2={actorX(2) - ARROW}
            y2={acy + ACTOR_H / 2 - 16}
            stroke="var(--success)"
            strokeWidth="1.6"
            strokeDasharray="5 4"
          />
          <path
            d={`M ${actorX(2)} ${acy + ACTOR_H / 2 - 16}
                l -${ARROW * 1.6} -${ARROW}
                l 0 ${ARROW * 2} Z`}
            fill="var(--success)"
          />
          <text
            x={(actorX(0) + ACTOR_W + actorX(2)) / 2}
            y={acy + ACTOR_H / 2 - 22}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="var(--success)"
          >
            Surface 提交缓冲区 → 合成
          </text>

          {/* —— App ViewRootImpl ↔ WMS：Binder（IWindowSession）双向箭头 —— */}
          <line
            x1={actorX(0) + ACTOR_W}
            y1={acy - 16}
            x2={actorX(1) + ARROW}
            y2={acy - 16}
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
          />
          {/* 右指箭头（App → WMS：申请窗口 / 更新布局） */}
          <path
            d={`M ${actorX(1)} ${acy - 16}
                l -${ARROW * 1.6} -${ARROW}
                l 0 ${ARROW * 2} Z`}
            fill="var(--text-secondary)"
          />
          {/* 左指箭头（WMS → App：决定位置 / 大小 / 层级） */}
          <path
            d={`M ${actorX(0) + ACTOR_W} ${acy - 16}
                l ${ARROW * 1.6} -${ARROW}
                l 0 ${ARROW * 2} Z`}
            fill="var(--text-secondary)"
          />
          <text
            x={(actorX(0) + ACTOR_W + actorX(1)) / 2}
            y={acy - 24}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            Binder
          </text>
          <text
            x={(actorX(0) + ACTOR_W + actorX(1)) / 2}
            y={acy + 2}
            textAnchor="middle"
            fontSize="8.5"
            fill="var(--text-secondary)"
          >
            IWindowSession
          </text>

          {/* —— 三方角色框 —— */}
          {ACTORS.map((a, i) => {
            const x = actorX(i);
            return (
              <g key={a.tag}>
                <rect
                  x={x}
                  y={TOP}
                  width={ACTOR_W}
                  height={ACTOR_H}
                  rx="8"
                  fill={a.color}
                  fillOpacity="0.08"
                  stroke={a.color}
                  strokeWidth="1.4"
                />
                {/* 左侧语义色条 */}
                <rect
                  x={x}
                  y={TOP}
                  width="4"
                  height={ACTOR_H}
                  rx="2"
                  fill={a.color}
                />
                {/* 角色名 */}
                <text
                  x={x + 16}
                  y={TOP + 26}
                  fontSize="13.5"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill={a.color}
                >
                  {a.tag}
                </text>
                {/* 副标题（进程定位） */}
                <text
                  x={x + 16}
                  y={TOP + 44}
                  fontSize="10"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {a.sub}
                </text>
                {/* 职责说明（多行） */}
                {a.notes.map((n, j) => (
                  <text
                    key={n}
                    x={x + 16}
                    y={TOP + 66 + j * 16}
                    fontSize="9"
                    fill="var(--text-secondary)"
                  >
                    {n}
                  </text>
                ))}
              </g>
            );
          })}

          {/* —— SurfaceFlinger → 显示器：上屏箭头 —— */}
          <line
            x1={screenCx}
            y1={TOP + ACTOR_H}
            x2={screenCx}
            y2={SCREEN_TOP - ARROW}
            stroke="var(--success)"
            strokeWidth="1.6"
          />
          <path
            d={`M ${screenCx} ${SCREEN_TOP}
                l -${ARROW} -${ARROW * 1.6}
                l ${ARROW * 2} 0 Z`}
            fill="var(--success)"
          />
          <text
            x={screenCx + 12}
            y={(TOP + ACTOR_H + SCREEN_TOP) / 2 + 4}
            fontSize="9"
            fontWeight="600"
            fill="var(--success)"
          >
            上屏
          </text>

          {/* —— 底部显示器框 —— */}
          <rect
            x={screenX}
            y={SCREEN_TOP}
            width={SCREEN_W}
            height={SCREEN_H}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={screenCx}
            y={SCREEN_TOP + 24}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            显示器
          </text>
          <text
            x={screenCx}
            y={SCREEN_TOP + 42}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            最终一帧画面
          </text>

          {/* —— 底部分工点睛带 —— */}
          <rect
            x={PAD_X}
            y={NOTE_TOP}
            width={VIEW_W - PAD_X * 2}
            height={NOTE_H}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={PAD_X + 16}
            y={NOTE_TOP + 26}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一句话分工
          </text>
          {/* WMS 分工 */}
          <circle cx={PAD_X + 22} cy={NOTE_TOP + 46} r="4" fill="var(--warning)" />
          <text
            x={PAD_X + 34}
            y={NOTE_TOP + 50}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            <tspan fontWeight="700" fill="var(--warning)">
              WMS
            </tspan>{" "}
            只管「窗口的管理」：位置 / 大小 / 层级 / 焦点
          </text>
          {/* SurfaceFlinger 分工 */}
          <circle cx={PAD_X + 22} cy={NOTE_TOP + 64} r="4" fill="var(--success)" />
          <text
            x={PAD_X + 34}
            y={NOTE_TOP + 68}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            <tspan fontWeight="700" fill="var(--success)">
              SurfaceFlinger
            </tspan>{" "}
            只管「实际像素合成」：拿各 Surface 合成上屏
          </text>
          {/* 输入分发 */}
          <circle cx={PAD_X + 22} cy={NOTE_TOP + 82} r="4" fill="var(--accent)" />
          <text
            x={PAD_X + 34}
            y={NOTE_TOP + 86}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            输入事件经{" "}
            <tspan fontWeight="700" fill="var(--accent)" fontFamily="var(--font-mono)">
              InputManagerService
            </tspan>{" "}
            → WMS → 分发到当前焦点窗口
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三方各司其职：<code>App 进程</code>持有 <code>ViewRootImpl</code> 和{" "}
        <code>Surface</code>，经 Binder（<code>IWindowSession</code>）向{" "}
        <code>WMS</code> 申请窗口、更新布局；<code>WMS</code>（在 system_server 里）
        统管所有窗口的位置 / 层级（z-order）/ 焦点，维护窗口树；
        <code> SurfaceFlinger</code> 拿各窗口的 <code>Surface</code> 合成上屏。
        一句话：WMS 管「窗口」，SurfaceFlinger 管「像素」，输入事件经 WMS 分发到焦点窗口。
      </figcaption>
    </figure>
  );
}
