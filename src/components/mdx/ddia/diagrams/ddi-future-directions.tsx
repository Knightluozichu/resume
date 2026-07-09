"use client";

export function DdiFutureDirectionsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="未来方向">
      <defs>
        <linearGradient id="ddi-fd-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">未来方向 · 数据系统走向何方</text>

      {/* 数据集成 */}
      <rect x="20" y="50" width="380" height="160" rx="12" fill="url(#ddi-fd-grad)" opacity="0.95" />
      <text x="210" y="75" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">数据集成：组合而非单选</text>
      <line x1="40" y1="85" x2="380" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="210" y="108" textAnchor="middle" fontSize="11" fill="#ede9fe">没有银弹：不同系统擅长不同场景</text>
      <text x="210" y="128" textAnchor="middle" fontSize="11" fill="#ddd6fe">OLTP + OLAP + 搜索 + 缓存 + 流</text>
      <text x="210" y="148" textAnchor="middle" fontSize="11" fill="#ddd6fe">衍生数据 → 让多个系统协作</text>
      <text x="210" y="168" textAnchor="middle" fontSize="11" fill="#c4b5fd">系统记录 + 一组衍生系统</text>
      <text x="210" y="188" textAnchor="middle" fontSize="11" fill="#c4b5fd">→ unbundle the database 思想</text>

      {/* Unbundling the Database */}
      <rect x="410" y="50" width="370" height="160" rx="12" fill="url(#ddi-fd-grad)" opacity="0.85" />
      <text x="595" y="75" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">拆解数据库</text>
      <line x1="430" y1="85" x2="760" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="595" y="108" textAnchor="middle" fontSize="11" fill="#ede9fe">数据库内部机制 → 分布式系统组件</text>
      <text x="595" y="128" textAnchor="middle" fontSize="11" fill="#ddd6fe">日志（Kafka）= WAL</text>
      <text x="595" y="148" textAnchor="middle" fontSize="11" fill="#ddd6fe">物化视图 = 批/流计算输出</text>
      <text x="595" y="168" textAnchor="middle" fontSize="11" fill="#c4b5fd">CDC = 触发器 + 复制</text>
      <text x="595" y="188" textAnchor="middle" fontSize="11" fill="#c4b5fd">→ 组件化构建「数据基础设施」</text>

      {/* 端到端正确性 */}
      <text x="400" y="235" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">端到端正确性</text>

      <rect x="30" y="248" width="370" height="110" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="215" y="271" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">恰好一次（Exactly-Once）</text>
      <text x="215" y="291" textAnchor="middle" fontSize="11" fill="#155e75">端到端去重 + 幂等写入</text>
      <text x="215" y="311" textAnchor="middle" fontSize="11" fill="#155e75">事务性输出（两阶段提交）</text>
      <text x="215" y="331" textAnchor="middle" fontSize="11" fill="#155e75">→ 强约束 = 强保证</text>

      <rect x="410" y="248" width="360" height="110" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="590" y="271" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">数据完整性约束</text>
      <text x="590" y="291" textAnchor="middle" fontSize="11" fill="#78350f">外键、唯一性在分布式中更难</text>
      <text x="590" y="311" textAnchor="middle" fontSize="11" fill="#78350f">应用层约束 vs 数据库约束</text>
      <text x="590" y="331" textAnchor="middle" fontSize="11" fill="#92400e">→ 端到端的思考方式</text>

      {/* 做正确的事 */}
      <text x="400" y="380" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">做正确的事：隐私、伦理、可预测性</text>

      <rect x="30" y="395" width="240" height="120" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="150" y="418" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">预测性分析</text>
      <text x="150" y="438" textAnchor="middle" fontSize="11" fill="#155e75">基于数据预测人的行为</text>
      <text x="150" y="458" textAnchor="middle" fontSize="11" fill="#155e75">→ 偏见（Bias）风险</text>
      <text x="150" y="478" textAnchor="middle" fontSize="11" fill="#155e75">→ 反馈循环放大偏差</text>
      <text x="150" y="500" textAnchor="middle" fontSize="11" fill="#0e7490">需要审计和可解释性</text>

      <rect x="280" y="395" width="240" height="120" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="418" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">隐私与监控</text>
      <text x="400" y="438" textAnchor="middle" fontSize="11" fill="#78350f">数据收集 vs 隐私保护</text>
      <text x="400" y="458" textAnchor="middle" fontSize="11" fill="#78350f">→ 同意与透明度</text>
      <text x="400" y="478" textAnchor="middle" fontSize="11" fill="#78350f">→ 数据最小化原则</text>
      <text x="400" y="500" textAnchor="middle" fontSize="11" fill="#92400e">GDPR 等法规约束</text>

      <rect x="530" y="395" width="240" height="120" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="650" y="418" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">可预测性与脆弱性</text>
      <text x="650" y="438" textAnchor="middle" fontSize="11" fill="#5b21b6">系统在高负载下行为可预测</text>
      <text x="650" y="458" textAnchor="middle" fontSize="11" fill="#5b21b6">→ 避免级联故障</text>
      <text x="650" y="478" textAnchor="middle" fontSize="11" fill="#5b21b6">→ 优雅降级</text>
      <text x="650" y="500" textAnchor="middle" fontSize="11" fill="#6d28d9">混沌工程与韧性测试</text>

      {/* 总结 */}
      <rect x="30" y="525" width="740" height="25" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="543" textAnchor="middle" fontSize="11" fill="#64748b">DDIA 的终极愿景：把数据库内部智慧应用于分布式数据基础设施 → 让数据系统可靠、可扩展、可维护</text>
    </svg>
  );
}
