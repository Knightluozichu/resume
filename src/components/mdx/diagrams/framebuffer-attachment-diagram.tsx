/**
 * <FramebufferAttachmentDiagram>：「帧缓冲」§3 帧缓冲对象 + 附件的组成图（HEL-71，C 实战型）。
 *
 * 把一个帧缓冲对象 FBO 画成一块「画板框」，框上插着两张「附件」插槽：
 *  - 颜色纹理附件（COLOR_ATTACHMENT0）：渲染出的画面写进这里，之后可当普通纹理被采样
 *  - 深度 renderbuffer 附件（DEPTH_ATTACHMENT）：存每像素深度，供离屏渲染做深度测试
 * 旁边标注「FBO 本身不存像素，只是把若干附件挂在一起的框；像素都存在附件里」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--warning/--success/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function FramebufferAttachmentDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 640 300"
          role="img"
          aria-label="帧缓冲对象的组成图。中间是一个帧缓冲对象 FBO，画成一块画板框。框上挂着两张附件：上方是颜色纹理附件，挂在颜色附件点 COLOR_ATTACHMENT0 上，渲染出的画面颜色写进这里，之后可以当成普通纹理被采样；下方是深度渲染缓冲附件，挂在深度附件点 DEPTH_ATTACHMENT 上，存每个像素的深度值，供离屏渲染时做深度测试。说明帧缓冲本身不存像素，它只是一个把若干附件挂在一起的框，真正的像素数据都存在各个附件里。"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text
            x="320"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            帧缓冲 = 一块「框」 + 挂在上面的若干「附件」
          </text>

          {/* ===== FBO 框（中间） ===== */}
          <rect
            x="248"
            y="100"
            width="144"
            height="108"
            rx="10"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="320"
            y="148"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--accent)"
          >
            帧缓冲 FBO
          </text>
          <text
            x="320"
            y="168"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            只是「框」
          </text>
          <text
            x="320"
            y="182"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            自己不存像素
          </text>

          {/* ===== 颜色纹理附件（左上） ===== */}
          <rect
            x="40"
            y="68"
            width="168"
            height="68"
            rx="8"
            fill="var(--accent)"
            opacity="0.16"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="124"
            y="92"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            颜色纹理附件
          </text>
          <text
            x="124"
            y="110"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            画面颜色写这里
          </text>
          <text
            x="124"
            y="124"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            渲完可当纹理采样
          </text>
          {/* 连线到 FBO 的 COLOR_ATTACHMENT0 */}
          <line
            x1="208"
            y1="118"
            x2="248"
            y2="128"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="228"
            y="113"
            textAnchor="middle"
            fontSize="8"
            className="font-mono"
            fill="var(--accent)"
          >
            COLOR0
          </text>

          {/* ===== 深度 renderbuffer 附件（左下） ===== */}
          <rect
            x="40"
            y="174"
            width="168"
            height="68"
            rx="8"
            fill="var(--warning)"
            opacity="0.16"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <text
            x="124"
            y="198"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            深度渲染缓冲附件
          </text>
          <text
            x="124"
            y="216"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            存每像素深度
          </text>
          <text
            x="124"
            y="230"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            供深度测试用
          </text>
          {/* 连线到 FBO 的 DEPTH_ATTACHMENT */}
          <line
            x1="208"
            y1="192"
            x2="248"
            y2="182"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <text
            x="228"
            y="200"
            textAnchor="middle"
            fontSize="8"
            className="font-mono"
            fill="var(--warning)"
          >
            DEPTH
          </text>

          {/* ===== 右侧：完整性检查 ===== */}
          <line
            x1="392"
            y1="154"
            x2="436"
            y2="154"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            markerEnd="url(#fb-attach-arrow)"
          />
          <defs>
            <marker
              id="fb-attach-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
          <rect
            x="440"
            y="120"
            width="168"
            height="68"
            rx="8"
            fill="var(--success)"
            opacity="0.14"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="524"
            y="146"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            完整性检查
          </text>
          <text
            x="524"
            y="164"
            textAnchor="middle"
            fontSize="9"
            className="font-mono"
            fill="var(--text-primary)"
          >
            checkFramebufferStatus
          </text>
          <text
            x="524"
            y="180"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            == COMPLETE 才能用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong>帧缓冲 FBO</strong>{" "}
        只是个「框」、自己不存像素；真正存数据的是挂在框上的
        <strong>附件</strong>：<strong>颜色纹理附件</strong>
        （画面写这里、渲完可当纹理采样） + <strong>深度渲染缓冲附件</strong>
        （存深度供测试）。挂好后用 <code>checkFramebufferStatus</code> 确认
        <strong>完整</strong>才能渲染。
      </figcaption>
    </figure>
  );
}
