"use client";

export function HdgFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="全书复习与知识整合">
      <defs>
        <linearGradient id="hdg-fr-fund" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="hdg-fr-infra" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="hdg-fr-sec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="hdg-fr-adv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="hdg-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书知识整合 · 端到端请求流程</text>

      {/* 端到端请求流程 */}
      <text x="400" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">一个 HTTPS 请求的完整旅程</text>

      {/* 流程链 */}
      <rect x="20" y="68" width="140" height="50" rx="8" fill="url(#hdg-fr-fund)" opacity="0.9" />
      <text x="90" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">1. URL 解析</text>
      <text x="90" y="106" textAnchor="middle" fontSize="8" fill="#bfdbfe">scheme://host/path</text>

      <path d="M165 93 L195 93" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-fr-arrow)" />

      <rect x="200" y="68" width="140" height="50" rx="8" fill="url(#hdg-fr-fund)" opacity="0.9" />
      <text x="270" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">2. DNS 解析</text>
      <text x="270" y="106" textAnchor="middle" fontSize="8" fill="#bfdbfe">域名 → IP 地址</text>

      <path d="M345 93 L375 93" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-fr-arrow)" />

      <rect x="380" y="68" width="140" height="50" rx="8" fill="url(#hdg-fr-sec)" opacity="0.9" />
      <text x="450" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">3. TLS 握手</text>
      <text x="450" y="106" textAnchor="middle" fontSize="8" fill="#fecaca">证书验证+密钥协商</text>

      <path d="M525 93 L555 93" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-fr-arrow)" />

      <rect x="560" y="68" width="120" height="50" rx="8" fill="url(#hdg-fr-fund)" opacity="0.9" />
      <text x="620" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">4. 构造请求</text>
      <text x="620" y="106" textAnchor="middle" fontSize="8" fill="#bfdbfe">方法+首部+体</text>

      <path d="M620 123 L620 133" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-fr-arrow)" />

      <rect x="560" y="138" width="120" height="50" rx="8" fill="url(#hdg-fr-infra)" opacity="0.9" />
      <text x="620" y="160" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">5. 代理转发</text>
      <text x="620" y="176" textAnchor="middle" fontSize="8" fill="#cffafe">正向/反向代理</text>

      <path d="M555 163 L525 163" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-fr-arrow)" />

      <rect x="380" y="138" width="140" height="50" rx="8" fill="url(#hdg-fr-infra)" opacity="0.9" />
      <text x="450" y="160" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">6. 缓存查询</text>
      <text x="450" y="176" textAnchor="middle" fontSize="8" fill="#cffafe">命中? 验证?</text>

      <path d="M375 163 L345 163" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-fr-arrow)" />

      <rect x="200" y="138" width="140" height="50" rx="8" fill="url(#hdg-fr-sec)" opacity="0.9" />
      <text x="270" y="160" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">7. 认证鉴权</text>
      <text x="270" y="176" textAnchor="middle" fontSize="8" fill="#fecaca">Basic/Digest/OAuth</text>

      <path d="M195 163 L165 163" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-fr-arrow)" />

      <rect x="20" y="138" width="140" height="50" rx="8" fill="url(#hdg-fr-adv)" opacity="0.9" />
      <text x="90" y="160" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">8. 内容协商</text>
      <text x="90" y="176" textAnchor="middle" fontSize="8" fill="#fef3c7">Accept 头选择</text>

      <path d="M90 193 L90 203" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-fr-arrow)" />

      <rect x="20" y="208" width="340" height="50" rx="8" fill="url(#hdg-fr-adv)" opacity="0.9" />
      <text x="190" y="230" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">9. 服务器处理 + 虚拟主机路由 + 负载均衡</text>
      <text x="190" y="246" textAnchor="middle" fontSize="8" fill="#fef3c7">Host 头选站点 → 后端服务器处理 → 生成响应</text>

      <path d="M365 233 L395 233" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-fr-arrow)" />

      <rect x="400" y="208" width="280" height="50" rx="8" fill="url(#hdg-fr-infra)" opacity="0.9" />
      <text x="540" y="230" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">10. 响应返回 + 缓存存储</text>
      <text x="540" y="246" textAnchor="middle" fontSize="8" fill="#cffafe">响应经缓存/代理回传客户端</text>

      {/* 知识网络矩阵 */}
      <text x="400" y="290" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">跨章节知识关联矩阵</text>

      <rect x="20" y="302" width="185" height="80" rx="6" fill="url(#hdg-fr-fund)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="112" y="324" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">报文 ↔ URL</text>
      <text x="35" y="342" fontSize="9" fill="#475569">URL 路径出现在请求行</text>
      <text x="35" y="356" fontSize="9" fill="#475569">Host 首部用于虚拟主机</text>
      <text x="35" y="370" fontSize="9" fill="#475569">URL 编码影响首部值</text>

      <rect x="215" y="302" width="185" height="80" rx="6" fill="url(#hdg-fr-infra)" opacity="0.08" stroke="#0891b2" strokeWidth="1.5" />
      <text x="307" y="324" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0e7490">代理 ↔ 缓存</text>
      <text x="230" y="342" fontSize="9" fill="#475569">代理是缓存的载体</text>
      <text x="230" y="356" fontSize="9" fill="#475569">缓存命中在代理层判断</text>
      <text x="230" y="370" fontSize="9" fill="#475569">条件请求经代理转发</text>

      <rect x="410" y="302" width="185" height="80" rx="6" fill="url(#hdg-fr-sec)" opacity="0.08" stroke="#ef4444" strokeWidth="1.5" />
      <text x="502" y="324" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">认证 ↔ HTTPS</text>
      <text x="425" y="342" fontSize="9" fill="#475569">Basic 认证须配合 HTTPS</text>
      <text x="425" y="356" fontSize="9" fill="#475569">TLS 保证认证数据安全</text>
      <text x="425" y="370" fontSize="9" fill="#475569">证书验证 = 服务器认证</text>

      <rect x="605" y="302" width="175" height="80" rx="6" fill="url(#hdg-fr-adv)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="692" y="324" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">协商 ↔ 托管</text>
      <text x="620" y="342" fontSize="9" fill="#475569">虚拟主机 + 协商选语言</text>
      <text x="620" y="356" fontSize="9" fill="#475569">负载均衡 + 内容转码</text>
      <text x="620" y="370" fontSize="9" fill="#475569">重定向 + 协商组合使用</text>

      {/* 核心对比 */}
      <rect x="20" y="398" width="760" height="168" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="422" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">核心概念对比总结</text>

      <rect x="40" y="434" width="350" height="56" rx="6" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="55" y="454" fontSize="10" fontWeight="700" fill="#1e40af">代理 vs 网关 vs 隧道</text>
      <text x="55" y="470" fontSize="9" fill="#475569">代理：同协议转发 | 网关：异协议转换 | 隧道：盲转发</text>
      <text x="55" y="484" fontSize="9" fill="#64748b">代理对服务器透明，网关对客户端透明</text>

      <rect x="410" y="434" width="350" height="56" rx="6" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="425" y="454" fontSize="10" fontWeight="700" fill="#065f46">Basic vs Digest 认证</text>
      <text x="425" y="470" fontSize="9" fill="#475569">Basic：Base64明文，简单 | Digest：MD5摘要，安全</text>
      <text x="425" y="484" fontSize="9" fill="#64748b">Basic 须配 HTTPS，Digest 防 sniffing 但 MD5 已弱</text>

      <rect x="40" y="498" width="350" height="56" rx="6" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="55" y="518" fontSize="10" fontWeight="700" fill="#92400e">持久连接 vs 非持久连接</text>
      <text x="55" y="534" fontSize="9" fill="#475569">非持久：每请求一连接（2 RTT/对象）| 持久：复用连接</text>
      <text x="55" y="548" fontSize="9" fill="#64748b">HTTP/1.1 默认持久 + 流水线，HTTP/2 多路复用</text>

      <rect x="410" y="498" width="350" height="56" rx="6" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="425" y="518" fontSize="10" fontWeight="700" fill="#5b21b6">服务器协商 vs 客户端协商</text>
      <text x="425" y="534" fontSize="9" fill="#475569">服务器驱动：Accept头自动选 | 客户端驱动：300选择</text>
      <text x="425" y="548" fontSize="9" fill="#64748b">服务器驱动常用（自动），透明协商由代理代理</text>
    </svg>
  );
}
