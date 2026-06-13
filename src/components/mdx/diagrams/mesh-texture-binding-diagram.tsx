/**
 * <MeshTextureBindingDiagram>：「网格 Mesh」§6「Draw(shader)」核心掰碎图（HEL-60，C 实战型）。
 *
 * 把「Draw 里按命名约定，自动把第 i 张纹理接到对应 sampler」这条因果链画清楚，左中右三栏：
 *  ①左栏「textures 向量」：一组 Texture，标各自的 type（texture_diffuse / texture_specular）。
 *  ②中栏「Draw 里按 type 拼名 + 绑纹理单元」：按 type 统计序号拼出 uniform 名
 *    （texture_diffuse1 / texture_specular1），并 glActiveTexture(GL_TEXTURE0 + i) 把第 i 张
 *    纹理绑到第 i 号纹理单元，再把 i 设给对应 sampler。
 *  ③右栏「着色器里的 sampler2D uniform」：material.texture_diffuse1 / material.texture_specular1
 *    各自接到一个纹理单元。
 *  箭头表现「命名约定让 Draw 自动把第 i 张纹理接到对应 sampler」。
 *
 * 一句话语义：只要纹理 type 和着色器里的 sampler 名遵守同一套命名约定（texture_diffuseN），
 *   Draw 就能机械地把第 i 张纹理接到正确的 sampler，不必为每个网格手写绑定。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--border/--bg/--bg-elevated/
 * --text-primary/--text-secondary/--warning），无阴影、rx 圆角（硬规则 5）。
 */

export function MeshTextureBindingDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label="Draw 函数怎么按命名约定把纹理接到着色器，分左中右三栏一条因果链。左栏是网格自带的纹理列表 textures，里面每张纹理都带一个类型标签 type，比如第一张是 texture_diffuse 漫反射、第二张也是 texture_diffuse、第三张是 texture_specular 镜面。中栏是 Draw 函数里做的事：遍历这些纹理，按类型分别从 1 开始数序号，拼出 uniform 名字，第一张漫反射拼成 texture_diffuse1、第二张拼成 texture_diffuse2、镜面那张拼成 texture_specular1；同时用 glActiveTexture 激活第 i 号纹理单元 GL_TEXTURE0 加 i，把这张纹理绑上去，再把编号 i 设给对应的 sampler。右栏是着色器里声明的采样器 uniform：material 点 texture_diffuse1、material 点 texture_diffuse2、material 点 texture_specular1，每个 sampler2D 各自接到一个纹理单元。箭头表示命名约定让 Draw 自动把第 i 张纹理接到名字对得上的那个 sampler。结论：只要纹理的 type 和着色器里的 sampler 名遵守同一套命名约定 texture_diffuseN，Draw 就能机械地把第 i 张纹理接到正确的 sampler，不必为每个网格手写绑定。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ============ 栏标题 ============ */}
          <text
            x="115"
            y="28"
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            textures 向量
          </text>
          <text
            x="360"
            y="28"
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Draw：按 type 拼名 + 绑纹理单元
          </text>
          <text
            x="610"
            y="28"
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            着色器 sampler2D
          </text>

          {/* 行数据：i 号、type、序号、拼出的 uniform 名 */}
          {(() => {
            const rows = [
              { unit: 0, type: "texture_diffuse", name: "texture_diffuse1" },
              { unit: 1, type: "texture_diffuse", name: "texture_diffuse2" },
              { unit: 2, type: "texture_specular", name: "texture_specular1" },
            ];
            const rowY = (i: number) => 70 + i * 96;
            return rows.map((r, i) => {
              const y = rowY(i);
              const cy = y + 26;
              return (
                <g key={i}>
                  {/* —— 左栏：一张 Texture —— */}
                  <rect
                    x="30"
                    y={y}
                    width="170"
                    height="52"
                    fill="var(--accent)"
                    opacity="0.22"
                    stroke="var(--border)"
                    strokeWidth="1.5"
                  />
                  <text
                    x="115"
                    y={y + 21}
                    textAnchor="middle"
                    fontSize="10.5"
                    fill="var(--text-primary)"
                  >
                    第 {i} 张纹理
                  </text>
                  <text
                    x="115"
                    y={y + 39}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontFamily="monospace"
                    fill="var(--text-secondary)"
                  >
                    type={r.type.replace("texture_", "…_")}
                  </text>

                  {/* 左 → 中 箭头 */}
                  <line
                    x1="200"
                    y1={cy}
                    x2="248"
                    y2={cy}
                    stroke="var(--accent)"
                    strokeWidth="2"
                  />
                  <path d={`M248 ${cy} l-12 -6 l0 12 z`} fill="var(--accent)" />

                  {/* —— 中栏：拼名 + 绑单元 —— */}
                  <rect
                    x="250"
                    y={y - 4}
                    width="220"
                    height="60"
                    fill="var(--bg)"
                    stroke="var(--border)"
                    strokeWidth="1.5"
                  />
                  <text
                    x="360"
                    y={y + 14}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="monospace"
                    fill="var(--accent)"
                  >
                    {`"material.${r.name}"`}
                  </text>
                  <text
                    x="360"
                    y={y + 32}
                    textAnchor="middle"
                    fontSize="9.5"
                    fill="var(--text-secondary)"
                  >
                    glActiveTexture(GL_TEXTURE0+{r.unit})
                  </text>
                  <text
                    x="360"
                    y={y + 48}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontFamily="monospace"
                    fill="var(--warning)"
                  >
                    sampler ← 纹理单元 {r.unit}
                  </text>

                  {/* 中 → 右 箭头 */}
                  <line
                    x1="470"
                    y1={cy}
                    x2="518"
                    y2={cy}
                    stroke="var(--accent)"
                    strokeWidth="2"
                  />
                  <path d={`M518 ${cy} l-12 -6 l0 12 z`} fill="var(--accent)" />

                  {/* —— 右栏：sampler2D uniform —— */}
                  <rect
                    x="520"
                    y={y}
                    width="180"
                    height="52"
                    fill="var(--accent)"
                    opacity="0.30"
                    stroke="var(--border)"
                    strokeWidth="1.5"
                  />
                  <text
                    x="610"
                    y={y + 21}
                    textAnchor="middle"
                    fontSize="9.5"
                    fill="var(--text-secondary)"
                  >
                    uniform sampler2D
                  </text>
                  <text
                    x="610"
                    y={y + 39}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontFamily="monospace"
                    fill="var(--text-primary)"
                  >
                    {`material.${r.name}`}
                  </text>
                </g>
              );
            });
          })()}

          {/* 命名约定说明条 */}
          <text
            x="360"
            y="360"
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            按 type 各自从 1 数序号：diffuse → 1、2…；specular → 1…，拼出与
            sampler 同名的字符串
          </text>

          {/* —— 底部一句话总括 —— */}
          <text
            x="360"
            y="392"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            命名约定（texture_diffuseN）让 Draw 自动把第 i
            张纹理接到对得上名字的 sampler
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <code>Draw</code> 遍历网格的 <code>textures</code>，按每张纹理的{" "}
        <code>type</code> 分别从 1 开始数序号，拼出{" "}
        <code>material.texture_diffuse1</code>、<code>texture_specular1</code>{" "}
        这样的名字；同时把第 <code>i</code> 张纹理用{" "}
        <code>glActiveTexture(GL_TEXTURE0 + i)</code> 绑到第 <code>i</code>{" "}
        号纹理单元，再把 <code>i</code> 设给同名的 <code>sampler2D</code>{" "}
        uniform。 只要两边遵守同一套命名约定，绑定就全自动。
      </figcaption>
    </figure>
  );
}
