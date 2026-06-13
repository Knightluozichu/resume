/**
 * <FrameStageDiagram stage={1|2|3|4}>：「你好窗口」§3「渲染循环」Stepper 四步配图（HEL-39 的 SVG）。
 *
 * HEL-41 修复：原先这 4 张 SVG 直接内联写在 hello-window.mdx 的 <Step> 里，
 * 紧接一段松散中文文字（中间无空行）。MDX 块/行内歧义——SVG 与紧邻文字被混合处理，
 * 服务端 HTML 与客户端首渲染对那段松散文字对应的 <p> 包裹/位置产生分歧 → React
 * hydration mismatch。把内联 SVG 抽成独立组件后，每个 <Step> 的 children =
 * 一个组件 JSX + 一段文字，MDX 干净处理、无歧义、服务端=客户端。
 * （佐证：同章 <SetupPipelineDiagram /> 独立组件 + 文字从不触发此歧义。）
 *
 * SVG 内容 / 坐标 / token 色 / viewBox(0 0 120 80) / className 完全照搬原 4 张内联 SVG，
 * 不改任何视觉——仅从 mdx 内联挪进组件。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与 setup-pipeline-diagram.tsx / stepper.tsx 一致：token 色（var(--accent) /
 * --border / --bg / --bg-elevated / --text-primary / --text-secondary），无阴影（硬规则 5）。
 */

type FrameStage = 1 | 2 | 3 | 4;

export function FrameStageDiagram({ stage }: { stage: FrameStage }) {
  switch (stage) {
    case 1:
      // 显示器矩形 + 刷新弧形箭头(⟳) + 「60×/s」：该画下一帧的信号
      return (
        <svg
          viewBox="0 0 120 80"
          role="img"
          aria-label="一台显示器，旁边一个循环刷新箭头，标注每秒 60 次"
          className="mx-auto my-2 block w-full max-w-[160px]"
        >
          <rect
            x="20"
            y="16"
            width="60"
            height="40"
            rx="3"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <rect x="44" y="56" width="12" height="8" fill="var(--border)" />
          <rect
            x="36"
            y="64"
            width="28"
            height="3"
            rx="1.5"
            fill="var(--border)"
          />
          <path
            d="M96 24 a14 14 0 1 1 -10 -4"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path d="M86 12 l0 10 l10 -2 z" fill="var(--accent)" />
          <text
            x="50"
            y="40"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            60×/s
          </text>
        </svg>
      );
    case 2:
      // 画布左半旧杂色 → 右半被纯色刷过（刷子）：整面被刷成一色
      return (
        <svg
          viewBox="0 0 120 80"
          role="img"
          aria-label="一块画布，左半残留杂乱旧帧，右半正被一把刷子刷成纯色"
          className="mx-auto my-2 block w-full max-w-[160px]"
        >
          <rect
            x="14"
            y="14"
            width="92"
            height="52"
            rx="3"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <rect
            x="16"
            y="16"
            width="20"
            height="14"
            fill="var(--text-secondary)"
            opacity="0.35"
          />
          <rect
            x="40"
            y="40"
            width="14"
            height="12"
            fill="var(--text-secondary)"
            opacity="0.35"
          />
          <rect
            x="20"
            y="44"
            width="16"
            height="8"
            fill="var(--text-secondary)"
            opacity="0.35"
          />
          <rect
            x="60"
            y="16"
            width="44"
            height="48"
            fill="var(--accent)"
            opacity="0.85"
          />
          <rect
            x="56"
            y="10"
            width="6"
            height="60"
            fill="var(--text-primary)"
            opacity="0.6"
          />
          <rect
            x="46"
            y="34"
            width="12"
            height="12"
            rx="1"
            fill="var(--text-primary)"
            opacity="0.6"
          />
        </svg>
      );
    case 3:
      // ②那块纯色底上画一个三角形（呼应下一章）：在干净底上画这一帧
      return (
        <svg
          viewBox="0 0 120 80"
          role="img"
          aria-label="在刚刷好的纯色画布底上，画出一个三角形"
          className="mx-auto my-2 block w-full max-w-[160px]"
        >
          <rect
            x="14"
            y="14"
            width="92"
            height="52"
            rx="3"
            fill="var(--accent)"
            opacity="0.85"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <polygon
            points="60,24 42,56 78,56"
            fill="var(--bg-elevated)"
            stroke="var(--text-primary)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 4:
      // 大循环箭头：从 ④ 弯回 ①
      return (
        <svg
          viewBox="0 0 120 80"
          role="img"
          aria-label="一个大循环箭头从第四步弯回第一步，表示循环"
          className="mx-auto my-2 block w-full max-w-[160px]"
        >
          <path
            d="M30 30 a30 30 0 1 1 -4 28"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M22 22 l12 2 l-4 12 z" fill="var(--accent)" />
          <text
            x="60"
            y="46"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            loop
          </text>
        </svg>
      );
  }
}
