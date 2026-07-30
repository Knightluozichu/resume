import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "machine-learning-watermelon";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/machine-learning-watermelon/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/machine-learning-watermelon-v2-profiles.json",
);

const SOURCES = {
  publisher: "https://www.tup.tsinghua.edu.cn/bookscenter/book_06402703.html",
  author:
    "https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/MLbook2016.htm",
  toc: "https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/Book2016toc.pdf",
  esl: "https://hastie.su.domains/ElemStatLearn/",
  modelSelection: "https://scikit-learn.org/stable/model_selection.html",
  metrics: "https://scikit-learn.org/stable/modules/model_evaluation.html",
  linear: "https://scikit-learn.org/stable/modules/linear_model.html",
  tree: "https://scikit-learn.org/stable/modules/tree.html",
  backprop: "https://doi.org/10.1038/323533a0",
  svm: "https://doi.org/10.1007/BF00994018",
  bayes: "https://scikit-learn.org/stable/modules/naive_bayes.html",
  boosting: "https://doi.org/10.1006/jcss.1997.1504",
  clustering: "https://scikit-learn.org/stable/modules/clustering.html",
  decomposition: "https://scikit-learn.org/stable/modules/decomposition.html",
  lasso: "https://doi.org/10.1111/j.2517-6161.1996.tb02080.x",
  pac: "https://doi.org/10.1145/1968.1972",
  semiSupervised:
    "https://mitpress.mit.edu/9780262033589/semi-supervised-learning/",
  pgm: "https://mitpress.mit.edu/9780262013192/probabilistic-graphical-models/",
  ruleLearning: "https://doi.org/10.1007/3-540-57868-4_57",
  rl: "http://incompleteideas.net/book/the-book-2nd.html",
  numpyLinearAlgebra:
    "https://numpy.org/doc/stable/reference/routines.linalg.html",
  scipyOptimize: "https://docs.scipy.org/doc/scipy/tutorial/optimize.html",
  scipyStats: "https://docs.scipy.org/doc/scipy/tutorial/stats.html",
};

const PATHS = {
  learningMap: "00-guide/mlw-official-learning-map",
  "mlw-01": "01-foundations/mlw-01-introduction",
  "mlw-02": "01-foundations/mlw-02-model-assessment-selection",
  "mlw-03": "01-foundations/mlw-03-linear-models",
  "mlw-04": "02-core-models-a/mlw-04-decision-trees",
  "mlw-05": "02-core-models-a/mlw-05-neural-networks",
  "mlw-06": "02-core-models-a/mlw-06-support-vector-machines",
  "mlw-07": "02-core-models-a/mlw-07-bayesian-classifiers",
  "mlw-08": "03-core-models-b/mlw-08-ensemble-learning",
  "mlw-09": "03-core-models-b/mlw-09-clustering",
  "mlw-10": "03-core-models-b/mlw-10-dimensionality-reduction-metric-learning",
  "mlw-11": "04-advanced-a/mlw-11-feature-selection-sparse-learning",
  "mlw-12": "04-advanced-a/mlw-12-computational-learning-theory",
  "mlw-13": "04-advanced-a/mlw-13-semi-supervised-learning",
  "mlw-14": "05-advanced-b/mlw-14-probabilistic-graphical-models",
  "mlw-15": "05-advanced-b/mlw-15-rule-learning",
  "mlw-16": "05-advanced-b/mlw-16-reinforcement-learning",
  "mlw-app": "06-appendices/mlw-appendices",
  finalReview: "07-review/mlw-official-final-review",
};

const PAGE_SPECS = {
  learningMap: {
    title: "《机器学习》128个原版目录层级学习地图",
    duty: "沿基础、经典方法、进阶主题与数学附录恢复16章108节和A/B/C附录",
    question:
      "怎样把一张机器学习地形图变成数据、假设、优化和独立评估相互约束的学习路线？",
    invariant:
      "16章、108个编号小节、附录标题及A/B/C逐项覆盖，训练信息不得穿越到验证或测试角色",
    fault:
      "只保留常见算法清单，遗漏评估、学习理论、半监督、图模型、规则学习和数学前提",
    scenario:
      "为一批西瓜样本建立从任务定义、模型比较到独立测试的研究档案，并逐章登记可复现实验。",
    boundary:
      "原书是2016年入门教科书；后续深度学习与生成式模型只作带日期扩展，不计入原版覆盖率。",
    stageNames: [
      "任务与样本",
      "假设与表示",
      "拟合与搜索",
      "评估与比较",
      "归档与复现",
    ],
    sources: [SOURCES.publisher, SOURCES.author, SOURCES.toc, SOURCES.esl],
    artifact:
      "128层目录矩阵、样本角色表、特征与目标、候选假设、训练轨迹、验证决策、测试报告、失败样本和复现清单。",
    opening:
      "学习地图首先恢复原书从评估到理论的完整结构，算法名称只在实验合同中获得意义。",
  },
  "mlw-01": {
    duty: "界定样本、属性、标记、假设空间、归纳偏好与机器学习发展坐标",
    question:
      "怎样从一个经验任务定义可学习对象，并说明有限数据为何不能唯一决定未见样本的答案？",
    invariant:
      "任务、样本空间、特征、目标、假设空间、归纳偏好和评估对象在学习前明确",
    fault: "用测试结果反向挑选归纳偏好，再声称该偏好由训练数据自然推出",
    scenario:
      "把西瓜好坏判断写成监督学习任务，同时构造两个训练集上一致、未见样本上分歧的假设。",
    boundary:
      "本章按原书2016年的术语与学科地图解释；当前基础模型不替代归纳偏好问题。",
    stageNames: ["任务声明", "样本与属性", "假设空间", "归纳偏好", "泛化证据"],
    sources: [SOURCES.author, SOURCES.toc, SOURCES.esl],
    artifact:
      "任务卡、样本表、属性类型、标记定义、候选假设、版本空间、偏好声明、反例和泛化边界。",
    opening: "绪论页不从模型排行榜开始，而从学习问题中哪些对象已经被定义开始。",
  },
  "mlw-02": {
    duty: "覆盖经验误差、过拟合、评估方法、性能度量、比较检验与偏差方差",
    question:
      "怎样让模型选择只使用训练与验证信息，并把最终测试留给一次独立估计？",
    invariant:
      "数据角色、重采样索引、度量方向、显著性方案和最终测试时机预先冻结",
    fault: "反复查看测试集并据此调参，最后仍把同一测试分数当无偏泛化估计",
    scenario:
      "对三个分类器执行分层交叉验证，比较AUC与错误率，再锁定模型做一次测试。",
    boundary:
      "原书统计比较流程保留其假设；现代自动调参也不能豁免独立测试边界。",
    stageNames: ["角色切分", "重采样计划", "度量计算", "统计比较", "一次测试"],
    sources: [SOURCES.author, SOURCES.modelSelection, SOURCES.metrics],
    artifact:
      "实体分组、随机种子、折索引、预处理拟合范围、混淆矩阵、ROC/PR数据、检验假设、选择记录和测试封存。",
    opening: "评估页把“分数更高”拆成抽样设计、度量语义和不确定性三类证据。",
  },
  "mlw-03": {
    duty: "覆盖线性回归、对数几率回归、LDA、多分类与类别不平衡",
    question:
      "怎样把线性打分转换成回归或分类决策，并区分阈值、损失与数据分布变化？",
    invariant:
      "设计矩阵、尺度、目标编码、损失、正则、阈值和类别代价由训练协议决定",
    fault: "在测试标签上移动分类阈值以提高召回率，却仍报告原测试集性能",
    scenario:
      "用密度、含糖率和纹理特征拟合回归与二分类模型，再检查少数类代价。",
    boundary:
      "本章讲线性决策族；深层表示只能作为后续特征来源，不改写线性模型假设。",
    stageNames: ["设计矩阵", "目标与损失", "参数估计", "阈值决策", "残差诊断"],
    sources: [SOURCES.author, SOURCES.linear, SOURCES.metrics],
    artifact:
      "特征字典、尺度统计、设计矩阵、目标编码、系数、截距、损失曲线、阈值、代价矩阵和残差。",
    opening: "线性模型页要求每个系数、概率和阈值都有明确数据角色与决策语义。",
  },
  "mlw-04": {
    duty: "覆盖决策树流程、划分选择、剪枝、连续/缺失值与多变量树",
    question:
      "怎样逐节点证明划分增益来自训练数据，并让停止、缺失处理与剪枝可重放？",
    invariant: "候选属性、纯度准则、连续阈值、缺失分配、停止条件和剪枝集固定",
    fault: "用测试集选择剪枝强度或连续切分点，树变小但独立评估已经泄漏",
    scenario:
      "在西瓜数据上逐层生长分类树，记录每个候选划分并对比预剪枝与后剪枝。",
    boundary: "本章保留单树的局部贪心与剪枝机制；随机森林属于第8章集成语境。",
    stageNames: ["节点样本", "候选划分", "子节点生长", "剪枝比较", "路径解释"],
    sources: [SOURCES.author, SOURCES.tree, SOURCES.metrics],
    artifact:
      "节点样本ID、候选阈值、纯度变化、分支覆盖、缺失权重、停止理由、剪枝前后风险和决策路径。",
    opening: "决策树页保存每次分裂为何发生，而不是只展示一棵漂亮的终树。",
  },
  "mlw-05": {
    duty: "覆盖神经元、感知机、多层网络、反向传播、局部极小、常见网络与深度学习",
    question:
      "怎样沿张量形状、前向值、损失和梯度复核一次训练更新，并识别验证集过拟合？",
    invariant:
      "网络拓扑、初始化、激活、损失、优化器、批次顺序、种子和早停角色固定",
    fault: "每轮根据测试损失早停，再把最低测试损失当最终泛化结果",
    scenario:
      "训练一个小型多层感知机识别西瓜类别，检查梯度、学习曲线与不同初始化。",
    boundary:
      "原书只概述2016年前的深度学习；Transformer与生成模型另列现代扩展。",
    stageNames: [
      "张量与拓扑",
      "前向计算",
      "损失与反传",
      "参数更新",
      "验证早停",
    ],
    sources: [SOURCES.author, SOURCES.backprop, SOURCES.esl],
    artifact:
      "数据切分、张量形状、拓扑、初始化、激活、损失、梯度检查、批次、学习率、训练/验证曲线和检查点。",
    opening:
      "神经网络页把训练拆成可检查的数值步骤，最终准确率不能替代梯度与数据边界。",
  },
  "mlw-06": {
    duty: "覆盖间隔、对偶、核函数、软间隔、支持向量回归与核方法",
    question:
      "怎样从几何间隔构造约束优化，并证明核矩阵、支持向量和正则选择没有越界？",
    invariant: "特征尺度、核、超参数搜索域、对偶约束、训练索引和模型选择折固定",
    fault: "在全量含测试样本的数据上估计尺度与核宽度，导致间隔评估虚高",
    scenario: "对非线性西瓜边界比较线性核与RBF核，检查支持向量和软间隔违约。",
    boundary: "核技巧表示内积计算；它不意味着任意相似度都自动对应合法核。",
    stageNames: [
      "尺度与样本",
      "间隔原问题",
      "对偶与核",
      "软间隔求解",
      "支持向量复核",
    ],
    sources: [SOURCES.author, SOURCES.svm, SOURCES.esl],
    artifact:
      "缩放统计、核定义、Gram矩阵、C与核宽度搜索、拉格朗日乘子、KKT残差、支持向量和外推样本。",
    opening: "支持向量机页把决策边界还原为带约束的优化与核矩阵证据。",
  },
  "mlw-07": {
    duty: "覆盖贝叶斯决策、极大似然、朴素/半朴素分类、贝叶斯网与EM",
    question:
      "怎样从先验、似然和条件独立得到后验决策，并诊断零频与隐变量估计？",
    invariant: "变量域、先验、条件结构、平滑、缺失机制、初始化和收敛判据固定",
    fault: "用测试类别频率重估先验，或在零频时临时查看正确标签决定平滑",
    scenario: "对离散与连续西瓜属性比较朴素贝叶斯、半朴素结构和含隐变量的EM。",
    boundary:
      "贝叶斯分类器的概率模型与第14章通用图模型相连，但本章聚焦分类决策。",
    stageNames: ["变量与先验", "似然估计", "条件结构", "后验决策", "校准诊断"],
    sources: [SOURCES.author, SOURCES.bayes, SOURCES.pgm],
    artifact:
      "变量表、先验、条件频数、平滑常数、图结构、似然、EM下界轨迹、后验、校准曲线和零频反例。",
    opening:
      "贝叶斯页要求概率能追到计数、结构和假设，不能把归一化分数冒充可信后验。",
  },
  "mlw-08": {
    duty: "覆盖个体与集成、Boosting、Bagging、随机森林、结合策略与多样性",
    question:
      "怎样在相同训练角色下组合多个学习器，并区分误差降低来自强度还是多样性？",
    invariant:
      "基学习器、样本/特征抽样、权重更新、组合规则、种子和外部评估固定",
    fault: "先按测试集表现筛选成员再投票，把测试反馈伪装成集成多样性",
    scenario:
      "比较AdaBoost、Bagging和随机森林，追踪样本权重、袋外误差与成员相关性。",
    boundary:
      "原书集成以监督学习器组合为主；模型路由与基础模型编排不是原版第8章内容。",
    stageNames: [
      "基学习器合同",
      "重采样或加权",
      "成员训练",
      "组合决策",
      "多样性分析",
    ],
    sources: [SOURCES.author, SOURCES.boosting, SOURCES.esl],
    artifact:
      "成员配置、样本/特征索引、权重轨迹、随机种子、袋外预测、组合系数、成员错误矩阵和相关性。",
    opening: "集成页同时记录每个成员如何产生和如何组合，数量多不等于信息互补。",
  },
  "mlw-09": {
    duty: "覆盖聚类任务、性能度量、距离、原型/密度/层次聚类",
    question: "怎样先声明相似性与聚类用途，再比较结构稳定性而不偷看外部标签？",
    invariant: "特征尺度、距离、算法参数、初始化、簇数选择信息和稳定性方案固定",
    fault: "用真实类别反复选择簇数和距离，最后把外部一致性称为无监督发现",
    scenario: "对西瓜属性比较k均值、DBSCAN和层次聚类，注入尺度变化与离群点。",
    boundary:
      "外部标签可用于最终解释或外部度量，但若参与选型就必须承认监督信息进入。",
    stageNames: [
      "表示与距离",
      "结构假设",
      "聚类运行",
      "稳定性重采样",
      "外部解释",
    ],
    sources: [SOURCES.author, SOURCES.clustering, SOURCES.metrics],
    artifact:
      "特征尺度、距离矩阵、初始化、簇数/密度参数、成员分配、目标曲线、重采样一致性和外部标签使用记录。",
    opening: "聚类页让“相似”成为可审计选择，并把结构发现与标签验证严格分开。",
  },
  "mlw-10": {
    duty: "覆盖k近邻、低维嵌入、PCA、核化降维、流形学习与度量学习",
    question: "怎样证明邻域与低维表示只由允许数据拟合，并量化降维丢失了什么？",
    invariant: "尺度、邻域、目标维数、拟合样本、核/图参数和重构或邻域指标固定",
    fault: "在全量数据含测试点上拟合PCA或度量，再把下游测试提升归功于泛化",
    scenario: "对高维西瓜描述执行PCA与流形嵌入，再用k近邻比较邻域保持与分类。",
    boundary: "二维图只是一种投影证据；视觉分离不能单独证明高维预测可泛化。",
    stageNames: [
      "尺度与邻域",
      "低维目标",
      "投影或嵌入",
      "邻域复核",
      "下游评估",
    ],
    sources: [SOURCES.author, SOURCES.decomposition, SOURCES.esl],
    artifact:
      "拟合索引、尺度统计、协方差/核矩阵、特征值、嵌入坐标、重构误差、邻域保持率和下游冻结评估。",
    opening: "降维页要求同时观察保留结构与损失结构，不把二维散点图当结论。",
  },
  "mlw-11": {
    duty: "覆盖子集搜索、过滤式/包裹式/嵌入式选择、L1、字典学习与压缩感知",
    question: "怎样在嵌套评估中选择特征，并区分预测稀疏、表示稀疏与测量恢复？",
    invariant: "特征候选、搜索预算、选择评分、内外层切分、正则和稀疏阈值固定",
    fault: "先用全量标签筛特征再交叉验证，导致每一折的验证标签已经进入表示",
    scenario: "比较过滤、包裹与L1嵌入式选择，再用稀疏字典重构西瓜属性。",
    boundary: "L1产生稀疏解受设计矩阵与正则影响；系数为零不自动等于因果无关。",
    stageNames: ["候选特征", "内层选择", "稀疏拟合", "外层评估", "稳定性解释"],
    sources: [SOURCES.author, SOURCES.lasso, SOURCES.modelSelection],
    artifact:
      "特征清单、过滤统计、搜索路径、内外折索引、正则路径、非零支持集、字典与编码、选择稳定性和外层性能。",
    opening: "稀疏学习页把选择过程纳入评估折内，防止先看答案再压缩特征。",
  },
  "mlw-12": {
    duty: "覆盖PAC、有限假设空间、VC维、Rademacher复杂度与稳定性",
    question:
      "怎样从假设空间容量和随机抽样条件推出可陈述的泛化界，而不把上界当预测？",
    invariant: "学习设定、损失范围、分布假设、置信参数、容量量和样本独立性明确",
    fault: "忽略独立同分布或损失有界前提，直接用漂亮的界保证现实部署性能",
    scenario: "对有限分类器族和阈值族计算样本复杂度，比较经验误差与容量惩罚。",
    boundary:
      "理论上界解释最坏情形与依赖关系，不等同给定数据集上的精确误差预测。",
    stageNames: ["学习设定", "假设容量", "概率事件", "泛化界", "经验对照"],
    sources: [SOURCES.author, SOURCES.pac, SOURCES.esl],
    artifact:
      "样本空间、假设族、损失、分布与独立性声明、epsilon/delta、容量量、界计算、违反前提反例和经验曲线。",
    opening:
      "学习理论页先列定理成立条件，再计算界；省略量词会把数学保证改成营销口号。",
  },
  "mlw-13": {
    duty: "覆盖未标记样本、生成式方法、半监督SVM、图方法、分歧方法与半监督聚类",
    question:
      "怎样证明未标记数据在任务假设成立时提供信息，并在假设破裂时不会放大错误？",
    invariant:
      "标记/未标记来源、类先验、簇或流形假设、伪标记阈值和独立测试固定",
    fault: "未标记池来自不同分布却强制伪标记，错误不断自我强化且没有拒绝机制",
    scenario: "用少量标记西瓜与大量未标记样本比较生成式、图传播和协同训练。",
    boundary: "未标记样本不是免费标签；收益依赖结构假设与来源一致性。",
    stageNames: [
      "来源与角色",
      "结构假设",
      "未标记利用",
      "伪标记审计",
      "独立测试",
    ],
    sources: [SOURCES.author, SOURCES.semiSupervised, SOURCES.modelSelection],
    artifact:
      "标记/未标记ID、来源比较、类先验、图或视图、伪标记置信与迭代、拒绝样本、基线和测试差异。",
    opening:
      "半监督页把每个未标记样本如何改变决策边界记录下来，也保留负迁移证据。",
  },
  "mlw-14": {
    duty: "覆盖HMM、MRF、CRF、学习推断、近似推断与话题模型",
    question:
      "怎样用图结构表达条件独立，分别验证参数学习、精确或近似推断和预测？",
    invariant:
      "变量域、图结构、因子、参数、观测/隐变量角色、推断算法和收敛诊断固定",
    fault: "近似推断未收敛仍输出概率，并把算法误差误认为模型不确定性",
    scenario: "构建西瓜生长状态的HMM与属性MRF，对比消息传递和采样近似。",
    boundary: "图模型中的边表达因子化或依赖假设，不自动等于因果关系。",
    stageNames: [
      "变量与图",
      "因子与参数",
      "学习过程",
      "推断过程",
      "诊断与预测",
    ],
    sources: [SOURCES.author, SOURCES.pgm, SOURCES.esl],
    artifact:
      "变量表、图、因子、归一化检查、参数版本、观测证据、消息/样本轨迹、收敛诊断、边际概率和预测检验。",
    opening:
      "概率图模型页分开表示、学习与推断，避免一个“概率输出”掩盖三类错误。",
  },
  "mlw-15": {
    duty: "覆盖规则概念、序贯覆盖、剪枝、一阶规则与归纳逻辑程序设计",
    question:
      "怎样从覆盖样例学习可执行规则，并让规则顺序、例外、剪枝与逻辑背景可追踪？",
    invariant:
      "谓词词表、背景知识、覆盖语义、冲突顺序、停止/剪枝集和闭世界假设明确",
    fault: "用测试反例逐条修补规则，最终规则集看似准确却无法独立评估",
    scenario:
      "从西瓜正反例学习命题规则，再引入产地关系测试一阶规则与背景知识。",
    boundary:
      "可读规则不自动代表因果规律；解释范围受样例、谓词和背景知识限定。",
    stageNames: [
      "样例与谓词",
      "候选规则",
      "覆盖与冲突",
      "剪枝优化",
      "逻辑复核",
    ],
    sources: [SOURCES.author, SOURCES.ruleLearning, SOURCES.esl],
    artifact:
      "正反例ID、谓词定义、背景事实、规则版本、覆盖集合、冲突顺序、剪枝决策、未覆盖样本和反例。",
    opening:
      "规则学习页把每条规则连接到覆盖样例和例外，文字可读不是正确性的替代品。",
  },
  "mlw-16": {
    duty: "覆盖任务奖赏、K摇臂、有模型/免模型学习、值函数近似与模仿学习",
    question:
      "怎样区分环境动力学、行为策略与目标策略，并用回报和覆盖验证学习？",
    invariant: "状态、动作、奖赏、终止、折扣、探索策略、随机种子和评估回合固定",
    fault: "用评估回合继续探索和更新参数，再把在线适应后的回报当冻结策略性能",
    scenario:
      "让采摘代理先解决多臂赌博机，再在有限MDP中比较规划、Q学习与模仿。",
    boundary:
      "原书强化学习以表格方法和函数近似入门；现代大规模策略优化另作扩展。",
    stageNames: [
      "环境合同",
      "策略与探索",
      "交互采样",
      "价值或模型更新",
      "冻结评估",
    ],
    sources: [SOURCES.author, SOURCES.rl, SOURCES.esl],
    artifact:
      "MDP版本、状态动作、奖赏与终止、行为/目标策略、随机种子、轨迹、价值表/参数、覆盖率和冻结回报。",
    opening:
      "强化学习页把训练交互与冻结评估分开，回报必须能追到环境版本和策略状态。",
  },
  "mlw-app": {
    duty: "恢复矩阵、优化与概率分布三个数学附录的计算与数值边界",
    question:
      "怎样让矩阵形状、优化条件和概率归一化成为算法实验可执行的前置检查？",
    invariant:
      "维度、记号、定义域、数值精度、约束、随机变量支持集和归一化条件明确",
    fault: "矩阵维度或概率支持集错误却被广播和自动归一化掩盖，结果看似可运行",
    scenario:
      "为线性模型写一个数学预检器，逐项检查矩阵、梯度、约束与概率分布。",
    boundary:
      "附录提供入门所需工具，不替代线性代数、最优化和概率统计的系统课程。",
    stageNames: ["对象与维度", "代数变换", "优化条件", "概率检查", "数值验证"],
    sources: [
      SOURCES.author,
      SOURCES.numpyLinearAlgebra,
      SOURCES.scipyOptimize,
      SOURCES.scipyStats,
    ],
    artifact:
      "符号与形状表、矩阵秩、梯度/海塞检查、约束残差、支持集、概率和、随机种子、容差和边界输入。",
    opening:
      "数学附录页用可执行形状与约束检查连接公式和算法，避免记号正确但程序对象错误。",
  },
  finalReview: {
    title: "《机器学习》综合复核：从学习问题到独立测试",
    duty: "用一条研究证据链串联128个原版目录层级",
    question:
      "怎样证明模型改进来自声明的学习机制，而不是数据泄漏、选择偏差或评估复用？",
    invariant:
      "任务、数据角色、表示、假设、优化、选择、一次测试和复现档案首尾闭合",
    fault: "只保留最高测试分和最终模型，无法重放候选比较、失败实验与选择理由",
    scenario:
      "综合完成西瓜质量预测研究，从任务卡到一次测试，并对泄漏、分布漂移和错误标签注入故障。",
    boundary:
      "总复习验收2016原版128层级；当前工具只用于独立核验和实现，不倒填原书。",
    stageNames: [
      "任务与数据",
      "表示与假设",
      "训练与选择",
      "一次测试",
      "复现与迁移",
    ],
    sources: [
      SOURCES.publisher,
      SOURCES.author,
      SOURCES.toc,
      SOURCES.modelSelection,
    ],
    artifact:
      "128层覆盖表、任务与数据卡、切分哈希、流水线、候选模型、训练日志、验证决策、测试封存、错误分析和复现包。",
    opening:
      "综合复核不再奖励最高分，而要求每个结论都有未越界的数据角色和可重放路径。",
  },
};

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const previousManifest = manifestDocument.books?.[BOOK];
if (!previousManifest) throw new Error(`缺少 ${BOOK} fidelity manifest`);
if (
  !Array.isArray(previousManifest.units) ||
  previousManifest.units.length !== 17
) {
  throw new Error("原版目录必须包含16章与1个附录单元");
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
      /绪论|引言|基本术语|发展历程|应用现状/,
      [
        "声明学习任务、对象与学科坐标",
        "任务卡、样本空间、属性/标记与时间边界",
        "术语未定义或用当前能力倒填历史",
      ],
    ],
    [
      /假设空间|归纳偏好/,
      [
        "枚举数据不能排除的候选规律并声明选择偏好",
        "候选假设、版本空间、偏好与未见样本分歧",
        "根据测试答案挑偏好",
      ],
    ],
    [
      /经验误差|过拟合|评估方法|性能度量|比较检验|偏差与方差/,
      [
        "分离模型拟合、选择与泛化估计",
        "切分索引、度量语义、重采样结果与不确定性",
        "测试复用或度量方向混淆",
      ],
    ],
    [
      /线性回归|对数几率|线性判别|多分类|类别不平衡|基本形式/,
      [
        "由线性打分、损失和阈值形成回归或分类决策",
        "设计矩阵、系数、损失、阈值、代价与残差",
        "尺度、阈值或类别先验读取测试标签",
      ],
    ],
    [
      /决策树|基本流程|划分选择|剪枝|连续与缺失|多变量/,
      [
        "按纯度变化递归划分并用独立角色控制复杂度",
        "节点样本、候选阈值、增益、缺失权重与剪枝风险",
        "用测试集选择分裂或剪枝",
      ],
    ],
    [
      /神经元|感知机|多层网络|逆传播|局部极小|神经网络|深度学习/,
      [
        "沿前向、损失、反向和参数更新训练非线性表示",
        "张量形状、初始化、激活、梯度、曲线与检查点",
        "用测试损失早停或隐藏梯度异常",
      ],
    ],
    [
      /间隔|支持向量|对偶|核函数|软间隔|正则化|核方法/,
      [
        "把几何间隔转换为约束优化并通过核计算内积",
        "尺度、Gram矩阵、乘子、KKT残差与支持向量",
        "核参数或尺度在测试样本上拟合",
      ],
    ],
    [
      /贝叶斯|极大似然|朴素|EM算法/,
      [
        "由先验、似然和条件结构计算后验或隐变量估计",
        "频数、平滑、图结构、似然轨迹、后验与校准",
        "测试先验、零频窥标或EM未收敛",
      ],
    ],
    [
      /个体与集成|Boosting|Bagging|随机森林|结合策略|多样性/,
      [
        "通过重采样或加权产生成员并按声明规则组合",
        "成员索引、样本权重、袋外预测、组合系数与错误相关",
        "按测试表现筛选成员",
      ],
    ],
    [
      /聚类任务|聚类|距离计算|原型聚类|密度聚类|层次聚类/,
      [
        "依据声明的距离与结构假设发现样本分组",
        "尺度、距离矩阵、初始化、成员分配与稳定性",
        "偷看真实标签选择簇数或距离",
      ],
    ],
    [
      /k近邻|低维嵌入|主成分|核化线性降维|流形学习|度量学习/,
      [
        "构造邻域或低维表示并量化结构保留与信息损失",
        "拟合索引、协方差/核矩阵、嵌入、重构与邻域指标",
        "在测试样本上拟合投影或度量",
      ],
    ],
    [
      /子集搜索|过滤式|包裹式|嵌入式|L1|稀疏|字典学习|压缩感知/,
      [
        "在训练折内选择变量或稀疏编码并由外层评估",
        "搜索路径、内外折、正则路径、支持集与选择稳定性",
        "全量标签先筛特征再验证",
      ],
    ],
    [
      /基础知识|PAC|有限假设|VC维|Rademacher|稳定性/,
      [
        "在明确抽样与损失条件下连接容量、样本量和泛化概率",
        "假设族、epsilon/delta、容量量、上界与经验对照",
        "省略定理前提把上界当预测",
      ],
    ],
    [
      /未标记|生成式方法|半监督SVM|图半监督|基于分歧|半监督聚类/,
      [
        "借助分布、流形或多视图假设利用未标记样本",
        "来源、图/视图、伪标记轨迹、拒绝样本与负迁移",
        "分布外未标记数据自我强化错误",
      ],
    ],
    [
      /隐马尔可夫|随机场|条件随机场|学习与推断|近似推断|话题模型/,
      [
        "用图与因子表示联合分布并分离学习、推断和诊断",
        "变量、图、因子、参数、消息/样本轨迹与边际",
        "近似推断未收敛仍报告概率",
      ],
    ],
    [
      /规则|序贯覆盖|一阶|归纳逻辑/,
      [
        "从正反例与背景知识搜索、排序并剪枝可执行规则",
        "谓词、背景事实、覆盖集合、冲突顺序与未覆盖反例",
        "逐条查看测试反例后修补规则",
      ],
    ],
    [
      /任务与奖赏|摇臂|有模型|免模型|值函数|模仿学习/,
      [
        "通过环境交互或示范估计策略、价值或动力学",
        "MDP、行为/目标策略、轨迹、价值更新、覆盖与冻结回报",
        "评估期间继续探索和更新",
      ],
    ],
    [
      /矩阵|优化|概率分布|附录/,
      [
        "验证机器学习公式依赖的形状、约束与概率定义",
        "形状表、秩、梯度、约束残差、支持集、概率和与容差",
        "广播或自动归一化掩盖数学错误",
      ],
    ],
    [
      /阅读材料/,
      [
        "把本章结论连接到可追溯的进阶路线与原始资料",
        "问题清单、前置假设、来源版本与可复现实验入口",
        "只堆链接而不说明验证对象",
      ],
    ],
  ];
  return (
    rules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把原版目录项转成有输入、状态变化和验收条件的学习合同",
      "数据角色、模型状态、运行轨迹、指标与边界反例",
      "只复述标题而没有实验或拒绝条件",
    ]
  );
}

function termFor(concept, index) {
  const short = concept
    .replace(/^第\d+章\s*/, "")
    .replace(/^\d+\.\d+\s*/, "")
    .split(/[；;：:——,，与]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 18
    ? short
    : `学习坐标${index + 1}`;
}

function proseConcept(concept) {
  return concept.replace(/(\d+)\.(\d+)/g, "$1·$2");
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
  const concepts = unit
    ? unit.concepts.map((group) => group.join("；"))
    : previousManifest.units.flatMap((item) =>
        item.concepts.map((group) => group.join("；")),
      );
  const title = specification.title ?? unit?.title;
  if (!title) throw new Error(`缺少标题：${key}`);
  const stageDetails = [
    ["冻结版本、实体与样本角色", "只读取任务允许的信息", "可追踪输入状态"],
    ["构造表示、假设或结构", "保存训练折内统计与选择", "候选模型状态"],
    ["执行拟合、搜索或推断", "记录参数、随机性和收敛", "可重放运行轨迹"],
    ["使用验证证据做一次选择", "保存候选比较与失败理由", "锁定模型与阈值"],
    ["在封存角色上验收并归档", "输出误差、不确定性和边界", "独立复核包"],
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
      input: `${title}：${stageDetails[index][0]}，不得越过样本角色`,
      operation: `${stageDetails[index][1]}，并持续满足“${specification.invariant}”`,
      output: `${name}产生${stageDetails[index][2]}`,
      evidence: `${stageDetails[index][2]}、索引和版本；出现“${specification.fault}”时拒绝推进`,
    })),
    experiments: [
      {
        name: "冻结基线",
        setup: `${specification.scenario} 固定数据版本、实体切分、流水线、预算和随机种子。`,
        expected: `沿“${specification.stageNames.join(" → ")}”得到可重放结论。`,
        boundary: `全过程保持“${specification.invariant}”。`,
      },
      {
        name: "单故障反例",
        setup: `${specification.scenario} 其余不变，只注入“${specification.fault}”。`,
        expected: "定位第一处信息越界或学习状态偏离，并拒绝下游结论。",
        boundary: "失败运行必须保留；撤销故障后使用同一输入重放。",
      },
    ],
    baselineTrace: [
      `为“${title}”冻结任务、数据版本、实体切分、流水线、预算和随机种子`,
      `执行${specification.stageNames.slice(0, 2).join("、")}，保存输入角色与候选假设`,
      `推进${specification.stageNames.slice(2, 4).join("、")}，记录拟合、选择和失败轨迹`,
      `在${specification.stageNames[4]}交付${specification.artifact}`,
    ],
    faultTrace: [
      `“${title}”复用相同任务、数据版本、实体切分、流水线、预算和种子`,
      `仅改变一个条件：${specification.fault}`,
      `沿“${specification.stageNames.join(" → ")}”寻找最早的信息越界或状态分叉`,
      `撤销故障重放；只有“${specification.invariant}”恢复才接受修正`,
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
if (profiles.length !== 19) throw new Error("课程必须恰好为19页");

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并把原版范围、技术核验和现代扩展分层
- 能先预测“${profile.question}”的数据与模型路径，再用切分、状态、轨迹和独立评估复核
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、降级或拒绝实验结论

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个学习实验开始

${profile.opening} “${profile.title}”的贯穿任务是：${profile.scenario} 操作前先写下哪个数据角色、模型状态或评估结论会变化；运行后补理由不算预测。

本页围绕“${profile.question}”建立基线、故障与恢复路径。只有“${profile.title}”守住“${profile.invariant}”并交付${profile.artifact}，分数或图形才构成机器学习证据。

## 书目、128个原版层级与版本边界

“${profile.title}”以[清华大学出版社官方书页](${SOURCES.publisher})核对周志华著《机器学习》于2016年出版、425页、ISBN 9787302423287和全书16章的三部分结构，同时以[作者官方书页](${SOURCES.author})确认这是一部16章、每章6至7节且持续公开勘误的入门教科书，再以[作者官方目录PDF](${SOURCES.toc})逐项核对16章、108个编号小节和附录A/B/C，因此本站覆盖分母计入16个章标题、108个编号小节、附录标题及A/B/C，共128个正式目录层级。

“${profile.title}”未取得原书完整正文，只以作者与出版社目录限定范围；中文解释、交互、实验、练习与答案均为独立教学重写。${profile.boundary}

本页另以${links}核对算法机制、评估协议或数学工具。外部资料能验证技术事实，不能反向证明原书正文采用了本站表述。`;
}

const patterns = [
  (p, c, m, e, x, i) =>
    `在“${p.title}”的坐标${i + 1}中，目录项「${c}」用于${m}；先冻结数据角色，再以${e}复核，出现${x}时撤回结论。`,
  (p, c, m, e, x, i) =>
    `目录项「${c}」进入“${p.title}”后要回答第${i + 1}个学习问题：它怎样${m}、改变什么模型状态、由哪些${e}证明，并如何排除${x}。`,
  (p, c, m, e, x, i) =>
    `围绕“${p.question}”，在“${p.title}”的原版层级${i + 1}把「${c}」落实为${m}；复核者先读取${e}，不能接受${x}。`,
  (p, c, m, e, x, i) =>
    `对“${p.title}”而言，目录项「${c}」的最小实验合同是${m}，第${i + 1}次检查保存${e}；若产生${x}，就返回上游。`,
  (p, c, m, e, x, i) =>
    `第${i + 1}个正式坐标「${c}」服务于${p.duty}，需要以${e}呈现${m}；${x}会破坏“${p.invariant}”。`,
];

function conceptsSection(profile) {
  return `## 原版目录层级与学习机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept);
    const term = termFor(concept, index);
    const visibleConcept = proseConcept(concept);
    const definition = `${term}对应原版目录坐标“${visibleConcept}”，在“${profile.title}”中用于${mechanism}，并受数据角色、模型假设、评估时机与版本边界约束。`;
    return `### ${concept}

<Term def=${JSON.stringify(definition)}>${term}</Term>

**原版坐标 ${index + 1}/${profile.concepts.length}。** ${patterns[index % patterns.length](profile, visibleConcept, mechanism, evidence, caution, index)}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个章专属实验

<Callout type="info" title="先写出哪个数据角色或模型状态会先变化">
  对“${profile.title}”先冻结任务、数据版本、实体切分、流水线、预算和种子，再操作数据协议、对照轨迹和验收门；结果与预测不一致时修改假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 数据角色与模型协议">
    固定“${profile.scenario}”，在基线与反例间切换，逐阶段查看“${profile.stageNames.join("、")}”允许的输入、操作、输出和证据。

    <${profile.componentBase}DataProtocolLab />
  </Step>
  <Step title="2. 基线与单故障轨迹">
    保持任务与切分不变，只注入“${profile.fault}”，定位第一个偏离“${profile.invariant}”的步骤。

    <${profile.componentBase}ExperimentTraceLab />
  </Step>
  <Step title="3. 模型独立验收门">
    分别锁定数据角色、流水线、选择协议与复现边界，展开${profile.artifact}后决定是否接受。

    <${profile.componentBase}AcceptanceGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页单一故障：${profile.fault}">
  “${profile.title}”遇到该故障时保持其余任务、数据、实体切分、流水线、预算和种子不变，沿五阶段寻找最早偏离；最终指标偶尔更高不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="训练分数不是泛化证据">
  ${profile.scenario} 在训练样本上拟合，只证明候选假设能解释已见数据；“${profile.title}”仍需验证选择、封存测试、边界错误与复现材料。
</Callout>

<Callout type="trap" title="现代工具不能倒填2016原书">
  “${profile.title}”引用现行文档是为了核对实现与评估；后续基础模型和自动化平台必须单列时间标签，不能伪装成原版128层级。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放研究协议

| 阶段 | 允许动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stageNames
  .map(
    (stage, index) =>
      `| ${stage} | 在“${profile.title}”执行${stage}，只读取该角色允许的信息 | ${index === 0 ? "任务、版本、实体与切分哈希" : index === 4 ? "封存指标、错误样本、复现与边界" : "表示、参数、轨迹、候选比较与选择理由"} | ${index === 0 ? "角色或来源不可追溯" : index === 4 ? "测试被复用或无法重放" : profile.fault} |`,
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
reset: restore_experiment_stage_trace_mode_step_gates_and_artifact
\`\`\`

该协议要求“${profile.title}”在相同任务、数据版本、实体切分、流水线、预算和种子下重放。重置后若实验、阶段、轨迹模式、步骤、验收门或复核包没有回到基线，交互状态已经污染比较。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>检索键 ml-${alphaCode(index)} 对应目录坐标「${proseConcept(concept)}」；在“${profile.title}”中用于${mechanism}，需要连接原版范围、数据角色、模型状态与独立证据。</GlossaryItem>`;
    })
    .join("\n");
  const coverageList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. “${profile.title}”的目录项「${proseConcept(concept)}」：以“${mechanism}”解释学习作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是背诵算法名，而是能围绕“${profile.question}”重建数据与模型证据，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：实验合同。** “${profile.title}”为什么必须先冻结任务、数据版本、实体切分、流水线、预算和种子？

<Answer>
  ${profile.scenario} 若这些条件变化，相同分数可能来自不同数据、表示、假设或选择路径；“${profile.title}”先冻结合同，才能把观测连接到单一学习机制。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明原版目录坐标已经进入机制、交互和练习？

<Answer>
${coverageList}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一任务、数据版本、实体切分、流水线、预算和种子，重放基线后只注入“${profile.fault}”；记录最早偏离，撤销故障再运行。只有数据协议、对照轨迹、验收门和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="周志华著《机器学习》"
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
    experiments: profile.experiments,
    baselineTrace: profile.baselineTrace,
    faultTrace: profile.faultTrace,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    gates: [
      {
        label: "数据角色",
        detail: `“${profile.title}”的来源、实体、切分、标记可见性和测试封存可追溯。`,
      },
      {
        label: "流水线与假设",
        detail: `“${profile.title}”的表示、预处理、模型、损失、超参数和版本已冻结。`,
      },
      {
        label: "选择与评估",
        detail: `“${profile.title}”的候选比较、度量、验证决策和一次测试没有越界。`,
      },
      {
        label: "复现与边界",
        detail: `“${profile.title}”归档种子、运行轨迹、错误样本、故障恢复和时间标签。`,
      },
    ],
  };
  return `"use client";

import {
  MlEvidenceLab,
  type MlEvidenceModel,
} from "./ml-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies MlEvidenceModel;

export function ${profile.componentBase}DataProtocolLab() {
  return <MlEvidenceLab model={model} view="data-protocol" />;
}

export function ${profile.componentBase}ExperimentTraceLab() {
  return <MlEvidenceLab model={model} view="experiment-trace" />;
}

export function ${profile.componentBase}AcceptanceGateLab() {
  return <MlEvidenceLab model={model} view="acceptance-gate" />;
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
import { ${profile.componentBase}DataProtocolLab, ${profile.componentBase}ExperimentTraceLab, ${profile.componentBase}AcceptanceGateLab } from "@/components/mdx/${BOOK}/v2/${slug}";

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
    description: `${profile.duty}；用数据协议、单故障轨迹和模型验收门完成独立复核。`,
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
const chapterHeadings = allConcepts.filter((item) =>
  /^第\d+章/.test(item),
).length;
const numberedTopics = allConcepts.filter((item) =>
  /^\d+\.\d+\s/.test(item),
).length;
const appendixLevels = allConcepts.filter(
  (item) => item === "附录" || /^[ABC]\s/.test(item),
).length;
const catalogLevels = allConcepts.length;
if (
  chapterHeadings !== 16 ||
  numberedTopics !== 108 ||
  appendixLevels !== 4 ||
  catalogLevels !== 128
) {
  throw new Error(
    `目录口径应为16章+108编号小节+4附录层级=128，实际${chapterHeadings}+${numberedTopics}+${appendixLevels}=${catalogLevels}`,
  );
}

manifestDocument.books[BOOK] = {
  ...previousManifest,
  sourceKind:
    "official-publisher-metadata-cross-checked-with-author-book-page-complete-toc-and-primary-or-official-technical-sources",
  sourceUrl: SOURCES.publisher,
  secondarySourceUrls: Object.values(SOURCES).slice(1),
  status: "verified-outline",
  verifiedAt: "2026-07-30",
  disclosureNote:
    "清华大学出版社官方页面确认周志华著、2016年、425页、ISBN 9787302423287及三部分16章结构；作者官方书页说明这是16章、每章6至7节的入门教科书并公开持续勘误，作者官方目录PDF逐项确认16章108个编号小节和附录A/B/C。覆盖分母计入16个章标题、108个编号小节、附录标题及A/B/C，共128个正式目录层级。课程按16章与附录逐一覆盖，另设学习地图和综合复核，共19页、57个章专属交互。未取得原书完整正文，全部解释、实验、交互、练习与答案均为独立教学重写。旧页面虽有目录映射，却存在跨章模板复制、目标/归属结构错误和不可审核的通用卡片，已整体替换。",
  units: previousManifest.units.map((unit) => ({
    ...unit,
    chapterPath: PATHS[unit.id],
  })),
  metrics: {
    formalUnits: previousManifest.units.length,
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
  unitMappingEvidence: "quality/machine-learning-watermelon-v2-profiles.json",
  factSourcePolicy:
    "出版社与作者目录只限定16章、108小节、附录A/B/C和2016入门语境；评估、线性模型、树、神经网络、SVM、贝叶斯、集成、聚类、降维、稀疏学习、PAC、半监督、图模型、规则学习、强化学习及数学工具分别以原始论文、权威专著或官方技术文档核对。当前工具不得反写原版。",
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
      outlineSources: [SOURCES.publisher, SOURCES.author, SOURCES.toc],
      technicalSources: Object.values(SOURCES).slice(3),
      officialUnits: previousManifest.units.length,
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
  `已重建 ${profiles.length} 页，覆盖${chapterHeadings}章+${numberedTopics}编号小节+${appendixLevels}附录层级=${catalogLevels}个原版层级，生成 ${profiles.length * 3} 个交互视图。`,
);
