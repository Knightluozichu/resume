"use client";

export function PdpExpertiseLifeDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="专家之路：从新手到专家的成长路径图">
      <defs>
        <linearGradient id="pdp-el-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pdp-el-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="pdp-el-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="pdp-el-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="pdp-el-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">专家之路：从新手到专家</text>

      {/* 四个阶段 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">产生兴趣 → 变得认真 → 全力投入 → 开拓创新</text>

      <rect x="30" y="80" width="175" height="200" rx="12" fill="url(#pdp-el-1)" opacity="0.06" stroke="#0ea5e9" strokeWidth="2" />
      <rect x="30" y="80" width="175" height="38" rx="12" fill="url(#pdp-el-1)" opacity="0.95" />
      <text x="117" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">阶段一：产生兴趣</text>
      <text x="117" y="138" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">兴趣萌芽</text>
      <text x="50" y="162" fontSize="10" fill="#475569">- 父母/环境引导</text>
      <text x="50" y="180" fontSize="10" fill="#475569">- 游戏化初体验</text>
      <text x="50" y="198" fontSize="10" fill="#475569">- 正反馈激励</text>
      <text x="50" y="216" fontSize="10" fill="#475569">- 无压力探索</text>
      <text x="50" y="240" fontSize="10" fill="#475569">关键：培养兴趣</text>
      <text x="50" y="258" fontSize="10" fill="#475569">而非追求成绩</text>

      <path d="M205 180 L225 180" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-el-arrow)" />

      <rect x="230" y="80" width="175" height="200" rx="12" fill="url(#pdp-el-2)" opacity="0.06" stroke="#8b5cf6" strokeWidth="2" />
      <rect x="230" y="80" width="175" height="38" rx="12" fill="url(#pdp-el-2)" opacity="0.95" />
      <text x="317" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">阶段二：变得认真</text>
      <text x="317" y="138" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">系统训练</text>
      <text x="250" y="162" fontSize="10" fill="#475569">- 开始找导师</text>
      <text x="250" y="180" fontSize="10" fill="#475569">- 刻意练习启动</text>
      <text x="250" y="198" fontSize="10" fill="#475569">- 建立练习习惯</text>
      <text x="250" y="216" fontSize="10" fill="#475569">- 接受困难与挫折</text>
      <text x="250" y="240" fontSize="10" fill="#475569">关键：从好玩到</text>
      <text x="250" y="258" fontSize="10" fill="#475569">认真投入的转变</text>

      <path d="M405 180 L425 180" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-el-arrow)" />

      <rect x="430" y="80" width="175" height="200" rx="12" fill="url(#pdp-el-3)" opacity="0.06" stroke="#f59e0b" strokeWidth="2" />
      <rect x="430" y="80" width="175" height="38" rx="12" fill="url(#pdp-el-3)" opacity="0.95" />
      <text x="517" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">阶段三：全力投入</text>
      <text x="517" y="138" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">冲刺专家</text>
      <text x="450" y="162" fontSize="10" fill="#475569">- 投入大量时间</text>
      <text x="450" y="180" fontSize="10" fill="#475569">- 顶级导师指导</text>
      <text x="450" y="198" fontSize="10" fill="#475569">- 跨越多个瓶颈</text>
      <text x="450" y="216" fontSize="10" fill="#475569">- 构建精细表征</text>
      <text x="450" y="240" fontSize="10" fill="#475569">关键：青少年到</text>
      <text x="450" y="258" fontSize="10" fill="#475569">成年期的全力冲刺</text>

      <path d="M605 180 L625 180" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-el-arrow)" />

      <rect x="630" y="80" width="145" height="200" rx="12" fill="url(#pdp-el-4)" opacity="0.06" stroke="#10b981" strokeWidth="2" />
      <rect x="630" y="80" width="145" height="38" rx="12" fill="url(#pdp-el-4)" opacity="0.95" />
      <text x="702" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">阶段四：开拓创新</text>
      <text x="702" y="138" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">超越前人</text>
      <text x="645" y="162" fontSize="10" fill="#475569">- 不再有人指导</text>
      <text x="645" y="180" fontSize="10" fill="#475569">- 自我驱动创新</text>
      <text x="645" y="198" fontSize="10" fill="#475569">- 推动领域发展</text>
      <text x="645" y="216" fontSize="10" fill="#475569">- 创造新知识</text>
      <text x="645" y="240" fontSize="10" fill="#475569">关键：从消费者</text>
      <text x="645" y="258" fontSize="10" fill="#475569">变为创造者</text>

      {/* 年龄与投入 */}
      <text x="400" y="310" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">年龄与投入曲线</text>

      <rect x="40" y="324" width="720" height="80" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="60" y="348" fontSize="10" fill="#64748b">年龄：</text>
      <text x="100" y="348" fontSize="10" fill="#0369a1">0-6岁</text>
      <text x="260" y="348" fontSize="10" fill="#7c3aed">6-12岁</text>
      <text x="420" y="348" fontSize="10" fill="#d97706">13-18岁</text>
      <text x="580" y="348" fontSize="10" fill="#059669">18岁+</text>

      <rect x="60" y="358" width="120" height="20" rx="4" fill="url(#pdp-el-1)" opacity="0.5" />
      <text x="120" y="372" textAnchor="middle" fontSize="9" fill="#fff">兴趣探索</text>

      <rect x="200" y="358" width="140" height="20" rx="4" fill="url(#pdp-el-2)" opacity="0.5" />
      <text x="270" y="372" textAnchor="middle" fontSize="9" fill="#fff">系统训练开始</text>

      <rect x="360" y="358" width="180" height="20" rx="4" fill="url(#pdp-el-3)" opacity="0.5" />
      <text x="450" y="372" textAnchor="middle" fontSize="9" fill="#fff">全力投入（10000小时+）</text>

      <rect x="560" y="358" width="180" height="20" rx="4" fill="url(#pdp-el-4)" opacity="0.5" />
      <text x="650" y="372" textAnchor="middle" fontSize="9" fill="#fff">独立创新</text>

      <text x="400" y="396" textAnchor="middle" fontSize="10" fill="#64748b">刻意练习的投入量随阶段递增，成年后仍可持续</text>

      {/* 年龄非限制 */}
      <text x="400" y="428" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">年龄不是绝对限制</text>

      <rect x="40" y="442" width="350" height="56" rx="8" fill="url(#pdp-el-3)" opacity="0.06" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="464" fontSize="11" fontWeight="600" fill="#d97706">大脑终身可塑</text>
      <text x="60" y="484" fontSize="10" fill="#475569">成年人仍能通过刻意练习发展新技能，</text>
      <text x="60" y="500" fontSize="10" fill="#475569">只是需要更多有意识的设计和投入</text>

      <rect x="410" y="442" width="350" height="56" rx="8" fill="url(#pdp-el-4)" opacity="0.06" stroke="#10b981" strokeWidth="1.5" />
      <text x="430" y="464" fontSize="11" fontWeight="600" fill="#059669">关键在于方法</text>
      <text x="430" y="484" fontSize="10" fill="#475569">不是「天赋决定上限」，而是「方法决定</text>
      <text x="430" y="500" fontSize="10" fill="#475569">速度」，刻意练习让任何人持续进步</text>

      {/* 底部总结 */}
      <rect x="40" y="516" width="720" height="48" rx="8" fill="url(#pdp-el-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="538" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">专家之路 = 兴趣驱动 → 认真训练 → 全力投入 → 开拓创新</text>
      <text x="400" y="556" textAnchor="middle" fontSize="10" fill="#475569">每个阶段都需要刻意练习，区别在于目标、导师水平和投入强度</text>
    </svg>
  );
}
