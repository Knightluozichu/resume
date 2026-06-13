/**
 * <VertexPipelineDiagram>：「你好三角形」§3 的「顶点数据如何变成三角形」示意图（HEL-32）。
 *
 * 取代原先误用首页跑车海报当占位图的 <Figure src="/hero-poster.webp" .../>。
 * 准确表达本章三个关键角色 + 数据流向：
 *   ① 顶点数组（内存里一串裸 float） —glBufferData→
 *   ② VBO（显存料仓，存这串字节） ——VAO 按属性指针解读——→
 *   ③ VAO（说明书：每顶点几字节、从哪读、读几个） —交给→
 *   ④ 着色器（顶点→片段） —画出→
 *   ⑤ 三角形（屏幕上的成品）
 * 下方单独画一条「属性指针」尺子，标出 stride / offset / size，把 §3 文字讲的
 * vertexAttribPointer 参数（每顶点 12 字节、偏移 0、读 3 个 float）变成可见的图。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与 setup-pipeline-diagram.tsx / frame-stage-diagram.tsx / stepper.tsx 一致：
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary /
 * --text-secondary），简洁线框、rx 圆角、无阴影（硬规则 5）。
 * 响应式：max-width 居中、宽度自适应正文栏。
 */

export function VertexPipelineDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 640 360"
          role="img"
          aria-label="顶点数据从内存里的顶点数组上传进 VBO 料仓，VAO 这张说明书按属性指针（每顶点 12 字节、偏移 0、读 3 个 float）解读 VBO，交给着色器，最终画出三角形；下方一条尺子标出属性指针的步长与偏移"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ① 顶点数组（内存里的裸 float 串） */}
          <rect
            x="24"
            y="36"
            width="150"
            height="78"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="99"
            y="60"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            ① 顶点数组
          </text>
          <text
            x="99"
            y="80"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            内存里一串
          </text>
          <text
            x="99"
            y="98"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
            fontFamily="monospace"
          >
            float[9]
          </text>

          {/* ① → ② 上传 */}
          <line
            x1="174"
            y1="75"
            x2="226"
            y2="75"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M226 75 l-10 -5 l0 10 z" fill="var(--accent)" />
          <text
            x="200"
            y="65"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            上传
          </text>

          {/* ② VBO（显存料仓） */}
          <rect
            x="228"
            y="36"
            width="150"
            height="78"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="303"
            y="60"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            ② VBO
          </text>
          <text
            x="303"
            y="80"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            显存料仓
          </text>
          <text
            x="303"
            y="98"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            （存这串字节）
          </text>

          {/* ③ VAO（说明书）—放在 VBO 下方，用大括号关系连过去 */}
          <rect
            x="228"
            y="158"
            width="150"
            height="86"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="303"
            y="184"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            ③ VAO
          </text>
          <text
            x="303"
            y="204"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            说明书：怎么读
          </text>
          <text
            x="303"
            y="222"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            VBO 里的字节
          </text>

          {/* ② → ③ VAO 解读 VBO（竖向） */}
          <line
            x1="303"
            y1="114"
            x2="303"
            y2="156"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M303 156 l-5 -10 l10 0 z" fill="var(--accent)" />
          <text x="313" y="138" fontSize="11" fill="var(--text-secondary)">
            按属性指针解读
          </text>

          {/* ③ → ④ 交给着色器 */}
          <line
            x1="378"
            y1="201"
            x2="430"
            y2="201"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M430 201 l-10 -5 l0 10 z" fill="var(--accent)" />

          {/* ④ 着色器 */}
          <rect
            x="432"
            y="158"
            width="92"
            height="86"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="478"
            y="194"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            ④ 着色器
          </text>
          <text
            x="478"
            y="214"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            顶点 → 片段
          </text>

          {/* ④ → ⑤ 画出 */}
          <line
            x1="524"
            y1="201"
            x2="552"
            y2="201"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M552 201 l-10 -5 l0 10 z" fill="var(--accent)" />

          {/* ⑤ 三角形成品 */}
          <polygon
            points="592,166 564,232 620,232"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <text
            x="592"
            y="252"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            ⑤ 三角形
          </text>

          {/* 属性指针「尺子」：把 §3 文字里的 stride/offset/size 画成可见的字节格 */}
          <text
            x="24"
            y="290"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            属性指针：怎么从字节流里切出一个个顶点
          </text>
          {/* 三个顶点 × 每顶点 3 个 float（共 9 格），紫色框出第一个顶点 */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <g key={i}>
              <rect
                x={24 + i * 64}
                y="304"
                width="62"
                height="30"
                rx="3"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1.5"
              />
              <text
                x={24 + i * 64 + 31}
                y="324"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
                fontFamily="monospace"
              >
                {["x", "y", "z"][i % 3]}
              </text>
            </g>
          ))}
          {/* 框出第一个顶点（前 3 格 = 一个顶点 = stride 12 字节） */}
          <rect
            x="22"
            y="302"
            width="194"
            height="34"
            rx="4"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="119"
            y="350"
            textAnchor="middle"
            fontSize="11"
            fill="var(--accent)"
          >
            1 个顶点 = 3 个 float = 12 字节（这就是步长 stride）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        ① 内存里的顶点数组上传进 ② 显存里的 VBO 料仓；③ VAO
        是「说明书」，按属性指针（每顶点 3 个 float、共 12 字节、从第 0
        字节起读）解读这串字节，交给 ④ 着色器，最终画出 ⑤
        三角形。下方尺子把「步长 / 偏移 / 每次读几个」画成了可见的字节格。
      </figcaption>
    </figure>
  );
}
