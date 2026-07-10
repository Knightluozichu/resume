"use client";

export function SoaSoaFundamentalsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="SOA基础概念与核心原则图">
      <defs>
        <linearGradient id="soa-sf-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="soa-sf-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="soa-sf-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="soa-sf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">SOA 基础概念与核心原则</text>

      {/* 上半：SOA 三要素 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">SOA 三要素</text>

      <rect x="40" y="78" width="220" height="70" rx="10" fill="url(#soa-sf-1)" opacity="0.9" />
      <text x="150" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">服务（Service）</text>
      <text x="150" y="122" textAnchor="middle" fontSize="10" fill="#e0f2fe">独立的功能单元</text>
      <text x="150" y="138" textAnchor="middle" fontSize="10" fill="#e0f2fe">封装业务逻辑</text>

      <rect x="290" y="78" width="220" height="70" rx="10" fill="url(#soa-sf-2)" opacity="0.9" />
      <text x="400" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">接口（Interface）</text>
      <text x="400" y="122" textAnchor="middle" fontSize="10" fill="#dcfce7">标准化的契约</text>
      <text x="400" y="138" textAnchor="middle" fontSize="10" fill="#dcfce7">描述输入输出</text>

      <rect x="540" y="78" width="220" height="70" rx="10" fill="url(#soa-sf-3)" opacity="0.9" />
      <text x="650" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">通信（Communication）</text>
      <text x="650" y="122" textAnchor="middle" fontSize="10" fill="#f3e8ff">服务间消息交换</text>
      <text x="650" y="138" textAnchor="middle" fontSize="10" fill="#f3e8ff">请求/响应与发布订阅</text>

      {/* 中间：六大原则 */}
      <text x="400" y="180" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">SOA 六大核心原则</text>

      <rect x="40" y="194" width="230" height="56" rx="8" fill="url(#soa-sf-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="155" y="216" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">松耦合 Loose Coupling</text>
      <text x="155" y="236" textAnchor="middle" fontSize="9" fill="#475569">服务间依赖最小化</text>

      <rect x="285" y="194" width="230" height="56" rx="8" fill="url(#soa-sf-2)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="216" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">契约优先 Contract First</text>
      <text x="400" y="236" textAnchor="middle" fontSize="9" fill="#475569">先定义接口再实现</text>

      <rect x="530" y="194" width="230" height="56" rx="8" fill="url(#soa-sf-3)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="645" y="216" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">可重用 Reusability</text>
      <text x="645" y="236" textAnchor="middle" fontSize="9" fill="#475569">跨场景跨平台复用</text>

      <rect x="40" y="260" width="230" height="56" rx="8" fill="url(#soa-sf-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="155" y="282" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">自治性 Autonomy</text>
      <text x="155" y="302" textAnchor="middle" fontSize="9" fill="#475569">独立部署与版本管理</text>

      <rect x="285" y="260" width="230" height="56" rx="8" fill="url(#soa-sf-2)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="282" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">无状态 Statelessness</text>
      <text x="400" y="302" textAnchor="middle" fontSize="9" fill="#475569">不保存调用方状态</text>

      <rect x="530" y="260" width="230" height="56" rx="8" fill="url(#soa-sf-3)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="645" y="282" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">可发现 Discoverability</text>
      <text x="645" y="302" textAnchor="middle" fontSize="9" fill="#475569">运行时动态注册查找</text>

      {/* 下半：传统 vs SOA 对比 */}
      <text x="400" y="344" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">传统信号通信 vs SOA 服务通信</text>

      <rect x="40" y="358" width="350" height="100" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="215" y="378" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">传统信号通信</text>
      <text x="60" y="398" fontSize="9" fill="#475569">- 发送方/接收方紧耦合，硬编码</text>
      <text x="60" y="414" fontSize="9" fill="#475569">- 信号级通信，1对1/1对多广播</text>
      <text x="60" y="430" fontSize="9" fill="#475569">- 静态配置，变更需全链路重配</text>
      <text x="60" y="446" fontSize="9" fill="#475569">- 适合小型固定 ECU 网络</text>

      <rect x="410" y="358" width="350" height="100" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="585" y="378" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">SOA 服务通信</text>
      <text x="430" y="398" fontSize="9" fill="#475569">- 提供方/消费方松耦合，接口解耦</text>
      <text x="430" y="414" fontSize="9" fill="#475569">- 服务级通信，1对1/1对多/请求响应</text>
      <text x="430" y="430" fontSize="9" fill="#475569">- 动态发现，运行时灵活编排</text>
      <text x="430" y="446" fontSize="9" fill="#475569">- 适合大型动态域控/中央计算</text>

      {/* 底部：SOA vs OOP 对比 */}
      <rect x="40" y="478" width="720" height="42" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="496" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">SOA vs OOP</text>
      <text x="400" y="512" textAnchor="middle" fontSize="9" fill="#475569">OOP：对象封装数据+行为，进程内调用 / SOA：服务封装能力，跨进程跨ECU通过网络通信</text>

      {/* 底部核心总结 */}
      <rect x="40" y="534" width="720" height="32" rx="8" fill="url(#soa-sf-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="554" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">SOA = 服务 + 接口契约 + 动态发现 + 松耦合通信</text>
    </svg>
  );
}
