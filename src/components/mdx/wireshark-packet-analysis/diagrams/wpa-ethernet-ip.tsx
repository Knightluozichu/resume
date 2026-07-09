"use client";

export function WpaEthernetIpDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="以太网帧与IP包头结构">
      <defs>
        <linearGradient id="wpa-ei-frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="wpa-ei-ip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="wpa-ei-arp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">以太网帧与 IP 包结构</text>

      {/* 以太网帧结构 */}
      <text x="400" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">以太网 II 帧结构（Ethernet II Frame）</text>

      <rect x="20" y="70" width="100" height="50" rx="4" fill="url(#wpa-ei-frame)" opacity="0.85" />
      <text x="70" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">前导码</text>
      <text x="70" y="108" textAnchor="middle" fontSize="9" fill="#bfdbfe">8 字节</text>

      <rect x="124" y="70" width="120" height="50" rx="4" fill="url(#wpa-ei-frame)" opacity="0.75" />
      <text x="184" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">目的 MAC</text>
      <text x="184" y="108" textAnchor="middle" fontSize="9" fill="#bfdbfe">6 字节</text>

      <rect x="248" y="70" width="120" height="50" rx="4" fill="url(#wpa-ei-frame)" opacity="0.75" />
      <text x="308" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">源 MAC</text>
      <text x="308" y="108" textAnchor="middle" fontSize="9" fill="#bfdbfe">6 字节</text>

      <rect x="372" y="70" width="100" height="50" rx="4" fill="url(#wpa-ei-frame)" opacity="0.65" />
      <text x="422" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">类型</text>
      <text x="422" y="108" textAnchor="middle" fontSize="9" fill="#bfdbfe">2 字节</text>

      <rect x="476" y="70" width="180" height="50" rx="4" fill="url(#wpa-ei-frame)" opacity="0.55" />
      <text x="566" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">数据（Payload）</text>
      <text x="566" y="108" textAnchor="middle" fontSize="9" fill="#bfdbfe">46-1500 字节</text>

      <rect x="660" y="70" width="120" height="50" rx="4" fill="url(#wpa-ei-frame)" opacity="0.45" />
      <text x="720" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">FCS</text>
      <text x="720" y="108" textAnchor="middle" fontSize="9" fill="#bfdbfe">4 字节</text>

      <text x="184" y="138" textAnchor="middle" fontSize="9" fill="#64748b">0x0800=IPv4</text>
      <text x="422" y="138" textAnchor="middle" fontSize="9" fill="#64748b">0x0806=ARP</text>
      <text x="422" y="152" textAnchor="middle" fontSize="9" fill="#64748b">0x86DD=IPv6</text>

      {/* IP 包头结构 */}
      <text x="400" y="182" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">IPv4 包头结构（20 字节固定 + 可选）</text>

      <rect x="20" y="196" width="185" height="40" rx="4" fill="url(#wpa-ei-ip)" opacity="0.85" />
      <text x="112" y="214" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">版本(4) + 首部长度(4)</text>
      <text x="112" y="228" textAnchor="middle" fontSize="9" fill="#cffafe">Version=4, IHL=5(20B)</text>

      <rect x="209" y="196" width="120" height="40" rx="4" fill="url(#wpa-ei-ip)" opacity="0.75" />
      <text x="269" y="214" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">TOS(8)</text>
      <text x="269" y="228" textAnchor="middle" fontSize="9" fill="#cffafe">服务类型</text>

      <rect x="333" y="196" width="120" height="40" rx="4" fill="url(#wpa-ei-ip)" opacity="0.75" />
      <text x="393" y="214" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">总长度(16)</text>
      <text x="393" y="228" textAnchor="middle" fontSize="9" fill="#cffafe">Total Length</text>

      <rect x="457" y="196" width="120" height="40" rx="4" fill="url(#wpa-ei-ip)" opacity="0.75" />
      <text x="517" y="214" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">标识(16)</text>
      <text x="517" y="228" textAnchor="middle" fontSize="9" fill="#cffafe">Identification</text>

      <rect x="581" y="196" width="100" height="40" rx="4" fill="url(#wpa-ei-ip)" opacity="0.75" />
      <text x="631" y="214" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">标志+片偏移</text>
      <text x="631" y="228" textAnchor="middle" fontSize="9" fill="#cffafe">Flags + Offset</text>

      <rect x="685" y="196" width="95" height="40" rx="4" fill="url(#wpa-ei-ip)" opacity="0.75" />
      <text x="732" y="214" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">TTL(8)</text>
      <text x="732" y="228" textAnchor="middle" fontSize="9" fill="#cffafe">生存时间</text>

      <rect x="20" y="242" width="120" height="40" rx="4" fill="url(#wpa-ei-ip)" opacity="0.85" />
      <text x="80" y="260" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">协议(8)</text>
      <text x="80" y="274" textAnchor="middle" fontSize="9" fill="#cffafe">Protocol</text>

      <rect x="144" y="242" width="120" height="40" rx="4" fill="url(#wpa-ei-ip)" opacity="0.75" />
      <text x="204" y="260" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">首部校验和(16)</text>
      <text x="204" y="274" textAnchor="middle" fontSize="9" fill="#cffafe">Checksum</text>

      <rect x="268" y="242" width="160" height="40" rx="4" fill="url(#wpa-ei-ip)" opacity="0.65" />
      <text x="348" y="260" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">源 IP 地址(32)</text>
      <text x="348" y="274" textAnchor="middle" fontSize="9" fill="#cffafe">Source IP</text>

      <rect x="432" y="242" width="160" height="40" rx="4" fill="url(#wpa-ei-ip)" opacity="0.65" />
      <text x="512" y="260" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">目的 IP 地址(32)</text>
      <text x="512" y="274" textAnchor="middle" fontSize="9" fill="#cffafe">Destination IP</text>

      <rect x="596" y="242" width="184" height="40" rx="4" fill="url(#wpa-ei-ip)" opacity="0.45" />
      <text x="688" y="260" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">选项(可变)</text>
      <text x="688" y="274" textAnchor="middle" fontSize="9" fill="#cffafe">Options</text>

      {/* 协议字段值 */}
      <rect x="20" y="296" width="380" height="80" rx="8" fill="url(#wpa-ei-ip)" opacity="0.08" stroke="#0891b2" strokeWidth="1.5" />
      <text x="40" y="318" fontSize="12" fontWeight="700" fill="#0e7490">Protocol 字段常见值</text>
      <text x="40" y="340" fontSize="10" fill="#475569" fontFamily="monospace">1  = ICMP（ping）</text>
      <text x="40" y="358" fontSize="10" fill="#475569" fontFamily="monospace">6  = TCP</text>
      <text x="40" y="376" fontSize="10" fill="#475569" fontFamily="monospace">17 = UDP</text>
      <text x="220" y="340" fontSize="10" fill="#475569" fontFamily="monospace">47 = GRE（VPN 隧道）</text>
      <text x="220" y="358" fontSize="10" fill="#475569" fontFamily="monospace">89 = OSPF（路由协议）</text>
      <text x="220" y="376" fontSize="10" fill="#475569" fontFamily="monospace">132 = SCTP</text>

      {/* ARP 解析 */}
      <rect x="420" y="296" width="360" height="80" rx="8" fill="url(#wpa-ei-arp)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="600" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">ARP 地址解析流程</text>
      <text x="440" y="340" fontSize="10" fill="#475569">1. 主机 A 查 ARP 缓存，无 192.168.1.1 的 MAC</text>
      <text x="440" y="358" fontSize="10" fill="#475569">2. 广播 ARP Request: 谁是 192.168.1.1?</text>
      <text x="440" y="376" fontSize="10" fill="#475569">3. 网关单播 ARP Reply: 我的 MAC 是 xx:xx:xx:xx</text>

      {/* Wireshark 分析要点 */}
      <rect x="20" y="390" width="760" height="200" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="414" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Wireshark 分析要点</text>

      <text x="40" y="438" fontSize="11" fontWeight="600" fill="#1d4ed8">以太网层：</text>
      <text x="130" y="438" fontSize="10" fill="#475569">查看 MAC 地址、Type 字段判断上层协议；异常 MAC 可能是 ARP 欺骗</text>

      <text x="40" y="460" fontSize="11" fontWeight="600" fill="#0e7490">IP 层：</text>
      <text x="130" y="460" fontSize="10" fill="#475569">TTL 追踪路由跳数；Protocol 判断上层；Flags 判断分片；Checksum 校验完整性</text>

      <text x="40" y="482" fontSize="11" fontWeight="600" fill="#92400e">常见异常：</text>
      <text x="130" y="482" fontSize="10" fill="#475569">TTL=1 可能路由环路；Checksum 错误=网卡/驱动问题；大量分片=MTU 不匹配</text>

      <text x="40" y="506" fontSize="11" fontWeight="600" fill="#1d4ed8">过滤器：</text>
      <text x="130" y="506" fontSize="10" fill="#475569" fontFamily="monospace">eth.src == 00:1a:2b:3c:4d:5e  |  ip.ttl &lt; 10  |  ip.flags.mf == 1  |  arp</text>

      <text x="40" y="530" fontSize="11" fontWeight="600" fill="#0e7490">分片分析：</text>
      <text x="130" y="530" fontSize="10" fill="#475569">DF=0 允许分片；MF=1 后面还有分片；Offset 标记当前分片在原包中的偏移位置</text>

      <text x="40" y="554" fontSize="11" fontWeight="600" fill="#92400e">统计工具：</text>
      <text x="130" y="554" fontSize="10" fill="#475569">Statistics → Endpoints（IP/MAC 统计）/ Conversations（端到端会话）/ IO Graphs（流量图）</text>

      <text x="40" y="578" fontSize="10" fill="#64748b">提示：Wireshark 自动解码多层协议，在包详情区逐层展开即可看到每层字段的解析值</text>
    </svg>
  );
}
