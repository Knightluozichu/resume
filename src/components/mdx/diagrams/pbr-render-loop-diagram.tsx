/**
 * <PbrRenderLoopDiagram />：「PBR·光照」§3「Cook-Torrance GLSL 实现」配图（HEL-163，C 实战型）。
 *
 * 流程图：逐片段 PBR 光照循环。左到右横向布局：
 *   per fragment → for each light → calc radiance → calc D,G,F → Cook-Torrance specular →
 *   accumulate Lo → ambient → tone map → gamma → output
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * 视觉语言：token 色，无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
  color = "var(--accent)",
  bg = "var(--bg)",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  color?: string;
  bg?: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="6"
        fill={bg}
        stroke={color}
        strokeWidth="1.5"
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 3}
        textAnchor="middle"
        fontSize="9"
        fontWeight="600"
        fill={color}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 10}
          textAnchor="middle"
          fontSize="7.5"
          fill="var(--text-secondary)"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

export function PbrRenderLoopDiagram() {
  // Row 1: per-light loop (y=50)
  // Row 2: post-loop pipeline (y=140)
  const row1y = 50;
  const row2y = 150;
  const bh = 42;

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 620 220"
          role="img"
          aria-label="PBR 逐片段渲染循环流程图。第一行：对每盏光，计算辐射度，然后分别算 D G F 三项，组合成 Cook-Torrance 镜面项，累加到 Lo。第二行：加上环境光，做 Reinhard 色调映射，最后 gamma 校正输出。"
          className="mx-auto block h-auto w-full max-w-[620px]"
        >
          <text
            x="310"
            y="22"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            逐片段 PBR 光照循环
          </text>

          {/* top label: per-light loop */}
          <text
            x="10"
            y={row1y - 4}
            fontSize="9"
            fontWeight="600"
            fill="var(--warning)"
          >
            for each light:
          </text>

          {/* Row 1 boxes */}
          <Box x={10} y={row1y} w={80} h={bh} label="计算辐射度" sub="Li × atten" color="var(--warning)" />
          <Box x={120} y={row1y} w={60} h={bh} label="D (GGX)" sub="NDF" color="var(--accent)" />
          <Box x={206} y={row1y} w={60} h={bh} label="G (Smith)" sub="几何遮蔽" color="var(--accent)" />
          <Box x={292} y={row1y} w={70} h={bh} label="F (Fresnel)" sub="菲涅尔" color="var(--accent)" />
          <Box x={388} y={row1y} w={90} h={bh} label="Cook-Torrance" sub="DGF / 4NV·NL" color="var(--accent)" />
          <Box x={504} y={row1y} w={96} h={bh} label="Lo += 贡献" sub="(kD·albedo/π + spec)" color="var(--success)" />

          {/* Row 1 arrows */}
          <defs>
            <marker id="prl-arr" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
              <path d="M0 0 L5 2.5 L0 5 z" fill="var(--text-secondary)" />
            </marker>
            <marker id="prl-arr-s" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
              <path d="M0 0 L5 2.5 L0 5 z" fill="var(--success)" />
            </marker>
          </defs>
          {/* arrows between row 1 boxes */}
          {[
            [90, 120],
            [180, 206],
            [266, 292],
            [362, 388],
            [478, 504],
          ].map(([x1, x2], i) => (
            <line
              key={i}
              x1={x1}
              y1={row1y + bh / 2}
              x2={x2}
              y2={row1y + bh / 2}
              stroke="var(--text-secondary)"
              strokeWidth="1.2"
              markerEnd="url(#prl-arr)"
            />
          ))}

          {/* loop-back arrow from Lo back to first box */}
          <path
            d={`M ${504 + 48} ${row1y + bh} L ${504 + 48} ${row1y + bh + 16} L ${50} ${row1y + bh + 16} L ${50} ${row1y + bh}`}
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1"
            strokeDasharray="3 3"
            markerEnd="url(#prl-arr)"
          />
          <text
            x="280"
            y={row1y + bh + 26}
            textAnchor="middle"
            fontSize="7.5"
            fill="var(--warning)"
          >
            下一盏光
          </text>

          {/* vertical arrow from Lo to post-loop row */}
          <line
            x1={504 + 48}
            y1={row1y + bh + 16}
            x2={504 + 48}
            y2={row2y}
            stroke="var(--success)"
            strokeWidth="1.2"
            markerEnd="url(#prl-arr-s)"
          />

          {/* bottom label */}
          <text
            x="10"
            y={row2y - 4}
            fontSize="9"
            fontWeight="600"
            fill="var(--success)"
          >
            循环结束后:
          </text>

          {/* Row 2 boxes */}
          <Box x={10} y={row2y} w={90} h={bh} label="+ ambient" sub="0.03 × albedo" color="var(--text-secondary)" />
          <Box x={130} y={row2y} w={110} h={bh} label="Reinhard 色调映射" sub="c / (c + 1)" color="var(--success)" />
          <Box x={270} y={row2y} w={110} h={bh} label="Gamma 校正" sub="pow(c, 1/2.2)" color="var(--success)" />
          <Box x={410} y={row2y} w={90} h={bh} label="FragColor" sub="sRGB 输出" color="var(--success)" bg="var(--success)" />
          {/* make last box text visible */}
          <rect
            x={410}
            y={row2y}
            width={90}
            height={bh}
            rx="6"
            fill="var(--success)"
            opacity="0.12"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x={455}
            y={row2y + bh / 2 - 3}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="var(--success)"
          >
            FragColor
          </text>
          <text
            x={455}
            y={row2y + bh / 2 + 10}
            textAnchor="middle"
            fontSize="7.5"
            fill="var(--text-secondary)"
          >
            sRGB 输出
          </text>

          {/* Row 2 arrows */}
          {[
            [100, 130],
            [240, 270],
            [380, 410],
          ].map(([x1, x2], i) => (
            <line
              key={`r2-${i}`}
              x1={x1}
              y1={row2y + bh / 2}
              x2={x2}
              y2={row2y + bh / 2}
              stroke="var(--text-secondary)"
              strokeWidth="1.2"
              markerEnd="url(#prl-arr)"
            />
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        片段着色器对每盏光循环：先算辐射度和衰减，再用 D/G/F 三项合成
        Cook-Torrance 镜面，和漫反射一起累加进 Lo。循环结束后加环境光，
        做 Reinhard 色调映射 + gamma 校正，输出最终颜色。
      </figcaption>
    </figure>
  );
}
