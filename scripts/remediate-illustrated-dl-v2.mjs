import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "illustrated-dl";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx/illustrated-dl/v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/illustrated-dl-v2-profiles.json");

const SOURCES = {
  publisher: "https://www.kspub.co.jp/book/detail/1538252.html",
  chinese: "https://book.douban.com/subject/30221593/",
  backprop: "https://doi.org/10.1038/323533a0",
  cnn: "https://caffe.berkeleyvision.org/tutorial/layers/convolution.html",
  rbm: "https://www.cs.toronto.edu/~hinton/absps/guideTR.pdf",
  dbn: "https://www.cs.toronto.edu/~hinton/absps/fastnc.pdf",
  denoising:
    "https://www.cs.utoronto.ca/~larocheh/publications/icml-2008-denoising-autoencoders.pdf",
  stacked: "https://www.jmlr.org/papers/volume11/vincent10a/vincent10a.pdf",
  dropout: "https://www.jmlr.org/papers/v15/srivastava14a.html",
  dropconnect: "https://proceedings.mlr.press/v28/wan13.html",
  deepbook: "https://www.deeplearningbook.org/",
  theano: "https://arxiv.org/abs/1605.02688",
  pylearn2: "https://github.com/lisa-lab/pylearn2",
  caffe: "https://tutorial.caffe.berkeleyvision.org/tutorial_index.html",
  digits: "https://github.com/NVIDIA/DIGITS",
  chainer: "https://chainer.org/announcement/2019/12/05/released-v7.html",
  tensorflow: "https://www.tensorflow.org/about/bib",
};

const PATHS = {
  learningMap: "00-guide/idl-official-learning-map",
  "idl-01": "01-introduction/idl-01-introduction",
  "idl-02": "02-neural-networks/idl-02-neural-networks",
  "idl-03": "03-convolutional-networks/idl-03-convolutional-neural-networks",
  "idl-04": "04-boltzmann-machines/idl-04-restricted-boltzmann-machines",
  "idl-05": "05-autoencoders/idl-05-autoencoders",
  "idl-06": "06-generalization/idl-06-improving-generalization",
  "idl-07": "07-tools/idl-07-deep-learning-tools",
  "idl-08": "08-present-future/idl-08-present-and-future",
  finalReview: "09-review/idl-official-final-review",
};

const PAGE_SPECS = {
  learningMap: {
    title: "《图解深度学习》59个原版目录层级学习地图",
    duty: "按绪论、神经网络、CNN、RBM/DBN、自编码器、泛化、历史工具与未来展望串联59个原版层级",
    question:
      "怎样保留2016年入门书的知识顺序，同时把数学机制、实验合同和历史工具状态连接成可复核路线？",
    invariant:
      "8个章标题与51个编号小节逐项覆盖，原版范围、独立技术核验和当前迁移说明分层呈现",
    fault:
      "遗漏RBM、对比散度、DBN或六套历史工具，却把RNN、VAE、GAN、扩散模型和大语言模型倒填成原书目录",
    scenario:
      "从一组带标签图像出发，依次建立表示、目标、优化、验证与工具复现记录，再选择需要补学的原版章节。",
    boundary:
      "原书是2016年的图解入门路线；现行框架、硬件与部署建议只作为迁移注记，不扩大原版59层级分母。",
    stageNames: ["数据", "表示", "目标", "优化", "评估与历史"],
    sources: [
      SOURCES.publisher,
      SOURCES.backprop,
      SOURCES.rbm,
      SOURCES.tensorflow,
    ],
    artifact:
      "59层级矩阵、8章依赖图、数据切分、模型配置、目标函数、梯度检查、训练曲线、历史工具状态与迁移决策。",
    opening:
      "学习地图先恢复原书真正的路线：经典神经网络之后不仅有CNN，还完整保留RBM/DBN、自编码器、泛化方法和2016工具生态。",
  },
  "idl-01": {
    duty: "解释深度学习与机器学习的关系、发展历程、兴起原因、基本定义和全书结构",
    question:
      "怎样把“更深”从宣传语还原为可训练的多层表示，并用任务、数据、目标和验证集界定它？",
    invariant:
      "任务、训练数据、表示层级、目标函数、优化过程与未见数据评估同时写明，历史事实不替代实验",
    fault:
      "仅凭模型层数或当下热度宣称深度学习有效，没有基线、数据边界与未见样本证据",
    scenario:
      "比较手工特征分类器与多层神经网络，在同一数据划分和指标下记录表示学习带来的变化。",
    boundary:
      "本章复原2016年前后的定义与发展脉络；后来的生成式模型和大语言模型不是原版1.1至1.5的隐含内容。",
    stageNames: ["任务与数据", "特征", "深层表示", "目标", "验证证据"],
    sources: [SOURCES.publisher, SOURCES.deepbook, SOURCES.backprop],
    artifact:
      "问题定义、数据卡、传统基线、多层模型结构、损失、优化设置、验证指标、历史时间线和失败样本。",
    opening:
      "绪论页不以流行模型清单代替概念边界，而是让学习者先回答深层表示为何能从数据中逐级形成。",
  },
  "idl-02": {
    duty: "覆盖M-P模型、感知器、多层感知器、反向传播、误差与激活、似然、SGD和学习率",
    question:
      "怎样从加权和一路追到损失梯度与参数更新，并用数值梯度或下降轨迹反证错误实现？",
    invariant:
      "前向计算、目标函数、链式法则、梯度方向、批次抽样和学习率固定，同一初值可重放",
    fault: "激活导数或损失符号写反，训练日志仍下降一小段便误判反向传播正确",
    scenario:
      "用一个两层感知器拟合XOR，比较解析梯度与有限差分，并切换过小、合适和过大学习率。",
    boundary:
      "本章以经典前馈网络为范围；现代优化器可以做迁移对照，但不能替换原版SGD和学习率坐标。",
    stageNames: ["输入", "加权和", "激活", "损失", "梯度与更新"],
    sources: [SOURCES.backprop, SOURCES.deepbook],
    artifact:
      "网络图、参数初值、前向张量、激活、损失、解析梯度、数值梯度、批次序列、学习率与更新轨迹。",
    opening:
      "神经网络页把每个箭头都落实为张量与可检验计算；“会训练”必须能解释梯度从输出层怎样回到参数。",
  },
  "idl-03": {
    duty: "覆盖CNN结构、卷积层、池化层、全连接层、输出层和端到端训练",
    question:
      "怎样根据输入、核、步幅和填充推导特征图形状，并证明局部连接和共享参数实际生效？",
    invariant:
      "张量布局、核尺寸、步幅、填充、池化、头部与标签契约固定，前向形状和反向梯度一致",
    fault:
      "错误理解填充或通道维导致特征图尺寸不符，却在全连接层硬改输入维度掩盖上游错误",
    scenario:
      "对一幅小图像手算卷积与池化，再用同一核平移比较输出位置，最后接分类头和损失。",
    boundary:
      "本章只复原经典CNN训练链；视觉Transformer等后来架构可在另课比较，不属于原版3.1至3.7。",
    stageNames: ["图像张量", "卷积", "激活与池化", "分类头", "损失与反传"],
    sources: [SOURCES.cnn, SOURCES.backprop, SOURCES.deepbook],
    artifact:
      "输入布局、卷积核、步幅、填充、输出形状、特征图、池化索引、分类头、损失、梯度与边界样例。",
    opening:
      "CNN页从形状合同开始，因为卷积网络最常见的错误不是公式不会背，而是空间维、通道维与边界处理没有对齐。",
  },
  "idl-04": {
    duty: "覆盖Hopfield网络、玻尔兹曼机、RBM、对比散度、深度信念网络和章末总结",
    question:
      "怎样从能量与条件分布解释可见层、隐藏层、正负相，并明确对比散度只是近似训练过程？",
    invariant:
      "能量定义、二部图限制、采样条件、正相、重构、负相和参数更新顺序固定，随机种子可重放",
    fault: "把一次重构误差下降当作似然已经优化，或把CD-k结果宣称为精确负相样本",
    scenario:
      "在一个二值小数据集上计算隐藏激活、重构和CD-1更新，再比较更长链与不同随机种子。",
    boundary:
      "RBM和DBN是原版核心章节而非可删历史旁支；现代用途收缩不改变其在原书59层级中的地位。",
    stageNames: ["可见层", "隐藏概率与采样", "重构", "负相", "CD更新与DBN"],
    sources: [SOURCES.rbm, SOURCES.dbn, SOURCES.deepbook],
    artifact:
      "能量函数、权重与偏置、正相统计、采样种子、重构、负相统计、CD步数、更新量与DBN逐层预训练记录。",
    opening:
      "RBM页恢复旧课程遗漏的整章内容，并把“看起来能重构”与“训练目标得到可信近似”严格分开。",
  },
  "idl-05": {
    duty: "覆盖基础、降噪、稀疏、栈式自编码器及其在预训练中的应用",
    question: "怎样证明编码器学到可迁移表示，而不是通过容量过大简单复制输入？",
    invariant:
      "训练与验证划分、破坏过程、瓶颈或稀疏约束、重构目标和下游评估固定，泄漏样本隔离",
    fault:
      "模型容量足以学习恒等映射，重构误差很低却没有瓶颈、降噪、稀疏或下游迁移证据",
    scenario:
      "对输入添加受控噪声，比较普通、降噪和稀疏自编码器，再把编码器用于小样本分类预训练。",
    boundary:
      "本章讨论经典自编码器与逐层预训练；VAE和后来生成模型不是原版5.1至5.6的替代目录。",
    stageNames: ["输入与破坏", "编码器", "潜在表示", "解码器", "重构与预训练"],
    sources: [SOURCES.denoising, SOURCES.stacked, SOURCES.deepbook],
    artifact:
      "原始与破坏样本、编码器/解码器结构、潜变量、稀疏度、重构损失、验证误差、下游基线和预训练消融。",
    opening:
      "自编码器页不把漂亮重构图当结论；关键是约束模型不能轻易复制，并在未见数据或下游任务中验证表示。",
  },
  "idl-06": {
    duty: "覆盖训练样本、预处理、激活函数、Dropout、DropConnect及其泛化验证",
    question:
      "怎样只在训练路径施加随机正则化，并用冻结的验证集判断泛化而非训练误差？",
    invariant:
      "训练/验证/测试划分、预处理拟合范围、激活、随机掩码、训练/推理模式和最终指标固定",
    fault:
      "在全量数据上拟合标准化参数，或推理时仍启用Dropout/DropConnect，得到泄漏或随机结果",
    scenario:
      "在固定数据划分上比较无正则、Dropout和DropConnect，记录训练差距、验证误差与推理重复性。",
    boundary:
      "本章按2016入门口径讲数据与随机正则化；现代增强策略只能独立扩展，不能替换原版6.1至6.6。",
    stageNames: ["数据划分", "预处理", "激活", "随机正则", "验证评估"],
    sources: [SOURCES.dropout, SOURCES.dropconnect, SOURCES.deepbook],
    artifact:
      "样本清单、切分哈希、预处理统计、激活分布、随机种子、掩码、训练/推理模式、学习曲线与测试报告。",
    opening:
      "泛化页先封住数据泄漏和模式切换，再讨论正则化；训练损失更低本身并不证明未见样本表现更好。",
  },
  "idl-07": {
    duty: "覆盖开发环境、Theano、Pylearn2、Caffe、DIGITS、Chainer、TensorFlow及章末总结",
    question:
      "怎样复原2016年六套工具的计算图、模型、设备与训练工件，同时为停更项目写出可审计迁移路线？",
    invariant:
      "环境版本、依赖、模型定义、设备、数据、随机种子、检查点和导出结果归档；历史状态与当前支持不混写",
    fault:
      "直接用当前框架重写后宣称复现原工具，既没有冻结旧环境，也没有中间张量和数值对照",
    scenario:
      "选一个小型分类网络，分别登记六套工具在2016年的角色、现有维护状态与迁移工件，不要求在线运行过时栈。",
    boundary:
      "Theano、Pylearn2、Caffe、DIGITS和Chainer按历史工具讲；TensorFlow保留2015数据流图语境，再单独标记当前迁移。",
    stageNames: [
      "环境",
      "图与模型定义",
      "设备与运行",
      "检查点与导出",
      "迁移复现",
    ],
    sources: [
      SOURCES.theano,
      SOURCES.pylearn2,
      SOURCES.caffe,
      SOURCES.digits,
      SOURCES.chainer,
      SOURCES.tensorflow,
    ],
    artifact:
      "操作系统与依赖锁、工具版本、模型图、数据哈希、设备、种子、日志、检查点、导出格式、中间张量和迁移差异表。",
    opening:
      "工具页把原书的六套生态当作软件考古对象：先说明当年的职责，再依据项目公告标记停更、归档或迁移状态。",
  },
  "idl-08": {
    duty: "覆盖2016语境下的深度学习应用案例、未来判断与章末总结",
    question:
      "怎样把应用展示拆成问题、数据、模型、部署与监测证据，并区分2016判断和今天的回看？",
    invariant:
      "应用目标、数据来源、离线指标、运行约束、失败成本与监测边界明确；历史判断带日期标签",
    fault:
      "用今天已发生的进展替原作者补写预测，或只列成功案例而不登记数据偏差与部署失败",
    scenario:
      "选择一个2016年可讨论的图像识别案例，建立离线到上线的证据链，再分别写原版展望和当前回看。",
    boundary:
      "应用与未来必须按2016时间戳阅读；生成式AI、扩散模型和大语言模型只能作为明确标注的后续事件。",
    stageNames: ["问题", "数据集", "模型", "部署", "监测与证据"],
    sources: [SOURCES.publisher, SOURCES.deepbook, SOURCES.tensorflow],
    artifact:
      "问题卡、数据来源与限制、模型基线、离线指标、运行预算、失败样本、监测计划、2016判断和当前回看。",
    opening:
      "未来页不追求把所有后来热点塞回目录，而是训练时间边界：原版写了什么、当时能知道什么、今天怎样独立复核。",
  },
  finalReview: {
    title: "《图解深度学习》综合复核：从数据到可重现实验",
    duty: "用一个冻结任务串联59层级、经典模型、泛化方法、历史工具与时间边界",
    question:
      "怎样证明学习者能从原始数据重建前向、目标、反向、更新和未见数据评估，而非只记住名词？",
    invariant:
      "数据、代码、依赖、参数初值、随机种子、训练步骤、评估协议和时间标签固定，失败轨迹保留",
    fault:
      "只提交最终准确率与模型文件，没有数据划分、梯度检查、消融、失败样本和历史工具边界",
    scenario:
      "完成一个小型图像分类复核：手算关键步骤，训练经典网络，做正则化消融，并归档可迁移工具工件。",
    boundary:
      "总复习只验收原版59层级和明确的现代核验；任何新增模型都必须另列扩展，不计入原版覆盖率。",
    stageNames: [
      "冻结数据",
      "前向计算",
      "目标函数",
      "反向与更新",
      "留出评估与归档",
    ],
    sources: [
      SOURCES.publisher,
      SOURCES.backprop,
      SOURCES.cnn,
      SOURCES.rbm,
      SOURCES.dropout,
      SOURCES.tensorflow,
    ],
    artifact:
      "59层级检查表、数据卡、模型与参数、形状轨迹、梯度检查、训练曲线、正则化消融、测试报告、环境锁和迁移说明。",
    opening:
      "综合复核把全书压到一条可重放证据链；准确率只是末端输出，不能替代上游数据、计算、优化与历史边界。",
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
      /绪论|深度学习与机器学习|发展历程|为什么是深度学习|什么是深度学习|本书结构/,
      [
        "界定任务、数据、表示学习与验证证据的关系",
        "问题定义、基线、历史时间点、层级表示和未见样本指标",
        "以流行度或层数替代实验边界",
      ],
    ],
    [
      /M-P|感知器|多层感知器|神经网络的历史|神经网络$/,
      [
        "从阈值单元推进到可训练的多层前馈计算",
        "拓扑、权重、偏置、加权和、激活和预测",
        "把线性分类能力外推到不可线性分问题",
      ],
    ],
    [
      /反向传播|误差函数|激活函数|似然函数|随机梯度|学习率/,
      [
        "用目标函数和链式法则产生参数更新",
        "前向值、损失、导数、批次、梯度检查和更新轨迹",
        "损失下降掩盖导数符号或尺度错误",
      ],
    ],
    [
      /卷积神经网络|卷积层|池化层|全连接层|输出层|神经网络的训练方法/,
      [
        "以局部连接、参数共享和下采样构造空间表示",
        "张量布局、核、步幅、填充、特征图、池化索引和梯度",
        "用硬改维度掩盖卷积形状错误",
      ],
    ],
    [
      /Hopfield|玻尔兹曼机|受限玻尔兹曼机|对比散度|深度信念网络/,
      [
        "通过能量、条件采样和正负相近似学习分布",
        "能量、概率、采样种子、重构、正负相统计和CD步数",
        "把重构好看或CD近似误称为精确似然",
      ],
    ],
    [
      /降噪自编码器|稀疏自编码器|栈式自编码器|预训练|自编码器/,
      [
        "以瓶颈、破坏或稀疏约束学习可迁移表示",
        "输入、噪声、潜变量、重构损失、稀疏度和下游消融",
        "高容量恒等复制冒充表示学习",
      ],
    ],
    [
      /训练样本|预处理|Dropout|DropConnect|提高泛化能力/,
      [
        "控制数据边界与随机正则化以评估未见样本",
        "切分哈希、预处理统计、掩码、模式切换和泛化差距",
        "数据泄漏或推理时保留训练随机性",
      ],
    ],
    [
      /开发环境|Theano|Pylearn2|Caffe|DIGITS|Chainer|TensorFlow|深度学习工具/,
      [
        "把2016框架角色还原为可归档的计算图、训练与迁移工件",
        "版本、依赖、模型定义、设备、日志、检查点和中间张量",
        "用当前API替写历史工具后宣称原样复现",
      ],
    ],
    [
      /现在和未来|应用案例|深度学习的未来/,
      [
        "以时间标签连接应用目标、数据、部署风险与后续回看",
        "问题卡、数据来源、离线指标、运行约束、失败样本和日期",
        "用今天的事实替原作者补写2016预测",
      ],
    ],
    [
      /小结/,
      [
        "把本章概念压缩为可重放的输入、操作、输出和证据合同",
        "概念清单、关键不变量、单一故障、实验工件和复核结论",
        "只复述名词而没有实验验收",
      ],
    ],
  ];
  return (
    rules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把原版目录坐标转换为可检验学习任务",
      "输入、机制、输出、反例和独立复核材料",
      "只出现标题而没有机制与练习",
    ]
  );
}

function termFor(concept, index) {
  const short = concept
    .replace(/^第\d+章\s*/, "")
    .replace(/^\d+(?:\.\d+)*\s*/, "")
    .split(/[；;：:——,，]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 18
    ? short
    : `学习坐标${index + 1}`;
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
      "冻结的样本、任务或上游张量",
      "登记形状、版本和边界",
      "可追踪输入",
      "数据卡、哈希与形状",
    ],
    [
      "上一阶段输出",
      `执行“${title}”的核心变换`,
      "中间表示或状态",
      "中间张量与参数",
    ],
    [
      "表示、标签或采样状态",
      "计算本阶段目标或条件量",
      "标量目标或概率",
      "公式、数值与对照",
    ],
    [
      "目标、参数和随机状态",
      "只改变声明的学习变量",
      "更新后参数或样本",
      "梯度、种子与差分",
    ],
    [
      "冻结模型与留出数据",
      "按预注册协议评估并归档",
      "结论、拒绝或迁移决定",
      "指标、反例与环境锁",
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
      operation: `${stageDetails[index][1]}，并守住“${specification.invariant}”`,
      output: stageDetails[index][2],
      evidence: `${stageDetails[index][3]}；出现“${specification.fault}”时保留失败记录`,
    })),
    scenarios: [
      {
        name: "冻结基线",
        condition: `${specification.scenario} 固定数据、代码、依赖、初值与随机种子。`,
        expectation: `沿“${specification.stageNames.join(" → ")}”得到满足“${specification.invariant}”的完整证据。`,
      },
      {
        name: "边界反例",
        condition: `${specification.scenario} 其余条件不变，只注入“${specification.fault}”。`,
        expectation:
          "最早偏离应出现在对应阶段；若只能从最终指标猜测，证据链不通过。",
      },
    ],
    normalTrace: [
      `为“${title}”冻结任务、数据切分、代码、环境、参数初值与随机种子`,
      `依次执行${specification.stageNames.slice(0, 2).join("、")}，保存输入和中间状态`,
      `继续执行${specification.stageNames.slice(2, 4).join("、")}，记录目标、梯度、采样或更新`,
      `在${specification.stageNames[4]}阶段交付${specification.artifact}`,
    ],
    failureTrace: [
      `“${title}”复用同一任务、数据、代码、环境、参数初值与随机种子`,
      `只注入单一故障：${specification.fault}`,
      `沿“${specification.stageNames.join(" → ")}”定位第一处数值、状态或边界偏离`,
      `撤销故障并重放；仅当“${specification.invariant}”恢复才接受修正`,
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
if (profiles.length !== 10) throw new Error("课程必须恰好为10页");

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并把2016原版、2018中文版与当前迁移信息分层
- 能先预测“${profile.question}”的五阶段信号，再用输入、中间状态、输出和反例逐层复核
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、修正或拒绝实验结论

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个学习任务开始

${profile.opening} “${profile.title}”的贯穿任务是：${profile.scenario} 操作前必须写下哪一阶段会先变化，运行后再补理由不算预测。

本页围绕“${profile.question}”建立正常、故障与恢复路径。只有“${profile.title}”守住“${profile.invariant}”并交付${profile.artifact}，最终图表或指标才构成学习证据。

## 书目、59个原版层级与重写边界

[讲谈社官方书页](${SOURCES.publisher})确认山下隆义《イラストで学ぶ ディープラーニング》于2016年出版、215页、ISBN 9784061538252，并公开8章51个编号小节；[中文版书目](${SOURCES.chinese})用于交叉核对张弥译、人民邮电出版社2018年版。覆盖分母计入8个章标题和51个编号小节，共59个原版目录层级。

“${profile.title}”未取得原书完整正文，只以权威目录限定范围；中文解释、图示结构、交互、实验、练习与答案均为独立教学重写。${profile.boundary}

本页另以${links}核对技术机制。2016年原版范围、后来项目状态与当前迁移建议分别标注；技术资料能验证机制或工具状态，不能反向证明原书正文采用了本站表述。`;
}

const paragraphPatterns = [
  (profile, concept, mechanism, evidence, caution, index) =>
    `在“${profile.title}”的坐标${index + 1}中，目录项「${concept}」用于${mechanism}；先锁定条件，再以${evidence}复核，出现${caution}时撤回结论。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `目录项「${concept}」进入“${profile.title}”后要回答第${index + 1}个实验问题：它怎样${mechanism}、改变什么状态、由哪些${evidence}证明，并如何排除${caution}。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `围绕“${profile.question}”，原版层级${index + 1}把「${concept}」解释为${mechanism}；复核者先读取${evidence}，不能接受${caution}。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `对“${profile.title}”而言，目录项「${concept}」的最小合同是${mechanism}，第${index + 1}次检查保存${evidence}；若产生${caution}，就返回上游重放。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `第${index + 1}个正式坐标「${concept}」服务于${profile.duty}，需要以${evidence}呈现${mechanism}；${caution}会破坏“${profile.invariant}”。`,
  (profile, concept, mechanism, evidence, caution) =>
    `学习者在“${profile.title}”中讨论目录项「${concept}」前预测${mechanism}会改变哪项张量或状态，再读取${evidence}；观察到${caution}时保留失败轨迹。`,
];

function conceptsSection(profile) {
  return `## 原版目录层级与可检验机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept);
    const term = termFor(concept, index);
    const displayedConcept = displayConcept(concept);
    const definition = `${term}对应原版目录坐标“${concept}”，在“${profile.title}”中用于${mechanism}，并受数据、目标、随机性、版本和时间边界约束。`;
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

<Callout type="info" title="先写出哪一阶段会先变化">
  对“${profile.title}”先冻结任务、数据、代码、环境、参数初值与随机种子，再操作信号路径、训练轨迹和实验发布门；结果与预测不一致时修改假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 五阶段信号路径">
    固定“${profile.scenario}”，在基线与边界反例间切换，逐一查看“${profile.stageNames.join("、")}”的输入、操作、输出与复核证据。

    <${profile.componentBase}SignalPathLab />
  </Step>
  <Step title="2. 正常与单故障训练轨迹">
    保持任务与初态不变，只注入“${profile.fault}”，逐步定位第一个偏离“${profile.invariant}”的阶段。

    <${profile.componentBase}TrainingTraceLab />
  </Step>
  <Step title="3. 可复现实验发布门">
    分别锁定数据切分、目标与梯度、基线与消融、复现与历史边界，展开${profile.artifact}后决定是否发布。

    <${profile.componentBase}ExperimentGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页单一故障：${profile.fault}">
  “${profile.title}”遇到该故障时应保持数据、代码、环境、初值与种子不变，沿五阶段寻找最早偏离；最终指标偶尔变好不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="训练集表现不等于泛化证据">
  ${profile.scenario} 在训练样本上成功，只证明拟合路径能运行；“${profile.title}”仍需冻结验证集、失败样本、反例与重复运行。
</Callout>

<Callout type="trap" title="现代内容不能倒填2016原书">
  “${profile.title}”引用现行资料是为了核对机制、项目状态与迁移；RNN、VAE、GAN、扩散模型和大语言模型不能伪装成原版59层级。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放实验协议

| 阶段 | 学习动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stageNames
  .map(
    (stage, index) =>
      `| ${stage} | 在“${profile.title}”执行${stage}，一次只改变声明变量 | ${index === 0 ? "任务、数据切分、版本与输入形状" : index === 4 ? "留出指标、反例、环境与时间标签" : "中间张量、参数、目标、梯度或采样状态"} | ${index === 0 ? "输入或数据边界不可追溯" : index === 4 ? "无法独立重放或解释失败" : profile.fault} |`,
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
reset: restore_scenario_stage_trace_mode_step_gates_and_artifact
\`\`\`

该协议要求“${profile.title}”在相同任务、数据、代码、环境、初值与种子下重放。重置后若场景、阶段、轨迹模式、步骤、发布门或证据显示没有回到基线，交互状态已经污染比较，不能作为实验结论。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>对应“${concept}”；在“${profile.title}”中用于${mechanism}，需要连接原版范围、实验状态与时间边界。</GlossaryItem>`;
    })
    .join("\n");
  const conceptList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. “${profile.title}”的目录项「${displayConcept(concept)}」：以“${mechanism}”解释作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是记住框架或名词，而是能围绕“${profile.question}”重建输入、计算与证据，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：实验合同。** “${profile.title}”为什么必须先冻结任务、数据、代码、环境、参数初值与随机种子？

<Answer>
  ${profile.scenario} 若这些条件变化，相同结果可能来自不同样本、实现、初值或随机路径；“${profile.title}”先冻结合同，才能把观测连接到单一机制。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明原版目录坐标已经进入机制、交互和练习？

<Answer>
${conceptList}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一任务、数据、代码、环境、初值与种子，重放正常路径后只注入“${profile.fault}”；记录最早偏离点，撤销故障并再次运行。只有信号路径、训练轨迹、实验门和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="山下隆义《イラストで学ぶ ディープラーニング》／张弥译《图解深度学习》"
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
    scenarios: profile.scenarios,
    normalTrace: profile.normalTrace,
    failureTrace: profile.failureTrace,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    gates: [
      {
        label: "数据切分",
        detail: `“${profile.title}”的训练、验证、测试边界和预处理统计可追溯。`,
      },
      {
        label: "目标与梯度",
        detail: `“${profile.title}”的前向值、目标、梯度或采样更新经过数值核对。`,
      },
      {
        label: "基线与消融",
        detail: `“${profile.title}”保留简单基线，只改变一个变量并保存失败样本。`,
      },
      {
        label: "复现与历史",
        detail: `“${profile.title}”归档环境、种子和工件，并分开2016语境与当前迁移。`,
      },
    ],
  };
  return `"use client";

import {
  LearningSystemEvidenceLab,
  type LearningSystemEvidenceModel,
} from "./learning-system-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies LearningSystemEvidenceModel;

export function ${profile.componentBase}SignalPathLab() {
  return <LearningSystemEvidenceLab model={model} view="signal-path" />;
}

export function ${profile.componentBase}TrainingTraceLab() {
  return <LearningSystemEvidenceLab model={model} view="training-trace" />;
}

export function ${profile.componentBase}ExperimentGateLab() {
  return <LearningSystemEvidenceLab model={model} view="experiment-gate" />;
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
import { ${profile.componentBase}SignalPathLab, ${profile.componentBase}TrainingTraceLab, ${profile.componentBase}ExperimentGateLab } from "@/components/mdx/${BOOK}/v2/${slug}";

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
    description: `${profile.duty}；用五阶段信号、单故障训练轨迹和可复现实验门完成独立复核。`,
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

const numberedSections = previousManifest.units.reduce(
  (sum, unit) => sum + Math.max(0, unit.concepts.length - 1),
  0,
);
const chapterHeadings = previousManifest.units.length;
const catalogLevels = numberedSections + chapterHeadings;
if (numberedSections !== 51 || chapterHeadings !== 8 || catalogLevels !== 59) {
  throw new Error(
    `目录口径应为8章标题+51编号小节=59层级，实际${chapterHeadings}+${numberedSections}=${catalogLevels}`,
  );
}

manifestDocument.books[BOOK] = {
  ...previousManifest,
  sourceKind:
    "official-original-publisher-complete-eight-chapter-fifty-one-numbered-section-toc-cross-checked-with-chinese-edition-and-primary-research-project-documentation",
  sourceUrl: SOURCES.publisher,
  secondarySourceUrls: [
    SOURCES.chinese,
    SOURCES.backprop,
    SOURCES.cnn,
    SOURCES.rbm,
    SOURCES.dbn,
    SOURCES.denoising,
    SOURCES.stacked,
    SOURCES.dropout,
    SOURCES.dropconnect,
    SOURCES.deepbook,
    SOURCES.theano,
    SOURCES.pylearn2,
    SOURCES.caffe,
    SOURCES.digits,
    SOURCES.chainer,
    SOURCES.tensorflow,
  ],
  status: "verified-outline",
  verifiedAt: "2026-07-30",
  disclosureNote:
    "讲谈社官方页面确认山下隆义原版、2016年215页、ISBN 9784061538252及8章51个编号小节完整结构；中文版书目用于交叉核对张弥译、人民邮电出版社2018年版。覆盖分母计入8个章标题与51个编号小节，共59个原版目录层级。课程按8章逐一覆盖，另设学习地图与综合复核，共10页、30个章专属交互。未取得原书完整正文，全部解释、实验、交互、练习与答案均为独立教学重写。RBM、对比散度、DBN和六套历史工具完整恢复；RNN、VAE、GAN、扩散模型和大语言模型不计入原版范围。历史工具状态与当前迁移独立标注，不反写2016原书。",
  units: previousManifest.units.map((unit) => ({
    ...unit,
    chapterPath: PATHS[unit.id],
  })),
  metrics: {
    formalUnits: chapterHeadings,
    numberedSections,
    formalNodes: catalogLevels,
    coursePages: profiles.length,
    interactiveViews: profiles.length * 3,
    reviewQuestions: profiles.length * 3,
  },
  sourceAccess: "outline-only",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/illustrated-dl-v2-profiles.json",
  factSourcePolicy:
    "讲谈社目录只限定8章51个编号小节与2016语境；反向传播、CNN、RBM/DBN、自编码器、Dropout/DropConnect分别以论文、作者资料或官方教材核对，Theano、Pylearn2、Caffe、DIGITS、Chainer与TensorFlow以项目或官方资料核对历史角色和维护状态。现代资料不得反写原版内容。",
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
  `已重建 ${profiles.length} 页，覆盖${chapterHeadings}章标题+${numberedSections}编号小节=${catalogLevels}个原版层级，生成 ${profiles.length * 3} 个交互视图。`,
);
