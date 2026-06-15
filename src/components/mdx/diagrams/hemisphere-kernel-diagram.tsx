/**
 * <HemisphereKernelDiagram>：「高级光照·SSAO」§3「半球核采样」小节的核心掰碎图（HEL-89，C 实战型，篇收官）。
 *
 * 把「半球核采样 hemisphere kernel」这件事画清楚：侧视一个表面上的片元 P + 它朝外的法线 N，
 * 在 N 朝向的半球（不是整球）内撒若干随机采样点；其中一些采样点落在几何内部（被挡住 → 计入遮蔽），
 * 一些落在空气里（没被挡 → 不计）。直觉落点：「在片元法线朝向的半球内撒点，看有多少被几何挡住」。
 *
 * 为什么是半球而非整球：采样点要在表面上方那一侧才有意义；若用整球，朝向表面背面的采样点
 * 总在几何内部、会让平坦表面也凭空变暗（误区里讲），所以核限制在法线半球内。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--danger/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function HemisphereKernelDiagram() {
  // 片元 P 的位置 + 半球半径
  const px = 230;
  const py = 250;
  const r = 130;
  // 半球内若干采样点：x/y 偏移 + 是否被几何挡住（occluded）
  const samples = [
    { dx: -70, dy: -30, occ: true }, // 落进左侧凸起的几何里 → 被挡
    { dx: -30, dy: -90, occ: false },
    { dx: 20, dy: -100, occ: false },
    { dx: 75, dy: -60, occ: true }, // 落进右侧凸起里 → 被挡
    { dx: 100, dy: -20, occ: true },
    { dx: 45, dy: -45, occ: false },
    { dx: -95, dy: -25, occ: false },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 560 340"
          role="img"
          aria-label="半球核采样示意，侧视图。一块水平表面上的片元 P 立起一条朝外的法线 N。以 P 为圆心、在法线朝向的上半球内撒了若干随机采样点。其中一些采样点落进了表面附近凸起的几何内部，算作被遮挡；另一些落在空气里没被挡。SSAO 就是看半球内的采样点有多少被周围几何挡住，被挡得越多，这个片元接收到的环境光越少、应该越暗。之所以只用法线朝向的半球而不是整球，是因为朝向表面背面的采样点总在几何内部，会让平坦表面也凭空变暗。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <defs>
            <marker
              id="ssao-hemi-arrow-n"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--warning)" />
            </marker>
            {/* 半球内的淡色填充：示意采样核覆盖的范围 */}
            <linearGradient id="ssao-hemi-fill" x1="0" y1="1" x2="0" y2="0">
              <stop
                offset="0%"
                stopColor="color-mix(in srgb, var(--accent) 28%, var(--bg))"
              />
              <stop
                offset="100%"
                stopColor="color-mix(in srgb, var(--accent) 8%, var(--bg))"
              />
            </linearGradient>
          </defs>

          <text
            x="280"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            半球核采样：在片元法线半球内撒点，看几个被几何挡住
          </text>

          {/* 周围几何：表面 + 两侧凸起（被挡的采样点会落进这些实体里） */}
          {/* 水平地面（P 所在的表面） */}
          <rect
            x="40"
            y={py}
            width="480"
            height="50"
            fill="var(--border)"
            opacity="0.45"
          />
          {/* 左侧凸起的几何块（挡住部分采样点） */}
          <path
            d="M40 250 L40 200 Q110 175 170 220 L170 250 Z"
            fill="var(--border)"
            opacity="0.7"
          />
          {/* 右侧凸起的几何块 */}
          <path
            d="M300 250 Q360 185 400 200 L400 250 Z"
            fill="var(--border)"
            opacity="0.7"
          />

          {/* 法线半球：以 P 为圆心、半径 r 的上半圆（采样核覆盖范围） */}
          <path
            d={`M ${px - r} ${py} A ${r} ${r} 0 0 1 ${px + r} ${py} Z`}
            fill="url(#ssao-hemi-fill)"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <text x={px - r + 6} y={py - 12} fontSize="10" fill="var(--accent)">
            采样半球（半径 = uRadius）
          </text>

          {/* 法线 N：从 P 垂直朝外 */}
          <line
            x1={px}
            y1={py}
            x2={px}
            y2={py - r - 8}
            stroke="var(--warning)"
            strokeWidth="2.6"
            markerEnd="url(#ssao-hemi-arrow-n)"
          />
          <text
            x={px + 8}
            y={py - r}
            fontSize="13"
            fontWeight="600"
            fill="var(--warning)"
          >
            N
          </text>

          {/* 采样点：被挡的标红、没挡的标绿 */}
          {samples.map((s, i) => {
            const sx = px + s.dx;
            const sy = py + s.dy;
            const color = s.occ ? "var(--danger)" : "var(--success)";
            return (
              <g key={i}>
                <line
                  x1={px}
                  y1={py}
                  x2={sx}
                  y2={sy}
                  stroke={color}
                  strokeWidth="1"
                  opacity="0.4"
                />
                <circle cx={sx} cy={sy} r="5" fill={color} />
              </g>
            );
          })}

          {/* 片元 P：半球圆心 */}
          <circle cx={px} cy={py} r="5" fill="var(--text-primary)" />
          <text
            x={px + 10}
            y={py + 18}
            fontSize="11"
            fill="var(--text-secondary)"
          >
            P（当前片元）
          </text>

          {/* 图例 */}
          <g transform="translate(420, 70)">
            <circle cx="0" cy="0" r="5" fill="var(--danger)" />
            <text x="12" y="4" fontSize="10.5" fill="var(--text-secondary)">
              被几何挡住 → 遮蔽 +1
            </text>
            <circle cx="0" cy="24" r="5" fill="var(--success)" />
            <text x="12" y="28" fontSize="10.5" fill="var(--text-secondary)">
              落在空气里 → 不计
            </text>
          </g>

          {/* 底部一句话总括 */}
          <text
            x="280"
            y="326"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            被挡的采样点越多 → 这片元接收的环境光越少 → 该越暗（AO 越强）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        以片元 <strong>P</strong> 为中心、在它的
        <strong>法线 N 朝向的半球</strong>
        内撒若干随机采样点，数有多少落进了周围几何里（
        <span style={{ color: "var(--danger)" }}>红 = 被挡</span> /{" "}
        <span style={{ color: "var(--success)" }}>绿 = 没挡</span>
        ）。挡得越多，这块表面被周围遮得越严、能接收的环境光越少，就该越暗。
        只用<strong>半球</strong>不用整球，是为了不让平坦表面凭空变暗。
      </figcaption>
    </figure>
  );
}
