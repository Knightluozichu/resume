"use client";

export function IlhAuthenticationDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="HTTP认证方式对比">
      <defs>
        <linearGradient id="ilh-au-basic" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="ilh-au-digest" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ilh-au-session" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="ilh-au-token" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">HTTP认证方式对比</text>

      {/* BASIC认证 */}
      <rect x="20" y="55" width="185" height="155" rx="10" fill="url(#ilh-au-basic)" opacity="0.95" />
      <text x="112" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">BASIC认证</text>
      <line x1="35" y1="90" x2="190" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="112" y="112" textAnchor="middle" fontSize="10" fill="#fecaca">用户名:密码</text>
      <text x="112" y="128" textAnchor="middle" fontSize="10" fill="#fecaca">Base64编码</text>
      <text x="112" y="148" textAnchor="middle" fontSize="10" fill="#fee2e2">Authorization头</text>
      <text x="112" y="170" textAnchor="middle" fontSize="10" fill="#fca5a5">安全性：低</text>
      <text x="112" y="188" textAnchor="middle" fontSize="10" fill="#fca5a5">明文（仅编码）</text>
      <text x="112" y="205" textAnchor="middle" fontSize="10" fill="#f87171">需配合HTTPS</text>

      {/* Digest认证 */}
      <rect x="215" y="55" width="185" height="155" rx="10" fill="url(#ilh-au-digest)" opacity="0.95" />
      <text x="307" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Digest认证</text>
      <line x1="230" y1="90" x2="385" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="307" y="112" textAnchor="middle" fontSize="10" fill="#fef3c7">质询-响应机制</text>
      <text x="307" y="128" textAnchor="middle" fontSize="10" fill="#fef3c7">MD5摘要</text>
      <text x="307" y="148" textAnchor="middle" fontSize="10" fill="#fde68a">nonce防重放</text>
      <text x="307" y="170" textAnchor="middle" fontSize="10" fill="#fcd34d">安全性：中</text>
      <text x="307" y="188" textAnchor="middle" fontSize="10" fill="#fcd34d">密码不明文传输</text>
      <text x="307" y="205" textAnchor="middle" fontSize="10" fill="#f59e0b">但MD5已不安全</text>

      {/* Session认证 */}
      <rect x="410" y="55" width="185" height="155" rx="10" fill="url(#ilh-au-session)" opacity="0.95" />
      <text x="502" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Session认证</text>
      <line x1="425" y1="90" x2="580" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="502" y="112" textAnchor="middle" fontSize="10" fill="#bfdbfe">服务器端保存状态</text>
      <text x="502" y="128" textAnchor="middle" fontSize="10" fill="#bfdbfe">Set-Cookie: sid=xxx</text>
      <text x="502" y="148" textAnchor="middle" fontSize="10" fill="#93c5fd">Cookie携带Session ID</text>
      <text x="502" y="170" textAnchor="middle" fontSize="10" fill="#60a5fa">安全性：中-高</text>
      <text x="502" y="188" textAnchor="middle" fontSize="10" fill="#60a5fa">有状态（服务器存储）</text>
      <text x="502" y="205" textAnchor="middle" fontSize="10" fill="#3b82f6">扩展性差（需共享Session）</text>

      {/* Token认证 */}
      <rect x="605" y="55" width="175" height="155" rx="10" fill="url(#ilh-au-token)" opacity="0.95" />
      <text x="692" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Token认证</text>
      <line x1="620" y1="90" x2="765" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="692" y="112" textAnchor="middle" fontSize="10" fill="#d1fae5">客户端保存Token</text>
      <text x="692" y="128" textAnchor="middle" fontSize="10" fill="#d1fae5">Authorization: Bearer</text>
      <text x="692" y="148" textAnchor="middle" fontSize="10" fill="#a7f3d0">JWT = Header.Payload.Sign</text>
      <text x="692" y="170" textAnchor="middle" fontSize="10" fill="#6ee7b7">安全性：高</text>
      <text x="692" y="188" textAnchor="middle" fontSize="10" fill="#6ee7b7">无状态（服务器不存）</text>
      <text x="692" y="205" textAnchor="middle" fontSize="10" fill="#10b981">扩展性好（适合分布式）</text>

      {/* Session流程图 */}
      <rect x="20" y="230" width="760" height="130" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="253" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Session + Cookie 认证流程</text>
      <text x="400" y="278" textAnchor="middle" fontSize="11" fill="#475569">① 客户端发送用户名密码 → ② 服务器验证通过，创建Session，Set-Cookie: sid=xxx</text>
      <text x="400" y="298" textAnchor="middle" fontSize="11" fill="#475569">③ 客户端保存Cookie → ④ 后续请求自动携带Cookie: sid=xxx</text>
      <text x="400" y="318" textAnchor="middle" fontSize="11" fill="#475569">⑤ 服务器根据Session ID查找Session → ⑥ 返回用户数据</text>
      <text x="400" y="343" textAnchor="middle" fontSize="11" fill="#64748b">关键：Session ID 是连接客户端和服务器的凭证，Cookie 是传输载体</text>

      {/* 认证 vs 授权 */}
      <rect x="20" y="375" width="370" height="125" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="205" y="398" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1d4ed8">认证（Authentication）</text>
      <text x="205" y="422" textAnchor="middle" fontSize="11" fill="#1e3a8a">「你是谁？」</text>
      <text x="205" y="442" textAnchor="middle" fontSize="11" fill="#1e3a8a">验证用户身份的过程</text>
      <text x="205" y="462" textAnchor="middle" fontSize="11" fill="#1e3a8a">手段：密码/验证码/生物识别</text>
      <text x="205" y="482" textAnchor="middle" fontSize="11" fill="#1e3a8a">HTTP状态码：401 Unauthorized</text>

      <rect x="410" y="375" width="370" height="125" rx="10" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="595" y="398" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669">授权（Authorization）</text>
      <text x="595" y="422" textAnchor="middle" fontSize="11" fill="#065f46">「你能做什么？」</text>
      <text x="595" y="442" textAnchor="middle" fontSize="11" fill="#065f46">控制资源访问权限</text>
      <text x="595" y="462" textAnchor="middle" fontSize="11" fill="#065f46">手段：角色/权限/ACL</text>
      <text x="595" y="482" textAnchor="middle" fontSize="11" fill="#065f46">HTTP状态码：403 Forbidden</text>
    </svg>
  );
}
