"use client";

export function MmmTarPitDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="焦油坑与软件项目困境示意图">
      <defs>
        <linearGradient id="mmm-tp-pit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
        <linearGradient id="mmm-tp-bubble" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="mmm-tp-entity" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <marker id="mmm-tp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">焦油坑：大型系统编程的困境</text>

      {/* 焦油坑主体 */}
      <ellipse cx="400" cy="340" rx="340" ry="160" fill="url(#mmm-tp-pit)" opacity="0.85" />
      <text x="400" y="380" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fde68a">THE TAR PIT</text>
      <text x="400" y="404" textAnchor="middle" fontSize="11" fill="#fef3c7">远古生物的遗骸在焦油中缓慢沉陷</text>

      {/* 气泡：困境来源 */}
      <circle cx="250" cy="260" r="46" fill="url(#mmm-tp-bubble)" opacity="0.9" />
      <text x="250" y="256" textAnchor="middle" fontSize="10" fontWeight="700" fill="#451a03">复杂性</text>
      <text x="250" y="270" textAnchor="middle" fontSize="9" fill="#78350f">概念结构</text>

      <circle cx="400" cy="230" r="46" fill="url(#mmm-tp-bubble)" opacity="0.9" />
      <text x="400" y="226" textAnchor="middle" fontSize="10" fontWeight="700" fill="#451a03">不可见性</text>
 <text x="400" y="240" textAnchor="middle" fontSize="9" fill="#78350f">结构隐藏</text>

      <circle cx="550" cy="260" r="46" fill="url(#mmm-tp-bubble)" opacity="0.9" />
      <text x="550" y="256" textAnchor="middle" fontSize="10" fontWeight="700" fill="#451a03">一致性</text>
      <text x="550" y="270" textAnchor="middle" fontSize="9" fill="#78350f">接口约束</text>

      <circle cx="200" cy="400" r="42" fill="url(#mmm-tp-bubble)" opacity="0.8" />
      <text x="200" y="396" textAnchor="middle" fontSize="10" fontWeight="700" fill="#451a03">可变性</text>
      <text x="200" y="410" textAnchor="middle" fontSize="9" fill="#78350f">需求变化</text>

      <circle cx="600" cy="400" r="42" fill="url(#mmm-tp-bubble)" opacity="0.8" />
      <text x="600" y="396" textAnchor="middle" fontSize="10" fontWeight="700" fill="#451a03">规模</text>
      <text x="600" y="410" textAnchor="middle" fontSize="9" fill="#78350f">通信爆炸</text>

      {/* 上方：系统层次 */}
      <text x="400" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">软件系统的无序实体</text>

      <rect x="120" y="86" width="560" height="34" rx="8" fill="url(#mmm-tp-entity)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">程序——个体产物，自用为主</text>

      <path d="M400 120 L400 124" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-tp-arrow)" />

      <rect x="120" y="126" width="560" height="34" rx="8" fill="url(#mmm-tp-entity)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="148" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">编程系统产品——可被他人使用的组件</text>

      <path d="M400 160 L400 164" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-tp-arrow)" />

      <rect x="120" y="166" width="560" height="34" rx="8" fill="url(#mmm-tp-entity)" opacity="0.2" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="188" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">编程系统——在环境中可交互运行</text>

      <path d="M400 200 L400 204" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-tp-arrow)" />

      <rect x="120" y="206" width="560" height="34" rx="8" fill="url(#mmm-tp-entity)" opacity="0.25" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="228" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">程序系统——多个程序协作的系统集合</text>

      {/* 底部：困境总结 */}
      <rect x="40" y="500" width="720" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="520" textAnchor="middle" fontSize="11" fill="#475569">大型系统编程的乐趣（创造）与苦恼（不可见性、复杂性、需求变化）并存</text>

      <rect x="40" y="542" width="720" height="28" rx="8" fill="url(#mmm-tp-pit)" opacity="0.1" stroke="#78350f" strokeWidth="1.5" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#78350f">核心困境：系统规模增长 → 通信开销爆炸 → 进度失控 → 焦油坑</text>
    </svg>
  );
}
