"use client";

export function CrvCareerGrowthDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="程序员职业成长路线与能力矩阵图">
      <defs>
        <linearGradient id="crv-cg-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="crv-cg-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="crv-cg-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="crv-cg-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="crv-cg-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="crv-cg-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">职业成长：技术人之路</text>

      {/* 职业阶段阶梯 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">职业成长阶梯</text>

      <rect x="30" y="74" width="140" height="80" rx="8" fill="url(#crv-cg-1)" opacity="0.9" />
      <text x="100" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">初级</text>
      <text x="100" y="120" textAnchor="middle" fontSize="9" fill="#e0f2fe">0-3 年</text>
      <text x="100" y="136" textAnchor="middle" fontSize="9" fill="#e0f2fe">打好基础</text>
      <text x="100" y="150" textAnchor="middle" fontSize="9" fill="#e0f2fe">能独立完成模块</text>

      <path d="M170 114 L194 114" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-cg-arrow)" />

      <rect x="198" y="74" width="140" height="80" rx="8" fill="url(#crv-cg-2)" opacity="0.9" />
      <text x="268" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">中级</text>
      <text x="268" y="120" textAnchor="middle" fontSize="9" fill="#f3e8ff">3-5 年</text>
      <text x="268" y="136" textAnchor="middle" fontSize="9" fill="#f3e8ff">深入某领域</text>
      <text x="268" y="150" textAnchor="middle" fontSize="9" fill="#f3e8ff">能设计子系统</text>

      <path d="M338 114 L362 114" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-cg-arrow)" />

      <rect x="366" y="74" width="140" height="80" rx="8" fill="url(#crv-cg-3)" opacity="0.9" />
      <text x="436" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">高级</text>
      <text x="436" y="120" textAnchor="middle" fontSize="9" fill="#dcfce7">5-8 年</text>
      <text x="436" y="136" textAnchor="middle" fontSize="9" fill="#dcfce7">技术深度</text>
      <text x="436" y="150" textAnchor="middle" fontSize="9" fill="#dcfce7">能架构系统</text>

      <path d="M506 114 L530 114" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-cg-arrow)" />

      <rect x="534" y="74" width="140" height="80" rx="8" fill="url(#crv-cg-4)" opacity="0.9" />
      <text x="604" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">专家</text>
      <text x="604" y="120" textAnchor="middle" fontSize="9" fill="#fef9c3">8 年以上</text>
      <text x="604" y="136" textAnchor="middle" fontSize="9" fill="#fef9c3">领域权威</text>
      <text x="604" y="150" textAnchor="middle" fontSize="9" fill="#fef9c3">技术决策</text>

      <path d="M674 114 L698 114" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-cg-arrow)" />

      <rect x="702" y="74" width="68" height="80" rx="8" fill="url(#crv-cg-5)" opacity="0.9" />
      <text x="736" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">架构师</text>
      <text x="736" y="120" textAnchor="middle" fontSize="9" fill="#fee2e2">全局视野</text>
      <text x="736" y="136" textAnchor="middle" fontSize="9" fill="#fee2e2">技术+管理</text>

      {/* 能力矩阵 */}
      <text x="400" y="184" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心能力矩阵</text>

      <rect x="30" y="196" width="180" height="120" rx="10" fill="url(#crv-cg-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="120" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">技术深度</text>
      <text x="120" y="242" textAnchor="middle" fontSize="10" fill="#475569">编程语言精通</text>
      <text x="120" y="258" textAnchor="middle" fontSize="10" fill="#475569">框架原理理解</text>
      <text x="120" y="274" textAnchor="middle" fontSize="10" fill="#475569">底层机制掌握</text>
      <text x="120" y="290" textAnchor="middle" fontSize="10" fill="#475569">性能调优能力</text>
      <text x="120" y="306" textAnchor="middle" fontSize="10" fill="#475569">源码阅读分析</text>

      <rect x="225" y="196" width="180" height="120" rx="10" fill="url(#crv-cg-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="315" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">系统思维</text>
      <text x="315" y="242" textAnchor="middle" fontSize="10" fill="#475569">架构设计能力</text>
      <text x="315" y="258" textAnchor="middle" fontSize="10" fill="#475569">全链路分析</text>
      <text x="315" y="274" textAnchor="middle" fontSize="10" fill="#475569">权衡取舍判断</text>
      <text x="315" y="290" textAnchor="middle" fontSize="10" fill="#475569">技术选型决策</text>
      <text x="315" y="306" textAnchor="middle" fontSize="10" fill="#475569">复杂度管理</text>

      <rect x="420" y="196" width="180" height="120" rx="10" fill="url(#crv-cg-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="510" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">工程素养</text>
      <text x="510" y="242" textAnchor="middle" fontSize="10" fill="#475569">代码质量意识</text>
      <text x="510" y="258" textAnchor="middle" fontSize="10" fill="#475569">测试驱动习惯</text>
      <text x="510" y="274" textAnchor="middle" fontSize="10" fill="#475569">文档编写能力</text>
      <text x="510" y="290" textAnchor="middle" fontSize="10" fill="#475569">版本管理规范</text>
      <text x="510" y="306" textAnchor="middle" fontSize="10" fill="#475569">持续集成实践</text>

      <rect x="615" y="196" width="155" height="120" rx="10" fill="url(#crv-cg-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="692" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill="#a16207">软技能</text>
      <text x="692" y="242" textAnchor="middle" fontSize="10" fill="#475569">沟通协作</text>
      <text x="692" y="258" textAnchor="middle" fontSize="10" fill="#475569">技术表达</text>
      <text x="692" y="274" textAnchor="middle" fontSize="10" fill="#475569">项目管理</text>
      <text x="692" y="290" textAnchor="middle" fontSize="10" fill="#475569">团队影响</text>
      <text x="692" y="306" textAnchor="middle" fontSize="10" fill="#475569">持续学习</text>

      {/* 成长路径 */}
      <text x="400" y="344" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">双轨成长路径</text>

      <rect x="30" y="356" width="370" height="80" rx="10" fill="url(#crv-cg-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="215" y="380" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">技术专家路线</text>
      <text x="215" y="400" textAnchor="middle" fontSize="10" fill="#475569">初级 → 中级 → 高级 → 资深 → 首席</text>
      <text x="215" y="416" textAnchor="middle" fontSize="10" fill="#475569">深耕技术领域，成为不可替代的专家</text>
      <text x="215" y="432" textAnchor="middle" fontSize="10" fill="#475569">适合：热爱钻研、享受技术深度的人</text>

      <rect x="410" y="356" width="360" height="80" rx="10" fill="url(#crv-cg-5)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="590" y="380" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">技术管理路线</text>
      <text x="590" y="400" textAnchor="middle" fontSize="10" fill="#475569">初级 → 组长 → 经理 → 总监 → CTO</text>
      <text x="590" y="416" textAnchor="middle" fontSize="10" fill="#475569">从管事到管人，放大技术影响力</text>
      <text x="590" y="432" textAnchor="middle" fontSize="10" fill="#475569">适合：善于沟通、愿意带队的人</text>

      {/* 学习方法 */}
      <text x="400" y="462" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">高效学习方法</text>

      <rect x="30" y="474" width="148" height="68" rx="8" fill="url(#crv-cg-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="104" y="498" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">费曼学习法</text>
      <text x="104" y="516" textAnchor="middle" fontSize="9" fill="#475569">用教的方式学</text>
      <text x="104" y="532" textAnchor="middle" fontSize="9" fill="#475569">输出倒逼输入</text>

      <rect x="190" y="474" width="148" height="68" rx="8" fill="url(#crv-cg-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="264" y="498" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">刻意练习</text>
      <text x="264" y="516" textAnchor="middle" fontSize="9" fill="#475569">跳出舒适区</text>
      <text x="264" y="532" textAnchor="middle" fontSize="9" fill="#475569">有反馈地重复</text>

      <rect x="350" y="474" width="148" height="68" rx="8" fill="url(#crv-cg-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="424" y="498" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">项目驱动</text>
      <text x="424" y="516" textAnchor="middle" fontSize="9" fill="#475569">做真实项目</text>
      <text x="424" y="532" textAnchor="middle" fontSize="9" fill="#475569">解决真实问题</text>

      <rect x="510" y="474" width="148" height="68" rx="8" fill="url(#crv-cg-4)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="584" y="498" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">阅读源码</text>
      <text x="584" y="516" textAnchor="middle" fontSize="9" fill="#475569">站在巨人肩上</text>
      <text x="584" y="532" textAnchor="middle" fontSize="9" fill="#475569">理解优秀设计</text>

      <rect x="670" y="474" width="100" height="68" rx="8" fill="url(#crv-cg-5)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="720" y="498" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">技术写作</text>
      <text x="720" y="516" textAnchor="middle" fontSize="9" fill="#475569">整理沉淀</text>
      <text x="720" y="532" textAnchor="middle" fontSize="9" fill="#475569">建立影响</text>

      <rect x="30" y="552" width="740" height="22" rx="6" fill="url(#crv-cg-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="567" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">核心：技术深度 + 系统思维 + 工程素养 + 软技能——四维均衡成长</text>
    </svg>
  );
}
