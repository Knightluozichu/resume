"use client";

export function AvcBswStackDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="AUTOSAR基础软件层BSW分层架构图">
      <defs>
        <linearGradient id="avc-bs-svc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="avc-bs-ecu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="avc-bs-mcal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="avc-bs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">基础软件层 BSW 分层架构</text>

      {/* 服务层 */}
      <rect x="40" y="60" width="720" height="150" rx="10" fill="url(#avc-bs-svc)" opacity="0.08" stroke="#16a34a" strokeWidth="2" />
      <text x="400" y="84" textAnchor="middle" fontSize="14" fontWeight="700" fill="#15803d">服务层 Services Layer</text>

      <rect x="60" y="96" width="160" height="48" rx="8" fill="url(#avc-bs-svc)" opacity="0.8" />
      <text x="140" y="118" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">OS 操作系统</text>
      <text x="140" y="134" textAnchor="middle" fontSize="9" fill="#dcfce7">任务调度 / 中断 / 资源</text>

      <rect x="240" y="96" width="160" height="48" rx="8" fill="url(#avc-bs-svc)" opacity="0.8" />
      <text x="320" y="118" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">内存服务</text>
      <text x="320" y="134" textAnchor="middle" fontSize="9" fill="#dcfce7">NvM / MemIf / Ea</text>

      <rect x="420" y="96" width="160" height="48" rx="8" fill="url(#avc-bs-svc)" opacity="0.8" />
      <text x="500" y="118" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">通信服务</text>
      <text x="500" y="134" textAnchor="middle" fontSize="9" fill="#dcfce7">Com / PduR / CanTp</text>

      <rect x="600" y="96" width="140" height="48" rx="8" fill="url(#avc-bs-svc)" opacity="0.8" />
      <text x="670" y="118" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">诊断服务</text>
      <text x="670" y="134" textAnchor="middle" fontSize="9" fill="#dcfce7">Dcm / Dem</text>

      <rect x="60" y="152" width="220" height="48" rx="8" fill="url(#avc-bs-svc)" opacity="0.7" />
      <text x="170" y="174" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">ECU 状态管理 EcuM</text>
      <text x="170" y="190" textAnchor="middle" fontSize="9" fill="#dcfce7">启动 / 关闭 / 睡眠</text>

      <rect x="300" y="152" width="220" height="48" rx="8" fill="url(#avc-bs-svc)" opacity="0.7" />
      <text x="410" y="174" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">模式管理 BswM</text>
      <text x="410" y="190" textAnchor="middle" fontSize="9" fill="#dcfce7">模式仲裁 / 规则执行</text>

      <rect x="540" y="152" width="200" height="48" rx="8" fill="url(#avc-bs-svc)" opacity="0.7" />
      <text x="640" y="174" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">看门狗 WdgM</text>
      <text x="640" y="190" textAnchor="middle" fontSize="9" fill="#dcfce7">程序流监控 / 存活检查</text>

      <path d="M400 210 L400 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-bs-arrow)" />

      {/* ECU抽象层 */}
      <rect x="40" y="224" width="720" height="130" rx="10" fill="url(#avc-bs-ecu)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="248" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0369a1">ECU 抽象层 ECU Abstraction Layer</text>

      <rect x="60" y="260" width="160" height="44" rx="8" fill="url(#avc-bs-ecu)" opacity="0.8" />
      <text x="140" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">I/O 抽象</text>
      <text x="140" y="296" textAnchor="middle" fontSize="9" fill="#e0f2fe">IoHwAb / AdcIf</text>

      <rect x="240" y="260" width="160" height="44" rx="8" fill="url(#avc-bs-ecu)" opacity="0.8" />
      <text x="320" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">存储抽象</text>
      <text x="320" y="296" textAnchor="middle" fontSize="9" fill="#e0f2fe">Fee / Fls / Eep</text>

      <rect x="420" y="260" width="160" height="44" rx="8" fill="url(#avc-bs-ecu)" opacity="0.8" />
      <text x="500" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">通信抽象</text>
      <text x="500" y="296" textAnchor="middle" fontSize="9" fill="#e0f2fe">CanIf / FrIf / EthIf</text>

      <rect x="600" y="260" width="140" height="44" rx="8" fill="url(#avc-bs-ecu)" opacity="0.8" />
      <text x="670" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">存储器抽象</text>
      <text x="670" y="296" textAnchor="middle" fontSize="9" fill="#e0f2fe">RamTst / Crc</text>

      <rect x="60" y="314" width="680" height="30" rx="8" fill="url(#avc-bs-ecu)" opacity="0.06" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="334" textAnchor="middle" fontSize="10" fill="#0369a1">屏蔽 ECU 硬件外设差异，为上层提供统一接口</text>

      <path d="M400 354 L400 364" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-bs-arrow)" />

      {/* MCAL */}
      <rect x="40" y="368" width="720" height="120" rx="10" fill="url(#avc-bs-mcal)" opacity="0.08" stroke="#ca8a04" strokeWidth="2" />
      <text x="400" y="392" textAnchor="middle" fontSize="14" fontWeight="700" fill="#a16207">微控制器抽象层 MCAL</text>

      <rect x="60" y="404" width="120" height="36" rx="8" fill="url(#avc-bs-mcal)" opacity="0.8" />
      <text x="120" y="427" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">DIO</text>

      <rect x="190" y="404" width="120" height="36" rx="8" fill="url(#avc-bs-mcal)" opacity="0.8" />
      <text x="250" y="427" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">ADC</text>

      <rect x="320" y="404" width="120" height="36" rx="8" fill="url(#avc-bs-mcal)" opacity="0.8" />
      <text x="380" y="427" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">PWM</text>

      <rect x="450" y="404" width="120" height="36" rx="8" fill="url(#avc-bs-mcal)" opacity="0.8" />
      <text x="510" y="427" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">CAN</text>

      <rect x="580" y="404" width="140" height="36" rx="8" fill="url(#avc-bs-mcal)" opacity="0.8" />
      <text x="650" y="427" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">UART / SPI</text>

      <rect x="60" y="448" width="680" height="30" rx="8" fill="url(#avc-bs-mcal)" opacity="0.06" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="400" y="468" textAnchor="middle" fontSize="10" fill="#a16207">直接访问微控制器寄存器，封装片上外设驱动</text>

      {/* 硬件 */}
      <rect x="40" y="500" width="720" height="44" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
      <text x="400" y="526" textAnchor="middle" fontSize="13" fontWeight="700" fill="#475569">微控制器 Microcontroller</text>

      {/* 侧面复杂度驱动 */}
      <rect x="770" y="60" width="20" height="510" rx="4" fill="url(#avc-bs-mcal)" opacity="0.3" />
      <text x="780" y="320" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207" transform="rotate(90 780 320)">复杂度驱动 Complex Driver</text>
    </svg>
  );
}
