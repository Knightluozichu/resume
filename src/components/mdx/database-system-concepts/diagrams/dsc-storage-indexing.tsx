"use client";

export function DscStorageIndexingDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="存储与索引结构">
      <defs>
        <linearGradient id="dsc-si-head" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dsc-si-btree" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="dsc-si-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">存储与索引 · 结构总览</text>

      {/* 存储层次 */}
      <text x="200" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#6d28d9">存储层次</text>
      <rect x="40" y="70" width="130" height="40" rx="6" fill="#ede9fe" stroke="#8b5cf6" />
      <text x="105" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">文件 File</text>
      <text x="105" y="104" textAnchor="middle" fontSize="10" fill="#6d28d9">逻辑单元</text>
      <rect x="180" y="70" width="130" height="40" rx="6" fill="#c4b5fd" stroke="#8b5cf6" />
      <text x="245" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">页 Page/Block</text>
      <text x="245" y="104" textAnchor="middle" fontSize="10" fill="#ede9fe">磁盘IO单位</text>
      <rect x="320" y="70" width="130" height="40" rx="6" fill="url(#dsc-si-head)" />
      <text x="385" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">记录 Record/Tuple</text>
      <text x="385" y="104" textAnchor="middle" fontSize="10" fill="#ede9fe">行数据</text>
      <path d="M170 90 L180 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#dsc-si-arrow)" />
      <path d="M310 90 L320 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#dsc-si-arrow)" />

      <text x="245" y="135" textAnchor="middle" fontSize="11" fill="#64748b">定长记录 / 变长记录 ｜ 文件组织：堆/顺序/散列/聚簇</text>

      {/* B+ 树 */}
      <text x="200" y="170" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e7490">B+ 树索引</text>
      <rect x="150" y="185" width="30" height="28" rx="4" fill="url(#dsc-si-btree)" />
      <rect x="190" y="185" width="30" height="28" rx="4" fill="url(#dsc-si-btree)" />
      <rect x="230" y="185" width="30" height="28" rx="4" fill="url(#dsc-si-btree)" />
      <text x="205" y="204" textAnchor="middle" fontSize="10" fill="#cffafe">根节点（内部）</text>

      <line x1="165" y1="213" x2="120" y2="240" stroke="#64748b" strokeWidth="1.5" />
      <line x1="205" y1="213" x2="205" y2="240" stroke="#64748b" strokeWidth="1.5" />
      <line x1="245" y1="213" x2="290" y2="240" stroke="#64748b" strokeWidth="1.5" />
      <rect x="95" y="240" width="50" height="28" rx="4" fill="#67e8f9" stroke="#0891b2" />
      <rect x="180" y="240" width="50" height="28" rx="4" fill="#67e8f9" stroke="#0891b2" />
      <rect x="265" y="240" width="50" height="28" rx="4" fill="#67e8f9" stroke="#0891b2" />
      <text x="205" y="259" textAnchor="middle" fontSize="10" fill="#155e75">内部节点（仅存键+指针）</text>

      <line x1="120" y1="268" x2="120" y2="290" stroke="#64748b" strokeWidth="1.5" />
      <line x1="205" y1="268" x2="205" y2="290" stroke="#64748b" strokeWidth="1.5" />
      <line x1="290" y1="268" x2="290" y2="290" stroke="#64748b" strokeWidth="1.5" />
      <rect x="95" y="290" width="50" height="26" rx="4" fill="#fef3c7" stroke="#f59e0b" />
      <rect x="180" y="290" width="50" height="26" rx="4" fill="#fef3c7" stroke="#f59e0b" />
      <rect x="265" y="290" width="50" height="26" rx="4" fill="#fef3c7" stroke="#f59e0b" />
      <text x="205" y="307" textAnchor="middle" fontSize="10" fill="#92400e">叶子节点（存数据/指针，链表相连）</text>

      <text x="205" y="335" textAnchor="middle" fontSize="11" fill="#0e7490">特点：矮胖平衡、范围查询高效、所有数据在叶</text>
      <text x="205" y="353" textAnchor="middle" fontSize="11" fill="#64748b">查找 O(log n)；叶节点链表支持顺序范围扫描</text>

      {/* 索引类型对比 */}
      <text x="600" y="170" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">索引类型对比</text>
      <rect x="450" y="185" width="310" height="40" rx="6" fill="#ecfeff" stroke="#0891b2" />
      <text x="605" y="203" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">B+ 树</text>
      <text x="605" y="219" textAnchor="middle" fontSize="10" fill="#155e75">点查询+范围查询 ｜ 有序 ｜ 最通用</text>

      <rect x="450" y="235" width="310" height="40" rx="6" fill="#fef3c7" stroke="#f59e0b" />
      <text x="605" y="253" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">散列索引 Hash</text>
      <text x="605" y="269" textAnchor="middle" fontSize="10" fill="#78350f">仅点查询 O(1) ｜ 无序 ｜ 不支持范围</text>

      <rect x="450" y="285" width="310" height="40" rx="6" fill="#ede9fe" stroke="#8b5cf6" />
      <text x="605" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">位图索引 Bitmap</text>
      <text x="605" y="319" textAnchor="middle" fontSize="10" fill="#6d28d9">低基数列 ｜ 压缩 ｜ 适合性别/状态</text>

      <rect x="450" y="335" width="310" height="40" rx="6" fill="#d1fae5" stroke="#10b981" />
      <text x="605" y="353" textAnchor="middle" fontSize="12" fontWeight="700" fill="#059669">聚簇索引 Clustered</text>
      <text x="605" y="369" textAnchor="middle" fontSize="10" fill="#047857">数据按索引键物理排序 ｜ 一表一个</text>

      {/* 缓冲区 */}
      <rect x="40" y="400" width="720" height="140" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="423" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">缓冲区管理 Buffer Manager</text>
      <text x="400" y="446" textAnchor="middle" fontSize="11" fill="#475569">磁盘页按需读入内存缓冲区；替换策略 LRU / MRU / Clock</text>
      <text x="400" y="466" textAnchor="middle" fontSize="11" fill="#475569">命中则免 IO，未命中则读盘并可能写回脏页</text>
      <text x="400" y="494" textAnchor="middle" fontSize="11" fill="#0e7490">索引选择原则：高选择性列建 B+ 树；查询模式决定索引类型</text>
      <text x="400" y="514" textAnchor="middle" fontSize="11" fill="#92400e">代价：索引加速查询但拖慢写（需维护索引）｜ 覆盖索引可免回表</text>
      <text x="400" y="532" textAnchor="middle" fontSize="11" fill="#64748b">稠密索引（每记录一指针）vs 稀疏索引（仅每页一指针，需有序）</text>
    </svg>
  );
}
