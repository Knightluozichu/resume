"use client";

export function LslEvaluationTestingDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="评测与测试 基准体系与自动化评估">
      <defs>
        <linearGradient id="lsl-et-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lsl-et-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lsl-et-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lsl-et-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lsl-et-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">评测与测试</text>

      {/* 评测维度 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">评测维度体系</text>

      <rect x="20" y="74" width="180" height="80" rx="8" fill="url(#lsl-et-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="110" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">知识能力</text>
      <text x="110" y="116" textAnchor="middle" fontSize="9" fill="#475569">MMLU / C-Eval</text>
      <text x="110" y="132" textAnchor="middle" fontSize="9" fill="#475569">常识 / 学科知识</text>
      <text x="110" y="148" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e40af">基础认知</text>

      <rect x="210" y="74" width="180" height="80" rx="8" fill="url(#lsl-et-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="300" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">推理能力</text>
      <text x="300" y="116" textAnchor="middle" fontSize="9" fill="#475569">GSM8K / MATH</text>
      <text x="300" y="132" textAnchor="middle" fontSize="9" fill="#475569">数学 / 逻辑推理</text>
      <text x="300" y="148" textAnchor="middle" fontSize="9" fontWeight="600" fill="#5b21b6">思维链</text>

      <rect x="400" y="74" width="180" height="80" rx="8" fill="url(#lsl-et-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="490" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">代码能力</text>
      <text x="490" y="116" textAnchor="middle" fontSize="9" fill="#475569">HumanEval / MBPP</text>
      <text x="490" y="132" textAnchor="middle" fontSize="9" fill="#475569">代码生成 / 补全</text>
      <text x="490" y="148" textAnchor="middle" fontSize="9" fontWeight="600" fill="#92400e">工程能力</text>

      <rect x="590" y="74" width="190" height="80" rx="8" fill="url(#lsl-et-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">指令遵循</text>
      <text x="685" y="116" textAnchor="middle" fontSize="9" fill="#475569">IFEval / MT-Bench</text>
      <text x="685" y="132" textAnchor="middle" fontSize="9" fill="#475569">格式 / 约束遵循</text>
      <text x="685" y="148" textAnchor="middle" fontSize="9" fontWeight="600" fill="#065f46">对齐质量</text>

      {/* 评估方法 */}
      <text x="400" y="182" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三种评估方法</text>

      <rect x="20" y="196" width="250" height="120" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="145" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">基准测试</text>
      <text x="145" y="238" textAnchor="middle" fontSize="9" fill="#475569">标准化题库自动评分</text>
      <text x="145" y="254" textAnchor="middle" fontSize="9" fill="#475569">选择题 / 填空题 / 代码题</text>
      <text x="145" y="270" textAnchor="middle" fontSize="9" fill="#475569">优点：可复现 / 成本低</text>
      <text x="145" y="286" textAnchor="middle" fontSize="9" fill="#475569">缺点：覆盖面有限</text>
      <text x="145" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">风险：数据污染</text>

      <rect x="275" y="196" width="250" height="120" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">人工评估</text>
      <text x="400" y="238" textAnchor="middle" fontSize="9" fill="#475569">人类标注员打分</text>
      <text x="400" y="254" textAnchor="middle" fontSize="9" fill="#475569">多维评分 / 偏好对比</text>
      <text x="400" y="270" textAnchor="middle" fontSize="9" fill="#475569">优点：最接近真实体验</text>
      <text x="400" y="286" textAnchor="middle" fontSize="9" fill="#475569">缺点：成本高 / 慢</text>
      <text x="400" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">风险：标注者偏差</text>

      <rect x="530" y="196" width="250" height="120" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="655" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">LLM-as-Judge</text>
      <text x="655" y="238" textAnchor="middle" fontSize="9" fill="#475569">用强模型评估目标模型</text>
      <text x="655" y="254" textAnchor="middle" fontSize="9" fill="#475569">GPT-4 评分 / 自动化</text>
      <text x="655" y="270" textAnchor="middle" fontSize="9" fill="#475569">优点：快 / 可大规模</text>
      <text x="655" y="286" textAnchor="middle" fontSize="9" fill="#475569">缺点：judge 有偏见</text>
      <text x="655" y="304" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">风险：位置偏好</text>

      {/* 评测流程 */}
      <text x="400" y="340" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">自动化评测流程</text>

      <rect x="20" y="354" width="120" height="50" rx="8" fill="url(#lsl-et-blue)" opacity="0.9" />
      <text x="80" y="378" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">构建测试集</text>
      <text x="80" y="394" textAnchor="middle" fontSize="9" fill="#bfdbfe">覆盖多维度</text>

      <path d="M140 379 L158 379" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-et-arrow)" />

      <rect x="163" y="354" width="120" height="50" rx="8" fill="url(#lsl-et-purple)" opacity="0.9" />
      <text x="223" y="378" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">模型推理</text>
      <text x="223" y="394" textAnchor="middle" fontSize="9" fill="#ede9fe">批量生成</text>

      <path d="M283 379 L301 379" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-et-arrow)" />

      <rect x="306" y="354" width="120" height="50" rx="8" fill="url(#lsl-et-amber)" opacity="0.9" />
      <text x="366" y="378" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">自动评分</text>
      <text x="366" y="394" textAnchor="middle" fontSize="9" fill="#fef3c7">规则/模型</text>

      <path d="M426 379 L444 379" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-et-arrow)" />

      <rect x="449" y="354" width="120" height="50" rx="8" fill="url(#lsl-et-green)" opacity="0.9" />
      <text x="509" y="378" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">结果分析</text>
      <text x="509" y="394" textAnchor="middle" fontSize="9" fill="#d1fae5">维度拆解</text>

      <path d="M569 379 L587 379" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-et-arrow)" />

      <rect x="592" y="354" width="188" height="50" rx="8" fill="url(#lsl-et-blue)" opacity="0.15" stroke="#2563eb" strokeWidth="1.5" />
      <text x="686" y="378" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">迭代优化</text>
      <text x="686" y="394" textAnchor="middle" fontSize="9" fill="#475569">bad case 驱动</text>

      {/* 关键基准 */}
      <text x="400" y="428" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">关键基准数据集</text>

      <rect x="20" y="442" width="180" height="56" rx="8" fill="url(#lsl-et-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="110" y="464" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">MMLU</text>
      <text x="110" y="484" textAnchor="middle" fontSize="9" fill="#475569">57 学科选择题</text>

      <rect x="210" y="442" width="180" height="56" rx="8" fill="url(#lsl-et-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="300" y="464" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">GSM8K</text>
      <text x="300" y="484" textAnchor="middle" fontSize="9" fill="#475569">小学数学应用题</text>

      <rect x="400" y="442" width="180" height="56" rx="8" fill="url(#lsl-et-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="490" y="464" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">HumanEval</text>
      <text x="490" y="484" textAnchor="middle" fontSize="9" fill="#475569">Python 编程题</text>

      <rect x="590" y="442" width="190" height="56" rx="8" fill="url(#lsl-et-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="464" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">MT-Bench</text>
      <text x="685" y="484" textAnchor="middle" fontSize="9" fill="#475569">多轮对话评估</text>

      {/* 挑战 */}
      <text x="400" y="522" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">评测关键挑战</text>

      <rect x="20" y="536" width="180" height="32" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="110" y="556" textAnchor="middle" fontSize="9" fill="#991b1b">数据污染泄露</text>

      <rect x="210" y="536" width="180" height="32" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="300" y="556" textAnchor="middle" fontSize="9" fill="#991b1b">基准过拟合</text>

      <rect x="400" y="536" width="180" height="32" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="490" y="556" textAnchor="middle" fontSize="9" fill="#991b1b">长尾覆盖不足</text>

      <rect x="590" y="536" width="190" height="32" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="685" y="556" textAnchor="middle" fontSize="9" fill="#991b1b">评估与真实差距</text>

      <rect x="20" y="572" width="760" height="6" rx="3" fill="url(#lsl-et-purple)" opacity="0.08" />
    </svg>
  );
}
