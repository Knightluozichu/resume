"use client";

export function KgaAdvancedTopicsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="Kong高级主题自定义插件与Service Mesh">
      <defs>
        <linearGradient id="kga-at-plugin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="kga-at-pdk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="kga-at-mesh" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="kga-at-server" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kong 高级主题：自定义插件 / Mesh / Serverless</text>

      {/* 自定义插件 */}
      <rect x="20" y="50" width="370" height="230" rx="12" fill="url(#kga-at-plugin)" opacity="0.92" />
      <text x="205" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">自定义 Lua 插件开发</text>
      <line x1="40" y1="85" x2="370" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="35" y="108" fontSize="10" fill="#bfdbfe">结构: handler.lua(执行逻辑) + schema.lua(配置模式)</text>
      <text x="35" y="128" fontSize="10" fill="#93c5fd">handler: PRIORITY + VERSION + 各阶段handler函数</text>
      <text x="35" y="148" fontSize="10" fill="#93c5fd">schema: config字段类型/默认值/校验规则</text>
      <text x="35" y="170" fontSize="10" fill="#bfdbfe">阶段handler:</text>
      <text x="35" y="188" fontSize="9" fill="#93c5fd">rewrite(路由前URI重写) / access(认证限流终止)</text>
      <text x="35" y="206" fontSize="9" fill="#93c5fd">header_filter(响应头) / body_filter(响应体) / log(日志)</text>
      <text x="35" y="228" fontSize="10" fill="#bfdbfe">注册: kong.conf plugins=bundled,my-plugin</text>
      <text x="35" y="248" fontSize="10" fill="#93c5fd">分发: Lua rock (.rockspec) / Docker镜像COPY</text>
      <text x="35" y="270" fontSize="10" fontWeight="600" fill="#60a5fa">选择原则: 只实现需要的阶段handler</text>

      {/* PDK */}
      <rect x="400" y="50" width="380" height="230" rx="12" fill="url(#kga-at-pdk)" opacity="0.92" />
      <text x="590" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">PDK 插件开发工具包</text>
      <line x1="420" y1="85" x2="760" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="415" y="108" fontSize="10" fill="#cffafe">Kong提供的Lua API, 安全操作请求/响应</text>
      <text x="415" y="130" fontSize="10" fill="#a5f3fc">kong.request.get_header/get_query/get_body</text>
      <text x="415" y="148" fontSize="10" fill="#a5f3fc">kong.service.request.set_header/get_header</text>
      <text x="415" y="166" fontSize="10" fill="#a5f3fc">kong.service.response.get_header/get_status</text>
      <text x="415" y="184" fontSize="10" fill="#a5f3fc">kong.response.set_header/exit(终止请求)</text>
      <text x="415" y="202" fontSize="10" fill="#a5f3fc">kong.client.get_ip(客户端IP)</text>
      <text x="415" y="220" fontSize="10" fill="#a5f3fc">kong.log.info/debug/err(日志)</text>
      <text x="415" y="238" fontSize="10" fill="#a5f3fc">kong.node.get_memory(节点信息)</text>
      <text x="415" y="260" fontSize="10" fill="#67e8f9">无需直接操作Nginx内部数据结构</text>
      <text x="415" y="275" fontSize="10" fontWeight="600" fill="#67e8f9">PDK = 安全的请求/响应操作API集合</text>

      {/* Kong Mesh */}
      <rect x="20" y="295" width="370" height="120" rx="10" fill="url(#kga-at-mesh)" opacity="0.9" />
      <text x="205" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Kong Mesh (基于 Kuma)</text>
      <text x="205" y="338" textAnchor="middle" fontSize="10" fill="#fef3c7">API网关(南北向) → Service Mesh(东西向) 全栈治理</text>
      <text x="205" y="358" textAnchor="middle" fontSize="10" fill="#fde68a">Sidecar代理: 每Pod一个, 拦截所有进出流量</text>
      <text x="205" y="378" textAnchor="middle" fontSize="10" fill="#fde68a">mTLS / 流量拆分 / 熔断 / 全链路追踪</text>
      <text x="205" y="400" textAnchor="middle" fontSize="10" fill="#fcd34d">TrafficPermission / TrafficRoute / CircuitBreaker</text>

      {/* Serverless */}
      <rect x="400" y="295" width="380" height="120" rx="10" fill="url(#kga-at-server)" opacity="0.9" />
      <text x="590" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Serverless 插件</text>
      <text x="590" y="338" textAnchor="middle" fontSize="10" fill="#ede9fe">AWS Lambda / Azure Functions / OpenWhisk</text>
      <text x="590" y="358" textAnchor="middle" fontSize="10" fill="#ddd6fe">Kong直接调用云函数, 不转发后端Service</text>
      <text x="590" y="378" textAnchor="middle" fontSize="10" fill="#ddd6fe">API Gateway + Function = Serverless架构</text>
      <text x="590" y="400" textAnchor="middle" fontSize="10" fill="#c4b5fd">适合: Webhook/低频API/快速原型</text>

      {/* 网关+Mesh全栈 */}
      <rect x="20" y="430" width="760" height="115" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="453" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">API网关 + Service Mesh = 全栈API治理</text>
      <text x="400" y="478" textAnchor="middle" fontSize="11" fill="#475569">Kong API网关: 治理南北向流量(外部客户端→内部服务) — 认证/限流/路由/监控</text>
      <text x="400" y="498" textAnchor="middle" fontSize="11" fill="#475569">Kong Mesh: 治理东西向流量(服务间内部调用) — mTLS/服务发现/熔断/流量拆分/全链路追踪</text>
      <text x="400" y="520" textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748b">网关(入口流量) + Mesh(内部流量) + 自定义插件(业务逻辑) + Serverless(弹性计算) = 完整微服务治理平台</text>
    </svg>
  );
}
