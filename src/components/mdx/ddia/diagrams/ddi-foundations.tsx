"use client";

export function DdiFoundationsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="数据系统基础">
      <defs>
        <linearGradient id="ddi-fn-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="ddi-fn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">数据系统基础 · 三大目标与四块基石</text>

      {/* 三大设计目标 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三大设计目标</text>
      <rect x="30" y="70" width="240" height="80" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="150" y="93" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e7490">可靠性 Reliability</text>
      <text x="150" y="113" textAnchor="middle" fontSize="11" fill="#155e75">硬件故障 / 软件错误 / 人为失误</text>
      <text x="150" y="133" textAnchor="middle" fontSize="11" fill="#155e75">→ 容错：故障不可避免，持续正确运行</text>

      <rect x="280" y="70" width="240" height="80" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="93" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">可扩展性 Scalability</text>
      <text x="400" y="113" textAnchor="middle" fontSize="11" fill="#78350f">负载参数 / 性能指标</text>
      <text x="400" y="133" textAnchor="middle" fontSize="11" fill="#78350f">→ 描述负载，量化性能（吞吐/延迟）</text>

      <rect x="530" y="70" width="240" height="80" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="650" y="93" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">可维护性 Maintainability</text>
      <text x="650" y="113" textAnchor="middle" fontSize="11" fill="#5b21b6">可运维 / 简洁 / 可演化</text>
      <text x="650" y="133" textAnchor="middle" fontSize="11" fill="#5b21b6">→ 为未来的人（包括自己）而设计</text>

      {/* 四块基石 */}
      <text x="400" y="185" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四块知识基石</text>

      <rect x="30" y="200" width="370" height="160" rx="12" fill="url(#ddi-fn-grad)" opacity="0.95" />
      <text x="215" y="225" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">数据模型与查询语言</text>
      <line x1="50" y1="235" x2="380" y2="235" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="215" y="258" textAnchor="middle" fontSize="11" fill="#cffafe">关系模型 → 文档模型 → 图模型</text>
      <text x="215" y="278" textAnchor="middle" fontSize="11" fill="#cffafe">SQL / NoSQL / 声明式查询</text>
      <text x="215" y="298" textAnchor="middle" fontSize="11" fill="#a5f3fc">Schema 演化：读时模式 vs 写时模式</text>
      <text x="215" y="325" textAnchor="middle" fontSize="11" fill="#67e8f9">核心：数据如何建模决定系统能力边界</text>

      <rect x="410" y="200" width="360" height="160" rx="12" fill="url(#ddi-fn-grad)" opacity="0.85" />
      <text x="590" y="225" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">存储与检索</text>
      <line x1="430" y1="235" x2="750" y2="235" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="590" y="258" textAnchor="middle" fontSize="11" fill="#cffafe">LSM-Tree（日志合并） vs B-Tree</text>
      <text x="590" y="278" textAnchor="middle" fontSize="11" fill="#cffafe">追加日志 / SSTable / 页面</text>
      <text x="590" y="298" textAnchor="middle" fontSize="11" fill="#a5f3fc">列式存储 / 内存数据库</text>
      <text x="590" y="325" textAnchor="middle" fontSize="11" fill="#67e8f9">核心：选择存储引擎 = 选择写优化或读优化</text>

      {/* 编码与演化 */}
      <rect x="30" y="375" width="740" height="80" rx="12" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="400" y="400" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">编码与演化</text>
      <text x="400" y="422" textAnchor="middle" fontSize="11" fill="#475569">向前兼容（新代码读旧数据）+ 向后兼容（旧代码读新数据）</text>
      <text x="400" y="442" textAnchor="middle" fontSize="11" fill="#475569">JSON / XML / Thrift / Protobuf / Avro → 滚动升级、数据流模式</text>

      {/* 数据流模式 */}
      <rect x="30" y="470" width="740" height="75" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="400" y="492" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">数据流四种模式</text>
      <text x="400" y="513" textAnchor="middle" fontSize="11" fill="#78350f">数据库 → 服务 API → 异步消息 → 批处理</text>
      <text x="400" y="532" textAnchor="middle" fontSize="11" fill="#92400e">每种模式有不同的演化约束与兼容性策略</text>
    </svg>
  );
}
