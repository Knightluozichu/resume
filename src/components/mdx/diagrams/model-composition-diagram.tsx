/**
 * <ModelCompositionDiagram>：「模型 Model」§3「Draw + 纹理缓存」核心掰碎图（HEL-61，C 实战型，模型加载篇收官）。
 *
 * 把「一个 Model 到底由什么拼成、为什么纹理要做缓存去重」一张图讲清：
 *  左侧：Model 框，里面是 vector<Mesh> meshes —— 列出两个 Mesh 框（Mesh 0 车身、Mesh 1 左轮）。
 *   每个 Mesh 框展开它的三样东西：vertices（顶点）、indices（索引）、textures（这个 mesh 用的纹理）。
 *  右侧：共享的 textures_loaded 缓存框，里面是已加载过的纹理（车漆贴图、轮胎贴图）。
 *  关键：两个 Mesh 的 textures 都用箭头指向缓存里「同一张」已加载的车漆贴图 —— 体现去重：
 *   同一张贴图只加载一次、存进 textures_loaded，后续 mesh 直接复用这份缓存，不重复从磁盘读。
 *  底部：Draw 一行——for each mesh: mesh.Draw(shader)，一行画完整个模型。
 *
 * 语义三句：①Model = vector<Mesh> + 加载逻辑；每个 Mesh 自带 vertices/indices/textures；
 * ②textures_loaded 是全模型共享的纹理缓存，按路径去重——同一张贴图只加载一次、多个 mesh 复用；
 * ③Model::Draw 只是个转发器：把每个 mesh 各自 Draw 一遍，一行画完整个模型。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--danger/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角（硬规则 5）。
 */

export function ModelCompositionDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 680 400"
          role="img"
          aria-label="Model 的组成与纹理缓存去重示意。左侧是一个 Model 框，里面装着 vector Mesh，列出两个网格：Mesh 0 车身、Mesh 1 左轮。每个网格各自展开三样东西：vertices 顶点、indices 索引、textures 纹理。右侧是一个共享的 textures_loaded 纹理缓存框，里面存着已经加载过的纹理：一张车漆贴图、一张轮胎贴图。关键在于：Mesh 0 车身和 Mesh 1 都用箭头指向缓存里同一张车漆贴图，说明同一张贴图只加载一次、存进缓存后被多个网格复用，而不是每个网格各自重新从磁盘读一遍。底部是 Draw 函数：对每个 mesh 调用 mesh.Draw(shader)，一行循环就画完整个模型。结论：Model 等于一组 Mesh 加加载逻辑，纹理靠 textures_loaded 缓存去重，Draw 把每个 mesh 各画一遍。"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          <defs>
            <marker
              id="mc-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 顶部标题 */}
          <text
            x="340"
            y="26"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Model = vector&lt;Mesh&gt; + 共享纹理缓存
          </text>

          {/* ====== 左侧：Model 框 ====== */}
          <rect
            x="24"
            y="46"
            width="330"
            height="280"
            rx="12"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="40"
            y="68"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            Model
          </text>
          <text x="100" y="68" fontSize="10" fill="var(--text-secondary)">
            vector&lt;Mesh&gt; meshes;
          </text>

          {/* —— Mesh 0（车身，success 绿框）—— */}
          <MeshBox
            y={80}
            title="Mesh 0（车身）"
            texLabel="textures: 车漆贴图"
          />
          {/* —— Mesh 1（左轮，success 绿框）—— */}
          <MeshBox
            y={206}
            title="Mesh 1（左轮）"
            texLabel="textures: 车漆 + 轮胎贴图"
          />

          {/* ====== 右侧：textures_loaded 共享缓存 ====== */}
          <rect
            x="466"
            y="80"
            width="190"
            height="190"
            rx="12"
            fill="var(--bg-elevated)"
            stroke="var(--warning)"
            strokeWidth="2"
          />
          <text
            x="561"
            y="102"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            textures_loaded
          </text>
          <text
            x="561"
            y="118"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            （全模型共享的纹理缓存）
          </text>

          {/* 缓存里的两张已加载纹理 */}
          <rect
            x="486"
            y="134"
            width="150"
            height="50"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="561"
            y="155"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            车漆贴图
          </text>
          <text
            x="561"
            y="172"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            paint.png（只加载一次）
          </text>

          <rect
            x="486"
            y="198"
            width="150"
            height="50"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="561"
            y="219"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            轮胎贴图
          </text>
          <text
            x="561"
            y="236"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            tire.png
          </text>

          {/* ====== 去重箭头：两个 Mesh 的 textures 指向缓存 ====== */}
          {/* Mesh 0 的 textures → 车漆贴图 */}
          <path
            d="M338 150 C 410 150, 430 158, 484 158"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.8"
            markerEnd="url(#mc-arrow)"
          />
          {/* Mesh 1 的 textures → 同一张车漆贴图（去重：指向同一个目标） */}
          <path
            d="M338 276 C 420 276, 430 168, 484 162"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.8"
            markerEnd="url(#mc-arrow)"
          />
          {/* Mesh 1 的 textures → 轮胎贴图 */}
          <path
            d="M338 280 C 420 280, 430 222, 484 222"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.8"
            markerEnd="url(#mc-arrow)"
          />

          {/* 去重旁注 */}
          <text
            x="410"
            y="128"
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="600"
            fill="var(--accent)"
          >
            两个 mesh 复用
          </text>
          <text
            x="410"
            y="140"
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="600"
            fill="var(--accent)"
          >
            同一张车漆贴图
          </text>

          {/* ====== 底部：Draw 一行画完整个模型 ====== */}
          <rect
            x="24"
            y="346"
            width="632"
            height="42"
            rx="10"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="40"
            y="372"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            Model::Draw(shader)：
          </text>
          <text x="178" y="372" fontSize="11" fill="var(--text-secondary)">
            for (mesh : meshes) mesh.Draw(shader);
          </text>
          <text x="468" y="372" fontSize="10" fill="var(--accent)">
            一行画完整个模型
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        一个 <code>Model</code> 就是一组 <code>Mesh</code>（每个 Mesh 自带
        vertices / indices / textures）加上加载逻辑。所有 mesh
        的纹理都登记在共享的 <code>textures_loaded</code>{" "}
        缓存里：同一张贴图只加载一次，多个 mesh <strong>复用同一份</strong>
        （图中两个 mesh 都指向那张车漆贴图）。 最后 <code>Draw</code> 只是把每个
        mesh 各画一遍，一行画完整个模型。
      </figcaption>
    </figure>
  );
}

/** 左侧 Model 框里的一个 Mesh 条目：标题 + vertices/indices/textures 三样展开。 */
function MeshBox({
  y,
  title,
  texLabel,
}: {
  y: number;
  title: string;
  texLabel: string;
}) {
  return (
    <>
      <rect
        x="40"
        y={y}
        width="298"
        height="112"
        rx="10"
        fill="var(--bg-elevated)"
        stroke="var(--success)"
        strokeWidth="1.5"
      />
      <text
        x="56"
        y={y + 22}
        fontSize="11"
        fontWeight="600"
        fill="var(--text-primary)"
      >
        {title}
      </text>
      {/* vertices */}
      <rect
        x="56"
        y={y + 32}
        width="266"
        height="22"
        rx="6"
        fill="var(--bg)"
        stroke="var(--border)"
        strokeWidth="1"
      />
      <text x="68" y={y + 47} fontSize="10" fill="var(--text-secondary)">
        vertices（顶点：位置 / 法线 / UV）
      </text>
      {/* indices */}
      <rect
        x="56"
        y={y + 58}
        width="266"
        height="22"
        rx="6"
        fill="var(--bg)"
        stroke="var(--border)"
        strokeWidth="1"
      />
      <text x="68" y={y + 73} fontSize="10" fill="var(--text-secondary)">
        indices（索引：哪几个顶点连成三角形）
      </text>
      {/* textures（accent 紫边，强调它要指向缓存） */}
      <rect
        x="56"
        y={y + 84}
        width="266"
        height="22"
        rx="6"
        fill="var(--bg)"
        stroke="var(--accent)"
        strokeWidth="1.2"
      />
      <text x="68" y={y + 99} fontSize="10" fill="var(--accent)">
        {texLabel}
      </text>
    </>
  );
}
