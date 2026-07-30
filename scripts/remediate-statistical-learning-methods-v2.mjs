import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "statistical-learning-methods";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/statistical-learning-methods/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/statistical-learning-methods-v2-profiles.json",
);

const SOURCES = {
  publisher: "https://www.tup.tsinghua.edu.cn/booksCenter/book_08132901.html",
  publisherEnglish: "https://www.tup.tsinghua.edu.cn/en/book_08132901.html",
  userGuide: "https://scikit-learn.org/stable/user_guide.html",
  modelSelection: "https://scikit-learn.org/stable/model_selection.html",
  metrics: "https://scikit-learn.org/stable/modules/model_evaluation.html",
  perceptron: "https://doi.org/10.1037/h0042519",
  knn: "https://doi.org/10.1109/TIT.1967.1053964",
  bayes: "https://scikit-learn.org/stable/modules/naive_bayes.html",
  tree: "https://scikit-learn.org/stable/modules/tree.html",
  linear: "https://scikit-learn.org/stable/modules/linear_model.html",
  svm: "https://doi.org/10.1007/BF00994018",
  boosting: "https://doi.org/10.1006/jcss.1997.1504",
  em: "https://doi.org/10.1111/j.2517-6161.1977.tb01600.x",
  hmm: "https://doi.org/10.1109/5.18626",
  crf: "https://repository.upenn.edu/cis_papers/159/",
  clustering: "https://scikit-learn.org/stable/modules/clustering.html",
  numpySvd:
    "https://numpy.org/doc/stable/reference/generated/numpy.linalg.svd.html",
  decomposition: "https://scikit-learn.org/stable/modules/decomposition.html",
  plsa: "https://doi.org/10.1145/312624.312649",
  mcmc: "https://mc-stan.org/docs/reference-manual/mcmc.html",
  lda: "https://www.jmlr.org/papers/v3/blei03a.html",
  pagerank: "http://ilpubs.stanford.edu:8090/422/",
  numpyLinearAlgebra:
    "https://numpy.org/doc/stable/reference/routines.linalg.html",
  scipyOptimize: "https://docs.scipy.org/doc/scipy/tutorial/optimize.html",
  scipyStats: "https://docs.scipy.org/doc/scipy/tutorial/stats.html",
};

const PATHS = {
  learningMap: "00-guide/slm-official-learning-map",
  "slm-01": "01-supervised-foundations/slm-01-introduction",
  "slm-02": "01-supervised-foundations/slm-02-perceptron",
  "slm-03": "01-supervised-foundations/slm-03-knn",
  "slm-04": "01-supervised-foundations/slm-04-naive-bayes",
  "slm-05": "02-supervised-models/slm-05-decision-tree",
  "slm-06": "02-supervised-models/slm-06-logistic-maxent",
  "slm-07": "02-supervised-models/slm-07-svm",
  "slm-08": "02-supervised-models/slm-08-boosting",
  "slm-09": "03-supervised-latent-sequence/slm-09-em",
  "slm-10": "03-supervised-latent-sequence/slm-10-hmm",
  "slm-11": "03-supervised-latent-sequence/slm-11-crf",
  "slm-12": "03-supervised-latent-sequence/slm-12-supervised-summary",
  "slm-13": "04-unsupervised-foundations/slm-13-unsupervised-introduction",
  "slm-14": "04-unsupervised-foundations/slm-14-clustering",
  "slm-15": "04-unsupervised-foundations/slm-15-svd",
  "slm-16": "04-unsupervised-foundations/slm-16-pca",
  "slm-17": "05-latent-semantics/slm-17-lsa",
  "slm-18": "05-latent-semantics/slm-18-plsa",
  "slm-19": "06-sampling-topics/slm-19-mcmc",
  "slm-20": "06-sampling-topics/slm-20-lda",
  "slm-21": "07-graph-summary/slm-21-pagerank",
  "slm-22": "07-graph-summary/slm-22-unsupervised-summary",
  "slm-app": "08-appendices/slm-appendices",
  finalReview: "09-review/slm-official-final-review",
};

const SPECS = {
  learningMap: {
    title: "《统计学习方法（第2版）》285个原版目录层级学习地图",
    duty: "沿监督学习、无监督学习与五个数学附录恢复两篇22章256节/小节",
    question:
      "怎样把285个目录坐标组织成模型、策略、算法、数值计算和独立检验相互约束的方法谱系？",
    invariant:
      "两篇、22章、256个编号层级与附录A-E逐项覆盖，定义前提、目标函数、更新和验收可追溯",
    fault:
      "只保留算法结论或代码调用，省略推导前提、数值诊断、监督/无监督边界和五个附录",
    scenario:
      "建立一份统计学习方法实验册，让同一数据分别经过分类、序列、矩阵分解、采样与图排序。",
    stageNames: [
      "问题与变量",
      "模型与假设",
      "策略与目标",
      "算法与数值",
      "检验与归档",
    ],
    sources: [SOURCES.publisher, SOURCES.publisherEnglish, SOURCES.userGuide],
    artifact:
      "285层覆盖矩阵、变量与分布、模型族、目标函数、推导步骤、更新轨迹、数值残差、反例和复现包。",
    opening: "学习地图把书名中的“方法”还原为可推演、可计算、可拒绝的完整合同。",
    boundary:
      "原书第2版出版于2019年且明确未纳入深度学习与强化学习；后续内容只作时间化扩展。",
  },
  "slm-01": {
    duty: "覆盖统计学习分类、三要素、评估选择、正则、泛化与监督任务",
    question:
      "怎样先写清模型、策略和算法，再判断训练误差为何不能代替泛化能力？",
    invariant:
      "样本空间、模型集合、损失/风险、优化算法、数据角色和泛化声明同时明确",
    fault: "根据测试表现选择模型与正则强度，再把该测试误差称为独立估计",
    scenario: "为一个分类与回归并存的小数据任务分别写出三要素和评估协议。",
    stageNames: ["任务分类", "模型集合", "风险策略", "学习算法", "泛化评估"],
    sources: [SOURCES.publisher, SOURCES.modelSelection, SOURCES.metrics],
    artifact:
      "任务卡、样本与标签、模型族、损失、经验/结构风险、优化器、切分索引、误差与泛化边界。",
    opening: "概论页从三要素建立共同语言，防止算法名字替代问题定义。",
  },
  "slm-02": {
    duty: "覆盖感知机模型、误分类损失、原始/对偶算法与收敛性",
    question:
      "怎样沿一个误分类点重放参数更新，并说明线性可分条件在收敛证明中的作用？",
    invariant: "特征、标签编码、初值、误分类选择顺序、步长与可分性条件固定",
    fault: "数据不可分仍等待有限步收敛，或改变样本顺序后只展示一次幸运轨迹",
    scenario: "在二维可分与不可分样本上手算原始形式和对偶形式的每次更新。",
    stageNames: [
      "样本与超平面",
      "误分类判定",
      "原始更新",
      "对偶系数",
      "收敛复核",
    ],
    sources: [SOURCES.publisher, SOURCES.perceptron, SOURCES.linear],
    artifact:
      "样本顺序、Gram矩阵、参数初值、误分类索引、更新表、间隔、迭代上限与不可分反例。",
    opening: "感知机页把“找到分离面”拆成逐样本更新和可分性条件。",
  },
  "slm-03": {
    duty: "覆盖k近邻模型、三要素、kd树构造与搜索",
    question: "怎样让距离、k值、投票与kd树剪枝在同一查询点上给出可核对结果？",
    invariant: "尺度、距离度量、k、并列规则、训练索引和树构造顺序固定",
    fault: "在测试查询与标签上选择尺度和k，或错误剪枝漏掉更近邻居",
    scenario: "对一个二维查询点比较穷举近邻与kd树回溯，记录访问节点。",
    stageNames: ["尺度与距离", "邻域候选", "k值与投票", "kd树回溯", "预测复核"],
    sources: [SOURCES.publisher, SOURCES.knn, SOURCES.userGuide],
    artifact:
      "缩放统计、距离表、邻居ID、k与并列规则、kd树、回溯路径、剪枝界和预测。",
    opening: "k近邻页要求每个预测都能回到具体邻居与距离，而非黑盒投票。",
  },
  "slm-04": {
    duty: "覆盖朴素贝叶斯学习、分类、参数估计与贝叶斯估计",
    question: "怎样从类别先验与条件概率得到后验，并处理零频而不读取测试答案？",
    invariant: "变量域、条件独立、计数口径、先验、平滑与决策损失固定",
    fault: "出现零频后查看正确类别再决定是否平滑，或用测试类别频率更新先验",
    scenario: "对离散属性手算频率估计和拉普拉斯平滑，比较后验排序。",
    stageNames: ["变量与类别", "先验计数", "条件似然", "后验归一", "平滑诊断"],
    sources: [SOURCES.publisher, SOURCES.bayes, SOURCES.metrics],
    artifact:
      "变量域、类别计数、条件频数、平滑常数、对数后验、归一化、决策与零频反例。",
    opening: "朴素贝叶斯页让每个概率回到计数和假设，分数可归一不等于概率可信。",
  },
  "slm-05": {
    duty: "覆盖特征选择、树生成、剪枝、CART与分类回归树",
    question: "怎样逐节点核对信息增益或基尼下降，并用独立角色决定剪枝？",
    invariant: "候选特征、离散化、划分准则、停止条件、剪枝集与代价参数固定",
    fault: "在测试集上挑选特征阈值或剪枝子树，使最终风险失去独立性",
    scenario: "对同一训练集构建ID3、C4.5与CART候选，并保存剪枝序列。",
    stageNames: ["节点样本", "划分统计", "子树生成", "剪枝序列", "路径验收"],
    sources: [SOURCES.publisher, SOURCES.tree, SOURCES.metrics],
    artifact:
      "节点ID、候选划分、熵/基尼、阈值、子树、训练与验证风险、剪枝参数和决策路径。",
    opening: "决策树页保存每次分裂和剪枝的局部证据，不只保存终树。",
  },
  "slm-06": {
    duty: "覆盖逻辑斯谛回归、最大熵、改进迭代尺度与拟牛顿估计",
    question: "怎样从条件指数族连接最大似然、最大熵约束和可复核的参数更新？",
    invariant: "特征函数、标签域、参考分布、目标函数、正则、初值与收敛容差固定",
    fault: "数值溢出或目标未收敛仍输出概率，并把分数归一当成校准",
    scenario: "在同一离散任务上推导逻辑回归与最大熵模型并比较梯度。",
    stageNames: [
      "特征函数",
      "指数族模型",
      "对数似然",
      "尺度或拟牛顿",
      "概率诊断",
    ],
    sources: [SOURCES.publisher, SOURCES.linear, SOURCES.scipyOptimize],
    artifact:
      "特征函数表、经验/模型期望、目标与梯度、步长、海塞近似、迭代轨迹、概率和与校准。",
    opening: "逻辑回归与最大熵页用同一指数族坐标连接约束与似然。",
  },
  "slm-07": {
    duty: "覆盖线性可分、线性、非线性SVM、序列最小最优化与核函数",
    question: "怎样从最大间隔原问题到对偶与核，并用KKT残差验收SMO更新？",
    invariant: "尺度、核、C、训练样本、变量约束、工作集规则和停止容差固定",
    fault: "核参数在测试数据上调优，或SMO停止时仍有显著KKT违约",
    scenario: "对线性与非线性样本比较原问题、对偶和RBF核的支持向量。",
    stageNames: [
      "间隔原问题",
      "拉格朗日对偶",
      "核矩阵",
      "SMO工作集",
      "KKT验收",
    ],
    sources: [SOURCES.publisher, SOURCES.svm, SOURCES.scipyOptimize],
    artifact:
      "尺度、Gram矩阵、C与核参数、乘子、工作集、阈值、目标轨迹、KKT残差和支持向量。",
    opening: "SVM页把分类边界还原为约束、对偶变量和数值最优性条件。",
  },
  "slm-08": {
    duty: "覆盖提升思路、AdaBoost、前向分步与提升树",
    question: "怎样追踪样本权重与加法模型更新，并区分训练误差下降和泛化改善？",
    invariant: "弱学习器、样本初权、损失、轮数、学习率、种子与验证角色固定",
    fault: "依据测试误差决定提升轮数，或权重归一错误却只展示最终强分类器",
    scenario: "用决策桩手算三轮AdaBoost，再以平方/指数损失解释提升树。",
    stageNames: [
      "样本初权",
      "弱学习器",
      "误差与系数",
      "权重更新",
      "加法模型验收",
    ],
    sources: [SOURCES.publisher, SOURCES.boosting, SOURCES.metrics],
    artifact:
      "样本权重表、弱规则、加权误差、系数、归一常数、逐轮预测、训练/验证曲线和错分样本。",
    opening: "提升页让每一轮关注了哪些样本透明可见，最终投票不是全部证据。",
  },
  "slm-09": {
    duty: "覆盖EM引入、算法、收敛性、推广与高斯混合",
    question: "怎样从完全数据似然构造Q函数，并验证E/M两步与下界单调性？",
    invariant: "观测/隐变量、模型族、初始化、E步后验、M步优化和停止规则固定",
    fault: "只运行一次初始化或Q函数计算错误，似然下降仍宣称EM收敛",
    scenario: "对两分量高斯混合手算责任度、参数更新和对数似然。",
    stageNames: [
      "观测与隐变量",
      "完全似然",
      "E步责任度",
      "M步更新",
      "下界诊断",
    ],
    sources: [SOURCES.publisher, SOURCES.em, SOURCES.scipyStats],
    artifact:
      "模型与初值、责任度矩阵、Q函数、参数更新、对数似然、下界差、收敛阈值和多初值对照。",
    opening: "EM页把隐变量补全、期望和优化分开，收敛必须由目标轨迹证明。",
  },
  "slm-10": {
    duty: "覆盖HMM基本概念、概率计算、学习、预测与实现",
    question: "怎样让前向后向、Baum-Welch与Viterbi共享同一状态和概率约定？",
    invariant: "状态/观测域、初始分布、转移、发射、序列方向与缩放规则固定",
    fault: "概率未归一或下溢被当作零概率，导致解码路径与似然不可复核",
    scenario: "对一条短观测序列分别执行前向、后向、训练与Viterbi解码。",
    stageNames: [
      "状态与观测",
      "前向后向",
      "期望计数",
      "参数更新",
      "Viterbi解码",
    ],
    sources: [SOURCES.publisher, SOURCES.hmm, SOURCES.scipyStats],
    artifact:
      "状态表、初始/转移/发射矩阵、缩放因子、alpha/beta、期望计数、参数版本、delta/psi与路径。",
    opening:
      "HMM页用同一索引约定贯通三个基本问题，避免公式各自正确却无法组合。",
  },
  "slm-11": {
    duty: "覆盖概率无向图、条件随机场、概率计算、学习与预测",
    question: "怎样从特征函数与全局归一化得到条件概率，并复核梯度和解码？",
    invariant: "图结构、标签序列、特征函数、参数、配分函数、正则与边界状态固定",
    fault: "局部归一替代全局配分函数，或训练解码使用不同特征索引",
    scenario: "对短标注序列计算势函数、前向后向、梯度与Viterbi路径。",
    stageNames: ["序列与图", "特征与势", "配分函数", "参数学习", "序列解码"],
    sources: [SOURCES.publisher, SOURCES.crf, SOURCES.scipyOptimize],
    artifact:
      "标签域、特征ID、势矩阵、前向后向量、配分函数、经验/模型期望、梯度、参数和解码回溯。",
    opening: "CRF页把特征、全局归一与序列解码连接在一张可检查图上。",
  },
  "slm-12": {
    duty: "比较监督学习模型的生成/判别、概率/非概率、线性/非线性与学习策略",
    question:
      "怎样用统一坐标比较前11章，而不把模型表示、学习策略和求解算法混为一谈？",
    invariant: "任务、模型族、策略、算法、数据假设、输出语义与比较维度一致",
    fault: "用不同数据切分或指标比较方法，再从单次最高分推断普遍优劣",
    scenario:
      "为前11章建立方法卡，在同一任务上选择可解释的候选而非算法排行榜。",
    stageNames: ["任务坐标", "模型维度", "策略维度", "算法维度", "证据比较"],
    sources: [SOURCES.publisher, SOURCES.userGuide, SOURCES.modelSelection],
    artifact:
      "方法矩阵、假设、模型输出、损失/风险、优化或推断、计算代价、适用任务、失败边界和选择记录。",
    opening: "监督总结页用三要素比较方法，避免把表示差异误说成优化差异。",
  },
  "slm-13": {
    duty: "界定无监督学习问题、基本原理与主要方法",
    question:
      "没有标签时，怎样声明结构目标、假设与验收证据，避免以主观图形代替评估？",
    invariant: "样本来源、表示、结构假设、目标函数、稳定性与外部信息使用明确",
    fault: "反复查看真实类别选择无监督模型，却仍宣称结构完全由数据自行发现",
    scenario: "对同一文档矩阵提出聚类、降维、话题和图排序四类无监督问题。",
    stageNames: [
      "样本与表示",
      "结构假设",
      "目标函数",
      "估计或分解",
      "稳定性验收",
    ],
    sources: [SOURCES.publisher, SOURCES.clustering, SOURCES.decomposition],
    artifact:
      "数据卡、表示矩阵、结构假设、目标、算法状态、稳定性、外部标签使用记录和反例。",
    opening: "无监督概论页先声明要发现的结构，算法不会自动定义“有意义”。",
  },
  "slm-14": {
    duty: "覆盖聚类基本概念、层次聚类与k均值",
    question: "怎样从距离与类/簇定义重放合并或质心更新，并量化初始化敏感性？",
    invariant: "尺度、距离、链接准则、k、初始化、停止条件和稳定性方案固定",
    fault: "用外部标签挑选距离和k，或只保留一次幸运初始化的最低目标",
    scenario: "对小型二维数据手算层次合并与k均值迭代，比较离群点扰动。",
    stageNames: [
      "表示与距离",
      "簇定义",
      "合并或指派",
      "中心更新",
      "稳定性复核",
    ],
    sources: [SOURCES.publisher, SOURCES.clustering, SOURCES.metrics],
    artifact:
      "尺度、距离矩阵、树状合并、初始化质心、成员指派、目标轨迹、多种子结果和离群反例。",
    opening: "聚类页让每次合并和指派都能回到距离定义，不把颜色分组当证明。",
  },
  "slm-15": {
    duty: "覆盖矩阵、正交分解、截断SVD与紧凑SVD",
    question: "怎样从矩阵形状和正交性得到奇异值分解，并用重构残差验收截断？",
    invariant: "矩阵方向、维度、秩、奇异值次序、符号约定、截断阶数与容差固定",
    fault: "转置方向或广播错误仍产生可乘矩阵，重构对象却已改变",
    scenario: "对一个小矩阵手算SVD结构，再比较不同截断阶数的重构误差。",
    stageNames: [
      "矩阵与形状",
      "正交子空间",
      "奇异值排序",
      "截断重构",
      "残差验收",
    ],
    sources: [SOURCES.publisher, SOURCES.numpySvd, SOURCES.numpyLinearAlgebra],
    artifact:
      "矩阵形状、秩、U/S/Vh、正交残差、奇异值谱、截断阶数、重构矩阵与Frobenius误差。",
    opening: "SVD页先锁定矩阵方向和形状，API返回成功不证明分解对象正确。",
  },
  "slm-16": {
    duty: "覆盖总体/样本主成分、性质、个数选择与算法",
    question: "怎样从中心化协方差得到主方向，并同时解释方差保留和信息丢失？",
    invariant:
      "样本方向、中心化/尺度统计、协方差分母、拟合索引、分量数和符号固定",
    fault: "在全量含测试样本的数据上拟合中心与主方向，导致下游评估泄漏",
    scenario: "对二维相关数据手算PCA，比较中心化前后与一维重构。",
    stageNames: [
      "中心化样本",
      "协方差矩阵",
      "特征分解",
      "分量选择",
      "投影重构",
    ],
    sources: [
      SOURCES.publisher,
      SOURCES.decomposition,
      SOURCES.numpyLinearAlgebra,
    ],
    artifact:
      "拟合索引、均值/尺度、协方差、特征值/向量、解释方差、投影、逆变换与重构残差。",
    opening: "PCA页同时保存保留方差与丢失方向，不把二维可视化当唯一结论。",
  },
  "slm-17": {
    duty: "覆盖单词向量空间、话题向量空间、矩阵分解算法与非负矩阵分解",
    question: "怎样从词项—文档矩阵构造潜在语义空间，并核对检索相似与重构误差？",
    invariant: "分词词表、权重、矩阵方向、分解阶数、相似度和评估查询固定",
    fault: "在测试查询与相关性答案上选择分解阶数或词权重",
    scenario: "构造小型词项—文档矩阵，用截断SVD与NMF比较潜在语义。",
    stageNames: [
      "语料与词表",
      "词项文档矩阵",
      "低秩分解",
      "语义坐标",
      "检索复核",
    ],
    sources: [SOURCES.publisher, SOURCES.decomposition, SOURCES.numpySvd],
    artifact:
      "语料版本、词表、权重、矩阵、分解阶数、文档/词向量、相似度、重构误差和查询结果。",
    opening: "LSA页把“语义”落到矩阵与邻域变化，低秩表示不自动理解文本。",
  },
  "slm-18": {
    duty: "覆盖PLSA基本思想、概率模型、EM算法与模型性质",
    question: "怎样从文档—话题—词生成模型得到责任度，并验证概率和似然？",
    invariant: "文档/词计数、话题数、概率参数、初始化、EM更新和停止条件固定",
    fault: "概率未归一或单次随机初始化陷入差解，却把话题词列表当稳定语义",
    scenario: "对小型词频矩阵手算一轮PLSA的E步和M步并比较多初值。",
    stageNames: [
      "计数与话题",
      "生成概率",
      "E步后验",
      "M步归一",
      "似然与话题验收",
    ],
    sources: [SOURCES.publisher, SOURCES.plsa, SOURCES.scipyStats],
    artifact:
      "词频矩阵、话题数、参数初值、责任度、归一化参数、对数似然、多初值结果和话题稳定性。",
    opening: "PLSA页让话题词权重回到生成概率与EM轨迹，而非只展示标签。",
  },
  "slm-19": {
    duty: "覆盖蒙特卡罗、马尔可夫链、MCMC与Gibbs抽样",
    question: "怎样证明转移核保持目标分布，并用多链诊断判断样本是否可用？",
    invariant: "目标分布、转移核、初值、随机种子、预热、样本数和诊断阈值固定",
    fault: "只运行一条短链或未丢弃预热，就用样本均值宣称后验结论",
    scenario: "对离散目标分布比较直接采样、Metropolis-Hastings与Gibbs轨迹。",
    stageNames: [
      "目标分布",
      "转移核",
      "接受或条件采样",
      "多链运行",
      "收敛诊断",
    ],
    sources: [SOURCES.publisher, SOURCES.mcmc, SOURCES.scipyStats],
    artifact:
      "目标密度、提议/条件分布、接受率、初值与种子、链轨迹、预热、有效样本量、多链诊断和估计。",
    opening: "MCMC页把能移动、目标不变和样本已混合分成三项证据。",
  },
  "slm-20": {
    duty: "覆盖狄利克雷分布、LDA模型、Gibbs采样与变分EM",
    question: "怎样从文档生成过程连接共轭先验、条件采样和变分下界？",
    invariant:
      "语料词表、话题数、alpha/beta、初始化、采样/变分更新和停止规则固定",
    fault: "用测试文档调话题数或超参数，或采样未混合便解释主题",
    scenario: "对短语料构造LDA，比较塌缩Gibbs计数与变分参数更新。",
    stageNames: [
      "语料与先验",
      "生成过程",
      "条件后验",
      "采样或变分",
      "话题诊断",
    ],
    sources: [SOURCES.publisher, SOURCES.lda, SOURCES.mcmc],
    artifact:
      "词表、文档词ID、K与先验、计数张量、采样轨迹或变分下界、困惑度、稳定性和话题词。",
    opening: "LDA页保留主题指派如何更新，漂亮词云不是推断收敛证据。",
  },
  "slm-21": {
    duty: "覆盖PageRank定义、一般/基本/随机游走模型与幂法计算",
    question:
      "怎样从有向图构造随机矩阵，并处理悬挂节点与不可约性以得到稳定排名？",
    invariant:
      "节点集合、边方向、重复边、悬挂策略、阻尼、初始向量和收敛容差固定",
    fault: "列/行随机约定混淆或悬挂列未修复，概率质量丢失仍报告排名",
    scenario: "对一个含悬挂节点的小图手算基本PageRank与带阻尼幂迭代。",
    stageNames: [
      "图与边方向",
      "转移矩阵",
      "悬挂与阻尼",
      "幂法迭代",
      "概率与排名验收",
    ],
    sources: [SOURCES.publisher, SOURCES.pagerank, SOURCES.numpyLinearAlgebra],
    artifact:
      "节点/边表、随机矩阵、列/行约定、悬挂修复、阻尼、迭代向量、概率和、残差与排名。",
    opening: "PageRank页让每一分排名质量回到图方向和随机矩阵约定。",
  },
  "slm-22": {
    duty: "比较无监督方法的聚类、降维、话题、采样与图排序结构",
    question:
      "怎样按对象、目标、隐变量和计算方式比较第13至21章，而不是按输出图形归类？",
    invariant: "数据对象、结构假设、目标、估计量、算法状态、诊断与比较证据一致",
    fault: "用不同数据与主观可视化选“最好”方法，忽略各方法回答的问题不同",
    scenario:
      "为文档、矩阵、概率分布和有向图各选择一种方法并说明拒绝其他方法的理由。",
    stageNames: [
      "对象类型",
      "结构假设",
      "目标或分解",
      "估计算法",
      "诊断与选择",
    ],
    sources: [
      SOURCES.publisher,
      SOURCES.clustering,
      SOURCES.decomposition,
      SOURCES.mcmc,
    ],
    artifact:
      "无监督方法矩阵、输入对象、隐结构、目标、算法、计算代价、诊断、稳定性与选型记录。",
    opening: "无监督总结页按问题结构比较方法，不能用统一排行榜覆盖不同目标。",
  },
  "slm-app": {
    duty: "恢复梯度下降、牛顿/拟牛顿、拉格朗日对偶、矩阵子空间与KL/狄利克雷",
    question: "怎样让优化、线性代数与概率附录成为正文算法的可执行前置检查？",
    invariant: "符号、维度、定义域、导数、约束、数值容差、概率支持与归一化明确",
    fault:
      "形状、符号或定义域错误被自动广播和归一化掩盖，结果可运行却不对应公式",
    scenario: "为正文五类算法建立梯度、曲率、对偶、子空间和概率分布预检。",
    stageNames: [
      "对象与维度",
      "一二阶导数",
      "约束与对偶",
      "子空间结构",
      "概率与数值验收",
    ],
    sources: [
      SOURCES.publisher,
      SOURCES.numpyLinearAlgebra,
      SOURCES.scipyOptimize,
      SOURCES.scipyStats,
    ],
    artifact:
      "符号形状表、梯度/海塞差分、线搜索、KKT残差、秩与四子空间、KL非负性、概率和与容差。",
    opening:
      "附录页用数值断言连接推导与实现，公式熟悉不能替代形状和定义域检查。",
  },
  finalReview: {
    title: "《统计学习方法（第2版）》综合复核：从模型策略算法到可信结论",
    duty: "用统一方法证据链串联两篇22章256节/小节和附录A-E",
    question:
      "怎样证明一个统计学习结论同时满足定义、推导、数值实现、数据边界和独立检验？",
    invariant:
      "变量、模型、策略、算法、初值、数据角色、数值诊断、错误分析和复现首尾闭合",
    fault:
      "只保留最终模型或可视化，无法重放目标、更新、收敛、失败样本和选择理由",
    scenario:
      "综合复现分类、序列、低秩、话题采样和图排序，并逐类注入一个故障。",
    stageNames: [
      "变量与范围",
      "模型与目标",
      "算法与轨迹",
      "数值与统计诊断",
      "结论与复现",
    ],
    sources: [
      SOURCES.publisher,
      SOURCES.publisherEnglish,
      SOURCES.userGuide,
      SOURCES.scipyOptimize,
    ],
    artifact:
      "285层覆盖表、问题卡、推导、参数/隐变量轨迹、数值残差、评估、边界反例、方法比较和复现包。",
    opening:
      "综合复核把正确性拆成数学、数值、统计和工程四条必须同时闭合的证据链。",
    boundary: "总复习只验收2019年第2版的285层级；后续方法保持独立时间标签。",
  },
};

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const previousManifest = manifestDocument.books?.[BOOK];
if (!previousManifest) throw new Error(`缺少 ${BOOK} fidelity manifest`);
if (
  !Array.isArray(previousManifest.units) ||
  previousManifest.units.length !== 23
) {
  throw new Error("原版目录必须包含22章与附录单元");
}
if (!manifestDocument.books) manifestDocument.books = {};

function toPascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join("");
}

function mechanismFor(concept) {
  const rules = [
    [
      /统计学习|监督学习|无监督学习|三要素|模型评估|模型选择|泛化|正则化|交叉验证|分类问题|标注问题|回归问题/,
      [
        "声明学习问题、模型、策略、算法与泛化证据",
        "任务卡、数据角色、模型族、损失、优化与独立评估",
        "测试复用或三要素混淆",
      ],
    ],
    [
      /感知机|线性可分|误分类|原始形式|对偶形式|收敛/,
      [
        "沿误分类样本更新超平面并验证可分条件",
        "样本顺序、参数/对偶系数、Gram矩阵、间隔与迭代轨迹",
        "不可分仍宣称有限步收敛",
      ],
    ],
    [
      /近邻|kd树|距离|k近邻/,
      [
        "由距离、邻域和索引搜索形成局部预测",
        "尺度、距离表、邻居ID、树节点、回溯与剪枝界",
        "尺度或k窥看测试标签",
      ],
    ],
    [
      /朴素贝叶斯|贝叶斯估计|参数估计/,
      [
        "由先验和条件似然计算后验分类",
        "类别/条件计数、平滑、对数后验、归一化与校准",
        "零频窥标或测试先验",
      ],
    ],
    [
      /决策树|特征选择|信息增益|生成算法|剪枝|CART|回归树/,
      [
        "按纯度变化生成子树并以独立风险剪枝",
        "节点样本、候选划分、熵/基尼、阈值、子树与剪枝序列",
        "测试集选择分裂或子树",
      ],
    ],
    [
      /逻辑斯谛|最大熵|迭代尺度|拟牛顿|条件概率分布/,
      [
        "以指数族连接条件概率、最大似然与最大熵约束",
        "特征函数、经验/模型期望、目标、梯度、曲率与概率诊断",
        "目标未收敛或数值溢出",
      ],
    ],
    [
      /支持向量|间隔|拉格朗日|线性可分支持|线性支持|非线性支持|核函数|SMO|序列最小/,
      [
        "从最大间隔构造对偶、核与工作集优化",
        "Gram矩阵、乘子、工作集、目标、KKT残差与支持向量",
        "核参数泄漏或KKT违约",
      ],
    ],
    [
      /提升|AdaBoost|前向分步|提升树/,
      [
        "按误差更新样本权重并累积加法模型",
        "样本权重、弱规则、系数、归一常数与逐轮误差",
        "测试集决定轮数或权重未归一",
      ],
    ],
    [
      /EM|高斯混合|GEM|Q函数/,
      [
        "交替计算隐变量后验与参数最优更新",
        "责任度、Q函数、参数、似然/下界与多初值轨迹",
        "似然下降仍宣称收敛",
      ],
    ],
    [
      /隐马尔可夫|前向|后向|Baum|维特比|Viterbi/,
      [
        "在同一状态模型上计算概率、学习参数与解码路径",
        "初始/转移/发射、缩放alpha/beta、期望计数与回溯",
        "索引错位、未归一或下溢",
      ],
    ],
    [
      /条件随机场|概率无向图|特征函数|配分|条件概率模型/,
      [
        "以全局特征和配分函数学习、推断序列标签",
        "图、势、前向后向、配分、经验/模型期望、梯度与路径",
        "局部归一替代全局归一",
      ],
    ],
    [
      /聚类|层次|k均值|k-means/,
      [
        "按距离与结构假设合并或更新簇",
        "距离矩阵、链接、质心、成员、目标轨迹与多初值稳定性",
        "标签选择距离、k或幸运初始化",
      ],
    ],
    [
      /奇异值|SVD|矩阵分解|正交矩阵/,
      [
        "以正交子空间和奇异值分解、截断并重构矩阵",
        "形状、秩、U/S/Vh、正交残差、谱与重构误差",
        "矩阵方向或截断对象错误",
      ],
    ],
    [
      /主成分|总体主成分|样本主成分|方差贡献/,
      [
        "由中心化协方差求主方向并量化方差保留",
        "均值/尺度、协方差、特征值/向量、投影与重构",
        "全量数据拟合主方向",
      ],
    ],
    [
      /潜在语义分析|单词向量空间|话题向量空间|非负矩阵分解/,
      [
        "将词项文档矩阵映射到低秩潜在语义空间",
        "词表、权重、矩阵、分解阶数、语义向量、相似与重构",
        "测试查询选择表示",
      ],
    ],
    [
      /概率潜在语义|PLSA|生成模型/,
      [
        "用文档—话题—词生成模型和EM估计概率",
        "计数矩阵、责任度、参数、归一化、似然与多初值",
        "概率未归一或单初值过度解释",
      ],
    ],
    [
      /蒙特卡罗|马尔可夫链|Metropolis|Gibbs|遍历定理|平稳分布/,
      [
        "构造保持目标分布的链并以诊断验收样本",
        "目标、转移/提议、接受率、链、预热、有效样本与多链诊断",
        "短链未混合便估计",
      ],
    ],
    [
      /狄利克雷|LDA|话题模型|变分|收缩的Gibbs/,
      [
        "以共轭先验生成话题并用采样或变分推断",
        "词表、先验、计数、指派轨迹、变分下界与话题稳定性",
        "测试语料调参或推断未收敛",
      ],
    ],
    [
      /PageRank|随机游走|幂法|有向图|随机矩阵/,
      [
        "由有向图和阻尼随机游走求平稳排名",
        "节点边、随机矩阵、悬挂修复、阻尼、迭代向量与残差",
        "行列约定混淆或概率质量丢失",
      ],
    ],
    [
      /梯度下降|牛顿|拟牛顿|对偶性|基本子空间|KL散度|狄利克雷分布/,
      [
        "为正文算法提供优化、矩阵与概率的可执行前提",
        "形状、导数、线搜索、KKT、秩/子空间、支持集与概率和",
        "形状、符号或定义域错误被运行时掩盖",
      ],
    ],
    [
      /总结|比较/,
      [
        "按模型、策略、算法和证据边界比较方法",
        "方法矩阵、假设、目标、算法状态、计算代价与失败边界",
        "异质任务使用统一排行榜",
      ],
    ],
  ];
  return (
    rules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把目录坐标转为有定义、推导、计算和验收的统计学习合同",
      "变量、假设、目标、更新、数值残差、评估和边界反例",
      "只复述结论或公式名称",
    ]
  );
}

function termFor(concept, index) {
  const short = concept
    .replace(/^第\s*\d+章\s*/, "")
    .replace(/^第\s*[12]篇\s*/, "")
    .replace(/^\d+(?:\.\d+)+\s*/, "")
    .replace(/^附录\s*[A-E]\s*/, "")
    .split(/[；;：:——,，与]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 18
    ? short
    : `方法坐标${index + 1}`;
}

function proseConcept(concept) {
  return concept.replace(/\.(?=\d)/g, "·");
}

function alphaCode(index) {
  let value = index + 1;
  let result = "";
  while (value > 0) {
    value -= 1;
    result = String.fromCharCode(65 + (value % 26)) + result;
    value = Math.floor(value / 26);
  }
  return result;
}

function enrichProfile(key, specification, role, unit = null) {
  const chapterPath = PATHS[key];
  if (!chapterPath) throw new Error(`缺少路径：${key}`);
  if (!specification) throw new Error(`缺少页面规格：${key}`);
  const concepts = unit
    ? unit.concepts.map((group) => group.join("；"))
    : previousManifest.units.flatMap((item) =>
        item.concepts.map((group) => group.join("；")),
      );
  const title = specification.title ?? unit?.title;
  const boundary =
    specification.boundary ??
    `“${title}”按2019年第2版范围解释；当前库函数和后续研究只作独立核验，不反写原版。`;
  const stageDetails = [
    ["声明对象、符号与适用域", "只读取本步允许的已知量", "形式化问题状态"],
    ["构造模型、结构或分布", "保存假设、维度与归一条件", "可计算模型状态"],
    ["建立策略、目标或推断量", "记录目标、约束和选择理由", "候选优化状态"],
    ["执行更新、分解或采样", "保存初值、顺序、随机性与残差", "可重放数值轨迹"],
    ["检查定义、数值与统计结论", "保留反例、诊断和适用边界", "独立方法证据包"],
  ];
  return {
    key,
    id: unit?.id ?? key,
    officialUnitId: unit?.id ?? null,
    role,
    chapterPath,
    componentBase: toPascal(path.basename(chapterPath)),
    concepts,
    title,
    ...specification,
    boundary,
    stages: specification.stageNames.map((name, index) => ({
      name,
      known: `${title}：${stageDetails[index][0]}，冻结数据、形状和版本`,
      transform: `${stageDetails[index][1]}，并持续满足“${specification.invariant}”`,
      result: `${name}产生${stageDetails[index][2]}`,
      check: `${stageDetails[index][2]}、索引和数值断言；出现“${specification.fault}”时停止`,
    })),
    cases: [
      {
        name: "参考推演",
        problem: `${specification.scenario} 固定符号、数据、初值、顺序、容差和种子。`,
        prediction: `沿“${specification.stageNames.join(" → ")}”得到可复核结果。`,
        boundary: `全过程必须满足“${specification.invariant}”。`,
      },
      {
        name: "边界反例",
        problem: `${specification.scenario} 其余不变，只注入“${specification.fault}”。`,
        prediction: "定位第一处定义、形状、目标或数值状态偏离，并拒绝结论。",
        boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
      },
    ],
    referenceTrace: [
      `为“${title}”冻结符号、数据、形状、初值、顺序、容差和随机种子`,
      `执行${specification.stageNames.slice(0, 2).join("、")}，保存定义、假设与模型状态`,
      `推进${specification.stageNames.slice(2, 4).join("、")}，记录目标、更新和数值残差`,
      `在${specification.stageNames[4]}交付${specification.artifact}`,
    ],
    faultTrace: [
      `“${title}”复用相同符号、数据、形状、初值、顺序、容差和种子`,
      `只改变一个条件：${specification.fault}`,
      `沿“${specification.stageNames.join(" → ")}”寻找最早的定义或数值分叉`,
      `撤销故障重放；只有“${specification.invariant}”恢复才接受修正`,
    ],
  };
}

const profiles = [
  enrichProfile("learningMap", SPECS.learningMap, "learning-map"),
  ...previousManifest.units.map((unit) =>
    enrichProfile(unit.id, SPECS[unit.id], "chapter", unit),
  ),
  enrichProfile("finalReview", SPECS.finalReview, "final-review"),
];
if (profiles.length !== 25) throw new Error("课程必须恰好为25页");

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并区分原版范围、独立核验和后续扩展
- 能先预测“${profile.question}”的定义与数值路径，再用已知量、变换、残差和反例逐步复核
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、降级或拒绝方法结论

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个方法推演开始

${profile.opening} “${profile.title}”的贯穿任务是：${profile.scenario} 动手前先写下哪个定义、矩阵、分布、目标或迭代状态会变化；运行后补理由不算预测。

本页围绕“${profile.question}”建立参考、故障与恢复路径。只有“${profile.title}”守住“${profile.invariant}”并交付${profile.artifact}，公式、图形或指标才构成统计学习证据。

## 书目、285个原版层级与版本边界

“${profile.title}”以[清华大学出版社官方书页](${SOURCES.publisher})核对李航著《统计学习方法（第2版）》于2019年出版、ISBN 9787302517276和监督/无监督两篇结构，同时以[出版社英文版权页](${SOURCES.publisherEnglish})确认484页及两篇主要内容，再以出版社公开完整目录逐项核对两篇、22章、256个编号节/小节和附录A-E，因此本站覆盖分母共285个正式目录层级。

“${profile.title}”未取得原书完整正文授权，只以出版社完整目录限定范围；中文解释、推导、数值实验、交互、练习与答案均为独立教学重写。${profile.boundary}

本页另以${links}核对算法原始定义、实现语义或数值工具。外部资料能验证技术事实，不能反向证明原书正文采用了本站表述。`;
}

const patterns = [
  (p, c, m, e, x, i) =>
    `在“${p.title}”的坐标${i + 1}中，目录项「${c}」用于${m}；先冻结符号与形状，再以${e}复核，出现${x}时撤回结论。`,
  (p, c, m, e, x, i) =>
    `目录项「${c}」进入“${p.title}”后要回答第${i + 1}个方法问题：它怎样${m}、改变什么数值状态、由哪些${e}证明，并如何排除${x}。`,
  (p, c, m, e, x, i) =>
    `围绕“${p.question}”，在“${p.title}”的原版层级${i + 1}把「${c}」落实为${m}；复核者先读取${e}，不能接受${x}。`,
  (p, c, m, e, x, i) =>
    `对“${p.title}”而言，目录项「${c}」的最小推演合同是${m}，第${i + 1}次检查保存${e}；若产生${x}，就返回上一步。`,
  (p, c, m, e, x, i) =>
    `第${i + 1}个正式坐标「${c}」服务于${p.duty}，需要以${e}呈现${m}；${x}会破坏“${p.invariant}”。`,
];

function conceptsSection(profile) {
  return `## 原版目录层级与方法机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept);
    const term = termFor(concept, index);
    const visibleConcept = proseConcept(concept);
    const definition = `${term}对应原版目录坐标“${visibleConcept}”，在“${profile.title}”中用于${mechanism}，并受定义域、形状、目标、算法状态与版本边界约束。`;
    return `### ${concept}

<Term def=${JSON.stringify(definition)}>${term}</Term>

**原版坐标 ${index + 1}/${profile.concepts.length}。** ${patterns[index % patterns.length](profile, visibleConcept, mechanism, evidence, caution, index)}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个章专属实验

<Callout type="info" title="先写出哪个定义或数值状态会先变化">
  对“${profile.title}”先冻结符号、数据、形状、初值、顺序、容差和种子，再操作推导路径、数值轨迹和结论门；结果与预测不一致时修改假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 定义、推导与变换路径">
    固定“${profile.scenario}”，在参考与反例间切换，逐阶段查看“${profile.stageNames.join("、")}”的已知量、变换、结果和数值检查。

    <${profile.componentBase}DerivationPathLab />
  </Step>
  <Step title="2. 参考与单故障数值轨迹">
    保持符号、数据和初值不变，只注入“${profile.fault}”，定位第一个偏离“${profile.invariant}”的步骤。

    <${profile.componentBase}NumericalTraceLab />
  </Step>
  <Step title="3. 方法结论验收门">
    分别锁定定义形状、目标约束、算法轨迹与诊断边界，展开${profile.artifact}后决定是否接受。

    <${profile.componentBase}ClaimGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页单一故障：${profile.fault}">
  “${profile.title}”遇到该故障时保持其余符号、数据、形状、初值、顺序、容差和种子不变，沿五阶段寻找最早偏离；最终数值看似合理不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="公式成立不等于数值实现正确">
  ${profile.scenario} 的符号推导只限定数学对象；“${profile.title}”仍需形状、归一、目标单调性、收敛残差和边界反例。
</Callout>

<Callout type="trap" title="当前库函数不能冒充原版正文">
  “${profile.title}”引用现行文档是为了核对计算语义；库版本、自动求解器和后续模型必须单列时间标签，不能倒填2019年第2版。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放方法协议

| 阶段 | 允许动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stageNames
  .map(
    (stage, index) =>
      `| ${stage} | 在“${profile.title}”执行${stage}，只改变声明的数学或数值状态 | ${index === 0 ? "符号、定义域、形状、数据与版本" : index === 4 ? "残差、诊断、反例、适用边界与复现" : "模型、目标、约束、参数/隐变量与迭代轨迹"} | ${index === 0 ? "对象或形状不可追溯" : index === 4 ? "无法重放或缺少诊断" : profile.fault} |`,
  )
  .join("\n")}

\`\`\`yaml
unit: ${JSON.stringify(profile.id)}
question: ${JSON.stringify(profile.question)}
scenario: ${JSON.stringify(profile.scenario)}
stages: ${JSON.stringify(profile.stageNames)}
invariant: ${JSON.stringify(profile.invariant)}
fault: ${JSON.stringify(profile.fault)}
evidence: ${JSON.stringify(profile.artifact)}
reset: restore_case_stage_trace_mode_step_gates_and_artifact
\`\`\`

该协议要求“${profile.title}”在相同符号、数据、形状、初值、顺序、容差和种子下重放。重置后若案例、阶段、轨迹模式、步骤、结论门或证据包没有回到基线，交互状态已经污染比较。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>检索键 slm-${alphaCode(index)} 对应目录坐标「${proseConcept(concept)}」；在“${profile.title}”中用于${mechanism}，需要连接原版范围、定义、数值状态与独立证据。</GlossaryItem>`;
    })
    .join("\n");
  const coverageList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. “${profile.title}”的目录项「${proseConcept(concept)}」：以“${mechanism}”解释方法作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是背诵公式或API，而是能围绕“${profile.question}”重建定义与数值证据，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：方法合同。** “${profile.title}”为什么必须先冻结符号、数据、形状、初值、顺序、容差和种子？

<Answer>
  ${profile.scenario} 若这些条件变化，相同结果可能来自不同数学对象、目标、更新或随机轨迹；“${profile.title}”先冻结合同，才能把观测连接到单一方法机制。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明原版目录坐标已经进入机制、交互和练习？

<Answer>
${coverageList}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一符号、数据、形状、初值、顺序、容差和种子，重放参考路径后只注入“${profile.fault}”；记录最早偏离，撤销故障再运行。只有推导路径、数值轨迹、结论门和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="李航著《统计学习方法（第2版）》"
  adaptedUrl="${SOURCES.publisher}"
/>`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    stages: profile.stages,
    cases: profile.cases,
    referenceTrace: profile.referenceTrace,
    faultTrace: profile.faultTrace,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    gates: [
      {
        label: "定义与形状",
        detail: `“${profile.title}”的对象、符号、维度、定义域和归一约定可追溯。`,
      },
      {
        label: "模型与目标",
        detail: `“${profile.title}”的假设、分布、损失/似然、约束和选择理由已冻结。`,
      },
      {
        label: "算法与数值",
        detail: `“${profile.title}”的初值、顺序、随机性、更新、容差和残差可重放。`,
      },
      {
        label: "诊断与边界",
        detail: `“${profile.title}”归档反例、收敛/稳定性、独立评估、适用域和时间标签。`,
      },
    ],
  };
  return `"use client";

import {
  StatisticalMethodEvidenceLab,
  type StatisticalMethodEvidenceModel,
} from "./statistical-method-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies StatisticalMethodEvidenceModel;

export function ${profile.componentBase}DerivationPathLab() {
  return <StatisticalMethodEvidenceLab model={model} view="derivation-path" />;
}

export function ${profile.componentBase}NumericalTraceLab() {
  return <StatisticalMethodEvidenceLab model={model} view="numerical-trace" />;
}

export function ${profile.componentBase}ClaimGateLab() {
  return <StatisticalMethodEvidenceLab model={model} view="claim-gate" />;
}
`;
}

async function writeFormatted(filePath, source, parser) {
  const output = await format(source, { parser });
  const current = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "";
  if (current !== output) fs.writeFileSync(filePath, output);
}

async function transformPage(profile) {
  const filePath = path.join(CONTENT_ROOT, `${profile.chapterPath}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const slug = path.basename(profile.chapterPath);
  const body = `import {
  Objectives,
  Term,
  Callout,
  Stepper,
  Step,
  Exercises,
  Answer,
  Glossary,
  GlossaryItem,
  Attribution,
} from "@/components/mdx/mdx-components";
import { ${profile.componentBase}DerivationPathLab, ${profile.componentBase}NumericalTraceLab, ${profile.componentBase}ClaimGateLab } from "@/components/mdx/${BOOK}/v2/${slug}";

${objectivesBlock(profile)}

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesisSection(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    description: `${profile.duty}；用推导路径、单故障数值轨迹和结论验收门完成独立复核。`,
    demo: true,
    math: false,
    sourceUrl: SOURCES.publisher,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  if (profile.officialUnitId) data.officialUnitId = profile.officialUnitId;
  else delete data.officialUnitId;
  await writeFormatted(
    filePath,
    matter.stringify(body.trimStart(), data),
    "mdx",
  );
  await writeFormatted(
    path.join(COMPONENT_ROOT, `${slug}.tsx`),
    wrapperSource(profile),
    "typescript",
  );
}

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

const allConcepts = previousManifest.units.flatMap((unit) =>
  unit.concepts.map((group) => group.join("；")),
);
const partTitles = allConcepts.filter((item) =>
  /^第\s*[12]篇/.test(item),
).length;
const chapterHeadings = allConcepts.filter((item) =>
  /^第\s*\d+章/.test(item),
).length;
const numberedTopics = allConcepts.filter((item) =>
  /^\d+(?:\.\d+)+\s/.test(item),
).length;
const appendixLevels = allConcepts.filter((item) =>
  /^附录\s*[A-E]/.test(item),
).length;
const catalogLevels = allConcepts.length;
if (
  partTitles !== 2 ||
  chapterHeadings !== 22 ||
  numberedTopics !== 256 ||
  appendixLevels !== 5 ||
  catalogLevels !== 285
) {
  throw new Error(
    `目录口径应为2篇+22章+256编号层级+5附录=285，实际${partTitles}+${chapterHeadings}+${numberedTopics}+${appendixLevels}=${catalogLevels}`,
  );
}

manifestDocument.books[BOOK] = {
  ...previousManifest,
  edition:
    "李航著《统计学习方法（第2版）》，清华大学出版社，2019，484页，ISBN 9787302517276",
  sourceKind:
    "official-publisher-complete-outline-cross-checked-with-publisher-rights-page-and-primary-or-official-technical-sources",
  sourceUrl: SOURCES.publisher,
  secondarySourceUrls: Object.values(SOURCES).slice(1),
  status: "verified-outline",
  verifiedAt: "2026-07-30",
  disclosureNote:
    "清华大学出版社官方页面确认李航著《统计学习方法（第2版）》、2019年、ISBN 9787302517276、监督/无监督两篇结构；出版社英文版权页确认484页及两篇主要内容，出版社公开完整目录逐项确认两篇、22章、256个编号节/小节和附录A-E，共285个正式目录层级。课程按22章与附录逐一覆盖，另设学习地图和综合复核，共25页、75个章专属交互。未取得原书完整正文授权，全部解释、推导、数值实验、交互、练习与答案均为独立教学重写。旧页面虽列出目录，却缺少合法目标/归属结构和可复核交互，已整体替换。",
  units: previousManifest.units.map((unit) => ({
    ...unit,
    chapterPath: PATHS[unit.id],
  })),
  metrics: {
    formalUnits: previousManifest.units.length,
    partTitles,
    chapterHeadings,
    numberedTopics,
    appendixLevels,
    formalNodes: catalogLevels,
    coursePages: profiles.length,
    interactiveViews: profiles.length * 3,
    reviewQuestions: profiles.length * 3,
  },
  sourceAccess: "outline-only",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/statistical-learning-methods-v2-profiles.json",
  factSourcePolicy:
    "出版社目录只限定两篇22章256节/小节、附录A-E和2019第2版范围；感知机、近邻、贝叶斯、决策树、逻辑回归/最大熵、SVM、提升、EM、HMM、CRF、聚类、SVD/PCA、LSA/PLSA、MCMC、LDA、PageRank及附录数值工具分别以原始论文、官方技术文档或权威实现文档核对。后续模型不得反写原版。",
};
const manifestOutput = `${JSON.stringify(manifestDocument, null, 2)}\n`;
if (fs.readFileSync(MANIFEST_PATH, "utf8") !== manifestOutput) {
  fs.writeFileSync(MANIFEST_PATH, manifestOutput);
}

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      book: BOOK,
      generatedAt: "2026-07-30",
      outlineSources: [SOURCES.publisher, SOURCES.publisherEnglish],
      technicalSources: Object.values(SOURCES).slice(2),
      officialUnits: previousManifest.units.length,
      officialPartTitles: partTitles,
      officialChapterHeadings: chapterHeadings,
      officialNumberedTopics: numberedTopics,
      officialAppendixLevels: appendixLevels,
      officialCatalogLevels: catalogLevels,
      coursePages: profiles.length,
      interactiveViews: profiles.length * 3,
      pages: profiles.map((profile) => ({
        chapterPath: profile.chapterPath,
        title: profile.title,
        role: profile.role,
        officialUnitId: profile.officialUnitId,
        concepts: profile.concepts,
        question: profile.question,
        invariant: profile.invariant,
        fault: profile.fault,
        artifact: profile.artifact,
        historicalBoundary: profile.boundary,
        technicalSources: profile.sources,
      })),
    },
    null,
    2,
  )}\n`,
  "json",
);

console.log(
  `已重建 ${profiles.length} 页，覆盖${partTitles}篇+${chapterHeadings}章+${numberedTopics}编号层级+${appendixLevels}附录=${catalogLevels}个原版层级，生成 ${profiles.length * 3} 个交互视图。`,
);
