import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "deep-learning-rl-from-scratch";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/deep-learning-rl-from-scratch/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/deep-learning-rl-from-scratch-v2-profiles.json",
);

const SOURCES = {
  original: "https://www.oreilly.co.jp/books/9784873119755/",
  chinese:
    "https://www.oreilly.com/library/view/shen-du-xue-xi-ru-men-4-qiang-hua-xue-xi/9787115649171/",
  repository: "https://github.com/oreilly-japan/deep-learning-from-scratch-4",
  errata:
    "https://github.com/oreilly-japan/deep-learning-from-scratch-4/wiki/errata",
  suttonBarto: "http://incompleteideas.net/book/the-book-2nd.html",
  gymnasium: "https://gymnasium.farama.org/",
  numpy: "https://numpy.org/doc/stable/user/",
  dezero: "https://github.com/oreilly-japan/deep-learning-from-scratch-3",
  dqn: "https://doi.org/10.1038/nature14236",
  doubleDqn: "https://arxiv.org/abs/1509.06461",
  prioritizedReplay: "https://arxiv.org/abs/1511.05952",
  duelingDqn: "https://arxiv.org/abs/1511.06581",
  policyGradient:
    "https://proceedings.neurips.cc/paper_files/paper/1999/hash/464d828b85b0bed98e80ade0a5c43b0f-Abstract.html",
  a3c: "https://proceedings.mlr.press/v48/mniha16.html",
  ddpg: "https://arxiv.org/abs/1509.02971",
  ppo: "https://arxiv.org/abs/1707.06347",
  distributional: "https://proceedings.mlr.press/v70/bellemare17a.html",
  rainbow: "https://arxiv.org/abs/1710.02298",
};

const PATHS = {
  learningMap: "00-guide/dlr-official-learning-map",
  "dlr-01": "01-bandit/dlr-01-bandit",
  "dlr-02": "02-mdp/dlr-02-mdp",
  "dlr-03": "03-bellman/dlr-03-bellman",
  "dlr-04": "04-dynamic-programming/dlr-04-dynamic-programming",
  "dlr-05": "05-monte-carlo/dlr-05-monte-carlo",
  "dlr-06": "06-td/dlr-06-td",
  "dlr-07": "07-neural-q-learning/dlr-07-neural-q-learning",
  "dlr-08": "08-dqn/dlr-08-dqn",
  "dlr-09": "09-policy-gradient/dlr-09-policy-gradient",
  "dlr-10": "10-further/dlr-10-further",
  "dlr-app-a": "11-appendices/dlr-appendix-a-off-policy-mc",
  "dlr-app-b": "11-appendices/dlr-appendix-b-n-step-td",
  "dlr-app-c": "11-appendices/dlr-appendix-c-double-dqn",
  "dlr-app-d": "11-appendices/dlr-appendix-d-policy-gradient-proof",
  finalReview: "12-review/dlr-official-final-review",
};

const DISPLAY_TITLES = {
  "dlr-01": "第1章 多臂老虎机问题",
  "dlr-02": "第2章 马尔可夫决策过程",
  "dlr-03": "第3章 贝尔曼方程",
  "dlr-04": "第4章 动态规划法",
  "dlr-05": "第5章 蒙特卡罗法",
  "dlr-06": "第6章 时序差分（TD）法",
  "dlr-07": "第7章 神经网络与Q学习",
  "dlr-08": "第8章 DQN",
  "dlr-09": "第9章 策略梯度法",
  "dlr-10": "第10章 走向更深的强化学习",
  "dlr-app-a": "附录A 离策略蒙特卡罗法",
  "dlr-app-b": "附录B n步TD法",
  "dlr-app-c": "附录C Double DQN的理解",
  "dlr-app-d": "附录D 策略梯度法的证明",
};

const STAGE_SPECS = {
  "dlr-01": {
    duty: "用多臂老虎机隔离探索与利用，并比较样本平均与常数步长估计",
    question:
      "怎样证明某个动作被选中是策略与价值估计共同作用的结果，而不是一次幸运奖励？",
    invariant: "动作计数、奖励样本、估计值、探索随机数与非稳态更新时间顺序一致",
    fault: "比较两个策略时复用不同的老虎机真值或随机奖励序列",
    stageNames: ["冻结老虎机", "选择动作", "采样奖励", "更新估计", "多次复验"],
    source: SOURCES.suttonBarto,
    opening:
      "本章先把状态固定为一个决策点，使探索、利用、奖励噪声与价值更新可以逐项观察。",
  },
  "dlr-02": {
    duty: "把智能体和环境写成状态、动作、转移、奖励、策略与折扣收益合同",
    question:
      "怎样证明一个问题满足所声明的MDP边界，并让每个价值量都能回到明确的轨迹分布？",
    invariant:
      "状态包含决策所需信息，转移与奖励只读取允许变量，策略和收益下标一致",
    fault: "把影响下一状态的隐藏历史排除在状态之外，却仍声称满足马尔可夫性",
    stageNames: ["定义状态", "选择动作", "执行转移", "累计收益", "核对策略"],
    source: SOURCES.suttonBarto,
    opening:
      "本章把强化学习的对象边界形式化，重点不是背诵符号，而是说明每个随机变量由谁产生。",
  },
  "dlr-03": {
    duty: "从一步收益递归推导状态价值、动作价值与贝尔曼最优方程",
    question:
      "怎样让期望、转移概率、策略概率和下一状态价值落在同一份贝尔曼备份账本中？",
    invariant:
      "当前奖励、折扣、下一状态分布、策略权重与价值函数定义使用同一MDP",
    fault: "在同一次备份中混用行为策略概率和最优动作的最大值",
    stageNames: ["冻结MDP", "展开一步", "加权后继", "完成备份", "检查残差"],
    source: SOURCES.suttonBarto,
    opening:
      "本章把长期收益拆成即时奖励与剩余收益，要求每个期望项都能追到具体后继状态。",
  },
  "dlr-04": {
    duty: "在已知环境模型下实现迭代策略评估、策略改善、策略迭代与价值迭代",
    question:
      "怎样区分一次状态扫描、一次完整评估和一次策略改善，并用停止条件证明算法结束？",
    invariant: "转移模型、扫描方式、旧新价值快照、贪心改善与收敛容差保持一致",
    fault: "异步更新与同步更新混用，却把两次扫描的中间值直接逐项比较",
    stageNames: ["加载模型", "扫描状态", "计算备份", "改善策略", "判断收敛"],
    source: SOURCES.repository,
    opening:
      "本章把贝尔曼等式变成反复扫状态的程序，并把策略评估与策略改善分成两个可检查阶段。",
  },
  "dlr-05": {
    duty: "用完整回合样本估计价值，并复核同策略控制、离策略评价与重要性采样",
    question:
      "怎样从一条完整轨迹反向计算收益，同时证明采样策略、目标策略和权重没有被混淆？",
    invariant:
      "回合边界、奖励下标、首次或每次访问口径、策略概率与重要性权重一致",
    fault: "用目标策略生成的概率当作行为策略概率计算重要性权重",
    stageNames: ["采样回合", "反向算收益", "累计估计", "改善策略", "检查权重"],
    source: SOURCES.suttonBarto,
    opening:
      "本章不读取转移分布，而是从完整回合的实际奖励构造价值证据，因此轨迹身份和概率尤其重要。",
  },
  "dlr-06": {
    duty: "比较MC与TD目标，并实现SARSA、离策略SARSA和Q学习的单步更新",
    question:
      "怎样从一个转移五元组分清实际下一动作、贪心目标动作与终止状态的自举边界？",
    invariant: "旧值、奖励、终止标记、下一动作来源、目标动作集合与更新单元一致",
    fault: "终止转移仍把下一状态价值加入TD目标",
    stageNames: [
      "记录转移",
      "选择目标动作",
      "构造TD目标",
      "更新一个值",
      "对照算法",
    ],
    source: SOURCES.suttonBarto,
    opening:
      "本章允许每一步就更新价值，但这种及时性只有在目标动作与终止语义明确时才成立。",
  },
  "dlr-07": {
    duty: "复核DeZero、回归、神经网络和用函数近似表示Q值的训练接口",
    question:
      "怎样证明网络只替代表格的表示方式，并让张量shape、梯度与TD目标逐项对齐？",
    invariant:
      "状态编码、动作输出次序、网络参数、目标向量、损失与优化器更新一致",
    fault: "用一个动作的TD目标覆盖网络全部动作输出",
    stageNames: ["编码状态", "前向预测", "构造目标", "反向更新", "核对输出"],
    source: SOURCES.dezero,
    opening:
      "本章先复核神经网络训练，再把Q函数交给参数模型；环境和强化学习目标并不会因此改变。",
  },
  "dlr-08": {
    duty: "用经验回放与目标网络稳定DQN，并核对Atari预处理和三类扩展",
    question:
      "怎样证明经验回放、在线网络和目标网络各自读取正确快照，而不是只看到奖励曲线上升？",
    invariant:
      "环境API、转移缓冲区、采样索引、在线/目标参数版本、终止掩码与评估模式一致",
    fault: "计算目标值时误用正在更新的在线网络同时选动作和评动作",
    stageNames: ["采集转移", "写入回放", "抽取批次", "计算目标", "冻结评估"],
    source: SOURCES.dqn,
    opening:
      "本章进入深度Q网络，重点是把相关样本与移动目标拆开，并保存每次目标计算所用的参数版本。",
  },
  "dlr-09": {
    duty: "从轨迹概率推导策略梯度，并比较REINFORCE、基线与Actor-Critic",
    question:
      "怎样证明动作对数概率、回报或优势和梯度来自同一条轨迹，而基线没有改变期望目标？",
    invariant:
      "采样策略版本、动作概率、回报时间范围、基线输入、梯度符号与更新批次一致",
    fault: "用更新后的策略概率回算旧轨迹的对数概率，却不做离策略修正",
    stageNames: ["采样策略", "生成轨迹", "计算回报", "形成梯度", "更新评价"],
    source: SOURCES.policyGradient,
    opening:
      "本章直接参数化策略，要求每个梯度项都能回到生成该动作的策略版本和对应回报。",
  },
  "dlr-10": {
    duty: "按价值/策略、同策略/离策略和离散/连续动作坐标整理进阶算法与案例",
    question:
      "怎样比较进阶算法而不混淆环境、训练预算、安全约束、观测接口和论文时代？",
    invariant:
      "算法分类、基线实现、环境版本、样本预算、随机种子、指标与部署边界一致",
    fault: "只摘录不同论文的最高分，忽略环境版本、帧数、随机种子和安全约束",
    stageNames: ["定义坐标", "选择基线", "统一预算", "复现实验", "标注边界"],
    source: SOURCES.rainbow,
    opening:
      "本章是路线图而不是排行榜；每个后续算法都要回到目标、数据来源和评估合同再比较。",
  },
  "dlr-app-a": {
    duty: "从行为策略与目标策略的轨迹概率比推导并实现离策略蒙特卡罗法",
    question:
      "怎样逐步累计重要性权重，并在行为策略不给目标动作概率时立即拒绝估计？",
    invariant: "目标/行为策略身份、动作概率、回报、权重乘积和截断条件一致",
    fault: "行为策略对目标策略可能选择的动作给出零概率",
    stageNames: [
      "冻结双策略",
      "采样轨迹",
      "反向算回报",
      "累计权重",
      "检查支持集",
    ],
    source: SOURCES.suttonBarto,
    opening:
      "本附录把采样策略与被评价策略分开，所有结论都依赖概率比和支持集条件。",
  },
  "dlr-app-b": {
    duty: "用n步收益连接一步TD与完整回合蒙特卡罗，并复核自举长度",
    question:
      "怎样在回合末端正确截短n步窗口，并区分已观测奖励与最后一个自举价值？",
    invariant: "时间索引、窗口长度、奖励范围、终止位置、自举状态与折扣次幂一致",
    fault: "回合已经终止仍从窗口末端状态继续自举",
    stageNames: ["选择窗口", "收集奖励", "处理终止", "加入自举", "更新价值"],
    source: SOURCES.suttonBarto,
    opening:
      "本附录改变的是目标向前看的步数，不改变奖励时间顺序或终止后的零未来价值。",
  },
  "dlr-app-c": {
    duty: "解释max算子的过大估计，并分离Double DQN的动作选择与动作评价",
    question:
      "怎样用同一批带噪估计证明过大估计来自选择偏差，并核对两套网络的职责？",
    invariant:
      "噪声样本、在线网络选动作、目标网络评动作、参数快照与终止掩码一致",
    fault: "用目标网络同时选择和评价动作，退化回普通DQN目标",
    stageNames: [
      "生成噪声估计",
      "在线选择",
      "目标评价",
      "构造目标",
      "比较偏差",
    ],
    source: SOURCES.doubleDqn,
    opening:
      "本附录不把Double DQN写成两个独立智能体，而是检查动作选择与价值评价的职责分离。",
  },
  "dlr-app-d": {
    duty: "从轨迹期望与对数导数技巧推导策略梯度，并证明状态基线项期望为零",
    question:
      "怎样让每一步代数变换都对应归一化策略、轨迹概率和可计算的样本估计？",
    invariant:
      "轨迹分布、对数概率、回报定义、梯度交换条件与基线对动作的独立性一致",
    fault: "让基线依赖当前动作，却仍沿用零期望证明",
    stageNames: [
      "展开期望",
      "分解轨迹",
      "应用对数导数",
      "消去环境项",
      "加入基线",
    ],
    source: SOURCES.policyGradient,
    opening:
      "本附录把算法背后的概率恒等式写成逐步证明，尤其标清环境项为何不需求导。",
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

function conceptStrings(unit) {
  return unit.concepts.map((group) => group.join("；"));
}

function bookCoordinateSummary() {
  return previousManifest.units.map((unit) => conceptStrings(unit)[0]);
}

const MAP_SPEC = {
  title: "《深度学习入门4：强化学习》205个原版目录坐标学习地图",
  duty: "沿多臂老虎机、MDP、贝尔曼递归、无模型控制、DQN与策略梯度恢复全书学习链",
  question:
    "怎样把205个原版目录坐标组织成从环境合同、转移样本到冻结评估的可复核路径？",
  invariant:
    "10个章标题、57个一级节、128个二级节、4个附录标题和6个附录节逐项落位",
  fault: "按当前热点重排原版，跳过表格方法而直接把DQN奖励曲线当作全书结论",
  stageNames: ["目录定位", "冻结环境", "采集转移", "复核更新", "独立评估"],
  source: SOURCES.original,
  opening:
    "学习地图保持原书从老虎机到策略梯度的顺序，先建立可计算的状态和价值合同，再进入函数近似。",
  boundary:
    "原版出版于2022年，中文授权版书目为2024年；Gymnasium迁移、后续算法和依赖兼容修正只作带时间标签的扩展。",
};

const REVIEW_SPEC = {
  title: "《深度学习入门4：强化学习》环境—更新—评估总复习",
  duty: "综合复核10章、4个附录与205个目录坐标，交付可重放的强化学习实验档案",
  question:
    "怎样从同一份轨迹与快照定位状态泄漏、终止自举、目标网络混用或评估仍在学习？",
  invariant:
    "每项结论都能回到环境版本、转移五元组、收益或目标、参数更新、随机性与冻结评估",
  fault: "只保存最终平均奖励，删除首个分岔和失败种子",
  stageNames: ["锁定任务", "重放表格法", "重放深度法", "注入故障", "封存评估"],
  source: SOURCES.errata,
  opening:
    "总复习用同一小型环境串联动态规划、蒙特卡罗、TD、Q学习、DQN和Actor-Critic，不以最终分数替代中间证据。",
  boundary:
    "综合实验以2022年原版、官方代码和勘误为基线；2024年中文授权书目与当前环境API变更分开记录。",
};

function enrichProfile(key, specification, role, unit = null) {
  const chapterPath = PATHS[key];
  if (!chapterPath) throw new Error(`缺少路径：${key}`);
  if (!specification) throw new Error(`缺少页面规格：${key}`);
  const title = specification.title ?? DISPLAY_TITLES[unit.id] ?? unit.title;
  const concepts = unit ? conceptStrings(unit) : bookCoordinateSummary();
  const boundary =
    specification.boundary ??
    `“${title}”以2022年日文原版与2024年中文授权版目录为内容边界；当前环境API、后续论文与兼容修正只作带时间标签的独立核验。`;
  const stageDetails = [
    [
      "环境版本、状态/动作空间、奖励、终止语义、初始分布、策略与随机种子",
      "冻结本页问题所需的任务快照，不运行训练或评估",
      "可哈希的环境与策略前置状态",
      "环境配置、空间定义、种子、参数版本与允许读取的信息",
    ],
    [
      "冻结的任务快照、当前状态、合法动作与策略概率",
      "只执行一次已声明的动作选择或环境转移",
      "状态、动作、奖励、下一状态和终止标记",
      "转移五元组、动作来源、策略版本和随机数位置",
    ],
    [
      "冻结的转移、旧价值或旧策略参数以及算法专属快照",
      "计算回报、贝尔曼备份、TD目标、优势或训练标签",
      "不写参数的目标值与中间分量",
      "奖励范围、折扣次幂、自举值、终止掩码和手算对照",
    ],
    [
      "目标值、旧参数、学习率、优化器状态与合法更新集合",
      "只写本页算法允许改变的价值、策略或网络参数",
      "新价值或新参数以及首个真实状态差异",
      "更新前后快照、TD误差或梯度、写集合与数值容差",
    ],
    [
      "冻结后的策略/价值、独立初始状态、评估种子与预算",
      "关闭探索和学习后重放，并与基线及单故障运行比较",
      "不可写入参数的评估轨迹、指标分布与反例",
      "评估前后哈希、逐种子结果、失败轨迹和历史边界",
    ],
  ];
  const artifact =
    specification.artifact ??
    `${title}的环境快照、转移五元组、收益/目标手算、更新前后状态、随机性记录、失败复现与冻结评估报告`;
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
    invariant: `${specification.invariant}；${title}的结论不得越过原版目录、实验数据和评估边界`,
    fault: `${specification.fault}；在${title}验收中只注入这一处`,
    stageNames: specification.stageNames,
    opening: specification.opening,
    boundary,
    artifact,
    scenario: `为“${title}”冻结环境、状态/动作语义、奖励、终止规则、策略版本、训练预算和随机种子，再对照参考路径与单故障路径。`,
    sources: [SOURCES.original, SOURCES.repository, specification.source],
    stages: specification.stageNames.map((name, index) => ({
      name,
      input: `${title}在“${name}”读取${stageDetails[index][0]}。`,
      transition: `${title}在“${name}”阶段${stageDetails[index][1]}。`,
      output: `${title}在“${name}”阶段产出${stageDetails[index][2]}。`,
      evidence: `${title}在“${name}”阶段保存${stageDetails[index][3]}。`,
    })),
    cases: [
      {
        name: "参考基线",
        setup: `${title}使用冻结环境、固定策略版本、固定预算和种子，不启用故障。`,
        prediction: `${title}应沿“${specification.stageNames.join(" → ")}”得到可重放的转移、目标、更新与评估轨迹。`,
        boundary: `${title}的参考运行只证明声明环境与预算内的机制，不外推到未测任务。`,
      },
      {
        name: "单一故障",
        setup: `${title}复用参考快照，只启用“${specification.fault}”。`,
        prediction: `${title}应在最终奖励变化前定位首个转移、目标、参数或评估哈希分岔。`,
        boundary: `${title}若同时更换环境、种子或预算，就不能把差异归因于该故障。`,
      },
      {
        name: "边界探针",
        setup: `${title}保持算法不变，只选择一个原版范围外或支持条件失效的输入。`,
        prediction: `${title}应拒绝强结论并指出缺失的状态、概率、支持集或历史标签。`,
        boundary: `${title}的边界探针用于收窄结论，不能伪装成原版正文或官方实验。`,
      },
    ],
    referenceTrace: [
      `为“${title}”锁定环境、空间定义、奖励/终止语义、初值、策略版本、预算和随机种子。`,
      `在“${title}”记录转移五元组，并手算本页算法使用的收益、目标或优势。`,
      `沿“${specification.stageNames.join(" → ")}”保存更新前后价值、参数、缓存与随机数位置。`,
      `冻结“${title}”的探索和学习，归档${artifact}。`,
    ],
    faultTrace: [
      `“${title}”复用完全相同的环境、初值、策略版本、预算与随机序列。`,
      `“${title}”只改变一个条件：${specification.fault}。`,
      `沿“${specification.stageNames.join(" → ")}”定位最早的转移、目标、更新或评估分岔。`,
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
      unit.id.startsWith("dlr-app-") ? "appendix" : "chapter",
      unit,
    ),
  ),
  enrichProfile("finalReview", REVIEW_SPEC, "final-review"),
];
if (profiles.length !== 16) throw new Error("课程必须恰好为16页");

function mechanismFor(concept) {
  const rules = [
    [
      /第\d+章|附录[A-D]|小结/,
      [
        "声明本章在环境—转移—目标—更新—评估链中的职责与边界",
        "原版坐标、输入对象、核心状态、下游接口、反例和时间边界",
        "只罗列算法名或用当前热点重排原版",
      ],
    ],
    [
      /老虎机|监督学习|无监督学习|探索|利用|平均|非稳态|价值的估计/,
      [
        "在固定动作集合中平衡探索与利用，并从奖励样本更新动作价值",
        "老虎机真值、动作计数、奖励样本、估计值、探索随机数与遗憾",
        "用单次幸运奖励判断策略优劣或在比较中更换奖励序列",
      ],
    ],
    [
      /MDP|马尔可夫|状态转移|奖励函数|智能体|策略|回合制|连续性|收益|最优策略/,
      [
        "把智能体和环境的交互定义为带概率与终止语义的决策过程",
        "状态、合法动作、转移分布、奖励、策略概率、折扣、终止和轨迹",
        "状态遗漏历史信息或把即时奖励误作长期收益",
      ],
    ],
    [
      /贝尔曼|状态价值|动作价值|Q函数|回溯线图|期望值/,
      [
        "用一步递归把当前奖励与后继价值组合为一致的价值等式",
        "转移概率、策略概率、即时奖励、折扣、后继价值、最大值与残差",
        "在同一备份中混用不同策略、不同MDP或错误的最大化位置",
      ],
    ],
    [
      /动态规划|策略评估|策略迭代|价值迭代|GridWorld|defaultdict|策略的改善|改善策略/,
      [
        "在已知环境模型上反复执行价值备份和贪心策略改善",
        "模型表、扫描次序、旧新价值、策略概率、变化量、容差与停止轮次",
        "混用同步与异步更新或未完成评估就声称策略迭代收敛",
      ],
    ],
    [
      /蒙特卡罗|骰子|分布模型|样本模型|step方法|重要性采样|同策略|异策略|方差/,
      [
        "从完整样本回合计算收益，并在目标策略与行为策略间校正分布",
        "轨迹、访问口径、反向收益、动作概率、重要性权重、估计累计量与方差",
        "概率身份颠倒、支持集缺失或把高方差样本当作确定结论",
      ],
    ],
    [
      /TD|SARSA|Q学习|时间差分|样本模型版/,
      [
        "以一步或多步奖励和自举价值构造可在线更新的目标",
        "转移五元组、旧值、下一动作来源、终止掩码、TD目标、误差与新值",
        "终止后继续自举或把SARSA的实际动作替换为Q学习的贪心动作",
      ],
    ],
    [
      /DeZero|数组|张量|最优化|线性回归|神经网络|激活函数|优化器|预处理|表示Q函数/,
      [
        "用参数模型近似状态动作价值，并让前向、目标、损失与反向更新对齐",
        "状态编码、张量shape、动作输出次序、目标向量、损失、梯度与参数版本",
        "用一个动作目标覆盖全部输出或让评估继续更新网络",
      ],
    ],
    [
      /Gym|DQN|Experience Replay|经验回放|Target Network|目标网络|Atari|CNN|Double|优先级|Dueling/,
      [
        "以回放缓冲区和目标网络稳定深度Q学习，并记录在线与目标职责",
        "环境API、转移缓冲区、采样索引、在线/目标快照、终止掩码、损失与同步点",
        "目标计算读取错误网络、回放污染或把旧Gym接口当作当前规范",
      ],
    ],
    [
      /策略梯度|REINFORCE|基线|Actor-Critic|基于策略/,
      [
        "直接优化策略参数，并用回报、基线或Critic构造梯度权重",
        "采样策略版本、动作概率、对数概率、回报、优势、基线、梯度与更新批次",
        "用新策略概率解释旧轨迹或让动作相关基线破坏零期望条件",
      ],
    ],
    [
      /A3C|A2C|DDPG|TRPO|PPO|分类DQN|Noisy|Rainbow|案例|棋盘|机器人|NAS|实际系统|通用人工智能/,
      [
        "按数据来源、目标类型、动作空间和约束比较后续算法及应用",
        "原论文任务、环境版本、样本预算、种子、基线、指标、安全约束与发布时间",
        "跨论文摘录最高分或把2022年之后结果倒填为原版结论",
      ],
    ],
    [
      /n-step|n步|过大估计|证明|推导/,
      [
        "展开算法的多步目标、选择偏差或概率恒等式并逐项核对前提",
        "时间索引、奖励范围、自举点、网络职责、轨迹概率、基线条件与代数步骤",
        "终止后继续自举、职责未分离或省略使等式成立的支持条件",
      ],
    ],
  ];
  return (
    rules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把目录坐标转成有环境、转移、目标、更新和评估证据的实验合同",
      "原版范围、输入输出、状态、动作、奖励、目标、参数、随机性与反例",
      "只复述术语或只展示最终平均奖励",
    ]
  );
}

function termFor(concept, index) {
  const short = concept
    .replace(/^第\s*\d+章\s*/, "")
    .replace(/^\d+(?:\.\d+)*\s+/, "")
    .replace(/^附录\s*[A-D]\s*/, "")
    .split(/[；;：:——,，]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 24
    ? short
    : `强化学习坐标${index + 1}`;
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

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并区分2022年原版、2024年中文授权版与当前扩展
- 能先预测“${profile.question}”会改变哪一条转移、收益/目标、价值、梯度或策略概率，再逐步复核
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、回退或拒绝强化学习结论

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个强化学习问题开始

${profile.opening} “${profile.title}”的贯穿任务是：${profile.scenario} 动手前先写下哪个状态、动作、奖励、收益/目标、价值、梯度、策略概率或评估哈希会先变化；运行后补理由不算预测。

围绕“${profile.question}”，“${profile.title}”建立参考、故障与恢复路径。只有“${profile.title}”守住“${profile.invariant}”并交付${profile.artifact}，奖励曲线或成功轨迹才构成机制证据。

## 书目、205个原版层级与版本边界

“${profile.title}”以[O’Reilly Japan原版官方书页](${SOURCES.original})核对斋藤康毅著《ゼロから作るDeep Learning ❹ ―強化学習編》于2022年4月6日出版、376页、ISBN 9784873119755。“${profile.title}”采用出版社同页给出的10章与附录A至D作为完整目录边界；本站逐项统计10个章标题、57个一级节、128个二级节、4个附录标题和6个附录节，共205个正式目录层级。“${profile.title}”再以[出版社官方代码仓库](${SOURCES.repository})核对实现目录，以[官方勘误](${SOURCES.errata})识别已知错误。

“${profile.title}”没有使用未获授权的原书完整正文，只以出版社完整目录、官方代码和勘误限定范围；中文解释、数值、交互、练习与答案均为独立教学重写。“${profile.title}”的[中文授权书目页](${SOURCES.chinese})仅用于核对《深度学习入门4：强化学习》、人民邮电出版社2024年8月、333页和ISBN 9787115649171，不用来证明日文原版正文。${profile.boundary}

“${profile.title}”另以${links}核对算法定义、实现语义或实验边界；这些资料能验证本页技术事实，不能反向证明原书采用了本站表述。`;
}

const patterns = [
  (p, c, m, e, x, i) =>
    `在“${p.title}”的坐标${i + 1}中，目录项「${c}」用于${m}；先冻结环境、策略与随机性，再以${e}复核，出现${x}时撤回结论。`,
  (p, c, m, e, x, i) =>
    `目录项「${c}」进入“${p.title}”后要回答第${i + 1}个机制问题：它怎样${m}、改变哪个真实状态、由哪些${e}证明，并如何排除${x}。`,
  (p, c, m, e, x, i) =>
    `围绕“${p.question}”，“${p.title}”在原版层级${i + 1}把「${c}」落实为${m}；复核者先读取${e}，不能接受${x}。`,
  (p, c, m, e, x, i) =>
    `对“${p.title}”而言，目录项「${c}」的最小强化学习合同是${m}，第${i + 1}次检查保存${e}；若产生${x}，就返回同一环境与参数快照。`,
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
    const definition = `${term}对应原版目录坐标“${visibleConcept}”，在“${profile.title}”中用于${mechanism}，并受环境、状态/动作、奖励、策略、随机性、训练预算、评估协议与版本边界约束。`;
    return `### ${concept}

<Term def=${JSON.stringify(definition)}>${term}</Term>

**原版坐标 ${index + 1}/${profile.concepts.length}。** ${patterns[index % patterns.length](profile, visibleConcept, mechanism, evidence, caution, index)}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个章节专属强化学习实验

<Callout type="info" title="先写出哪个真实状态会最先变化">
  对“${profile.title}”先冻结环境、状态/动作语义、奖励、终止规则、策略版本、训练预算和种子，再操作转移账本、收益更新轨迹和冻结评估门；结果与预测不一致时修改假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 状态—动作—奖励转移账本">
    固定“${profile.scenario}”，在参考、单故障和边界探针间切换，逐阶段查看“${profile.stageNames.join("、")}”的输入对象、唯一动作、输出状态和必留证据。

    <${profile.componentBase}TransitionLedgerLab />
  </Step>
  <Step title="2. 收益、目标与参数更新轨迹">
    保持环境、初值、策略版本、预算和随机序列不变，只注入“${profile.fault}”，定位第一处偏离“${profile.invariant}”的转移、收益/目标、价值、梯度或策略概率。

    <${profile.componentBase}ReturnUpdateTraceLab />
  </Step>
  <Step title="3. 冻结策略与独立评估验收门">
    分别锁定环境/状态、策略/参数、随机性/预算和评估证据，展开${profile.artifact}后决定是否接受本章结论。

    <${profile.componentBase}EvaluationGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页单一故障：${profile.fault}">
  “${profile.title}”遇到该故障时保持其余环境、初值、策略版本、训练预算和随机序列不变，沿五阶段寻找最早偏离；最终平均奖励看似合理不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="奖励上升不等于更新语义正确">
  “${profile.title}”的成功轨迹只说明当前样本得到了奖励；仍需转移五元组、收益/目标手算、参数快照、随机性记录、失败种子与冻结评估。
</Callout>

<Callout type="trap" title="当前生态不能冒充2022年原版">
  “${profile.title}”引用现行文档是为了核对技术语义；Gymnasium迁移、后续论文和兼容修正必须单列时间标签，不能倒填2022年日文原版或2024年中文授权版。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放实现协议

| 阶段 | 允许动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stageNames
  .map(
    (stage, index) =>
      `| ${stage} | 在“${profile.title}”执行${stage}，只改变声明的环境、转移、目标、价值、参数或评估状态 | ${index === 0 ? "环境/空间定义、奖励/终止语义、策略版本、初值与种子" : index === 4 ? "冻结评估、逐种子分布、反例、2022/当前边界与参数哈希" : "转移五元组、旧值、收益/目标分量、梯度或策略概率与新值"} | ${index === 0 ? "任务或随机性不可追溯" : index === 4 ? "评估仍写参数或无法重放" : profile.fault} |`,
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
reset: restore_environment_policy_parameters_rng_trace_gates_and_artifact
\`\`\`

该协议要求“${profile.title}”在相同环境、状态/动作语义、奖励、终止规则、策略版本、初值、预算和随机序列下重放。重置“${profile.title}”后若案例、阶段、轨迹模式、步骤、验收门或证据包没有回到基线，交互状态已经污染比较。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>检索键 dlr-${alphaCode(index)} 对应目录坐标「${proseConcept(concept)}」；在“${profile.title}”中用于${mechanism}，需要连接原版范围、环境快照、转移、目标/更新和冻结评估证据。</GlossaryItem>`;
    })
    .join("\n");
  const coverageList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. “${profile.title}”的目录项「${proseConcept(concept)}」：以“${mechanism}”解释实现作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是背诵算法名或最终奖励，而是能围绕“${profile.question}”重建环境、转移、收益/目标、价值或策略更新、随机性与冻结评估证据，并用“${profile.invariant}”拒绝“${profile.fault}”。“${profile.title}”最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：强化学习实验合同。** “${profile.title}”为什么必须先冻结环境、空间语义、奖励、终止规则、策略版本、初值、预算和随机种子？

<Answer>
  “${profile.title}”若改变这些条件，相同奖励可能来自不同转移、目标、参数或采样分布；先冻结合同，才能把观测连接到单一强化学习机制。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明“${profile.title}”的原版目录坐标已经进入机制、交互和练习？

<Answer>
${coverageList}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.title}”中的“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一环境、空间语义、奖励、终止规则、策略版本、初值、预算和随机序列，重放参考路径后只注入故障；记录最早偏离，撤销故障再运行。只有转移账本、收益更新轨迹、冻结评估门和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-plus-official-code-and-errata"
  workTitle="斋藤康毅著《ゼロから作るDeep Learning ❹ ―強化学習編》"
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
        label: "环境、空间与终止语义",
        detail: `“${profile.title}”的环境版本、观测/状态、合法动作、奖励、终止与截断语义可追溯。`,
      },
      {
        label: "策略、价值与参数快照",
        detail: `“${profile.title}”的行为/目标策略身份、价值或网络参数、优化器与同步点已经冻结。`,
      },
      {
        label: "随机性、数据与训练预算",
        detail: `“${profile.title}”的初始分布、转移/回放数据、种子、随机数位置、步数与更新预算可重放。`,
      },
      {
        label: "独立评估与历史边界",
        detail: `“${profile.title}”关闭探索和学习，归档逐种子结果、失败轨迹、参数哈希与2022/当前标签。`,
      },
    ],
  };
  return `"use client";

import {
  RlEvidenceLab,
  type RlEvidenceModel,
} from "./rl-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies RlEvidenceModel;

export function ${profile.componentBase}TransitionLedgerLab() {
  return <RlEvidenceLab model={model} view="transition-ledger" />;
}

export function ${profile.componentBase}ReturnUpdateTraceLab() {
  return <RlEvidenceLab model={model} view="return-update-trace" />;
}

export function ${profile.componentBase}EvaluationGateLab() {
  return <RlEvidenceLab model={model} view="evaluation-gate" />;
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
import { ${profile.componentBase}TransitionLedgerLab, ${profile.componentBase}ReturnUpdateTraceLab, ${profile.componentBase}EvaluationGateLab } from "@/components/mdx/${BOOK}/v2/${slug}";

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
    description: `${profile.duty}；用转移账本、单故障收益更新轨迹和冻结评估门完成复核。`,
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
const chapterHeadings = allConcepts.filter((item) =>
  /^第\s*\d+章/.test(item),
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
  chapterHeadings !== 10 ||
  primarySections !== 57 ||
  secondarySections !== 128 ||
  appendixTitles !== 4 ||
  appendixSections !== 6 ||
  catalogLevels !== 205
) {
  throw new Error(
    `目录口径应为10章+57一级节+128二级节+4附录标题+6附录节=205，实际${chapterHeadings}+${primarySections}+${secondarySections}+${appendixTitles}+${appendixSections}=${catalogLevels}`,
  );
}

manifestDocument.books[BOOK] = {
  ...previousManifest,
  edition:
    "斋藤康毅著、郑明智译《深度学习入门4：强化学习》，人民邮电出版社，2024年8月，333页，ISBN 9787115649171；原版《ゼロから作るDeep Learning ❹ ―強化学習編》，O'Reilly Japan，2022年4月6日，376页，ISBN 9784873119755",
  sourceKind:
    "official-original-complete-ten-chapter-fifty-seven-primary-one-hundred-twenty-eight-secondary-four-appendix-six-appendix-section-outline-plus-official-code-and-errata",
  sourceUrl: SOURCES.original,
  secondarySourceUrls: Object.values(SOURCES).slice(1),
  status: "verified-outline",
  verifiedAt: "2026-07-30",
  disclosureNote:
    "O'Reilly Japan原版官方书页确认斋藤康毅著、2022年4月6日、376页、ISBN 9784873119755，并提供10章、4个附录的完整目录、官方代码与勘误入口；O'Reilly中文授权书目页核对《深度学习入门4：强化学习》、人民邮电出版社2024年8月、333页、ISBN 9787115649171。原版目录逐项统计10个章标题、57个一级节、128个二级节、4个附录标题和6个附录节，共205个正式层级。课程按10章与4个附录逐一覆盖，另设学习地图和总复习，共16页、48个章节专属交互。未取得原书完整正文授权，全部中文解释、数值、交互、练习与答案均为独立教学重写。旧16页缺少合规目标/归属结构，存在章内模板复制，并缺少转移、目标、更新和冻结评估证据，现已整体替换。",
  units: previousManifest.units.map((unit) => ({
    ...unit,
    chapterPath: PATHS[unit.id],
  })),
  metrics: {
    formalUnits: previousManifest.units.length,
    chapterHeadings,
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
  unitMappingEvidence: "quality/deep-learning-rl-from-scratch-v2-profiles.json",
  factSourcePolicy:
    "O'Reilly Japan官方书页与完整目录限定2022年原版事实和205个目录层级，官方代码仓库与勘误核对实现；强化学习基础、当前环境API、DeZero、DQN/Double DQN/优先回放/Dueling、策略梯度、A3C/DDPG/PPO、分布式价值与Rainbow分别以作者教材页、官方文档或原始论文核对。当前生态和后续成果不得反写原版。",
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
        "郑明智译《深度学习入门4：强化学习》，人民邮电出版社，2024年8月，333页，ISBN 9787115649171",
      technicalSources: Object.values(SOURCES).slice(4),
      officialUnits: previousManifest.units.length,
      officialChapterHeadings: chapterHeadings,
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
  `已重建 ${profiles.length} 页，覆盖${chapterHeadings}章+${primarySections}一级节+${secondarySections}二级节+${appendixTitles}附录标题+${appendixSections}附录节=${catalogLevels}个原版层级，生成 ${profiles.length * 3} 个交互视图。`,
);
