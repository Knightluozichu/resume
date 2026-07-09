"use client";

export function WpaCaptureFiltersDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="捕获过滤器工作流与BPF语法">
      <defs>
        <linearGradient id="wpa-cf-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="wpa-cf-bpf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="wpa-cf-adv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="wpa-cf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">捕获过滤器工作流</text>

      {/* 上半部分：工作流程 */}
      <text x="400" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">捕获 vs 显示：过滤器时机对比</text>

      <rect x="20" y="70" width="350" height="160" rx="10" fill="url(#wpa-cf-flow)" opacity="0.10" stroke="#0891b2" strokeWidth="1.5" />
      <text x="195" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e7490">捕获过滤器（Capture Filter）</text>
      <text x="195" y="116" textAnchor="middle" fontSize="11" fill="#475569">在抓包时生效，使用 BPF 语法</text>
      <text x="40" y="140" fontSize="10" fill="#64748b">网卡流量 → [BPF 过滤] → 只存匹配的包到内存</text>
      <text x="40" y="160" fontSize="10" fill="#64748b">优势：减少抓包量，节省内存和 CPU</text>
      <text x="40" y="180" fontSize="10" fill="#64748b">劣势：过滤掉的包无法恢复</text>
      <text x="40" y="200" fontSize="10" fill="#64748b">语法：tcp dst port 443 and host 10.0.0.1</text>
      <text x="40" y="218" fontSize="10" fill="#0891b2">位置：抓包选项对话框 → Capture Filter</text>

      <rect x="430" y="70" width="350" height="160" rx="10" fill="url(#wpa-cf-bpf)" opacity="0.10" stroke="#2563eb" strokeWidth="1.5" />
      <text x="605" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1d4ed8">显示过滤器（Display Filter）</text>
      <text x="605" y="116" textAnchor="middle" fontSize="11" fill="#475569">在抓包后生效，使用 Wireshark 表达式</text>
      <text x="450" y="140" fontSize="10" fill="#64748b">全部流量 → 存入内存 → [显示过滤] → 只显示匹配的包</text>
      <text x="450" y="160" fontSize="10" fill="#64748b">优势：可随时切换条件，数据不丢失</text>
      <text x="450" y="180" fontSize="10" fill="#64748b">劣势：已抓全部流量，内存开销大</text>
      <text x="450" y="200" fontSize="10" fill="#64748b">语法：tcp.port == 443 &amp;&amp; ip.addr == 10.0.0.1</text>
      <text x="450" y="218" fontSize="10" fill="#2563eb">位置：界面顶部过滤器栏</text>

      {/* 中部：BPF 语法结构 */}
      <text x="400" y="256" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">BPF 语法结构</text>

      <rect x="20" y="270" width="760" height="160" rx="10" fill="url(#wpa-cf-bpf)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="40" y="294" fontSize="12" fontWeight="700" fill="#1e40af">BPF = [限定符] [协议] [方向] [类型] [值] [逻辑运算符] ...</text>

      <text x="40" y="320" fontSize="11" fontWeight="600" fill="#1d4ed8">类型限定符：</text>
      <text x="160" y="320" fontSize="10" fill="#475569">host（主机） / net（网段） / port（端口） / portrange（端口范围）</text>

      <text x="40" y="342" fontSize="11" fontWeight="600" fill="#1d4ed8">传输方向：</text>
      <text x="160" y="342" fontSize="10" fill="#475569">src（源） / dst（目的） / src or dst / src and dst</text>

      <text x="40" y="364" fontSize="11" fontWeight="600" fill="#1d4ed8">协议限定：</text>
      <text x="160" y="364" fontSize="10" fill="#475569">ether / ip / ip6 / tcp / udp / arp / icmp / http</text>

      <text x="40" y="386" fontSize="11" fontWeight="600" fill="#1d4ed8">逻辑运算：</text>
      <text x="160" y="386" fontSize="10" fill="#475569">and / or / not / 括号分组</text>

      <text x="40" y="408" fontSize="11" fontWeight="600" fill="#1d4ed8">示例：</text>
      <text x="100" y="408" fontSize="10" fill="#0e7490" fontFamily="monospace">tcp dst port 80 and src host 192.168.1.10</text>
      <text x="40" y="424" fontSize="10" fill="#64748b" fontFamily="monospace">not arp and not (port 53 or port 67)</text>

      {/* 下半部分：捕获技巧 */}
      <rect x="20" y="442" width="370" height="140" rx="10" fill="url(#wpa-cf-adv)" opacity="0.10" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="205" y="466" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">常用捕获过滤器</text>
      <text x="40" y="490" fontSize="10" fill="#475569" fontFamily="monospace">host 192.168.1.10</text>
      <text x="240" y="490" fontSize="10" fill="#94a3b8">只抓特定主机</text>
      <text x="40" y="510" fontSize="10" fill="#475569" fontFamily="monospace">tcp port 443</text>
      <text x="240" y="510" fontSize="10" fill="#94a3b8">只抓 HTTPS 流量</text>
      <text x="40" y="530" fontSize="10" fill="#475569" fontFamily="monospace">not port 22</text>
      <text x="240" y="530" fontSize="10" fill="#94a3b8">排除 SSH 干扰</text>
      <text x="40" y="550" fontSize="10" fill="#475569" fontFamily="monospace">net 10.0.0.0/24</text>
      <text x="240" y="550" fontSize="10" fill="#94a3b8">抓整个网段</text>
      <text x="40" y="572" fontSize="10" fill="#475569" fontFamily="monospace">icmp</text>
      <text x="240" y="572" fontSize="10" fill="#94a3b8">只抓 ping 包</text>

      <rect x="410" y="442" width="370" height="140" rx="10" fill="url(#wpa-cf-adv)" opacity="0.10" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="595" y="466" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">捕获技巧</text>
      <text x="430" y="490" fontSize="10" fill="#475569">混合模式（Promiscuous）：抓局域网所有包</text>
      <text x="430" y="510" fontSize="10" fill="#475569">监听模式（Monitor）：抓 Wi-Fi 802.11 帧</text>
      <text x="430" y="530" fontSize="10" fill="#475569">环形缓冲区：防止长时间抓包内存溢出</text>
      <text x="430" y="550" fontSize="10" fill="#475569">自动停止条件：包数 / 文件大小 / 时长</text>
      <text x="430" y="572" fontSize="10" fill="#475569">多文件轮转：大流量按大小切分存储</text>
    </svg>
  );
}
