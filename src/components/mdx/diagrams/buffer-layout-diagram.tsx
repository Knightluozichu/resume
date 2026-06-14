/**
 * <BufferLayoutDiagram mode="interleaved"|"batched"|"compare">：
 * 「高级数据」§5「交错 vs 分批布局」核心掰碎图（HEL-73，C 实战型）。
 *
 * 同一条 VBO 内存，三种 mode 画三态，也兼作 §5 <Stepper> 三步配图：
 *  ①interleaved：字节序列 [P P P N N N U U][P P P …]，一个顶点的 P/N/U 挨着重复；
 *    标 stride=32、Position@0、Normal@12、TexCoords@24。
 *  ②batched：[P P P P …][N N N N …][U U …]，所有位置一段、所有法线一段、所有 uv 一段；
 *    标每段独立、各属性 stride=12/12/8、offset=各段起点（0 / sizeof(pos) / sizeof(pos)+sizeof(nor)）。
 *  ③compare：两条窄条上下并列，强调「同一个 VAO，只是 attribPointer 的 stride/offset 填法不同」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--warning/--success/--border/--bg/
 * --bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

type BufferLayoutMode = "interleaved" | "batched" | "compare";

const ARIA: Record<BufferLayoutMode, string> = {
  interleaved:
    "交错布局示意图。一条 VBO 连续内存里，一个顶点的位置、法线、纹理坐标三块字节挨着放，下一个顶点紧跟其后，循环重复。在第一个顶点上标出字节偏移：位置从第 0 字节起、法线从第 12 字节起、纹理坐标从第 24 字节起；从一个顶点跳到下一个顶点的步长 stride 是 32 字节，正好等于一个顶点结构体的大小。三个属性共用同一个步长 32。",
  batched:
    "分批布局示意图。同一条 VBO 连续内存被分成三段：前面一整段全是所有顶点的位置，中间一整段全是所有顶点的法线，最后一整段全是所有顶点的纹理坐标。每个属性各占独立一段，位置段的步长 stride 是 12 字节、法线段 12 字节、纹理坐标段 8 字节，互不交错；每个属性的偏移 offset 是它那一段的起点：位置从 0 起、法线从所有位置的总字节数起、纹理坐标从位置加法线的总字节数起。",
  compare:
    "交错与分批两种布局并列对比图。上面是交错布局，一个顶点的位置法线纹理坐标挨着、首尾相连重复；下面是分批布局，所有位置一段、所有法线一段、所有纹理坐标一段。两种布局存的是同一批顶点数据，都能喂给同一个 VAO，唯一的区别只是 glVertexAttribPointer 调用里填的 stride 步长和 offset 偏移不同：交错布局三个属性共用步长 32、偏移 0 12 24；分批布局每个属性步长等于自身大小 12 12 8、偏移是各段起点。",
};

// 一个属性小格的统一画法（带类型标签）；坐标允许 number 或字符串数字，内部统一转数算中心
function Cell({
  x,
  y,
  w,
  fill,
  label,
}: {
  x: number | string;
  y: number | string;
  w: number | string;
  fill: string;
  label: string;
}) {
  const nx = Number(x);
  const ny = Number(y);
  const nw = Number(w);
  return (
    <g>
      <rect
        x={nx}
        y={ny}
        width={nw}
        height="36"
        fill="var(--accent)"
        opacity={fill}
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <text
        x={nx + nw / 2}
        y={ny + 23}
        textAnchor="middle"
        fontSize="11"
        fontFamily="monospace"
        fill="var(--text-primary)"
      >
        {label}
      </text>
    </g>
  );
}

// 三种属性的透明度（沿用 MeshDataLayoutDiagram 配色：P 深 / N 浅 / U 中）
const OP_P = "0.30";
const OP_N = "0.18";
const OP_U = "0.45";

export function BufferLayoutDiagram({
  mode = "interleaved",
}: {
  mode?: BufferLayoutMode;
}) {
  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 300"
          role="img"
          aria-label={ARIA[mode]}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 图例：P/N/U 三种属性 */}
          <Cell x="60" y="20" w="28" fill={OP_P} label="P" />
          <text x="96" y="43" fontSize="10" fill="var(--text-secondary)">
            位置
          </text>
          <Cell x="160" y="20" w="28" fill={OP_N} label="N" />
          <text x="196" y="43" fontSize="10" fill="var(--text-secondary)">
            法线
          </text>
          <Cell x="252" y="20" w="28" fill={OP_U} label="U" />
          <text x="288" y="43" fontSize="10" fill="var(--text-secondary)">
            纹理坐标
          </text>

          {/* ============ 交错 / compare 上半：interleaved 条带 ============ */}
          {mode !== "batched" && (
            <g>
              <text
                x="360"
                y="84"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                交错布局 interleaved：一个顶点的 P N U 挨着，循环重复
              </text>

              {/* 顶点0：P N U */}
              <Cell x="80" y="100" w="56" fill={OP_P} label="P" />
              <Cell x="136" y="100" w="56" fill={OP_N} label="N" />
              <Cell x="192" y="100" w="40" fill={OP_U} label="U" />
              {/* 顶点1：P N U */}
              <Cell x="232" y="100" w="56" fill={OP_P} label="P" />
              <Cell x="288" y="100" w="56" fill={OP_N} label="N" />
              <Cell x="344" y="100" w="40" fill={OP_U} label="U" />
              {/* 顶点2…省略 */}
              <rect
                x="384"
                y="100"
                width="56"
                height="36"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text
                x="412"
                y="123"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                顶点2…
              </text>

              {/* 顶点分组标注 */}
              <text
                x="156"
                y="95"
                textAnchor="middle"
                fontSize="9.5"
                fill="var(--text-secondary)"
              >
                ← 顶点 0 →
              </text>
              <text
                x="308"
                y="95"
                textAnchor="middle"
                fontSize="9.5"
                fill="var(--text-secondary)"
              >
                ← 顶点 1 →
              </text>

              {/* offset 刻度（顶点0 各段左缘） */}
              <text
                x="80"
                y="152"
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="monospace"
                fill="var(--accent)"
              >
                @0
              </text>
              <text
                x="136"
                y="152"
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="monospace"
                fill="var(--accent)"
              >
                @12
              </text>
              <text
                x="192"
                y="152"
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="monospace"
                fill="var(--accent)"
              >
                @24
              </text>

              {/* stride 跨度：顶点0 起点 → 顶点1 起点 = 32 */}
              {mode === "interleaved" && (
                <g>
                  <line
                    x1="80"
                    y1="172"
                    x2="232"
                    y2="172"
                    stroke="var(--warning)"
                    strokeWidth="2"
                  />
                  <path d="M80 172 l12 -6 l0 12 z" fill="var(--warning)" />
                  <path d="M232 172 l-12 -6 l0 12 z" fill="var(--warning)" />
                  <text
                    x="156"
                    y="190"
                    textAnchor="middle"
                    fontSize="10.5"
                    fontFamily="monospace"
                    fill="var(--warning)"
                  >
                    stride = 32（三属性共用，跨到下一个顶点）
                  </text>
                  <text
                    x="360"
                    y="232"
                    textAnchor="middle"
                    fontSize="11"
                    fontFamily="monospace"
                    fill="var(--text-secondary)"
                  >
                    attribPointer：stride 都填 32，offset 填 0 / 12 / 24
                  </text>
                </g>
              )}
            </g>
          )}

          {/* ============ 分批 / compare 下半：batched 条带 ============ */}
          {mode !== "interleaved" && (
            <g>
              <text
                x="360"
                y={mode === "compare" ? "224" : "84"}
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                分批布局 batched：所有 P 一段、所有 N 一段、所有 U 一段
              </text>

              {(() => {
                const top = mode === "compare" ? 238 : 100;
                return (
                  <g>
                    {/* 位置段：P P P P */}
                    <Cell x="80" y={top} w="40" fill={OP_P} label="P" />
                    <Cell x="120" y={top} w="40" fill={OP_P} label="P" />
                    <Cell x="160" y={top} w="40" fill={OP_P} label="P" />
                    <Cell x="200" y={top} w="40" fill={OP_P} label="P" />
                    {/* 法线段：N N N N */}
                    <Cell x="240" y={top} w="40" fill={OP_N} label="N" />
                    <Cell x="280" y={top} w="40" fill={OP_N} label="N" />
                    <Cell x="320" y={top} w="40" fill={OP_N} label="N" />
                    <Cell x="360" y={top} w="40" fill={OP_N} label="N" />
                    {/* 纹理坐标段：U U U U */}
                    <Cell x="400" y={top} w="30" fill={OP_U} label="U" />
                    <Cell x="430" y={top} w="30" fill={OP_U} label="U" />
                    <Cell x="460" y={top} w="30" fill={OP_U} label="U" />
                    <Cell x="490" y={top} w="30" fill={OP_U} label="U" />
                    {/* 段分组括注 */}
                    <text
                      x="160"
                      y={top - 6}
                      textAnchor="middle"
                      fontSize="9.5"
                      fill="var(--text-secondary)"
                    >
                      ← 所有位置 →
                    </text>
                    <text
                      x="320"
                      y={top - 6}
                      textAnchor="middle"
                      fontSize="9.5"
                      fill="var(--text-secondary)"
                    >
                      ← 所有法线 →
                    </text>
                    <text
                      x="460"
                      y={top - 6}
                      textAnchor="middle"
                      fontSize="9.5"
                      fill="var(--text-secondary)"
                    >
                      ← 所有 uv →
                    </text>

                    {mode === "batched" && (
                      <g>
                        {/* 各段起点 offset 刻度 */}
                        <text
                          x="80"
                          y={top + 52}
                          textAnchor="middle"
                          fontSize="9.5"
                          fontFamily="monospace"
                          fill="var(--accent)"
                        >
                          @0
                        </text>
                        <text
                          x="240"
                          y={top + 52}
                          textAnchor="middle"
                          fontSize="9.5"
                          fontFamily="monospace"
                          fill="var(--accent)"
                        >
                          @sizeof(pos)
                        </text>
                        <text
                          x="430"
                          y={top + 52}
                          textAnchor="middle"
                          fontSize="9.5"
                          fontFamily="monospace"
                          fill="var(--accent)"
                        >
                          @sizeof(pos)+sizeof(nor)
                        </text>
                        <text
                          x="360"
                          y={top + 78}
                          textAnchor="middle"
                          fontSize="10.5"
                          fontFamily="monospace"
                          fill="var(--warning)"
                        >
                          各属性独立：stride = 12 / 12 / 8（自身大小）
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}
            </g>
          )}

          {/* ============ compare 模式底部一句话 ============ */}
          {mode === "compare" && (
            <text
              x="360"
              y="290"
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="600"
              fill="var(--accent)"
            >
              同一批数据、同一个 VAO，只是 attribPointer 的 stride / offset
              填法不同
            </text>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {mode === "interleaved" && (
          <>
            <strong>交错布局</strong>：一个顶点的 <code>P</code> <code>N</code>{" "}
            <code>U</code> 挨着放、首尾相连重复。三个属性共用
            <strong>同一步长</strong>
            <code>stride = 32</code>，偏移分别 <code>0 / 12 / 24</code>。
          </>
        )}
        {mode === "batched" && (
          <>
            <strong>分批布局</strong>：所有 <code>P</code> 排一段、所有{" "}
            <code>N</code> 排一段、所有 <code>U</code> 排一段。每个属性
            <strong>各自独立</strong>，步长等于自身大小（
            <code>12 / 12 / 8</code>），偏移是各段起点。
          </>
        )}
        {mode === "compare" && (
          <>
            两种布局存的是<strong>同一批顶点</strong>，都喂给
            <strong>同一个 VAO</strong>；区别只在{" "}
            <code>glVertexAttribPointer</code> 填的{" "}
            <strong>stride / offset</strong> 不同。
          </>
        )}
      </figcaption>
    </figure>
  );
}
