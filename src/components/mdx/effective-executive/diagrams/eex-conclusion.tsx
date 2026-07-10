"use client";

export function EexConclusionDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="结论与管理者之道五项习惯整合">
      <defs>
        <linearGradient id="eex-cl-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="eex-cl-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="eex-cl-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="eex-cl-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="eex-cl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">结论：有效性必须学会</text>

      {/* 五项习惯整合成一个整体 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">五项习惯共同构成有效管理者的整体</text>

      <rect x="40" y="76" width="140" height="96" rx="8" fill="url(#eex-cl-1)" opacity="0.9" />
      <text x="110" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">掌握时间</text>
      <text x="110" y="122" textAnchor="middle" fontSize="9" fill="#e0f2fe">认识资源</text>
      <text x="110" y="140" textAnchor="middle" fontSize="9" fill="#e0f2fe">的稀缺性</text>
      <text x="110" y="160" textAnchor="middle" fontSize="8" fill="#e0f2fe">物理基础</text>

      <rect x="186" y="76" width="140" height="96" rx="8" fill="url(#eex-cl-2)" opacity="0.9" />
      <text x="256" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">聚焦贡献</text>
      <text x="256" y="122" textAnchor="middle" fontSize="9" fill="#ede9fe">着眼外部</text>
      <text x="256" y="140" textAnchor="middle" fontSize="9" fill="#ede9fe">成果导向</text>
      <text x="256" y="160" textAnchor="middle" fontSize="8" fill="#ede9fe">价值取向</text>

      <rect x="332" y="76" width="140" height="96" rx="8" fill="url(#eex-cl-3)" opacity="0.9" />
      <text x="402" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">发挥长处</text>
      <text x="402" y="122" textAnchor="middle" fontSize="9" fill="#fef3c7">以人为本</text>
      <text x="402" y="140" textAnchor="middle" fontSize="9" fill="#fef3c7">所长制胜</text>
      <text x="402" y="160" textAnchor="middle" fontSize="8" fill="#fef3c7">人才维度</text>

      <rect x="478" y="76" width="140" height="96" rx="8" fill="url(#eex-cl-4)" opacity="0.9" />
      <text x="548" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">要事优先</text>
      <text x="548" y="122" textAnchor="middle" fontSize="9" fill="#d1fae5">集中专注</text>
      <text x="548" y="140" textAnchor="middle" fontSize="9" fill="#d1fae5">敢于取舍</text>
      <text x="548" y="160" textAnchor="middle" fontSize="8" fill="#d1fae5">执行维度</text>

      <rect x="624" y="76" width="136" height="96" rx="8" fill="url(#eex-cl-4)" opacity="0.9" />
      <text x="692" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">有效决策</text>
      <text x="692" y="122" textAnchor="middle" fontSize="9" fill="#d1fae5">判断取舍</text>
      <text x="692" y="140" textAnchor="middle" fontSize="9" fill="#d1fae5">面向行动</text>
      <text x="692" y="160" textAnchor="middle" fontSize="8" fill="#d1fae5">核心能力</text>

      {/* 箭头汇向中心 */}
      <path d="M110 172 L110 196 L400 196 L400 220" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#eex-cl-arrow)" />
      <path d="M256 172 L256 196 L400 196" stroke="#64748b" strokeWidth="2" fill="none" />
      <path d="M402 172 L402 220" stroke="#64748b" strokeWidth="2" fill="none" />
      <path d="M548 172 L548 196 L400 196" stroke="#64748b" strokeWidth="2" fill="none" />
      <path d="M692 172 L692 196 L400 196" stroke="#64748b" strokeWidth="2" fill="none" />

      <rect x="300" y="220" width="200" height="56" rx="10" fill="url(#eex-cl-2)" opacity="0.9" />
      <text x="400" y="244" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">有效性的整体</text>
      <text x="400" y="264" textAnchor="middle" fontSize="9" fill="#ede9fe">把所长转化为贡献</text>

      {/* 组织型社会的需要 */}
      <text x="400" y="306" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">有效性的社会意义</text>

      <rect x="40" y="320" width="235" height="120" rx="8" fill="url(#eex-cl-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="157" y="344" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">组织型社会</text>
      <text x="157" y="366" textAnchor="middle" fontSize="9" fill="#475569">现代社会由各类组织构成</text>
      <text x="157" y="384" textAnchor="middle" fontSize="9" fill="#475569">组织的绩效决定社会绩效</text>
      <text x="157" y="402" textAnchor="middle" fontSize="9" fill="#475569">管理者的有效性</text>
      <text x="157" y="420" textAnchor="middle" fontSize="9" fill="#0369a1">= 社会的根本需要</text>

      <rect x="283" y="320" width="235" height="120" rx="8" fill="url(#eex-cl-3)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="344" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">知识工作者</text>
      <text x="400" y="366" textAnchor="middle" fontSize="9" fill="#475569">知识工作无法被严密监督</text>
      <text x="400" y="384" textAnchor="middle" fontSize="9" fill="#475569">只能靠自己驱动</text>
      <text x="400" y="402" textAnchor="middle" fontSize="9" fill="#475569">有效性是知识工作</text>
      <text x="400" y="420" textAnchor="middle" fontSize="9" fill="#d97706">者的核心责任</text>

      <rect x="526" y="320" width="234" height="120" rx="8" fill="url(#eex-cl-4)" opacity="0.1" stroke="#10b981" strokeWidth="1.5" />
      <text x="643" y="344" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">自我发展</text>
      <text x="643" y="366" textAnchor="middle" fontSize="9" fill="#475569">要求高标准激发向上</text>
      <text x="643" y="384" textAnchor="middle" fontSize="9" fill="#475569">关注贡献带来成长</text>
      <text x="643" y="402" textAnchor="middle" fontSize="9" fill="#475569">既成就自己也</text>
      <text x="643" y="420" textAnchor="middle" fontSize="9" fill="#059669">成就组织与他人</text>

      {/* 底部：管理者之道 */}
      <rect x="40" y="456" width="720" height="100" rx="8" fill="url(#eex-cl-2)" opacity="0.08" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="480" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7c3aed">管理者之道：把所长转化为贡献</text>
      <text x="400" y="502" textAnchor="middle" fontSize="10" fill="#475569">有效性使管理者能充分发挥自己的所长，无论那是什么</text>
      <text x="400" y="520" textAnchor="middle" fontSize="10" fill="#475569">它让个人的长处通过组织转化为对社会有价值的成果</text>
      <text x="400" y="542" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">这五项习惯必须学会——它们是任何人都可以掌握的</text>
    </svg>
  );
}
