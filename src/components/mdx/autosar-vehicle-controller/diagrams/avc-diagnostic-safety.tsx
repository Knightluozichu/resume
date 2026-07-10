"use client";

export function AvcDiagnosticSafetyDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="AUTOSAR诊断与功能安全架构图">
      <defs>
        <linearGradient id="avc-ds-diag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="avc-ds-safe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="avc-ds-bsw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="avc-ds-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">诊断与功能安全</text>

      {/* 左侧：诊断栈 */}
      <text x="200" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#a16207">UDS 诊断栈</text>

      <rect x="40" y="72" width="360" height="260" rx="10" fill="url(#avc-ds-diag)" opacity="0.06" stroke="#ca8a04" strokeWidth="2" />

      <rect x="60" y="86" width="320" height="36" rx="8" fill="url(#avc-ds-diag)" opacity="0.85" />
      <text x="220" y="109" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">Dcm 诊断通信管理</text>

      <rect x="60" y="130" width="320" height="36" rx="8" fill="url(#avc-ds-diag)" opacity="0.75" />
      <text x="220" y="153" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">Dem 诊断事件管理</text>

      <rect x="60" y="174" width="320" height="36" rx="8" fill="url(#avc-ds-diag)" opacity="0.65" />
      <text x="220" y="197" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">Fim 功能抑制管理</text>

      <rect x="60" y="218" width="150" height="36" rx="8" fill="url(#avc-ds-diag)" opacity="0.55" />
      <text x="135" y="241" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">CanTp 传输层</text>

      <rect x="230" y="218" width="150" height="36" rx="8" fill="url(#avc-ds-diag)" opacity="0.55" />
      <text x="305" y="241" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">DoIP 诊断</text>

      <rect x="60" y="262" width="320" height="56" rx="8" fill="#fff" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="220" y="284" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">UDS 服务（ISO 14229）</text>
      <text x="220" y="302" textAnchor="middle" fontSize="9" fill="#475569">10 诊断会话 / 22 读数据 / 2E 写数据 / 31 例程控制 / 19 ECU复位</text>

      {/* 右侧：功能安全 */}
      <text x="600" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#b91c1c">ISO 26262 功能安全</text>

      <rect x="420" y="72" width="360" height="260" rx="10" fill="url(#avc-ds-safe)" opacity="0.06" stroke="#dc2626" strokeWidth="2" />

      <rect x="440" y="86" width="320" height="36" rx="8" fill="url(#avc-ds-safe)" opacity="0.85" />
      <text x="600" y="109" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">ASIL 安全等级（A/B/C/D）</text>

      <rect x="440" y="130" width="150" height="36" rx="8" fill="url(#avc-ds-safe)" opacity="0.75" />
      <text x="515" y="153" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">QM 质量管理</text>

      <rect x="610" y="130" width="150" height="36" rx="8" fill="url(#avc-ds-safe)" opacity="0.75" />
      <text x="685" y="153" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">ASIL D 最高</text>

      <rect x="440" y="174" width="320" height="36" rx="8" fill="url(#avc-ds-safe)" opacity="0.65" />
      <text x="600" y="197" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">安全机制：冗余 / 监控 / 降级</text>

      <rect x="440" y="218" width="320" height="36" rx="8" fill="url(#avc-ds-safe)" opacity="0.55" />
      <text x="600" y="241" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">WdgM 程序流监控</text>

      <rect x="440" y="262" width="320" height="56" rx="8" fill="#fff" stroke="#dc2626" strokeWidth="1.5" />
      <text x="600" y="284" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">安全生命周期</text>
      <text x="600" y="302" textAnchor="middle" fontSize="9" fill="#475569">HARA 危害分析 → 安全目标 → ASIL → 安全机制 → 验证确认</text>

      {/* 底部：诊断与安全的协同 */}
      <text x="400" y="352" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">诊断与安全协同机制</text>

      <rect x="40" y="364" width="720" height="130" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />

      <rect x="60" y="378" width="200" height="48" rx="8" fill="url(#avc-ds-diag)" opacity="0.15" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="160" y="400" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">DTC 诊断故障码</text>
      <text x="160" y="416" textAnchor="middle" fontSize="8" fill="#475569">故障检测与记录</text>

      <path d="M260 402 L280 402" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-ds-arrow)" />

      <rect x="284" y="378" width="200" height="48" rx="8" fill="url(#avc-ds-safe)" opacity="0.15" stroke="#dc2626" strokeWidth="1.5" />
      <text x="384" y="400" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">安全状态切换</text>
      <text x="384" y="416" textAnchor="middle" fontSize="8" fill="#475569">降级运行 / 安全关断</text>

      <path d="M484 402 L504 402" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-ds-arrow)" />

      <rect x="508" y="378" width="230" height="48" rx="8" fill="url(#avc-ds-bsw)" opacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
      <text x="623" y="400" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">Fim 功能抑制</text>
      <text x="623" y="416" textAnchor="middle" fontSize="8" fill="#475569">屏蔽非安全功能</text>

      <rect x="60" y="436" width="680" height="48" rx="8" fill="#fff" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="458" textAnchor="middle" fontSize="10" fill="#475569">故障发生 → Dem 记录 DTC → Fim 评估抑制等级 → 安全机制触发降级 → Dcm 上报诊断信息</text>
      <text x="400" y="474" textAnchor="middle" fontSize="9" fill="#64748b">确保故障状态下系统进入安全状态，避免灾难性后果</text>

      {/* 底部总结 */}
      <rect x="40" y="510" width="720" height="50" rx="8" fill="url(#avc-ds-safe)" opacity="0.06" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="532" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">功能安全核心：识别危害 → 分配 ASIL → 实施安全机制 → 验证有效性</text>
      <text x="400" y="550" textAnchor="middle" fontSize="10" fill="#475569">诊断核心：UDS 协议 → DTC 管理 → 快照记录 → 在线标定与刷写</text>
    </svg>
  );
}
