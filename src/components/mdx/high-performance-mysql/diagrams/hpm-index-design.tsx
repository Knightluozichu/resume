"use client";

export function HpmIndexDesignDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="索引设计结构总览">
      <defs>
        <linearGradient id="hpm-idx-head" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="hpm-idx-btree" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="hpm-idx-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">索引设计 · 结构总览</text>

      {/* B+ 树结构 */}
      <text x="200" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e7490">InnoDB B+ 树索引</text>
      <rect x="150" y="70" width="40" height="28" rx="4" fill="url(#hpm-idx-btree)" />
      <rect x="195" y="70" width="40" height="28" rx="4" fill="url(#hpm-idx-btree)" />
      <rect x="240" y="70" width="40" height="28" rx="4" fill="url(#hpm-idx-btree)" />
      <text x="215" y="89" textAnchor="middle" fontSize="10" fill="#cffafe">根（内部节点）</text>

      <line x1="170" y1="98" x2="120" y2="125" stroke="#64748b" strokeWidth="1.5" />
      <line x1="215" y1="98" x2="215" y2="125" stroke="#64748b" strokeWidth="1.5" />
      <line x1="260" y1="98" x2="310" y2="125" stroke="#64748b" strokeWidth="1.5" />
      <rect x="95" y="125" width="50" height="26" rx="4" fill="#67e8f9" stroke="#0891b2" />
      <rect x="190" y="125" width="50" height="26" rx="4" fill="#67e8f9" stroke="#0891b2" />
      <rect x="285" y="125" width="50" height="26" rx="4" fill="#67e8f9" stroke="#0891b2" />
      <text x="215" y="143" textAnchor="middle" fontSize="10" fill="#155e75">内部节点（键+指针）</text>

      <line x1="120" y1="151" x2="120" y2="172" stroke="#64748b" strokeWidth="1.5" />
      <line x1="215" y1="151" x2="215" y2="172" stroke="#64748b" strokeWidth="1.5" />
      <line x1="310" y1="151" x2="310" y2="172" stroke="#64748b" strokeWidth="1.5" />
      <rect x="95" y="172" width="50" height="24" rx="4" fill="#fef3c7" stroke="#f59e0b" />
      <rect x="190" y="172" width="50" height="24" rx="4" fill="#fef3c7" stroke="#f59e0b" />
      <rect x="285" y="172" width="50" height="24" rx="4" fill="#fef3c7" stroke="#f59e0b" />
      <line x1="145" y1="184" x2="190" y2="184" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="240" y1="184" x2="285" y2="184" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
      <text x="215" y="190" textAnchor="middle" fontSize="9" fill="#92400e">叶子链表</text>

      <text x="215" y="215" textAnchor="middle" fontSize="11" fill="#0e7490">矮胖平衡：3-4 层存亿级数据，查找 O(log n)</text>
      <text x="215" y="233" textAnchor="middle" fontSize="11" fill="#64748b">叶子节点双向链表相连，支持高效范围扫描</text>

      {/* 聚簇 vs 二级索引 */}
      <text x="600" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">聚簇 vs 二级索引</text>

      <rect x="450" y="72" width="300" height="70" rx="6" fill="#d1fae5" stroke="#10b981" />
      <text x="600" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="#059669">聚簇索引 Clustered</text>
      <text x="600" y="110" textAnchor="middle" fontSize="10" fill="#047857">叶子节点直接存整行数据</text>
      <text x="600" y="126" textAnchor="middle" fontSize="10" fill="#047857">按主键物理排序，一表一个</text>
      <text x="600" y="140" textAnchor="middle" fontSize="10" fill="#059669">主键查询免回表</text>

      <rect x="450" y="150" width="300" height="70" rx="6" fill="#fee2e2" stroke="#ef4444" />
      <text x="600" y="170" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626">二级索引 Secondary</text>
      <text x="600" y="188" textAnchor="middle" fontSize="10" fill="#991b1b">叶子节点存主键值</text>
      <text x="600" y="204" textAnchor="middle" fontSize="10" fill="#991b1b">查非索引列需回表（两次 B+ 树）</text>
      <text x="600" y="218" textAnchor="middle" fontSize="10" fill="#dc2626">可建多个</text>

      <rect x="450" y="228" width="300" height="55" rx="6" fill="#dbeafe" stroke="#3b82f6" />
      <text x="600" y="248" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">覆盖索引 Covering</text>
      <text x="600" y="266" textAnchor="middle" fontSize="10" fill="#1e3a8a">索引含查询所有列 → 免回表</text>
      <text x="600" y="280" textAnchor="middle" fontSize="10" fill="#1e40af">Using index</text>

      {/* 索引策略 */}
      <rect x="40" y="260" width="400" height="35" rx="6" fill="#ecfdf5" stroke="#10b981" />
      <text x="240" y="282" textAnchor="middle" fontSize="11" fill="#047857">最左前缀：联合索引 (a,b,c) 可匹配 a / a,b / a,b,c</text>

      {/* 索引类型对比表 */}
      <text x="400" y="320" textAnchor="middle" fontSize="14" fontWeight="700" fill="#6d28d9">索引策略选择</text>

      <rect x="40" y="335" width="180" height="60" rx="6" fill="#fef3c7" stroke="#f59e0b" />
      <text x="130" y="355" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">高选择性列</text>
      <text x="130" y="373" textAnchor="middle" fontSize="10" fill="#78350f">用户ID / 订单号</text>
      <text x="130" y="388" textAnchor="middle" fontSize="10" fill="#92400e">建 B+ 树，过滤性强</text>

      <rect x="230" y="335" width="170" height="60" rx="6" fill="#fee2e2" stroke="#ef4444" />
      <text x="315" y="355" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">低基数列</text>
      <text x="315" y="373" textAnchor="middle" fontSize="10" fill="#991b1b">性别 / 状态</text>
      <text x="315" y="388" textAnchor="middle" fontSize="10" fill="#dc2626">单独建索引无效</text>

      <rect x="410" y="335" width="170" height="60" rx="6" fill="#ede9fe" stroke="#8b5cf6" />
      <text x="495" y="355" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">范围查询列</text>
      <text x="495" y="373" textAnchor="middle" fontSize="10" fill="#5b21b6">时间 / 价格</text>
      <text x="495" y="388" textAnchor="middle" fontSize="10" fill="#6d28d9">B+ 树叶子链表扫描</text>

      <rect x="590" y="335" width="170" height="60" rx="6" fill="#dbeafe" stroke="#3b82f6" />
      <text x="675" y="355" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">等值查询列</text>
      <text x="675" y="373" textAnchor="middle" fontSize="10" fill="#1e3a8a">哈希索引 / 自适应哈希</text>
      <text x="675" y="388" textAnchor="middle" fontSize="10" fill="#1e40af">O(1) 定位</text>

      {/* 三星索引 */}
      <rect x="40" y="410" width="720" height="130" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="433" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三星索引评价标准</text>
      <text x="400" y="456" textAnchor="middle" fontSize="11" fill="#475569">一星：索引把相关记录放在一起（有序，支持范围）</text>
      <text x="400" y="476" textAnchor="middle" fontSize="11" fill="#475569">二星：索引顺序与排序顺序一致（免 filesort）</text>
      <text x="400" y="496" textAnchor="middle" fontSize="11" fill="#475569">三星：索引包含查询所需所有列（覆盖索引，免回表）</text>
      <text x="400" y="522" textAnchor="middle" fontSize="11" fill="#6d28d9">索引代价：加速读但拖慢写（INSERT/UPDATE/DELETE 需维护索引）</text>
    </svg>
  );
}
