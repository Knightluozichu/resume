"use client";

export function KgaTrafficControlDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="Kong流量控制插件体系">
      <defs>
        <linearGradient id="kga-tc-rl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="kga-tc-cache" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="kga-tc-trans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="kga-tc-break" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kong 流量控制：限流 / 缓存 / 转换 / 熔断</text>

      {/* Rate Limiting */}
      <rect x="20" y="50" width="185" height="200" rx="12" fill="url(#kga-tc-rl)" opacity="0.92" />
      <text x="112" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Rate Limiting</text>
      <line x1="35" y1="85" x2="190" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="112" y="107" textAnchor="middle" fontSize="10" fill="#bfdbfe">限流算法</text>
      <text x="112" y="127" textAnchor="middle" fontSize="9" fill="#93c5fd">计数器(固定窗口)</text>
      <text x="112" y="145" textAnchor="middle" fontSize="9" fill="#93c5fd">漏桶(平滑输出)</text>
      <text x="112" y="163" textAnchor="middle" fontSize="9" fill="#93c5fd">令牌桶(允许突发)</text>
      <text x="112" y="185" textAnchor="middle" fontSize="10" fill="#bfdbfe">policy策略</text>
      <text x="112" y="203" textAnchor="middle" fontSize="9" fill="#93c5fd">local/shared_dict/cluster/redis</text>
      <text x="112" y="223" textAnchor="middle" fontSize="9" fill="#60a5fa">limit_by: consumer/ip/credential</text>
      <text x="112" y="240" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">超限返回429</text>

      {/* Proxy Cache */}
      <rect x="215" y="50" width="185" height="200" rx="12" fill="url(#kga-tc-cache)" opacity="0.92" />
      <text x="307" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Proxy Cache</text>
      <line x1="230" y1="85" x2="385" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="307" y="107" textAnchor="middle" fontSize="10" fill="#cffafe">请求缓存命中直接返回</text>
      <text x="307" y="127" textAnchor="middle" fontSize="9" fill="#a5f3fc">key = method+URI+query</text>
      <text x="307" y="145" textAnchor="middle" fontSize="9" fill="#a5f3fc">response_code: 200/301</text>
      <text x="307" y="163" textAnchor="middle" fontSize="9" fill="#a5f3fc">request_method: GET/HEAD</text>
      <text x="307" y="185" textAnchor="middle" fontSize="10" fill="#cffafe">cache_ttl / cache_size</text>
      <text x="307" y="203" textAnchor="middle" fontSize="9" fill="#a5f3fc">strategy: memory/redis</text>
      <text x="307" y="223" textAnchor="middle" fontSize="9" fill="#67e8f9">X-Cache-Status: Hit/Miss</text>
      <text x="307" y="240" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">减轻后端读压力</text>

      {/* Transformer */}
      <rect x="410" y="50" width="185" height="200" rx="12" fill="url(#kga-tc-trans)" opacity="0.92" />
      <text x="502" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Transformer</text>
      <line x1="425" y1="85" x2="580" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="502" y="107" textAnchor="middle" fontSize="10" fill="#fef3c7">Request Transformer</text>
      <text x="502" y="125" textAnchor="middle" fontSize="9" fill="#fde68a">add/remove/rename/replace</text>
      <text x="502" y="143" textAnchor="middle" fontSize="9" fill="#fde68a">headers/querystring/body</text>
      <text x="502" y="165" textAnchor="middle" fontSize="10" fill="#fef3c7">Response Transformer</text>
      <text x="502" y="183" textAnchor="middle" fontSize="9" fill="#fde68a">headers/json</text>
      <text x="502" y="205" textAnchor="middle" fontSize="10" fill="#fde68a">注入X-Consumer-Id</text>
      <text x="502" y="223" textAnchor="middle" fontSize="9" fill="#fcd34d">移除敏感头 / 版本迁移</text>
      <text x="502" y="240" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">请求/响应改写</text>

      {/* 熔断 */}
      <rect x="605" y="50" width="175" height="200" rx="12" fill="url(#kga-tc-break)" opacity="0.92" />
      <text x="692" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">熔断与终止</text>
      <line x1="620" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="692" y="107" textAnchor="middle" fontSize="10" fill="#ede9fe">Request Termination</text>
      <text x="692" y="125" textAnchor="middle" fontSize="9" fill="#ddd6fe">直接返回503/自定义</text>
      <text x="692" y="143" textAnchor="middle" fontSize="9" fill="#ddd6fe">服务维护/紧急下线</text>
      <text x="692" y="165" textAnchor="middle" fontSize="10" fill="#ede9fe">Upstream健康检查</text>
      <text x="692" y="183" textAnchor="middle" fontSize="9" fill="#ddd6fe">被动: 5xx/超时剔除Target</text>
      <text x="692" y="201" textAnchor="middle" fontSize="9" fill="#ddd6fe">主动: HTTP探测恢复</text>
      <text x="692" y="223" textAnchor="middle" fontSize="9" fill="#c4b5fd">Prometheus+动态熔断</text>
      <text x="692" y="240" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">自动+手动故障隔离</text>

      {/* 流量治理策略 */}
      <rect x="20" y="265" width="760" height="280" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">流量治理策略（从预防到自动到手动）</text>
      <text x="400" y="315" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1d4ed8">正常流量：限流(防过载) + 缓存(减压力) + 转换(适配)</text>
      <text x="400" y="338" textAnchor="middle" fontSize="11" fill="#475569">Rate Limiting按Consumer限流(普通100/min, VIP 1000/min) → Proxy Cache缓存GET请求(TTL=60s) → Transformer注入Consumer信息</text>
      <text x="400" y="365" textAnchor="middle" fontSize="12" fontWeight="600" fill="#d97706">后端故障：健康检查自动剔除 + 剩余节点继续服务</text>
      <text x="400" y="388" textAnchor="middle" fontSize="11" fill="#475569">Upstream被动健康检查: 连续3次5xx/超时 → Target标记unhealthy → 流量自动转移到健康Target → 故障恢复自动重新加入</text>
      <text x="400" y="415" textAnchor="middle" fontSize="12" fontWeight="600" fill="#dc2626">全部故障：Request Termination快速失败 + 降级响应</text>
      <text x="400" y="438" textAnchor="middle" fontSize="11" fill="#475569">所有Target不可用 → Request Termination返回503 → Response Transformer返回降级数据(缓存/默认值) → 避免请求堆积</text>
      <text x="400" y="465" textAnchor="middle" fontSize="12" fontWeight="600" fill="#6d28d9">紧急维护：Request Termination直接下线API</text>
      <text x="400" y="488" textAnchor="middle" fontSize="11" fill="#475569">Admin API动态添加Request Termination插件 → 即时生效 → 维护完成后删除插件恢复</text>
      <text x="400" y="520" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">核心：限流防过载 + 缓存减压力 + 健康检查自动剔除 + Termination手动熔断 = 完整流量治理链</text>
    </svg>
  );
}
