"use client";

export function OocFutureTrendsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="未来趋势与启示技术生物化对比图">
      <defs>
        <linearGradient id="ooc-ft-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="ooc-ft-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="ooc-ft-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ooc-ft-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="ooc-ft-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">未来趋势与启示：技术生物化</text>

      {/* 四大趋势 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四大未来趋势</text>

      <rect x="40" y="74" width="345" height="100" rx="10" fill="url(#ooc-ft-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="212" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">趋势一：技术生物化</text>
      <text x="212" y="118" textAnchor="middle" fontSize="10" fill="#475569">机器获得生物属性</text>
      <text x="212" y="136" textAnchor="middle" fontSize="10" fill="#475569">自修复 · 自进化 · 自繁殖</text>
      <text x="212" y="154" textAnchor="middle" fontSize="9" fill="#64748b">技术不再是冰冷的工具，而是活的伙伴</text>

      <rect x="415" y="74" width="345" height="100" rx="10" fill="url(#ooc-ft-2)" opacity="0.08" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="587" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7c3aed">趋势二：生物工程化</text>
      <text x="587" y="118" textAnchor="middle" fontSize="10" fill="#475569">生命获得工程属性</text>
      <text x="587" y="136" textAnchor="middle" fontSize="10" fill="#475569">基因编辑 · 合成生物 · 定制进化</text>
      <text x="587" y="154" textAnchor="middle" fontSize="9" fill="#64748b">生命不再是不可触碰的奇迹，而是可设计的产品</text>

      <rect x="40" y="184" width="345" height="100" rx="10" fill="url(#ooc-ft-3)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="212" y="206" textAnchor="middle" fontSize="12" fontWeight="700" fill="#d97706">趋势三：网络无处不在</text>
      <text x="212" y="228" textAnchor="middle" fontSize="10" fill="#475569">万物互联到万物共生</text>
      <text x="212" y="246" textAnchor="middle" fontSize="10" fill="#475569">物联网 · 边缘计算 · 去中心化</text>
      <text x="212" y="264" textAnchor="middle" fontSize="9" fill="#64748b">连接不再是选项，而是存在的默认状态</text>

      <rect x="415" y="184" width="345" height="100" rx="10" fill="url(#ooc-ft-4)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="587" y="206" textAnchor="middle" fontSize="12" fontWeight="700" fill="#059669">趋势四：进化式创新</text>
      <text x="587" y="228" textAnchor="middle" fontSize="10" fill="#475569">从设计到进化</text>
      <text x="587" y="246" textAnchor="middle" fontSize="10" fill="#475569">遗传算法 · 涌现设计 · 适应性系统</text>
      <text x="587" y="264" textAnchor="middle" fontSize="9" fill="#64748b">最好的设计不是规划出来的，而是进化出来的</text>

      {/* 趋同进化：生物 ← → 机器 */}
      <text x="400" y="306" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">趋同进化：生物与机器走向合一</text>

      <rect x="40" y="320" width="200" height="80" rx="8" fill="url(#ooc-ft-4)" opacity="0.7" />
      <text x="140" y="348" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">生物世界</text>
      <text x="140" y="372" textAnchor="middle" fontSize="9" fill="#d1fae5">自组织 · 冗余 · 进化</text>
      <text x="140" y="388" textAnchor="middle" fontSize="9" fill="#d1fae5">获得工程属性</text>

      <path d="M242 360 L318 360" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-ft-arrow)" />
      <path d="M558 360 L482 360" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-ft-arrow)" />

      <rect x="322" y="320" width="160" height="80" rx="8" fill="url(#ooc-ft-2)" opacity="0.15" stroke="#8b5cf6" strokeWidth="2" />
      <text x="402" y="348" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7c3aed">活系统</text>
      <text x="402" y="372" textAnchor="middle" fontSize="9" fill="#475569">生物逻辑 + 机器逻辑</text>
      <text x="402" y="388" textAnchor="middle" fontSize="9" fill="#64748b">趋同融合</text>

      <rect x="560" y="320" width="200" height="80" rx="8" fill="url(#ooc-ft-3)" opacity="0.7" />
      <text x="660" y="348" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">机器世界</text>
      <text x="660" y="372" textAnchor="middle" fontSize="9" fill="#fef3c7">精确 · 高效 · 可控</text>
      <text x="660" y="388" textAnchor="middle" fontSize="9" fill="#fef3c7">获得生物属性</text>

      {/* 三大启示 */}
      <text x="400" y="424" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三大启示</text>

      <rect x="40" y="438" width="235" height="90" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="157" y="460" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">启示一：拥抱不确定性</text>
      <text x="157" y="482" textAnchor="middle" fontSize="9" fill="#475569">复杂系统无法完全预测</text>
      <text x="157" y="500" textAnchor="middle" fontSize="9" fill="#475569">设计规则而非设计结果</text>
      <text x="157" y="518" textAnchor="middle" fontSize="9" fill="#64748b">在涌现中寻找机会</text>

      <rect x="283" y="438" width="235" height="90" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="460" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">启示二：培育而非建造</text>
      <text x="400" y="482" textAnchor="middle" fontSize="9" fill="#475569">像园丁而非工程师</text>
      <text x="400" y="500" textAnchor="middle" fontSize="9" fill="#475569">创造条件让系统自组织</text>
      <text x="400" y="518" textAnchor="middle" fontSize="9" fill="#64748b">耐心等待涌现</text>

      <rect x="526" y="438" width="234" height="90" rx="8" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" />
      <text x="643" y="460" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">启示三：与失控共存</text>
      <text x="643" y="482" textAnchor="middle" fontSize="9" fill="#475569">放弃完全控制的幻想</text>
      <text x="643" y="500" textAnchor="middle" fontSize="9" fill="#475569">在失控中寻找新秩序</text>
      <text x="643" y="518" textAnchor="middle" fontSize="9" fill="#64748b">失控不是混乱而是自由</text>

      {/* 底部总结 */}
      <rect x="40" y="540" width="720" height="32" rx="8" fill="url(#ooc-ft-2)" opacity="0.08" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">核心启示：未来属于能像生物一样适应、进化、共生的技术系统</text>
    </svg>
  );
}
