/**
 * <ParallaxPrincipleDiagram>：「高级光照·视差贴图」§3「视差偏移思想」小节的核心掰碎图（HEL-85，C 实战型）。
 *
 * 本章最核心的直觉图：侧视图。一条起伏的高度轮廓线（真实表面其实凹凸不平）+ 几何平面（着色器以为表面是平的）
 * + 一条斜射进来的视线。画出整套视差偏移的因果：
 *  - 视线从眼睛斜射到几何平面，本该在 A 点采样纹理（A = 视线与平面的交点）；
 *  - 但表面真实轮廓在 B 处凸起、先一步挡住了视线，眼睛真正该看到的是 B 点的纹理；
 *  - 视差偏移要做的，就是把采样 UV 从 A 沿视方向挪到 B，让平面「假装」自己有 B 处那样的凹凸深度。
 * 标注：A（原采样点）、B（视差修正后的采样点）、偏移量 offset（A→B 沿表面的位移）、视线倾斜角。
 *
 * 直觉落点：法线贴图只骗光照（轮廓还是平的）；视差贴图连「你该看到表面哪一点」都骗——沿视方向偏移采样 UV，
 * 让平面斜看时显出真实的凹凸深度与遮挡。偏移只在斜看时明显（视线越斜，A、B 差越大），正看时 A≈B 几乎无效。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--danger/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function ParallaxPrincipleDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 640 380"
          role="img"
          aria-label="视差偏移原理的侧视图。一条水平的几何平面代表着色器以为的平整表面，平面下方一条起伏的轮廓线代表表面其实有的真实凹凸深度，靠近视线处有一处凸起。眼睛在左上方，一条视线斜射向表面。视线与几何平面的交点是 A，这是不做视差修正时本该采样纹理的点。但真实表面在 B 处先一步凸起、挡住了视线，眼睛真正该看到的是 B 点的纹理。视差偏移就是把采样坐标从 A 沿视线方向挪到 B，这段位移叫偏移量 offset。视线越斜，A 和 B 相差越大、视差越明显；正对着看时 A 和 B 几乎重合、视差几乎无效。"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <defs>
            <marker
              id="pp-arrow-text"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6.5"
              markerHeight="6.5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="pp-arrow-danger"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6.5"
              markerHeight="6.5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--danger)" />
            </marker>
            <marker
              id="pp-arrow-success"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6.5"
              markerHeight="6.5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--success)" />
            </marker>
            <marker
              id="pp-arrow-accent"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6.5"
              markerHeight="6.5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          <text
            x="320"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            视差偏移：把采样点从 A 沿视方向挪到 B
          </text>

          {/* 几何平面（着色器以为的平表面）：一条水平线，y=180 */}
          <line
            x1="60"
            y1="180"
            x2="600"
            y2="180"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text x="64" y="172" fontSize="10" fill="var(--text-secondary)">
            几何平面（着色器以为表面是平的）
          </text>

          {/* 真实表面轮廓线：在平面下方起伏，靠近视线打到处有一处凸起（凸起顶部接近平面）。
              用一条折线模拟高度场：左低 → 中部凸起(B 处) → 右回落。深度向下为「更深」。 */}
          <path
            d="M60 250 L150 250 L210 250 L255 196 L300 196 L345 250 L420 250 L480 258 L600 258"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.2"
          />
          {/* 轮廓线与平面之间的深度填充（示意「真实表面在平面之下凹进去」） */}
          <path
            d="M60 180 L600 180 L600 258 L480 258 L420 250 L345 250 L300 196 L255 196 L210 250 L150 250 L60 250 Z"
            fill="var(--accent)"
            opacity="0.08"
          />
          <text x="430" y="278" fontSize="10" fill="var(--accent)">
            真实表面轮廓（高度图里存的凹凸深度）
          </text>

          {/* 眼睛 / 视线起点（左上方） */}
          <circle cx="120" cy="70" r="6" fill="var(--text-primary)" />
          <text x="84" y="62" fontSize="11" fill="var(--text-primary)">
            眼睛
          </text>

          {/* 视线：从眼睛斜射，穿过凸起顶 B(255,196) 后延伸到几何平面 A(320,180)。
              先画整条视线（眼睛 → A），再用红虚线段强调「本该到 A」。 */}
          {/* 实视线段：眼睛 → B（被凸起挡住的真实命中段，success 绿） */}
          <line
            x1="120"
            y1="70"
            x2="255"
            y2="196"
            stroke="var(--success)"
            strokeWidth="2.4"
          />
          {/* 视线若无凸起会继续走到 A（红虚线，本该采样 A） */}
          <line
            x1="255"
            y1="196"
            x2="320"
            y2="180"
            stroke="var(--danger)"
            strokeWidth="2"
            strokeDasharray="5 4"
            markerEnd="url(#pp-arrow-danger)"
          />

          {/* A 点：视线与几何平面交点（不修正时的原采样点，danger 红） */}
          <circle
            cx="320"
            cy="180"
            r="5"
            fill="var(--danger)"
            stroke="var(--bg)"
            strokeWidth="1.5"
          />
          <text
            x="328"
            y="172"
            fontSize="12"
            fontWeight="600"
            fill="var(--danger)"
          >
            A
          </text>
          <text x="328" y="158" fontSize="9.5" fill="var(--danger)">
            原采样点（没修正）
          </text>

          {/* B 点：真实表面凸起处、先挡住视线（视差修正后的采样点，success 绿） */}
          <circle
            cx="255"
            cy="196"
            r="5"
            fill="var(--success)"
            stroke="var(--bg)"
            strokeWidth="1.5"
          />
          <text
            x="216"
            y="190"
            fontSize="12"
            fontWeight="600"
            fill="var(--success)"
          >
            B
          </text>
          <text x="150" y="176" fontSize="9.5" fill="var(--success)">
            真正该看到的点（凸起先挡住视线）
          </text>

          {/* 偏移量 offset：A → B 沿表面的位移（accent，双向标注在平面上方一点） */}
          <line
            x1="320"
            y1="148"
            x2="255"
            y2="148"
            stroke="var(--accent)"
            strokeWidth="1.8"
            markerEnd="url(#pp-arrow-accent)"
          />
          <text
            x="287"
            y="140"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            偏移量 offset
          </text>
          {/* 两条细引线把 offset 区间对到 A、B 的横向位置 */}
          <line
            x1="320"
            y1="148"
            x2="320"
            y2="178"
            stroke="var(--accent)"
            strokeWidth="0.8"
            opacity="0.6"
          />
          <line
            x1="255"
            y1="148"
            x2="255"
            y2="194"
            stroke="var(--accent)"
            strokeWidth="0.8"
            opacity="0.6"
          />

          {/* 视线倾斜角标注（在眼睛附近，提示「斜看才明显」） */}
          <text
            x="320"
            y="338"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            视线越斜，A 与 B 相差越大、视差越明显；正对着看时 A≈B，视差几乎无效
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        侧视图：视线斜射到平面，本该采样 <strong>A</strong>
        （红，几何交点）；可表面真实轮廓在 <strong>B</strong>
        （绿）处先凸起挡住了视线，眼睛真正该看到的是 B 的纹理。
        <strong>视差偏移</strong>就是沿视方向把采样坐标从 A 挪到 B（位移量{" "}
        <code>offset</code>
        ），让平面斜看时显出真实的凹凸深度与遮挡——这正是法线贴图做不到的「连看到哪一点都骗」。
      </figcaption>
    </figure>
  );
}
