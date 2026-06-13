/**
 * <NodeRecursionDiagram>：「模型 Model」§3「processNode 递归」核心掰碎图（HEL-61，C 实战型，模型加载篇收官）。
 *
 * 把本章最难「看懂」的那件事画清楚——「Assimp 读进来的是一棵 aiNode 场景图树，
 * processNode 用深度优先递归把这棵树压平成一个按访问顺序排开的 vector<Mesh>」：
 *  左侧：一棵 aiNode 树（根 Root → 两个子节点 Body / Wheels，Wheels 再带两个子节点）。
 *   每个节点标出它自己的 mMeshes 索引（指向 scene->mMeshes 里的网格），有的节点没有网格（只是骨架）。
 *  一条编号 ①②③④⑤⑥ 的虚线 DFS 路径，按「先处理本节点的 mMeshes、再递归每个孩子」的顺序串起所有节点。
 *  右侧：递归压平后的 vector<Mesh>——把访问途中收集到的每个 mesh 按顺序排成一列。
 *
 * 语义三句：①Assimp 给的是一棵有父子层级的 aiNode 树（场景图）；②processNode 深度优先递归：
 * 先收本节点的 mMeshes，再对每个 mChildren 递归；③这棵树最终被压平成一个扁平的 meshes 列表
 * （漏了递归 children = 只画出根节点那几个 mesh，模型残缺，这是本章头号坑）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--danger/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角（硬规则 5）。
 */

export function NodeRecursionDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 680 380"
          role="img"
          aria-label="processNode 递归把场景图树压平成网格列表的示意，分左右两栏。左栏是 Assimp 读进来的 aiNode 树：根节点 Root 没有网格，它有两个子节点。子节点 Body 持有网格索引 0；子节点 Wheels 自己没有网格，但它又有两个子节点，分别持有网格索引 1 和网格索引 2。一条编号一到六的虚线深度优先路径串起整棵树，顺序是：先处理当前节点自己的网格，再依次递归它的每个子节点。右栏是递归压平后的结果，一个按访问顺序排开的网格列表 vector Mesh：依次是 Mesh 0 车身、Mesh 1 左轮、Mesh 2 右轮。结论：有父子层级的树被深度优先递归压平成一个扁平的网格列表；如果忘了递归子节点，就只会收集到根节点的网格，模型残缺。"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          <defs>
            <marker
              id="nr-arrow"
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
              id="nr-arrow-dashed"
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

          {/* 顶部标题 */}
          <text
            x="340"
            y="26"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            aiNode 树 →（深度优先递归）→ 扁平的 vector&lt;Mesh&gt;
          </text>

          {/* 左栏小标题 */}
          <text
            x="180"
            y="52"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            场景图：一棵 aiNode 树
          </text>

          {/* ====== 左栏：aiNode 树（实线父子连边） ====== */}
          {/* 父子连边（先画，压在节点框下面） */}
          <line
            x1="180"
            y1="92"
            x2="100"
            y2="152"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <line
            x1="180"
            y1="92"
            x2="265"
            y2="152"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <line
            x1="265"
            y1="192"
            x2="210"
            y2="252"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <line
            x1="265"
            y1="192"
            x2="320"
            y2="252"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          {/* Root 节点（无网格，accent 紫框） */}
          <rect
            x="135"
            y="64"
            width="90"
            height="30"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="180"
            y="79"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Root
          </text>
          <text
            x="180"
            y="90"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            mMeshes: 无
          </text>

          {/* Body 节点（持网格 0，success 绿框） */}
          <rect
            x="55"
            y="152"
            width="90"
            height="40"
            rx="8"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="100"
            y="168"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Body
          </text>
          <text
            x="100"
            y="183"
            textAnchor="middle"
            fontSize="9"
            fill="var(--success)"
          >
            mMeshes: [0]
          </text>

          {/* Wheels 节点（无网格、只是骨架，accent 紫框） */}
          <rect
            x="220"
            y="152"
            width="90"
            height="40"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="265"
            y="168"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Wheels
          </text>
          <text
            x="265"
            y="183"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            mMeshes: 无
          </text>

          {/* WheelL 节点（持网格 1，success 绿框） */}
          <rect
            x="165"
            y="252"
            width="90"
            height="40"
            rx="8"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="210"
            y="268"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            WheelL
          </text>
          <text
            x="210"
            y="283"
            textAnchor="middle"
            fontSize="9"
            fill="var(--success)"
          >
            mMeshes: [1]
          </text>

          {/* WheelR 节点（持网格 2，success 绿框） */}
          <rect
            x="285"
            y="252"
            width="90"
            height="40"
            rx="8"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="330"
            y="268"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            WheelR
          </text>
          <text
            x="330"
            y="283"
            textAnchor="middle"
            fontSize="9"
            fill="var(--success)"
          >
            mMeshes: [2]
          </text>

          {/* DFS 虚线访问路径 ①…⑥（warning 黄，盖在父子边之上） */}
          <path
            d="M180 94 C 130 110, 110 130, 100 150"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#nr-arrow-dashed)"
          />
          <path
            d="M118 192 C 160 220, 230 120, 263 152"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#nr-arrow-dashed)"
          />
          <path
            d="M250 192 C 220 215, 212 230, 210 250"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#nr-arrow-dashed)"
          />
          <path
            d="M255 272 C 280 280, 300 280, 322 272"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#nr-arrow-dashed)"
          />

          {/* DFS 步序编号小圈 */}
          <DfsStep n="1" cx={180} cy={106} />
          <DfsStep n="2" cx={100} cy={138} />
          <DfsStep n="3" cx={200} cy={138} />
          <DfsStep n="4" cx={265} cy={206} />
          <DfsStep n="5" cx={210} cy={238} />
          <DfsStep n="6" cx={330} cy={238} />

          {/* 左栏旁注 */}
          <text
            x="180"
            y="320"
            textAnchor="middle"
            fontSize="10"
            fill="var(--warning)"
          >
            ①…⑥ = 深度优先访问顺序
          </text>
          <text
            x="180"
            y="338"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            每到一个节点：先收它的 mMeshes，
          </text>
          <text
            x="180"
            y="352"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            再依次递归它的每个子节点
          </text>

          {/* 分隔竖线 */}
          <line
            x1="400"
            y1="48"
            x2="400"
            y2="360"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* 压平箭头：从树指向列表 */}
          <path
            d="M378 200 L 452 200"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#nr-arrow)"
          />
          <text
            x="415"
            y="190"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            压平
          </text>

          {/* ====== 右栏：扁平的 vector<Mesh> ====== */}
          <text
            x="560"
            y="52"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            结果：扁平的 vector&lt;Mesh&gt;
          </text>

          <rect
            x="470"
            y="68"
            width="180"
            height="252"
            rx="10"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="560"
            y="88"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            meshes
          </text>

          <FlatMesh y={100} index="0" label="Mesh 0（车身）" />
          <FlatMesh y={172} index="1" label="Mesh 1（左轮）" />
          <FlatMesh y={244} index="2" label="Mesh 2（右轮）" />

          {/* 右栏旁注 */}
          <text
            x="560"
            y="340"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            层级没了，只剩一列网格
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Assimp 读进来的是一棵有父子层级的 <code>aiNode</code> 树（场景图）；
        <code>processNode</code> 做深度优先递归——
        <strong>
          每到一个节点，先收它自己的 mMeshes，再依次递归它的每个子节点
        </strong>
        ——把整棵树压平成一个按访问顺序排开的 <code>vector&lt;Mesh&gt;</code>。
        漏了递归子节点，就只收到根节点那几个网格，模型残缺——这是本章头号坑。
      </figcaption>
    </figure>
  );
}

/** DFS 步序编号小圈（warning 黄填充 + 深色数字）。 */
function DfsStep({ n, cx, cy }: { n: string; cx: number; cy: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r="8" fill="var(--warning)" />
      <text
        x={cx}
        y={cy + 3.5}
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fill="var(--bg)"
      >
        {n}
      </text>
    </>
  );
}

/** 右栏扁平列表里的一个 Mesh 条目（success 绿框 + 序号 + 标签）。 */
function FlatMesh({
  y,
  index,
  label,
}: {
  y: number;
  index: string;
  label: string;
}) {
  return (
    <>
      <rect
        x="488"
        y={y}
        width="144"
        height="56"
        rx="8"
        fill="var(--bg-elevated)"
        stroke="var(--success)"
        strokeWidth="1.5"
      />
      <text
        x="560"
        y={y + 24}
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="var(--text-primary)"
      >
        {label}
      </text>
      <text
        x="560"
        y={y + 42}
        textAnchor="middle"
        fontSize="9"
        fill="var(--text-secondary)"
      >
        meshes[{index}]
      </text>
    </>
  );
}
