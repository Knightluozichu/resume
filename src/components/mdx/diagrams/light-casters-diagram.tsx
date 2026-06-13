/**
 * <LightCastersDiagram>：「投光物」§3 三类投光物对照图（HEL-54，C 实战型）。
 *
 * 把本章最该一眼看懂的「三种光各长什么样、几何上差在哪」并排画清楚：
 *  ①平行光 directional：一组互相平行的箭头从同一方向打下来（像太阳）——只有方向、没有位置，
 *    远近一个样，故箭头一样长、一样密。
 *  ②点光源 point：从一个点向四面八方放射的箭头，越往外越稀、越淡——有位置，强度随距离「衰减」。
 *    用三圈逐渐变淡的同心圆 + 放射箭头表达「越远越暗」。
 *  ③聚光 spotlight：从一个点沿一个方向射出的一个锥形光束——有位置 + 方向 + 切光角，
 *    画内圆锥（亮）、外圆锥（边缘渐暗过渡）两层，锥外全黑。
 * 每栏底部一句话点出它的判定关键（方向 / 距离衰减 / 切光角）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--warning/--success/--border/
 * --bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角（硬规则 5）。
 */

export function LightCastersDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 340"
          role="img"
          aria-label="三类投光物对照，分三栏。左栏平行光：一组互相平行的箭头从斜上方同一方向打到地面，所有箭头一样长一样密，因为平行光只有方向、没有位置，远近强度一个样，适合模拟太阳。中栏点光源：从一个亮点向四面八方放射的箭头，外圈箭头比内圈短而淡，并用逐渐变淡的同心圆表示强度随距离衰减，离得越远越暗。右栏聚光：从一个点沿一个方向射出一个锥形光束，分内圆锥和外圆锥两层，内圆锥最亮、外圆锥边缘逐渐变暗、锥外全黑，由切光角决定照不照得到。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="caster-arrow-warning"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--warning)" />
            </marker>
            {/* 聚光锥内的渐变：靠近光源亮、远端淡（示意衰减 + 锥形） */}
            <linearGradient id="caster-spot-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--warning)" stopOpacity="0.55" />
              <stop
                offset="100%"
                stopColor="var(--warning)"
                stopOpacity="0.06"
              />
            </linearGradient>
          </defs>

          {/* ============ 左栏：平行光 directional ============ */}
          <text
            x="120"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            平行光（如太阳）
          </text>

          {/* 一组平行箭头：方向一致、长度一致、间距一致 */}
          <line
            x1="50"
            y1="70"
            x2="95"
            y2="200"
            stroke="var(--warning)"
            strokeWidth="2"
            markerEnd="url(#caster-arrow-warning)"
          />
          <line
            x1="95"
            y1="70"
            x2="140"
            y2="200"
            stroke="var(--warning)"
            strokeWidth="2"
            markerEnd="url(#caster-arrow-warning)"
          />
          <line
            x1="140"
            y1="70"
            x2="185"
            y2="200"
            stroke="var(--warning)"
            strokeWidth="2"
            markerEnd="url(#caster-arrow-warning)"
          />
          {/* 地面 */}
          <line
            x1="40"
            y1="210"
            x2="200"
            y2="210"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="120"
            y="252"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            只有方向，没有位置
          </text>
          <text
            x="120"
            y="276"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            光线互相平行、远近一个样
          </text>
          <text
            x="120"
            y="300"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            不衰减
          </text>

          {/* 分隔竖线 */}
          <line
            x1="240"
            y1="44"
            x2="240"
            y2="312"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ============ 中栏：点光源 point ============ */}
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            点光源（如灯泡）
          </text>

          {/* 同心圆：越外圈越淡（示意距离衰减） */}
          <circle
            cx="360"
            cy="130"
            r="36"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1.5"
            opacity="0.85"
          />
          <circle
            cx="360"
            cy="130"
            r="62"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1.5"
            opacity="0.45"
          />
          <circle
            cx="360"
            cy="130"
            r="88"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1.5"
            opacity="0.2"
          />
          {/* 放射箭头：从中心点向外，外端表现「越远越淡」 */}
          <line
            x1="360"
            y1="130"
            x2="360"
            y2="42"
            stroke="var(--warning)"
            strokeWidth="2"
            opacity="0.5"
            markerEnd="url(#caster-arrow-warning)"
          />
          <line
            x1="360"
            y1="130"
            x2="448"
            y2="130"
            stroke="var(--warning)"
            strokeWidth="2"
            opacity="0.5"
            markerEnd="url(#caster-arrow-warning)"
          />
          <line
            x1="360"
            y1="130"
            x2="272"
            y2="130"
            stroke="var(--warning)"
            strokeWidth="2"
            opacity="0.5"
            markerEnd="url(#caster-arrow-warning)"
          />
          <line
            x1="360"
            y1="130"
            x2="423"
            y2="193"
            stroke="var(--warning)"
            strokeWidth="2"
            opacity="0.5"
            markerEnd="url(#caster-arrow-warning)"
          />
          <line
            x1="360"
            y1="130"
            x2="297"
            y2="193"
            stroke="var(--warning)"
            strokeWidth="2"
            opacity="0.5"
            markerEnd="url(#caster-arrow-warning)"
          />
          {/* 中心发光点 */}
          <circle cx="360" cy="130" r="7" fill="var(--warning)" />
          <text
            x="360"
            y="252"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            有位置，向四面八方发光
          </text>
          <text
            x="360"
            y="276"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            强度随距离衰减
          </text>
          <text
            x="360"
            y="300"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            离得越远越暗
          </text>

          {/* 分隔竖线 */}
          <line
            x1="480"
            y1="44"
            x2="480"
            y2="312"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ============ 右栏：聚光 spotlight ============ */}
          <text
            x="600"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            聚光（如手电筒）
          </text>

          {/* 外圆锥（边缘过渡区，画浅一些） */}
          <path
            d="M600 56 L548 210 L652 210 Z"
            fill="var(--border)"
            opacity="0.4"
          />
          {/* 内圆锥（最亮，用渐变示意越远越淡） */}
          <path
            d="M600 56 L568 210 L632 210 Z"
            fill="url(#caster-spot-grad)"
            stroke="var(--warning)"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          {/* 切光角标注线（从顶点沿锥边 + 中轴） */}
          <line
            x1="600"
            y1="56"
            x2="600"
            y2="210"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.8"
          />
          <line
            x1="600"
            y1="56"
            x2="568"
            y2="210"
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.8"
          />
          {/* 切光角弧 */}
          <path
            d="M600 116 A 60 60 0 0 0 588 118"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text x="576" y="112" fontSize="11" fill="var(--accent)">
            切光角
          </text>
          {/* 光源点 */}
          <circle cx="600" cy="56" r="7" fill="var(--warning)" />
          {/* 地面 */}
          <line
            x1="540"
            y1="210"
            x2="660"
            y2="210"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="600"
            y="252"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            位置 + 方向 + 切光角
          </text>
          <text
            x="600"
            y="276"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            锥内才亮，锥外全黑
          </text>
          <text
            x="600"
            y="300"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            内外锥之间边缘渐暗
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        三类投光物的几何差别：<strong>平行光</strong>
        只有方向、光线互相平行、不随距离衰减（像太阳）；
        <strong>点光源</strong>有位置、向四面八方发光、强度随距离
        <strong>衰减</strong>（像灯泡）；
        <strong>聚光</strong>有位置 + 方向 + <strong>切光角</strong>
        ，只照亮一个锥形，锥外全黑、内外锥之间边缘平滑渐暗（像手电筒）。
      </figcaption>
    </figure>
  );
}
