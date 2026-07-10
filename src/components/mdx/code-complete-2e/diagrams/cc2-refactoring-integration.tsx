"use client";

export function Cc2RefactoringIntegrationDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="重构与集成：重构策略与集成方式">
      <defs>
        <linearGradient id="cc2-ri-ref" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="cc2-ri-int" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="cc2-ri-ci" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="cc2-ri-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">重构与集成</text>

      {/* 重构原因 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">重构的原因与时机</text>

      <rect x="30" y="74" width="180" height="80" rx="8" fill="url(#cc2-ri-ref)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="120" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">代码重复</text>
      <text x="120" y="116" textAnchor="middle" fontSize="8" fill="#475569">相同逻辑多处出现</text>
      <text x="120" y="130" textAnchor="middle" fontSize="8" fill="#475569">修改需同步多处</text>
      <text x="120" y="148" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ca8a04">提取公共方法</text>

      <rect x="220" y="74" width="180" height="80" rx="8" fill="url(#cc2-ri-ref)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="310" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">函数过长</text>
      <text x="310" y="116" textAnchor="middle" fontSize="8" fill="#475569">超百行难理解</text>
      <text x="310" y="130" textAnchor="middle" fontSize="8" fill="#475569">职责不单一</text>
      <text x="310" y="148" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ca8a04">拆分小函数</text>

      <rect x="410" y="74" width="180" height="80" rx="8" fill="url(#cc2-ri-ref)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="500" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">深层嵌套</text>
      <text x="500" y="116" textAnchor="middle" fontSize="8" fill="#475569">圈复杂度过高</text>
      <text x="500" y="130" textAnchor="middle" fontSize="8" fill="#475569">认知负担大</text>
      <text x="500" y="148" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ca8a04">用卫语句扁平化</text>

      <rect x="600" y="74" width="170" height="80" rx="8" fill="url(#cc2-ri-ref)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="685" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">类设计差</text>
      <text x="685" y="116" textAnchor="middle" fontSize="8" fill="#475569">高耦合低内聚</text>
      <text x="685" y="130" textAnchor="middle" fontSize="8" fill="#475569">接口不清晰</text>
      <text x="685" y="148" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ca8a04">重新设计接口</text>

      {/* 重构策略 */}
      <text x="400" y="180" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">重构策略与方法</text>

      <rect x="30" y="194" width="145" height="80" rx="8" fill="url(#cc2-ri-ref)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="102" y="216" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">数据级重构</text>
      <text x="102" y="236" textAnchor="middle" fontSize="8" fill="#475569">用常量替代魔法数</text>
      <text x="102" y="250" textAnchor="middle" fontSize="8" fill="#475569">重命名变量</text>
      <text x="102" y="264" textAnchor="middle" fontSize="8" fill="#475569">简化表达式</text>

      <rect x="185" y="194" width="145" height="80" rx="8" fill="url(#cc2-ri-ref)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="257" y="216" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">语句级重构</text>
      <text x="257" y="236" textAnchor="middle" fontSize="8" fill="#475569">分解布尔表达式</text>
      <text x="257" y="250" textAnchor="middle" fontSize="8" fill="#475569">用卫语句替代嵌套</text>
      <text x="257" y="264" textAnchor="middle" fontSize="8" fill="#475569">简化控制流</text>

      <rect x="340" y="194" width="145" height="80" rx="8" fill="url(#cc2-ri-ref)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="412" y="216" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">函数级重构</text>
      <text x="412" y="236" textAnchor="middle" fontSize="8" fill="#475569">提取/内联函数</text>
      <text x="412" y="250" textAnchor="middle" fontSize="8" fill="#475569">移动函数到合适类</text>
      <text x="412" y="264" textAnchor="middle" fontSize="8" fill="#475569">参数对象化</text>

      <rect x="495" y="194" width="145" height="80" rx="8" fill="url(#cc2-ri-ref)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="567" y="216" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">类级重构</text>
      <text x="567" y="236" textAnchor="middle" fontSize="8" fill="#475569">提取/内联类</text>
      <text x="567" y="250" textAnchor="middle" fontSize="8" fill="#475569">隐藏委托</text>
      <text x="567" y="264" textAnchor="middle" fontSize="8" fill="#475569">用多态替代条件</text>

      <rect x="650" y="194" width="120" height="80" rx="8" fill="url(#cc2-ri-ref)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="710" y="216" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">系统级重构</text>
      <text x="710" y="236" textAnchor="middle" fontSize="8" fill="#475569">引入设计模式</text>
      <text x="710" y="250" textAnchor="middle" fontSize="8" fill="#475569">重新划分子系统</text>
      <text x="710" y="264" textAnchor="middle" fontSize="8" fill="#475569">大规模重组</text>

      {/* 集成方式 */}
      <text x="400" y="300" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">集成方式对比</text>

      <rect x="30" y="314" width="370" height="130" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="215" y="336" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">分阶段集成（传统）</text>
      <text x="215" y="356" textAnchor="middle" fontSize="9" fill="#475569">先开发所有模块再集成</text>
      <text x="215" y="374" textAnchor="middle" fontSize="9" fill="#475569">集成在项目后期一次性进行</text>
      <text x="215" y="392" textAnchor="middle" fontSize="9" fill="#475569">问题集中爆发难定位</text>
      <text x="215" y="410" textAnchor="middle" fontSize="9" fill="#475569">风险推迟到最后</text>
      <text x="215" y="436" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">不推荐：风险高、问题难定位</text>

      <rect x="410" y="314" width="360" height="130" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="590" y="336" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">增量式集成（推荐）</text>
      <text x="590" y="356" textAnchor="middle" fontSize="9" fill="#475569">小块开发小块集成</text>
      <text x="590" y="374" textAnchor="middle" fontSize="9" fill="#475569">每次集成少量代码</text>
      <text x="590" y="392" textAnchor="middle" fontSize="9" fill="#475569">问题早期暴露易定位</text>
      <text x="590" y="410" textAnchor="middle" fontSize="9" fill="#475569">持续验证系统可运行</text>
      <text x="590" y="436" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">推荐：风险分散、反馈快速</text>

      {/* 持续集成 */}
      <text x="400" y="470" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">持续集成核心实践</text>

      <rect x="30" y="484" width="145" height="56" rx="8" fill="url(#cc2-ri-ci)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="102" y="504" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">频繁集成</text>
      <text x="102" y="522" textAnchor="middle" fontSize="8" fill="#475569">每天至少一次</text>

      <rect x="185" y="484" width="145" height="56" rx="8" fill="url(#cc2-ri-ci)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="257" y="504" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">自动化构建</text>
      <text x="257" y="522" textAnchor="middle" fontSize="8" fill="#475569">一键编译打包</text>

      <rect x="340" y="484" width="145" height="56" rx="8" fill="url(#cc2-ri-ci)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="412" y="504" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">自动化测试</text>
      <text x="412" y="522" textAnchor="middle" fontSize="8" fill="#475569">每次构建运行</text>

      <rect x="495" y="484" width="145" height="56" rx="8" fill="url(#cc2-ri-ci)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="567" y="504" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">构建管线</text>
      <text x="567" y="522" textAnchor="middle" fontSize="8" fill="#475569">编译+测试+部署</text>

      <rect x="650" y="484" width="120" height="56" rx="8" fill="url(#cc2-ri-ci)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="710" y="504" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">快速反馈</text>
      <text x="710" y="522" textAnchor="middle" fontSize="8" fill="#475569">分钟级回归</text>

      {/* 底部总结 */}
      <rect x="30" y="552" width="740" height="22" rx="8" fill="url(#cc2-ri-int)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="568" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">重构改善设计 + 增量集成降低风险 + 持续集成保证质量 = 可演进的代码库</text>
    </svg>
  );
}
