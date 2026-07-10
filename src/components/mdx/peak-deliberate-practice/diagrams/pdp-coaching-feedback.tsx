"use client";

export function PdpCoachingFeedbackDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="导师与反馈：教练循环图">
      <defs>
        <linearGradient id="pdp-cf-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pdp-cf-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="pdp-cf-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="pdp-cf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">导师与反馈：找到好教练</text>

      {/* 导师的核心价值 */}
      <text x="400" y="66" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">导师的四大核心价值</text>

      <rect x="40" y="80" width="170" height="110" rx="10" fill="url(#pdp-cf-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="125" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">设计练习</text>
      <text x="125" y="126" textAnchor="middle" fontSize="10" fill="#475569">知道该练什么</text>
      <text x="125" y="144" textAnchor="middle" fontSize="10" fill="#475569">分解技能台阶</text>
      <text x="125" y="162" textAnchor="middle" fontSize="10" fill="#475569">安排难度递进</text>
      <text x="125" y="180" textAnchor="middle" fontSize="10" fill="#475569">避免无效努力</text>

      <rect x="225" y="80" width="170" height="110" rx="10" fill="url(#pdp-cf-2)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="310" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="#d97706">提供反馈</text>
      <text x="310" y="126" textAnchor="middle" fontSize="10" fill="#475569">即时发现错误</text>
      <text x="310" y="144" textAnchor="middle" fontSize="10" fill="#475569">指出偏差根源</text>
      <text x="310" y="162" textAnchor="middle" fontSize="10" fill="#475569">给出纠正方案</text>
      <text x="310" y="180" textAnchor="middle" fontSize="10" fill="#475569">自己看不到的盲区</text>

      <rect x="410" y="80" width="170" height="110" rx="10" fill="url(#pdp-cf-3)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="495" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="#059669">传授表征</text>
      <text x="495" y="126" textAnchor="middle" fontSize="10" fill="#475569">分享专家视角</text>
      <text x="495" y="144" textAnchor="middle" fontSize="10" fill="#475569">传递领域知识</text>
      <text x="495" y="162" textAnchor="middle" fontSize="10" fill="#475569">教授自我监控</text>
      <text x="495" y="180" textAnchor="middle" fontSize="10" fill="#475569">构建心理表征</text>

      <rect x="595" y="80" width="170" height="110" rx="10" fill="url(#pdp-cf-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="680" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">跨越瓶颈</text>
      <text x="680" y="126" textAnchor="middle" fontSize="10" fill="#475569">识别停滞原因</text>
      <text x="680" y="144" textAnchor="middle" fontSize="10" fill="#475569">引入新方法</text>
      <text x="680" y="162" textAnchor="middle" fontSize="10" fill="#475569">调整训练方向</text>
      <text x="680" y="180" textAnchor="middle" fontSize="10" fill="#475569">保持动力信心</text>

      {/* 教练循环 */}
      <text x="400" y="224" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">教练反馈循环</text>

      <rect x="100" y="240" width="140" height="56" rx="10" fill="url(#pdp-cf-1)" opacity="0.9" />
      <text x="170" y="264" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">导师设计任务</text>
      <text x="170" y="282" textAnchor="middle" fontSize="9" fill="#e0f2fe">针对性练习计划</text>

      <path d="M240 268 L320 268" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-cf-arrow)" />

      <rect x="324" y="240" width="140" height="56" rx="10" fill="url(#pdp-cf-2)" opacity="0.9" />
      <text x="394" y="264" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">学生执行练习</text>
      <text x="394" y="282" textAnchor="middle" fontSize="9" fill="#fef3c7">专注投入</text>

      <path d="M464 268 L544 268" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-cf-arrow)" />

      <rect x="548" y="240" width="140" height="56" rx="10" fill="url(#pdp-cf-3)" opacity="0.9" />
      <text x="618" y="264" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">导师观察评估</text>
      <text x="618" y="282" textAnchor="middle" fontSize="9" fill="#d1fae5">即时反馈纠错</text>

      <path d="M618 240 Q618 210 394 210 Q170 210 170 240" stroke="#64748b" strokeWidth="2" fill="none" strokeDasharray="4 4" markerEnd="url(#pdp-cf-arrow)" />
      <text x="394" y="202" textAnchor="middle" fontSize="9" fill="#64748b">调整任务难度与方向 → 进入下一轮</text>

      {/* 选择导师的原则 */}
      <text x="400" y="320" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">选择导师的五项原则</text>

      <rect x="40" y="334" width="350" height="36" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="60" y="356" fontSize="11" fontWeight="600" fill="#0369a1">1.</text>
      <text x="80" y="356" fontSize="11" fill="#475569">在该领域有真本领，不只是理论</text>

      <rect x="410" y="334" width="350" height="36" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="430" y="356" fontSize="11" fontWeight="600" fill="#0369a1">2.</text>
      <text x="450" y="356" fontSize="11" fill="#475569">有教学经验，能分解技能阶梯</text>

      <rect x="40" y="376" width="350" height="36" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="60" y="398" fontSize="11" fontWeight="600" fill="#0369a1">3.</text>
      <text x="80" y="398" fontSize="11" fill="#475569">能给出具体反馈，而非泛泛鼓励</text>

      <rect x="410" y="376" width="350" height="36" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="430" y="398" fontSize="11" fontWeight="600" fill="#0369a1">4.</text>
      <text x="450" y="398" fontSize="11" fill="#475569">随你进步能调整教学策略</text>

      <rect x="40" y="418" width="720" height="36" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="60" y="440" fontSize="11" fontWeight="600" fill="#0369a1">5.</text>
      <text x="80" y="440" fontSize="11" fill="#475569">当你超越导师时应及时更换——导师的水平决定你的天花板</text>

      {/* 自我反馈 */}
      <text x="400" y="480" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">没有导师时：自我反馈法</text>

      <rect x="40" y="494" width="720" height="70" rx="8" fill="url(#pdp-cf-3)" opacity="0.06" stroke="#10b981" strokeWidth="1.5" />
      <text x="60" y="516" fontSize="11" fill="#475569">本杰明·富兰克林学写作法：找一篇好文章 → 读后凭记忆重写 → 与原文逐句对比 → 找出差距 → 针对性改进。</text>
      <text x="60" y="536" fontSize="11" fill="#475569">核心思路：找到可对比的标杆（原文/录像/数据）→ 自我执行 → 对比差距 → 分析原因 → 针对练习。</text>
      <text x="60" y="556" fontSize="11" fontWeight="600" fill="#059669">关键：必须有一个「客观标准」来替代导师的反馈功能。</text>
    </svg>
  );
}
