"use client";

export function SqtAggregationDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="聚合与分组">
      <defs>
        <marker id="sqt-agg-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <linearGradient id="sqt-agg-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">聚合函数与 GROUP BY 分组</text>

      {/* 聚合流水线 */}
      <rect x="30" y="50" width="740" height="90" rx="10" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
      <text x="400" y="73" textAnchor="middle" fontSize="13" fontWeight="700" fill="#166534">聚合查询执行流水线</text>

      <rect x="50" y="85" width="110" height="40" rx="6" fill="#00758f" />
      <text x="105" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">FROM 取行</text>

      <rect x="180" y="85" width="110" height="40" rx="6" fill="#0891b2" />
      <text x="235" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">WHERE 过滤</text>

      <rect x="310" y="85" width="110" height="40" rx="6" fill="#0d9488" />
      <text x="365" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">GROUP BY 分组</text>

      <rect x="440" y="85" width="110" height="40" rx="6" fill="#65a30d" />
      <text x="495" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">HAVING 组过滤</text>

      <rect x="570" y="85" width="110" height="40" rx="6" fill="#ca8a04" />
      <text x="625" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">SELECT 聚合</text>

      <path d="M160 105 L180 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#sqt-agg-arrow)" />
      <path d="M290 105 L310 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#sqt-agg-arrow)" />
      <path d="M420 105 L440 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#sqt-agg-arrow)" />
      <path d="M550 105 L570 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#sqt-agg-arrow)" />

      {/* 五大聚合函数 */}
      <rect x="30" y="160" width="740" height="110" rx="10" fill="url(#sqt-agg-grad)" opacity="0.95" />
      <text x="400" y="183" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">五大聚合函数</text>

      <rect x="50" y="195" width="130" height="60" rx="8" fill="#fff" opacity="0.15" />
      <text x="115" y="218" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">COUNT()</text>
      <text x="115" y="240" textAnchor="middle" fontSize="11" fill="#fef3c7">统计行数</text>

      <rect x="195" y="195" width="130" height="60" rx="8" fill="#fff" opacity="0.15" />
      <text x="260" y="218" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">SUM()</text>
      <text x="260" y="240" textAnchor="middle" fontSize="11" fill="#fef3c7">求和</text>

      <rect x="340" y="195" width="130" height="60" rx="8" fill="#fff" opacity="0.15" />
      <text x="405" y="218" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">AVG()</text>
      <text x="405" y="240" textAnchor="middle" fontSize="11" fill="#fef3c7">平均值</text>

      <rect x="485" y="195" width="130" height="60" rx="8" fill="#fff" opacity="0.15" />
      <text x="550" y="218" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">MAX()</text>
      <text x="550" y="240" textAnchor="middle" fontSize="11" fill="#fef3c7">最大值</text>

      <rect x="630" y="195" width="130" height="60" rx="8" fill="#fff" opacity="0.15" />
      <text x="695" y="218" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">MIN()</text>
      <text x="695" y="240" textAnchor="middle" fontSize="11" fill="#fef3c7">最小值</text>

      {/* GROUP BY vs HAVING */}
      <rect x="30" y="290" width="360" height="190" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="210" y="313" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">GROUP BY 分组</text>
      <text x="210" y="338" textAnchor="middle" fontSize="12" fill="#1e3a8a" fontFamily="monospace">SELECT dept, COUNT(*) AS n</text>
      <text x="210" y="358" textAnchor="middle" fontSize="12" fill="#1e3a8a" fontFamily="monospace">FROM employees</text>
      <text x="210" y="378" textAnchor="middle" fontSize="12" fill="#1e3a8a" fontFamily="monospace">GROUP BY dept;</text>
      <text x="210" y="408" textAnchor="middle" fontSize="11" fill="#1e3a8a">将相同 dept 值的行归为一组</text>
      <text x="210" y="428" textAnchor="middle" fontSize="11" fill="#1e3a8a">每组输出一行聚合结果</text>
      <text x="210" y="455" textAnchor="middle" fontSize="11" fill="#dc2626">SELECT 中非聚合列必须在 GROUP BY 中</text>

      <rect x="410" y="290" width="360" height="190" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="590" y="313" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">HAVING 组级过滤</text>
      <text x="590" y="338" textAnchor="middle" fontSize="12" fill="#78350f" fontFamily="monospace">SELECT dept, COUNT(*) AS n</text>
      <text x="590" y="358" textAnchor="middle" fontSize="12" fill="#78350f" fontFamily="monospace">FROM employees</text>
      <text x="590" y="378" textAnchor="middle" fontSize="12" fill="#78350f" fontFamily="monospace">GROUP BY dept</text>
      <text x="590" y="398" textAnchor="middle" fontSize="12" fill="#78350f" fontFamily="monospace">HAVING COUNT(*) &gt; 5;</text>
      <text x="590" y="428" textAnchor="middle" fontSize="11" fill="#78350f">WHERE 过滤行，HAVING 过滤组</text>
      <text x="590" y="455" textAnchor="middle" fontSize="11" fill="#dc2626">HAVING 可用聚合函数，WHERE 不行</text>
    </svg>
  );
}
