"use client";

export function LcpModelsPromptsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="模型与提示模板 Model I/O 流程">
      <defs>
        <linearGradient id="lcp-mp-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lcp-mp-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lcp-mp-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lcp-mp-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lcp-mp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">模型与提示模板：Model I/O 三阶段</text>

      {/* 顶部流程：Prompt → Model → Parser */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Model I/O 核心流程</text>

      <rect x="30" y="76" width="200" height="100" rx="10" fill="url(#lcp-mp-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="130" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">1. Prompts</text>
      <text x="130" y="120" textAnchor="middle" fontSize="10" fill="#475569">PromptTemplate</text>
      <text x="130" y="136" textAnchor="middle" fontSize="10" fill="#475569">ChatPromptTemplate</text>
      <text x="130" y="152" textAnchor="middle" fontSize="10" fill="#475569">FewShotPromptTemplate</text>
      <text x="130" y="168" textAnchor="middle" fontSize="10" fill="#475569">变量填充 + 模板渲染</text>

      <path d="M230 126 L270 126" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-mp-arrow)" />

      <rect x="275" y="76" width="200" height="100" rx="10" fill="url(#lcp-mp-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="375" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">2. Models</text>
      <text x="375" y="120" textAnchor="middle" fontSize="10" fill="#475569">LLM（文本补全）</text>
      <text x="375" y="136" textAnchor="middle" fontSize="10" fill="#475569">ChatModel（对话）</text>
      <text x="375" y="152" textAnchor="middle" fontSize="10" fill="#475569">OpenAI / Anthropic</text>
      <text x="375" y="168" textAnchor="middle" fontSize="10" fill="#475569">统一 invoke 接口</text>

      <path d="M475 126 L515 126" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-mp-arrow)" />

      <rect x="520" y="76" width="250" height="100" rx="10" fill="url(#lcp-mp-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="645" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">3. Output Parsers</text>
      <text x="645" y="120" textAnchor="middle" fontSize="10" fill="#475569">StrOutputParser</text>
      <text x="645" y="136" textAnchor="middle" fontSize="10" fill="#475569">JsonOutputParser</text>
      <text x="645" y="152" textAnchor="middle" fontSize="10" fill="#475569">PydanticOutputParser</text>
      <text x="645" y="168" textAnchor="middle" fontSize="10" fill="#475569">结构化解析 + 验证</text>

      {/* 中部：模型类型对比 */}
      <text x="400" y="208" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">模型类型对比</text>

      <rect x="30" y="222" width="360" height="130" rx="8" fill="url(#lcp-mp-blue)" opacity="0.06" stroke="#2563eb" strokeWidth="1.5" />
      <text x="210" y="246" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">LLM（文本补全模型）</text>
      <text x="50" y="270" fontSize="10" fill="#475569">接口：predict(prompt) / invoke(input)</text>
      <text x="50" y="290" fontSize="10" fill="#475569">输入：纯文本字符串</text>
      <text x="50" y="310" fontSize="10" fill="#475569">输出：纯文本字符串</text>
      <text x="50" y="330" fontSize="10" fill="#475569">场景：补全/摘要/翻译等单轮任务</text>

      <rect x="410" y="222" width="360" height="130" rx="8" fill="url(#lcp-mp-purple)" opacity="0.06" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="590" y="246" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">ChatModel（对话模型）</text>
      <text x="430" y="270" fontSize="10" fill="#475569">接口：predict(messages) / invoke(input)</text>
      <text x="430" y="290" fontSize="10" fill="#475569">输入：Message 列表</text>
      <text x="430" y="310" fontSize="10" fill="#475569">输出：AIMessage 对象</text>
      <text x="430" y="330" fontSize="10" fill="#475569">场景：多轮对话/角色扮演/Function Call</text>

      {/* 下部：提示模板类型 */}
      <text x="400" y="378" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">提示模板类型</text>

      <rect x="30" y="392" width="180" height="80" rx="8" fill="url(#lcp-mp-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="120" y="416" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">PromptTemplate</text>
      <text x="120" y="436" textAnchor="middle" fontSize="9" fill="#475569">单轮文本提示</text>
      <text x="120" y="452" textAnchor="middle" fontSize="9" fill="#475569">变量模板占位符</text>
      <text x="120" y="468" textAnchor="middle" fontSize="9" fill="#475569">from_template 快速创建</text>

      <rect x="225" y="392" width="180" height="80" rx="8" fill="url(#lcp-mp-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="315" y="416" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">ChatPromptTemplate</text>
      <text x="315" y="436" textAnchor="middle" fontSize="9" fill="#475569">多角色对话提示</text>
      <text x="315" y="452" textAnchor="middle" fontSize="9" fill="#475569">System/Human/AI 角色</text>
      <text x="315" y="468" textAnchor="middle" fontSize="9" fill="#475569">from_messages 构建</text>

      <rect x="420" y="392" width="180" height="80" rx="8" fill="url(#lcp-mp-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="510" y="416" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">FewShotPrompt</text>
      <text x="510" y="436" textAnchor="middle" fontSize="9" fill="#475569">少样本示例提示</text>
      <text x="510" y="452" textAnchor="middle" fontSize="9" fill="#475569">提供输入输出对</text>
      <text x="510" y="468" textAnchor="middle" fontSize="9" fill="#475569">引导格式和风格</text>

      <rect x="615" y="392" width="155" height="80" rx="8" fill="url(#lcp-mp-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="692" y="416" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">MessagePlaceholder</text>
      <text x="692" y="436" textAnchor="middle" fontSize="9" fill="#475569">动态消息占位</text>
      <text x="692" y="452" textAnchor="middle" fontSize="9" fill="#475569">插入历史对话</text>
      <text x="692" y="468" textAnchor="middle" fontSize="9" fill="#475569">灵活组装上下文</text>

      {/* 底部总结 */}
      <rect x="30" y="492" width="740" height="56" rx="8" fill="url(#lcp-mp-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="2" />
      <text x="400" y="516" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">Model I/O 本质：提示模板格式化输入 → 模型统一接口调用 → 输出解析器结构化结果</text>
      <text x="400" y="536" textAnchor="middle" fontSize="10" fill="#475569">所有模型通过 Runnable 接口统一，支持同步/异步/流式/批量四种调用模式</text>
    </svg>
  );
}
