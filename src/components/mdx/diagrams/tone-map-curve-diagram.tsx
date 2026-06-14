/**
 * <ToneMapCurveDiagram>：「高级光照·HDR」C 实战型章的色调映射曲线图（HEL-86）。
 *
 * 在同一坐标系里画三条色调映射曲线，把「把 [0,∞) 的 HDR 输入压回 [0,1] 显示」的三种做法一眼对照：
 *  - clamp = min(x, 1)（var(--danger)）：直接截断——到 1 就水平封顶，>1 的高光全压成 1（死白），
 *    高光区一点层次都没有（一条折线，到 1 后完全平）。
 *  - Reinhard = x/(x+1)（var(--accent)）：平滑地把任意大的 x 压进 [0,1)，永远逼近 1 但不会真到 1，
 *    高光区仍有缓慢上升的层次。
 *  - exposure = 1 - exp(-x·k)（var(--text-secondary)，这里取 k=1）：模拟相机曝光，同样平滑趋近 1，
 *    曲线形状由曝光值 k 调（k 大整体更亮、暗部更快抬起）。
 *
 * 横轴 = HDR 输入 0..5（远超 1），纵轴 = 输出 0..1（可显示范围）。配坐标轴、x=1 对照虚线、图例。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--danger/--border/--bg-elevated/
 * --text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function ToneMapCurveDiagram() {
  // 坐标系：HDR 输入 x∈[0,5] 映到 [x0,x1]；输出 y∈[0,1] 映到 [yBot,yTop]（y 向上为大）。
  const x0 = 70;
  const x1 = 410;
  const yTop = 40; // 输出 = 1
  const yBot = 240; // 输出 = 0
  const X_MAX = 5; // HDR 输入轴右端
  const exposureK = 1.0; // 示意曝光值

  const sx = (x: number) => x0 + (x / X_MAX) * (x1 - x0);
  const sy = (y: number) => yBot - y * (yBot - yTop);

  const path = (fn: (x: number) => number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 80; i++) {
      const x = (i / 80) * X_MAX;
      pts.push(`${sx(x).toFixed(1)} ${sy(Math.min(1, fn(x))).toFixed(1)}`);
    }
    return "M" + pts.join(" L");
  };

  const clamp = (x: number) => Math.min(x, 1);
  const reinhard = (x: number) => x / (x + 1);
  const exposure = (x: number) => 1 - Math.exp(-x * exposureK);

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-label="色调映射曲线对照图。横轴是 HDR 输入值，从 0 到 5，远超 1，纵轴是输出值 0 到 1，即可显示范围。三条曲线：clamp 直接截断等于取输入与 1 的较小值，到 1 就水平封顶、大于 1 的高光全压成纯白没有层次；Reinhard 等于 x 除以 x 加 1，平滑地把任意大的输入压进小于 1，永远逼近 1 但保留高光层次；曝光等于 1 减去 e 的负 x 乘曝光值次幂，同样平滑趋近 1，曲线形状由曝光值调节。"
          className="mx-auto block h-auto w-full max-w-[480px]"
        >
          <text
            x="240"
            y="24"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            三条色调映射曲线：把 HDR 压回 [0,1]
          </text>

          {/* 坐标轴 */}
          <line
            x1={x0}
            y1={yTop}
            x2={x0}
            y2={yBot}
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <line
            x1={x0}
            y1={yBot}
            x2={x1 + 12}
            y2={yBot}
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          {/* 轴端标注 */}
          <text
            x={x0 - 8}
            y={yTop + 4}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            1
          </text>
          <text
            x={x0 - 8}
            y={yBot + 4}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            0
          </text>
          <text
            x={x1}
            y={yBot + 18}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            5
          </text>
          <text
            x={(x0 + x1) / 2}
            y={yBot + 20}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            HDR 输入（远超 1）→
          </text>
          <text
            x={x0 - 22}
            y={(yTop + yBot) / 2}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
            transform={`rotate(-90 ${x0 - 22} ${(yTop + yBot) / 2})`}
          >
            输出值
          </text>

          {/* x=1 处竖直对照虚线（普通帧缓冲上限 / clamp 封顶起点） */}
          <line
            x1={sx(1)}
            y1={yTop}
            x2={sx(1)}
            y2={yBot}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.6"
          />
          <text
            x={sx(1)}
            y={yBot + 16}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            1
          </text>

          {/* clamp 曲线（到 1 水平封顶，>1 死白） */}
          <path
            d={path(clamp)}
            fill="none"
            stroke="var(--danger)"
            strokeWidth="2.5"
          />
          {/* exposure 曲线（先画，作中间参照） */}
          <path
            d={path(exposure)}
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2.5"
            strokeDasharray="6 3"
          />
          {/* Reinhard 曲线 */}
          <path
            d={path(reinhard)}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />

          {/* 图例 */}
          <g fontSize="10">
            <line
              x1={x0}
              y1={266}
              x2={x0 + 18}
              y2={266}
              stroke="var(--danger)"
              strokeWidth="2.5"
            />
            <text x={x0 + 24} y={269} fill="var(--text-secondary)">
              clamp = min(x,1)（&gt;1 死白）
            </text>
            <line
              x1={x0}
              y1={282}
              x2={x0 + 18}
              y2={282}
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            <text x={x0 + 24} y={285} fill="var(--text-secondary)">
              Reinhard = x/(x+1)
            </text>
            <line
              x1={x0}
              y1={298}
              x2={x0 + 18}
              y2={298}
              stroke="var(--text-secondary)"
              strokeWidth="2.5"
              strokeDasharray="6 3"
            />
            <text x={x0 + 24} y={301} fill="var(--text-secondary)">
              exposure = 1−exp(−x·k)
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        红线 <code>clamp</code> 到 1 就水平封顶——<code>&gt;1</code>{" "}
        的高光全压成死白、毫无层次；紫线 <code>Reinhard</code> 与灰虚线{" "}
        <code>exposure</code> 都平滑趋近 1，把任意大的 HDR 输入压回可显示范围、
        <strong>高光区仍有层次</strong>。
      </figcaption>
    </figure>
  );
}
