"use client";

export function SoaCommunicationProtocolsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="SOME/IP与DDS通信协议对比图">
      <defs>
        <linearGradient id="soa-cp-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="soa-cp-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="soa-cp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">通信协议：SOME/IP vs DDS</text>

      {/* 左：SOME/IP */}
      <rect x="30" y="58" width="360" height="260" rx="10" fill="url(#soa-cp-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="210" y="82" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0369a1">SOME/IP</text>
      <text x="210" y="100" textAnchor="middle" fontSize="10" fill="#475569">Scalable service-Oriented MiddlewarE over IP</text>

      <text x="50" y="124" fontSize="10" fontWeight="600" fill="#0369a1">特点</text>
      <text x="50" y="140" fontSize="9" fill="#475569">- AUTOSAR标准，车载专用中间件</text>
      <text x="50" y="156" fontSize="9" fill="#475569">- 基于UDP/TCP，运行在以太网</text>
      <text x="50" y="172" fontSize="9" fill="#475569">- 支持RR请求/响应 + 通知PubSub</text>

      <text x="50" y="196" fontSize="10" fontWeight="600" fill="#0369a1">服务发现 (SD)</text>
      <text x="50" y="212" fontSize="9" fill="#475569">- OfferService / FindService</text>
      <text x="50" y="228" fontSize="9" fill="#475569">- 组播UDP 224.224.224.245:30490</text>
      <text x="50" y="244" fontSize="9" fill="#475569">- 提供方周期性Offer服务实例</text>

      <text x="50" y="268" fontSize="10" fontWeight="600" fill="#0369a1">序列化</text>
      <text x="50" y="284" fontSize="9" fill="#475569">- 结构化数据二进制编码</text>
      <text x="50" y="300" fontSize="9" fill="#475569">- Message ID = Service ID + Method ID</text>

      {/* 右：DDS */}
      <rect x="410" y="58" width="360" height="260" rx="10" fill="url(#soa-cp-2)" opacity="0.08" stroke="#16a34a" strokeWidth="2" />
      <text x="590" y="82" textAnchor="middle" fontSize="14" fontWeight="700" fill="#15803d">DDS</text>
      <text x="590" y="100" textAnchor="middle" fontSize="10" fill="#475569">Data Distribution Service</text>

      <text x="430" y="124" fontSize="10" fontWeight="600" fill="#15803d">特点</text>
      <text x="430" y="140" fontSize="9" fill="#475569">- OMG标准，分布式发布订阅中间件</text>
      <text x="430" y="156" fontSize="9" fill="#475569">- 基于UDP多播，去中心化</text>
      <text x="430" y="172" fontSize="9" fill="#475569">- 全局数据空间（GDS）模型</text>

      <text x="430" y="196" fontSize="10" fontWeight="600" fill="#15803d">QoS 策略</text>
      <text x="430" y="212" fontSize="9" fill="#475569">- Reliability / Durability / History</text>
      <text x="430" y="228" fontSize="9" fill="#475569">- Deadline / Latency / Liveliness</text>
      <text x="430" y="244" fontSize="9" fill="#475569">- 30+种QoS可配置</text>

      <text x="430" y="268" fontSize="10" fontWeight="600" fill="#15803d">DCPS 模型</text>
      <text x="430" y="284" fontSize="9" fill="#475569">- Domain / Topic / Publisher / Subscriber</text>
      <text x="430" y="300" fontSize="9" fill="#475569">- DataWriter / DataReader</text>

      {/* 对比表 */}
      <text x="400" y="346" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心对比</text>

      <rect x="30" y="360" width="740" height="150" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="30" y1="384" x2="770" y2="384" stroke="#cbd5e1" strokeWidth="1" />

      <text x="50" y="378" fontSize="9" fontWeight="700" fill="#334155">维度</text>
      <text x="230" y="378" fontSize="9" fontWeight="700" fill="#0369a1">SOME/IP</text>
      <text x="530" y="378" fontSize="9" fontWeight="700" fill="#15803d">DDS</text>

      <text x="50" y="400" fontSize="9" fill="#475569">通信模式</text>
      <text x="230" y="400" fontSize="9" fill="#475569">RR + PubSub 请求响应为主</text>
      <text x="530" y="400" fontSize="9" fill="#475569">纯 PubSub 数据中心</text>

      <text x="50" y="418" fontSize="9" fill="#475569">服务发现</text>
      <text x="230" y="418" fontSize="9" fill="#475569">集中式 SD 协议</text>
      <text x="530" y="418" fontSize="9" fill="#475569">去中心化自动发现</text>

      <text x="50" y="436" fontSize="9" fill="#475569">QoS支持</text>
      <text x="230" y="436" fontSize="9" fill="#475569">基础QoS</text>
      <text x="530" y="436" fontSize="9" fill="#475569">丰富QoS（30+种）</text>

      <text x="50" y="454" fontSize="9" fill="#475569">生态</text>
      <text x="230" y="454" fontSize="9" fill="#475569">AUTOSAR AP原生</text>
      <text x="530" y="454" fontSize="9" fill="#475569">ROS 2 / 工控</text>

      <text x="50" y="472" fontSize="9" fill="#475569">适用场景</text>
      <text x="230" y="472" fontSize="9" fill="#475569">车载SOA服务通信</text>
      <text x="530" y="472" fontSize="9" fill="#475569">高可靠数据分发</text>

      <text x="50" y="492" fontSize="9" fill="#475569">资源开销</text>
      <text x="230" y="492" fontSize="9" fill="#475569">较轻量</text>
      <text x="530" y="492" fontSize="9" fill="#475569">较重（QoS协商）</text>

      {/* 底部总结 */}
      <rect x="30" y="528" width="740" height="40" rx="8" fill="url(#soa-cp-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="546" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">选型原则</text>
      <text x="400" y="562" textAnchor="middle" fontSize="9" fill="#475569">AUTOSAR生态选SOME/IP / 高可靠实时数据分发选DDS / 车载以SOME/IP为主流</text>
    </svg>
  );
}
