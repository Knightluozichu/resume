"use client";

export function WpaNetworkSecurityDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="网络安全与异常检测">
      <defs>
        <linearGradient id="wpa-ns-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="wpa-ns-ddos" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="wpa-ns-intrusion" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="wpa-ns-malware" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">网络安全与异常检测</text>

      {/* 端口扫描 */}
      <rect x="20" y="50" width="370" height="150" rx="8" fill="url(#wpa-ns-scan)" opacity="0.08" stroke="#ef4444" strokeWidth="1.5" />
      <text x="205" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">端口扫描检测</text>
      <text x="40" y="98" fontSize="10" fontWeight="600" fill="#991b1b">SYN 扫描特征：</text>
      <text x="40" y="116" fontSize="9" fill="#475569">单源 IP 短时间内向多端口发 SYN</text>
      <text x="40" y="132" fontSize="9" fill="#475569">开放端口回 SYN+ACK，关闭端口回 RST</text>
      <text x="40" y="150" fontSize="10" fontWeight="600" fill="#991b1b" fontFamily="monospace">tcp.flags.syn==1 &amp;&amp; tcp.flags.ack==0</text>
      <text x="40" y="172" fontSize="10" fontWeight="600" fill="#991b1b">全连接扫描：</text>
      <text x="40" y="188" fontSize="9" fill="#475569">完成三次握手后立即 FIN，被日志记录</text>

      {/* DDoS */}
      <rect x="410" y="50" width="370" height="150" rx="8" fill="url(#wpa-ns-ddos)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="595" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">DDoS 洪泛检测</text>
      <text x="430" y="98" fontSize="10" fontWeight="600" fill="#92400e">SYN Flood：</text>
      <text x="430" y="116" fontSize="9" fill="#475569">大量 SYN 无对应 ACK，半连接队列满</text>
      <text x="430" y="134" fontSize="10" fontWeight="600" fill="#92400e" fontFamily="monospace">tcp.flags.syn==1 &amp;&amp; tcp.flags.ack==0</text>
      <text x="430" y="156" fontSize="10" fontWeight="600" fill="#92400e">UDP Flood：</text>
      <text x="430" y="174" fontSize="9" fill="#475569">大量 UDP 包到随机端口，触发 ICMP 不可达</text>
      <text x="430" y="192" fontSize="9" fill="#475569">HTTP Flood：高频 HTTP 请求耗尽连接池</text>

      {/* 入侵检测 */}
      <rect x="20" y="212" width="370" height="150" rx="8" fill="url(#wpa-ns-intrusion)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="205" y="236" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">入侵行为检测</text>
      <text x="40" y="260" fontSize="10" fontWeight="600" fill="#5b21b6">暴力破解：</text>
      <text x="40" y="278" fontSize="9" fill="#475569">短时间内大量 SSH/FTP 登录失败</text>
      <text x="40" y="296" fontSize="10" fontWeight="600" fill="#5b21b6" fontFamily="monospace">ssh &amp;&amp; tcp.flags.reset==1</text>
      <text x="40" y="318" fontSize="10" fontWeight="600" fill="#5b21b6">SQL 注入：</text>
      <text x="40" y="336" fontSize="9" fill="#475569">HTTP 请求含 ' OR 1=1 / UNION SELECT 等</text>
      <text x="40" y="354" fontSize="9" fill="#475569" fontFamily="monospace">http.request.uri contains "UNION"</text>

      {/* 恶意软件 */}
      <rect x="410" y="212" width="370" height="150" rx="8" fill="url(#wpa-ns-malware)" opacity="0.08" stroke="#0891b2" strokeWidth="1.5" />
      <text x="595" y="236" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e7490">恶意软件通信</text>
      <text x="430" y="260" fontSize="10" fontWeight="600" fill="#0e7490">C2 回连：</text>
      <text x="430" y="278" fontSize="9" fill="#475569">定期向固定 IP/域名发心跳包</text>
      <text x="430" y="296" fontSize="9" fill="#475569">信标间隔规律（如每 60 秒一次）</text>
      <text x="430" y="318" fontSize="10" fontWeight="600" fill="#0e7490">DNS 隧道：</text>
      <text x="430" y="336" fontSize="9" fill="#475569">超长 TXT 记录、高频 DNS 查询</text>
      <text x="430" y="354" fontSize="9" fill="#475569" fontFamily="monospace">dns.txt &amp;&amp; frame.len &gt; 200</text>

      {/* 检测方法 */}
      <rect x="20" y="374" width="370" height="100" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="205" y="398" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">统计分析方法</text>
      <text x="40" y="420" fontSize="10" fontWeight="600" fill="#475569">Endpoints：</text>
      <text x="150" y="420" fontSize="9" fill="#64748b">按 IP 统计发包量，异常高=可疑</text>
      <text x="40" y="440" fontSize="10" fontWeight="600" fill="#475569">Conversations：</text>
      <text x="150" y="440" fontSize="9" fill="#64748b">端到端会话统计，发现异常通信对</text>
      <text x="40" y="460" fontSize="10" fontWeight="600" fill="#475569">IO Graph：</text>
      <text x="150" y="460" fontSize="9" fill="#64748b">流量趋势图，突增/突降=异常事件</text>

      {/* 告警规则 */}
      <rect x="410" y="374" width="370" height="100" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="595" y="398" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">常见告警规则</text>
      <text x="430" y="420" fontSize="9" fill="#475569" fontFamily="monospace">同一源 IP 连接 100+ 端口</text>
      <text x="430" y="438" fontSize="9" fill="#475569" fontFamily="monospace">1 秒内 SYN 包 &gt; 1000</text>
      <text x="430" y="456" fontSize="9" fill="#475569" fontFamily="monospace">DNS 查询频率 &gt; 50/秒</text>
      <text x="430" y="474" fontSize="9" fill="#475569" fontFamily="monospace">非标准端口外联通信</text>

      {/* 处置建议 */}
      <rect x="20" y="486" width="760" height="100" rx="8" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="400" y="510" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">异常处置建议</text>
      <text x="40" y="532" fontSize="10" fill="#475569">1. 确认范围：用过滤器定位异常源/目的 IP、时间窗口、协议类型</text>
      <text x="40" y="550" fontSize="10" fill="#475569">2. 提取特征：记录 IP/端口/包大小/频率模式，生成 IoC 指标</text>
      <text x="40" y="568" fontSize="10" fill="#475569">3. 阻断隔离：防火墙封禁 IP、ACL 限制端口、关闭非授权服务</text>
      <text x="40" y="586" fontSize="10" fill="#475569">4. 报告归档：导出 pcap + 分析报告，保存证据链供后续取证</text>
    </svg>
  );
}
