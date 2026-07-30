import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "deep-learning-from-scratch";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/deep-learning-from-scratch/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/deep-learning-from-scratch-v2-profiles.json",
);

const SOURCES = {
  original: "https://www.oreilly.co.jp/books/9784873117584/",
  toc: "https://www.oreilly.co.jp/books/9784873117584/toc.html",
  chinese:
    "https://www.oreilly.com/library/view/shen-du-xue-xi-ru-men-ji-yu-pythonde-li-lun-yu-shi-xian/9787115485588/",
  repository: "https://github.com/oreilly-japan/deep-learning-from-scratch",
  errata:
    "https://github.com/oreilly-japan/deep-learning-from-scratch/wiki/errata",
  python: "https://docs.python.org/3/tutorial/",
  numpy: "https://numpy.org/doc/stable/user/",
  broadcasting: "https://numpy.org/doc/stable/user/basics.broadcasting.html",
  matplotlib: "https://matplotlib.org/stable/tutorials/index.html",
  mnist: "https://yann.lecun.com/exdb/mnist/",
  perceptron: "https://doi.org/10.1037/h0042519",
  backpropagation: "https://doi.org/10.1038/323533a0",
  numericalGradient:
    "https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.check_grad.html",
  softmax:
    "https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.softmax.html",
  optimizers: "https://pytorch.org/docs/stable/optim.html",
  batchNormalization: "https://arxiv.org/abs/1502.03167",
  dropout: "https://jmlr.org/papers/v15/srivastava14a.html",
  convolution: "https://pytorch.org/docs/stable/generated/torch.nn.Conv2d.html",
  lenet: "http://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf",
  alexnet:
    "https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks",
  vgg: "https://arxiv.org/abs/1409.1556",
  googlenet: "https://arxiv.org/abs/1409.4842",
  resnet: "https://arxiv.org/abs/1512.03385",
  cuda: "https://docs.nvidia.com/cuda/",
};

const PATHS = {
  learningMap: "00-guide/dls-official-learning-map",
  "dls-01": "01-foundations/dls-01-python-introduction",
  "dls-02": "01-foundations/dls-02-perceptron",
  "dls-03": "02-forward-learning/dls-03-neural-network",
  "dls-04": "02-forward-learning/dls-04-neural-network-learning",
  "dls-05": "03-backpropagation/dls-05-backpropagation",
  "dls-06": "04-training/dls-06-learning-techniques",
  "dls-07": "05-cnn/dls-07-cnn",
  "dls-08": "06-deep-learning/dls-08-deep-learning",
  "dls-app": "07-appendix/dls-appendix-softmax-loss",
  finalReview: "08-review/dls-official-final-review",
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
    title: "《深度学习入门》211个原版目录层级学习地图",
    ...spec(
      "沿Python/NumPy、前向传播、损失与梯度、反向传播、训练技巧、CNN和应用恢复8章与附录A",
      "怎样把211个原版目录坐标组织成一条能从数组形状追到梯度、训练和评估的从零实现路径？",
      "8个章标题、202个编号节/小节和附录A逐项覆盖，代码、张量形状、数值检查、训练角色和版本边界可追溯",
      "只调用现代框架或复制最终代码，遗漏形状推导、梯度检查、测试隔离、附录和2016年原版边界",
      "从零实现一个手写数字分类器，并为每个数组、算子、梯度与评估结果保存证据。",
      ["冻结环境", "追踪前向", "核对梯度", "执行训练", "独立评估"],
      [SOURCES.original, SOURCES.toc, SOURCES.repository],
      "211层覆盖矩阵、环境锁文件、形状表、前向缓存、数值梯度、反向轨迹、训练曲线、测试报告和失败复现。",
      "学习地图把“从零实现”定义为能解释每个张量与导数，而不是拒绝一切库函数。",
    ),
    boundary:
      "原版出版于2016年，代码面向当时的Python与NumPy；当前版本兼容修正、自动微分和后续架构必须单列时间标签。",
  },
  "dls-01": spec(
    "覆盖Python基础、脚本、类、NumPy数组/广播与Matplotlib可视化",
    "怎样用最小Python程序证明数组形状、广播和索引行为，而不是把运行成功当作语义正确？",
    "Python/NumPy版本、dtype、shape、轴方向、广播规则、随机种子和绘图输入固定",
    "广播产生可运行但语义错误的结果，或数组/列表混用后悄悄改变形状",
    "建立一个只依赖Python、NumPy与Matplotlib的可复现实验环境并处理小型图像批次。",
    ["锁定运行环境", "构造数组", "执行广播", "验证索引", "绘制并归档"],
    [SOURCES.python, SOURCES.numpy, SOURCES.broadcasting],
    "解释器与包版本、脚本、输入数组、dtype/shape、广播轴、索引结果、图像范围、随机种子和截图。",
    "Python入门页把语言与数组操作变成后续神经网络可依赖的运行合同。",
  ),
  "dls-02": spec(
    "覆盖感知机、逻辑门、权重偏置、XOR局限与多层组合",
    "怎样用权重、偏置与决策边界解释AND/OR/NAND，并证明单层感知机为什么不能表示XOR？",
    "输入真值表、权重、偏置、阈值、输出编码和组合顺序固定",
    "为每个样本单独修改权重，或用隐藏层实现XOR却仍宣称单层线性可分",
    "手算四个二值输入的门电路，并组合多层感知机实现XOR。",
    ["列出真值表", "计算加权和", "应用阈值", "组合隐藏门", "检查全部输入"],
    [SOURCES.original, SOURCES.repository, SOURCES.perceptron],
    "真值表、权重/偏置、加权和、阈值输出、二维决策边界、XOR反例、隐藏门和全输入断言。",
    "感知机页让每个门电路回到同一线性判定式，并把XOR作为结构性反例。",
  ),
  "dls-03": spec(
    "覆盖激活函数、多维数组、三层网络、输出层、MNIST推理与批处理",
    "怎样从输入shape逐层追踪矩阵乘法、激活与softmax，并保证批处理和单样本推理一致？",
    "权重形状、轴约定、激活、softmax稳定化、类别数、批大小和预处理固定",
    "矩阵方向或广播错误仍给出结果，或softmax溢出后只检查最大类别",
    "用NumPy实现三层前向网络，对MNIST小批次比较逐样本与批处理输出。",
    ["登记输入形状", "仿射变换", "非线性激活", "稳定输出层", "批量推理"],
    [SOURCES.numpy, SOURCES.softmax, SOURCES.mnist],
    "输入/权重/偏置shape、各层预激活与激活、softmax平移量、概率和、批索引、预测与吞吐对照。",
    "神经网络页以形状和数值范围贯通前向传播，不用结构图替代数组证据。",
  ),
  "dls-04": spec(
    "覆盖数据驱动、训练/测试角色、损失、mini-batch、数值微分、梯度法与两层网络训练",
    "怎样从损失函数和中心差分得到可核对梯度，并让训练与测试数据承担互不污染的角色？",
    "数据切分、损失、batch采样、差分步长、初始化、学习率、迭代数和测试隔离固定",
    "根据测试精度调学习率/网络结构，或差分步长不稳仍把数值梯度当真值",
    "在两层网络上计算交叉熵、数值梯度和mini-batch更新，并保留独立测试。",
    ["冻结数据角色", "计算批损失", "数值微分", "梯度更新", "独立测试"],
    [SOURCES.repository, SOURCES.numericalGradient, SOURCES.mnist],
    "切分索引、batch索引、损失实现、差分步长、逐参数数值梯度、更新轨迹、训练曲线与一次性测试报告。",
    "学习页把“误差下降”拆成目标、梯度、更新和数据角色四项可反证条件。",
  ),
  "dls-05": spec(
    "覆盖计算图、链式法则、基础层、激活层、Affine/Softmax层、反向传播实现与梯度确认",
    "怎样让每个层的forward缓存和backward局部导数相互对应，并用数值梯度发现实现错误？",
    "计算图方向、张量shape、forward缓存、上游梯度、参数共享、归约轴和差分基线固定",
    "梯度shape靠广播凑齐，或反向实现与数值梯度不符仍继续训练",
    "实现Mul/Add/ReLU/Sigmoid/Affine/SoftmaxWithLoss层并对两层网络做梯度检查。",
    [
      "构建计算图",
      "保存前向缓存",
      "传播局部梯度",
      "汇总参数梯度",
      "数值梯度检查",
    ],
    [SOURCES.repository, SOURCES.backpropagation, SOURCES.numericalGradient],
    "节点与边、forward输入输出、缓存、上游/下游梯度shape、参数梯度、差分梯度、相对误差和故障层定位。",
    "反向传播页要求导数能沿计算图逐节点重放，训练能收敛不代表梯度实现正确。",
  ),
  "dls-06": spec(
    "覆盖SGD/Momentum/AdaGrad/Adam、初始化、BatchNorm、权值衰减、Dropout与超参数验证",
    "怎样在相同初值和数据顺序下比较训练技巧，并用验证集而不是测试集选择超参数？",
    "初始化、batch顺序、学习率、优化器状态、归一统计、正则、训练/推理模式和验证协议固定",
    "不同优化器使用不同种子/数据顺序，或读取测试结果选择超参数",
    "在同一MNIST子集上对照优化器、初始化、BatchNorm、Dropout和权值衰减。",
    ["复制共同基线", "更新参数", "检查激活分布", "切换正则模式", "验证超参数"],
    [SOURCES.optimizers, SOURCES.batchNormalization, SOURCES.dropout],
    "共同初值、batch序列、优化器状态、激活直方图、running统计、mask、正则项、训练/验证曲线和测试封条。",
    "学习技巧页把每项技巧视为受控实验，不能用不公平的终点精度比较。",
  ),
  "dls-07": spec(
    "覆盖卷积/池化、padding/stride、多通道与批处理、im2col、CNN实现/可视化、LeNet与AlexNet",
    "怎样从卷积几何推导输出shape，并证明im2col实现与直接卷积在前向和反向上等价？",
    "NCHW轴、核shape、padding、stride、池化窗口、批大小和边界处理固定",
    "输出尺寸向下取整却未声明丢弃边界，或im2col重排后通道/批轴错位",
    "对小型多通道图像手算卷积，再实现im2col CNN并可视化第一层滤波器。",
    ["标注四维形状", "展开局部窗口", "执行卷积", "池化与反向", "对照直接实现"],
    [SOURCES.convolution, SOURCES.lenet, SOURCES.alexnet],
    "NCHW与核shape、输出公式、窗口索引、im2col矩阵、卷积/池化输出、反向col2im、直接实现差值和滤波器图。",
    "CNN页让空间几何、内存重排和网络语义在同一形状账本中对齐。",
  ),
  "dls-08": spec(
    "覆盖加深网络、ImageNet/VGG/GoogLeNet/ResNet、高速化、应用与2016年未来展望",
    "怎样区分原书截至2016年的架构与应用观察、当前技术扩展和可复现性能声明？",
    "架构版本、数据集版本、训练预算、硬件、精度、基线、发布日期和证据来源固定",
    "把当前模型能力倒填为2016年原书结论，或跨硬件/数据预算比较单一精度",
    "为VGG、GoogLeNet和ResNet建立时间化架构卡，并复核计算/精度与应用边界。",
    [
      "冻结历史坐标",
      "拆解架构",
      "登记训练预算",
      "核对应用证据",
      "标注当前扩展",
    ],
    [SOURCES.vgg, SOURCES.googlenet, SOURCES.resnet],
    "论文日期、架构图、层与参数量、数据集、训练预算、硬件、指标定义、应用证据、2016/当前边界和不可比项。",
    "深度学习页把历史叙述与当前事实分层，避免“未来展望”在多年后失去时间坐标。",
  ),
  "dls-app": spec(
    "覆盖Softmax-with-Loss层正向、反向与计算图归约",
    "怎样从稳定softmax与交叉熵得到批量反向梯度，并验证标签编码和batch归约因子？",
    "logit shape、标签编码、稳定平移、batch轴、loss归约和上游梯度固定",
    "one-hot/索引标签混用，或漏除batch大小导致梯度尺度随批量改变",
    "对两样本三分类logit手算Softmax-with-Loss正向与反向。",
    ["稳定化logit", "归一概率", "计算批损失", "反传标签差", "数值梯度确认"],
    [SOURCES.original, SOURCES.repository, SOURCES.softmax],
    "logit与标签、平移量、指数和、概率、逐样本损失、batch均值、反向梯度、概率和与数值梯度误差。",
    "附录页把Softmax-with-Loss的简洁梯度还原为稳定化、标签和归约共同作用的结果。",
  ),
  finalReview: {
    title: "《深度学习入门》从零实现总复习",
    ...spec(
      "用统一实现协议复核8章、202个编号层级和附录A，并提交能独立运行、检查和解释的训练系统",
      "面对一个新分类任务，怎样从211个原版坐标选择数组表示、网络、梯度、训练技巧和评估协议？",
      "每项实现决策都能回到原版目录、代码/shape、数值梯度、受控训练、独立评估和2016/当前时间标签",
      "按最终测试精度拼装代码，隐藏广播、梯度错误、数据泄漏、随机性与历史边界",
      "从空目录搭建一个NumPy神经网络项目，并交付完整训练与反证报告。",
      ["锁定环境数据", "组装前向层", "验证反向梯度", "受控训练", "封存测试"],
      [SOURCES.original, SOURCES.repository, SOURCES.errata],
      "211层覆盖账本、环境锁定、数组shape、层缓存、数值/反向梯度、受控训练曲线、消融、独立测试和版本边界。",
      "总复习页要求真正从零重建证据链，而不是重新粘贴书中代码。",
    ),
    boundary:
      "综合实现以2016年原版和官方代码为基线；Python/NumPy兼容修正及当前框架只作独立扩展。",
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
      /Python|解释器|脚本|数据类型|变量|列表|字典|布尔|if|for|函数|类/,
      [
        "建立可复现语言环境和最小程序状态",
        "解释器/包版本、值与类型、控制流、函数输入输出和异常",
        "运行成功掩盖类型、作用域或版本漂移",
      ],
    ],
    [
      /NumPy|数组|广播|元素|Matplotlib|图形|pyplot|图像/,
      [
        "以数组形状、轴和广播执行数值与可视化操作",
        "dtype、shape、stride、广播轴、索引、数值范围和绘图输入",
        "广播或索引产生语义错误但仍可运行",
      ],
    ],
    [
      /感知机|逻辑电路|与门|与非门|或门|异或|线性|非线性|多层/,
      [
        "用权重偏置和层组合实现、反证二值判定",
        "真值表、加权和、阈值、决策边界、XOR反例和隐藏层",
        "逐样本调参或混淆单层与多层表达力",
      ],
    ],
    [
      /激活|sigmoid|阶跃|ReLU|神经网络|内积|信号传递|输出层|softmax|推理|批处理|MNIST/,
      [
        "沿张量形状执行仿射、激活、稳定输出与批量推理",
        "输入/权重/偏置shape、中间缓存、激活范围、概率和与批对照",
        "矩阵轴错位、softmax溢出或批语义漂移",
      ],
    ],
    [
      /学习|损失|均方|交叉熵|mini-batch|数值微分|导数|偏导|梯度法|梯度/,
      [
        "以损失、数值微分和更新构造可检查训练循环",
        "数据角色、batch索引、损失、差分步长、梯度、学习率与曲线",
        "测试泄漏或不稳定数值梯度被当作基准",
      ],
    ],
    [
      /计算图|链式法则|反向传播|加法节点|乘法节点|层的实现|Affine|Softmax-with-Loss|梯度确认/,
      [
        "由forward缓存和局部导数组装反向传播",
        "图节点、输入输出shape、缓存、上游/下游梯度、参数梯度和差分误差",
        "广播凑齐梯度或跳过数值梯度检查",
      ],
    ],
    [
      /参数的更新|SGD|Momentum|AdaGrad|Adam|初始值|Batch Normalization|正则化|过拟合|权值衰减|Dropout|超参数|验证数据/,
      [
        "在共同基线上比较优化、初始化、归一和正则策略",
        "共同初值、batch顺序、优化器状态、激活分布、running统计、mask和验证曲线",
        "不公平基线或读取测试结果选择策略",
      ],
    ],
    [
      /卷积|池化|填充|步幅|3维|4维|im2col|CNN|LeNet|AlexNet|可视化/,
      [
        "从空间几何和内存重排实现卷积网络",
        "NCHW与核shape、padding/stride、窗口索引、im2col、前反向差值和滤波器",
        "边界取整、通道或批轴错位",
      ],
    ],
    [
      /加深|深度学习|ImageNet|VGG|GoogLeNet|ResNet|GPU|分布式|精度|物体检测|分割|标题|风格|生成|自动驾驶|Deep Q/,
      [
        "按2016年时间坐标解释架构、算力、应用和展望",
        "论文日期、架构、数据集、训练预算、硬件、指标、应用证据与当前标签",
        "把当前能力倒填原版或跨预算比较",
      ],
    ],
    [
      /附录A|正向传播|反向传播|小结/,
      [
        "复核Softmax-with-Loss的稳定正向和批量反向",
        "logit/标签shape、稳定平移、概率、损失归约、反向梯度与差分误差",
        "标签编码或batch归约错误",
      ],
    ],
  ];
  return (
    rules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把目录坐标转为有代码、形状、梯度、训练和评估的实现合同",
      "环境、输入输出、张量shape、缓存、梯度、训练轨迹、反例和时间边界",
      "只复述代码或模型名称",
    ]
  );
}

function termFor(concept, index) {
  const short = concept
    .replace(/^第\s*\d+章\s*/, "")
    .replace(/^\d+(?:\.\d+)*\s+/, "")
    .replace(/^附录\s*A\s*/, "")
    .split(/[；;：:——,，]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 24
    ? short
    : `实现坐标${index + 1}`;
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
    `“${title}”以2016年日文原版与2018年中文译本目录为内容边界；当前Python/NumPy兼容修正、自动微分框架和后续架构只作带时间标签的独立核验。`;
  const stageDetails = [
    [
      "锁定解释器、依赖、输入与数据角色",
      "冻结版本、dtype、shape、轴、种子和允许读取的信息",
      "可追溯输入状态",
    ],
    [
      "执行本页的前向代码或数组变换",
      "保存输入输出shape、参数、缓存和数值范围",
      "可重放前向状态",
    ],
    [
      "计算局部导数、数值梯度或状态更新",
      "保存上游梯度、归约轴、差分步长和相对误差",
      "可复核梯度状态",
    ],
    [
      "按固定batch顺序更新参数或组合网络",
      "保存优化器状态、损失、训练/推理模式和曲线",
      "可比较训练状态",
    ],
    [
      "执行形状、梯度、复现和独立评估检查",
      "隔离测试角色并登记版本、失败反例和时间边界",
      "独立实现证据包",
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
      input: `${title}：${stageDetails[index][0]}，保持其余实现合同不变`,
      operation: `${stageDetails[index][1]}，并持续满足“${specification.invariant}”`,
      output: `${name}产生${stageDetails[index][2]}`,
      check: `${stageDetails[index][2]}、shape与数值断言；出现“${specification.fault}”时停止`,
    })),
    cases: [
      {
        name: "参考运行",
        observation: `${specification.scenario} 固定环境、数据、shape、初值、顺序、容差和种子。`,
        prediction: `沿“${specification.stageNames.join(" → ")}”得到可复核实现结果。`,
        boundary: `全过程必须满足“${specification.invariant}”。`,
      },
      {
        name: "边界反例",
        observation: `${specification.scenario} 其余条件不变，只注入“${specification.fault}”。`,
        prediction:
          "定位第一处环境、shape、前向、梯度、训练或评估状态偏离，并拒绝结论。",
        boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
      },
    ],
    referenceTrace: [
      `为“${title}”冻结环境、数据角色、dtype/shape、初值、顺序、容差和随机种子`,
      `执行${specification.stageNames.slice(0, 2).join("、")}，保存输入输出、参数、缓存与数值范围`,
      `推进${specification.stageNames.slice(2, 4).join("、")}，记录梯度、更新、损失与训练状态`,
      `在${specification.stageNames[4]}交付${specification.artifact}`,
    ],
    faultTrace: [
      `“${title}”复用相同环境、数据角色、dtype/shape、初值、顺序、容差和种子`,
      `只改变一个条件：${specification.fault}`,
      `沿“${specification.stageNames.join(" → ")}”寻找最早的代码、shape、梯度或评估分叉`,
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
      unit.id === "dls-app" ? "appendix" : "chapter",
      unit,
    ),
  ),
  enrichProfile("finalReview", SPECS.finalReview, "final-review"),
];
if (profiles.length !== 11) throw new Error("课程必须恰好为11页");

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并区分2016年原版、2018年中文译本与当前扩展
- 能先预测“${profile.question}”“${profile.title}”会改变哪个数组、缓存、梯度或训练状态，再用shape与数值断言逐步复核
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、降级或拒绝实现结论

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个实现问题开始

${profile.opening} “${profile.title}”的贯穿任务是：${profile.scenario} 动手前先写下哪个输入、shape、缓存、梯度、参数或指标会变化；运行后补理由不算预测。

围绕“${profile.question}”“${profile.title}”建立参考、故障与恢复路径。只有它守住“${profile.invariant}”并交付${profile.artifact}，代码、图形或指标才构成从零实现证据。

## 书目、211个原版层级与版本边界

“${profile.title}”以[O’Reilly Japan原版官方书页](${SOURCES.original})核对斋藤康毅著《ゼロから作るDeep Learning》于2016年9月24日出版、320页、ISBN 9784873117584，并以[出版社完整目录](${SOURCES.toc})逐项统计8个章标题、202个编号节/小节与附录A，共211个正式目录层级。[出版社官方代码仓库](${SOURCES.repository})提供可运行示例，[官方勘误](${SOURCES.errata})用于识别已知错误。

本项目没有取得原书完整正文授权，只以官方完整目录、示例代码和勘误限定范围；中文解释、代码实验、交互、练习与答案均为独立教学重写。[O’Reilly中文在线书目](${SOURCES.chinese})只用于核对陆宇杰译、人民邮电出版社2018年7月、ISBN 9787115485588和中文目录，不用来证明日文原版正文。${profile.boundary}

本页另以${links}核对算法定义、实现语义或数值诊断。外部资料能验证技术事实，不能反向证明原书采用了本站表述。`;
}

const patterns = [
  (p, c, m, e, x, i) =>
    `在“${p.title}”的坐标${i + 1}中，目录项「${c}」用于${m}；先冻结环境与shape，再以${e}复核，出现${x}时撤回结论。`,
  (p, c, m, e, x, i) =>
    `目录项「${c}」进入“${p.title}”后要回答第${i + 1}个实现问题：它怎样${m}、改变哪个数组或训练状态、由哪些${e}证明，并如何排除${x}。`,
  (p, c, m, e, x, i) =>
    `围绕“${p.question}”“${p.title}”在原版层级${i + 1}把「${c}」落实为${m}；复核者先读取${e}，不能接受${x}。`,
  (p, c, m, e, x, i) =>
    `对“${p.title}”而言，目录项「${c}」的最小实现合同是${m}，第${i + 1}次检查保存${e}；若产生${x}，就返回上一步。`,
  (p, c, m, e, x, i) =>
    `第${i + 1}个正式坐标「${c}」服务于${p.duty}，需要以${e}呈现${m}；${x}会破坏“${p.invariant}”。`,
];

function conceptsSection(profile) {
  return `## 原版目录层级与实现机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept);
    const term = termFor(concept, index);
    const visibleConcept = proseConcept(concept);
    const definition = `${term}对应原版目录坐标“${visibleConcept}”，在“${profile.title}”中用于${mechanism}，并受环境、dtype、shape、代码状态、训练角色与版本边界约束。`;
    return `### ${concept}

<Term def=${JSON.stringify(definition)}>${term}</Term>

**原版坐标 ${index + 1}/${profile.concepts.length}。** ${patterns[index % patterns.length](profile, visibleConcept, mechanism, evidence, caution, index)}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个章专属实现实验

<Callout type="info" title="先写出哪个数组、梯度或训练状态会先变化">
  对“${profile.title}”先冻结环境、数据角色、dtype/shape、初值、顺序、容差和种子，再操作张量路径、梯度轨迹和训练验收门；结果与预测不一致时修改假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 张量、算子与程序状态">
    固定“${profile.scenario}”，在参考与反例间切换，逐阶段查看“${profile.stageNames.join("、")}”的输入、代码动作、输出和shape检查。

    <${profile.componentBase}TensorPathLab />
  </Step>
  <Step title="2. 参考与单故障梯度轨迹">
    保持环境、输入shape和初值不变，只注入“${profile.fault}”，定位第一个偏离“${profile.invariant}”的步骤。

    <${profile.componentBase}GradientTraceLab />
  </Step>
  <Step title="3. 训练与评估证据验收门">
    分别锁定环境数据、前向shape、梯度数值、训练复现与独立评估，展开${profile.artifact}后决定是否接受。

    <${profile.componentBase}TrainingGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页单一故障：${profile.fault}">
  “${profile.title}”遇到该故障时保持其余环境、数据角色、dtype/shape、初值、顺序、容差和种子不变，沿五阶段寻找最早偏离；最终指标看似合理不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="能运行不等于数组与梯度语义正确">
  ${profile.scenario} 的代码只说明解释器接受语法；“${profile.title}”仍需dtype、shape、轴、缓存、数值梯度、训练曲线和边界反例。
</Callout>

<Callout type="trap" title="当前框架与架构不能冒充2016年原版">
  “${profile.title}”引用现行文档是为了核对计算语义；自动微分、当前API和后续模型必须单列时间标签，不能倒填2016年日文原版或2018年中文译本。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放实现协议

| 阶段 | 允许动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stageNames
  .map(
    (stage, index) =>
      `| ${stage} | 在“${profile.title}”执行${stage}，只改变声明的代码、数组或训练状态 | ${index === 0 ? "环境、输入、dtype/shape、数据角色与版本" : index === 4 ? "梯度误差、曲线、独立评估、反例与复现" : "层、参数、缓存、梯度、优化器状态与输出"} | ${index === 0 ? "环境或shape不可追溯" : index === 4 ? "无法重放或缺少独立测试" : profile.fault} |`,
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

该协议要求“${profile.title}”在相同环境、数据角色、dtype/shape、初值、顺序、容差和种子下重放。重置后若案例、阶段、轨迹模式、步骤、训练门或证据包没有回到基线，交互状态已经污染比较。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>检索键 dls-${alphaCode(index)} 对应目录坐标「${proseConcept(concept)}」；在“${profile.title}”中用于${mechanism}，需要连接原版范围、代码/shape、梯度轨迹与独立评估证据。</GlossaryItem>`;
    })
    .join("\n");
  const coverageList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. “${profile.title}”的目录项「${proseConcept(concept)}」：以“${mechanism}”解释实现作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是背诵代码或API，而是能围绕“${profile.question}”重建环境、shape、前向、梯度、训练与评估证据，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：实现合同。** “${profile.title}”为什么必须先冻结环境、数据角色、dtype/shape、初值、顺序、容差和种子？

<Answer>
  ${profile.scenario} 若这些条件变化，相同指标可能来自不同数组轴、缓存、梯度、batch或随机轨迹；“${profile.title}”先冻结合同，才能把观测连接到单一实现机制。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明原版目录坐标已经进入机制、交互和练习？

<Answer>
${coverageList}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一环境、数据角色、dtype/shape、初值、顺序、容差和种子，重放参考路径后只注入“${profile.fault}”；记录最早偏离，撤销故障再运行。只有张量路径、梯度轨迹、训练门和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-plus-official-code"
  workTitle="斋藤康毅著《ゼロから作るDeep Learning》"
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
        label: "环境、输入与数据角色",
        detail: `“${profile.title}”的解释器、依赖、dtype/shape、采样/切分、允许读取的信息和版本可追溯。`,
      },
      {
        label: "前向代码与形状",
        detail: `“${profile.title}”的层、参数、轴、缓存、激活、损失和输出shape已冻结。`,
      },
      {
        label: "梯度与训练复现",
        detail: `“${profile.title}”的数值梯度、反向梯度、初值、batch顺序、优化器状态和误差可重放。`,
      },
      {
        label: "独立评估与边界",
        detail: `“${profile.title}”归档训练/验证曲线、独立测试、反例、复现环境、适用域和时间标签。`,
      },
    ],
  };
  return `"use client";

import {
  DlsEvidenceLab,
  type DlsEvidenceModel,
} from "./dls-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies DlsEvidenceModel;

export function ${profile.componentBase}TensorPathLab() {
  return <DlsEvidenceLab model={model} view="tensor-path" />;
}

export function ${profile.componentBase}GradientTraceLab() {
  return <DlsEvidenceLab model={model} view="gradient-trace" />;
}

export function ${profile.componentBase}TrainingGateLab() {
  return <DlsEvidenceLab model={model} view="training-gate" />;
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
import { ${profile.componentBase}TensorPathLab, ${profile.componentBase}GradientTraceLab, ${profile.componentBase}TrainingGateLab } from "@/components/mdx/${BOOK}/v2/${slug}";

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
    description: `${profile.duty}；用张量路径、单故障梯度轨迹和训练验收门完成独立复核。`,
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
  /^第\s*\d+章/.test(item),
).length;
const numberedTopics = allConcepts.filter((item) =>
  /^(?:\d+(?:\.\d+)+|A\.\d+)\s/.test(item),
).length;
const appendixLevels = allConcepts.filter((item) =>
  /^附录\s*A/.test(item),
).length;
const catalogLevels = allConcepts.length;
if (
  chapterHeadings !== 8 ||
  numberedTopics !== 202 ||
  appendixLevels !== 1 ||
  catalogLevels !== 211
) {
  throw new Error(
    `目录口径应为8章+202编号层级+1附录=211，实际${chapterHeadings}+${numberedTopics}+${appendixLevels}=${catalogLevels}`,
  );
}

manifestDocument.books[BOOK] = {
  ...previousManifest,
  edition:
    "斋藤康毅著、陆宇杰译《深度学习入门：基于Python的理论与实现》，人民邮电出版社，2018年7月，ISBN 9787115485588；原版《ゼロから作るDeep Learning》，O'Reilly Japan，2016年9月24日，320页，ISBN 9784873117584",
  sourceKind:
    "official-original-publisher-complete-eight-chapter-two-hundred-two-numbered-section-one-appendix-outline-plus-official-code-repository-and-errata",
  sourceUrl: SOURCES.original,
  secondarySourceUrls: Object.values(SOURCES).slice(1),
  status: "verified-outline",
  verifiedAt: "2026-07-30",
  disclosureNote:
    "O'Reilly Japan原版官方书页确认斋藤康毅著、2016年9月24日、320页、ISBN 9784873117584，并提供完整目录、官方代码与勘误入口；O'Reilly中文在线书目核对陆宇杰译、人民邮电出版社2018年7月、ISBN 9787115485588和中文目录。原版目录逐项统计8个章标题、202个编号节/小节和附录A，共211个正式层级。课程按8章与附录逐一覆盖，另设学习地图和总复习，共11页、33个章专属交互。未取得原书完整正文授权，全部中文解释、代码实验、交互、练习与答案均为独立教学重写。旧页面虽列出目录，却缺少合法目标/归属结构、shape/梯度证据和可复核交互，现已整体替换。",
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
  unitMappingEvidence: "quality/deep-learning-from-scratch-v2-profiles.json",
  factSourcePolicy:
    "O'Reilly Japan官方书页与完整目录限定2016年原版事实和211个目录层级，官方代码仓库与勘误核对实现；Python/NumPy/Matplotlib、MNIST、感知机、反向传播、数值梯度、Softmax、优化器、BatchNorm、Dropout、卷积、LeNet/AlexNet/VGG/GoogLeNet/ResNet和CUDA分别以官方文档或原始论文核对。当前兼容修正、框架和后续架构不得反写原版。",
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
      outlineSources: [SOURCES.original, SOURCES.toc, SOURCES.chinese],
      officialCodeSource: SOURCES.repository,
      errataSource: SOURCES.errata,
      translationCatalogSource: SOURCES.chinese,
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
