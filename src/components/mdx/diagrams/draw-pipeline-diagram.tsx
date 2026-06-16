/**
 * <DrawPipelineDiagram />：《Android 进阶解密》performance-optimization/draw-optimization 章
 * 「View 绘制管线 + 优化点」配图（HEL-213）。
 *
 * 画面内容：一帧渲染的主流程 + 四个旁挂优化点 + 过度绘制示意。
 *  主流程（横向串行）：VSYNC 信号触发 → ViewRootImpl.performTraversals() 驱动一帧，
 *   三大步串行执行：measure（测量，onMeasure：定每个 View 宽高）→ layout（布局，
 *   onLayout：定位置）→ draw（绘制，onDraw：画到画布）。一帧预算 16.6ms（60fps），
 *   超时则掉帧卡顿（顶部预算条用 warning，超时段用 danger）。
 *  优化点旁挂（带序号标注）：
 *   ① 减少布局层级/嵌套——ConstraintLayout 扁平化（深层 measure/layout 成本高、可能多次测量）。
 *   ② 避免过度绘制 overdraw——去掉重叠/无用背景（右下角画 1x/2x/3x 叠涂示意，danger）。
 *   ③ onDraw 里不要 new 对象、不做耗时（每帧调用）。
 *   ④ 局部刷新用 invalidate 而非整树重绘。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（accent / warning / danger / text-primary /
 * text-secondary / border / bg / bg-elevated），无裸 hex，rx 圆角，无阴影，
 * 几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 布局常量（间距走 4 倍数语言）。 ——
const VIEW_W = 760;

const PAD_X = 24; // 左右内边距
const TITLE_TOP = 28; // 标题基线 y

// 一帧预算条（顶部，warning）。
const BUDGET_TOP = 56; // 预算条顶部 y
const BUDGET_H = 24; // 预算条高
const BUDGET_X = PAD_X; // 预算条左边
const BUDGET_W = VIEW_W - PAD_X * 2; // 预算条宽

// VSYNC 触发块 + performTraversals 驱动块。
const TRIGGER_TOP = BUDGET_TOP + BUDGET_H + 36; // 触发行顶部 y
const TRIGGER_H = 44; // 触发块高
const VSYNC_W = 120; // VSYNC 块宽
const DRIVER_W = 240; // performTraversals 块宽
const ROW_GAP = 16; // 同行块之间间距

// 三大步骤卡片（measure / layout / draw）。
const STEP_TOP = TRIGGER_TOP + TRIGGER_H + 56; // 步骤行顶部 y
const STEP_H = 72; // 步骤卡片高
const STEP_GAP = 28; // 步骤卡片之间间距
const STEP_W = (VIEW_W - PAD_X * 2 - STEP_GAP * 2) / 3; // 三步等分宽

// 优化点旁挂区（步骤行下方）。
const TIP_TOP = STEP_TOP + STEP_H + 44; // 优化点区顶部 y
const TIP_H = 48; // 单条优化点高
const TIP_GAP = 12; // 优化点竖向间距
const TIP_W = 372; // 优化点卡片宽（左半区）

// 过度绘制示意（右下角，与优化点区并排）。
const OD_X = PAD_X + TIP_W + 24; // overdraw 区左边
const OD_W = VIEW_W - OD_X - PAD_X; // overdraw 区宽
const OD_LAYER_H = 28; // 单层涂色条高
const OD_LAYER_GAP = 8; // 层间错位间距

const ARROW = 5; // 箭头三角半高

const VIEW_H = TIP_TOP + 4 * TIP_H + 3 * TIP_GAP + 32;

// —— 三大步骤：accent 主色，附 onXxx 回调与一句话职责。 ——
type PipeStep = {
  id: string;
  /** 步骤名（英文）。 */
  name: string;
  /** 中文译名。 */
  cn: string;
  /** 关键回调。 */
  hook: string;
  /** 一句话职责。 */
  duty: string;
};

const STEPS: readonly PipeStep[] = [
  { id: "measure", name: "measure", cn: "测量", hook: "onMeasure", duty: "定每个 View 宽高" },
  { id: "layout", name: "layout", cn: "布局", hook: "onLayout", duty: "定每个 View 位置" },
  { id: "draw", name: "draw", cn: "绘制", hook: "onDraw", duty: "画到 Canvas 画布" },
];

// —— 四个优化点：num = 序号；color = 语义色 token。 ——
type OptTip = {
  num: string;
  title: string;
  detail: string;
  color: string;
};

const TIPS: readonly OptTip[] = [
  {
    num: "①",
    title: "减少布局层级 / 嵌套",
    detail: "ConstraintLayout 扁平化；深层 measure/layout 可能多次测量",
    color: "var(--accent)",
  },
  {
    num: "②",
    title: "避免过度绘制 overdraw",
    detail: "去掉重叠 / 无用背景，别让同一像素被涂多层",
    color: "var(--danger)",
  },
  {
    num: "③",
    title: "onDraw 里不 new 对象、不做耗时",
    detail: "onDraw 每帧调用，分配对象会触发频繁 GC",
    color: "var(--accent)",
  },
  {
    num: "④",
    title: "局部刷新用 invalidate",
    detail: "只重绘脏区，别用 requestLayout 触发整树重测重绘",
    color: "var(--accent)",
  },
];

// 过度绘制三层（1x / 2x / 3x 叠涂，颜色越深越严重）。
const OD_LAYERS: readonly { label: string; opacity: number }[] = [
  { label: "1x 背景", opacity: 0.18 },
  { label: "2x 卡片", opacity: 0.34 },
  { label: "3x 文字", opacity: 0.52 },
];

export function DrawPipelineDiagram() {
  // 步骤第 i 张卡片左边 x。
  const stepX = (i: number) => PAD_X + i * (STEP_W + STEP_GAP);
  const stepCx = (i: number) => stepX(i) + STEP_W / 2;
  const stepCy = STEP_TOP + STEP_H / 2;

  // 触发行块的 x。
  const vsyncX = PAD_X;
  const driverX = vsyncX + VSYNC_W + ROW_GAP;
  const triggerCy = TRIGGER_TOP + TRIGGER_H / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="View 绘制管线与优化点图。顶部是一条 16.6 毫秒的一帧预算条，标注 60fps，超过这条预算就会掉帧卡顿，超时段用红色提示。预算条下方是一帧的触发与驱动：屏幕的 VSYNC 同步信号触发，箭头指向 ViewRootImpl 的 performTraversals 方法，由它驱动整帧。再向下是三大步骤横向串行，用品牌紫标注：第一步 measure 测量，关键回调 onMeasure，职责是确定每个 View 的宽高；箭头向右到第二步 layout 布局，关键回调 onLayout，确定每个 View 的位置；箭头向右到第三步 draw 绘制，关键回调 onDraw，把内容画到 Canvas 画布上。图的下半部分左侧列出四个优化点：第一，减少布局层级和嵌套，用 ConstraintLayout 扁平化，因为深层的 measure 和 layout 成本高、可能被多次测量；第二，避免过度绘制 overdraw，去掉重叠和无用的背景，别让同一像素被涂多层，用红色标注；第三，onDraw 里不要 new 对象、不做耗时操作，因为 onDraw 每帧都调用，分配对象会触发频繁 GC；第四，局部刷新用 invalidate 只重绘脏区，不要用 requestLayout 触发整棵树重新测量和绘制。右下角是过度绘制的示意：三层半透明矩形依次错位叠放，从上到下分别是 1 倍的背景、2 倍的卡片、3 倍的文字，颜色越叠越深，表示这个像素在一帧里被重复绘制了三次，越深越需要优化。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* 箭头 marker：主流程向右用 accent；触发向右用 warning。 */}
          <defs>
            <marker
              id="draw-arr"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="draw-arr-warn"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--warning)" />
            </marker>
          </defs>

          {/* —— 标题 —— */}
          <text
            x={PAD_X}
            y={TITLE_TOP}
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            View 绘制管线：VSYNC 触发，measure → layout → draw 串行，16.6ms 内画完
          </text>

          {/* —— 一帧预算条（warning，超时段 danger）—— */}
          <rect
            x={BUDGET_X}
            y={BUDGET_TOP}
            width={BUDGET_W}
            height={BUDGET_H}
            rx="6"
            fill="var(--warning)"
            fillOpacity="0.1"
            stroke="var(--warning)"
            strokeWidth="1.4"
          />
          <text
            x={BUDGET_X + 12}
            y={BUDGET_TOP + BUDGET_H / 2 + 4}
            fontSize="10.5"
            fontWeight="700"
            fill="var(--warning)"
          >
            一帧预算 16.6ms（60fps）
          </text>
          {/* 超时段：右端一小截用 danger 表示「超出 = 掉帧」 */}
          <rect
            x={BUDGET_X + BUDGET_W - 120}
            y={BUDGET_TOP}
            width="120"
            height={BUDGET_H}
            rx="6"
            fill="var(--danger)"
            fillOpacity="0.12"
            stroke="var(--danger)"
            strokeWidth="1.4"
          />
          <text
            x={BUDGET_X + BUDGET_W - 12}
            y={BUDGET_TOP + BUDGET_H / 2 + 4}
            textAnchor="end"
            fontSize="9.5"
            fontWeight="700"
            fill="var(--danger)"
          >
            超时 → 掉帧卡顿
          </text>

          {/* —— 触发行：VSYNC → performTraversals —— */}
          <rect
            x={vsyncX}
            y={TRIGGER_TOP}
            width={VSYNC_W}
            height={TRIGGER_H}
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="1.4"
          />
          <text
            x={vsyncX + VSYNC_W / 2}
            y={triggerCy - 4}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--warning)"
          >
            VSYNC
          </text>
          <text
            x={vsyncX + VSYNC_W / 2}
            y={triggerCy + 12}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            每帧节拍信号
          </text>
          {/* VSYNC → performTraversals 箭头 */}
          <line
            x1={vsyncX + VSYNC_W}
            y1={triggerCy}
            x2={driverX - ARROW}
            y2={triggerCy}
            stroke="var(--warning)"
            strokeWidth="1.6"
            markerEnd="url(#draw-arr-warn)"
          />
          <rect
            x={driverX}
            y={TRIGGER_TOP}
            width={DRIVER_W}
            height={TRIGGER_H}
            rx="8"
            fill="var(--bg)"
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
          />
          <text
            x={driverX + DRIVER_W / 2}
            y={triggerCy - 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            ViewRootImpl.performTraversals()
          </text>
          <text
            x={driverX + DRIVER_W / 2}
            y={triggerCy + 12}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            驱动一帧：依次跑下面三步
          </text>
          {/* performTraversals 向下指向三步 */}
          <line
            x1={driverX + DRIVER_W / 2}
            y1={TRIGGER_TOP + TRIGGER_H}
            x2={driverX + DRIVER_W / 2}
            y2={STEP_TOP - ARROW}
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
          />
          <path
            d={`M ${driverX + DRIVER_W / 2} ${STEP_TOP}
                l -${ARROW} -${ARROW * 1.6}
                l ${ARROW * 2} 0 Z`}
            fill="var(--text-secondary)"
          />

          {/* —— 三大步骤卡片 + 串行箭头 —— */}
          {STEPS.map((s, i) => {
            const x = stepX(i);
            return (
              <g key={s.id}>
                <rect
                  x={x}
                  y={STEP_TOP}
                  width={STEP_W}
                  height={STEP_H}
                  rx="8"
                  fill="var(--accent)"
                  fillOpacity="0.08"
                  stroke="var(--accent)"
                  strokeWidth="1.4"
                />
                {/* 顶部序号条 */}
                <text
                  x={x + 12}
                  y={STEP_TOP + 22}
                  fontSize="14"
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  {s.name}
                </text>
                <text
                  x={x + STEP_W - 12}
                  y={STEP_TOP + 22}
                  textAnchor="end"
                  fontSize="11"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {s.cn}
                </text>
                {/* 回调名 */}
                <text
                  x={x + 12}
                  y={STEP_TOP + 44}
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-secondary)"
                >
                  {s.hook}()
                </text>
                {/* 职责 */}
                <text
                  x={x + 12}
                  y={STEP_TOP + 60}
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                >
                  {s.duty}
                </text>
                {/* 步间向右箭头 */}
                {i < STEPS.length - 1 && (
                  <g>
                    <line
                      x1={x + STEP_W}
                      y1={stepCy}
                      x2={x + STEP_W + STEP_GAP - ARROW}
                      y2={stepCy}
                      stroke="var(--accent)"
                      strokeWidth="1.6"
                      markerEnd="url(#draw-arr)"
                    />
                  </g>
                )}
              </g>
            );
          })}

          {/* —— ① 优化点指向 measure/layout（深层成本高）—— */}
          <text
            x={(stepCx(0) + stepCx(1)) / 2}
            y={STEP_TOP - 8}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="var(--accent)"
          >
            ① 层级越深，measure/layout 越贵
          </text>

          {/* —— 左侧四个优化点卡片 —— */}
          <text
            x={PAD_X}
            y={TIP_TOP - 12}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            优化点：让每一步更便宜、更少触发
          </text>
          {TIPS.map((t, i) => {
            const y = TIP_TOP + i * (TIP_H + TIP_GAP);
            return (
              <g key={t.num}>
                <rect
                  x={PAD_X}
                  y={y}
                  width={TIP_W}
                  height={TIP_H}
                  rx="8"
                  fill={t.color}
                  fillOpacity="0.06"
                  stroke={t.color}
                  strokeWidth="1.3"
                />
                {/* 左侧语义色条 */}
                <rect
                  x={PAD_X}
                  y={y}
                  width="4"
                  height={TIP_H}
                  rx="2"
                  fill={t.color}
                />
                <text
                  x={PAD_X + 16}
                  y={y + 20}
                  fontSize="11"
                  fontWeight="700"
                  fill={t.color}
                >
                  {t.num} {t.title}
                </text>
                <text
                  x={PAD_X + 16}
                  y={y + 38}
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                >
                  {t.detail}
                </text>
              </g>
            );
          })}

          {/* —— 右下角：过度绘制 1x/2x/3x 叠涂示意（danger）—— */}
          <text
            x={OD_X}
            y={TIP_TOP - 12}
            fontSize="11"
            fontWeight="700"
            fill="var(--danger)"
          >
            过度绘制：同一像素被涂多层
          </text>
          {OD_LAYERS.map((layer, i) => {
            const lx = OD_X + i * OD_LAYER_GAP;
            const ly = TIP_TOP + 8 + i * (OD_LAYER_H + OD_LAYER_GAP);
            const lw = OD_W - i * OD_LAYER_GAP * 2;
            return (
              <g key={layer.label}>
                <rect
                  x={lx}
                  y={ly}
                  width={lw}
                  height={OD_LAYER_H}
                  rx="6"
                  fill="var(--danger)"
                  fillOpacity={layer.opacity}
                  stroke="var(--danger)"
                  strokeWidth="1.2"
                />
                <text
                  x={lx + 12}
                  y={ly + OD_LAYER_H / 2 + 4}
                  fontSize="9.5"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {layer.label}
                </text>
              </g>
            );
          })}
          <text
            x={OD_X}
            y={TIP_TOP + 8 + 3 * (OD_LAYER_H + OD_LAYER_GAP) + 14}
            fontSize="9"
            fill="var(--text-secondary)"
          >
            叠得越多越红 → 用 GPU 过度绘制检测定位
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一帧由 <code>VSYNC</code> 触发、<code>ViewRootImpl.performTraversals()</code> 驱动，
        <strong>measure → layout → draw</strong> 三步串行，必须在 16.6ms（60fps）内画完，超时即掉帧。
        优化方向：①扁平布局减少 measure/layout、②去掉重叠背景避免过度绘制、③onDraw 不分配对象、
        ④局部刷新用 <code>invalidate</code> 而非整树重绘。
      </figcaption>
    </figure>
  );
}
