/**
 * <ThreadModelDiagram />：《Android 编程权威指南》background-network/http-background 章
 * 「主线程 vs 工作线程」配图（HEL-193）。
 *
 * 画面内容：两条横向泳道 + 一条四步流程 + 一个错误做法对照。
 *  上泳道 = 主线程（UI 线程，accent 色）：唯一能碰 View；16ms 帧预算要流畅；
 *           阻塞超过 5s 触发 ANR。
 *  下泳道 = 工作线程（后台，success 色）：跑网络请求 / IO（OkHttp、协程 Dispatchers.IO）。
 *  正确流程（四步，跨泳道切换）：
 *   ① UI 线程发起请求 → ② 切到工作线程做网络请求 → ③ 拿到结果 →
 *   ④ 切回主线程更新 UI（runOnUiThread / Handler.post）。
 *  错误做法对照（danger 色）：主线程直接做网络请求 → 卡死 → 系统弹出 ANR 对话框（✗）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（accent / success / danger / text-primary /
 * text-secondary / border / bg / bg-elevated），无裸 hex，rx 圆角，无阴影，
 * 几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 布局常量（间距走 4 倍数语言）。 ——
const VIEW_W = 760;

const PAD_X = 24; // 左右内边距
const LANE_LABEL_W = 132; // 泳道左侧标签列宽
const LANE_X = PAD_X + LANE_LABEL_W; // 泳道主体起点 x
const LANE_W = VIEW_W - LANE_X - PAD_X; // 泳道主体宽

const MAIN_LANE_TOP = 56; // 主线程泳道顶部 y
const LANE_H = 88; // 单条泳道高
const LANE_GAP = 48; // 两泳道间距（容纳跨泳道竖向箭头）
const WORKER_LANE_TOP = MAIN_LANE_TOP + LANE_H + LANE_GAP; // 工作线程泳道顶部 y

const STEP_W = 132; // 流程步骤卡片宽
const STEP_H = 44; // 流程步骤卡片高
const STEP_GAP = 36; // 步骤卡片之间水平间距

const ARROW = 5; // 箭头三角半高

// 错误做法对照区。
const WRONG_TOP = WORKER_LANE_TOP + LANE_H + 48; // 错误对照区顶部 y
const WRONG_H = 96; // 错误对照卡片高

const VIEW_H = WRONG_TOP + WRONG_H + 28;

// —— 四步流程：lane 决定它落在哪条泳道；col 决定水平次序。 ——
type FlowStep = {
  id: string;
  /** 步骤编号文字。 */
  num: string;
  /** 一句话动作。 */
  label: string;
  /** "main" | "worker"，决定纵向落点与配色。 */
  lane: "main" | "worker";
  /** 水平次序（0..3）。 */
  col: number;
};

const STEPS: readonly FlowStep[] = [
  { id: "s1", num: "①", label: "UI 线程发起请求", lane: "main", col: 0 },
  { id: "s2", num: "②", label: "切到工作线程做网络请求", lane: "worker", col: 1 },
  { id: "s3", num: "③", label: "拿到结果", lane: "worker", col: 2 },
  { id: "s4", num: "④", label: "切回主线程更新 UI", lane: "main", col: 3 },
];

/** 第 col 列步骤卡片左边 x。 */
function stepX(col: number): number {
  return LANE_X + 12 + col * (STEP_W + STEP_GAP);
}

/** 某条泳道里步骤卡片的顶部 y（在泳道内垂直居中）。 */
function stepTop(lane: "main" | "worker"): number {
  const laneTop = lane === "main" ? MAIN_LANE_TOP : WORKER_LANE_TOP;
  return laneTop + (LANE_H - STEP_H) / 2;
}

export function ThreadModelDiagram() {
  // 步骤中心点速查（连线用）。
  const cx = (col: number) => stepX(col) + STEP_W / 2;
  const cy = (lane: "main" | "worker") => stepTop(lane) + STEP_H / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="主线程与工作线程模型图。图分上下两条横向泳道。上面一条是主线程，也叫 UI 线程，用品牌紫标注，它的特点写在左侧：唯一能碰 View（界面控件）、每 16 毫秒要刷新一帧、保持流畅、一旦被阻塞超过 5 秒就会触发 ANR。下面一条是工作线程，也叫后台线程，用绿色标注，它负责跑网络请求和磁盘 IO，常用 OkHttp 或协程的 Dispatchers.IO。两条泳道上画出正确的四步流程，箭头在两条泳道之间来回切换：第一步在主线程发起请求；第二步箭头向下切到工作线程，去做真正的网络请求；第三步在工作线程里拿到结果；第四步箭头向上切回主线程，用 runOnUiThread 或 Handler.post 更新 UI。图底部是一个红色的错误做法对照：如果直接在主线程里做网络请求，主线程会被卡住，几秒后系统弹出 ANR 应用无响应对话框，旁边用一个红色叉号标记这是禁止的做法。结论是：耗时的网络和 IO 必须放到工作线程，只有更新界面才回到主线程。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* 箭头 marker：下行切到工作线程用 success；上行切回主线程用 accent。 */}
          <defs>
            <marker
              id="thr-arr-down"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="6"
              orient="auto"
            >
              <path d="M0 0 L8 0 L4 6 z" fill="var(--success)" />
            </marker>
            <marker
              id="thr-arr-up"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="0"
              orient="auto"
            >
              <path d="M0 6 L8 6 L4 0 z" fill="var(--accent)" />
            </marker>
            <marker
              id="thr-arr-right"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* —— 标题 —— */}
          <text
            x={PAD_X}
            y="28"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            主线程 vs 工作线程：耗时活儿丢后台，更新界面回主线程
          </text>

          {/* —— 主线程泳道 —— */}
          <rect
            x={LANE_X}
            y={MAIN_LANE_TOP}
            width={LANE_W}
            height={LANE_H}
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
          {/* 主线程标签列 */}
          <text
            x={PAD_X}
            y={MAIN_LANE_TOP + 22}
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            主线程（UI 线程）
          </text>
          <text
            x={PAD_X}
            y={MAIN_LANE_TOP + 40}
            fontSize="9"
            fill="var(--text-secondary)"
          >
            唯一能碰 View
          </text>
          <text
            x={PAD_X}
            y={MAIN_LANE_TOP + 54}
            fontSize="9"
            fill="var(--text-secondary)"
          >
            16ms / 帧要流畅
          </text>
          <text
            x={PAD_X}
            y={MAIN_LANE_TOP + 68}
            fontSize="9"
            fontWeight="600"
            fill="var(--danger)"
          >
            阻塞 &gt; 5s → ANR
          </text>

          {/* —— 工作线程泳道 —— */}
          <rect
            x={LANE_X}
            y={WORKER_LANE_TOP}
            width={LANE_W}
            height={LANE_H}
            rx="8"
            fill="var(--success)"
            fillOpacity="0.06"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          {/* 工作线程标签列 */}
          <text
            x={PAD_X}
            y={WORKER_LANE_TOP + 22}
            fontSize="12"
            fontWeight="700"
            fill="var(--success)"
          >
            工作线程（后台）
          </text>
          <text
            x={PAD_X}
            y={WORKER_LANE_TOP + 40}
            fontSize="9"
            fill="var(--text-secondary)"
          >
            跑网络请求 / IO
          </text>
          <text
            x={PAD_X}
            y={WORKER_LANE_TOP + 56}
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            OkHttp
          </text>
          <text
            x={PAD_X}
            y={WORKER_LANE_TOP + 70}
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            Dispatchers.IO
          </text>

          {/* —— 跨泳道切换箭头（画在卡片下层）—— */}
          {/* ① → ②：主线程下切工作线程 */}
          <line
            x1={cx(0)}
            y1={cy("main") + STEP_H / 2}
            x2={cx(1)}
            y2={cy("worker") - STEP_H / 2 - ARROW}
            stroke="var(--success)"
            strokeWidth="1.6"
            markerEnd="url(#thr-arr-down)"
          />
          {/* ② → ③：工作线程内向右 */}
          <line
            x1={stepX(1) + STEP_W}
            y1={cy("worker")}
            x2={stepX(2) - ARROW}
            y2={cy("worker")}
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            markerEnd="url(#thr-arr-right)"
          />
          {/* ③ → ④：工作线程上切回主线程 */}
          <line
            x1={cx(2)}
            y1={cy("worker") - STEP_H / 2}
            x2={cx(3)}
            y2={cy("main") + STEP_H / 2 + ARROW}
            stroke="var(--accent)"
            strokeWidth="1.6"
            markerEnd="url(#thr-arr-up)"
          />

          {/* —— 四步流程卡片 —— */}
          {STEPS.map((s) => {
            const x = stepX(s.col);
            const y = stepTop(s.lane);
            const color = s.lane === "main" ? "var(--accent)" : "var(--success)";
            return (
              <g key={s.id}>
                <rect
                  x={x}
                  y={y}
                  width={STEP_W}
                  height={STEP_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke={color}
                  strokeWidth="1.4"
                />
                <text
                  x={x + 12}
                  y={y + STEP_H / 2 + 5}
                  fontSize="13"
                  fontWeight="700"
                  fill={color}
                >
                  {s.num}
                </text>
                <text
                  x={x + 30}
                  y={y + STEP_H / 2 + 4}
                  fontSize="9.5"
                  fill="var(--text-primary)"
                >
                  {s.label}
                </text>
              </g>
            );
          })}

          {/* —— 切换动作小注（挂在两条切换斜线旁）—— */}
          <text
            x={(cx(0) + cx(1)) / 2 + 8}
            y={(cy("main") + cy("worker")) / 2 + 4}
            fontSize="9"
            fontWeight="600"
            fill="var(--success)"
          >
            切后台
          </text>
          <text
            x={(cx(2) + cx(3)) / 2 - 64}
            y={(cy("main") + cy("worker")) / 2 + 4}
            textAnchor="end"
            fontSize="9"
            fontWeight="600"
            fill="var(--accent)"
          >
            runOnUiThread / post 回主线程
          </text>

          {/* —— 错误做法对照（danger）—— */}
          <text
            x={PAD_X}
            y={WRONG_TOP - 12}
            fontSize="11"
            fontWeight="700"
            fill="var(--danger)"
          >
            ✗ 错误做法：主线程直接做网络请求
          </text>
          <rect
            x={LANE_X}
            y={WRONG_TOP}
            width={LANE_W}
            height={WRONG_H}
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.07"
            stroke="var(--danger)"
            strokeWidth="1.4"
          />
          {/* 左侧：主线程直接发网络请求的卡片 */}
          <rect
            x={LANE_X + 16}
            y={WRONG_TOP + 24}
            width={STEP_W + 24}
            height={STEP_H}
            rx="8"
            fill="var(--bg)"
            stroke="var(--danger)"
            strokeWidth="1.4"
          />
          <text
            x={LANE_X + 16 + (STEP_W + 24) / 2}
            y={WRONG_TOP + 24 + STEP_H / 2 + 4}
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="600"
            fill="var(--danger)"
          >
            主线程 .execute()
          </text>
          {/* 卡死箭头 → */}
          <line
            x1={LANE_X + 16 + STEP_W + 24 + 8}
            y1={WRONG_TOP + 24 + STEP_H / 2}
            x2={LANE_X + 16 + STEP_W + 24 + 64 - ARROW}
            y2={WRONG_TOP + 24 + STEP_H / 2}
            stroke="var(--danger)"
            strokeWidth="1.6"
            strokeDasharray="5 4"
          />
          <path
            d={`M ${LANE_X + 16 + STEP_W + 24 + 64} ${WRONG_TOP + 24 + STEP_H / 2}
                l -${ARROW * 1.6} -${ARROW}
                l 0 ${ARROW * 2} Z`}
            fill="var(--danger)"
          />
          <text
            x={LANE_X + 16 + STEP_W + 24 + 36}
            y={WRONG_TOP + 24 + STEP_H / 2 - 8}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            卡住 &gt; 5s
          </text>
          {/* 右侧：ANR 弹窗示意 */}
          <rect
            x={LANE_X + 16 + STEP_W + 24 + 76}
            y={WRONG_TOP + 16}
            width="184"
            height="64"
            rx="8"
            fill="var(--bg)"
            stroke="var(--danger)"
            strokeWidth="1.4"
          />
          <text
            x={LANE_X + 16 + STEP_W + 24 + 76 + 12}
            y={WRONG_TOP + 16 + 22}
            fontSize="10.5"
            fontWeight="700"
            fill="var(--danger)"
          >
            应用无响应（ANR）
          </text>
          <text
            x={LANE_X + 16 + STEP_W + 24 + 76 + 12}
            y={WRONG_TOP + 16 + 40}
            fontSize="9"
            fill="var(--text-secondary)"
          >
            「App 没有响应」
          </text>
          <text
            x={LANE_X + 16 + STEP_W + 24 + 76 + 12}
            y={WRONG_TOP + 16 + 54}
            fontSize="9"
            fill="var(--text-secondary)"
          >
            等待 / 关闭
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        主线程是唯一能碰界面的那条线，每 16ms 要出一帧，被卡超过 5 秒就触发 ANR；网络和 IO
        这类耗时活儿必须丢到工作线程（OkHttp / 协程 <code>Dispatchers.IO</code>）。正确节奏是：
        主线程发起 → 切后台拉数据 → 拿到结果 → <code>runOnUiThread</code> / <code>Handler.post</code>{" "}
        回主线程刷新界面。直接在主线程做网络请求，等来的只会是那个 ANR 对话框。
      </figcaption>
    </figure>
  );
}
