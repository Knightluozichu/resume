"use client";

export function MmmNoSilverBulletDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="没有银弹软件本质复杂性示意图">
      <defs>
        <linearGradient id="mmm-nsb-essence" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="mmm-nsb-accident" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="mmm-nsb-attack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="mmm-nsb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">没有银弹：软件复杂性的本质与意外</text>

      {/* 顶部：银弹不可能 */}
      <rect x="200" y="50" width="400" height="46" rx="12" fill="url(#mmm-nsb-essence)" opacity="0.9" />
      <text x="400" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">「没有一种技术或管理上的创新</text>
      <text x="400" y="90" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">能让软件生产力在十年内提高一个数量级」</text>

      {/* 左侧：本质复杂性 */}
      <rect x="40" y="110" width="350" height="260" rx="10" fill="url(#mmm-nsb-essence)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <rect x="40" y="110" width="350" height="34" rx="10" fill="url(#mmm-nsb-essence)" opacity="0.9" />
      <text x="215" y="132" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">本质复杂性（Essence）</text>

      <text x="60" y="164" fontSize="11" fontWeight="600" fill="#b91c1c">不可消除的固有困难</text>

      <text x="60" y="190" fontSize="10" fill="#475569">- 复杂性：概念实体多，交互不可压缩</text>
      <text x="60" y="208" fontSize="10" fill="#475569">- 一致性：必须与外部环境接口适配</text>
      <text x="60" y="226" fontSize="10" fill="#475569">- 可变性：软件总是被要求不断修改</text>
      <text x="60" y="244" fontSize="10" fill="#475569">- 不可见性：软件结构无物理形态</text>

      <text x="60" y="276" fontSize="11" fontWeight="600" fill="#b91c1c">占总难度的约 4/5</text>
      <text x="60" y="298" fontSize="10" fill="#475569">这些困难是问题本身的属性</text>
      <text x="60" y="316" fontSize="10" fill="#475569">任何工具都无法消除它们</text>
      <text x="60" y="346" fontSize="10" fontWeight="600" fill="#b91c1c">→ 只能通过更好的抽象来管理</text>

      {/* 右侧：意外复杂性 */}
      <rect x="410" y="110" width="350" height="260" rx="10" fill="url(#mmm-nsb-accident)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <rect x="410" y="110" width="350" height="34" rx="10" fill="url(#mmm-nsb-accident)" opacity="0.9" />
      <text x="585" y="132" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">意外复杂性（Accident）</text>

      <text x="430" y="164" fontSize="11" fontWeight="600" fill="#0369a1">可被工具和方法消除的困难</text>

      <text x="430" y="190" fontSize="10" fill="#475569">- 语言局限：低级语言的笨拙</text>
      <text x="430" y="208" fontSize="10" fill="#475569">- 工具不足：调试、构建、版本控制</text>
      <text x="430" y="226" fontSize="10" fill="#475569">- 硬件限制：内存、速度、带宽</text>
      <text x="430" y="244" fontSize="10" fill="#475569">- 环境笨拙：操作系统接口、库</text>

      <text x="430" y="276" fontSize="11" fontWeight="600" fill="#0369a1">占总难度的约 1/5</text>
      <text x="430" y="298" fontSize="10" fill="#475569">高级语言、IDE、框架</text>
      <text x="430" y="316" fontSize="10" fill="#475569">已经大幅消除这部分困难</text>
      <text x="430" y="346" fontSize="10" fontWeight="600" fill="#0369a1">→ 边际收益递减</text>

      {/* 中部：进攻策略 */}
      <text x="400" y="394" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">应对本质复杂性的进攻策略</text>

      <rect x="40" y="406" width="170" height="80" rx="8" fill="url(#mmm-nsb-attack)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="125" y="428" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">购买 vs 构建</text>
      <text x="125" y="448" textAnchor="middle" fontSize="9" fill="#475569">复用现成组件</text>
      <text x="125" y="464" textAnchor="middle" fontSize="9" fill="#475569">避免重复造轮子</text>
      <text x="125" y="478" textAnchor="middle" fontSize="9" fill="#475569">减少本质复杂度</text>

      <rect x="225" y="406" width="170" height="80" rx="8" fill="url(#mmm-nsb-attack)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="310" y="428" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">需求精炼与快速原型</text>
      <text x="310" y="448" textAnchor="middle" fontSize="9" fill="#475569">迭代逼近真实需求</text>
      <text x="310" y="464" textAnchor="middle" fontSize="9" fill="#475569">用户参与反馈</text>
      <text x="310" y="478" textAnchor="middle" fontSize="9" fill="#475569">减少返工浪费</text>

      <rect x="410" y="406" width="170" height="80" rx="8" fill="url(#mmm-nsb-attack)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="495" y="428" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">增量开发</text>
      <text x="495" y="448" textAnchor="middle" fontSize="9" fill="#475569">自顶向下设计</text>
      <text x="495" y="464" textAnchor="middle" fontSize="9" fill="#475569">先骨架后填充</text>
      <text x="495" y="478" textAnchor="middle" fontSize="9" fill="#475569">持续可运行</text>

      <rect x="595" y="406" width="165" height="80" rx="8" fill="url(#mmm-nsb-attack)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="677" y="428" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">卓越的设计者</text>
      <text x="677" y="448" textAnchor="middle" fontSize="9" fill="#475569">人才是最关键的</text>
      <text x="677" y="464" textAnchor="middle" fontSize="9" fill="#475569">优秀设计者差异巨大</text>
      <text x="677" y="478" textAnchor="middle" fontSize="9" fill="#475569">培养与选拔并重</text>

      {/* 底部总结 */}
      <rect x="40" y="500" width="720" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="520" textAnchor="middle" fontSize="11" fill="#475569">银弹不存在不是因为技术不够好，而是因为本质复杂性不可压缩</text>

      <rect x="40" y="542" width="720" height="28" rx="8" fill="url(#mmm-nsb-essence)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">核心教训：接受没有银弹的现实，用渐进方法管理本质复杂性</text>
    </svg>
  );
}
