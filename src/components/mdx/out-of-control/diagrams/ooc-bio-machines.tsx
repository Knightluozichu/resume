"use client";

export function OocBioMachinesDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="生物与机器融合光谱图">
      <defs>
        <linearGradient id="ooc-bm-1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="ooc-bm-bio" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="ooc-bm-mach" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ooc-bm-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <marker id="ooc-bm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">生物与机器的融合光谱</text>

      {/* 顶部光谱条 */}
      <rect x="40" y="56" width="720" height="24" rx="12" fill="url(#ooc-bm-1)" opacity="0.85" />
      <text x="100" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">纯生物</text>
      <text x="400" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">活系统 / Vivisystem</text>
      <text x="700" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">纯机器</text>

      {/* 三列：生物特征 → 融合区 → 机器特征 */}
      <text x="160" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669">生物逻辑</text>
      <text x="400" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="#4f46e5">活系统（融合区）</text>
      <text x="640" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="#d97706">机器逻辑</text>

      {/* 生物特征列 */}
      <rect x="40" y="120" width="240" height="40" rx="8" fill="url(#ooc-bm-bio)" opacity="0.1" stroke="#10b981" strokeWidth="1.5" />
      <text x="160" y="144" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">自修复</text>

      <rect x="40" y="168" width="240" height="40" rx="8" fill="url(#ooc-bm-bio)" opacity="0.1" stroke="#10b981" strokeWidth="1.5" />
      <text x="160" y="192" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">自繁殖</text>

      <rect x="40" y="216" width="240" height="40" rx="8" fill="url(#ooc-bm-bio)" opacity="0.1" stroke="#10b981" strokeWidth="1.5" />
      <text x="160" y="240" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">新陈代谢</text>

      <rect x="40" y="264" width="240" height="40" rx="8" fill="url(#ooc-bm-bio)" opacity="0.1" stroke="#10b981" strokeWidth="1.5" />
      <text x="160" y="288" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">适应性进化</text>

      {/* 融合区列 */}
      <rect x="300" y="120" width="200" height="184" rx="8" fill="url(#ooc-bm-mid)" opacity="0.08" stroke="#6366f1" strokeWidth="2" />
      <text x="400" y="148" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4f46e5">活系统特征</text>
      <text x="400" y="172" textAnchor="middle" fontSize="10" fill="#475569">自发自组织</text>
      <text x="400" y="192" textAnchor="middle" fontSize="10" fill="#475569">非中心化控制</text>
      <text x="400" y="212" textAnchor="middle" fontSize="10" fill="#475569">弹性与冗余</text>
      <text x="400" y="232" textAnchor="middle" fontSize="10" fill="#475569">渐进式增长</text>
      <text x="400" y="252" textAnchor="middle" fontSize="10" fill="#475569">犯错中学习</text>
      <text x="400" y="272" textAnchor="middle" fontSize="10" fill="#475569">对环境开放</text>
      <text x="400" y="292" textAnchor="middle" fontSize="10" fill="#475569">涌现行为</text>

      {/* 机器特征列 */}
      <rect x="520" y="120" width="240" height="40" rx="8" fill="url(#ooc-bm-mach)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="640" y="144" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">精确复制</text>

      <rect x="520" y="168" width="240" height="40" rx="8" fill="url(#ooc-bm-mach)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="640" y="192" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">集中控制</text>

      <rect x="520" y="216" width="240" height="40" rx="8" fill="url(#ooc-bm-mach)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="640" y="240" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">线性因果</text>

      <rect x="520" y="264" width="240" height="40" rx="8" fill="url(#ooc-bm-mach)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="640" y="288" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">效率优先</text>

      {/* 融合案例 */}
      <text x="400" y="330" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">融合案例：从生物到机器的迁移</text>

      <rect x="40" y="344" width="170" height="56" rx="8" fill="url(#ooc-bm-bio)" opacity="0.85" />
      <text x="125" y="368" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">免疫系统</text>
      <text x="125" y="386" textAnchor="middle" fontSize="9" fill="#d1fae5">分布式识别</text>

      <path d="M212 372 L240 372" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-bm-arrow)" />

      <rect x="244" y="344" width="170" height="56" rx="8" fill="url(#ooc-bm-mid)" opacity="0.85" />
      <text x="329" y="368" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">计算机病毒</text>
      <text x="329" y="386" textAnchor="middle" fontSize="9" fill="#e0e7ff">自复制代码</text>

      <path d="M416 372 L444 372" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-bm-arrow)" />

      <rect x="448" y="344" width="170" height="56" rx="8" fill="url(#ooc-bm-mid)" opacity="0.85" />
      <text x="533" y="368" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">蚁群算法</text>
      <text x="533" y="386" textAnchor="middle" fontSize="9" fill="#e0e7ff">群体优化</text>

      <path d="M620 372 L648 372" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-bm-arrow)" />

      <rect x="652" y="344" width="108" height="56" rx="8" fill="url(#ooc-bm-mach)" opacity="0.85" />
      <text x="706" y="368" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">机器人</text>
      <text x="706" y="386" textAnchor="middle" fontSize="9" fill="#fef3c7">自主行为</text>

      {/* 底部九律 */}
      <text x="400" y="424" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">造物九律：从生物到机器的迁移法则</text>

      <rect x="40" y="438" width="235" height="120" rx="8" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" />
      <text x="157" y="458" textAnchor="middle" fontSize="10" fontWeight="700" fill="#059669">生物派生律</text>
      <text x="157" y="478" textAnchor="middle" fontSize="9" fill="#475569">1. 分布式存在</text>
      <text x="157" y="496" textAnchor="middle" fontSize="9" fill="#475569">2. 自下而上控制</text>
      <text x="157" y="514" textAnchor="middle" fontSize="9" fill="#475569">3. 递增收益</text>
      <text x="157" y="532" textAnchor="middle" fontSize="9" fill="#475569">4. 模块化生长</text>
      <text x="157" y="550" textAnchor="middle" fontSize="9" fill="#475569">5. 边缘最大化</text>

      <rect x="283" y="438" width="235" height="120" rx="8" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.5" />
      <text x="400" y="458" textAnchor="middle" fontSize="10" fontWeight="700" fill="#4f46e5">融合迁移律</text>
      <text x="400" y="478" textAnchor="middle" fontSize="9" fill="#475569">6. 礼待错误</text>
      <text x="400" y="496" textAnchor="middle" fontSize="9" fill="#475569">7. 不求最优目标</text>
      <text x="400" y="514" textAnchor="middle" fontSize="9" fill="#475569">8. 持久的不平衡态</text>
      <text x="400" y="532" textAnchor="middle" fontSize="9" fill="#475569">9. 变自生变</text>
      <text x="400" y="550" textAnchor="middle" fontSize="9" fill="#475569">—— 变化本身就是法则</text>

      <rect x="526" y="438" width="234" height="120" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="643" y="458" textAnchor="middle" fontSize="10" fontWeight="700" fill="#d97706">核心理念</text>
      <text x="643" y="480" textAnchor="middle" fontSize="9" fill="#475569">机器正在获得</text>
      <text x="643" y="498" textAnchor="middle" fontSize="9" fill="#475569">生物属性</text>
      <text x="643" y="518" textAnchor="middle" fontSize="9" fill="#475569">生物正在获得</text>
      <text x="643" y="536" textAnchor="middle" fontSize="9" fill="#475569">工程属性</text>
      <text x="643" y="554" textAnchor="middle" fontSize="9" fontWeight="600" fill="#d97706">两者趋同进化</text>
    </svg>
  );
}
