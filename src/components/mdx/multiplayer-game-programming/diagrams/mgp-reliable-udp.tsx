/**
 * <MgpReliableUdpDiagram>：可靠 UDP 实现图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function MgpReliableUdpDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="可靠 UDP 实现图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            可靠 UDP：序号、ACK 与重传
          </text>

          {/* 上方：双通道设计 */}
          <rect x="30" y="48" width="680" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">双通道设计</text>

          <rect x="50" y="80" width="300" height="38" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="200" y="97" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">可靠通道</text>
          <text x="200" y="111" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">输入 / 登录 / 聊天 — ACK + 重传</text>

          <rect x="370" y="80" width="320" height="38" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="530" y="97" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">不可靠通道</text>
          <text x="530" y="111" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">位置快照 / 动画 — 丢了就算</text>

          {/* 中间：序号与 ACK 流程 */}
          <rect x="30" y="144" width="680" height="180" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="164" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">序号 → ACK → 重传 闭环</text>

          {/* 发送方 */}
          <text x="100" y="186" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">发送方</text>
          <line x1="100" y1="192" x2="100" y2="310" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* 接收方 */}
          <text x="640" y="186" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">接收方</text>
          <line x1="640" y1="192" x2="640" y2="310" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* 发送 seq=1 */}
          <line x1="102" y1="206" x2="638" y2="206" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="202" textAnchor="middle" fontSize="9" fill="var(--success)">发送: seq=1 [输入数据]</text>

          {/* ACK seq=1 */}
          <line x1="638" y1="226" x2="102" y2="226" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="3" />
          <text x="370" y="222" textAnchor="middle" fontSize="9" fill="var(--accent)">ACK: ack=1 (收到 seq 1)</text>

          {/* 发送 seq=2 */}
          <line x1="102" y1="246" x2="638" y2="246" stroke="var(--danger)" strokeWidth="1.2" strokeDasharray="4" />
          <text x="370" y="242" textAnchor="middle" fontSize="9" fill="var(--danger)">发送: seq=2 *** 丢失 ***</text>

          {/* 发送 seq=3 */}
          <line x1="102" y1="266" x2="638" y2="266" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="262" textAnchor="middle" fontSize="9" fill="var(--success)">发送: seq=3 [输入数据]</text>

          {/* ACK 位域: ack=1, bitfield=... */}
          <line x1="638" y1="286" x2="102" y2="286" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="3" />
          <text x="370" y="282" textAnchor="middle" fontSize="9" fill="var(--accent)">ACK: ack=1, bitfield=0b100 (seq 3 已收, 2 缺失)</text>

          {/* 重传 seq=2 */}
          <line x1="102" y1="306" x2="638" y2="306" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="302" textAnchor="middle" fontSize="9" fill="var(--warning)">重传: seq=2 (RTO 超时未确认)</text>

          {/* 累积确认 + ACK 位域说明 */}
          <rect x="30" y="338" width="335" height="70" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" />
          <text x="197" y="358" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">累积确认</text>
          <text x="197" y="374" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">ack=N 确认所有 seq &lt;= N</text>
          <text x="197" y="388" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">大幅减少 ACK 包数量</text>
          <text x="197" y="402" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">一个 ACK 确认一批包</text>

          <rect x="375" y="338" width="335" height="70" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" />
          <text x="542" y="358" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">ACK 位域 (bitfield)</text>
          <text x="542" y="374" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">32-bit bitmask 标记后续 32 个包</text>
          <text x="542" y="388" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">乱序到达也能批量确认</text>
          <text x="542" y="402" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">一个 ACK 最多确认 33 个包</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        可靠 UDP 实现——双通道、序号/ACK/重传闭环与累积确认+位域
      </figcaption>
    </figure>
  );
}
