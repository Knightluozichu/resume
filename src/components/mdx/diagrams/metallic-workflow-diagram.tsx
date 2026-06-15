/**
 * <MetallicWorkflowDiagram>：「PBR·理论」§3.8「金属/非金属工作流」小节配图（HEL-162，B 数学型）。
 *
 * 左右两栏对照：
 *  左：非金属（电介质）—— F0 低（约 0.04），有着色漫反射（colored diffuse），镜面接近白色。
 *  右：金属 —— F0 高（来自 albedo 颜色），无漫反射（k_d=0），镜面反射有颜色（colored specular）。
 * 底部标 metallic 参数：0=电介质、1=金属。
 *
 * Server Component（纯展示静态 SVG）。
 * 视觉语言：token 色 var(--accent/--success/--warning/--danger/--border/--bg/--bg-elevated/--text-primary/--text-secondary)。
 */

export function MetallicWorkflowDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 680 340"
          role="img"
          aria-label="金属与非金属工作流对照图。左栏非金属（电介质）：F0 低约 0.04，有着色漫反射（绿色标注 colored diffuse），镜面反射接近白色。右栏金属：F0 高取自 albedo 颜色，没有漫反射（k_d 等于 0），镜面反射本身有颜色（colored specular）。底部标注 metallic 参数 0 代表电介质、1 代表金属。"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          {/* 标题 */}
          <text
            x="340"
            y="28"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            金属/非金属工作流：metallic 参数的两端
          </text>

          {/* ============ 左栏：非金属 ============ */}
          <rect
            x="30"
            y="48"
            width="290"
            height="240"
            rx="10"
            fill="var(--success)"
            opacity="0.05"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="175"
            y="72"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--success)"
          >
            非金属（电介质）metallic = 0
          </text>

          {/* 球体示意 */}
          <circle
            cx="175"
            cy="155"
            r="50"
            fill="var(--success)"
            opacity="0.2"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          {/* 漫反射色填充 */}
          <circle cx="175" cy="155" r="42" fill="var(--success)" opacity="0.3" />
          {/* 白色高光 */}
          <ellipse
            cx="158"
            cy="138"
            rx="12"
            ry="8"
            fill="var(--bg-elevated)"
            opacity="0.8"
          />

          {/* 属性列表 */}
          <text x="60" y="225" fontSize="11" fill="var(--text-primary)">
            F0 ~ 0.04（低，几乎一样）
          </text>
          <text x="60" y="245" fontSize="11" fill="var(--success)" fontWeight="600">
            漫反射 = albedo 颜色（有色）
          </text>
          <text x="60" y="265" fontSize="11" fill="var(--text-secondary)">
            镜面反射 ~ 白色（无色彩）
          </text>
          <text x="60" y="282" fontSize="10" fill="var(--text-secondary)">
            k_d 大、k_s 小
          </text>

          {/* 分隔线 */}
          <line
            x1="340"
            y1="45"
            x2="340"
            y2="295"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ============ 右栏：金属 ============ */}
          <rect
            x="360"
            y="48"
            width="290"
            height="240"
            rx="10"
            fill="var(--accent)"
            opacity="0.05"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="505"
            y="72"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--accent)"
          >
            金属 metallic = 1
          </text>

          {/* 球体示意 */}
          <circle
            cx="505"
            cy="155"
            r="50"
            fill="var(--accent)"
            opacity="0.15"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          {/* 金属色反射 */}
          <circle cx="505" cy="155" r="42" fill="var(--accent)" opacity="0.25" />
          {/* 有色高光（accent 色调） */}
          <ellipse
            cx="488"
            cy="138"
            rx="12"
            ry="8"
            fill="var(--accent)"
            opacity="0.6"
          />

          {/* 属性列表 */}
          <text x="385" y="225" fontSize="11" fill="var(--text-primary)">
            F0 = albedo 颜色（高，有色）
          </text>
          <text x="385" y="245" fontSize="11" fill="var(--danger)" fontWeight="600">
            漫反射 = 0（全被吸收）
          </text>
          <text x="385" y="265" fontSize="11" fill="var(--accent)" fontWeight="600">
            镜面反射 = albedo 颜色（有色）
          </text>
          <text x="385" y="282" fontSize="10" fill="var(--text-secondary)">
            k_d = 0、k_s 大
          </text>

          {/* ============ 底部总结 ============ */}
          <rect
            x="100"
            y="300"
            width="480"
            height="32"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x="340"
            y="322"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            metallic 一个参数决定 F0 来源 + 漫反射有无 → 两套全不同的着色路径
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        非金属有着色漫反射 + 低 F0 白色镜面；金属无漫反射（全吸收）+ 高 F0 有色镜面。metallic 参数在 0/1 之间切换这两种路径。
      </figcaption>
    </figure>
  );
}
