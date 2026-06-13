/**
 * <StencilTestFlowDiagram>：「模板测试」§3 一个片段的流转顺序图（HEL-68，A 概念型）。
 *
 * 把「模板测试在管线里排在哪、glStencilOp 三个参数各管哪种情形」一张图讲清：
 *  片段着色器算完 → 模板测试 →（过）深度测试 →（过）写进颜色缓冲。
 *  两个测试都各有「失败」分支（被丢弃，红）。并在三处标出 glStencilOp(sfail, dpfail, dppass)
 *  分别在「模板测试失败」「模板过但深度失败」「两者都过」时更新模板缓冲值：
 *   - sfail：模板测试失败时怎么更新模板值（红分支）
 *   - dpfail：模板过、但深度失败时怎么更新（黄分支）
 *   - dppass：两者都过时怎么更新（绿分支）
 *  重点强调：模板测试排在深度测试「之前」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--danger/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function StencilTestFlowDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 360"
          role="img"
          aria-label="一个片段在管线里的流转顺序图。最上方是片段着色器，算完颜色后片段先进入模板测试。模板测试如果失败，片段被丢弃，此时 glStencilOp 的第一个参数 sfail 决定怎么更新这个像素的模板值。模板测试通过的片段，接着进入深度测试，注意模板测试排在深度测试之前。深度测试如果失败，片段被丢弃，此时 glStencilOp 的第二个参数 dpfail 决定怎么更新模板值。两个测试都通过时，片段的颜色才写进颜色缓冲，此时 glStencilOp 的第三个参数 dppass 决定怎么更新模板值。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="stencil-flow-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* ============ 主干竖向流程（居中靠左一点，右侧留给 op 标注） ============ */}
          {/* 片段着色器 */}
          <rect
            x="150"
            y="24"
            width="200"
            height="42"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="250"
            y="50"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            片段着色器（算完颜色）
          </text>
          <line
            x1="250"
            y1="66"
            x2="250"
            y2="92"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            markerEnd="url(#stencil-flow-arrow)"
          />

          {/* 模板测试（accent 强调：本章主角） */}
          <rect
            x="150"
            y="94"
            width="200"
            height="48"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="250"
            y="116"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            模板测试
          </text>
          <text
            x="250"
            y="133"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            ref 与缓冲值按 func 比较
          </text>

          {/* 模板测试失败分支（向右下，红） */}
          <line
            x1="350"
            y1="118"
            x2="436"
            y2="118"
            stroke="var(--danger)"
            strokeWidth="1.5"
            markerEnd="url(#stencil-flow-arrow)"
          />
          <text
            x="393"
            y="110"
            textAnchor="middle"
            fontSize="10"
            fill="var(--danger)"
          >
            失败
          </text>
          <rect
            x="438"
            y="100"
            width="120"
            height="36"
            rx="8"
            fill="var(--danger)"
            opacity="0.14"
            stroke="var(--danger)"
            strokeWidth="1.5"
          />
          <text
            x="498"
            y="122"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            丢弃片段
          </text>
          {/* sfail 标注 */}
          <text
            x="570"
            y="115"
            fontSize="10"
            className="font-mono"
            fill="var(--text-secondary)"
          >
            ← sfail
          </text>
          <text x="570" y="129" fontSize="9" fill="var(--text-secondary)">
            更新模板值
          </text>

          {/* 通过 → 深度测试 */}
          <text
            x="266"
            y="160"
            textAnchor="middle"
            fontSize="10"
            fill="var(--success)"
          >
            通过
          </text>
          <line
            x1="250"
            y1="142"
            x2="250"
            y2="172"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            markerEnd="url(#stencil-flow-arrow)"
          />

          {/* 深度测试 */}
          <rect
            x="150"
            y="174"
            width="200"
            height="48"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="250"
            y="196"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            深度测试
          </text>
          <text
            x="250"
            y="213"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            （在模板测试之后）
          </text>

          {/* 深度测试失败分支（向右，黄） */}
          <line
            x1="350"
            y1="198"
            x2="436"
            y2="198"
            stroke="var(--warning)"
            strokeWidth="1.5"
            markerEnd="url(#stencil-flow-arrow)"
          />
          <text
            x="393"
            y="190"
            textAnchor="middle"
            fontSize="10"
            fill="var(--warning)"
          >
            失败
          </text>
          <rect
            x="438"
            y="180"
            width="120"
            height="36"
            rx="8"
            fill="var(--warning)"
            opacity="0.14"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <text
            x="498"
            y="202"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            丢弃片段
          </text>
          {/* dpfail 标注 */}
          <text
            x="570"
            y="195"
            fontSize="10"
            className="font-mono"
            fill="var(--text-secondary)"
          >
            ← dpfail
          </text>
          <text x="570" y="209" fontSize="9" fill="var(--text-secondary)">
            更新模板值
          </text>

          {/* 通过 → 写颜色 */}
          <text
            x="266"
            y="240"
            textAnchor="middle"
            fontSize="10"
            fill="var(--success)"
          >
            通过
          </text>
          <line
            x1="250"
            y1="222"
            x2="250"
            y2="252"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            markerEnd="url(#stencil-flow-arrow)"
          />

          {/* 写进颜色缓冲（绿，成功落地） */}
          <rect
            x="150"
            y="254"
            width="200"
            height="44"
            rx="8"
            fill="var(--success)"
            opacity="0.14"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="250"
            y="280"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--success)"
          >
            写进颜色缓冲
          </text>
          {/* dppass 标注：从写颜色框引到右侧 */}
          <line
            x1="350"
            y1="276"
            x2="436"
            y2="276"
            stroke="var(--success)"
            strokeWidth="1.5"
            markerEnd="url(#stencil-flow-arrow)"
          />
          <rect
            x="438"
            y="258"
            width="120"
            height="36"
            rx="8"
            fill="var(--success)"
            opacity="0.1"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="498"
            y="280"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            都通过
          </text>
          {/* dppass 标注 */}
          <text
            x="570"
            y="273"
            fontSize="10"
            className="font-mono"
            fill="var(--text-secondary)"
          >
            ← dppass
          </text>
          <text x="570" y="287" fontSize="9" fill="var(--text-secondary)">
            更新模板值
          </text>

          {/* 底部一句话点题 */}
          <text
            x="360"
            y="334"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            <tspan fontWeight="600" fill="var(--accent)">
              模板测试在深度测试之前
            </tspan>
            ；glStencilOp(sfail, dpfail, dppass) 分别管这三种情形怎么更新模板值
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        一个片段的流转：片段着色器算完颜色 → <strong>模板测试</strong> →（过）
        <strong>深度测试</strong>{" "}
        →（都过）写进颜色缓冲。两道测试各有「失败即丢弃」的分支。
        <code>glStencilOp(sfail, dpfail, dppass)</code>{" "}
        三个参数正对应右侧三种情形——
        <strong>模板失败 / 深度失败 / 都通过</strong>
        时，各自怎么更新这个像素的模板值。 注意
        <strong>模板测试排在深度测试之前</strong>。
      </figcaption>
    </figure>
  );
}
