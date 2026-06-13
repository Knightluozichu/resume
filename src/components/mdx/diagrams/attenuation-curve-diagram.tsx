/**
 * <AttenuationCurveDiagram>：「投光物」§4 衰减数学小节的配图（HEL-54，C 实战型）。
 *
 * 把点光源衰减公式 attenuation = 1/(Kc + Kl·d + Kq·d²) 的「形状」画出来：
 * 横轴是片段到光源的距离 d，纵轴是衰减后的亮度（0~1）。曲线在近处接近 1（满亮），
 * 随 d 增大快速下跌、远处拖出一条贴近 0 的长尾——这正是 1/(…+Kq·d²) 二次项主导的
 * 「先陡后缓」落法，比一根直线（线性衰减）更像真实灯光。
 *
 * 同时对照画一条浅色的「线性 1/d」虚线，凸显「带二次项的衰减下跌更快、尾巴更贴地」，
 * 呼应正文：二次项 Kq 让远处衰减得更狠、更自然。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--warning/--border/
 * --bg-elevated/--text-primary/--text-secondary），无阴影（硬规则 5）。
 */

export function AttenuationCurveDiagram() {
  // 坐标系：x 距离 0..d_max 映射到 [70, 410]，y 亮度 1..0 映射到 [40, 200]。
  // 用真实公式 1/(1 + 0.09 d + 0.032 d²)（覆盖 ~50 那档典型值）采样画曲线。
  const x0 = 70;
  const x1 = 410;
  const yTop = 40; // 亮度 = 1
  const yBot = 200; // 亮度 = 0
  const dMax = 16;

  const sx = (d: number) => x0 + (d / dMax) * (x1 - x0);
  const sy = (b: number) => yBot - b * (yBot - yTop);

  const quadratic = (d: number) => 1 / (1 + 0.09 * d + 0.032 * d * d);
  const linearOnly = (d: number) => 1 / (1 + 0.35 * d); // 仅线性项，对照「下跌更慢」

  const path = (fn: (d: number) => number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 48; i++) {
      const d = (i / 48) * dMax;
      pts.push(`${sx(d).toFixed(1)} ${sy(fn(d)).toFixed(1)}`);
    }
    return "M" + pts.join(" L");
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 480 260"
          role="img"
          aria-label="点光源衰减曲线。横轴是片段到光源的距离 d，纵轴是衰减后的亮度，范围 0 到 1。带二次项的衰减公式画出的实线在近处接近满亮，随距离增大先陡后缓地快速下跌，远处拖出一条贴近 0 的长尾。作为对照的仅线性衰减虚线下跌得更慢、尾巴更高。说明二次项让远处衰减得更狠、更接近真实灯光。"
          className="mx-auto block h-auto w-full max-w-[480px]"
        >
          <text
            x="240"
            y="26"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            衰减：亮度随距离 d 怎么掉
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
            x2={x1 + 10}
            y2={yBot}
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          {/* 轴标注 */}
          <text
            x={x0 - 10}
            y={yTop + 4}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            1
          </text>
          <text
            x={x0 - 10}
            y={yBot + 4}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            0
          </text>
          <text
            x={x0 - 18}
            y={(yTop + yBot) / 2}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
            transform={`rotate(-90 ${x0 - 30} ${(yTop + yBot) / 2})`}
          >
            亮度
          </text>
          <text
            x={x1 + 6}
            y={yBot + 20}
            textAnchor="end"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            距离 d →
          </text>

          {/* 对照：仅线性衰减（虚线，下跌更慢） */}
          <path
            d={path(linearOnly)}
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.7"
          />
          {/* 主曲线：带二次项的衰减（实线，先陡后缓 + 长尾） */}
          <path
            d={path(quadratic)}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />

          {/* 起点满亮标记 */}
          <circle cx={sx(0)} cy={sy(1)} r="4" fill="var(--accent)" />
          <text x={sx(0) + 8} y={sy(1) - 6} fontSize="10" fill="var(--accent)">
            近处≈满亮
          </text>

          {/* 图例 */}
          <line
            x1="300"
            y1="232"
            x2="324"
            y2="232"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <text x="330" y="236" fontSize="10" fill="var(--text-secondary)">
            含二次项 Kq·d²
          </text>
          <line
            x1="120"
            y1="232"
            x2="144"
            y2="232"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.7"
          />
          <text x="150" y="236" fontSize="10" fill="var(--text-secondary)">
            仅线性（更慢）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        点光源衰减 <code>1/(Kc + Kl·d + Kq·d²)</code>：近处接近满亮，随距离 d
        增大先陡后缓地快速下跌、远处拖出一条贴地长尾。二次项 <code>Kq·d²</code>
        让远处衰减得更狠，比一根直线（仅线性）更接近真实灯光。
      </figcaption>
    </figure>
  );
}
