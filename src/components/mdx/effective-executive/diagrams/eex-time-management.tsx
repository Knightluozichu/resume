"use client";

export function EexTimeManagementDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="掌握自己的时间三步法与系统性时间浪费">
      <defs>
        <linearGradient id="eex-tm-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="eex-tm-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="eex-tm-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="eex-tm-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="eex-tm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">掌握自己的时间：三步法</text>

      {/* 时间是最稀缺资源 */}
      <rect x="40" y="52" width="720" height="40" rx="8" fill="url(#eex-tm-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">时间是最稀缺、最易逝、最无弹性的资源——记不住、省不下、存不了</text>

      {/* 三步法 */}
      <text x="400" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三步法：记录 → 管理 → 集中</text>

      <rect x="40" y="128" width="235" height="120" rx="8" fill="url(#eex-tm-1)" opacity="0.9" />
      <text x="157" y="152" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">1 记录时间</text>
      <text x="157" y="174" textAnchor="middle" fontSize="10" fill="#e0f2fe">记忆并不可靠</text>
      <text x="157" y="192" textAnchor="middle" fontSize="10" fill="#e0f2fe">必须实时记录</text>
      <text x="157" y="210" textAnchor="middle" fontSize="10" fill="#e0f2fe">连续记录数周</text>
      <text x="157" y="234" textAnchor="middle" fontSize="9" fill="#e0f2fe">定期更新核对</text>

      <path d="M275 188 L293 188" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-tm-arrow)" />

      <rect x="297" y="128" width="235" height="120" rx="8" fill="url(#eex-tm-2)" opacity="0.9" />
      <text x="414" y="152" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">2 管理时间</text>
      <text x="414" y="174" textAnchor="middle" fontSize="10" fill="#ede9fe">剔除根本不必</text>
      <text x="414" y="192" textAnchor="middle" fontSize="10" fill="#ede9fe">做的事</text>
      <text x="414" y="210" textAnchor="middle" fontSize="10" fill="#ede9fe">可由他人代劳</text>
      <text x="414" y="234" textAnchor="middle" fontSize="9" fill="#ede9fe">消除系统性浪费</text>

      <path d="M532 188 L550 188" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-tm-arrow)" />

      <rect x="554" y="128" width="206" height="120" rx="8" fill="url(#eex-tm-3)" opacity="0.9" />
      <text x="657" y="152" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">3 集中时间</text>
      <text x="657" y="174" textAnchor="middle" fontSize="10" fill="#fef3c7">碎片时间无用</text>
      <text x="657" y="192" textAnchor="middle" fontSize="10" fill="#fef3c7">整块连续时间</text>
      <text x="657" y="210" textAnchor="middle" fontSize="10" fill="#fef3c7">才能产出成果</text>
      <text x="657" y="234" textAnchor="middle" fontSize="9" fill="#fef3c7">主动安排整块</text>

      {/* 系统性时间浪费 */}
      <text x="400" y="278" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四类系统性时间浪费</text>

      <rect x="40" y="292" width="175" height="120" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="127" y="314" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">反复出现的危机</text>
      <text x="127" y="336" textAnchor="middle" fontSize="9" fill="#475569">同一问题反复</text>
      <text x="127" y="352" textAnchor="middle" fontSize="9" fill="#475569">紧急救火</text>
      <text x="127" y="376" textAnchor="middle" fontSize="9" fill="#475569">说明缺乏制度</text>
      <text x="127" y="394" textAnchor="middle" fontSize="9" fill="#dc2626">= 懈怠与疏忽</text>

      <rect x="225" y="292" width="175" height="120" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="312" y="314" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">人员冗余</text>
      <text x="312" y="336" textAnchor="middle" fontSize="9" fill="#475569">用1/10时间就</text>
      <text x="312" y="352" textAnchor="middle" fontSize="9" fill="#475569">能做完的事</text>
      <text x="312" y="376" textAnchor="middle" fontSize="9" fill="#475569">却用1/2时间</text>
      <text x="312" y="394" textAnchor="middle" fontSize="9" fill="#dc2626">= 人际摩擦</text>

      <rect x="410" y="292" width="175" height="120" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="497" y="314" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">组织结构不良</text>
      <text x="497" y="336" textAnchor="middle" fontSize="9" fill="#475569">会议过多</text>
      <text x="497" y="352" textAnchor="middle" fontSize="9" fill="#475569">= 结构设计错误</text>
      <text x="497" y="376" textAnchor="middle" fontSize="9" fill="#475569">理想状态几乎</text>
      <text x="497" y="394" textAnchor="middle" fontSize="9" fill="#dc2626">无需开会</text>

      <rect x="595" y="292" width="165" height="120" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="677" y="314" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">信息功能失灵</text>
      <text x="677" y="336" textAnchor="middle" fontSize="9" fill="#475569">信息传递错误</text>
      <text x="677" y="352" textAnchor="middle" fontSize="9" fill="#475569">或口径不对</text>
      <text x="677" y="376" textAnchor="middle" fontSize="9" fill="#475569">造成反复往返</text>
      <text x="677" y="394" textAnchor="middle" fontSize="9" fill="#dc2626">= 沟通损耗</text>

      {/* 底部：可自由支配时间 */}
      <text x="400" y="442" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">真正可自由支配的时间</text>

      <rect x="40" y="456" width="350" height="90" rx="8" fill="url(#eex-tm-3)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="215" y="478" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">记录到的少得可怜</text>
      <text x="215" y="500" textAnchor="middle" fontSize="9" fill="#475569">大部分被琐事与人情</text>
      <text x="215" y="516" textAnchor="middle" fontSize="9" fill="#475569">占据，看似忙碌却</text>
      <text x="215" y="532" textAnchor="middle" fontSize="9" fill="#475569">无真正产出</text>

      <path d="M390 500 L418 500" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-tm-arrow)" />

      <rect x="422" y="456" width="338" height="90" rx="8" fill="url(#eex-tm-4)" opacity="0.12" stroke="#10b981" strokeWidth="1.5" />
      <text x="591" y="478" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">集中成整块用于要务</text>
      <text x="591" y="500" textAnchor="middle" fontSize="9" fill="#475569">把零散时间合并为</text>
      <text x="591" y="516" textAnchor="middle" fontSize="9" fill="#475569">连续的整块时间</text>
      <text x="591" y="532" textAnchor="middle" fontSize="9" fill="#059669">这是有效性的物理基础</text>
    </svg>
  );
}
