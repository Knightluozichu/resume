"use client";

export function CsiEngineSystemDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="发动机系统：四大冲程与两大机构五大系统">
      <defs>
        <linearGradient id="csi-es-intake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="csi-es-comp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="csi-es-power" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="csi-es-exhaust" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <marker id="csi-es-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">发动机系统：四冲程工作循环</text>

      {/* 四大冲程 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">奥托循环四冲程</text>

      {/* 进气冲程 */}
      <rect x="30" y="76" width="170" height="140" rx="10" fill="url(#csi-es-intake)" opacity="0.12" stroke="#0ea5e9" strokeWidth="2" />
      <text x="115" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">1. 进气冲程</text>
      <circle cx="115" cy="150" r="36" fill="#fff" stroke="#0ea5e9" strokeWidth="2" />
      <path d="M115 186 L115 200" stroke="#0ea5e9" strokeWidth="2" />
      <text x="115" y="172" textAnchor="middle" fontSize="9" fill="#0369a1">活塞下行</text>
      <text x="115" y="212" textAnchor="middle" fontSize="10" fill="#475569">进气门开</text>
      <text x="115" y="226" textAnchor="middle" fontSize="10" fill="#475569">吸入混合气</text>

      <path d="M200 146 L226 146" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-es-arrow)" />

      {/* 压缩冲程 */}
      <rect x="230" y="76" width="170" height="140" rx="10" fill="url(#csi-es-comp)" opacity="0.12" stroke="#ca8a04" strokeWidth="2" />
      <text x="315" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#a16207">2. 压缩冲程</text>
      <circle cx="315" cy="150" r="36" fill="#fff" stroke="#ca8a04" strokeWidth="2" />
      <path d="M315 114 L315 128" stroke="#ca8a04" strokeWidth="2" />
      <text x="315" y="172" textAnchor="middle" fontSize="9" fill="#a16207">活塞上行</text>
      <text x="315" y="212" textAnchor="middle" fontSize="10" fill="#475569">气门关闭</text>
      <text x="315" y="226" textAnchor="middle" fontSize="10" fill="#475569">压缩混合气</text>

      <path d="M400 146 L426 146" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-es-arrow)" />

      {/* 做功冲程 */}
      <rect x="430" y="76" width="170" height="140" rx="10" fill="url(#csi-es-power)" opacity="0.12" stroke="#dc2626" strokeWidth="2" />
      <text x="515" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b91c1c">3. 做功冲程</text>
      <circle cx="515" cy="150" r="36" fill="#fff" stroke="#dc2626" strokeWidth="2" />
      <path d="M515 186 L515 200" stroke="#dc2626" strokeWidth="2" />
      <text x="515" y="172" textAnchor="middle" fontSize="9" fill="#b91c1c">活塞下行</text>
      <text x="515" y="212" textAnchor="middle" fontSize="10" fill="#475569">火花塞点火</text>
      <text x="515" y="226" textAnchor="middle" fontSize="10" fill="#475569">膨胀做功</text>

      <path d="M600 146 L626 146" stroke="#64748b" strokeWidth="2" markerEnd="url(#csi-es-arrow)" />

      {/* 排气冲程 */}
      <rect x="630" y="76" width="140" height="140" rx="10" fill="url(#csi-es-exhaust)" opacity="0.12" stroke="#64748b" strokeWidth="2" />
      <text x="700" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#475569">4. 排气冲程</text>
      <circle cx="700" cy="150" r="36" fill="#fff" stroke="#64748b" strokeWidth="2" />
      <path d="M700 114 L700 128" stroke="#64748b" strokeWidth="2" />
      <text x="700" y="172" textAnchor="middle" fontSize="9" fill="#475569">活塞上行</text>
      <text x="700" y="212" textAnchor="middle" fontSize="10" fill="#475569">排气门开</text>
      <text x="700" y="226" textAnchor="middle" fontSize="10" fill="#475569">排出废气</text>

      {/* 两大机构 */}
      <text x="400" y="260" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">两大机构</text>

      <rect x="60" y="274" width="320" height="64" rx="8" fill="url(#csi-es-intake)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="220" y="294" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">曲柄连杆机构</text>
      <text x="220" y="312" textAnchor="middle" fontSize="10" fill="#475569">活塞 / 连杆 / 曲轴 / 飞轮</text>
      <text x="220" y="328" textAnchor="middle" fontSize="9" fill="#64748b">将直线运动转化为旋转运动</text>

      <rect x="420" y="274" width="320" height="64" rx="8" fill="url(#csi-es-comp)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="580" y="294" textAnchor="middle" fontSize="12" fontWeight="700" fill="#a16207">配气机构</text>
      <text x="580" y="312" textAnchor="middle" fontSize="10" fill="#475569">凸轮轴 / 气门 / 挺柱 / 正时链条</text>
      <text x="580" y="328" textAnchor="middle" fontSize="9" fill="#64748b">按时开闭进排气门控制换气</text>

      {/* 五大系统 */}
      <text x="400" y="364" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">五大系统</text>

      <rect x="30" y="378" width="140" height="72" rx="8" fill="url(#csi-es-power)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="100" y="400" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">燃料供给</text>
      <text x="100" y="418" textAnchor="middle" fontSize="9" fill="#475569">喷油器 / 油泵</text>
      <text x="100" y="434" textAnchor="middle" fontSize="9" fill="#475569">空燃比 14.7:1</text>

      <rect x="186" y="378" width="140" height="72" rx="8" fill="url(#csi-es-intake)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="256" y="400" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">点火系统</text>
      <text x="256" y="418" textAnchor="middle" fontSize="9" fill="#475569">火花塞 / 点火线圈</text>
      <text x="256" y="434" textAnchor="middle" fontSize="9" fill="#475569">高压电点火</text>

      <rect x="342" y="378" width="140" height="72" rx="8" fill="url(#csi-es-comp)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="412" y="400" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">冷却系统</text>
      <text x="412" y="418" textAnchor="middle" fontSize="9" fill="#475569">水泵 / 散热器</text>
      <text x="412" y="434" textAnchor="middle" fontSize="9" fill="#475569">维持 85-105 摄氏度</text>

      <rect x="498" y="378" width="140" height="72" rx="8" fill="url(#csi-es-exhaust)" opacity="0.1" stroke="#64748b" strokeWidth="1.5" />
      <text x="568" y="400" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">润滑系统</text>
      <text x="568" y="418" textAnchor="middle" fontSize="9" fill="#475569">机油泵 / 滤清器</text>
      <text x="568" y="434" textAnchor="middle" fontSize="9" fill="#475569">减磨降温密封</text>

      <rect x="654" y="378" width="116" height="72" rx="8" fill="url(#csi-es-power)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="712" y="400" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">起动系统</text>
      <text x="712" y="418" textAnchor="middle" fontSize="9" fill="#475569">起动机 / 蓄电池</text>
      <text x="712" y="434" textAnchor="middle" fontSize="9" fill="#475569">静止到运转</text>

      {/* 底部总结 */}
      <rect x="30" y="468" width="740" height="36" rx="8" fill="url(#csi-es-intake)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="490" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">能量转换：化学能（燃料）→ 热能（燃烧）→ 机械能（曲轴旋转）</text>

      <rect x="30" y="514" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="534" textAnchor="middle" fontSize="11" fill="#475569">进气 → 压缩 → 做功 → 排气，四冲程循环一次曲轴旋转两圈（720度）做功一次</text>
    </svg>
  );
}
