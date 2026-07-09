"use client";

export function KgaAuthenticationDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="Kong认证授权插件体系">
      <defs>
        <linearGradient id="kga-au-jwt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="kga-au-key" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="kga-au-oauth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="kga-au-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="kga-au-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kong 认证授权：Consumer → Credential → Plugin</text>

      {/* JWT */}
      <rect x="20" y="50" width="245" height="190" rx="12" fill="url(#kga-au-jwt)" opacity="0.92" />
      <text x="142" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">JWT 认证</text>
      <line x1="35" y1="85" x2="250" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="142" y="107" textAnchor="middle" fontSize="10" fill="#bfdbfe">Authorization: Bearer &lt;jwt&gt;</text>
      <text x="142" y="127" textAnchor="middle" fontSize="10" fill="#93c5fd">Kong验签(HS256/RS256)</text>
      <text x="142" y="145" textAnchor="middle" fontSize="10" fill="#93c5fd">验证exp过期声明</text>
      <text x="142" y="163" textAnchor="middle" fontSize="10" fill="#93c5fd">iss查找Consumer的secret</text>
      <text x="142" y="181" textAnchor="middle" fontSize="10" fill="#93c5fd">注入X-Consumer-Id头</text>
      <text x="142" y="203" textAnchor="middle" fontSize="9" fill="#60a5fa">priority=1450</text>
      <text x="142" y="223" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">适合：微服务/前后端分离</text>

      {/* Key Auth */}
      <rect x="275" y="50" width="245" height="190" rx="12" fill="url(#kga-au-key)" opacity="0.92" />
      <text x="397" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Key Auth 认证</text>
      <line x1="290" y1="85" x2="505" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="397" y="107" textAnchor="middle" fontSize="10" fill="#cffafe">apikey: &lt;key&gt; (header/query)</text>
      <text x="397" y="127" textAnchor="middle" fontSize="10" fill="#a5f3fc">Kong查找apikey对应Consumer</text>
      <text x="397" y="145" textAnchor="middle" fontSize="10" fill="#a5f3fc">hide_credentials=true隐藏密钥</text>
      <text x="397" y="163" textAnchor="middle" fontSize="10" fill="#a5f3fc">自动生成或手动指定key</text>
      <text x="397" y="181" textAnchor="middle" fontSize="10" fill="#a5f3fc">注入X-Consumer-Id头</text>
      <text x="397" y="203" textAnchor="middle" fontSize="9" fill="#67e8f9">priority=1250</text>
      <text x="397" y="223" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">适合：内部服务/简单场景</text>

      {/* OAuth2 */}
      <rect x="530" y="50" width="250" height="190" rx="12" fill="url(#kga-au-oauth)" opacity="0.92" />
      <text x="655" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">OAuth2 认证</text>
      <line x1="545" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="655" y="107" textAnchor="middle" fontSize="10" fill="#fef3c7">Authorization: Bearer &lt;token&gt;</text>
      <text x="655" y="127" textAnchor="middle" fontSize="10" fill="#fde68a">四种授权类型:</text>
      <text x="655" y="145" textAnchor="middle" fontSize="9" fill="#fde68a">authorization_code(授权码)</text>
      <text x="655" y="163" textAnchor="middle" fontSize="9" fill="#fde68a">implicit / password / client_credentials</text>
      <text x="655" y="181" textAnchor="middle" fontSize="10" fill="#fde68a">token_expiration + refresh_token</text>
      <text x="655" y="203" textAnchor="middle" fontSize="9" fill="#fcd34d">provision_key管理授权端点</text>
      <text x="655" y="223" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">适合：第三方应用/开放平台</text>

      {/* 认证流程 */}
      <rect x="20" y="255" width="760" height="130" rx="10" fill="url(#kga-au-flow)" opacity="0.9" />
      <text x="400" y="278" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">认证 + 授权 完整流程</text>
      <text x="400" y="302" textAnchor="middle" fontSize="11" fill="#ede9fe">Client请求(携带Credential) → 认证插件验证凭证 → 识别Consumer → 注入X-Consumer-Id → ACL检查group权限</text>
      <text x="400" y="325" textAnchor="middle" fontSize="10" fill="#ddd6fe">① JWT/Key-Auth验证凭证 ② 查找Credential关联的Consumer ③ 注入Consumer信息到请求头</text>
      <text x="400" y="345" textAnchor="middle" fontSize="10" fill="#ddd6fe">④ ACL插件检查Consumer的group是否在allow列表 ⑤ 通过则转发后端, 拒绝返回403</text>
      <text x="400" y="370" textAnchor="middle" fontSize="10" fontWeight="600" fill="#c4b5fd">认证(你是谁) + 授权(你能做什么) 分离设计</text>

      {/* Consumer-Credential关系 */}
      <rect x="20" y="400" width="370" height="145" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="205" y="422" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Consumer ↔ Credential 关系</text>
      <text x="205" y="445" textAnchor="middle" fontSize="10" fill="#475569">POST /consumers &#123;"username":"alice"&#125;</text>
      <text x="205" y="465" textAnchor="middle" fontSize="10" fill="#475569">POST /consumers/alice/jwt &#123;"key":"alice-key","secret":"..."&#125;</text>
      <text x="205" y="485" textAnchor="middle" fontSize="10" fill="#475569">POST /consumers/alice/key-auth &#123;"key":"alice-apikey"&#125;</text>
      <text x="205" y="505" textAnchor="middle" fontSize="10" fill="#475569">POST /consumers/alice/acls &#123;"group":"premium"&#125;</text>
      <text x="205" y="530" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">1 Consumer : N Credentials : N Groups</text>

      {/* 多认证组合 */}
      <rect x="400" y="400" width="380" height="145" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="590" y="422" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">多认证插件组合</text>
      <text x="590" y="445" textAnchor="middle" fontSize="10" fill="#475569">同一Route同时启用jwt + key-auth</text>
      <text x="590" y="465" textAnchor="middle" fontSize="10" fill="#475569">按priority: JWT(1450)先于Key Auth(1250)</text>
      <text x="590" y="485" textAnchor="middle" fontSize="10" fill="#475569">任一认证通过即可(默认行为)</text>
      <text x="590" y="505" textAnchor="middle" fontSize="10" fill="#475569">anonymous机制: 认证失败关联匿名Consumer</text>
      <text x="590" y="530" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">认证通过 → Consumer识别 → ACL授权 → 限流</text>
    </svg>
  );
}
