/**
 * <TextureCoordDiagram>：「纹理」§3「纹理坐标(UV)」小节的核心掰碎图（HEL-34）。
 *
 * 把「纹理坐标怎么把一张图贴到几何上」这件最绕的事画清楚——左边是一张纹理图像，
 * 标出 UV 坐标系：原点 (0,0) 在左下角、(1,1) 在右上角（这正是小白最易记反的地方，
 * 与屏幕「左上为原点」相反，故显式画出箭头与四角标注）。右边是一个被贴图的 quad
 * （两三角形拼成的方块），四个顶点各携带一组 UV：左下 (0,0)、右下 (1,0)、
 * 右上 (1,1)、左上 (0,1)——一一对应到左图的四角。中间一条紫色箭头标「按 UV 采样」。
 *
 * 三句话语义：①顶点上「钉」了 UV（逐顶点指定）；②UV 把顶点对到纹理图的某个位置；
 * ③三角形内部片段的 UV 由顶点 UV 插值得来，再据此到纹理图上「取色」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--border/--bg/--bg-elevated/
 * --text-primary/--text-secondary），无阴影、rx 圆角（硬规则 5）。纹理图用一个棋盘
 * 格 + 中心圆的纯矢量「示意图」（呼应主 Demo 默认的 UV 测试图气质），仅作示意。
 */

export function TextureCoordDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 640 320"
          role="img"
          aria-label="左边是一张纹理图像，它的坐标系原点 (0,0) 在左下角、(1,1) 在右上角；右边是一个被贴图的方块，四个顶点各携带一组纹理坐标：左下顶点 (0,0)、右下 (1,0)、右上 (1,1)、左上 (0,1)，分别对应纹理图像的四个角。三角形内部片段的坐标由顶点坐标插值得到，再据此到纹理图上采样取色。"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <defs>
            {/* 4×4 棋盘格作纹理「示意图」（与主 Demo 默认 UV 测试图气质呼应，仅示意） */}
            <pattern
              id="texcoord-checker"
              width="35"
              height="35"
              patternUnits="userSpaceOnUse"
            >
              <rect width="35" height="35" fill="var(--bg)" />
              <rect width="17.5" height="17.5" fill="var(--border)" />
              <rect
                x="17.5"
                y="17.5"
                width="17.5"
                height="17.5"
                fill="var(--border)"
              />
            </pattern>
          </defs>

          {/* —— 左：纹理图像 + UV 坐标系 —— */}
          <text
            x="105"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            纹理图像（UV 坐标系）
          </text>

          {/* 纹理方块（140×140），其内部就是 0..1 的 UV 空间 */}
          <rect
            x="40"
            y="50"
            width="140"
            height="140"
            fill="url(#texcoord-checker)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          {/* 中心紫圆（呼应 Demo 默认测试图的中心圆，便于「看出贴上去后转了没」） */}
          <circle
            cx="110"
            cy="120"
            r="24"
            fill="var(--accent)"
            opacity="0.85"
          />

          {/* UV 轴：U 向右、V 向上（原点在左下角！） */}
          <line
            x1="40"
            y1="190"
            x2="196"
            y2="190"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <path d="M196 190 l-10 -5 l0 10 z" fill="var(--accent)" />
          <text x="200" y="194" fontSize="11" fill="var(--accent)">
            U
          </text>
          <line
            x1="40"
            y1="190"
            x2="40"
            y2="44"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <path d="M40 44 l-5 10 l10 0 z" fill="var(--accent)" />
          <text x="26" y="40" fontSize="11" fill="var(--accent)">
            V
          </text>

          {/* 四角 UV 标注（原点在左下角，与屏幕左上原点相反——小白易记反处） */}
          <text x="14" y="206" fontSize="11" fill="var(--text-primary)">
            (0,0)
          </text>
          <text x="150" y="206" fontSize="11" fill="var(--text-secondary)">
            (1,0)
          </text>
          <text x="150" y="46" fontSize="11" fill="var(--text-secondary)">
            (1,1)
          </text>
          <text x="14" y="58" fontSize="11" fill="var(--text-secondary)">
            (0,1)
          </text>
          <text
            x="110"
            y="226"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            原点在左下角
          </text>

          {/* —— 中：按 UV 采样 —— */}
          <line
            x1="250"
            y1="120"
            x2="326"
            y2="120"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <path d="M326 120 l-12 -6 l0 12 z" fill="var(--accent)" />
          <text
            x="288"
            y="108"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            按 UV
          </text>
          <text
            x="288"
            y="140"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            采样取色
          </text>

          {/* —— 右：被贴图的方块（两三角形），四顶点各带 UV —— */}
          <text
            x="500"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            方块的四个顶点（各带一组 UV）
          </text>

          {/* quad = 两个三角形，画出对角线强调「方块由三角形拼成」 */}
          <rect
            x="430"
            y="50"
            width="140"
            height="140"
            fill="url(#texcoord-checker)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle
            cx="500"
            cy="120"
            r="24"
            fill="var(--accent)"
            opacity="0.85"
          />
          <line
            x1="430"
            y1="190"
            x2="570"
            y2="50"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeDasharray="4 3"
            opacity="0.7"
          />

          {/* 四个顶点：实心点 + 该点携带的 UV（与左图四角一一对应） */}
          <circle cx="430" cy="190" r="5" fill="var(--accent)" />
          <text x="404" y="208" fontSize="11" fill="var(--text-primary)">
            (0,0)
          </text>
          <circle cx="570" cy="190" r="5" fill="var(--accent)" />
          <text x="558" y="208" fontSize="11" fill="var(--text-secondary)">
            (1,0)
          </text>
          <circle cx="570" cy="50" r="5" fill="var(--accent)" />
          <text x="558" y="46" fontSize="11" fill="var(--text-secondary)">
            (1,1)
          </text>
          <circle cx="430" cy="50" r="5" fill="var(--accent)" />
          <text x="404" y="46" fontSize="11" fill="var(--text-secondary)">
            (0,1)
          </text>
          <text
            x="500"
            y="226"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            顶点上「钉」了 UV，中间靠插值
          </text>

          {/* —— 底部一句话总括 —— */}
          <text
            x="320"
            y="270"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            UV 就是「这个点该取纹理图哪个位置」的地址
          </text>
          <text
            x="320"
            y="294"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            顶点 UV 一一对到纹理四角；三角形内部片段的 UV
            由顶点插值得来，再据此取色。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        纹理坐标（UV）原点在左下角 (0,0)、右上为 (1,1)。每个顶点「钉」一组
        UV，把它对应到纹理图像上的某个位置；三角形内部每个片段的 UV 由顶点 UV
        插值得到，再据此到纹理图上采样取色——这就是「贴图」的本质。
      </figcaption>
    </figure>
  );
}
