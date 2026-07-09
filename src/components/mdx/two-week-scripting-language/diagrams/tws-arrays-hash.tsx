"use client";

export function TwsArraysHashDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="数组与哈希表操作">
      <defs>
        <linearGradient id="tws-ah-arr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tws-ah-hash" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tws-ah-op" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tws-ah-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">数组与哈希表：集合类型与索引访问</text>

      {/* 数组 */}
      <text x="200" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">数组（Array）</text>

      <rect x="40" y="72" width="340" height="90" rx="10" fill="url(#tws-ah-arr)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="60" y="95" fontSize="11" fill="#475569" fontFamily="monospace">a = [10, 20, 30]</text>
      <text x="60" y="115" fontSize="11" fill="#475569" fontFamily="monospace">a[0]      // → 10</text>
      <text x="60" y="132" fontSize="11" fill="#475569" fontFamily="monospace">a[1] = 99 // 修改元素</text>
      <text x="60" y="149" fontSize="11" fill="#1e40af">底层：Java ArrayList，有序可变</text>

      {/* 哈希表 */}
      <text x="600" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">哈希表（Hash）</text>

      <rect x="420" y="72" width="340" height="90" rx="10" fill="url(#tws-ah-hash)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="440" y="95" fontSize="11" fill="#475569" fontFamily="monospace">h = &lbrace;&quot;name&quot;: &quot;Stone&quot;, &quot;ver&quot;: 1&rbrace;</text>
      <text x="440" y="115" fontSize="11" fill="#475569" fontFamily="monospace">h[&quot;name&quot;]  // → &quot;Stone&quot;</text>
      <text x="440" y="132" fontSize="11" fill="#475569" fontFamily="monospace">h[&quot;x&quot;] = 99 // 新增键值对</text>
      <text x="440" y="149" fontSize="11" fill="#5b21b6">底层：Java HashMap，键值映射</text>

      {/* 数组内部结构 */}
      <text x="200" y="185" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">数组内存结构</text>

      <rect x="60" y="195" width="60" height="36" rx="6" fill="url(#tws-ah-arr)" opacity="0.15" stroke="#2563eb" strokeWidth="1" />
      <text x="90" y="218" textAnchor="middle" fontSize="11" fill="#1e40af">10</text>
      <text x="90" y="248" textAnchor="middle" fontSize="10" fill="#64748b">[0]</text>

      <rect x="120" y="195" width="60" height="36" rx="6" fill="url(#tws-ah-arr)" opacity="0.15" stroke="#2563eb" strokeWidth="1" />
      <text x="150" y="218" textAnchor="middle" fontSize="11" fill="#1e40af">99</text>
      <text x="150" y="248" textAnchor="middle" fontSize="10" fill="#64748b">[1]</text>

      <rect x="180" y="195" width="60" height="36" rx="6" fill="url(#tws-ah-arr)" opacity="0.15" stroke="#2563eb" strokeWidth="1" />
      <text x="210" y="218" textAnchor="middle" fontSize="11" fill="#1e40af">30</text>
      <text x="210" y="248" textAnchor="middle" fontSize="10" fill="#64748b">[2]</text>

      <text x="260" y="218" fontSize="11" fill="#475569">整数索引访问</text>
      <text x="260" y="238" fontSize="11" fill="#475569">O(1) 随机访问</text>

      {/* 哈希表内部结构 */}
      <text x="600" y="185" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">哈希表内部结构</text>

      <rect x="440" y="195" width="120" height="28" rx="6" fill="url(#tws-ah-hash)" opacity="0.15" stroke="#7c3aed" strokeWidth="1" />
      <text x="500" y="214" textAnchor="middle" fontSize="10" fill="#5b21b6">&quot;name&quot; → &quot;Stone&quot;</text>

      <rect x="440" y="228" width="120" height="28" rx="6" fill="url(#tws-ah-hash)" opacity="0.15" stroke="#7c3aed" strokeWidth="1" />
      <text x="500" y="247" textAnchor="middle" fontSize="10" fill="#5b21b6">&quot;ver&quot; → 1</text>

      <rect x="440" y="261" width="120" height="28" rx="6" fill="url(#tws-ah-hash)" opacity="0.15" stroke="#7c3aed" strokeWidth="1" />
      <text x="500" y="280" textAnchor="middle" fontSize="10" fill="#5b21b6">&quot;x&quot; → 99</text>

      <text x="580" y="214" fontSize="11" fill="#475569">键经过 hash 计算</text>
      <text x="580" y="234" fontSize="11" fill="#475569">定位到桶位置</text>
      <text x="580" y="254" fontSize="11" fill="#475569">O(1) 平均查找</text>

      {/* 索引表达式求值流程 */}
      <text x="400" y="295" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">索引表达式求值流程</text>

      <rect x="60" y="310" width="140" height="36" rx="8" fill="url(#tws-ah-op)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="130" y="333" textAnchor="middle" fontSize="11" fill="#065f46">求值目标对象</text>
      <path d="M200 328 L225 328" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-ah-arrow)" />

      <rect x="225" y="310" width="140" height="36" rx="8" fill="url(#tws-ah-op)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="295" y="333" textAnchor="middle" fontSize="11" fill="#065f46">求值索引表达式</text>
      <path d="M365 328 L390 328" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-ah-arrow)" />

      <rect x="390" y="310" width="140" height="36" rx="8" fill="url(#tws-ah-op)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="460" y="333" textAnchor="middle" fontSize="11" fill="#065f46">类型判断 Array/Hash</text>
      <path d="M530 328 L555 328" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-ah-arrow)" />

      <rect x="555" y="310" width="185" height="36" rx="8" fill="url(#tws-ah-op)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="647" y="333" textAnchor="middle" fontSize="11" fill="#065f46">执行索引 get/put</text>

      {/* 对比表 */}
      <text x="400" y="375" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">数组 vs 哈希表对比</text>

      <rect x="40" y="390" width="720" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="100" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">对比维度</text>
      <text x="280" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">数组 Array</text>
      <text x="540" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">哈希表 Hash</text>

      <rect x="40" y="426" width="720" height="30" rx="6" fill="url(#tws-ah-arr)" opacity="0.05" stroke="#cbd5e1" strokeWidth="0.5" />
      <text x="100" y="446" textAnchor="middle" fontSize="11" fill="#475569">索引类型</text>
      <text x="280" y="446" textAnchor="middle" fontSize="11" fill="#1e40af">整数（从 0 开始）</text>
      <text x="540" y="446" textAnchor="middle" fontSize="11" fill="#5b21b6">任意类型（通常 String）</text>

      <rect x="40" y="456" width="720" height="30" rx="6" fill="url(#tws-ah-hash)" opacity="0.05" stroke="#cbd5e1" strokeWidth="0.5" />
      <text x="100" y="476" textAnchor="middle" fontSize="11" fill="#475569">有序性</text>
      <text x="280" y="476" textAnchor="middle" fontSize="11" fill="#1e40af">有序（按插入顺序）</text>
      <text x="540" y="476" textAnchor="middle" fontSize="11" fill="#5b21b6">无序</text>

      <rect x="40" y="486" width="720" height="30" rx="6" fill="url(#tws-ah-arr)" opacity="0.05" stroke="#cbd5e1" strokeWidth="0.5" />
      <text x="100" y="506" textAnchor="middle" fontSize="11" fill="#475569">Java 实现</text>
      <text x="280" y="506" textAnchor="middle" fontSize="11" fill="#1e40af">ArrayList&lt;Object&gt;</text>
      <text x="540" y="506" textAnchor="middle" fontSize="11" fill="#5b21b6">HashMap&lt;Object, Object&gt;</text>

      {/* 底部 */}
      <rect x="40" y="524" width="720" height="30" rx="8" fill="#fef3c7" opacity="0.4" stroke="#d97706" strokeWidth="1" />
      <text x="400" y="544" textAnchor="middle" fontSize="11" fill="#92400e">a[i] 和 h[key] 都通过 IndexExpr 节点表达——求值器按目标类型分发到不同操作</text>
    </svg>
  );
}
