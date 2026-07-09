"use client";

export function SqtFilteringDataDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="数据过滤WHERE子句与运算符">
      <defs>
        <marker id="sqt-fd-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">WHERE 子句：数据过滤体系</text>

      {/* WHERE 过滤流程 */}
      <rect x="30" y="50" width="740" height="80" rx="10" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
      <text x="400" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#166534">WHERE 过滤流程</text>
      <text x="400" y="95" textAnchor="middle" fontSize="13" fill="#15803d" fontFamily="monospace">FROM 表（全部行）→ WHERE 条件 → 符合条件的行 → SELECT 输出</text>
      <text x="400" y="115" textAnchor="middle" fontSize="11" fill="#166534">WHERE 在 GROUP BY 和 SELECT 之前执行，只能用表中的原始列</text>

      {/* 运算符分类 */}
      <text x="400" y="155" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">WHERE 运算符分类</text>

      {/* 比较运算符 */}
      <rect x="30" y="170" width="170" height="140" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="115" y="193" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">比较运算符</text>
      <text x="115" y="217" textAnchor="middle" fontSize="12" fill="#1e3a8a" fontFamily="monospace">=  等于</text>
      <text x="115" y="237" textAnchor="middle" fontSize="12" fill="#1e3a8a" fontFamily="monospace">!= / &lt;&gt;  不等于</text>
      <text x="115" y="257" textAnchor="middle" fontSize="12" fill="#1e3a8a" fontFamily="monospace">&lt; &gt; &lt;= &gt;=</text>
      <text x="115" y="277" textAnchor="middle" fontSize="12" fill="#1e3a8a" fontFamily="monospace">BETWEEN...AND</text>
      <text x="115" y="297" textAnchor="middle" fontSize="12" fill="#1e3a8a" fontFamily="monospace">IS NULL / IS NOT NULL</text>

      {/* 集合运算符 */}
      <rect x="215" y="170" width="170" height="140" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="300" y="193" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">集合运算符</text>
      <text x="300" y="217" textAnchor="middle" fontSize="12" fill="#78350f" fontFamily="monospace">IN (值1, 值2, ...)</text>
      <text x="300" y="237" textAnchor="middle" fontSize="12" fill="#78350f" fontFamily="monospace">NOT IN (...)</text>
      <text x="300" y="257" textAnchor="middle" fontSize="12" fill="#78350f">  · 等价多个 OR</text>
      <text x="300" y="277" textAnchor="middle" fontSize="12" fill="#78350f">  · 列表更简洁</text>
      <text x="300" y="297" textAnchor="middle" fontSize="12" fill="#78350f">  · 含 NULL 需注意</text>

      {/* 模式匹配 */}
      <rect x="400" y="170" width="170" height="140" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
      <text x="485" y="193" textAnchor="middle" fontSize="13" fontWeight="700" fill="#9d174d">模式匹配</text>
      <text x="485" y="217" textAnchor="middle" fontSize="12" fill="#831843" fontFamily="monospace">LIKE '关键词%'</text>
      <text x="485" y="237" textAnchor="middle" fontSize="12" fill="#831843" fontFamily="monospace">% → 任意多字符</text>
      <text x="485" y="257" textAnchor="middle" fontSize="12" fill="#831843" fontFamily="monospace">_ → 单个字符</text>
      <text x="485" y="277" textAnchor="middle" fontSize="12" fill="#831843" fontFamily="monospace">NOT LIKE '...'</text>
      <text x="485" y="297" textAnchor="middle" fontSize="12" fill="#831843">左通配不走索引</text>

      {/* 逻辑运算符 */}
      <rect x="585" y="170" width="185" height="140" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="677" y="193" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">逻辑运算符</text>
      <text x="677" y="217" textAnchor="middle" fontSize="12" fill="#5b21b6" fontFamily="monospace">AND  且（交集）</text>
      <text x="677" y="237" textAnchor="middle" fontSize="12" fill="#5b21b6" fontFamily="monospace">OR   或（并集）</text>
      <text x="677" y="257" textAnchor="middle" fontSize="12" fill="#5b21b6" fontFamily="monospace">NOT  非（取反）</text>
      <text x="677" y="277" textAnchor="middle" fontSize="11" fill="#7c3aed">AND 优先级 &gt; OR</text>
      <text x="677" y="297" textAnchor="middle" fontSize="11" fill="#7c3aed">用括号明确优先级</text>

      {/* AND/OR 优先级示例 */}
      <rect x="30" y="330" width="360" height="130" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="210" y="353" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">AND 与 OR 优先级</text>
      <text x="210" y="378" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">WHERE age &gt; 18 AND city = 'BJ'</text>
      <text x="210" y="396" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">   OR city = 'SH'</text>
      <text x="210" y="418" textAnchor="middle" fontSize="11" fill="#dc2626">等价：(age&gt;18 AND city='BJ') OR city='SH'</text>
      <text x="210" y="440" textAnchor="middle" fontSize="11" fill="#166534">建议：用括号显式表达意图</text>

      {/* NULL 注意事项 */}
      <rect x="410" y="330" width="360" height="130" rx="10" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="590" y="353" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">NULL 的特殊行为</text>
      <text x="590" y="378" textAnchor="middle" fontSize="11" fill="#7f1d1d" fontFamily="monospace">WHERE col = NULL     ✗ 错误</text>
      <text x="590" y="396" textAnchor="middle" fontSize="11" fill="#7f1d1d" fontFamily="monospace">WHERE col IS NULL     ✓ 正确</text>
      <text x="590" y="418" textAnchor="middle" fontSize="11" fill="#7f1d1d">NULL 与任何值比较 = UNKNOWN</text>
      <text x="590" y="440" textAnchor="middle" fontSize="11" fill="#7f1d1d">NOT IN 中含 NULL → 无结果</text>
    </svg>
  );
}
