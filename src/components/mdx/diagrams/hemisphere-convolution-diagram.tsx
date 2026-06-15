/**
 * <HemisphereConvolutionDiagram />：「PBR·IBL 漫反射辐照」§3「辐照度卷积」配图（HEL-164）。
 *
 * 画面内容：
 *  - 一个水平地面，中心一点（着色点）
 *  - 该点的法线 N 垂直向上
 *  - 半球形虚线轮廓（朝 N 方向）
 *  - 多条采样射线从着色点射出到半球各方向
 *  - 标注：法线 N、cos(θ)·sin(θ) 权重、Σ → 辐照度
 *  - 底部文字：对半球所有方向的环境光加权求和 → 该法线方向的辐照度
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * 视觉语言：token 色，无阴影，rx 圆角，无裸 hex（硬规则 5）。
 */

export function HemisphereConvolutionDiagram() {
  const cx = 200;
  const cy = 200;
  const hemisphereR = 110;

  // 采样方向（半球上方，角度 10~170 度，排除正下方）
  const sampleAngles = [-70, -50, -30, -10, 10, 30, 50, 70];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 560 320"
          role="img"
          aria-label="辐照度卷积示意图。底部是一个水平地面，中心一点为着色点。法线 N 从该点垂直向上。上方是一个半球形虚线轮廓，代表采样的半球空间。多条彩色采样射线从着色点射出到半球各个方向，每条射线代表一个采样的环境光方向。右侧注释说明 cos θ 余弦权重（正对法线最强）和 sin θ 雅可比权重（补偿球面积均匀采样）。底部公式是辐照度等于在半球上对 Li 乘以 cos θ sin θ 的黎曼和。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* 标题 */}
          <text
            x="280"
            y="24"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            辐照度卷积：半球采样加权求和
          </text>

          {/* ---- 地面 ---- */}
          <line
            x1="40"
            y1={cy}
            x2={cx * 2 - 20}
            y2={cy}
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text x="42" y={cy + 14} fontSize="8" fill="var(--text-secondary)">
            表面
          </text>

          {/* ---- 半球虚线 ---- */}
          <path
            d={`M ${cx - hemisphereR} ${cy} A ${hemisphereR} ${hemisphereR} 0 0 1 ${cx + hemisphereR} ${cy}`}
            fill="var(--accent)"
            fillOpacity="0.05"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />

          {/* ---- 采样射线 ---- */}
          <defs>
            <marker id="hc-arr" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
              <path d="M0 0 L5 2.5 L0 5 z" fill="var(--warning)" />
            </marker>
            <marker id="hc-arr-n" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
              <path d="M0 0 L5 2.5 L0 5 z" fill="var(--success)" />
            </marker>
          </defs>

          {sampleAngles.map((angleDeg, i) => {
            const rad = (angleDeg * Math.PI) / 180;
            // 射线从着色点射到半球边缘
            const endX = cx + Math.cos(rad) * (hemisphereR - 6);
            const endY = cy + Math.sin(rad) * (hemisphereR - 6);
            // 每条射线颜色交替
            const isCenter = Math.abs(angleDeg) < 20;
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={endX}
                y2={endY}
                stroke={isCenter ? "var(--success)" : "var(--warning)"}
                strokeWidth={isCenter ? 2 : 1.4}
                markerEnd={isCenter ? "url(#hc-arr-n)" : "url(#hc-arr)"}
                opacity="0.8"
              />
            );
          })}

          {/* ---- 法线 N 箭头 ---- */}
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - hemisphereR - 12}
            stroke="var(--success)"
            strokeWidth="2.5"
            markerEnd="url(#hc-arr-n)"
          />
          <text
            x={cx + 8}
            y={cy - hemisphereR - 14}
            fontSize="13"
            fontWeight="700"
            fill="var(--success)"
          >
            N
          </text>
          <text
            x={cx + 20}
            y={cy - hemisphereR - 4}
            fontSize="8"
            fill="var(--text-secondary)"
          >
            法线方向
          </text>

          {/* ---- 着色点 ---- */}
          <circle cx={cx} cy={cy} r="5" fill="var(--text-primary)" />
          <text x={cx - 20} y={cy + 18} fontSize="8" fill="var(--text-secondary)">
            着色点 P
          </text>

          {/* ---- θ 角标注 ---- */}
          <path
            d={`M ${cx} ${cy - 36} A 36 36 0 0 0 ${cx + 36 * Math.cos((-30 * Math.PI) / 180)} ${cy + 36 * Math.sin((-30 * Math.PI) / 180)}`}
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <text x={cx + 18} y={cy - 20} fontSize="9" fill="var(--text-secondary)" fontStyle="italic">
            θ
          </text>

          {/* ---- 右侧注释面板 ---- */}
          <rect x="330" y="50" width="208" height="156" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="434" y="70" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-primary)">
            卷积权重分解
          </text>
          {/* cos(θ) */}
          <rect x="340" y="80" width="188" height="30" rx="4" fill="var(--success)" opacity="0.08" />
          <text x="434" y="94" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">
            cos(θ) — 朗伯余弦律
          </text>
          <text x="434" y="106" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            正对法线 θ=0° 贡献最强
          </text>
          {/* sin(θ) */}
          <rect x="340" y="118" width="188" height="30" rx="4" fill="var(--warning)" opacity="0.08" />
          <text x="434" y="132" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--warning)">
            sin(θ) — 雅可比行列式
          </text>
          <text x="434" y="144" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            补偿球面均匀采样面积
          </text>
          {/* Σ */}
          <rect x="340" y="156" width="188" height="38" rx="4" fill="var(--accent)" opacity="0.08" />
          <text x="434" y="170" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">
            Σ 黎曼和 → 辐照度
          </text>
          <text x="434" y="182" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            32×32 辐照度贴图已足够
          </text>
          <text x="434" y="194" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            （低频信号，高分辨率冗余）
          </text>

          {/* ---- 底部公式 ---- */}
          <rect x="28" y="236" width="492" height="52" rx="8" fill="var(--accent)" opacity="0.05" stroke="var(--accent)" strokeWidth="1" />
          <text x="280" y="256" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--text-primary)">
            辐照度卷积公式（黎曼求和近似）
          </text>
          <text x="280" y="274" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            irradiance(N) ≈ π × Σ Li(ωi) × cos(θi) × sin(θi) × dφ × dθ
          </text>
          <text x="280" y="288" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            对半球所有采样方向 ωi 加权求和，得到法线 N 方向接收到的漫反射光总量
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        辐照度卷积：对着色点法线 N 朝向的半球，均匀采样所有方向 ωi，每个方向的环境光
        Li(ωi) 乘以 cos(θ)（朗伯余弦律）和 sin(θ)（面积雅可比）加权后求和。低频漫反射结果只需 32×32 辐照度贴图存储。
      </figcaption>
    </figure>
  );
}
