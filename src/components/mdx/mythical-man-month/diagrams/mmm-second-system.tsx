"use client";

export function MmmSecondSystemDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="第二系统效应过度设计陷阱示意图">
      <defs>
        <linearGradient id="mmm-ss-first" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="mmm-ss-second" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="mmm-ss-third" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <marker id="mmm-ss-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">第二系统效应：架构师的最大陷阱</text>

      {/* 三代系统对比 */}
      <text x="400" y="68" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三代系统的设计倾向</text>

      {/* 第一系统 */}
      <rect x="40" y="80" width="220" height="200" rx="10" fill="url(#mmm-ss-first)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <rect x="40" y="80" width="220" height="34" rx="10" fill="url(#mmm-ss-first)" opacity="0.9" />
      <text x="150" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">第一系统</text>
      <text x="150" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">谨慎保守</text>
      <text x="60" y="158" fontSize="10" fill="#475569">- 只做必要的功能</text>
      <text x="60" y="176" fontSize="10" fill="#475569">- 设计简洁，避免过度</text>
      <text x="60" y="194" fontSize="10" fill="#475569">- 缺乏经验，力求安全</text>
      <text x="60" y="212" fontSize="10" fill="#475569">- 通常成功且实用</text>
      <text x="60" y="240" fontSize="10" fontWeight="600" fill="#15803d">结果：可靠、可用</text>
      <text x="60" y="262" fontSize="10" fill="#475569">建立了信心和信任</text>

      <path d="M260 180 L290 180" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-ss-arrow)" />

      {/* 第二系统 */}
      <rect x="290" y="80" width="220" height="200" rx="10" fill="url(#mmm-ss-second)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <rect x="290" y="80" width="220" height="34" rx="10" fill="url(#mmm-ss-second)" opacity="0.9" />
      <text x="400" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">第二系统（陷阱）</text>
      <text x="400" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">过度设计</text>
      <text x="310" y="158" fontSize="10" fill="#475569">- 堆砌所有「好想法」</text>
      <text x="310" y="176" fontSize="10" fill="#475569">- 功能蔓延，过度装饰</text>
      <text x="310" y="194" fontSize="10" fill="#475569">- 架构过度抽象和通用</text>
      <text x="310" y="212" fontSize="10" fill="#475569">- 忽视性能和实用性</text>
      <text x="310" y="240" fontSize="10" fontWeight="600" fill="#b91c1c">结果：臃肿、迟缓、超期</text>
      <text x="310" y="262" fontSize="10" fill="#475569">「这是架构师最危险的系统」</text>

      <path d="M510 180 L540 180" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-ss-arrow)" />

      {/* 第三系统 */}
      <rect x="540" y="80" width="220" height="200" rx="10" fill="url(#mmm-ss-third)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <rect x="540" y="80" width="220" height="34" rx="10" fill="url(#mmm-ss-third)" opacity="0.9" />
      <text x="650" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">第三系统</text>
      <text x="650" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">成熟回归</text>
      <text x="560" y="158" fontSize="10" fill="#475569">- 吸取第二系统教训</text>
      <text x="560" y="176" fontSize="10" fill="#475569">- 设计重新简洁务实</text>
      <text x="560" y="194" fontSize="10" fill="#475569">- 功能精简，性能优先</text>
      <text x="560" y="212" fontSize="10" fill="#475569">- 经验丰富，判断成熟</text>
      <text x="560" y="240" fontSize="10" fontWeight="600" fill="#0369a1">结果：最佳系统</text>
      <text x="560" y="262" fontSize="10" fill="#475569">兼具实用性与优雅</text>

      {/* 中部：第二系统的症状 */}
      <text x="400" y="312" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">第二系统效应的典型症状</text>

      <rect x="40" y="324" width="170" height="70" rx="8" fill="url(#mmm-ss-second)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="125" y="348" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">功能蔓延</text>
      <text x="125" y="368" textAnchor="middle" fontSize="9" fill="#475569">每个想到的功能</text>
      <text x="125" y="382" textAnchor="middle" fontSize="9" fill="#475569">都被塞进去</text>

      <rect x="230" y="324" width="170" height="70" rx="8" fill="url(#mmm-ss-second)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="315" y="348" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">过度通用</text>
      <text x="315" y="368" textAnchor="middle" fontSize="9" fill="#475569">为假想场景设计</text>
      <text x="315" y="382" textAnchor="middle" fontSize="9" fill="#475569">抽象层过多</text>

      <rect x="420" y="324" width="170" height="70" rx="8" fill="url(#mmm-ss-second)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="505" y="348" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">装饰过度</text>
      <text x="505" y="368" textAnchor="middle" fontSize="9" fill="#475569">UI/交互花哨</text>
      <text x="505" y="382" textAnchor="middle" fontSize="9" fill="#475569">偏离核心价值</text>

      <rect x="610" y="324" width="150" height="70" rx="8" fill="url(#mmm-ss-second)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="685" y="348" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">进度失控</text>
      <text x="685" y="368" textAnchor="middle" fontSize="9" fill="#475569">范围远超预估</text>
      <text x="685" y="382" textAnchor="middle" fontSize="9" fill="#475569">预算严重超支</text>

      {/* 对策 */}
      <text x="400" y="420" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">如何避免第二系统效应</text>

      <rect x="40" y="432" width="720" height="60" rx="8" fill="url(#mmm-ss-first)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="60" y="454" fontSize="10" fill="#475569">1. 坚持概念完整性，每加一个功能问「这是必需的吗？」</text>
      <text x="60" y="472" fontSize="10" fill="#475569">2. 为自己设定一个可丢弃的系统（先构建原型再丢弃）；3. 控制范围，敢于说「不」</text>
      <text x="60" y="488" fontSize="10" fill="#475569">4. 指派一个有经验的架构师来把关；5. 采用增量交付而非大爆炸发布</text>

      {/* 底部总结 */}
      <rect x="40" y="500" width="720" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="520" textAnchor="middle" fontSize="11" fill="#475569">第二系统效应是架构师信心膨胀后的自然产物，明知故犯的陷阱</text>

      <rect x="40" y="542" width="720" height="28" rx="8" fill="url(#mmm-ss-second)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">核心教训：第二系统是最危险的，必须有意克制功能蔓延</text>
    </svg>
  );
}
