"use client";

export function CrvOopDataDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="面向对象四大特性与数据结构图">
      <defs>
        <linearGradient id="crv-od-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="crv-od-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="crv-od-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="crv-od-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="crv-od-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">面向对象与数据结构</text>

      {/* OOP 四大特性 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">OOP 四大特性</text>

      <rect x="30" y="74" width="180" height="120" rx="10" fill="url(#crv-od-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="120" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">封装</text>
      <text x="120" y="120" textAnchor="middle" fontSize="10" fill="#475569">隐藏内部实现</text>
      <text x="120" y="136" textAnchor="middle" fontSize="10" fill="#475569">暴露公共接口</text>
      <text x="120" y="152" textAnchor="middle" fontSize="10" fill="#475569">数据与行为绑定</text>
      <text x="120" y="168" textAnchor="middle" fontSize="10" fill="#475569">访问控制保护</text>
      <rect x="70" y="176" width="100" height="14" rx="4" fill="#0ea5e9" opacity="0.2" />
      <text x="120" y="187" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">Encapsulation</text>

      <rect x="230" y="74" width="180" height="120" rx="10" fill="url(#crv-od-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="320" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7e22ce">继承</text>
      <text x="320" y="120" textAnchor="middle" fontSize="10" fill="#475569">子类复用父类</text>
      <text x="320" y="136" textAnchor="middle" fontSize="10" fill="#475569">is-a 关系链</text>
      <text x="320" y="152" textAnchor="middle" fontSize="10" fill="#475569">代码复用扩展</text>
      <text x="320" y="168" textAnchor="middle" fontSize="10" fill="#475569">层次化设计</text>
      <rect x="270" y="176" width="100" height="14" rx="4" fill="#9333ea" opacity="0.2" />
      <text x="320" y="187" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">Inheritance</text>

      <rect x="430" y="74" width="180" height="120" rx="10" fill="url(#crv-od-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="520" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">多态</text>
      <text x="520" y="120" textAnchor="middle" fontSize="10" fill="#475569">同一接口多实现</text>
      <text x="520" y="136" textAnchor="middle" fontSize="10" fill="#475569">运行时动态绑定</text>
      <text x="520" y="152" textAnchor="middle" fontSize="10" fill="#475569">替换原则</text>
      <text x="520" y="168" textAnchor="middle" fontSize="10" fill="#475569">解耦调用与实现</text>
      <rect x="470" y="176" width="100" height="14" rx="4" fill="#16a34a" opacity="0.2" />
      <text x="520" y="187" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">Polymorphism</text>

      <rect x="630" y="74" width="140" height="120" rx="10" fill="url(#crv-od-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="700" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#a16207">抽象</text>
      <text x="700" y="120" textAnchor="middle" fontSize="10" fill="#475569">提取共性特征</text>
      <text x="700" y="136" textAnchor="middle" fontSize="10" fill="#475569">接口定义契约</text>
      <text x="700" y="152" textAnchor="middle" fontSize="10" fill="#475569">忽略无关细节</text>
      <text x="700" y="168" textAnchor="middle" fontSize="10" fill="#475569">面向接口编程</text>
      <rect x="660" y="176" width="80" height="14" rx="4" fill="#ca8a04" opacity="0.2" />
      <text x="700" y="187" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">Abstraction</text>

      {/* 数据结构 */}
      <text x="400" y="224" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心数据结构</text>

      <rect x="30" y="236" width="150" height="90" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="105" y="260" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">数组</text>
      <text x="105" y="278" textAnchor="middle" fontSize="9" fill="#475569">连续内存</text>
      <text x="105" y="294" textAnchor="middle" fontSize="9" fill="#475569">O(1) 随机访问</text>
      <text x="105" y="310" textAnchor="middle" fontSize="9" fill="#475569">插入删除 O(n)</text>

      <rect x="195" y="236" width="150" height="90" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="270" y="260" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">链表</text>
      <text x="270" y="278" textAnchor="middle" fontSize="9" fill="#475569">离散节点</text>
      <text x="270" y="294" textAnchor="middle" fontSize="9" fill="#475569">O(1) 插入删除</text>
      <text x="270" y="310" textAnchor="middle" fontSize="9" fill="#475569">随机访问 O(n)</text>

      <rect x="360" y="236" width="150" height="90" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="435" y="260" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">哈希表</text>
      <text x="435" y="278" textAnchor="middle" fontSize="9" fill="#475569">键值映射</text>
      <text x="435" y="294" textAnchor="middle" fontSize="9" fill="#475569">O(1) 平均查找</text>
      <text x="435" y="310" textAnchor="middle" fontSize="9" fill="#475569">哈希冲突处理</text>

      <rect x="525" y="236" width="150" height="90" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="600" y="260" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">树</text>
      <text x="600" y="278" textAnchor="middle" fontSize="9" fill="#475569">层次结构</text>
      <text x="600" y="294" textAnchor="middle" fontSize="9" fill="#475569">O(log n) 查找</text>
      <text x="600" y="310" textAnchor="middle" fontSize="9" fill="#475569">有序遍历</text>

      <path d="M380 326 L380 330" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-od-arrow)" />

      {/* 类与对象关系 */}
      <text x="400" y="354" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">类与对象的关系</text>

      <rect x="100" y="366" width="200" height="80" rx="8" fill="url(#crv-od-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="200" y="390" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">类——蓝图/模板</text>
      <text x="200" y="408" textAnchor="middle" fontSize="10" fill="#475569">属性定义</text>
      <text x="200" y="424" textAnchor="middle" fontSize="10" fill="#475569">方法定义</text>
      <text x="200" y="440" textAnchor="middle" fontSize="10" fill="#475569">不占运行时内存</text>

      <path d="M300 406 L380 406" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-od-arrow)" />
      <text x="340" y="398" textAnchor="middle" fontSize="9" fill="#64748b">实例化</text>

      <rect x="384" y="366" width="200" height="80" rx="8" fill="url(#crv-od-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="484" y="390" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">对象——实例</text>
      <text x="484" y="408" textAnchor="middle" fontSize="10" fill="#475569">具体数据值</text>
      <text x="484" y="424" textAnchor="middle" fontSize="10" fill="#475569">堆中分配</text>
      <text x="484" y="440" textAnchor="middle" fontSize="10" fill="#475569">引用指向内存</text>

      <path d="M584 406 L640 406" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-od-arrow)" />

      <rect x="644" y="366" width="120" height="80" rx="8" fill="url(#crv-od-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="704" y="390" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">引用</text>
      <text x="704" y="408" textAnchor="middle" fontSize="10" fill="#475569">栈上存储</text>
      <text x="704" y="424" textAnchor="middle" fontSize="10" fill="#475569">指向对象地址</text>
      <text x="704" y="440" textAnchor="middle" fontSize="10" fill="#475569">值传递语义</text>

      {/* 底部总结 */}
      <rect x="30" y="464" width="740" height="44" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="484" textAnchor="middle" fontSize="10" fill="#475569">封装隐藏细节 / 继承复用代码 / 多态动态绑定 / 抽象定义契约</text>
      <text x="400" y="500" textAnchor="middle" fontSize="10" fill="#475569">数据结构决定算法效率——选对结构事半功倍</text>

      <rect x="30" y="520" width="740" height="28" rx="8" fill="url(#crv-od-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="538" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">核心：封装 → 继承 → 多态 → 抽象——OOP 四大支柱与数据组织</text>
    </svg>
  );
}
