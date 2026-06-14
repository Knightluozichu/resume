/**
 * <TBNDiagram>：「高级光照·法线贴图」§3「切线空间 / TBN」小节的核心掰碎图（HEL-84，C 实战型）。
 *
 * 把「切线空间的三个轴 T / B / N」这件最难看懂的事画清楚：一个表面（画成一块带透视的平面），
 * 表面上的某一点处立起三个互相垂直的箭头：
 *  - T（切线 tangent，accent 紫）：沿纹理 U 方向、贴着表面躺着
 *  - B（副切线 bitangent，success 绿）：沿纹理 V 方向、也贴着表面，与 T 垂直
 *  - N（法线 normal，warning 黄）：垂直于表面、朝外
 * 三个轴构成一组「以表面自身为参照」的局部坐标系 = 切线空间；T、B、N 当作矩阵三列就是 TBN 矩阵。
 *
 * 直觉落点：法线图里存的法线，不是相对世界、而是相对「这块表面自己」存的；要把它和世界空间的
 * 光/视向量放一起算光照，就得靠 T、B、N 这三个轴在两个空间之间换算（TBN 矩阵）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--border/
 * --bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function TBNDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 640 380"
          role="img"
          aria-label="一块带透视的表面平面，沿纹理 U、V 方向铺开。表面上某一点立起三个互相垂直的箭头：切线 T 沿纹理 U 方向贴着表面、副切线 B 沿纹理 V 方向也贴着表面且与 T 垂直、法线 N 垂直于表面朝外。三个轴构成一组以表面自身为参照的局部坐标系，叫切线空间；把 T、B、N 三个轴当作矩阵的三列就组成 TBN 矩阵，用来在切线空间和世界空间之间换算向量。"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <defs>
            <marker
              id="tbn-arrow-accent"
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
              id="tbn-arrow-success"
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
              id="tbn-arrow-warning"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--warning)" />
            </marker>
          </defs>

          <text
            x="320"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            切线空间：以表面自己为参照的三个轴 T / B / N
          </text>

          {/* 带透视的表面平面（一块斜放的四边形，示意躺在 3D 里的表面）。
              四角：左后(150,150) 右后(470,120) 右前(560,250) 左前(190,300)。 */}
          <polygon
            points="150,150 470,120 560,250 190,300"
            fill="var(--border)"
            opacity="0.3"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          {/* 表面纹理网格线（示意 U、V 方向铺开），沿两组边方向各画几条 */}
          {/* 沿 U 方向（左→右）的横线 */}
          <line
            x1="180"
            y1="200"
            x2="540"
            y2="173"
            stroke="var(--border)"
            strokeWidth="0.8"
            opacity="0.6"
          />
          <line
            x1="170"
            y1="250"
            x2="550"
            y2="212"
            stroke="var(--border)"
            strokeWidth="0.8"
            opacity="0.6"
          />
          {/* 沿 V 方向（后→前）的竖线 */}
          <line
            x1="257"
            y1="143"
            x2="297"
            y2="293"
            stroke="var(--border)"
            strokeWidth="0.8"
            opacity="0.6"
          />
          <line
            x1="364"
            y1="135"
            x2="404"
            y2="285"
            stroke="var(--border)"
            strokeWidth="0.8"
            opacity="0.6"
          />

          {/* 锚点 P：三个轴的共同起点（落在表面中间偏前） */}
          <circle cx="320" cy="220" r="4" fill="var(--text-primary)" />
          <text x="300" y="240" fontSize="11" fill="var(--text-secondary)">
            P（表面上一点）
          </text>

          {/* T：切线，沿 U 方向、贴着表面（指向右、略上，跟横向网格线同走向），accent 紫 */}
          <line
            x1="320"
            y1="220"
            x2="470"
            y2="205"
            stroke="var(--accent)"
            strokeWidth="2.8"
            markerEnd="url(#tbn-arrow-accent)"
          />
          <text
            x="478"
            y="205"
            fontSize="13"
            fontWeight="600"
            fill="var(--accent)"
          >
            T
          </text>
          <text x="476" y="221" fontSize="10" fill="var(--accent)">
            切线（沿 U）
          </text>

          {/* B：副切线，沿 V 方向、贴着表面（指向前下，跟竖向网格线同走向），success 绿 */}
          <line
            x1="320"
            y1="220"
            x2="355"
            y2="330"
            stroke="var(--success)"
            strokeWidth="2.8"
            markerEnd="url(#tbn-arrow-success)"
          />
          <text
            x="360"
            y="338"
            fontSize="13"
            fontWeight="600"
            fill="var(--success)"
          >
            B
          </text>
          <text x="372" y="338" fontSize="10" fill="var(--success)">
            副切线（沿 V）
          </text>

          {/* N：法线，垂直于表面、朝外（竖直向上），warning 黄 */}
          <line
            x1="320"
            y1="220"
            x2="320"
            y2="80"
            stroke="var(--warning)"
            strokeWidth="2.8"
            markerEnd="url(#tbn-arrow-warning)"
          />
          <text
            x="328"
            y="86"
            fontSize="13"
            fontWeight="600"
            fill="var(--warning)"
          >
            N
          </text>
          <text x="328" y="102" fontSize="10" fill="var(--warning)">
            法线（垂直表面）
          </text>

          {/* TBN 矩阵注脚：三个轴当三列 */}
          <text
            x="320"
            y="368"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            三个轴当矩阵三列 → TBN 矩阵（[ T | B | N ]）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        表面上每一点都能立起三个互相垂直的轴：<strong>切线 T</strong>（沿纹理 U
        方向）、<strong>副切线 B</strong>（沿纹理 V 方向）、
        <strong>法线 N</strong>
        （垂直表面朝外）。它们组成一组「以表面自己为参照」的
        <strong>切线空间</strong>；把 T、B、N 当作矩阵三列拼起来，就是
        <strong>TBN 矩阵</strong>——在切线空间和世界 /
        视空间之间换算向量靠的就是它。
      </figcaption>
    </figure>
  );
}
