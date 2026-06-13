/**
 * <InterpolationDiagram>：「着色器」§3「顶点 → 片段插值」小节配图（HEL-33）。
 *
 * 把「插值」这件最抽象的事画成可见的图：左边是只有 3 个角、各被赋一种纯色的三角形
 * （红/绿/蓝顶点），右边是同一个三角形被「填满」后——每个内部片段的颜色，是三个角的
 * 颜色按它到三个角的远近混出来的，于是得到一片连续渐变。中间一个箭头标「光栅化 + 插值」。
 *
 * 为不依赖图片、纯矢量表达「连续渐变」，右侧三角形用一个 SVG 线性渐变近似（红→绿→蓝
 * 的色相过渡），仅作示意——真实是重心坐标三角插值，但对小白「角上的值往中间渐变混合」
 * 的直觉已足够。三个角各画一个对应色小圆点 + 标签，强调「角的值是输入、中间是算出来的」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 三角形顶点色为「数据色」（红/绿/蓝示意三个顶点的不同取值），属图示语义色而非品牌色，
 * 不计入 DESIGN token 约束（硬规则 5 针对 UI 色板）；框线/文字仍一律用 token 色。
 * 视觉语言与其它 diagram 一致：var(--accent)/--border/--bg/--bg-elevated/--text-* 。
 */

export function InterpolationDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 640 280"
          role="img"
          aria-label="左边的三角形只有三个角被赋色：上角红、左下角绿、右下角蓝；经过光栅化和插值后，右边的三角形被填满，内部每个片段的颜色是三个角颜色按远近混合出来的连续渐变"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <defs>
            {/* 右侧填满三角形的近似插值渐变（红→绿→蓝示意，仅作直觉示意） */}
            <linearGradient id="interp-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff5a5a" />
              <stop offset="50%" stopColor="#5ad17a" />
              <stop offset="100%" stopColor="#5a8cff" />
            </linearGradient>
          </defs>

          {/* —— 左：只有三个角有颜色（输入） —— */}
          <text
            x="150"
            y="32"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            顶点着色器：只有 3 个角
          </text>
          {/* 三角形仅描边、内部留空，强调「中间还没有值」 */}
          <polygon
            points="150,56 76,196 224,196"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* 三个角的纯色点 + 标签 */}
          <circle cx="150" cy="56" r="9" fill="#ff5a5a" />
          <text
            x="150"
            y="50"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            红
          </text>
          <circle cx="76" cy="196" r="9" fill="#5ad17a" />
          <text x="50" y="200" fontSize="10" fill="var(--text-secondary)">
            绿
          </text>
          <circle cx="224" cy="196" r="9" fill="#5a8cff" />
          <text x="236" y="200" fontSize="10" fill="var(--text-secondary)">
            蓝
          </text>
          <text
            x="150"
            y="226"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            每个角给一个 out 值（这里是颜色）
          </text>

          {/* —— 中：光栅化 + 插值 —— */}
          <line
            x1="270"
            y1="126"
            x2="356"
            y2="126"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <path d="M356 126 l-12 -6 l0 12 z" fill="var(--accent)" />
          <text
            x="313"
            y="114"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            光栅化
          </text>
          <text
            x="313"
            y="146"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            + 插值
          </text>

          {/* —— 右：填满后的连续渐变（输出） —— */}
          <text
            x="490"
            y="32"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            片段着色器：铺满整个三角形
          </text>
          <polygon
            points="490,56 416,196 564,196"
            fill="url(#interp-fill)"
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <text
            x="490"
            y="226"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            每个片段的颜色 = 三个角按远近混出来的
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        顶点着色器只给三个角各定一个 out 值（这里用红 / 绿 /
        蓝示意）；光栅化时，三角形内部每个片段的 in
        值，是三个角的值按它到各角的远近自动混合（插值）出来的——于是得到一片连续渐变。
      </figcaption>
    </figure>
  );
}
