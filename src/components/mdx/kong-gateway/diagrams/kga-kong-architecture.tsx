"use client";

export function KgaKongArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="Kong架构与数据模型">
      <defs>
        <linearGradient id="kga-ka-ngx" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="kga-ka-data" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="kga-ka-port" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="kga-ka-life" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="kga-ka-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kong 架构：OpenResty + 数据模型 + 生命周期</text>

      {/* OpenResty 架构 */}
      <rect x="20" y="50" width="370" height="170" rx="12" fill="url(#kga-ka-ngx)" opacity="0.92" />
      <text x="205" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">OpenResty 架构</text>
      <line x1="40" y1="85" x2="370" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="205" y="107" textAnchor="middle" fontSize="11" fill="#bfdbfe">Nginx (master + worker 进程)</text>
      <text x="205" y="127" textAnchor="middle" fontSize="11" fill="#bfdbfe">LuaJIT (即时编译, 性能接近C)</text>
      <text x="205" y="147" textAnchor="middle" fontSize="10" fill="#93c5fd">worker: 单线程事件驱动(epoll)</text>
      <text x="205" y="165" textAnchor="middle" fontSize="10" fill="#93c5fd">shared dict: 跨worker共享内存</text>
      <text x="205" y="183" textAnchor="middle" fontSize="10" fill="#93c5fd">插件在Lua协程中执行, 不阻塞</text>
      <text x="205" y="205" textAnchor="middle" fontSize="10" fontWeight="600" fill="#60a5fa">Kong = Nginx事件驱动 + Lua动态扩展</text>

      {/* 双端口 */}
      <rect x="400" y="50" width="380" height="170" rx="12" fill="url(#kga-ka-port)" opacity="0.92" />
      <text x="590" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">双端口架构</text>
      <line x1="420" y1="85" x2="760" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="490" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">Proxy (数据面)</text>
      <text x="490" y="128" textAnchor="middle" fontSize="10" fill="#fef3c7">8000 HTTP / 8443 HTTPS</text>
      <text x="490" y="146" textAnchor="middle" fontSize="9" fill="#fde68a">客户端API请求入口</text>
      <text x="490" y="162" textAnchor="middle" fontSize="9" fill="#fde68a">路由匹配 + 插件执行</text>
      <text x="490" y="180" textAnchor="middle" fontSize="9" fill="#fcd34d">对外暴露</text>
      <text x="690" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">Admin API (控制面)</text>
      <text x="690" y="128" textAnchor="middle" fontSize="10" fill="#fef3c7">8001 HTTP / 8444 HTTPS</text>
      <text x="690" y="146" textAnchor="middle" fontSize="9" fill="#fde68a">配置管理RESTful API</text>
      <text x="690" y="162" textAnchor="middle" fontSize="9" fill="#fde68a">CRUD Service/Route/Plugin</text>
      <text x="690" y="180" textAnchor="middle" fontSize="9" fill="#fcd34d">禁止暴露公网</text>
      <text x="590" y="205" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">数据面 vs 控制面分离</text>

      {/* 五大数据模型 */}
      <text x="400" y="248" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">五大核心数据模型</text>

      <rect x="20" y="260" width="145" height="100" rx="8" fill="url(#kga-ka-data)" opacity="0.9" />
      <text x="92" y="283" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Service</text>
      <text x="92" y="302" textAnchor="middle" fontSize="9" fill="#cffafe">后端微服务抽象</text>
      <text x="92" y="318" textAnchor="middle" fontSize="9" fill="#a5f3fc">protocol/host/port</text>
      <text x="92" y="334" textAnchor="middle" fontSize="9" fill="#a5f3fc">= 路由出口</text>
      <text x="92" y="350" textAnchor="middle" fontSize="9" fill="#67e8f9">1 Service = 1后端</text>

      <rect x="175" y="260" width="145" height="100" rx="8" fill="url(#kga-ka-data)" opacity="0.9" />
      <text x="247" y="283" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Route</text>
      <text x="247" y="302" textAnchor="middle" fontSize="9" fill="#cffafe">请求匹配规则</text>
      <text x="247" y="318" textAnchor="middle" fontSize="9" fill="#a5f3fc">paths/methods/hosts</text>
      <text x="247" y="334" textAnchor="middle" fontSize="9" fill="#a5f3fc">→ 关联Service</text>
      <text x="247" y="350" textAnchor="middle" fontSize="9" fill="#67e8f9">= 请求入口</text>

      <rect x="330" y="260" width="145" height="100" rx="8" fill="url(#kga-ka-data)" opacity="0.9" />
      <text x="402" y="283" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Consumer</text>
      <text x="402" y="302" textAnchor="middle" fontSize="9" fill="#cffafe">API调用者</text>
      <text x="402" y="318" textAnchor="middle" fontSize="9" fill="#a5f3fc">username + credentials</text>
      <text x="402" y="334" textAnchor="middle" fontSize="9" fill="#a5f3fc">JWT/Key Auth凭证</text>
      <text x="402" y="350" textAnchor="middle" fontSize="9" fill="#67e8f9">= 谁在调用</text>

      <rect x="485" y="260" width="145" height="100" rx="8" fill="url(#kga-ka-data)" opacity="0.9" />
      <text x="557" y="283" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Plugin</text>
      <text x="557" y="302" textAnchor="middle" fontSize="9" fill="#cffafe">插件配置实例</text>
      <text x="557" y="318" textAnchor="middle" fontSize="9" fill="#a5f3fc">name + config + priority</text>
      <text x="557" y="334" textAnchor="middle" fontSize="9" fill="#a5f3fc">全局/Service/Route/Consumer</text>
      <text x="557" y="350" textAnchor="middle" fontSize="9" fill="#67e8f9">= 横切逻辑</text>

      <rect x="640" y="260" width="140" height="100" rx="8" fill="url(#kga-ka-data)" opacity="0.9" />
      <text x="710" y="283" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Upstream</text>
      <text x="710" y="302" textAnchor="middle" fontSize="9" fill="#cffafe">负载均衡池</text>
      <text x="710" y="318" textAnchor="middle" fontSize="9" fill="#a5f3fc">Targets + algorithm</text>
      <text x="710" y="334" textAnchor="middle" fontSize="9" fill="#a5f3fc">健康检查/故障转移</text>
      <text x="710" y="350" textAnchor="middle" fontSize="9" fill="#67e8f9">= 后端服务池</text>

      {/* 请求生命周期 */}
      <rect x="20" y="375" width="760" height="170" rx="10" fill="url(#kga-ka-life)" opacity="0.9" />
      <text x="400" y="398" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">请求生命周期与插件执行阶段</text>
      <text x="400" y="422" textAnchor="middle" fontSize="11" fill="#ede9fe">rewrite → 路由匹配 → access → upstream转发 → header_filter → body_filter → log</text>
      <text x="400" y="445" textAnchor="middle" fontSize="10" fill="#ddd6fe">rewrite: URI重写(路由匹配前)  access: 认证/限流/安全(转发前)  header_filter: 响应头改写</text>
      <text x="400" y="465" textAnchor="middle" fontSize="10" fill="#ddd6fe">body_filter: 响应体改写  log: 日志/指标/追踪(请求结束后)</text>
      <text x="400" y="490" textAnchor="middle" fontSize="10" fill="#c4b5fd">插件按 priority 排序执行(数值越大越先)：IP Restriction(3000) &gt; CORS(2000) &gt; JWT(1450) &gt; ACL(950) &gt; Rate Limiting(910)</text>
      <text x="400" y="515" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">Kong插件 = Nginx生命周期阶段 + Lua handler + priority排序</text>
    </svg>
  );
}
