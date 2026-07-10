"use client";

export function AupComplexityFutureDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="复杂性与未来展望图">
      <defs>
        <linearGradient id="aup-cf-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="aup-cf-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="aup-cf-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="aup-cf-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="aup-cf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">复杂性与未来</text>

      {/* 复杂性来源 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">复杂性的来源</text>

      <rect x="30" y="76" width="180" height="120" rx="10" fill="url(#aup-cf-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="120" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">本质复杂性</text>
      <text x="120" y="120" textAnchor="middle" fontSize="9" fill="#475569">问题本身固有</text>
      <text x="120" y="136" textAnchor="middle" fontSize="9" fill="#475569">无法消除</text>
      <text x="120" y="152" textAnchor="middle" fontSize="9" fill="#475569">业务规则的复杂</text>
      <text x="120" y="168" textAnchor="middle" fontSize="9" fill="#475569">只能管理</text>
      <text x="120" y="184" textAnchor="middle" fontSize="9" fill="#475569">接受并隔离</text>

      <rect x="230" y="76" width="180" height="120" rx="10" fill="url(#aup-cf-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="320" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">偶然复杂性</text>
      <text x="320" y="120" textAnchor="middle" fontSize="9" fill="#475569">实现引入的</text>
      <text x="320" y="136" textAnchor="middle" fontSize="9" fill="#475569">应当消除</text>
      <text x="320" y="152" textAnchor="middle" fontSize="9" fill="#475569">糟糕的抽象</text>
      <text x="320" y="168" textAnchor="middle" fontSize="9" fill="#475569">过度设计</text>
      <text x="320" y="184" textAnchor="middle" fontSize="9" fill="#475569">不必要的耦合</text>

      <rect x="430" y="76" width="180" height="120" rx="10" fill="url(#aup-cf-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="520" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">规模复杂性</text>
      <text x="520" y="120" textAnchor="middle" fontSize="9" fill="#475569">系统增长带来</text>
      <text x="520" y="136" textAnchor="middle" fontSize="9" fill="#475569">需架构应对</text>
      <text x="520" y="152" textAnchor="middle" fontSize="9" fill="#475569">团队协作</text>
      <text x="520" y="168" textAnchor="middle" fontSize="9" fill="#475569">历史遗留</text>
      <text x="520" y="184" textAnchor="middle" fontSize="9" fill="#475569">技术债务</text>

      <rect x="630" y="76" width="140" height="120" rx="10" fill="url(#aup-cf-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="700" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">交互复杂性</text>
      <text x="700" y="120" textAnchor="middle" fontSize="9" fill="#475569">组件间耦合</text>
      <text x="700" y="136" textAnchor="middle" fontSize="9" fill="#475569">需解耦</text>
      <text x="700" y="152" textAnchor="middle" fontSize="9" fill="#475569">隐式依赖</text>
      <text x="700" y="168" textAnchor="middle" fontSize="9" fill="#475569">状态共享</text>
      <text x="700" y="184" textAnchor="middle" fontSize="9" fill="#475569">副作用蔓延</text>

      {/* 控制复杂度的策略 */}
      <text x="400" y="220" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">控制复杂度的策略</text>

      <rect x="30" y="234" width="240" height="140" rx="10" fill="url(#aup-cf-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="150" y="258" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">分层与隔离</text>
      <text x="50" y="278" fontSize="9" fill="#475569">将系统分为清晰的层次</text>
      <text x="50" y="294" fontSize="9" fill="#475569">每层有明确的职责</text>
      <text x="50" y="310" fontSize="9" fill="#475569">层间通过接口通信</text>
      <text x="50" y="326" fontSize="9" fill="#475569">降低耦合度</text>
      <text x="50" y="342" fontSize="9" fill="#475569">可独立替换</text>
      <text x="50" y="358" fontSize="9" fill="#475569">关注点分离</text>

      <rect x="290" y="234" width="220" height="140" rx="10" fill="url(#aup-cf-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="258" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">组合优于集成</text>
      <text x="310" y="278" fontSize="9" fill="#475569">小工具组合完成</text>
      <text x="310" y="294" fontSize="9" fill="#475569">优于大而全的系统</text>
      <text x="310" y="310" fontSize="9" fill="#475569">每个组件做一件事</text>
      <text x="310" y="326" fontSize="9" fill="#475569">接口保持简单</text>
      <text x="310" y="342" fontSize="9" fill="#475569">可独立测试</text>
      <text x="310" y="358" fontSize="9" fill="#475569">可独立演进</text>

      <rect x="530" y="234" width="240" height="140" rx="10" fill="url(#aup-cf-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="650" y="258" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">渐进式增长</text>
      <text x="550" y="278" fontSize="9" fill="#475569">从小处着手</text>
      <text x="550" y="294" fontSize="9" fill="#475569">先跑通再完善</text>
      <text x="550" y="310" fontSize="9" fill="#475569">持续重构</text>
      <text x="550" y="326" fontSize="9" fill="#475569">及时消除技术债</text>
      <text x="550" y="342" fontSize="9" fill="#475569">保持代码可读</text>
      <text x="550" y="358" fontSize="9" fill="#475569">拥抱变化</text>

      {/* 未来趋势 */}
      <text x="400" y="398" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">UNIX 哲学的未来延续</text>

      <rect x="30" y="412" width="180" height="100" rx="8" fill="url(#aup-cf-4)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="120" y="436" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">云原生</text>
      <text x="120" y="456" textAnchor="middle" fontSize="9" fill="#475569">微服务 = 小工具</text>
      <text x="120" y="472" textAnchor="middle" fontSize="9" fill="#475569">API 网关 = 管道</text>
      <text x="120" y="488" textAnchor="middle" fontSize="9" fill="#475569">容器 = 进程隔离</text>
      <text x="120" y="504" textAnchor="middle" fontSize="9" fill="#475569">声明式配置</text>

      <rect x="230" y="412" width="180" height="100" rx="8" fill="url(#aup-cf-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="320" y="436" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">DevOps</text>
      <text x="320" y="456" textAnchor="middle" fontSize="9" fill="#475569">CI/CD = 自动化</text>
      <text x="320" y="472" textAnchor="middle" fontSize="9" fill="#475569">基础设施即代码</text>
      <text x="320" y="488" textAnchor="middle" fontSize="9" fill="#475569">可观测性优先</text>
      <text x="320" y="504" textAnchor="middle" fontSize="9" fill="#475569">日志/指标/追踪</text>

      <rect x="430" y="412" width="180" height="100" rx="8" fill="url(#aup-cf-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="520" y="436" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7e22ce">函数式</text>
      <text x="520" y="456" textAnchor="middle" fontSize="9" fill="#475569">纯函数 = 无副作用</text>
      <text x="520" y="472" textAnchor="middle" fontSize="9" fill="#475569">不可变 = 可组合</text>
      <text x="520" y="488" textAnchor="middle" fontSize="9" fill="#475569">map/filter/reduce</text>
      <text x="520" y="504" textAnchor="middle" fontSize="9" fill="#475569">= 管道模式</text>

      <rect x="630" y="412" width="140" height="100" rx="8" fill="url(#aup-cf-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="700" y="436" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">AI 辅助</text>
      <text x="700" y="456" textAnchor="middle" fontSize="9" fill="#475569">AI = 新的过滤器</text>
      <text x="700" y="472" textAnchor="middle" fontSize="9" fill="#475569">stdin → AI → stdout</text>
      <text x="700" y="488" textAnchor="middle" fontSize="9" fill="#475569">可组合工具链</text>
      <text x="700" y="504" textAnchor="middle" fontSize="9" fill="#475569">文本优先延续</text>

      {/* 底部总结 */}
      <rect x="30" y="524" width="740" height="40" rx="8" fill="url(#aup-cf-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">核心：消除偶然复杂性 → 管理本质复杂性 → 拥抱未来变化——UNIX 哲学持续演进</text>
    </svg>
  );
}
