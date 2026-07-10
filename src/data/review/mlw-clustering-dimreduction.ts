import { ReviewQuestion } from "./types";

export const mlwClusteringDimreductionQuestions: ReviewQuestion[] = [
  {
    id: "mlw-clustering-dimreduction-1",
    chapter: "mlw-clustering-dimreduction",
    level: 1,
    question: `什么是聚类？K-Means 算法的核心流程是什么？`,
    answer:
      `聚类是无监督学习方法，目标是将样本集 D 划分为若干个不相交的簇 {C1,C2,...,Ck}，使同一簇内的样本尽可能相似、不同簇的样本尽可能不同，且不依赖标签信息。K-Means 算法是最经典的原型聚类算法，核心流程：①选择簇数 k，随机选择 k 个样本作为初始均值向量 {μ1,μ2,...,μk}；②分配步骤——对每个样本 xi，计算它到各均值向量的距离，将其分配到最近的簇 Ci = argmin ||xi-μj||；③更新步骤——重新计算每个簇的均值向量 μj = (1/|Cj|) Σ xi（簇内所有样本的均值）；④重复②-③直到均值向量不再变化或变化小于阈值。K-Means 的优化目标是最小化平方误差 E = Σ Σ ||xi-μj||²，这是一个 NP-hard 问题，K-Means 通过迭代保证收敛到局部最优但不保证全局最优。K-Means 的问题：需预设 k、对初始值敏感（可能用 K-Means++ 改进）、只适合凸形簇、对噪声和异常值敏感。`,
    tags: ["聚类", "K-Means", "原型聚类", "无监督学习"],
  },
  {
    id: "mlw-clustering-dimreduction-2",
    chapter: "mlw-clustering-dimreduction",
    level: 2,
    question: `层次聚类（AGNES）和密度聚类（DBSCAN）的核心思想分别是什么？`,
    answer:
      `层次聚类（AGNES，自底向上聚合）：①初始时每个样本自成一簇；②计算所有簇之间的距离，合并距离最小的两个簇；③重复②直到达到预设簇数或所有样本合并为一簇。簇间距离的度量方式决定了合并策略：单链接（最小距离——两簇最近样本的距离）、全链接（最大距离——两簇最远样本的距离）、均链接（平均距离——两簇所有样本对的平均距离）。单链接易产生链式效应，全链接对噪声敏感，均链接较均衡。AGNES 的优点是无需预设簇数，可从树状图（dendrogram）观察不同粒度的聚类结构；缺点是计算复杂度高 O(n²logn)。密度聚类（DBSCAN，Density-Based Spatial Clustering）：核心思想是「密度可达」——通过核心点（ε 邻域内样本数 ≥ MinPts）、边界点和噪声点定义簇。①从任一未访问样本出发，若其是核心点则创建新簇，递归地将所有密度可达的核心点加入簇；②非核心点标记为边界点或噪声。优点：无需预设簇数、能发现任意形状的簇、自动识别噪声点；缺点：对参数 ε 和 MinPts 敏感、密度不均匀时效果差。`,
    tags: ["层次聚类", "AGNES", "密度聚类", "DBSCAN", "密度可达"],
  },
  {
    id: "mlw-clustering-dimreduction-3",
    chapter: "mlw-clustering-dimreduction",
    level: 3,
    question: `什么是主成分分析（PCA）？请说明其数学推导过程和步骤。`,
    answer:
      `PCA（Principal Component Analysis）是一种线性降维方法，核心思想是通过线性变换将高维数据投影到低维空间，使投影后数据的方差最大化（或重构误差最小化）。数学推导：①数据中心化——对每个属性减去均值，使数据以原点为中心。②最大化投影方差——设投影方向为 w（||w||=1），投影后方差为 w^T Σ w（Σ 为协方差矩阵）。最大化方差 max w^T Σ w s.t. ||w||²=1，用拉格朗日乘子法得 Σw = λw，即 w 是 Σ 的特征向量，λ 是特征值。取前 d' 个最大特征值对应的特征向量组成投影矩阵 W。③等价视角：最小化重构误差——投影后重构误差为 Σ xi - WW^T xi 的平方和，最小化重构误差也导出同样的特征值分解。PCA 步骤：①中心化数据；②计算协方差矩阵 Σ = (1/n) X^T X；③对 Σ 做特征值分解；④取前 d' 个最大特征值对应的特征向量；⑤投影 Z = XW 得到降维后的数据。PCA 的优点：无参数、计算高效、去除特征间相关性。缺点：只捕获线性关系（非线性需 KPCA）、方差小不代表无用、主成分可能缺乏可解释性。`,
    tags: ["PCA", "主成分分析", "协方差矩阵", "特征值分解", "降维"],
  },
  {
    id: "mlw-clustering-dimreduction-4",
    chapter: "mlw-clustering-dimreduction",
    level: 3,
    question: `什么是流形学习？Isomap 和 LLE 的核心思想分别是什么？与 PCA 有何区别？`,
    answer:
      `流形学习是一类非线性降维方法，核心假设是高维数据实际上采样自一个低维流形（manifold），目标是在保持流形结构的前提下将数据映射到低维空间。PCA 只能处理线性结构，流形学习处理非线性结构。Isomap（等距映射）核心思想：用测地线距离（geodesic distance）替代欧氏距离保持全局几何。步骤：①用 k 近邻或 ε 邻域构建邻域图，近邻间的距离用欧氏距离；②用 Dijkstra/Floyd 算法计算图中任意两节点间的最短路径（近似测地线距离）；③用 MDS（多维缩放）将测地线距离矩阵映射到低维空间，保持距离关系。Isomap 适合展开弯曲的流形（如 Swiss Roll），但计算最短路径开销大。LLE（局部线性嵌入）核心思想：保持局部邻域的线性关系。步骤：①找每个样本的 k 近邻；②用近邻线性重构该样本 xi ≈ Σ wij xj，求最优重构权重 wij（最小化重构误差）；③在低维空间中保持权重 wij 不变，求低维坐标 yi 使 yi ≈ Σ wij yj。LLE 只需优化稀疏矩阵，计算效率高于 Isomap，但保持局部而非全局结构。流形学习的共同特点：能发现数据的非线性结构，但大多只提供训练数据的降维映射，对新样本需重新计算（out-of-sample 问题）。`,
    tags: ["流形学习", "Isomap", "LLE", "非线性降维", "测地线距离"],
  },
];
