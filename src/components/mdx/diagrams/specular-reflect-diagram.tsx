/**
 * <SpecularReflectDiagram>：「基础光照」§3「镜面」+ §4 数学小节的核心掰碎图（HEL-51，C 实战型）。
 *
 * 把镜面高光最难「看懂」的两件事画清楚：
 *  左栏「反射几何」：一束光打到表面，按法线 N 镜像反射出一条反射方向 R（reflect(-L, N)）；
 *    若观察方向 V 正好贴着 R，眼睛就接到强高光；V 偏离 R 越远，看到的高光越弱。
 *    画出：水平表面、法线 N、入射的指向光源方向 L、反射方向 R、观察方向 V、R 与 V 的夹角 α，
 *    并标「V 越贴近 R 越亮」。入射角 = 反射角（关于 N 对称）用两段等角弧示意。
 *  右栏「反光度 shininess」：同一个 R·V 关系，pow(R·V, n) 的指数 n 越大，高光斑越小越锐。
 *    用两条亮度随角度衰减曲线（n 小=宽而钝，n 大=窄而尖）+ 表面上两块高光斑（大/小）对照。
 *
 * 配合 §4「spec = pow(max(dot(R, V), 0), shininess)」公式一起读：图给几何与「指数=锐度」直觉。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--danger/--border/
 * --bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角（硬规则 5）。
 */

export function SpecularReflectDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 660 360"
          role="img"
          aria-label="镜面高光的几何直觉，分两栏。左栏「反射几何」：一束指向光源方向 L 的光打到水平表面，关于法线 N 镜像反射出反射方向 R，入射角等于反射角；观察方向 V 越贴近 R，眼睛接到的高光越强，V 偏离 R 越远高光越弱。右栏「反光度」：高光强度按 R 点乘 V 的指数次方衰减，指数 shininess 越大，衰减越快，高光斑越小越锐；指数小则高光斑大而钝。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          <defs>
            <marker
              id="spec-arrow-accent"
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
              id="spec-arrow-warning"
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
              id="spec-arrow-success"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--success)" />
            </marker>
            <marker
              id="spec-arrow-danger"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--danger)" />
            </marker>
          </defs>

          {/* ============ 左栏：反射几何 ============ */}
          <text
            x="165"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            反射几何：V 越贴近 R 越亮
          </text>

          {/* 表面 + 命中点 P (165,250) */}
          <rect
            x="55"
            y="250"
            width="220"
            height="20"
            fill="var(--border)"
            opacity="0.35"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <circle cx="165" cy="250" r="3.5" fill="var(--text-primary)" />

          {/* 法线 N：竖直向上 */}
          <line
            x1="165"
            y1="250"
            x2="165"
            y2="120"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeDasharray="5 4"
            markerEnd="url(#spec-arrow-accent)"
          />
          <text x="172" y="128" fontSize="12" fill="var(--accent)">
            N
          </text>

          {/* L：指向光源（左上方），warning */}
          <line
            x1="165"
            y1="250"
            x2="70"
            y2="135"
            stroke="var(--warning)"
            strokeWidth="2.5"
            markerEnd="url(#spec-arrow-warning)"
          />
          <text x="56" y="128" fontSize="12" fill="var(--warning)">
            L
          </text>

          {/* R：反射方向（右上方，关于 N 与 L 对称），success */}
          <line
            x1="165"
            y1="250"
            x2="260"
            y2="135"
            stroke="var(--success)"
            strokeWidth="2.5"
            markerEnd="url(#spec-arrow-success)"
          />
          <text x="262" y="132" fontSize="12" fill="var(--success)">
            R（反射）
          </text>

          {/* V：观察方向，略偏离 R（夹角 α），danger */}
          <line
            x1="165"
            y1="250"
            x2="230"
            y2="118"
            stroke="var(--danger)"
            strokeWidth="2.5"
            markerEnd="url(#spec-arrow-danger)"
          />
          <text x="200" y="108" fontSize="12" fill="var(--danger)">
            V（看向）
          </text>

          {/* 入射角 = 反射角：两段等角弧（关于 N 对称） */}
          <path
            d="M125 190 A 75 75 0 0 1 165 175"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.3"
          />
          <path
            d="M165 175 A 75 75 0 0 1 205 190"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.3"
          />
          {/* R 与 V 的小夹角 α */}
          <text x="232" y="160" fontSize="11" fill="var(--danger)">
            α
          </text>

          <text
            x="165"
            y="298"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            入射角 = 反射角（关于 N 对称）
          </text>
          <text
            x="165"
            y="318"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            R·V 越大（α 越小）→ 高光越强
          </text>

          {/* 分隔竖线 */}
          <line
            x1="330"
            y1="40"
            x2="330"
            y2="335"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ============ 右栏：反光度 shininess ============ */}
          <text
            x="495"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            反光度：指数越大 → 高光越小越锐
          </text>

          {/* 坐标轴：横=偏离角 α（R·V 由大到小），纵=高光强度 */}
          <line
            x1="375"
            y1="200"
            x2="615"
            y2="200"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <line
            x1="375"
            y1="200"
            x2="375"
            y2="70"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text x="618" y="204" fontSize="10" fill="var(--text-secondary)">
            偏离 R →
          </text>
          <text
            x="372"
            y="64"
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            高光
          </text>

          {/* 低指数曲线（宽而钝）：warning */}
          <path
            d="M375 80 C 430 92, 480 150, 615 196"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="2.5"
          />
          <text x="470" y="120" fontSize="11" fill="var(--warning)">
            指数小：宽而钝
          </text>

          {/* 高指数曲线（窄而尖）：accent */}
          <path
            d="M375 80 C 392 84, 405 150, 430 196"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <text x="408" y="186" fontSize="11" fill="var(--accent)">
            指数大：窄而尖
          </text>

          {/* 两块高光斑对照：大 vs 小 */}
          <text
            x="430"
            y="240"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            大斑
          </text>
          <ellipse
            cx="430"
            cy="270"
            rx="34"
            ry="20"
            fill="var(--border)"
            opacity="0.45"
          />
          <circle
            cx="430"
            cy="270"
            r="20"
            fill="var(--warning)"
            opacity="0.55"
          />

          <text
            x="560"
            y="240"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            小斑
          </text>
          <ellipse
            cx="560"
            cy="270"
            rx="34"
            ry="20"
            fill="var(--border)"
            opacity="0.45"
          />
          <circle cx="560" cy="270" r="8" fill="var(--accent)" opacity="0.9" />

          <text
            x="495"
            y="318"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            pow(R·V, n)：n 越大衰减越快，斑越小越亮
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        镜面高光看反射：光按法线 N 镜像反射出方向 R（入射角=反射角），观察方向 V
        越贴近 R（R·V 越大、夹角 α 越小）高光越强。反光度
        <code>shininess</code> 就是 <code>pow(R·V, n)</code> 的指数 n：n
        越大，高光斑越小越锐、越像抛光金属；n 小则斑大而钝、像哑光塑料。
      </figcaption>
    </figure>
  );
}
