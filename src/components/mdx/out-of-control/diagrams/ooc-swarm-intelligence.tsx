"use client";

export function OocSwarmIntelligenceDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="群体智能蜂群与分布式智慧图">
      <defs>
        <linearGradient id="ooc-si-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="ooc-si-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ooc-si-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="ooc-si-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <marker id="ooc-si-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">群体智能：蜂群与分布式智慧</text>

      {/* 蜂群决策过程 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">蜂群选址决策过程</text>

      {/* 步骤1 */}
      <rect x="40" y="74" width="170" height="90" rx="8" fill="url(#ooc-si-2)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="125" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">步骤1：侦察</text>
      <text x="125" y="116" textAnchor="middle" fontSize="9" fill="#475569">数百只蜜蜂出发</text>
      <text x="125" y="132" textAnchor="middle" fontSize="9" fill="#475569">各自寻找巢穴</text>
      <text x="125" y="148" textAnchor="middle" fontSize="9" fill="#64748b">无统一指挥</text>

      <path d="M212 119 L238 119" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-si-arrow)" />

      {/* 步骤2 */}
      <rect x="242" y="74" width="170" height="90" rx="8" fill="url(#ooc-si-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="327" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">步骤2：汇报</text>
      <text x="327" y="116" textAnchor="middle" fontSize="9" fill="#475569">回巢跳摇摆舞</text>
      <text x="327" y="132" textAnchor="middle" fontSize="9" fill="#475569">舞蹈强度=巢穴质量</text>
      <text x="327" y="148" textAnchor="middle" fontSize="9" fill="#64748b">分布式信息共享</text>

      <path d="M414 119 L440 119" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-si-arrow)" />

      {/* 步骤3 */}
      <rect x="444" y="74" width="170" height="90" rx="8" fill="url(#ooc-si-3)" opacity="0.1" stroke="#10b981" strokeWidth="1.5" />
      <text x="529" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">步骤3：招募</text>
      <text x="529" y="116" textAnchor="middle" fontSize="9" fill="#475569">好巢穴招募更多</text>
      <text x="529" y="132" textAnchor="middle" fontSize="9" fill="#475569">侦察者跟随舞蹈</text>
      <text x="529" y="148" textAnchor="middle" fontSize="9" fill="#64748b">正反馈放大</text>

      <path d="M616 119 L642 119" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-si-arrow)" />

      {/* 步骤4 */}
      <rect x="646" y="74" width="114" height="90" rx="8" fill="url(#ooc-si-4)" opacity="0.1" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="703" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">步骤4：共识</text>
      <text x="703" y="116" textAnchor="middle" fontSize="9" fill="#475569">多数聚集同巢</text>
      <text x="703" y="132" textAnchor="middle" fontSize="9" fill="#64748b">群体决策完成</text>

      {/* 群体智能三特征 */}
      <text x="400" y="188" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">群体智能三大特征</text>

      <rect x="40" y="202" width="235" height="120" rx="8" fill="url(#ooc-si-2)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="157" y="224" textAnchor="middle" fontSize="12" fontWeight="700" fill="#d97706">特征一：灵活性</text>
      <text x="157" y="248" textAnchor="middle" fontSize="10" fill="#475569">群体能适应环境变化</text>
      <text x="157" y="268" textAnchor="middle" fontSize="9" fill="#475569">侦察蜂发现更好巢穴</text>
      <text x="157" y="284" textAnchor="middle" fontSize="9" fill="#475569">群体可中途转向</text>
      <text x="157" y="304" textAnchor="middle" fontSize="9" fill="#64748b">非预设程序，实时响应</text>

      <rect x="283" y="202" width="235" height="120" rx="8" fill="url(#ooc-si-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="224" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">特征二：鲁棒性</text>
      <text x="400" y="248" textAnchor="middle" fontSize="10" fill="#475569">个体失败不影响整体</text>
      <text x="400" y="268" textAnchor="middle" fontSize="9" fill="#475569">部分蜜蜂死亡</text>
      <text x="400" y="284" textAnchor="middle" fontSize="9" fill="#475569">群体照常运作</text>
      <text x="400" y="304" textAnchor="middle" fontSize="9" fill="#64748b">无单点故障，冗余容错</text>

      <rect x="526" y="202" width="234" height="120" rx="8" fill="url(#ooc-si-3)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="643" y="224" textAnchor="middle" fontSize="12" fontWeight="700" fill="#059669">特征三：自组织</text>
      <text x="643" y="248" textAnchor="middle" fontSize="10" fill="#475569">无需中央指挥</text>
      <text x="643" y="268" textAnchor="middle" fontSize="9" fill="#475569">每只蜂只遵循局部规则</text>
      <text x="643" y="284" textAnchor="middle" fontSize="9" fill="#475569">全局智能自发涌现</text>
      <text x="643" y="304" textAnchor="middle" fontSize="9" fill="#64748b">自下而上，非自上而下</text>

      {/* 蚁群觅食算法 */}
      <text x="400" y="346" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">蚁群觅食：信息素正反馈</text>

      <rect x="40" y="360" width="170" height="90" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="125" y="382" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">随机探索</text>
      <text x="125" y="402" textAnchor="middle" fontSize="9" fill="#475569">蚂蚁随机走路径</text>
      <text x="125" y="420" textAnchor="middle" fontSize="9" fill="#475569">留下信息素</text>
      <text x="125" y="438" textAnchor="middle" fontSize="9" fill="#64748b">所有路径等概率</text>

      <path d="M212 405 L238 405" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-si-arrow)" />

      <rect x="242" y="360" width="170" height="90" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="327" y="382" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">短路径优势</text>
      <text x="327" y="402" textAnchor="middle" fontSize="9" fill="#475569">短路径来回更快</text>
      <text x="327" y="420" textAnchor="middle" fontSize="9" fill="#475569">信息素积累更密</text>
      <text x="327" y="438" textAnchor="middle" fontSize="9" fill="#64748b">概率开始倾斜</text>

      <path d="M414 405 L440 405" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-si-arrow)" />

      <rect x="444" y="360" width="170" height="90" rx="8" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" />
      <text x="529" y="382" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">正反馈放大</text>
      <text x="529" y="402" textAnchor="middle" fontSize="9" fill="#475569">更多蚂蚁走短路径</text>
      <text x="529" y="420" textAnchor="middle" fontSize="9" fill="#475569">信息素越来越浓</text>
      <text x="529" y="438" textAnchor="middle" fontSize="9" fill="#64748b">马太效应启动</text>

      <path d="M616 405 L642 405" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-si-arrow)" />

      <rect x="646" y="360" width="114" height="90" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="703" y="382" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">最优收敛</text>
      <text x="703" y="402" textAnchor="middle" fontSize="9" fill="#475569">几乎所有蚂蚁</text>
      <text x="703" y="420" textAnchor="middle" fontSize="9" fill="#475569">走最短路径</text>
      <text x="703" y="438" textAnchor="middle" fontSize="9" fill="#64748b">无全局规划</text>

      {/* 底部应用 */}
      <text x="400" y="474" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">群体智能的工程应用</text>

      <rect x="40" y="488" width="235" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="157" y="510" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">蚁群优化算法</text>
      <text x="157" y="530" textAnchor="middle" fontSize="9" fill="#475569">物流路径规划 · 网络路由</text>

      <rect x="283" y="488" width="235" height="56" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="510" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">蜂群算法</text>
      <text x="400" y="530" textAnchor="middle" fontSize="9" fill="#475569">多目标优化 · 工厂调度</text>

      <rect x="526" y="488" width="234" height="56" rx="8" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" />
      <text x="643" y="510" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">无人机集群</text>
      <text x="643" y="530" textAnchor="middle" fontSize="9" fill="#475569">协同搜索 · 编队飞行</text>

      {/* 底部核心原则 */}
      <rect x="40" y="556" width="720" height="20" rx="8" fill="url(#ooc-si-4)" opacity="0.08" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="570" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">核心原则：简单个体 + 局部交互 + 正反馈 = 群体智能涌现</text>
    </svg>
  );
}
