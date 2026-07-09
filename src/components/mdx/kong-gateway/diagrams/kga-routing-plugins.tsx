"use client";

export function KgaRoutingPluginsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="Kong路由匹配与插件作用域">
      <defs>
        <linearGradient id="kga-rp-route" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="kga-rp-scope" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="kga-rp-up" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="kga-rp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Route匹配规则与插件作用域</text>

      {/* Route匹配维度 */}
      <rect x="20" y="50" width="370" height="230" rx="12" fill="url(#kga-rp-route)" opacity="0.92" />
      <text x="205" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Route 匹配维度</text>
      <line x1="40" y1="85" x2="370" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="35" y="108" fontSize="10" fill="#bfdbfe">protocols: http/https/grpc/tcp</text>
      <text x="35" y="128" fontSize="10" fill="#bfdbfe">methods: GET/POST/PUT/DELETE</text>
      <text x="35" y="148" fontSize="10" fill="#bfdbfe">hosts: *.example.com (通配符)</text>
      <text x="35" y="168" fontSize="10" fill="#bfdbfe">paths: /api/v1 (前缀) / ~/regex (正则)</text>
      <text x="35" y="188" fontSize="10" fill="#bfdbfe">headers: x-custom:value</text>
      <text x="35" y="208" fontSize="10" fill="#bfdbfe">snis: TLS SNI</text>
      <line x1="40" y1="218" x2="370" y2="218" stroke="#fff" strokeWidth="1" opacity="0.3" />
      <text x="205" y="238" textAnchor="middle" fontSize="10" fontWeight="600" fill="#93c5fd">优先级: protocols &gt; methods &gt; hosts</text>
      <text x="205" y="256" textAnchor="middle" fontSize="10" fontWeight="600" fill="#93c5fd">(精确&gt;通配) &gt; paths(长&gt;短) &gt; headers</text>
      <text x="205" y="272" textAnchor="middle" fontSize="10" fill="#60a5fa">strip_path=true 剥离匹配前缀</text>

      {/* 插件作用域 */}
      <rect x="400" y="50" width="380" height="230" rx="12" fill="url(#kga-rp-scope)" opacity="0.92" />
      <text x="590" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">插件作用域（从宽到窄）</text>
      <line x1="420" y1="85" x2="760" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <rect x="415" y="95" width="350" height="32" rx="6" fill="#fff" opacity="0.12" />
      <text x="590" y="116" textAnchor="middle" fontSize="10" fill="#cffafe">① 全局(global) — 所有Route所有请求</text>
      <rect x="425" y="135" width="330" height="32" rx="6" fill="#fff" opacity="0.12" />
      <text x="590" y="156" textAnchor="middle" fontSize="10" fill="#cffafe">② Service级 — 路由到该Service的请求</text>
      <rect x="440" y="175" width="300" height="32" rx="6" fill="#fff" opacity="0.12" />
      <text x="590" y="196" textAnchor="middle" fontSize="10" fill="#cffafe">③ Route级 — 匹配该Route的请求</text>
      <rect x="460" y="215" width="260" height="32" rx="6" fill="#fff" opacity="0.12" />
      <text x="590" y="236" textAnchor="middle" fontSize="10" fill="#cffafe">④ Consumer级 — 该Consumer的请求</text>
      <text x="590" y="265" textAnchor="middle" fontSize="10" fontWeight="600" fill="#67e8f9">同名插件: 最具体作用域覆盖（Consumer &gt; Route &gt; Service &gt; 全局）</text>

      {/* Upstream/Target */}
      <rect x="20" y="295" width="370" height="100" rx="10" fill="url(#kga-rp-up)" opacity="0.9" />
      <text x="205" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Upstream / Target 负载均衡</text>
      <text x="205" y="338" textAnchor="middle" fontSize="10" fill="#fef3c7">Service.host → Upstream名 → Targets列表</text>
      <text x="205" y="356" textAnchor="middle" fontSize="10" fill="#fde68a">算法: round-robin(加权) / least-connections / 一致性哈希</text>
      <text x="205" y="374" textAnchor="middle" fontSize="10" fill="#fde68a">健康检查: 主动(HTTP探测) + 被动(请求结果)</text>
      <text x="205" y="388" textAnchor="middle" fontSize="10" fill="#fcd34d">故障Target自动剔除, 恢复自动加入</text>

      {/* 路由流程 */}
      <rect x="400" y="295" width="380" height="100" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="590" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">请求路由流程</text>
      <text x="590" y="340" textAnchor="middle" fontSize="10" fill="#475569">Client → Proxy(8000) → Route匹配 → Service</text>
      <text x="590" y="358" textAnchor="middle" fontSize="10" fill="#475569">→ Upstream(LB选择Target) → 后端实例</text>
      <text x="590" y="376" textAnchor="middle" fontSize="10" fill="#475569">→ 响应 → Client</text>
      <text x="590" y="390" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">Route(入口) → Service(出口) → Upstream(LB) → Target(后端)</text>

      {/* Admin API示例 */}
      <rect x="20" y="410" width="760" height="135" rx="10" fill="#0f172a" opacity="0.88" />
      <text x="400" y="432" textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8"># Admin API 配置示例</text>
      <text x="35" y="452" fontSize="10" fill="#4ade80">POST /services</text>
      <text x="35" y="468" fontSize="9" fill="#cbd5e1">&#123;"name":"user-service","url":"http://user-svc:8080"&#125;</text>
      <text x="35" y="488" fontSize="10" fill="#4ade80">POST /services/user-service/routes</text>
      <text x="35" y="504" fontSize="9" fill="#cbd5e1">&#123;"name":"user-route","paths":["/users"],"methods":["GET","POST"],"strip_path":true&#125;</text>
      <text x="35" y="524" fontSize="10" fill="#4ade80">POST /routes/user-route/plugins</text>
      <text x="35" y="538" fontSize="9" fill="#cbd5e1">&#123;"name":"jwt","config":&#123;"claims_to_verify":["exp"]&#125;&#125;</text>
    </svg>
  );
}
