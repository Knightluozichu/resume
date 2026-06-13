/**
 * <StencilOutlineStepDiagram step={1|2|3}>：「模板测试」§5「物体描边两遍法」<Stepper> 三步配图（HEL-68，A 概念型）。
 *
 * 每一步左侧画「画布上看到的画面」、右侧画「模板缓冲此刻长什么样」，让读者盯着两者一一对上：
 *  ①第一遍正常画物体，glStencilOp(GL_KEEP,GL_KEEP,GL_REPLACE) + glStencilFunc(GL_ALWAYS,1,0xFF)：
 *    物体照常画出来，同时把它覆盖到的像素的模板值写成 1（右图：物体区域标 1，其余 0）。
 *  ②关深度测试、glStencilFunc(GL_NOTEQUAL,1,0xFF) + 关模板写入，画一个放大一圈的同物体：
 *    放大物体只在「模板值≠1」处通过——也就是只有比原物体大出来的那一环（模板仍是 0 的地方）
 *    被涂上边框色；盖住原物体的部分（模板=1）测试不通过、不画（右图：模板不变，左图只多出外圈一环描边）。
 *  ③结果：物体周围正好留下一圈描边色的轮廓。
 *
 * Server Component（纯展示，静态 SVG，按 step prop 切状态，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 *
 * view prop：
 *  - "full"（默认）：左「画布」+ 右「模板缓冲」双面板，<Stepper> 三步用。
 *  - "canvas"：只画「画布（看到的画面）」单面板（物体方块；step≥2 时加外圈描边环），
 *    填满 figure 宽度、viewBox 收成近正方形。<CompareSlider> 同构同框对比用——
 *    左右两侧都传 canvas 视图，擦除滑块时干净呈现「物体 → 物体+外圈描边」。
 */

type OutlineStep = 1 | 2 | 3;
type OutlineView = "full" | "canvas";

const ARIA: Record<OutlineStep, string> = {
  1: "物体描边两遍法第一步。左边画布上正常画出一个物体方块。右边是模板缓冲，物体覆盖到的像素的模板值被写成 1，用高亮标出，其余区域保持 0。这一遍设置 glStencilOp 为 GL_KEEP GL_KEEP GL_REPLACE，并用 glStencilFunc GL_ALWAYS 1 0xFF 让物体所有片段都把模板值替换成 1。",
  2: "物体描边两遍法第二步。先关掉深度测试、关掉模板写入，并把比较函数设成 glStencilFunc GL_NOTEQUAL 1 0xFF，再画一个放大一圈的同一个物体。放大物体只在模板值不等于 1 的地方才通过测试，也就是只有比原物体大出来的那一圈外环被涂上边框色，正好盖住原物体的中心部分因为模板值等于 1 而测试不通过、不画。右边模板缓冲在这一遍不被写入，保持第一步的样子。",
  3: "物体描边两遍法的结果。原物体周围正好留下一圈边框色的轮廓，描边完成。",
};

const ARIA_CANVAS: Record<OutlineStep, string> = {
  1: "画布上正常画出的一个物体方块，没有描边。",
  2: "画布上的物体方块，外缘多了一圈描边色的外环（两遍法第二遍只在物体外侧上色）。",
  3: "画布上的物体方块，外缘镶了一圈描边色的轮廓，这是两遍法跑完后的描边效果。",
};

const CANVAS_CAPTION: Record<OutlineStep, string> = {
  1: "没做描边：只有物体本身。",
  2: "第二遍后：物体外缘多了一圈描边环。",
  3: "两遍法后：物体外缘多了一圈描边。",
};

/**
 * 画「画布」上的物体方块（+ step≥2 时的外圈描边环）。供 full / canvas 两种视图复用，
 * 不要再画一套——传入画布中心 (cx, cy) 即可摆到任意位置。
 */
function CanvasContent({
  step,
  cx,
  cy,
  objHalf,
  grow,
  showLabel,
}: {
  step: OutlineStep;
  cx: number;
  cy: number;
  objHalf: number;
  grow: number;
  showLabel: boolean;
}) {
  return (
    <>
      {step === 1 && (
        <>
          {/* 第一遍：正常画出的物体 */}
          <rect
            x={cx - objHalf}
            y={cy - objHalf}
            width={objHalf * 2}
            height={objHalf * 2}
            rx="4"
            fill="var(--accent)"
            opacity="0.85"
            stroke="var(--border)"
            strokeWidth="1"
          />
          {showLabel && (
            <text
              x={cx}
              y={cy + 4}
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-primary)"
            >
              物体
            </text>
          )}
        </>
      )}

      {step === 2 && (
        <>
          {/* 第二遍：放大物体外环上描边色（GL_NOTEQUAL 只在模板≠1处） */}
          <rect
            x={cx - objHalf - grow}
            y={cy - objHalf - grow}
            width={(objHalf + grow) * 2}
            height={(objHalf + grow) * 2}
            rx="4"
            fill="var(--warning)"
            opacity="0.9"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          {/* 中心：原物体仍在（模板=1 处放大物体不画，露出第一遍的物体） */}
          <rect
            x={cx - objHalf}
            y={cy - objHalf}
            width={objHalf * 2}
            height={objHalf * 2}
            rx="4"
            fill="var(--accent)"
            opacity="0.85"
            stroke="var(--border)"
            strokeWidth="1"
          />
          {showLabel && (
            <text
              x={cx}
              y={cy - objHalf - grow / 2 + 1}
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill="var(--bg)"
            >
              只有这一环被画
            </text>
          )}
        </>
      )}

      {step === 3 && (
        <>
          {/* 结果：物体 + 周围一圈描边 */}
          <rect
            x={cx - objHalf - grow}
            y={cy - objHalf - grow}
            width={(objHalf + grow) * 2}
            height={(objHalf + grow) * 2}
            rx="4"
            fill="var(--warning)"
            opacity="0.9"
          />
          <rect
            x={cx - objHalf}
            y={cy - objHalf}
            width={objHalf * 2}
            height={objHalf * 2}
            rx="4"
            fill="var(--accent)"
            opacity="0.85"
            stroke="var(--border)"
            strokeWidth="1"
          />
          {showLabel && (
            <text
              x={cx}
              y={cy + 4}
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-primary)"
            >
              物体 + 描边
            </text>
          )}
        </>
      )}
    </>
  );
}

export function StencilOutlineStepDiagram({
  step,
  view = "full",
}: {
  step: OutlineStep;
  view?: OutlineView;
}) {
  // 画布与模板缓冲两个方框共用一套几何。
  const cx = 130; // 左侧画布中心 x
  const cy = 135; // 两图中心 y
  const objHalf = 42; // 原物体半边长
  const grow = 14; // 第二遍放大量（一圈描边宽度）

  // canvas 视图：只画「画布」单面板，填满 figure 宽度、viewBox 近正方形。
  if (view === "canvas") {
    const ccx = 130; // 单面板画布中心 x
    const ccy = 130; // 单面板画布中心 y
    return (
      <figure className="mdx-figure mx-auto my-4">
        <div className="overflow-hidden rounded-card border border-border bg-elevated">
          <svg
            viewBox="0 0 260 260"
            role="img"
            aria-label={ARIA_CANVAS[step]}
            className="mx-auto block h-auto w-full max-w-[260px]"
          >
            <text
              x={ccx}
              y="32"
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="var(--text-primary)"
            >
              画布（看到的画面）
            </text>
            {/* 画布外框 */}
            <rect
              x={ccx - 100}
              y="48"
              width="200"
              height="170"
              rx="6"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <CanvasContent
              step={step}
              cx={ccx}
              cy={ccy}
              objHalf={objHalf}
              grow={grow}
              showLabel={false}
            />
          </svg>
        </div>
        <figcaption className="mt-2 text-center text-xs text-secondary">
          {CANVAS_CAPTION[step]}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 520 280"
          role="img"
          aria-label={ARIA[step]}
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          {/* ============ 左：画布上看到的画面 ============ */}
          <text
            x={cx}
            y="34"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            画布（看到的画面）
          </text>
          {/* 画布外框 */}
          <rect
            x={cx - 100}
            y="50"
            width="200"
            height="170"
            rx="6"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          {/* 画布上的物体方块（+ step≥2 的外圈描边环），与 canvas 视图共用绘制逻辑 */}
          <CanvasContent
            step={step}
            cx={cx}
            cy={cy}
            objHalf={objHalf}
            grow={grow}
            showLabel
          />

          {/* ============ 右：模板缓冲此刻状态 ============ */}
          <text
            x="390"
            y="34"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            模板缓冲（幕后）
          </text>
          {/* 模板缓冲外框（整片初始 0） */}
          <rect
            x="290"
            y="50"
            width="200"
            height="170"
            rx="6"
            fill="var(--bg-elevated)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          {/* 第三步模板缓冲与第二步相同（第二遍不写模板），故 step>=1 都画物体区 =1（除非 step 是结果态仍保留） */}
          {/* 物体区域：第一遍写成 1（step1 起就有，step2/3 不变） */}
          <rect
            x={390 - objHalf}
            y={cy - objHalf}
            width={objHalf * 2}
            height={objHalf * 2}
            rx="4"
            fill="var(--accent)"
            opacity={step === 1 ? 0.3 : 0.22}
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="390"
            y={cy + 4}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            className="font-mono"
            fill="var(--accent)"
          >
            1
          </text>
          {/* 四角标几个 0，点出其余区域是 0 */}
          <text
            x="312"
            y="74"
            fontSize="12"
            className="font-mono"
            fill="var(--text-secondary)"
          >
            0
          </text>
          <text
            x="462"
            y="74"
            fontSize="12"
            className="font-mono"
            fill="var(--text-secondary)"
          >
            0
          </text>
          <text
            x="312"
            y="210"
            fontSize="12"
            className="font-mono"
            fill="var(--text-secondary)"
          >
            0
          </text>
          <text
            x="462"
            y="210"
            fontSize="12"
            className="font-mono"
            fill="var(--text-secondary)"
          >
            0
          </text>

          {/* ============ 底部本步说明 ============ */}
          {step === 1 && (
            <text
              x="260"
              y="250"
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-secondary)"
            >
              正常画物体，同时把它的像素模板值写成{" "}
              <tspan className="font-mono" fill="var(--accent)">
                1
              </tspan>
              （GL_REPLACE）
            </text>
          )}
          {step === 2 && (
            <text
              x="260"
              y="250"
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-secondary)"
            >
              关深度测试，画放大物体，{" "}
              <tspan className="font-mono" fill="var(--warning)">
                GL_NOTEQUAL
              </tspan>{" "}
              只在模板≠1 处上描边色
            </text>
          )}
          {step === 3 && (
            <text
              x="260"
              y="250"
              textAnchor="middle"
              fontSize="11"
              fill="var(--success)"
              fontWeight="600"
            >
              物体周围正好留下一圈描边轮廓
            </text>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        盯着右边<strong>模板缓冲</strong>：第 ① 步把物体区域写成{" "}
        <strong>1</strong>；第 ② 步画放大物体、靠 <code>GL_NOTEQUAL</code>{" "}
        只在模板≠1 的<strong>外环</strong>上色（中心模板=1 处不画）；第 ③
        步外环就成了物体的一圈<strong>描边</strong>。
      </figcaption>
    </figure>
  );
}
