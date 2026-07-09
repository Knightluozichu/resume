"use client";

export function MseIndexOptimizationDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="索引原理与B+Tree结构">
      <defs>
        <linearGradient id="mse-idx-tree" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mse-idx-leaf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="mse-idx-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">B+Tree 索引结构与优化</text>

      {/* B+Tree 结构 */}
      <text x="400" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">InnoDB B+Tree 结构（3层）</text>

      {/* 根节点 */}
      <rect x="340" y="70" width="120" height="35" rx="6" fill="url(#mse-idx-tree)" opacity="0.9" />
      <text x="400" y="92" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">根节点 [10 | 30 | 50]</text>

      {/* 连接线 */}
      <path d="M370 105 L220 140" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mse-idx-arrow)" />
      <path d="M400 105 L400 140" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mse-idx-arrow)" />
      <path d="M430 105 L580 140" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mse-idx-arrow)" />

      {/* 中间层 */}
      <rect x="150" y="145" width="140" height="35" rx="6" fill="url(#mse-idx-tree)" opacity="0.75" />
      <text x="220" y="167" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">[3 | 6 | 8]</text>

      <rect x="330" y="145" width="140" height="35" rx="6" fill="url(#mse-idx-tree)" opacity="0.75" />
      <text x="400" y="167" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">[15 | 22 | 28]</text>

      <rect x="510" y="145" width="140" height="35" rx="6" fill="url(#mse-idx-tree)" opacity="0.75" />
      <text x="580" y="167" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">[35 | 42 | 48]</text>

      {/* 连接线到叶子 */}
      <path d="M180 180 L160 220" stroke="#64748b" strokeWidth="1" />
      <path d="M220 180 L220 220" stroke="#64748b" strokeWidth="1" />
      <path d="M260 180 L280 220" stroke="#64748b" strokeWidth="1" />
      <path d="M360 180 L360 220" stroke="#64748b" strokeWidth="1" />
      <path d="M400 180 L400 220" stroke="#64748b" strokeWidth="1" />
      <path d="M440 180 L440 220" stroke="#64748b" strokeWidth="1" />
      <path d="M540 180 L540 220" stroke="#64748b" strokeWidth="1" />
      <path d="M580 180 L580 220" stroke="#64748b" strokeWidth="1" />
      <path d="M620 180 L620 220" stroke="#64748b" strokeWidth="1" />

      {/* 叶子节点 */}
      <rect x="135" y="225" width="50" height="30" rx="4" fill="url(#mse-idx-leaf)" opacity="0.7" />
      <text x="160" y="244" textAnchor="middle" fontSize="9" fill="#fff">1,3</text>
      <rect x="195" y="225" width="50" height="30" rx="4" fill="url(#mse-idx-leaf)" opacity="0.7" />
      <text x="220" y="244" textAnchor="middle" fontSize="9" fill="#fff">6,8</text>
      <rect x="255" y="225" width="50" height="30" rx="4" fill="url(#mse-idx-leaf)" opacity="0.7" />
      <text x="280" y="244" textAnchor="middle" fontSize="9" fill="#fff">10,12</text>
      <rect x="335" y="225" width="50" height="30" rx="4" fill="url(#mse-idx-leaf)" opacity="0.7" />
      <text x="360" y="244" textAnchor="middle" fontSize="9" fill="#fff">15,18</text>
      <rect x="375" y="225" width="50" height="30" rx="4" fill="url(#mse-idx-leaf)" opacity="0.7" />
      <text x="400" y="244" textAnchor="middle" fontSize="9" fill="#fff">22,25</text>
      <rect x="415" y="225" width="50" height="30" rx="4" fill="url(#mse-idx-leaf)" opacity="0.7" />
      <text x="440" y="244" textAnchor="middle" fontSize="9" fill="#fff">28,30</text>
      <rect x="515" y="225" width="50" height="30" rx="4" fill="url(#mse-idx-leaf)" opacity="0.7" />
      <text x="540" y="244" textAnchor="middle" fontSize="9" fill="#fff">35,38</text>
      <rect x="555" y="225" width="50" height="30" rx="4" fill="url(#mse-idx-leaf)" opacity="0.7" />
      <text x="580" y="244" textAnchor="middle" fontSize="9" fill="#fff">42,45</text>
      <rect x="595" y="225" width="50" height="30" rx="4" fill="url(#mse-idx-leaf)" opacity="0.7" />
      <text x="620" y="244" textAnchor="middle" fontSize="9" fill="#fff">48,50</text>

      {/* 叶子节点双向链表 */}
      <path d="M185 240 L195 240" stroke="#059669" strokeWidth="2" markerEnd="url(#mse-idx-arrow)" />
      <path d="M195 250 L185 250" stroke="#059669" strokeWidth="2" markerEnd="url(#mse-idx-arrow)" />
      <path d="M245 240 L255 240" stroke="#059669" strokeWidth="2" markerEnd="url(#mse-idx-arrow)" />
      <path d="M255 250 L245 250" stroke="#059669" strokeWidth="2" markerEnd="url(#mse-idx-arrow)" />
      <text x="400" y="275" textAnchor="middle" fontSize="10" fill="#059669">叶子节点双向链表 → 范围查询高效</text>

      {/* 索引类型 */}
      <rect x="20" y="295" width="380" height="110" rx="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="210" y="317" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">索引类型</text>
      <text x="40" y="338" fontSize="11" fill="#1e3a8a">主键索引（聚簇索引）：叶子存完整行数据</text>
      <text x="40" y="356" fontSize="11" fill="#1e3a8a">二级索引（非聚簇）：叶子存主键值</text>
      <text x="40" y="374" fontSize="11" fill="#1e3a8a">联合索引：多列组合，遵循最左前缀</text>
      <text x="40" y="392" fontSize="11" fill="#1e3a8a">覆盖索引：索引含查询所需全部列</text>

      {/* EXPLAIN */}
      <rect x="410" y="295" width="370" height="110" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="595" y="317" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">EXPLAIN 关键字段</text>
      <text x="430" y="338" fontSize="11" fill="#78350f">type：system &gt; const &gt; eq_ref &gt; ref &gt; range &gt; index &gt; ALL</text>
      <text x="430" y="356" fontSize="11" fill="#78350f">key：实际使用的索引名</text>
      <text x="430" y="374" fontSize="11" fill="#78350f">rows：预估扫描行数（越少越好）</text>
      <text x="430" y="392" fontSize="11" fill="#78350f">Extra：Using index(覆盖) / Using filesort(差) / Using temporary(差)</text>

      {/* 优化原则 */}
      <rect x="20" y="420" width="760" height="125" rx="10" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
      <text x="400" y="442" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">索引优化原则</text>
      <text x="40" y="464" fontSize="11" fill="#475569">最左前缀：联合索引 (a,b,c) 可匹配 a / a,b / a,b,c，不可跳过 b 直接用 c</text>
      <text x="40" y="482" fontSize="11" fill="#475569">避免索引失效：不在索引列做运算/函数/类型转换；LIKE 左通配(%xxx)失效</text>
      <text x="40" y="500" fontSize="11" fill="#475569">覆盖索引优先：查询列都在索引中，避免回表（Using index）</text>
      <text x="40" y="518" fontSize="11" fill="#475569">索引下推（ICP）：5.6+ 在存储引擎层过滤，减少回表次数</text>
      <text x="40" y="536" fontSize="11" fill="#475569">避免冗余：不为低基数列（性别/状态）建索引；主键已含不再建</text>
    </svg>
  );
}
