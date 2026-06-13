/**
 * <EulerAnglesDiagram>：「摄像机」§3 欧拉角概念的核心掰碎图（B 数学型）。
 *
 * 三张子图分别展示 Pitch（俯仰：上下看）、Yaw（偏航：左右看）、Roll（滚转：歪头）
 * 对摄像机朝向的影响。FPS 摄像机通常只用 Pitch + Yaw，Roll 固定为 0。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色，无阴影、rx 圆角（硬规则 5）。
 */

type PanelProps = {
  title: string;
  subtitle: string;
  /** 摄像机朝向箭头的旋转角度（度），绕面板中心 */
  arrowDeg: number;
  /** 是否画 Roll 的「歪头」弧线 */
  showRollArc?: boolean;
  x: number;
};

function CameraPanel({
  title,
  subtitle,
  arrowDeg,
  showRollArc,
  x,
}: PanelProps) {
  const cx = x + 90;
  const cy = 130;
  return (
    <g>
      <rect
        x={x}
        y="48"
        width="180"
        height="160"
        rx="8"
        fill="var(--bg)"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <text
        x={cx}
        y="68"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill="var(--accent)"
      >
        {title}
      </text>
      <text
        x={cx}
        y="84"
        textAnchor="middle"
        fontSize="10"
        fill="var(--text-secondary)"
      >
        {subtitle}
      </text>
      {/* 摄像机原点 */}
      <circle cx={cx} cy={cy} r="6" fill="var(--accent)" />
      {/* 朝向箭头（可旋转） */}
      <g transform={`rotate(${arrowDeg} ${cx} ${cy})`}>
        <line
          x1={cx}
          y1={cy}
          x2={cx + 52}
          y2={cy}
          stroke="var(--success)"
          strokeWidth="2.5"
          markerEnd="url(#euler-arrow)"
        />
      </g>
      {showRollArc && (
        <path
          d={`M ${cx - 28} ${cy - 20} A 28 28 0 0 1 ${cx + 28} ${cy - 20}`}
          fill="none"
          stroke="var(--warning)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
      )}
      {/* 世界 up 参考（竖直虚线，Roll 面板里会被「歪掉」示意） */}
      {!showRollArc && (
        <line
          x1={cx}
          y1={cy - 40}
          x2={cx}
          y2={cy - 12}
          stroke="var(--text-secondary)"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.6"
        />
      )}
    </g>
  );
}

export function EulerAnglesDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 580 240"
          role="img"
          aria-label="欧拉角三轴示意。Pitch 俯仰角控制上下看（箭头在竖直平面内抬起或低下）；Yaw 偏航角控制左右看（箭头在水平面内左转或右转）；Roll 滚转角控制摄像机歪头（本章 FPS 摄像机通常固定 Roll 为 0，不用它）。"
          className="mx-auto block h-auto w-full max-w-[580px]"
        >
          <defs>
            <marker
              id="euler-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--success)" />
            </marker>
          </defs>
          <text
            x="290"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            欧拉角：三个旋转分别管什么
          </text>

          <CameraPanel
            x={20}
            title="Pitch 俯仰"
            subtitle="抬头 / 低头"
            arrowDeg={-25}
          />
          <CameraPanel
            x={200}
            title="Yaw 偏航"
            subtitle="左转 / 右转"
            arrowDeg={35}
          />
          <CameraPanel
            x={380}
            title="Roll 滚转"
            subtitle="歪头（FPS 不用）"
            arrowDeg={0}
            showRollArc
          />

          <text
            x="290"
            y="228"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            本章 FPS 摄像机只用 Pitch + Yaw；Roll 固定为 0（world up
            始终竖直向上）。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Pitch 管上下看、Yaw 管左右看、Roll
        管歪头。第一人称射击游戏里你通常只动前两个——Roll
        留给飞行模拟或太空船摄像机。
      </figcaption>
    </figure>
  );
}
