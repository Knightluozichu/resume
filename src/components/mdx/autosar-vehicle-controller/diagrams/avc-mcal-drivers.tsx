"use client";

export function AvcMcalDriversDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="MCAL微控制器抽象层与驱动模块图">
      <defs>
        <linearGradient id="avc-md-mcal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="avc-md-hw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <marker id="avc-md-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">MCAL 微控制器抽象层与驱动</text>

      {/* 上层接口 */}
      <rect x="40" y="56" width="720" height="44" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">ECU 抽象层调用接口（IoHwAb / CanIf / AdcIf ...）</text>

      <path d="M400 100 L400 108" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-md-arrow)" />

      {/* MCAL 模块网格 */}
      <rect x="40" y="112" width="720" height="320" rx="10" fill="url(#avc-md-mcal)" opacity="0.06" stroke="#ca8a04" strokeWidth="2" />
      <text x="400" y="136" textAnchor="middle" fontSize="14" fontWeight="700" fill="#a16207">MCAL 模块</text>

      {/* 第一行 */}
      <rect x="60" y="148" width="140" height="56" rx="8" fill="url(#avc-md-mcal)" opacity="0.85" />
      <text x="130" y="172" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">DIO</text>
      <text x="130" y="190" textAnchor="middle" fontSize="9" fill="#fef9c3">数字 I/O 驱动</text>

      <rect x="215" y="148" width="140" height="56" rx="8" fill="url(#avc-md-mcal)" opacity="0.85" />
      <text x="285" y="172" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">ADC</text>
      <text x="285" y="190" textAnchor="middle" fontSize="9" fill="#fef9c3">模数转换驱动</text>

      <rect x="370" y="148" width="140" height="56" rx="8" fill="url(#avc-md-mcal)" opacity="0.85" />
      <text x="440" y="172" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">PWM</text>
      <text x="440" y="190" textAnchor="middle" fontSize="9" fill="#fef9c3">脉宽调制驱动</text>

      <rect x="525" y="148" width="140" height="56" rx="8" fill="url(#avc-md-mcal)" opacity="0.85" />
      <text x="595" y="172" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">GPT</text>
      <text x="595" y="190" textAnchor="middle" fontSize="9" fill="#fef9c3">通用定时器</text>

      {/* 第二行 */}
      <rect x="60" y="214" width="140" height="56" rx="8" fill="url(#avc-md-mcal)" opacity="0.85" />
      <text x="130" y="238" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">CAN</text>
      <text x="130" y="256" textAnchor="middle" fontSize="9" fill="#fef9c3">CAN 控制器驱动</text>

      <rect x="215" y="214" width="140" height="56" rx="8" fill="url(#avc-md-mcal)" opacity="0.85" />
      <text x="285" y="238" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">SPI</text>
      <text x="285" y="256" textAnchor="middle" fontSize="9" fill="#fef9c3">SPI 总线驱动</text>

      <rect x="370" y="214" width="140" height="56" rx="8" fill="url(#avc-md-mcal)" opacity="0.85" />
      <text x="440" y="238" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">UART</text>
      <text x="440" y="256" textAnchor="middle" fontSize="9" fill="#fef9c3">串口通信驱动</text>

      <rect x="525" y="214" width="140" height="56" rx="8" fill="url(#avc-md-mcal)" opacity="0.85" />
      <text x="595" y="238" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Fls</text>
      <text x="595" y="256" textAnchor="middle" fontSize="9" fill="#fef9c3">Flash 驱动</text>

      {/* 第三行 */}
      <rect x="60" y="280" width="140" height="56" rx="8" fill="url(#avc-md-mcal)" opacity="0.85" />
      <text x="130" y="304" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Eep</text>
      <text x="130" y="322" textAnchor="middle" fontSize="9" fill="#fef9c3">EEPROM 驱动</text>

      <rect x="215" y="280" width="140" height="56" rx="8" fill="url(#avc-md-mcal)" opacity="0.85" />
      <text x="285" y="304" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">ICU</text>
      <text x="285" y="322" textAnchor="middle" fontSize="9" fill="#fef9c3">输入捕获单元</text>

      <rect x="370" y="280" width="140" height="56" rx="8" fill="url(#avc-md-mcal)" opacity="0.85" />
      <text x="440" y="304" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">OCU</text>
      <text x="440" y="322" textAnchor="middle" fontSize="9" fill="#fef9c3">输出比较单元</text>

      <rect x="525" y="280" width="140" height="56" rx="8" fill="url(#avc-md-mcal)" opacity="0.85" />
      <text x="595" y="304" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Wdg</text>
      <text x="595" y="322" textAnchor="middle" fontSize="9" fill="#fef9c3">看门狗驱动</text>

      {/* 底部说明 */}
      <rect x="60" y="346" width="660" height="30" rx="8" fill="url(#avc-md-mcal)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="400" y="366" textAnchor="middle" fontSize="10" fill="#a16207">每个模块封装特定片上外设的寄存器操作，为上层提供标准化 API</text>

      <path d="M400 432 L400 440" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-md-arrow)" />

      {/* 硬件寄存器 */}
      <rect x="40" y="444" width="720" height="56" rx="10" fill="url(#avc-md-hw)" opacity="0.85" />
      <text x="400" y="470" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">微控制器寄存器层 Hardware Registers</text>
      <text x="400" y="490" textAnchor="middle" fontSize="10" fill="#e2e8f0">GPIO / ADC / Timer / CAN / SPI / UART / Flash / EEPROM</text>

      {/* 驱动模式标注 */}
      <rect x="40" y="510" width="340" height="36" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="210" y="532" textAnchor="middle" fontSize="10" fill="#15803d">轮询模式 Polling：主循环中主动读取</text>

      <rect x="420" y="510" width="340" height="36" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="590" y="532" textAnchor="middle" fontSize="10" fill="#0369a1">中断模式 Interrupt：事件触发回调通知</text>
    </svg>
  );
}
