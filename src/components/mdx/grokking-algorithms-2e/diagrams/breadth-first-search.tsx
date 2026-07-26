"use client";

import { GrokkingAlgorithmsLab } from "./official-lab";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

const mangoCases = [
  {
    label: "初始化",
    fields: [
      ["队列", "alice, bob, claire"],
      ["来源", "you的一度关系"],
      ["已搜索", "空集合"],
      ["下一步", "alice出队"],
    ],
  },
  {
    label: "检查alice",
    fields: [
      ["出队", "alice，不是销售商"],
      ["新邻居", "peggy"],
      ["队列", "bob, claire, peggy"],
      ["已搜索", "alice"],
    ],
  },
  {
    label: "检查bob",
    fields: [
      ["出队", "bob，不是销售商"],
      ["新邻居", "anuj, peggy"],
      ["去重", "peggy已发现，不再入队"],
      ["队列", "claire, peggy, anuj"],
    ],
  },
  {
    label: "命中claire",
    fields: [
      ["出队", "claire"],
      ["谓词", "名字以m结尾"],
      ["结果", "claire不命中，继续"],
      ["保证", "先查完一度再进入二度"],
    ],
    alert: "示例谓词只是教学占位；BFS保证的是检查层级顺序，不保证业务谓词本身合理。",
  },
] as const;

const topoCases = [
  {
    label: "初始依赖",
    fields: [
      ["边", "需求→设计→实现→测试"],
      ["含义", "前驱必须先完成"],
      ["入度为0", "需求"],
      ["队列", "需求"],
    ],
  },
  {
    label: "移除需求",
    fields: [
      ["输出", "需求"],
      ["删除边", "需求→设计"],
      ["新入度为0", "设计"],
      ["队列", "设计"],
    ],
  },
  {
    label: "继续推进",
    fields: [
      ["输出", "需求, 设计, 实现"],
      ["剩余", "测试"],
      ["队列", "测试"],
      ["最终顺序", "满足所有依赖边"],
    ],
  },
  {
    label: "检测环",
    fields: [
      ["若存在", "设计↔实现"],
      ["现象", "剩余节点入度都大于0"],
      ["输出数量", "少于节点总数"],
      ["结论", "不存在完整拓扑序"],
    ],
    alert: "拓扑排序只适用于有向无环图；存在环时，依赖无法排成满足全部边的线性顺序。",
  },
] as const;

export function GraphDirectionDiagram() {
  const nodes = [
    { id: "you", x: 110, y: 120 },
    { id: "alice", x: 285, y: 78 },
    { id: "bob", x: 285, y: 162 },
    { id: "peggy", x: 460, y: 120 },
  ];
  const nodeById = Object.fromEntries(nodes.map((node) => [node.id, node]));
  const edges = [
    ["you", "alice"],
    ["you", "bob"],
    ["alice", "peggy"],
    ["bob", "peggy"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 390"
          role="img"
          aria-label="左侧有向图中you指向alice和bob，alice和bob指向peggy；右侧无向图中站点A、B、C的边可双向通行。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker id="graph-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={accent} />
            </marker>
          </defs>
          <text x="380" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>图由节点和边组成</text>
          <text x="250" y="54" textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>有向图：关系有方向</text>
          <text x="620" y="54" textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>无向图：边可双向通行</text>

          <rect x="28" y="68" width="474" height="210" fill="var(--bg)" stroke={border} />
          {edges.map(([from, to]) => {
            const a = nodeById[from];
            const b = nodeById[to];
            return (
              <line
                key={`${from}-${to}`}
                x1={a.x + 30}
                y1={a.y}
                x2={b.x - 34}
                y2={b.y}
                stroke={accent}
                strokeWidth="1.5"
                markerEnd="url(#graph-arrow)"
              />
            );
          })}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r="30" fill={accent} fillOpacity="0.1" stroke={accent} />
              <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{node.id}</text>
            </g>
          ))}
          <text x="265" y="256" textAnchor="middle" fontSize="11" fill={secondary}>邻接表：you → [alice, bob]；alice → [peggy]</text>

          <rect x="522" y="68" width="210" height="210" fill="var(--bg)" stroke={border} />
          <line x1="580" y1="120" x2="675" y2="120" stroke={success} strokeWidth="2" />
          <line x1="580" y1="120" x2="625" y2="210" stroke={success} strokeWidth="2" />
          <line x1="675" y1="120" x2="625" y2="210" stroke={success} strokeWidth="2" />
          {[
            { id: "A", x: 580, y: 120 },
            { id: "B", x: 675, y: 120 },
            { id: "C", x: 625, y: 210 },
          ].map((node) => (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r="25" fill={success} fillOpacity="0.12" stroke={success} />
              <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{node.id}</text>
            </g>
          ))}
          <text x="627" y="256" textAnchor="middle" fontSize="11" fill={secondary}>A连接B也意味着B连接A</text>

          <rect x="90" y="304" width="580" height="48" rx="4" fill={accent} fillOpacity="0.05" stroke={accent} strokeOpacity="0.5" />
          <text x="380" y="324" textAnchor="middle" fontSize="11" fill={primary}>邻接关系表示连接；散列表把每个节点映射到它的邻居列表。</text>
          <text x="380" y="341" textAnchor="middle" fontSize="11" fill={secondary}>无向边在邻接表中通常保存为两个方向，复杂度仍记作O(V+E)。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        有向边只沿箭头通行；无向边可视为一对方向相反的有向边。
      </figcaption>
    </figure>
  );
}

export function BfsShortestPathDiagram() {
  const layers = [
    { distance: 0, nodes: ["you"], y: 72, tone: success },
    { distance: 1, nodes: ["alice", "bob", "claire"], y: 144, tone: accent },
    { distance: 2, nodes: ["peggy", "anuj", "jonny", "thom"], y: 226, tone: warning },
    { distance: 3, nodes: ["seller"], y: 308, tone: danger },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 390"
          role="img"
          aria-label="BFS从you开始，先检查距离0，再检查alice、bob、claire等一度关系，随后检查二度和三度关系，第一次发现seller时得到最少边数。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x="380" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>BFS按边数逐层推进</text>
          {layers.map((layer) => (
            <g key={layer.distance}>
              <rect x="40" y={layer.y - 24} width="680" height="54" rx="4" fill={layer.tone} fillOpacity="0.06" stroke={layer.tone} strokeOpacity="0.55" />
              <text x="62" y={layer.y + 8} fontSize="11" fontWeight="700" fill={layer.tone}>距离{layer.distance}</text>
              {layer.nodes.map((node, index) => {
                const gap = 470 / layer.nodes.length;
                const x = 180 + gap * index + gap / 2;
                return (
                  <g key={node}>
                    <rect x={x - 44} y={layer.y - 13} width="88" height="32" rx="4" fill="var(--bg)" stroke={layer.tone} />
                    <text x={x} y={layer.y + 7} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{node}</text>
                  </g>
                );
              })}
            </g>
          ))}
          <text x="380" y="376" textAnchor="middle" fontSize="11" fill={secondary}>队列保证距离d的节点全部先于距离d+1的节点出队。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        在每条边成本相同的图上，节点第一次被发现时记录的距离就是最少边数。
      </figcaption>
    </figure>
  );
}

export function MangoSellerQueueLab() {
  return (
    <GrokkingAlgorithmsLab
      cases={mangoCases}
      caption="芒果销售商示例中，邻居按发现顺序进入队列，一度关系始终先于二度关系检查。"
      tone="cyan"
    />
  );
}

export function TopologicalSortLab() {
  return (
    <GrokkingAlgorithmsLab
      cases={topoCases}
      caption="Kahn拓扑排序反复取入度为0的节点；若仍有节点却没有可取节点，图中存在依赖环。"
      tone="violet"
    />
  );
}
