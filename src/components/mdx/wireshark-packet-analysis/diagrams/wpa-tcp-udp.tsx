"use client";

export function WpaTcpUdpDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="TCP与UDP包头结构与握手流程">
      <defs>
        <linearGradient id="wpa-tu-tcp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="wpa-tu-udp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="wpa-tu-hand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="wpa-tu-state" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="wpa-tu-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="wpa-tu-arrow-r" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#0891b2" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">TCP 与 UDP 深入分析</text>

      {/* TCP 包头 */}
      <text x="200" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">TCP 包头（20 字节固定）</text>

      <rect x="20" y="70" width="160" height="36" rx="4" fill="url(#wpa-tu-tcp)" opacity="0.85" />
      <text x="100" y="92" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">源端口(16)</text>

      <rect x="184" y="70" width="160" height="36" rx="4" fill="url(#wpa-tu-tcp)" opacity="0.75" />
      <text x="264" y="92" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">目的端口(16)</text>

      <rect x="20" y="110" width="324" height="36" rx="4" fill="url(#wpa-tu-tcp)" opacity="0.65" />
      <text x="182" y="132" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">序列号 Seq(32)</text>

      <rect x="20" y="150" width="324" height="36" rx="4" fill="url(#wpa-tu-tcp)" opacity="0.65" />
      <text x="182" y="172" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">确认号 Ack(32)</text>

      <rect x="20" y="190" width="100" height="36" rx="4" fill="url(#wpa-tu-tcp)" opacity="0.75" />
      <text x="70" y="212" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">数据偏移+保留</text>

      <rect x="124" y="190" width="80" height="36" rx="4" fill="url(#wpa-tu-tcp)" opacity="0.85" />
      <text x="164" y="212" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">标志位(9)</text>

      <rect x="208" y="190" width="80" height="36" rx="4" fill="url(#wpa-tu-tcp)" opacity="0.75" />
      <text x="248" y="212" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">窗口(16)</text>

      <rect x="292" y="190" width="52" height="36" rx="4" fill="url(#wpa-tu-tcp)" opacity="0.75" />
      <text x="318" y="212" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">校验和</text>

      <text x="100" y="242" textAnchor="middle" fontSize="9" fill="#64748b">SYN/ACK/FIN/RST/PSH/URG</text>

      {/* UDP 包头 */}
      <text x="600" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">UDP 包头（8 字节）</text>

      <rect x="440" y="70" width="160" height="44" rx="4" fill="url(#wpa-tu-udp)" opacity="0.85" />
      <text x="520" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">源端口(16)</text>

      <rect x="604" y="70" width="156" height="44" rx="4" fill="url(#wpa-tu-udp)" opacity="0.75" />
      <text x="682" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">目的端口(16)</text>

      <rect x="440" y="120" width="160" height="44" rx="4" fill="url(#wpa-tu-udp)" opacity="0.75" />
      <text x="520" y="146" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">长度(16)</text>

      <rect x="604" y="120" width="156" height="44" rx="4" fill="url(#wpa-tu-udp)" opacity="0.75" />
      <text x="682" y="146" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">校验和(16)</text>

      <rect x="440" y="174" width="320" height="60" rx="4" fill="url(#wpa-tu-udp)" opacity="0.45" />
      <text x="600" y="200" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">数据（Payload）</text>
      <text x="600" y="220" textAnchor="middle" fontSize="9" fill="#fef3c7">无连接、无序、不重传</text>

      {/* TCP 三次握手 */}
      <text x="200" y="276" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">TCP 三次握手</text>

      <rect x="20" y="290" width="360" height="120" rx="8" fill="url(#wpa-tu-hand)" opacity="0.08" stroke="#0891b2" strokeWidth="1.5" />
      <text x="80" y="312" fontSize="11" fontWeight="700" fill="#0e7490">Client</text>
      <text x="320" y="312" textAnchor="end" fontSize="11" fontWeight="700" fill="#0e7490">Server</text>

      <text x="80" y="336" fontSize="10" fill="#475569" fontFamily="monospace">--- SYN, Seq=x ---&gt;</text>
      <text x="250" y="330" fontSize="9" fill="#94a3b8">SYN_SENT</text>
      <text x="250" y="344" fontSize="9" fill="#94a3b8">SYN_RCVD</text>
      <path d="M90 340 L300 340" stroke="#0891b2" strokeWidth="2" markerEnd="url(#wpa-tu-arrow-r)" />

      <text x="80" y="366" fontSize="10" fill="#475569" fontFamily="monospace">&lt;--- SYN+ACK, Seq=y, Ack=x+1 ---</text>
      <path d="M300 370 L90 370" stroke="#0891b2" strokeWidth="2" markerEnd="url(#wpa-tu-arrow)" />

      <text x="80" y="396" fontSize="10" fill="#475569" fontFamily="monospace">--- ACK, Seq=x+1, Ack=y+1 ---&gt;</text>
      <text x="250" y="396" fontSize="9" fill="#94a3b8">ESTABLISHED</text>
      <path d="M90 400 L300 400" stroke="#0891b2" strokeWidth="2" markerEnd="url(#wpa-tu-arrow-r)" />

      {/* TCP 四次挥手 */}
      <text x="600" y="276" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">TCP 四次挥手</text>

      <rect x="420" y="290" width="360" height="120" rx="8" fill="url(#wpa-tu-hand)" opacity="0.08" stroke="#0891b2" strokeWidth="1.5" />
      <text x="480" y="312" fontSize="11" fontWeight="700" fill="#0e7490">Client</text>
      <text x="720" y="312" textAnchor="end" fontSize="11" fontWeight="700" fill="#0e7490">Server</text>

      <text x="480" y="336" fontSize="10" fill="#475569" fontFamily="monospace">--- FIN, Seq=u ---&gt;</text>
      <text x="650" y="330" fontSize="9" fill="#94a3b8">FIN_WAIT_1</text>
      <text x="650" y="344" fontSize="9" fill="#94a3b8">CLOSE_WAIT</text>
      <path d="M490 340 L700 340" stroke="#0891b2" strokeWidth="2" markerEnd="url(#wpa-tu-arrow-r)" />

      <text x="480" y="366" fontSize="10" fill="#475569" fontFamily="monospace">&lt;--- ACK, Ack=u+1 ---</text>
      <path d="M700 370 L490 370" stroke="#0891b2" strokeWidth="2" markerEnd="url(#wpa-tu-arrow)" />

      <text x="480" y="386" fontSize="10" fill="#475569" fontFamily="monospace">&lt;--- FIN, Seq=v ---</text>
      <text x="650" y="386" fontSize="9" fill="#94a3b8">LAST_ACK</text>
      <path d="M700 386 L490 386" stroke="#0891b2" strokeWidth="2" markerEnd="url(#wpa-tu-arrow)" />

      <text x="480" y="404" fontSize="10" fill="#475569" fontFamily="monospace">--- ACK, Ack=v+1 ---&gt;</text>
      <path d="M490 402 L700 402" stroke="#0891b2" strokeWidth="2" markerEnd="url(#wpa-tu-arrow-r)" />

      {/* TCP vs UDP 对比 */}
      <rect x="20" y="424" width="380" height="166" rx="8" fill="url(#wpa-tu-state)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="210" y="448" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">TCP vs UDP 对比</text>

      <text x="40" y="472" fontSize="10" fontWeight="600" fill="#5b21b6">特性</text>
      <text x="150" y="472" fontSize="10" fontWeight="600" fill="#1d4ed8">TCP</text>
      <text x="280" y="472" fontSize="10" fontWeight="600" fill="#92400e">UDP</text>

      <text x="40" y="492" fontSize="9" fill="#475569">连接方式</text>
      <text x="150" y="492" fontSize="9" fill="#475569">面向连接</text>
      <text x="280" y="492" fontSize="9" fill="#475569">无连接</text>

      <text x="40" y="510" fontSize="9" fill="#475569">可靠性</text>
      <text x="150" y="510" fontSize="9" fill="#475569">可靠（重传）</text>
      <text x="280" y="510" fontSize="9" fill="#475569">不可靠</text>

      <text x="40" y="528" fontSize="9" fill="#475569">有序性</text>
      <text x="150" y="528" fontSize="9" fill="#475569">有序到达</text>
      <text x="280" y="528" fontSize="9" fill="#475569">不保证顺序</text>

      <text x="40" y="546" fontSize="9" fill="#475569">速度</text>
      <text x="150" y="546" fontSize="9" fill="#475569">较慢（握手+确认）</text>
      <text x="280" y="546" fontSize="9" fill="#475569">快（无开销）</text>

      <text x="40" y="564" fontSize="9" fill="#475569">包头</text>
      <text x="150" y="564" fontSize="9" fill="#475569">20 字节</text>
      <text x="280" y="564" fontSize="9" fill="#475569">8 字节</text>

      <text x="40" y="582" fontSize="9" fill="#475569">典型应用</text>
      <text x="150" y="582" fontSize="9" fill="#475569">HTTP/HTTPS/SSH</text>
      <text x="280" y="582" fontSize="9" fill="#475569">DNS/DHCP/视频</text>

      {/* Wireshark 分析 */}
      <rect x="420" y="424" width="360" height="166" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="600" y="448" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Wireshark TCP 分析工具</text>

      <text x="440" y="472" fontSize="10" fontWeight="600" fill="#1d4ed8">TCP 流跟踪：</text>
      <text x="540" y="472" fontSize="10" fill="#475569">Analyze → Follow → TCP Stream</text>

      <text x="440" y="494" fontSize="10" fontWeight="600" fill="#1d4ed8">重传检测：</text>
      <text x="540" y="494" fontSize="10" fill="#475569" fontFamily="monospace">tcp.analysis.retransmission</text>

      <text x="440" y="516" fontSize="10" fontWeight="600" fill="#1d4ed8">乱序检测：</text>
      <text x="540" y="516" fontSize="10" fill="#475569" fontFamily="monospace">tcp.analysis.out_of_order</text>

      <text x="440" y="538" fontSize="10" fontWeight="600" fill="#1d4ed8">重复确认：</text>
      <text x="540" y="538" fontSize="10" fill="#475569" fontFamily="monospace">tcp.analysis.duplicate_ack</text>

      <text x="440" y="560" fontSize="10" fontWeight="600" fill="#1d4ed8">流量图：</text>
      <text x="540" y="560" fontSize="10" fill="#475569">Statistics → Flow Graph</text>

      <text x="440" y="582" fontSize="10" fill="#64748b">Seq/Ack 号变化是 TCP 分析核心</text>
    </svg>
  );
}
