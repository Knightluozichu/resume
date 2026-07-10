"use client";

export function PpTeamDeliveryDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="团队与交付核心概念图">
      <defs>
        <linearGradient id="pp-td-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pp-td-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="pp-td-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="pp-td-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="pp-td-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="pp-td-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">团队与交付：务实团队工程化</text>

      {/* 四大支柱 */}
      <text x="400" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">团队工程四大支柱</text>

      <rect x="20" y="80" width="370" height="80" rx="10" fill="url(#pp-td-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="205" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">务实团队</text>
      <text x="205" y="124" textAnchor="middle" fontSize="10" fill="#475569">不留破窗 / 提供选择</text>
      <text x="205" y="140" textAnchor="middle" fontSize="10" fill="#475569">团队质量文化</text>
      <text x="205" y="154" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0ea5e9">团队即个人的放大器</text>

      <rect x="410" y="80" width="370" height="80" rx="10" fill="url(#pp-td-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="595" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">无情测试</text>
      <text x="595" y="124" textAnchor="middle" fontSize="10" fill="#475569">单元 / 集成 / 系统 / 验收</text>
      <text x="595" y="140" textAnchor="middle" fontSize="10" fill="#475569">测试自动化 / 持续测试</text>
      <text x="595" y="154" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">没有测试 = 没有信心</text>

      <rect x="20" y="176" width="370" height="80" rx="10" fill="url(#pp-td-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="205" y="200" textAnchor="middle" fontSize="13" fontWeight="700" fill="#a16207">自动化一切</text>
      <text x="205" y="220" textAnchor="middle" fontSize="10" fill="#475569">构建 / 测试 / 部署 / 发布</text>
      <text x="205" y="236" textAnchor="middle" fontSize="10" fill="#475569">脚本化 / CI/CD</text>
      <text x="205" y="250" textAnchor="middle" fontSize="9" fontWeight="600" fill="#ca8a04">人不做机器能做的事</text>

      <rect x="410" y="176" width="370" height="80" rx="10" fill="url(#pp-td-5)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="595" y="200" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b91c1c">持续集成</text>
      <text x="595" y="220" textAnchor="middle" fontSize="10" fill="#475569">频繁合并 / 自动构建</text>
      <text x="595" y="236" textAnchor="middle" fontSize="10" fill="#475569">快速反馈 / 早发现问题</text>
      <text x="595" y="250" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">小步快跑 = 低风险</text>

      {/* 交付流水线 */}
      <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">交付流水线</text>

      <rect x="20" y="292" width="100" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="70" y="312" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">提交</text>
      <text x="70" y="332" textAnchor="middle" fontSize="8" fill="#475569">代码入库</text>

      <path d="M120 320 L140 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-td-arrow)" />

      <rect x="144" y="292" width="100" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="194" y="312" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">构建</text>
      <text x="194" y="332" textAnchor="middle" fontSize="8" fill="#475569">自动编译</text>

      <path d="M244 320 L264 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-td-arrow)" />

      <rect x="268" y="292" width="100" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="318" y="312" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">测试</text>
      <text x="318" y="332" textAnchor="middle" fontSize="8" fill="#475569">自动测试</text>

      <path d="M368 320 L388 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-td-arrow)" />

      <rect x="392" y="292" width="100" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="442" y="312" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">审查</text>
      <text x="442" y="332" textAnchor="middle" fontSize="8" fill="#475569">Code Review</text>

      <path d="M492 320 L512 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-td-arrow)" />

      <rect x="516" y="292" width="100" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="566" y="312" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">部署</text>
      <text x="566" y="332" textAnchor="middle" fontSize="8" fill="#475569">自动发布</text>

      <path d="M616 320 L636 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-td-arrow)" />

      <rect x="640" y="292" width="100" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="690" y="312" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">监控</text>
      <text x="690" y="332" textAnchor="middle" fontSize="8" fill="#475569">持续反馈</text>

      <path d="M740 320 L760 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-td-arrow)" />

      <rect x="764" y="292" width="16" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />

      {/* 团队文化 */}
      <text x="400" y="374" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">务实团队文化</text>

      <rect x="20" y="386" width="240" height="80" rx="10" fill="url(#pp-td-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="140" y="408" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">质量优先</text>
      <text x="140" y="428" textAnchor="middle" fontSize="10" fill="#475569">不留破窗</text>
      <text x="140" y="444" textAnchor="middle" fontSize="10" fill="#475569">发现即修</text>
      <text x="140" y="458" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">质量是团队责任</text>

      <rect x="280" y="386" width="240" height="80" rx="10" fill="url(#pp-td-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="400" y="408" textAnchor="middle" fontSize="12" fontWeight="700" fill="#a16207">沟通透明</text>
      <text x="400" y="428" textAnchor="middle" fontSize="10" fill="#475569">了解听众</text>
      <text x="400" y="444" textAnchor="middle" fontSize="10" fill="#475569">文档美观</text>
      <text x="400" y="458" textAnchor="middle" fontSize="9" fontWeight="600" fill="#ca8a04">沟通让事情发生</text>

      <rect x="540" y="386" width="240" height="80" rx="10" fill="url(#pp-td-5)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="660" y="408" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">期望管理</text>
      <text x="660" y="428" textAnchor="middle" fontSize="10" fill="#475569">提前说</text>
      <text x="660" y="444" textAnchor="middle" fontSize="10" fill="#475569">进度透明</text>
      <text x="660" y="458" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">勿承诺做不到的</text>

      {/* 底部总结 */}
      <rect x="20" y="484" width="760" height="32" rx="8" fill="url(#pp-td-5)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="504" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">团队交付 = 务实文化 + 无情测试 + 全面自动化 + 持续集成</text>

      {/* 底部脉络 */}
      <rect x="20" y="528" width="760" height="32" rx="8" fill="url(#pp-td-5)" opacity="0.08" stroke="#dc2626" strokeWidth="2" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">团队与交付：务实团队 → 无情测试 → 自动化 → 持续集成</text>
    </svg>
  );
}
