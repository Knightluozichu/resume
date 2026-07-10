"use client";

export function AvcFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="AUTOSAR全书复习知识整合与系统闭环图">
      <defs>
        <linearGradient id="avc-fr-found" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="avc-fr-bsw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="avc-fr-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="avc-fr-safe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="avc-fr-prac" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="avc-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：AUTOSAR 知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="140" height="56" rx="8" fill="url(#avc-fr-found)" opacity="0.9" />
      <text x="90" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0 基础</text>
      <text x="90" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">全景图</text>

      <path d="M162 102 L182 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-fr-arrow)" />

      <rect x="186" y="74" width="140" height="56" rx="8" fill="url(#avc-fr-found)" opacity="0.9" />
      <text x="256" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch1-2 架构</text>
      <text x="256" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">概览+RTE</text>

      <path d="M328 102 L348 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-fr-arrow)" />

      <rect x="352" y="74" width="120" height="56" rx="8" fill="url(#avc-fr-bsw)" opacity="0.9" />
      <text x="412" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch3-4 BSW</text>
      <text x="412" y="116" textAnchor="middle" fontSize="9" fill="#dcfce7">栈+MCAL</text>

      <path d="M474 102 L494 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-fr-arrow)" />

      <rect x="498" y="74" width="120" height="56" rx="8" fill="url(#avc-fr-app)" opacity="0.9" />
      <text x="558" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch5-6 应用</text>
      <text x="558" y="116" textAnchor="middle" fontSize="9" fill="#f3e8ff">SWC+通信</text>

      <path d="M620 102 L640 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-fr-arrow)" />

      <rect x="644" y="74" width="116" height="56" rx="8" fill="url(#avc-fr-safe)" opacity="0.9" />
      <text x="702" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch7-9 安全</text>
      <text x="702" y="116" textAnchor="middle" fontSize="9" fill="#fef9c3">诊断+工具+整合</text>

      {/* 四层系统视角 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四层系统视角</text>

      <rect x="20" y="176" width="180" height="150" rx="8" fill="url(#avc-fr-found)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="110" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">架构认知层</text>
      <text x="110" y="220" textAnchor="middle" fontSize="9" fill="#475569">AUTOSAR 三层架构</text>
      <text x="110" y="236" textAnchor="middle" fontSize="9" fill="#475569">V 模型方法论</text>
      <text x="110" y="252" textAnchor="middle" fontSize="9" fill="#475569">RTE 运行时环境</text>
      <text x="110" y="268" textAnchor="middle" fontSize="9" fill="#475569">SWC 组件模型</text>
      <text x="110" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">建立架构认知</text>

      <rect x="212" y="176" width="180" height="150" rx="8" fill="url(#avc-fr-bsw)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="302" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">基础软件层</text>
      <text x="302" y="220" textAnchor="middle" fontSize="9" fill="#475569">BSW 三层子架构</text>
      <text x="302" y="236" textAnchor="middle" fontSize="9" fill="#475569">服务层 OS/NvM/Com</text>
      <text x="302" y="252" textAnchor="middle" fontSize="9" fill="#475569">ECU 抽象层</text>
      <text x="302" y="268" textAnchor="middle" fontSize="9" fill="#475569">MCAL 驱动模块</text>
      <text x="302" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">定义软件基座</text>

      <rect x="404" y="176" width="180" height="150" rx="8" fill="url(#avc-fr-app)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="494" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">应用通信层</text>
      <text x="494" y="220" textAnchor="middle" fontSize="9" fill="#475569">SWC 端口与接口</text>
      <text x="494" y="236" textAnchor="middle" fontSize="9" fill="#475569">Runnable 调度</text>
      <text x="494" y="252" textAnchor="middle" fontSize="9" fill="#475569">通信栈五层架构</text>
      <text x="494" y="268" textAnchor="middle" fontSize="9" fill="#475569">信号路由 I-PDU</text>
      <text x="494" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">定义交互逻辑</text>

      <rect x="596" y="176" width="184" height="150" rx="8" fill="url(#avc-fr-safe)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="688" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">安全实践层</text>
      <text x="688" y="220" textAnchor="middle" fontSize="9" fill="#475569">UDS 诊断协议</text>
      <text x="688" y="236" textAnchor="middle" fontSize="9" fill="#475569">ISO 26262 ASIL</text>
      <text x="688" y="252" textAnchor="middle" fontSize="9" fill="#475569">工具链与配置</text>
      <text x="688" y="268" textAnchor="middle" fontSize="9" fill="#475569">MIL/SIL/HIL 验证</text>
      <text x="688" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ca8a04">定义安全保障</text>

      {/* 数据流决策链 */}
      <text x="400" y="350" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">信号通信决策链</text>

      <rect x="20" y="364" width="110" height="56" rx="8" fill="#fffbeb" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="75" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">SWC 信号</text>
      <text x="75" y="404" textAnchor="middle" fontSize="8" fill="#475569">应用层发出</text>

      <path d="M130 392 L148 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-fr-arrow)" />

      <rect x="152" y="364" width="110" height="56" rx="8" fill="#eff6ff" stroke="#16a34a" strokeWidth="1.5" />
      <text x="207" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">Com 打包</text>
      <text x="207" y="404" textAnchor="middle" fontSize="8" fill="#475569">信号转 I-PDU</text>

      <path d="M262 392 L280 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-fr-arrow)" />

      <rect x="284" y="364" width="110" height="56" rx="8" fill="#f0fdf4" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="339" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">PduR 路由</text>
      <text x="339" y="404" textAnchor="middle" fontSize="8" fill="#475569">PDU 网关</text>

      <path d="M394 392 L412 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-fr-arrow)" />

      <rect x="416" y="364" width="110" height="56" rx="8" fill="#fff7ed" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="471" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">CanIf</text>
      <text x="471" y="404" textAnchor="middle" fontSize="8" fill="#475569">接口抽象</text>

      <path d="M526 392 L544 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-fr-arrow)" />

      <rect x="548" y="364" width="110" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="603" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">Can 驱动</text>
      <text x="603" y="404" textAnchor="middle" fontSize="8" fill="#475569">MCAL 发送</text>

      <path d="M658 392 L676 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-fr-arrow)" />

      <rect x="680" y="364" width="100" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="730" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#475569">CAN 总线</text>
      <text x="730" y="404" textAnchor="middle" fontSize="8" fill="#64748b">物理传输</text>

      <path d="M730 420 L730 430 L75 430 L75 420" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,3" />
      <text x="400" y="446" textAnchor="middle" fontSize="9" fill="#64748b">接收逆向：CAN 总线 → Can 驱动 → CanIf → PduR → Com 解包 → RTE → SWC</text>

      {/* 核心能力与演进方向 */}
      <text x="400" y="470" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心能力与演进方向</text>

      <rect x="30" y="484" width="370" height="48" rx="8" fill="url(#avc-fr-bsw)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="215" y="504" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">能力跃迁路径</text>
      <text x="215" y="522" textAnchor="middle" fontSize="9" fill="#475569">架构 → RTE → BSW → MCAL → SWC → 通信 → 诊断安全 → 工具链</text>

      <rect x="410" y="484" width="360" height="48" rx="8" fill="url(#avc-fr-safe)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="590" y="504" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">演进方向</text>
      <text x="590" y="522" textAnchor="middle" fontSize="9" fill="#475569">Adaptive AUTOSAR / SOA / 以太网 / 域控制器 / AP+CP 融合</text>

      {/* 底部总结 */}
      <rect x="30" y="542" width="740" height="32" rx="8" fill="url(#avc-fr-found)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="562" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：架构 → RTE → BSW → MCAL → SWC → 通信 → 诊断安全 → 工具链 → 知识闭环</text>
    </svg>
  );
}
