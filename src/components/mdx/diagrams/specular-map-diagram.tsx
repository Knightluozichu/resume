/**
 * <SpecularMapDiagram>：「光照贴图」§3「镜面光贴图」小节核心掰碎图（HEL-53，C 实战型）。
 *
 * 把「镜面光贴图是一张灰度遮罩」这件事画清楚，三栏从左到右是一条因果链：
 *  ①左栏「镜面光贴图（灰度遮罩）」：一张灰度图——木头部位画成黑（0.0）、钢边部位画成白（1.0）、
 *    裂缝画成深灰（弱）。标注「白=反光强、黑=不反光」。
 *  ②中栏「采样值当作镜面强度乘数」：箭头标 texture(material.specular, uv).rgb 取出的灰度值，
 *    白→1.0、黑→0.0，直接乘到镜面项上。
 *  ③右栏「最终高光」：同一个木箱上——只有钢边亮起锐利高光，木头部位没有高光（哑）。
 *
 * 一句话语义：灰度图每个像素的明暗，就是该处「反光强度」的开关旋钮——白处亮、黑处哑。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--warning 作高光/--border/--bg/
 * --bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角（硬规则 5）。
 * 灰度三档用 var(--bg)（黑/哑）、半透明白、纯白矩形示意，避免裸 hex。
 */

export function SpecularMapDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 680 340"
          role="img"
          aria-label="镜面光贴图是一张灰度遮罩，分三栏构成一条因果链。左栏是镜面光贴图本身：一张灰度图，木头部位是黑色代表零反光，钢边部位是白色代表强反光，裂缝是深灰代表弱反光。中栏：每个片段用纹理坐标采样这张灰度图，取出的明暗值直接当作镜面高光的强度乘数，白色乘以一接近全亮，黑色乘以零没有高光。右栏是最终效果：同一个木箱上只有钢边亮起锐利高光，木头部位没有高光显得哑。结论：灰度图每个像素的明暗就是该处反光强度的旋钮，白处反光强、黑处不反光。"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          {/* ============ 左栏：灰度遮罩 ============ */}
          <text
            x="120"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            镜面光贴图（灰度遮罩）
          </text>

          {/* 外框 = 整张灰度图（黑底示意木头部位=0.0 不反光） */}
          <rect
            x="40"
            y="52"
            width="160"
            height="160"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          {/* 钢边：一圈白（1.0 强反光） */}
          <rect
            x="40"
            y="52"
            width="160"
            height="160"
            fill="none"
            stroke="var(--text-primary)"
            strokeWidth="12"
          />
          {/* 一条裂缝：深灰（弱反光），用半透明白示意中间档 */}
          <rect
            x="116"
            y="64"
            width="6"
            height="136"
            fill="var(--text-primary)"
            opacity="0.35"
          />
          {/* 三档标注 */}
          <text
            x="120"
            y="100"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-primary)"
          >
            白＝钢边
          </text>
          <text
            x="120"
            y="138"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            黑＝木头
          </text>
          <text
            x="120"
            y="232"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            白=反光强 / 黑=不反光
          </text>

          {/* ============ 中栏：灰度值当镜面强度乘数 ============ */}
          <line
            x1="212"
            y1="132"
            x2="280"
            y2="132"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <path d="M280 132 l-12 -6 l0 12 z" fill="var(--accent)" />

          <text
            x="340"
            y="60"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            采样值＝反光强度
          </text>
          <text
            x="340"
            y="100"
            textAnchor="middle"
            fontSize="10"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            texture(specular, uv)
          </text>
          {/* 白→1.0 */}
          <rect
            x="296"
            y="120"
            width="22"
            height="22"
            fill="var(--text-primary)"
          />
          <text x="328" y="136" fontSize="11" fill="var(--text-primary)">
            白 → ×1.0（全亮）
          </text>
          {/* 黑→0.0 */}
          <rect
            x="296"
            y="160"
            width="22"
            height="22"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text x="328" y="176" fontSize="11" fill="var(--text-secondary)">
            黑 → ×0.0（无高光）
          </text>
          <text
            x="340"
            y="218"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            灰度值直接乘到镜面项
          </text>

          <line
            x1="452"
            y1="132"
            x2="520"
            y2="132"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <path d="M520 132 l-12 -6 l0 12 z" fill="var(--accent)" />

          {/* ============ 右栏：最终高光（只有钢边亮） ============ */}
          <text
            x="592"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            最终：只有钢边发亮
          </text>

          {/* 木箱本体（木纹底，accent 浅填示意有底色） */}
          <rect
            x="512"
            y="52"
            width="160"
            height="160"
            fill="var(--accent)"
            opacity="0.18"
            stroke="var(--border)"
            strokeWidth="2"
          />
          {/* 钢边：一圈高光（warning 黄作高光色） */}
          <rect
            x="512"
            y="52"
            width="160"
            height="160"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="12"
          />
          {/* 钢边上一小块更亮的镜面点 */}
          <circle cx="592" cy="58" r="6" fill="var(--warning)" />
          <text
            x="592"
            y="138"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            木头：哑、无高光
          </text>
          <text
            x="592"
            y="44"
            textAnchor="middle"
            fontSize="10"
            fill="var(--warning)"
          >
            钢边：锐利高光
          </text>
          <text
            x="592"
            y="232"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            同一束光，反光各处不同
          </text>

          {/* —— 底部一句话总括 —— */}
          <text
            x="340"
            y="300"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            镜面光贴图＝一张「哪里反光、反多强」的灰度遮罩：白处亮、黑处哑
          </text>
          <text
            x="340"
            y="324"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            每个片段采样这张灰度图，取出的明暗值直接当作该处镜面高光的强度。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        镜面光贴图是一张灰度遮罩：每个像素的明暗代表该处反光强度——
        白色（1.0）反光强、黑色（0.0）不反光。片段采样它取出的灰度值，直接乘到镜面高光上（
        <code>texture(material.specular, TexCoords).rgb</code>
        ），于是木箱只有钢边发亮、木头部位哑光。
      </figcaption>
    </figure>
  );
}
