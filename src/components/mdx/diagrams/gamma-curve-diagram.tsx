/**
 * <GammaCurveDiagram>：「高级光照·Gamma 校正」A 概念型章的核心概念图（HEL-81）。
 *
 * 在同一坐标系里画三条幂曲线，把「线性空间 / 显示器响应 / gamma 校正」三者的关系一眼说清：
 *  - y = x（对角直线，var(--border)）：理想的线性关系——输入多少、输出就多少。基准参照线。
 *  - y = x^2.2（向下凹的曲线，var(--danger)）：显示器的非线性 gamma 响应（也是 sRGB 编码曲线）。
 *    同样的输入，实际输出的亮度被压暗，中间调被压得最狠（0.5 输入 → 约 0.22 输出）。
 *  - y = x^(1/2.2)（向上凸的曲线，var(--accent)）：gamma 校正曲线（输出前做 pow(c,1/2.2)）。
 *    它把中间调先提亮，正好抵消显示器的压暗——两条曲线互为反函数，串起来 = 那条线性对角线。
 *
 * 横轴 = 输入值 0..1，纵轴 = 输出值 0..1。配坐标轴、0.5 处的对照虚线、三条曲线图例。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--danger/--border/--bg-elevated/
 * --text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function GammaCurveDiagram() {
  // 坐标系：输入 x∈[0,1] 映射到 [x0,x1]，输出 y∈[0,1] 映射到 [yBot,yTop]（y 向上为大）。
  const x0 = 70;
  const x1 = 410;
  const yTop = 40; // 输出 = 1
  const yBot = 240; // 输出 = 0
  const gamma = 2.2;

  const sx = (x: number) => x0 + x * (x1 - x0);
  const sy = (y: number) => yBot - y * (yBot - yTop);

  const path = (fn: (x: number) => number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 64; i++) {
      const x = i / 64;
      pts.push(`${sx(x).toFixed(1)} ${sy(fn(x)).toFixed(1)}`);
    }
    return "M" + pts.join(" L");
  };

  // 0.5 输入时三条曲线各自的输出，用来画对照点
  const midDisplay = Math.pow(0.5, gamma); // ≈ 0.218
  const midCorrect = Math.pow(0.5, 1 / gamma); // ≈ 0.730

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 480 298"
          role="img"
          aria-label="Gamma 幂曲线对照图。横轴是输入值 0 到 1，纵轴是输出值 0 到 1。三条曲线：对角直线 y=x 是理想的线性关系，作基准；向下凹的曲线 y=x 的 2.2 次方是显示器的非线性 gamma 响应，把中间调压暗，0.5 的输入只输出约 0.22；向上凸的曲线 y=x 的 1 除以 2.2 次方是 gamma 校正曲线，把中间调提亮，0.5 的输入输出约 0.73。校正曲线和显示器响应曲线互为反函数，串起来正好回到线性对角线。"
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
            三条 gamma 幂曲线：输出怎样随输入变化
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
            1
          </text>
          <text
            x={(x0 + x1) / 2}
            y={yBot + 30}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            输入值 →
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

          {/* 0.5 输入处的竖直对照虚线 + 三个对照点 */}
          <line
            x1={sx(0.5)}
            y1={yTop}
            x2={sx(0.5)}
            y2={yBot}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.6"
          />
          <text
            x={sx(0.5)}
            y={yBot + 14}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            0.5
          </text>

          {/* 线性基准线 y=x */}
          <path
            d={path((x) => x)}
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          {/* 显示器响应 / sRGB 编码曲线 y=x^2.2（压暗中间调） */}
          <path
            d={path((x) => Math.pow(x, gamma))}
            fill="none"
            stroke="var(--danger)"
            strokeWidth="2.5"
          />
          {/* gamma 校正曲线 y=x^(1/2.2)（提亮中间调） */}
          <path
            d={path((x) => Math.pow(x, 1 / gamma))}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />

          {/* 0.5 处三个对照点 */}
          <circle
            cx={sx(0.5)}
            cy={sy(0.5)}
            r="3"
            fill="var(--text-secondary)"
          />
          <circle
            cx={sx(0.5)}
            cy={sy(midDisplay)}
            r="3.5"
            fill="var(--danger)"
          />
          <circle
            cx={sx(0.5)}
            cy={sy(midCorrect)}
            r="3.5"
            fill="var(--accent)"
          />
          <text
            x={sx(0.5) + 8}
            y={sy(midDisplay) + 4}
            fontSize="9"
            fill="var(--danger)"
          >
            ≈0.22
          </text>
          <text
            x={sx(0.5) + 8}
            y={sy(midCorrect) + 4}
            fontSize="9"
            fill="var(--accent)"
          >
            ≈0.73
          </text>

          {/* 图例 */}
          <g fontSize="10">
            <line
              x1={x0}
              y1={272}
              x2={x0 + 18}
              y2={272}
              stroke="var(--danger)"
              strokeWidth="2.5"
            />
            <text x={x0 + 24} y={275} fill="var(--text-secondary)">
              x^2.2 显示器响应（压暗）
            </text>
            <line
              x1={x0}
              y1={286}
              x2={x0 + 18}
              y2={286}
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            <text x={x0 + 24} y={289} fill="var(--text-secondary)">
              x^(1/2.2) gamma 校正（提亮）
            </text>
            <line
              x1={300}
              y1={272}
              x2={318}
              y2={272}
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeDasharray="5 4"
            />
            <text x={324} y={275} fill="var(--text-secondary)">
              y=x 线性基准
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        红线 <code>x^2.2</code> 是显示器把信号压暗的非线性响应（0.5 输入只亮成约
        0.22）；紫线 <code>x^(1/2.2)</code> 是输出前的 gamma
        校正，先把中间调提亮（0.5 提到约 0.73）。两条互为反函数，串起来正好回到
        <code>y=x</code> 这条线性基准——这就是「校正抵消显示器压暗」的全部含义。
      </figcaption>
    </figure>
  );
}
