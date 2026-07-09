"use client";

export function DscQueryProcessingDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="查询处理与优化流程">
      <defs>
        <linearGradient id="dsc-qp-head" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="dsc-qp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">查询处理与优化 · 流水线</text>

      {/* 流水线四步 */}
      <rect x="40" y="60" width="150" height="60" rx="10" fill="url(#dsc-qp-head)" />
      <text x="115" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">① 解析</text>
      <text x="115" y="104" textAnchor="middle" fontSize="11" fill="#ede9fe">Parse</text>

      <rect x="220" y="60" width="150" height="60" rx="10" fill="#a78bfa" />
      <text x="295" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">② 翻译</text>
      <text x="295" y="104" textAnchor="middle" fontSize="11" fill="#ede9fe">Translate</text>

      <rect x="400" y="60" width="150" height="60" rx="10" fill="#7c3aed" />
      <text x="475" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">③ 优化</text>
      <text x="475" y="104" textAnchor="middle" fontSize="11" fill="#ede9fe">Optimize</text>

      <rect x="580" y="60" width="180" height="60" rx="10" fill="#5b21b6" />
      <text x="670" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">④ 执行</text>
      <text x="670" y="104" textAnchor="middle" fontSize="11" fill="#ede9fe">Execute</text>

      <path d="M190 90 L220 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#dsc-qp-arrow)" />
      <path d="M370 90 L400 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#dsc-qp-arrow)" />
      <path d="M550 90 L580 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#dsc-qp-arrow)" />

      <text x="115" y="140" textAnchor="middle" fontSize="10" fill="#64748b">语法检查</text>
      <text x="115" y="155" textAnchor="middle" fontSize="10" fill="#64748b">生成语法树</text>
      <text x="295" y="140" textAnchor="middle" fontSize="10" fill="#64748b">转关系代数</text>
      <text x="295" y="155" textAnchor="middle" fontSize="10" fill="#64748b">表达式树</text>
      <text x="475" y="140" textAnchor="middle" fontSize="10" fill="#64748b">选执行计划</text>
      <text x="475" y="155" textAnchor="middle" fontSize="10" fill="#64748b">成本估算</text>
      <text x="670" y="140" textAnchor="middle" fontSize="10" fill="#64748b">调用算子</text>
      <text x="670" y="155" textAnchor="middle" fontSize="10" fill="#64748b">返回结果</text>

      {/* 代数优化 */}
      <rect x="40" y="180" width="360" height="100" rx="10" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.5" />
      <text x="220" y="203" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e7490">代数优化（逻辑层）</text>
      <text x="220" y="225" textAnchor="middle" fontSize="11" fill="#155e75">等价变换关系代数表达式</text>
      <text x="220" y="245" textAnchor="middle" fontSize="11" fill="#0f172a">σ 下推（尽早过滤减数据量）</text>
      <text x="220" y="263" textAnchor="middle" fontSize="11" fill="#0f172a">π 下推（尽早投影减列）</text>
      <text x="220" y="281" textAnchor="middle" fontSize="11" fill="#0f172a">连接顺序重排 / 笛卡尔积消除</text>

      {/* 物理优化 */}
      <rect x="420" y="180" width="340" height="100" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="590" y="203" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">物理优化（实现层）</text>
      <text x="590" y="225" textAnchor="middle" fontSize="11" fill="#78350f">为每运算选具体算法</text>
      <text x="590" y="245" textAnchor="middle" fontSize="11" fill="#0f172a">连接：嵌套循环/排序归并/哈希</text>
      <text x="590" y="263" textAnchor="middle" fontSize="11" fill="#0f172a">选择：线性扫描/索引扫描</text>
      <text x="590" y="281" textAnchor="middle" fontSize="11" fill="#0f172a">基于代价 = IO开销 + CPU开销</text>

      {/* 连接算法 */}
      <text x="400" y="312" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">三种连接算法</text>
      <rect x="40" y="325" width="230" height="90" rx="8" fill="#cffafe" stroke="#0891b2" />
      <text x="155" y="348" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">嵌套循环 Nested Loop</text>
      <text x="155" y="368" textAnchor="middle" fontSize="10" fill="#155e75">对每外层行扫全内层</text>
      <text x="155" y="385" textAnchor="middle" fontSize="10" fill="#155e75">O(n·m) 适合小表/无索引</text>
      <text x="155" y="405" textAnchor="middle" fontSize="10" fill="#64748b">块嵌套循环可优化 IO</text>

      <rect x="285" y="325" width="230" height="90" rx="8" fill="#fef3c7" stroke="#f59e0b" />
      <text x="400" y="348" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">排序归并 Sort-Merge</text>
      <text x="400" y="368" textAnchor="middle" fontSize="10" fill="#78350f">两表按连接键排序后归并</text>
      <text x="400" y="385" textAnchor="middle" fontSize="10" fill="#78350f">O(n log n + m log m)</text>
      <text x="400" y="405" textAnchor="middle" fontSize="10" fill="#64748b">适合已有序/大表等值连接</text>

      <rect x="530" y="325" width="230" height="90" rx="8" fill="#ede9fe" stroke="#8b5cf6" />
      <text x="645" y="348" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">哈希连接 Hash Join</text>
      <text x="645" y="368" textAnchor="middle" fontSize="10" fill="#6d28d9">内表建哈希表，外表探测</text>
      <text x="645" y="385" textAnchor="middle" fontSize="10" fill="#6d28d9">O(n+m) 等值连接最快</text>
      <text x="645" y="405" textAnchor="middle" fontSize="10" fill="#64748b">需内存建表，不支持不等值</text>

      {/* 优化策略 */}
      <rect x="40" y="435" width="720" height="105" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="458" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">优化器策略</text>
      <text x="400" y="480" textAnchor="middle" fontSize="11" fill="#475569">启发式（规则）优化：按经验规则做代数变换，不依赖数据统计</text>
      <text x="400" y="500" textAnchor="middle" fontSize="11" fill="#475569">代价优化：枚举等价计划，估算各方案代价选最优（基于直方图/基数估计）</text>
      <text x="400" y="522" textAnchor="middle" fontSize="11" fill="#0e7490">目标：最小化总代价（IO + CPU + 内存）；计划空间随连接数指数增长需剪枝</text>
    </svg>
  );
}
