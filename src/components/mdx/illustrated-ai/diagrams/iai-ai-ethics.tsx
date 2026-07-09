"use client";

export function IaiAiEthicsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="AI 伦理框架图">
      <defs>
        <linearGradient id="iai-ae-fairness" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iai-ae-transparency" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="iai-ae-privacy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="iai-ae-safety" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="iai-ae-alignment" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="iai-ae-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">AI 伦理：五大支柱与未来挑战</text>

      {/* 中心节点 */}
      <circle cx="400" cy="160" r="50" fill="#0f172a" opacity="0.9" />
      <text x="400" y="156" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">AI 伦理</text>
      <text x="400" y="176" textAnchor="middle" fontSize="10" fill="#cbd5e1">负责任的 AI</text>

      {/* 五大支柱 - 围绕中心 */}
      {/* 公平性 */}
      <rect x="40" y="80" width="180" height="80" rx="10" fill="url(#iai-ae-fairness)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="130" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">公平性 Fairness</text>
      <text x="130" y="124" textAnchor="middle" fontSize="10" fill="#475569">消除数据/算法偏见</text>
      <text x="130" y="140" textAnchor="middle" fontSize="10" fill="#64748b">人口统计学平权</text>
      <text x="130" y="154" textAnchor="middle" fontSize="10" fill="#64748b">公平性审计与度量</text>

      {/* 透明性 */}
      <rect x="250" y="50" width="180" height="56" rx="10" fill="url(#iai-ae-transparency)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="340" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">透明性 Transparency</text>
      <text x="340" y="94" textAnchor="middle" fontSize="10" fill="#475569">可解释 AI（XAI）/ 决策可追溯</text>

      {/* 隐私 */}
      <rect x="580" y="80" width="180" height="80" rx="10" fill="url(#iai-ae-privacy)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="670" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">隐私 Privacy</text>
      <text x="670" y="124" textAnchor="middle" fontSize="10" fill="#475569">数据最小化 / 差分隐私</text>
      <text x="670" y="140" textAnchor="middle" fontSize="10" fill="#64748b">联邦学习保护原始数据</text>
      <text x="670" y="154" textAnchor="middle" fontSize="10" fill="#64748b">GDPR / 数据主体权利</text>

      {/* 安全 */}
      <rect x="250" y="180" width="180" height="56" rx="10" fill="url(#iai-ae-safety)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="340" y="204" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">安全 Safety</text>
      <text x="340" y="224" textAnchor="middle" fontSize="10" fill="#475569">鲁棒性 / 对抗样本防御</text>

      {/* 对齐 */}
      <rect x="470" y="180" width="180" height="56" rx="10" fill="url(#iai-ae-alignment)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="560" y="204" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">对齐 Alignment</text>
      <text x="560" y="224" textAnchor="middle" fontSize="10" fill="#475569">RLHF / 价值对齐人类意图</text>

      {/* 连线到中心 */}
      <line x1="220" y1="120" x2="355" y2="148" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="340" y1="106" x2="375" y2="128" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="580" y1="120" x2="445" y2="148" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="340" y1="180" x2="375" y2="195" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="560" y1="180" x2="425" y2="195" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* 风险与挑战 */}
      <text x="400" y="272" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">关键风险与挑战</text>

      <rect x="40" y="286" width="350" height="120" rx="10" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="60" y="310" fontSize="13" fontWeight="700" fill="#991b1b">当前风险</text>
      <text x="60" y="332" fontSize="11" fill="#475569">偏见与歧视：训练数据中的历史偏见被放大</text>
      <text x="60" y="350" fontSize="11" fill="#475569">深度伪造：AI 生成虚假内容欺骗公众</text>
      <text x="60" y="368" fontSize="11" fill="#475569">隐私泄露：训练数据记忆与提取风险</text>
      <text x="60" y="386" fontSize="11" fill="#475569">就业冲击：自动化替代与技能转型压力</text>

      <rect x="410" y="286" width="350" height="120" rx="10" fill="#fff7ed" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="430" y="310" fontSize="13" fontWeight="700" fill="#92400e">长期挑战</text>
      <text x="430" y="332" fontSize="11" fill="#475569">价值对齐：确保 AI 目标与人类价值观一致</text>
      <text x="430" y="350" fontSize="11" fill="#475569">可控制性：防止超级智能失控</text>
      <text x="430" y="368" fontSize="11" fill="#475569">治理框架：全球协调的 AI 监管体系</text>
      <text x="430" y="386" fontSize="11" fill="#475569">AGI 安全：通用人工智能的风险评估</text>

      {/* 治理路径 */}
      <rect x="40" y="424" width="720" height="110" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="448" fontSize="13" fontWeight="700" fill="#0f172a">负责任 AI 的治理路径</text>
      <text x="60" y="470" fontSize="11" fill="#475569">技术层：差分隐私 / 联邦学习 / 可解释性方法 / 红队测试 / 对齐训练（RLHF）</text>
      <text x="60" y="488" fontSize="11" fill="#475569">制度层：算法审计 / 影响评估 / 问责机制 / 分级监管（如欧盟 AI Act 风险分级）</text>
      <text x="60" y="506" fontSize="11" fill="#475569">文化层：AI 素养教育 / 跨学科合作 / 开源社区自治 / 公众参与监督</text>
      <text x="60" y="524" fontSize="11" fill="#475569">目标：技术创新与社会责任并重，让 AI 造福全人类而非少数群体</text>
    </svg>
  );
}
