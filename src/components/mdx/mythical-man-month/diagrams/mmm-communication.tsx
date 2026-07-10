"use client";

export function MmmCommunicationDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="沟通与文档形式化示意图">
      <defs>
        <linearGradient id="mmm-cm-formal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="mmm-cm-informal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="mmm-cm-doc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="mmm-cm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">沟通与文档：交流形式化层次</text>

      {/* 左侧：沟通方式金字塔 */}
      <text x="200" y="68" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">沟通方式层次</text>

      <polygon points="200,80 140,200 260,200" fill="url(#mmm-cm-informal)" opacity="0.85" />
      <text x="200" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">口头/即时消息</text>
      <text x="200" y="148" textAnchor="middle" fontSize="9" fill="#fef9c3">成本最低，覆盖面窄</text>
      <text x="200" y="172" textAnchor="middle" fontSize="9" fill="#fef9c3">易遗漏，无追溯</text>

      <polygon points="200,206 110,326 290,326" fill="url(#mmm-cm-formal)" opacity="0.75" />
      <text x="200" y="260" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">会议与评审</text>
      <text x="200" y="278" textAnchor="middle" fontSize="9" fill="#e0f2fe">中等成本，需同步</text>
      <text x="200" y="300" textAnchor="middle" fontSize="9" fill="#e0f2fe">有记录，可追溯</text>

      <polygon points="200,332 80,452 320,452" fill="url(#mmm-cm-doc)" opacity="0.65" />
      <text x="200" y="386" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">书面文档</text>
      <text x="200" y="404" textAnchor="middle" fontSize="9" fill="#dcfce7">成本最高，覆盖面广</text>
      <text x="200" y="426" textAnchor="middle" fontSize="9" fill="#dcfce7">可追溯，精确无歧义</text>

      {/* 右侧：手册驱动 */}
      <text x="580" y="68" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">手册驱动的文档体系</text>

      <rect x="400" y="80" width="360" height="42" rx="8" fill="url(#mmm-cm-doc)" opacity="0.9" />
      <text x="580" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">项目手册（定义性文档）</text>

      <path d="M580 122 L580 126" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-cm-arrow)" />

      <rect x="400" y="128" width="170" height="42" rx="8" fill="url(#mmm-cm-formal)" opacity="0.85" />
      <text x="485" y="154" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">目标与外部规范</text>

      <rect x="590" y="128" width="170" height="42" rx="8" fill="url(#mmm-cm-formal)" opacity="0.85" />
      <text x="675" y="154" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">精确说明</text>

      <path d="M485 170 L485 174" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-cm-arrow)" />
      <path d="M675 170 L675 174" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-cm-arrow)" />

      <rect x="400" y="176" width="170" height="42" rx="8" fill="url(#mmm-cm-informal)" opacity="0.8" />
      <text x="485" y="202" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">内部接口规范</text>

      <rect x="590" y="176" width="170" height="42" rx="8" fill="url(#mmm-cm-informal)" opacity="0.8" />
      <text x="675" y="202" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">实现说明</text>

      <path d="M485 218 L485 222" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-cm-arrow)" />
      <path d="M675 218 L675 222" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-cm-arrow)" />

      <rect x="400" y="224" width="170" height="42" rx="8" fill="url(#mmm-cm-doc)" opacity="0.7" />
      <text x="485" y="250" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">测试与验证</text>

      <rect x="590" y="224" width="170" height="42" rx="8" fill="url(#mmm-cm-doc)" opacity="0.7" />
      <text x="675" y="250" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">组织与管理</text>

      {/* 底部：沟通开销图示 */}
      <text x="400" y="300" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">沟通成本随团队规模增长</text>

      <rect x="40" y="312" width="720" height="150" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

      <rect x="80" y="430" width="40" height="0" fill="url(#mmm-cm-doc)" opacity="0.6" />
      <rect x="80" y="420" width="40" height="10" fill="url(#mmm-cm-doc)" opacity="0.6" />
      <text x="100" y="446" textAnchor="middle" fontSize="9" fill="#475569">3人</text>
      <text x="100" y="412" textAnchor="middle" fontSize="8" fill="#15803d">3</text>

      <rect x="200" y="400" width="40" height="30" fill="url(#mmm-cm-doc)" opacity="0.6" />
      <text x="220" y="446" textAnchor="middle" fontSize="9" fill="#475569">6人</text>
      <text x="220" y="392" textAnchor="middle" fontSize="8" fill="#15803d">15</text>

      <rect x="320" y="370" width="40" height="60" fill="url(#mmm-cm-doc)" opacity="0.6" />
      <text x="340" y="446" textAnchor="middle" fontSize="9" fill="#475569">10人</text>
      <text x="340" y="362" textAnchor="middle" fontSize="8" fill="#15803d">45</text>

      <rect x="440" y="340" width="40" height="90" fill="url(#mmm-cm-formal)" opacity="0.6" />
      <text x="460" y="446" textAnchor="middle" fontSize="9" fill="#475569">15人</text>
      <text x="460" y="332" textAnchor="middle" fontSize="8" fill="#0369a1">105</text>

      <rect x="560" y="320" width="40" height="110" fill="url(#mmm-cm-informal)" opacity="0.6" />
      <text x="580" y="446" textAnchor="middle" fontSize="9" fill="#475569">20人</text>
      <text x="580" y="312" textAnchor="middle" fontSize="8" fill="#a16207">190</text>

      <rect x="680" y="320" width="40" height="110" fill="url(#mmm-cm-informal)" opacity="0.8" />
      <text x="700" y="446" textAnchor="middle" fontSize="9" fill="#475569">50人</text>
      <text x="700" y="312" textAnchor="middle" fontSize="8" fill="#a16207">1225</text>

      <text x="400" y="452" textAnchor="middle" fontSize="9" fill="#64748b">通信路径数 n(n-1)/2</text>

      {/* 底部总结 */}
      <rect x="40" y="500" width="720" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="520" textAnchor="middle" fontSize="11" fill="#475569">文档是沟通的形式化手段：精确、可追溯、异步可传播</text>

      <rect x="40" y="542" width="720" height="28" rx="8" fill="url(#mmm-cm-doc)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">核心理念：项目手册是唯一权威，文档驱动协作降低通信成本</text>
    </svg>
  );
}
