"use client";

export function SqtSortingFilteringDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="排序与计算字段">
      <defs>
        <marker id="sqt-sf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">排序（ORDER BY）与计算字段</text>

      {/* ORDER BY 部分 */}
      <rect x="30" y="50" width="360" height="200" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="210" y="73" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">ORDER BY 排序</text>

      <text x="210" y="98" textAnchor="middle" fontSize="12" fill="#1e3a8a" fontFamily="monospace">ORDER BY 列名 [ASC|DESC]</text>
      <text x="210" y="120" textAnchor="middle" fontSize="11" fill="#1e3a8a">ASC 升序（默认） / DESC 降序</text>

      <rect x="50" y="135" width="140" height="35" rx="6" fill="#3b82f6" />
      <text x="120" y="157" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">单列排序</text>
      <text x="120" y="185" textAnchor="middle" fontSize="10" fill="#1e40af" fontFamily="monospace">ORDER BY price DESC</text>

      <rect x="210" y="135" width="150" height="35" rx="6" fill="#0d9488" />
      <text x="285" y="157" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">多列排序</text>
      <text x="285" y="185" textAnchor="middle" fontSize="10" fill="#0f766e" fontFamily="monospace">ORDER BY dept, salary DESC</text>

      <text x="210" y="210" textAnchor="middle" fontSize="11" fill="#1e3a8a">多列：先按第一列排，相同时按第二列</text>
      <text x="210" y="230" textAnchor="middle" fontSize="11" fill="#dc2626">ORDER BY 必须是 SELECT 最后一条子句</text>

      {/* 计算字段部分 */}
      <rect x="410" y="50" width="360" height="200" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="590" y="73" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">计算字段</text>

      <rect x="430" y="90" width="150" height="50" rx="6" fill="#f59e0b" />
      <text x="505" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">拼接字段</text>
      <text x="505" y="128" textAnchor="middle" fontSize="10" fill="#92400e" fontFamily="monospace">CONCAT(a, ' ', b)</text>

      <rect x="600" y="90" width="150" height="50" rx="6" fill="#d97706" />
      <text x="675" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">算术运算</text>
      <text x="675" y="128" textAnchor="middle" fontSize="10" fill="#92400e" fontFamily="monospace">price * quantity AS total</text>

      <rect x="430" y="155" width="150" height="50" rx="6" fill="#ca8a04" />
      <text x="505" y="175" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">别名 AS</text>
      <text x="505" y="193" textAnchor="middle" fontSize="10" fill="#92400e" fontFamily="monospace">col AS "别名"</text>

      <rect x="600" y="155" width="150" height="50" rx="6" fill="#a16207" />
      <text x="675" y="175" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">数据转换</text>
      <text x="675" y="193" textAnchor="middle" fontSize="10" fill="#92400e" fontFamily="monospace">CAST(col AS TYPE)</text>

      <text x="590" y="228" textAnchor="middle" fontSize="11" fill="#78350f">计算字段不实际存储，查询时实时生成</text>

      {/* 执行位置图 */}
      <rect x="30" y="270" width="740" height="80" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="293" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">计算字段在 SQL 执行流程中的位置</text>

      <rect x="60" y="305" width="100" height="30" rx="6" fill="#00758f" />
      <text x="110" y="325" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">FROM</text>

      <rect x="185" y="305" width="100" height="30" rx="6" fill="#0891b2" />
      <text x="235" y="325" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">WHERE</text>

      <rect x="310" y="305" width="100" height="30" rx="6" fill="#ca8a04" />
      <text x="360" y="325" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">SELECT（计算）</text>

      <rect x="435" y="305" width="100" height="30" rx="6" fill="#9333ea" />
      <text x="485" y="325" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">ORDER BY</text>

      <rect x="560" y="305" width="100" height="30" rx="6" fill="#64748b" />
      <text x="610" y="325" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">LIMIT</text>

      <path d="M160 320 L185 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#sqt-sf-arrow)" />
      <path d="M285 320 L310 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#sqt-sf-arrow)" />
      <path d="M410 320 L435 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#sqt-sf-arrow)" />
      <path d="M535 320 L560 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#sqt-sf-arrow)" />

      {/* 别名用途与注意事项 */}
      <rect x="30" y="370" width="360" height="90" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="210" y="393" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">别名的意义</text>
      <text x="210" y="416" textAnchor="middle" fontSize="11" fill="#5b21b6">① 给计算字段命名，前端可直接引用</text>
      <text x="210" y="436" textAnchor="middle" fontSize="11" fill="#5b21b6">② 简化长表名/列名，SQL 更可读</text>
      <text x="210" y="454" textAnchor="middle" fontSize="11" fill="#dc2626">③ WHERE 中不能用列别名（执行顺序决定）</text>

      <rect x="410" y="370" width="360" height="90" rx="10" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="590" y="393" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">常见陷阱</text>
      <text x="590" y="416" textAnchor="middle" fontSize="11" fill="#7f1d1d">① ORDER BY 多列方向需各自指定 DESC</text>
      <text x="590" y="436" textAnchor="middle" fontSize="11" fill="#7f1d1d">② WHERE 不能引用 SELECT 中的别名</text>
      <text x="590" y="454" textAnchor="middle" fontSize="11" fill="#7f1d1d">③ 算术除法注意整数除法（用 CAST）</text>
    </svg>
  );
}
