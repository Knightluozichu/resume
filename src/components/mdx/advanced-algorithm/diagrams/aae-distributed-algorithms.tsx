/**
 * <AaeDistributedAlgorithmsDiagram>：分布式算法图解（advanced-algorithm 分布式算法章）。
 *
 * 中心节点「共识 Consensus」，周围环绕四个核心概念并以箭头关联：
 *   - Paxos / Raft（accent 紫）：多数派投票 · 容错共识
 *   - Gossip 协议（success 绿）：谣言传播 · 最终一致
 *   - 向量时钟（warning 暖）：因果关系 · 事件偏序
 *   - CAP 定理三角（accent 紫）：C-A-P 三选二
 * CAP 用真实三角形示意一致性 / 可用性 / 分区容忍的取舍。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

// 中心
const CX = 360;
const CY = 268;

// 四周节点
const PAXOS = { x: 296, y: 78, w: 128, h: 54, color: accent, title: "Paxos / Raft", sub: "多数派投票 · 容错共识" };
const GOSSIP = { x: 500, y: 241, w: 128, h: 54, color: success, title: "Gossip 协议", sub: "谣言传播 · 最终一致" };
const VCLOCK = { x: 296, y: 404, w: 128, h: 54, color: warning, title: "向量时钟", sub: "因果关系 · 事件偏序" };
// CAP 三角形顶点（左侧）
const CAP_C = { x: 150, y: 196 };
const CAP_A = { x: 92, y: 312 };
const CAP_P = { x: 208, y: 312 };

const SURROUND = [PAXOS, GOSSIP, VCLOCK];

export function AaeDistributedAlgorithmsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="分布式算法图解。中心节点共识 Consensus，周围环绕四个核心概念并箭头关联：顶部 Paxos/Raft（紫色，多数派投票容错共识）；右侧 Gossip 协议（绿色，谣言传播最终一致）；底部向量时钟（暖色，因果关系事件偏序）；左侧 CAP 定理三角（紫色，一致性、可用性、分区容忍三选二）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="da-arr" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            分布式算法 · 以共识为核心
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            共识是分布式系统的中枢，向外辐射四类基础问题
          </text>

          {/* ===== CAP 三角形（左侧）===== */}
          <g>
            <polygon
              points={`${CAP_C.x},${CAP_C.y} ${CAP_A.x},${CAP_A.y} ${CAP_P.x},${CAP_P.y}`}
              fill={accent}
              fillOpacity="0.08"
              stroke={accent}
              strokeWidth="1.8"
            />
            {/* 三角形边标注：只能选两边 */}
            <text x={(CAP_C.x + CAP_A.x) / 2 - 10} y={(CAP_C.y + CAP_A.y) / 2} fontSize="10" fill={accent} fontFamily="monospace">CP</text>
            <text x={(CAP_C.x + CAP_P.x) / 2 + 4} y={(CAP_C.y + CAP_P.y) / 2} fontSize="10" fill={secondary} fontFamily="monospace">—</text>
            <text x={(CAP_A.x + CAP_P.x) / 2} y={(CAP_A.y + CAP_P.y) / 2 + 14} textAnchor="middle" fontSize="10" fill={accent} fontFamily="monospace">AP</text>
            {/* 顶点标签 */}
            <circle cx={CAP_C.x} cy={CAP_C.y} r="14" fill={elevated} stroke={accent} strokeWidth="1.6" />
            <text x={CAP_C.x} y={CAP_C.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">C</text>
            <circle cx={CAP_A.x} cy={CAP_A.y} r="14" fill={elevated} stroke={accent} strokeWidth="1.6" />
            <text x={CAP_A.x} y={CAP_A.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">A</text>
            <circle cx={CAP_P.x} cy={CAP_P.y} r="14" fill={elevated} stroke={accent} strokeWidth="1.6" />
            <text x={CAP_P.x} y={CAP_P.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">P</text>
            <text x={CAP_C.x} y={CAP_C.y - 22} textAnchor="middle" fontSize="10" fill={secondary}>一致性</text>
            <text x={CAP_A.x - 24} y={CAP_A.y + 4} textAnchor="middle" fontSize="10" fill={secondary}>可用性</text>
            <text x={CAP_P.x + 26} y={CAP_P.y + 4} textAnchor="middle" fontSize="10" fill={secondary}>分区</text>
            <text x={150} y={262} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={accent}>CAP 定理</text>
            <text x={150} y={278} textAnchor="middle" fontSize="10" fill={secondary}>三选二</text>
          </g>

          {/* ===== 中心 → CAP 连线 ===== */}
          <line x1={CX - 56} y1={CY} x2={CAP_P.x + 14} y2={CAP_P.y - 10} stroke={secondary} strokeWidth="1.4" strokeOpacity="0.6" strokeDasharray="5 3" markerEnd="url(#da-arr)" />

          {/* ===== 中心 → 三个矩形节点 连线 ===== */}
          {SURROUND.map((n) => {
            const nx = n.x + n.w / 2;
            const ny = n.y + n.h / 2;
            return (
              <line key={`link-${n.title}`} x1={CX} y1={CY} x2={nx} y2={ny} stroke={n.color} strokeWidth="1.8" strokeOpacity="0.45" markerEnd="url(#da-arr)" />
            );
          })}

          {/* ===== 三个矩形节点 ===== */}
          {SURROUND.map((n) => (
            <g key={n.title}>
              <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="10" fill={n.color} fillOpacity="0.08" stroke={n.color} strokeWidth="1.8" />
              <text x={n.x + n.w / 2} y={n.y + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={n.color} fontFamily="monospace">
                {n.title}
              </text>
              <text x={n.x + n.w / 2} y={n.y + 41} textAnchor="middle" fontSize="10.5" fill={secondary}>
                {n.sub}
              </text>
            </g>
          ))}

          {/* ===== 中心节点：共识 ===== */}
          <circle cx={CX} cy={CY} r="58" fill={primary} fillOpacity="0.06" stroke={primary} strokeWidth="2.4" />
          <text x={CX} y={CY - 4} textAnchor="middle" fontSize="15" fontWeight="700" fill={primary}>
            共识
          </text>
          <text x={CX} y={CY + 16} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary} fontFamily="monospace">
            Consensus
          </text>

          {/* 底部总结 */}
          <line x1={32} y1={470} x2={VIEW_W - 32} y2={470} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={490} textAnchor="middle" fontSize="11.5" fill={secondary}>
            多数派达成共识 · Gossip 传播状态 · 向量时钟定因果 · CAP 划定边界
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分布式算法以共识（Consensus）为中心：Paxos/Raft（多数派投票容错共识）、Gossip 协议（谣言传播最终一致）、向量时钟（因果关系事件偏序）、CAP 定理（一致性/可用性/分区容忍三选二）四类基础问题环绕关联。
      </figcaption>
    </figure>
  );
}
