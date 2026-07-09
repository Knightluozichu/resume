"use client";

export function CsiBodyInteriorDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="车身与内饰：车身结构与内饰系统">
      <defs>
        <linearGradient id="csi-bi-frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="csi-bi-monocoque" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="csi-bi-interior" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="csi-bi-safety" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="csi-bi-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">车身与内饰系统</text>

      {/* 车身结构类型 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">两种车身结构</text>

      <rect x="30" y="76" width="360" height="120" rx="8" fill="url(#csi-bi-frame)" opacity="0.1" stroke="#0ea5e9" strokeWidth="2" />
      <text x="210" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">非承载式车身（车架式）</text>
      <text x="210" y="122" textAnchor="middle" fontSize="10" fill="#475569">车身 + 独立车架（梯形梁）</text>
      <text x="210" y="140" textAnchor="middle" fontSize="9" fill="#475569">车架承受载荷，车身不承力</text>
      <text x="210" y="158" textAnchor="middle" fontSize="9" fill="#15803d">优点：刚性好、承载强、越野性好</text>
      <text x="210" y="176" textAnchor="middle" fontSize="9" fill="#b91c1c">缺点：重量大、重心高、空间利用率低</text>

      <rect x="410" y="76" width="360" height="120" rx="8" fill="url(#csi-bi-monocoque)" opacity="0.1" stroke="#16a34a" strokeWidth="2" />
      <text x="590" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">承载式车身（一体化）</text>
      <text x="590" y="122" textAnchor="middle" fontSize="10" fill="#475569">无独立车架，车身即承力结构</text>
      <text x="590" y="140" textAnchor="middle" fontSize="9" fill="#475569">底板/侧围/顶盖焊接成整体</text>
      <text x="590" y="158" textAnchor="middle" fontSize="9" fill="#15803d">优点：重量轻、重心低、空间大</text>
      <text x="590" y="176" textAnchor="middle" fontSize="9" fill="#b91c1c">缺点：刚度相对低、碰撞维修成本高</text>

      {/* 车身三厢结构 */}
      <text x="400" y="218" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">车身三厢结构</text>

      <rect x="60" y="232" width="200" height="80" rx="8" fill="url(#csi-bi-frame)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="160" y="256" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">前舱</text>
      <text x="160" y="276" textAnchor="middle" fontSize="9" fill="#475569">发动机舱</text>
      <text x="160" y="292" textAnchor="middle" fontSize="9" fill="#475569">动力总成 + 前悬架</text>

      <rect x="280" y="232" width="240" height="80" rx="8" fill="url(#csi-bi-monocoque)" opacity="0.12" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="256" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">中舱</text>
      <text x="400" y="276" textAnchor="middle" fontSize="9" fill="#475569">乘员舱</text>
      <text x="400" y="292" textAnchor="middle" fontSize="9" fill="#475569">驾驶座 + 乘客座 + 后排</text>

      <rect x="540" y="232" width="200" height="80" rx="8" fill="url(#csi-bi-interior)" opacity="0.12" stroke="#9333ea" strokeWidth="1.5" />
      <text x="640" y="256" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">后舱</text>
      <text x="640" y="276" textAnchor="middle" fontSize="9" fill="#475569">行李舱</text>
      <text x="640" y="292" textAnchor="middle" fontSize="9" fill="#475569">储物空间 + 备胎</text>

      {/* 内饰系统 */}
      <text x="400" y="338" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">内饰六大系统</text>

      <rect x="30" y="352" width="230" height="64" rx="8" fill="url(#csi-bi-interior)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="145" y="374" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">座椅系统</text>
      <text x="145" y="392" textAnchor="middle" fontSize="9" fill="#475569">人体工程学设计</text>
      <text x="145" y="406" textAnchor="middle" fontSize="9" fill="#475569">通风/加热/电动调节</text>

      <rect x="275" y="352" width="230" height="64" rx="8" fill="url(#csi-bi-interior)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="390" y="374" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">仪表中控</text>
      <text x="390" y="392" textAnchor="middle" fontSize="9" fill="#475569">仪表盘 + 中控屏</text>
      <text x="390" y="406" textAnchor="middle" fontSize="9" fill="#475569">信息显示与人机交互</text>

      <rect x="520" y="352" width="250" height="64" rx="8" fill="url(#csi-bi-interior)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="645" y="374" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">门饰板与顶棚</text>
      <text x="645" y="392" textAnchor="middle" fontSize="9" fill="#475569">装饰 + 隔音 + 储物</text>
      <text x="645" y="406" textAnchor="middle" fontSize="9" fill="#475569">NVH 隔声降噪</text>

      {/* 车身安全结构 */}
      <text x="400" y="442" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">车身安全结构设计</text>

      <rect x="30" y="456" width="740" height="36" rx="8" fill="url(#csi-bi-safety)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="478" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">高刚性乘员舱（A柱/B柱/C柱+车门防撞梁）+ 前后吸能溃缩区（碰撞时变形吸能保护乘员）</text>

      <rect x="30" y="502" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="522" textAnchor="middle" fontSize="11" fill="#475569">核心理念：乘员舱「固若金杯」不变形，前后舱「溃缩吸能」可变形，实现碰撞安全</text>
    </svg>
  );
}
