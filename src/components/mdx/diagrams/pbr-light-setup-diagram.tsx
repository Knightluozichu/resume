/**
 * <PbrLightSetupDiagram />：「PBR·光照」§3「点光源辐射度」配图（HEL-163，C 实战型）。
 *
 * 俯视视角：中央一个球体，周围 4 盏点光源（对应 GLSL 里的 lightPositions[0..3]），
 * 每盏光用箭头指向球体，标注衰减公式 1/d^2。右侧注释「每盏光贡献 = lightColor * attenuation」。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * 视觉语言：token 色（var(--accent)/--border/--bg/--bg-elevated/--text-primary/--text-secondary/
 * --warning/--danger/--success），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function PbrLightSetupDiagram() {
  const cx = 260;
  const cy = 130;
  const r = 40;

  // 4 light positions (top-down view, matching shader layout)
  const lights = [
    { x: 80, y: 50, label: "Light 0", color: "var(--warning)" },
    { x: 440, y: 50, label: "Light 1", color: "var(--accent)" },
    { x: 80, y: 210, label: "Light 2", color: "var(--success)" },
    { x: 440, y: 210, label: "Light 3", color: "var(--danger)" },
  ];

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 520 280"
          role="img"
          aria-label="俯视示意图：中央一个球体，四角各有一盏点光源，每盏光发出箭头指向球体。箭头旁标注衰减公式 attenuation 等于 1 除以距离的平方。说明实时 PBR 中对每盏点光源分别计算辐射度再累加。"
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          {/* title */}
          <text
            x={cx}
            y="22"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            4 盏点光源布局（俯视）
          </text>

          {/* central sphere */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={cx}
            y={cy + 4}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            PBR 球
          </text>

          {/* arrow defs */}
          <defs>
            <marker
              id="pls-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* lights + arrows */}
          {lights.map((l, i) => {
            // arrow from light to sphere edge
            const dx = cx - l.x;
            const dy = cy - l.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const nx = dx / dist;
            const ny = dy / dist;
            // arrow start: offset from light center
            const ax1 = l.x + nx * 16;
            const ay1 = l.y + ny * 16;
            // arrow end: sphere edge
            const ax2 = cx - nx * (r + 4);
            const ay2 = cy - ny * (r + 4);
            // attenuation label midpoint
            const mx = (ax1 + ax2) / 2;
            const my = (ay1 + ay2) / 2;
            // offset label perpendicular to arrow
            const perpX = -ny * 14;
            const perpY = nx * 14;

            return (
              <g key={i}>
                {/* light glow */}
                <circle cx={l.x} cy={l.y} r="12" fill={l.color} opacity="0.18" />
                <circle cx={l.x} cy={l.y} r="6" fill={l.color} />
                <text
                  x={l.x}
                  y={l.y + 22}
                  textAnchor="middle"
                  fontSize="8"
                  fill="var(--text-secondary)"
                >
                  {l.label}
                </text>
                {/* arrow */}
                <line
                  x1={ax1}
                  y1={ay1}
                  x2={ax2}
                  y2={ay2}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                  markerEnd="url(#pls-arrow)"
                />
                {/* attenuation label */}
                <text
                  x={mx + perpX}
                  y={my + perpY}
                  textAnchor="middle"
                  fontSize="8"
                  fill="var(--text-secondary)"
                >
                  1/d²
                </text>
              </g>
            );
          })}

          {/* formula box */}
          <rect
            x="130"
            y="244"
            width="260"
            height="26"
            rx="6"
            fill="var(--accent)"
            opacity="0.1"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text
            x={cx}
            y="261"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            每盏光辐射度 = lightColor × (1 / distance²)
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        4 盏点光源均匀分布在球体四角。每盏光的辐射度按
        <strong>平方反比</strong>衰减——距离翻倍，亮度降到四分之一。
        片段着色器对每盏光循环累加。
      </figcaption>
    </figure>
  );
}
