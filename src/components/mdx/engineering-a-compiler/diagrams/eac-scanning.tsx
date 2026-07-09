"use client";

export function EacScanningDiagram() {
  return (
    <svg viewBox="0 0 800 420" className="w-full h-auto" role="img" aria-label="词法扫描器从正则到表驱动DFA的转换流程">
      <defs>
        <linearGradient id="eac-scan-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="eac-scan-dfa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="eac-scan-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">扫描器生成流水线：正则 → 表驱动 DFA</text>

      {/* 流水线四阶段 */}
      <rect x="20" y="70" width="160" height="80" rx="10" fill="url(#eac-scan-grad)" opacity="0.12" stroke="#2563eb" strokeWidth="2" />
      <text x="100" y="100" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">① 正则表达式</text>
      <text x="100" y="122" textAnchor="middle" fontSize="11" fill="#475569">[a-z][a-z0-9]*</text>
      <text x="100" y="138" textAnchor="middle" fontSize="11" fill="#475569">描述 Token 模式</text>

      <path d="M180 110 L210 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-scan-arrow)" />

      <rect x="210" y="70" width="160" height="80" rx="10" fill="url(#eac-scan-grad)" opacity="0.18" stroke="#2563eb" strokeWidth="2" />
      <text x="290" y="100" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">② NFA（Thompson）</text>
      <text x="290" y="122" textAnchor="middle" fontSize="11" fill="#475569">非确定有限自动机</text>
      <text x="290" y="138" textAnchor="middle" fontSize="11" fill="#475569">ε 转移 + 多路分支</text>

      <path d="M370 110 L400 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-scan-arrow)" />

      <rect x="400" y="70" width="160" height="80" rx="10" fill="url(#eac-scan-grad)" opacity="0.24" stroke="#2563eb" strokeWidth="2" />
      <text x="480" y="100" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">③ DFA（子集构造）</text>
      <text x="480" y="122" textAnchor="middle" fontSize="11" fill="#475569">确定有限自动机</text>
      <text x="480" y="138" textAnchor="middle" fontSize="11" fill="#475569">消除 ε + 合并状态</text>

      <path d="M560 110 L590 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-scan-arrow)" />

      <rect x="590" y="70" width="190" height="80" rx="10" fill="url(#eac-scan-dfa)" opacity="0.15" stroke="#059669" strokeWidth="2" />
      <text x="685" y="100" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">④ 最小化 DFA</text>
      <text x="685" y="122" textAnchor="middle" fontSize="11" fill="#475569">Hopcroft 划分等价类</text>
      <text x="685" y="138" textAnchor="middle" fontSize="11" fill="#475569">→ 转移表 → 驱动代码</text>

      {/* 表驱动示意 */}
      <text x="400" y="195" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">表驱动扫描器运行时</text>

      <rect x="40" y="210" width="340" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="210" y="232" textAnchor="middle" fontSize="12" fill="#1e40af">输入流：i f ( x ) ...</text>
      <text x="210" y="250" textAnchor="middle" fontSize="11" fill="#64748b">逐字符喂入 DFA 状态机</text>

      <path d="M380 235 L410 235" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-scan-arrow)" />

      <rect x="410" y="210" width="180" height="50" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
      <text x="500" y="232" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">最长匹配 + 优先规则</text>
      <text x="500" y="250" textAnchor="middle" fontSize="11" fill="#64748b">回退到上一个接受态</text>

      <path d="M590 235 L620 235" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-scan-arrow)" />

      <rect x="620" y="210" width="160" height="50" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
      <text x="700" y="232" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">Token 序列</text>
      <text x="700" y="250" textAnchor="middle" fontSize="11" fill="#64748b">&lt;IF&gt; &lt;LPAREN&gt; ...</text>

      {/* 最长匹配说明 */}
      <rect x="40" y="300" width="740" height="100" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="325" fontSize="13" fontWeight="700" fill="#92400e">最长匹配原则（Maximal Munch）</text>
      <text x="60" y="350" fontSize="11" fill="#475569">输入 "iffy" 时，扫描器不能在 "if" 处停止——必须继续读入直到无法转移，</text>
      <text x="60" y="370" fontSize="11" fill="#475569">发现 "iffy" 完整匹配标识符模式，于是识别为一个 ID token 而非关键字 IF。</text>
      <text x="60" y="390" fontSize="11" fill="#475569">优先规则：当多个模式同时匹配，按声明顺序选择（关键字优先于标识符）。</text>
    </svg>
  );
}
