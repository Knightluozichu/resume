"use client";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

const traceCases = [
  {
    label: "初始化",
    fields: [
      ["成本表", "A=6, B=2, Finish=∞"],
      ["父节点", "A←Start, B←Start"],
      ["已处理", "空集合"],
      ["下一节点", "B，当前成本2"],
    ],
  },
  {
    label: "处理B",
    fields: [
      ["候选B→A", "2+3=5，优于6"],
      ["更新A", "成本5，父节点B"],
      ["候选B→Finish", "2+5=7，优于∞"],
      ["已处理", "B"],
    ],
  },
  {
    label: "处理A",
    fields: [
      ["当前成本", "A=5"],
      ["候选A→Finish", "5+1=6，优于7"],
      ["更新Finish", "成本6，父节点A"],
      ["已处理", "B, A"],
    ],
  },
  {
    label: "处理Finish",
    fields: [
      ["最终成本", "6"],
      ["父节点回溯", "Finish←A←B←Start"],
      ["正向路径", "Start→B→A→Finish"],
      ["状态", "目标已确定"],
    ],
    alert: "每次松弛必须同时更新成本和父节点，否则只能得到距离，无法恢复对应路径。",
  },
] as const;

const pianoCases = [
  {
    label: "从书出发",
    fields: [
      ["书→唱片", "$5"],
      ["书→海报", "$0"],
      ["最低未处理", "海报，成本$0"],
      ["目标", "换到钢琴"],
    ],
  },
  {
    label: "处理海报",
    fields: [
      ["海报→贝斯", "$30"],
      ["海报→架子鼓", "$35"],
      ["当前成本", "贝斯30，架子鼓35"],
      ["下一节点", "唱片，成本$5"],
    ],
  },
  {
    label: "处理唱片",
    fields: [
      ["唱片→贝斯", "$15"],
      ["新贝斯成本", "$20，更新"],
      ["唱片→架子鼓", "$20"],
      ["新架子鼓成本", "$25，更新"],
    ],
  },
  {
    label: "换到钢琴",
    fields: [
      ["贝斯→钢琴", "$20，总计$40"],
      ["架子鼓→钢琴", "$10，总计$35"],
      ["最低成本", "$35"],
      ["路径", "书→唱片→架子鼓→钢琴"],
    ],
    alert: "边数最少不等于总成本最低；Dijkstra比较的是整条路径的权重和。",
  },
] as const;

export function WeightedPathDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 360"
          role="img"
          aria-label="从Start到Finish有一条两段、总时间7分钟的路径，也有一条三段、总时间6分钟的路径；BFS选择边数少的路径，Dijkstra选择权重和小的路径。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker id="weighted-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={accent} />
            </marker>
          </defs>
          <text x="380" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>最少边数不一定是最小总成本</text>

          <rect x="32" y="58" width="696" height="220" fill="var(--bg)" stroke={border} />
          <line x1="116" y1="120" x2="334" y2="91" stroke={danger} strokeWidth="4" markerEnd="url(#weighted-arrow)" />
          <line x1="386" y1="91" x2="626" y2="120" stroke={danger} strokeWidth="4" markerEnd="url(#weighted-arrow)" />
          <text x="220" y="91" textAnchor="middle" fontSize="11" fontWeight="700" fill={danger}>3分钟</text>
          <text x="510" y="91" textAnchor="middle" fontSize="11" fontWeight="700" fill={danger}>4分钟</text>

          <line x1="116" y1="144" x2="251" y2="214" stroke={success} strokeWidth="4" markerEnd="url(#weighted-arrow)" />
          <line x1="302" y1="220" x2="458" y2="220" stroke={success} strokeWidth="4" markerEnd="url(#weighted-arrow)" />
          <line x1="508" y1="214" x2="626" y2="144" stroke={success} strokeWidth="4" markerEnd="url(#weighted-arrow)" />
          <text x="174" y="195" textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>2分钟</text>
          <text x="380" y="208" textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>2分钟</text>
          <text x="566" y="195" textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>2分钟</text>

          {[
            { label: "Start", x: 88, y: 132, tone: accent },
            { label: "A", x: 360, y: 86, tone: danger },
            { label: "B", x: 276, y: 220, tone: success },
            { label: "C", x: 484, y: 220, tone: success },
            { label: "Finish", x: 656, y: 132, tone: accent },
          ].map((node) => (
            <g key={node.label}>
              <circle cx={node.x} cy={node.y} r="28" fill={node.tone} fillOpacity="0.11" stroke={node.tone} />
              <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{node.label}</text>
            </g>
          ))}

          <rect x="72" y="298" width="616" height="40" rx="4" fill={warning} fillOpacity="0.07" stroke={warning} strokeOpacity="0.55" />
          <text x="380" y="315" textAnchor="middle" fontSize="11" fill={primary}>BFS会选上方2条边但耗时7分钟；Dijkstra会选下方3条边但只耗时6分钟。</text>
          <text x="380" y="329" textAnchor="middle" fontSize="11" fill={secondary}>带权图的路径成本等于沿途边权之和。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        BFS优化边数；Dijkstra在非负权图上优化总权重。
      </figcaption>
    </figure>
  );
}
export function NegativeEdgeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 350"
          role="img"
          aria-label="有向无环图中Start到A权重2，Start到B权重5，B到A权重负10。Dijkstra会先把A以成本2处理，但真实最短成本经B到A为负5。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker id="negative-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={danger} />
            </marker>
          </defs>
          <text x="380" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>负权边会推翻“已处理即最优”</text>
          <rect x="56" y="58" width="648" height="205" fill="var(--bg)" stroke={border} />
          <line x1="174" y1="145" x2="535" y2="98" stroke={accent} strokeWidth="3" markerEnd="url(#negative-arrow)" />
          <line x1="174" y1="164" x2="350" y2="219" stroke={warning} strokeWidth="3" markerEnd="url(#negative-arrow)" />
          <line x1="406" y1="218" x2="551" y2="127" stroke={danger} strokeWidth="4" markerEnd="url(#negative-arrow)" />
          <text x="350" y="101" textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>2</text>
          <text x="254" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>5</text>
          <text x="487" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>-10</text>

          {[
            { label: "Start", x: 140, y: 154, tone: success },
            { label: "B", x: 378, y: 228, tone: warning },
            { label: "A", x: 576, y: 112, tone: danger },
          ].map((node) => (
            <g key={node.label}>
              <circle cx={node.x} cy={node.y} r="31" fill={node.tone} fillOpacity="0.11" stroke={node.tone} />
              <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{node.label}</text>
            </g>
          ))}

          <rect x="70" y="286" width="620" height="42" rx="4" fill={danger} fillOpacity="0.06" stroke={danger} strokeOpacity="0.55" />
          <text x="380" y="303" textAnchor="middle" fontSize="11" fill={primary}>算法先处理A=2；后来处理B才发现5+(-10)=-5，但A已经被锁定。</text>
          <text x="380" y="318" textAnchor="middle" fontSize="11" fill={secondary}>反例没有环：问题来自负权边本身，而不是必须存在负权环。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        有负权边时改用Bellman-Ford；若存在从起点可达的负权环，有限最短路径可能不存在。
      </figcaption>
    </figure>
  );
}
