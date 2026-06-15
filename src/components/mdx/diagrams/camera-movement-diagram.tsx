/**
 * <CameraMovementDiagram>：「摄像机」§3 WASD 自由移动示意（B 数学型）。
 *
 * 展示 W/S 沿 front 方向前进后退、A/D 沿 right 方向左右横移（strafe）。
 * right = normalize(cross(front, worldUp))。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色，无阴影、rx 圆角（硬规则 5）。
 */

export function CameraMovementDiagram() {
  const cx = 200;
  const cy = 160;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 440 320"
          role="img"
          aria-label="WASD 移动示意。W 沿摄像机 front 方向前进，S 沿 front 反方向后退，A 沿 right 方向左横移，D 沿 right 方向右横移。right 向量由 front 与 world up 叉乘得到。"
          className="mx-auto block h-auto w-full max-w-[440px]"
        >
          <defs>
            <marker
              id="move-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
            <marker
              id="move-arrow-green"
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
            x="200"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            WASD：沿 front / right 移动摄像机
          </text>

          {/* 摄像机 */}
          <circle cx={cx} cy={cy} r="10" fill="var(--accent)" />
          <text
            x={cx}
            y={cy + 28}
            textAnchor="middle"
            fontSize="10"
            fill="var(--accent)"
          >
            摄像机
          </text>

          {/* front 方向（绿，朝右） */}
          <line
            x1={cx}
            y1={cy}
            x2={cx + 70}
            y2={cy}
            stroke="var(--success)"
            strokeWidth="2"
            markerEnd="url(#move-arrow-green)"
          />
          <text x={cx + 78} y={cy + 4} fontSize="10" fill="var(--success)">
            front
          </text>

          {/* right 方向（紫，朝上） */}
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - 60}
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#move-arrow)"
          />
          <text x={cx + 8} y={cy - 64} fontSize="10" fill="var(--accent)">
            right
          </text>

          {/* W - 沿 front 前进 */}
          <g>
            <rect
              x="300"
              y="118"
              width="36"
              height="28"
              rx="6"
              fill="var(--accent-glow)"
              stroke="var(--success)"
              strokeWidth="1.5"
            />
            <text
              x="318"
              y="137"
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="var(--success)"
            >
              W
            </text>
            <text
              x="318"
              y="158"
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-secondary)"
            >
              + front
            </text>
            <path
              d={`M 296 132 L ${cx + 72} ${cy - 4}`}
              fill="none"
              stroke="var(--success)"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.7"
            />
          </g>

          {/* S - 沿 -front 后退 */}
          <g>
            <rect
              x="300"
              y="188"
              width="36"
              height="28"
              rx="6"
              fill="var(--accent-glow)"
              stroke="var(--warning)"
              strokeWidth="1.5"
            />
            <text
              x="318"
              y="207"
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="var(--warning)"
            >
              S
            </text>
            <text
              x="318"
              y="228"
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-secondary)"
            >
              − front
            </text>
            <path
              d={`M 296 202 L ${cx + 72} ${cy + 4}`}
              fill="none"
              stroke="var(--warning)"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.7"
            />
          </g>

          {/* A - 沿 -right 左移 */}
          <g>
            <rect
              x="48"
              y="88"
              width="36"
              height="28"
              rx="6"
              fill="var(--accent-glow)"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text
              x="66"
              y="107"
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="var(--accent)"
            >
              A
            </text>
            <text
              x="66"
              y="128"
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-secondary)"
            >
              − right
            </text>
          </g>

          {/* D - 沿 +right 右移 */}
          <g>
            <rect
              x="48"
              y="148"
              width="36"
              height="28"
              rx="6"
              fill="var(--accent-glow)"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text
              x="66"
              y="167"
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="var(--accent)"
            >
              D
            </text>
            <text
              x="66"
              y="188"
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-secondary)"
            >
              + right
            </text>
          </g>

          <text
            x="220"
            y="298"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            right = normalize(cross(front, worldUp))；移动速度应乘 deltaTime
            保证各帧率一致。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        W/S 沿 front 前后走，A/D 沿 right 左右横移。right 由 front 与 world up
        叉乘得到，必须 normalize，否则斜向移动会更快。
      </figcaption>
    </figure>
  );
}
