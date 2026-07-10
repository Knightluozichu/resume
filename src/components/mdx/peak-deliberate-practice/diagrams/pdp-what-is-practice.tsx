"use client";

export function PdpWhatIsPracticeDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="三种练习方式对比图">
      <defs>
        <linearGradient id="pdp-wp-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pdp-wp-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="pdp-wp-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="pdp-wp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">三种练习方式对比</text>

      {/* 天真练习 */}
      <rect x="30" y="60" width="240" height="400" rx="12" fill="url(#pdp-wp-1)" opacity="0.06" stroke="#0ea5e9" strokeWidth="2" />
      <rect x="30" y="60" width="240" height="44" rx="12" fill="url(#pdp-wp-1)" opacity="0.95" />
      <text x="150" y="88" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">天真练习</text>

      <text x="150" y="128" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0369a1">Naive Practice</text>

      <text x="50" y="156" fontSize="11" fill="#475569">特征：</text>
      <text x="50" y="176" fontSize="11" fill="#475569">- 简单重复，无明确目标</text>
      <text x="50" y="196" fontSize="11" fill="#475569">- 到达「可接受」即停止</text>
      <text x="50" y="216" fontSize="11" fill="#475569">- 无反馈，无纠错</text>
      <text x="50" y="236" fontSize="11" fill="#475569">- 自动化后不再进步</text>

      <text x="50" y="270" fontSize="11" fill="#475569">典型场景：</text>
      <text x="50" y="290" fontSize="11" fill="#475569">开了20年车的老司机</text>
      <text x="50" y="310" fontSize="11" fill="#475569">弹了10年同一首曲子</text>

      <rect x="50" y="340" width="200" height="50" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="150" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">结果：停滞</text>
      <text x="150" y="380" textAnchor="middle" fontSize="10" fill="#dc2626">能力冻结在「可接受」水平</text>

      <text x="150" y="420" textAnchor="middle" fontSize="10" fill="#94a3b8">「无意识地重复」</text>
      <text x="150" y="438" textAnchor="middle" fontSize="10" fill="#94a3b8">不等于练习</text>

      {/* 目的练习 */}
      <rect x="290" y="60" width="240" height="400" rx="12" fill="url(#pdp-wp-2)" opacity="0.06" stroke="#8b5cf6" strokeWidth="2" />
      <rect x="290" y="60" width="240" height="44" rx="12" fill="url(#pdp-wp-2)" opacity="0.95" />
      <text x="410" y="88" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">目的练习</text>

      <text x="410" y="128" textAnchor="middle" fontSize="12" fontWeight="600" fill="#7c3aed">Purposeful Practice</text>

      <text x="310" y="156" fontSize="11" fill="#475569">特征：</text>
      <text x="310" y="176" fontSize="11" fill="#475569">- 明确的特定目标</text>
      <text x="310" y="196" fontSize="11" fill="#475569">- 专注投入</text>
      <text x="310" y="216" fontSize="11" fill="#475569">- 有即时反馈</text>
      <text x="310" y="236" fontSize="11" fill="#475569">- 跳出舒适区</text>

      <text x="310" y="270" fontSize="11" fill="#475569">典型场景：</text>
      <text x="310" y="290" fontSize="11" fill="#475569">跑步计时冲刺</text>
      <text x="310" y="310" fontSize="11" fill="#475569">背单词打卡</text>

      <rect x="310" y="340" width="200" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="410" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">结果：有进步</text>
      <text x="410" y="380" textAnchor="middle" fontSize="10" fill="#f59e0b">但容易遇到瓶颈</text>

      <text x="410" y="420" textAnchor="middle" fontSize="10" fill="#94a3b8">「有意识地努力」</text>
      <text x="410" y="438" textAnchor="middle" fontSize="10" fill="#94a3b8">但缺乏领域知识</text>

      {/* 刻意练习 */}
      <rect x="550" y="60" width="240" height="400" rx="12" fill="url(#pdp-wp-3)" opacity="0.06" stroke="#f59e0b" strokeWidth="2" />
      <rect x="550" y="60" width="240" height="44" rx="12" fill="url(#pdp-wp-3)" opacity="0.95" />
      <text x="670" y="88" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">刻意练习</text>

      <text x="670" y="128" textAnchor="middle" fontSize="12" fontWeight="600" fill="#d97706">Deliberate Practice</text>

      <text x="570" y="156" fontSize="11" fill="#475569">特征：</text>
      <text x="570" y="176" fontSize="11" fill="#475569">- 已建立的专家标准</text>
      <text x="570" y="196" fontSize="11" fill="#475569">- 在舒适区外练习</text>
      <text x="570" y="216" fontSize="11" fill="#475569">- 有导师设计练习</text>
      <text x="570" y="236" fontSize="11" fill="#475569">- 持续构建心理表征</text>

      <text x="570" y="270" fontSize="11" fill="#475569">典型场景：</text>
      <text x="570" y="290" fontSize="11" fill="#475569">音乐学院系统训练</text>
      <text x="570" y="310" fontSize="11" fill="#475569">职业棋手复盘研究</text>

      <rect x="570" y="340" width="200" height="50" rx="8" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
      <text x="670" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">结果：持续突破</text>
      <text x="670" y="380" textAnchor="middle" fontSize="10" fill="#059669">向专家水平逼近</text>

      <text x="670" y="420" textAnchor="middle" fontSize="10" fill="#94a3b8">「有导师+有标准</text>
      <text x="670" y="438" textAnchor="middle" fontSize="10" fill="#94a3b8">+有表征」</text>

      {/* 进步曲线对比 */}
      <text x="400" y="488" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">进步曲线对比</text>

      <rect x="40" y="500" width="720" height="60" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <path d="M60 545 L200 540 L400 538 L700 537" stroke="#0ea5e9" strokeWidth="2" fill="none" />
      <text x="710" y="540" fontSize="9" fill="#0ea5e9">天真</text>
      <path d="M60 548 L200 530 L400 515 L700 508" stroke="#8b5cf6" strokeWidth="2" fill="none" />
      <text x="710" y="512" fontSize="9" fill="#8b5cf6">目的</text>
      <path d="M60 550 L200 520 L400 495 L700 502" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
      <text x="710" y="505" fontSize="9" fill="#f59e0b">刻意</text>
    </svg>
  );
}
