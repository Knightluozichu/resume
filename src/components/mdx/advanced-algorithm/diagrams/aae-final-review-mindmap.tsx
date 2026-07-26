/**
 * <AaeFinalReviewMindMap>：总复习思维导图（advanced-algorithm 收尾章）。
 *
 * 中心节点「高级算法与算法工程」，四条分支辐射到四角：
 *   - 数据结构（accent 紫）：跳表、B 树、布隆过滤器、倒排索引
 *   - 图与字符串（success 绿）：Dijkstra、A*、KMP、Trie
 *   - 概率算法（warning 暖）：近似比、Las Vegas、Monte Carlo
 *   - 分布式（accent 紫）：MapReduce、Raft、Gossip、CAP
 * 每个分支展开 3-4 个子节点。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×520（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 520;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

// 中心
const CX = 360;
const CY = 260;

interface Branch {
  name: string;
  color: string;
  x: number; // 分支节点中心
  y: number;
  children: { label: string; x: number; y: number }[];
}

const BRANCHES: readonly Branch[] = [
  {
    name: "数据结构",
    color: accent,
    x: 180,
    y: 140,
    children: [
      { label: "跳表", x: 72, y: 66 },
      { label: "B 树", x: 72, y: 104 },
      { label: "布隆过滤器", x: 72, y: 142 },
      { label: "倒排索引", x: 72, y: 180 },
    ],
  },
  {
    name: "图与字符串",
    color: success,
    x: 540,
    y: 140,
    children: [
      { label: "Dijkstra", x: 648, y: 66 },
      { label: "A*", x: 648, y: 104 },
      { label: "KMP", x: 648, y: 142 },
      { label: "Trie", x: 648, y: 180 },
    ],
  },
  {
    name: "概率算法",
    color: warning,
    x: 180,
    y: 380,
    children: [
      { label: "近似比", x: 72, y: 340 },
      { label: "Las Vegas", x: 72, y: 378 },
      { label: "Monte Carlo", x: 72, y: 416 },
    ],
  },
  {
    name: "分布式",
    color: accent,
    x: 540,
    y: 380,
    children: [
      { label: "MapReduce", x: 648, y: 340 },
      { label: "Raft", x: 648, y: 378 },
      { label: "Gossip", x: 648, y: 416 },
      { label: "CAP", x: 648, y: 454 },
    ],
  },
];

export function AaeFinalReviewMindMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="总复习思维导图。中心节点高级算法与算法工程，四条分支辐射：左上数据结构（紫色，跳表、B 树、布隆过滤器、倒排索引）；右上图与字符串（绿色，Dijkstra、A*、KMP、Trie）；左下概率算法（暖色，近似比、Las Vegas、Monte Carlo）；右下分布式（紫色，MapReduce、Raft、Gossip、CAP）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            高级算法与算法工程 · 总复习
          </text>

          {/* 中心 → 分支 连线 */}
          {BRANCHES.map((b) => (
            <line key={`cb-${b.name}`} x1={CX} y1={CY} x2={b.x} y2={b.y} stroke={b.color} strokeWidth="2.2" strokeOpacity="0.55" />
          ))}

          {/* 分支 → 子节点 连线 + 子节点 */}
          {BRANCHES.map((b) => (
            <g key={`br-${b.name}`}>
              {b.children.map((c) => (
                <line key={`cl-${b.name}-${c.label}`} x1={b.x} y1={b.y} x2={c.x} y2={c.y} stroke={b.color} strokeWidth="1.4" strokeOpacity="0.4" />
              ))}
              {/* 子节点药丸 */}
              {b.children.map((c) => (
                <g key={`cn-${b.name}-${c.label}`}>
                  <rect x={c.x - 46} y={c.y - 13} width="92" height="26" rx="13" fill={elevated} stroke={b.color} strokeWidth="1.4" strokeOpacity="0.6" />
                  <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={primary} fontFamily="monospace">
                    {c.label}
                  </text>
                </g>
              ))}
            </g>
          ))}

          {/* 分支节点 */}
          {BRANCHES.map((b) => (
            <g key={`bn-${b.name}`}>
              <rect x={b.x - 60} y={b.y - 18} width="120" height="36" rx="10" fill={b.color} fillOpacity="0.16" stroke={b.color} strokeWidth="1.8" />
              <text x={b.x} y={b.y + 5} textAnchor="middle" fontSize="13.5" fontWeight="700" fill={b.color}>
                {b.name}
              </text>
            </g>
          ))}

          {/* 中心节点 */}
          <circle cx={CX} cy={CY} r="58" fill={primary} fillOpacity="0.06" stroke={primary} strokeWidth="2.6" />
          <text x={CX} y={CY - 6} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            高级算法
          </text>
          <text x={CX} y={CY + 12} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            与算法工程
          </text>
          <text x={CX} y={CY + 32} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">
            Mind Map
          </text>

          {/* 底部说明 */}
          <line x1={32} y1={490} x2={VIEW_W - 32} y2={490} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={510} textAnchor="middle" fontSize="11.5" fill={secondary}>
            四大板块一图收束：结构为基，图串为脉，概率为变，分布为网
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        总复习思维导图：中心「高级算法与算法工程」辐射四分支——数据结构（跳表、B 树、布隆过滤器、倒排索引）、图与字符串（Dijkstra、A*、KMP、Trie）、概率算法（近似比、Las Vegas、Monte Carlo）、分布式（MapReduce、Raft、Gossip、CAP）。
      </figcaption>
    </figure>
  );
}
