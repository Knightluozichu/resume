/**
 * <DrawcallCompareDiagram>：「实例化」§2 / §3「N 次 draw call vs 1 次 draw call」对照图（HEL-76，C 实战型）。
 *
 * 把实例化省的是什么一眼说清：每次 draw call 都是一趟「CPU 喊话 → GPU 干活」的通信，开销在喊话本身。
 *  ① 左边「不实例化」：CPU 朝 GPU 喊 N 遍（N 根独立箭头，每根标 draw call #i），画 N 个相同物体要 N 次通信，
 *     CPU 累死、成为瓶颈。
 *  ② 右边「实例化」：CPU 只喊 1 遍「照这个模子盖 N 个」（1 根粗箭头 + instanceCount=N），GPU 一口气画完 N 个，
 *     通信只发生 1 次。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--danger/--border/--bg/
 * --bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function DrawcallCompareDiagram() {
  // 左侧 N 根喊话箭头的纵向位置（示意 N 次通信）。
  const calls = [0, 1, 2, 3, 4];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 320"
          role="img"
          aria-label="两种画法的 draw call 次数对照。左边是不实例化：要画 N 个相同物体，CPU 就得朝 GPU 喊 N 遍，画出五根独立的箭头，每根是一次 draw call，从 draw call 0 到 draw call N，每次都是一趟 CPU 到 GPU 的通信，N 大了 CPU 就累死、成为瓶颈，标成红色警示。右边是实例化：CPU 只喊一遍，照这个模子盖 N 个，instanceCount 等于 N，画出一根粗箭头，GPU 一口气把 N 个全画完，通信只发生一次，标成绿色。结论：实例化省的不是 GPU 画三角形的活，而是 CPU 反复喊话发起 draw call 的通信开销，从 N 次降到 1 次。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="dc-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--danger)" />
            </marker>
            <marker
              id="dc-arrow-ok"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="9"
              markerHeight="9"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* ============ 左半：不实例化（N 次 draw call） ============ */}
          <text
            x="180"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            不实例化：CPU 喊 N 遍
          </text>

          {/* CPU 框 */}
          <rect
            x="40"
            y="60"
            width="74"
            height="200"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="77"
            y="166"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            CPU
          </text>

          {/* GPU 框 */}
          <rect
            x="246"
            y="60"
            width="74"
            height="200"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="283"
            y="166"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            GPU
          </text>

          {/* N 根喊话箭头 */}
          {calls.map((c, i) => {
            const yy = 84 + i * 38;
            const isMore = i === 4;
            return (
              <g key={c}>
                <line
                  x1="116"
                  y1={yy}
                  x2="244"
                  y2={yy}
                  stroke="var(--danger)"
                  strokeWidth="1.8"
                  strokeDasharray={isMore ? "5 4" : undefined}
                  markerEnd="url(#dc-arrow)"
                />
                <text
                  x="180"
                  y={yy - 6}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fill="var(--danger)"
                >
                  {isMore ? "… draw call N" : `draw call ${c}`}
                </text>
              </g>
            );
          })}
          <text
            x="180"
            y="284"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            N 次通信 → CPU 瓶颈
          </text>

          {/* 中间分隔 */}
          <line
            x1="360"
            y1="50"
            x2="360"
            y2="290"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* ============ 右半：实例化（1 次 draw call） ============ */}
          <text
            x="540"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            实例化：CPU 喊 1 遍
          </text>

          {/* CPU 框 */}
          <rect
            x="400"
            y="60"
            width="74"
            height="200"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="437"
            y="166"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            CPU
          </text>

          {/* GPU 框 */}
          <rect
            x="606"
            y="60"
            width="74"
            height="200"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="643"
            y="166"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            GPU
          </text>

          {/* 1 根粗箭头 */}
          <line
            x1="476"
            y1="160"
            x2="604"
            y2="160"
            stroke="var(--success)"
            strokeWidth="4"
            markerEnd="url(#dc-arrow-ok)"
          />
          <text
            x="540"
            y="146"
            textAnchor="middle"
            fontSize="10"
            fontFamily="monospace"
            fill="var(--success)"
          >
            1 次：画 N 个
          </text>
          <text
            x="540"
            y="184"
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            instanceCount = N
          </text>
          <text
            x="540"
            y="284"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            1 次通信 → 流畅
          </text>

          {/* —— 底部一句话总括 —— */}
          <text
            x="360"
            y="312"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            实例化省的是「CPU 反复喊话发起 draw call」的开销：从 N 次降到 1 次
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        每次 <code>draw call</code> 都是一趟「CPU 喊话 → GPU 干活」的通信，
        <strong>开销在喊话本身</strong>。画 N 个相同物体：不实例化要喊{" "}
        <strong>N 遍</strong>（CPU 瓶颈）；实例化只喊 <strong>1 遍</strong>（
        <code>instanceCount = N</code>），GPU 一口气画完。
      </figcaption>
    </figure>
  );
}
