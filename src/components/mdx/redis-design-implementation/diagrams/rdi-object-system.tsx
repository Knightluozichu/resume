"use client";

export function RdiObjectSystemDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Redis对象系统与编码转换">
      <defs>
        <linearGradient id="rdi-obj-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="rdi-obj-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Redis 对象系统 · 5种类型与编码</text>

      {/* 5种对象类型 */}
      <text x="400" y="55" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">五种对象类型</text>

      <rect x="20" y="65" width="148" height="85" rx="8" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="94" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e7490">string</text>
      <text x="94" y="108" textAnchor="middle" fontSize="10" fill="#155e75">OBJ_STRING</text>
      <text x="94" y="128" textAnchor="middle" fontSize="10" fill="#155e75">int / embstr / raw</text>
      <text x="94" y="143" textAnchor="middle" fontSize="9" fill="#0e7490">字符串 / 计数器 / 缓存</text>

      <rect x="178" y="65" width="148" height="85" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="252" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">list</text>
      <text x="252" y="108" textAnchor="middle" fontSize="10" fill="#78350f">OBJ_LIST</text>
      <text x="252" y="128" textAnchor="middle" fontSize="10" fill="#78350f">ziplist / linkedlist</text>
      <text x="252" y="143" textAnchor="middle" fontSize="9" fill="#92400e">队列 / 栈 / 消息</text>

      <rect x="336" y="65" width="148" height="85" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="410" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">hash</text>
      <text x="410" y="108" textAnchor="middle" fontSize="10" fill="#5b21b6">OBJ_HASH</text>
      <text x="410" y="128" textAnchor="middle" fontSize="10" fill="#5b21b6">ziplist / hashtable</text>
      <text x="410" y="143" textAnchor="middle" fontSize="9" fill="#6d28d9">对象存储 / 字段映射</text>

      <rect x="494" y="65" width="148" height="85" rx="8" fill="#fee2e2" stroke="#dc382d" strokeWidth="1.5" />
      <text x="568" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b91c1c">set</text>
      <text x="568" y="108" textAnchor="middle" fontSize="10" fill="#991b1b">OBJ_SET</text>
      <text x="568" y="128" textAnchor="middle" fontSize="10" fill="#991b1b">intset / hashtable</text>
      <text x="568" y="143" textAnchor="middle" fontSize="9" fill="#b91c1c">去重 / 交并差集</text>

      <rect x="652" y="65" width="128" height="85" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="716" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">zset</text>
      <text x="716" y="108" textAnchor="middle" fontSize="10" fill="#14532d">OBJ_ZSET</text>
      <text x="716" y="128" textAnchor="middle" fontSize="9" fill="#14532d">ziplist / skiplist+dict</text>
      <text x="716" y="143" textAnchor="middle" fontSize="9" fill="#15803d">排行榜 / 范围查询</text>

      {/* 编码转换关系 */}
      <text x="400" y="180" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">编码转换（阈值触发，对用户透明）</text>

      {/* string 编码转换 */}
      <rect x="20" y="195" width="240" height="110" rx="8" fill="url(#rdi-obj-grad)" opacity="0.90" />
      <text x="140" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">string 编码转换</text>
      <text x="140" y="240" textAnchor="middle" fontSize="10" fill="#cffafe">整数 → int</text>
      <text x="140" y="258" textAnchor="middle" fontSize="10" fill="#cffafe">短字符串(≤44B) → embstr</text>
      <text x="140" y="276" textAnchor="middle" fontSize="10" fill="#cffafe">长字符串(&gt;44B) → raw</text>
      <text x="140" y="296" textAnchor="middle" fontSize="9" fill="#67e8f9">embstr 只读，修改后变 raw</text>

      {/* list/hash/zset 编码转换 */}
      <rect x="280" y="195" width="260" height="110" rx="8" fill="url(#rdi-obj-grad)" opacity="0.80" />
      <text x="410" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">list / hash / zset 编码转换</text>
      <text x="410" y="240" textAnchor="middle" fontSize="10" fill="#cffafe">小数据 → ziplist（节约内存）</text>
      <text x="410" y="258" textAnchor="middle" fontSize="10" fill="#cffafe">大数据 → linkedlist/hashtable/skiplist</text>
      <text x="410" y="278" textAnchor="middle" fontSize="9" fill="#a5f3fc">hash-max-ziplist-entries: 512</text>
      <text x="410" y="296" textAnchor="middle" fontSize="9" fill="#a5f3fc">hash-max-ziplist-value: 64</text>

      {/* set 编码转换 */}
      <rect x="560" y="195" width="220" height="110" rx="8" fill="url(#rdi-obj-grad)" opacity="0.70" />
      <text x="670" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">set 编码转换</text>
      <text x="670" y="240" textAnchor="middle" fontSize="10" fill="#cffafe">全整数 → intset</text>
      <text x="670" y="258" textAnchor="middle" fontSize="10" fill="#cffafe">含非整数 → hashtable</text>
      <text x="670" y="278" textAnchor="middle" fontSize="9" fill="#a5f3fc">set-max-intset-entries: 512</text>
      <text x="670" y="296" textAnchor="middle" fontSize="9" fill="#67e8f9">元素超限即升级编码</text>

      {/* zset 双结构 */}
      <text x="400" y="335" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">zset 的特殊设计：跳跃表 + 字典</text>

      <rect x="40" y="350" width="340" height="100" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="210" y="375" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">skiplist 跳跃表</text>
      <text x="210" y="395" textAnchor="middle" fontSize="10" fill="#14532d">按分值排序 · 范围查询 O(logN)</text>
      <text x="210" y="415" textAnchor="middle" fontSize="10" fill="#14532d">ZRANGE / ZRANGEBYSCORE</text>
      <text x="210" y="438" textAnchor="middle" fontSize="9" fill="#15803d">解决「按分值范围查找」</text>

      <rect x="420" y="350" width="340" height="100" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="590" y="375" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">dict 字典</text>
      <text x="590" y="395" textAnchor="middle" fontSize="10" fill="#155e75">成员 → 分值映射 · O(1) 查找</text>
      <text x="590" y="415" textAnchor="middle" fontSize="10" fill="#155e75">ZSCORE / ZRANK</text>
      <text x="590" y="438" textAnchor="middle" fontSize="9" fill="#0e7490">解决「按成员查分值」</text>

      {/* 对象共享与内存管理 */}
      <rect x="20" y="470" width="760" height="95" rx="10" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="400" y="493" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">对象内存管理</text>
      <text x="160" y="516" textAnchor="middle" fontSize="11" fill="#475569">引用计数 refcount</text>
      <text x="160" y="536" textAnchor="middle" fontSize="10" fill="#64748b">创建+1 / 共享+1 / 释放-1 → 0 回收</text>
      <text x="400" y="516" textAnchor="middle" fontSize="11" fill="#475569">对象共享</text>
      <text x="400" y="536" textAnchor="middle" fontSize="10" fill="#64748b">0-9999 整数预共享 · 节约内存</text>
      <text x="640" y="516" textAnchor="middle" fontSize="11" fill="#475569">LRU / LFU</text>
      <text x="640" y="536" textAnchor="middle" fontSize="10" fill="#64748b">空转时间 / 访问频率 → 淘汰策略</text>
      <text x="400" y="555" textAnchor="middle" fontSize="10" fill="#64748b">type + encoding + refcount + lru + ptr → redisObject 结构体</text>
    </svg>
  );
}
