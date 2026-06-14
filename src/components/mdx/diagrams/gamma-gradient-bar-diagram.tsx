/**
 * <GammaGradientBarDiagram corrected={false|true}>：「高级光照·Gamma 校正」章 CompareSlider 两侧的
 * 静态渐变条示意（HEL-81）。把「线性值直接显示（未校正）」与「输出前做 pow(c,1/2.2)（已校正）」
 * 画成同构同框的两态，供 <CompareSlider> 左右擦除对比中间调的明暗差异——纯静态 SVG，不塞 WebGL 画布。
 *
 * 画的是一条从黑(0)到白(1)的水平渐变条，沿横轴均匀取若干等距台阶，每格填一种灰：
 *  - corrected=false（未校正）：每格直接填它的线性值 v（v、v、v）。线性 0.5 在显示器上会被压暗成
 *    约 0.22 的观感，所以中段看起来「偏暗、过渡挤在亮端」。
 *  - corrected=true（已校正）：每格先做 gamma 校正 pow(v,1/2.2) 再填。中间调被提亮，经显示器压回后
 *    恰好回到线性 0.5 的真实亮度，于是中段被「提亮」、整条过渡更均匀。
 *
 * 注意：本图用 sRGB 的 0..255 字节值近似「显示器最终呈现的观感」（浏览器把这些字节当 sRGB 解码点亮），
 * 因此「未校正」格填 round(v*255)（偏暗）、「已校正」格填 round(pow(v,1/2.2)*255)（提亮）——两态填法
 * 不同但同坐标轴、同台阶数、同框，CompareSlider 擦除时严格对齐。
 *
 * Server Component（纯展示，静态 SVG，按 corrected 切两态，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--danger/--border/--bg-elevated/
 * --text-primary/--text-secondary）；灰阶格本质是数据可视化（呈现 gamma 观感），用 rgb 灰是其语义本体、
 * 非「装饰魔法色」，故不套 token（与 aliasing/msaa 等灰阶示意图同理）。无阴影、rx 圆角（硬规则 5）。
 */

const X0 = 60;
const BAR_W = 360;
const BAR_Y = 70;
const BAR_H = 70;
const STEPS = 12; // 等距台阶数（看清中间调差异即可）
const gamma = 2.2;

export function GammaGradientBarDiagram({
  corrected = false,
  bare = false,
}: {
  /** false=未校正（线性值直接显示，中段偏暗）；true=已校正（pow(c,1/2.2)，中段提亮、过渡均匀）。 */
  corrected?: boolean;
  /**
   * bare：极简模式（默认 false）。供 <CompareSlider> 左右叠放擦除对比时用——去掉 SVG 内顶部标题、
   * 底部说明与外层 figcaption，只画渐变条 + 轴标，避免两侧标题/图注重叠。viewBox 与非 bare 时一致。
   */
  bare?: boolean;
}) {
  // 生成等距台阶灰格：v 是该格的线性值；display 是最终送进帧缓冲、被浏览器当 sRGB 点亮的字节值。
  const cells: React.ReactNode[] = [];
  const cellW = BAR_W / STEPS;
  for (let i = 0; i < STEPS; i++) {
    const v = (i + 0.5) / STEPS; // 该格线性值 0..1
    const out = corrected ? Math.pow(v, 1 / gamma) : v; // 已校正先提亮，未校正直填
    const g = Math.round(out * 255);
    cells.push(
      <rect
        key={i}
        x={X0 + i * cellW}
        y={BAR_Y}
        width={cellW + 0.5}
        height={BAR_H}
        fill={`rgb(${g},${g},${g})`}
      />,
    );
  }

  const aria = corrected
    ? "已 gamma 校正的黑到白渐变条。输出前对每格线性值做 1 除以 2.2 次幂提亮，经显示器压回后中间调恢复到真实亮度，整条渐变从黑到白过渡均匀，中段是接近一半亮度的中灰。"
    : "未校正的黑到白渐变条。每格直接填线性值，经显示器的 2.2 次幂响应压暗后，中间调偏暗，渐变看起来挤在亮端、中段偏黑、过渡不均匀。";

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 480 200"
          role="img"
          aria-label={aria}
          className="mx-auto block h-auto w-full max-w-[480px]"
        >
          {!bare && (
            <text
              x="240"
              y="34"
              textAnchor="middle"
              fontSize="13"
              fontWeight="600"
              fill={corrected ? "var(--accent)" : "var(--danger)"}
            >
              {corrected
                ? "已校正：pow(c, 1/2.2)，中段提亮、过渡均匀"
                : "未校正：线性值直接显示，中段偏暗"}
            </text>
          )}

          {/* 渐变条外框 */}
          <rect
            x={X0}
            y={BAR_Y}
            width={BAR_W}
            height={BAR_H}
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />
          {/* 灰阶台阶格 */}
          {cells}

          {/* 中点参照线（0.5 处） */}
          <line
            x1={X0 + BAR_W / 2}
            y1={BAR_Y - 6}
            x2={X0 + BAR_W / 2}
            y2={BAR_Y + BAR_H + 6}
            stroke="var(--text-secondary)"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.7"
          />
          <text
            x={X0 + BAR_W / 2}
            y={BAR_Y + BAR_H + 20}
            textAnchor="middle"
            fontSize="10"
            fill={corrected ? "var(--accent)" : "var(--danger)"}
          >
            中间调（线性 0.5）
          </text>

          {/* 两端标注 */}
          <text
            x={X0}
            y={BAR_Y - 8}
            textAnchor="start"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            黑 0
          </text>
          <text
            x={X0 + BAR_W}
            y={BAR_Y - 8}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            白 1
          </text>

          {!bare && (
            <text
              x="240"
              y="186"
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-secondary)"
            >
              {corrected
                ? "中段是均匀的中灰，黑白之间过渡顺滑"
                : "中段偏黑，过渡挤向亮端、不均匀"}
            </text>
          )}
        </svg>
      </div>
      {!bare && (
        <figcaption className="mt-2 text-center text-xs text-secondary">
          {corrected ? (
            <>
              <strong>已校正</strong>：输出前做 <code>pow(c, 1/2.2)</code>
              把中间调提亮，经显示器压回后中段回到真实亮度，整条渐变
              <strong>过渡均匀</strong>。
            </>
          ) : (
            <>
              <strong>未校正</strong>：线性值直接送显示器，被
              <code>x^2.2</code> 压暗后中间调<strong>偏黑</strong>
              ，过渡挤向亮端、不均匀。
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}
