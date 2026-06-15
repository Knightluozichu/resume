/**
 * <CookTorranceSplitDiagram>：「PBR·理论」§3.4「Cook-Torrance BRDF」小节配图（HEL-162，B 数学型）。
 *
 * 把 fr = k_d * f_lambert + k_s * f_cook-torrance 拆成两半并排画：
 *  左：漫反射部分 k_d * c/pi（Lambertian，均匀散射），用绿色块表示。
 *  右：镜面反射部分 k_s * DFG/4(omega_o . n)(omega_i . n)，用蓝色块表示。
 * 中间 + 号连接，底部总结公式。
 *
 * Server Component（纯展示静态 SVG）。
 * 视觉语言：token 色 var(--accent/--success/--warning/--danger/--border/--bg/--bg-elevated/--text-primary/--text-secondary)。
 */

export function CookTorranceSplitDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 660 280"
          role="img"
          aria-label="Cook-Torrance BRDF 分解示意图。整个 BRDF fr 被拆成两部分相加：左边是漫反射部分 k_d 乘以 c 除以 pi（Lambertian 均匀散射，用绿色块表示）；右边是镜面反射部分 k_s 乘以 DFG 除以 4 倍 omega_o 点乘 n 乘以 omega_i 点乘 n（Cook-Torrance 镜面高光，用蓝色块表示）。两部分用加号连接。D 是法线分布函数，F 是菲涅尔方程，G 是几何遮蔽函数。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* 标题 */}
          <text
            x="330"
            y="28"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Cook-Torrance BRDF = 漫反射 + 镜面反射
          </text>

          {/* ============ 左块：漫反射 ============ */}
          <rect
            x="40"
            y="55"
            width="250"
            height="140"
            rx="10"
            fill="var(--success)"
            opacity="0.08"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="165"
            y="80"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--success)"
          >
            漫反射 (Lambertian)
          </text>

          {/* 公式 */}
          <text
            x="165"
            y="115"
            textAnchor="middle"
            fontSize="16"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            k_d . c / pi
          </text>

          {/* 说明 */}
          <text
            x="165"
            y="145"
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            c = 反照率颜色（albedo）
          </text>
          <text
            x="165"
            y="162"
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            除以 pi 使半球积分归一化
          </text>

          {/* 散射示意：多方向短箭头 */}
          {[150, 120, 90, 60, 30].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 165;
            const cy = 185;
            const len = 18;
            return (
              <line
                key={`diff-${i}`}
                x1={cx}
                y1={cy}
                x2={cx + len * Math.cos(rad)}
                y2={cy - len * Math.sin(rad)}
                stroke="var(--success)"
                strokeWidth="1.5"
                opacity="0.6"
              />
            );
          })}

          {/* ============ 加号 ============ */}
          <text
            x="330"
            y="135"
            textAnchor="middle"
            fontSize="28"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            +
          </text>

          {/* ============ 右块：镜面反射 ============ */}
          <rect
            x="370"
            y="55"
            width="250"
            height="140"
            rx="10"
            fill="var(--accent)"
            opacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="495"
            y="80"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--accent)"
          >
            镜面反射 (Cook-Torrance)
          </text>

          {/* 公式 */}
          <text
            x="495"
            y="115"
            textAnchor="middle"
            fontSize="15"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            k_s . DFG / 4(omega_o.n)(omega_i.n)
          </text>

          {/* D F G 三项说明 */}
          <text x="395" y="148" fontSize="10.5" fill="var(--accent)">
            D = 法线分布（微面对齐度）
          </text>
          <text x="395" y="164" fontSize="10.5" fill="var(--accent)">
            F = 菲涅尔（反射 vs 折射比例）
          </text>
          <text x="395" y="180" fontSize="10.5" fill="var(--accent)">
            G = 几何遮蔽（微面自遮挡）
          </text>

          {/* ============ 底部总公式 ============ */}
          <rect
            x="80"
            y="215"
            width="500"
            height="50"
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="330"
            y="237"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            fr = k_d . (c / pi) + k_s . (DFG / 4(omega_o . n)(omega_i . n))
          </text>
          <text
            x="330"
            y="256"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            k_s + k_d = 1（能量守恒），下面三节分别拆 D、G、F
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        BRDF 分成两项：Lambertian 漫反射（均匀散射，只含颜色 c）和
        Cook-Torrance 镜面项（D/F/G 三函数组合），两部分用 k_d + k_s = 1 守恒。
      </figcaption>
    </figure>
  );
}
