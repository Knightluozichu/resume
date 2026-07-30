#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "deep-learning-textbook";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/deep-learning-textbook/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/deep-learning-textbook-v2-profiles.json",
);

const SOURCES = {
  authorToc: "https://www.deeplearningbook.org/contents/TOC.html",
  authorSite: "https://www.deeplearningbook.org/",
  mitPress: "https://mitpress.mit.edu/9780262035613/deep-learning/",
  license: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
  chinese:
    "https://detail.youzan.com/show/goods?alias=275704xsv5xoh&from_source=gbox_seo",
  numpy: "https://numpy.org/doc/stable/reference/routines.linalg.html",
  scipy: "https://docs.scipy.org/doc/scipy/reference/stats.html",
  pytorchAutograd: "https://docs.pytorch.org/docs/stable/autograd.html",
  pytorchNn: "https://docs.pytorch.org/docs/stable/nn.html",
  pytorchOptim: "https://docs.pytorch.org/docs/stable/optim.html",
  pytorchData: "https://docs.pytorch.org/docs/stable/data.html",
  onnx: "https://onnx.ai/onnx/intro/",
};

const PATHS = {
  learningMap: "00-learning-map/dlt-official-learning-map",
  "dlt-01": "01-introduction/dlt-01-introduction",
  "dlt-02": "02-linear-algebra/dlt-02-linear-algebra",
  "dlt-03": "03-probability-information/dlt-03-probability-information",
  "dlt-04": "04-numerical-computation/dlt-04-numerical-computation",
  "dlt-05": "05-machine-learning-basics/dlt-05-machine-learning-basics",
  "dlt-06": "06-feedforward-networks/dlt-06-feedforward-networks",
  "dlt-07": "07-regularization/dlt-07-regularization",
  "dlt-08": "08-optimization/dlt-08-optimization",
  "dlt-09": "09-convolutional-networks/dlt-09-convolutional-networks",
  "dlt-10": "10-sequence-modeling/dlt-10-sequence-modeling",
  "dlt-11": "11-practical-methodology/dlt-11-practical-methodology",
  "dlt-12": "12-applications/dlt-12-applications",
  "dlt-13": "13-linear-factor-models/dlt-13-linear-factor-models",
  "dlt-14": "14-autoencoders/dlt-14-autoencoders",
  "dlt-15": "15-representation-learning/dlt-15-representation-learning",
  "dlt-16":
    "16-structured-probabilistic-models/dlt-16-structured-probabilistic-models",
  "dlt-17": "17-monte-carlo/dlt-17-monte-carlo",
  "dlt-18": "18-partition-function/dlt-18-partition-function",
  "dlt-19": "19-approximate-inference/dlt-19-approximate-inference",
  "dlt-20": "20-deep-generative-models/dlt-20-deep-generative-models",
  finalReview: "21-final-review/dlt-official-final-review",
};

const SECOND_LEVEL_CONCEPTS = {
  "dlt-01": [
    "1.2.1 神经网络的众多名称和命运变迁",
    "1.2.2 与日俱增的数据量",
    "1.2.3 与日俱增的模型规模",
    "1.2.4 与日俱增的精度、复杂度和对现实世界的冲击",
  ],
  "dlt-03": [
    "3.3.1 离散型变量和概率质量函数",
    "3.3.2 连续型变量和概率密度函数",
    "3.9.1 Bernoulli分布",
    "3.9.2 Multinoulli分布",
    "3.9.3 高斯分布",
    "3.9.4 指数分布和Laplace分布",
    "3.9.5 Dirac分布和经验分布",
    "3.9.6 分布的混合",
  ],
  "dlt-04": ["4.3.1 梯度之上：Jacobian和Hessian矩阵"],
  "dlt-05": [
    "5.1.1 任务T",
    "5.1.2 性能度量P",
    "5.1.3 经验E",
    "5.1.4 示例：线性回归",
    "5.2.1 没有免费午餐定理",
    "5.2.2 正则化",
    "5.3.1 交叉验证",
    "5.4.1 点估计",
    "5.4.2 偏差",
    "5.4.3 方差和标准差",
    "5.4.4 权衡偏差和方差以最小化均方误差",
    "5.4.5 一致性",
    "5.5.1 条件对数似然和均方误差",
    "5.5.2 最大似然的性质",
    "5.6.1 最大后验(MAP)估计",
    "5.7.1 概率监督学习",
    "5.7.2 支持向量机",
    "5.7.3 其他简单的监督学习算法",
    "5.8.1 主成分分析",
    "5.8.2 k-均值聚类",
    "5.11.1 维数灾难",
    "5.11.2 局部不变性和平滑正则化",
    "5.11.3 流形学习",
  ],
  "dlt-06": [
    "6.2.1 代价函数",
    "6.2.2 输出单元",
    "6.3.1 整流线性单元及其扩展",
    "6.3.2 logistic sigmoid与双曲正切函数",
    "6.3.3 其他隐藏单元",
    "6.4.1 万能近似性质和深度",
    "6.4.2 其他架构上的考虑",
    "6.5.1 计算图",
    "6.5.2 微积分中的链式法则",
    "6.5.3 递归地使用链式法则来实现反向传播",
    "6.5.4 全连接MLP中的反向传播计算",
    "6.5.5 符号到符号的导数",
    "6.5.6 一般化的反向传播",
    "6.5.7 实例：用于MLP训练的反向传播",
    "6.5.8 复杂化",
    "6.5.9 深度学习界以外的微分",
    "6.5.10 高阶微分",
  ],
  "dlt-07": [
    "7.1.1 L2参数正则化",
    "7.1.2 L1正则化",
    "7.5.1 向输出目标注入噪声",
    "7.9.1 卷积神经网络",
  ],
  "dlt-08": [
    "8.1.1 经验风险最小化",
    "8.1.2 代理损失函数和提前终止",
    "8.1.3 批量算法和小批量算法",
    "8.2.1 病态",
    "8.2.2 局部极小值",
    "8.2.3 高原、鞍点和其他平坦区域",
    "8.2.4 悬崖和梯度爆炸",
    "8.2.5 长期依赖",
    "8.2.6 非精确梯度",
    "8.2.7 局部和全局结构间的弱对应",
    "8.2.8 优化的理论限制",
    "8.3.1 随机梯度下降",
    "8.3.2 动量",
    "8.3.3 Nesterov动量",
    "8.5.1 AdaGrad",
    "8.5.2 RMSProp",
    "8.5.3 Adam",
    "8.5.4 选择正确的优化算法",
    "8.6.1 牛顿法",
    "8.6.2 共轭梯度",
    "8.6.3 BFGS",
    "8.7.1 批标准化",
    "8.7.2 坐标下降",
    "8.7.3 Polyak平均",
    "8.7.4 监督预训练",
    "8.7.5 设计有助于优化的模型",
    "8.7.6 延拓法和课程学习",
  ],
  "dlt-10": [
    "10.2.1 导师驱动过程和输出循环网络",
    "10.2.2 计算循环神经网络的梯度",
    "10.2.3 作为有向图模型的循环网络",
    "10.2.4 基于上下文的RNN序列建模",
    "10.9.1 时间维度的跳跃连接",
    "10.9.2 渗漏单元和一系列不同时间尺度",
    "10.9.3 删除连接",
    "10.10.1 LSTM",
    "10.10.2 其他门控RNN",
    "10.11.1 截断梯度",
    "10.11.2 引导信息流的正则化",
  ],
  "dlt-11": [
    "11.4.1 手动调整超参数",
    "11.4.2 自动超参数优化算法",
    "11.4.3 网格搜索",
    "11.4.4 随机搜索",
    "11.4.5 基于模型的超参数优化",
  ],
  "dlt-12": [
    "12.1.1 快速的CPU实现",
    "12.1.2 GPU实现",
    "12.1.3 大规模的分布式实现",
    "12.1.4 模型压缩",
    "12.1.5 动态结构",
    "12.1.6 深度网络的专用硬件实现",
    "12.2.1 预处理",
    "12.2.2 数据集增强",
    "12.4.1 n-gram",
    "12.4.2 神经语言模型",
    "12.4.3 高维输出",
    "12.4.4 结合n-gram和神经语言模型",
    "12.4.5 神经机器翻译",
    "12.4.6 历史展望",
    "12.5.1 推荐系统",
    "12.5.2 知识表示、推理和回答",
  ],
  "dlt-14": [
    "14.2.1 稀疏自编码器",
    "14.2.2 去噪自编码器",
    "14.2.3 惩罚导数作为正则",
    "14.5.1 得分估计",
    "14.5.2 历史展望",
  ],
  "dlt-15": ["15.1.1 何时以及为何无监督预训练有效"],
  "dlt-16": [
    "16.2.1 有向模型",
    "16.2.2 无向模型",
    "16.2.3 配分函数",
    "16.2.4 基于能量的模型",
    "16.2.5 分离和d-分离",
    "16.2.6 在有向模型和无向模型中转换",
    "16.2.7 因子图",
    "16.7.1 实例：受限玻尔兹曼机",
  ],
  "dlt-17": [
    "17.1.1 为什么需要采样",
    "17.1.2 蒙特卡罗采样的基础",
    "17.5.1 不同峰值之间通过回火来混合",
    "17.5.2 深度也许会有助于混合",
  ],
  "dlt-18": ["18.7.1 退火重要采样", "18.7.2 桥式采样"],
  "dlt-19": [
    "19.4.1 离散型潜变量",
    "19.4.2 变分法",
    "19.4.3 连续型潜变量",
    "19.4.4 学习和推断之间的相互作用",
    "19.5.1 醒眠算法",
    "19.5.2 学成推断的其他形式",
  ],
  "dlt-20": [
    "20.2.1 条件分布",
    "20.2.2 训练受限玻尔兹曼机",
    "20.4.1 有趣的性质",
    "20.4.2 DBM均匀场推断",
    "20.4.3 DBM的参数学习",
    "20.4.4 逐层预训练",
    "20.4.5 联合训练深度玻尔兹曼机",
    "20.5.1 Gaussian-Bernoulli RBM",
    "20.5.2 条件协方差的无向模型",
    "20.9.1 通过离散随机操作的反向传播",
    "20.10.1 sigmoid信念网络",
    "20.10.2 可微生成器网络",
    "20.10.3 变分自编码器",
    "20.10.4 生成式对抗网络",
    "20.10.5 生成矩匹配网络",
    "20.10.6 卷积生成网络",
    "20.10.7 自回归网络",
    "20.10.8 线性自回归网络",
    "20.10.9 神经自回归网络",
    "20.10.10 NADE",
    "20.11.1 与任意去噪自编码器相关的马尔可夫链",
    "20.11.2 夹合与条件采样",
    "20.11.3 回退训练过程",
    "20.12.1 判别性GSN",
  ],
};

const CHAPTER_SPECS = {
  "dlt-01": {
    duty: "界定本书读者、三部分结构与深度学习发展的数据、规模和能力边界",
    question:
      "怎样区分历史趋势、工程规模增长与可验证的学习机制，而不把时间线当作因果证明？",
    scenario: "复核一项跨年代的深度学习能力主张",
    invariant: "年份、数据规模、模型规模、任务、度量和计算预算必须同表对齐",
    fault: "把同期增长的计算量和精度直接写成单一因果关系",
    artifact: "带来源、口径与反例的历史趋势证据表",
    focus: "时间线、规模变量与因果边界",
    sources: [SOURCES.mitPress, SOURCES.authorToc],
  },
  "dlt-02": {
    duty: "用向量、矩阵、张量、范数与分解建立后续模型的形状和几何语言",
    question:
      "怎样用shape、基变换和重构误差证明一次线性代数操作与模型语义一致？",
    scenario: "对一批样本做线性变换、分解与低秩重构",
    invariant: "维度、基、秩、数值精度和重构口径在变换前后可追溯",
    fault: "矩阵乘法维度虽可广播却改变了样本轴和特征轴含义",
    artifact: "shape账本、分解残差与低秩重构报告",
    focus: "形状、子空间、谱与重构",
    sources: [SOURCES.numpy, SOURCES.authorSite],
  },
  "dlt-03": {
    duty: "建立随机变量、分布、条件关系和信息量的统一概率合同",
    question:
      "怎样区分概率质量、概率密度、条件分布与信息量，并用归一化和采样交叉验证？",
    scenario: "比较离散、连续和混合分布上的预测",
    invariant: "支持集、归一化、条件方向、随机变量角色和对数底必须一致",
    fault: "把连续密度在单点的高度直接解释为该点概率",
    artifact: "分布账本、条件依赖图与信息量复算表",
    focus: "分布、条件独立与信息量",
    sources: [SOURCES.scipy, SOURCES.authorSite],
  },
  "dlt-04": {
    duty: "把浮点稳定性、条件数、梯度和约束优化连接成可诊断数值过程",
    question: "怎样定位上溢、下溢、病态和梯度误差的首个数值分岔？",
    scenario: "在同一目标上比较直接计算、稳定变换和受约束求解",
    invariant: "dtype、缩放、条件数、梯度检查、约束和停止条件必须冻结",
    fault: "目标下降被误当作问题良态且梯度正确的证明",
    artifact: "稳定性探针、梯度核对与约束残差报告",
    focus: "浮点稳定、条件数与优化残差",
    sources: [SOURCES.numpy, SOURCES.pytorchAutograd],
  },
  "dlt-05": {
    duty: "用任务、经验、性能、容量、估计与验证建立机器学习实验合同",
    question:
      "怎样把训练、选择和封存测试分离，并用偏差—方差与泛化证据裁决模型？",
    scenario: "为同一监督或无监督任务比较多个候选模型",
    invariant: "任务T、度量P、经验E、实体切分、超参数选择和测试封存必须一致",
    fault: "反复查看测试集后挑选模型并仍称其为独立泛化评估",
    artifact: "数据角色表、候选比较与一次测试报告",
    focus: "学习合同、估计与泛化",
    sources: [SOURCES.pytorchData, SOURCES.authorSite],
  },
  "dlt-06": {
    duty: "从XOR、隐藏单元与架构设计推导前馈网络和反向传播计算图",
    question: "怎样逐节点验证前向shape、局部导数和反向梯度共同实现目标更新？",
    scenario: "训练一个可手算小批次的多层感知机",
    invariant: "激活、损失、计算图、参数shape、梯度缩放和更新顺序必须一致",
    fault: "广播产生合法shape却让偏置梯度沿错误维度累加",
    artifact: "前向张量表、局部导数与梯度有限差分报告",
    focus: "计算图、激活与反向传播",
    sources: [SOURCES.pytorchAutograd, SOURCES.pytorchNn],
  },
  "dlt-07": {
    duty: "比较范数惩罚、数据增强、噪声、早停、共享、集成与对抗训练的正则机制",
    question:
      "怎样证明一种正则化改变了有效容量或数据分布，而不是只改变训练分数？",
    scenario: "在固定切分和预算下比较基线与单一正则化",
    invariant: "数据、模型、预算、选择规则和评估集固定，每次只改变一个正则条件",
    fault: "同时加入增强、Dropout和早停后把收益归因给其中一个机制",
    artifact: "容量代理、学习曲线与单因素消融报告",
    focus: "容量、噪声与泛化约束",
    sources: [SOURCES.pytorchNn, SOURCES.authorSite],
  },
  "dlt-08": {
    duty: "复核深度模型优化中的病态、鞍点、梯度尺度、初始化和更新算法",
    question: "怎样用梯度、步长、动量状态与曲率探针区分优化失败和泛化失败？",
    scenario: "在同一初始化与小批次序列上比较优化器",
    invariant: "初始化、批次顺序、损失缩放、学习率、状态缓冲和停止条件必须一致",
    fault: "不同优化器使用不同随机批次却直接比较收敛曲线",
    artifact: "梯度—更新账本、状态缓冲与首差诊断报告",
    focus: "优化几何、初始化与更新状态",
    sources: [SOURCES.pytorchOptim, SOURCES.pytorchAutograd],
  },
  "dlt-09": {
    duty: "用局部连接、参数共享、池化和结构化输出建立卷积网络的空间合同",
    question: "怎样从核、步幅、填充和感受野推导每层输出shape并验证平移结构？",
    scenario: "追踪一批图像经过卷积、池化与输出头",
    invariant: "轴顺序、核、步幅、填充、通道、感受野和输出任务必须一致",
    fault: "把通道轴当空间轴卷积，输出shape仍可计算但语义失真",
    artifact: "空间shape账本、感受野图与等变性反例",
    focus: "局部连接、共享与空间shape",
    sources: [SOURCES.pytorchNn, SOURCES.onnx],
  },
  "dlt-10": {
    duty: "把展开图、循环状态、双向结构、编码解码、门控与长期依赖统一到时间合同",
    question:
      "怎样沿时间展开状态与梯度，区分教师驱动、推断循环和长期依赖故障？",
    scenario: "对同一序列任务重放RNN、门控单元和编码解码路径",
    invariant: "时间轴、初始状态、掩码、教师信号、梯度截断和解码协议必须一致",
    fault: "训练时读取未来标签，推断时却宣称模型只依赖历史输入",
    artifact: "时间状态表、展开计算图与泄漏反例报告",
    focus: "时间状态、门控与长期依赖",
    sources: [SOURCES.pytorchNn, SOURCES.authorSite],
  },
  "dlt-11": {
    duty: "建立指标、基线、数据需求、超参数选择、调试与端到端示例的方法论",
    question:
      "怎样让一次性能改进可归因、可复现并能决定下一步收集数据还是修改模型？",
    scenario: "诊断一个验证性能停滞的真实项目",
    invariant: "业务目标、指标、基线、切分、搜索空间、预算和停止规则必须预注册",
    fault: "根据多次实验结果不断改指标直到候选模型看似领先",
    artifact: "实验卡、搜索日志、错误分层与下一步决策",
    focus: "指标、基线、调试与决策",
    sources: [SOURCES.pytorchData, SOURCES.authorSite],
  },
  "dlt-12": {
    duty: "比较规模化实现与视觉、语音、语言、推荐和知识任务的应用边界",
    question: "怎样把硬件、数据表示、输出空间和任务指标连接为可部署应用合同？",
    scenario: "评审一个跨训练、压缩和部署的深度学习应用",
    invariant: "任务、数据许可、预处理、硬件、延迟、精度与失败边界必须逐项记录",
    fault: "离线准确率提升被直接外推为生产延迟、鲁棒性和公平性均改善",
    artifact: "应用数据卡、部署剖面与失效场景清单",
    focus: "规模实现、任务接口与部署边界",
    sources: [SOURCES.onnx, SOURCES.pytorchData],
  },
  "dlt-13": {
    duty: "用PCA、因子分析、ICA、慢特征与稀疏编码比较线性潜因子假设",
    question: "怎样用生成假设、独立性、稀疏性与重构残差区分不同线性因子模型？",
    scenario: "对同一观测矩阵拟合多种线性潜因子模型",
    invariant: "中心化、尺度、潜维、约束、旋转不确定性和重构度量必须一致",
    fault: "把任意旋转后的潜因子直接解释为唯一真实原因",
    artifact: "潜因子合同、可识别性边界与重构比较报告",
    focus: "线性潜因子、约束与可识别性",
    sources: [SOURCES.numpy, SOURCES.scipy],
  },
  "dlt-14": {
    duty: "比较欠完备、稀疏、去噪、收缩和随机自编码器的表示约束",
    question: "怎样证明编码器学到可泛化结构，而不是恒等复制或记忆训练样本？",
    scenario: "在固定瓶颈和噪声协议下训练自编码器",
    invariant: "输入目标、瓶颈、噪声、正则项、重构度量和独立样本必须一致",
    fault: "高容量模型在训练集完美重构就被称为学到流形",
    artifact: "编码—重构轨迹、潜空间探针与记忆反例",
    focus: "瓶颈、去噪与表示约束",
    sources: [SOURCES.pytorchNn, SOURCES.authorSite],
  },
  "dlt-15": {
    duty: "用预训练、迁移、领域适配、半监督和分布式表示解释表示学习收益",
    question: "怎样区分表示迁移、标签泄漏和任务相似性带来的性能变化？",
    scenario: "把源域表示迁移到标签较少的目标域",
    invariant: "源域、目标域、标签可见性、微调预算、基线与评估协议必须一致",
    fault: "目标测试样本参与预训练后仍声称提升来自可迁移表示",
    artifact: "域角色表、表示探针与迁移消融报告",
    focus: "表示、迁移与潜在原因",
    sources: [SOURCES.pytorchData, SOURCES.authorSite],
  },
  "dlt-16": {
    duty: "用有向图、无向图、因子、分离、能量与推断描述结构化概率模型",
    question: "怎样从图结构推出联合分解、条件独立、采样路径和推断成本？",
    scenario: "为同一变量集合比较有向与无向结构",
    invariant: "变量、边语义、因子、归一化、观测条件和查询变量必须一致",
    fault: "看到图中没有直接边就断言变量在任何条件下都独立",
    artifact: "图—分解对照、d-分离查询与采样轨迹",
    focus: "图结构、因子分解与推断",
    sources: [SOURCES.scipy, SOURCES.authorSite],
  },
  "dlt-17": {
    duty: "用蒙特卡罗、重要采样、MCMC、Gibbs与混合诊断建立采样证据",
    question: "怎样用权重、有效样本量、自相关和多链诊断判断采样估计是否可信？",
    scenario: "从一个多峰目标分布估计期望",
    invariant: "目标分布、提议分布、链初始化、预热、样本数和诊断口径必须一致",
    fault: "单链停在一个峰附近却因样本很多而宣称已经收敛",
    artifact: "采样轨迹、权重与跨链混合诊断报告",
    focus: "采样、权重与混合诊断",
    sources: [SOURCES.scipy, SOURCES.authorSite],
  },
  "dlt-18": {
    duty: "比较似然梯度、对比散度、伪似然、得分匹配与配分函数估计",
    question: "怎样在未知配分函数下区分目标近似、梯度估计和归一化估计的误差？",
    scenario: "训练并评估一个基于能量的模型",
    invariant: "能量尺度、负相采样、链状态、近似目标和评估估计器必须一致",
    fault: "短链对比散度目标下降被当作精确对数似然上升",
    artifact: "正负相梯度、近似偏差与配分函数估计报告",
    focus: "能量、负相与配分函数",
    sources: [SOURCES.scipy, SOURCES.authorSite],
  },
  "dlt-19": {
    duty: "比较优化式推断、EM、MAP、变分方法和学成推断的目标与误差",
    question:
      "怎样把潜变量后验、近似族、ELBO、优化误差和学习参数放进同一轨迹？",
    scenario: "为含潜变量模型比较精确、变分和学成推断",
    invariant: "观测、潜变量、近似族、目标方向、采样估计和参数更新必须一致",
    fault: "ELBO提高被直接写成真实对数似然和后验精度同时提高",
    artifact: "后验近似合同、目标分解与推断误差报告",
    focus: "后验近似、目标分解与学习",
    sources: [SOURCES.pytorchAutograd, SOURCES.authorSite],
  },
  "dlt-20": {
    duty: "比较玻尔兹曼机、信念网络、VAE、GAN、自回归与其他深度生成方案",
    question:
      "怎样按密度、采样、潜变量、训练目标与评估协议比较生成模型，而不混用结论？",
    scenario: "在同一数据集上评审多个深度生成模型族",
    invariant:
      "数据、似然可得性、潜变量、随机性、训练目标、采样预算和评估口径必须一致",
    fault: "只凭精选样本观感给不同生成模型排序",
    artifact: "模型族对照、目标—采样轨迹与独立评估包",
    focus: "能量、潜变量、对抗与自回归生成",
    sources: [SOURCES.pytorchNn, SOURCES.authorSite],
  },
};

const MAP_SPEC = {
  title: "《深度学习》353个正式目录坐标学习地图",
  duty: "沿应用数学、现代实践和深度学习研究三部分恢复20章依赖链",
  question:
    "怎样按先决条件推进353个目录坐标，并让每一部分都留下可复核的模型证据？",
  scenario: "规划从数学基础到生成模型研究的完整学习路线",
  invariant: "3部分、20章、164个一级节和166个二级节必须保持原版顺序和依赖边界",
  fault: "按当前热点重排目录并把2016年后的模型倒填为原书章节",
  artifact: "353坐标依赖图、先决条件门与跨章证据索引",
  focus: "三部分结构、章间依赖与版本边界",
  sources: [SOURCES.authorToc, SOURCES.mitPress],
};

const REVIEW_SPEC = {
  title: "《深度学习》数学—模型—推断总复习",
  duty: "用同一任务贯穿数学基础、训练实践、结构模型、推断与生成",
  question: "怎样从一个最终结论反向重建数据、计算图、优化、推断和评估证据？",
  scenario: "审查一个从数据到部署与研究结论的端到端深度学习系统",
  invariant:
    "目录范围、数据角色、模型状态、目标、随机性、评估和时间标签必须端到端可追溯",
  fault: "各章能复述但无法用同一运行记录连接输入、更新、推断和结论",
  artifact: "跨20章端到端运行档案、反例与复现实验包",
  focus: "跨章依赖、首差定位与整书交付",
  sources: [SOURCES.authorSite, SOURCES.mitPress],
};

function conceptStrings(unit) {
  return unit.concepts.map((alternatives) => alternatives[0]);
}

function coordinateOf(value) {
  return value.match(/^(\d+(?:\.\d+)+)\s+/)?.[1] ?? null;
}

function expandManifestUnits(manifest) {
  for (const unit of manifest.units) {
    unit.chapterPath = PATHS[unit.id];
    if (!unit.chapterPath) throw new Error(`缺少单元页面映射：${unit.id}`);
    const secondaries = SECOND_LEVEL_CONCEPTS[unit.id] ?? [];
    const secondarySet = new Set(secondaries);
    const base = conceptStrings(unit).filter(
      (value) => !secondarySet.has(value),
    );
    const expanded = [];
    for (const concept of base) {
      expanded.push(concept);
      const coordinate = coordinateOf(concept);
      if (!coordinate || coordinate.split(".").length !== 2) continue;
      expanded.push(
        ...secondaries.filter((value) => value.startsWith(`${coordinate}.`)),
      );
    }
    const missing = secondaries.filter((value) => !expanded.includes(value));
    if (missing.length > 0)
      throw new Error(
        `${unit.id} 二级目录未挂到一级目录：${missing.join("、")}`,
      );
    unit.concepts = expanded.map((value) => [value]);
  }
}

function toPascal(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function buildStages(title, specification) {
  return [
    {
      name: `${title} · 输入与角色`,
      input: specification.scenario,
      operation: `冻结${specification.focus}所需的数据角色、版本和shape`,
      output: `${title}的输入合同与基线快照`,
      check: `${title}的来源、角色、单位、shape和可见性没有越界`,
    },
    {
      name: `${title} · 计算与状态`,
      input: `${title}的输入合同`,
      operation: `执行${specification.duty}的最小计算并保存中间状态`,
      output: `${title}的参考轨迹与单故障轨迹`,
      check: `${title}每一步状态变化都能由输入、公式或算法操作复算`,
    },
    {
      name: `${title} · 目标与更新`,
      input: `${title}的中间状态和目标口径`,
      operation: `比较目标分量、梯度、估计或选择决定`,
      output: `${title}的更新前后差异与首个分岔`,
      check: `${title}没有把代理目标、训练分数或偶然样本当作最终结论`,
    },
    {
      name: `${title} · 独立评估`,
      input: `${title}的冻结候选与未见数据或独立诊断`,
      operation: `重放预测、反例、恢复和边界检查`,
      output: `${title}的接受、回退或拒绝理由`,
      check: `${title}满足“${specification.invariant}”`,
    },
  ];
}

function enrichProfile(key, specification, role, unit = null) {
  const target = PATHS[key];
  if (!target) throw new Error(`缺少页面路径：${key}`);
  const [sectionSlug, chapterSlug] = target.split("/");
  const title = specification.title ?? unit?.title;
  if (!title) throw new Error(`缺少标题：${key}`);
  const concepts =
    role === "chapter"
      ? conceptStrings(unit)
      : bookCoordinates().filter(
          (value) => /^第\d+部分/.test(value) || /^第\d+章/.test(value),
        );
  const stages = buildStages(title, specification);
  return {
    id: key,
    role,
    officialUnitId: role === "chapter" ? unit.id : null,
    target,
    sectionSlug,
    chapterSlug,
    componentBase: toPascal(chapterSlug),
    title,
    concepts,
    stages,
    ...specification,
    cases: [
      {
        name: `${title} · 基线`,
        setup: `固定${specification.scenario}的输入、版本、预算和随机性`,
        prediction: `${title}的参考轨迹应持续满足“${specification.invariant}”`,
        boundary: `${title}只回答原版目录和当前实验合同内的问题`,
      },
      {
        name: `${title} · 单故障`,
        setup: `保持其余条件不变，只注入“${specification.fault}”`,
        prediction: `${title}应出现可定位的首个状态分岔，而不是只在末端分数异常`,
        boundary: `${title}的故障结论不能外推到未运行的数据、模型或任务`,
      },
      {
        name: `${title} · 恢复`,
        setup: `撤销故障并从同一快照重放${specification.scenario}`,
        prediction: `${title}的轨迹、独立评估和交付包应恢复基线`,
        boundary: `${title}若不能复现恢复结果，就不能把异常归因给单一故障`,
      },
    ],
    referenceTrace: stages.map(
      (stage, index) =>
        `${title}参考步骤${index + 1}：${stage.operation}；保存${stage.output}。`,
    ),
    faultTrace: stages.map((stage, index) =>
      index === 1
        ? `${title}故障步骤${index + 1}：注入“${specification.fault}”，记录首个偏离“${stage.check}”的状态。`
        : `${title}故障步骤${index + 1}：保持${stage.input}不变，检查${stage.output}是否受单一故障传播。`,
    ),
    gates: [
      {
        label: "来源与目录边界",
        detail: `${title}明确区分MIT Press/作者开放访问原版、人民邮电出版社中文目录、独立技术核验和本站重写；CC BY-NC-ND不授权演绎原文。`,
      },
      {
        label: "数据与计算合同",
        detail: `${title}的输入、角色、shape、公式、算法状态和版本能够从同一快照复算。`,
      },
      {
        label: "目标、更新与随机性",
        detail: `${title}的目标分量、梯度或估计、更新前后状态、种子与预算已经归档。`,
      },
      {
        label: "独立评估与边界",
        detail: `${title}以未见数据或独立诊断复核“${specification.invariant}”，并报告“${specification.fault}”的恢复结果。`,
      },
    ],
  };
}

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = manifestDocument.books[BOOK];
if (!manifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
expandManifestUnits(manifest);

function bookCoordinates() {
  return manifest.units.flatMap(conceptStrings);
}

const profiles = [
  enrichProfile("learningMap", MAP_SPEC, "learning-map"),
  ...manifest.units.map((unit) => {
    const specification = CHAPTER_SPECS[unit.id];
    if (!specification) throw new Error(`缺少章专属画像：${unit.id}`);
    return enrichProfile(unit.id, specification, "chapter", unit);
  }),
  enrichProfile("finalReview", REVIEW_SPEC, "final-review"),
];

function mechanismFor(concept, profile) {
  const title = concept.replace(
    /^(?:第\d+部分\s*|第\d+章\s*|\d+(?:\.\d+)+\s*)/,
    "",
  );
  const rules = [
    [
      /读者|历史|趋势|部分|第\d+章/,
      "界定读者、时间、章节依赖和原版范围",
      "版次、年份、部分—章节坐标与不适用边界",
      "把现代热点或事后结果倒填为2016年原书结论",
    ],
    [
      /标量|向量|矩阵|张量|范数|分解|伪逆|迹|行列式|主成分|PCA|因子|ICA|稀疏编码/,
      "把对象shape、子空间、谱或重构关系转成可复算线性操作",
      "输入/输出shape、秩、谱、残差与重构误差",
      "操作数值可运行却混淆样本轴、特征轴或基",
    ],
    [
      /概率|随机变量|分布|期望|方差|协方差|Bayes|信息|Dirac|Bernoulli|Multinoulli/,
      "声明随机变量、支持集、分布和信息量的概率合同",
      "归一化、条件方向、样本统计、对数口径与误差",
      "把密度、质量、样本频率或信息量混为同一量",
    ],
    [
      /上溢|下溢|病态|梯度|Hessian|Jacobian|优化|动量|AdaGrad|RMSProp|Adam|BFGS|初始化|学习率|批标准化/,
      "跟踪浮点、梯度、曲率、状态缓冲和参数更新",
      "dtype、条件数、梯度核对、步长、更新差与停止理由",
      "只看目标下降而忽略数值不稳、状态错位或泛化失败",
    ],
    [
      /学习算法|容量|过拟合|欠拟合|超参数|验证|估计|偏差|一致性|似然|监督|无监督|聚类|泛化|任务T|性能度量P|经验E/,
      "建立任务、数据角色、估计、选择与泛化协议",
      "实体切分、候选比较、偏差—方差、选择日志与封存测试",
      "训练、验证和测试角色泄漏后仍报告独立泛化",
    ],
    [
      /XOR|前馈|隐藏单元|激活|输出单元|代价函数|计算图|链式法则|反向传播|微分|MLP/,
      "把前向状态、局部导数和反向梯度连接为计算图",
      "张量shape、节点值、局部导数、梯度与有限差分",
      "广播或缩放错误让梯度数值存在但语义不正确",
    ],
    [
      /正则|范数惩罚|增强|噪声|半监督|多任务|提前终止|共享|Bagging|Dropout|对抗训练|流形正切/,
      "改变有效容量、数据分布或参数约束并验证泛化",
      "单因素消融、学习曲线、容量代理与独立评估",
      "同时改变多种正则条件却给单一机制归因",
    ],
    [
      /卷积|池化|感受野|结构化输出|数据类型|空间/,
      "推导局部连接、共享参数和空间输出shape",
      "核、步幅、填充、通道、感受野与等变性反例",
      "轴语义错位但输出shape仍合法",
    ],
    [
      /循环|RNN|序列|时间|LSTM|门控|编码|解码|记忆|长期依赖/,
      "沿时间展开状态、输入依赖、门控和梯度传播",
      "时间索引、状态、掩码、教师信号、梯度与解码轨迹",
      "训练读取未来信息或推断协议与训练不一致",
    ],
    [
      /性能指标|基准|数据|调试|应用|视觉|语音|语言|推荐|硬件|CPU|GPU|压缩|部署|搜索/,
      "把任务指标、数据表示、实验决定和部署边界连接起来",
      "实验卡、错误分层、硬件剖面、延迟/精度与失效案例",
      "离线单一指标被外推为生产系统整体改善",
    ],
    [
      /自编码|表示|迁移|领域|预训练|潜在原因|分布式表示/,
      "用瓶颈、噪声、域角色和表示探针检验潜在结构",
      "编码/重构轨迹、域切分、表示探针与消融",
      "记忆、标签泄漏或测试参与被误当作可迁移表示",
    ],
    [
      /有向|无向|图|因子|分离|能量|结构化概率|依赖/,
      "从图结构推导联合分解、条件独立、采样和推断查询",
      "图—分解对照、因子、分离查询、能量与采样轨迹",
      "把没有直接边误解为任何条件下都独立",
    ],
    [
      /蒙特卡罗|重要采样|马尔可夫链|Gibbs|混合|回火|桥式|退火/,
      "用采样、权重、自相关和跨链诊断估计目标量",
      "链轨迹、权重、有效样本量、自相关与多链诊断",
      "单链困在一个峰却因样本数多而宣称收敛",
    ],
    [
      /配分函数|对比散度|伪似然|得分匹配|噪声对比|玻尔兹曼|RBM|DBM/,
      "区分能量、归一化、正负相与近似训练目标",
      "能量、正负相梯度、链状态、近似偏差与归一化估计",
      "代理目标改善被写成精确似然改善",
    ],
    [
      /推断|EM|MAP|变分|ELBO|醒眠|后验/,
      "把后验、近似族、目标分解、优化和参数学习放进同一轨迹",
      "潜变量角色、近似族、目标项、采样估计与后验诊断",
      "近似下界提高被外推为真实后验和似然都更准确",
    ],
    [
      /生成|信念网络|GAN|对抗|自回归|NADE|GSN|随机网络|样本/,
      "按密度、潜变量、训练目标、采样和评估比较生成模型",
      "目标—更新轨迹、随机种子、样本协议与独立评估",
      "只凭精选样本观感比较不可同口径的模型",
    ],
  ];
  const rule = rules.find(([pattern]) => pattern.test(title));
  return rule
    ? rule.slice(1)
    : [
        `把“${title}”放进${profile.focus}的章专属计算链`,
        `${profile.title}的输入、状态变化、输出、反例与边界`,
        `只复述“${title}”名称而没有可观察状态和独立证据`,
      ];
}

function termFor(concept, index) {
  const short = concept
    .replace(/^第\d+部分\s*/, "")
    .replace(/^第\d+章\s*/, "")
    .replace(/^\d+(?:\.\d+)+\s*/, "")
    .split(/[；;：:——,，]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 28
    ? short
    : `花书坐标${index + 1}`;
}

function proseConcept(concept) {
  return concept.replace(/\.(?=\d)/g, "·");
}

function mdxText(value) {
  return value
    .replace(/_/g, "\\_")
    .replace(/\{/g, "&#123;")
    .replace(/\}/g, "&#125;");
}

function alphaCode(index) {
  let value = index + 1;
  let output = "";
  while (value > 0) {
    value -= 1;
    output = String.fromCharCode(65 + (value % 26)) + output;
    value = Math.floor(value / 26);
  }
  return output;
}

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并区分原版、中文目录、开放访问许可和当前独立重写
- 能先预测“${profile.question}”会改变哪个输入、shape、状态、目标、梯度、估计或评估结果，再操作三类证据视图
- 能只注入“${profile.fault}”，定位首个偏离“${profile.invariant}”的状态，并从同一快照完成恢复

</Objectives>`;
}

function sourceSection(profile) {
  const extra = profile.sources
    .map((url, index) => `[章专属核对 ${index + 1}](${url})`)
    .join("、");
  return `## 书目、353个正式坐标与许可边界

“${profile.title}”以[MIT Press书目页](${SOURCES.mitPress})核对Ian Goodfellow、Yoshua Bengio、Aaron Courville著 *Deep Learning*：精装ISBN 9780262035613，2016年11月18日出版，800页；MIT Press同时把[作者托管版](${SOURCES.authorSite})列为开放访问资源，并标注[CC BY-NC-ND 4.0](${SOURCES.license})。开放阅读不等于允许演绎，“${profile.title}”不复制、翻译或改写受保护正文，只把原版公开目录与可定位章节用作范围和事实核对。

“${profile.title}”以[作者官方目录](${SOURCES.authorToc})核对3个部分、20章和164个一级节，再以[人民邮电出版社官方中文书页](${SOURCES.chinese})核对166个二级节、中文书名、ISBN 9787115461476和2017年8月出版信息；合计353个正式目录坐标。出版社页面中“有效有效”、缺空格等排版噪声已按英文原版标题规范化，但没有新增原版不存在的章节。

“${profile.title}”的中文讲解、状态图、数值实验、练习与答案均为独立教学重写；2016年以后出现的框架行为或研究进展必须带当前时间标签，不能倒填为原书原话。${extra}只用于核对本页算法、API或实验边界，不能反向证明原书采用本站表述。`;
}

const patterns = [
  (p, c, m, e, x, i) =>
    `在“${p.title}”的第${i + 1}个坐标中，「${c}」通过${m}推进${p.focus}；复核者保存${e}，一旦出现${x}就撤回结论。`,
  (p, c, m, e, x, i) =>
    `围绕“${p.question}”，“${p.title}”在坐标${i + 1}把「${c}」落实为${m}；只有${e}可复算且反例排除${x}，本节点才算掌握。`,
  (p, c, m, e, x, i) =>
    `“${p.title}”的原版节点${i + 1}「${c}」不能停在名词解释：它要${m}，交付${e}，并用${x}作为单一反事实检查。`,
  (p, c, m, e, x, i) =>
    `对“${p.title}”而言，「${c}」在第${i + 1}次检查中改变可观察状态，因为它负责${m}；${e}必须与“${p.invariant}”对齐，不能接受${x}。`,
  (p, c, m, e, x, i) =>
    `目录原文「${c}」进入“${p.title}”后形成第${i + 1}个实验合同：先${m}，再保存${e}；若发生${x}，从同一输入快照恢复。`,
];

function conceptsSection(profile) {
  return `## 原版目录层级与可验证机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept, profile);
    const term = termFor(concept, index);
    const visibleConcept = proseConcept(concept);
    const safeConcept = mdxText(visibleConcept);
    const safeTerm = mdxText(term);
    const definition = `${term}对应正式目录坐标“${visibleConcept}”，在“${profile.title}”中用于${mechanism}，并受数据、shape、目标、随机性、评估与版本边界约束。`;
    return `### ${safeConcept}

<Term def=${JSON.stringify(definition)}>${safeTerm}</Term>

**正式坐标 ${index + 1}/${profile.concepts.length}。** 目录原文键 \`${concept}\`。${patterns[index % patterns.length](profile, safeConcept, mechanism, evidence, caution, index)}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个章专属实验

<Callout type="info" title="先写出哪个状态会先变化">
  对“${profile.title}”先冻结${profile.scenario}的数据、shape、目标、预算、随机性和评估口径，再操作依赖地图、计算轨迹与证据门；结果与预测不同就修改假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 原版坐标、依赖与状态">
    为“${profile.title}”选择一个正式目录坐标，在参考合同与单一反例间切换，逐阶段核对输入、操作、输出和检查条件。

    <${profile.componentBase}DependencyMapLab />
  </Step>
  <Step title="2. 参考与故障计算轨迹">
    对“${profile.title}”保持${profile.scenario}不变，只注入“${profile.fault}”，逐步定位首个偏离“${profile.invariant}”的位置。

    <${profile.componentBase}ComputationTraceLab />
  </Step>
  <Step title="3. 独立证据与交付门">
    在“${profile.title}”的基线、单故障和恢复案例间切换，展开来源、计算、目标和独立评估门后再决定是否交付。

    <${profile.componentBase}EvidenceGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页单一故障：${profile.fault}">
  “${profile.title}”遇到该故障时必须保持其余输入、版本、预算和随机序列不变；最终分数偶尔更高不能替代首个状态分岔和恢复证据。
</Callout>

<Callout type="trap" title="代理目标不等于最终结论">
  “${profile.title}”中的训练损失、下界、重构误差、链内统计或精选样本只回答各自合同；它们不能自动证明泛化、精确似然、因果关系或部署可靠性。
</Callout>

<Callout type="trap" title="开放访问不等于允许演绎">
  “${profile.title}”可以定位作者托管原版和MIT Press元数据，但CC BY-NC-ND不授权翻译或改写原书正文；本站内容必须保持独立表达、技术来源和时间边界。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放协议

| 阶段 | 允许动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stages
  .map(
    (stage) =>
      `| ${stage.name} | ${stage.operation} | ${stage.output} | 未满足“${stage.check}” |`,
  )
  .join("\n")}

\`\`\`yaml
unit: ${JSON.stringify(profile.id)}
question: ${JSON.stringify(profile.question)}
scenario: ${JSON.stringify(profile.scenario)}
invariant: ${JSON.stringify(profile.invariant)}
fault: ${JSON.stringify(profile.fault)}
evidence: ${JSON.stringify(profile.artifact)}
reset: restore_concept_mode_trace_step_case_gates_and_artifact
\`\`\`

“${profile.title}”要求从同一输入、版本、预算和随机状态重放参考、故障与恢复路径。重置后若目录选择、模式、轨迹步骤、案例、证据门或交付包没有回到基线，本次比较已经混入状态泄漏。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept, profile);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>检索键 dlt-${alphaCode(index)} 对应目录坐标「${mdxText(proseConcept(concept))}」；在“${profile.title}”中用于${mechanism}，需要连接原版范围、计算状态、独立证据和不适用边界。</GlossaryItem>`;
    })
    .join("\n");
  const coverageList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept, profile);
      return `${index + 1}. “${profile.title}”的目录项「${mdxText(proseConcept(concept))}」：以“${mechanism}”解释作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是背诵术语或抄公式，而是能围绕“${profile.question}”重建输入、shape、计算、目标、更新、随机性与独立评估，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：实验合同。** “${profile.title}”为什么必须先冻结输入、版本、shape、目标、预算、随机性和评估口径？

<Answer>
  “${profile.title}”若同时改变这些条件，相同输出可能来自不同数据、计算、目标或选择路径；先冻结合同，才能把观测连接到单一机制并定位首差。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明“${profile.title}”的正式目录坐标已经进入机制、交互和练习？

<Answer>
${coverageList}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一输入、版本、预算和随机序列，重放参考路径后只注入“${profile.fault}”；记录首个偏离，撤销故障再运行。只有依赖地图、计算轨迹、证据门和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="full-open-access-non-derivative-plus-publisher-toc"
  workTitle="Ian Goodfellow、Yoshua Bengio、Aaron Courville著《Deep Learning》"
  adaptedUrl="${SOURCES.authorSite}"
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
    gates: profile.gates,
  };
  return `"use client";

import {
  TextbookEvidenceLab,
  type TextbookEvidenceModel,
} from "./textbook-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies TextbookEvidenceModel;

export function ${profile.componentBase}DependencyMapLab() {
  return <TextbookEvidenceLab model={model} view="dependency-map" />;
}

export function ${profile.componentBase}ComputationTraceLab() {
  return <TextbookEvidenceLab model={model} view="computation-trace" />;
}

export function ${profile.componentBase}EvidenceGateLab() {
  return <TextbookEvidenceLab model={model} view="evidence-gate" />;
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
  const filePath = path.join(CONTENT_ROOT, `${profile.target}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
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
import {
  ${profile.componentBase}DependencyMapLab,
  ${profile.componentBase}ComputationTraceLab,
  ${profile.componentBase}EvidenceGateLab,
} from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";

${objectivesBlock(profile)}

## 为什么从这个问题开始

“${profile.title}”围绕“${profile.question}”建立贯穿任务：${profile.scenario}。先写下哪个输入、shape、状态、目标、梯度、估计或评估会先变化，再运行参考、故障和恢复路径；运行后补理由不算预测。只有“${profile.title}”守住“${profile.invariant}”并交付${profile.artifact}，最终分数、似然、重构、样本或部署结果才构成机制证据。

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesisSection(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    section: profile.title,
    description: `${profile.duty}；用依赖地图、计算轨迹和独立证据门交付${profile.artifact}`,
    demo: true,
    math: true,
    sourceUrl: SOURCES.authorSite,
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
    path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`),
    wrapperSource(profile),
    "typescript",
  );
}

const allConcepts = bookCoordinates();
const partHeadings = allConcepts.filter((item) =>
  /^第\d+部分/.test(item),
).length;
const chapterHeadings = allConcepts.filter((item) =>
  /^第\d+章/.test(item),
).length;
const firstLevelSections = allConcepts.filter((item) => {
  const coordinate = coordinateOf(item);
  return coordinate?.split(".").length === 2;
}).length;
const secondLevelSections = allConcepts.filter((item) => {
  const coordinate = coordinateOf(item);
  return coordinate?.split(".").length === 3;
}).length;
const formalNodes = allConcepts.length;
if (
  partHeadings !== 3 ||
  chapterHeadings !== 20 ||
  firstLevelSections !== 164 ||
  secondLevelSections !== 166 ||
  formalNodes !== 353
)
  throw new Error(
    `目录层级计数异常：部分${partHeadings}、章${chapterHeadings}、一级${firstLevelSections}、二级${secondLevelSections}、总计${formalNodes}`,
  );
if (profiles.length !== 22)
  throw new Error(`页面数量异常：应为22，实际${profiles.length}`);

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

manifest.status = "verified-open-access-scope-independent-rewrite";
manifest.verifiedAt = "2026-07-30";
manifest.edition =
  "Ian Goodfellow、Yoshua Bengio、Aaron Courville著，赵申剑、黎彧君、符天凡、李凯译《深度学习》，人民邮电出版社，2017年8月，500页，ISBN 9787115461476；原版Deep Learning，MIT Press，2016年11月18日，800页，ISBN 9780262035613";
manifest.sourceUrl = SOURCES.authorSite;
manifest.sourceKind =
  "mit-press-open-access-author-hosted-cc-by-nc-nd-complete-three-part-twenty-chapter-one-hundred-sixty-four-first-level-one-hundred-sixty-six-second-level-toc-plus-chinese-publisher-metadata";
manifest.sourceAccess = "full-text-primary";
manifest.defaultSourceMode = "independent-rewrite";
manifest.secondarySourceUrls = [
  SOURCES.mitPress,
  SOURCES.authorToc,
  SOURCES.chinese,
  SOURCES.license,
];
manifest.disclosureNote =
  "MIT Press将作者托管版列为开放访问资源并标注CC BY-NC-ND 4.0；可公开阅读不代表允许翻译、改编或演绎。本站用作者官方目录核对3部分、20章和164个一级节，用人民邮电出版社官方中文目录核对166个二级节与中文元数据，合计353个正式坐标；中文讲解、交互、数值、练习和答案均为独立重写。出版社页面的重复词与缺空格按英文原版标题规范化，不新增章节。";
manifest.unitMappingEvidence =
  "20个manifest单元与20章页面一一映射；第2、6、13章同时承载三部分标题。学习地图与总复习不冒充原版章节。";
manifest.factSourcePolicy =
  "原版开放访问页面用于范围、章节定位和2016年事实核对；CC BY-NC-ND边界显式披露。当前框架/API行为以官方文档核对并标时间，不倒填为原书正文。";
manifest.metrics = {
  formalPartHeadings: 3,
  formalChapterHeadings: 20,
  formalFirstLevelSections: 164,
  formalSecondLevelSections: 166,
  formalConceptNodes: 353,
  officialUnits: 20,
  learningMapPages: 1,
  reviewPages: 1,
  totalLearningPages: 22,
  interactiveViews: 66,
  visualKinds: [
    "textbook-dependency-map",
    "textbook-computation-trace",
    "textbook-evidence-gate",
  ],
};
manifest.coverageMetrics = {
  targetFormalNodes: 353,
  coveredFormalNodes: 353,
  coveragePercent: 100,
};

const portableProfiles = profiles.map((profile) => ({
  id: profile.id,
  role: profile.role,
  officialUnitId: profile.officialUnitId,
  target: profile.target,
  title: profile.title,
  duty: profile.duty,
  question: profile.question,
  scenario: profile.scenario,
  invariant: profile.invariant,
  fault: profile.fault,
  artifact: profile.artifact,
  focus: profile.focus,
  concepts: profile.concepts,
  sources: profile.sources,
  sourceAccess: "full-text-primary",
  sourceMode: "independent-rewrite",
}));

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(portableProfiles, null, 2)}\n`,
  "json",
);
const manifestOutput = `${JSON.stringify(manifestDocument, null, 2)}\n`;
if (fs.readFileSync(MANIFEST_PATH, "utf8") !== manifestOutput)
  fs.writeFileSync(MANIFEST_PATH, manifestOutput);

console.log(
  `已重建22页，覆盖3部分+20章+164一级节+166二级节=${formalNodes}个正式坐标，生成66个交互视图。`,
);
