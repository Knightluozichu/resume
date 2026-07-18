import type { ReviewQuestion } from "./types";
export const hfsOfficialChapterQuestions:ReviewQuestion[]=[
  {
    "id": "hfs-visualizing-information-1",
    "chapter": "hfs-visualizing-information",
    "level": 1,
    "question": "分类数据是什么？",
    "answer": "取值表示类别而非可运算数量，适合频数表和条形图。",
    "tags": [
      "第1章 信息可视化：第一印象",
      "分类数据"
    ]
  },
  {
    "id": "hfs-visualizing-information-2",
    "chapter": "hfs-visualizing-information",
    "level": 2,
    "question": "数值数据与直方图面积怎样连接？",
    "answer": "取值具有数量意义，可进一步区分离散与连续并选择分组。 组距不等时柱高应使用频数密度，使柱面积而非高度与频数成正比。",
    "tags": [
      "第1章 信息可视化：第一印象",
      "机制"
    ]
  },
  {
    "id": "hfs-visualizing-information-3",
    "chapter": "hfs-visualizing-information",
    "level": 3,
    "question": "如何检查累积频数的边界？",
    "answer": "按有序组逐步累加频数或比例，用于读取阈值以下的数量和分位点。 加入空、极端、偏态和相关输入并解释失败。",
    "tags": [
      "第1章 信息可视化：第一印象",
      "边界"
    ]
  },
  {
    "id": "hfs-visualizing-information-4",
    "chapter": "hfs-visualizing-information",
    "level": 4,
    "question": "如何验收图表选择？",
    "answer": "根据比较类别、观察分布或读取累计值选择编码，并固定清楚的尺度与基线。 产品看板比较不同宽度的延迟区间时，应画频数密度而非原始计数高度；同时保留样本量、时间窗和缺失比例。若纵轴截断，必须明确标注，避免把微小差异渲染成巨大变化。",
    "tags": [
      "第1章 信息可视化：第一印象",
      "验收"
    ]
  },
  {
    "id": "hfs-central-tendency-1",
    "chapter": "hfs-central-tendency",
    "level": 1,
    "question": "算术均值是什么？",
    "answer": "所有观测总和除以数量，也是平方误差损失下的最佳常数预测。",
    "tags": [
      "第2章 集中趋势：中间道路",
      "算术均值"
    ]
  },
  {
    "id": "hfs-central-tendency-2",
    "chapter": "hfs-central-tendency",
    "level": 2,
    "question": "加权均值与中位数怎样连接？",
    "answer": "频数或重要度作为权重时，用加权总和除以权重总和。 排序后位于中间的值，最小化绝对误差并对极端值更稳健。",
    "tags": [
      "第2章 集中趋势：中间道路",
      "机制"
    ]
  },
  {
    "id": "hfs-central-tendency-3",
    "chapter": "hfs-central-tendency",
    "level": 3,
    "question": "如何检查众数的边界？",
    "answer": "出现频数最高的取值，可有多个或不存在，适合分类变量。 加入空、极端、偏态和相关输入并解释失败。",
    "tags": [
      "第2章 集中趋势：中间道路",
      "边界"
    ]
  },
  {
    "id": "hfs-central-tendency-4",
    "chapter": "hfs-central-tendency",
    "level": 4,
    "question": "如何验收离群点影响？",
    "answer": "极端值能显著拉动均值，却通常不改变大多数样本的次序位置。 薪资报告若只给均值，少量高薪会掩盖典型员工处境。应并列中位数、分位数和样本构成；若决策关心总成本，均值仍有意义。指标不是互相替代，而是回答不同问题。",
    "tags": [
      "第2章 集中趋势：中间道路",
      "验收"
    ]
  },
  {
    "id": "hfs-variability-spread-1",
    "chapter": "hfs-variability-spread",
    "level": 1,
    "question": "极差是什么？",
    "answer": "最大值减最小值，计算简单但完全由两个端点决定。",
    "tags": [
      "第3章 变异与离散：有力的范围",
      "极差"
    ]
  },
  {
    "id": "hfs-variability-spread-2",
    "chapter": "hfs-variability-spread",
    "level": 2,
    "question": "四分位距与方差怎样连接？",
    "answer": "上四分位数减下四分位数，描述中间一半数据并降低离群点影响。 平方偏差的平均或无偏估计，量纲被平方但便于代数分解。",
    "tags": [
      "第3章 变异与离散：有力的范围",
      "机制"
    ]
  },
  {
    "id": "hfs-variability-spread-3",
    "chapter": "hfs-variability-spread",
    "level": 3,
    "question": "如何检查标准差的边界？",
    "answer": "方差平方根，恢复原单位并衡量典型偏离尺度。 加入空、极端、偏态和相关输入并解释失败。",
    "tags": [
      "第3章 变异与离散：有力的范围",
      "边界"
    ]
  },
  {
    "id": "hfs-variability-spread-4",
    "chapter": "hfs-variability-spread",
    "level": 4,
    "question": "如何验收标准分数？",
    "answer": "观测减均值再除标准差，把不同单位数据转换为相对位置。 两个服务平均延迟都为100毫秒，一个稳定在95到105，另一个在20与500之间波动。容量与体验决策必须看标准差、IQR和尾分位数。标准分数可比较不同接口，但重尾时仍要保留原分布。",
    "tags": [
      "第3章 变异与离散：有力的范围",
      "验收"
    ]
  },
  {
    "id": "hfs-calculating-probabilities-1",
    "chapter": "hfs-calculating-probabilities",
    "level": 1,
    "question": "互斥事件是什么？",
    "answer": "两个事件不能同时发生，交集为空时并集概率可直接相加。",
    "tags": [
      "第4章 概率计算：把握机会",
      "互斥事件"
    ]
  },
  {
    "id": "hfs-calculating-probabilities-2",
    "chapter": "hfs-calculating-probabilities",
    "level": 2,
    "question": "条件概率与概率树怎样连接？",
    "answer": "已知B发生后在B对应的子空间重新归一化A的概率。 按时间或条件顺序展开分支，路径概率相乘、互斥路径概率相加。",
    "tags": [
      "第4章 概率计算：把握机会",
      "机制"
    ]
  },
  {
    "id": "hfs-calculating-probabilities-3",
    "chapter": "hfs-calculating-probabilities",
    "level": 3,
    "question": "如何检查全概率公式的边界？",
    "answer": "按互斥完备条件分区汇总目标事件概率。 加入空、极端、偏态和相关输入并解释失败。",
    "tags": [
      "第4章 概率计算：把握机会",
      "边界"
    ]
  },
  {
    "id": "hfs-calculating-probabilities-4",
    "chapter": "hfs-calculating-probabilities",
    "level": 4,
    "question": "如何验收贝叶斯定理？",
    "answer": "用似然和先验更新后验，证据概率负责归一化。 告警系统的后验可信度取决于故障基率、召回和误报率。即使召回很高，低基率也会让多数告警为假。看板应展示分子分母的真实计数，而不只展示一个“准确率”。",
    "tags": [
      "第4章 概率计算：把握机会",
      "验收"
    ]
  },
  {
    "id": "hfs-discrete-probability-distributions-1",
    "chapter": "hfs-discrete-probability-distributions",
    "level": 1,
    "question": "随机变量是什么？",
    "answer": "把样本空间结果映射为数值，变量的分布由试验机制诱导。",
    "tags": [
      "第5章 离散概率分布：管理期望",
      "随机变量"
    ]
  },
  {
    "id": "hfs-discrete-probability-distributions-2",
    "chapter": "hfs-discrete-probability-distributions",
    "level": 2,
    "question": "概率质量函数与期望怎样连接？",
    "answer": "为每个离散取值分配非负概率且总和为1。 概率加权平均，具有线性性，即使变量不独立也可相加。",
    "tags": [
      "第5章 离散概率分布：管理期望",
      "机制"
    ]
  },
  {
    "id": "hfs-discrete-probability-distributions-3",
    "chapter": "hfs-discrete-probability-distributions",
    "level": 3,
    "question": "如何检查方差的边界？",
    "answer": "围绕期望的平方偏差；独立变量方差相加。 加入空、极端、偏态和相关输入并解释失败。",
    "tags": [
      "第5章 离散概率分布：管理期望",
      "边界"
    ]
  },
  {
    "id": "hfs-discrete-probability-distributions-4",
    "chapter": "hfs-discrete-probability-distributions",
    "level": 4,
    "question": "如何验收线性变换？",
    "answer": "Y等于aX加b时，期望变为aE[X]加b，方差变为a平方Var(X)。 促销收益不能只看期望为正，还要看方差和最坏损失。两个游戏平均收益相同，尾部风险可能不同。模拟应与解析期望交叉验证，并记录独立性、赔付上限和样本误差。",
    "tags": [
      "第5章 离散概率分布：管理期望",
      "验收"
    ]
  },
  {
    "id": "hfs-permutations-combinations-1",
    "chapter": "hfs-permutations-combinations",
    "level": 1,
    "question": "阶乘是什么？",
    "answer": "n个不同对象全排列的数量，递归满足n乘(n减1)阶乘。",
    "tags": [
      "第6章 排列与组合：安排次序",
      "阶乘"
    ]
  },
  {
    "id": "hfs-permutations-combinations-2",
    "chapter": "hfs-permutations-combinations",
    "level": 2,
    "question": "排列与组合怎样连接？",
    "answer": "从n个不同对象取r个且顺序重要。 从n个不同对象取r个但内部顺序不重要。",
    "tags": [
      "第6章 排列与组合：安排次序",
      "机制"
    ]
  },
  {
    "id": "hfs-permutations-combinations-3",
    "chapter": "hfs-permutations-combinations",
    "level": 3,
    "question": "如何检查重复对象排列的边界？",
    "answer": "相同类型交换不产生新结果，需要除以各类型数量的阶乘。 加入空、极端、偏态和相关输入并解释失败。",
    "tags": [
      "第6章 排列与组合：安排次序",
      "边界"
    ]
  },
  {
    "id": "hfs-permutations-combinations-4",
    "chapter": "hfs-permutations-combinations",
    "level": 4,
    "question": "如何验收计数假设？",
    "answer": "等可能性、可区分性和是否放回必须先声明。 实验分组从20名用户选3名观察员，若角色相同用组合；若分别担任主持、记录和复核则用排列。数据表应保留角色语义，否则后续计算无法知道是否重复计数。",
    "tags": [
      "第6章 排列与组合：安排次序",
      "验收"
    ]
  },
  {
    "id": "hfs-geometric-binomial-poisson-1",
    "chapter": "hfs-geometric-binomial-poisson",
    "level": 1,
    "question": "几何分布是什么？",
    "answer": "独立伯努利试验直到首次成功的试验次数，期望为1除以p。",
    "tags": [
      "第7章 几何、二项与泊松分布：离散模型",
      "几何分布"
    ]
  },
  {
    "id": "hfs-geometric-binomial-poisson-2",
    "chapter": "hfs-geometric-binomial-poisson",
    "level": 2,
    "question": "二项分布与泊松分布怎样连接？",
    "answer": "固定n次独立同概率试验中的成功次数。 固定区间内独立稀疏到达次数，均值与方差都为lambda。",
    "tags": [
      "第7章 几何、二项与泊松分布：离散模型",
      "机制"
    ]
  },
  {
    "id": "hfs-geometric-binomial-poisson-3",
    "chapter": "hfs-geometric-binomial-poisson",
    "level": 3,
    "question": "如何检查参数假设的边界？",
    "answer": "独立、固定概率或稳定到达率是公式成立的核心。 加入空、极端、偏态和相关输入并解释失败。",
    "tags": [
      "第7章 几何、二项与泊松分布：离散模型",
      "边界"
    ]
  },
  {
    "id": "hfs-geometric-binomial-poisson-4",
    "chapter": "hfs-geometric-binomial-poisson",
    "level": 4,
    "question": "如何验收分布可加性？",
    "answer": "独立泊松变量相加仍为泊松，参数相加。 每分钟请求到达数可近似泊松，但发布或故障会产生突发和相关。应按时间段检验均值方差关系与过度离散，再决定使用泊松、负二项或经验模型。",
    "tags": [
      "第7章 几何、二项与泊松分布：离散模型",
      "验收"
    ]
  },
  {
    "id": "hfs-normal-distribution-1",
    "chapter": "hfs-normal-distribution",
    "level": 1,
    "question": "概率密度是什么？",
    "answer": "区间下的面积是概率，曲线高度本身不是点概率。",
    "tags": [
      "第8章 正态分布：保持正常",
      "概率密度"
    ]
  },
  {
    "id": "hfs-normal-distribution-2",
    "chapter": "hfs-normal-distribution",
    "level": 2,
    "question": "正态分布与标准化怎样连接？",
    "answer": "对称钟形连续分布，由均值定位、标准差定宽。 减均值并除标准差，把位置转换为距均值多少个标准差。",
    "tags": [
      "第8章 正态分布：保持正常",
      "机制"
    ]
  },
  {
    "id": "hfs-normal-distribution-3",
    "chapter": "hfs-normal-distribution",
    "level": 3,
    "question": "如何检查标准正态的边界？",
    "answer": "均值0、方差1的正态分布，为概率表与统一计算提供基准。 加入空、极端、偏态和相关输入并解释失败。",
    "tags": [
      "第8章 正态分布：保持正常",
      "边界"
    ]
  },
  {
    "id": "hfs-normal-distribution-4",
    "chapter": "hfs-normal-distribution",
    "level": 4,
    "question": "如何验收区间概率？",
    "answer": "用累积分布函数之差计算，需明确端点和尾部方向。 制造尺寸只有在过程稳定、单峰且近似对称时才适合正态模型。规格合格率应由区间概率计算，同时用QQ图或残差检查模型；截断和混合批次会破坏钟形假设。",
    "tags": [
      "第8章 正态分布：保持正常",
      "验收"
    ]
  },
  {
    "id": "hfs-normal-beyond-1",
    "chapter": "hfs-normal-beyond",
    "level": 1,
    "question": "正态线性组合是什么？",
    "answer": "独立正态变量的线性组合仍为正态，均值线性组合、方差平方加权。",
    "tags": [
      "第9章 正态分布进阶：超越正态",
      "正态线性组合"
    ]
  },
  {
    "id": "hfs-normal-beyond-2",
    "chapter": "hfs-normal-beyond",
    "level": 2,
    "question": "独立观测与二项正态近似怎样连接？",
    "answer": "独立性让协方差为零，从而方差可直接相加。 np和n(1-p)足够大时，可用同均值方差正态分布近似。",
    "tags": [
      "第9章 正态分布进阶：超越正态",
      "机制"
    ]
  },
  {
    "id": "hfs-normal-beyond-3",
    "chapter": "hfs-normal-beyond",
    "level": 3,
    "question": "如何检查泊松正态近似的边界？",
    "answer": "lambda较大时泊松形状趋近正态，均值方差均为lambda。 加入空、极端、偏态和相关输入并解释失败。",
    "tags": [
      "第9章 正态分布进阶：超越正态",
      "边界"
    ]
  },
  {
    "id": "hfs-normal-beyond-4",
    "chapter": "hfs-normal-beyond",
    "level": 4,
    "question": "如何验收连续性校正？",
    "answer": "把离散整数事件扩成相邻半单位边界，减少连续面积近似误差。 库存缺货概率若需求是大参数泊松可用正态快速近似，但阈值靠近尾部或lambda小应使用精确分布。系统可根据误差预算切换算法，并在监控中对比精确抽样。",
    "tags": [
      "第9章 正态分布进阶：超越正态",
      "验收"
    ]
  },
  {
    "id": "hfs-statistical-sampling-1",
    "chapter": "hfs-statistical-sampling",
    "level": 1,
    "question": "目标总体是什么？",
    "answer": "研究结论希望推广到的完整对象集合。",
    "tags": [
      "第10章 统计抽样：取得样本",
      "目标总体"
    ]
  },
  {
    "id": "hfs-statistical-sampling-2",
    "chapter": "hfs-statistical-sampling",
    "level": 2,
    "question": "抽样单位与抽样框怎样连接？",
    "answer": "实际被选择的基本对象，可能与观测记录粒度不同。 可被抽取对象的清单；漏覆盖和重复条目会造成选择偏差。",
    "tags": [
      "第10章 统计抽样：取得样本",
      "机制"
    ]
  },
  {
    "id": "hfs-statistical-sampling-3",
    "chapter": "hfs-statistical-sampling",
    "level": 3,
    "question": "如何检查简单随机抽样的边界？",
    "answer": "每个同规模样本有相同机会被选，需可靠随机机制。 加入空、极端、偏态和相关输入并解释失败。",
    "tags": [
      "第10章 统计抽样：取得样本",
      "边界"
    ]
  },
  {
    "id": "hfs-statistical-sampling-4",
    "chapter": "hfs-statistical-sampling",
    "level": 4,
    "question": "如何验收分层与整群？",
    "answer": "分层在组内抽样提高代表性，整群抽取整组降低成本但增加相关。 只向活跃用户发问卷即使回收百万份，也无法代表流失用户。先定义目标总体，再补齐抽样框和响应权重；报告覆盖率与非响应，而不是用大样本量掩盖选择偏差。",
    "tags": [
      "第10章 统计抽样：取得样本",
      "验收"
    ]
  },
  {
    "id": "hfs-estimating-populations-1",
    "chapter": "hfs-estimating-populations",
    "level": 1,
    "question": "参数与统计量是什么？",
    "answer": "参数描述总体且固定未知，统计量由随机样本计算因而有分布。",
    "tags": [
      "第11章 估计总体与样本：做出预测",
      "参数与统计量"
    ]
  },
  {
    "id": "hfs-estimating-populations-2",
    "chapter": "hfs-estimating-populations",
    "level": 2,
    "question": "点估计量与样本比例怎样连接？",
    "answer": "用统计量猜测参数，应评价偏差、方差和一致性。 成功数除以样本量，期望为总体比例，方差随n下降。",
    "tags": [
      "第11章 估计总体与样本：做出预测",
      "机制"
    ]
  },
  {
    "id": "hfs-estimating-populations-3",
    "chapter": "hfs-estimating-populations",
    "level": 3,
    "question": "如何检查抽样分布的边界？",
    "answer": "重复抽样时统计量的概率分布，是不确定性量化基础。 加入空、极端、偏态和相关输入并解释失败。",
    "tags": [
      "第11章 估计总体与样本：做出预测",
      "边界"
    ]
  },
  {
    "id": "hfs-estimating-populations-4",
    "chapter": "hfs-estimating-populations",
    "level": 4,
    "question": "如何验收中心极限定理？",
    "answer": "独立同分布且方差有限时，大样本标准化均值趋近正态。 上线指标的单日均值不是总体参数本身。应按用户或实验单位定义独立性，估计抽样分布并检查重尾。若同一用户贡献多条记录，按记录当独立样本会夸大有效样本量。",
    "tags": [
      "第11章 估计总体与样本：做出预测",
      "验收"
    ]
  },
  {
    "id": "hfs-confidence-intervals-1",
    "chapter": "hfs-confidence-intervals",
    "level": 1,
    "question": "置信水平是什么？",
    "answer": "重复使用同一构造程序时覆盖真参数的长期比例。",
    "tags": [
      "第12章 构造置信区间：有把握地猜",
      "置信水平"
    ]
  },
  {
    "id": "hfs-confidence-intervals-2",
    "chapter": "hfs-confidence-intervals",
    "level": 2,
    "question": "标准误与临界值怎样连接？",
    "answer": "统计量抽样分布的标准差，量化样本到样本的波动。 由置信水平和参考分布决定的标准化边界。",
    "tags": [
      "第12章 构造置信区间：有把握地猜",
      "机制"
    ]
  },
  {
    "id": "hfs-confidence-intervals-3",
    "chapter": "hfs-confidence-intervals",
    "level": 3,
    "question": "如何检查z区间的边界？",
    "answer": "已知总体标准差或大样本近似下使用标准正态临界值。 加入空、极端、偏态和相关输入并解释失败。",
    "tags": [
      "第12章 构造置信区间：有把握地猜",
      "边界"
    ]
  },
  {
    "id": "hfs-confidence-intervals-4",
    "chapter": "hfs-confidence-intervals",
    "level": 4,
    "question": "如何验收t区间？",
    "answer": "小样本均值且总体标准差未知时，用更厚尾的t分布和n减1自由度。 性能回归报告同时给平均差和95%区间。区间跨零不代表“没有差异”，而是当前数据无法排除零；区间若很宽，应增加独立样本或降低噪声，而不是只追求p值。",
    "tags": [
      "第12章 构造置信区间：有把握地猜",
      "验收"
    ]
  },
  {
    "id": "hfs-hypothesis-tests-1",
    "chapter": "hfs-hypothesis-tests",
    "level": 1,
    "question": "原假设是什么？",
    "answer": "作为基准被检验的参数声明，统计量分布在其成立时可计算。",
    "tags": [
      "第13章 假设检验：查看证据",
      "原假设"
    ]
  },
  {
    "id": "hfs-hypothesis-tests-2",
    "chapter": "hfs-hypothesis-tests",
    "level": 2,
    "question": "备择假设与显著性水平怎样连接？",
    "answer": "希望检测的偏离方向，可为单侧或双侧并应预先指定。 长期第一类错误率上限，决定拒绝区域。",
    "tags": [
      "第13章 假设检验：查看证据",
      "机制"
    ]
  },
  {
    "id": "hfs-hypothesis-tests-3",
    "chapter": "hfs-hypothesis-tests",
    "level": 3,
    "question": "如何检查p值的边界？",
    "answer": "原假设下观察到当前或更极端统计量的概率。 加入空、极端、偏态和相关输入并解释失败。",
    "tags": [
      "第13章 假设检验：查看证据",
      "边界"
    ]
  },
  {
    "id": "hfs-hypothesis-tests-4",
    "chapter": "hfs-hypothesis-tests",
    "level": 4,
    "question": "如何验收功效？",
    "answer": "备择真实时正确拒绝原假设的概率，受效应、样本量和噪声影响。 药物或产品实验必须预注册主指标、方向、样本量和停止规则。反复窥视数据会提高误报率。报告应包含效应、区间、p值、功效和不良后果，避免“显著即重要”。",
    "tags": [
      "第13章 假设检验：查看证据",
      "验收"
    ]
  },
  {
    "id": "hfs-chi-square-1",
    "chapter": "hfs-chi-square",
    "level": 1,
    "question": "观察频数是什么？",
    "answer": "样本中实际落入每个类别或列联表单元的计数。",
    "tags": [
      "第14章 卡方分布：事情不对劲",
      "观察频数"
    ]
  },
  {
    "id": "hfs-chi-square-2",
    "chapter": "hfs-chi-square",
    "level": 2,
    "question": "期望频数与卡方统计量怎样连接？",
    "answer": "原假设与边际总数决定的理论计数。 累加平方差除以期望，使不同规模单元可比较。",
    "tags": [
      "第14章 卡方分布：事情不对劲",
      "机制"
    ]
  },
  {
    "id": "hfs-chi-square-3",
    "chapter": "hfs-chi-square",
    "level": 3,
    "question": "如何检查自由度的边界？",
    "answer": "约束后可独立变化的信息数量，列联表为(r-1)(c-1)。 加入空、极端、偏态和相关输入并解释失败。",
    "tags": [
      "第14章 卡方分布：事情不对劲",
      "边界"
    ]
  },
  {
    "id": "hfs-chi-square-4",
    "chapter": "hfs-chi-square",
    "level": 4,
    "question": "如何验收独立性检验？",
    "answer": "检验两个分类变量联合频数是否可由边际概率乘积解释。 转化率按设备和版本做列联表，可检验变量是否独立。但期望频数太小会破坏渐近近似，应合并有意义类别或用精确检验；显著后还要查看标准化残差定位差异单元。",
    "tags": [
      "第14章 卡方分布：事情不对劲",
      "验收"
    ]
  },
  {
    "id": "hfs-correlation-regression-1",
    "chapter": "hfs-correlation-regression",
    "level": 1,
    "question": "双变量数据是什么？",
    "answer": "每个观察单位提供成对x与y，配对关系不能在聚合中丢失。",
    "tags": [
      "第15章 相关与回归：最佳拟合线",
      "双变量数据"
    ]
  },
  {
    "id": "hfs-correlation-regression-2",
    "chapter": "hfs-correlation-regression",
    "level": 2,
    "question": "散点图与相关系数怎样连接？",
    "answer": "展示方向、形态、强度、离群点和分群，是计算相关前的必要检查。 标准化协方差，位于负1到1并仅衡量线性关联。",
    "tags": [
      "第15章 相关与回归：最佳拟合线",
      "机制"
    ]
  },
  {
    "id": "hfs-correlation-regression-3",
    "chapter": "hfs-correlation-regression",
    "level": 3,
    "question": "如何检查最小二乘线的边界？",
    "answer": "选择截距斜率使纵向残差平方和最小。 加入空、极端、偏态和相关输入并解释失败。",
    "tags": [
      "第15章 相关与回归：最佳拟合线",
      "边界"
    ]
  },
  {
    "id": "hfs-correlation-regression-4",
    "chapter": "hfs-correlation-regression",
    "level": 4,
    "question": "如何验收残差分析？",
    "answer": "观察预测误差是否随机、等方差且无结构，以检查线性模型。 日照与演唱会出席相关不证明日照直接导致购买。天气可能同时影响营销、交通和日期选择。回归报告应展示散点、残差、区间和外推范围，并把因果结论留给随机实验或明确因果设计。",
    "tags": [
      "第15章 相关与回归：最佳拟合线",
      "验收"
    ]
  }
];
