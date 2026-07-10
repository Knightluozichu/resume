"use client";

export function SoaServiceDiscoveryDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="服务发现与中间件机制图">
      <defs>
        <linearGradient id="soa-sdisc-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="soa-sdisc-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="soa-sdisc-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="soa-sdisc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">服务发现与中间件</text>

      {/* 上部：服务发现三步流程 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">服务发现三步流程</text>

      <rect x="30" y="78" width="220" height="80" rx="8" fill="url(#soa-sdisc-1)" opacity="0.9" />
      <text x="140" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">1. 注册 Offer</text>
      <text x="140" y="120" textAnchor="middle" fontSize="9" fill="#e0f2fe">提供方启动时</text>
      <text x="140" y="136" textAnchor="middle" fontSize="9" fill="#e0f2fe">向网络发送 OfferService</text>
      <text x="140" y="150" textAnchor="middle" fontSize="8" fill="#e0f2fe">声明可用的服务实例</text>

      <path d="M252 118 L282 118" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-sdisc-arrow)" />

      <rect x="286" y="78" width="220" height="80" rx="8" fill="url(#soa-sdisc-2)" opacity="0.9" />
      <text x="396" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">2. 查找 Find</text>
      <text x="396" y="120" textAnchor="middle" fontSize="9" fill="#dcfce7">消费方启动时</text>
      <text x="396" y="136" textAnchor="middle" fontSize="9" fill="#dcfce7">发送 FindService</text>
      <text x="396" y="150" textAnchor="middle" fontSize="8" fill="#dcfce7">请求所需服务实例</text>

      <path d="M508 118 L538 118" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-sdisc-arrow)" />

      <rect x="542" y="78" width="220" height="80" rx="8" fill="url(#soa-sdisc-3)" opacity="0.9" />
      <text x="652" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">3. 订阅/调用</text>
      <text x="652" y="120" textAnchor="middle" fontSize="9" fill="#f3e8ff">匹配成功后</text>
      <text x="652" y="136" textAnchor="middle" fontSize="9" fill="#f3e8ff">建立通信通道</text>
      <text x="652" y="150" textAnchor="middle" fontSize="8" fill="#f3e8ff">订阅事件或调用方法</text>

      {/* 中部：SOME/IP-SD 协议 */}
      <text x="400" y="190" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">SOME/IP-SD 协议</text>

      <rect x="30" y="204" width="340" height="130" rx="8" fill="url(#soa-sdisc-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="200" y="226" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">SD 消息类型</text>
      <text x="50" y="246" fontSize="9" fill="#475569">- OfferService：提供方宣告服务</text>
      <text x="50" y="262" fontSize="9" fill="#475569">- StopOffer：停止提供服务</text>
      <text x="50" y="278" fontSize="9" fill="#475569">- FindService：查找服务</text>
      <text x="50" y="294" fontSize="9" fill="#475569">- SubscribeEventgroup：订阅事件组</text>
      <text x="50" y="310" fontSize="9" fill="#475569">- StopSubscribeEventgroup：取消订阅</text>
      <text x="50" y="326" fontSize="9" fill="#475569">- SubscribeEventgroupAck：订阅确认</text>

      <rect x="390" y="204" width="380" height="130" rx="8" fill="url(#soa-sdisc-2)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="580" y="226" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">SD 关键参数</text>
      <text x="410" y="246" fontSize="9" fill="#475569">- Service ID：服务唯一标识</text>
      <text x="410" y="262" fontSize="9" fill="#475569">- Instance ID：服务实例编号</text>
      <text x="410" y="278" fontSize="9" fill="#475569">- Major/Minor Version：版本号</text>
      <text x="410" y="294" fontSize="9" fill="#475569">- TTL：服务存活时间（秒）</text>
      <text x="410" y="310" fontSize="9" fill="#475569">- Endpoint：IP地址+端口</text>
      <text x="410" y="326" fontSize="9" fill="#475569">- Eventgroup ID：事件组标识</text>

      {/* 下部：中间件分层 */}
      <text x="400" y="362" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">中间件分层架构</text>

      <rect x="120" y="376" width="560" height="34" rx="6" fill="url(#soa-sdisc-3)" opacity="0.9" />
      <text x="400" y="398" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">应用层 Application（服务提供方/消费方）</text>

      <rect x="120" y="414" width="560" height="34" rx="6" fill="url(#soa-sdisc-1)" opacity="0.85" />
      <text x="400" y="436" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">SOA 中间件（SOME/IP + SD / DDS）</text>

      <rect x="120" y="452" width="560" height="34" rx="6" fill="url(#soa-sdisc-2)" opacity="0.85" />
      <text x="400" y="474" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">通信栈（TCP/UDP + 以太网驱动）</text>

      <rect x="120" y="490" width="560" height="34" rx="6" fill="#ca8a04" opacity="0.85" />
      <text x="400" y="512" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">操作系统（POSIX / AUTOSAR OS）</text>

      {/* 底部总结 */}
      <rect x="30" y="534" width="740" height="34" rx="8" fill="url(#soa-sdisc-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="556" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心：服务发现 = 动态注册 + 查找匹配 + TTL保活 + 事件组订阅</text>
    </svg>
  );
}
