"use client";

export function DscRelationalModelDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="关系模型核心概念">
      <defs>
        <linearGradient id="dsc-rm-head" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="dsc-rm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">关系模型 · 核心概念</text>

      {/* 关系（表） */}
      <text x="200" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e7490">关系 Relation = 表</text>
      <rect x="60" y="75" width="280" height="40" rx="6" fill="url(#dsc-rm-head)" />
      <text x="100" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">学号 (PK)</text>
      <text x="190" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">姓名</text>
      <text x="270" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">系编号 (FK)</text>
      <rect x="60" y="115" width="280" height="32" fill="#ecfeff" stroke="#a5f3fc" />
      <text x="100" y="136" textAnchor="middle" fontSize="12" fill="#0f172a">001</text>
      <text x="190" y="136" textAnchor="middle" fontSize="12" fill="#0f172a">张三</text>
      <text x="270" y="136" textAnchor="middle" fontSize="12" fill="#0f172a">D01</text>
      <rect x="60" y="147" width="280" height="32" fill="#fff" stroke="#a5f3fc" />
      <text x="100" y="168" textAnchor="middle" fontSize="12" fill="#0f172a">002</text>
      <text x="190" y="168" textAnchor="middle" fontSize="12" fill="#0f172a">李四</text>
      <text x="270" y="168" textAnchor="middle" fontSize="12" fill="#0f172a">D02</text>
      <text x="200" y="205" textAnchor="middle" fontSize="11" fill="#64748b">行 = 元组 Tuple ｜ 列 = 属性 Attribute</text>
      <text x="200" y="225" textAnchor="middle" fontSize="11" fill="#64748b">列的取值范围 = 域 Domain（原子值集合）</text>

      {/* 键层级 */}
      <text x="560" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">键 Key 层级</text>
      <rect x="440" y="75" width="240" height="34" rx="6" fill="#fde68a" stroke="#f59e0b" />
      <text x="560" y="97" textAnchor="middle" fontSize="12" fill="#78350f">超码 Superkey（唯一标识元组，可含多余列）</text>
      <rect x="460" y="119" width="200" height="34" rx="6" fill="#fcd34d" stroke="#f59e0b" />
      <text x="560" y="141" textAnchor="middle" fontSize="12" fill="#78350f">候选码 Candidate（最小超码，无多余列）</text>
      <rect x="480" y="163" width="160" height="34" rx="6" fill="#f59e0b" />
      <text x="560" y="185" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">主码 Primary Key（选定一个候选码）</text>
      <path d="M560 109 L560 119" stroke="#64748b" strokeWidth="2" markerEnd="url(#dsc-rm-arrow)" />
      <path d="M560 153 L560 163" stroke="#64748b" strokeWidth="2" markerEnd="url(#dsc-rm-arrow)" />

      <rect x="440" y="210" width="240" height="40" rx="6" fill="#dbeafe" stroke="#3b82f6" />
      <text x="560" y="227" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">外码 Foreign Key</text>
      <text x="560" y="244" textAnchor="middle" fontSize="11" fill="#1e3a8a">引用另一关系的主码，建立表间联系</text>

      {/* 完整性约束 */}
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">三类完整性约束 Integrity Constraints</text>

      <rect x="40" y="305" width="230" height="120" rx="10" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.5" />
      <text x="155" y="328" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e7490">实体完整性</text>
      <text x="155" y="348" textAnchor="middle" fontSize="11" fill="#155e75">Entity Integrity</text>
      <text x="155" y="372" textAnchor="middle" fontSize="11" fill="#0f172a">主码不能取空值</text>
      <text x="155" y="392" textAnchor="middle" fontSize="11" fill="#0f172a">主码唯一且非 NULL</text>
      <text x="155" y="412" textAnchor="middle" fontSize="11" fill="#64748b">保证每个元组可被唯一标识</text>

      <rect x="285" y="305" width="230" height="120" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="328" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">参照完整性</text>
      <text x="400" y="348" textAnchor="middle" fontSize="11" fill="#92400e">Referential Integrity</text>
      <text x="400" y="372" textAnchor="middle" fontSize="11" fill="#0f172a">外码值必须匹配被引用</text>
      <text x="400" y="392" textAnchor="middle" fontSize="11" fill="#0f172a">关系的主码，或为 NULL</text>
      <text x="400" y="412" textAnchor="middle" fontSize="11" fill="#64748b">保证表间引用关系不悬空</text>

      <rect x="530" y="305" width="230" height="120" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="645" y="328" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">用户定义完整性</text>
      <text x="645" y="348" textAnchor="middle" fontSize="11" fill="#6d28d9">Domain Integrity</text>
      <text x="645" y="372" textAnchor="middle" fontSize="11" fill="#0f172a">NOT NULL / UNIQUE /</text>
      <text x="645" y="392" textAnchor="middle" fontSize="11" fill="#0f172a">CHECK / DEFAULT 约束</text>
      <text x="645" y="412" textAnchor="middle" fontSize="11" fill="#64748b">满足具体业务规则的域约束</text>

      {/* 关系模式 */}
      <rect x="40" y="450" width="720" height="90" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="473" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">关系模式 Schema：student(ID, name, dept_id)</text>
      <text x="400" y="496" textAnchor="middle" fontSize="11" fill="#475569">关系 = 模式（类型/结构） + 实例（某一时刻的数据快照）</text>
      <text x="400" y="516" textAnchor="middle" fontSize="11" fill="#475569">关系模型三要素：数据结构（关系）+ 数据操作（关系代数/SQL）+ 完整性约束</text>
      <text x="400" y="534" textAnchor="middle" fontSize="11" fill="#64748b">关系是集合：元组无序、无重复、属性原子（第一范式）</text>
    </svg>
  );
}
