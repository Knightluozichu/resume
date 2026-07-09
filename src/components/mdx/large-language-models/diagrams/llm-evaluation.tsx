"use client";

export function LlmEvaluationDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="评估方法与基准 能力度量维度与评估体系">
      <defs>
        <linearGradient id="llm-ev-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="llm-ev-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="llm-ev-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="llm-ev-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="llm-ev-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">评估方法与基准</text>

      {/* 评估维度 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心评估维度</text>

      <rect x="30" y="76" width="180" height="100" rx="10" fill="url(#llm-ev-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">知识能力</text>
      <text x="120" y="118" textAnchor="middle" fontSize="10" fill="#475569">MMLU (多任务理解)</text>
      <text x="120" y="134" textAnchor="middle" fontSize="10" fill="#475569">TriviaQA (知识问答)</text>
      <text x="120" y="150" textAnchor="middle" fontSize="10" fill="#475569">NaturalQuestions</text>
      <text x="120" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">事实知识广度</text>

      <rect x="220" y="76" width="180" height="100" rx="10" fill="url(#llm-ev-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">推理能力</text>
      <text x="310" y="118" textAnchor="middle" fontSize="10" fill="#475569">GSM8K (数学推理)</text>
      <text x="310" y="134" textAnchor="middle" fontSize="10" fill="#475569">HumanEval (代码)</text>
      <text x="310" y="150" textAnchor="middle" fontSize="10" fill="#475569">BBH (复杂推理)</text>
      <text x="310" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">逻辑推理深度</text>

      <rect x="410" y="76" width="180" height="100" rx="10" fill="url(#llm-ev-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">语言能力</text>
      <text x="500" y="118" textAnchor="middle" fontSize="10" fill="#475569">WMT (翻译)</text>
      <text x="500" y="134" textAnchor="middle" fontSize="10" fill="#475569">SQuAD (阅读理解)</text>
      <text x="500" y="150" textAnchor="middle" fontSize="10" fill="#475569">BoolQ (判断)</text>
      <text x="500" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">语言理解精度</text>

      <rect x="600" y="76" width="170" height="100" rx="10" fill="url(#llm-ev-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">安全对齐</text>
      <text x="685" y="118" textAnchor="middle" fontSize="10" fill="#475569">TruthfulQA (真实)</text>
      <text x="685" y="134" textAnchor="middle" fontSize="10" fill="#475569">ToxiGen (毒性)</text>
      <text x="685" y="150" textAnchor="middle" fontSize="10" fill="#475569">BBQ (偏见)</text>
      <text x="685" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">安全可靠程度</text>

      {/* 评估方法 */}
      <text x="400" y="204" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">评估方法论</text>

      <rect x="30" y="218" width="230" height="120" rx="10" fill="url(#llm-ev-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="145" y="240" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">客观基准评测</text>
      <text x="145" y="262" textAnchor="middle" fontSize="10" fill="#475569">标准化数据集</text>
      <text x="145" y="278" textAnchor="middle" fontSize="10" fill="#475569">固定题目 + 标准答案</text>
      <text x="145" y="294" textAnchor="middle" fontSize="10" fill="#475569">准确率 / 通过率</text>
      <text x="145" y="310" textAnchor="middle" fontSize="10" fill="#475569">可复现、可比较</text>
      <text x="145" y="328" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">适合知识/推理评估</text>

      <rect x="285" y="218" width="230" height="120" rx="10" fill="url(#llm-ev-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="240" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">人工评测</text>
      <text x="400" y="262" textAnchor="middle" fontSize="10" fill="#475569">人类标注员打分</text>
      <text x="400" y="278" textAnchor="middle" fontSize="10" fill="#475569">Elo 等级分排名</text>
      <text x="400" y="294" textAnchor="middle" fontSize="10" fill="#475569">Chatbot Arena 对战</text>
      <text x="400" y="310" textAnchor="middle" fontSize="10" fill="#475569">偏好 A/B 比较</text>
      <text x="400" y="328" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">适合主观质量评估</text>

      <rect x="540" y="218" width="230" height="120" rx="10" fill="url(#llm-ev-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="655" y="240" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">LLM-as-Judge</text>
      <text x="655" y="262" textAnchor="middle" fontSize="10" fill="#475569">用大模型评估大模型</text>
      <text x="655" y="278" textAnchor="middle" fontSize="10" fill="#475569">GPT-4 等强模型评分</text>
      <text x="655" y="294" textAnchor="middle" fontSize="10" fill="#475569">低成本高效率</text>
      <text x="655" y="310" textAnchor="middle" fontSize="10" fill="#475569">可大规模扩展</text>
      <text x="655" y="328" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">适合快速迭代</text>

      {/* 评估挑战 */}
      <text x="400" y="366" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">评估挑战与应对</text>

      <rect x="30" y="380" width="180" height="70" rx="8" fill="url(#llm-ev-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="400" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">数据污染</text>
      <text x="120" y="418" textAnchor="middle" fontSize="9" fill="#475569">测试集泄露到训练集</text>
      <text x="120" y="434" textAnchor="middle" fontSize="9" fill="#475569">应对：动态更新题库</text>

      <rect x="220" y="380" width="180" height="70" rx="8" fill="url(#llm-ev-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="400" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">对齐税</text>
      <text x="310" y="418" textAnchor="middle" fontSize="9" fill="#475569">对齐后基准下降</text>
      <text x="310" y="434" textAnchor="middle" fontSize="9" fill="#475569">应对：多阶段评估</text>

      <rect x="410" y="380" width="180" height="70" rx="8" fill="url(#llm-ev-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="400" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">幻觉检测</text>
      <text x="500" y="418" textAnchor="middle" fontSize="9" fill="#475569">编造不存在的事实</text>
      <text x="500" y="434" textAnchor="middle" fontSize="9" fill="#475569">应对：事实核查基准</text>

      <rect x="600" y="380" width="170" height="70" rx="8" fill="url(#llm-ev-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="400" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">快速过时</text>
      <text x="685" y="418" textAnchor="middle" fontSize="9" fill="#475569">模型进化快于基准</text>
      <text x="685" y="434" textAnchor="middle" fontSize="9" fill="#475569">应对：持续更新基准</text>

      {/* 评估流程 */}
      <text x="400" y="478" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">综合评估流程</text>

      <rect x="30" y="492" width="120" height="40" rx="8" fill="url(#llm-ev-blue)" opacity="0.9" />
      <text x="90" y="516" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">基准测试</text>

      <path d="M150 512 L168 512" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-ev-arrow)" />

      <rect x="172" y="492" width="120" height="40" rx="8" fill="url(#llm-ev-purple)" opacity="0.9" />
      <text x="232" y="516" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">人工评测</text>

      <path d="M292 512 L310 512" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-ev-arrow)" />

      <rect x="314" y="492" width="120" height="40" rx="8" fill="url(#llm-ev-amber)" opacity="0.9" />
      <text x="374" y="516" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">LLM-Judge</text>

      <path d="M434 512 L452 512" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-ev-arrow)" />

      <rect x="456" y="492" width="140" height="40" rx="8" fill="url(#llm-ev-green)" opacity="0.9" />
      <text x="526" y="516" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">红队安全测试</text>

      <path d="M596 512 L614 512" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-ev-arrow)" />

      <rect x="618" y="492" width="150" height="40" rx="8" fill="url(#llm-ev-blue)" opacity="0.9" />
      <text x="693" y="516" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">综合能力报告</text>

      {/* 底部总结 */}
      <rect x="30" y="544" width="740" height="14" rx="6" fill="url(#llm-ev-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1" />
      <text x="400" y="556" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">核心：多维度 + 多方法 + 多视角——综合评估才能全面衡量大模型能力</text>
    </svg>
  );
}
