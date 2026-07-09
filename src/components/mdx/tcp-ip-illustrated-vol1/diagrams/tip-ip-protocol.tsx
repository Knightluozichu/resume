"use client";

export function TipIpProtocolDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="IPv4包头结构与路由流程">
      <defs>
        <linearGradient id="tip-ip-hdr" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="tip-ip-route" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="tip-ip-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">IPv4 包头结构与路由</text>

      {/* IPv4 包头字段图 */}
      <text x="400" y="56" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e7490">IPv4 包头（固定20字节，IHL=5）</text>

      {/* 第一行：Version/IHL/TOS */}
      <rect x="30" y="68" width="80" height="40" rx="4" fill="url(#tip-ip-hdr)" />
      <text x="70" y="84" textAnchor="middle" fontSize="9" fill="#fff">Version</text>
      <text x="70" y="98" textAnchor="middle" fontSize="8" fill="#cffafe">4 bits=4</text>

      <rect x="110" y="68" width="80" height="40" rx="4" fill="url(#tip-ip-hdr)" />
      <text x="150" y="84" textAnchor="middle" fontSize="9" fill="#fff">IHL</text>
      <text x="150" y="98" textAnchor="middle" fontSize="8" fill="#cffafe">4 bits=5(20B)</text>

      <rect x="190" y="68" width="120" height="40" rx="4" fill="url(#tip-ip-hdr)" />
      <text x="250" y="84" textAnchor="middle" fontSize="9" fill="#fff">TOS / DSCP</text>
      <text x="250" y="98" textAnchor="middle" fontSize="8" fill="#cffafe">8 bits</text>

      <rect x="310" y="68" width="180" height="40" rx="4" fill="url(#tip-ip-hdr)" />
      <text x="400" y="84" textAnchor="middle" fontSize="9" fill="#fff">Total Length</text>
      <text x="400" y="98" textAnchor="middle" fontSize="8" fill="#cffafe">16 bits（包头+数据总长）</text>

      {/* 第二行：ID/Flags/Offset */}
      <rect x="30" y="108" width="180" height="40" rx="4" fill="url(#tip-ip-hdr)" />
      <text x="120" y="124" textAnchor="middle" fontSize="9" fill="#fff">Identification</text>
      <text x="120" y="138" textAnchor="middle" fontSize="8" fill="#cffafe">16 bits（分片重组标识）</text>

      <rect x="210" y="108" width="80" height="40" rx="4" fill="#22d3ee" />
      <text x="250" y="124" textAnchor="middle" fontSize="9" fill="#fff">Flags</text>
      <text x="250" y="138" textAnchor="middle" fontSize="8" fill="#ecfeff">DF/MF/0</text>

      <rect x="290" y="108" width="200" height="40" rx="4" fill="url(#tip-ip-hdr)" />
      <text x="390" y="124" textAnchor="middle" fontSize="9" fill="#fff">Fragment Offset</text>
      <text x="390" y="138" textAnchor="middle" fontSize="8" fill="#cffafe">13 bits（分片偏移）</text>

      {/* 第三行：TTL/Proto/Checksum */}
      <rect x="30" y="148" width="100" height="40" rx="4" fill="#f59e0b" opacity="0.9" />
      <text x="80" y="164" textAnchor="middle" fontSize="9" fill="#fff">TTL</text>
      <text x="80" y="178" textAnchor="middle" fontSize="8" fill="#fef3c7">8 bits</text>

      <rect x="130" y="148" width="160" height="40" rx="4" fill="#f59e0b" opacity="0.9" />
      <text x="210" y="164" textAnchor="middle" fontSize="9" fill="#fff">Protocol</text>
      <text x="210" y="178" textAnchor="middle" fontSize="8" fill="#fef3c7">1=ICMP 6=TCP 17=UDP</text>

      <rect x="290" y="148" width="200" height="40" rx="4" fill="url(#tip-ip-hdr)" />
      <text x="390" y="164" textAnchor="middle" fontSize="9" fill="#fff">Header Checksum</text>
      <text x="390" y="178" textAnchor="middle" fontSize="8" fill="#cffafe">16 bits</text>

      {/* 第四行：Source/Dest IP */}
      <rect x="30" y="188" width="460" height="36" rx="4" fill="url(#tip-ip-hdr)" />
      <text x="260" y="210" textAnchor="middle" fontSize="10" fill="#fff">Source IP（32 bits）</text>

      <rect x="30" y="224" width="460" height="36" rx="4" fill="url(#tip-ip-hdr)" />
      <text x="260" y="246" textAnchor="middle" fontSize="10" fill="#fff">Destination IP（32 bits）</text>

      {/* Protocol 对照表 */}
      <rect x="520" y="68" width="250" height="192" rx="8" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1.5" />
      <text x="645" y="90" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0c4a6e">Protocol 字段值</text>
      <text x="540" y="112" fontSize="10" fill="#075985">1 → ICMP（ping/差错）</text>
      <text x="540" y="132" fontSize="10" fill="#075985">2 → IGMP（组播）</text>
      <text x="540" y="152" fontSize="10" fill="#075985">6 → TCP（可靠传输）</text>
      <text x="540" y="172" fontSize="10" fill="#075985">17 → UDP（无连接）</text>
      <text x="540" y="192" fontSize="10" fill="#075985">89 → OSPF（路由协议）</text>
      <text x="540" y="212" fontSize="10" fill="#075985">47 → GRE（隧道封装）</text>
      <text x="540" y="232" fontSize="10" fill="#075985">132 → SCTP</text>
      <text x="540" y="252" fontSize="10" fill="#075985">50 → ESP（IPsec）</text>

      {/* 路由流程 */}
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">IP 路由转发流程</text>

      <rect x="30" y="304" width="160" height="44" rx="8" fill="url(#tip-ip-route)" opacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="110" y="330" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">1. 收到IP包</text>

      <path d="M190 326 L220 326" stroke="#64748b" strokeWidth="2" markerEnd="url(#tip-ip-arrow)" />

      <rect x="220" y="304" width="180" height="44" rx="8" fill="url(#tip-ip-route)" opacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="310" y="330" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">2. 查路由表（最长前缀）</text>

      <path d="M400 326 L430 326" stroke="#64748b" strokeWidth="2" markerEnd="url(#tip-ip-arrow)" />

      <rect x="430" y="304" width="150" height="44" rx="8" fill="url(#tip-ip-route)" opacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="505" y="330" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">3. TTL-1 → 转发</text>

      <path d="M580 326 L610 326" stroke="#64748b" strokeWidth="2" markerEnd="url(#tip-ip-arrow)" />

      <rect x="610" y="304" width="150" height="44" rx="8" fill="url(#tip-ip-route)" opacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="685" y="330" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">4. ARP查下一跳MAC</text>

      {/* 路由表示例 */}
      <rect x="30" y="364" width="730" height="180" rx="10" fill="#fffbeb" stroke="#fde047" strokeWidth="1.5" />
      <text x="50" y="388" fontSize="12" fontWeight="700" fill="#854d0e">路由表匹配规则（最长前缀匹配）</text>

      <rect x="50" y="398" width="200" height="28" rx="4" fill="#fef3c7" />
      <text x="150" y="416" textAnchor="middle" fontSize="10" fontWeight="600" fill="#78350f">目的网络</text>
      <rect x="250" y="398" width="120" height="28" rx="4" fill="#fef3c7" />
      <text x="310" y="416" textAnchor="middle" fontSize="10" fontWeight="600" fill="#78350f">掩码</text>
      <rect x="370" y="398" width="150" height="28" rx="4" fill="#fef3c7" />
      <text x="445" y="416" textAnchor="middle" fontSize="10" fontWeight="600" fill="#78350f">下一跳</text>
      <rect x="520" y="398" width="100" height="28" rx="4" fill="#fef3c7" />
      <text x="570" y="416" textAnchor="middle" fontSize="10" fontWeight="600" fill="#78350f">接口</text>
      <rect x="620" y="398" width="100" height="28" rx="4" fill="#fef3c7" />
      <text x="670" y="416" textAnchor="middle" fontSize="10" fontWeight="600" fill="#78350f">Metric</text>

      <text x="150" y="442" textAnchor="middle" fontSize="9" fill="#713f12">192.168.1.0</text>
      <text x="310" y="442" textAnchor="middle" fontSize="9" fill="#713f12">/24</text>
      <text x="445" y="442" textAnchor="middle" fontSize="9" fill="#713f12">0.0.0.0（直连）</text>
      <text x="570" y="442" textAnchor="middle" fontSize="9" fill="#713f12">eth0</text>
      <text x="670" y="442" textAnchor="middle" fontSize="9" fill="#713f12">0</text>

      <text x="150" y="462" textAnchor="middle" fontSize="9" fill="#713f12">10.0.0.0</text>
      <text x="310" y="462" textAnchor="middle" fontSize="9" fill="#713f12">/8</text>
      <text x="445" y="462" textAnchor="middle" fontSize="9" fill="#713f12">192.168.1.1</text>
      <text x="570" y="462" textAnchor="middle" fontSize="9" fill="#713f12">eth0</text>
      <text x="670" y="462" textAnchor="middle" fontSize="9" fill="#713f12">1</text>

      <text x="150" y="482" textAnchor="middle" fontSize="9" fill="#713f12">0.0.0.0</text>
      <text x="310" y="482" textAnchor="middle" fontSize="9" fill="#713f12">/0</text>
      <text x="445" y="482" textAnchor="middle" fontSize="9" fill="#713f12">192.168.1.1（默认）</text>
      <text x="570" y="482" textAnchor="middle" fontSize="9" fill="#713f12">eth0</text>
      <text x="670" y="482" textAnchor="middle" fontSize="9" fill="#713f12">100</text>

      <text x="50" y="510" fontSize="10" fill="#854d0e">子网掩码：网络位为1，主机位为0。CIDR表示法如 /24 = 255.255.255.0</text>
      <text x="50" y="528" fontSize="10" fill="#854d0e">TTL每经路由器减1，到0丢弃并返回ICMP超时（traceroute原理）</text>
    </svg>
  );
}
