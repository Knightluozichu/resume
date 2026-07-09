"use client";

export function MseSqlFundamentalsDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="SQL基础语句分类与执行顺序">
      <defs>
        <linearGradient id="mse-sql-ddl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mse-sql-dml" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="mse-sql-dql" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="mse-sql-dcl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="mse-sql-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">SQL 四大语言分类</text>

      {/* DDL */}
      <rect x="20" y="50" width="185" height="140" rx="10" fill="url(#mse-sql-ddl)" opacity="0.95" />
      <text x="112" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">DDL 数据定义</text>
      <line x1="40" y1="82" x2="185" y2="82" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="112" y="102" textAnchor="middle" fontSize="11" fill="#dbeafe">CREATE 创建</text>
      <text x="112" y="120" textAnchor="middle" fontSize="11" fill="#dbeafe">ALTER 修改</text>
      <text x="112" y="138" textAnchor="middle" fontSize="11" fill="#dbeafe">DROP 删除</text>
      <text x="112" y="156" textAnchor="middle" fontSize="11" fill="#dbeafe">TRUNCATE 清空</text>
      <text x="112" y="178" textAnchor="middle" fontSize="10" fill="#bfdbfe">库/表/视图/索引结构</text>

      {/* DML */}
      <rect x="215" y="50" width="185" height="140" rx="10" fill="url(#mse-sql-dml)" opacity="0.95" />
      <text x="307" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">DML 数据操作</text>
      <line x1="235" y1="82" x2="380" y2="82" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="307" y="102" textAnchor="middle" fontSize="11" fill="#fef3c7">INSERT 插入</text>
      <text x="307" y="120" textAnchor="middle" fontSize="11" fill="#fef3c7">UPDATE 更新</text>
      <text x="307" y="138" textAnchor="middle" fontSize="11" fill="#fef3c7">DELETE 删除</text>
      <text x="307" y="156" textAnchor="middle" fontSize="11" fill="#fef3c7">REPLACE 替换</text>
      <text x="307" y="178" textAnchor="middle" fontSize="10" fill="#fde68a">表中的数据行</text>

      {/* DQL */}
      <rect x="410" y="50" width="185" height="140" rx="10" fill="url(#mse-sql-dql)" opacity="0.95" />
      <text x="502" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">DQL 数据查询</text>
      <line x1="430" y1="82" x2="575" y2="82" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="502" y="102" textAnchor="middle" fontSize="11" fill="#d1fae5">SELECT 查询</text>
      <text x="502" y="120" textAnchor="middle" fontSize="11" fill="#d1fae5">FROM 表</text>
      <text x="502" y="138" textAnchor="middle" fontSize="11" fill="#d1fae5">WHERE 条件</text>
      <text x="502" y="156" textAnchor="middle" fontSize="11" fill="#d1fae5">GROUP BY 分组</text>
      <text x="502" y="178" textAnchor="middle" fontSize="10" fill="#a7f3d0">查询与检索</text>

      {/* DCL */}
      <rect x="605" y="50" width="175" height="140" rx="10" fill="url(#mse-sql-dcl)" opacity="0.95" />
      <text x="692" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">DCL 数据控制</text>
      <line x1="625" y1="82" x2="760" y2="82" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="692" y="102" textAnchor="middle" fontSize="11" fill="#ede9fe">GRANT 授权</text>
      <text x="692" y="120" textAnchor="middle" fontSize="11" fill="#ede9fe">REVOKE 撤销</text>
      <text x="692" y="138" textAnchor="middle" fontSize="11" fill="#ede9fe">COMMIT 提交</text>
      <text x="692" y="156" textAnchor="middle" fontSize="11" fill="#ede9fe">ROLLBACK 回滚</text>
      <text x="692" y="178" textAnchor="middle" fontSize="10" fill="#ddd6fe">权限与事务控制</text>

      {/* SELECT 执行顺序 */}
      <text x="400" y="225" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">SELECT 语句执行顺序（逻辑）</text>

      <rect x="30" y="240" width="740" height="60" rx="8" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" />
      <text x="400" y="262" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">书写顺序</text>
      <text x="400" y="282" textAnchor="middle" fontSize="11" fill="#047857" fontFamily="monospace">SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT</text>

      <path d="M400 305 L400 325" stroke="#64748b" strokeWidth="2" markerEnd="url(#mse-sql-arrow)" />
      <text x="420" y="318" fontSize="10" fill="#64748b">实际执行</text>

      <rect x="30" y="330" width="740" height="70" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="352" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">执行顺序（与书写顺序不同！）</text>
      <text x="400" y="372" textAnchor="middle" fontSize="11" fill="#78350f" fontFamily="monospace">FROM → ON → JOIN → WHERE → GROUP BY → HAVING</text>
      <text x="400" y="390" textAnchor="middle" fontSize="11" fill="#78350f" fontFamily="monospace">→ SELECT → DISTINCT → ORDER BY → LIMIT</text>

      {/* WHERE vs HAVING */}
      <rect x="30" y="420" width="360" height="85" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="210" y="442" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">WHERE vs HAVING</text>
      <text x="210" y="462" textAnchor="middle" fontSize="11" fill="#1e3a8a">WHERE：分组前过滤行</text>
      <text x="210" y="480" textAnchor="middle" fontSize="11" fill="#1e3a8a">HAVING：分组后过滤组</text>
      <text x="210" y="498" textAnchor="middle" fontSize="10" fill="#3730a3">WHERE 不能用聚合函数</text>

      {/* 聚合函数 */}
      <rect x="410" y="420" width="360" height="85" rx="8" fill="#faf5ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="590" y="442" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">常用聚合函数</text>
      <text x="590" y="462" textAnchor="middle" fontSize="11" fill="#5b21b6">COUNT(*) / COUNT(col)</text>
      <text x="590" y="480" textAnchor="middle" fontSize="11" fill="#5b21b6">SUM / AVG / MAX / MIN</text>
      <text x="590" y="498" textAnchor="middle" fontSize="10" fill="#7c3aed">搭配 GROUP BY 使用</text>
    </svg>
  );
}
