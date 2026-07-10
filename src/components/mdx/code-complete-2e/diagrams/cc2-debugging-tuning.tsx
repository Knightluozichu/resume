"use client";

export function Cc2DebuggingTuningDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="调试与性能调优：调试流程与性能优化">
      <defs>
        <linearGradient id="cc2-dt-debug" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="cc2-dt-perf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="cc2-dt-tune" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="cc2-dt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">调试与性能调优</text>

      {/* 调试流程 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">科学调试流程</text>

      <rect x="20" y="74" width="120" height="56" rx="8" fill="url(#cc2-dt-debug)" opacity="0.9" />
      <text x="80" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">1.稳定重现</text>
      <text x="80" y="114" textAnchor="middle" fontSize="8" fill="#fee2e2">可靠复现错误</text>

      <path d="M140 102 L160 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-dt-arrow)" />

      <rect x="164" y="74" width="120" height="56" rx="8" fill="url(#cc2-dt-debug)" opacity="0.9" />
      <text x="224" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">2.定位根源</text>
      <text x="224" y="114" textAnchor="middle" fontSize="8" fill="#fee2e2">找到真正原因</text>

      <path d="M284 102 L304 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-dt-arrow)" />

      <rect x="308" y="74" width="120" height="56" rx="8" fill="url(#cc2-dt-debug)" opacity="0.9" />
      <text x="368" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">3.修复缺陷</text>
      <text x="368" y="114" textAnchor="middle" fontSize="8" fill="#fee2e2">修正错误代码</text>

      <path d="M428 102 L448 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-dt-arrow)" />

      <rect x="452" y="74" width="120" height="56" rx="8" fill="url(#cc2-dt-debug)" opacity="0.9" />
      <text x="512" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">4.验证修复</text>
      <text x="512" y="114" textAnchor="middle" fontSize="8" fill="#fee2e2">确认已解决</text>

      <path d="M572 102 L592 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-dt-arrow)" />

      <rect x="596" y="74" width="184" height="56" rx="8" fill="url(#cc2-dt-debug)" opacity="0.9" />
      <text x="688" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">5.查找类似错误</text>
      <text x="688" y="114" textAnchor="middle" fontSize="8" fill="#fee2e2">同根源问题一并修复</text>

      {/* 调试方法 */}
      <text x="400" y="158" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">调试方法与心态</text>

      <rect x="30" y="172" width="175" height="90" rx="8" fill="url(#cc2-dt-debug)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="117" y="194" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">科学方法</text>
      <text x="117" y="214" textAnchor="middle" fontSize="8" fill="#475569">假设 → 实验 → 观察</text>
      <text x="117" y="228" textAnchor="middle" fontSize="8" fill="#475569">形成假设</text>
      <text x="117" y="242" textAnchor="middle" fontSize="8" fill="#475569">设计实验验证</text>
      <text x="117" y="256" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">系统性排除</text>

      <rect x="215" y="172" width="175" height="90" rx="8" fill="url(#cc2-dt-debug)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="302" y="194" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">二分查找</text>
      <text x="302" y="214" textAnchor="middle" fontSize="8" fill="#475569">逐步缩小范围</text>
      <text x="302" y="228" textAnchor="middle" fontSize="8" fill="#475569">注释/禁用代码段</text>
      <text x="302" y="242" textAnchor="middle" fontSize="8" fill="#475569">二分定位问题</text>
      <text x="302" y="256" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">高效定位</text>

      <rect x="400" y="172" width="175" height="90" rx="8" fill="url(#cc2-dt-debug)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="487" y="194" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">工具辅助</text>
      <text x="487" y="214" textAnchor="middle" fontSize="8" fill="#475569">调试器断点</text>
      <text x="487" y="228" textAnchor="middle" fontSize="8" fill="#475569">日志/跟踪</text>
      <text x="487" y="242" textAnchor="middle" fontSize="8" fill="#475569">性能分析器</text>
      <text x="487" y="256" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">用工具不猜</text>

      <rect x="585" y="172" width="185" height="90" rx="8" fill="url(#cc2-dt-debug)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="677" y="194" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">正确心态</text>
      <text x="677" y="214" textAnchor="middle" fontSize="8" fill="#475569">接受缺陷是正常的</text>
      <text x="677" y="228" textAnchor="middle" fontSize="8" fill="#475569">不要急于修复</text>
      <text x="677" y="242" textAnchor="middle" fontSize="8" fill="#475569">先理解再修正</text>
      <text x="677" y="256" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">理解优于速度</text>

      {/* 性能调优策略 */}
      <text x="400" y="290" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">性能调优策略</text>

      <rect x="30" y="304" width="370" height="130" rx="8" fill="url(#cc2-dt-perf)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="215" y="326" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">调优原则</text>
      <text x="215" y="348" textAnchor="middle" fontSize="9" fill="#475569">先测量再优化（用数据说话）</text>
      <text x="215" y="366" textAnchor="middle" fontSize="9" fill="#475569">优化热点：80/20 法则</text>
      <text x="215" y="384" textAnchor="middle" fontSize="9" fill="#475569">先正确再快速（不要过早优化）</text>
      <text x="215" y="402" textAnchor="middle" fontSize="9" fill="#475569">先设计再调优（好设计自然高效）</text>
      <text x="215" y="420" textAnchor="middle" fontSize="9" fill="#475569">保留可读性（不牺牲维护性换性能）</text>
      <text x="215" y="430" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">测量 → 定位 → 优化 → 验证</text>

      <rect x="410" y="304" width="360" height="130" rx="8" fill="url(#cc2-dt-tune)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="590" y="326" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">调优层次</text>
      <text x="590" y="348" textAnchor="middle" fontSize="9" fill="#475569">程序结构：算法/数据结构选择</text>
      <text x="590" y="366" textAnchor="middle" fontSize="9" fill="#475569">模块设计：减少不必要的工作</text>
      <text x="590" y="384" textAnchor="middle" fontSize="9" fill="#475569">函数内：逻辑简化/短路求值</text>
      <text x="590" y="402" textAnchor="middle" fontSize="9" fill="#475569">语句级：循环展开/缓存</text>
      <text x="590" y="420" textAnchor="middle" fontSize="9" fill="#475569">机器级：编译器优化/内联</text>
      <text x="590" y="430" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">从高层到低层逐步深入</text>

      {/* 代码调优技术 */}
      <text x="400" y="458" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">代码调优具体技术</text>

      <rect x="30" y="472" width="145" height="56" rx="8" fill="url(#cc2-dt-tune)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="102" y="492" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">算法优化</text>
      <text x="102" y="510" textAnchor="middle" fontSize="8" fill="#475569">换更高效算法</text>

      <rect x="185" y="472" width="145" height="56" rx="8" fill="url(#cc2-dt-tune)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="257" y="492" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">数据结构</text>
      <text x="257" y="510" textAnchor="middle" fontSize="8" fill="#475569">哈希表/树选择</text>

      <rect x="340" y="472" width="145" height="56" rx="8" fill="url(#cc2-dt-tune)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="412" y="492" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">缓存记忆</text>
      <text x="412" y="510" textAnchor="middle" fontSize="8" fill="#475569">存储计算结果</text>

      <rect x="495" y="472" width="145" height="56" rx="8" fill="url(#cc2-dt-tune)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="567" y="492" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">循环优化</text>
      <text x="567" y="510" textAnchor="middle" fontSize="8" fill="#475569">减少循环内工作</text>

      <rect x="650" y="472" width="120" height="56" rx="8" fill="url(#cc2-dt-tune)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="710" y="492" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">逻辑优化</text>
      <text x="710" y="510" textAnchor="middle" fontSize="8" fill="#475569">短路/提前退出</text>

      {/* 底部总结 */}
      <rect x="30" y="540" width="740" height="34" rx="8" fill="url(#cc2-dt-perf)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">科学调试 = 稳定重现 → 定位根源 → 修复 → 验证 → 查类似错误</text>
      <text x="400" y="570" textAnchor="middle" fontSize="10" fill="#475569">性能调优 = 先测量再优化，优化热点，从高层到低层</text>
    </svg>
  );
}
