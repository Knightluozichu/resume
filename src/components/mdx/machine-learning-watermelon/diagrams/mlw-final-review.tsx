"use client";

export function MlwFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="西瓜书全书复习知识整合图">
      <defs>
        <linearGradient id="mlw-fr-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mlw-fr-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mlw-fr-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mlw-fr-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="mlw-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">机器学习 · 全书知识整合</text>

      {/* 中心：核心思想 */}
      <circle cx="400" cy="120" r="50" fill="url(#mlw-fr-blue)" opacity="0.95" />
      <text x="400" y="115" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">ML 核心</text>
      <text x="400" y="132" textAnchor="middle" fontSize="10" fill="#bfdbfe">从数据学模型</text>

      {/* 四大板块 */}
      <rect x="60" y="200" width="160" height="60" rx="10" fill="url(#mlw-fr-amber)" opacity="0.95" />
      <text x="140" y="226" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">基础概念</text>
      <text x="140" y="246" textAnchor="middle" fontSize="10" fill="#fef3c7">假设空间 / 归纳偏好</text>

      <rect x="250" y="200" width="160" height="60" rx="10" fill="url(#mlw-fr-purple)" opacity="0.95" />
      <text x="330" y="226" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">监督学习</text>
      <text x="330" y="246" textAnchor="middle" fontSize="10" fill="#e9d5ff">线性 / 树 / NN / SVM / 贝叶斯</text>

      <rect x="440" y="200" width="160" height="60" rx="10" fill="url(#mlw-fr-green)" opacity="0.95" />
      <text x="520" y="226" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">进阶技术</text>
      <text x="520" y="246" textAnchor="middle" fontSize="10" fill="#cffafe">集成学习 / 聚类 / 降维</text>

      <rect x="630" y="200" width="110" height="60" rx="10" fill="url(#mlw-fr-blue)" opacity="0.95" />
      <text x="685" y="226" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">评估</text>
      <text x="685" y="246" textAnchor="middle" fontSize="10" fill="#bfdbfe">泛化 / 调参</text>

      {/* 连接线 */}
      <line x1="400" y1="170" x2="140" y2="200" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mlw-fr-arrow)" />
      <line x1="400" y1="170" x2="330" y2="200" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mlw-fr-arrow)" />
      <line x1="400" y1="170" x2="520" y2="200" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mlw-fr-arrow)" />
      <line x1="400" y1="170" x2="685" y2="200" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mlw-fr-arrow)" />

      {/* 底部：算法对比矩阵 */}
      <text x="400" y="294" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">五大监督学习算法对比</text>

      <rect x="40" y="306" width="130" height="28" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="105" y="325" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">算法</text>
      <rect x="170" y="306" width="130" height="28" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="235" y="325" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">核心思想</text>
      <rect x="300" y="306" width="130" height="28" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="365" y="325" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">优势</text>
      <rect x="430" y="306" width="130" height="28" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="495" y="325" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">劣势</text>
      <rect x="560" y="306" width="180" height="28" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="650" y="325" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">适用场景</text>

      <rect x="40" y="334" width="130" height="28" rx="4" fill="url(#mlw-fr-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1" />
      <text x="105" y="353" textAnchor="middle" fontSize="10" fill="#92400e">线性模型</text>
      <rect x="170" y="334" width="130" height="28" rx="4" fill="url(#mlw-fr-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1" />
      <text x="235" y="353" textAnchor="middle" fontSize="9" fill="#92400e">线性组合 + 激活</text>
      <rect x="300" y="334" width="130" height="28" rx="4" fill="url(#mlw-fr-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1" />
      <text x="365" y="353" textAnchor="middle" fontSize="9" fill="#92400e">简单可解释</text>
      <rect x="430" y="334" width="130" height="28" rx="4" fill="url(#mlw-fr-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1" />
      <text x="495" y="353" textAnchor="middle" fontSize="9" fill="#92400e">仅线性关系</text>
      <rect x="560" y="334" width="180" height="28" rx="4" fill="url(#mlw-fr-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1" />
      <text x="650" y="353" textAnchor="middle" fontSize="9" fill="#92400e">基线模型 / 特征工程</text>

      <rect x="40" y="362" width="130" height="28" rx="4" fill="url(#mlw-fr-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1" />
      <text x="105" y="381" textAnchor="middle" fontSize="10" fill="#5b21b6">决策树</text>
      <rect x="170" y="362" width="130" height="28" rx="4" fill="url(#mlw-fr-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1" />
      <text x="235" y="381" textAnchor="middle" fontSize="9" fill="#5b21b6">递归划分属性</text>
      <rect x="300" y="362" width="130" height="28" rx="4" fill="url(#mlw-fr-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1" />
      <text x="365" y="381" textAnchor="middle" fontSize="9" fill="#5b21b6">可解释 / 处理混合</text>
      <rect x="430" y="362" width="130" height="28" rx="4" fill="url(#mlw-fr-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1" />
      <text x="495" y="381" textAnchor="middle" fontSize="9" fill="#5b21b6">易过拟合</text>
      <rect x="560" y="362" width="180" height="28" rx="4" fill="url(#mlw-fr-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1" />
      <text x="650" y="381" textAnchor="middle" fontSize="9" fill="#5b21b6">规则提取 / 医疗诊断</text>

      <rect x="40" y="390" width="130" height="28" rx="4" fill="url(#mlw-fr-green)" opacity="0.08" stroke="#059669" strokeWidth="1" />
      <text x="105" y="409" textAnchor="middle" fontSize="10" fill="#065f46">神经网络</text>
      <rect x="170" y="390" width="130" height="28" rx="4" fill="url(#mlw-fr-green)" opacity="0.08" stroke="#059669" strokeWidth="1" />
      <text x="235" y="409" textAnchor="middle" fontSize="9" fill="#065f46">BP 梯度下降</text>
      <rect x="300" y="390" width="130" height="28" rx="4" fill="url(#mlw-fr-green)" opacity="0.08" stroke="#059669" strokeWidth="1" />
      <text x="365" y="409" textAnchor="middle" fontSize="9" fill="#065f46">万能逼近</text>
      <rect x="430" y="390" width="130" height="28" rx="4" fill="url(#mlw-fr-green)" opacity="0.08" stroke="#059669" strokeWidth="1" />
      <text x="495" y="409" textAnchor="middle" fontSize="9" fill="#065f46">黑箱 / 训练难</text>
      <rect x="560" y="390" width="180" height="28" rx="4" fill="url(#mlw-fr-green)" opacity="0.08" stroke="#059669" strokeWidth="1" />
      <text x="650" y="409" textAnchor="middle" fontSize="9" fill="#065f46">图像 / 语音 / NLP</text>

      <rect x="40" y="418" width="130" height="28" rx="4" fill="url(#mlw-fr-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1" />
      <text x="105" y="437" textAnchor="middle" fontSize="10" fill="#1e40af">SVM</text>
      <rect x="170" y="418" width="130" height="28" rx="4" fill="url(#mlw-fr-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1" />
      <text x="235" y="437" textAnchor="middle" fontSize="9" fill="#1e40af">最大间隔 + 核</text>
      <rect x="300" y="418" width="130" height="28" rx="4" fill="url(#mlw-fr-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1" />
      <text x="365" y="437" textAnchor="middle" fontSize="9" fill="#1e40af">小样本 / 全局最优</text>
      <rect x="430" y="418" width="130" height="28" rx="4" fill="url(#mlw-fr-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1" />
      <text x="495" y="437" textAnchor="middle" fontSize="9" fill="#1e40af">核选择敏感</text>
      <rect x="560" y="418" width="180" height="28" rx="4" fill="url(#mlw-fr-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1" />
      <text x="650" y="437" textAnchor="middle" fontSize="9" fill="#1e40af">文本分类 / 生物信息</text>

      <rect x="40" y="446" width="130" height="28" rx="4" fill="url(#mlw-fr-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1" />
      <text x="105" y="465" textAnchor="middle" fontSize="10" fill="#92400e">贝叶斯</text>
      <rect x="170" y="446" width="130" height="28" rx="4" fill="url(#mlw-fr-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1" />
      <text x="235" y="465" textAnchor="middle" fontSize="9" fill="#92400e">后验概率最大</text>
      <rect x="300" y="446" width="130" height="28" rx="4" fill="url(#mlw-fr-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1" />
      <text x="365" y="465" textAnchor="middle" fontSize="9" fill="#92400e">概率输出 / 抗噪</text>
      <rect x="430" y="446" width="130" height="28" rx="4" fill="url(#mlw-fr-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1" />
      <text x="495" y="465" textAnchor="middle" fontSize="9" fill="#92400e">独立性假设强</text>
      <rect x="560" y="446" width="180" height="28" rx="4" fill="url(#mlw-fr-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1" />
      <text x="650" y="465" textAnchor="middle" fontSize="9" fill="#92400e">垃圾邮件 / 文本分类</text>

      {/* 底部：学习路径总结 */}
      <rect x="40" y="494" width="720" height="80" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
      <text x="400" y="517" textAnchor="middle" fontSize="13" fontWeight="700" fill="#166534">学习路径总结</text>
      <text x="400" y="539" textAnchor="middle" fontSize="11" fill="#15803d">基础概念（假设空间/归纳偏好）→ 监督学习（线性/树/NN/SVM/贝叶斯）→ 进阶（集成/聚类/降维）</text>
      <text x="400" y="557" textAnchor="middle" fontSize="11" fill="#15803d">核心主线：从「数据中学习」出发，理解不同算法如何从假设空间中搜索最优模型</text>
    </svg>
  );
}
