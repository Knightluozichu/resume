/**
 * <DiffuseNormalDiagram>：「基础光照」§3「漫反射」+ §4 数学小节的核心掰碎图（HEL-51，C 实战型）。
 *
 * 把漫反射最难「看懂」的那件事画清楚：表面亮不亮，取决于法线 N 和「指向光源的方向」L
 * 之间的夹角 θ —— 正对光源（θ 小、N·L 接近 1）最亮，越偏（θ 大）越暗，背光（θ≥90°、
 * N·L≤0）全黑。两栏对照同一块表面、同一个法线 N，只改变光源方位：
 *  ①左栏「正对光源」：L 几乎和 N 同向，夹角 θ 很小，N·L 接近 1 → 很亮。
 *  ②右栏「斜射」：L 偏到一侧，夹角 θ 变大，N·L 变小 → 变暗。
 * 每栏都画出：水平表面、从表面竖起的法线 N（单位向量）、指向光源的 L、夹角 θ 弧、
 * 一个小太阳标记光源，并在底部标 N·L 的大致取值与明暗结论。
 *
 * 配合 §4「diff = max(dot(N, L), 0)」公式一起读：图给几何直觉，公式给精确表达。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--border/
 * --bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角（硬规则 5）。
 */

export function DiffuseNormalDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 660 340"
          role="img"
          aria-label="漫反射的几何直觉，分两栏，两栏是同一块水平表面、同一条竖直向上的法线 N，只改变光源方位。左栏「正对光源」：指向光源的方向 L 几乎与法线 N 同向，夹角很小，N 点乘 L 接近 1，表面很亮。右栏「斜射」：光源偏到一侧，L 与法线 N 的夹角变大，N 点乘 L 变小，表面变暗。结论：表面正对光源时最亮，越偏越暗，背光时 N 点乘 L 小于等于 0、用 max 截到 0，表面不被这盏灯照亮。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          <defs>
            <marker
              id="diffuse-arrow-accent"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
            <marker
              id="diffuse-arrow-warning"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--warning)" />
            </marker>
          </defs>

          {/* ============ 左栏：正对光源 → 亮 ============ */}
          <text
            x="165"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            正对光源：θ 小 → 亮
          </text>

          {/* 表面（亮：用 success 浅填示意被照亮） */}
          <rect
            x="55"
            y="240"
            width="220"
            height="22"
            fill="var(--success)"
            opacity="0.30"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="165"
            y="256"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            表面
          </text>

          {/* 法线 N：从表面中点 (165,240) 竖直向上 */}
          <line
            x1="165"
            y1="240"
            x2="165"
            y2="110"
            stroke="var(--accent)"
            strokeWidth="2.5"
            markerEnd="url(#diffuse-arrow-accent)"
          />
          <text x="172" y="120" fontSize="12" fill="var(--accent)">
            N（法线）
          </text>

          {/* L：指向光源，几乎和 N 同向（略偏右上），夹角小 */}
          <line
            x1="165"
            y1="240"
            x2="205"
            y2="118"
            stroke="var(--warning)"
            strokeWidth="2.5"
            markerEnd="url(#diffuse-arrow-warning)"
          />
          <text x="210" y="128" fontSize="12" fill="var(--warning)">
            L（指向光源）
          </text>

          {/* 夹角 θ 弧（小） */}
          <path
            d="M165 175 A 65 65 0 0 1 178 178"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
          />
          <text x="176" y="172" fontSize="11" fill="var(--text-secondary)">
            θ
          </text>

          {/* 小太阳标记光源 */}
          <circle cx="205" cy="106" r="9" fill="var(--warning)" />
          <circle
            cx="205"
            cy="106"
            r="14"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* 结论 */}
          <text
            x="165"
            y="290"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--success)"
          >
            N·L ≈ 1 → 很亮
          </text>
          <text
            x="165"
            y="312"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            夹角越小，cosθ 越接近 1
          </text>

          {/* 分隔竖线 */}
          <line
            x1="330"
            y1="40"
            x2="330"
            y2="320"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ============ 右栏：斜射 → 暗 ============ */}
          <text
            x="495"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            斜射：θ 大 → 暗
          </text>

          {/* 表面（暗：填得淡，示意只被照到一点点） */}
          <rect
            x="385"
            y="240"
            width="220"
            height="22"
            fill="var(--success)"
            opacity="0.10"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="495"
            y="256"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            表面
          </text>

          {/* 法线 N：同样竖直向上（表面没变） */}
          <line
            x1="495"
            y1="240"
            x2="495"
            y2="110"
            stroke="var(--accent)"
            strokeWidth="2.5"
            markerEnd="url(#diffuse-arrow-accent)"
          />
          <text x="502" y="120" fontSize="12" fill="var(--accent)">
            N（法线）
          </text>

          {/* L：光源偏到一侧，夹角大 */}
          <line
            x1="495"
            y1="240"
            x2="592"
            y2="160"
            stroke="var(--warning)"
            strokeWidth="2.5"
            markerEnd="url(#diffuse-arrow-warning)"
          />
          <text
            x="540"
            y="150"
            textAnchor="middle"
            fontSize="12"
            fill="var(--warning)"
          >
            L
          </text>

          {/* 夹角 θ 弧（大） */}
          <path
            d="M495 175 A 65 65 0 0 1 545 198"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
          />
          <text x="520" y="186" fontSize="11" fill="var(--text-secondary)">
            θ
          </text>

          {/* 小太阳标记光源 */}
          <circle cx="592" cy="148" r="9" fill="var(--warning)" />
          <circle
            cx="592"
            cy="148"
            r="14"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* 结论 */}
          <text
            x="495"
            y="290"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            N·L 变小 → 变暗
          </text>
          <text
            x="495"
            y="312"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            θ≥90° 时 N·L≤0，用 max 截到 0
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        漫反射的亮度只看法线 N 与「指向光源方向」L 的夹角 θ：正对光源（θ 小）时
        N·L 接近 1，表面最亮；越偏（θ 越大）N·L 越小，越暗；背光（θ≥90°）时
        N·L≤0，用 <code>max(dot(N,L), 0)</code> 截到 0，这盏灯照不亮它。
      </figcaption>
    </figure>
  );
}
