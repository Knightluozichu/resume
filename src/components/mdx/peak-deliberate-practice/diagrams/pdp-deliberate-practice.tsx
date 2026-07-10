"use client";

export function PdpDeliberatePracticeDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="刻意练习四大核心原则图">
      <defs>
        <linearGradient id="pdp-dp-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pdp-dp-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="pdp-dp-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="pdp-dp-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="pdp-dp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">刻意练习的四大核心原则</text>

      {/* 四大原则卡片 */}
      <rect x="40" y="60" width="340" height="160" rx="12" fill="url(#pdp-dp-1)" opacity="0.06" stroke="#0ea5e9" strokeWidth="2" />
      <circle cx="80" cy="96" r="22" fill="url(#pdp-dp-1)" opacity="0.95" />
      <text x="80" y="102" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">1</text>
      <text x="115" y="96" fontSize="14" fontWeight="700" fill="#0369a1">明确目标</text>
      <text x="115" y="114" fontSize="11" fill="#475569">Define Specific Goals</text>
      <text x="60" y="146" fontSize="11" fill="#475569">不是「练一小时钢琴」</text>
      <text x="60" y="166" fontSize="11" fill="#475569">而是「以正确指法弹三遍</text>
      <text x="60" y="184" fontSize="11" fill="#475569">这首曲子的困难段落，</text>
      <text x="60" y="202" fontSize="11" fill="#475569">每次错误后分析原因」</text>

      <rect x="420" y="60" width="340" height="160" rx="12" fill="url(#pdp-dp-2)" opacity="0.06" stroke="#8b5cf6" strokeWidth="2" />
      <circle cx="460" cy="96" r="22" fill="url(#pdp-dp-2)" opacity="0.95" />
      <text x="460" y="102" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">2</text>
      <text x="495" y="96" fontSize="14" fontWeight="700" fill="#7c3aed">全神贯注</text>
      <text x="495" y="114" fontSize="11" fill="#475569">Full Concentration</text>
      <text x="440" y="146" fontSize="11" fill="#475569">刻意练习不是「自动播放」</text>
      <text x="440" y="166" fontSize="11" fill="#475569">必须有意识地关注每个动作</text>
      <text x="440" y="184" fontSize="11" fill="#475569">走神 = 退步</text>
      <text x="440" y="202" fontSize="11" fill="#475569">专注力是练习质量的瓶颈</text>

      <rect x="40" y="240" width="340" height="160" rx="12" fill="url(#pdp-dp-3)" opacity="0.06" stroke="#f59e0b" strokeWidth="2" />
      <circle cx="80" cy="276" r="22" fill="url(#pdp-dp-3)" opacity="0.95" />
      <text x="80" y="282" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">3</text>
      <text x="115" y="276" fontSize="14" fontWeight="700" fill="#d97706">即时反馈</text>
      <text x="115" y="294" fontSize="11" fill="#475569">Immediate Feedback</text>
      <text x="60" y="326" fontSize="11" fill="#475569">必须知道自己做对了什么</text>
      <text x="60" y="346" fontSize="11" fill="#475569">做错了什么、如何纠正</text>
      <text x="60" y="366" fontSize="11" fill="#475569">反馈来源：导师、录音、</text>
      <text x="60" y="384" fontSize="11" fill="#475569">录像、数据、自我监控</text>

      <rect x="420" y="240" width="340" height="160" rx="12" fill="url(#pdp-dp-4)" opacity="0.06" stroke="#10b981" strokeWidth="2" />
      <circle cx="460" cy="276" r="22" fill="url(#pdp-dp-4)" opacity="0.95" />
      <text x="460" y="282" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">4</text>
      <text x="495" y="276" fontSize="14" fontWeight="700" fill="#059669">舒适区外</text>
      <text x="495" y="294" fontSize="11" fill="#475569">Beyond Comfort Zone</text>
      <text x="440" y="326" fontSize="11" fill="#475569">永远在能力的边缘练习</text>
      <text x="440" y="346" fontSize="11" fill="#475569">不断尝试刚好做不到的事</text>
      <text x="440" y="366" fontSize="11" fill="#475569">舒适区 = 停滞区</text>
      <text x="440" y="384" fontSize="11" fill="#475569">挑战适度才能持续进步</text>

      {/* 刻意练习循环 */}
      <text x="400" y="432" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">刻意练习循环</text>

      <rect x="60" y="446" width="130" height="44" rx="10" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="125" y="466" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">设定目标</text>
      <text x="125" y="480" textAnchor="middle" fontSize="9" fill="#475569">明确要练什么</text>

      <path d="M190 468 L230 468" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-dp-arrow)" />

      <rect x="234" y="446" width="130" height="44" rx="10" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="299" y="466" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">专注练习</text>
      <text x="299" y="480" textAnchor="middle" fontSize="9" fill="#475569">全神贯注执行</text>

      <path d="M364 468 L404 468" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-dp-arrow)" />

      <rect x="408" y="446" width="130" height="44" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="473" y="466" textAnchor="middle" fontSize="10" fontWeight="600" fill="#d97706">获取反馈</text>
      <text x="473" y="480" textAnchor="middle" fontSize="9" fill="#475569">评估表现</text>

      <path d="M538 468 L578 468" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-dp-arrow)" />

      <rect x="582" y="446" width="130" height="44" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
      <text x="647" y="466" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">纠正迭代</text>
      <text x="647" y="480" textAnchor="middle" fontSize="9" fill="#475569">调整再练</text>

      <path d="M647 446 Q647 422 125 422 Q125 422 125 446" stroke="#64748b" strokeWidth="2" fill="none" strokeDasharray="4 4" markerEnd="url(#pdp-dp-arrow)" />
      <text x="386" y="414" textAnchor="middle" fontSize="9" fill="#64748b">循环往复 · 每轮提升一个微小台阶</text>

      {/* 底部总结 */}
      <rect x="40" y="510" width="720" height="54" rx="8" fill="url(#pdp-dp-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="532" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">刻意练习 = 明确目标 + 全神贯注 + 即时反馈 + 舒适区外</text>
      <text x="400" y="552" textAnchor="middle" fontSize="10" fill="#475569">不是练得更久，而是练得更聪明——每一分钟都在挑战能力的边界</text>
    </svg>
  );
}
