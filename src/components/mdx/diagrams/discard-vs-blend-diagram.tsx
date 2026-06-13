/**
 * <DiscardVsBlendDiagram>：「混合」§3「discard 还是 blend」的对照图（HEL-69，C 实战型）。
 *
 * 把两种处理透明的手段并排画清楚，回答「什么时候用哪个」：
 *  ①左 discard：纹理的 alpha 非 0 即 1（要么全透要么不透），片段着色器里 alpha 太小就 discard，
 *    画面是「硬边镂空」——保留的部分完全不透、丢弃的部分完全不画。用一片草叶轮廓示意：
 *    叶子实心、叶子外的方格背景直接透出（镂空），边缘是清晰的硬边。
 *  ②右 blend：半透明渐变叠加——一块 alpha 从高到低渐变的色块叠在背景上，背景按 1-alpha
 *    逐渐透出，边缘是柔和的渐变，没有硬边。用一块玻璃/渐隐色块示意。
 *  底部各一句话点出适用场景：discard 适合草/铁丝网这类二元透明的镂空；blend 适合玻璃/水
 *    这类真半透明的渐变叠加。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--warning/--success/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function DiscardVsBlendDiagram() {
  // 左栏背景棋盘格（示意「被镂空透出的背景」）：4×3 小格。
  const checker: { x: number; y: number }[] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if ((row + col) % 2 === 0) {
        checker.push({ x: 70 + col * 40, y: 70 + row * 40 });
      }
    }
  }

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 320"
          role="img"
          aria-label="discard 和 blend 两种处理透明的对照，分左右两栏。左栏 discard 丢弃：纹理的透明度非 0 即 1，要么完全透明要么完全不透明，片段着色器里透明度太小就直接丢弃这个片段。画面是硬边镂空，用一片实心的草叶轮廓表示，叶子以内完全不透、叶子以外的棋盘格背景直接透出来，边缘是清晰锐利的硬边。适合草、铁丝网这类二元透明的镂空贴图。右栏 blend 混合：半透明渐变叠加，用一块透明度从上到下由高到低渐变的色块叠在背景上，背景按 1 减透明度逐渐透出，边缘是柔和的渐变，没有硬边。适合玻璃、水这类真正半透明、需要渐变叠加的物体。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 右栏：半透明渐变（上不透、下渐隐） */}
            <linearGradient id="blend-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* ============ 左栏：discard（硬边镂空） ============ */}
          <text
            x="180"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--success)"
          >
            discard：硬边镂空
          </text>

          {/* 棋盘格背景（被镂空透出的部分） */}
          <rect
            x="70"
            y="70"
            width="160"
            height="120"
            rx="4"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          {checker.map((c, i) => (
            <rect
              key={i}
              x={c.x}
              y={c.y}
              width="40"
              height="40"
              fill="var(--border)"
              opacity="0.5"
            />
          ))}
          {/* 草叶轮廓（实心、硬边）：一束三片叶子 */}
          <path
            d="M150 188 C 132 150 130 110 138 78 C 146 110 150 150 150 188 Z"
            fill="var(--success)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <path
            d="M150 188 C 150 150 154 112 166 84 C 162 116 156 152 150 188 Z"
            fill="var(--success)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <path
            d="M150 188 C 168 156 184 124 200 102 C 188 134 168 162 150 188 Z"
            fill="var(--success)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x="180"
            y="228"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            alpha 非 0 即 1：太小就 discard
          </text>
          <text
            x="180"
            y="252"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            保留的全不透、丢弃的全不画
          </text>
          <text
            x="180"
            y="276"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            适合：草 / 铁丝网（镂空）
          </text>

          {/* 分隔竖线 */}
          <line
            x1="360"
            y1="44"
            x2="360"
            y2="300"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ============ 右栏：blend（柔和渐变） ============ */}
          <text
            x="540"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--accent)"
          >
            blend：柔和渐变
          </text>

          {/* 背景色块（暖黄，被半透明叠加后透出） */}
          <rect
            x="460"
            y="70"
            width="160"
            height="120"
            rx="4"
            fill="var(--warning)"
            opacity="0.55"
            stroke="var(--border)"
            strokeWidth="1"
          />
          {/* 半透明渐变前景叠加（上不透 → 下渐隐，背景渐渐透出） */}
          <rect
            x="460"
            y="70"
            width="160"
            height="120"
            rx="4"
            fill="url(#blend-grad)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x="540"
            y="228"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            alpha 连续：按 1−alpha 叠加
          </text>
          <text
            x="540"
            y="252"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            边缘柔和渐变、透出背景
          </text>
          <text
            x="540"
            y="276"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            适合：玻璃 / 水（半透明）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong>discard</strong>（左）：纹理 alpha 非 0 即 1，太小就丢弃，得到
        <strong>硬边镂空</strong>，适合草、铁丝网；
        <strong>blend</strong>（右）：alpha 连续，按 <code>1−αsrc</code>
        叠加，得到<strong>柔和渐变</strong>，适合玻璃、水这类真半透明物。
      </figcaption>
    </figure>
  );
}
