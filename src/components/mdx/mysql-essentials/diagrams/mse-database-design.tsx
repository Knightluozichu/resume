"use client";

export function MseDatabaseDesignDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="数据库设计与范式ER图">
      <defs>
        <linearGradient id="mse-des-nf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mse-des-er" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="mse-des-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">数据库设计 · 范式与ER建模</text>

      {/* 三大范式 */}
      <text x="400" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">三大范式递进</text>

      <rect x="20" y="70" width="250" height="130" rx="10" fill="url(#mse-des-nf)" opacity="0.1" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="145" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">第一范式 1NF</text>
      <text x="145" y="112" textAnchor="middle" fontSize="11" fill="#1e3a8a">原子性：每列不可再分</text>
      <text x="145" y="130" textAnchor="middle" fontSize="10" fill="#1e3a8a">消除：重复列组</text>
      <text x="145" y="150" textAnchor="middle" fontSize="10" fill="#3730a3" fontFamily="monospace">❌ 联系方式=手机+邮箱</text>
      <text x="145" y="168" textAnchor="middle" fontSize="10" fill="#3730a3" fontFamily="monospace">✅ 拆为phone, email两列</text>
      <text x="145" y="188" textAnchor="middle" fontSize="10" fill="#1e40af">→ 确保列原子性</text>

      <path d="M270 135 L295 135" stroke="#64748b" strokeWidth="2" markerEnd="url(#mse-des-arrow)" />

      <rect x="295" y="70" width="250" height="130" rx="10" fill="url(#mse-des-nf)" opacity="0.15" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="420" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">第二范式 2NF</text>
      <text x="420" y="112" textAnchor="middle" fontSize="11" fill="#1e3a8a">在1NF基础上</text>
      <text x="420" y="130" textAnchor="middle" fontSize="10" fill="#1e3a8a">消除部分依赖</text>
      <text x="420" y="150" textAnchor="middle" fontSize="10" fill="#3730a3" fontFamily="monospace">❌ (学号,课程)→姓名</text>
      <text x="420" y="168" textAnchor="middle" fontSize="10" fill="#3730a3" fontFamily="monospace">✅ 拆学生表+选课表</text>
      <text x="420" y="188" textAnchor="middle" fontSize="10" fill="#1e40af">→ 非主属性完全依赖主键</text>

      <path d="M545 135 L570 135" stroke="#64748b" strokeWidth="2" markerEnd="url(#mse-des-arrow)" />

      <rect x="570" y="70" width="210" height="130" rx="10" fill="url(#mse-des-nf)" opacity="0.2" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="675" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">第三范式 3NF</text>
      <text x="675" y="112" textAnchor="middle" fontSize="11" fill="#1e3a8a">在2NF基础上</text>
      <text x="675" y="130" textAnchor="middle" fontSize="10" fill="#1e3a8a">消除传递依赖</text>
      <text x="675" y="150" textAnchor="middle" fontSize="10" fill="#3730a3" fontFamily="monospace">❌ 学号→院系→院长</text>
      <text x="675" y="168" textAnchor="middle" fontSize="10" fill="#3730a3" fontFamily="monospace">✅ 拆学生表+院系表</text>
      <text x="675" y="188" textAnchor="middle" fontSize="10" fill="#1e40af">→ 非主属性直接依赖主键</text>

      {/* ER图示例 */}
      <text x="400" y="230" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">ER 模型示例：电商系统</text>

      {/* 实体：客户 */}
      <rect x="30" y="250" width="140" height="100" rx="8" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2" />
      <text x="100" y="270" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e3a8a">customers</text>
      <line x1="40" y1="278" x2="160" y2="278" stroke="#3b82f6" strokeWidth="1" />
      <text x="100" y="294" textAnchor="middle" fontSize="10" fill="#1e40af" fontFamily="monospace">id (PK)</text>
      <text x="100" y="308" textAnchor="middle" fontSize="10" fill="#1e40af" fontFamily="monospace">name</text>
      <text x="100" y="322" textAnchor="middle" fontSize="10" fill="#1e40af" fontFamily="monospace">email (UQ)</text>
      <text x="100" y="336" textAnchor="middle" fontSize="10" fill="#1e40af" fontFamily="monospace">phone</text>

      {/* 关系线：客户-下单 */}
      <path d="M170 300 L250 300" stroke="#475569" strokeWidth="2" />
      <text x="210" y="293" textAnchor="middle" fontSize="10" fill="#475569">下单</text>
      <text x="210" y="312" textAnchor="middle" fontSize="9" fill="#64748b">1 : N</text>

      {/* 实体：订单 */}
      <rect x="250" y="250" width="160" height="120" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <text x="330" y="270" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">orders</text>
      <line x1="260" y1="278" x2="400" y2="278" stroke="#f59e0b" strokeWidth="1" />
      <text x="330" y="294" textAnchor="middle" fontSize="10" fill="#78350f" fontFamily="monospace">id (PK)</text>
      <text x="330" y="308" textAnchor="middle" fontSize="10" fill="#78350f" fontFamily="monospace">customer_id (FK)</text>
      <text x="330" y="322" textAnchor="middle" fontSize="10" fill="#78350f" fontFamily="monospace">order_date</text>
      <text x="330" y="336" textAnchor="middle" fontSize="10" fill="#78350f" fontFamily="monospace">total</text>
      <text x="330" y="350" textAnchor="middle" fontSize="10" fill="#78350f" fontFamily="monospace">status</text>
      <text x="330" y="364" textAnchor="middle" fontSize="9" fill="#b45309">FK → customers.id</text>

      {/* 关系线：订单-包含 */}
      <path d="M410 310 L490 310" stroke="#475569" strokeWidth="2" />
      <text x="450" y="303" textAnchor="middle" fontSize="10" fill="#475569">包含</text>
      <text x="450" y="322" textAnchor="middle" fontSize="9" fill="#64748b">N : M</text>

      {/* 实体：商品 */}
      <rect x="490" y="250" width="140" height="120" rx="8" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
      <text x="560" y="270" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">products</text>
      <line x1="500" y1="278" x2="620" y2="278" stroke="#10b981" strokeWidth="1" />
      <text x="560" y="294" textAnchor="middle" fontSize="10" fill="#047857" fontFamily="monospace">id (PK)</text>
      <text x="560" y="308" textAnchor="middle" fontSize="10" fill="#047857" fontFamily="monospace">name</text>
      <text x="560" y="322" textAnchor="middle" fontSize="10" fill="#047857" fontFamily="monospace">price</text>
      <text x="560" y="336" textAnchor="middle" fontSize="10" fill="#047857" fontFamily="monospace">stock</text>
      <text x="560" y="350" textAnchor="middle" fontSize="10" fill="#047857" fontFamily="monospace">category_id(FK)</text>

      {/* 中间表：order_items */}
      <rect x="650" y="260" width="130" height="100" rx="8" fill="#ede9fe" stroke="#6d28d9" strokeWidth="2" />
      <text x="715" y="280" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">order_items</text>
      <line x1="660" y1="288" x2="770" y2="288" stroke="#8b5cf6" strokeWidth="1" />
      <text x="715" y="304" textAnchor="middle" fontSize="10" fill="#5b21b6" fontFamily="monospace">order_id (FK)</text>
      <text x="715" y="318" textAnchor="middle" fontSize="10" fill="#5b21b6" fontFamily="monospace">product_id (FK)</text>
      <text x="715" y="332" textAnchor="middle" fontSize="10" fill="#5b21b6" fontFamily="monospace">quantity</text>
      <text x="715" y="346" textAnchor="middle" fontSize="10" fill="#5b21b6" fontFamily="monospace">subtotal</text>

      {/* 设计原则 */}
      <rect x="20" y="390" width="760" height="155" rx="10" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
      <text x="400" y="412" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">设计原则速查</text>
      <text x="40" y="434" fontSize="11" fill="#475569">主键选择：自增INT简洁高效；UUID适合分布式但占空间；复合主键需谨慎</text>
      <text x="40" y="452" fontSize="11" fill="#475569">外键约束：保证参照完整性，但影响写入性能，高并发场景可应用层保证</text>
      <text x="40" y="470" fontSize="11" fill="#475569">反范式设计：读多写少时适当冗余字段，用空间换时间，避免过度JOIN</text>
      <text x="40" y="488" fontSize="11" fill="#475569">字段类型：能小不大（TINYINT &gt; INT），定长用CHAR，变长用VARCHAR</text>
      <text x="40" y="506" fontSize="11" fill="#475569">索引策略：主键必建、外键建索引、查询频繁列建索引、低基数列不建</text>
      <text x="40" y="524" fontSize="11" fill="#475569">命名规范：表名复数或单数统一，列名小写下划线，避免保留字</text>
    </svg>
  );
}
