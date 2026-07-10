"use client";

export function OptFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="全书复习与知识整合图">
      <defs>
        <linearGradient id="opt-fr-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="opt-fr-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="opt-fr-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="opt-fr-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="opt-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：49个工具知识整合</text>

      {/* 十章学习路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="20" y="74" width="116" height="56" rx="8" fill="url(#opt-fr-1)" opacity="0.9" />
      <text x="78" y="96" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">ch0 全景</text>
      <text x="78" y="116" textAnchor="middle" fontSize="8" fill="#e0f2fe">知识图谱</text>

      <path d="M136 102 L154 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-fr-arrow)" />

      <rect x="158" y="74" width="116" height="56" rx="8" fill="url(#opt-fr-1)" opacity="0.9" />
      <text x="216" y="96" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">ch1-2 诊断</text>
      <text x="216" y="116" textAnchor="middle" fontSize="8" fill="#e0f2fe">问题与根因</text>

      <path d="M274 102 L292 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-fr-arrow)" />

      <rect x="296" y="74" width="116" height="56" rx="8" fill="url(#opt-fr-2)" opacity="0.9" />
      <text x="354" y="96" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">ch3-4 规划</text>
      <text x="354" y="116" textAnchor="middle" fontSize="8" fill="#ede9fe">战略与决策</text>

      <path d="M412 102 L430 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-fr-arrow)" />

      <rect x="434" y="74" width="116" height="56" rx="8" fill="url(#opt-fr-3)" opacity="0.9" />
      <text x="492" y="96" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">ch5-6 执行</text>
      <text x="492" y="116" textAnchor="middle" fontSize="8" fill="#fef3c7">流程与协作</text>

      <path d="M550 102 L568 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-fr-arrow)" />

      <rect x="572" y="74" width="116" height="56" rx="8" fill="url(#opt-fr-4)" opacity="0.9" />
      <text x="630" y="96" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">ch7-8 创新</text>
      <text x="630" y="116" textAnchor="middle" fontSize="8" fill="#d1fae5">创新与评估</text>

      <path d="M688 102 L706 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-fr-arrow)" />

      <rect x="710" y="74" width="70" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="745" y="100" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">ch9</text>
      <text x="745" y="116" textAnchor="middle" fontSize="8" fill="#475569">复习整合</text>

      {/* 核心知识链 */}
      <text x="400" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心知识链</text>

      <rect x="20" y="174" width="124" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="82" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">界定问题</text>
      <text x="82" y="214" textAnchor="middle" fontSize="8" fill="#475569">5W2H/SWOT</text>

      <path d="M144 202 L162 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-fr-arrow)" />

      <rect x="166" y="174" width="124" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="228" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">追溯根因</text>
      <text x="228" y="214" textAnchor="middle" fontSize="8" fill="#475569">5Whys/鱼骨</text>

      <path d="M290 202 L308 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-fr-arrow)" />

      <rect x="312" y="174" width="124" height="56" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="374" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">规划方向</text>
      <text x="374" y="214" textAnchor="middle" fontSize="8" fill="#475569">PEST/五力</text>

      <path d="M436 202 L454 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-fr-arrow)" />

      <rect x="458" y="174" width="124" height="56" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="520" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#d97706">改善执行</text>
      <text x="520" y="214" textAnchor="middle" fontSize="8" fill="#475569">PDCA/精益</text>

      <path d="M582 202 L600 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-fr-arrow)" />

      <rect x="604" y="174" width="124" height="56" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="666" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">评估反馈</text>
      <text x="666" y="214" textAnchor="middle" fontSize="8" fill="#475569">OKR/NPS</text>

      <path d="M728 202 L746 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-fr-arrow)" />

      <rect x="750" y="174" width="34" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="767" y="206" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">闭环</text>

      <text x="400" y="250" textAnchor="middle" fontSize="9" fill="#64748b">逻辑链：界定问题 → 追溯根因 → 规划方向 → 改善执行 → 评估反馈 → 持续闭环</text>

      {/* 五大工具板块 */}
      <text x="400" y="278" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">五大工具板块与49个工具</text>

      <rect x="20" y="292" width="150" height="100" rx="8" fill="url(#opt-fr-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="95" y="314" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">问题诊断</text>
      <text x="95" y="336" textAnchor="middle" fontSize="9" fill="#475569">5W2H / SWOT</text>
      <text x="95" y="352" textAnchor="middle" fontSize="9" fill="#475569">力场 / MECE</text>
      <text x="95" y="368" textAnchor="middle" fontSize="9" fill="#475569">5Whys / 鱼骨</text>
      <text x="95" y="384" textAnchor="middle" fontSize="9" fill="#475569">帕累托 / FTA</text>

      <rect x="182" y="292" width="150" height="100" rx="8" fill="url(#opt-fr-2)" opacity="0.1" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="257" y="314" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">战略决策</text>
      <text x="257" y="336" textAnchor="middle" fontSize="9" fill="#475569">PEST / 五力</text>
      <text x="257" y="352" textAnchor="middle" fontSize="9" fill="#475569">BCG / 价值链</text>
      <text x="257" y="368" textAnchor="middle" fontSize="9" fill="#475569">决策矩阵 / AHP</text>
      <text x="257" y="384" textAnchor="middle" fontSize="9" fill="#475569">德尔菲 / 情景</text>

      <rect x="344" y="292" width="150" height="100" rx="8" fill="url(#opt-fr-3)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="419" y="314" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">执行改善</text>
      <text x="419" y="336" textAnchor="middle" fontSize="9" fill="#475569">PDCA / 六西格玛</text>
      <text x="419" y="352" textAnchor="middle" fontSize="9" fill="#475569">精益 / 价值流</text>
      <text x="419" y="368" textAnchor="middle" fontSize="9" fill="#475569">看板 / RACI</text>
      <text x="419" y="384" textAnchor="middle" fontSize="9" fill="#475569">六帽 / 头脑风暴</text>

      <rect x="506" y="292" width="150" height="100" rx="8" fill="url(#opt-fr-4)" opacity="0.1" stroke="#10b981" strokeWidth="1.5" />
      <text x="581" y="314" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">创新突破</text>
      <text x="581" y="336" textAnchor="middle" fontSize="9" fill="#475569">SCAMPER / TRIZ</text>
      <text x="581" y="352" textAnchor="middle" fontSize="9" fill="#475569">设计思维</text>
      <text x="581" y="368" textAnchor="middle" fontSize="9" fill="#475569">思维导图</text>
      <text x="581" y="384" textAnchor="middle" fontSize="9" fill="#475569">冲突管理</text>

      <rect x="668" y="292" width="114" height="100" rx="8" fill="url(#opt-fr-4)" opacity="0.1" stroke="#10b981" strokeWidth="1.5" />
      <text x="725" y="314" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">评估度量</text>
      <text x="725" y="336" textAnchor="middle" fontSize="9" fill="#475569">OKR / KPI</text>
      <text x="725" y="352" textAnchor="middle" fontSize="9" fill="#475569">BSC / 360度</text>
      <text x="725" y="368" textAnchor="middle" fontSize="9" fill="#475569">NPS</text>
      <text x="725" y="384" textAnchor="middle" fontSize="9" fill="#475569">名义小组</text>

      {/* 实践启示路径 */}
      <text x="400" y="416" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">实践启示路径</text>

      <rect x="20" y="430" width="148" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="94" y="452" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">界定问题</text>
      <text x="94" y="472" textAnchor="middle" fontSize="8" fill="#475569">用5W2H描述</text>

      <path d="M168 458 L186 458" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-fr-arrow)" />

      <rect x="190" y="430" width="148" height="56" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="264" y="452" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">追溯根因</text>
      <text x="264" y="472" textAnchor="middle" fontSize="8" fill="#475569">5Whys穿透</text>

      <path d="M338 458 L356 458" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-fr-arrow)" />

      <rect x="360" y="430" width="148" height="56" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="434" y="452" textAnchor="middle" fontSize="9" fontWeight="600" fill="#d97706">规划执行</text>
      <text x="434" y="472" textAnchor="middle" fontSize="8" fill="#475569">战略+PDCA</text>

      <path d="M508 458 L526 458" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-fr-arrow)" />

      <rect x="530" y="430" width="148" height="56" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="604" y="452" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">评估反馈</text>
      <text x="604" y="472" textAnchor="middle" fontSize="8" fill="#475569">OKR+NPS</text>

      <path d="M678 458 L696 458" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-fr-arrow)" />

      <rect x="700" y="430" width="80" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="740" y="452" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">持续</text>
      <text x="740" y="468" textAnchor="middle" fontSize="8" fill="#475569">闭环改进</text>

      {/* 底部总结 */}
      <rect x="20" y="504" width="760" height="32" rx="8" fill="url(#opt-fr-3)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="524" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">核心经验：界定问题 + 追溯根因 + 规划方向 + 改善执行 + 评估反馈 = 组织问题的系统化解决闭环</text>

      <rect x="20" y="544" width="760" height="24" rx="8" fill="url(#opt-fr-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：界定问题 → 追溯根因 → 规划方向 → 做出决策 → 改善流程 → 协同团队 → 创新突破 → 评估反馈</text>
    </svg>
  );
}
