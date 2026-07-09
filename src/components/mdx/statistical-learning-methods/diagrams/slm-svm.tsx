"use client";

export function SlmSvmDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="支持向量机三种模型与SMO算法">
      <defs>
        <linearGradient id="slm-svm-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="slm-svm-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="slm-svm-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="slm-svm-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="slm-svm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">支持向量机 · 三种模型与SMO</text>

      {/* 左侧：三种 SVM 模型 */}
      <text x="200" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">SVM 三种模型</text>

      <rect x="40" y="84" width="320" height="64" rx="10" fill="url(#slm-svm-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="60" y="108" fontSize="13" fontWeight="600" fill="#1e40af">线性可分 SVM（硬间隔）</text>
      <text x="60" y="128" fontSize="11" fill="#475569">min 1/2||w||²  s.t. yi(w·xi+b) ≥ 1</text>
      <text x="60" y="142" fontSize="11" fill="#64748b">间隔最大化，严格要求所有点正确分类</text>

      <path d="M200 148 L200 156" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-svm-arrow)" />

      <rect x="40" y="158" width="320" height="64" rx="10" fill="url(#slm-svm-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="60" y="182" fontSize="13" fontWeight="600" fill="#5b21b6">线性 SVM（软间隔）</text>
      <text x="60" y="202" fontSize="11" fill="#475569">min 1/2||w||² + CΣξi</text>
      <text x="60" y="216" fontSize="11" fill="#64748b">引入松弛变量，允许部分违反间隔</text>

      <path d="M200 222 L200 230" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-svm-arrow)" />

      <rect x="40" y="232" width="320" height="64" rx="10" fill="url(#slm-svm-orange)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="256" fontSize="13" fontWeight="600" fill="#92400e">非线性 SVM（核技巧）</text>
      <text x="60" y="276" fontSize="11" fill="#475569">K(xi,xj) = φ(xi)·φ(xj)</text>
      <text x="60" y="290" fontSize="11" fill="#64748b">隐式映射到高维空间，处理非线性</text>

      {/* 右侧：SMO 算法 */}
      <text x="560" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">SMO 算法</text>

      <rect x="420" y="84" width="280" height="44" rx="8" fill="url(#slm-svm-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="560" y="111" textAnchor="middle" fontSize="12" fill="#065f46">1. 选两个变量 α1, α2</text>

      <path d="M560 128 L560 136" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-svm-arrow)" />

      <rect x="420" y="138" width="280" height="44" rx="8" fill="url(#slm-svm-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="560" y="165" textAnchor="middle" fontSize="12" fill="#065f46">2. 固定其他变量，解析求最优</text>

      <path d="M560 182 L560 190" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-svm-arrow)" />

      <rect x="420" y="192" width="280" height="44" rx="8" fill="url(#slm-svm-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="560" y="219" textAnchor="middle" fontSize="12" fill="#065f46">3. 更新 α1, α2 和 b</text>

      <path d="M560 236 L560 244" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-svm-arrow)" />

      <rect x="420" y="246" width="280" height="44" rx="8" fill="url(#slm-svm-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="560" y="273" textAnchor="middle" fontSize="12" fill="#065f46">4. 检查 KKT 条件，迭代至收敛</text>

      <path d="M560 290 L560 298" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-svm-arrow)" />

      <rect x="420" y="300" width="280" height="44" rx="8" fill="url(#slm-svm-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="560" y="327" textAnchor="middle" fontSize="12" fill="#065f46">快速求解对偶问题的启发式算法</text>

      {/* 底部：对偶问题 */}
      <rect x="40" y="362" width="720" height="56" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="386" textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">对偶问题</text>
      <text x="400" y="406" textAnchor="middle" fontSize="11" fill="#64748b">max Σαi - 1/2 ΣΣ αiαj yi yj K(xi,xj)  s.t. Σαi yi = 0, 0 ≤ αi ≤ C</text>

      {/* 底部：核函数 */}
      <rect x="40" y="434" width="720" height="80" rx="10" fill="url(#slm-svm-orange)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="458" textAnchor="middle" fontSize="13" fontWeight="600" fill="#92400e">常用核函数</text>
      <text x="400" y="478" textAnchor="middle" fontSize="11" fill="#64748b">线性核 K=x·z  /  多项式核 K=(x·z+1)^d  /  高斯核 K=exp(-||x-z||²/2σ²)</text>
      <text x="400" y="496" textAnchor="middle" fontSize="11" fill="#64748b">Mercer 定理：核矩阵半正定即为有效核</text>
    </svg>
  );
}
