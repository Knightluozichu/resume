"use client";

export function DlgEvaluationEthicsDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="生成模型评估指标与伦理框架">
      <defs>
        <linearGradient id="dlg-ee-eval" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlg-ee-ethics" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="dlg-ee-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">生成模型评估与伦理</text>

      {/* 评估指标 */}
      <text x="200" y="68" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1e40af">评估指标</text>

      <rect x="40" y="80" width="320" height="56" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="60" y="102" fontSize="12" fontWeight="700" fill="#1e40af">FID（Fréchet Inception Distance）</text>
      <text x="60" y="120" fontSize="10" fill="#475569">真实图像与生成图像的特征分布距离，越低越好</text>

      <rect x="40" y="146" width="320" height="56" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="60" y="168" fontSize="12" fontWeight="700" fill="#1e40af">IS（Inception Score）</text>
      <text x="60" y="186" fontSize="10" fill="#475569">衡量生成图像的清晰度与多样性，越高越好</text>

      <rect x="40" y="212" width="320" height="56" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="60" y="234" fontSize="12" fontWeight="700" fill="#1e40af">CLIP Score</text>
      <text x="60" y="252" fontSize="10" fill="#475569">文本与图像的语义匹配度，用于文生图评估</text>

      <rect x="40" y="278" width="320" height="56" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="60" y="300" fontSize="12" fontWeight="700" fill="#1e40af">人工评估</text>
      <text x="60" y="318" fontSize="10" fill="#475569">真实性 / 美观度 / 多样性主观打分</text>

      {/* 伦理风险 */}
      <text x="600" y="68" textAnchor="middle" fontSize="15" fontWeight="700" fill="#991b1b">伦理风险</text>

      <rect x="440" y="80" width="320" height="56" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="460" y="102" fontSize="12" fontWeight="700" fill="#991b1b">深度伪造（Deepfake）</text>
      <text x="460" y="120" fontSize="10" fill="#475569">伪造人脸 / 视频，用于欺诈与虚假信息</text>

      <rect x="440" y="146" width="320" height="56" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="460" y="168" fontSize="12" fontWeight="700" fill="#991b1b">偏见与歧视</text>
      <text x="460" y="186" fontSize="10" fill="#475569">训练数据偏见导致生成结果歧视特定群体</text>

      <rect x="440" y="212" width="320" height="56" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="460" y="234" fontSize="12" fontWeight="700" fill="#991b1b">版权与知识产权</text>
      <text x="460" y="252" fontSize="10" fill="#475569">训练数据与生成作品的版权归属争议</text>

      <rect x="440" y="278" width="320" height="56" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="460" y="300" fontSize="12" fontWeight="700" fill="#991b1b">隐私泄露</text>
      <text x="460" y="318" fontSize="10" fill="#475569">模型可能记忆并复现训练数据中的隐私信息</text>

      {/* 中间连接 */}
      <path d="M360 176 L440 176" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-ee-arrow)" />
      <text x="400" y="168" textAnchor="middle" fontSize="10" fill="#64748b">评估驱动改进</text>

      {/* 应对策略 */}
      <text x="400" y="362" textAnchor="middle" fontSize="15" fontWeight="700" fill="#334155">应对策略</text>

      <rect x="40" y="376" width="175" height="80" rx="10" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="127" y="398" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">技术检测</text>
      <text x="127" y="416" textAnchor="middle" fontSize="10" fill="#475569">Deepfake 检测器</text>
      <text x="127" y="432" textAnchor="middle" fontSize="10" fill="#475569">水印 / 数字签名</text>
      <text x="127" y="448" textAnchor="middle" fontSize="10" fill="#475569">溯源标记</text>

      <rect x="233" y="376" width="175" height="80" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="320" y="398" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">数据治理</text>
      <text x="320" y="416" textAnchor="middle" fontSize="10" fill="#475569">数据清洗去偏</text>
      <text x="320" y="432" textAnchor="middle" fontSize="10" fill="#475569">多样化数据采集</text>
      <text x="320" y="448" textAnchor="middle" fontSize="10" fill="#475569">数据来源审计</text>

      <rect x="426" y="376" width="175" height="80" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="513" y="398" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">法规与政策</text>
      <text x="513" y="416" textAnchor="middle" fontSize="10" fill="#475569">AI 生成内容标注</text>
      <text x="513" y="432" textAnchor="middle" fontSize="10" fill="#475569">使用许可与限制</text>
      <text x="513" y="448" textAnchor="middle" fontSize="10" fill="#475569">责任归属界定</text>

      <rect x="619" y="376" width="141" height="80" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
      <text x="689" y="398" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9d174d">伦理审查</text>
      <text x="689" y="416" textAnchor="middle" fontSize="10" fill="#475569">伦理委员会</text>
      <text x="689" y="432" textAnchor="middle" fontSize="10" fill="#475569">开源模型审查</text>
      <text x="689" y="448" textAnchor="middle" fontSize="10" fill="#475569">公众透明度</text>
    </svg>
  );
}
