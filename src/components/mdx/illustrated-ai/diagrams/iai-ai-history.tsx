"use client";

export function IaiAiHistoryDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="AI 发展史时间线">
      <defs>
        <linearGradient id="iai-ah-symbol" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iai-ah-connect" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="iai-ah-deep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="iai-ah-llm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="iai-ah-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">AI 发展史：三次浪潮与两大范式</text>

      {/* 时间轴主线 */}
      <line x1="60" y1="280" x2="740" y2="280" stroke="#cbd5e1" strokeWidth="3" />

      {/* 第一波：符号主义（1950s-1970s） */}
      <circle cx="120" cy="280" r="8" fill="url(#iai-ah-symbol)" />
      <text x="120" y="260" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">1956</text>
      <text x="120" y="248" textAnchor="middle" fontSize="10" fill="#475569">达特茅斯会议</text>

      <rect x="60" y="300" width="180" height="80" rx="10" fill="url(#iai-ah-symbol)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="322" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">第一次浪潮</text>
      <text x="150" y="340" textAnchor="middle" fontSize="11" fill="#475569">符号主义 / GOFAI</text>
      <text x="150" y="356" textAnchor="middle" fontSize="10" fill="#64748b">逻辑推理 / 专家系统</text>
      <text x="150" y="370" textAnchor="middle" fontSize="10" fill="#64748b">1950s - 1970s</text>

      {/* 第一次寒冬 */}
      <rect x="255" y="262" width="50" height="36" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="280" y="278" textAnchor="middle" fontSize="9" fontWeight="700" fill="#991b1b">第一次</text>
      <text x="280" y="290" textAnchor="middle" fontSize="9" fill="#991b1b">AI 寒冬</text>

      {/* 第二波：专家系统 & 连接主义复兴（1980s） */}
      <circle cx="360" cy="280" r="8" fill="url(#iai-ah-connect)" />
      <text x="360" y="260" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">1986</text>
      <text x="360" y="248" textAnchor="middle" fontSize="10" fill="#475569">反向传播</text>

      <rect x="320" y="300" width="160" height="80" rx="10" fill="url(#iai-ah-connect)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="322" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">第二次浪潮</text>
      <text x="400" y="340" textAnchor="middle" fontSize="11" fill="#475569">连接主义复兴</text>
      <text x="400" y="356" textAnchor="middle" fontSize="10" fill="#64748b">专家系统 / MLP</text>
      <text x="400" y="370" textAnchor="middle" fontSize="10" fill="#64748b">1980s - 1990s</text>

      {/* 第二次寒冬 */}
      <rect x="495" y="262" width="50" height="36" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="520" y="278" textAnchor="middle" fontSize="9" fontWeight="700" fill="#991b1b">第二次</text>
      <text x="520" y="290" textAnchor="middle" fontSize="9" fill="#991b1b">AI 寒冬</text>

      {/* 第三波：深度学习（2010s） */}
      <circle cx="580" cy="280" r="8" fill="url(#iai-ah-deep)" />
      <text x="580" y="260" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">2012</text>
      <text x="580" y="248" textAnchor="middle" fontSize="10" fill="#475569">AlexNet</text>

      <rect x="560" y="300" width="180" height="80" rx="10" fill="url(#iai-ah-deep)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="650" y="322" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">第三次浪潮</text>
      <text x="650" y="340" textAnchor="middle" fontSize="11" fill="#475569">深度学习爆发</text>
      <text x="650" y="356" textAnchor="middle" fontSize="10" fill="#64748b">CNN / RNN / GPU</text>
      <text x="650" y="370" textAnchor="middle" fontSize="10" fill="#64748b">2010s - 至今</text>

      {/* LLM 时代 */}
      <circle cx="700" cy="280" r="10" fill="url(#iai-ah-llm)" />
      <text x="700" y="260" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">2017+</text>
      <text x="700" y="248" textAnchor="middle" fontSize="10" fill="#475569">Transformer</text>

      {/* 上方两大范式对比 */}
      <rect x="60" y="60" width="330" height="100" rx="10" fill="url(#iai-ah-symbol)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="225" y="84" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">符号主义（Symbolism）</text>
      <text x="225" y="104" textAnchor="middle" fontSize="11" fill="#475569">AI = 符号操作 + 逻辑推理</text>
      <text x="225" y="122" textAnchor="middle" fontSize="10" fill="#64748b">手工编码规则，自顶向下</text>
      <text x="225" y="138" textAnchor="middle" fontSize="10" fill="#64748b">代表：LISP / Prolog / 专家系统</text>
      <text x="225" y="154" textAnchor="middle" fontSize="10" fill="#64748b">优势：可解释 / 劣势：知识获取瓶颈</text>

      <rect x="410" y="60" width="330" height="100" rx="10" fill="url(#iai-ah-deep)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="575" y="84" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">连接主义（Connectionism）</text>
      <text x="575" y="104" textAnchor="middle" fontSize="11" fill="#475569">AI = 神经网络 + 数据驱动学习</text>
      <text x="575" y="122" textAnchor="middle" fontSize="10" fill="#64748b">从数据中学习，自底向上</text>
      <text x="575" y="138" textAnchor="middle" fontSize="10" fill="#64748b">代表：CNN / RNN / Transformer</text>
      <text x="575" y="154" textAnchor="middle" fontSize="10" fill="#64748b">优势：泛化强 / 劣势：黑箱难解释</text>

      {/* 底部定义 */}
      <rect x="60" y="410" width="680" height="100" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="80" y="434" fontSize="13" fontWeight="700" fill="#0f172a">AI 的四层定义（从窄到宽）</text>
      <text x="80" y="456" fontSize="11" fill="#475569">反应式机器（Reactive）：仅感知响应，无记忆（如深蓝）</text>
      <text x="80" y="474" fontSize="11" fill="#475569">有限记忆（Limited Memory）：利用历史数据决策（如自动驾驶）</text>
      <text x="80" y="492" fontSize="11" fill="#475569">心智理论（Theory of Mind）：理解他人意图与情绪（研究中）</text>
      <text x="80" y="510" fontSize="11" fill="#475569">自我意识（Self-Aware）：具备自我认知（理论阶段）</text>
    </svg>
  );
}
