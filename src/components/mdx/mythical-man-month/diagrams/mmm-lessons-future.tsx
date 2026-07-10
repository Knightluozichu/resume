"use client";

export function MmmLessonsFutureDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="经验总结与未来展望示意图">
      <defs>
        <linearGradient id="mmm-lf-lesson" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="mmm-lf-future" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="mmm-lf-revisit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="mmm-lf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">经验总结与未来展望</text>

      {/* 上部：20年后的回顾 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Brooks 20年后的回顾：哪些坚持，哪些修正</text>

      {/* 坚持的观点 */}
      <rect x="40" y="74" width="350" height="200" rx="10" fill="url(#mmm-lf-revisit)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <rect x="40" y="74" width="350" height="34" rx="10" fill="url(#mmm-lf-revisit)" opacity="0.9" />
      <text x="215" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">仍然坚持的观点</text>

      <text x="60" y="128" fontSize="10" fill="#475569">- 人月是神话：人力不可线性替换时间</text>
      <text x="60" y="146" fontSize="10" fill="#475569">- Brooks 定律：加人只会更延迟</text>
      <text x="60" y="164" fontSize="10" fill="#475569">- 概念完整性是系统设计的核心</text>
      <text x="60" y="182" fontSize="10" fill="#475569">- 外科手术队伍优于民主分工</text>
      <text x="60" y="200" fontSize="10" fill="#475569">- 第二系统效应是真实危险</text>
      <text x="60" y="218" fontSize="10" fill="#475569">- 文档驱动沟通不可省略</text>
      <text x="60" y="236" fontSize="10" fill="#475569">- 没有银弹：本质复杂性不可消除</text>
      <text x="60" y="260" fontSize="10" fontWeight="600" fill="#15803d">→ 这些洞见经受住了时间考验</text>

      {/* 修正的观点 */}
      <rect x="410" y="74" width="350" height="200" rx="10" fill="url(#mmm-lf-lesson)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <rect x="410" y="74" width="350" height="34" rx="10" fill="url(#mmm-lf-lesson)" opacity="0.9" />
      <text x="585" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">修正与补充的观点</text>

      <text x="430" y="128" fontSize="10" fill="#475569">- 瀑布模型过于刚性 → 迭代增量更好</text>
      <text x="430" y="146" fontSize="10" fill="#475569">- 完整的设计前应先做可丢弃原型</text>
      <text x="430" y="164" fontSize="10" fill="#475569">- 信息隐藏比瀑布更有利于设计</text>
      <text x="430" y="182" fontSize="10" fill="#475569">- 面向对象编程是有力的抽象工具</text>
      <text x="430" y="200" fontSize="10" fill="#475569">- 从「构建」到「生长」的范式转变</text>
      <text x="430" y="218" fontSize="10" fill="#475569">- 需求不确定性必须用迭代应对</text>
      <text x="430" y="236" fontSize="10" fill="#475569">- 人的因素比工具更重要</text>
      <text x="430" y="260" fontSize="10" fontWeight="600" fill="#a16207">→ 实践证明需要更灵活的方法</text>

      {/* 中部：经验总结要点 */}
      <text x="400" y="294" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">项目成功的核心经验</text>

      <rect x="40" y="306" width="170" height="70" rx="8" fill="url(#mmm-lf-lesson)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="125" y="330" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">进度管理</text>
      <text x="125" y="348" textAnchor="middle" fontSize="9" fill="#475569">1/3 设计 + 1/6 编码</text>
      <text x="125" y="362" textAnchor="middle" fontSize="9" fill="#475569">1/4 测试 + 1/4 系统测试</text>

      <rect x="225" y="306" width="170" height="70" rx="8" fill="url(#mmm-lf-lesson)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="310" y="330" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">团队组织</text>
      <text x="310" y="348" textAnchor="middle" fontSize="9" fill="#475569">概念完整性优先</text>
      <text x="310" y="362" textAnchor="middle" fontSize="9" fill="#475569">专业化分工</text>

      <rect x="410" y="306" width="170" height="70" rx="8" fill="url(#mmm-lf-lesson)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="495" y="330" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">架构设计</text>
      <text x="495" y="348" textAnchor="middle" fontSize="9" fill="#475569">显式架构师角色</text>
      <text x="495" y="362" textAnchor="middle" fontSize="9" fill="#475569">分离设计与实现</text>

      <rect x="595" y="306" width="165" height="70" rx="8" fill="url(#mmm-lf-lesson)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="677" y="330" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">风险控制</text>
      <text x="677" y="348" textAnchor="middle" fontSize="9" fill="#475569">警惕第二系统</text>
      <text x="677" y="362" textAnchor="middle" fontSize="9" fill="#475569">保持范围纪律</text>

      {/* 底部：未来展望 */}
      <text x="400" y="400" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">软件工程的未来方向</text>

      <rect x="40" y="412" width="350" height="80" rx="8" fill="url(#mmm-lf-future)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="215" y="434" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">技术趋势</text>
      <text x="60" y="456" fontSize="9" fill="#475569">- 面向对象 → 面向组件 → 微服务</text>
      <text x="60" y="472" fontSize="9" fill="#475569">- 敏捷迭代取代瀑布，持续集成/部署</text>
      <text x="60" y="486" fontSize="9" fill="#475569">- AI 辅助编程、自动测试、代码生成</text>

      <rect x="410" y="412" width="350" height="80" rx="8" fill="url(#mmm-lf-future)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="585" y="434" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">不变的本质</text>
      <text x="430" y="456" fontSize="9" fill="#475569">- 人月神话的本质不会改变</text>
      <text x="430" y="472" fontSize="9" fill="#475569">- 沟通成本和概念完整性始终关键</text>
      <text x="430" y="486" fontSize="9" fill="#475569">- 优秀设计者和良好架构永远重要</text>

      {/* 底部总结 */}
      <rect x="40" y="500" width="720" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="520" textAnchor="middle" fontSize="11" fill="#475569">工具和方法不断进步，但软件工程的根本困难始终存在</text>

      <rect x="40" y="542" width="720" height="28" rx="8" fill="url(#mmm-lf-future)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心理念：拥抱变化，但尊重不变的软件工程定律</text>
    </svg>
  );
}
