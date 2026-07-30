import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "deep-learning-gen-models";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/deep-learning-gen-models/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/deep-learning-gen-models-v2-profiles.json",
);

const SOURCES = {
  original: "https://www.oreilly.co.jp/books/9784814400591/",
  chinese: "https://oreilly.com.cn/index.php?func=book&isbn=978-7-115-66977-3",
  repository: "https://github.com/oreilly-japan/deep-learning-from-scratch-5",
  errata:
    "https://github.com/oreilly-japan/deep-learning-from-scratch-5/wiki/errata",
  numpy: "https://numpy.org/doc/stable/user/",
  scipyStats: "https://docs.scipy.org/doc/scipy/reference/stats.html",
  em: "https://doi.org/10.1111/j.2517-6161.1977.tb01600.x",
  pytorch: "https://docs.pytorch.org/docs/stable/index.html",
  torchvision: "https://docs.pytorch.org/vision/stable/index.html",
  vae: "https://arxiv.org/abs/1312.6114",
  ddpm: "https://arxiv.org/abs/2006.11239",
  scoreSde: "https://arxiv.org/abs/2011.13456",
  unet: "https://arxiv.org/abs/1505.04597",
  classifierGuidance: "https://arxiv.org/abs/2105.05233",
  classifierFreeGuidance: "https://arxiv.org/abs/2207.12598",
  latentDiffusion: "https://arxiv.org/abs/2112.10752",
  diffusers: "https://huggingface.co/docs/diffusers/",
};

const PATHS = {
  learningMap: "00-learning-map/dlg-official-learning-map",
  "dlg-01": "01-normal-distribution/dlg-01-normal-distribution",
  "dlg-02": "02-maximum-likelihood/dlg-02-maximum-likelihood",
  "dlg-03": "03-multivariate-normal/dlg-03-multivariate-normal",
  "dlg-04": "04-gaussian-mixture/dlg-04-gaussian-mixture",
  "dlg-05": "05-em-algorithm/dlg-05-em-algorithm",
  "dlg-06": "06-neural-network/dlg-06-neural-network",
  "dlg-07": "07-vae/dlg-07-vae",
  "dlg-08": "08-diffusion-theory/dlg-08-diffusion-theory",
  "dlg-09": "09-diffusion-implementation/dlg-09-diffusion-implementation",
  "dlg-10": "10-diffusion-applications/dlg-10-diffusion-applications",
  "dlg-app-a": "11-appendices/dlg-appendix-a-multivariate-mle",
  "dlg-app-b": "11-appendices/dlg-appendix-b-jensen",
  "dlg-app-c": "11-appendices/dlg-appendix-c-hierarchical-vae",
  "dlg-app-d": "11-appendices/dlg-appendix-d-notation",
  finalReview: "12-final-review/dlg-official-final-review",
};

const STAGE_SPECS = {
  "dlg-01": {
    duty: "从随机变量、期望和方差建立正态分布与中心极限定理实验",
    question:
      "怎样证明一条密度曲线已归一化，并区分总体分布、有限样本直方图与样本和分布？",
    invariant:
      "随机变量支持集、密度/质量口径、均值、方差、样本量和随机种子一致",
    fault: "把概率密度函数在单点的高度直接解释为该点的概率",
    stageNames: ["定义变量", "计算密度", "采集样本", "汇总统计", "检查归一"],
    source: SOURCES.scipyStats,
    opening:
      "本步骤先建立生成模型的概率语言，让公式、代码采样和经验直方图相互校验。",
  },
  "dlg-02": {
    duty: "从总体、样本与似然函数推导正态模型的最大似然估计和生成用途",
    question:
      "怎样证明被最大化的是固定观测数据下的参数似然，而不是把参数误当随机样本？",
    invariant:
      "数据集版本、独立同分布假设、密度定义、对数似然、参数约束与导数一致",
    fault: "在选择参数时混入由候选模型新生成的样本，导致似然比较数据不固定",
    stageNames: [
      "冻结样本",
      "定义模型",
      "累计对数似然",
      "优化参数",
      "独立生成",
    ],
    source: SOURCES.scipyStats,
    opening:
      "本步骤把生成模型学习写成参数估计问题，训练样本在比较候选参数时必须保持不变。",
  },
  "dlg-03": {
    duty: "用向量、矩阵、均值向量和协方差矩阵实现多维正态分布及其MLE",
    question: "怎样让张量shape、协方差对称正定性、二次型和归一化常数逐项对齐？",
    invariant:
      "样本轴、特征轴、均值shape、协方差方向、行列式、逆矩阵与dtype一致",
    fault: "把特征数乘样本数的矩阵转置后仍沿用原协方差公式",
    stageNames: ["冻结shape", "估计均值", "估计协方差", "计算密度", "可视核验"],
    source: SOURCES.numpy,
    opening:
      "本步骤把一维正态推广到向量空间，任何等高线都必须回到协方差矩阵的真实几何。",
  },
  "dlg-04": {
    duty: "把多峰数据表示为带混合权重的多个高斯分量并实现GMM密度与采样",
    question:
      "怎样证明每个样本先选择离散分量再从条件高斯采样，并让总密度保持归一？",
    invariant: "分量数、混合权重和、各分量均值/协方差、标签身份与采样顺序一致",
    fault: "混合权重未归一化，却仍把加权密度当作概率分布",
    stageNames: ["定义分量", "归一权重", "选择分量", "条件采样", "汇总密度"],
    source: SOURCES.scipyStats,
    opening:
      "本步骤用潜在分量身份解释多峰分布，生成路径和边缘密度必须描述同一个模型。",
  },
  "dlg-05": {
    duty: "从KL散度与ELBO推导EM算法，并实现GMM的E步和M步",
    question:
      "怎样让责任度、下界、对数似然和参数更新形成可检查的单调改进证据链？",
    invariant:
      "潜变量定义、q分布归一化、E步旧参数、M步责任度快照与对数似然口径一致",
    fault: "在同一轮E步尚未完成时原位更新参数，使不同样本使用不同模型快照",
    stageNames: [
      "冻结旧参数",
      "计算责任度",
      "评估ELBO",
      "更新参数",
      "核对似然",
    ],
    source: SOURCES.em,
    opening:
      "本步骤把不可直接观测的分量身份交给责任度，并要求E步与M步使用清晰的参数快照。",
  },
  "dlg-06": {
    duty: "复核PyTorch张量、梯度、优化器、神经网络与MNIST数据管线",
    question:
      "怎样让数据shape、前向缓存、损失、梯度和优化器写入在同一批次上相互核对？",
    invariant:
      "数据版本、预处理、batch轴、参数身份、梯度清零、训练/评估模式与随机种子一致",
    fault: "连续批次之间未清除梯度，却仍把累计梯度解释为当前批次导数",
    stageNames: ["冻结数据", "执行前向", "计算损失", "反向更新", "模式回归"],
    source: SOURCES.pytorch,
    opening:
      "本步骤为VAE和扩散模型准备可微参数模型，训练曲线不能替代张量与梯度账本。",
  },
  "dlg-07": {
    duty: "从GMM与EM过渡到VAE，复核编码器、解码器、重参数化与ELBO优化",
    question:
      "怎样证明重构项和KL项来自同一批样本，并让随机潜变量仍可对参数求梯度？",
    invariant:
      "输入批次、编码分布参数、噪声样本、重参数化、解码似然与ELBO缩放一致",
    fault: "直接从参数相关分布采样潜变量并切断梯度，却仍声称使用重参数化",
    stageNames: ["编码分布", "采样噪声", "重参数化", "解码样本", "优化ELBO"],
    source: SOURCES.vae,
    opening:
      "本步骤用神经网络摊销潜变量推断，并把可训练随机节点落实为显式噪声变换。",
  },
  "dlg-08": {
    duty: "推导扩散与逆扩散过程、三段ELBO和噪声预测训练目标",
    question:
      "怎样让每个时间步的前向噪声、闭式边缘、后验和逆向参数化共享同一调度表？",
    invariant:
      "时间索引、beta/alpha调度、累计乘积、噪声样本、条件变量、后验方差与目标一致",
    fault: "训练噪声目标使用时间步t，前向加噪却读取另一时间步的累计alpha",
    stageNames: ["冻结调度", "前向加噪", "计算后验", "预测噪声", "逆向采样"],
    source: SOURCES.ddpm,
    opening:
      "本步骤把数据逐步变成噪声，再学习逆向条件分布；所有闭式公式依赖同一时间调度。",
  },
  "dlg-09": {
    duty: "实现U-Net、时间编码、Diffuser、单步去噪、完整采样与训练循环",
    question:
      "怎样让图像shape、时间嵌入、跳跃连接、噪声目标和采样器状态逐层对齐？",
    invariant:
      "输入通道、空间分辨率、skip配对、时间编码、调度张量、训练目标与设备一致",
    fault: "U-Net解码阶段拼接了错误分辨率的skip张量并通过隐式广播掩盖问题",
    stageNames: ["组装U-Net", "编码时间", "前向加噪", "训练预测", "逐步去噪"],
    source: SOURCES.unet,
    opening:
      "本步骤把理论落到真实张量路径，要求每次降采样、上采样和时间条件都可追踪。",
  },
  "dlg-10": {
    duty: "实现条件扩散、分数函数、分类器引导、无分类器引导与潜空间扩散边界",
    question:
      "怎样证明条件信息只按声明的引导公式改变预测，并区分像素扩散与Stable Diffusion？",
    invariant:
      "条件标签、无条件分支、引导权重、分数/噪声参数化、调度与潜空间编码一致",
    fault: "比较引导强度时更换初始噪声，导致样本差异无法归因于条件",
    stageNames: [
      "冻结条件",
      "双分支预测",
      "组合引导",
      "逆向采样",
      "标注潜空间",
    ],
    source: SOURCES.classifierFreeGuidance,
    opening:
      "本步骤在扩散骨架上加入条件与引导，并明确Stable Diffusion还需要独立的潜空间组件。",
  },
  "dlg-app-a": {
    duty: "逐项推导多维正态均值向量与协方差矩阵的最大似然估计",
    question:
      "怎样让二次型、迹、矩阵微分与协方差约束在每一步保持维度和对称性？",
    invariant:
      "样本矩阵方向、均值向量shape、协方差对称性、迹变换与微分变量一致",
    fault: "把非对称中间矩阵直接当作协方差估计且未做维度检查",
    stageNames: [
      "写出似然",
      "转为对数",
      "整理二次型",
      "执行矩阵微分",
      "核对解",
    ],
    source: SOURCES.numpy,
    opening: "本附录把正文结论还原为矩阵推导，维度和对称性是每一步的验收条件。",
  },
  "dlg-app-b": {
    duty: "用凸凹函数与詹森不等式推导ELBO，并标清等号成立条件",
    question:
      "怎样证明期望移入log后方向正确，并让q分布的支持集覆盖目标联合分布？",
    invariant:
      "函数凸凹性、不等式方向、q归一化、支持集、期望变量与等号条件一致",
    fault: "把log当作凸函数使用，导致ELBO不等式方向翻转",
    stageNames: [
      "定义凸凹",
      "写出期望",
      "应用不等式",
      "展开联合分布",
      "检查等号",
    ],
    source: SOURCES.vae,
    opening:
      "本附录只在前提齐全时移动log与期望，不能把记忆中的不等式方向直接套用。",
  },
  "dlg-app-c": {
    duty: "展开两层层级VAE的生成、推断、ELBO、蒙特卡罗估计与实现",
    question:
      "怎样让两层潜变量的条件依赖、采样顺序和每个KL项与代码张量一一对应？",
    invariant:
      "生成图、推断图、z1/z2条件分布、噪声身份、ELBO分解与batch缩放一致",
    fault: "交换两层潜变量的条件方向，却仍沿用原ELBO分解",
    stageNames: [
      "画生成图",
      "画推断图",
      "分解ELBO",
      "蒙特卡罗估计",
      "实现双层",
    ],
    source: SOURCES.vae,
    opening: "本附录把单层VAE扩展为两层潜变量，图结构必须先于公式和代码冻结。",
  },
  "dlg-app-d": {
    duty: "统一全书概率、期望、矩阵、潜变量与扩散时间符号及其作用域",
    question:
      "怎样证明同一个字母在公式、代码和图中指向相同随机变量、参数与shape？",
    invariant:
      "符号名称、随机/确定身份、条件集合、shape、时间下标与代码变量映射一致",
    fault: "在不同步骤复用同一符号表示噪声和模型参数且不声明作用域",
    stageNames: ["登记符号", "标注身份", "标注shape", "连接代码", "检查冲突"],
    source: SOURCES.original,
    opening: "本附录把符号表变成可执行索引，任何歧义都应在进入推导前解决。",
  },
};

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const previousManifest = manifestDocument.books[BOOK];
if (!previousManifest) throw new Error(`缺少 ${BOOK} manifest`);

const MAP_SPEC = {
  title: "《深度学习入门5：生成模型》195个原版目录坐标学习地图",
  duty: "沿正态分布、MLE、GMM/EM、神经网络、VAE与扩散模型恢复全书生成链",
  question:
    "怎样把195个原版目录坐标组织成从概率密度、潜变量到独立采样的可复核路径？",
  invariant:
    "10个步骤标题、47个一级节、120个二级节、4个附录标题和14个附录节逐项落位",
  fault: "按当前热点加入GAN或流模型并跳过正态分布、MLE、GMM与EM基础",
  stageNames: ["目录定位", "冻结数据", "建立分布", "优化目标", "独立采样"],
  source: SOURCES.original,
  opening:
    "学习地图保持原书十步顺序，从可复算的概率分布出发，经过潜变量目标后才进入扩散。",
  boundary:
    "原版出版于2024年，中文授权版书目为2025年；后续扩散采样器、模型版本和依赖兼容修正只作带时间标签的扩展。",
};

const REVIEW_SPEC = {
  title: "《深度学习入门5：生成模型》分布—潜变量—采样总复习",
  duty: "综合复核10步、4个附录与195个目录坐标，交付可重放的生成模型实验档案",
  question:
    "怎样从同一份数据和随机种子定位归一化错误、ELBO缩放、shape错位或扩散调度混用？",
  invariant:
    "每项结论都能回到数据版本、分布参数、随机变量、目标分解、张量状态与独立样本",
  fault: "只保存最好看的生成图片，删除密度、目标、失败种子和参数快照",
  stageNames: ["锁定范围", "复核概率", "复核潜变量", "复核扩散", "封存采样"],
  source: SOURCES.errata,
  opening:
    "总复习用同一小型数据集串联正态、GMM/EM、VAE与扩散，不以漂亮样本替代分布证据。",
  boundary:
    "综合实验以2024年原版、官方代码和勘误为基线；2025年中文授权书目与当前依赖变更分开记录。",
};

function toPascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function conceptStrings(unit) {
  return unit.concepts.map((group) => group.join("；"));
}

function bookCoordinates() {
  return previousManifest.units.map((unit) => conceptStrings(unit)[0]);
}

function enrichProfile(key, specification, role, unit = null) {
  const chapterPath = PATHS[key];
  if (!chapterPath) throw new Error(`缺少路径：${key}`);
  if (!specification) throw new Error(`缺少页面规格：${key}`);
  const title = specification.title ?? unit.title;
  const concepts = unit ? conceptStrings(unit) : bookCoordinates();
  const boundary =
    specification.boundary ??
    `“${title}”以2024年日文原版与2025年中文授权版目录为内容边界；当前模型版本、后续论文与依赖兼容修正只作带时间标签的独立核验。`;
  const stageDetails = [
    [
      "数据版本、样本轴、随机变量、分布支持集、参数shape与随机种子",
      "冻结本页问题所需的数据和模型快照，不运行优化或采样",
      "可哈希的数据、分布与参数前置状态",
      "数据来源、切分、dtype/shape、支持集、参数版本和种子",
    ],
    [
      "冻结数据、当前随机变量、分布参数与本阶段输入张量",
      "只执行一次声明的概率变换、编码、加噪或条件计算",
      "密度、潜变量、噪声状态、责任度或网络输出",
      "输入输出shape、概率和、参数身份、时间下标与随机数位置",
    ],
    [
      "冻结的中间状态、目标定义、旧参数和数值容差",
      "计算似然、KL、ELBO、重构项、噪声目标或其分解",
      "不写参数的目标值、梯度输入与每个可复算分量",
      "符号/代码映射、缩放口径、手算值、有限差分或闭式对照",
    ],
    [
      "目标分量、旧参数、梯度、优化器状态与允许写集合",
      "只更新本页模型允许改变的分布参数或网络权重",
      "新参数、首个真实张量差异与新的目标值",
      "更新前后快照、梯度范数、写集合、目标变化与数值容差",
    ],
    [
      "冻结后的模型、独立输入/初始噪声、采样种子与评估协议",
      "关闭训练后生成或复算，并与基线及单故障运行比较",
      "不可写入参数的密度、样本、指标分布与边界反例",
      "采样前后哈希、逐种子结果、失败轨迹和历史边界",
    ],
  ];
  const artifact = `${title}的数据/分布快照、随机变量与shape账本、目标分解、更新前后参数、失败复现和独立采样报告`;
  return {
    id: key,
    chapterPath,
    componentBase: toPascal(path.basename(chapterPath)),
    title,
    role,
    officialUnitId: unit?.id,
    concepts,
    duty: specification.duty,
    question: specification.question,
    invariant: `${specification.invariant}；${title}的结论不得越过原版目录、数据分布和采样边界`,
    fault: `${specification.fault}；在${title}验收中只注入这一处`,
    stageNames: specification.stageNames,
    opening: specification.opening,
    boundary,
    artifact,
    scenario: `为“${title}”冻结数据、随机变量、分布/网络参数、dtype/shape、目标缩放、运行预算和随机种子，再对照参考路径与单故障路径。`,
    sources: [SOURCES.original, SOURCES.repository, specification.source],
    stages: specification.stageNames.map((name, index) => ({
      name,
      input: `${title}在“${name}”读取${stageDetails[index][0]}。`,
      operation: `${title}在“${name}”阶段${stageDetails[index][1]}。`,
      output: `${title}在“${name}”阶段产出${stageDetails[index][2]}。`,
      check: `${title}在“${name}”阶段保存${stageDetails[index][3]}。`,
    })),
    cases: [
      {
        name: "参考基线",
        setup: `${title}使用冻结数据、固定参数快照、目标口径、预算和种子，不启用故障。`,
        prediction: `${title}应沿“${specification.stageNames.join(" → ")}”得到可重放的分布、目标、更新与样本轨迹。`,
        boundary: `${title}的参考运行只证明声明数据与预算内的机制，不外推到未测分布。`,
      },
      {
        name: "单一故障",
        setup: `${title}复用参考快照，只启用“${specification.fault}”。`,
        prediction: `${title}应在最终样本变化前定位首个密度、shape、目标、梯度或随机状态分岔。`,
        boundary: `${title}若同时更换数据、种子或预算，就不能把差异归因于该故障。`,
      },
      {
        name: "边界探针",
        setup: `${title}保持算法不变，只选择一个支持集、数值条件或原版范围失效的输入。`,
        prediction: `${title}应拒绝强结论并指出缺失的归一化、shape、支持条件或历史标签。`,
        boundary: `${title}的边界探针用于收窄结论，不能伪装成原版正文或官方实验。`,
      },
    ],
    referenceTrace: [
      `为“${title}”锁定数据、随机变量、分布/网络参数、dtype/shape、目标口径、预算和种子。`,
      `在“${title}”记录密度、潜变量或加噪状态，并手算本页似然、KL、ELBO或噪声目标。`,
      `沿“${specification.stageNames.join(" → ")}”保存更新前后参数、梯度、缓存与随机数位置。`,
      `冻结“${title}”的训练状态，归档${artifact}。`,
    ],
    faultTrace: [
      `“${title}”复用完全相同的数据、参数快照、目标口径、预算与随机序列。`,
      `“${title}”只改变一个条件：${specification.fault}。`,
      `沿“${specification.stageNames.join(" → ")}”定位最早的密度、shape、目标、梯度或采样分岔。`,
      `撤销故障后重放“${title}”；只有“${specification.invariant}”恢复才接受修正。`,
    ],
  };
}

const profiles = [
  enrichProfile("learningMap", MAP_SPEC, "learning-map"),
  ...previousManifest.units.map((unit) =>
    enrichProfile(
      unit.id,
      STAGE_SPECS[unit.id],
      unit.id.startsWith("dlg-app-") ? "appendix" : "step",
      unit,
    ),
  ),
  enrichProfile("finalReview", REVIEW_SPEC, "final-review"),
];
if (profiles.length !== 16) throw new Error("课程必须恰好为16页");

function mechanismFor(concept) {
  const rules = [
    [
      /步骤\d+|附录[A-D]/,
      [
        "声明本步骤在分布—潜变量—目标—采样链中的职责与边界",
        "原版坐标、输入对象、随机变量、目标函数、输出样本、反例和时间边界",
        "只罗列模型名或按当前热点重排原版",
      ],
    ],
    [
      /概率|随机变量|分布的类型|期望值|方差|正态分布|中心极限|样本和|均匀分布/,
      [
        "定义归一化概率分布并用采样统计核对均值与方差",
        "支持集、密度或质量、归一化积分/求和、均值、方差、样本量与种子",
        "把密度高度当作点概率或把有限样本直方图当作总体真值",
      ],
    ],
    [
      /生成式模型|总体|样本|真实数据|身高|最大似然|似然|新数据的生成|概率的计算/,
      [
        "在固定观测样本上最大化参数似然并从拟合分布独立生成",
        "数据版本、模型族、对数似然各项、参数约束、导数、最优值与生成种子",
        "优化时更换观测数据或混淆概率密度与参数似然",
      ],
    ],
    [
      /NumPy|多维数组|逐元素|内积|矩阵积|多维正态|二维正态|3D|等高线|协方差/,
      [
        "用均值向量与协方差矩阵定义多维密度及其几何",
        "样本/特征轴、dtype、均值shape、协方差对称正定性、行列式、逆与二次型",
        "矩阵方向错位、协方差奇异或图形与密度参数不一致",
      ],
    ],
    [
      /多峰|高斯混合|GMM|混合模型|分量|参数估计中的难点/,
      [
        "用离散潜在分量和条件高斯组合多峰分布",
        "分量身份、混合权重和、各均值/协方差、条件密度、边缘密度与采样顺序",
        "权重未归一、标签身份漂移或采样路径与密度公式不一致",
      ],
    ],
    [
      /KL|EM|潜变量|q\(z\)|ELBO|E步骤|M步骤|证据的下限|詹森|Jensen|凸函数|凹函数/,
      [
        "用辅助分布与下界交替执行潜变量推断和参数优化",
        "q归一化、支持集、责任度、旧参数快照、ELBO分解、对数似然与等号条件",
        "E/M步快照混用、不等式方向错误或只看最终似然",
      ],
    ],
    [
      /PyTorch|张量|梯度法|线性回归|Parameter|Module|优化器|神经网络|torchvision|MNIST|预处理|数据加载器/,
      [
        "建立可微张量模型与可重放的数据、前向、反向和优化器合同",
        "数据版本、batch/feature轴、参数身份、前向缓存、损失、梯度清零、模式与种子",
        "梯度跨批累积、训练评估模式混用或预处理泄漏",
      ],
    ],
    [
      /VAE|编码器|解码器|变量变换|重参数|新图像|整个数据集/,
      [
        "以编码分布、重参数化潜变量和解码似然优化VAE的ELBO",
        "编码均值/方差、噪声样本、重参数化、解码分布、重构项、KL项与batch缩放",
        "随机节点切断梯度或重构项与KL项使用不同批次",
      ],
    ],
    [
      /扩散模型的理论|扩散过程|逆扩散|q\(x_t|q\(x_\{t|q\(xt|ELBO的计算|预测噪声|采样/,
      [
        "用固定噪声调度定义前向扩散、闭式边缘、后验与逆向生成",
        "时间索引、beta/alpha、累计乘积、噪声、xt、x0、后验均值/方差与训练目标",
        "调度错位、终点噪声假设失效或训练和采样使用不同参数化",
      ],
    ],
    [
      /U-Net|位置编码|正弦波|Diffuser|单步去噪|数据生成的实现|学习代码|学习结果/,
      [
        "把扩散公式落实为U-Net、时间条件、加噪训练与逐步去噪张量路径",
        "通道/空间shape、skip配对、时间嵌入、调度张量、噪声目标、设备与采样状态",
        "skip分辨率错配、时间条件丢失或采样器原位污染",
      ],
    ],
    [
      /条件扩散|分数函数|分类器引导|无分类器|Stable Diffusion|Diffusers/,
      [
        "用条件分支、分数或噪声预测和引导权重控制扩散采样",
        "条件标签、无条件分支、引导公式、相同初始噪声、调度、潜编码器与版本",
        "比较时更换初始噪声或把潜空间扩散等同于正文像素扩散",
      ],
    ],
    [
      /均值向量|二次型|微分|迹|符号|数学式|层级VAE|两层VAE|蒙特卡罗/,
      [
        "展开矩阵推导、层级潜变量或全书符号映射并核对每个前提",
        "随机/确定身份、条件依赖、shape、迹与微分规则、ELBO项和代码变量",
        "维度不一致、依赖方向反转或同一符号跨作用域偷换含义",
      ],
    ],
  ];
  return (
    rules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把目录坐标转成有数据、分布、潜变量、目标、参数和采样证据的实验合同",
      "原版范围、输入输出、shape、概率、目标分量、梯度、随机性与反例",
      "只复述术语或只展示最好看的生成样本",
    ]
  );
}

function termFor(concept, index) {
  const short = concept
    .replace(/^步骤\s*\d+\s*/, "")
    .replace(/^\d+(?:\.\d+)*\s+/, "")
    .replace(/^附录\s*[A-D]\s*/, "")
    .split(/[；;：:——,，]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 24
    ? short
    : `生成模型坐标${index + 1}`;
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
  let result = "";
  while (value > 0) {
    value -= 1;
    result = String.fromCharCode(65 + (value % 26)) + result;
    value = Math.floor(value / 26);
  }
  return result;
}

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并区分2024年原版、2025年中文授权版与当前扩展
- 能先预测“${profile.question}”会改变哪一个密度、shape、潜变量、目标分量、梯度或样本状态，再逐步复核
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、回退或拒绝生成模型结论

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个生成模型问题开始

${profile.opening} “${profile.title}”的贯穿任务是：${profile.scenario} 动手前先写下哪个密度、shape、潜变量、目标分量、梯度、噪声或样本状态会先变化；运行后补理由不算预测。

围绕“${profile.question}”，“${profile.title}”建立参考、故障与恢复路径。只有“${profile.title}”守住“${profile.invariant}”并交付${profile.artifact}，似然曲线或生成图片才构成机制证据。

## 书目、195个原版层级与版本边界

“${profile.title}”以[O’Reilly Japan原版官方书页](${SOURCES.original})核对斋藤康毅著《ゼロから作るDeep Learning ❺ ―生成モデル編》于2024年4月10日出版、336页、ISBN 9784814400591。“${profile.title}”采用出版社同页给出的步骤1至10和附录A至D作为完整目录边界；本站逐项统计10个步骤标题、47个一级节、120个二级节、4个附录标题和14个附录节，共195个正式目录层级。“${profile.title}”再以[出版社官方代码仓库](${SOURCES.repository})核对step01至step10实现，以[官方勘误](${SOURCES.errata})识别已知错误。

“${profile.title}”没有使用未获授权的原书完整正文，只以出版社完整目录、官方代码和勘误限定范围；中文解释、数值、交互、练习与答案均为独立教学重写。“${profile.title}”的[O’Reilly北京中文书目页](${SOURCES.chinese})仅用于核对郑明智译《深度学习入门5：生成模型》、人民邮电出版社2025年6月、278页和ISBN 9787115669773，不用来证明日文原版正文。${profile.boundary}

“${profile.title}”另以${links}核对算法定义、实现语义或实验边界；这些资料能验证本页技术事实，不能反向证明原书采用了本站表述。`;
}

const patterns = [
  (p, c, m, e, x, i) =>
    `在“${p.title}”的坐标${i + 1}中，目录项「${c}」用于${m}；先冻结数据、分布与随机性，再以${e}复核，出现${x}时撤回结论。`,
  (p, c, m, e, x, i) =>
    `目录项「${c}」进入“${p.title}”后要回答第${i + 1}个机制问题：它怎样${m}、改变哪个真实数值状态、由哪些${e}证明，并如何排除${x}。`,
  (p, c, m, e, x, i) =>
    `围绕“${p.question}”，“${p.title}”在原版层级${i + 1}把「${c}」落实为${m}；复核者先读取${e}，不能接受${x}。`,
  (p, c, m, e, x, i) =>
    `对“${p.title}”而言，目录项「${c}」的最小生成模型合同是${m}，第${i + 1}次检查保存${e}；若产生${x}，就返回同一数据与参数快照。`,
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
    const safeConcept = mdxText(visibleConcept);
    const safeTerm = mdxText(term);
    const definition = `${term}对应原版目录坐标“${visibleConcept}”，在“${profile.title}”中用于${mechanism}，并受数据、分布、随机变量、dtype/shape、目标函数、优化、采样协议与版本边界约束。`;
    return `### ${safeConcept}

<Term def=${JSON.stringify(definition)}>${safeTerm}</Term>

**原版坐标 ${index + 1}/${profile.concepts.length}。** 目录原文键 \`${concept}\`。${patterns[index % patterns.length](profile, safeConcept, mechanism, evidence, caution, index)}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个步骤专属生成模型实验

<Callout type="info" title="先写出哪个真实数值状态会最先变化">
  对“${profile.title}”先冻结数据、随机变量、分布/网络参数、dtype/shape、目标缩放、运行预算和种子，再操作分布账本、潜变量目标轨迹和独立采样门；结果与预测不一致时修改假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 分布、随机变量与shape账本">
    固定“${profile.scenario}”，在参考、单故障和边界探针间切换，逐阶段查看“${profile.stageNames.join("、")}”的输入对象、唯一变换、输出状态和必留证据。

    <${profile.componentBase}DistributionLedgerLab />
  </Step>
  <Step title="2. 潜变量、目标函数与参数轨迹">
    保持数据、参数快照、目标口径、预算和随机序列不变，只注入“${profile.fault}”，定位第一处偏离“${profile.invariant}”的密度、shape、目标、梯度或采样状态。

    <${profile.componentBase}LatentObjectiveTraceLab />
  </Step>
  <Step title="3. 冻结模型与独立采样验收门">
    分别锁定数据/分布、参数/shape、随机性/预算和独立采样证据，展开${profile.artifact}后决定是否接受本步骤结论。

    <${profile.componentBase}SamplingGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页单一故障：${profile.fault}">
  “${profile.title}”遇到该故障时保持其余数据、参数快照、目标口径、预算和随机序列不变，沿五阶段寻找最早偏离；最终样本看似合理不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="漂亮样本不等于概率与目标正确">
  “${profile.title}”的一张图片只说明某个随机路径给出可视结果；仍需归一化、shape、目标分解、参数快照、失败种子与独立采样。
</Callout>

<Callout type="trap" title="当前生成生态不能冒充2024年原版">
  “${profile.title}”引用现行文档是为了核对技术语义；后续采样器、模型版本与依赖兼容修正必须单列时间标签，GAN或流模型不能倒填成原书独立步骤。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放实现协议

| 阶段 | 允许动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stageNames
  .map(
    (stage, index) =>
      `| ${stage} | 在“${profile.title}”执行${stage}，只改变声明的分布、潜变量、目标、参数或采样状态 | ${index === 0 ? "数据哈希、支持集、dtype/shape、参数版本与种子" : index === 4 ? "独立样本、逐种子分布、反例、2024/当前边界与参数哈希" : "密度/概率和、随机变量、目标分量、梯度、参数与数值容差"} | ${index === 0 ? "数据或随机性不可追溯" : index === 4 ? "采样仍写参数或无法重放" : profile.fault} |`,
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
reset: restore_data_distribution_parameters_rng_trace_gates_and_artifact
\`\`\`

该协议要求“${profile.title}”在相同数据、随机变量、分布/网络参数、dtype/shape、目标缩放、预算和随机序列下重放。重置“${profile.title}”后若案例、阶段、轨迹模式、步骤、验收门或证据包没有回到基线，交互状态已经污染比较。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>检索键 dlg-${alphaCode(index)} 对应目录坐标「${mdxText(proseConcept(concept))}」；在“${profile.title}”中用于${mechanism}，需要连接原版范围、数据/分布、目标/更新和独立采样证据。</GlossaryItem>`;
    })
    .join("\n");
  const coverageList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. “${profile.title}”的目录项「${mdxText(proseConcept(concept))}」：以“${mechanism}”解释实现作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是背诵模型名或挑选漂亮图片，而是能围绕“${profile.question}”重建数据、分布、潜变量、目标分解、参数更新、随机性与独立采样证据，并用“${profile.invariant}”拒绝“${profile.fault}”。“${profile.title}”最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：生成模型实验合同。** “${profile.title}”为什么必须先冻结数据、随机变量、分布/网络参数、dtype/shape、目标口径、预算和随机种子？

<Answer>
  “${profile.title}”若改变这些条件，相同样本可能来自不同密度、潜变量、目标、参数或随机路径；先冻结合同，才能把观测连接到单一生成机制。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明“${profile.title}”的原版目录坐标已经进入机制、交互和练习？

<Answer>
${coverageList}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.title}”中的“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一数据、参数快照、目标口径、预算和随机序列，重放参考路径后只注入故障；记录最早偏离，撤销故障再运行。只有分布账本、潜变量目标轨迹、独立采样门和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-plus-official-code-and-errata"
  workTitle="斋藤康毅著《ゼロから作るDeep Learning ❺ ―生成モデル編》"
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
        label: "数据、分布与支持集",
        detail: `“${profile.title}”的数据版本、样本轴、随机变量、分布支持集、参数化与归一化条件可追溯。`,
      },
      {
        label: "张量shape、目标与参数快照",
        detail: `“${profile.title}”的dtype/shape、潜变量、似然/KL/ELBO或噪声目标、参数与优化器已经冻结。`,
      },
      {
        label: "随机性、数值条件与运行预算",
        detail: `“${profile.title}”的初始化、噪声、采样顺序、种子、随机数位置、步数与容差可重放。`,
      },
      {
        label: "独立采样与历史边界",
        detail: `“${profile.title}”关闭训练，归档逐种子样本、失败轨迹、参数哈希与2024/当前标签。`,
      },
    ],
  };
  return `"use client";

import {
  GenerativeEvidenceLab,
  type GenerativeEvidenceModel,
} from "./generative-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies GenerativeEvidenceModel;

export function ${profile.componentBase}DistributionLedgerLab() {
  return <GenerativeEvidenceLab model={model} view="distribution-ledger" />;
}

export function ${profile.componentBase}LatentObjectiveTraceLab() {
  return <GenerativeEvidenceLab model={model} view="latent-objective-trace" />;
}

export function ${profile.componentBase}SamplingGateLab() {
  return <GenerativeEvidenceLab model={model} view="sampling-gate" />;
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
import { ${profile.componentBase}DistributionLedgerLab, ${profile.componentBase}LatentObjectiveTraceLab, ${profile.componentBase}SamplingGateLab } from "@/components/mdx/${BOOK}/v2/${slug}";

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
    description: `${profile.duty}；用分布账本、单故障潜变量目标轨迹和独立采样门完成复核。`,
    demo: true,
    math: true,
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

const allConcepts = previousManifest.units.flatMap(conceptStrings);
const stepHeadings = allConcepts.filter((item) =>
  /^步骤\s*\d+/.test(item),
).length;
const primarySections = allConcepts.filter((item) =>
  /^\d+\.\d+\s/.test(item),
).length;
const secondarySections = allConcepts.filter((item) =>
  /^\d+\.\d+\.\d+\s/.test(item),
).length;
const appendixTitles = allConcepts.filter((item) =>
  /^附录\s*[A-D]/.test(item),
).length;
const appendixSections = allConcepts.filter((item) =>
  /^[A-D]\.\d+\s/.test(item),
).length;
const catalogLevels = allConcepts.length;
if (
  stepHeadings !== 10 ||
  primarySections !== 47 ||
  secondarySections !== 120 ||
  appendixTitles !== 4 ||
  appendixSections !== 14 ||
  catalogLevels !== 195
) {
  throw new Error(
    `目录口径应为10步骤+47一级节+120二级节+4附录标题+14附录节=195，实际${stepHeadings}+${primarySections}+${secondarySections}+${appendixTitles}+${appendixSections}=${catalogLevels}`,
  );
}

manifestDocument.books[BOOK] = {
  ...previousManifest,
  edition:
    "斋藤康毅著、郑明智译《深度学习入门5：生成模型》，人民邮电出版社，2025年6月，278页，ISBN 9787115669773；原版《ゼロから作るDeep Learning ❺ ―生成モデル編》，O'Reilly Japan，2024年4月10日，336页，ISBN 9784814400591",
  sourceKind:
    "official-original-complete-ten-step-forty-seven-primary-one-hundred-twenty-secondary-four-appendix-fourteen-appendix-section-outline-plus-official-code-and-errata",
  sourceUrl: SOURCES.original,
  secondarySourceUrls: Object.values(SOURCES).slice(1),
  status: "verified-outline",
  verifiedAt: "2026-07-30",
  disclosureNote:
    "O'Reilly Japan原版官方书页确认斋藤康毅著、2024年4月10日、336页、ISBN 9784814400591，并提供10个步骤、4个附录的完整目录、官方代码与勘误入口；O'Reilly北京中文书目页核对郑明智译《深度学习入门5：生成模型》、人民邮电出版社2025年6月、278页、ISBN 9787115669773。原版目录逐项统计10个步骤标题、47个一级节、120个二级节、4个附录标题和14个附录节，共195个正式层级。课程按10步与4个附录逐一覆盖，另设学习地图和总复习，共16页、48个步骤专属交互；GAN、流模型与文本到图像不虚构为原书独立步骤。未取得原书完整正文授权，全部中文解释、数值、交互、练习与答案均为独立教学重写。旧16页缺少合规目标/归属结构，存在章内模板复制，并缺少分布、潜变量、目标分解和独立采样证据，现已整体替换。",
  units: previousManifest.units.map((unit) => ({
    ...unit,
    chapterPath: PATHS[unit.id],
  })),
  metrics: {
    formalUnits: previousManifest.units.length,
    stepHeadings,
    primarySections,
    secondarySections,
    appendixTitles,
    appendixSections,
    formalNodes: catalogLevels,
    coursePages: profiles.length,
    interactiveViews: profiles.length * 3,
    reviewQuestions: profiles.length * 3,
  },
  sourceAccess: "outline-only",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/deep-learning-gen-models-v2-profiles.json",
  factSourcePolicy:
    "O'Reilly Japan官方书页与完整目录限定2024年原版事实和195个目录层级，官方代码仓库与勘误核对实现；NumPy/SciPy统计语义、EM、PyTorch/torchvision、VAE、DDPM/score SDE、U-Net、分类器/无分类器引导、潜空间扩散与Diffusers分别以官方文档或原始论文核对。当前模型版本、后续采样器与兼容修正不得反写原版。",
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
      outlineSources: [SOURCES.original],
      officialCodeSource: SOURCES.repository,
      errataSource: SOURCES.errata,
      translationCatalogSource: SOURCES.chinese,
      translationMetadata:
        "郑明智译《深度学习入门5：生成模型》，人民邮电出版社，2025年6月，278页，ISBN 9787115669773",
      technicalSources: Object.values(SOURCES).slice(4),
      officialUnits: previousManifest.units.length,
      officialStepHeadings: stepHeadings,
      officialPrimarySections: primarySections,
      officialSecondarySections: secondarySections,
      officialAppendixTitles: appendixTitles,
      officialAppendixSections: appendixSections,
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
  `已重建 ${profiles.length} 页，覆盖${stepHeadings}步骤+${primarySections}一级节+${secondarySections}二级节+${appendixTitles}附录标题+${appendixSections}附录节=${catalogLevels}个原版层级，生成 ${profiles.length * 3} 个交互视图。`,
);
