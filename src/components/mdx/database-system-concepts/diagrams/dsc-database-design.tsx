"use client";

export function DscDatabaseDesignDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="数据库设计与ER模型到范式">
      <defs>
        <linearGradient id="dsc-dd-er" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dsc-dd-nf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="dsc-dd-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">数据库设计 · ER模型 → 规范化</text>

      {/* ER 模型 */}
      <text x="200" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">ER 模型三要素</text>

      <rect x="40" y="70" width="110" height="60" rx="8" fill="url(#dsc-dd-er)" />
      <text x="95" y="95" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">实体</text>
      <text x="95" y="115" textAnchor="middle" fontSize="11" fill="#fef3c7">矩形 Entity</text>

      <rect x="170" y="70" width="110" height="60" rx="8" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="225" y="95" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">属性</text>
      <text x="225" y="115" textAnchor="middle" fontSize="11" fill="#92400e">椭圆 Attribute</text>

      <rect x="300" y="70" width="110" height="60" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="355" y="95" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">联系</text>
      <text x="355" y="115" textAnchor="middle" fontSize="11" fill="#92400e">菱形 Relationship</text>

      <text x="225" y="155" textAnchor="middle" fontSize="11" fill="#64748b">联系基数：1:1 ｜ 1:N ｜ M:N</text>
      <text x="225" y="173" textAnchor="middle" fontSize="11" fill="#64748b">弱实体：依赖强实体存在，无独立主码</text>

      {/* 映射规则 */}
      <rect x="40" y="190" width="370" height="90" rx="10" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.5" />
      <text x="225" y="213" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e7490">ER → 关系模式转换规则</text>
      <text x="225" y="235" textAnchor="middle" fontSize="11" fill="#155e75">① 强实体 → 独立关系，主码继承</text>
      <text x="225" y="253" textAnchor="middle" fontSize="11" fill="#155e75">② 1:N 联系 → N 端加外码</text>
      <text x="225" y="271" textAnchor="middle" fontSize="11" fill="#155e75">③ M:N 联系 → 新建关系（含两端主码）</text>

      {/* 规范化阶梯 */}
      <text x="600" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e7490">规范化 Normalization</text>

      <rect x="450" y="70" width="80" height="50" rx="6" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="490" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">1NF</text>
      <text x="490" y="110" textAnchor="middle" fontSize="10" fill="#155e75">原子值</text>

      <rect x="545" y="70" width="80" height="50" rx="6" fill="#a5f3fc" stroke="#0891b2" strokeWidth="1.5" />
      <text x="585" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">2NF</text>
      <text x="585" y="110" textAnchor="middle" fontSize="10" fill="#155e75">无部分依赖</text>

      <rect x="640" y="70" width="80" height="50" rx="6" fill="#67e8f9" stroke="#0891b2" strokeWidth="1.5" />
      <text x="680" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">3NF</text>
      <text x="680" y="110" textAnchor="middle" fontSize="10" fill="#155e75">无传递依赖</text>

      <rect x="735" y="70" width="45" height="50" rx="6" fill="url(#dsc-dd-nf)" />
      <text x="757" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">BCNF</text>
      <text x="757" y="110" textAnchor="middle" fontSize="9" fill="#cffafe">主属性无依赖</text>

      <path d="M530 95 L545 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#dsc-dd-arrow)" />
      <path d="M625 95 L640 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#dsc-dd-arrow)" />
      <path d="M720 95 L735 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#dsc-dd-arrow)" />

      {/* 函数依赖 */}
      <rect x="450" y="140" width="330" height="140" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="615" y="163" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">函数依赖 FD：X → Y</text>
      <text x="615" y="185" textAnchor="middle" fontSize="11" fill="#78350f">X 决定 Y：相同 X 值必有相同 Y 值</text>
      <text x="615" y="207" textAnchor="middle" fontSize="11" fill="#78350f">部分依赖：X 的真子集决定 Y（违反2NF）</text>
      <text x="615" y="229" textAnchor="middle" fontSize="11" fill="#78350f">传递依赖：X→Y, Y→Z, Y↛X（违反3NF）</text>
      <text x="615" y="251" textAnchor="middle" fontSize="11" fill="#78350f">BCNF：所有非平凡FD中 X 必含候选码</text>
      <text x="615" y="271" textAnchor="middle" fontSize="11" fill="#92400e">规范化 = 逐步消除不良函数依赖</text>

      {/* 反范式 */}
      <rect x="40" y="300" width="370" height="60" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="225" y="323" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">反范式 Denormalization</text>
      <text x="225" y="345" textAnchor="middle" fontSize="11" fill="#6d28d9">为读性能牺牲冗余：以空间换时间，需权衡一致性代价</text>

      {/* 设计流程 */}
      <rect x="40" y="380" width="740" height="160" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="404" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">数据库设计全流程</text>
      <text x="400" y="428" textAnchor="middle" fontSize="11" fill="#475569">① 需求分析 → ② 概念设计（ER图）→ ③ 逻辑设计（转关系模式 + 规范化）</text>
      <text x="400" y="448" textAnchor="middle" fontSize="11" fill="#475569">→ ④ 物理设计（索引/存储结构）→ ⑤ 实现与调优</text>
      <text x="400" y="478" textAnchor="middle" fontSize="11" fill="#0e7490">目标：消除冗余、避免插入/更新/删除异常、保持依赖</text>
      <text x="400" y="500" textAnchor="middle" fontSize="11" fill="#92400e">异常：插入异常（缺主码无法插）｜更新异常（改一处漏多处）｜删除异常（删一行丢信息）</text>
      <text x="400" y="522" textAnchor="middle" fontSize="11" fill="#64748b">范式越高冗余越少但连接越多；实际常止于 3NF/BCNF，按读负载适度反范式</text>
    </svg>
  );
}
