"use client";

export function KgaSecurityPluginsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="Kong安全插件与多层防护体系">
      <defs>
        <linearGradient id="kga-sp-cors" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="kga-sp-acl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="kga-sp-ip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="kga-sp-chain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kong 安全插件与多层防护体系</text>

      {/* CORS */}
      <rect x="20" y="50" width="245" height="180" rx="12" fill="url(#kga-sp-cors)" opacity="0.92" />
      <text x="142" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">CORS 跨域控制</text>
      <line x1="35" y1="85" x2="250" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="142" y="107" textAnchor="middle" fontSize="10" fill="#bfdbfe">浏览器同源策略绕过</text>
      <text x="142" y="127" textAnchor="middle" fontSize="10" fill="#93c5fd">origins / methods / headers</text>
      <text x="142" y="145" textAnchor="middle" fontSize="10" fill="#93c5fd">credentials / max_age</text>
      <text x="142" y="165" textAnchor="middle" fontSize="10" fill="#93c5fd">OPTIONS预检拦截(不转发后端)</text>
      <text x="142" y="185" textAnchor="middle" fontSize="10" fill="#93c5fd">添加Access-Control-Allow-*头</text>
      <text x="142" y="210" textAnchor="middle" fontSize="9" fill="#60a5fa">priority=2000 | header_filter阶段</text>

      {/* ACL */}
      <rect x="275" y="50" width="245" height="180" rx="12" fill="url(#kga-sp-acl)" opacity="0.92" />
      <text x="397" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">ACL 访问控制</text>
      <line x1="290" y1="85" x2="505" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="397" y="107" textAnchor="middle" fontSize="10" fill="#cffafe">基于Consumer group控制访问</text>
      <text x="397" y="127" textAnchor="middle" fontSize="10" fill="#a5f3fc">allow / deny group列表</text>
      <text x="397" y="145" textAnchor="middle" fontSize="10" fill="#a5f3fc">依赖认证插件识别Consumer</text>
      <text x="397" y="165" textAnchor="middle" fontSize="10" fill="#a5f3fc">admin-group / premium-group</text>
      <text x="397" y="185" textAnchor="middle" fontSize="10" fill="#a5f3fc">不在allow列表 → 403 Forbidden</text>
      <text x="397" y="210" textAnchor="middle" fontSize="9" fill="#67e8f9">priority=950 | access阶段(认证后)</text>

      {/* IP Restriction */}
      <rect x="530" y="50" width="250" height="180" rx="12" fill="url(#kga-sp-ip)" opacity="0.92" />
      <text x="655" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">IP Restriction</text>
      <line x1="545" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="655" y="107" textAnchor="middle" fontSize="10" fill="#fef3c7">黑白名单IP控制</text>
      <text x="655" y="127" textAnchor="middle" fontSize="10" fill="#fde68a">allow(白名单) / deny(黑名单)</text>
      <text x="655" y="145" textAnchor="middle" fontSize="10" fill="#fde68a">支持CIDR网段 192.168.1.0/24</text>
      <text x="655" y="165" textAnchor="middle" fontSize="10" fill="#fde68a">IPv4 + IPv6</text>
      <text x="655" y="185" textAnchor="middle" fontSize="10" fill="#fde68a">管理API白名单内网</text>
      <text x="655" y="210" textAnchor="middle" fontSize="9" fill="#fcd34d">priority=3000 | 认证前执行</text>

      {/* 安全防护链 */}
      <rect x="20" y="245" width="760" height="190" rx="10" fill="url(#kga-sp-chain)" opacity="0.9" />
      <text x="400" y="268" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">多层安全防护链（按 priority 从高到低自然形成过滤链）</text>
      <text x="400" y="292" textAnchor="middle" fontSize="11" fill="#ede9fe">① IP Restriction(3000) → ② Bot Detection(2500) → ③ CORS(2000) → ④ JWT(1450) → ⑤ Key Auth(1250) → ⑥ ACL(950) → ⑦ Rate Limiting(910)</text>
      <text x="400" y="315" textAnchor="middle" fontSize="10" fill="#ddd6fe">网络层(IP过滤) → 机器人层(Bot检测) → 跨域层(CORS) → 身份层(认证) → 权限层(ACL) → 频率层(限流)</text>
      <text x="400" y="338" textAnchor="middle" fontSize="10" fill="#ddd6fe">认证前过滤(IP/Bot)节省后端资源, 认证后授权(ACL)精准控制, 限流防暴力破解和DDoS</text>
      <text x="400" y="362" textAnchor="middle" fontSize="10" fontWeight="600" fill="#c4b5fd">纵深防御: 多层叠加, 任一层被突破仍有后续防护</text>
      <text x="400" y="385" textAnchor="middle" fontSize="10" fill="#c4b5fd">示例: /admin API → IP白名单(内网) + Bot检测 + JWT认证 + ACL(admin-group) + 限流(100/min) + CORS(admin域名)</text>
      <text x="400" y="412" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">安全 = IP限制 + Bot检测 + CORS + 认证 + ACL + 限流</text>

      {/* 配置示例 */}
      <rect x="20" y="450" width="760" height="95" rx="10" fill="#0f172a" opacity="0.88" />
      <text x="400" y="472" textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8"># ACL + JWT 安全配置示例</text>
      <text x="35" y="492" fontSize="10" fill="#4ade80">POST /consumers/alice/acls</text>
      <text x="35" y="508" fontSize="9" fill="#cbd5e1">&#123;"group":"admin-group"&#125;</text>
      <text x="35" y="528" fontSize="10" fill="#4ade80">POST /routes/admin-route/plugins</text>
      <text x="35" y="538" fontSize="9" fill="#cbd5e1">&#123;"name":"acl","config":&#123;"allow":["admin-group"]&#125;&#125; + &#123;"name":"jwt"&#125;</text>
    </svg>
  );
}
