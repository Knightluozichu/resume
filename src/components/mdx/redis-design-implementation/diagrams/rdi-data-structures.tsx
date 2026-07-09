"use client";

export function RdiDataStructuresDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Redis六种底层数据结构">
      <defs>
        <linearGradient id="rdi-ds-grad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc382d" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="rdi-ds-grad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="rdi-ds-grad3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="rdi-ds-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Redis 六种底层数据结构</text>

      {/* SDS */}
      <rect x="20" y="50" width="240" height="130" rx="10" fill="url(#rdi-ds-grad1)" opacity="0.95" />
      <text x="140" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">SDS 简单动态字符串</text>
      <line x1="35" y1="85" x2="245" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="140" y="105" textAnchor="middle" fontSize="11" fill="#fecaca">len / free / buf[]</text>
      <text x="140" y="125" textAnchor="middle" fontSize="10" fill="#fca5a5">O(1) 取长度 · 二进制安全</text>
      <text x="140" y="145" textAnchor="middle" fontSize="10" fill="#fca5a5">空间预分配 · 惰性释放</text>
      <text x="140" y="167" textAnchor="middle" fontSize="10" fill="#fda4a4">兼容 C 字符串函数</text>

      {/* 链表 */}
      <rect x="280" y="50" width="240" height="130" rx="10" fill="url(#rdi-ds-grad2)" opacity="0.95" />
      <text x="400" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">adlist 双端链表</text>
      <line x1="295" y1="85" x2="505" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="400" y="105" textAnchor="middle" fontSize="11" fill="#cffafe">head / tail / len</text>
      <text x="400" y="125" textAnchor="middle" fontSize="10" fill="#a5f3fc">双端 · 无环 · 带表头表尾指针</text>
      <text x="400" y="145" textAnchor="middle" fontSize="10" fill="#a5f3fc">O(1) 头尾增删 · 多态(void*)</text>
      <text x="400" y="167" textAnchor="middle" fontSize="10" fill="#67e8f9">用于列表键 / 发布订阅</text>

      {/* 字典 */}
      <rect x="540" y="50" width="240" height="130" rx="10" fill="url(#rdi-ds-grad3)" opacity="0.95" />
      <text x="660" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">dict 字典（哈希表）</text>
      <line x1="555" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="660" y="105" textAnchor="middle" fontSize="11" fill="#ede9fe">ht[0] / ht[1] / rehashidx</text>
      <text x="660" y="125" textAnchor="middle" fontSize="10" fill="#ddd6fe">MurmurHash2 · 链地址法</text>
      <text x="660" y="145" textAnchor="middle" fontSize="10" fill="#ddd6fe">渐进式 rehash · 负载因子</text>
      <text x="660" y="167" textAnchor="middle" fontSize="10" fill="#c4b5fd">用于哈希键 / 数据库键空间</text>

      {/* 跳跃表 */}
      <rect x="20" y="200" width="240" height="130" rx="10" fill="url(#rdi-ds-grad2)" opacity="0.90" />
      <text x="140" y="225" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">skiplist 跳跃表</text>
      <line x1="35" y1="235" x2="245" y2="235" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="140" y="255" textAnchor="middle" fontSize="11" fill="#cffafe">header / tail / level / length</text>
      <text x="140" y="275" textAnchor="middle" fontSize="10" fill="#a5f3fc">多层链表 · 概率层数(p=0.25)</text>
      <text x="140" y="295" textAnchor="middle" fontSize="10" fill="#a5f3fc">O(logN) 查找/插入/删除</text>
      <text x="140" y="317" textAnchor="middle" fontSize="10" fill="#67e8f9">用于有序集合节点</text>

      {/* 整数集合 */}
      <rect x="280" y="200" width="240" height="130" rx="10" fill="url(#rdi-ds-grad1)" opacity="0.85" />
      <text x="400" y="225" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">intset 整数集合</text>
      <line x1="295" y1="235" x2="505" y2="235" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="400" y="255" textAnchor="middle" fontSize="11" fill="#fecaca">encoding / length / contents[]</text>
      <text x="400" y="275" textAnchor="middle" fontSize="10" fill="#fca5a5">有序 · 无重复 · 升级不降级</text>
      <text x="400" y="295" textAnchor="middle" fontSize="10" fill="#fca5a5">int16 → int32 → int64</text>
      <text x="400" y="317" textAnchor="middle" fontSize="10" fill="#fda4a4">用于只含整数的小型集合</text>

      {/* 压缩列表 */}
      <rect x="540" y="200" width="240" height="130" rx="10" fill="url(#rdi-ds-grad3)" opacity="0.85" />
      <text x="660" y="225" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">ziplist 压缩列表</text>
      <line x1="555" y1="235" x2="765" y2="235" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="660" y="255" textAnchor="middle" fontSize="11" fill="#ede9fe">zlbytes / zltail / zllen / entries</text>
      <text x="660" y="275" textAnchor="middle" fontSize="10" fill="#ddd6fe">连续内存 · 前驱后继长度</text>
      <text x="660" y="295" textAnchor="middle" fontSize="10" fill="#ddd6fe">节约内存 · 级联更新</text>
      <text x="660" y="317" textAnchor="middle" fontSize="10" fill="#c4b5fd">用于小型 hash/list/zset</text>

      {/* 复杂度对比 */}
      <text x="400" y="360" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">操作复杂度对比</text>

      <rect x="20" y="375" width="760" height="190" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="140" y="400" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc382d">SDS</text>
      <text x="140" y="420" textAnchor="middle" fontSize="10" fill="#475569">取长度: O(1)</text>
      <text x="140" y="438" textAnchor="middle" fontSize="10" fill="#475569">追加: O(1) 摊还</text>
      <text x="140" y="456" textAnchor="middle" fontSize="10" fill="#475569">修改: O(N)</text>

      <text x="340" y="400" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0891b2">链表 / 跳跃表</text>
      <text x="340" y="420" textAnchor="middle" fontSize="10" fill="#475569">头尾增删: O(1)</text>
      <text x="340" y="438" textAnchor="middle" fontSize="10" fill="#475569">跳跃表查找: O(logN)</text>
      <text x="340" y="456" textAnchor="middle" fontSize="10" fill="#475569">范围操作: O(logN+M)</text>

      <text x="560" y="400" textAnchor="middle" fontSize="12" fontWeight="700" fill="#8b5cf6">字典</text>
      <text x="560" y="420" textAnchor="middle" fontSize="10" fill="#475569">增删改查: O(1) 均摊</text>
      <text x="560" y="438" textAnchor="middle" fontSize="10" fill="#475569">rehash: 渐进式分摊</text>
      <text x="560" y="456" textAnchor="middle" fontSize="10" fill="#475569">最坏: O(N)</text>

      <text x="400" y="490" textAnchor="middle" fontSize="11" fill="#64748b">设计哲学：Redis 为每种场景选择最合适的底层数据结构，通过「对象系统」在用户侧统一接口</text>
      <text x="400" y="510" textAnchor="middle" fontSize="11" fill="#64748b">小数据用 ziplist/intset 节约内存（指针开销 &gt; 数据本身）</text>
      <text x="400" y="530" textAnchor="middle" fontSize="11" fill="#64748b">大数据用 hashtable/skiplist 保证性能（O(1)/O(logN) 操作复杂度）</text>
      <text x="400" y="550" textAnchor="middle" fontSize="11" fill="#64748b">编码转换由阈值触发（hash-max-ziplist-entries 等），对用户透明</text>
    </svg>
  );
}
