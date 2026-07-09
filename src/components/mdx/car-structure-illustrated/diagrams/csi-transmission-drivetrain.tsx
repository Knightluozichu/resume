"use client";

export function CsiTransmissionDrivetrainDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="变速器与传动系统：变速器类型对比与动力传递路径">
      <defs>
        <linearGradient id="csi-td-mt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="csi-td-at" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="csi-td-cvt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="csi-td-dct" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="csi-td-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">变速器与传动系统</text>

      {/* 变速器类型对比 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四种变速器类型对比</text>

      <rect x="30" y="76" width="175" height="110" rx="8" fill="url(#csi-td-mt)" opacity="0.1" stroke="#0ea5e9" strokeWidth="2" />
      <text x="117" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">手动 MT</text>
      <text x="117" y="120" textAnchor="middle" fontSize="9" fill="#475569">齿轮组 + 离合器</text>
      <text x="117" y="136" textAnchor="middle" fontSize="9" fill="#475569">效率高 ~95%</text>
      <text x="117" y="152" textAnchor="middle" fontSize="9" fill="#475569">成本低</text>
      <text x="117" y="168" textAnchor="middle" fontSize="9" fill="#475569">操作强度大</text>

      <rect x="220" y="76" width="175" height="110" rx="8" fill="url(#csi-td-at)" opacity="0.1" stroke="#16a34a" strokeWidth="2" />
      <text x="307" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">自动 AT</text>
      <text x="307" y="120" textAnchor="middle" fontSize="9" fill="#475569">液力变矩器</text>
      <text x="307" y="136" textAnchor="middle" fontSize="9" fill="#475569">行星齿轮组</text>
      <text x="307" y="152" textAnchor="middle" fontSize="9" fill="#475569">效率 ~86%</text>
      <text x="307" y="168" textAnchor="middle" fontSize="9" fill="#475569">平顺舒适</text>

      <rect x="410" y="76" width="175" height="110" rx="8" fill="url(#csi-td-cvt)" opacity="0.1" stroke="#ca8a04" strokeWidth="2" />
      <text x="497" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#a16207">无级 CVT</text>
      <text x="497" y="120" textAnchor="middle" fontSize="9" fill="#475569">钢带 + 锥轮</text>
      <text x="497" y="136" textAnchor="middle" fontSize="9" fill="#475569">传动比连续</text>
      <text x="497" y="152" textAnchor="middle" fontSize="9" fill="#475569">效率 ~88%</text>
      <text x="497" y="168" textAnchor="middle" fontSize="9" fill="#475569">最平顺省油</text>

      <rect x="600" y="76" width="170" height="110" rx="8" fill="url(#csi-td-dct)" opacity="0.1" stroke="#9333ea" strokeWidth="2" />
      <text x="685" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">双离合 DCT</text>
      <text x="685" y="120" textAnchor="middle" fontSize="9" fill="#475569">双离合器 + 齿轮</text>
      <text x="685" y="136" textAnchor="middle" fontSize="9" fill="#475569">换挡快</text>
      <text x="685" y="152" textAnchor="middle" fontSize="9" fill="#475569">效率 ~92%</text>
      <text x="685" y="168" textAnchor="middle" fontSize="9" fill="#475569">运动感强</text>

      {/* 动力传递路径 */}
      <text x="400" y="214" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">动力传递路径（前置后驱 FR）</text>

      <rect x="20" y="228" width="100" height="56" rx="8" fill="url(#csi-td-mt)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="70" y="250" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">发动机</text>
      <text x="70" y="268" textAnchor="middle" fontSize="9" fill="#475569">动力源</text>

      <path d="M120 256 L142 256" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-td-arrow)" />

      <rect x="146" y="228" width="100" height="56" rx="8" fill="url(#csi-td-at)" opacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
      <text x="196" y="250" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">离合器</text>
      <text x="196" y="268" textAnchor="middle" fontSize="9" fill="#475569">接合/切断</text>

      <path d="M246 256 L268 256" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-td-arrow)" />

      <rect x="272" y="228" width="100" height="56" rx="8" fill="url(#csi-td-dct)" opacity="0.15" stroke="#9333ea" strokeWidth="1.5" />
      <text x="322" y="250" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">变速器</text>
      <text x="322" y="268" textAnchor="middle" fontSize="9" fill="#475569">变扭变速</text>

      <path d="M372 256 L394 256" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-td-arrow)" />

      <rect x="398" y="228" width="100" height="56" rx="8" fill="url(#csi-td-cvt)" opacity="0.15" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="448" y="250" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">传动轴</text>
      <text x="448" y="268" textAnchor="middle" fontSize="9" fill="#475569">传递动力</text>

      <path d="M498 256 L520 256" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-td-arrow)" />

      <rect x="524" y="228" width="100" height="56" rx="8" fill="url(#csi-td-at)" opacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
      <text x="574" y="250" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">主减速器</text>
      <text x="574" y="268" textAnchor="middle" fontSize="9" fill="#475569">减速增扭</text>

      <path d="M624 256 L646 256" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-td-arrow)" />

      <rect x="650" y="228" width="100" height="56" rx="8" fill="url(#csi-td-mt)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="700" y="250" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">差速器</text>
      <text x="700" y="268" textAnchor="middle" fontSize="9" fill="#475569">分配动力</text>

      <path d="M700 284 L700 304" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-td-arrow)" />

      <rect x="630" y="308" width="140" height="40" rx="8" fill="url(#csi-td-dct)" opacity="0.15" stroke="#9333ea" strokeWidth="1.5" />
      <text x="700" y="333" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">驱动轮（后轮）</text>

      {/* 驱动型式 */}
      <text x="400" y="376" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">常见驱动型式</text>

      <rect x="30" y="390" width="140" height="56" rx="8" fill="url(#csi-td-mt)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="100" y="412" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">FF 前置前驱</text>
      <text x="100" y="430" textAnchor="middle" fontSize="9" fill="#475569">空间大成本低</text>

      <rect x="186" y="390" width="140" height="56" rx="8" fill="url(#csi-td-at)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="256" y="412" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">FR 前置后驱</text>
      <text x="256" y="430" textAnchor="middle" fontSize="9" fill="#475569">操控好前后均衡</text>

      <rect x="342" y="390" width="140" height="56" rx="8" fill="url(#csi-td-cvt)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="412" y="412" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">MR 中置后驱</text>
      <text x="412" y="430" textAnchor="middle" fontSize="9" fill="#475569">重心低运动性</text>

      <rect x="498" y="390" width="140" height="56" rx="8" fill="url(#csi-td-dct)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="568" y="412" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">RR 后置后驱</text>
      <text x="568" y="430" textAnchor="middle" fontSize="9" fill="#475569">爬坡强紧凑</text>

      <rect x="654" y="390" width="116" height="56" rx="8" fill="url(#csi-td-at)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="712" y="412" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">AWD 全驱</text>
      <text x="712" y="430" textAnchor="middle" fontSize="9" fill="#475569">抓地力全天候</text>

      {/* 底部总结 */}
      <rect x="30" y="468" width="740" height="36" rx="8" fill="url(#csi-td-mt)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="490" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心功能：变速变扭 + 改变转向 + 切断动力；传动比 = 主动轮齿数 / 从动轮齿数</text>

      <rect x="30" y="514" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="534" textAnchor="middle" fontSize="11" fill="#475569">发动机 → 离合器 → 变速器 → 传动轴 → 主减速器 → 差速器 → 驱动轮</text>
    </svg>
  );
}
