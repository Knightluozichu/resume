/**
 * <MgpFinalReviewDiagram>：全书总复习图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function MgpFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书总复习图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全书知识图谱：四层架构与核心权衡
          </text>

          {/* 四层架构 - 左列 */}
          <rect x="30" y="50" width="340" height="360" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="200" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">四层架构回顾</text>

          {/* 传输层 */}
          <rect x="50" y="84" width="300" height="70" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="200" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">传输层（第 2-3 章）</text>
          <text x="60" y="118" fontSize="9" fill="var(--text-secondary)">IP/端口/字节序 + UDP vs TCP 选型</text>
          <text x="60" y="132" fontSize="9" fill="var(--text-tertiary)">问题：数据怎么走？走哪条路？</text>
          <text x="60" y="146" fontSize="9" fill="var(--text-tertiary)">权衡：UDP 快但不可靠 vs TCP 可靠但阻塞</text>

          {/* 连接层 */}
          <rect x="50" y="164" width="300" height="70" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="200" y="182" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">连接层（第 4-5 章）</text>
          <text x="60" y="198" fontSize="9" fill="var(--text-secondary)">连接状态机 + NAT 穿透（STUN/TURN）</text>
          <text x="60" y="212" fontSize="9" fill="var(--text-tertiary)">问题：怎么建会话？怎么穿 NAT？</text>
          <text x="60" y="226" fontSize="9" fill="var(--text-tertiary)">权衡：安全性 vs 简单性</text>

          {/* 可靠层 */}
          <rect x="50" y="244" width="300" height="70" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="200" y="262" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">可靠层（第 6-7 章）</text>
          <text x="60" y="278" fontSize="9" fill="var(--text-secondary)">可靠 UDP（ACK/重传）+ 流量控制（AIMD）</text>
          <text x="60" y="292" fontSize="9" fill="var(--text-tertiary)">问题：数据不丢？不堵？</text>
          <text x="60" y="306" fontSize="9" fill="var(--text-tertiary)">权衡：可靠性 vs 延迟</text>

          {/* 同步层 */}
          <rect x="50" y="324" width="300" height="70" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="200" y="342" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">同步层（第 8-9 章）</text>
          <text x="60" y="358" fontSize="9" fill="var(--text-secondary)">客户端预测校正 + 实体插值</text>
          <text x="60" y="372" fontSize="9" fill="var(--text-tertiary)">问题：玩家感觉不到延迟？</text>
          <text x="60" y="386" fontSize="9" fill="var(--text-tertiary)">权衡：即时性 vs 一致性</text>

          {/* 右列：核心权衡 */}
          <rect x="390" y="50" width="320" height="360" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="550" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">三大核心权衡</text>

          {/* 权衡1 */}
          <rect x="410" y="84" width="280" height="90" rx="6" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <text x="550" y="104" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">1. 延迟 vs 可靠</text>
          <text x="420" y="122" fontSize="9" fill="var(--text-secondary)">TCP 全可靠 &rarr; 队头阻塞</text>
          <text x="420" y="136" fontSize="9" fill="var(--text-secondary)">UDP 低延迟 + 按需可靠</text>
          <text x="420" y="152" fontSize="9" fill="var(--text-tertiary)">只重传重要包，快照丢了算了</text>
          <text x="420" y="166" fontSize="9" fill="var(--text-tertiary)">游戏网络的根本权衡</text>

          {/* 权衡2 */}
          <rect x="410" y="184" width="280" height="90" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" />
          <text x="550" y="204" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">2. 即时 vs 平滑</text>
          <text x="420" y="222" fontSize="9" fill="var(--text-secondary)">本地玩家：预测（0ms 延迟）</text>
          <text x="420" y="236" fontSize="9" fill="var(--text-secondary)">远程玩家：插值（100ms 延迟）</text>
          <text x="420" y="252" fontSize="9" fill="var(--text-tertiary)">预测可能出错需校正</text>
          <text x="420" y="266" fontSize="9" fill="var(--text-tertiary)">插值稳定但显示滞后</text>

          {/* 权衡3 */}
          <rect x="410" y="284" width="280" height="90" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" />
          <text x="550" y="304" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">3. 客户端 vs 服务器</text>
          <text x="420" y="322" fontSize="9" fill="var(--text-secondary)">服务器权威：防作弊但延迟</text>
          <text x="420" y="336" fontSize="9" fill="var(--text-secondary)">客户端预测：消延迟但可能错</text>
          <text x="420" y="352" fontSize="9" fill="var(--text-tertiary)">校正机制平衡两者</text>
          <text x="420" y="366" fontSize="9" fill="var(--text-tertiary)">预测在先，权威兜底</text>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y="432" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            一次按键 &rarr; 传输(UDP) &rarr; 连接(状态机) &rarr; 可靠(ACK) &rarr; 同步(预测) &rarr; 屏幕移动
          </text>
          <text x={VIEW_W / 2} y="452" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：每个技术选择都是某个权衡的体现——先定延迟预算，再逐层选技术
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书总复习——四层架构回顾与三大核心权衡总结
      </figcaption>
    </figure>
  );
}
