"use client";

export function AvcToolchainPracticeDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="AUTOSAR工具链与开发实践流程图">
      <defs>
        <linearGradient id="avc-tp-design" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="avc-tp-config" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="avc-tp-gen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="avc-tp-build" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="avc-tp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">AUTOSAR 工具链与开发实践</text>

      {/* 开发流程：四阶段 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">开发流程四阶段</text>

      {/* 阶段1：系统设计 */}
      <rect x="40" y="76" width="160" height="80" rx="10" fill="url(#avc-tp-design)" opacity="0.85" />
      <text x="120" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">1. 系统设计</text>
      <text x="120" y="118" textAnchor="middle" fontSize="9" fill="#e0f2fe">System Description</text>
      <text x="120" y="134" textAnchor="middle" fontSize="9" fill="#e0f2fe">系统配置描述</text>
      <text x="120" y="148" textAnchor="middle" fontSize="9" fill="#e0f2fe">ECU 映射</text>

      <path d="M200 116 L220 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-tp-arrow)" />

      {/* 阶段2：配置 */}
      <rect x="224" y="76" width="160" height="80" rx="10" fill="url(#avc-tp-config)" opacity="0.85" />
      <text x="304" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">2. ECU 配置</text>
      <text x="304" y="118" textAnchor="middle" fontSize="9" fill="#f3e8ff">ECU Config</text>
      <text x="304" y="134" textAnchor="middle" fontSize="9" fill="#f3e8ff">BSW 模块参数</text>
      <text x="304" y="148" textAnchor="middle" fontSize="9" fill="#f3e8ff">RTE 配置</text>

      <path d="M384 116 L404 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-tp-arrow)" />

      {/* 阶段3：代码生成 */}
      <rect x="408" y="76" width="160" height="80" rx="10" fill="url(#avc-tp-gen)" opacity="0.85" />
      <text x="488" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">3. 代码生成</text>
      <text x="488" y="118" textAnchor="middle" fontSize="9" fill="#dcfce7">Code Generation</text>
      <text x="488" y="134" textAnchor="middle" fontSize="9" fill="#dcfce7">RTE 代码</text>
      <text x="488" y="148" textAnchor="middle" fontSize="9" fill="#dcfce7">BSW 配置代码</text>

      <path d="M568 116 L588 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-tp-arrow)" />

      {/* 阶段4：编译集成 */}
      <rect x="592" y="76" width="168" height="80" rx="10" fill="url(#avc-tp-build)" opacity="0.85" />
      <text x="676" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">4. 编译集成</text>
      <text x="676" y="118" textAnchor="middle" fontSize="9" fill="#fef9c3">Build &amp; Flash</text>
      <text x="676" y="134" textAnchor="middle" fontSize="9" fill="#fef9c3">交叉编译</text>
      <text x="676" y="148" textAnchor="middle" fontSize="9" fill="#fef9c3">链接 &amp; 刷写</text>

      {/* 工具链全景 */}
      <text x="400" y="180" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">工具链全景</text>

      <rect x="40" y="194" width="720" height="130" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />

      <rect x="60" y="208" width="140" height="48" rx="8" fill="url(#avc-tp-design)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="130" y="230" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">System Desk</text>
      <text x="130" y="246" textAnchor="middle" fontSize="8" fill="#475569">系统设计工具</text>

      <rect x="215" y="208" width="140" height="48" rx="8" fill="url(#avc-tp-config)" opacity="0.15" stroke="#9333ea" strokeWidth="1.5" />
      <text x="285" y="230" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">DaVinci Config</text>
      <text x="285" y="246" textAnchor="middle" fontSize="8" fill="#475569">配置工具</text>

      <rect x="370" y="208" width="140" height="48" rx="8" fill="url(#avc-tp-gen)" opacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
      <text x="440" y="230" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">RTE Generator</text>
      <text x="440" y="246" textAnchor="middle" fontSize="8" fill="#475569">代码生成器</text>

      <rect x="525" y="208" width="215" height="48" rx="8" fill="url(#avc-tp-build)" opacity="0.15" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="632" y="230" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">Compiler &amp; Debugger</text>
      <text x="632" y="246" textAnchor="middle" fontSize="8" fill="#475569">编译器与调试器</text>

      <rect x="60" y="266" width="680" height="48" rx="8" fill="#fff" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="286" textAnchor="middle" fontSize="10" fill="#475569">ARXML（ECU 配置描述文件）贯穿全流程</text>
      <text x="400" y="302" textAnchor="middle" fontSize="9" fill="#64748b">System Desk 输出 → DaVinci 配置 → Generator 读取 → Compiler 编译</text>

      {/* 开发实践要点 */}
      <text x="400" y="346" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">开发实践要点</text>

      <rect x="40" y="360" width="340" height="80" rx="8" fill="url(#avc-tp-design)" opacity="0.06" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="60" y="382" fontSize="10" fontWeight="600" fill="#0369a1">配置驱动开发</text>
      <text x="60" y="398" fontSize="9" fill="#475569">ARXML 描述系统配置</text>
      <text x="60" y="412" fontSize="9" fill="#475569">工具自动生成框架代码</text>
      <text x="60" y="426" fontSize="9" fill="#475569">手写仅限 SWC 业务逻辑</text>

      <rect x="420" y="360" width="340" height="80" rx="8" fill="url(#avc-tp-gen)" opacity="0.06" stroke="#16a34a" strokeWidth="1.5" />
      <text x="440" y="382" fontSize="10" fontWeight="600" fill="#15803d">仿真与验证</text>
      <text x="440" y="398" fontSize="9" fill="#475569">MIL 模型在环仿真</text>
      <text x="440" y="412" fontSize="9" fill="#475569">SIL 软件在环测试</text>
      <text x="440" y="426" fontSize="9" fill="#475569">HIL 硬件在环验证</text>

      <rect x="40" y="452" width="340" height="80" rx="8" fill="url(#avc-tp-config)" opacity="0.06" stroke="#9333ea" strokeWidth="1.5" />
      <text x="60" y="474" fontSize="10" fontWeight="600" fill="#7e22ce">版本与集成</text>
      <text x="60" y="490" fontSize="9" fill="#475569">ARXML 版本管理</text>
      <text x="60" y="504" fontSize="9" fill="#475569">多供应商组件集成</text>
      <text x="60" y="518" fontSize="9" fill="#475569">持续集成 CI/CD</text>

      <rect x="420" y="452" width="340" height="80" rx="8" fill="url(#avc-tp-build)" opacity="0.06" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="440" y="474" fontSize="10" fontWeight="600" fill="#a16207">调试与标定</text>
      <text x="440" y="490" fontSize="9" fill="#475569">XCP 标定协议</text>
      <text x="440" y="504" fontSize="9" fill="#475569">CCP/CANape 标定工具</text>
      <text x="440" y="518" fontSize="9" fill="#475569">Trace 跟踪与性能分析</text>
    </svg>
  );
}
