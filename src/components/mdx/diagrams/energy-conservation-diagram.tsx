/**
 * <EnergyConservationDiagram>：「PBR·理论」§3.2「能量守恒」小节配图（HEL-162，B 数学型）。
 *
 * 画一束入射光打到表面，分裂成反射光（k_s 份）和折射/被吸收光（k_d 份），
 * 反射 + 折射 = 入射（k_s + k_d = 1），强调「出去的不超过进来的」。
 *
 * Server Component（纯展示静态 SVG）。
 * 视觉语言：token 色 var(--accent/--success/--warning/--danger/--border/--bg/--bg-elevated/--text-primary/--text-secondary)。
 */

export function EnergyConservationDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 600 300"
          role="img"
          aria-label="能量守恒示意图。一束入射光（标为 100%）打到表面后分成两部分：反射光（标为 k_s，向上弹出，用蓝色表示）和折射/散射光（标为 k_d，穿入表面内部，用绿色表示）。底部公式 k_s 加 k_d 等于 1，强调出去的光总量不超过进来的光。反射越强则折射越弱，反之亦然。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          <defs>
            <marker
              id="ec-arrow-warning"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--warning)" />
            </marker>
            <marker
              id="ec-arrow-accent"
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
              id="ec-arrow-success"
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

          {/* 标题 */}
          <text
            x="300"
            y="28"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            能量守恒：反射 + 折射 = 入射
          </text>

          {/* 表面 */}
          <rect
            x="100"
            y="150"
            width="400"
            height="10"
            rx="2"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="300"
            y="175"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            材质表面
          </text>

          {/* 入射光（粗箭头，100%） */}
          <line
            x1="180"
            y1="50"
            x2="280"
            y2="142"
            stroke="var(--warning)"
            strokeWidth="3"
            markerEnd="url(#ec-arrow-warning)"
          />
          <text x="170" y="46" fontSize="12" fontWeight="600" fill="var(--warning)">
            入射光 100%
          </text>

          {/* 反射光 k_s（向右上弹出） */}
          <line
            x1="280"
            y1="142"
            x2="400"
            y2="52"
            stroke="var(--accent)"
            strokeWidth="2.5"
            markerEnd="url(#ec-arrow-accent)"
          />
          <text x="404" y="52" fontSize="12" fontWeight="600" fill="var(--accent)">
            反射 k_s
          </text>
          <text x="404" y="68" fontSize="10" fill="var(--text-secondary)">
            镜面反射
          </text>

          {/* 折射/散射光 k_d（穿入表面内部） */}
          <line
            x1="280"
            y1="160"
            x2="320"
            y2="236"
            stroke="var(--success)"
            strokeWidth="2.5"
            markerEnd="url(#ec-arrow-success)"
          />
          <text x="330" y="220" fontSize="12" fontWeight="600" fill="var(--success)">
            折射 k_d
          </text>
          <text x="330" y="236" fontSize="10" fill="var(--text-secondary)">
            漫反射/吸收
          </text>

          {/* 表面内部散射示意（小点） */}
          {[
            [250, 190],
            [270, 210],
            [290, 195],
            [260, 225],
            [310, 205],
          ].map(([cx, cy], i) => (
            <circle
              key={`scatter-${i}`}
              cx={cx}
              cy={cy}
              r="2.5"
              fill="var(--success)"
              opacity="0.4"
            />
          ))}

          {/* 等号 / 守恒公式 */}
          <rect
            x="150"
            y="258"
            width="300"
            height="32"
            rx="8"
            fill="var(--accent)"
            opacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text
            x="300"
            y="280"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            k_s + k_d = 1 （反射越强，折射越弱）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        入射光打到表面分成反射（k_s）和折射/吸收（k_d）两部分，总和不超过入射量。反射越强漫反射越弱，反之亦然。
      </figcaption>
    </figure>
  );
}
