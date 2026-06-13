/**
 * <MeshDataLayoutDiagram>：「网格 Mesh」§5「setupMesh / 顶点属性指针」核心掰碎图（HEL-60，C 实战型）。
 *
 * 把「一个 Vertex 结构体 → 在 VBO 里 interleaved 连续排放 → offsetof/stride 怎么对应」画清楚，
 * 上中下三层：
 *  ①上层「Vertex 结构体」：Position(vec3) / Normal(vec3) / TexCoords(vec2) 三块挨着的字段，
 *    各标字节宽度（12 / 12 / 8），整包 sizeof(Vertex)=32。
 *  ②中层「VBO 一条连续内存」：顶点0 的 P|N|T、顶点1 的 P|N|T…一个接一个（interleaved），
 *    在顶点0 上标 offsetof：Position@0、Normal@12、TexCoords@24，并标 stride=32 跨到下一个顶点。
 *  ③下层「indices → EBO」：一串索引 0,1,2,2,3,0 排进 EBO，说明它只存「用哪几个顶点、按什么顺序连三角形」。
 *
 * 一句话语义：因为结构体在内存里是连续 interleaved 的，offsetof 让我们不用手算每个属性的字节偏移。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--border/--bg/--bg-elevated/
 * --text-primary/--text-secondary/--warning），无阴影、rx 圆角（硬规则 5）。
 */

export function MeshDataLayoutDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 470"
          role="img"
          aria-label="顶点数据在内存里怎么排放，分上中下三层。上层是一个 Vertex 结构体，里面三个字段挨着放：Position 占 12 字节、Normal 占 12 字节、TexCoords 占 8 字节，整个结构体一共 32 字节。中层是显存里的 VBO，它把一个个顶点的数据首尾相连地放在一条连续内存上：顶点0 的位置、法线、纹理坐标，紧接着顶点1 的位置、法线、纹理坐标，依此类推，这种各属性交错挨着放的方式叫 interleaved。在顶点0 上标出每个属性的字节偏移：Position 从第 0 字节开始，Normal 从第 12 字节开始，TexCoords 从第 24 字节开始；从一个顶点跨到下一个顶点的步长 stride 是 32 字节，正好等于结构体大小。这些偏移和步长就是 offsetof(Vertex, Normal)、offsetof(Vertex, TexCoords) 和 sizeof(Vertex) 算出来的，不用手数。下层是索引缓冲 EBO：一串索引比如 0,1,2,2,3,0，它只记录用哪几个顶点、按什么顺序连成三角形。结论：因为结构体在内存里连续交错排放，offsetof 让我们不必手算每个属性的字节偏移。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ============ 上层：Vertex 结构体 ============ */}
          <text
            x="360"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            一个 Vertex 结构体（interleaved：三块字段挨着放）
          </text>

          {/* Position 块 (12B) */}
          <rect
            x="150"
            y="46"
            width="150"
            height="46"
            fill="var(--accent)"
            opacity="0.30"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="225"
            y="68"
            textAnchor="middle"
            fontSize="12"
            fontFamily="monospace"
            fill="var(--text-primary)"
          >
            Position
          </text>
          <text
            x="225"
            y="84"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            vec3 · 12 字节
          </text>

          {/* Normal 块 (12B) */}
          <rect
            x="300"
            y="46"
            width="150"
            height="46"
            fill="var(--accent)"
            opacity="0.18"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="375"
            y="68"
            textAnchor="middle"
            fontSize="12"
            fontFamily="monospace"
            fill="var(--text-primary)"
          >
            Normal
          </text>
          <text
            x="375"
            y="84"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            vec3 · 12 字节
          </text>

          {/* TexCoords 块 (8B) */}
          <rect
            x="450"
            y="46"
            width="100"
            height="46"
            fill="var(--accent)"
            opacity="0.45"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="500"
            y="68"
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-primary)"
          >
            TexCoords
          </text>
          <text
            x="500"
            y="84"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            vec2 · 8 字节
          </text>

          {/* sizeof 标注 */}
          <text
            x="600"
            y="74"
            textAnchor="start"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--accent)"
          >
            sizeof = 32
          </text>

          {/* 结构体 → VBO 的箭头 */}
          <line
            x1="360"
            y1="98"
            x2="360"
            y2="132"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <path d="M360 132 l-6 -12 l12 0 z" fill="var(--accent)" />
          <text
            x="372"
            y="120"
            textAnchor="start"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            上传进 VBO
          </text>

          {/* ============ 中层：VBO 连续内存条带 ============ */}
          <text
            x="360"
            y="156"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            VBO：一条连续内存，顶点首尾相连
          </text>

          {/* 顶点0：P|N|T 三段 */}
          {/* 顶点0 Position */}
          <rect
            x="60"
            y="176"
            width="90"
            height="40"
            fill="var(--accent)"
            opacity="0.30"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="105"
            y="201"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-primary)"
          >
            P
          </text>
          {/* 顶点0 Normal */}
          <rect
            x="150"
            y="176"
            width="90"
            height="40"
            fill="var(--accent)"
            opacity="0.18"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="195"
            y="201"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-primary)"
          >
            N
          </text>
          {/* 顶点0 TexCoords */}
          <rect
            x="240"
            y="176"
            width="60"
            height="40"
            fill="var(--accent)"
            opacity="0.45"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="270"
            y="201"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-primary)"
          >
            T
          </text>

          {/* 顶点1：P|N|T */}
          <rect
            x="300"
            y="176"
            width="90"
            height="40"
            fill="var(--accent)"
            opacity="0.30"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="345"
            y="201"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-primary)"
          >
            P
          </text>
          <rect
            x="390"
            y="176"
            width="90"
            height="40"
            fill="var(--accent)"
            opacity="0.18"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="435"
            y="201"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-primary)"
          >
            N
          </text>
          <rect
            x="480"
            y="176"
            width="60"
            height="40"
            fill="var(--accent)"
            opacity="0.45"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="510"
            y="201"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-primary)"
          >
            T
          </text>

          {/* 顶点2 起始（省略号） */}
          <rect
            x="540"
            y="176"
            width="90"
            height="40"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text
            x="585"
            y="201"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            顶点2…
          </text>

          {/* 顶点分组标注 */}
          <text
            x="180"
            y="170"
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            ← 顶点 0 →
          </text>
          <text
            x="420"
            y="170"
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            ← 顶点 1 →
          </text>

          {/* offsetof 偏移刻度（落在顶点0 各段左缘） */}
          <line
            x1="60"
            y1="222"
            x2="60"
            y2="232"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="60"
            y="246"
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="monospace"
            fill="var(--accent)"
          >
            @0
          </text>
          <line
            x1="150"
            y1="222"
            x2="150"
            y2="232"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="150"
            y="246"
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="monospace"
            fill="var(--accent)"
          >
            @12
          </text>
          <line
            x1="240"
            y1="222"
            x2="240"
            y2="232"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="240"
            y="246"
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="monospace"
            fill="var(--accent)"
          >
            @24
          </text>
          <text
            x="135"
            y="262"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            offsetof(Vertex, …) 算出的字节偏移
          </text>

          {/* stride 跨度（顶点0 起点 → 顶点1 起点 = 32） */}
          <line
            x1="60"
            y1="284"
            x2="300"
            y2="284"
            stroke="var(--warning)"
            strokeWidth="2"
          />
          <path d="M60 284 l12 -6 l0 12 z" fill="var(--warning)" />
          <path d="M300 284 l-12 -6 l0 12 z" fill="var(--warning)" />
          <text
            x="180"
            y="300"
            textAnchor="middle"
            fontSize="10.5"
            fontFamily="monospace"
            fill="var(--warning)"
          >
            stride = sizeof(Vertex) = 32（跨到下一个顶点）
          </text>

          {/* ============ 下层：indices → EBO ============ */}
          <text
            x="360"
            y="346"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            EBO：索引——用哪几个顶点、按什么顺序连三角形
          </text>

          {(() => {
            const idx = [0, 1, 2, 2, 3, 0];
            const cellW = 64;
            const startX = 360 - (idx.length * cellW) / 2;
            return idx.map((v, i) => (
              <g key={i}>
                <rect
                  x={startX + i * cellW}
                  y="366"
                  width={cellW - 6}
                  height="40"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.5"
                />
                <text
                  x={startX + i * cellW + (cellW - 6) / 2}
                  y="391"
                  textAnchor="middle"
                  fontSize="13"
                  fontFamily="monospace"
                  fill="var(--text-primary)"
                >
                  {v}
                </text>
              </g>
            ));
          })()}
          <text
            x="360"
            y="424"
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            前 3 个连第一个三角形、后 3
            个连第二个——同一个顶点（0、2）被复用，不必重存
          </text>

          {/* —— 底部一句话总括 —— */}
          <text
            x="360"
            y="456"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            结构体内存连续 interleaved，offsetof / stride
            让我们不用手算每个属性的字节偏移
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        一个 <code>Vertex</code> 把 Position / Normal / TexCoords
        三块挨着打包；上传到 VBO 后，顶点一个接一个连续排放（interleaved）。
        <code>glVertexAttribPointer</code> 用{" "}
        <code>offsetof(Vertex, Normal)</code>=12、
        <code>offsetof(Vertex, TexCoords)</code>=24 定位各属性，
        <code>stride = sizeof(Vertex)</code>=32 跨到下一个顶点；EBO
        则只存索引，决定用哪几个顶点、按什么顺序连三角形。
      </figcaption>
    </figure>
  );
}
