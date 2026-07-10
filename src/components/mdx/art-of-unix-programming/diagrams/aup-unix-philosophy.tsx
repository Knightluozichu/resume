"use client";

export function AupUnixPhilosophyDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="UNIX哲学核心原则图">
      <defs>
        <linearGradient id="aup-up-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="aup-up-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="aup-up-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="aup-up-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="aup-up-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">UNIX 哲学核心原则</text>

      {/* 中心原则 */}
      <rect x="300" y="56" width="200" height="48" rx="10" fill="url(#aup-up-2)" opacity="0.9" />
      <text x="400" y="86" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">模块原则</text>

      {/* 四大原则组 */}
      <rect x="30" y="124" width="360" height="130" rx="10" fill="url(#aup-up-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="50" y="148" fontSize="13" fontWeight="700" fill="#0369a1">简洁性原则</text>
      <text x="50" y="168" fontSize="10" fill="#475569">一个程序只做一件事并做好</text>
      <text x="50" y="184" fontSize="10" fill="#475569">简单优于复杂，复杂优于丑陋</text>
      <text x="50" y="200" fontSize="10" fill="#475569">小即是美——程序保持小巧</text>
      <text x="50" y="216" fontSize="10" fill="#475569">宁可抛弃也不修补</text>
      <rect x="50" y="228" width="100" height="16" rx="4" fill="#0ea5e9" opacity="0.2" />
      <text x="100" y="240" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">Do One Thing Well</text>

      <rect x="410" y="124" width="360" height="130" rx="10" fill="url(#aup-up-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="430" y="148" fontSize="13" fontWeight="700" fill="#15803d">组合性原则</text>
      <text x="430" y="168" fontSize="10" fill="#475569">一切皆文件——统一接口</text>
      <text x="430" y="184" fontSize="10" fill="#475569">文本流是通用接口</text>
      <text x="430" y="200" fontSize="10" fill="#475569">程序协同工作——管道机制</text>
      <text x="430" y="216" fontSize="10" fill="#475569">过滤模式——读输入写输出</text>
      <rect x="430" y="228" width="120" height="16" rx="4" fill="#16a34a" opacity="0.2" />
      <text x="490" y="240" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">Composability</text>

      <rect x="30" y="268" width="360" height="130" rx="10" fill="url(#aup-up-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="50" y="292" fontSize="13" fontWeight="700" fill="#a16207">透明性原则</text>
      <text x="50" y="312" fontSize="10" fill="#475569">数据流而非控制流</text>
      <text x="50" y="328" fontSize="10" fill="#475569">提供机制而非策略</text>
      <text x="50" y="344" fontSize="10" fill="#475569">沉默是金——无输出即成功</text>
      <text x="50" y="360" fontSize="10" fill="#475569">让程序自我描述</text>
      <rect x="50" y="372" width="100" height="16" rx="4" fill="#ca8a04" opacity="0.2" />
      <text x="100" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">Transparency</text>

      <rect x="410" y="268" width="360" height="130" rx="10" fill="url(#aup-up-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="430" y="292" fontSize="13" fontWeight="700" fill="#7e22ce">稳健性原则</text>
      <text x="430" y="312" fontSize="10" fill="#475569">健壮性源于透明与简洁</text>
      <text x="430" y="328" fontSize="10" fill="#475569">优雅不是可选的附加品</text>
      <text x="430" y="344" fontSize="10" fill="#475569">用户比开发者更懂需求</text>
      <text x="430" y="360" fontSize="10" fill="#475569">过早优化是万恶之源</text>
      <rect x="430" y="372" width="100" height="16" rx="4" fill="#9333ea" opacity="0.2" />
      <text x="480" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">Robustness</text>

      {/* 管道组合示例 */}
      <text x="400" y="424" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">管道组合示例</text>

      <rect x="30" y="438" width="160" height="40" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="110" y="462" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">cat file</text>

      <path d="M190 458 L214 458" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-up-arrow)" />

      <rect x="218" y="438" width="160" height="40" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="298" y="462" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">grep pattern</text>

      <path d="M378 458 L402 458" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-up-arrow)" />

      <rect x="406" y="438" width="160" height="40" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="486" y="462" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">sort -u</text>

      <path d="M566 458 L590 458" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-up-arrow)" />

      <rect x="594" y="438" width="176" height="40" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="682" y="462" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">head -10</text>

      {/* 底部总结 */}
      <rect x="30" y="498" width="740" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="520" textAnchor="middle" fontSize="10" fill="#475569">cat file | grep pattern | sort -u | head -10 ——四个小工具组合完成复杂任务</text>

      <rect x="30" y="542" width="740" height="28" rx="8" fill="url(#aup-up-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">核心：简洁 → 组合 → 透明 → 稳健——UNIX 哲学的四大支柱</text>
    </svg>
  );
}
