/**
 * <ReflectanceEquationDiagram>：「PBR·理论」§3.3「反射率方程」小节配图（HEL-162，B 数学型）。
 *
 * 画表面上一点 P 的上半球 omega，标出入射方向 omega_i、出射方向 omega_o、法线 n、
 * 以及半球积分的概念——BRDF fr 对所有 omega_i 方向的 Li 加权积分。
 *
 * Server Component（纯展示静态 SVG）。
 * 视觉语言：token 色 var(--accent/--success/--warning/--danger/--border/--bg/--bg-elevated/--text-primary/--text-secondary)。
 */

export function ReflectanceEquationDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 560 360"
          role="img"
          aria-label="反射率方程示意图。表面上一点 P，上方画出法线 n 指向正上方的半球。半球内有多条入射方向 omega_i（标黄色）从不同角度射入 P 点，每条 omega_i 带着辐射度 Li。出射方向 omega_o（标蓝色）是我们求的方向。BRDF 函数 fr 衡量每条 omega_i 方向的光有多少沿 omega_o 出去，对整个半球积分得到出射辐射度 Lo。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <defs>
            <marker
              id="req-arrow-accent"
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
              id="req-arrow-warning"
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
              id="req-arrow-success"
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
            x="280"
            y="26"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            反射率方程：对半球所有入射方向积分
          </text>

          {/* 表面 */}
          <rect
            x="100"
            y="250"
            width="360"
            height="8"
            rx="2"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          {/* 点 P */}
          <circle cx="280" cy="250" r="5" fill="var(--text-primary)" />
          <text x="288" y="270" fontSize="13" fontWeight="600" fill="var(--text-primary)">
            P
          </text>

          {/* 半球（椭圆弧） */}
          <ellipse
            cx="280"
            cy="250"
            rx="160"
            ry="160"
            fill="var(--accent)"
            opacity="0.04"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            clipPath="url(#req-half-clip)"
          />
          <clipPath id="req-half-clip">
            <rect x="100" y="50" width="380" height="200" />
          </clipPath>
          {/* 半球底部椭圆（表面切面） */}
          <ellipse
            cx="280"
            cy="250"
            rx="160"
            ry="30"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <text x="448" y="252" fontSize="10" fill="var(--accent)">
            omega
          </text>

          {/* 法线 n */}
          <line
            x1="280"
            y1="250"
            x2="280"
            y2="76"
            stroke="var(--success)"
            strokeWidth="2.5"
            markerEnd="url(#req-arrow-success)"
          />
          <text x="288" y="80" fontSize="12" fontWeight="600" fill="var(--success)">
            n
          </text>

          {/* 入射方向 omega_i（多条从不同角度射入 P） */}
          {[
            { angle: 130, label: true },
            { angle: 155, label: false },
            { angle: 105, label: false },
            { angle: 70, label: false },
            { angle: 45, label: false },
          ].map(({ angle, label }, i) => {
            const rad = (angle * Math.PI) / 180;
            const len = 120;
            const ex = 280 + len * Math.cos(rad);
            const ey = 250 - len * Math.sin(rad);
            return (
              <g key={`wi-${i}`}>
                <line
                  x1={ex}
                  y1={ey}
                  x2="280"
                  y2="250"
                  stroke="var(--warning)"
                  strokeWidth="1.5"
                  markerEnd="url(#req-arrow-warning)"
                  opacity="0.8"
                />
                {label && (
                  <text
                    x={ex - 10}
                    y={ey - 6}
                    fontSize="11"
                    fontWeight="600"
                    fill="var(--warning)"
                  >
                    omega_i (L_i)
                  </text>
                )}
              </g>
            );
          })}

          {/* 出射方向 omega_o */}
          <line
            x1="280"
            y1="250"
            x2="400"
            y2="120"
            stroke="var(--accent)"
            strokeWidth="2.5"
            markerEnd="url(#req-arrow-accent)"
          />
          <text x="406" y="116" fontSize="12" fontWeight="600" fill="var(--accent)">
            omega_o (L_o)
          </text>

          {/* cosine 权重标注 */}
          <path
            d="M280 210 A 40 40 0 0 0 260 214"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
          />
          <text x="242" y="212" fontSize="10" fill="var(--text-secondary)">
            n . omega_i
          </text>

          {/* 底部公式提示 */}
          <rect
            x="70"
            y="296"
            width="420"
            height="50"
            rx="8"
            fill="var(--accent)"
            opacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text
            x="280"
            y="316"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            L_o(p, omega_o) = integral_omega fr(...) . L_i(...) . (n . omega_i) d omega_i
          </text>
          <text
            x="280"
            y="336"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            BRDF fr 衡量每条入射光沿 omega_o 出去多少，对半球所有方向求和
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反射率方程：对表面点 P 的上半球所有入射方向
        omega_i 积分，每条入射光经 BRDF
        fr 加权后累加得出射辐射度 L_o。n . omega_i 是余弦项（投影面积权重）。
      </figcaption>
    </figure>
  );
}
