/**
 * <NdfRoughnessDiagram>：「PBR·理论」§3.5「法线分布函数 D (NDF)」小节配图（HEL-162，B 数学型）。
 *
 * 三栏对照不同粗糙度 alpha 下微面法线分布的变化：
 *  左：alpha=0.1（光滑）—— 极窄的尖峰，只有极少数微面对齐 H，高光小而亮。
 *  中：alpha=0.5（中等）—— 中等宽度的钟形，更多微面覆盖更大角度范围。
 *  右：alpha=1.0（粗糙）—— 极宽平的分布，微面朝向分散，高光大而暗。
 *
 * 每栏画一条 D 值曲线（横轴 = n 与 h 夹角，纵轴 = D 值），加表面微面朝向分布的小示意。
 *
 * Server Component（纯展示静态 SVG）。
 * 视觉语言：token 色 var(--accent/--success/--warning/--danger/--border/--bg/--bg-elevated/--text-primary/--text-secondary)。
 */

export function NdfRoughnessDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 700 310"
          role="img"
          aria-label="法线分布函数 NDF 在不同粗糙度下的对照图。三栏分别对应粗糙度 0.1、0.5 和 1.0。左栏粗糙度 0.1，曲线是极窄的尖峰，只有极少数微面法线对齐半程向量 H，形成小而亮的高光。中栏粗糙度 0.5，曲线变宽变矮，更多微面覆盖更大角度范围，高光中等大小。右栏粗糙度 1.0，曲线极宽极平，微面朝向分散，高光大而暗。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* 标题 */}
          <text
            x="350"
            y="28"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            法线分布函数 D (GGX)：粗糙度越高，分布越宽越平
          </text>

          {/* ============ 三栏共用坐标 ============ */}
          {[
            { cx: 120, alpha: 0.1, color: "var(--accent)", label: "alpha = 0.1（光滑）" },
            { cx: 350, alpha: 0.5, color: "var(--warning)", label: "alpha = 0.5（中等）" },
            { cx: 580, alpha: 1.0, color: "var(--danger)", label: "alpha = 1.0（粗糙）" },
          ].map(({ cx, alpha, color, label }) => {
            // GGX NDF 简化曲线：D(theta) ~ alpha^2 / (cos^2(theta)*(alpha^2-1)+1)^2
            // 画 21 个点
            const points: string[] = [];
            const w = 160;
            const h = 150;
            const baseY = 230;
            const startX = cx - w / 2;

            for (let i = 0; i <= 20; i++) {
              const t = i / 20; // 0 to 1
              const theta = (t - 0.5) * Math.PI * 0.9; // -81 to +81 degrees
              const cosT = Math.cos(theta);
              const a2 = alpha * alpha;
              const denom = cosT * cosT * (a2 - 1) + 1;
              const d = a2 / (Math.PI * denom * denom);
              // Normalize for visual: max D at theta=0 is alpha^2/(pi*(alpha^2)^2) = 1/(pi*alpha^2)
              const maxD = 1 / (Math.PI * a2);
              const normD = Math.min(d / maxD, 1);
              const px = startX + t * w;
              const py = baseY - normD * h;
              points.push(`${px},${py}`);
            }

            return (
              <g key={`ndf-${alpha}`}>
                {/* 栏标题 */}
                <text
                  x={cx}
                  y={54}
                  textAnchor="middle"
                  fontSize="11.5"
                  fontWeight="600"
                  fill={color}
                >
                  {label}
                </text>

                {/* 坐标轴 */}
                <line
                  x1={startX}
                  y1={baseY}
                  x2={startX + w}
                  y2={baseY}
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <line
                  x1={cx}
                  y1={baseY}
                  x2={cx}
                  y2={baseY - h - 10}
                  stroke="var(--border)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={cx}
                  y={baseY + 16}
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--text-secondary)"
                >
                  n . h 夹角
                </text>
                <text
                  x={cx - w / 2 - 4}
                  y={baseY - h / 2}
                  textAnchor="end"
                  fontSize="9"
                  fill="var(--text-secondary)"
                >
                  D
                </text>

                {/* 曲线 */}
                <polyline
                  points={points.join(" ")}
                  fill="none"
                  stroke={color}
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* 高光示意 */}
                <text
                  x={cx}
                  y={baseY + 36}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {alpha <= 0.1
                    ? "高光小而亮"
                    : alpha <= 0.5
                      ? "高光中等"
                      : "高光大而暗"}
                </text>

                {/* 高光圆斑示意 */}
                <circle
                  cx={cx}
                  y={baseY + 56}
                  cy={baseY + 56}
                  r={alpha <= 0.1 ? 6 : alpha <= 0.5 ? 14 : 24}
                  fill={color}
                  opacity={alpha <= 0.1 ? 0.8 : alpha <= 0.5 ? 0.4 : 0.15}
                />
              </g>
            );
          })}

          {/* 底部总结 */}
          <text
            x="350"
            y="300"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            D 越高 = 越多微面对齐 H → alpha 低则集中（锐利）、alpha 高则分散（弥漫）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        GGX 法线分布：粗糙度 alpha 越低曲线越窄越高（高光小而亮），alpha 越高曲线越宽越矮（高光大而暗）。
      </figcaption>
    </figure>
  );
}
