"use client";

export function WpaWiresharkBasicsDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="Wireshark界面布局与抓包流程">
      <defs>
        <linearGradient id="wpa-wb-menu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="wpa-wb-list" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="wpa-wb-detail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="wpa-wb-hex" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="wpa-wb-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="wpa-wb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Wireshark 界面布局</text>

      {/* 菜单工具栏 */}
      <rect x="20" y="48" width="760" height="52" rx="8" fill="url(#wpa-wb-menu)" opacity="0.92" />
      <text x="60" y="80" fontSize="13" fontWeight="700" fill="#fff">菜单栏</text>
      <text x="130" y="80" fontSize="11" fill="#bfdbfe">File / Edit / View / Go / Capture / Analyze / Statistics</text>
      <text x="540" y="80" fontSize="11" fill="#bfdbfe">工具栏：鲨鱼鳍(开始) / 红方块(停止)</text>

      {/* 过滤器栏 */}
      <rect x="20" y="108" width="760" height="36" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="40" y="131" fontSize="12" fontWeight="600" fill="#92400e">显示过滤器栏</text>
      <text x="160" y="131" fontSize="11" fill="#78350f">输入表达式（如 http or tcp.port == 443），回车过滤</text>

      {/* 包列表区 */}
      <rect x="20" y="152" width="760" height="130" rx="8" fill="url(#wpa-wb-list)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="40" y="174" fontSize="13" fontWeight="700" fill="#0e7490">包列表区（Packet List）</text>
      <text x="40" y="194" fontSize="11" fill="#475569">No. | Time | Source | Destination | Protocol | Length | Info</text>
      <text x="40" y="214" fontSize="10" fill="#64748b">1   0.000  192.168.1.5  142.250.80.46  TCP      74     51000 &gt; 443 [SYN]...</text>
      <text x="40" y="230" fontSize="10" fill="#64748b">2   0.045  142.250.80.46 192.168.1.5   TCP      74     443 &gt; 51000 [SYN, ACK]...</text>
      <text x="40" y="246" fontSize="10" fill="#64748b">3   0.046  192.168.1.5  142.250.80.46  TCP      66     51000 &gt; 443 [ACK]...</text>
      <text x="40" y="266" fontSize="10" fill="#0891b2">每行一个数据包，不同协议用不同颜色高亮</text>

      {/* 包详情区 */}
      <rect x="20" y="290" width="760" height="110" rx="8" fill="url(#wpa-wb-detail)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="40" y="312" fontSize="13" fontWeight="700" fill="#5b21b6">包详情区（Packet Details）</text>
      <text x="40" y="332" fontSize="10" fill="#475569">▸ Frame 1: 74 bytes on wire, 74 bytes captured</text>
      <text x="40" y="348" fontSize="10" fill="#475569">▸ Ethernet II: Src 00:1a:2b:.., Dst 00:50:56:..</text>
      <text x="40" y="364" fontSize="10" fill="#475569">▸ Internet Protocol Version 4: Src 192.168.1.5, Dst 142.250.80.46</text>
      <text x="40" y="380" fontSize="10" fill="#475569">▸ Transmission Control Protocol: Src Port 51000, Dst Port 443, [SYN]</text>
      <text x="40" y="396" fontSize="10" fill="#7c3aed">树形展开，逐层协议解码，点击 ▸ 展开各字段</text>

      {/* 原始字节区 */}
      <rect x="20" y="408" width="760" height="90" rx="8" fill="url(#wpa-wb-hex)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="40" y="430" fontSize="13" fontWeight="700" fill="#92400e">原始字节区（Packet Bytes）</text>
      <text x="40" y="450" fontSize="10" fill="#64748b" fontFamily="monospace">0000  00 50 56 c0 00 08 00 1a 2b 3c 4d 5e 08 00 45 00  .PV.....&lt;M^..E.</text>
      <text x="40" y="466" fontSize="10" fill="#64748b" fontFamily="monospace">0010  00 3c 1a 2b 40 00 40 06 b1 e0 c0 a8 01 05 8e fa  .&lt;.+@.@.........</text>
      <text x="40" y="482" fontSize="10" fill="#64748b" fontFamily="monospace">0020  50 2e c7 68 01 bb a1 2b 3c 00 00 00 00 80 02 ...  P..h.....+.....</text>
      <text x="40" y="496" fontSize="10" fill="#f59e0b">十六进制 + ASCII 对照，选中字段在此高亮对应字节</text>

      {/* 底部状态栏 */}
      <rect x="20" y="508" width="760" height="36" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="40" y="531" fontSize="11" fontWeight="600" fill="#334155">状态栏</text>
      <text x="120" y="531" fontSize="10" fill="#64748b">已抓包: 1,234 | 显示: 890 | 协议分布: TCP 65% HTTP 20% DNS 5%</text>

      {/* 抓包流程 */}
      <rect x="20" y="552" width="760" height="36" rx="6" fill="url(#wpa-wb-flow)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="575" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">抓包流程：选网卡 → 点鲨鱼鳍 → 实时抓包 → 点红方块停止 → 分析</text>
    </svg>
  );
}
