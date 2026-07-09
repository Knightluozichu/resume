"use client";

export function DrlRewardDesignDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="奖励设计与环境工程原则图">
      <defs>
        <linearGradient id="drl-rd-principle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="drl-rd-shaping" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="drl-rd-pitfall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="drl-rd-env" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="drl-rd-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">奖励设计与环境工程</text>

      {/* 奖励设计原则 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">奖励设计三原则</text>

      <rect x="30" y="78" width="240" height="90" rx="8" fill="url(#drl-rd-principle)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">1. 稠密性</text>
      <text x="150" y="120" textAnchor="middle" fontSize="10" fill="#475569">频繁反馈 vs 稀疏奖励</text>
      <text x="150" y="138" textAnchor="middle" fontSize="10" fill="#475569">中间奖励引导学习方向</text>
      <text x="150" y="156" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">解决：奖励塑形 / 课程学习</text>

      <rect x="290" y="78" width="240" height="90" rx="8" fill="url(#drl-rd-principle)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="410" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">2. 可学性</text>
      <text x="410" y="120" textAnchor="middle" fontSize="10" fill="#475569">奖励信号可区分好坏</text>
      <text x="410" y="138" textAnchor="middle" fontSize="10" fill="#475569">避免常数奖励或噪声</text>
      <text x="410" y="156" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">解决：奖励归一化 / 裁剪</text>

      <rect x="550" y="78" width="220" height="90" rx="8" fill="url(#drl-rd-principle)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="660" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">3. 一致性</text>
      <text x="660" y="120" textAnchor="middle" fontSize="10" fill="#475569">奖励与目标对齐</text>
      <text x="660" y="138" textAnchor="middle" fontSize="10" fill="#475569">避免奖励 hacking</text>
      <text x="660" y="156" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">解决：多目标奖励加权</text>

      {/* 奖励塑形 */}
      <text x="400" y="196" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">奖励塑形 Reward Shaping</text>

      <rect x="80" y="210" width="640" height="54" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="232" textAnchor="middle" fontSize="12" fill="#475569" fontFamily="monospace">F(s,a,s') = γ · Φ(s') - Φ(s)</text>
      <text x="400" y="252" textAnchor="middle" fontSize="11" fill="#475569">势能函数 Φ 编码先验知识，不改变最优策略，只加速收敛</text>

      {/* 常见陷阱 */}
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#b91c1c">常见陷阱</text>

      <rect x="30" y="304" width="240" height="80" rx="8" fill="url(#drl-rd-pitfall)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="150" y="326" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">奖励 hacking</text>
      <text x="150" y="344" textAnchor="middle" fontSize="10" fill="#475569">智能体找到漏洞获取奖励</text>
      <text x="150" y="360" textAnchor="middle" fontSize="10" fill="#475569">却不完成真实任务</text>
      <text x="150" y="376" textAnchor="middle" fontSize="9" fill="#64748b">例：赛车倒退刷圈数奖励</text>

      <rect x="290" y="304" width="240" height="80" rx="8" fill="url(#drl-rd-pitfall)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="410" y="326" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">稀疏奖励</text>
      <text x="410" y="344" textAnchor="middle" fontSize="10" fill="#475569">只有终止时给奖励</text>
      <text x="410" y="360" textAnchor="middle" fontSize="10" fill="#475569">智能体无法学习</text>
      <text x="410" y="376" textAnchor="middle" fontSize="9" fill="#64748b">例：Montezuma Revenge</text>

      <rect x="550" y="304" width="220" height="80" rx="8" fill="url(#drl-rd-pitfall)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="660" y="326" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">尺度问题</text>
      <text x="660" y="344" textAnchor="middle" fontSize="10" fill="#475569">不同奖励项量级差异大</text>
      <text x="660" y="360" textAnchor="middle" fontSize="10" fill="#475569">某项主导优化方向</text>
      <text x="660" y="376" textAnchor="middle" fontSize="9" fill="#64748b">解决：归一化 / 加权</text>

      {/* 环境工程 */}
      <text x="400" y="412" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">环境工程要点</text>

      <rect x="30" y="426" width="180" height="68" rx="8" fill="url(#drl-rd-env)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="120" y="448" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">Gym接口</text>
      <text x="120" y="466" textAnchor="middle" fontSize="10" fill="#475569">reset() / step()</text>
      <text x="120" y="482" textAnchor="middle" fontSize="10" fill="#475569">统一交互协议</text>

      <rect x="220" y="426" width="180" height="68" rx="8" fill="url(#drl-rd-env)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="310" y="448" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">向量化环境</text>
      <text x="310" y="466" textAnchor="middle" fontSize="10" fill="#475569">多环境并行采样</text>
      <text x="310" y="482" textAnchor="middle" fontSize="10" fill="#475569">提升数据吞吐</text>

      <rect x="410" y="426" width="180" height="68" rx="8" fill="url(#drl-rd-env)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="500" y="448" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">域随机化</text>
      <text x="500" y="466" textAnchor="middle" fontSize="10" fill="#475569">随机化物理参数</text>
      <text x="500" y="482" textAnchor="middle" fontSize="10" fill="#475569">sim-to-real迁移</text>

      <rect x="600" y="426" width="170" height="68" rx="8" fill="url(#drl-rd-env)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="448" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">课程学习</text>
      <text x="685" y="466" textAnchor="middle" fontSize="10" fill="#475569">由易到难递进</text>
      <text x="685" y="482" textAnchor="middle" fontSize="10" fill="#475569">逐步提升难度</text>

      {/* 底部总结 */}
      <rect x="30" y="512" width="740" height="50" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="534" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">奖励设计是RL的「目标定义」，环境工程是RL的「实验平台」</text>
      <text x="400" y="552" textAnchor="middle" fontSize="10" fill="#475569">好的奖励 + 好的环境 = 成功的一半；坏的奖励会让最强算法也学不出东西</text>
    </svg>
  );
}
