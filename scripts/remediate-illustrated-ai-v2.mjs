import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "illustrated-ai";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx/illustrated-ai/v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/illustrated-ai-v2-profiles.json");

const SOURCES = {
  publisher: "https://www.shoeisha.co.jp/book/detail/9784798145600",
  chinese: "https://www.tenlong.com.tw/products/9787115558510?list_name=rd",
  dartmouth:
    "http://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html",
  nistAi: "https://www.nist.gov/itl/ai-risk-management-framework",
  hmm: "https://doi.org/10.1109/5.18626",
  regression:
    "https://www.itl.nist.gov/div898/handbook/pmd/section1/pmd141.htm",
  ga: "https://mitpress.mit.edu/9780262581110/adaptation-in-natural-and-artificial-systems/",
  mcmc: "https://mc-stan.org/docs/reference-manual/mcmc.html",
  statbook:
    "https://www.sciencedirect.com/book/monograph/9780128021217/introduction-to-statistical-machine-learning",
  rl: "http://incompleteideas.net/book/the-book-2nd.html",
  fipa: "http://www.fipa.org/specs/fipa00001/",
  backprop: "https://doi.org/10.1038/323533a0",
  rbm: "https://www.cs.toronto.edu/~hinton/absps/guideTR.pdf",
  cnn: "https://caffe.berkeleyvision.org/tutorial/layers/convolution.html",
  rnn: "https://doi.org/10.1162/neco.1997.9.8.1735",
  pattern:
    "https://www.nist.gov/itl/iad/image-group/open-handwriting-recognition-and-translation",
  acl: "https://aclanthology.org/",
  rdf: "https://www.w3.org/TR/rdf11-concepts/",
  sparql: "https://www.w3.org/TR/sparql11-overview/",
  mpi: "https://www.mpi-forum.org/docs/",
  tensorflow: "https://www.tensorflow.org/about/bib",
  iot: "https://doi.org/10.6028/NIST.SP.800-183",
};

const PATHS = {
  learningMap: "00-guide/iai-official-learning-map",
  "iai-01": "01-foundations/iai-01-ai-past-present-future",
  "iai-02": "01-foundations/iai-02-rule-systems-variants",
  "iai-03": "01-foundations/iai-03-automata-artificial-life",
  "iai-04": "02-weight-optimization/iai-04-weighting-optimal-solutions",
  "iai-05": "02-weight-optimization/iai-05-weighting-optimization-programs",
  "iai-06":
    "03-statistical-learning/iai-06-statistical-ml-probability-modeling",
  "iai-07":
    "03-statistical-learning/iai-07-statistical-ml-supervised-unsupervised",
  "iai-08": "04-modern-learning/iai-08-reinforcement-distributed-ai",
  "iai-09": "04-modern-learning/iai-09-deep-learning",
  "iai-10": "05-perception-language/iai-10-image-speech-pattern-recognition",
  "iai-11": "05-perception-language/iai-11-nlp-machine-learning",
  "iai-12":
    "06-knowledge-computing/iai-12-knowledge-representation-data-structures",
  "iai-13": "06-knowledge-computing/iai-13-distributed-computing",
  "iai-14": "07-systems-future/iai-14-big-data-iot",
  finalReview: "08-review/iai-official-final-review",
};

const PAGE_SPECS = {
  learningMap: {
    title: "《图解人工智能》67个原版目录层级学习地图",
    duty: "按14章53个编号主题串联规则、状态、优化、统计学习、深度学习、感知语言、知识、分布式与IoT",
    question:
      "怎样在2016产品开发语境下连接符号、统计和系统路线，又不把后来生成式AI倒填成原版内容？",
    invariant:
      "14章与53编号主题逐项覆盖；知识、状态、数据、目标、执行与系统边界可追溯",
    fault:
      "把原书压缩成搜索、机器学习、深度学习和伦理四块，遗漏规则、自动机、加权回归、知识表示、分布式与IoT",
    scenario:
      "设计一个会感知、推理、学习并通过分布式设备执行动作的助手，逐章登记状态、证据和失败边界。",
    boundary:
      "原书出版于2016年；大语言模型、扩散模型与当前治理要求只作为带日期的后续对照。",
    nodeNames: [
      "观测与数据",
      "知识与状态",
      "推理或学习",
      "动作与服务",
      "监测与回收",
    ],
    sources: [SOURCES.publisher, SOURCES.dartmouth, SOURCES.nistAi],
    artifact:
      "67层级矩阵、系统边界、状态机、规则与模型、训练证据、分布式拓扑、IoT信任、失败模式和时间标签。",
    opening:
      "学习地图恢复原书横跨符号AI、统计学习和计算基础设施的真实结构，不再用现代热点替换历史目录。",
  },
  "iai-01": {
    duty: "界定人工智能概念、黎明时期、发展阶段与未来判断",
    question:
      "怎样把历史主张绑定到具体能力、评测与时间点，而不是用今天结果替过去补写？",
    invariant: "术语、能力声明、时间、数据、评测和当时可得证据同时记录",
    fault: "用2026系统能力改写2016展望，或把一次演示当通用智能",
    scenario:
      "为三个历史系统写能力卡，区分任务成功、方法贡献、未解决问题和后续事件。",
    boundary:
      "本章未来判断按2016时间戳阅读；当前回看单列，不修改原版叙述范围。",
    nodeNames: ["问题背景", "能力声明", "方法与资源", "当时证据", "后续回看"],
    sources: [SOURCES.publisher, SOURCES.dartmouth, SOURCES.nistAi],
    artifact:
      "历史时间线、能力卡、任务与指标、数据/算力条件、失败样本、2016判断和当前回看。",
    opening: "历史页以可验证能力而非浪潮标签组织时间线，避免成功者偏差。",
  },
  "iai-02": {
    duty: "覆盖规则系统、知识库、专家系统和推荐引擎",
    question:
      "怎样让事实、规则、冲突消解和解释轨迹可追踪，并区分推荐分数与专家结论？",
    invariant: "事实来源、规则版本、触发条件、优先级、结论与解释链明确",
    fault: "循环规则或冲突优先级未定义，系统在相同事实下给出不同结论",
    scenario:
      "用一组诊断事实运行前向规则，再把推荐评分作为独立模块接入并保留理由。",
    boundary: "推荐引擎按原版规则/知识章节语境讲；现代深度推荐另列扩展。",
    nodeNames: ["事实输入", "知识库", "规则匹配", "冲突消解", "结论与解释"],
    sources: [SOURCES.publisher, SOURCES.nistAi],
    artifact:
      "事实、出处、规则ID与版本、工作记忆、议程、优先级、触发轨迹、结论、推荐分数和反例。",
    opening:
      "规则页把“如果—那么”升级为可重放推理机，结论必须能回溯到事实和冲突策略。",
  },
  "iai-03": {
    duty: "覆盖人工生命、有限自动机、马尔可夫模型和状态驱动智能体",
    question:
      "怎样区分确定状态转移、概率转移与涌现行为，并证明智能体没有隐式状态？",
    invariant: "状态集合、输入、转移、概率归一化、初态、终止与随机种子固定",
    fault: "遗漏状态或转移概率不归一，轨迹无法由同一初态和种子重放",
    scenario:
      "让智能体在网格环境中按有限状态与马尔可夫转移行动，并比较群体涌现。",
    boundary:
      "人工生命模型与状态驱动智能体按2016入门语境解释，不等同现代基础模型智能体。",
    nodeNames: [
      "环境观测",
      "当前状态",
      "转移规则/概率",
      "动作",
      "新状态与轨迹",
    ],
    sources: [SOURCES.hmm, SOURCES.publisher],
    artifact:
      "状态表、输入字母表、转移矩阵、概率和、初态、种子、动作、轨迹、终止与不可达状态。",
    opening:
      "自动机页让所有行为都能追到状态和转移，涌现不意味着可以省略微观规则。",
  },
  "iai-04": {
    duty: "覆盖线性/非线性、回归、加权回归与相似度",
    question:
      "怎样从特征、权重和距离构造预测，并验证局部加权没有用测试标签调参？",
    invariant: "特征尺度、距离、核/权重、模型、带宽、切分与残差定义固定",
    fault: "用查询点真实标签选择带宽或相似邻居，造成局部回归泄漏",
    scenario: "对非线性一维数据比较全局线性与局部加权回归，并检查边界查询点。",
    boundary: "本章以回归和相似度寻找最优解；现代向量数据库不是原版4章内容。",
    nodeNames: [
      "查询与样本",
      "特征尺度",
      "相似度/权重",
      "局部拟合",
      "预测与残差",
    ],
    sources: [SOURCES.regression, SOURCES.statbook],
    artifact:
      "数据切分、特征、尺度、距离、权重、带宽、设计矩阵、系数、预测、残差和边界样本。",
    opening: "加权回归页把相似度转成透明权重，防止“邻近”成为无法复核的直觉。",
  },
  "iai-05": {
    duty: "覆盖图论、图搜索与最优化、遗传算法和神经网络",
    question:
      "怎样在同一目标下比较显式图搜索、群体进化与梯度学习的状态和停止条件？",
    invariant: "状态编码、邻接/变异、目标函数、预算、随机种子与停止规则固定",
    fault: "不同算法使用不同预算或目标，却依据一次最好结果宣布胜者",
    scenario: "在路径与参数混合优化任务上对照图搜索、遗传算法和小型神经网络。",
    boundary: "本章比较优化程序，不把所有启发式方法统称人工智能。",
    nodeNames: [
      "候选编码",
      "邻接/变异",
      "目标评估",
      "选择/更新",
      "停止与最优证据",
    ],
    sources: [SOURCES.ga, SOURCES.backprop],
    artifact:
      "状态图、候选编码、邻接表、启发式、群体、选择/交叉/变异、梯度、预算、种子和最优性边界。",
    opening: "优化页用共同预算和目标比较程序，保留搜索状态而不只看终点。",
  },
  "iai-06": {
    duty: "覆盖概率分布、贝叶斯估计、MCMC、HMM与贝叶斯网络",
    question: "怎样从联合分布与条件独立生成后验，并用诊断证明MCMC样本可用？",
    invariant: "变量、图结构、先验、似然、条件分布、链初值、种子和诊断固定",
    fault: "单条短链未收敛便用样本均值宣称后验结论",
    scenario:
      "为隐状态序列构建HMM/贝叶斯网络，使用MCMC估计未知参数并比较多链。",
    boundary: "本章按经典概率图模型讲建模；现代概率编程只是独立实现对照。",
    nodeNames: [
      "变量与图",
      "先验/转移",
      "观测似然",
      "后验采样/推断",
      "诊断与预测",
    ],
    sources: [SOURCES.mcmc, SOURCES.hmm],
    artifact:
      "变量表、图、先验、似然、转移/发射、链初值、种子、接受率、轨迹、诊断和后验预测。",
    opening:
      "概率建模页把图、分布、推断和诊断分开；能采样不等于链已代表目标后验。",
  },
  "iai-07": {
    duty: "区分无监督与有监督学习的目标、数据角色和评估",
    question:
      "怎样判断结构发现与标签预测是否使用了正确证据，并避免在全量数据上预处理？",
    invariant: "样本角色、标签可见性、预处理拟合范围、目标和外部评估固定",
    fault: "聚类或标准化先看全量数据，再在同一标签上报告监督结果",
    scenario:
      "对同一数据分别执行聚类与分类，比较结构目标、标签使用和验收方式。",
    boundary: "本章提供学习范式坐标，不替代各算法的详细假设。",
    nodeNames: [
      "样本与角色",
      "表示/预处理",
      "无监督结构",
      "监督预测",
      "外部评估",
    ],
    sources: [SOURCES.statbook, SOURCES.nistAi],
    artifact:
      "数据卡、切分、标签可见矩阵、预处理统计、聚类目标、分类损失、稳定性、测试指标和泄漏反例。",
    opening:
      "监督/无监督页让标签在何时可见成为可审计条件，而不是只按算法名分类。",
  },
  "iai-08": {
    duty: "覆盖集成、强化、迁移和分布式人工智能",
    question:
      "怎样区分模型组合、交互学习、跨域迁移和多智能体协调的状态与反馈？",
    invariant:
      "主体、环境、观测、动作、奖励/任务、通信、共享状态和评估边界明确",
    fault: "多个主体同时写共享状态且消息乱序，奖励变化却归因于强化算法",
    scenario:
      "让多个智能体在目标域协作：集成感知、强化行动、迁移初始化并通过消息协调。",
    boundary: "分布式AI按多主体和协调讲，不等同仅把训练作业分散到多机。",
    nodeNames: [
      "主体与环境",
      "观测/消息",
      "策略/模型组合",
      "动作与奖励",
      "协调与迁移评估",
    ],
    sources: [SOURCES.rl, SOURCES.fipa, SOURCES.statbook],
    artifact:
      "主体ID、环境版本、观测、策略、奖励、源/目标域、消息顺序、共享状态、冲突与逐主体指标。",
    opening:
      "本章把四类“多个”拆开：多个模型、多个时间步、多个域和多个主体不是同一机制。",
  },
  "iai-09": {
    duty: "覆盖多层网络、RBM、深度网络、CNN和RNN",
    question: "怎样沿前向、目标、反向或采样追踪五类模型，并保留其结构差异？",
    invariant: "数据、拓扑、参数、目标、随机性、训练步骤和验证集固定",
    fault: "把所有模型包装成同一前馈训练流程，RBM采样或RNN时间状态被抹掉",
    scenario: "对静态图像与短序列分别选择CNN/RNN，并单独演示MLP与RBM训练机制。",
    boundary:
      "本章按2016深度学习谱系讲；Transformer、扩散模型和LLM不计入原版9章。",
    nodeNames: [
      "输入张量/序列",
      "隐藏表示",
      "目标/能量",
      "反向/采样更新",
      "验证与状态",
    ],
    sources: [SOURCES.backprop, SOURCES.rbm, SOURCES.cnn, SOURCES.rnn],
    artifact:
      "数据切分、拓扑、张量形状、能量/损失、时间状态、采样/梯度、参数、种子、训练曲线和验证失败。",
    opening: "深度学习页保留前馈、能量模型、卷积与循环的不同状态合同。",
  },
  "iai-10": {
    duty: "覆盖模式识别、特征提取、图像识别和语音识别",
    question: "怎样从传感器信号到特征、模型和解码结果建立端到端误差归因？",
    invariant: "采样、标注、预处理、特征、模型、解码、指标和噪声条件固定",
    fault: "训练测试来自同一说话人或图像近重复，指标因身份泄漏虚高",
    scenario: "对图像字符与短语音片段建立识别管线，并注入模糊和噪声。",
    boundary: "本章按2016模式识别管线讲；当前多模态基础模型只作迁移对照。",
    nodeNames: [
      "传感器信号",
      "预处理",
      "特征表示",
      "识别/解码",
      "误差与噪声评估",
    ],
    sources: [SOURCES.pattern, SOURCES.cnn, SOURCES.hmm],
    artifact:
      "采样率/分辨率、标注、实体切分、预处理、特征、模型、解码、混淆矩阵、噪声曲线和泄漏检查。",
    opening:
      "感知页把识别错误追到采样、特征、模型或解码，而不是只显示最终标签。",
  },
  "iai-11": {
    duty: "覆盖句法理解、知识获取与统计语义、结构分析和文本生成",
    question: "怎样让分词、句法/语义结构、检索知识与生成输出有可追溯中间表示？",
    invariant: "语料版本、切分、词表、结构标注、检索来源、解码规则和评估固定",
    fault: "训练测试句子或检索答案重叠，生成流畅却无法追到结构和来源",
    scenario: "对一句歧义文本执行切分、结构分析、语义检索和受约束生成。",
    boundary: "本章按2016 NLP与统计语义学讲；LLM能力单列当前迁移，不倒填11章。",
    nodeNames: [
      "文本与切分",
      "句法结构",
      "统计语义/知识",
      "生成解码",
      "来源与质量评估",
    ],
    sources: [SOURCES.acl, SOURCES.nistAi],
    artifact:
      "语料版本、实体切分、词表、句法树、语义向量、检索文档、解码轨迹、引用、人工标准和歧义反例。",
    opening: "语言页要求每一步留下结构或来源，流畅文本本身不是理解证据。",
  },
  "iai-12": {
    duty: "覆盖数据库、检索、语义网络与语义网",
    question: "怎样让记录、索引、RDF三元组、查询和推理结论共享身份与语义？",
    invariant: "实体ID、模式、索引、词汇表、图、查询、版本与推理规则明确",
    fault: "同名实体被错误合并，查询结果完整但语义指向错误对象",
    scenario: "把结构化记录转为RDF图，建立检索索引并用SPARQL查询来源和关系。",
    boundary: "语义网按RDF/SPARQL标准核验；当前知识图谱产品不反写原版。",
    nodeNames: [
      "实体与记录",
      "模式/词汇",
      "索引与检索",
      "RDF图与查询",
      "推理与出处",
    ],
    sources: [SOURCES.rdf, SOURCES.sparql],
    artifact:
      "实体ID、数据库模式、索引版本、RDF三元组、命名图、词汇IRI、SPARQL查询、结果、出处和冲突。",
    opening:
      "知识表示页把数据存储、查找与语义推理分层，防止相似字符串冒充同一实体。",
  },
  "iai-13": {
    duty: "覆盖分布式/并行计算、硬件、软件及机器学习/深度学习平台",
    question: "怎样把工作划分、通信、同步、容错与数值一致性连接到平台选择？",
    invariant: "任务图、数据分片、设备、软件版本、通信顺序、随机性和恢复点固定",
    fault: "工作节点失败后重复提交更新，参数被计算两次且检查点仍标记成功",
    scenario:
      "把一次模型训练拆到多设备，记录数据并行、聚合、检查点和节点恢复。",
    boundary:
      "2016平台生态保留历史标签；当前云与加速器只作迁移，不替代原版13章。",
    nodeNames: [
      "任务与数据分片",
      "硬件设备",
      "通信/同步",
      "平台运行",
      "检查点与恢复",
    ],
    sources: [SOURCES.mpi, SOURCES.tensorflow],
    artifact:
      "任务图、分片哈希、设备拓扑、软件/驱动、通信顺序、聚合、种子、检查点、故障注入和恢复对照。",
    opening: "分布式计算页把“多机更快”拆成工作、通信和恢复合同。",
  },
  "iai-14": {
    duty: "覆盖数据膨胀、IoT与分布式AI、脑功能/机器人和创新系统",
    question: "怎样从传感、计算、通信、执行到监测建立IoT智能系统边界？",
    invariant:
      "设备身份、传感单位、时间、通信、模型版本、执行权限和安全更新可追溯",
    fault: "未认证设备上传伪造传感值触发机器人动作，系统无来源和回滚记录",
    scenario: "设计一个传感器—边缘—云—机器人闭环，注入断网、漂移与未认证设备。",
    boundary: "本章展望按2016时间点阅读；现代边缘AI与治理要求单列当前对照。",
    nodeNames: [
      "传感与设备身份",
      "边缘处理",
      "通信与聚合",
      "AI决策/机器人动作",
      "监测更新与回滚",
    ],
    sources: [SOURCES.iot, SOURCES.nistAi],
    artifact:
      "设备清单、身份、单位/时间、数据谱系、边缘/云版本、通信、动作授权、漂移、更新签名和回滚演练。",
    opening:
      "IoT页把数据规模和智能动作落到设备身份与闭环安全，不把联网自动等同智能。",
  },
  finalReview: {
    title: "《图解人工智能》综合复核：从知识状态到可信执行",
    duty: "用一条系统证据链串联67层级与2016历史边界",
    question: "怎样证明14章共同构成可复核系统，而不是互不相关的技术名词？",
    invariant: "观测、知识/状态、推理/学习、动作、通信、监测和恢复闭环",
    fault: "只演示最终输出，没有中间状态、数据来源、反例、分布式故障和回滚",
    scenario:
      "综合构建一个感知、推理、学习、协作和执行的助手，并逐阶段注入失败。",
    boundary:
      "总复习只验收原版67层级和明确的现代核验；新增模型不计入原版覆盖率。",
    nodeNames: [
      "观测与身份",
      "知识/模型状态",
      "推理与学习",
      "协作与执行",
      "监测恢复与时间标签",
    ],
    sources: [
      SOURCES.publisher,
      SOURCES.nistAi,
      SOURCES.rl,
      SOURCES.rdf,
      SOURCES.mpi,
      SOURCES.iot,
    ],
    artifact:
      "67层级矩阵、系统图、数据与知识来源、状态/模型、推理轨迹、动作授权、通信、测试、故障恢复和2016/当前边界。",
    opening:
      "综合复核用同一关联ID贯穿符号、统计和系统证据，拒绝只展示结果的黑箱演示。",
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
      /过去|现在|未来|人工智能$|黎明|发展/,
      [
        "以时间、任务和评测界定AI能力",
        "时间、能力卡、方法、数据、指标与失败",
        "用今天结果改写历史",
      ],
    ],
    [
      /规则系统|知识库|专家系统|推荐引擎/,
      [
        "用事实、规则和冲突策略生成可解释结论",
        "事实出处、规则版本、议程、触发链和结论",
        "循环或冲突规则无确定优先级",
      ],
    ],
    [
      /人工生命|有限自动机|马尔可夫|状态驱动/,
      [
        "由状态和确定/概率转移产生行为",
        "状态表、转移矩阵、概率和、种子与轨迹",
        "隐藏状态或概率不归一",
      ],
    ],
    [
      /线性问题|非线性问题|回归分析|加权回归|相似度/,
      [
        "由特征、相似权重和回归目标预测",
        "尺度、距离、权重、带宽、系数与残差",
        "查询标签参与局部权重选择",
      ],
    ],
    [
      /图论|图谱搜索|最优化|遗传算法|神经网络/,
      [
        "在状态图、群体或参数空间搜索目标",
        "编码、邻接/变异、目标、预算、种子与停止",
        "不同预算比较最好一次",
      ],
    ],
    [
      /概率分布|贝叶斯|MCMC|HMM|贝叶斯网络/,
      [
        "用联合分布、条件独立和推断处理不确定性",
        "图、先验、似然、转移、链、诊断与预测",
        "未收敛样本当后验",
      ],
    ],
    [
      /无监督学习|有监督学习/,
      [
        "按标签可见性和目标区分学习证据",
        "数据角色、预处理、结构/损失、稳定性和测试",
        "全量预处理或标签泄漏",
      ],
    ],
    [
      /集成学习|强化学习|迁移学习|分布式人工智能/,
      [
        "组合模型、交互更新、跨域修正或多主体协调",
        "主体、环境、策略、奖励、域、消息与逐主体指标",
        "共享状态乱序造成伪收益",
      ],
    ],
    [
      /多层神经网络|受限玻尔兹曼机|深度神经网络|卷积神经网络|循环神经网络|深度学习/,
      [
        "以层级表示、梯度或采样学习模型",
        "拓扑、形状、能量/损失、时间状态、梯度/采样和验证",
        "抹平模型的状态差异",
      ],
    ],
    [
      /模式识别|特征提取|图像识别|语音识别/,
      [
        "把传感信号转为特征和识别结果",
        "采样、标注、切分、特征、模型、解码和噪声指标",
        "实体或近重复泄漏",
      ],
    ],
    [
      /句子的结构|知识获取|统计语义|结构分析|文本生成|自然语言处理/,
      [
        "由文本构造句法/语义并受约束生成",
        "语料、切分、结构、检索来源、解码和人工标准",
        "流畅输出替代理解证据",
      ],
    ],
    [
      /数据库|检索|语义网络|语义网|知识表示|数据结构/,
      [
        "用实体、模式、索引和语义图表示查询知识",
        "实体ID、模式、索引、RDF、SPARQL、出处与冲突",
        "同名实体错误合并",
      ],
    ],
    [
      /分布式计算|并行计算|硬件配置|软件配置|机器学习平台|深度学习平台/,
      [
        "以分片、通信、同步和恢复执行计算",
        "任务图、设备、版本、消息顺序、聚合、检查点和恢复",
        "重复更新仍标成功",
      ],
    ],
    [
      /数据膨胀|物联网|脑功能|机器人|创新系统|海量数据/,
      [
        "贯通传感、计算、通信、决策和执行闭环",
        "设备身份、单位/时间、数据谱系、模型、动作授权、更新和回滚",
        "未认证数据触发动作",
      ],
    ],
  ];
  return (
    rules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把原版主题转成可执行AI系统合同",
      "观测、状态、变换、动作、证据与反例",
      "只出现标题而没有执行验收",
    ]
  );
}

function termFor(concept, index) {
  const short = concept
    .replace(/^第\d+章\s*/, "")
    .replace(/^\d{2}\s*/, "")
    .split(/[；;：:——,，]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 18
    ? short
    : `系统坐标${index + 1}`;
}

function enrichProfile(key, specification, role, unit = null) {
  const chapterPath = PATHS[key];
  const concepts = unit
    ? unit.concepts.map((group) => group.join("；"))
    : unitTitles;
  const title = specification.title ?? unit?.title;
  const details = [
    [
      "版本化观测或输入",
      "验证来源、身份和边界",
      "可信输入状态",
      "数据卡、身份与时间",
    ],
    [
      "上游输入与已有事实",
      `构造“${title}”的知识、表示或系统状态`,
      "可查询中间状态",
      "规则、图、模型或参数",
    ],
    [
      "当前状态与候选变换",
      "执行推理、学习、搜索或协调",
      "候选结论或动作",
      "轨迹、概率、梯度或消息",
    ],
    [
      "已验证结论/动作",
      "按权限和容量提交服务或执行",
      "可追踪外部结果",
      "输出、授权与副作用",
    ],
    [
      "结果、日志和反馈",
      "监测偏离并恢复已知状态",
      "验收或拒绝",
      "指标、反例、检查点和回滚",
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
    nodes: specification.nodeNames.map((name, index) => ({
      name,
      state: `${title}：${details[index][0]}`,
      rule: `${details[index][1]}，并保持“${specification.invariant}”`,
      transition: details[index][2],
      evidence: `${details[index][3]}；出现“${specification.fault}”时暂停`,
    })),
    cases: [
      {
        name: "正常案例",
        observation: `${specification.scenario} 使用冻结版本、输入、初态和种子。`,
        expectedAction: `沿“${specification.nodeNames.join(" → ")}”完成可解释动作。`,
        boundary: `必须满足“${specification.invariant}”。`,
      },
      {
        name: "边界反例",
        observation: `${specification.scenario} 其余不变，只注入“${specification.fault}”。`,
        expectedAction: "定位第一处状态或信任偏离并拒绝下游动作。",
        boundary: "失败运行必须保留，撤销故障后用同一输入重放。",
      },
    ],
    normalTrace: [
      `为“${title}”冻结系统版本、输入、身份、初态、权限、容量与随机种子`,
      `执行${specification.nodeNames.slice(0, 2).join("、")}，保存观测、知识或模型状态`,
      `推进${specification.nodeNames.slice(2, 4).join("、")}，记录推理、学习、通信和动作`,
      `在${specification.nodeNames[4]}交付${specification.artifact}`,
    ],
    failureTrace: [
      `“${title}”复用相同系统、输入、身份、初态、权限、容量和种子`,
      `只注入单一故障：${specification.fault}`,
      `沿“${specification.nodeNames.join(" → ")}”定位第一处状态、证据或信任偏离`,
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
if (profiles.length !== 16) throw new Error("课程必须恰好为16页");

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并把2016原版范围与当前核验分层
- 能先预测“${profile.question}”的知识/状态路径，再用观测、变换、动作和反例逐节点复核
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、降级或拒绝系统结论

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个智能系统任务开始

${profile.opening} “${profile.title}”的贯穿任务是：${profile.scenario} 操作前必须写下哪个状态或信任节点会先变化，运行后再补理由不算预测。

本页围绕“${profile.question}”建立正常、故障与恢复路径。只有“${profile.title}”守住“${profile.invariant}”并交付${profile.artifact}，最终输出才构成智能系统证据。

## 书目、67个原版层级与时间边界

[翔泳社官方书页](${SOURCES.publisher})确认多田智史著、石井一夫监修《あたらしい人工知能の教科書》于2016年出版、A5 352页、ISBN 9784798145600，并公开14章结构；[中文版目录与书目](${SOURCES.chinese})用于交叉核对张弥译、人民邮电出版社2021年版及53个编号主题。覆盖分母为14章与53个编号主题，共67个原版目录层级。

“${profile.title}”未取得原书完整正文，只以权威目录限定范围；中文解释、交互、实验、练习与答案均为独立教学重写。${profile.boundary}

本页另以${links}核对机制或标准。技术资料能验证定义、协议或历史事实，不能反向证明原书正文采用了本站表述。`;
}

const patterns = [
  (p, c, m, e, x, i) =>
    `在“${p.title}”的坐标${i + 1}中，目录项「${c}」用于${m}；先冻结输入与初态，再以${e}复核，出现${x}时撤回结论。`,
  (p, c, m, e, x, i) =>
    `目录项「${c}」进入“${p.title}”后要回答第${i + 1}个系统问题：它怎样${m}、改变什么状态、由哪些${e}证明，并如何排除${x}。`,
  (p, c, m, e, x, i) =>
    `围绕“${p.question}”，原版层级${i + 1}把「${c}」解释为${m}；复核者先读取${e}，不能接受${x}。`,
  (p, c, m, e, x, i) =>
    `对“${p.title}”而言，目录项「${c}」的最小合同是${m}，第${i + 1}次检查保存${e}；若产生${x}，就返回上游。`,
  (p, c, m, e, x, i) =>
    `第${i + 1}个正式坐标「${c}」服务于${p.duty}，需要以${e}呈现${m}；${x}会破坏“${p.invariant}”。`,
];

function conceptsSection(profile) {
  return `## 原版目录层级与系统机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept);
    const term = termFor(concept, index);
    const definition = `${term}对应原版目录坐标“${concept}”，在“${profile.title}”中用于${mechanism}，并受输入、状态、版本、权限和时间边界约束。`;
    return `### ${concept}

<Term def=${JSON.stringify(definition)}>${term}</Term>

**原版坐标 ${index + 1}/${profile.concepts.length}。** ${patterns[index % patterns.length](profile, concept, mechanism, evidence, caution, index)}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个章专属实验

<Callout type="info" title="先写出哪个状态会先变化">
  对“${profile.title}”先冻结系统版本、输入、身份、初态、权限、容量和种子，再操作知识状态、执行轨迹和系统门；结果与预测不一致时修改假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 知识与状态路径">
    固定“${profile.scenario}”，在正常和边界案例间切换，逐节点查看“${profile.nodeNames.join("、")}”的状态、规则、转移与证据。

    <${profile.componentBase}KnowledgeStateLab />
  </Step>
  <Step title="2. 正常与单故障执行轨迹">
    保持系统与初态不变，只注入“${profile.fault}”，定位第一个偏离“${profile.invariant}”的节点。

    <${profile.componentBase}ExecutionTraceLab />
  </Step>
  <Step title="3. 智能系统发布门">
    分别锁定输入身份、状态与模型、权限与副作用、复现与时间边界，展开${profile.artifact}后决定是否发布。

    <${profile.componentBase}SystemGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页单一故障：${profile.fault}">
  “${profile.title}”遇到该故障时保持版本、输入、身份、初态、权限、容量和种子不变，沿五节点寻找最早偏离；最终输出偶尔正确不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="演示成功不等于系统证据">
  ${profile.scenario} 在理想输入下成功，只证明一条路径；“${profile.title}”仍需边界、拒绝、恢复与副作用证据。
</Callout>

<Callout type="trap" title="现代热点不能倒填2016原书">
  “${profile.title}”引用现行资料是为了核对机制和迁移；大语言模型、扩散模型与当前治理要求必须单列，不能伪装成原版67层级。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放系统协议

| 节点 | 系统动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.nodeNames
  .map(
    (node, index) =>
      `| ${node} | 在“${profile.title}”执行${node}，只允许声明主体改变状态 | ${index === 0 ? "版本、输入、身份、单位与初态" : index === 4 ? "指标、反例、检查点、恢复与时间标签" : "知识/模型状态、轨迹、消息、权限与动作"} | ${index === 0 ? "输入或身份不可追溯" : index === 4 ? "无法重放或回滚" : profile.fault} |`,
  )
  .join("\n")}

\`\`\`yaml
unit: ${JSON.stringify(profile.id)}
question: ${JSON.stringify(profile.question)}
scenario: ${JSON.stringify(profile.scenario)}
nodes: ${JSON.stringify(profile.nodeNames)}
invariant: ${JSON.stringify(profile.invariant)}
fault: ${JSON.stringify(profile.fault)}
evidence: ${JSON.stringify(profile.artifact)}
reset: restore_case_node_trace_mode_step_gates_and_artifact
\`\`\`

该协议要求“${profile.title}”在相同系统、输入、身份、初态、权限、容量和种子下重放。重置后若案例、节点、轨迹模式、步骤、发布门或证据包没有回到基线，交互状态已经污染比较。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>对应“${concept}”；在“${profile.title}”中用于${mechanism}，需要连接原版范围、系统状态与证据。</GlossaryItem>`;
    })
    .join("\n");
  const list = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. “${profile.title}”的目录项「${concept}」：以“${mechanism}”解释系统作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是记住AI名词，而是能围绕“${profile.question}”重建状态与执行证据，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：系统合同。** “${profile.title}”为什么必须先冻结版本、输入、身份、初态、权限、容量和种子？

<Answer>
  ${profile.scenario} 若这些条件变化，相同输出可能来自不同知识、模型、消息或权限路径；“${profile.title}”先冻结合同，才能把观测连接到单一机制。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明原版目录坐标已经进入机制、交互和练习？

<Answer>
${list}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一系统、输入、身份、初态、权限、容量和种子，重放正常路径后只注入“${profile.fault}”；记录最早偏离，撤销故障再运行。只有知识状态、执行轨迹、系统门和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="多田智史著、石井一夫监修《あたらしい人工知能の教科書》／张弥译《图解人工智能》"
  adaptedUrl="${SOURCES.publisher}"
/>`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    nodes: profile.nodes,
    cases: profile.cases,
    normalTrace: profile.normalTrace,
    failureTrace: profile.failureTrace,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    gates: [
      {
        label: "输入与身份",
        detail: `“${profile.title}”的来源、实体、单位、时间和边界可追溯。`,
      },
      {
        label: "状态与模型",
        detail: `“${profile.title}”的知识、规则、参数、版本和中间状态可复核。`,
      },
      {
        label: "权限与副作用",
        detail: `“${profile.title}”的通信、动作、资源和外部副作用有权限与容量界限。`,
      },
      {
        label: "复现与时间",
        detail: `“${profile.title}”归档环境、种子、失败、恢复和2016/当前标签。`,
      },
    ],
  };
  return `"use client";

import {
  AiSystemEvidenceLab,
  type AiSystemEvidenceModel,
} from "./ai-system-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies AiSystemEvidenceModel;

export function ${profile.componentBase}KnowledgeStateLab() {
  return <AiSystemEvidenceLab model={model} view="knowledge-state" />;
}

export function ${profile.componentBase}ExecutionTraceLab() {
  return <AiSystemEvidenceLab model={model} view="execution-trace" />;
}

export function ${profile.componentBase}SystemGateLab() {
  return <AiSystemEvidenceLab model={model} view="system-gate" />;
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
import { ${profile.componentBase}KnowledgeStateLab, ${profile.componentBase}ExecutionTraceLab, ${profile.componentBase}SystemGateLab } from "@/components/mdx/${BOOK}/v2/${slug}";

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
    description: `${profile.duty}；用知识状态、单故障轨迹和系统发布门完成独立复核。`,
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
  /^\d{2}\s/.test(item),
).length;
const catalogLevels = allConcepts.length;
if (chapterHeadings !== 14 || numberedTopics !== 53 || catalogLevels !== 67) {
  throw new Error(
    `目录口径应为14章+53编号主题=67层级，实际${chapterHeadings}+${numberedTopics}=${catalogLevels}`,
  );
}

manifestDocument.books[BOOK] = {
  ...previousManifest,
  sourceKind:
    "official-original-publisher-complete-fourteen-chapter-outline-cross-checked-with-fifty-three-numbered-topic-chinese-toc-and-primary-standards-research",
  sourceUrl: SOURCES.publisher,
  secondarySourceUrls: [SOURCES.chinese, ...Object.values(SOURCES).slice(2)],
  status: "verified-outline",
  verifiedAt: "2026-07-30",
  disclosureNote:
    "翔泳社官方页面确认多田智史著、石井一夫监修、2016年A5 352页原版、ISBN 9784798145600及14章结构；中文版目录和书目用于交叉核对张弥译、人民邮电出版社2021年版及53个编号主题。覆盖分母为14章和53个编号主题，共67个原版目录层级。课程按14章逐一覆盖，另设学习地图与综合复核，共16页、48个章专属交互。未取得原书完整正文，全部解释、实验、交互、练习与答案均为独立教学重写。规则系统、自动机、加权回归、概率建模、知识表示、分布式计算与IoT完整恢复；LLM、扩散模型和当前治理只作带日期的现代对照。",
  units: previousManifest.units.map((unit) => ({
    ...unit,
    chapterPath: PATHS[unit.id],
  })),
  metrics: {
    formalUnits: chapterHeadings,
    numberedTopics,
    formalNodes: catalogLevels,
    coursePages: profiles.length,
    interactiveViews: profiles.length * 3,
    reviewQuestions: profiles.length * 3,
  },
  sourceAccess: "outline-only",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/illustrated-ai-v2-profiles.json",
  factSourcePolicy:
    "翔泳社与中文版目录只限定14章、53编号主题和2016语境；AI历史、HMM、回归、遗传算法、MCMC、统计学习、强化/多智能体、深度学习、模式识别、NLP、RDF/SPARQL、MPI/TensorFlow与IoT分别以原始论文、官方标准或权威资料核对。现代资料不得反写原版。",
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
      officialNumberedTopics: numberedTopics,
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
  `已重建 ${profiles.length} 页，覆盖${chapterHeadings}章+${numberedTopics}编号主题=${catalogLevels}个原版层级，生成 ${profiles.length * 3} 个交互视图。`,
);
