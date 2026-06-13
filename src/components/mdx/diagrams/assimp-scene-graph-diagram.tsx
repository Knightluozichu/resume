/**
 * <AssimpSceneGraphDiagram>：「模型加载」§1「Assimp」核心数据结构掰碎图（HEL-59，A 概念型）。
 *
 * 把本章最易误解的一件事画清楚：Assimp 导入后得到的 aiScene 里，**网格数据集中存放**，
 * 而场景图（节点树 aiNode）只存「指向这些数据的索引」，靠索引引用，不复制数据本身。
 *
 * 布局分上下两块：
 *  上块「场景图（节点树）」：根节点 aiRootNode 下挂两个子节点。每个 aiNode 只写它持有的
 *    mMeshes 索引（如 [0]、[1,2]）+ mChildren，强调「node 不存网格、只存索引」。
 *  下块「aiScene 集中仓库」：mMeshes[] 数组（三个 aiMesh 槽，各标 mMaterialIndex）
 *    + mMaterials[] 数组（两个 aiMaterial 槽）。
 *  箭头：① 节点的 mMeshes 索引 → 指向 mMeshes[] 里对应下标的 aiMesh（树→数据）；
 *        ② aiMesh 的 mMaterialIndex → 指向 mMaterials[] 里对应下标的 aiMaterial（数据→材质）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--danger/
 * --border/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角（硬规则 5）。
 */

export function AssimpSceneGraphDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 470"
          role="img"
          aria-label="Assimp 导入后的数据结构关系图。上半部分是「场景图（节点树）」：根节点 aiRootNode 下挂两个子节点 aiNode；每个节点只持有 mMeshes 索引（一组数字下标）和 mChildren（子节点），节点本身不存网格数据。根节点的 mMeshes 索引是空，左子节点持有索引 [0]，右子节点持有索引 [1, 2]。下半部分是 aiScene 的集中仓库：mMeshes 数组按下标存放真正的网格数据（aiMesh 0、1、2），mMaterials 数组存放材质（aiMaterial 0、1）。箭头表示：节点里的 mMeshes 索引指向 mMeshes 数组里对应下标的那个 aiMesh，而每个 aiMesh 的 mMaterialIndex 又指向 mMaterials 数组里对应下标的 aiMaterial。核心结论：树只存索引、网格和材质数据集中存放在 scene 里，节点靠索引去引用，而不是把数据复制进每个节点。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="asg-arrow-accent"
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
              id="asg-arrow-warning"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--warning)" />
            </marker>
            <marker
              id="asg-arrow-border"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* ============ 上块标题：场景图（节点树）============ */}
          <text
            x="360"
            y="24"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            场景图：节点树（aiNode）—— 只存「索引」，不存网格数据
          </text>

          {/* 根节点 aiRootNode */}
          <rect
            x="280"
            y="40"
            width="160"
            height="52"
            rx="8"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="1.8"
          />
          <text
            x="360"
            y="60"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            aiRootNode
          </text>
          <text
            x="360"
            y="78"
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            mMeshes: [ ]｜mChildren: 2
          </text>

          {/* 树枝：根 → 两个子节点 */}
          <line
            x1="360"
            y1="92"
            x2="180"
            y2="120"
            stroke="var(--text-secondary)"
            strokeWidth="1.3"
          />
          <line
            x1="360"
            y1="92"
            x2="540"
            y2="120"
            stroke="var(--text-secondary)"
            strokeWidth="1.3"
          />

          {/* 左子节点 aiNode */}
          <rect
            x="100"
            y="120"
            width="160"
            height="52"
            rx="8"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="180"
            y="140"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            aiNode（子）
          </text>
          <text
            x="180"
            y="158"
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            mMeshes: [0]
          </text>

          {/* 右子节点 aiNode */}
          <rect
            x="460"
            y="120"
            width="160"
            height="52"
            rx="8"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="540"
            y="140"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            aiNode（子）
          </text>
          <text
            x="540"
            y="158"
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            mMeshes: [1, 2]
          </text>

          {/* 分隔虚线：树 vs 仓库 */}
          <line
            x1="40"
            y1="210"
            x2="680"
            y2="210"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* ============ 下块标题：aiScene 集中仓库 ============ */}
          <text
            x="360"
            y="238"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            aiScene：数据集中存放在这里
          </text>

          {/* mMeshes[] 数组容器 */}
          <rect
            x="40"
            y="252"
            width="430"
            height="92"
            rx="8"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text x="52" y="270" fontSize="11" fill="var(--text-secondary)">
            mMeshes[]（所有网格的真正数据）
          </text>

          {/* aiMesh 0 */}
          <rect
            x="52"
            y="282"
            width="128"
            height="50"
            rx="6"
            fill="var(--success)"
            opacity="0.18"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="116"
            y="300"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            aiMesh 0
          </text>
          <text
            x="116"
            y="318"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            mMaterialIndex: 0
          </text>

          {/* aiMesh 1 */}
          <rect
            x="190"
            y="282"
            width="128"
            height="50"
            rx="6"
            fill="var(--success)"
            opacity="0.18"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="254"
            y="300"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            aiMesh 1
          </text>
          <text
            x="254"
            y="318"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            mMaterialIndex: 1
          </text>

          {/* aiMesh 2 */}
          <rect
            x="328"
            y="282"
            width="128"
            height="50"
            rx="6"
            fill="var(--success)"
            opacity="0.18"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="392"
            y="300"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            aiMesh 2
          </text>
          <text
            x="392"
            y="318"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            mMaterialIndex: 1
          </text>

          {/* mMaterials[] 数组容器 */}
          <rect
            x="490"
            y="252"
            width="190"
            height="92"
            rx="8"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text x="502" y="270" fontSize="11" fill="var(--text-secondary)">
            mMaterials[]（材质）
          </text>

          {/* aiMaterial 0 */}
          <rect
            x="502"
            y="282"
            width="78"
            height="50"
            rx="6"
            fill="var(--warning)"
            opacity="0.18"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <text
            x="541"
            y="304"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill="var(--warning)"
          >
            aiMaterial
          </text>
          <text
            x="541"
            y="320"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            0
          </text>

          {/* aiMaterial 1 */}
          <rect
            x="590"
            y="282"
            width="78"
            height="50"
            rx="6"
            fill="var(--warning)"
            opacity="0.18"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <text
            x="629"
            y="304"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill="var(--warning)"
          >
            aiMaterial
          </text>
          <text
            x="629"
            y="320"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            1
          </text>

          {/* ===== 箭头①：节点的 mMeshes 索引 → mMeshes[] 对应槽 ===== */}
          {/* 左子节点 [0] → aiMesh 0 */}
          <path
            d="M180 172 C 150 215, 120 250, 116 280"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.6"
            markerEnd="url(#asg-arrow-accent)"
          />
          {/* 右子节点 [1,2] → aiMesh 1 */}
          <path
            d="M540 172 C 430 215, 300 248, 256 280"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.6"
            markerEnd="url(#asg-arrow-accent)"
          />
          {/* 右子节点 [1,2] → aiMesh 2 */}
          <path
            d="M548 172 C 500 220, 420 250, 392 280"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.6"
            markerEnd="url(#asg-arrow-accent)"
          />

          {/* 箭头①标注 */}
          <text
            x="300"
            y="200"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill="var(--accent)"
          >
            索引指向数据 →
          </text>

          {/* ===== 箭头②：aiMesh.mMaterialIndex → mMaterials[] 对应槽 ===== */}
          {/* aiMesh 0 → material 0 */}
          <path
            d="M180 340 C 360 372, 470 372, 541 340"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1.4"
            markerEnd="url(#asg-arrow-warning)"
          />
          {/* aiMesh 1 → material 1 */}
          <path
            d="M254 340 C 420 366, 560 366, 629 340"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1.4"
            markerEnd="url(#asg-arrow-warning)"
          />
          <text
            x="400"
            y="392"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill="var(--warning)"
          >
            mMaterialIndex 指向材质 →
          </text>

          {/* 底部核心结论 */}
          <text
            x="360"
            y="430"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            树存「索引」，数据集中存在 aiScene，靠索引引用
          </text>
          <text
            x="360"
            y="450"
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            同一个 aiMesh / aiMaterial 可被多处引用，不必复制
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Assimp 导入后，真正的网格数据放在 <code>aiScene.mMeshes[]</code>
        、材质放在 <code>
          aiScene.mMaterials[]
        </code>，集中存一份。场景图里的 <code>aiNode</code> 只持有{" "}
        <code>mMeshes</code>{" "}
        索引（一组下标）和子节点，**自己不存网格数据**；要用哪块网格，就拿索引去{" "}
        <code>mMeshes[]</code> 里取。每个 <code>aiMesh</code> 再用{" "}
        <code>mMaterialIndex</code> 指向 <code>mMaterials[]</code>{" "}
        里的材质。读懂「树存索引、数据集中、靠下标引用」这条，就读懂了整章。
      </figcaption>
    </figure>
  );
}
