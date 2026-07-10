"use client";

export function AupMinifaceDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="接口与最小化设计原则图">
      <defs>
        <linearGradient id="aup-mf-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="aup-mf-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="aup-mf-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="aup-mf-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="aup-mf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">接口与最小化</text>

      {/* 机制 vs 策略 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">机制与策略的分离</text>

      <rect x="30" y="76" width="360" height="140" rx="10" fill="url(#aup-mf-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="50" y="100" fontSize="13" fontWeight="700" fill="#0369a1">机制 Mechanism</text>
      <text x="50" y="120" fontSize="10" fill="#475569">提供「如何做」的能力</text>
      <text x="50" y="136" fontSize="10" fill="#475569">通用、稳定、不轻易变化</text>
      <text x="50" y="152" fontSize="10" fill="#475569">例：文件系统提供读写机制</text>
      <text x="50" y="168" fontSize="10" fill="#475569">例：Shell 提供管道机制</text>
      <text x="50" y="184" fontSize="10" fill="#475569">例：正则引擎提供匹配机制</text>
      <rect x="50" y="194" width="120" height="16" rx="4" fill="#0ea5e9" opacity="0.2" />
      <text x="110" y="206" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">提供能力</text>

      <rect x="410" y="76" width="360" height="140" rx="10" fill="url(#aup-mf-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="430" y="100" fontSize="13" fontWeight="700" fill="#7e22ce">策略 Policy</text>
      <text x="430" y="120" fontSize="10" fill="#475569">决定「做什么」的选择</text>
      <text x="430" y="136" fontSize="10" fill="#475569">具体、灵活、经常变化</text>
      <text x="430" y="152" fontSize="10" fill="#475569">例：备份策略（何时/何处）</text>
      <text x="430" y="168" fontSize="10" fill="#475569">例：grep 的匹配模式</text>
      <text x="430" y="184" fontSize="10" fill="#475569">例：sort 的排序规则</text>
      <rect x="430" y="194" width="120" height="16" rx="4" fill="#9333ea" opacity="0.2" />
      <text x="490" y="206" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">用户决策</text>

      {/* CLI 设计原则 */}
      <text x="400" y="240" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">CLI 接口设计原则</text>

      <rect x="30" y="254" width="180" height="130" rx="8" fill="url(#aup-mf-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="120" y="278" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">最小惊讶</text>
      <text x="120" y="298" textAnchor="middle" fontSize="9" fill="#475569">行为符合直觉</text>
      <text x="120" y="314" textAnchor="middle" fontSize="9" fill="#475569">默认值合理</text>
      <text x="120" y="330" textAnchor="middle" fontSize="9" fill="#475569">选项命名一致</text>
      <text x="120" y="346" textAnchor="middle" fontSize="9" fill="#475569">-v/--verbose 通例</text>
      <text x="120" y="362" textAnchor="middle" fontSize="9" fill="#475569">-h/--help 通例</text>
      <text x="120" y="378" textAnchor="middle" fontSize="9" fill="#475569">退出码遵循约定</text>

      <rect x="230" y="254" width="180" height="130" rx="8" fill="url(#aup-mf-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="320" y="278" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">沉默是金</text>
      <text x="320" y="298" textAnchor="middle" fontSize="9" fill="#475569">成功时无多余输出</text>
      <text x="320" y="314" textAnchor="middle" fontSize="9" fill="#475569">错误时给出有用信息</text>
      <text x="320" y="330" textAnchor="middle" fontSize="9" fill="#475569">不输出装饰性内容</text>
      <text x="320" y="346" textAnchor="middle" fontSize="9" fill="#475569">便于管道处理</text>
      <text x="320" y="362" textAnchor="middle" fontSize="9" fill="#475569">适合脚本自动化</text>
      <text x="320" y="378" textAnchor="middle" fontSize="9" fill="#475569">-q 安静模式</text>

      <rect x="430" y="254" width="180" height="130" rx="8" fill="url(#aup-mf-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="520" y="278" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">可组合</text>
      <text x="520" y="298" textAnchor="middle" fontSize="9" fill="#475569">stdin/stdout 默认</text>
      <text x="520" y="314" textAnchor="middle" fontSize="9" fill="#475569">支持管道串联</text>
      <text x="520" y="330" textAnchor="middle" fontSize="9" fill="#475569">文件参数可选</text>
      <text x="520" y="346" textAnchor="middle" fontSize="9" fill="#475569">- 表示 stdin</text>
      <text x="520" y="362" textAnchor="middle" fontSize="9" fill="#475569">退出码可检测</text>
      <text x="520" y="378" textAnchor="middle" fontSize="9" fill="#475569">无交互式提示</text>

      <rect x="630" y="254" width="140" height="130" rx="8" fill="url(#aup-mf-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="700" y="278" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">宽容</text>
      <text x="700" y="298" textAnchor="middle" fontSize="9" fill="#475569">Postel 法则</text>
      <text x="700" y="314" textAnchor="middle" fontSize="9" fill="#475569">输入要求宽松</text>
      <text x="700" y="330" textAnchor="middle" fontSize="9" fill="#475569">输出严格规范</text>
      <text x="700" y="346" textAnchor="middle" fontSize="9" fill="#475569">容错能力强</text>
      <text x="700" y="362" textAnchor="middle" fontSize="9" fill="#475569">大小写不敏感</text>
      <text x="700" y="378" textAnchor="middle" fontSize="9" fill="#475569">忽略空白</text>

      {/* 接口最小化决策 */}
      <text x="400" y="406" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">接口最小化决策流程</text>

      <rect x="250" y="420" width="300" height="40" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="400" y="444" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">这个功能是否所有用户都需要？</text>

      <path d="M320 460 L200 480" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-mf-arrow)" />
      <path d="M480 460 L600 480" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-mf-arrow)" />

      <rect x="100" y="484" width="200" height="40" rx="8" fill="url(#aup-mf-3)" opacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
      <text x="200" y="508" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">是 → 设为默认行为</text>

      <rect x="500" y="484" width="200" height="40" rx="8" fill="url(#aup-mf-4)" opacity="0.15" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="600" y="508" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">否 → 设为可选选项</text>

      <path d="M600 524 L600 538" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-mf-arrow)" />

      <rect x="500" y="542" width="200" height="28" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="600" y="560" textAnchor="middle" fontSize="10" fill="#15803d">提供 flag 开关</text>

      {/* 底部总结 */}
      <rect x="30" y="578" width="740" height="2" rx="1" fill="url(#aup-mf-1)" opacity="0.3" />
    </svg>
  );
}
