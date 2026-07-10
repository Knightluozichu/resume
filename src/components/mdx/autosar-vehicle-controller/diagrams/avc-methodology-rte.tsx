"use client";

export function AvcMethodologyRteDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="AUTOSAR方法论V模型与RTE通信机制">
      <defs>
        <linearGradient id="avc-mr-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="avc-mr-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="avc-mr-rte" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="avc-mr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">方法论 V 模型与 RTE 运行时环境</text>

      {/* V模型左半边 */}
      <text x="200" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">V 模型开发流程</text>

      <rect x="60" y="76" width="280" height="34" rx="8" fill="url(#avc-mr-left)" opacity="0.85" />
      <text x="200" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">需求分析 System Requirements</text>

      <path d="M140 110 L130 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-mr-arrow)" />

      <rect x="80" y="122" width="240" height="34" rx="8" fill="url(#avc-mr-left)" opacity="0.8" />
      <text x="200" y="144" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">系统架构设计 System Arch</text>

      <path d="M160 156 L150 166" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-mr-arrow)" />

      <rect x="100" y="168" width="200" height="34" rx="8" fill="url(#avc-mr-left)" opacity="0.75" />
      <text x="200" y="190" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">软件架构设计 SW Arch</text>

      <path d="M180 202 L170 212" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-mr-arrow)" />

      <rect x="120" y="214" width="160" height="34" rx="8" fill="url(#avc-mr-left)" opacity="0.7" />
      <text x="200" y="236" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">组件设计 SWC Design</text>

      <path d="M200 248 L200 258" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-mr-arrow)" />

      <rect x="140" y="260" width="120" height="30" rx="8" fill="url(#avc-mr-left)" opacity="0.65" />
      <text x="200" y="280" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">编码实现 Coding</text>

      {/* V模型右半边 */}
      <rect x="540" y="260" width="120" height="30" rx="8" fill="url(#avc-mr-right)" opacity="0.65" />
      <text x="600" y="280" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">单元测试 Unit Test</text>

      <path d="M600 290 L600 300" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-mr-arrow)" />

      <rect x="520" y="214" width="160" height="34" rx="8" fill="url(#avc-mr-right)" opacity="0.7" />
      <text x="600" y="236" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">集成测试 Integration</text>

      <path d="M620 248 L630 238" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-mr-arrow)" />

      <rect x="500" y="168" width="200" height="34" rx="8" fill="url(#avc-mr-right)" opacity="0.75" />
      <text x="600" y="190" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">系统测试 System Test</text>

      <path d="M640 202 L650 192" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-mr-arrow)" />

      <rect x="480" y="122" width="240" height="34" rx="8" fill="url(#avc-mr-right)" opacity="0.8" />
      <text x="600" y="144" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">验证 Verification</text>

      <path d="M660 156 L670 146" stroke="#64748b" strokeWidth="2" markerEnd="url(#avc-mr-arrow)" />

      <rect x="460" y="76" width="280" height="34" rx="8" fill="url(#avc-mr-right)" opacity="0.85" />
      <text x="600" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">确认 Validation</text>

      {/* RTE 部分 */}
      <text x="400" y="320" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7e22ce">RTE 运行时环境</text>

      <rect x="40" y="334" width="720" height="200" rx="10" fill="url(#avc-mr-rte)" opacity="0.08" stroke="#9333ea" strokeWidth="2" />

      {/* SWC-A */}
      <rect x="70" y="350" width="140" height="60" rx="8" fill="url(#avc-mr-rte)" opacity="0.8" />
      <text x="140" y="374" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">SWC-A</text>
      <text x="140" y="392" textAnchor="middle" fontSize="9" fill="#f3e8ff">PPort (数据发送)</text>

      {/* SWC-B */}
      <rect x="590" y="350" width="140" height="60" rx="8" fill="url(#avc-mr-rte)" opacity="0.8" />
      <text x="660" y="374" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">SWC-B</text>
      <text x="660" y="392" textAnchor="middle" fontSize="9" fill="#f3e8ff">RPort (数据接收)</text>

      {/* RTE核心 */}
      <rect x="230" y="360" width="340" height="40" rx="8" fill="url(#avc-mr-rte)" opacity="0.6" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="385" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">RTE: SendReceive / S/R 通信 / 触发调度</text>

      <path d="M210 380 L228 380" stroke="#9333ea" strokeWidth="2" markerEnd="url(#avc-mr-arrow)" />
      <path d="M570 380 L588 380" stroke="#9333ea" strokeWidth="2" markerEnd="url(#avc-mr-arrow)" />

      {/* RTE功能 */}
      <rect x="70" y="420" width="200" height="44" rx="8" fill="#fff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="170" y="438" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">通信抽象</text>
      <text x="170" y="454" textAnchor="middle" fontSize="9" fill="#475569">屏蔽底层总线差异</text>

      <rect x="300" y="420" width="200" height="44" rx="8" fill="#fff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="438" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">调度管理</text>
      <text x="400" y="454" textAnchor="middle" fontSize="9" fill="#475569">Runnable 触发与时序</text>

      <rect x="530" y="420" width="200" height="44" rx="8" fill="#fff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="630" y="438" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">解耦桥梁</text>
      <text x="630" y="454" textAnchor="middle" fontSize="9" fill="#475569">SWC 与 BSW 独立演化</text>

      <rect x="70" y="478" width="660" height="40" rx="8" fill="url(#avc-mr-rte)" opacity="0.06" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="503" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">RTE 自动生成：从 ARXML 配置描述 → 生成 C 代码 → 编译链接进 ECU 可执行文件</text>
    </svg>
  );
}
