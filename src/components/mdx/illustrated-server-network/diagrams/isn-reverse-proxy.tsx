"use client";

export function IsnReverseProxyDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="反向代理与网关：请求路由与过滤">
      <defs>
        <linearGradient id="isn-rp-client" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="isn-rp-proxy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="isn-rp-gw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="isn-rp-srv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="isn-rp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">反向代理与API网关</text>

      {/* 正向代理 vs 反向代理 */}
      <rect x="30" y="45" width="370" height="90" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="215" y="68" textAnchor="middle" fontSize="13" fontWeight="700" fill="#8b5cf6">正向代理（代理客户端）</text>
      <text x="60" y="92" textAnchor="start" fontSize="11" fill="#475569">客户端 → [正向代理] → 服务器</text>
      <text x="60" y="112" textAnchor="start" fontSize="10" fill="#64748b">客户端知道代理存在(需配置) · VPN/翻墙</text>
      <text x="60" y="128" textAnchor="start" fontSize="10" fill="#64748b">代理帮客户端访问服务器</text>

      <rect x="400" y="45" width="370" height="90" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="585" y="68" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb">反向代理（代理服务端）</text>
      <text x="430" y="92" textAnchor="start" fontSize="11" fill="#475569">客户端 → [反向代理] → 后端服务器</text>
      <text x="430" y="112" textAnchor="start" fontSize="10" fill="#64748b">客户端无感知(不需配置) · Nginx/网关</text>
      <text x="430" y="128" textAnchor="start" fontSize="10" fill="#64748b">代理帮服务端接收请求</text>

      {/* 反向代理七大职责 */}
      <rect x="30" y="150" width="740" height="60" rx="10" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
      <text x="400" y="172" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb">反向代理七大职责</text>
      <text x="400" y="195" textAnchor="middle" fontSize="11" fill="#475569">负载均衡 · SSL终结 · 缓存 · 安全过滤(WAF) · 限流 · 请求路由 · 协议转换</text>

      {/* 请求流转链路 */}
      <rect x="30" y="225" width="740" height="180" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="400" y="250" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">请求流转链路</text>

      {/* 客户端 */}
      <rect x="40" y="265" width="80" height="50" rx="8" fill="url(#isn-rp-client)" opacity="0.95" />
      <text x="80" y="295" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">客户端</text>
      <path d="M120 290 L150 290" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-rp-arrow)" />

      {/* 反向代理/Nginx */}
      <rect x="150" y="265" width="120" height="50" rx="8" fill="url(#isn-rp-proxy)" opacity="0.95" />
      <text x="210" y="288" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Nginx</text>
      <text x="210" y="304" textAnchor="middle" fontSize="9" fill="#bfdbfe">SSL终结/路由/缓存</text>
      <path d="M270 290 L300 290" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-rp-arrow)" />

      {/* API网关 */}
      <rect x="300" y="265" width="120" height="50" rx="8" fill="url(#isn-rp-gw)" opacity="0.95" />
      <text x="360" y="288" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">API网关</text>
      <text x="360" y="304" textAnchor="middle" fontSize="9" fill="#cffafe">认证/限流/转换</text>
      <path d="M420 290 L450 290" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-rp-arrow)" />

      {/* 后端服务 */}
      <rect x="450" y="260" width="90" height="30" rx="6" fill="url(#isn-rp-srv)" opacity="0.95" />
      <text x="495" y="280" textAnchor="middle" fontSize="10" fill="#fff">用户服务</text>
      <rect x="450" y="295" width="90" height="30" rx="6" fill="url(#isn-rp-srv)" opacity="0.95" />
      <text x="495" y="315" textAnchor="middle" fontSize="10" fill="#fff">订单服务</text>

      <rect x="580" y="260" width="90" height="30" rx="6" fill="url(#isn-rp-srv)" opacity="0.95" />
      <text x="625" y="280" textAnchor="middle" fontSize="10" fill="#fff">商品服务</text>
      <rect x="580" y="295" width="90" height="30" rx="6" fill="url(#isn-rp-srv)" opacity="0.95" />
      <text x="625" y="315" textAnchor="middle" fontSize="10" fill="#fff">支付服务</text>

      <path d="M540 275 L580 275" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#isn-rp-arrow)" />
      <path d="M540 310 L580 310" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#isn-rp-arrow)" />

      {/* 网关处理流程 */}
      <text x="400" y="350" textAnchor="middle" fontSize="11" fill="#475569">API网关处理流程：①认证(JWT) → ②限流(令牌桶) → ③路由(URL匹配) → ④协议转换 → ⑤转发 → ⑥日志监控</text>
      <text x="400" y="375" textAnchor="middle" fontSize="10" fill="#64748b">认证失败→401 · 限流超限→429 · 路由按URL分发到不同微服务</text>
      <text x="400" y="395" textAnchor="middle" fontSize="10" fill="#64748b">代表实现：Kong / Spring Cloud Gateway / APISIX</text>

      {/* 限流算法 */}
      <rect x="30" y="420" width="370" height="140" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="215" y="445" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">令牌桶限流</text>
      <text x="215" y="470" textAnchor="middle" fontSize="11" fill="#475569">桶容量100 · 每秒补充10个令牌</text>
      <text x="215" y="490" textAnchor="middle" fontSize="11" fill="#475569">请求取令牌 → 有则放行，无则拒绝</text>
      <text x="215" y="515" textAnchor="middle" fontSize="11" fill="#059669">允许短时突发(桶满时100个瞬间通过)</text>
      <text x="215" y="535" textAnchor="middle" fontSize="11" fill="#059669">长期平均速率受补充速率限制</text>
      <text x="215" y="552" textAnchor="middle" fontSize="10" fill="#64748b">适合业务有波峰的场景</text>

      <rect x="400" y="420" width="370" height="140" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="585" y="445" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">漏桶限流</text>
      <text x="585" y="470" textAnchor="middle" fontSize="11" fill="#475569">桶容量100 · 每秒漏出10个请求</text>
      <text x="585" y="490" textAnchor="middle" fontSize="11" fill="#475569">请求入桶 → 桶满则拒绝</text>
      <text x="585" y="515" textAnchor="middle" fontSize="11" fill="#f59e0b">输出恒定10次/秒，不允许突发</text>
      <text x="585" y="535" textAnchor="middle" fontSize="11" fill="#f59e0b">平滑输出</text>
      <text x="585" y="552" textAnchor="middle" fontSize="10" fill="#64748b">适合需严格匀速的场景</text>
    </svg>
  );
}
