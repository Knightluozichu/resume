"use client";

export function CntLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="计算机网络自顶向下方法全书学习地图">
      <defs>
        <linearGradient id="cnt-lm-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cnt-lm-trans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="cnt-lm-net" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cnt-lm-link" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="cnt-lm-phys" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="cnt-lm-sec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <marker id="cnt-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">计算机网络：自顶向下方法 · 知识体系全景</text>

      {/* 五层协议栈 */}
      <rect x="40" y="50" width="200" height="80" rx="10" fill="url(#cnt-lm-app)" opacity="0.95" />
      <text x="140" y="78" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">5. 应用层</text>
      <text x="140" y="100" textAnchor="middle" fontSize="11" fill="#bfdbfe">HTTP / DNS / SMTP</text>
      <text x="140" y="118" textAnchor="middle" fontSize="10" fill="#60a5fa">定义网络应用与报文格式</text>

      <rect x="40" y="140" width="200" height="80" rx="10" fill="url(#cnt-lm-trans)" opacity="0.95" />
      <text x="140" y="168" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">4. 传输层</text>
      <text x="140" y="190" textAnchor="middle" fontSize="11" fill="#cffafe">TCP / UDP</text>
      <text x="140" y="208" textAnchor="middle" fontSize="10" fill="#67e8f9">进程间数据传输与可靠性</text>

      <rect x="40" y="230" width="200" height="80" rx="10" fill="url(#cnt-lm-net)" opacity="0.95" />
      <text x="140" y="258" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">3. 网络层</text>
      <text x="140" y="280" textAnchor="middle" fontSize="11" fill="#fef3c7">IP / OSPF / BGP</text>
      <text x="140" y="298" textAnchor="middle" fontSize="10" fill="#fcd34d">主机间数据报路由与转发</text>

      <rect x="40" y="320" width="200" height="80" rx="10" fill="url(#cnt-lm-link)" opacity="0.95" />
      <text x="140" y="348" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">2. 链路层</text>
      <text x="140" y="370" textAnchor="middle" fontSize="11" fill="#d1fae5">Ethernet / WiFi</text>
      <text x="140" y="388" textAnchor="middle" fontSize="10" fill="#6ee7b7">相邻节点间帧传输</text>

      <rect x="40" y="410" width="200" height="80" rx="10" fill="url(#cnt-lm-phys)" opacity="0.95" />
      <text x="140" y="438" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">1. 物理层</text>
      <text x="140" y="460" textAnchor="middle" fontSize="11" fill="#ede9fe">双绞线 / 光纤 / 无线电</text>
      <text x="140" y="478" textAnchor="middle" fontSize="10" fill="#c4b5fd">比特在链路上的传输</text>

      {/* 箭头连接 */}
      <path d="M140 130 L140 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-lm-arrow)" />
      <path d="M140 220 L140 230" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-lm-arrow)" />
      <path d="M140 310 L140 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-lm-arrow)" />
      <path d="M140 400 L140 410" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-lm-arrow)" />

      {/* 右侧：五大知识域 */}
      <text x="520" y="68" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">五大知识域</text>

      <rect x="280" y="80" width="500" height="100" rx="10" fill="url(#cnt-lm-app)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="300" y="102" fontSize="12" fontWeight="700" fill="#1e40af">域一：应用层与传输层（入门）</text>
      <text x="300" y="122" fontSize="11" fill="#475569">学习地图 → 应用层(HTTP/DNS) → 传输层(TCP/UDP) → 拥塞控制</text>
      <text x="300" y="140" fontSize="11" fill="#475569">解决：网络应用怎么通信、数据怎么可靠到达</text>
      <text x="300" y="162" fontSize="10" fill="#64748b">核心：HTTP请求响应 / 三次握手 / AIMD / 滑动窗口</text>

      <rect x="280" y="190" width="500" height="90" rx="10" fill="url(#cnt-lm-net)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="300" y="212" fontSize="12" fontWeight="700" fill="#92400e">域二：网络层（中级）</text>
      <text x="300" y="232" fontSize="11" fill="#475569">网络层(数据平面) → 路由算法与协议</text>
      <text x="300" y="250" fontSize="11" fill="#475569">解决：数据报怎么找到路径、怎么转发</text>
      <text x="300" y="270" fontSize="10" fill="#64748b">核心：IP转发 / 最长前缀匹配 / OSPF / BGP / SDN</text>

      <rect x="280" y="290" width="500" height="90" rx="10" fill="url(#cnt-lm-link)" opacity="0.12" stroke="#10b981" strokeWidth="1.5" />
      <text x="300" y="312" fontSize="12" fontWeight="700" fill="#065f46">域三：链路层与无线（中级）</text>
      <text x="300" y="332" fontSize="11" fill="#475569">链路层与局域网 → 无线网络与移动性</text>
      <text x="300" y="350" fontSize="11" fill="#475569">解决：相邻节点怎么可靠传输、无线怎么接入</text>
      <text x="300" y="370" fontSize="10" fill="#64748b">核心：CRC / CSMA-CD / 交换机 / WiFi / 移动IP</text>

      <rect x="280" y="390" width="240" height="90" rx="10" fill="url(#cnt-lm-sec)" opacity="0.12" stroke="#ef4444" strokeWidth="1.5" />
      <text x="300" y="412" fontSize="12" fontWeight="700" fill="#991b1b">域四：网络安全</text>
      <text x="300" y="432" fontSize="11" fill="#475569">网络安全实践</text>
      <text x="300" y="450" fontSize="11" fill="#475569">解决：怎么加密/认证/防御</text>
      <text x="300" y="470" fontSize="10" fill="#64748b">TLS / IPsec / 防火墙</text>

      <rect x="540" y="390" width="240" height="90" rx="10" fill="url(#cnt-lm-phys)" opacity="0.12" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="560" y="412" fontSize="12" fontWeight="700" fill="#5b21b6">域五：全书复习</text>
      <text x="560" y="432" fontSize="11" fill="#475569">全书复习与知识整合</text>
      <text x="560" y="450" fontSize="11" fill="#475569">解决：各层知识怎么串联</text>
      <text x="560" y="470" fontSize="10" fill="#64748b">端到端流程 / 跨层关联</text>

      {/* 学习路径 */}
      <rect x="20" y="500" width="760" height="70" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="524" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">推荐学习路径（自顶向下）</text>
      <text x="400" y="546" textAnchor="middle" fontSize="11" fill="#475569">应用层 → 传输层 → 拥塞控制 → 网络层(数据平面) → 路由算法 → 链路层 → 无线/移动 → 安全 → 复习</text>
      <text x="400" y="562" textAnchor="middle" fontSize="10" fill="#64748b">核心线索：应用需求 → 传输保障 → 网络寻路 → 链路传输 → 安全防护 → 知识整合</text>
    </svg>
  );
}
