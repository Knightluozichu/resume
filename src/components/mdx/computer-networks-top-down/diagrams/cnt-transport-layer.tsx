"use client";

export function CntTransportLayerDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="传输层UDP与TCP对比图">
      <defs>
        <linearGradient id="cnt-tcp-udp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cnt-tcp-tcp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cnt-tcp-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="cnt-tcp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">传输层：UDP vs TCP 与可靠传输</text>

      {/* UDP vs TCP 对比 */}
      <rect x="30" y="50" width="360" height="200" rx="10" fill="url(#cnt-tcp-udp)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="210" y="76" textAnchor="middle" fontSize="15" fontWeight="700" fill="#92400e">UDP（无连接）</text>
      <line x1="50" y1="86" x2="370" y2="86" stroke="#f59e0b" strokeWidth="1" opacity="0.4" />
      <text x="50" y="106" fontSize="12" fill="#78350f">连接方式：无连接，直接发送</text>
      <text x="50" y="126" fontSize="12" fill="#78350f">可靠性：不保证送达、不保证有序</text>
      <text x="50" y="146" fontSize="12" fill="#78350f">流量/拥塞控制：无</text>
      <text x="50" y="166" fontSize="12" fill="#78350f">首部大小：8字节（小）</text>
      <text x="50" y="186" fontSize="12" fill="#78350f">速度：快（无握手/确认开销）</text>
      <text x="50" y="206" fontSize="12" fill="#78350f">场景：DNS / 视频流 / 实时游戏</text>
      <text x="50" y="232" fontSize="11" fontWeight="600" fill="#b45309">分解：仅用（目标IP, 目标端口）二元组</text>

      <rect x="410" y="50" width="360" height="200" rx="10" fill="url(#cnt-tcp-tcp)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="590" y="76" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1e40af">TCP（面向连接）</text>
      <line x1="430" y1="86" x2="750" y2="86" stroke="#2563eb" strokeWidth="1" opacity="0.4" />
      <text x="430" y="106" fontSize="12" fill="#1e3a8a">连接方式：三次握手建立连接</text>
      <text x="430" y="126" fontSize="12" fill="#1e3a8a">可靠性：保证送达、有序（序号+ACK+重传）</text>
      <text x="430" y="146" fontSize="12" fill="#1e3a8a">流量控制：接收窗口(rwnd)</text>
      <text x="430" y="166" fontSize="12" fill="#1e3a8a">拥塞控制：AIMD / cwnd</text>
      <text x="430" y="186" fontSize="12" fill="#1e3a8a">首部大小：20字节</text>
      <text x="430" y="206" fontSize="12" fill="#1e3a8a">场景：HTTP / SSH / 邮件 / 文件传输</text>
      <text x="430" y="232" fontSize="11" fontWeight="600" fill="#1d4ed8">分解：用四元组（源/目标IP + 源/目标端口）</text>

      {/* 三次握手 */}
      <text x="400" y="282" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">TCP三次握手与四次挥手</text>

      <rect x="50" y="300" width="120" height="40" rx="8" fill="url(#cnt-tcp-tcp)" opacity="0.9" />
      <text x="110" y="325" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">客户端</text>

      <rect x="630" y="300" width="120" height="40" rx="8" fill="url(#cnt-tcp-tcp)" opacity="0.9" />
      <text x="690" y="325" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">服务器</text>

      {/* 握手箭头 */}
      <path d="M170 350 L630 350" stroke="#2563eb" strokeWidth="2" markerEnd="url(#cnt-tcp-arrow)" />
      <text x="400" y="344" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="600">① SYN seq=x</text>

      <path d="M630 380 L170 380" stroke="#0891b2" strokeWidth="2" markerEnd="url(#cnt-tcp-arrow)" />
      <text x="400" y="374" textAnchor="middle" fontSize="11" fill="#0e7490" fontWeight="600">② SYN seq=y, ACK ack=x+1</text>

      <path d="M170 410 L630 410" stroke="#10b981" strokeWidth="2" markerEnd="url(#cnt-tcp-arrow)" />
      <text x="400" y="404" textAnchor="middle" fontSize="11" fill="#059669" fontWeight="600">③ ACK ack=y+1 → ESTABLISHED</text>

      {/* 滑动窗口 */}
      <rect x="30" y="440" width="740" height="70" rx="10" fill="url(#cnt-tcp-flow)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="400" y="462" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">TCP可靠传输：滑动窗口 + 累积ACK</text>
      <text x="400" y="484" textAnchor="middle" fontSize="11" fill="#475569">已确认 │ 窗口内（可发送） │ 不可发送</text>
      <text x="400" y="500" textAnchor="middle" fontSize="10" fill="#64748b">RTT估计: EstimatedRTT = 0.875*EstRTT + 0.125*SampleRTT · 超时 = EstRTT + 4*DevRTT</text>
    </svg>
  );
}
