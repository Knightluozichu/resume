/**
 * <Cubemap6FacesDiagram>：「立方体贴图」§3 立方体贴图「6 面 + 方向向量采样」示意（HEL-72，C 实战型）。
 *
 * 把本章最该一眼看懂的两件事画清楚：
 *  ① 立方体贴图 = 6 张面图，按 +X/−X/+Y/−Y/+Z/−Z 贴在一个立方体的 6 个内壁
 *     —— 用「十字展开图」摊开画（上 +Y、中间一排 −X +Z +X −Z、下 −Y）。
 *  ② 采样不是用 uv，而是用一根从立方体中心射出的「方向向量」：方向指向哪个面、命中哪一点，
 *     就取那一点的颜色 —— 画一根从中心出发、命中右面 +X 某点的箭头，并把命中点高亮。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--text-primary/--text-secondary/
 * --border/--bg-elevated），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function Cubemap6FacesDiagram() {
  // 十字展开：单元格边长 + 左上角原点，方便排 6 面。
  const u = 64;
  const ox = 70;
  const oy = 40;
  // 各面在十字展开里的网格位置（列, 行）。
  const cells: { label: string; col: number; row: number; tint: string }[] = [
    { label: "+Y 上", col: 1, row: 0, tint: "var(--accent)" },
    { label: "−X 左", col: 0, row: 1, tint: "var(--text-secondary)" },
    { label: "+Z 后", col: 1, row: 1, tint: "var(--text-secondary)" },
    { label: "+X 右", col: 2, row: 1, tint: "var(--accent)" },
    { label: "−Z 前", col: 3, row: 1, tint: "var(--text-secondary)" },
    { label: "−Y 下", col: 1, row: 2, tint: "var(--text-secondary)" },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 320"
          role="img"
          aria-label="立方体贴图示意，分左右两部分。左边是立方体贴图的十字展开图：六张正方形面图按上中下排成一个十字，最上一格是正 Y 上面，中间一排从左到右是负 X 左、正 Z 后、正 X 右、负 Z 前四张面，最下一格是负 Y 下面，每格写着对应的方位。右边是一个立方体，中心射出一根方向向量箭头，箭头穿过立方体的右面命中一个点，那个点被高亮圈出，说明采样立方体贴图不是用二维 uv 坐标，而是用一根方向向量：方向指向哪个面的哪个点，就取那一点的颜色。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="cube6-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* ============ 左：6 面十字展开图 ============ */}
          <text
            x="195"
            y="24"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            一张立方体贴图 = 6 张面图
          </text>

          {cells.map((c) => {
            const x = ox + c.col * u;
            const y = oy + c.row * u;
            return (
              <g key={c.label}>
                <rect
                  x={x}
                  y={y}
                  width={u}
                  height={u}
                  rx="4"
                  fill="var(--bg)"
                  stroke={c.tint}
                  strokeWidth="1.5"
                  strokeOpacity="0.7"
                />
                <text
                  x={x + u / 2}
                  y={y + u / 2 + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill={c.tint}
                >
                  {c.label}
                </text>
              </g>
            );
          })}

          <text
            x="195"
            y="290"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            6 面贴在立方体的 6 个内壁上
          </text>

          {/* 分隔竖线 */}
          <line
            x1="400"
            y1="40"
            x2="400"
            y2="288"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ============ 右：方向向量采样立方体 ============ */}
          <text
            x="575"
            y="24"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            用「方向向量」采样
          </text>

          {/* 立方体（简单等距示意）：前面 + 顶面 + 右面 */}
          {/* 前面 */}
          <rect
            x="490"
            y="110"
            width="120"
            height="120"
            rx="4"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          {/* 顶面（斜向后） */}
          <path
            d="M490 110 L530 78 L650 78 L610 110 Z"
            fill="var(--bg-elevated)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          {/* 右面（+X，高亮色边） */}
          <path
            d="M610 110 L650 78 L650 198 L610 230 Z"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />
          <text
            x="635"
            y="160"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
            transform="rotate(-38 635 160)"
          >
            +X 右
          </text>

          {/* 中心点 */}
          <circle cx="550" cy="170" r="4" fill="var(--text-primary)" />
          <text
            x="540"
            y="186"
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            中心
          </text>

          {/* 方向向量：从中心射向右面某点（命中点高亮） */}
          <line
            x1="550"
            y1="170"
            x2="630"
            y2="142"
            stroke="var(--accent)"
            strokeWidth="2.5"
            markerEnd="url(#cube6-arrow)"
          />
          <text
            x="588"
            y="148"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            方向 R
          </text>
          {/* 命中点高亮 */}
          <circle
            cx="632"
            cy="141"
            r="6"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="632" cy="141" r="2.5" fill="var(--accent)" />

          <text
            x="575"
            y="270"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            方向指向哪个面的哪个点
          </text>
          <text
            x="575"
            y="290"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            就取那一点的颜色（不是 uv）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong>立方体贴图</strong>是 6 张面图（
        <strong>+X/−X/+Y/−Y/+Z/−Z</strong>
        ），贴在一个立方体的 6 个内壁上；采样时不用二维
        uv，而是用一根从中心射出的
        <strong>方向向量</strong>——方向指向哪个面的哪个点，就取那一点的颜色。
      </figcaption>
    </figure>
  );
}
