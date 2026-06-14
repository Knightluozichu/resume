/**
 * <SkyboxDiagram>：「立方体贴图」§3 天空盒「去平移」示意（HEL-72，C 实战型）。
 *
 * 把「为什么天空盒要去掉位移」一眼讲清：左右两栏对照——
 *  左（错）：天空盒跟着相机位移走，相机一移动盒子也平移，盒壁会糊到脸上 / 穿模。
 *  右（对）：去掉位移（mat3(view)），天空盒只随相机旋转、不随位移，永远以相机为中心、
 *    在最远处当背景，相机怎么走都到不了盒边。
 * 用「相机小人 + 一圈盒壁 + 移动箭头」表达两种情形。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--danger/--success/--border/
 * --bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function SkyboxDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 320"
          role="img"
          aria-label="天空盒去平移对照，分左右两栏。左栏标错误：天空盒跟着相机一起平移，画着一个相机，相机向右移动了一段距离，方框天空盒也跟着右移，结果相机靠近了右边的盒壁、盒壁糊到脸上，用红色标注问题。右栏标正确：去掉位移后，天空盒只随相机旋转、不随位移，相机始终在天空盒正中心，无论相机往哪走，盒子都跟着平移使相机永远居中、盒壁永远在最远处当背景，用绿色标注。结论是给观察矩阵只保留旋转、去掉位移，写成 mat4(mat3(view))。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="sky-arrow-danger"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--danger)" />
            </marker>
            <marker
              id="sky-arrow-success"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* ============ 左栏：错（天空盒跟着位移） ============ */}
          <text
            x="180"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--danger)"
          >
            ✗ 没去平移：盒子跟着相机移
          </text>

          {/* 原位置盒壁（淡） */}
          <rect
            x="60"
            y="60"
            width="170"
            height="150"
            rx="6"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {/* 相机起点（盒中心） */}
          <circle
            cx="145"
            cy="135"
            r="9"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
          />
          {/* 移动后的盒壁（右移，实线） */}
          <rect
            x="130"
            y="60"
            width="170"
            height="150"
            rx="6"
            fill="none"
            stroke="var(--danger)"
            strokeWidth="1.5"
            strokeOpacity="0.85"
          />
          {/* 移动后的相机：靠到了右壁附近 */}
          <circle cx="215" cy="135" r="9" fill="var(--danger)" />
          {/* 相机移动箭头 */}
          <line
            x1="156"
            y1="135"
            x2="204"
            y2="135"
            stroke="var(--danger)"
            strokeWidth="2"
            markerEnd="url(#sky-arrow-danger)"
          />
          <text
            x="180"
            y="244"
            textAnchor="middle"
            fontSize="11"
            fill="var(--danger)"
          >
            相机移动 → 盒壁糊到脸上 / 穿模
          </text>
          <text
            x="180"
            y="266"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            view 带着位移，天空盒被一起平移
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

          {/* ============ 右栏：对（去平移） ============ */}
          <text
            x="540"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--success)"
          >
            ✓ 去平移：盒子永远以相机为中心
          </text>

          {/* 盒壁（始终把相机罩在正中） */}
          <rect
            x="455"
            y="60"
            width="170"
            height="150"
            rx="6"
            fill="none"
            stroke="var(--success)"
            strokeWidth="1.5"
            strokeOpacity="0.85"
          />
          {/* 相机（始终居中） */}
          <circle cx="540" cy="135" r="9" fill="var(--success)" />
          {/* 「想往右走」箭头，但盒子跟着平移使相机仍居中（画一对同向虚线表示一起动） */}
          <line
            x1="551"
            y1="135"
            x2="595"
            y2="135"
            stroke="var(--text-secondary)"
            strokeWidth="2"
            strokeDasharray="4 3"
            markerEnd="url(#sky-arrow-success)"
          />
          <text
            x="540"
            y="244"
            textAnchor="middle"
            fontSize="11"
            fill="var(--success)"
          >
            相机怎么走，盒子都跟着、永远居中
          </text>
          <text
            x="540"
            y="266"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            view 只留旋转、去掉位移 → 永在最远处
          </text>

          {/* 底部结论条 */}
          <text
            x="540"
            y="294"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            做法：mat4(mat3(view))
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong>天空盒去平移</strong>：取观察矩阵的 3×3 部分
        <code>mat3(view)</code>（只保留旋转、丢掉位移），天空盒就只随相机
        <strong>旋转</strong>、不随<strong>位移</strong>
        ——永远以相机为中心、在最远处当背景。不去平移，相机一移动盒壁就会糊到脸上。
      </figcaption>
    </figure>
  );
}
