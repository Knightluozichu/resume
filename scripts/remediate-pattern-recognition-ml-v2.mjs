import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "pattern-recognition-ml";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/pattern-recognition-ml/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/pattern-recognition-ml-v2-profiles.json",
);

const SOURCES = {
  original:
    "https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/",
  originalPdf:
    "https://www.microsoft.com/en-us/research/wp-content/uploads/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf",
  springer: "https://link.springer.com/book/9780387310732",
  errata:
    "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/05/prml-errata-3rd-20110921.pdf",
  chineseCatalog:
    "https://yuntaigo.com/book.action?recordid=bm16bG9sbmM5Nzg3MTE1NjgxNDA5",
  sklearn: "https://scikit-learn.org/stable/user_guide.html",
  modelSelection: "https://scikit-learn.org/stable/model_selection.html",
  metrics: "https://scikit-learn.org/stable/modules/model_evaluation.html",
  scipyStats: "https://docs.scipy.org/doc/scipy/tutorial/stats.html",
  linearModels: "https://scikit-learn.org/stable/modules/linear_model.html",
  neuralNetworks:
    "https://scikit-learn.org/stable/modules/neural_networks_supervised.html",
  gaussianProcesses:
    "https://scikit-learn.org/stable/modules/gaussian_process.html",
  svm: "https://doi.org/10.1007/BF00994018",
  rvm: "https://www.jmlr.org/papers/v1/tipping01a.html",
  graphicalModels: "https://probml.github.io/pml-book/book1.html",
  em: "https://doi.org/10.1111/j.2517-6161.1977.tb01600.x",
  variational: "https://mc-stan.org/docs/reference-manual/variational.html",
  mcmc: "https://mc-stan.org/docs/reference-manual/mcmc.html",
  decomposition: "https://scikit-learn.org/stable/modules/decomposition.html",
  ppca: "https://www.jstor.org/stable/2669882",
  hmm: "https://doi.org/10.1109/5.18626",
  ensemble: "https://scikit-learn.org/stable/modules/ensemble.html",
  numpyLinearAlgebra:
    "https://numpy.org/doc/stable/reference/routines.linalg.html",
  scipyOptimize: "https://docs.scipy.org/doc/scipy/tutorial/optimize.html",
};

const PATHS = {
  learningMap: "00-learning-map/prl-official-learning-map",
  "prl-01": "01-introduction/prl-01-introduction",
  "prl-02": "02-probability-distributions/prl-02-probability-distributions",
  "prl-03": "03-linear-regression/prl-03-linear-regression",
  "prl-04": "04-linear-classification/prl-04-linear-classification",
  "prl-05": "05-neural-networks/prl-05-neural-networks",
  "prl-06": "06-kernel-methods/prl-06-kernel-methods",
  "prl-07": "07-sparse-kernel-machines/prl-07-sparse-kernel-machines",
  "prl-08": "08-graphical-models/prl-08-graphical-models",
  "prl-09": "09-mixture-models-em/prl-09-mixture-models-em",
  "prl-10": "10-approximate-inference/prl-10-approximate-inference",
  "prl-11": "11-sampling-methods/prl-11-sampling-methods",
  "prl-12": "12-continuous-latent-variables/prl-12-continuous-latent-variables",
  "prl-13": "13-sequential-data/prl-13-sequential-data",
  "prl-14": "14-combining-models/prl-14-combining-models",
  "prl-app-a": "15-appendix-a-data-sets/prl-appendix-a-data-sets",
  "prl-app-b":
    "16-appendix-b-probability-distributions/prl-appendix-b-probability-distributions",
  "prl-app-c":
    "17-appendix-c-properties-matrices/prl-appendix-c-properties-matrices",
  "prl-app-d":
    "18-appendix-d-calculus-variations/prl-appendix-d-calculus-variations",
  "prl-app-e":
    "19-appendix-e-lagrange-multipliers/prl-appendix-e-lagrange-multipliers",
  finalReview: "20-final-review/prl-official-final-review",
};

function spec(
  duty,
  question,
  invariant,
  fault,
  scenario,
  stageNames,
  sources,
  artifact,
  opening,
) {
  return {
    duty,
    question,
    invariant,
    fault,
    scenario,
    stageNames,
    sources,
    artifact,
    opening,
  };
}

const SPECS = {
  learningMap: {
    title: "《模式识别与机器学习》266个原版目录层级学习地图",
    ...spec(
      "沿概率表示、模型拟合、精确/近似推断、预测决策与诊断恢复14章和5个附录",
      "怎样把266个原版目录坐标组织成一个从数据、分布到后验预测的可复核概率建模系统？",
      "14个章标题、247个编号节/小节和附录A-E逐项覆盖，假设、推断、预测和边界均可追溯",
      "只记模型名称或现代API，遗漏第10至14章、附录、近似误差、预测检验和2006年原版边界",
      "为一个含连续、离散与序列观测的任务建立全书概率模型实验册。",
      ["定义观测", "声明模型", "选择推断", "生成预测", "诊断边界"],
      [SOURCES.original, SOURCES.originalPdf, SOURCES.springer],
      "266层覆盖矩阵、变量与图结构、似然与先验、推断轨迹、预测分布、反例、版本标签和复现包。",
      "学习地图把PRML从算法目录还原为能提出、推断、检验并拒绝概率结论的完整工作流。",
    ),
    boundary:
      "原版首版出版于2006年；深度生成模型、现代自动微分框架和后续算法只作带时间标签的独立扩展。",
  },
  "prl-01": spec(
    "覆盖曲线拟合、概率论、模型选择、维数灾难、决策论与信息论",
    "怎样从曲线拟合的观测噪声走到后验、预测、损失与模型选择，而不让训练误差代替不确定性？",
    "数据角色、概率模型、先验/似然、损失函数、复杂度选择和独立评估同时明确",
    "依据测试集反复选择多项式阶数和正则强度，再把最低测试误差称为泛化证据",
    "对同一组带噪样本比较最大似然、贝叶斯曲线拟合和不同决策损失。",
    ["观测与噪声", "概率规则", "后验拟合", "模型比较", "决策验收"],
    [SOURCES.originalPdf, SOURCES.modelSelection, SOURCES.metrics],
    "数据切分、基函数阶数、先验、似然、后验、预测区间、损失矩阵、验证轨迹与维度反例。",
    "引言页用曲线拟合贯穿学习、概率和决策，先固定问题再讨论模型。",
  ),
  "prl-02": spec(
    "覆盖二项/多项变量、高斯分布、指数族、共轭先验与非参数密度",
    "怎样让离散计数、高斯条件化、指数族充分统计量和核密度共享一致的归一与预测检查？",
    "支持集、测度、参数化、归一常数、先验、充分统计量与预测对象固定",
    "混淆概率质量与密度，或在测试观测上选择带宽和平滑强度",
    "对离散计数、相关高斯和多峰样本分别建立参数与非参数分布。",
    ["定义支持集", "建立分布", "条件与边缘", "更新参数", "检查归一"],
    [SOURCES.originalPdf, SOURCES.scipyStats, SOURCES.sklearn],
    "变量域、计数、参数、归一常数、充分统计量、共轭更新、密度积分、带宽和预测检查。",
    "概率分布页要求每一个概率声明都能回到支持集、归一与观测机制。",
  ),
  "prl-03": spec(
    "覆盖线性基函数、偏差方差、贝叶斯线性回归、模型证据与固定基函数边界",
    "怎样连接最小二乘、参数后验、预测分布和模型证据，并区分参数不确定性与观测噪声？",
    "基函数、噪声模型、先验、正则、设计矩阵、数据角色和证据近似固定",
    "在测试集上选择基函数与正则，或把点预测误差当作完整后验预测",
    "用同一非线性样本比较固定基函数最大似然与贝叶斯线性回归。",
    [
      "构建设计矩阵",
      "指定噪声先验",
      "求参数后验",
      "形成预测分布",
      "比较模型证据",
    ],
    [SOURCES.originalPdf, SOURCES.linearModels, SOURCES.modelSelection],
    "设计矩阵、先验精度、噪声精度、参数后验、预测均值/方差、证据曲线、残差与基函数反例。",
    "线性回归页把线性限定在参数空间，并让不确定性进入预测而非停在系数表。",
  ),
  "prl-04": spec(
    "覆盖判别函数、概率生成/判别模型、Laplace近似与贝叶斯逻辑回归",
    "怎样比较Fisher、感知机、生成分类与逻辑回归，并用相同损失与校准条件验收？",
    "类别编码、特征变换、生成/判别假设、链接函数、损失、正则和评估角色固定",
    "只比较训练分类率，忽略概率校准、近似后验误差和类别不平衡",
    "在二分类与多分类样本上比较线性判别边界和概率预测。",
    ["定义类别损失", "构造判别分数", "归一为概率", "近似参数后验", "检验决策"],
    [SOURCES.originalPdf, SOURCES.linearModels, SOURCES.metrics],
    "类别与特征、生成假设、判别参数、链接函数、Hessian、近似后验、概率校准、损失与拒绝区。",
    "线性分类页区分分数、概率与决策，边界相同并不代表不确定性语义相同。",
  ),
  "prl-05": spec(
    "覆盖前馈函数、训练、反向传播、Hessian、正则、混合密度与贝叶斯神经网络",
    "怎样从网络函数和误差导数追到曲率、正则与预测不确定性，而不把反向传播等同于完整训练？",
    "网络结构、输出分布、损失、初始化、优化顺序、正则、停止规则和数据角色固定",
    "用测试损失早停或调结构，且只展示一次随机初始化的最好结果",
    "在小型回归任务上手算梯度并比较点预测、混合密度和贝叶斯近似。",
    ["定义网络函数", "前向计算", "反向求导", "优化与正则", "预测不确定性"],
    [SOURCES.originalPdf, SOURCES.neuralNetworks, SOURCES.modelSelection],
    "计算图、激活、损失、梯度检查、Hessian近似、初始化种子、优化轨迹、正则、早停索引和预测分布。",
    "神经网络页把函数表示、导数计算、参数优化和概率预测拆成可单独失败的环节。",
  ),
  "prl-06": spec(
    "覆盖对偶表示、核构造、径向基网络与高斯过程回归/分类",
    "怎样从正定核得到函数空间先验和预测协方差，并用边际似然与外推反例检查超参数？",
    "输入尺度、核函数、Gram矩阵、噪声、均值函数、超参数和验证协议固定",
    "在测试集上选择核与长度尺度，或忽略非正定矩阵和外推方差",
    "对一维稀疏观测比较RBF网络与高斯过程的均值和预测方差。",
    ["构造核矩阵", "声明函数先验", "条件化观测", "优化超参数", "检验外推"],
    [
      SOURCES.originalPdf,
      SOURCES.gaussianProcesses,
      SOURCES.numpyLinearAlgebra,
    ],
    "输入尺度、核定义、Gram矩阵、抖动项、超参数、Cholesky残差、边际似然、预测均值/方差和外推图。",
    "核方法页要求相似度先满足合法核合同，再讨论函数预测和超参数学习。",
  ),
  "prl-07": spec(
    "覆盖最大间隔分类器、重叠类别、多分类/回归SVM、学习理论与相关向量机",
    "怎样比较SVM的间隔稀疏性与RVM的后验稀疏性，并分别核对优化约束和概率预测？",
    "尺度、核、惩罚、标签、对偶约束、停止容差、先验和校准协议固定",
    "依据测试结果调核参数，或把SVM分数直接解释为后验概率",
    "在重叠二分类和回归数据上比较支持向量与相关向量。",
    ["建立核表示", "求最大间隔", "检查KKT条件", "更新稀疏先验", "比较预测语义"],
    [SOURCES.originalPdf, SOURCES.svm, SOURCES.rvm],
    "尺度、核矩阵、C与epsilon、对偶变量、KKT残差、支持/相关向量、后验协方差、校准和多类策略。",
    "稀疏核机页不把两种稀疏性混为一谈：一个来自约束最优解，一个来自概率先验。",
  ),
  "prl-08": spec(
    "覆盖贝叶斯网络、条件独立、马尔可夫随机场、因子图与精确/循环消息传递",
    "怎样从图结构读取条件独立并执行消息传递，同时证明因子化与查询语义一致？",
    "变量域、图方向、因子、归一常数、观测节点、消息调度和查询固定",
    "仅凭边缺失判断独立，或在有环图上把未收敛消息当作精确后验",
    "对同一小型联合分布画有向图、无向图和因子图并计算边缘/MAP。",
    ["声明图与因子", "读取条件独立", "吸收观测", "传递消息", "核对边缘或MAP"],
    [SOURCES.originalPdf, SOURCES.graphicalModels, SOURCES.scipyStats],
    "变量与边、因子表、d-separation查询、势函数、归一常数、消息版本、树/环标记、边缘和MAP回溯。",
    "图模型页把图当作概率因子化合同，而不是装饰性的关系示意图。",
  ),
  "prl-09": spec(
    "覆盖k均值、高斯混合、EM的下界视角与一般形式",
    "怎样把隐变量责任度、Q函数和参数更新连接到似然下界，并识别局部最优与退化协方差？",
    "分量数、初始化、协方差约束、E/M步定义、停止规则、数据和随机种子固定",
    "只保留最好的一次初始化，或似然下降/协方差塌缩仍宣称EM收敛",
    "在二维多峰数据上比较k均值硬指派与高斯混合软责任度。",
    ["初始化分量", "计算责任度", "形成Q函数", "更新参数", "检查下界"],
    [SOURCES.originalPdf, SOURCES.em, SOURCES.scipyStats],
    "分量与初值、责任度矩阵、Q函数、混合权重、均值/协方差、似然下界、多初值轨迹和退化反例。",
    "混合模型页保存每次隐变量补全和参数更新，最终彩色簇图不是收敛证明。",
  ),
  "prl-10": spec(
    "覆盖变分推断、因子化近似、变分混合/回归、局部界、消息传递与期望传播",
    "怎样说明近似族、目标下界和坐标更新，并量化因子化或矩匹配造成的偏差？",
    "目标后验、近似族、因子化、下界、更新顺序、初始化和收敛诊断固定",
    "只报告近似后验均值，不记录ELBO、近似族限制或多初值敏感性",
    "对相关高斯和混合模型比较平均场变分、局部界与期望传播。",
    [
      "选择近似族",
      "构造变分目标",
      "更新局部因子",
      "传播近似消息",
      "诊断近似误差",
    ],
    [SOURCES.originalPdf, SOURCES.variational, SOURCES.scipyOptimize],
    "目标密度、近似因子、自然参数、ELBO分解、坐标更新、消息、矩匹配、收敛残差和相关性反例。",
    "近似推断页要求把“算得快”与“近似了什么”同时写进结论。",
  ),
  "prl-11": spec(
    "覆盖拒绝/重要性采样、MCMC、Gibbs、切片、混合蒙特卡罗与配分函数估计",
    "怎样证明样本来自目标分布而非仅能运行，并用多链、有效样本与敏感性诊断估计？",
    "目标密度、提议/转移、初值、预热、链长、种子、估计量和诊断阈值固定",
    "短链未混合就汇总，或只展示接受率而不检查自相关与多链一致性",
    "对单峰、多峰和相关目标分别运行重要性采样、MH、Gibbs与HMC。",
    ["定义目标密度", "选择提议或动力学", "生成样本", "估计期望", "诊断链"],
    [SOURCES.originalPdf, SOURCES.mcmc, SOURCES.scipyStats],
    "目标与归一未知项、提议、接受比、链初值、预热、样本轨迹、R-hat、有效样本、自相关和多峰反例。",
    "采样方法页把随机轨迹视为需要诊断的计算对象，而不是自动可信的数据。",
  ),
  "prl-12": spec(
    "覆盖PCA、概率PCA、因子分析、核PCA、ICA、自编码与非线性流形",
    "怎样区分几何降维、潜变量生成模型和非线性表示，并让投影与生成假设接受不同检验？",
    "样本方向、中心化、尺度、潜维数、噪声模型、拟合索引和重构指标固定",
    "在全量含测试样本的数据上拟合表示，或用二维图形主观选择潜维数",
    "对相关高维样本比较PCA、PPCA、因子分析、核PCA和非线性表示。",
    ["中心化观测", "声明潜变量", "估计子空间", "投影或生成", "检验重构"],
    [SOURCES.originalPdf, SOURCES.decomposition, SOURCES.ppca],
    "拟合索引、均值/尺度、协方差、载荷、潜变量、噪声、特征谱、投影、重构、似然与稳定性。",
    "连续潜变量页要求几何目标与概率生成语义分开验收。",
  ),
  "prl-13": spec(
    "覆盖马尔可夫模型、HMM、前向后向、Viterbi、线性动态系统与粒子滤波",
    "怎样让概率计算、参数学习、路径解码与滤波共享一致的时间索引和状态语义？",
    "状态/观测域、时间方向、初始分布、转移、发射、缩放和缺失数据规则固定",
    "训练与解码使用不同索引，或数值下溢被误解为零概率",
    "对短离散序列和连续轨迹分别运行HMM、LDS与粒子滤波。",
    ["定义状态空间", "前向过滤", "后向平滑", "学习或解码", "检查序列证据"],
    [SOURCES.originalPdf, SOURCES.hmm, SOURCES.scipyStats],
    "状态/观测、初始/转移/发射、缩放alpha/beta、期望计数、Viterbi回溯、Kalman状态、粒子权重和退化诊断。",
    "序列数据页用同一时间坐标连接过滤、平滑、学习和最可能路径。",
  ),
  "prl-14": spec(
    "覆盖贝叶斯模型平均、委员会、提升、树模型与条件混合/专家模型",
    "怎样区分模型不确定性平均、重采样委员会、加法提升和输入条件门控？",
    "基学习器、采样、权重/门控、损失、随机种子、数据切分和组合协议固定",
    "依据测试表现挑选成员和组合权重，或把相关模型当作独立证据",
    "对同一预测任务比较模型平均、bagging、boosting、树和专家混合。",
    ["定义候选模型", "生成成员", "估计权重或门控", "组合预测", "检查多样性"],
    [SOURCES.originalPdf, SOURCES.ensemble, SOURCES.metrics],
    "候选模型、训练索引、种子、成员预测、后验/投票权重、门控概率、逐轮损失、相关性和校准。",
    "模型组合页先追问成员为何不同，再解释组合怎样改变偏差、不确定性和失败模式。",
  ),
  "prl-app-a": spec(
    "覆盖附录A数据集的来源、生成规则与复现实验角色",
    "怎样把书中示例数据登记为可复现输入，并防止数据来源与切分角色在实验间漂移？",
    "数据来源、生成参数、模式数、随机种子、预处理和训练/验证/测试角色固定",
    "重新生成数据却不记录种子，或根据测试标签修改预处理",
    "复建书中常用合成数据并为每份数据制作数据卡。",
    ["登记来源", "生成或载入", "验证形状", "冻结切分", "归档数据卡"],
    [SOURCES.originalPdf, SOURCES.modelSelection, SOURCES.sklearn],
    "数据来源、许可证、生成参数、种子、校验和、形状、标签域、切分索引、预处理统计与版本。",
    "数据集附录页把示例输入变成可追踪实验资产，不把图形相似当作同一数据。",
  ),
  "prl-app-b": spec(
    "覆盖附录B常用概率分布的支持集、参数、矩与归一性质",
    "怎样用支持集、归一、矩和采样检查统一核对正文使用的概率分布？",
    "分布参数化、支持集、测度、归一常数、矩存在条件和数值容差固定",
    "混用不同软件的参数化，或在定义域外仍计算有限密度",
    "为正文常用离散与连续分布建立参数化对照和数值检查。",
    ["声明参数化", "核对支持集", "验证归一", "计算矩", "采样复核"],
    [SOURCES.originalPdf, SOURCES.scipyStats, SOURCES.errata],
    "分布名称、参数化、支持集、密度/质量、归一积分、矩、边界值、采样直方图和软件版本。",
    "概率分布附录页专门消除符号相同却参数化不同的隐蔽错误。",
  ),
  "prl-app-c": spec(
    "覆盖附录C矩阵性质及正文概率计算所需的线性代数前提",
    "怎样让形状、秩、正定性、分解和行列式恒等式成为可执行断言？",
    "矩阵方向、形状、对称性、秩、正定容差和分解约定固定",
    "广播或转置错误仍产生数值结果，或近奇异矩阵直接求逆",
    "对协方差、设计矩阵和核矩阵建立形状与数值稳定性测试。",
    ["标注形状", "检查结构", "选择分解", "求解线性系统", "复核残差"],
    [SOURCES.originalPdf, SOURCES.numpyLinearAlgebra, SOURCES.errata],
    "矩阵形状、秩、对称/正定残差、特征值、Cholesky/SVD、条件数、求解残差和失败矩阵。",
    "矩阵附录页把线性代数恒等式变成概率模型可依赖的数值合同。",
  ),
  "prl-app-d": spec(
    "覆盖附录D变分法及函数空间优化的边界条件",
    "怎样从泛函、扰动与边界条件得到Euler型驻点条件，并用离散近似反证漏项？",
    "函数空间、允许扰动、端点/边界、泛函、正则性和离散容差固定",
    "忽略边界项或允许不可行扰动，却仍把驻点解释为原问题解",
    "对一个路径泛函推导一阶变分并与网格离散梯度比较。",
    ["定义泛函", "施加扰动", "分部积分", "得到驻点条件", "离散复核"],
    [SOURCES.originalPdf, SOURCES.scipyOptimize, SOURCES.errata],
    "函数与定义域、扰动族、边界条件、一阶变分、边界项、驻点方程、离散梯度和残差。",
    "变分法附录页把边界条件留在推导现场，避免漂亮公式掩盖不可行扰动。",
  ),
  "prl-app-e": spec(
    "覆盖附录E拉格朗日乘子及等式约束优化条件",
    "怎样从可行集、梯度与乘子得到驻点，并区分必要条件、数值解和最优性？",
    "目标、约束、可行域、梯度约定、乘子符号、容差和二阶检查固定",
    "只满足驻点方程就宣称全局最优，或约束残差显著仍接受数值解",
    "对归一概率和单位范数约束分别建立拉格朗日系统。",
    ["声明目标约束", "构造拉格朗日量", "求驻点", "检查可行性", "判断最优性"],
    [SOURCES.originalPdf, SOURCES.scipyOptimize, SOURCES.errata],
    "目标与约束、梯度、乘子、KKT/驻点方程、可行残差、二阶信息、候选比较和边界反例。",
    "拉格朗日乘子附录页把驻点、可行和最优三个结论分开验收。",
  ),
  finalReview: {
    title: "《模式识别与机器学习》概率建模总复习",
    ...spec(
      "用统一概率工作流复核14章、247个编号层级和5个附录，并完成跨模型选型与反证",
      "面对新数据，怎样从266个原版坐标选择模型、推断和预测检验，而不是按熟悉度套算法？",
      "每个选择都能回到原版坐标、概率假设、计算轨迹、预测证据、失败边界和2006/当前时间标签",
      "按单次指标排名模型，隐藏数据泄漏、近似误差、随机性和不确定性语义差异",
      "为一个混合静态、序列和潜变量的任务提交端到端概率建模评审包。",
      ["界定任务", "比较模型", "选择推断", "形成预测", "压力测试"],
      [SOURCES.original, SOURCES.originalPdf, SOURCES.errata],
      "266层覆盖账本、模型候选矩阵、数据协议、推断预算、诊断轨迹、预测检查、反例、选择理由和复现环境。",
      "总复习页不再按章背诵，而是要求为每次概率建模决策提交可被推翻的证据。",
    ),
    boundary:
      "综合选择以2006年原版概念为基线；2026年中文译本书目信息和当前实现文档分层记录，后续技术不得倒填原版。",
  },
};

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const previousManifest = manifestDocument.books[BOOK];
if (!previousManifest) throw new Error(`缺少 ${BOOK} manifest`);

function toPascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function mechanismFor(concept) {
  const rules = [
    [
      /Introduction|Polynomial Curve|Probability Theory|Decision Theory|Information Theory|Model Selection|Curse of Dimensionality/,
      [
        "从观测、概率与损失建立学习和决策合同",
        "数据角色、先验/似然、后验预测、复杂度、损失与信息量",
        "训练拟合代替不确定性和独立评估",
      ],
    ],
    [
      /Binary Variables|Multinomial|Gaussian|Exponential Family|Nonparametric|Probability Distribution|beta|Dirichlet|Student|density|Nearest/,
      [
        "定义支持集、归一、参数更新与预测密度",
        "变量域、充分统计量、归一常数、共轭更新、密度积分与带宽",
        "混淆质量和密度或在测试数据上调分布",
      ],
    ],
    [
      /Linear Models for Regression|Basis Function|Bias-Variance|Bayesian Linear|Evidence Approximation|Fixed Basis/,
      [
        "从设计矩阵和噪声模型推导参数与预测后验",
        "基函数、先验精度、参数协方差、预测方差、证据与残差",
        "测试集选择基函数或只报告点预测",
      ],
    ],
    [
      /Linear Models for Classification|Discriminant|Generative Models|Discriminative Models|Logistic|Probit|Laplace/,
      [
        "连接判别分数、类别概率、近似后验与损失决策",
        "类别编码、链接函数、似然、梯度/Hessian、校准与损失矩阵",
        "分类率掩盖概率语义或后验近似误差",
      ],
    ],
    [
      /Neural Networks|Feed-forward|Network Training|Backpropagation|Hessian|Regularization|Mixture Density|Bayesian Neural/,
      [
        "分离网络函数、导数、优化、正则与概率预测",
        "计算图、梯度检查、曲率、初始化、优化轨迹、早停与预测分布",
        "把反向传播等同于训练成功或用测试集早停",
      ],
    ],
    [
      /Kernel Methods|Dual Representations|Constructing Kernels|Radial Basis|Gaussian Processes/,
      [
        "以正定核建立对偶表示和函数空间预测",
        "输入尺度、Gram矩阵、噪声、边际似然、超参数与预测协方差",
        "非法核或测试调参仍输出平滑曲线",
      ],
    ],
    [
      /Sparse Kernel|Maximum Margin|SVM|Relevance Vector|Computational learning/,
      [
        "比较约束最大间隔与贝叶斯稀疏先验",
        "核矩阵、对偶变量、KKT残差、支持/相关向量与概率校准",
        "把分数当概率或混淆两种稀疏机制",
      ],
    ],
    [
      /Graphical Models|Bayesian Networks|Conditional Independence|Markov Random|Inference in Graphical|factor graph|sum-product|max-sum/,
      [
        "以图结构声明因子化、条件独立和消息推断",
        "变量、边、因子、d-separation、消息、归一常数、边缘与MAP",
        "从画图直觉推断独立或把循环消息当精确值",
      ],
    ],
    [
      /Mixture Models|K-means|Mixtures of Gaussians|Alternative View of EM|EM Algorithm/,
      [
        "交替估计隐变量责任度与模型参数并检查下界",
        "初始化、责任度、Q函数、参数、似然/下界和多初值轨迹",
        "似然下降、退化协方差或幸运初始化被隐藏",
      ],
    ],
    [
      /Approximate Inference|Variational|Factorized|lower bound|Expectation Propagation|Local Variational/,
      [
        "选择近似族并沿变分目标或矩匹配传播近似",
        "因子化、ELBO、自然参数、坐标更新、消息、矩与近似误差",
        "只展示后验均值而隐去近似限制",
      ],
    ],
    [
      /Sampling Methods|Rejection|Importance|Markov Chain|Monte Carlo|Gibbs|Slice|Hybrid|Partition Function/,
      [
        "构造保持目标分布的随机过程并诊断估计量",
        "目标、提议、接受率、链、预热、多链、有效样本和自相关",
        "未混合短链被当作独立目标样本",
      ],
    ],
    [
      /Continuous Latent|Principal Component|Probabilistic PCA|Kernel PCA|Factor analysis|Independent component|Autoassociative|manifold/,
      [
        "比较几何投影、潜变量生成和非线性表示",
        "中心化、协方差、载荷、潜变量、噪声、谱、重构与似然",
        "全量数据拟合表示或以二维图替代检验",
      ],
    ],
    [
      /Sequential Data|Markov Models|Hidden Markov|forward-backward|Viterbi|Linear Dynamical|Particle/,
      [
        "在一致时间索引上执行过滤、平滑、学习和解码",
        "初始/转移/发射、缩放alpha/beta、期望计数、路径与粒子权重",
        "索引错位、下溢或粒子退化被忽略",
      ],
    ],
    [
      /Combining Models|Bayesian Model Averaging|Committees|Boosting|Tree-based|Conditional Mixture|experts/,
      [
        "按模型不确定性、重采样、加法或门控机制组合预测",
        "成员来源、权重、逐轮损失、门控概率、相关性与校准",
        "测试选择成员或相关模型被当作独立证据",
      ],
    ],
    [
      /Appendix A Data Sets/,
      [
        "登记数据来源、生成与切分角色",
        "来源、参数、种子、校验和、形状、标签与切分索引",
        "数据版本漂移或测试标签参与预处理",
      ],
    ],
    [
      /Appendix B Probability/,
      [
        "统一分布的参数化、支持集、归一和矩",
        "参数约定、密度/质量、归一积分、矩与采样检查",
        "混用参数化或在定义域外计算",
      ],
    ],
    [
      /Appendix C Properties of Matrices/,
      [
        "把形状、秩、正定与分解变成数值断言",
        "形状、秩、特征值、条件数、分解和求解残差",
        "广播、转置或近奇异求逆错误",
      ],
    ],
    [
      /Appendix D Calculus of Variations/,
      [
        "由允许扰动和边界条件得到泛函驻点",
        "函数域、扰动、边界项、一阶变分、驻点方程与离散残差",
        "漏掉边界项或使用不可行扰动",
      ],
    ],
    [
      /Appendix E Lagrange Multipliers/,
      [
        "在约束可行域中建立乘子驻点和最优性检查",
        "目标、约束、梯度、乘子、可行残差与二阶信息",
        "驻点被直接宣称为全局最优",
      ],
    ],
  ];
  return (
    rules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把目录坐标转为有变量、假设、推断与预测检查的概率合同",
      "观测、模型、先验/似然、算法状态、诊断、反例和时间边界",
      "只复述模型或公式名称",
    ]
  );
}

function termFor(concept, index) {
  const short = concept
    .replace(/^\d+(?:\.\d+)*\s+/, "")
    .replace(/^Appendix\s+[A-E]\s+/, "")
    .split(/[;:—,]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 24
    ? short
    : `概率坐标${index + 1}`;
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
    `“${title}”以2006年原版为内容边界；2026年中文新译本只用于中文书目信息，当前库函数和后续研究只作带时间标签的独立核验。`;
  const stageDetails = [
    [
      "声明观测、变量与数据角色",
      "冻结支持集、形状、版本和允许读取的信息",
      "可追溯观测状态",
    ],
    [
      "构造联合分布、函数或图结构",
      "记录假设、参数化、归一与条件独立",
      "可计算模型状态",
    ],
    [
      "选择精确、近似、优化或采样步骤",
      "保存初值、顺序、随机性、目标和残差",
      "可重放推断状态",
    ],
    [
      "从后验或参数形成任务输出",
      "同时保留点结果、不确定性和损失语义",
      "可检验预测状态",
    ],
    [
      "执行归一、收敛、校准与反例检查",
      "隔离测试角色并登记适用域和时间边界",
      "独立概率证据包",
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
    boundary,
    stages: specification.stageNames.map((name, index) => ({
      name,
      prior: `${title}：${stageDetails[index][0]}，保持其余概率合同不变`,
      operation: `${stageDetails[index][1]}，并持续满足“${specification.invariant}”`,
      posterior: `${name}产生${stageDetails[index][2]}`,
      check: `${stageDetails[index][2]}、概率质量与数值断言；出现“${specification.fault}”时停止`,
    })),
    cases: [
      {
        name: "参考观测",
        observation: `${specification.scenario} 固定数据、参数化、初值、顺序、容差和种子。`,
        prediction: `沿“${specification.stageNames.join(" → ")}”得到可复核概率结论。`,
        boundary: `全过程必须满足“${specification.invariant}”。`,
      },
      {
        name: "边界反例",
        observation: `${specification.scenario} 其余条件不变，只注入“${specification.fault}”。`,
        prediction:
          "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
        boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
      },
    ],
    referenceTrace: [
      `为“${title}”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子`,
      `执行${specification.stageNames.slice(0, 2).join("、")}，保存支持集、假设、分布或图结构`,
      `推进${specification.stageNames.slice(2, 4).join("、")}，记录推断目标、更新、残差与预测不确定性`,
      `在${specification.stageNames[4]}交付${specification.artifact}`,
    ],
    faultTrace: [
      `“${title}”复用相同观测、数据角色、参数化、初值、顺序、容差和种子`,
      `只改变一个条件：${specification.fault}`,
      `沿“${specification.stageNames.join(" → ")}”寻找最早的概率或数值分叉`,
      `撤销故障重放；只有“${specification.invariant}”恢复才接受修正`,
    ],
  };
}

const profiles = [
  enrichProfile("learningMap", SPECS.learningMap, "learning-map"),
  ...previousManifest.units.map((unit) =>
    enrichProfile(
      unit.id,
      SPECS[unit.id],
      unit.id.startsWith("prl-app") ? "appendix" : "chapter",
      unit,
    ),
  ),
  enrichProfile("finalReview", SPECS.finalReview, "final-review"),
];
if (profiles.length !== 21) throw new Error("课程必须恰好为21页");

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并区分2006年原版、2026年中文书目与当前扩展
- 能先预测“${profile.question}”“${profile.title}”会改变哪项概率状态，再用先验、运算、后验与诊断逐步复核
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、降级或拒绝模型结论

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个概率问题开始

${profile.opening} “${profile.title}”的贯穿任务是：${profile.scenario} 动手前先写下哪个观测、分布、参数、隐变量、消息或预测会变化；运行后补理由不算预测。

围绕“${profile.question}”“${profile.title}”建立参考、故障与恢复路径。只有它守住“${profile.invariant}”并交付${profile.artifact}，公式、图形或指标才构成模式识别与机器学习证据。

## 书目、266个原版层级与版本边界

“${profile.title}”以[Microsoft Research作者出版页](${SOURCES.original})和作者公开的[原版完整PDF](${SOURCES.originalPdf})核对Christopher M. Bishop著 *Pattern Recognition and Machine Learning* 的正文与完整目录，并以[Springer官方书目](${SOURCES.springer})交叉核对2006年第一版、ISBN 9780387310732、14章和5个附录。本站逐项统计14个章标题、247个编号节/小节与附录A-E，共266个正式目录层级；[作者勘误表](${SOURCES.errata})用于纠正已知排印问题。

本项目能访问原版一手全文，但不复制或逐段翻译原书；中文解释、推导、数值实验、交互、练习与答案均为独立教学重写。[中文发行书目](${SOURCES.chineseCatalog})只用于核对2026年人民邮电出版社新译本的ISBN 9787115681409、译者和页数，不用来证明原版正文。${profile.boundary}

本页另以${links}核对算法定义、实现语义或数值诊断。外部资料能验证技术事实，不能反向证明原书采用了本站表述。`;
}

const patterns = [
  (p, c, m, e, x, i) =>
    `在“${p.title}”的坐标${i + 1}中，目录项「${c}」用于${m}；先冻结观测与参数化，再以${e}复核，出现${x}时撤回结论。`,
  (p, c, m, e, x, i) =>
    `目录项「${c}」进入“${p.title}”后要回答第${i + 1}个概率问题：它怎样${m}、改变哪个条件或后验状态、由哪些${e}证明，并如何排除${x}。`,
  (p, c, m, e, x, i) =>
    `围绕“${p.question}”“${p.title}”在原版层级${i + 1}把「${c}」落实为${m}；复核者先读取${e}，不能接受${x}。`,
  (p, c, m, e, x, i) =>
    `对“${p.title}”而言，目录项「${c}」的最小建模合同是${m}，第${i + 1}次检查保存${e}；若产生${x}，就返回上一步。`,
  (p, c, m, e, x, i) =>
    `第${i + 1}个正式坐标「${c}」服务于${p.duty}，需要以${e}呈现${m}；${x}会破坏“${p.invariant}”。`,
];

function conceptsSection(profile) {
  return `## 原版目录层级与概率机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept);
    const term = termFor(concept, index);
    const visibleConcept = proseConcept(concept);
    const definition = `${term}对应原版目录坐标“${visibleConcept}”，在“${profile.title}”中用于${mechanism}，并受支持集、条件化、算法状态、预测语义与版本边界约束。`;
    return `### ${concept}

<Term def=${JSON.stringify(definition)}>${term}</Term>

**原版坐标 ${index + 1}/${profile.concepts.length}。** ${patterns[index % patterns.length](profile, visibleConcept, mechanism, evidence, caution, index)}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个章专属概率实验

<Callout type="info" title="先写出哪个概率或数值状态会先变化">
  对“${profile.title}”先冻结观测、数据角色、参数化、初值、顺序、容差和种子，再操作模型状态、推断轨迹和预测检验；结果与预测不一致时修改假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 概率模型与条件状态">
    固定“${profile.scenario}”，在参考与反例间切换，逐阶段查看“${profile.stageNames.join("、")}”的进入状态、条件化、离开状态和概率检查。

    <${profile.componentBase}ProbabilisticModelLab />
  </Step>
  <Step title="2. 参考与单故障推断轨迹">
    保持观测、参数化和初值不变，只注入“${profile.fault}”，定位第一个偏离“${profile.invariant}”的步骤。

    <${profile.componentBase}InferenceTraceLab />
  </Step>
  <Step title="3. 后验预测与证据验收门">
    分别锁定观测协议、模型假设、推断数值与外部预测检查，展开${profile.artifact}后决定是否接受。

    <${profile.componentBase}PredictiveCheckLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页单一故障：${profile.fault}">
  “${profile.title}”遇到该故障时保持其余观测、数据角色、参数化、初值、顺序、容差和种子不变，沿五阶段寻找最早偏离；最终数值看似合理不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="概率公式成立不等于推断实现正确">
  ${profile.scenario} 的符号推导只限定概率对象；“${profile.title}”仍需支持集、归一、形状、条件独立、目标单调性、收敛诊断和边界反例。
</Callout>

<Callout type="trap" title="当前模型与库函数不能冒充2006年原版">
  “${profile.title}”引用现行文档是为了核对计算语义；自动微分、当前API和后续模型必须单列时间标签，不能倒填PRML原版或2026年中文译本。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放概率协议

| 阶段 | 允许动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stageNames
  .map(
    (stage, index) =>
      `| ${stage} | 在“${profile.title}”执行${stage}，只改变声明的概率或算法状态 | ${index === 0 ? "观测、变量、支持集、数据角色与版本" : index === 4 ? "归一、残差、校准、反例、适用边界与复现" : "模型、先验/似然、参数/隐变量、消息、样本与预测分布"} | ${index === 0 ? "观测或支持集不可追溯" : index === 4 ? "无法重放或缺少预测检查" : profile.fault} |`,
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

该协议要求“${profile.title}”在相同观测、数据角色、参数化、初值、顺序、容差和种子下重放。重置后若案例、阶段、轨迹模式、步骤、预测门或证据包没有回到基线，交互状态已经污染比较。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>检索键 prml-${alphaCode(index)} 对应目录坐标「${proseConcept(concept)}」；在“${profile.title}”中用于${mechanism}，需要连接原版范围、概率状态、推断轨迹与独立预测证据。</GlossaryItem>`;
    })
    .join("\n");
  const coverageList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. “${profile.title}”的目录项「${proseConcept(concept)}」：以“${mechanism}”解释概率作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是背诵公式或API，而是能围绕“${profile.question}”重建观测、模型、推断与预测证据，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：概率合同。** “${profile.title}”为什么必须先冻结观测、数据角色、参数化、初值、顺序、容差和种子？

<Answer>
  ${profile.scenario} 若这些条件变化，相同结果可能来自不同支持集、模型、后验、近似或随机轨迹；“${profile.title}”先冻结合同，才能把观测连接到单一概率机制。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明原版目录坐标已经进入机制、交互和练习？

<Answer>
${coverageList}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一观测、数据角色、参数化、初值、顺序、容差和种子，重放参考路径后只注入“${profile.fault}”；记录最早偏离，撤销故障再运行。只有概率模型、推断轨迹、预测门和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="full-text-primary"
  workTitle="Christopher M. Bishop, Pattern Recognition and Machine Learning"
  adaptedUrl="${SOURCES.original}"
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
        label: "观测与数据角色",
        detail: `“${profile.title}”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。`,
      },
      {
        label: "模型与概率语义",
        detail: `“${profile.title}”的结构、参数化、先验、似然、条件独立和归一约定已冻结。`,
      },
      {
        label: "推断与数值诊断",
        detail: `“${profile.title}”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。`,
      },
      {
        label: "预测与外部边界",
        detail: `“${profile.title}”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。`,
      },
    ],
  };
  return `"use client";

import {
  PrmlEvidenceLab,
  type PrmlEvidenceModel,
} from "./prml-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies PrmlEvidenceModel;

export function ${profile.componentBase}ProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function ${profile.componentBase}InferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function ${profile.componentBase}PredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
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
import { ${profile.componentBase}ProbabilisticModelLab, ${profile.componentBase}InferenceTraceLab, ${profile.componentBase}PredictiveCheckLab } from "@/components/mdx/${BOOK}/v2/${slug}";

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
    description: `${profile.duty}；用概率模型状态、单故障推断轨迹和预测检验门完成独立复核。`,
    demo: true,
    math: false,
    sourceUrl: SOURCES.original,
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
  /^\d+\s/.test(item),
).length;
const numberedTopics = allConcepts.filter((item) =>
  /^\d+(?:\.\d+)+\s/.test(item),
).length;
const appendixLevels = allConcepts.filter((item) =>
  /^Appendix\s+[A-E]\s/.test(item),
).length;
const catalogLevels = allConcepts.length;
if (
  chapterHeadings !== 14 ||
  numberedTopics !== 247 ||
  appendixLevels !== 5 ||
  catalogLevels !== 266
) {
  throw new Error(
    `目录口径应为14章+247编号层级+5附录=266，实际${chapterHeadings}+${numberedTopics}+${appendixLevels}=${catalogLevels}`,
  );
}

manifestDocument.books[BOOK] = {
  ...previousManifest,
  edition:
    "Christopher M. Bishop著，陈翔、张存旺、姜振东、刘志毅、许劭华译《模式识别与机器学习》，人民邮电出版社，2026年1月，595页，ISBN 9787115681409；原版Pattern Recognition and Machine Learning，Springer，2006年，ISBN 9780387310732",
  sourceKind:
    "official-author-downloadable-full-text-complete-fourteen-chapter-two-hundred-forty-seven-numbered-section-five-appendix-outline-cross-checked-with-springer-and-author-errata",
  sourceUrl: SOURCES.original,
  secondarySourceUrls: Object.values(SOURCES).slice(1),
  status: "verified-full-text",
  verifiedAt: "2026-07-30",
  disclosureNote:
    "Microsoft Research作者出版页及作者公开完整PDF确认Christopher M. Bishop著原版由Springer于2006年出版，Springer官方书目交叉核对第一版、ISBN 9780387310732及14章5附录结构，作者勘误表纠正已知排印问题。原版目录逐项统计14个章标题、247个编号节/小节和附录A-E，共266个正式层级。课程按14章与5个附录逐一覆盖，另设学习地图和总复习，共21页、63个章专属交互。可访问一手全文仅用于事实与范围核对，全部中文解释、推导、数值实验、交互、练习与答案均为独立教学重写。中文发行书目只核对2026年人民邮电出版社译本的书目信息。旧页面虽列出目录，却缺少合法目标/归属结构、预测检验和可复核交互，现已整体替换。",
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
  sourceAccess: "full-text-primary",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/pattern-recognition-ml-v2-profiles.json",
  factSourcePolicy:
    "Microsoft Research作者出版页、作者公开完整PDF、Springer官方书目与作者勘误表限定2006年原版事实和266个目录层级；概率分布、线性模型、神经网络、核方法、SVM/RVM、图模型、EM、变分、MCMC、连续潜变量、序列与组合模型分别以原始论文、官方技术文档或权威实现文档核对。2026年中文译本书目信息与当前扩展分层记录，后续模型不得反写原版。",
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
      fullTextSources: [SOURCES.original, SOURCES.originalPdf],
      outlineSources: [SOURCES.original, SOURCES.originalPdf, SOURCES.springer],
      errataSource: SOURCES.errata,
      translationCatalogSource: SOURCES.chineseCatalog,
      technicalSources: Object.values(SOURCES).slice(5),
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
  `已重建 ${profiles.length} 页，覆盖${chapterHeadings}章+${numberedTopics}编号层级+${appendixLevels}附录=${catalogLevels}个原版层级，生成 ${profiles.length * 3} 个交互视图。`,
);
