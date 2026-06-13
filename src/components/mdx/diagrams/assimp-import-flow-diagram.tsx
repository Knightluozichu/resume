/**
 * <AssimpImportFlowDiagram>：「模型加载」§1「Assimp」导入流程示意图（HEL-59，A 概念型）。
 *
 * 把「一个磁盘上的模型文件，怎么经 Assimp 变成内存里统一的 aiScene」这条流程画成三段横向流水：
 *  左：磁盘上的模型文件（model.obj / .fbx / .gltf …，几十种格式都行）。
 *  中：Assimp::Importer.ReadFile(path, flags) —— 统一的入口；flags 里列了两个最常用的后处理选项
 *      （aiProcess_Triangulate 把多边形拆成三角形、aiProcess_FlipUVs 翻转纹理 y 轴给 OpenGL 用）。
 *  右：导入结果 aiScene 内存结构（mRootNode + mMeshes[] + mMaterials[]），不管输入是什么格式，
 *      产物都是同一套结构。
 * 两条横向流程箭头串起左→中→右。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--border/
 * --bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角（硬规则 5）。
 */

export function AssimpImportFlowDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 300"
          role="img"
          aria-label="Assimp 导入流程示意图，从左到右三段。左边是磁盘上的模型文件，可以是 model.obj、model.fbx、model.gltf 等几十种不同格式。中间是 Assimp 的统一入口 Importer.ReadFile，接收文件路径和一组后处理选项 flags，图中列出两个最常用的：aiProcess_Triangulate 把多边形面拆成三角形、aiProcess_FlipUVs 把纹理坐标的 y 轴翻转以适配 OpenGL。右边是导入后得到的 aiScene 内存结构，包含 mRootNode 根节点、mMeshes 网格数组、mMaterials 材质数组。横向箭头表示流程方向。核心结论：不管左边喂进来的是哪种格式，经过同一个 ReadFile 入口，产物都是同一套统一的 aiScene 数据结构。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="aif-arrow-accent"
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

          {/* ============ 左：模型文件 ============ */}
          <text
            x="110"
            y="36"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            磁盘上的模型文件
          </text>
          <text
            x="110"
            y="54"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            （几十种格式都行）
          </text>

          {/* 三个堆叠的文件卡片示意多格式 */}
          <rect
            x="58"
            y="78"
            width="104"
            height="34"
            rx="6"
            fill="var(--bg-elevated)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="110"
            y="100"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            model.obj
          </text>

          <rect
            x="58"
            y="120"
            width="104"
            height="34"
            rx="6"
            fill="var(--bg-elevated)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="110"
            y="142"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            model.fbx
          </text>

          <rect
            x="58"
            y="162"
            width="104"
            height="34"
            rx="6"
            fill="var(--bg-elevated)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="110"
            y="184"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            model.gltf
          </text>

          {/* 箭头 1：文件 → ReadFile */}
          <line
            x1="170"
            y1="137"
            x2="262"
            y2="137"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#aif-arrow-accent)"
          />

          {/* ============ 中：Importer.ReadFile(path, flags) ============ */}
          <rect
            x="272"
            y="60"
            width="176"
            height="156"
            rx="10"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="1.8"
          />
          <text
            x="360"
            y="84"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            Assimp::Importer
          </text>
          <text
            x="360"
            y="102"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            .ReadFile(path, flags)
          </text>
          <text
            x="360"
            y="122"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            统一入口，flags = 后处理选项：
          </text>

          {/* flags 项 1 */}
          <rect
            x="288"
            y="132"
            width="144"
            height="32"
            rx="6"
            fill="var(--success)"
            opacity="0.16"
            stroke="var(--success)"
            strokeWidth="1.3"
          />
          <text
            x="360"
            y="152"
            textAnchor="middle"
            fontSize="10"
            fill="var(--success)"
          >
            aiProcess_Triangulate
          </text>

          {/* flags 项 2 */}
          <rect
            x="288"
            y="170"
            width="144"
            height="32"
            rx="6"
            fill="var(--success)"
            opacity="0.16"
            stroke="var(--success)"
            strokeWidth="1.3"
          />
          <text
            x="360"
            y="190"
            textAnchor="middle"
            fontSize="10"
            fill="var(--success)"
          >
            aiProcess_FlipUVs
          </text>

          {/* 箭头 2：ReadFile → aiScene */}
          <line
            x1="456"
            y1="137"
            x2="548"
            y2="137"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#aif-arrow-accent)"
          />

          {/* ============ 右：aiScene 内存结构 ============ */}
          <text
            x="630"
            y="36"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            统一产物：aiScene
          </text>
          <text
            x="630"
            y="54"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            （内存里的数据结构）
          </text>

          <rect
            x="558"
            y="68"
            width="144"
            height="148"
            rx="10"
            fill="var(--bg-elevated)"
            stroke="var(--warning)"
            strokeWidth="1.6"
          />
          <text
            x="630"
            y="90"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            aiScene
          </text>

          <rect
            x="572"
            y="102"
            width="116"
            height="30"
            rx="5"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <text
            x="630"
            y="121"
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-primary)"
          >
            mRootNode
          </text>

          <rect
            x="572"
            y="138"
            width="116"
            height="30"
            rx="5"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <text
            x="630"
            y="157"
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-primary)"
          >
            mMeshes[]
          </text>

          <rect
            x="572"
            y="174"
            width="116"
            height="30"
            rx="5"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <text
            x="630"
            y="193"
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-primary)"
          >
            mMaterials[]
          </text>

          {/* 底部结论 */}
          <text
            x="360"
            y="256"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            不管输入哪种格式，过同一个 ReadFile，产物都是同一套 aiScene
          </text>
          <text
            x="360"
            y="278"
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            flags 在加载时顺手把数据「整理」成 OpenGL 好用的样子（拆三角、翻
            UV）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Assimp 的导入是一条流水：左边喂进任意格式的模型文件，中间交给统一入口{" "}
        <code>Importer.ReadFile(path, flags)</code>，其中 <code>flags</code>{" "}
        指定加载时的后处理（如 <code>aiProcess_Triangulate</code>{" "}
        把面都拆成三角形、<code>aiProcess_FlipUVs</code> 翻转纹理 y
        轴），右边产出统一的 <code>aiScene</code> 内存结构（
        <code>mRootNode</code> + <code>mMeshes[]</code> +{" "}
        <code>mMaterials[]</code>）。格式各异，产物划一。
      </figcaption>
    </figure>
  );
}
