/**
 * <AlphaSortDiagram>：「混合」§3 半透明排序问题的对照图（HEL-69，C 实战型）。
 *
 * 把「半透明物体不排序 vs 从远到近排序」的结果差别并排画清楚：
 *  ①左 乱序画（穿帮）：先画了近玻璃、后画远玻璃。近玻璃先写进颜色 + 深度缓冲；轮到远玻璃时，
 *    它落在近玻璃后面，深度测试发现「更远」直接把它整片丢弃——结果远玻璃透不出来，
 *    本该「透过近玻璃看到远玻璃」的地方一片空，穿帮。用三块前后错开的半透明矩形示意，
 *    最远那块被画叉/标「被丢弃」。
 *  ②右 从远到近画（正确）：先画最远、再画中间、最后画最近。每画一块新的，它都叠加在
 *    已画好的更远色之上（over 混合），层层透出——三块玻璃正确地透叠在一起。
 *  底部各一句话点出关键：左边「深度测试把后画的远片段丢了」、右边「从远到近 + 关深度写入」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--warning/--success/--danger/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function AlphaSortDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 340"
          role="img"
          aria-label="半透明排序问题的对照，分左右两栏。左栏乱序画导致穿帮：先画了离镜头近的玻璃，它先写进了颜色缓冲和深度缓冲；之后再画更远的玻璃时，深度测试发现它落在近玻璃后面、更远，于是把更远玻璃的整片直接丢弃，导致本该透过近玻璃看到的远玻璃透不出来，那块区域是空的，穿帮。最远的玻璃被标记为被丢弃。右栏从远到近画就正确：先画最远的玻璃，再画中间的，最后画最近的，每画一块新的都叠加在已经画好的更远色之上，三块半透明玻璃正确地层层透叠在一起，能看清前后关系。关键是从远到近的顺序，并且关掉半透明物的深度写入。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ============ 左栏：乱序画 → 穿帮 ============ */}
          <text
            x="180"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--danger)"
          >
            乱序画（先近后远）→ 穿帮
          </text>

          {/* 三块前后错开的半透明矩形：近(accent)先画、远(warning)后画被丢 */}
          {/* 远玻璃：本该在最后面透出，但被深度测试丢弃 → 画成虚线空框 + 叉 */}
          <rect
            x="76"
            y="64"
            width="120"
            height="100"
            rx="6"
            fill="none"
            stroke="var(--danger)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <line
            x1="76"
            y1="64"
            x2="196"
            y2="164"
            stroke="var(--danger)"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <line
            x1="196"
            y1="64"
            x2="76"
            y2="164"
            stroke="var(--danger)"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <text
            x="136"
            y="58"
            textAnchor="middle"
            fontSize="10"
            fill="var(--danger)"
          >
            远玻璃：被丢弃
          </text>
          {/* 中玻璃 */}
          <rect
            x="120"
            y="104"
            width="120"
            height="100"
            rx="6"
            fill="var(--warning)"
            opacity="0.4"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          {/* 近玻璃（先画，正常显示） */}
          <rect
            x="164"
            y="144"
            width="120"
            height="100"
            rx="6"
            fill="var(--accent)"
            opacity="0.5"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="248"
            y="262"
            textAnchor="middle"
            fontSize="10"
            fill="var(--accent)"
          >
            近玻璃：先画了
          </text>

          <text
            x="180"
            y="296"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            近玻璃先占了深度缓冲
          </text>
          <text
            x="180"
            y="318"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            后画的远玻璃「更远」被深度测试丢掉
          </text>

          {/* 分隔竖线 */}
          <line
            x1="360"
            y1="44"
            x2="360"
            y2="324"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ============ 右栏：从远到近画 → 正确 ============ */}
          <text
            x="540"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--success)"
          >
            从远到近画 → 正确透叠
          </text>

          {/* 远玻璃（最先画，最后面） */}
          <rect
            x="436"
            y="64"
            width="120"
            height="100"
            rx="6"
            fill="var(--success)"
            opacity="0.4"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="496"
            y="58"
            textAnchor="middle"
            fontSize="10"
            fill="var(--success)"
          >
            ① 远玻璃（先画）
          </text>
          {/* 中玻璃 */}
          <rect
            x="480"
            y="104"
            width="120"
            height="100"
            rx="6"
            fill="var(--warning)"
            opacity="0.4"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          {/* 近玻璃（最后画，最前面） */}
          <rect
            x="524"
            y="144"
            width="120"
            height="100"
            rx="6"
            fill="var(--accent)"
            opacity="0.5"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="608"
            y="262"
            textAnchor="middle"
            fontSize="10"
            fill="var(--accent)"
          >
            ③ 近玻璃（后画）
          </text>

          <text
            x="540"
            y="296"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            每块都叠在已画好的更远色之上
          </text>
          <text
            x="540"
            y="318"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            从远到近 + 关深度写入 → 层层透出
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        半透明物的<strong>排序</strong>：乱序画（左，先近后远）时，近玻璃先占了
        <strong>深度缓冲</strong>，后画的远玻璃被深度测试当成「更远」整片丢弃 →
        <strong>穿帮</strong>；正确做法（右）是先画不透明物、再把半透明物
        <strong>从远到近</strong>排序、<strong>关掉深度写入</strong>后逐块叠画 →
        层层正确透出。
      </figcaption>
    </figure>
  );
}
