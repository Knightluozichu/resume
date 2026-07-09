"use client";

export function TipTcpTimersDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="TCP超时与重传机制">
      <defs>
        <linearGradient id="tip-tm-rtt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tip-tm-timer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="tip-tm-cong" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <marker id="tip-tm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">TCP 超时与重传</text>

      {/* RTT 与 RTO */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">RTT 估计与 RTO 计算</text>

      <rect x="20" y="72" width="380" height="170" rx="10" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1.5" />
      <text x="40" y="96" fontSize="12" fontWeight="700" fill="#4c1d95">RTT（往返时间）测量</text>
      <text x="40" y="118" fontSize="10" fill="#5b21b6">SRTT = (1-α)·SRTT + α·R    （α=1/8）</text>
      <text x="40" y="134" fontSize="10" fill="#6d28d9">SRTT = 平滑RTT，R = 本次测量RTT</text>
      <text x="40" y="158" fontSize="10" fill="#5b21b6">RTTVAR = (1-β)·RTTVAR + β·|SRTT - R|  （β=1/4）</text>
      <text x="40" y="174" fontSize="10" fill="#6d28d9">RTTVAR = RTT方差</text>
      <text x="40" y="198" fontSize="10" fontWeight="600" fill="#4c1d95">RTO = SRTT + max(G, 4·RTTVAR)</text>
      <text x="40" y="214" fontSize="9" fill="#7c3aed">G = 时钟粒度；RTO 下限通常 1s，上限 60s</text>
      <text x="40" y="232" fontSize="9" fill="#7c3aed">Karn算法：重传的包不参与RTT估计</text>

      {/* 定时器类型 */}
      <text x="600" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">TCP 定时器</text>

      <rect x="420" y="72" width="360" height="170" rx="10" fill="#fffbeb" stroke="#fde047" strokeWidth="1.5" />
      <text x="440" y="96" fontSize="11" fontWeight="600" fill="#854d0e">重传定时器（Retransmission）</text>
      <text x="440" y="112" fontSize="9" fill="#713f12">已发数据未收到ACK → 超时重传</text>

      <text x="440" y="134" fontSize="11" fontWeight="600" fill="#854d0e">坚持定时器（Persistence）</text>
      <text x="440" y="150" fontSize="9" fill="#713f12">Window=0 后周期性探测窗口</text>

      <text x="440" y="172" fontSize="11" fontWeight="600" fill="#854d0e">保活定时器（Keepalive）</text>
      <text x="440" y="188" fontSize="9" fill="#713f12">连接空闲超时 → 探测对端是否存活</text>

      <text x="440" y="210" fontSize="11" fontWeight="600" fill="#854d0e">2MSL 定时器（TIME_WAIT）</text>
      <text x="440" y="226" fontSize="9" fill="#713f12">等待 2·MSL 确保延迟包消亡</text>

      {/* 重传场景 */}
      <text x="400" y="272" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">超时重传与快速重传</text>

      <rect x="40" y="286" width="120" height="80" rx="8" fill="url(#tip-tm-rtt)" opacity="0.9" />
      <text x="100" y="332" textAnchor="middle" fontSize="11" fill="#fff">发送方</text>

      <rect x="640" y="286" width="120" height="80" rx="8" fill="url(#tip-tm-rtt)" opacity="0.9" />
      <text x="700" y="332" textAnchor="middle" fontSize="11" fill="#fff">接收方</text>

      <path d="M160 300 L640 300" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tip-tm-arrow)" />
      <text x="400" y="294" textAnchor="middle" fontSize="9" fill="#5b21b6">seq=1, 数据包1</text>

      <path d="M160 318 L640 318" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tip-tm-arrow)" />
      <text x="400" y="312" textAnchor="middle" fontSize="9" fill="#5b21b6">seq=101, 数据包2（丢失）</text>

      <path d="M160 336 L640 336" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tip-tm-arrow)" />
      <text x="400" y="330" textAnchor="middle" fontSize="9" fill="#5b21b6">seq=201, 数据包3</text>

      <path d="M640 354 L160 354" stroke="#ef4444" strokeWidth="2" markerEnd="url(#tip-tm-arrow)" />
      <text x="400" y="368" textAnchor="middle" fontSize="9" fill="#dc2626">重复ACK ack=101（期望包2） ×3 → 快速重传</text>

      {/* 拥塞控制 */}
      <text x="400" y="398" textAnchor="middle" fontSize="14" fontWeight="700" fill="#dc2626">拥塞控制（cwnd 变化）</text>

      <rect x="20" y="412" width="760" height="130" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />

      <text x="40" y="436" fontSize="11" fontWeight="700" fill="#7f1d1d">慢启动（Slow Start）</text>
      <text x="40" y="454" fontSize="10" fill="#991b1b">cwnd 从1开始，每收到一个ACK cwnd+1（指数增长），到 ssthresh 转拥塞避免</text>

      <text x="40" y="476" fontSize="11" fontWeight="700" fill="#92400e">拥塞避免（Congestion Avoidance）</text>
      <text x="40" y="494" fontSize="10" fill="#713f12">cwnd 每个RTT加1（线性增长），直到丢包</text>

      <text x="40" y="516" fontSize="11" fontWeight="700" fill="#7f1d1d">快重传 + 快恢复</text>
      <text x="40" y="534" fontSize="10" fill="#991b1b">3个重复ACK → 快重传丢失包；ssthresh=cwnd/2，cwnd=ssthresh（快恢复，非回到1）</text>
    </svg>
  );
}
