/**
 * <GncUdpReliableDiagram>：可靠 UDP 传输——TCP vs UDP 对比与 ACK/重传机制图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function GncUdpReliableDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="可靠 UDP 传输机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            可靠 UDP：序号 + ACK + 重传
          </text>

          {/* 左侧：TCP 队头阻塞 */}
          <rect x="20" y="48" width="340" height="170" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="190" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">TCP：队头阻塞</text>

          <rect x="40" y="82" width="40" height="24" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="60" y="98" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">P1</text>
          <rect x="86" y="82" width="40" height="24" rx="4" fill="var(--danger)" fillOpacity="0.2" stroke="var(--danger)" strokeWidth="1" />
          <text x="106" y="98" textAnchor="middle" fontSize="9" fill="var(--danger)">P2 丢</text>
          <rect x="132" y="82" width="40" height="24" rx="4" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="152" y="98" textAnchor="middle" fontSize="9" fill="var(--warning)">P3 等待</text>
          <rect x="178" y="82" width="40" height="24" rx="4" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="198" y="98" textAnchor="middle" fontSize="9" fill="var(--warning)">P4 等待</text>

          <text x="190" y="126" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">P2 丢失 → P3 P4 已到达却被阻塞</text>
          <text x="190" y="144" textAnchor="middle" fontSize="10" fill="var(--danger)">全部等 P2 重传 → 延迟雪崩</text>
          <text x="190" y="170" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">面向流：保证顺序，代价是队头阻塞</text>
          <text x="190" y="190" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">200ms 前的位置到了也没用，但 TCP 依然卡住</text>

          {/* 右侧：UDP 按需可靠 */}
          <rect x="380" y="48" width="340" height="170" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="550" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">可靠 UDP：按需可靠性</text>

          <rect x="400" y="82" width="40" height="24" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="420" y="98" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">P1</text>
          <rect x="446" y="82" width="40" height="24" rx="4" fill="var(--danger)" fillOpacity="0.2" stroke="var(--danger)" strokeWidth="1" />
          <text x="466" y="98" textAnchor="middle" fontSize="9" fill="var(--danger)">P2 丢</text>
          <rect x="492" y="82" width="40" height="24" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="512" y="98" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">P3 直达</text>
          <rect x="538" y="82" width="40" height="24" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="558" y="98" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">P4 直达</text>

          <text x="550" y="126" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">P2 丢失 → P3 P4 正常交付</text>
          <text x="550" y="144" textAnchor="middle" fontSize="10" fill="var(--success)">P2 超时重传，旧位置可丢弃</text>
          <text x="550" y="170" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">面向消息：每包独立，不阻塞</text>
          <text x="550" y="190" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">重要包重传，过时包丢弃</text>

          {/* 下方：ACK 位域机制 */}
          <rect x="20" y="234" width="700" height="186" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="254" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">ACK 位域：一个 ACK 确认 33 个包</text>

          {/* 发送端 */}
          <text x="60" y="280" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--text-primary)">发送端</text>
          <rect x="40" y="288" width="30" height="22" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="55" y="303" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">100</text>
          <rect x="74" y="288" width="30" height="22" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="89" y="303" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">101</text>
          <rect x="108" y="288" width="30" height="22" rx="3" fill="var(--warning)" fillOpacity="0.2" stroke="var(--warning)" strokeWidth="1" />
          <text x="123" y="303" textAnchor="middle" fontSize="8" fill="var(--warning)">102</text>
          <rect x="142" y="288" width="30" height="22" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="157" y="303" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">103</text>

          {/* ACK 包 */}
          <rect x="250" y="284" width="180" height="30" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="340" y="298" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">ACK 包</text>
          <text x="340" y="310" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">ack=101 位域=0b1010</text>

          {/* 接收端 */}
          <text x="560" y="280" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--text-primary)">接收端</text>
          <rect x="540" y="288" width="30" height="22" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="555" y="303" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">100</text>
          <rect x="574" y="288" width="30" height="22" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="589" y="303" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">101</text>
          <rect x="608" y="288" width="30" height="22" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="623" y="303" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">103</text>

          {/* 箭头 */}
          <text x="225" y="303" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="470" y="303" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <text x="370" y="340" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ack=101 表示 101 及之前都收到</text>
          <text x="370" y="356" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">位域 0b1010：103 收到、102 没收到</text>
          <text x="370" y="376" textAnchor="middle" fontSize="10" fill="var(--accent)">即使部分 ACK 丢失，后续 ACK 位域也能补确认</text>
          <text x="370" y="396" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">→ 大幅减少不必要的重传</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        可靠 UDP 传输——TCP 队头阻塞 vs UDP 按需可靠，以及 ACK 位域机制
      </figcaption>
    </figure>
  );
}
