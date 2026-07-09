"use client";

export function IsnFirewallSecurityDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="防火墙与网络安全：四代演进与防御">
      <defs>
        <linearGradient id="isn-fs-gen1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="isn-fs-gen2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="isn-fs-gen3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="isn-fs-gen4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="isn-fs-ddos" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="isn-fs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">防火墙与网络安全：四代演进</text>

      {/* 四代演进 */}
      <text x="400" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">防火墙四代演进</text>

      <rect x="30" y="65" width="170" height="100" rx="10" fill="url(#isn-fs-gen1)" opacity="0.95" />
      <text x="115" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">第一代：包过滤</text>
      <line x1="45" y1="98" x2="185" y2="98" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="115" y="118" textAnchor="middle" fontSize="10" fill="#e2e8f0">L3/L4 · 按IP/端口过滤</text>
      <text x="115" y="136" textAnchor="middle" fontSize="10" fill="#cbd5e1">不感知连接状态</text>
      <text x="115" y="155" textAnchor="middle" fontSize="10" fill="#94a3b8">逐包检查</text>

      <rect x="215" y="65" width="170" height="100" rx="10" fill="url(#isn-fs-gen2)" opacity="0.95" />
      <text x="300" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">第二代：状态检测</text>
      <line x1="230" y1="98" x2="370" y2="98" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="300" y="118" textAnchor="middle" fontSize="10" fill="#bfdbfe">L3/L4 · 跟踪连接状态</text>
      <text x="300" y="136" textAnchor="middle" fontSize="10" fill="#bfdbfe">防止伪造包注入</text>
      <text x="300" y="155" textAnchor="middle" fontSize="10" fill="#60a5fa">iptables conntrack</text>

      <rect x="400" y="65" width="170" height="100" rx="10" fill="url(#isn-fs-gen3)" opacity="0.95" />
      <text x="485" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">第三代：应用网关</text>
      <line x1="415" y1="98" x2="555" y2="98" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="485" y="118" textAnchor="middle" fontSize="10" fill="#cffafe">L7 · 代理+深度检测</text>
      <text x="485" y="136" textAnchor="middle" fontSize="10" fill="#cffafe">完整解析报文</text>
      <text x="485" y="155" textAnchor="middle" fontSize="10" fill="#67e8f9">性能开销大</text>

      <rect x="585" y="65" width="185" height="100" rx="10" fill="url(#isn-fs-gen4)" opacity="0.95" />
      <text x="677" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">第四代：WAF</text>
      <line x1="600" y1="98" x2="755" y2="98" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="677" y="118" textAnchor="middle" fontSize="10" fill="#fecaca">L7 · 专防Web攻击</text>
      <text x="677" y="136" textAnchor="middle" fontSize="10" fill="#fecaca">SQL注入/XSS/CC</text>
      <text x="677" y="155" textAnchor="middle" fontSize="10" fill="#fca5a5">Cloudflare/ModSec</text>

      {/* 演进箭头 */}
      <path d="M200 115 L215 115" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-fs-arrow)" />
      <path d="M385 115 L400 115" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-fs-arrow)" />
      <path d="M570 115 L585 115" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-fs-arrow)" />

      {/* WAF防护 */}
      <rect x="30" y="185" width="370" height="130" rx="10" fill="#fef2f2" stroke="#fecaca" strokeWidth="1.5" />
      <text x="215" y="210" textAnchor="middle" fontSize="13" fontWeight="700" fill="#dc2626">WAF防护的Web攻击</text>
      <text x="50" y="235" textAnchor="start" fontSize="11" fill="#475569">SQL注入: 输入嵌入SQL语句 → 关键字匹配</text>
      <text x="50" y="255" textAnchor="start" fontSize="11" fill="#475569">XSS: 注入恶意JS脚本 → 标签检测</text>
      <text x="50" y="275" textAnchor="start" fontSize="11" fill="#475569">CC攻击: 大量合法请求 → 频率分析</text>
      <text x="50" y="295" textAnchor="start" fontSize="11" fill="#475569">路径遍历: ../../etc/passwd → 路径检测</text>
      <text x="215" y="315" textAnchor="middle" fontSize="10" fill="#64748b">WAF看HTTP内容，传统防火墙看IP/端口 → 互补</text>

      {/* DDoS防御 */}
      <rect x="420" y="185" width="350" height="130" rx="10" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
      <text x="595" y="210" textAnchor="middle" fontSize="13" fontWeight="700" fill="#d97706">DDoS攻击类型与防御</text>
      <text x="440" y="235" textAnchor="start" fontSize="11" fill="#475569">流量型(L3/L4): 海量包占满带宽</text>
      <text x="440" y="250" textAnchor="start" fontSize="10" fill="#64748b">  → 流量清洗/黑洞路由</text>
      <text x="440" y="270" textAnchor="start" fontSize="11" fill="#475569">协议型(L3/L4): SYN Flood耗尽连接</text>
      <text x="440" y="285" textAnchor="start" fontSize="10" fill="#64748b">  → SYN Cookie/连接限制</text>
      <text x="440" y="305" textAnchor="start" fontSize="11" fill="#475569">应用型(L7): 大量合法HTTP请求</text>
      <text x="440" y="320" textAnchor="start" fontSize="10" fill="#64748b">  → WAF频率限制/验证码</text>

      {/* ACL规则 */}
      <rect x="30" y="335" width="370" height="130" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="215" y="360" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">ACL访问控制列表</text>
      <text x="50" y="385" textAnchor="start" fontSize="11" fill="#059669" fontFamily="monospace">规则1: 允许 内网 → 端口80</text>
      <text x="50" y="403" textAnchor="start" fontSize="11" fill="#059669" fontFamily="monospace">规则2: 允许 内网 → 端口443</text>
      <text x="50" y="421" textAnchor="start" fontSize="11" fill="#ef4444" fontFamily="monospace">规则3: 拒绝 外网 → 端口3306</text>
      <text x="50" y="439" textAnchor="start" fontSize="11" fill="#ef4444" fontFamily="monospace">规则4: 拒绝 所有 (默认拒绝)</text>
      <text x="215" y="458" textAnchor="middle" fontSize="10" fill="#64748b">从上到下首次匹配 · 默认拒绝最安全</text>

      {/* SYN Cookie */}
      <rect x="420" y="335" width="350" height="130" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="595" y="360" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">SYN Cookie防御SYN Flood</text>
      <text x="440" y="385" textAnchor="start" fontSize="11" fill="#ef4444">攻击: 发大量SYN不回ACK → 连接表耗尽</text>
      <text x="440" y="408" textAnchor="start" fontSize="11" fill="#059669">防御: SYN时不分配资源</text>
      <text x="440" y="425" textAnchor="start" fontSize="11" fill="#059669">  → 状态编码进SYN-ACK序列号</text>
      <text x="440" y="442" textAnchor="start" fontSize="11" fill="#059669">  → ACK验证通过才分配资源</text>
      <text x="595" y="458" textAnchor="middle" fontSize="10" fill="#64748b">攻击者不回ACK → 服务器无资源消耗</text>

      {/* 底部总结 */}
      <rect x="30" y="485" width="740" height="75" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="510" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">纵深防御：网络层 + 应用层逐层设防</text>
      <text x="400" y="535" textAnchor="middle" fontSize="11" fill="#475569">ACL/防火墙(L3/L4) → 状态检测(连接层) → WAF(L7应用层) → 认证授权 → 加密传输</text>
      <text x="400" y="552" textAnchor="middle" fontSize="10" fill="#64748b">任何一层被突破还有后续层兜底 · 单点防御一旦被绕过就全盘崩溃</text>
    </svg>
  );
}
