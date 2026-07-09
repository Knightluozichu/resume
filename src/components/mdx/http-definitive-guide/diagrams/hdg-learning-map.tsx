"use client";

export function HdgLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="HTTP权威指南全书学习地图">
      <defs>
        <linearGradient id="hdg-lm-fund" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="hdg-lm-infra" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="hdg-lm-sec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="hdg-lm-adv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="hdg-lm-review" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="hdg-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">HTTP 权威指南 · 知识体系全景</text>

      {/* 左侧：四大知识域 */}
      <text x="140" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">四大知识域</text>

      <rect x="20" y="72" width="240" height="100" rx="10" fill="url(#hdg-lm-fund)" opacity="0.95" />
      <text x="140" y="100" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">域一：HTTP 基础</text>
      <text x="140" y="122" textAnchor="middle" fontSize="11" fill="#bfdbfe">学习地图 → 报文与连接 → URL资源</text>
      <text x="140" y="142" textAnchor="middle" fontSize="10" fill="#60a5fa">解决：HTTP 怎么发、资源怎么定位</text>
      <text x="140" y="160" textAnchor="middle" fontSize="10" fill="#60a5fa">核心：请求/响应 / 方法 / 状态码</text>

      <rect x="20" y="182" width="240" height="100" rx="10" fill="url(#hdg-lm-infra)" opacity="0.95" />
      <text x="140" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">域二：中间基础设施</text>
      <text x="140" y="232" textAnchor="middle" fontSize="11" fill="#cffafe">代理网关 → 缓存体系 → 内容协商</text>
      <text x="140" y="252" textAnchor="middle" fontSize="10" fill="#67e8f9">解决：中间层怎么转发/缓存/转换</text>
      <text x="140" y="270" textAnchor="middle" fontSize="10" fill="#67e8f9">核心：代理转发 / 缓存验证 / 协商</text>

      <rect x="20" y="292" width="240" height="100" rx="10" fill="url(#hdg-lm-sec)" opacity="0.95" />
      <text x="140" y="320" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">域三：安全与认证</text>
      <text x="140" y="342" textAnchor="middle" fontSize="11" fill="#fecaca">认证安全 → HTTPS与SSL/TLS</text>
      <text x="140" y="362" textAnchor="middle" fontSize="10" fill="#fca5a5">解决：身份怎么验证、通信怎么加密</text>
      <text x="140" y="380" textAnchor="middle" fontSize="10" fill="#fca5a5">核心：Basic/Digest / TLS握手 / 证书</text>

      <rect x="20" y="402" width="240" height="100" rx="10" fill="url(#hdg-lm-adv)" opacity="0.95" />
      <text x="140" y="430" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">域四：部署与整合</text>
      <text x="140" y="452" textAnchor="middle" fontSize="11" fill="#fef3c7">Web托管 → 全书复习</text>
      <text x="140" y="472" textAnchor="middle" fontSize="10" fill="#fcd34d">解决：怎么部署、知识怎么串联</text>
      <text x="140" y="490" textAnchor="middle" fontSize="10" fill="#fcd34d">核心：虚拟主机 / 重定向 / 端到端流程</text>

      {/* 右侧：HTTP 请求生命周期 */}
      <text x="540" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">HTTP 请求生命周期</text>

      <rect x="300" y="72" width="480" height="44" rx="8" fill="url(#hdg-lm-fund)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="320" y="99" fontSize="12" fontWeight="600" fill="#1e40af">1. URL 解析</text>
      <text x="420" y="99" fontSize="11" fill="#475569">解析 scheme://host:port/path，DNS 查询 IP</text>

      <path d="M540 116 L540 126" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-lm-arrow)" />

      <rect x="300" y="128" width="480" height="44" rx="8" fill="url(#hdg-lm-fund)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="320" y="155" fontSize="12" fontWeight="600" fill="#1e40af">2. 建立连接</text>
      <text x="420" y="155" fontSize="11" fill="#475569">TCP 三次握手，TLS 握手（HTTPS）</text>

      <path d="M540 172 L540 182" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-lm-arrow)" />

      <rect x="300" y="184" width="480" height="44" rx="8" fill="url(#hdg-lm-infra)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="320" y="211" fontSize="12" fontWeight="600" fill="#0e7490">3. 代理转发</text>
      <text x="420" y="211" fontSize="11" fill="#475569">请求经代理/网关转发到目标服务器</text>

      <path d="M540 228 L540 238" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-lm-arrow)" />

      <rect x="300" y="240" width="480" height="44" rx="8" fill="url(#hdg-lm-infra)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="320" y="267" fontSize="12" fontWeight="600" fill="#0e7490">4. 缓存查询</text>
      <text x="420" y="267" fontSize="11" fill="#475569">缓存命中返回副本，未命中转发到源服务器</text>

      <path d="M540 284 L540 294" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-lm-arrow)" />

      <rect x="300" y="296" width="480" height="44" rx="8" fill="url(#hdg-lm-sec)" opacity="0.12" stroke="#ef4444" strokeWidth="1.5" />
      <text x="320" y="323" fontSize="12" fontWeight="600" fill="#991b1b">5. 认证鉴权</text>
      <text x="420" y="323" fontSize="11" fill="#475569">Basic/Digest 认证，验证客户端身份</text>

      <path d="M540 340 L540 350" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-lm-arrow)" />

      <rect x="300" y="352" width="480" height="44" rx="8" fill="url(#hdg-lm-infra)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="320" y="379" fontSize="12" fontWeight="600" fill="#0e7490">6. 内容协商</text>
      <text x="420" y="379" fontSize="11" fill="#475569">根据 Accept 头选择最佳表示，可能转码</text>

      <path d="M540 396 L540 406" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-lm-arrow)" />

      <rect x="300" y="408" width="480" height="44" rx="8" fill="url(#hdg-lm-adv)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="320" y="435" fontSize="12" fontWeight="600" fill="#92400e">7. 响应返回</text>
      <text x="420" y="435" fontSize="11" fill="#475569">服务器返回响应，经缓存/代理回传客户端</text>

      <path d="M540 452 L540 462" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-lm-arrow)" />

      <rect x="300" y="464" width="480" height="44" rx="8" fill="url(#hdg-lm-review)" opacity="0.12" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="320" y="491" fontSize="12" fontWeight="600" fill="#5b21b6">8. 连接关闭</text>
      <text x="420" y="491" fontSize="11" fill="#475569">持久连接保持或关闭，资源释放</text>

      {/* 底部学习路径 */}
      <rect x="20" y="524" width="760" height="64" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="548" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">推荐学习路径</text>
      <text x="400" y="570" textAnchor="middle" fontSize="11" fill="#475569">基础(报文/URL) → 基础设施(代理/缓存) → 安全(认证/HTTPS) → 高级(协商/托管) → 复习整合</text>
    </svg>
  );
}
