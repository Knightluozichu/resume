"use client";

export function HpmQueryOptimizationDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="查询优化与执行计划">
      <defs>
        <linearGradient id="hpm-qo-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="hpm-qo-explain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="hpm-qo-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">查询优化 · 执行计划与策略</text>

      {/* 查询执行流水线 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">查询执行路径</text>
      <rect x="40" y="70" width="120" height="40" rx="6" fill="url(#hpm-qo-flow)" />
      <text x="100" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">客户端SQL</text>
      <text x="100" y="103" textAnchor="middle" fontSize="9" fill="#fef3c7">SELECT ...</text>

      <rect x="170" y="70" width="120" height="40" rx="6" fill="url(#hpm-qo-flow)" />
      <text x="230" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">解析/预处理</text>
      <text x="230" y="103" textAnchor="middle" fontSize="9" fill="#fef3c7">解析树+权限</text>

      <rect x="300" y="70" width="120" height="40" rx="6" fill="#fcd34d" stroke="#d97706" strokeWidth="1.5" />
      <text x="360" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c2d12">优化器</text>
      <text x="360" y="103" textAnchor="middle" fontSize="9" fill="#78350f">成本估算/选计划</text>

      <rect x="430" y="70" width="120" height="40" rx="6" fill="url(#hpm-qo-flow)" />
      <text x="490" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">执行器</text>
      <text x="490" y="103" textAnchor="middle" fontSize="9" fill="#fef3c7">调引擎API</text>

      <rect x="560" y="70" width="120" height="40" rx="6" fill="url(#hpm-qo-flow)" />
      <text x="620" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">返回结果</text>
      <text x="620" y="103" textAnchor="middle" fontSize="9" fill="#fef3c7">结果集</text>

      <path d="M160 90 L170 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#hpm-qo-arrow)" />
      <path d="M290 90 L300 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#hpm-qo-arrow)" />
      <path d="M420 90 L430 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#hpm-qo-arrow)" />
      <path d="M550 90 L560 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#hpm-qo-arrow)" />

      {/* EXPLAIN */}
      <text x="200" y="140" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e7490">EXPLAIN 关键列</text>
      <rect x="40" y="152" width="360" height="250" rx="8" fill="#ecfeff" stroke="#0891b2" />
      <text x="60" y="175" fontSize="11" fontWeight="700" fill="#0e7490">id</text>
      <text x="120" y="175" fontSize="11" fill="#155e75">SELECT 序号，大者先执行</text>
      <text x="60" y="197" fontSize="11" fontWeight="700" fill="#0e7490">select_type</text>
      <text x="120" y="197" fontSize="11" fill="#155e75">SIMPLE/PRIMARY/SUBQUERY</text>
      <text x="60" y="219" fontSize="11" fontWeight="700" fill="#0e7490">table</text>
      <text x="120" y="219" fontSize="11" fill="#155e75">涉及的表</text>
      <text x="60" y="241" fontSize="11" fontWeight="700" fill="#dc2626">type</text>
      <text x="120" y="241" fontSize="11" fill="#155e75">访问类型（关键！）</text>
      <text x="60" y="263" fontSize="11" fontWeight="700" fill="#dc2626">key</text>
      <text x="120" y="263" fontSize="11" fill="#155e75">实际使用的索引</text>
      <text x="60" y="285" fontSize="11" fontWeight="700" fill="#dc2626">rows</text>
      <text x="120" y="285" fontSize="11" fill="#155e75">估算扫描行数</text>
      <text x="60" y="307" fontSize="11" fontWeight="700" fill="#dc2626">Extra</text>
      <text x="120" y="307" fontSize="11" fill="#155e75">附加信息（关键！）</text>
      <text x="60" y="335" fontSize="10" fill="#0e7490">type 从好到差：</text>
      <text x="60" y="353" fontSize="10" fontWeight="700" fill="#059669">system &gt; const &gt; eq_ref &gt; ref &gt; range</text>
      <text x="60" y="371" fontSize="10" fontWeight="700" fill="#dc2626">&gt; index &gt; ALL（全表扫描）</text>
      <text x="60" y="393" fontSize="10" fill="#92400e">Extra 红灯：Using filesort / Using temporary</text>

      {/* 访问类型 */}
      <text x="600" y="140" textAnchor="middle" fontSize="14" fontWeight="700" fill="#6d28d9">访问类型 type 解读</text>
      <rect x="420" y="152" width="340" height="250" rx="8" fill="#f5f3ff" stroke="#8b5cf6" />
      <rect x="435" y="165" width="310" height="30" rx="4" fill="#d1fae5" stroke="#10b981" />
      <text x="590" y="184" textAnchor="middle" fontSize="10" fill="#047857">const/eq_ref：主键或唯一索引等值，最快</text>
      <rect x="435" y="200" width="310" height="30" rx="4" fill="#dbeafe" stroke="#3b82f6" />
      <text x="590" y="219" textAnchor="middle" fontSize="10" fill="#1e3a8a">ref：非唯一索引等值，多行匹配</text>
      <rect x="435" y="235" width="310" height="30" rx="4" fill="#fef3c7" stroke="#f59e0b" />
      <text x="590" y="254" textAnchor="middle" fontSize="10" fill="#92400e">range：索引范围扫描（BETWEEN/&gt; &lt; IN）</text>
      <rect x="435" y="270" width="310" height="30" rx="4" fill="#fed7aa" stroke="#ea580c" />
      <text x="590" y="289" textAnchor="middle" fontSize="10" fill="#9a3412">index：扫整个索引树（覆盖索引时可接受）</text>
      <rect x="435" y="305" width="310" height="30" rx="4" fill="#fee2e2" stroke="#ef4444" />
      <text x="590" y="324" textAnchor="middle" fontSize="10" fill="#991b1b">ALL：全表扫描，必须优化</text>
      <text x="590" y="355" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6d28d9">优化目标：至少到 range，最好 ref/eq_ref</text>
      <text x="590" y="375" textAnchor="middle" fontSize="10" fill="#6d28d9">Extra 最好出现 Using index（覆盖索引）</text>
      <text x="590" y="395" textAnchor="middle" fontSize="10" fill="#92400e">避免 Using filesort / Using temporary</text>

      {/* 优化策略 */}
      <rect x="40" y="415" width="720" height="125" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="438" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">查询优化核心策略</text>
      <text x="400" y="460" textAnchor="middle" fontSize="11" fill="#475569">① 只取需要的列（避免 SELECT *）② 用索引覆盖免回表</text>
      <text x="400" y="480" textAnchor="middle" fontSize="11" fill="#475569">③ WHERE 用索引列且避免函数包裹 ④ LIMIT 分页用延迟关联</text>
      <text x="400" y="500" textAnchor="middle" fontSize="11" fill="#475569">⑤ 大 IN 用 JOIN 替代 ⑥ 避免类型隐式转换导致索引失效</text>
      <text x="400" y="525" textAnchor="middle" fontSize="11" fill="#0e7490">原则：让优化器选索引扫描而非全表扫描，减少 rows 与回表</text>
    </svg>
  );
}
