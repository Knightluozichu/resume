"use client";

export function PdpCrossingPlateausDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="跨越瓶颈：突破停滞期策略图">
      <defs>
        <linearGradient id="pdp-cp-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pdp-cp-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="pdp-cp-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="pdp-cp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">跨越瓶颈：突破停滞期</text>

      {/* 瓶颈曲线 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">能力发展曲线与瓶颈现象</text>

      <rect x="40" y="76" width="720" height="160" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      <path d="M60 220 L160 180 L260 160 L360 155 L460 155 L560 120 L660 100 L740 90" stroke="url(#pdp-cp-1)" strokeWidth="3" fill="none" />

      <rect x="320" y="140" width="140" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="390" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">瓶颈期 Plateau</text>

      <text x="120" y="200" fontSize="10" fill="#0369a1">快速进步</text>
      <text x="390" y="135" fontSize="10" fill="#d97706">停滞</text>
      <text x="650" y="85" fontSize="10" fill="#059669">突破后加速</text>

      <text x="60" y="240" fontSize="10" fill="#64748b">时间</text>
      <text x="30" y="100" fontSize="10" fill="#64748b">能力</text>

      {/* 瓶颈的四种原因 */}
      <text x="400" y="264" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">瓶颈的四种典型原因</text>

      <rect x="40" y="278" width="170" height="80" rx="10" fill="url(#pdp-cp-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="125" y="300" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">方法不对</text>
      <text x="125" y="320" textAnchor="middle" fontSize="10" fill="#475569">用旧方法练新水平</text>
      <text x="125" y="338" textAnchor="middle" fontSize="10" fill="#475569">需要换策略</text>

      <rect x="225" y="278" width="170" height="80" rx="10" fill="url(#pdp-cp-2)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="310" y="300" textAnchor="middle" fontSize="12" fontWeight="700" fill="#d97706">动力衰退</text>
      <text x="310" y="320" textAnchor="middle" fontSize="10" fill="#475569">新鲜感消失</text>
      <text x="310" y="338" textAnchor="middle" fontSize="10" fill="#475569">看不到进步</text>

      <rect x="410" y="278" width="170" height="80" rx="10" fill="url(#pdp-cp-3)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="495" y="300" textAnchor="middle" fontSize="12" fontWeight="700" fill="#059669">表征不足</text>
      <text x="495" y="320" textAnchor="middle" fontSize="10" fill="#475569">心理表征不够精细</text>
      <text x="495" y="338" textAnchor="middle" fontSize="10" fill="#475569">无法识别微差</text>

      <rect x="595" y="278" width="170" height="80" rx="10" fill="url(#pdp-cp-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="680" y="300" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">舒适区陷阱</text>
      <text x="680" y="320" textAnchor="middle" fontSize="10" fill="#475569">回到自动化</text>
      <text x="680" y="338" textAnchor="middle" fontSize="10" fill="#475569">不再挑战边界</text>

      {/* 突破策略 */}
      <text x="400" y="384" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">突破瓶颈的五大策略</text>

      <rect x="40" y="398" width="350" height="36" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
      <text x="60" y="420" fontSize="11" fontWeight="600" fill="#059669">1.</text>
      <text x="80" y="420" fontSize="11" fill="#475569">换方法——用不同方式做同一件事</text>

      <rect x="410" y="398" width="350" height="36" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
      <text x="430" y="420" fontSize="11" fontWeight="600" fill="#059669">2.</text>
      <text x="450" y="420" fontSize="11" fill="#475569">找导师——局外人视角发现盲区</text>

      <rect x="40" y="440" width="350" height="36" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
      <text x="60" y="462" fontSize="11" fontWeight="600" fill="#059669">3.</text>
      <text x="80" y="462" fontSize="11" fill="#475569">分解细节——放大瓶颈环节专项训练</text>

      <rect x="410" y="440" width="350" height="36" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
      <text x="430" y="462" fontSize="11" fontWeight="600" fill="#059669">4.</text>
      <text x="450" y="462" fontSize="11" fill="#475569">放缓速度——以慢动作找到精准控制</text>

      <rect x="40" y="482" width="720" height="36" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
      <text x="60" y="504" fontSize="11" fontWeight="600" fill="#059669">5.</text>
      <text x="80" y="504" fontSize="11" fill="#475569">设定新挑战——不是更努力，而是换个角度攻克弱点</text>

      {/* 底部总结 */}
      <rect x="40" y="532" width="720" height="32" rx="8" fill="url(#pdp-cp-2)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="552" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">瓶颈不是终点，而是信号——提示你该换方法、换视角、换策略了</text>
    </svg>
  );
}
