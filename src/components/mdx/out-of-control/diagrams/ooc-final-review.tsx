"use client";

export function OocFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="失控全书复习与知识整合图">
      <defs>
        <linearGradient id="ooc-fr-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="ooc-fr-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="ooc-fr-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ooc-fr-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="ooc-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：失控知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="120" height="56" rx="8" fill="url(#ooc-fr-1)" opacity="0.9" />
      <text x="80" y="96" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">ch0 全景</text>
      <text x="80" y="116" textAnchor="middle" fontSize="8" fill="#e0f2fe">知识图谱</text>

      <path d="M140 102 L158 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-fr-arrow)" />

      <rect x="162" y="74" width="120" height="56" rx="8" fill="url(#ooc-fr-1)" opacity="0.9" />
      <text x="222" y="96" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">ch1-2 基础</text>
      <text x="222" y="116" textAnchor="middle" fontSize="8" fill="#e0f2fe">融合与涌现</text>

      <path d="M282 102 L300 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-fr-arrow)" />

      <rect x="304" y="74" width="120" height="56" rx="8" fill="url(#ooc-fr-2)" opacity="0.9" />
      <text x="364" y="96" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">ch3-4 进化</text>
      <text x="364" y="116" textAnchor="middle" fontSize="8" fill="#ede9fe">共同进化与生态</text>

      <path d="M424 102 L442 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-fr-arrow)" />

      <rect x="446" y="74" width="120" height="56" rx="8" fill="url(#ooc-fr-3)" opacity="0.9" />
      <text x="506" y="96" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">ch5-6 经济</text>
      <text x="506" y="116" textAnchor="middle" fontSize="8" fill="#fef3c7">网络与群体</text>

      <path d="M566 102 L584 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-fr-arrow)" />

      <rect x="588" y="74" width="120" height="56" rx="8" fill="url(#ooc-fr-4)" opacity="0.9" />
      <text x="648" y="96" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">ch7-9 反思</text>
      <text x="648" y="116" textAnchor="middle" fontSize="8" fill="#d1fae5">控制与未来</text>

      <path d="M708 102 L726 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-fr-arrow)" />

      <rect x="730" y="74" width="50" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="755" y="108" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">闭环</text>

      {/* 核心知识链 */}
      <text x="400" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心知识链</text>

      <rect x="20" y="174" width="120" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="80" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">生物逻辑</text>
      <text x="80" y="214" textAnchor="middle" fontSize="8" fill="#475569">活系统法则</text>

      <path d="M140 202 L158 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-fr-arrow)" />

      <rect x="162" y="174" width="120" height="56" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="222" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">涌现自组织</text>
      <text x="222" y="214" textAnchor="middle" fontSize="8" fill="#475569">简单到复杂</text>

      <path d="M282 202 L300 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-fr-arrow)" />

      <rect x="304" y="174" width="120" height="56" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="364" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#d97706">共同进化</text>
      <text x="364" y="214" textAnchor="middle" fontSize="8" fill="#475569">双向塑造</text>

      <path d="M424 202 L442 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-fr-arrow)" />

      <rect x="446" y="174" width="120" height="56" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="506" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">分布式网络</text>
      <text x="506" y="214" textAnchor="middle" fontSize="8" fill="#475569">群体涌现</text>

      <path d="M566 202 L584 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-fr-arrow)" />

      <rect x="588" y="174" width="120" height="56" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="648" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">失控即控制</text>
      <text x="648" y="214" textAnchor="middle" fontSize="8" fill="#475569">去中心化</text>

      <path d="M708 202 L726 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-fr-arrow)" />

      <rect x="730" y="174" width="50" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="755" y="206" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">循环</text>

      <text x="400" y="252" textAnchor="middle" fontSize="9" fill="#64748b">逻辑链：生物逻辑 → 涌现自组织 → 共同进化 → 分布式网络 → 失控即控制</text>

      {/* 四大维度 */}
      <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">失控四大维度</text>

      <rect x="20" y="294" width="180" height="100" rx="8" fill="url(#ooc-fr-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="110" y="316" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">活系统</text>
      <text x="110" y="336" textAnchor="middle" fontSize="9" fill="#475569">生物与机器融合</text>
      <text x="110" y="352" textAnchor="middle" fontSize="9" fill="#475569">造物九律</text>
      <text x="110" y="368" textAnchor="middle" fontSize="9" fill="#475569">涌现 · 自组织</text>
      <text x="110" y="384" textAnchor="middle" fontSize="9" fill="#475569">边缘最大化</text>

      <rect x="212" y="294" width="180" height="100" rx="8" fill="url(#ooc-fr-2)" opacity="0.1" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="302" y="316" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">进化机制</text>
      <text x="302" y="336" textAnchor="middle" fontSize="9" fill="#475569">共同进化</text>
      <text x="302" y="352" textAnchor="middle" fontSize="9" fill="#475569">红皇后假说</text>
      <text x="302" y="368" textAnchor="middle" fontSize="9" fill="#475569">多样性即稳定性</text>
      <text x="302" y="384" textAnchor="middle" fontSize="9" fill="#475569">开放系统</text>

      <rect x="404" y="294" width="180" height="100" rx="8" fill="url(#ooc-fr-3)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="494" y="316" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">网络经济</text>
      <text x="494" y="336" textAnchor="middle" fontSize="9" fill="#475569">递增收益</text>
      <text x="494" y="352" textAnchor="middle" fontSize="9" fill="#475569">普及胜于稀缺</text>
      <text x="494" y="368" textAnchor="middle" fontSize="9" fill="#475569">群体智能涌现</text>
      <text x="494" y="384" textAnchor="middle" fontSize="9" fill="#475569">去中心化自治</text>

      <rect x="596" y="294" width="184" height="100" rx="8" fill="url(#ooc-fr-4)" opacity="0.1" stroke="#10b981" strokeWidth="1.5" />
      <text x="688" y="316" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">失控哲学</text>
      <text x="688" y="336" textAnchor="middle" fontSize="9" fill="#475569">控制即失败</text>
      <text x="688" y="352" textAnchor="middle" fontSize="9" fill="#475569">去中心化智慧</text>
      <text x="688" y="368" textAnchor="middle" fontSize="9" fill="#475569">培育而非建造</text>
      <text x="688" y="384" textAnchor="middle" fontSize="9" fill="#475569">技术生物化</text>

      {/* 实践启示路径 */}
      <text x="400" y="418" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">实践启示路径</text>

      <rect x="20" y="432" width="150" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="95" y="454" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">理解活系统</text>
      <text x="95" y="474" textAnchor="middle" fontSize="8" fill="#475569">生物逻辑法则</text>

      <path d="M170 460 L188 460" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-fr-arrow)" />

      <rect x="192" y="432" width="150" height="56" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="267" y="454" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">设计规则</text>
      <text x="267" y="474" textAnchor="middle" fontSize="8" fill="#475569">而非设计结果</text>

      <path d="M342 460 L360 460" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-fr-arrow)" />

      <rect x="364" y="432" width="150" height="56" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="439" y="454" textAnchor="middle" fontSize="9" fontWeight="600" fill="#d97706">放权自治</text>
      <text x="439" y="474" textAnchor="middle" fontSize="8" fill="#475569">让系统自组织</text>

      <path d="M514 460 L532 460" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-fr-arrow)" />

      <rect x="536" y="432" width="150" height="56" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="611" y="454" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">拥抱涌现</text>
      <text x="611" y="474" textAnchor="middle" fontSize="8" fill="#475569">在失控中寻序</text>

      <path d="M686 460 L704 460" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-fr-arrow)" />

      <rect x="708" y="432" width="72" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="744" y="464" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">持续</text>
      <text x="744" y="478" textAnchor="middle" fontSize="8" fill="#475569">进化</text>

      {/* 底部总结 */}
      <rect x="20" y="506" width="760" height="32" rx="8" fill="url(#ooc-fr-3)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="526" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">核心经验：理解活系统法则 + 设计规则而非结果 + 放权自治 + 拥抱涌现 = 与失控共存</text>

      <rect x="20" y="546" width="760" height="24" rx="8" fill="url(#ooc-fr-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="562" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：生物逻辑 → 涌现自组织 → 共同进化 → 分布式网络 → 失控即控制</text>
    </svg>
  );
}
