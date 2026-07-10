"use client";

export function PdpEverydayLifeDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="日常生活中的刻意练习应用图">
      <defs>
        <linearGradient id="pdp-ed-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pdp-ed-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="pdp-ed-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="pdp-ed-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">日常生活中的刻意练习</text>

      {/* 三步实践法 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三步实践法：找到目标 → 设计练习 → 获取反馈</text>

      <rect x="40" y="78" width="230" height="130" rx="12" fill="url(#pdp-ed-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <circle cx="75" cy="108" r="18" fill="url(#pdp-ed-1)" opacity="0.95" />
      <text x="75" y="113" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">1</text>
      <text x="155" y="108" fontSize="13" fontWeight="700" fill="#0369a1">找到目标</text>
      <text x="60" y="140" fontSize="11" fill="#475569">- 找一个你想提升的技能</text>
      <text x="60" y="158" fontSize="11" fill="#475569">- 分解出可练习的子技能</text>
      <text x="60" y="176" fontSize="11" fill="#475569">- 设定明确的阶段性目标</text>
      <text x="60" y="194" fontSize="11" fill="#475569">- 找到该领域的专家标准</text>

      <path d="M270 143 L310 143" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-ed-arrow)" />

      <rect x="314" y="78" width="230" height="130" rx="12" fill="url(#pdp-ed-2)" opacity="0.08" stroke="#10b981" strokeWidth="2" />
      <circle cx="349" cy="108" r="18" fill="url(#pdp-ed-2)" opacity="0.95" />
      <text x="349" y="113" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">2</text>
      <text x="429" y="108" fontSize="13" fontWeight="700" fill="#059669">设计练习</text>
      <text x="334" y="140" fontSize="11" fill="#475569">- 专注练习薄弱环节</text>
      <text x="334" y="158" fontSize="11" fill="#475569">- 在舒适区外挑战</text>
      <text x="334" y="176" fontSize="11" fill="#475569">- 拆解成可重复的小任务</text>
      <text x="334" y="194" fontSize="11" fill="#475569">- 每次练习有明确焦点</text>

      <path d="M544 143 L584 143" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-ed-arrow)" />

      <rect x="588" y="78" width="180" height="130" rx="12" fill="url(#pdp-ed-3)" opacity="0.08" stroke="#f59e0b" strokeWidth="2" />
      <circle cx="623" cy="108" r="18" fill="url(#pdp-ed-3)" opacity="0.95" />
      <text x="623" y="113" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">3</text>
      <text x="678" y="108" fontSize="13" fontWeight="700" fill="#d97706">获取反馈</text>
      <text x="608" y="140" fontSize="11" fill="#475569">- 录音/录像/数据</text>
      <text x="608" y="158" fontSize="11" fill="#475569">- 找标杆对比</text>
      <text x="608" y="176" fontSize="11" fill="#475569">- 找同行互评</text>
      <text x="608" y="194" fontSize="11" fill="#475569">- 自我监控迭代</text>

      {/* 应用场景对比 */}
      <text x="400" y="236" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四个生活场景的刻意练习</text>

      <rect x="40" y="250" width="350" height="100" rx="10" fill="url(#pdp-ed-1)" opacity="0.06" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="60" y="274" fontSize="13" fontWeight="700" fill="#0369a1">场景一：提升写作能力</text>
      <text x="60" y="296" fontSize="11" fill="#475569">天真练习：每天写一篇日记</text>
      <text x="60" y="316" fontSize="11" fill="#475569">刻意练习：选范文 → 仿写 → 对比 → 改弱点</text>
      <text x="60" y="336" fontSize="11" fontWeight="600" fill="#0369a1">关键：有标杆对比，有针对性纠错</text>

      <rect x="410" y="250" width="350" height="100" rx="10" fill="url(#pdp-ed-2)" opacity="0.06" stroke="#10b981" strokeWidth="1.5" />
      <text x="430" y="274" fontSize="13" fontWeight="700" fill="#059669">场景二：提升演讲能力</text>
      <text x="430" y="296" fontSize="11" fill="#475569">天真练习：多上台讲话</text>
      <text x="430" y="316" fontSize="11" fill="#475569">刻意练习：录像 → 分析手势语调 → 专项改进</text>
      <text x="430" y="336" fontSize="11" fontWeight="600" fill="#059669">关键：用技术手段获取客观反馈</text>

      <rect x="40" y="360" width="350" height="100" rx="10" fill="url(#pdp-ed-3)" opacity="0.06" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="384" fontSize="13" fontWeight="700" fill="#d97706">场景三：提升编程能力</text>
      <text x="60" y="406" fontSize="11" fill="#475569">天真练习：每天写代码</text>
      <text x="60" y="426" fontSize="11" fill="#475569">刻意练习：读优秀源码 → 仿写 → code review</text>
      <text x="60" y="446" fontSize="11" fontWeight="600" fill="#d97706">关键：向高手学习，获取专业反馈</text>

      <rect x="410" y="360" width="350" height="100" rx="10" fill="url(#pdp-ed-1)" opacity="0.06" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="430" y="384" fontSize="13" fontWeight="700" fill="#0369a1">场景四：提升运动水平</text>
      <text x="430" y="406" fontSize="11" fill="#475569">天真练习：每天跑步</text>
      <text x="430" y="426" fontSize="11" fill="#475569">刻意练习：分解动作 → 数据监控 → 针对弱点</text>
      <text x="430" y="446" fontSize="11" fontWeight="600" fill="#0369a1">关键：分解技能，量化反馈</text>

      {/* 核心原则 */}
      <text x="400" y="488" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">日常应用的核心原则</text>

      <rect x="40" y="502" width="720" height="62" rx="8" fill="url(#pdp-ed-2)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="60" y="524" fontSize="11" fontWeight="600" fill="#059669">原则：不在于练多久，而在于怎么练——每一分钟都在挑战边界、获取反馈、迭代改进。</text>
      <text x="60" y="544" fontSize="11" fill="#475569">即使没有导师，也能用「标杆对比法」自我反馈：找到该领域的优秀范例 → 模仿执行 → 对比差距 → 针对改进。</text>
      <text x="60" y="560" fontSize="11" fontWeight="600" fill="#059669">关键信念：天赋不是前提，方法才是——任何人都可以通过刻意练习持续进步。</text>
    </svg>
  );
}
