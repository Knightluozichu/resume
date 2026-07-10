"use client";

export function MsgSportsChampionsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="体育与冠军成长型思维案例图">
      <defs>
        <linearGradient id="msg-sc-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="msg-sc-o" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="msg-sc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">体育与冠军：成长型思维的力量</text>

      {/* 冠军特质 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">成长型冠军的核心特质</text>

      <rect x="40" y="74" width="170" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="125" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">热爱学习</text>
      <text x="125" y="114" textAnchor="middle" fontSize="9" fill="#475569">不满足于已有成绩</text>
      <text x="125" y="128" textAnchor="middle" fontSize="9" fill="#475569">持续寻找改进空间</text>

      <rect x="225" y="74" width="170" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="310" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">拥抱挫折</text>
      <text x="310" y="114" textAnchor="middle" fontSize="9" fill="#475569">失败后更加刻苦</text>
      <text x="310" y="128" textAnchor="middle" fontSize="9" fill="#475569">把挫折当作燃料</text>

      <rect x="410" y="74" width="170" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="495" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">团队精神</text>
      <text x="495" y="114" textAnchor="middle" fontSize="9" fill="#475569">让队友变得更好</text>
      <text x="495" y="128" textAnchor="middle" fontSize="9" fill="#475569">而非个人英雄主义</text>

      <rect x="595" y="74" width="170" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="680" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">找到方法</text>
      <text x="680" y="114" textAnchor="middle" fontSize="9" fill="#475569">天赋不够时用策略</text>
      <text x="680" y="128" textAnchor="middle" fontSize="9" fill="#475569">和毅力来补</text>

      {/* 典型案例 */}
      <text x="400" y="164" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">典型案例</text>

      <rect x="40" y="176" width="350" height="80" rx="8" fill="url(#msg-sc-g)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="60" y="196" fontSize="12" fontWeight="700" fill="#15803d">迈克尔·乔丹</text>
      <text x="60" y="214" fontSize="10" fill="#475569">高中校队落选后每天额外练习数百次投篮</text>
      <text x="60" y="230" fontSize="10" fill="#475569">输球后研究录像、强化弱点</text>
      <text x="60" y="246" fontSize="10" fill="#475569">「我一生中失败了一次又一次，这就是我成功的原因」</text>

      <rect x="410" y="176" width="350" height="80" rx="8" fill="url(#msg-sc-g)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="430" y="196" fontSize="12" fontWeight="700" fill="#15803d">贝比·鲁斯</text>
      <text x="430" y="214" fontSize="10" fill="#475569">棒球史上最伟大击球手之一，也是三振出局最多的球员</text>
      <text x="430" y="230" fontSize="10" fill="#475569">每一次挥棒都是学习的机会，不惧失败</text>
      <text x="430" y="246" fontSize="10" fill="#475569">「每一次击球都让我更接近下一次全垒打」</text>

      <rect x="40" y="266" width="350" height="80" rx="8" fill="url(#msg-sc-g)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="60" y="286" fontSize="12" fontWeight="700" fill="#15803d">米娅·哈姆</text>
      <text x="60" y="304" fontSize="10" fill="#475569">女子足球传奇，训练比任何人都刻苦</text>
      <text x="60" y="320" fontSize="10" fill="#475569">每次训练后加练射门和体能</text>
      <text x="60" y="336" fontSize="10" fill="#475569">「成功不是终点，而是继续前进的起点」</text>

      <rect x="410" y="266" width="350" height="80" rx="8" fill="url(#msg-sc-g)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="430" y="286" fontSize="12" fontWeight="700" fill="#15803d">比利·比恩</text>
      <text x="430" y="304" fontSize="10" fill="#475569">棒球天才少年，却因固定型思维而未能达到预期</text>
      <text x="430" y="320" fontSize="10" fill="#475569">每次击球不顺就摔球棒、发脾气</text>
      <text x="430" y="336" fontSize="10" fill="#475569">后来转变为成长型思维，成为开创数据棒球的管理者</text>

      {/* 固定型 vs 成长型运动员 */}
      <text x="400" y="376" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">两种运动员对比</text>

      <rect x="40" y="388" width="350" height="80" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="60" y="408" fontSize="12" fontWeight="700" fill="#b91c1c">固定型运动员</text>
      <text x="60" y="426" fontSize="10" fill="#475569">依赖「天赋」，轻视训练</text>
      <text x="60" y="442" fontSize="10" fill="#475569">输了 = 裁判不公 / 运气差</text>
      <text x="60" y="458" fontSize="10" fill="#475569">把队友当作衬托自己的工具</text>

      <rect x="410" y="388" width="350" height="80" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="430" y="408" fontSize="12" fontWeight="700" fill="#15803d">成长型运动员</text>
      <text x="430" y="426" fontSize="10" fill="#475569">热爱训练过程，持续进步</text>
      <text x="430" y="442" fontSize="10" fill="#475569">输了 = 分析原因、加强训练</text>
      <text x="430" y="458" fontSize="10" fill="#475569">激发队友潜能，共同成长</text>

      {/* 底部：冠军公式 */}
      <rect x="40" y="488" width="720" height="36" rx="8" fill="url(#msg-sc-o)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="400" y="510" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">冠军公式：天赋 × 努力 × 策略 × 从失败中学习</text>

      {/* 底部总结 */}
      <rect x="40" y="534" width="720" height="28" rx="8" fill="url(#msg-sc-g)" opacity="0.08" stroke="#16a34a" strokeWidth="2" />
      <text x="400" y="552" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">核心洞察：冠军不是「天生的赢家」，而是「持续的学习者」</text>
    </svg>
  );
}
