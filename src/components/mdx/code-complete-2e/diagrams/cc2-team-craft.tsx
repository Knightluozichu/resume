"use client";

export function Cc2TeamCraftDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="团队协作与工艺：代码布局与团队实践">
      <defs>
        <linearGradient id="cc2-tc-layout" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="cc2-tc-comment" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="cc2-tc-team" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="cc2-tc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">团队协作与工艺</text>

      {/* 代码布局与风格 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">代码布局与风格</text>

      <rect x="30" y="74" width="175" height="90" rx="8" fill="url(#cc2-tc-layout)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="117" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7e22ce">布局目的</text>
      <text x="117" y="116" textAnchor="middle" fontSize="8" fill="#475569">准确表达逻辑结构</text>
      <text x="117" y="130" textAnchor="middle" fontSize="8" fill="#475569">一致展现代码组织</text>
      <text x="117" y="144" textAnchor="middle" fontSize="8" fill="#475569">改善可读性</text>
      <text x="117" y="158" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">降低维护成本</text>

      <rect x="215" y="74" width="175" height="90" rx="8" fill="url(#cc2-tc-layout)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="302" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7e22ce">空白使用</text>
      <text x="302" y="116" textAnchor="middle" fontSize="8" fill="#475569">空行分隔逻辑块</text>
      <text x="302" y="130" textAnchor="middle" fontSize="8" fill="#475569">空格对齐参数</text>
      <text x="302" y="144" textAnchor="middle" fontSize="8" fill="#475569">缩进体现代码层次</text>
      <text x="302" y="158" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">空白 = 视觉分组</text>

      <rect x="400" y="74" width="175" height="90" rx="8" fill="url(#cc2-tc-layout)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="487" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7e22ce">括号风格</text>
      <text x="487" y="116" textAnchor="middle" fontSize="8" fill="#475569">团队统一约定</text>
      <text x="487" y="130" textAnchor="middle" fontSize="8" fill="#475569">不可混用多种风格</text>
      <text x="487" y="144" textAnchor="middle" fontSize="8" fill="#475569">工具自动格式化</text>
      <text x="487" y="158" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">一致性最重要</text>

      <rect x="585" y="74" width="185" height="90" rx="8" fill="url(#cc2-tc-layout)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="677" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7e22ce">续行处理</text>
      <text x="677" y="116" textAnchor="middle" fontSize="8" fill="#475569">长行合理折断</text>
      <text x="677" y="130" textAnchor="middle" fontSize="8" fill="#475569">在运算符后换行</text>
      <text x="677" y="144" textAnchor="middle" fontSize="8" fill="#475569">对齐续行内容</text>
      <text x="677" y="158" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">清晰表达意图</text>

      {/* 注释实践 */}
      <text x="400" y="190" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">注释实践</text>

      <rect x="30" y="204" width="175" height="90" rx="8" fill="url(#cc2-tc-comment)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="117" y="226" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">好的注释</text>
      <text x="117" y="246" textAnchor="middle" fontSize="8" fill="#475569">解释为什么这样做</text>
      <text x="117" y="260" textAnchor="middle" fontSize="8" fill="#475569">总结代码意图</text>
      <text x="117" y="274" textAnchor="middle" fontSize="8" fill="#475569">标记限制和约束</text>
      <text x="117" y="288" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">补充代码不能说的</text>

      <rect x="215" y="204" width="175" height="90" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="302" y="226" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">坏的注释</text>
      <text x="302" y="246" textAnchor="middle" fontSize="8" fill="#475569">重复代码已表达的</text>
      <text x="302" y="260" textAnchor="middle" fontSize="8" fill="#475569">过时的注释</text>
      <text x="302" y="274" textAnchor="middle" fontSize="8" fill="#475569">注释掉的代码</text>
      <text x="302" y="288" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">浪费读者注意力</text>

      <rect x="400" y="204" width="175" height="90" rx="8" fill="url(#cc2-tc-comment)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="487" y="226" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">注释类型</text>
      <text x="487" y="246" textAnchor="middle" fontSize="8" fill="#475569">文件头注释</text>
      <text x="487" y="260" textAnchor="middle" fontSize="8" fill="#475569">函数接口注释</text>
      <text x="487" y="274" textAnchor="middle" fontSize="8" fill="#475569">实现内注释</text>
      <text x="487" y="288" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">不同层级不同信息</text>

      <rect x="585" y="204" width="185" height="90" rx="8" fill="url(#cc2-tc-comment)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="677" y="226" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">注释哲学</text>
      <text x="677" y="246" textAnchor="middle" fontSize="8" fill="#475569">好代码自解释</text>
      <text x="677" y="260" textAnchor="middle" fontSize="8" fill="#475569">注释是补充而非替代</text>
      <text x="677" y="274" textAnchor="middle" fontSize="8" fill="#475569">先改代码再改注释</text>
      <text x="677" y="288" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">代码为主注释为辅</text>

      {/* 团队开发实践 */}
      <text x="400" y="318" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">团队开发实践</text>

      <rect x="30" y="332" width="175" height="90" rx="8" fill="url(#cc2-tc-team)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="117" y="354" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">编程标准</text>
      <text x="117" y="374" textAnchor="middle" fontSize="8" fill="#475569">统一命名/布局</text>
      <text x="117" y="388" textAnchor="middle" fontSize="8" fill="#475569">统一错误处理</text>
      <text x="117" y="402" textAnchor="middle" fontSize="8" fill="#475569">统一设计模式</text>
      <text x="117" y="416" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">一致性 = 质量</text>

      <rect x="215" y="332" width="175" height="90" rx="8" fill="url(#cc2-tc-team)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="302" y="354" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">配置管理</text>
      <text x="302" y="374" textAnchor="middle" fontSize="8" fill="#475569">版本控制系统</text>
      <text x="302" y="388" textAnchor="middle" fontSize="8" fill="#475569">变更追踪</text>
      <text x="302" y="402" textAnchor="middle" fontSize="8" fill="#475569">分支管理策略</text>
      <text x="302" y="416" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">可追溯可回滚</text>

      <rect x="400" y="332" width="175" height="90" rx="8" fill="url(#cc2-tc-team)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="487" y="354" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">结对编程</text>
      <text x="487" y="374" textAnchor="middle" fontSize="8" fill="#475569">两人一台机器</text>
      <text x="487" y="388" textAnchor="middle" fontSize="8" fill="#475569">驱动者 + 导航者</text>
      <text x="487" y="402" textAnchor="middle" fontSize="8" fill="#475569">实时审查</text>
      <text x="487" y="416" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">知识共享</text>

      <rect x="585" y="332" width="185" height="90" rx="8" fill="url(#cc2-tc-team)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="677" y="354" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">集成开发</text>
      <text x="677" y="374" textAnchor="middle" fontSize="8" fill="#475569">每日构建</text>
      <text x="677" y="388" textAnchor="middle" fontSize="8" fill="#475569">冒烟测试</text>
      <text x="677" y="402" textAnchor="middle" fontSize="8" fill="#475569">持续集成</text>
      <text x="677" y="416" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">快速反馈</text>

      {/* 工艺精神 */}
      <text x="400" y="446" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">编程工艺精神</text>

      <rect x="30" y="460" width="175" height="56" rx="8" fill="url(#cc2-tc-layout)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="117" y="480" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">工匠心态</text>
      <text x="117" y="498" textAnchor="middle" fontSize="8" fill="#475569">对代码质量负责</text>

      <rect x="215" y="460" width="175" height="56" rx="8" fill="url(#cc2-tc-layout)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="302" y="480" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">持续改进</text>
      <text x="302" y="498" textAnchor="middle" fontSize="8" fill="#475569">不断学习与反思</text>

      <rect x="400" y="460" width="175" height="56" rx="8" fill="url(#cc2-tc-layout)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="487" y="480" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">度量意识</text>
      <text x="487" y="498" textAnchor="middle" fontSize="8" fill="#475569">用数据指导改进</text>

      <rect x="585" y="460" width="185" height="56" rx="8" fill="url(#cc2-tc-layout)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="677" y="480" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">谦逊态度</text>
      <text x="677" y="498" textAnchor="middle" fontSize="8" fill="#475569">承认缺陷接受反馈</text>

      {/* 底部总结 */}
      <rect x="30" y="528" width="740" height="46" rx="8" fill="url(#cc2-tc-team)" opacity="0.08" stroke="#16a34a" strokeWidth="2" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">编程 = 工艺 + 工程 + 协作</text>
      <text x="400" y="566" textAnchor="middle" fontSize="10" fill="#475569">好的布局/好的注释/好的标准/好的流程 = 可维护的代码库</text>
    </svg>
  );
}
