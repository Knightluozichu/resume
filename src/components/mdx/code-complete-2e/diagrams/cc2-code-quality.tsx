"use client";

export function Cc2CodeQualityDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="代码质量与测试：质量特征与防御式编程">
      <defs>
        <linearGradient id="cc2-cq-attr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="cc2-cq-def" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="cc2-cq-test" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <marker id="cc2-cq-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">代码质量与测试</text>

      {/* 软件质量特征 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">软件质量特征</text>

      <rect x="30" y="74" width="145" height="66" rx="8" fill="url(#cc2-cq-attr)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="102" y="94" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">外部特征</text>
      <text x="102" y="112" textAnchor="middle" fontSize="8" fill="#475569">用户可见质量</text>
      <text x="102" y="126" textAnchor="middle" fontSize="8" fill="#475569">正确性/可用性</text>
      <text x="102" y="136" textAnchor="middle" fontSize="8" fill="#475569">效率/可靠性</text>

      <rect x="185" y="74" width="145" height="66" rx="8" fill="url(#cc2-cq-test)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="257" y="94" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">内部特征</text>
      <text x="257" y="112" textAnchor="middle" fontSize="8" fill="#475569">开发者可见质量</text>
      <text x="257" y="126" textAnchor="middle" fontSize="8" fill="#475569">可维护性/可移植</text>
      <text x="257" y="136" textAnchor="middle" fontSize="8" fill="#475569">可读性/可测试</text>

      <rect x="340" y="74" width="145" height="66" rx="8" fill="url(#cc2-cq-attr)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="412" y="94" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">正确性</text>
      <text x="412" y="112" textAnchor="middle" fontSize="8" fill="#475569">行为符合规范</text>
      <text x="412" y="126" textAnchor="middle" fontSize="8" fill="#475569">无缺陷运行</text>
      <text x="412" y="136" textAnchor="middle" fontSize="8" fill="#475569">最重要的特征</text>

      <rect x="495" y="74" width="145" height="66" rx="8" fill="url(#cc2-cq-test)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="567" y="94" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">可维护性</text>
      <text x="567" y="112" textAnchor="middle" fontSize="8" fill="#475569">易于修改修改</text>
      <text x="567" y="126" textAnchor="middle" fontSize="8" fill="#475569">修改不引入缺陷</text>
      <text x="567" y="136" textAnchor="middle" fontSize="8" fill="#475569">长期成本关键</text>

      <rect x="650" y="74" width="120" height="66" rx="8" fill="url(#cc2-cq-attr)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="710" y="94" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">可读性</text>
      <text x="710" y="112" textAnchor="middle" fontSize="8" fill="#475569">代码易懂</text>
      <text x="710" y="126" textAnchor="middle" fontSize="8" fill="#475569">人读多于机器</text>
      <text x="710" y="136" textAnchor="middle" fontSize="8" fill="#475569">可维护性基础</text>

      {/* 防御式编程 */}
      <text x="400" y="168" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">防御式编程</text>

      <rect x="30" y="182" width="180" height="110" rx="8" fill="url(#cc2-cq-def)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="120" y="204" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">断言</text>
      <text x="120" y="224" textAnchor="middle" fontSize="8" fill="#475569">验证前置条件</text>
      <text x="120" y="238" textAnchor="middle" fontSize="8" fill="#475569">验证后置条件</text>
      <text x="120" y="252" textAnchor="middle" fontSize="8" fill="#475569">不可变条件检查</text>
      <text x="120" y="266" textAnchor="middle" fontSize="8" fill="#475569">开发期启用</text>
      <text x="120" y="284" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">快速暴露错误</text>

      <rect x="220" y="182" width="180" height="110" rx="8" fill="url(#cc2-cq-def)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="310" y="204" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">错误处理</text>
      <text x="310" y="224" textAnchor="middle" fontSize="8" fill="#475569">返回错误码</text>
      <text x="310" y="238" textAnchor="middle" fontSize="8" fill="#475569">返回中性值</text>
      <text x="310" y="252" textAnchor="middle" fontSize="8" fill="#475569">返回上次有效值</text>
      <text x="310" y="266" textAnchor="middle" fontSize="8" fill="#475569">换用下一个数据</text>
      <text x="310" y="284" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">优雅降级</text>

      <rect x="410" y="182" width="180" height="110" rx="8" fill="url(#cc2-cq-def)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="500" y="204" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">异常处理</text>
      <text x="500" y="224" textAnchor="middle" fontSize="8" fill="#475569">用于真正异常</text>
      <text x="500" y="238" textAnchor="middle" fontSize="8" fill="#475569">非正常控制流</text>
      <text x="500" y="252" textAnchor="middle" fontSize="8" fill="#475569">在合适层捕获</text>
      <text x="500" y="266" textAnchor="middle" fontSize="8" fill="#475569">包含完整上下文</text>
      <text x="500" y="284" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">不要滥用异常</text>

      <rect x="600" y="182" width="170" height="110" rx="8" fill="url(#cc2-cq-def)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="685" y="204" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">隔离栏</text>
      <text x="685" y="224" textAnchor="middle" fontSize="8" fill="#475569">隔离可疑数据</text>
      <text x="685" y="238" textAnchor="middle" fontSize="8" fill="#475569">隔离不可信代码</text>
      <text x="685" y="252" textAnchor="middle" fontSize="8" fill="#475569">限制损坏传播</text>
      <text x="685" y="266" textAnchor="middle" fontSize="8" fill="#475569">防御性边界</text>
      <text x="685" y="284" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">限制故障范围</text>

      {/* 测试基础 */}
      <text x="400" y="320" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">测试基础与方法</text>

      <rect x="30" y="334" width="175" height="90" rx="8" fill="url(#cc2-cq-test)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="117" y="356" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">单元测试</text>
      <text x="117" y="376" textAnchor="middle" fontSize="8" fill="#475569">测试最小单元</text>
      <text x="117" y="390" textAnchor="middle" fontSize="8" fill="#475569">函数/方法级别</text>
      <text x="117" y="404" textAnchor="middle" fontSize="8" fill="#475569">开发者负责</text>
      <text x="117" y="418" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">最早最频繁</text>

      <rect x="215" y="334" width="175" height="90" rx="8" fill="url(#cc2-cq-test)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="302" y="356" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">组件测试</text>
      <text x="302" y="376" textAnchor="middle" fontSize="8" fill="#475569">测试类/模块</text>
      <text x="302" y="390" textAnchor="middle" fontSize="8" fill="#475569">多单元协作</text>
      <text x="302" y="404" textAnchor="middle" fontSize="8" fill="#475569">接口验证</text>
      <text x="302" y="418" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">集成层验证</text>

      <rect x="400" y="334" width="175" height="90" rx="8" fill="url(#cc2-cq-test)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="487" y="356" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">系统测试</text>
      <text x="487" y="376" textAnchor="middle" fontSize="8" fill="#475569">整体端到端</text>
      <text x="487" y="390" textAnchor="middle" fontSize="8" fill="#475569">验证完整行为</text>
      <text x="487" y="404" textAnchor="middle" fontSize="8" fill="#475569">独立测试团队</text>
      <text x="487" y="418" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">最终验证</text>

      <rect x="585" y="334" width="185" height="90" rx="8" fill="url(#cc2-cq-test)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="677" y="356" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">测试技术</text>
      <text x="677" y="376" textAnchor="middle" fontSize="8" fill="#475569">边界值/等价类</text>
      <text x="677" y="390" textAnchor="middle" fontSize="8" fill="#475569">路径覆盖/数据流</text>
      <text x="677" y="404" textAnchor="middle" fontSize="8" fill="#475569">错误猜测/随机</text>
      <text x="677" y="418" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">系统性方法</text>

      {/* 代码审查 */}
      <text x="400" y="452" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">代码审查与同行评审</text>

      <rect x="30" y="466" width="145" height="50" rx="8" fill="url(#cc2-cq-attr)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="102" y="486" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">审查目的</text>
      <text x="102" y="504" textAnchor="middle" fontSize="8" fill="#475569">发现缺陷 + 知识共享</text>

      <rect x="185" y="466" width="145" height="50" rx="8" fill="url(#cc2-cq-attr)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="257" y="486" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">审查方式</text>
      <text x="257" y="504" textAnchor="middle" fontSize="8" fill="#475569">走查/审查/结对编程</text>

      <rect x="340" y="466" width="145" height="50" rx="8" fill="url(#cc2-cq-attr)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="412" y="486" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">审查效果</text>
      <text x="412" y="504" textAnchor="middle" fontSize="8" fill="#475569">发现 60% 缺陷</text>

      <rect x="495" y="466" width="145" height="50" rx="8" fill="url(#cc2-cq-attr)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="567" y="486" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">最佳时机</text>
      <text x="567" y="504" textAnchor="middle" fontSize="8" fill="#475569">构建后立即审查</text>

      <rect x="650" y="466" width="120" height="50" rx="8" fill="url(#cc2-cq-attr)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="710" y="486" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">审查清单</text>
      <text x="710" y="504" textAnchor="middle" fontSize="8" fill="#475569">结构性错误清单</text>

      {/* 底部总结 */}
      <rect x="30" y="532" width="740" height="38" rx="8" fill="url(#cc2-cq-test)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="552" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">质量 = 正确性 + 可维护性 + 可读性；防御式编程 + 系统测试 + 代码审查 = 质量三重保障</text>
      <text x="400" y="566" textAnchor="middle" fontSize="10" fill="#475569">越早发现缺陷成本越低；代码审查是最有效的质量保障手段</text>
    </svg>
  );
}
