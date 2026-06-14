/**
 * <ReflectionRefractionDiagram>：「立方体贴图」§4 反射/折射几何对照（HEL-72，C 实战型）。
 *
 * 把 reflect 与 refract 的几何差别并排画清：
 *  左（反射）：入射向量 I 打到表面，法线 N，反射向量 R = reflect(I, N) 关于法线「对称弹出」
 *    （入射角 = 反射角），R 指向环境、用来采样立方体贴图 → 镜面。
 *  右（折射）：入射向量 I 穿过界面进入介质，按折射率比 ratio = n1/n2「被弯折」，
 *    R = refract(I, N, ratio) 指向介质里偏折后的方向 → 玻璃/水里看到弯折的环境。
 * 标出入射角 θ1、折射角 θ2 与「弯向法线 / 弯离法线」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--warning/--success/--border/
 * --bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function ReflectionRefractionDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 320"
          role="img"
          aria-label="反射与折射几何对照，分左右两栏。左栏反射：一束入射向量 I 打到一个水平表面上的命中点，命中点立着一根法线 N。反射向量 R 关于法线对称地弹回上方，入射角等于反射角，反射向量指向环境，用来采样立方体贴图，做出镜面反射。右栏折射：同样一束入射向量 I 打到界面，但这次穿过界面进入下方的介质，方向被弯折，折射向量 R 偏向另一侧，标出入射角 theta 1 大于折射角 theta 2，说明光线进入更密的介质时弯向法线，折射向量指向介质里被弯折的方向，用来采样立方体贴图，做出玻璃透视效果。折射的弯折程度由折射率比 ratio 等于 n1 除以 n2 决定。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="rr-arrow-warning"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--warning)" />
            </marker>
            <marker
              id="rr-arrow-accent"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
            <marker
              id="rr-arrow-normal"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* ============ 左栏：反射 reflect ============ */}
          <text
            x="180"
            y="26"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            反射 R = reflect(I, N)
          </text>

          {/* 表面线 */}
          <line
            x1="50"
            y1="190"
            x2="310"
            y2="190"
            stroke="var(--border)"
            strokeWidth="2"
          />
          {/* 命中点 */}
          <circle cx="180" cy="190" r="4" fill="var(--text-primary)" />
          {/* 法线 N（竖直向上） */}
          <line
            x1="180"
            y1="190"
            x2="180"
            y2="78"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            strokeDasharray="5 3"
            markerEnd="url(#rr-arrow-normal)"
          />
          <text
            x="188"
            y="86"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            N
          </text>
          {/* 入射 I：从左上打到命中点 */}
          <line
            x1="88"
            y1="92"
            x2="180"
            y2="190"
            stroke="var(--warning)"
            strokeWidth="2.5"
            markerEnd="url(#rr-arrow-warning)"
          />
          <text
            x="92"
            y="120"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            I 入射
          </text>
          {/* 反射 R：关于法线对称弹到右上 */}
          <line
            x1="180"
            y1="190"
            x2="272"
            y2="92"
            stroke="var(--accent)"
            strokeWidth="2.5"
            markerEnd="url(#rr-arrow-accent)"
          />
          <text
            x="246"
            y="116"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            R 反射
          </text>
          {/* 角标注 */}
          <text
            x="180"
            y="232"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            入射角 = 反射角（对称弹出）
          </text>
          <text
            x="180"
            y="254"
            textAnchor="middle"
            fontSize="11"
            fill="var(--accent)"
          >
            用 R 采样环境 → 镜面反射
          </text>

          {/* 分隔竖线 */}
          <line
            x1="360"
            y1="44"
            x2="360"
            y2="288"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ============ 右栏：折射 refract ============ */}
          <text
            x="540"
            y="26"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            折射 R = refract(I, N, ratio)
          </text>

          {/* 界面线 + 下方介质底色 */}
          <rect
            x="410"
            y="190"
            width="260"
            height="78"
            fill="var(--accent)"
            opacity="0.07"
          />
          <line
            x1="410"
            y1="190"
            x2="670"
            y2="190"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text x="416" y="210" fontSize="10" fill="var(--text-secondary)">
            介质（如玻璃 n₂=1.52）
          </text>
          <text x="416" y="184" fontSize="10" fill="var(--text-secondary)">
            空气 n₁=1.00
          </text>
          {/* 命中点 */}
          <circle cx="540" cy="190" r="4" fill="var(--text-primary)" />
          {/* 法线 N（上下都画虚线，便于看入射/折射角） */}
          <line
            x1="540"
            y1="190"
            x2="540"
            y2="78"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            strokeDasharray="5 3"
            markerEnd="url(#rr-arrow-normal)"
          />
          <line
            x1="540"
            y1="190"
            x2="540"
            y2="262"
            stroke="var(--text-secondary)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text
            x="548"
            y="86"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            N
          </text>
          {/* 入射 I：从左上打到命中点（与左栏同角度） */}
          <line
            x1="448"
            y1="92"
            x2="540"
            y2="190"
            stroke="var(--warning)"
            strokeWidth="2.5"
            markerEnd="url(#rr-arrow-warning)"
          />
          <text
            x="452"
            y="120"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            I 入射
          </text>
          {/* 折射 R：穿过界面、弯向法线（折射角更小） */}
          <line
            x1="540"
            y1="190"
            x2="576"
            y2="262"
            stroke="var(--accent)"
            strokeWidth="2.5"
            markerEnd="url(#rr-arrow-accent)"
          />
          <text
            x="582"
            y="248"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            R 折射
          </text>
          {/* 角标注 */}
          <text
            x="540"
            y="294"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            进更密介质：弯向法线（θ₁ &gt; θ₂），弯折量由 ratio = n₁/n₂ 定
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong>反射</strong>：<code>R = reflect(I, N)</code>
        关于法线对称弹出（入射角 = 反射角），用 R 采样环境 → 像镜子。
        <strong>折射</strong>：<code>R = refract(I, N, ratio)</code>
        穿过界面被弯折，弯折程度由折射率比 <code>ratio = n₁/n₂</code>
        决定（进更密介质弯向法线），用 R 采样环境 → 像玻璃。
      </figcaption>
    </figure>
  );
}
