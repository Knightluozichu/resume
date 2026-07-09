"use client";

export function MbtFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="精通比特币全书复习：知识整合与系统闭环">
      <defs>
        <linearGradient id="mbt-fr-btc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7931a" />
          <stop offset="100%" stopColor="#e87b00" />
        </linearGradient>
        <linearGradient id="mbt-fr-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mbt-fr-mining" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mbt-fr-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mbt-fr-adv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="mbt-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：比特币知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="140" height="56" rx="8" fill="url(#mbt-fr-btc)" opacity="0.9" />
      <text x="90" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0-1 基础</text>
      <text x="90" y="116" textAnchor="middle" fontSize="9" fill="#fed7aa">全景+概览</text>

      <path d="M162 102 L182 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-fr-arrow)" />

      <rect x="186" y="74" width="140" height="56" rx="8" fill="url(#mbt-fr-core)" opacity="0.9" />
      <text x="256" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch2-4 核心</text>
      <text x="256" y="116" textAnchor="middle" fontSize="9" fill="#ede9fe">密钥+交易+链</text>

      <path d="M328 102 L348 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-fr-arrow)" />

      <rect x="352" y="74" width="140" height="56" rx="8" fill="url(#mbt-fr-mining)" opacity="0.9" />
      <text x="422" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch5-6 网络</text>
      <text x="422" y="116" textAnchor="middle" fontSize="9" fill="#d1fae5">挖矿+P2P</text>

      <path d="M494 102 L514 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-fr-arrow)" />

      <rect x="518" y="74" width="120" height="56" rx="8" fill="url(#mbt-fr-app)" opacity="0.9" />
      <text x="578" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch7 应用</text>
      <text x="578" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">钱包</text>

      <path d="M640 102 L660 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-fr-arrow)" />

      <rect x="664" y="74" width="116" height="56" rx="8" fill="url(#mbt-fr-adv)" opacity="0.9" />
      <text x="722" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch8-9 进阶</text>
      <text x="722" y="116" textAnchor="middle" fontSize="9" fill="#fecaca">扩展+闭环</text>

      {/* 四层系统视角 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四层系统视角</text>

      <rect x="20" y="176" width="185" height="150" rx="8" fill="url(#mbt-fr-btc)" opacity="0.1" stroke="#f7931a" strokeWidth="1.5" />
      <text x="112" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#9a3412">认知层</text>
      <text x="112" y="220" textAnchor="middle" fontSize="10" fill="#475569">比特币设计原理</text>
      <text x="112" y="236" textAnchor="middle" fontSize="10" fill="#475569">去中心化价值</text>
      <text x="112" y="252" textAnchor="middle" fontSize="10" fill="#475569">三层架构</text>
      <text x="112" y="268" textAnchor="middle" fontSize="10" fill="#475569">五大特征</text>
      <text x="112" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f7931a">建立系统认知</text>

      <rect x="217" y="176" width="185" height="150" rx="8" fill="url(#mbt-fr-core)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">密码层</text>
      <text x="310" y="220" textAnchor="middle" fontSize="10" fill="#475569">椭圆曲线密钥</text>
      <text x="310" y="236" textAnchor="middle" fontSize="10" fill="#475569">Base58Check 编码</text>
      <text x="310" y="252" textAnchor="middle" fontSize="10" fill="#475569">UTXO 交易模型</text>
      <text x="310" y="268" textAnchor="middle" fontSize="10" fill="#475569">脚本与签名</text>
      <text x="310" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">定义数据结构</text>

      <rect x="414" y="176" width="185" height="150" rx="8" fill="url(#mbt-fr-mining)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="507" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">共识层</text>
      <text x="507" y="220" textAnchor="middle" fontSize="10" fill="#475569">PoW 挖矿</text>
      <text x="507" y="236" textAnchor="middle" fontSize="10" fill="#475569">难度调整</text>
      <text x="507" y="252" textAnchor="middle" fontSize="10" fill="#475569">最长链原则</text>
      <text x="507" y="268" textAnchor="middle" fontSize="10" fill="#475569">P2P 网络传播</text>
      <text x="507" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">定义去中心化</text>

      <rect x="611" y="176" width="169" height="150" rx="8" fill="url(#mbt-fr-adv)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="696" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">应用层</text>
      <text x="696" y="220" textAnchor="middle" fontSize="10" fill="#475569">HD 钱包与助记词</text>
      <text x="696" y="236" textAnchor="middle" fontSize="10" fill="#475569">隔离见证 SegWit</text>
      <text x="696" y="252" textAnchor="middle" fontSize="10" fill="#475569">闪电网络</text>
      <text x="696" y="268" textAnchor="middle" fontSize="10" fill="#475569">扩展与隐私</text>
      <text x="696" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">定义实际使用</text>

      {/* 比特币设计决策链 */}
      <text x="400" y="350" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">比特币设计决策链</text>

      <rect x="20" y="364" width="120" height="56" rx="8" fill="#fffbeb" stroke="#f7931a" strokeWidth="1.5" />
      <text x="80" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#9a3412">密钥生成</text>
      <text x="80" y="404" textAnchor="middle" fontSize="9" fill="#475569">椭圆曲线</text>

      <path d="M140 392 L158 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-fr-arrow)" />

      <rect x="162" y="364" width="120" height="56" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="222" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">构造交易</text>
      <text x="222" y="404" textAnchor="middle" fontSize="9" fill="#475569">UTXO + 脚本</text>

      <path d="M282 392 L300 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-fr-arrow)" />

      <rect x="304" y="364" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="364" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">广播验证</text>
      <text x="364" y="404" textAnchor="middle" fontSize="9" fill="#475569">P2P 传播</text>

      <path d="M424 392 L442 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-fr-arrow)" />

      <rect x="446" y="364" width="120" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="506" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">打包挖矿</text>
      <text x="506" y="404" textAnchor="middle" fontSize="9" fill="#475569">PoW 竞争</text>

      <path d="M566 392 L584 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-fr-arrow)" />

      <rect x="588" y="364" width="100" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="638" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">链上确认</text>
      <text x="638" y="404" textAnchor="middle" fontSize="9" fill="#475569">6 块确认</text>

      <path d="M688 392 L706 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-fr-arrow)" />

      <rect x="710" y="364" width="70" height="56" rx="8" fill="url(#mbt-fr-adv)" opacity="0.15" stroke="#dc2626" strokeWidth="1.5" />
      <text x="745" y="392" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991b1b">不可逆</text>

      {/* 核心能力与挑战 */}
      <text x="400" y="450" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心能力与挑战</text>

      <rect x="30" y="464" width="370" height="56" rx="8" fill="url(#mbt-fr-mining)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="215" y="484" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">能力跃迁路径</text>
      <text x="215" y="504" textAnchor="middle" fontSize="10" fill="#475569">理解原理 → 掌握密钥 → 解析交易 → 理解链结构 → 共识挖矿 → 网络传播 → 实际应用</text>

      <rect x="410" y="464" width="360" height="56" rx="8" fill="url(#mbt-fr-adv)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="590" y="484" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">核心挑战</text>
      <text x="590" y="504" textAnchor="middle" fontSize="10" fill="#475569">扩展性三角 / 私钥安全 / 确认延迟 / 监管合规 / 能耗争议</text>

      {/* 底部总结 */}
      <rect x="30" y="528" width="740" height="32" rx="8" fill="url(#mbt-fr-btc)" opacity="0.08" stroke="#f7931a" strokeWidth="2" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#9a3412">核心脉络：认知 → 密码 → 交易 → 链式账本 → 共识挖矿 → 网络传播 → 钱包应用 → 扩展进阶 → 系统闭环</text>

      <rect x="30" y="564" width="740" height="12" rx="6" fill="url(#mbt-fr-btc)" opacity="0.1" />
    </svg>
  );
}
