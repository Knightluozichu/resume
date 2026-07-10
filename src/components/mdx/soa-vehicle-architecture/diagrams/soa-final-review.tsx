"use client";

export function SoaFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="SOA车载软件架构全书复习知识整合图">
      <defs>
        <linearGradient id="soa-fr-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="soa-fr-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="soa-fr-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="soa-fr-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="soa-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：SOA 知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="140" height="56" rx="8" fill="url(#soa-fr-1)" opacity="0.9" />
      <text x="90" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0 全景</text>
      <text x="90" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">知识图谱</text>

      <path d="M162 102 L182 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-fr-arrow)" />

      <rect x="186" y="74" width="140" height="56" rx="8" fill="url(#soa-fr-1)" opacity="0.9" />
      <text x="256" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch1-2 基础</text>
      <text x="256" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">SOA+架构演进</text>

      <path d="M328 102 L348 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-fr-arrow)" />

      <rect x="352" y="74" width="120" height="56" rx="8" fill="url(#soa-fr-2)" opacity="0.9" />
      <text x="412" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch3-4 设计</text>
      <text x="412" y="116" textAnchor="middle" fontSize="9" fill="#dcfce7">服务+协议</text>

      <path d="M474 102 L494 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-fr-arrow)" />

      <rect x="498" y="74" width="120" height="56" rx="8" fill="url(#soa-fr-3)" opacity="0.9" />
      <text x="558" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch5-6 中间件</text>
      <text x="558" y="116" textAnchor="middle" fontSize="9" fill="#f3e8ff">发现+AP</text>

      <path d="M620 102 L640 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-fr-arrow)" />

      <rect x="644" y="74" width="136" height="56" rx="8" fill="url(#soa-fr-4)" opacity="0.9" />
      <text x="712" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch7-9 实践</text>
      <text x="712" y="116" textAnchor="middle" fontSize="9" fill="#fef9c3">工具+案例+复习</text>

      {/* 四层系统视角 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四层系统视角</text>

      <rect x="20" y="176" width="180" height="150" rx="8" fill="url(#soa-fr-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="110" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">架构认知层</text>
      <text x="110" y="220" textAnchor="middle" fontSize="9" fill="#475569">SOA 三要素</text>
      <text x="110" y="236" textAnchor="middle" fontSize="9" fill="#475569">六大核心原则</text>
      <text x="110" y="252" textAnchor="middle" fontSize="9" fill="#475569">架构四阶段演进</text>
      <text x="110" y="268" textAnchor="middle" fontSize="9" fill="#475569">CP vs AP 定位</text>
      <text x="110" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">建立认知基座</text>

      <rect x="212" y="176" width="180" height="150" rx="8" fill="url(#soa-fr-2)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="302" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">服务设计层</text>
      <text x="302" y="220" textAnchor="middle" fontSize="9" fill="#475569">接口四要素</text>
      <text x="302" y="236" textAnchor="middle" fontSize="9" fill="#475569">方法/事件/字段</text>
      <text x="302" y="252" textAnchor="middle" fontSize="9" fill="#475569">IDL 契约定义</text>
      <text x="302" y="268" textAnchor="middle" fontSize="9" fill="#475569">提供方/消费方</text>
      <text x="302" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">定义交互契约</text>

      <rect x="404" y="176" width="180" height="150" rx="8" fill="url(#soa-fr-3)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="494" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">通信中间件层</text>
      <text x="494" y="220" textAnchor="middle" fontSize="9" fill="#475569">SOME/IP 协议</text>
      <text x="494" y="236" textAnchor="middle" fontSize="9" fill="#475569">DDS QoS 策略</text>
      <text x="494" y="252" textAnchor="middle" fontSize="9" fill="#475569">SD 服务发现</text>
      <text x="494" y="268" textAnchor="middle" fontSize="9" fill="#475569">ARA + FC 架构</text>
      <text x="494" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">定义通信基座</text>

      <rect x="596" y="176" width="184" height="150" rx="8" fill="url(#soa-fr-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="688" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">工程实践层</text>
      <text x="688" y="220" textAnchor="middle" fontSize="9" fill="#475569">V 模型方法论</text>
      <text x="688" y="236" textAnchor="middle" fontSize="9" fill="#475569">工具链与代码生成</text>
      <text x="688" y="252" textAnchor="middle" fontSize="9" fill="#475569">智能座舱案例</text>
      <text x="688" y="268" textAnchor="middle" fontSize="9" fill="#475569">SDV 未来趋势</text>
      <text x="688" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ca8a04">定义工程闭环</text>

      {/* 服务通信决策链 */}
      <text x="400" y="350" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">SOA 服务通信链</text>

      <rect x="20" y="364" width="120" height="56" rx="8" fill="#fffbeb" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="80" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">消费方请求</text>
      <text x="80" y="404" textAnchor="middle" fontSize="8" fill="#475569">FindService</text>

      <path d="M140 392 L160 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-fr-arrow)" />

      <rect x="164" y="364" width="120" height="56" rx="8" fill="#eff6ff" stroke="#16a34a" strokeWidth="1.5" />
      <text x="224" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">SD 匹配</text>
      <text x="224" y="404" textAnchor="middle" fontSize="8" fill="#475569">OfferService</text>

      <path d="M284 392 L304 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-fr-arrow)" />

      <rect x="308" y="364" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="368" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">Proxy 调用</text>
      <text x="368" y="404" textAnchor="middle" fontSize="8" fill="#475569">方法/事件</text>

      <path d="M428 392 L448 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-fr-arrow)" />

      <rect x="452" y="364" width="120" height="56" rx="8" fill="#fff7ed" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="512" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">SOME/IP</text>
      <text x="512" y="404" textAnchor="middle" fontSize="8" fill="#475569">序列化传输</text>

      <path d="M572 392 L592 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-fr-arrow)" />

      <rect x="596" y="364" width="120" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="656" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">Skeleton</text>
      <text x="656" y="404" textAnchor="middle" fontSize="8" fill="#475569">提供方处理</text>

      <path d="M716 392 L736 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-fr-arrow)" />

      <rect x="740" y="364" width="40" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="760" y="396" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">响应</text>

      <text x="400" y="440" textAnchor="middle" fontSize="9" fill="#64748b">逆向：提供方 → Skeleton → SOME/IP → Proxy → 消费方收到响应/事件</text>

      {/* 核心能力与演进方向 */}
      <text x="400" y="464" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心能力与演进方向</text>

      <rect x="30" y="478" width="370" height="48" rx="8" fill="url(#soa-fr-2)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="215" y="498" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">能力跃迁路径</text>
      <text x="215" y="516" textAnchor="middle" fontSize="9" fill="#475569">SOA原则 → 架构演进 → 服务设计 → 通信协议 → 中间件 → AP → 工具链</text>

      <rect x="410" y="478" width="360" height="48" rx="8" fill="url(#soa-fr-4)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="590" y="498" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">演进方向</text>
      <text x="590" y="516" textAnchor="middle" fontSize="9" fill="#475569">SDV / 车云一体 / 容器化 / AI驱动服务 / CP+AP融合</text>

      {/* 底部总结 */}
      <rect x="30" y="542" width="740" height="32" rx="8" fill="url(#soa-fr-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="562" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：SOA原则 → 架构演进 → 服务设计 → 通信 → 中间件 → AP → 工具链 → 知识闭环</text>
    </svg>
  );
}
