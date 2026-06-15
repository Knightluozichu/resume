/**
 * <ShaderIODiagram>：「着色器」§3 的「数据怎么在着色器之间 / 从 CPU 流进来」示意图（HEL-33）。
 *
 * 准确表达本章三条数据通路，是本章「in/out + uniform」概念的主图：
 *   ① 顶点属性（attribute）从 VBO 进顶点着色器的 in
 *   ② 顶点着色器的 out ──（光栅化沿途插值）──→ 片段着色器同名 in
 *   ③ uniform 从 CPU（你的程序）旁路注入，两段着色器都能读、对所有顶点/片段同值
 * 输出端是片段着色器的内建变量 FragColor（最终颜色）。
 *
 * 设计意图：让读者一眼看清三件事——in/out 必须「上段 out 名字类型 = 下段 in」才接得上；
 * out→in 之间会被光栅化插值（标紫强调，呼应 §3 插值小节与 §5 主 Demo）；uniform 是
 * 从 CPU 横插进来的全局常量，与逐顶点/逐片段流动的 in/out 不同源。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与 vertex-pipeline-diagram.tsx / setup-pipeline-diagram.tsx 一致：token 色
 * （var(--accent) / --border / --bg / --bg-elevated / --text-primary / --text-secondary），
 * 简洁线框、rx 圆角、无阴影（硬规则 5）。响应式：max-width 居中、宽度自适应正文栏。
 */

export function ShaderIODiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="数据有两条通路：顶点属性从 VBO 进顶点着色器的 in，顶点着色器的 out 经过光栅化插值后变成片段着色器同名 in，片段着色器再输出内建变量 FragColor 当最终颜色；另一条通路是 uniform，从 CPU 上的你的程序旁路注入，两段着色器都能读到、且对所有顶点和片段都是同一个值"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* —— CPU 旁路（uniform 源头）：顶部一条横幅 —— */}
          <rect
            x="20"
            y="20"
            width="600"
            height="46"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="40"
            y="42"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            CPU（你的程序）
          </text>
          <text x="40" y="59" fontSize="11" fill="var(--text-secondary)">
            每帧用 gl.uniform* 上传：uTime、颜色、矩阵……（全局常量）
          </text>

          {/* uniform 从 CPU 旁路向下注入两段着色器（两条竖向虚线箭头） */}
          <line
            x1="190"
            y1="66"
            x2="190"
            y2="120"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <path d="M190 120 l-5 -10 l10 0 z" fill="var(--accent)" />
          <line
            x1="450"
            y1="66"
            x2="450"
            y2="208"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <path d="M450 208 l-5 -10 l10 0 z" fill="var(--accent)" />
          <text x="200" y="92" fontSize="11" fill="var(--accent)">
            uniform
          </text>
          <text x="460" y="168" fontSize="11" fill="var(--accent)">
            uniform
          </text>

          {/* ① 顶点属性 in（来自 VBO） */}
          <rect
            x="20"
            y="124"
            width="120"
            height="60"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="80"
            y="148"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            顶点属性
          </text>
          <text
            x="80"
            y="166"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            来自 VBO
          </text>

          {/* 顶点属性 → 顶点着色器 in */}
          <line
            x1="140"
            y1="154"
            x2="166"
            y2="154"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M166 154 l-10 -5 l0 10 z" fill="var(--accent)" />
          <text
            x="153"
            y="144"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            in
          </text>

          {/* 顶点着色器 */}
          <rect
            x="168"
            y="120"
            width="132"
            height="68"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="234"
            y="146"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            顶点着色器
          </text>
          <text
            x="234"
            y="166"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            每个顶点跑一次
          </text>
          <text
            x="234"
            y="182"
            textAnchor="middle"
            fontSize="10"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            out vec3 vColor;
          </text>

          {/* 顶点着色器 out → 光栅化插值 → 片段着色器 in（核心箭头，标紫强调插值） */}
          <line
            x1="300"
            y1="154"
            x2="370"
            y2="154"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <path d="M370 154 l-10 -5 l0 10 z" fill="var(--accent)" />
          <text
            x="335"
            y="143"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            out → in
          </text>
          <text
            x="335"
            y="174"
            textAnchor="middle"
            fontSize="10"
            fill="var(--accent)"
          >
            沿途插值
          </text>

          {/* 片段着色器 */}
          <rect
            x="372"
            y="120"
            width="132"
            height="68"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="438"
            y="146"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            片段着色器
          </text>
          <text
            x="438"
            y="166"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            每个片段跑一次
          </text>
          <text
            x="438"
            y="182"
            textAnchor="middle"
            fontSize="10"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            in vec3 vColor;
          </text>

          {/* 片段着色器 → FragColor 输出 */}
          <line
            x1="504"
            y1="154"
            x2="540"
            y2="154"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M540 154 l-10 -5 l0 10 z" fill="var(--accent)" />
          <rect
            x="542"
            y="124"
            width="78"
            height="60"
            rx="8"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="581"
            y="148"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            FragColor
          </text>
          <text
            x="581"
            y="166"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            最终颜色
          </text>

          {/* —— 底部图例：两类数据的区别 —— */}
          <line
            x1="20"
            y1="232"
            x2="48"
            y2="232"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <text x="56" y="236" fontSize="11" fill="var(--text-secondary)">
            in/out：上一段的 out 名字与类型，必须等于下一段的 in，才接得上
          </text>
          <line
            x1="20"
            y1="262"
            x2="48"
            y2="262"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <text x="56" y="266" fontSize="11" fill="var(--text-secondary)">
            uniform：从 CPU 旁路注入的全局常量，两段都能读、对所有顶点/片段同值
          </text>
          <text
            x="20"
            y="296"
            fontSize="11"
            fill="var(--accent)"
            fontWeight="600"
          >
            注意：out → in 之间会被光栅化「插值」
          </text>
          <text x="20" y="314" fontSize="11" fill="var(--text-secondary)">
            顶点只有 3
            个角，片段却铺满整个三角形——中间的颜色是三个角按距离混出来的。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        两条数据通路：顶点属性进顶点着色器的 in；顶点着色器的 out
        经光栅化插值后成为片段着色器同名 in，片段着色器输出内建变量
        FragColor。uniform 则从 CPU
        旁路注入，两段都能读、对所有顶点/片段是同一个值。
      </figcaption>
    </figure>
  );
}
