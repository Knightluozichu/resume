import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "illustrated-ml";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx/illustrated-ml/v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/illustrated-ml-v2-profiles.json");

const SOURCES = {
  publisher: "https://www.kspub.co.jp/book/detail/1538214.html",
  chinese: "https://www.tenlong.com.tw/products/9787115388025?list_name=lv",
  author: "https://www.ms.k.u-tokyo.ac.jp/sugi/publications.html",
  statbook:
    "https://www.sciencedirect.com/book/monograph/9780128021217/introduction-to-statistical-machine-learning",
  lasso: "https://academic.oup.com/jrsssb/article/58/1/267/7027929",
  huber:
    "https://projecteuclid.org/journals/annals-of-mathematical-statistics/volume-35/issue-1/Robust-Estimation-of-a-Location-Parameter/10.1214/aoms/1177703732.full",
  svm: "https://link.springer.com/article/10.1007/BF00994018",
  bagging: "https://link.springer.com/article/10.1007/BF00058655",
  boosting:
    "https://www.sciencedirect.com/science/article/pii/S002200009791504X",
  crf: "https://repository.upenn.edu/cis_papers/159/",
  lof: "https://dl.acm.org/doi/10.1145/335191.335388",
  densityRatio: "https://www.jmlr.org/papers/v9/kanamori08a.html",
  kernelPca:
    "https://proceedings.neurips.cc/paper/1997/hash/226d1f15ecd35f784d2a20c3ecf56d7f-Abstract.html",
  lpp: "https://proceedings.neurips.cc/paper/2003/hash/d69116f8b0140cdeb1f99a4d5096ffe4-Abstract.html",
  laplacian:
    "https://proceedings.neurips.cc/paper/2001/hash/f106b7f99d2cb30c3db1c3cc0fde9ccb-Abstract.html",
  spectral:
    "https://proceedings.neurips.cc/paper/2001/hash/801272ee79cfde7fa5960571fee36b9b-Abstract.html",
  pa: "https://www.jmlr.org/papers/v7/crammer06a.html",
  arow: "https://proceedings.neurips.cc/paper/2009/hash/42998cf32d552343bc8e460416382dca-Abstract.html",
  manifold: "https://www.jmlr.org/papers/v7/belkin06a.html",
  covariateShift: "https://www.jmlr.org/papers/v8/sugiyama07a.html",
  multitask: "https://link.springer.com/article/10.1023/A:1007379606734",
};

const PATHS = {
  learningMap: "00-guide/iml-official-learning-map",
  "iml-01": "01-introduction/iml-01-what-is-machine-learning",
  "iml-02": "01-introduction/iml-02-learning-models",
  "iml-03": "02-supervised-regression/iml-03-least-squares-learning",
  "iml-04": "02-supervised-regression/iml-04-constrained-least-squares",
  "iml-05": "02-supervised-regression/iml-05-sparse-learning",
  "iml-06": "02-supervised-regression/iml-06-robust-learning",
  "iml-07": "03-supervised-classification/iml-07-least-squares-classification",
  "iml-08": "03-supervised-classification/iml-08-support-vector-classification",
  "iml-09": "03-supervised-classification/iml-09-ensemble-classification",
  "iml-10": "03-supervised-classification/iml-10-probabilistic-classification",
  "iml-11": "03-supervised-classification/iml-11-sequence-classification",
  "iml-12": "04-unsupervised-learning/iml-12-anomaly-detection",
  "iml-13":
    "04-unsupervised-learning/iml-13-unsupervised-dimensionality-reduction",
  "iml-14": "04-unsupervised-learning/iml-14-clustering",
  "iml-15": "05-emerging-algorithms/iml-15-online-learning",
  "iml-16": "05-emerging-algorithms/iml-16-semi-supervised-learning",
  "iml-17": "05-emerging-algorithms/iml-17-supervised-dimensionality-reduction",
  "iml-18": "05-emerging-algorithms/iml-18-transfer-learning",
  "iml-19": "05-emerging-algorithms/iml-19-multi-task-learning",
  "iml-20": "06-conclusion/iml-20-summary-outlook",
  finalReview: "07-review/iml-official-final-review",
};

const PAGE_SPECS = {
  learningMap: {
    title: "《图解机器学习》88个原版目录层级学习地图",
    duty: "按6部分、20章与62个编号小节组织监督回归、分类、无监督与新兴算法",
    question:
      "怎样让88个原版层级共享同一套数据、模型、损失、优化和验证坐标，又不抹平各算法的假设？",
    invariant:
      "6部分、20章、62编号小节逐项覆盖；训练分布、目标、约束和独立验证可追溯",
    fault:
      "只保留常见分类器，遗漏约束最小二乘、稀疏/鲁棒、序列、异常、流形、迁移与多任务学习",
    scenario:
      "用一套带异常、分布变化和少量标签的数据，选择任务与模型，训练后在冻结测试集和分布变化场景复核。",
    boundary:
      "原书以最小二乘识别模型为主线；本站保留2013原版结构，现代工程建议只作独立迁移说明。",
    stageNames: [
      "任务与数据",
      "模型空间",
      "目标与约束",
      "求解与选择",
      "独立验证",
    ],
    sources: [SOURCES.publisher, SOURCES.author, SOURCES.statbook],
    artifact:
      "88层级矩阵、任务卡、数据切分、模型与核、损失与约束、求解轨迹、超参数选择、反例和分布变化报告。",
    opening:
      "学习地图恢复原书从最小二乘贯穿回归与分类，再扩展到无监督、在线、半监督、迁移和多任务的完整路线。",
  },
  "iml-01": {
    duty: "区分学习种类、典型任务和从数据选择方法的基本流程",
    question:
      "怎样由输出、反馈与数据生成方式判断监督、无监督或其他学习任务，而不是先选热门算法？",
    invariant: "问题、输入、输出、监督信号、样本来源、损失与评估集合明确",
    fault: "把没有标签的聚类问题硬写成分类，随后用训练准确率宣称任务成功",
    scenario:
      "对房价、垃圾邮件与客户分群三个案例分别登记输出、反馈、数据和验收指标。",
    boundary:
      "本章限定2013机器学习任务观；后来术语可以对照，但不能替换原版1.1至1.3。",
    stageNames: ["问题", "输入样本", "监督信号", "学习方法", "任务验收"],
    sources: [SOURCES.publisher, SOURCES.statbook],
    artifact:
      "任务定义、样本单位、标签可得性、数据生成过程、候选方法、简单基线、指标和失败案例。",
    opening:
      "第一章从任务而不是算法菜单开始，先证明学习对象和反馈形式确实匹配。",
  },
  "iml-02": {
    duty: "比较线性、核与层级模型的表示能力、参数化和计算边界",
    question:
      "怎样在同一数据上区分特征映射、核相似度和层级组合带来的模型空间变化？",
    invariant: "输入表示、函数族、参数或核、复杂度控制与验证协议固定",
    fault: "把核技巧称为自动学特征，或只因训练误差低就选择更复杂层级模型",
    scenario:
      "对一组非线性二维样本比较线性特征、核模型和两层表示，并记录决策函数。",
    boundary: "层级模型按原版概念解释；现代深度架构不倒填进2.3。",
    stageNames: ["输入表示", "线性基线", "核相似度", "层级组合", "复杂度验证"],
    sources: [SOURCES.statbook, SOURCES.svm],
    artifact:
      "特征矩阵、函数族、核矩阵、层级结构、参数量、训练/验证风险与复杂度曲线。",
    opening:
      "学习模型页让不同表示在同一切分上竞争，避免用模型名称代替归纳偏置。",
  },
  "iml-03": {
    duty: "覆盖最小二乘目标、解的性质与面向大规模数据的求解",
    question:
      "怎样从设计矩阵和残差平方和推出解，并用条件数和留出误差识别不稳定拟合？",
    invariant: "设计矩阵、目标向量、残差定义、求解器容差和数据切分固定",
    fault: "直接求逆病态正规方程，系数剧烈变化却只报告训练残差",
    scenario:
      "在共线回归数据上比较正规方程、QR或迭代求解，并扰动一列观察系数稳定性。",
    boundary: "大规模求解按算法机制讲，不把当前某个库API伪装成原书实现。",
    stageNames: ["设计矩阵", "平方损失", "线性方程", "数值求解", "残差验证"],
    sources: [SOURCES.statbook, SOURCES.author],
    artifact:
      "设计矩阵、目标、残差、秩与条件数、求解器、容差、系数、训练/验证误差和扰动结果。",
    opening:
      "最小二乘页同时检查统计目标与数值线性代数；闭式表达不保证计算稳定。",
  },
  "iml-04": {
    duty: "覆盖子空间约束、l2约束与基于验证的模型选择",
    question:
      "怎样证明约束改变的是可行模型空间，并通过嵌套验证选择强度而不偷看测试集？",
    invariant: "约束集合、正则强度候选、训练/验证/测试划分和选择规则预先冻结",
    fault: "遍历l2强度后直接选择测试集误差最低者，测试集变成训练反馈",
    scenario: "在高维小样本回归上比较子空间与l2约束，并用嵌套切分选择强度。",
    boundary: "本章是约束最小二乘，不把后来所有正则化技术合并为一个模糊章节。",
    stageNames: ["基线模型", "可行子空间", "l2约束", "候选拟合", "嵌套选择"],
    sources: [SOURCES.statbook, SOURCES.author],
    artifact:
      "基函数、约束矩阵、l2半径或惩罚、候选网格、内层验证、最终测试和系数路径。",
    opening:
      "约束页把“防过拟合”落实为可行集合和选择协议，而不是只加一个正则化按钮。",
  },
  "iml-05": {
    duty: "覆盖l1、求解方法、特征选择、lp约束与l1/l2组合",
    question:
      "怎样沿正则路径观察系数进入与退出，并区分稀疏预测、特征选择和相关变量不稳定？",
    invariant: "特征标准化、损失、正则路径、求解容差、选择切分和稀疏度定义固定",
    fault: "在全量数据上筛特征后再交叉验证，造成选择泄漏和过度乐观",
    scenario:
      "对含相关变量的高维数据运行l1与l1/l2约束，记录支持集路径和重采样稳定性。",
    boundary:
      "稀疏机制以原版约束最小二乘为中心；不把任意剪枝或神经网络稀疏化倒填进来。",
    stageNames: ["标准化特征", "l1/lp约束", "路径求解", "支持集", "选择稳定性"],
    sources: [SOURCES.lasso, SOURCES.statbook],
    artifact:
      "标准化参数、正则路径、KKT或残差、求解容差、非零系数、支持集频率、验证误差和测试结果。",
    opening:
      "稀疏学习页不把零系数自动等同因果特征；支持集必须经独立切分和重采样复核。",
  },
  "iml-06": {
    duty: "比较l1、Huber、图基损失及带l1约束的鲁棒拟合",
    question:
      "怎样通过残差到权重的映射解释离群点影响，并区分鲁棒性与删除困难样本？",
    invariant: "污染机制、损失阈值、约束、优化器和干净/污染测试集同时固定",
    fault: "根据模型残差手工删除样本后只在清洗数据上评估，隐藏真实失败率",
    scenario:
      "向回归数据注入少量大残差，对比平方、l1与Huber损失的参数和预测变化。",
    boundary: "本章按损失与约束讲鲁棒学习；现代异常处理只能独立扩展。",
    stageNames: ["残差", "鲁棒损失", "样本影响", "受约束更新", "污染对照"],
    sources: [SOURCES.huber, SOURCES.statbook],
    artifact:
      "污染种子、残差、损失曲线、影响权重、阈值、参数路径、干净与污染误差和未删失败样本。",
    opening:
      "鲁棒学习页保留离群样本并测量其影响，避免把人工清洗误报成算法鲁棒性。",
  },
  "iml-07": {
    duty: "覆盖最小二乘分类、0/1损失与间隔、多类别扩展",
    question:
      "怎样把回归分数转换为类别决策，并用间隔与混淆矩阵发现平方损失的分类边界？",
    invariant: "类别编码、分数函数、决策规则、损失和多类别组合固定",
    fault: "改变类别编码后仍沿用旧阈值，表面平方误差下降而分类决策翻转",
    scenario: "对三类别样本拟合最小二乘分数，比较编码、阈值、间隔与0/1错误。",
    boundary: "本章只把最小二乘用于分类；概率解释留到第10章。",
    stageNames: [
      "类别编码",
      "分数拟合",
      "决策阈值",
      "间隔与0/1损失",
      "多类验证",
    ],
    sources: [SOURCES.statbook, SOURCES.author],
    artifact:
      "类别编码、分数矩阵、阈值、间隔、平方损失、0/1损失、混淆矩阵和多类失败样本。",
    opening:
      "最小二乘分类页把连续分数和离散决策拆开验证，避免把回归误差直接当分类质量。",
  },
  "iml-08": {
    duty: "覆盖最大间隔、SVM求解、支持向量、核映射、Hinge与Ramp损失",
    question:
      "怎样从间隔约束与对偶变量识别支持向量，并观察核与鲁棒损失怎样改变边界？",
    invariant: "特征尺度、核与参数、软间隔强度、求解容差和验证切分固定",
    fault: "未标准化特征便比较间隔，或在测试集上选择核宽度和C",
    scenario: "对含离群点的非线性二分类比较线性/核SVM、Hinge与Ramp损失。",
    boundary: "本章保持SVM和损失解释；现代大型核近似另列迁移，不替换8.1至8.6。",
    stageNames: [
      "特征与核",
      "间隔约束",
      "对偶求解",
      "支持向量",
      "损失边界验证",
    ],
    sources: [SOURCES.svm, SOURCES.statbook],
    artifact:
      "特征缩放、核矩阵、C与核宽度、对偶系数、KKT残差、支持向量、间隔、验证曲线和离群反例。",
    opening:
      "SVM页让支持向量和KKT条件成为可检查工件，而不是只展示一条漂亮分界线。",
  },
  "iml-09": {
    duty: "比较剪枝分类、Bagging与Boosting的采样、组合与误差结构",
    question:
      "怎样区分重采样降方差和顺序加权纠错，并用袋外或独立验证证明集成收益？",
    invariant: "基础学习器、采样种子、轮数、组合权重和评估集合固定",
    fault: "用同一训练样本评估每轮并挑选最佳轮数，未保留袋外或验证证据",
    scenario:
      "在不稳定树基线上比较剪枝、Bagging和Boosting，记录样本权重与预测分歧。",
    boundary: "本章限定三类原版集成方法；现代梯度提升实现只作迁移对照。",
    stageNames: [
      "基础学习器",
      "采样或加权",
      "成员拟合",
      "组合预测",
      "袋外/验证",
    ],
    sources: [SOURCES.bagging, SOURCES.boosting],
    artifact:
      "基础树、重采样索引、样本权重、成员预测、组合权重、轮数、袋外误差、验证曲线和分歧样本。",
    opening:
      "集成页不把“模型更多”当原因，而是分别追踪样本重采样、错误加权和预测组合。",
  },
  "iml-10": {
    duty: "覆盖Logistic回归与最小二乘概率分类的概率估计",
    question: "怎样验证输出满足概率约束、排序与校准，而不是只看分类准确率？",
    invariant: "标签编码、链接函数、概率归一化、损失、阈值和校准集合固定",
    fault: "把任意分数归一化后称为概率，没有对数损失、Brier或校准证据",
    scenario:
      "对类别不平衡数据比较Logistic与最小二乘概率分数，检查排序和校准。",
    boundary: "本章聚焦两种概率分类；贝叶斯生成模型不是本章隐含目录。",
    stageNames: [
      "类别与特征",
      "概率链接",
      "风险最小化",
      "归一化与阈值",
      "校准验证",
    ],
    sources: [SOURCES.statbook, SOURCES.author],
    artifact:
      "标签比例、分数、概率和、损失、阈值、可靠性分箱、Brier/对数损失、混淆矩阵和校准失败样本。",
    opening: "概率分类页把“能排序”“能分类”和“概率校准”作为三个不同验收目标。",
  },
  "iml-11": {
    duty: "覆盖序列建模、CRF学习与标签序列解码",
    question:
      "怎样把局部特征、转移分数、全局归一化和动态规划连接成可复核标签序列？",
    invariant: "序列边界、特征模板、标签集、归一化、训练目标与解码规则固定",
    fault: "逐位置取最高分替代全局解码，产生不允许的标签转移",
    scenario: "对短句序列建立线性链CRF，比较局部贪心和Viterbi全局标签路径。",
    boundary: "本章限定条件随机场；Transformer等后续序列模型不倒填原版11章。",
    stageNames: [
      "输入序列",
      "状态与转移特征",
      "全局条件概率",
      "参数学习",
      "序列解码",
    ],
    sources: [SOURCES.crf, SOURCES.statbook],
    artifact:
      "序列切分、特征模板、状态/转移分数、分区函数、梯度、参数、解码表、合法路径和序列级指标。",
    opening: "序列分类页保留标签之间的依赖，防止把逐点分类拼接成伪序列模型。",
  },
  "iml-12": {
    duty: "比较局部异常因子、单类SVM与密度比异常检测",
    question:
      "怎样在没有普通分类标签时定义参照邻域、支持区域或密度比，并控制异常率？",
    invariant: "参考样本、距离或核、邻居数、阈值选择和污染测试集固定",
    fault: "在含测试异常的全量数据上拟合尺度和阈值，造成评估泄漏",
    scenario:
      "对局部密度不同的数据比较LOF、单类SVM和密度比评分，并注入新型异常。",
    boundary: "异常检测按原版三类方法展开；业务规则另列，不能冒充学习算法。",
    stageNames: ["参考分布", "邻域/核表示", "异常分数", "阈值", "新型异常验证"],
    sources: [SOURCES.lof, SOURCES.densityRatio, SOURCES.statbook],
    artifact:
      "参考集、缩放、距离/核、邻居、局部密度、支持区域、密度比、阈值、误报漏报和新型异常。",
    opening:
      "异常检测页先冻结“正常参照”与阈值来源，再比较不同分数的局部和全局含义。",
  },
  "iml-13": {
    duty: "覆盖线性降维、PCA、LPP、核PCA与拉普拉斯特征映射",
    question:
      "怎样区分保方差、保局部邻域和核非线性目标，并验证嵌入没有偷看标签？",
    invariant: "预处理、邻接图、核、维数、拟合数据和外样本评估固定",
    fault: "在训练测试合并数据上拟合PCA或邻接图，再宣称下游泛化提高",
    scenario: "对弯曲流形数据比较PCA、LPP、核PCA和拉普拉斯特征映射的邻域保持。",
    boundary: "本章是无监督降维；标签驱动的判别降维留到第17章。",
    stageNames: [
      "中心化数据",
      "协方差/邻接图",
      "谱问题",
      "低维坐标",
      "外样本验证",
    ],
    sources: [
      SOURCES.kernelPca,
      SOURCES.lpp,
      SOURCES.laplacian,
      SOURCES.statbook,
    ],
    artifact:
      "预处理统计、协方差、邻接矩阵、核矩阵、特征值向量、维数、嵌入、邻域保持和外样本策略。",
    opening:
      "无监督降维页把每种方法保留的几何量写清，避免只凭二维图好看选择算法。",
  },
  "iml-14": {
    duty: "覆盖K均值、核K均值、谱聚类与参数自动选择",
    question:
      "怎样由距离、核或图拉普拉斯定义簇，并验证初始化和参数变化不会任意翻转结论？",
    invariant: "距离/核、簇数候选、初始化种子、停止条件和稳定性评估固定",
    fault: "只展示一次最漂亮初始化，忽略空簇、局部最优和参数敏感性",
    scenario: "对非凸簇数据比较K均值、核K均值和谱聚类，重复初始化并选择参数。",
    boundary: "本章限定原版聚类方法；自动选参必须保留候选与稳定性证据。",
    stageNames: ["样本相似度", "簇表示", "迭代/谱嵌入", "簇分配", "参数稳定性"],
    sources: [SOURCES.spectral, SOURCES.statbook],
    artifact:
      "距离/核/图、簇数、初始化、质心或谱向量、目标轨迹、停止条件、分配、稳定性和失败初始化。",
    opening: "聚类页把一次颜色分组升级为多初始化、参数和稳定性实验。",
  },
  "iml-15": {
    duty: "覆盖被动攻击学习与适应正则化在线更新",
    question:
      "怎样让每个样本到达后只更新一次，并用累计错误、间隔和不确定性解释在线行为？",
    invariant: "样本顺序、初值、更新规则、间隔、不确定性和预quential评估固定",
    fault: "训练后回看同一流并报告批量准确率，丢失在线决策时点",
    scenario: "让带漂移的样本流依次进入PA与AROW，先预测再更新并记录累计错误。",
    boundary: "本章按原版两种在线算法讲；离线多轮训练不能冒充在线证据。",
    stageNames: [
      "样本到达",
      "更新前预测",
      "间隔/置信度",
      "参数更新",
      "累计评估",
    ],
    sources: [SOURCES.pa, SOURCES.arow],
    artifact:
      "样本顺序、时间戳、更新前预测、损失、步长、协方差/置信度、参数版本、累计错误和漂移点。",
    opening: "在线学习页严格按“先预测、后见标签、再更新”的时间顺序记录证据。",
  },
  "iml-16": {
    duty: "覆盖流形构造、拉普拉斯正则最小二乘求解与几何解释",
    question:
      "怎样证明无标签样本提供的是输入空间几何，而不是把测试信息泄漏给标签预测？",
    invariant: "有/无标签集合、图构造、核、正则强度、求解和外部测试固定",
    fault: "把测试样本纳入流形图和选参后再报告测试提升",
    scenario: "用少量标签和大量无标签双月数据建立图，比较监督基线与流形正则。",
    boundary: "本章限定拉普拉斯正则最小二乘；伪标签等后续方法另列扩展。",
    stageNames: [
      "有/无标签数据",
      "邻接流形",
      "拉普拉斯正则",
      "联合求解",
      "外部测试",
    ],
    sources: [SOURCES.manifold, SOURCES.statbook],
    artifact:
      "数据角色、邻接规则、图拉普拉斯、核、监督/几何正则、线性系统、预测、基线和外部测试。",
    opening:
      "半监督页把无标签信息限定为几何约束，并用完全隔离的测试集守住边界。",
  },
  "iml-17": {
    duty: "比较判别分析与充分降维的监督目标和维数选择",
    question: "怎样利用标签寻找判别子空间，同时避免把类间分离图误作泛化证据？",
    invariant: "训练标签、散度/充分性目标、维数候选、分类器和嵌套验证固定",
    fault: "先在全量标签上选投影，再对同一数据交叉验证分类器",
    scenario:
      "对高维多类数据比较无监督PCA、判别分析与充分降维，并嵌套选择维数。",
    boundary: "本章是监督降维，与第13章无标签几何目标分开。",
    stageNames: [
      "带标签样本",
      "监督目标",
      "谱/优化求解",
      "低维表示",
      "嵌套分类验证",
    ],
    sources: [SOURCES.statbook, SOURCES.author],
    artifact:
      "标签切分、类内/类间量、充分性目标、投影、维数路径、下游分类器、内层选择和外层测试。",
    opening: "监督降维页把投影学习纳入验证折，堵住最常见的标签泄漏。",
  },
  "iml-18": {
    duty: "覆盖协变量移位与类别平衡变化下的迁移学习",
    question:
      "怎样识别源域与目标域变化类型，并通过重要性权重修正风险而不假设标签机制任意改变？",
    invariant:
      "源/目标采样、变化假设、密度比或类别先验、权重裁剪和目标验证固定",
    fault: "分布机制不满足协变量移位却直接套重要性权重，少数样本权重爆炸",
    scenario: "从源域训练并在目标域评估，分别模拟输入分布变化与类别比例变化。",
    boundary: "迁移学习按原版两类分布变化讲，不等同于现代预训练模型微调。",
    stageNames: [
      "源/目标样本",
      "变化假设",
      "密度比/先验",
      "加权风险",
      "目标域验证",
    ],
    sources: [SOURCES.covariateShift, SOURCES.densityRatio],
    artifact:
      "域标签、分布诊断、密度比或先验、权重分布与裁剪、有效样本量、加权损失、目标验证和假设反例。",
    opening: "迁移页先诊断哪一部分分布改变，再决定能否用重要性加权修正。",
  },
  "iml-19": {
    duty: "覆盖多任务最小二乘回归、概率分类与多维输出函数学习",
    question:
      "怎样证明任务共享带来可迁移结构，而不是大任务压制小任务或发生标签泄漏？",
    invariant: "任务边界、共享/私有参数、任务权重、联合目标和按任务验证固定",
    fault: "按样本量直接合并任务，主任务指标提升却牺牲小任务且无独立基线",
    scenario: "对相关的多个回归与概率分类任务比较独立、完全共享和结构化共享。",
    boundary:
      "本章按经典联合学习讲共享结构；多智能体或提示多任务不属于原版19章。",
    stageNames: [
      "任务集合",
      "共享结构",
      "任务专属参数",
      "联合优化",
      "逐任务验证",
    ],
    sources: [SOURCES.multitask, SOURCES.statbook],
    artifact:
      "任务定义、样本量、共享矩阵、私有参数、任务权重、联合损失、独立基线、逐任务指标和负迁移样本。",
    opening:
      "多任务页要求每个任务都有独立基线，只有共享结构改善而非吞没任务时才接受迁移。",
  },
  "iml-20": {
    duty: "总结最小二乘主线及监督、无监督、新兴算法之间的选择边界",
    question:
      "怎样从任务假设和证据选择方法，并把无法满足的前提登记成下一步研究问题？",
    invariant: "任务、数据分布、模型假设、目标、验证与失败边界完整回收",
    fault: "用单一排行榜给所有任务排序，忽略标签、分布、序列、在线与迁移前提",
    scenario:
      "给定一个含少量标签、异常和分布漂移的新问题，逐层排除不满足前提的方法。",
    boundary: "展望按2013时间点阅读；后续发展只作带日期的独立回看。",
    stageNames: [
      "任务复述",
      "假设清单",
      "候选方法",
      "证据比较",
      "结论与开放问题",
    ],
    sources: [SOURCES.publisher, SOURCES.author, SOURCES.statbook],
    artifact:
      "88层级检查、任务与分布、候选假设、基线、风险与约束、验证结果、失败方法、时间标签和开放问题。",
    opening: "总结页不再罗列算法，而是用前提—证据—反例回收全书选择逻辑。",
  },
  finalReview: {
    title: "《图解机器学习》综合复核：从风险最小化到分布变化",
    duty: "用冻结数据串联88层级、监督/无监督、新兴算法与2013时间边界",
    question:
      "怎样证明学习者能由问题选择模型、目标与验证，而不是把22页变成算法名词表？",
    invariant:
      "任务、数据角色、分布假设、模型、损失、约束、求解、选择和独立测试闭环",
    fault:
      "只提交最终指标，没有数据切分、目标、超参数选择、反例、分布诊断和复现工件",
    scenario:
      "综合处理一套带标签、无标签、异常与目标域样本，逐项决定可用算法并保存拒绝理由。",
    boundary:
      "总复习只验收原版88层级与明确的现代核验，新增算法不计入原版覆盖率。",
    stageNames: [
      "冻结任务与数据",
      "声明模型假设",
      "拟合目标与约束",
      "选择与反例",
      "独立测试归档",
    ],
    sources: [
      SOURCES.publisher,
      SOURCES.statbook,
      SOURCES.lasso,
      SOURCES.svm,
      SOURCES.manifold,
      SOURCES.covariateShift,
    ],
    artifact:
      "88层级矩阵、数据卡、模型和目标、参数路径、求解日志、嵌套选择、无监督稳定性、分布变化、测试结果和环境锁。",
    opening:
      "综合复核把20章压到同一条风险与验证证据链，同时保留各方法不可互换的前提。",
  },
};

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const previousManifest = manifestDocument.books[BOOK];
if (!previousManifest) throw new Error(`缺少 ${BOOK} fidelity manifest`);
const unitTitles = previousManifest.units.map((unit) => unit.title);

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
      /第[IVX]+部分|什么是机器学习|学习的种类|任务的例子|机器学习的方法/,
      [
        "由问题、数据角色与反馈定义学习任务",
        "样本、输出、监督、损失、基线与指标",
        "先选算法再改写问题",
      ],
    ],
    [
      /学习模型|线性模型|核模型|层级模型/,
      [
        "声明函数族、表示与复杂度",
        "特征、核矩阵、层级结构、参数与验证风险",
        "训练误差替代模型选择",
      ],
    ],
    [
      /最小二乘学习法|最小二乘解|大规模数据/,
      [
        "最小化残差平方和并稳定求解",
        "设计矩阵、秩、条件数、求解器、残差与留出误差",
        "病态求逆仍报告单次系数",
      ],
    ],
    [
      /部分空间约束|l2约束|模型选择/,
      [
        "以可行集合或l2惩罚控制模型",
        "约束、正则路径、嵌套验证和最终测试",
        "测试集参与强度选择",
      ],
    ],
    [
      /稀疏学习|l1约束|lp约束|特征选择/,
      [
        "以非光滑约束产生稀疏解",
        "标准化、正则路径、支持集、KKT残差与稳定性",
        "全量筛特征造成泄漏",
      ],
    ],
    [
      /鲁棒学习|l1损失|Huber|图基损失/,
      [
        "限制大残差对参数的影响",
        "污染机制、损失、影响权重、参数和对照误差",
        "删除困难样本冒充鲁棒",
      ],
    ],
    [
      /最小二乘分类|0[/]1损失|多类别/,
      [
        "把连续分数映射为类别决策",
        "编码、分数、阈值、间隔、混淆矩阵与多类规则",
        "回归误差直接等同分类质量",
      ],
    ],
    [
      /支持向量|间隔最大化|Hinge|Ramp|核映射/,
      [
        "通过间隔约束与损失学习分类边界",
        "核、C、对偶、KKT、支持向量、间隔与验证曲线",
        "未缩放或测试集选核参数",
      ],
    ],
    [
      /集成分类|剪枝|Bagging|Boosting/,
      [
        "通过剪枝、重采样或顺序加权组合分类器",
        "采样索引、样本权重、成员预测、组合与袋外误差",
        "只展示最好一轮训练结果",
      ],
    ],
    [
      /概率分类|Logistic|最小二乘概率/,
      [
        "输出并校准类别概率",
        "链接函数、概率和、损失、阈值、Brier与校准图",
        "任意分数归一化即称概率",
      ],
    ],
    [
      /序列数据|条件随机场|标签序列/,
      [
        "联合建模状态与转移以预测序列",
        "特征模板、分区函数、梯度、动态规划与序列指标",
        "逐点贪心替代全局解码",
      ],
    ],
    [
      /异常检测|局部异常因子|支持向量机异常|密度比/,
      [
        "由参照分布产生异常分数与阈值",
        "邻域、核、密度比、阈值、误报漏报和新型异常",
        "测试异常参与拟合尺度与阈值",
      ],
    ],
    [
      /无监督降维|线性降维|主成分|局部保持|核函数主成分|拉普拉斯特征/,
      [
        "以方差或邻域几何构造低维表示",
        "协方差、图、核、谱解、嵌入与外样本验证",
        "合并测试数据拟合投影",
      ],
    ],
    [
      /聚类|K均值|谱聚类|调整参数/,
      [
        "由距离、核或图定义簇结构",
        "相似度、初始化、目标轨迹、谱向量、分配与稳定性",
        "挑一次漂亮初始化",
      ],
    ],
    [
      /在线学习|被动攻击|适应正则化/,
      [
        "按先预测后更新处理样本流",
        "顺序、更新前预测、间隔、步长、置信度与累计错误",
        "离线多轮训练冒充在线",
      ],
    ],
    [
      /半监督|流形构造|拉普拉斯正则/,
      [
        "用无标签输入几何约束监督函数",
        "数据角色、邻接图、拉普拉斯、正则、求解与外部测试",
        "测试样本进入流形和选参",
      ],
    ],
    [
      /监督降维|判别分析|充分降维/,
      [
        "利用标签寻找判别或充分子空间",
        "类内外量、目标、投影、维数路径与嵌套验证",
        "全量标签先选投影",
      ],
    ],
    [
      /迁移学习|协变量移位|类别平衡/,
      [
        "诊断分布变化并用重要性权重修正风险",
        "域、变化假设、密度比、权重、有效样本量与目标验证",
        "假设不成立仍强行加权",
      ],
    ],
    [
      /多任务学习|多维输出/,
      [
        "以共享结构联合学习相关任务",
        "任务边界、共享/私有参数、任务权重、联合损失与逐任务指标",
        "大任务吞没小任务",
      ],
    ],
    [
      /总结与展望/,
      [
        "以假设、证据与反例选择方法",
        "层级检查、任务、分布、模型、风险、验证和开放问题",
        "单一排行榜覆盖所有任务",
      ],
    ],
  ];
  return (
    rules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把原版层级转成可检验统计学习任务",
      "输入、假设、目标、求解、验证与反例",
      "标题出现但没有实验验收",
    ]
  );
}

function termFor(concept, index) {
  const short = concept
    .replace(/^第[IVX]+部分\s*/, "")
    .replace(/^第\d+章\s*/, "")
    .replace(/^\d+(?:\.\d+)*\s*/, "")
    .split(/[；;：:——,，]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 18
    ? short
    : `统计坐标${index + 1}`;
}

function displayConcept(concept) {
  return concept.replace(/(?<=\d)\.(?=\d)/g, "．");
}

function enrichProfile(key, specification, role, unit = null) {
  const chapterPath = PATHS[key];
  const concepts = unit
    ? unit.concepts.map((group) => group.join("；"))
    : unitTitles;
  const title = specification.title ?? unit?.title;
  const stageDetails = [
    [
      "冻结的问题、样本与数据角色",
      "登记单位、切分、分布和形状",
      "可追溯样本",
      "数据卡、索引与哈希",
    ],
    [
      "上一步输入与候选函数族",
      `执行“${title}”的表示或模型变换`,
      "预测、表示或相似度",
      "参数、核、图或中间量",
    ],
    [
      "模型输出、标签或结构",
      "计算风险、约束或概率目标",
      "目标值与可行状态",
      "损失分解、约束残差与对照",
    ],
    [
      "目标、参数与候选超参数",
      "只改变预注册变量并求解",
      "拟合参数或结构",
      "迭代、数值容差与选择轨迹",
    ],
    [
      "冻结模型与独立样本",
      "按预注册协议评估并保存反例",
      "接受、修正或拒绝",
      "指标、稳定性、失败样本与环境锁",
    ],
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
    stages: specification.stageNames.map((name, index) => ({
      name,
      input: `${title}：${stageDetails[index][0]}`,
      transform: `${stageDetails[index][1]}，并守住“${specification.invariant}”`,
      output: stageDetails[index][2],
      evidence: `${stageDetails[index][3]}；若出现“${specification.fault}”就保留失败运行`,
    })),
    cases: [
      {
        name: "基线样本",
        condition: `${specification.scenario} 使用冻结训练/验证/测试角色。`,
        prediction: `沿“${specification.stageNames.join(" → ")}”形成预注册输出。`,
        target: `满足“${specification.invariant}”。`,
        contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
      },
      {
        name: "边界样本",
        condition: `${specification.scenario} 其余条件不变，只注入“${specification.fault}”。`,
        prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
        target: "保留该样本，不在观察结果后重写切分或目标。",
        contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
      },
    ],
    normalTrace: [
      `为“${title}”冻结任务、数据角色、分布假设、代码、环境和随机种子`,
      `执行${specification.stageNames.slice(0, 2).join("、")}，保存输入、表示与模型状态`,
      `推进${specification.stageNames.slice(2, 4).join("、")}，记录目标、约束、参数和选择轨迹`,
      `在${specification.stageNames[4]}交付${specification.artifact}`,
    ],
    failureTrace: [
      `“${title}”复用相同任务、数据角色、分布、代码、环境和种子`,
      `只注入单一反例：${specification.fault}`,
      `沿“${specification.stageNames.join(" → ")}”定位第一处假设、数值或边界偏离`,
      `撤销反例并重放；仅当“${specification.invariant}”恢复才接受修正`,
    ],
  };
}

const profiles = [
  enrichProfile("learningMap", PAGE_SPECS.learningMap, "learning-map"),
  ...previousManifest.units.map((unit) =>
    enrichProfile(unit.id, PAGE_SPECS[unit.id], "chapter", unit),
  ),
  enrichProfile("finalReview", PAGE_SPECS.finalReview, "final-review"),
];
if (profiles.length !== 22) throw new Error("课程必须恰好为22页");

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并把2013原版范围、独立论文核验与当前迁移分层
- 能先预测“${profile.question}”的五阶段统计链，再用输入、目标、求解、验证与反例逐层复核
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、修正或拒绝学习结论

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个统计学习任务开始

${profile.opening} “${profile.title}”的贯穿任务是：${profile.scenario} 操作前必须写下哪个模型状态、风险项或验证结果会先变化，运行后再补理由不算预测。

本页围绕“${profile.question}”建立基线、边界反例与恢复路径。只有“${profile.title}”守住“${profile.invariant}”并交付${profile.artifact}，最终指标才构成统计学习证据。

## 书目、88个原版层级与独立重写边界

[讲谈社官方书页](${SOURCES.publisher})确认杉山将《イラストで学ぶ 機械学習》于2013年出版、232页、ISBN 9784061538214，并公开6部分20章；[中文版目录与书目](${SOURCES.chinese})用于交叉核对许永伟译、人民邮电出版社2015年版及62个编号小节。覆盖分母为6部分、20章和62个编号小节，共88个原版目录层级。

“${profile.title}”未取得原书完整正文，只以权威目录限定范围；中文解释、图示结构、交互、实验、练习与答案均为独立教学重写。${profile.boundary}

本页另以${links}核对算法机制。论文、作者与出版社资料能验证定义、假设或历史事实，不能反向证明原书正文采用了本站表述。`;
}

const paragraphPatterns = [
  (profile, concept, mechanism, evidence, caution, index) =>
    `在“${profile.title}”的坐标${index + 1}中，目录项「${concept}」用于${mechanism}；先冻结数据角色，再以${evidence}复核，出现${caution}时撤回结论。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `目录项「${concept}」进入“${profile.title}”后要回答第${index + 1}个问题：它怎样${mechanism}、优化什么、由哪些${evidence}证明，并如何排除${caution}。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `围绕“${profile.question}”，原版层级${index + 1}把「${concept}」解释为${mechanism}；复核者先读取${evidence}，不能接受${caution}。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `对“${profile.title}”而言，目录项「${concept}」的最小合同是${mechanism}，第${index + 1}次检查保存${evidence}；若产生${caution}，就返回上游重放。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `第${index + 1}个正式坐标「${concept}」服务于${profile.duty}，需要以${evidence}呈现${mechanism}；${caution}会破坏“${profile.invariant}”。`,
  (profile, concept, mechanism, evidence, caution) =>
    `学习者在“${profile.title}”讨论「${concept}」前预测${mechanism}会改变哪项统计量，再读取${evidence}；观察到${caution}时保留失败轨迹。`,
];

function conceptsSection(profile) {
  return `## 原版目录层级与统计机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept);
    const term = termFor(concept, index);
    const displayedConcept = displayConcept(concept);
    const definition = `${term}对应原版目录坐标“${concept}”，在“${profile.title}”中用于${mechanism}，并受数据角色、分布假设、目标、求解与验证边界约束。`;
    const paragraph = paragraphPatterns[index % paragraphPatterns.length](
      profile,
      displayedConcept,
      mechanism,
      evidence,
      caution,
      index,
    );
    return `### ${concept}

<Term def=${JSON.stringify(definition)}>${term}</Term>

**原版坐标 ${index + 1}/${profile.concepts.length}。** ${paragraph}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个章专属实验

<Callout type="info" title="先写出哪个统计量会先变化">
  对“${profile.title}”先冻结任务、数据角色、分布假设、代码、环境与种子，再操作模型空间、拟合轨迹和验证门；结果与预测不一致时修改假设，不删除失败样本。
</Callout>

<Stepper>
  <Step title="1. 模型空间与风险贡献">
    固定“${profile.scenario}”，在基线与边界样本间切换，逐一查看“${profile.stageNames.join("、")}”的输入、变换、输出与证据。

    <${profile.componentBase}ModelSpaceLab />
  </Step>
  <Step title="2. 正常拟合与边界反例">
    保持任务与初态不变，只注入“${profile.fault}”，逐步定位第一个偏离“${profile.invariant}”的阶段。

    <${profile.componentBase}FitTraceLab />
  </Step>
  <Step title="3. 独立验证发布门">
    分别锁定数据角色、目标与约束、基线与消融、复现与分布边界，展开${profile.artifact}后决定是否接受。

    <${profile.componentBase}ValidationGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页单一反例：${profile.fault}">
  “${profile.title}”遇到该反例时保持任务、数据角色、代码、环境与种子不变，沿五阶段寻找最早偏离；最终指标偶尔变好不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="训练风险不等于独立泛化">
  ${profile.scenario} 在拟合样本上成功，只证明优化路径能运行；“${profile.title}”仍需冻结验证、测试、分布变化和失败样本。
</Callout>

<Callout type="trap" title="现代实现不能倒填2013原书">
  “${profile.title}”引用现行资料是为了核对机制与迁移；新增框架、算法和工程惯例必须带独立标签，不能伪装成原版88层级。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放统计协议

| 阶段 | 学习动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stageNames
  .map(
    (stage, index) =>
      `| ${stage} | 在“${profile.title}”执行${stage}，一次只改变预注册变量 | ${index === 0 ? "任务、样本角色、分布、版本与输入" : index === 4 ? "独立指标、稳定性、反例与环境" : "表示、模型、风险、约束、参数或求解轨迹"} | ${index === 0 ? "数据角色或假设不可追溯" : index === 4 ? "无法独立重放或解释失败" : profile.fault} |`,
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

该协议要求“${profile.title}”在相同任务、数据角色、分布、代码、环境和种子下重放。重置后若样本情形、阶段、拟合模式、步骤、验证门或证据包没有回到基线，交互状态已经污染比较，不能作为结论。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>对应“${concept}”；在“${profile.title}”中用于${mechanism}，需要连接原版范围、统计假设与独立验证。</GlossaryItem>`;
    })
    .join("\n");
  const conceptList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. “${profile.title}”的目录项「${displayConcept(concept)}」：以“${mechanism}”解释作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是记住算法名，而是能围绕“${profile.question}”重建统计假设、风险与验证，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：统计合同。** “${profile.title}”为什么必须先冻结任务、数据角色、分布假设、代码、环境与种子？

<Answer>
  ${profile.scenario} 若这些条件变化，相同指标可能来自不同样本、目标、模型或选择路径；“${profile.title}”先冻结合同，才能把观测连接到单一机制。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明原版目录坐标已经进入机制、交互和练习？

<Answer>
${conceptList}
</Answer>

3. **问题 3：反例恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一任务、数据角色、分布、代码、环境和种子，重放基线后只注入“${profile.fault}”；记录最早偏离，撤销反例再运行。只有模型空间、拟合轨迹、验证门和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="杉山将《イラストで学ぶ 機械学習》／许永伟译《图解机器学习》"
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
    normalTrace: profile.normalTrace,
    failureTrace: profile.failureTrace,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    gates: [
      {
        label: "数据角色与分布",
        detail: `“${profile.title}”的训练、验证、测试、源域、目标域或无标签角色可追溯。`,
      },
      {
        label: "目标与约束",
        detail: `“${profile.title}”的损失、正则、概率或几何目标经过数值核对。`,
      },
      {
        label: "基线与选择",
        detail: `“${profile.title}”保留简单基线，超参数只在预注册验证层选择。`,
      },
      {
        label: "复现与反例",
        detail: `“${profile.title}”归档环境、种子、失败样本和分布假设反例。`,
      },
    ],
  };
  return `"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies StatisticalLearningEvidenceModel;

export function ${profile.componentBase}ModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function ${profile.componentBase}FitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function ${profile.componentBase}ValidationGateLab() {
  return <StatisticalLearningEvidenceLab model={model} view="validation-gate" />;
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
import { ${profile.componentBase}ModelSpaceLab, ${profile.componentBase}FitTraceLab, ${profile.componentBase}ValidationGateLab } from "@/components/mdx/${BOOK}/v2/${slug}";

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
    description: `${profile.duty}；用模型空间、单反例拟合轨迹和独立验证门完成复核。`,
    demo: true,
    math: true,
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
const partHeadings = allConcepts.filter((item) =>
  /^第[IVX]+部分/.test(item),
).length;
const chapterHeadings = allConcepts.filter((item) =>
  /^第\d+章/.test(item),
).length;
const numberedSections = allConcepts.filter((item) =>
  /^\d+\.\d+/.test(item),
).length;
const catalogLevels = allConcepts.length;
if (
  partHeadings !== 6 ||
  chapterHeadings !== 20 ||
  numberedSections !== 62 ||
  catalogLevels !== 88
) {
  throw new Error(
    `目录口径应为6部分+20章+62编号小节=88层级，实际${partHeadings}+${chapterHeadings}+${numberedSections}=${catalogLevels}`,
  );
}

manifestDocument.books[BOOK] = {
  ...previousManifest,
  sourceKind:
    "official-original-publisher-complete-six-part-twenty-chapter-outline-cross-checked-with-sixty-two-numbered-section-chinese-toc-and-primary-research-author-sources",
  sourceUrl: SOURCES.publisher,
  secondarySourceUrls: [SOURCES.chinese, ...Object.values(SOURCES).slice(2)],
  status: "verified-outline",
  verifiedAt: "2026-07-30",
  disclosureNote:
    "讲谈社官方页面确认杉山将原版、2013年232页、ISBN 9784061538214及6部分20章结构；中文版目录和书目用于交叉核对许永伟译、人民邮电出版社2015年版及62个编号小节。覆盖分母为6部分、20章和62个编号小节，共88个原版目录层级。课程按20章逐一覆盖，另设学习地图与综合复核，共22页、66个章专属交互。未取得原书完整正文，全部解释、实验、交互、练习与答案均为独立教学重写。旧页遗漏的约束最小二乘、稀疏/鲁棒学习、序列分类、异常检测、无监督降维、在线、半监督、监督降维、迁移和多任务学习已经恢复；现代实现只作独立迁移说明。",
  units: previousManifest.units.map((unit) => ({
    ...unit,
    chapterPath: PATHS[unit.id],
  })),
  metrics: {
    formalUnits: chapterHeadings,
    partHeadings,
    numberedSections,
    formalNodes: catalogLevels,
    coursePages: profiles.length,
    interactiveViews: profiles.length * 3,
    reviewQuestions: profiles.length * 3,
  },
  sourceAccess: "outline-only",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/illustrated-ml-v2-profiles.json",
  factSourcePolicy:
    "讲谈社目录与中文版目录只限定6部分、20章、62编号小节和2013语境；算法事实以杉山将作者资料、统计机器学习专著及Lasso、Huber、SVM、Bagging、Boosting、CRF、LOF、密度比、核PCA、LPP、拉普拉斯特征映射、谱聚类、PA、AROW、流形正则、协变量偏移和多任务学习原始论文核对。现代资料不得反写原版。",
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
      outlineSources: [SOURCES.publisher, SOURCES.chinese],
      technicalSources: Object.values(SOURCES).slice(2),
      officialParts: partHeadings,
      officialUnits: chapterHeadings,
      officialNumberedSections: numberedSections,
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
  `已重建 ${profiles.length} 页，覆盖${partHeadings}部分+${chapterHeadings}章+${numberedSections}编号小节=${catalogLevels}个原版层级，生成 ${profiles.length * 3} 个交互视图。`,
);
