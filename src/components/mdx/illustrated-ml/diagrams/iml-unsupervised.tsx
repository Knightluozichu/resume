"use client";

export function ImlUnsupervisedDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="无监督学习：聚类与降维">
      <defs>
        <linearGradient id="iml-us-cluster1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iml-us-cluster2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="iml-us-cluster3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="iml-us-arr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">无监督学习：聚类与降维</text>

      {/* 左侧：K-Means 聚类 */}
      <text x="200" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">K-Means 聚类（K=3）</text>

      {/* 坐标轴 */}
      <line x1="60" y1="290" x2="340" y2="290" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="60" y1="80" x2="60" y2="290" stroke="#94a3b8" strokeWidth="1.5" />

      {/* 簇1（蓝） */}
      {[[120, 120], [135, 130], [110, 140], [145, 115], [125, 155]].map(([cx, cy], i) => (
        <circle key={`c1-${i}`} cx={cx} cy={cy} r="4.5" fill="url(#iml-us-cluster1)" opacity="0.8" />
      ))}
      <circle cx="127" cy="132" r="6" fill="#fff" stroke="url(#iml-us-cluster1)" strokeWidth="2.5" />
      <text x="100" y="110" fontSize="10" fill="#2563eb">簇1</text>

      {/* 簇2（橙） */}
      {[[250, 180], [265, 170], [240, 195], [270, 185], [255, 160]].map(([cx, cy], i) => (
        <circle key={`c2-${i}`} cx={cx} cy={cy} r="4.5" fill="url(#iml-us-cluster2)" opacity="0.8" />
      ))}
      <circle cx="256" cy="178" r="6" fill="#fff" stroke="url(#iml-us-cluster2)" strokeWidth="2.5" />
      <text x="280" y="165" fontSize="10" fill="#f59e0b">簇2</text>

      {/* 簇3（绿） */}
      {[[180, 240], [195, 250], [170, 260], [200, 235], [185, 220]].map(([cx, cy], i) => (
        <circle key={`c3-${i}`} cx={cx} cy={cy} r="4.5" fill="url(#iml-us-cluster3)" opacity="0.8" />
      ))}
      <circle cx="186" cy="241" r="6" fill="#fff" stroke="url(#iml-us-cluster3)" strokeWidth="2.5" />
      <text x="210" y="265" fontSize="10" fill="#059669">簇3</text>

      {/* 空心大圈 = 簇中心 */}
      <text x="200" y="308" textAnchor="middle" fontSize="10" fill="#64748b">空心圈 = 簇中心 · K-Means 迭代更新</text>

      {/* K-Means 流程 */}
      <rect x="40" y="324" width="320" height="90" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="200" y="346" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">K-Means 迭代流程</text>
      <text x="60" y="366" fontSize="10" fill="#475569">1. 随机选 K 个簇中心</text>
      <text x="60" y="382" fontSize="10" fill="#475569">2. 每个样本分配到最近簇中心</text>
      <text x="60" y="398" fontSize="10" fill="#475569">3. 更新簇中心为簇内均值</text>
      <text x="60" y="414" fontSize="10" fill="#475569">4. 重复 2-3 直到收敛</text>

      {/* 右侧：PCA 降维 */}
      <text x="580" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">PCA 降维（3D → 2D）</text>

      {/* 3D 数据示意 */}
      <rect x="430" y="82" width="150" height="120" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="505" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">原始高维（3D）</text>

      {/* 散点 */}
      {[[460, 120], [480, 130], [470, 145], [500, 125], [510, 140], [490, 155], [475, 165], [515, 160], [500, 175], [465, 135]].map(([cx, cy], i) => (
        <circle key={`3d-${i}`} cx={cx} cy={cy} r="3" fill="#7c3aed" opacity="0.7" />
      ))}

      {/* 降维箭头 */}
      <path d="M590 140 L630 140" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#iml-us-arr)" />
      <text x="610" y="132" textAnchor="middle" fontSize="9" fill="#7c3aed">PCA</text>

      {/* 2D 投影 */}
      <rect x="640" y="82" width="140" height="120" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="710" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">降维后（2D）</text>
      {/* 主成分方向 */}
      <line x1="655" y1="180" x2="765" y2="110" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x="745" y="108" fontSize="9" fill="#ef4444">PC1</text>
      <line x1="655" y1="110" x2="765" y2="180" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x="660" y="108" fontSize="9" fill="#3b82f6">PC2</text>

      {/* 投影后散点 */}
      {[[680, 125], [700, 135], [690, 145], [720, 130], [730, 150], [710, 155], [695, 160], [735, 165], [720, 170], [685, 140]].map(([cx, cy], i) => (
        <circle key={`2d-${i}`} cx={cx} cy={cy} r="3" fill="#7c3aed" opacity="0.7" />
      ))}

      {/* PCA 流程 */}
      <rect x="430" y="214" width="340" height="30" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="600" y="234" textAnchor="middle" fontSize="11" fill="#475569">保留最大方差方向 · 方差解释比选维度</text>

      {/* 底部：算法对比 */}
      <text x="400" y="362" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">聚类算法对比</text>

      <rect x="40" y="376" width="230" height="145" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="155" y="398" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">K-Means</text>
      <text x="155" y="418" textAnchor="middle" fontSize="10" fill="#475569">简单高效</text>
      <text x="155" y="436" textAnchor="middle" fontSize="10" fill="#475569">需指定 K 值</text>
      <text x="155" y="454" textAnchor="middle" fontSize="10" fill="#475569">适合球形簇</text>
      <text x="155" y="472" textAnchor="middle" fontSize="10" fill="#475569">对初始中心敏感</text>
      <text x="155" y="494" textAnchor="middle" fontSize="10" fill="#475569">K 值选择：肘部法则</text>
      <text x="155" y="512" textAnchor="middle" fontSize="10" fill="#475569">轮廓系数</text>

      <rect x="285" y="376" width="230" height="145" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="398" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">层次聚类</text>
      <text x="400" y="418" textAnchor="middle" fontSize="10" fill="#475569">无需指定 K</text>
      <text x="400" y="436" textAnchor="middle" fontSize="10" fill="#475569">构建聚类树</text>
      <text x="400" y="454" textAnchor="middle" fontSize="10" fill="#475569">展示层次结构</text>
      <text x="400" y="472" textAnchor="middle" fontSize="10" fill="#475569">计算开销较大</text>
      <text x="400" y="494" textAnchor="middle" fontSize="10" fill="#475569">距离度量：</text>
      <text x="400" y="512" textAnchor="middle" fontSize="10" fill="#475569">单链接/全链接/Ward</text>

      <rect x="530" y="376" width="230" height="145" rx="8" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
      <text x="645" y="398" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">DBSCAN</text>
      <text x="645" y="418" textAnchor="middle" fontSize="10" fill="#475569">基于密度</text>
      <text x="645" y="436" textAnchor="middle" fontSize="10" fill="#475569">任意形状簇</text>
      <text x="645" y="454" textAnchor="middle" fontSize="10" fill="#475569">自动确定簇数</text>
      <text x="645" y="472" textAnchor="middle" fontSize="10" fill="#475569">可识别噪声点</text>
      <text x="645" y="494" textAnchor="middle" fontSize="10" fill="#475569">参数：eps</text>
      <text x="645" y="512" textAnchor="middle" fontSize="10" fill="#475569">min_samples</text>
    </svg>
  );
}
