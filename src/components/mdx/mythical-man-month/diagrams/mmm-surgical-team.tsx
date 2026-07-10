"use client";

export function MmmSurgicalTeamDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="外科手术队伍团队组织模式示意图">
      <defs>
        <linearGradient id="mmm-st-surgeon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="mmm-st-support" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="mmm-st-admin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="mmm-st-tools" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="mmm-st-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">外科手术队伍：专业化分工模式</text>

      {/* 中央：主刀程序员 */}
      <rect x="300" y="70" width="200" height="60" rx="12" fill="url(#mmm-st-surgeon)" opacity="0.95" />
      <text x="400" y="94" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">主刀程序员</text>
      <text x="400" y="114" textAnchor="middle" fontSize="11" fill="#fee2e2">亲自定义和编写所有代码</text>

      <path d="M400 130 L400 134" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-st-arrow)" />

      {/* 副手 */}
      <rect x="300" y="138" width="200" height="50" rx="10" fill="url(#mmm-st-support)" opacity="0.9" />
      <text x="400" y="160" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">副手</text>
      <text x="400" y="178" textAnchor="middle" fontSize="10" fill="#e0f2fe">后备大脑，与主刀并肩思考</text>

      <path d="M400 188 L400 192" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-st-arrow)" />

      {/* 管理员与编辑 */}
      <rect x="180" y="196" width="200" height="50" rx="10" fill="url(#mmm-st-admin)" opacity="0.9" />
      <text x="280" y="218" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">管理员</text>
      <text x="280" y="236" textAnchor="middle" fontSize="10" fill="#dcfce7">管理人员、机器、产品</text>

      <rect x="420" y="196" width="200" height="50" rx="10" fill="url(#mmm-st-support)" opacity="0.85" />
      <text x="520" y="218" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">编辑</text>
      <text x="520" y="236" textAnchor="middle" fontSize="10" fill="#e0f2fe">维护文档与交叉引用</text>

      <path d="M280 246 L280 250" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-st-arrow)" />
      <path d="M520 246 L520 250" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-st-arrow)" />

      {/* 两个工具师 + 测试师 + 语言师 */}
      <rect x="40" y="254" width="180" height="50" rx="10" fill="url(#mmm-st-tools)" opacity="0.85" />
      <text x="130" y="276" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">程序职员</text>
      <text x="130" y="294" textAnchor="middle" fontSize="10" fill="#fef9c3">维护技术工作产品</text>

      <rect x="240" y="254" width="180" height="50" rx="10" fill="url(#mmm-st-tools)" opacity="0.85" />
      <text x="330" y="276" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">工具师</text>
      <text x="330" y="294" textAnchor="middle" fontSize="10" fill="#fef9c3">构建维护工具和实用程序</text>

      <rect x="440" y="254" width="160" height="50" rx="10" fill="url(#mmm-st-surgeon)" opacity="0.8" />
      <text x="520" y="276" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">测试师</text>
      <text x="520" y="294" textAnchor="middle" fontSize="10" fill="#fee2e2">设计测试用例与验证</text>

      <rect x="620" y="254" width="140" height="50" rx="10" fill="url(#mmm-st-admin)" opacity="0.8" />
      <text x="690" y="276" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">语言师</text>
      <text x="690" y="294" textAnchor="middle" fontSize="10" fill="#dcfce7">语言专家与顾问</text>

      {/* 对比：传统 vs 外科手术 */}
      <text x="400" y="338" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">两种团队组织模式对比</text>

      <rect x="40" y="350" width="360" height="130" rx="8" fill="url(#mmm-st-support)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="220" y="372" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">传统模式（平等的分工）</text>
      <text x="60" y="394" fontSize="10" fill="#475569">- 每人都是设计者 + 编程者 + 测试者</text>
      <text x="60" y="412" fontSize="10" fill="#475569">- 设计概念碎片化，多人各有想法</text>
      <text x="60" y="430" fontSize="10" fill="#475569">- 通信开销大，每个人需要跟所有人沟通</text>
      <text x="60" y="448" fontSize="10" fill="#475569">- 适合小团队，无法扩展到大型项目</text>
      <text x="60" y="466" fontSize="10" fill="#475569">- 决策分散，容易产生概念不一致</text>

      <rect x="420" y="350" width="340" height="130" rx="8" fill="url(#mmm-st-surgeon)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="590" y="372" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">外科手术队伍模式</text>
      <text x="440" y="394" fontSize="10" fill="#475569">- 主刀程序员拥有设计决策权</text>
      <text x="440" y="412" fontSize="10" fill="#475569">- 副手是后备大脑，参与思考</text>
      <text x="440" y="430" fontSize="10" fill="#475569">- 其余角色各司其职，分工明确</text>
      <text x="440" y="448" fontSize="10" fill="#475569">- 概念统一，决策集中</text>
      <text x="440" y="466" fontSize="10" fill="#475569">- 通信开销小，扩展性好</text>

      {/* 底部 */}
      <rect x="40" y="500" width="720" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="520" textAnchor="middle" fontSize="11" fill="#475569">10人团队：1主刀 + 1副手 + 1管理员 + 1编辑 + 2工具师 + 1测试师 + 1语言师 + 2程序职员</text>

      <rect x="40" y="542" width="720" height="28" rx="8" fill="url(#mmm-st-surgeon)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">核心理念：专业化分工 + 概念完整性优先于民主决策</text>
    </svg>
  );
}
