"use client";

export function TcgFutureImplicationsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="AI的未来与影响：能力、局限与未来方向">
      <defs>
        <linearGradient id="tcg-fi-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="tcg-fi-lim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="tcg-fi-fut" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tcg-fi-impact" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <marker id="tcg-fi-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">AI 的未来与影响</text>

      {/* 能力与局限 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">ChatGPT 的能力与局限</text>

      {/* 能力 */}
      <rect x="40" y="80" width="360" height="180" rx="10" fill="url(#tcg-fi-cap)" opacity="0.06" stroke="#059669" strokeWidth="1.5" />
      <rect x="40" y="80" width="360" height="36" rx="10" fill="url(#tcg-fi-cap)" opacity="0.85" />
      <text x="220" y="103" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">令人惊叹的能力</text>
      <text x="60" y="134" fontSize="11" fill="#475569">语言理解：读懂并回应复杂指令</text>
      <text x="60" y="156" fontSize="11" fill="#475569">知识整合：融合跨领域知识生成回答</text>
      <text x="60" y="178" fontSize="11" fill="#475569">代码生成：编写、调试、解释代码</text>
      <text x="60" y="200" fontSize="11" fill="#475569">创意写作：诗歌、故事、文章创作</text>
      <text x="60" y="222" fontSize="11" fill="#475569">翻译与摘要：跨语言信息转换</text>
      <text x="60" y="244" fontSize="11" fill="#475569">推理：多步逻辑推理与数学计算</text>

      {/* 局限 */}
      <rect x="420" y="80" width="340" height="180" rx="10" fill="url(#tcg-fi-lim)" opacity="0.06" stroke="#dc2626" strokeWidth="1.5" />
      <rect x="420" y="80" width="340" height="36" rx="10" fill="url(#tcg-fi-lim)" opacity="0.85" />
      <text x="590" y="103" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">固有的局限</text>
      <text x="440" y="134" fontSize="11" fill="#475569">幻觉：自信地生成错误信息</text>
      <text x="440" y="156" fontSize="11" fill="#475569">无真实理解：统计模式而非语义</text>
      <text x="440" y="178" fontSize="11" fill="#475569">时效性：训练数据有截止日期</text>
      <text x="440" y="200" fontSize="11" fill="#475569">数值推理：精确计算不可靠</text>
      <text x="440" y="222" fontSize="11" fill="#475569">上下文限制：窗口外信息丢失</text>
      <text x="440" y="244" fontSize="11" fill="#475569">偏见：训练数据中的偏见被放大</text>

      {/* 为什么有效但有限 */}
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">为什么有效：统计规律 vs 真实理解</text>

      <rect x="40" y="306" width="720" height="70" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="330" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">ChatGPT 本质上是在做"下一个token预测"</text>
      <text x="400" y="352" textAnchor="middle" fontSize="11" fill="#475569">它学习了人类语言的统计规律，而非真正"理解"意义</text>
      <text x="400" y="370" textAnchor="middle" fontSize="10" fill="#64748b">惊人的能力来自海量数据中的模式匹配 → 但这也解释了为什么它会"一本正经地胡说八道"</text>

      {/* 未来方向 */}
      <text x="400" y="404" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">未来发展方向</text>

      <rect x="40" y="420" width="170" height="80" rx="10" fill="url(#tcg-fi-fut)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="125" y="444" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">更大模型</text>
      <text x="125" y="464" textAnchor="middle" fontSize="10" fill="#475569">参数规模持续增长</text>
      <text x="125" y="482" textAnchor="middle" fontSize="10" fill="#475569">涌现新能力</text>

      <rect x="225" y="420" width="170" height="80" rx="10" fill="url(#tcg-fi-fut)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="444" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">多模态</text>
      <text x="310" y="464" textAnchor="middle" fontSize="10" fill="#475569">文本+图像+音频</text>
      <text x="310" y="482" textAnchor="middle" fontSize="10" fill="#475569">统一理解与生成</text>

      <rect x="410" y="420" width="170" height="80" rx="10" fill="url(#tcg-fi-fut)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="495" y="444" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">工具增强</text>
      <text x="495" y="464" textAnchor="middle" fontSize="10" fill="#475569">检索+计算+执行</text>
      <text x="495" y="482" textAnchor="middle" fontSize="10" fill="#475569">弥补固有局限</text>

      <rect x="595" y="420" width="165" height="80" rx="10" fill="url(#tcg-fi-fut)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="677" y="444" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">Agent化</text>
      <text x="677" y="464" textAnchor="middle" fontSize="10" fill="#475569">规划+行动+反思</text>
      <text x="677" y="482" textAnchor="middle" fontSize="10" fill="#475569">自主完成任务</text>

      {/* 底部总结 */}
      <rect x="40" y="520" width="720" height="40" rx="8" fill="url(#tcg-fi-impact)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="538" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">核心洞察</text>
      <text x="400" y="554" textAnchor="middle" fontSize="11" fill="#475569">语言模型 = 统计规律学习 → 能力惊人但非真正理解 → 未来在于弥补局限与拓展边界</text>
    </svg>
  );
}
