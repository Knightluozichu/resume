"use client";

export function MbtAdvancedTopicsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="高级话题与扩展：隔离见证与闪电网络">
      <defs>
        <linearGradient id="mbt-at-segwit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mbt-at-ln" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mbt-at-scale" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7931a" />
          <stop offset="100%" stopColor="#e87b00" />
        </linearGradient>
        <marker id="mbt-at-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">高级话题与扩展</text>

      {/* 隔离见证 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">隔离见证 (SegWit)</text>

      <rect x="30" y="76" width="360" height="120" rx="10" fill="url(#mbt-at-segwit)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="210" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">传统交易结构</text>
      <rect x="50" y="108" width="150" height="28" rx="4" fill="#fff" stroke="#7c3aed" strokeWidth="1" />
      <text x="125" y="126" textAnchor="middle" fontSize="9" fill="#475569">解锁脚本（签名）</text>
      <rect x="210" y="108" width="160" height="28" rx="4" fill="#fff" stroke="#7c3aed" strokeWidth="1" />
      <text x="290" y="126" textAnchor="middle" fontSize="9" fill="#475569">锁定脚本</text>
      <text x="210" y="150" textAnchor="middle" fontSize="9" fill="#64748b">签名数据占用区块空间，影响容量</text>
      <text x="210" y="168" textAnchor="middle" fontSize="9" fill="#64748b">签名可被第三方修改（交易延展性）</text>

      <path d="M394 136 L430 136" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-at-arrow)" />

      <rect x="434" y="76" width="336" height="120" rx="10" fill="url(#mbt-at-segwit)" opacity="0.12" stroke="#7c3aed" strokeWidth="2" />
      <text x="602" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">SegWit 交易结构</text>
      <rect x="454" y="108" width="120" height="28" rx="4" fill="#fff" stroke="#7c3aed" strokeWidth="1" />
      <text x="514" y="126" textAnchor="middle" fontSize="9" fill="#475569">见证数据</text>
      <rect x="584" y="108" width="170" height="28" rx="4" fill="#fff" stroke="#7c3aed" strokeWidth="1" />
      <text x="669" y="126" textAnchor="middle" fontSize="9" fill="#475569">锁定脚本（不含签名）</text>
      <text x="602" y="150" textAnchor="middle" fontSize="9" fill="#64748b">签名移至独立「见证」字段</text>
      <text x="602" y="168" textAnchor="middle" fontSize="9" fill="#64748b">修复延展性 + 增加区块容量</text>

      {/* 闪电网络 */}
      <text x="400" y="222" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">闪电网络 (Lightning Network)</text>

      <rect x="30" y="236" width="360" height="140" rx="10" fill="url(#mbt-at-ln)" opacity="0.08" stroke="#2563eb" strokeWidth="2" />
      <text x="210" y="258" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">链上：开启/关闭通道</text>
      <rect x="60" y="270" width="130" height="32" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="1" />
      <text x="125" y="290" textAnchor="middle" fontSize="9" fill="#475569">开启通道交易</text>
      <rect x="230" y="270" width="130" height="32" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="1" />
      <text x="295" y="290" textAnchor="middle" fontSize="9" fill="#475569">关闭通道交易</text>
      <text x="210" y="322" textAnchor="middle" fontSize="9" fill="#64748b">2/2 多签锁定资金，建立支付通道</text>
      <text x="210" y="340" textAnchor="middle" fontSize="9" fill="#64748b">关闭时将最终余额结算上链</text>
      <text x="210" y="360" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">仅需两次链上交易</text>

      <rect x="410" y="236" width="360" height="140" rx="10" fill="url(#mbt-at-ln)" opacity="0.12" stroke="#2563eb" strokeWidth="2" />
      <text x="590" y="258" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">链下：即时支付路由</text>
      <circle cx="470" cy="300" r="20" fill="url(#mbt-at-ln)" opacity="0.2" stroke="#2563eb" strokeWidth="1.5" />
      <text x="470" y="304" textAnchor="middle" fontSize="8" fill="#1e40af">A</text>
      <circle cx="590" cy="280" r="20" fill="url(#mbt-at-ln)" opacity="0.2" stroke="#2563eb" strokeWidth="1.5" />
      <text x="590" y="284" textAnchor="middle" fontSize="8" fill="#1e40af">B</text>
      <circle cx="710" cy="300" r="20" fill="url(#mbt-at-ln)" opacity="0.2" stroke="#2563eb" strokeWidth="1.5" />
      <text x="710" y="304" textAnchor="middle" fontSize="8" fill="#1e40af">C</text>
      <line x1="490" y1="296" x2="570" y2="284" stroke="#2563eb" strokeWidth="1.5" />
      <line x1="610" y1="284" x2="690" y2="296" stroke="#2563eb" strokeWidth="1.5" />
      <text x="590" y="346" textAnchor="middle" fontSize="9" fill="#64748b">A 通过 B 路由支付给 C</text>
      <text x="590" y="362" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">毫秒级确认，极低手续费</text>

      {/* 扩展方案对比 */}
      <text x="400" y="402" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">扩展方案对比</text>

      <rect x="30" y="416" width="240" height="64" rx="8" fill="url(#mbt-at-segwit)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="150" y="438" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">SegWit（软分叉）</text>
      <text x="150" y="456" textAnchor="middle" fontSize="9" fill="#475569">移见证数据，扩容 ~2MB</text>
      <text x="150" y="472" textAnchor="middle" fontSize="9" fill="#64748b">修复延展性，向后兼容</text>

      <rect x="286" y="416" width="240" height="64" rx="8" fill="url(#mbt-at-ln)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="406" y="438" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">闪电网络（Layer 2）</text>
      <text x="406" y="456" textAnchor="middle" fontSize="9" fill="#475569">链下支付通道网络</text>
      <text x="406" y="472" textAnchor="middle" fontSize="9" fill="#64748b">海量 TPS，即时微支付</text>

      <rect x="542" y="416" width="228" height="64" rx="8" fill="url(#mbt-at-scale)" opacity="0.08" stroke="#f7931a" strokeWidth="1.5" />
      <text x="656" y="438" textAnchor="middle" fontSize="11" fontWeight="600" fill="#9a3412">其他扩展方向</text>
      <text x="656" y="456" textAnchor="middle" fontSize="9" fill="#475569">Schnorr 签名 / Taproot</text>
      <text x="656" y="472" textAnchor="middle" fontSize="9" fill="#64748b">隐私增强 / 脚本优化</text>

      {/* 底部总结 */}
      <rect x="30" y="500" width="740" height="28" rx="8" fill="url(#mbt-at-segwit)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="518" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">扩展 = 链上优化（SegWit / Taproot）+ 链下方案（闪电网络）= 在保持去中心化前提下提升吞吐与隐私</text>

      <rect x="30" y="534" width="740" height="20" rx="8" fill="url(#mbt-at-ln)" opacity="0.06" stroke="#2563eb" strokeWidth="1" />
      <text x="400" y="548" textAnchor="middle" fontSize="10" fill="#1e40af">扩展性不可能三角：去中心化 / 安全性 / 吞吐量 — 三者需权衡</text>
    </svg>
  );
}
