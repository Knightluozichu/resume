#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "deep-reinforcement-learning";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/deep-reinforcement-learning/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/deep-reinforcement-learning-v2-profiles.json",
);

const SOURCES = {
  authorRepo: "https://github.com/DeepRLChinese/DeepRL-Chinese",
  libraryMetadata: "https://lib2.buct.edu.cn/bookInfo_01h1336186.html",
  issuedDigitalToc: "https://online.anyflip.com/sckew/oxjt/",
  suttonBarto: "http://incompleteideas.net/book/the-book-2nd.html",
  gymnasium: "https://gymnasium.farama.org/",
  pytorch: "https://docs.pytorch.org/docs/stable/index.html",
  pettingZoo: "https://pettingzoo.farama.org/",
  dqn: "https://www.nature.com/articles/nature14236",
  trpo: "https://proceedings.mlr.press/v37/schulman15.html",
  ddpg: "https://arxiv.org/abs/1509.02971",
  td3: "https://proceedings.mlr.press/v80/fujimoto18a.html",
  gail: "https://proceedings.neurips.cc/paper/2016/hash/cc7e2b878868cbae992d1fb743995d8f-Abstract.html",
  a3c: "https://proceedings.mlr.press/v48/mniha16.html",
  maddpg:
    "https://proceedings.neurips.cc/paper/2017/hash/68a9750337a418a86fe06c1991a1d64c-Abstract.html",
  attentionMarl: "https://proceedings.mlr.press/v97/iqbal19a.html",
  alphaGo: "https://www.nature.com/articles/nature16961",
  alphaZero: "https://www.nature.com/articles/nature24270",
};

const PATHS = {
  learningMap: "00-learning-map/drl-official-learning-map",
  "drl-01": "01-foundations/drl-01-machine-learning-foundations",
  "drl-02": "01-foundations/drl-02-monte-carlo-method",
  "drl-03": "01-foundations/drl-03-reinforcement-learning-concepts",
  "drl-04": "02-value-learning/drl-04-dqn-q-learning",
  "drl-05": "02-value-learning/drl-05-sarsa",
  "drl-06": "02-value-learning/drl-06-advanced-value-learning",
  "drl-07": "03-policy-learning/drl-07-policy-gradient",
  "drl-08": "03-policy-learning/drl-08-policy-gradient-baseline",
  "drl-09": "03-policy-learning/drl-09-advanced-policy-learning",
  "drl-10": "03-policy-learning/drl-10-continuous-control",
  "drl-11": "03-policy-learning/drl-11-partial-observability",
  "drl-12": "03-policy-learning/drl-12-imitation-learning",
  "drl-13": "04-multi-agent/drl-13-parallel-computing",
  "drl-14": "04-multi-agent/drl-14-multi-agent-systems",
  "drl-15": "04-multi-agent/drl-15-cooperative-marl",
  "drl-16": "04-multi-agent/drl-16-noncooperative-marl",
  "drl-17": "04-multi-agent/drl-17-attention-marl",
  "drl-18": "05-applications/drl-18-alphago-mcts",
  "drl-19": "05-applications/drl-19-real-world-applications",
  "drl-appendix-a": "06-appendices/drl-appendix-a-bellman-equations",
  "drl-appendix-b": "06-appendices/drl-appendix-b-exercise-answers",
  finalReview: "07-final-review/drl-official-final-review",
};

const CHAPTER_SPECS = {
  "drl-01": {
    duty: "把线性模型、分类器、神经网络、梯度下降与反向传播连接成可复算的监督学习基线",
    question: "分类输出、损失和参数梯度怎样沿同一计算图对齐？",
    scenario: "在固定小批次上训练可手算的分类器",
    invariant: "样本轴、类别轴、标签、损失缩放与梯度方向始终一致",
    fault: "softmax沿样本轴归一化，数值合法却混淆类别概率",
    artifact: "shape账本、前向值、梯度核对与单步更新差",
    focus: "监督学习计算图与梯度",
    sources: [SOURCES.pytorch],
  },
  "drl-02": {
    duty: "把随机变量、抽样、积分、期望与随机梯度统一为带误差诊断的蒙特卡洛估计",
    question: "样本来自哪个分布，估计量为何无偏，误差怎样随样本量变化？",
    scenario: "用同一随机流估计圆周率、积分与期望",
    invariant: "目标分布、采样分布、权重、种子与样本预算可以逐项复核",
    fault: "使用偏置采样却仍按均匀样本公式求平均",
    artifact: "样本流、运行均值、标准误与偏置反例",
    focus: "抽样分布、估计量与误差",
    sources: [SOURCES.suttonBarto],
  },
  "drl-03": {
    duty: "用状态、动作、奖励、转移、策略、回报与价值函数建立MDP轨迹合同",
    question: "一条轨迹中的随机性、终止、截断和折扣回报怎样影响价值解释？",
    scenario: "重放固定策略在小型环境中的完整轨迹",
    invariant: "状态、动作、奖励、转移、终止/截断标记与折扣口径保持一致",
    fault: "把时间上限截断当作任务终止并错误清零自举项",
    artifact: "环境合同、轨迹表、折扣回报与价值复算",
    focus: "MDP角色、轨迹与价值",
    sources: [SOURCES.gymnasium, SOURCES.suttonBarto],
  },
  "drl-04": {
    duty: "从TD误差、经验回放与目标网络推导DQN和异策略Q学习更新",
    question: "行为策略生成的转移怎样成为Q学习目标，而不泄漏当前目标值？",
    scenario: "从固定回放批次执行一次DQN更新",
    invariant: "转移五元组、行为策略、目标网络快照、折扣与终止掩码被冻结",
    fault: "目标网络在计算TD目标前已被在线网络覆盖",
    artifact: "回放索引、TD目标、损失、梯度与目标同步日志",
    focus: "异策略TD目标与DQN更新",
    sources: [SOURCES.dqn, SOURCES.authorRepo],
  },
  "drl-05": {
    duty: "比较SARSA、Q学习、多步TD、蒙特卡洛与自举的目标构造和策略角色",
    question: "行为策略真实选择的下一动作怎样进入同策略SARSA目标？",
    scenario: "让SARSA与Q学习复用同一批轨迹和Q表",
    invariant: "同一轨迹、行为概率、步数、折扣与终止规则下只改变目标定义",
    fault: "用下一状态最大Q值替代行为策略实际选择的下一动作",
    artifact: "逐步目标、TD误差、Q表差异与n步截断记录",
    focus: "同策略、自举与多步回报",
    sources: [SOURCES.suttonBarto, SOURCES.authorRepo],
  },
  "drl-06": {
    duty: "分别验证经验回放、目标网络、双Q、对决网络与噪声探索的作用机制",
    question: "高级技巧改善的是样本相关性、目标偏差、表示还是探索？",
    scenario: "在固定回放批次和网络快照上执行单因素消融",
    invariant: "每次只改变一种技巧，数据、预算、初始化与评估策略完全相同",
    fault: "同时启用优先回放、双Q、对决头和噪声层后给单一技巧归因",
    artifact: "单因素消融、优先级、估计偏差与探索状态报告",
    focus: "价值学习偏差与结构消融",
    sources: [SOURCES.dqn, SOURCES.authorRepo],
  },
  "drl-07": {
    duty: "从轨迹概率与期望回报推导策略梯度、REINFORCE和actor-critic更新",
    question: "采样动作的对数概率、回报与价值估计怎样形成无歧义的梯度样本？",
    scenario: "用固定轨迹复算一次策略梯度更新",
    invariant: "行为策略快照、动作对数概率、回报、价值目标与梯度符号相互对应",
    fault: "用更新后的策略概率重算旧轨迹的对数概率",
    artifact: "轨迹概率、回报、优势、策略梯度与参数差",
    focus: "策略目标、轨迹概率与梯度",
    sources: [SOURCES.suttonBarto, SOURCES.authorRepo],
  },
  "drl-08": {
    duty: "证明基线不改变期望策略梯度，并比较REINFORCE基线与A2C的方差和自举",
    question: "基线减去什么、是否依赖动作、优势目标在哪里停止梯度？",
    scenario: "在同一轨迹上比较无基线、状态基线和A2C",
    invariant: "行为策略、回报、状态基线、停止梯度与价值目标角色明确分离",
    fault: "让基线直接依赖当前动作却仍按无偏基线解释",
    artifact: "基线前后梯度均值/方差、优势和价值残差",
    focus: "基线、优势与方差控制",
    sources: [SOURCES.suttonBarto, SOURCES.authorRepo],
  },
  "drl-09": {
    duty: "用重要性比率、KL约束和熵正则建立置信域策略更新",
    question: "怎样证明新策略变化受约束，而不只看代理目标上升？",
    scenario: "在固定旧策略批次上比较候选更新步长",
    invariant: "旧策略概率、重要性比率方向、KL口径、步长与接受规则预先冻结",
    fault: "只看代理收益提高，忽略实测KL已经越过置信域",
    artifact: "概率比率、代理目标、KL曲线、回退线搜索与接受理由",
    focus: "置信域、概率比与策略约束",
    sources: [SOURCES.trpo],
  },
  "drl-10": {
    duty: "比较动作离散化、DDPG、TD3与随机高斯策略在连续控制中的目标和更新",
    question: "连续动作的范围、探索噪声、双Q和延迟更新怎样保持训练与执行一致？",
    scenario: "在固定连续控制轨迹上复算actor与critic更新",
    invariant: "动作缩放、噪声位置、目标策略、双Q聚合和更新频率均被记录",
    fault: "tanh输出未映射到环境动作范围却直接送入环境和critic",
    artifact: "动作缩放表、双Q目标、策略延迟与噪声重放日志",
    focus: "连续动作、critic目标与延迟更新",
    sources: [SOURCES.ddpg, SOURCES.td3],
  },
  "drl-11": {
    duty: "区分状态与观测，并用循环状态为不完全观测策略保留历史信息",
    question: "哪些历史信息进入RNN隐藏状态，训练与推断何时重置？",
    scenario: "在可控遮挡环境中重放相同观测序列",
    invariant: "观测、真实状态、序列边界、隐藏状态和掩码角色不混淆",
    fault: "每个时间步都把隐藏状态清零却声称策略利用了历史",
    artifact: "观测—状态对照、隐藏轨迹、掩码与重置测试",
    focus: "部分观测、记忆与序列边界",
    sources: [SOURCES.gymnasium, SOURCES.pytorch],
  },
  "drl-12": {
    duty: "比较行为克隆、逆向强化学习与GAIL的数据假设、分布偏移和训练信号",
    question: "专家示范覆盖了什么状态分布，策略偏离后由谁提供纠错信号？",
    scenario: "用按轨迹划分的专家示范训练并评估模仿策略",
    invariant: "专家/学习者轨迹、实体切分、奖励代理和环境评估保持独立",
    fault: "把同一轨迹的相邻帧随机分到训练集与测试集",
    artifact: "轨迹级切分、占用分布、判别信号与闭环评估",
    focus: "示范分布、奖励反推与闭环偏移",
    sources: [SOURCES.gail],
  },
  "drl-13": {
    duty: "从并行梯度、MapReduce、同步/异步与A3C分析吞吐、陈旧度和策略一致性",
    question: "并行工作器计算的梯度对应哪个参数与策略版本？",
    scenario: "重放多个工作器对共享参数的更新队列",
    invariant: "参数版本、梯度版本、聚合顺序、随机流与更新计数可追溯",
    fault: "无版本记录地应用陈旧梯度并把吞吐提升等同于学习提升",
    artifact: "工作器时间线、梯度版本、冲突率与样本效率报告",
    focus: "并行更新、同步与陈旧梯度",
    sources: [SOURCES.a3c],
  },
  "drl-14": {
    duty: "用智能体、联合动作、局部观测、共享/个体奖励与基准环境建立多智能体合同",
    question: "联合轨迹里每个观测、动作和奖励属于哪个智能体与时间步？",
    scenario: "在固定智能体顺序下重放多智能体环境回合",
    invariant: "智能体身份、活动掩码、联合状态、动作顺序和奖励归属始终对齐",
    fault: "环境返回顺序变化后仍按旧数组下标绑定智能体",
    artifact: "智能体身份表、联合轨迹、掩码与奖励归属测试",
    focus: "多智能体接口、身份与联合轨迹",
    sources: [SOURCES.pettingZoo],
  },
  "drl-15": {
    duty: "比较完全合作下中心化/去中心化训练与决策，以及多智能体A2C的信息边界",
    question: "全局信息允许进入哪个critic，执行时每个actor真正可见什么？",
    scenario: "在同一合作任务上比较三种训练—决策架构",
    invariant: "训练可见性、执行可见性、共享奖励、参数共享和通信预算被分别声明",
    fault: "去中心化执行时actor仍读取训练阶段的全局状态",
    artifact: "信息可见性矩阵、联合优势、通信量与执行审计",
    focus: "合作奖励、CTDE与执行可见性",
    sources: [SOURCES.pettingZoo, SOURCES.authorRepo],
  },
  "drl-16": {
    duty: "在非合作与混合关系中分析策略目标、收敛判别、MADDPG和集中式critic",
    question: "对手策略持续变化时，候选策略相对哪个快照被评价？",
    scenario: "冻结对手池后评估多智能体A2C与MADDPG候选",
    invariant: "对手快照、联合动作、critic信息、随机种子与评价协议不随候选改变",
    fault: "只对训练末尾的同代对手评估并宣称策略普遍占优",
    artifact: "对手池、交叉对战矩阵、critic输入与纳什偏差诊断",
    focus: "非平稳对手、集中式critic与交叉评估",
    sources: [SOURCES.maddpg],
  },
  "drl-17": {
    duty: "把自注意力、多头聚合与多智能体价值/策略网络连接到集合不变性和掩码",
    question: "注意力权重对应哪个智能体，数量变化与填充怎样不污染聚合？",
    scenario: "打乱智能体顺序并改变活动智能体数量",
    invariant: "身份特征、置换、padding掩码、头维度与集中式可见性保持一致",
    fault: "padding智能体未掩码，注意力把占位向量当作真实队友",
    artifact: "注意力矩阵、置换测试、掩码反例与消融报告",
    focus: "注意力聚合、身份与集合不变性",
    sources: [SOURCES.attentionMarl],
  },
  "drl-18": {
    duty: "用选择、扩展、评估、回传四步连接MCTS与AlphaGo/AlphaGo Zero的策略价值学习",
    question: "搜索统计、策略先验、价值估计与自博弈数据怎样避免角色混淆？",
    scenario: "在固定棋局与预算下逐步重放一棵搜索树",
    invariant: "节点状态、先验、访问次数、价值视角、虚拟损失和搜索预算一致",
    fault: "切换根节点后沿用不兼容的访问统计并当作新局面证据",
    artifact: "搜索树快照、PUCT分量、回传符号与自博弈数据谱系",
    focus: "树搜索统计、策略价值与自博弈",
    sources: [SOURCES.alphaGo, SOURCES.alphaZero],
  },
  "drl-19": {
    duty: "比较结构搜索、SQL、推荐、调度等应用，并审计样本效率、探索成本和稳定性",
    question: "离线回报或模拟收益怎样才能支持真实系统中的安全决策？",
    scenario: "评审一个从离线日志到在线灰度的强化学习方案",
    invariant: "决策影响、长线回报、行为策略、反事实评估、安全门与回滚条件齐全",
    fault: "把模拟器或离线策略值直接当作无风险在线收益",
    artifact: "数据谱系、离线评估、约束清单、灰度门与回滚预案",
    focus: "真实应用、离线证据与安全部署",
    sources: [SOURCES.suttonBarto, SOURCES.gymnasium],
  },
  "drl-appendix-a": {
    duty: "从回报递推推导状态价值、动作价值、期望方程与最优贝尔曼方程",
    question: "条件期望、策略加权与最大化分别作用在哪一层？",
    scenario: "在两状态两动作MDP上逐项复算贝尔曼方程",
    invariant: "条件变量、转移概率、奖励时标、折扣、策略概率与最大化位置正确",
    fault: "把对动作的期望与最大化交换后仍称为同一策略价值",
    artifact: "方程角色表、手算结果、残差与策略/最优边界",
    focus: "贝尔曼递推、条件期望与最优性",
    sources: [SOURCES.suttonBarto],
  },
  "drl-appendix-b": {
    duty: "把习题答案用作可复核反馈，而不是替代预测、推导、实验与错误诊断",
    question: "怎样证明答案与对应章节、题设和推导步骤一致？",
    scenario: "按章节坐标复核一个作答、一个反例和一次订正",
    invariant: "题号、章节、已知量、推导、答案与错误类型一一对应",
    fault: "先抄最终答案再反向补步骤并把熟悉感当作掌握",
    artifact: "题目—答案映射、独立作答、错误分类与订正记录",
    focus: "答案映射、反馈与独立作答",
    sources: [SOURCES.authorRepo],
  },
};

const MAP_SPEC = {
  title: "《深度强化学习》原版结构学习地图",
  duty: "沿5部分、19章、2附录和272个正式目录层级建立先修、轨迹、更新与评估路线",
  question:
    "怎样从机器学习基础一路走到价值、策略、多智能体与真实应用而不跳过证据合同？",
  scenario: "为一个贯穿全书的强化学习项目规划学习与验收路径",
  invariant: "每一章都连接原版坐标、可观察状态、单故障、恢复和独立评估",
  fault:
    "按热门算法拼接路线，遗漏原书的SARSA、部分观测、模仿、多智能体或应用边界",
  artifact: "23页路线、272坐标覆盖表与跨章依赖图",
  focus: "原版结构、先修关系与学习证据",
  sources: [SOURCES.authorRepo, SOURCES.issuedDigitalToc],
};

const REVIEW_SPEC = {
  title: "《深度强化学习》全书证据总复习",
  duty: "把环境、轨迹、回报、目标、更新、策略快照、多智能体关系和部署边界串成一次端到端复核",
  question:
    "一个强化学习结论怎样从目录坐标追溯到轨迹、更新、独立评估与失败边界？",
  scenario: "复核一个横跨单智能体、多智能体和真实应用的交付包",
  invariant: "272个坐标、参考/故障/恢复轨迹与部署边界可以双向追溯",
  fault: "只凭训练回报或精选回合宣称算法、协作和真实收益均已成立",
  artifact: "全书覆盖矩阵、首差定位、跨快照评估与上线裁决",
  focus: "全书证据链、迁移与边界",
  sources: [SOURCES.authorRepo, SOURCES.suttonBarto],
};

function conceptStrings(unit) {
  return unit.concepts.map((alternatives) => alternatives[0]);
}

function bookCoordinates(manifest) {
  return manifest.units.flatMap(conceptStrings);
}

function toPascal(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function stripCoordinate(value) {
  return value
    .replace(/^第[一二三四五六七八九十]+部分\s*/, "")
    .replace(/^第\d+章\s*/, "")
    .replace(/^附录[A-Z]\s*/, "")
    .replace(/^(?:\d+(?:\.\d+)+|B\.\d+)\s*/, "");
}

function mdxText(value) {
  return value
    .replace(/_/g, "\\_")
    .replace(/\{/g, "&#123;")
    .replace(/\}/g, "&#125;");
}

function proseCoordinate(value) {
  return value.replace(/\.(?=\d)/g, "·");
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

function termFor(concept, index) {
  const short = stripCoordinate(concept)
    .split(/[；;：:——,，]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 30
    ? short
    : `强化学习坐标${index + 1}`;
}

function buildStages(title, specification) {
  return [
    {
      name: `${title} · 环境与角色`,
      input: specification.scenario,
      operation: `冻结${specification.focus}所需的环境版本、观测/状态、动作、奖励和数据角色`,
      output: `${title}的环境合同、策略快照与基线轨迹`,
      check: `${title}的角色、时间索引、shape、终止和可见性没有错位`,
    },
    {
      name: `${title} · 回报与目标`,
      input: `${title}的冻结轨迹和策略快照`,
      operation: `按${specification.duty}构造回报、目标、估计量或搜索统计`,
      output: `${title}的逐步回报、目标分量与中间状态`,
      check: `${title}的目标可由同一轨迹、公式和随机状态复算`,
    },
    {
      name: `${title} · 更新与策略`,
      input: `${title}的目标、中间状态和参数版本`,
      operation: "执行一次受控更新并记录策略、价值、梯度或联合决策的变化",
      output: `${title}的更新前后差、首个分岔和恢复路径`,
      check: `${title}没有把代理损失、单次回报或训练内统计当作最终结论`,
    },
    {
      name: `${title} · 独立评估`,
      input: `${title}的冻结候选、环境种子、对手/行为策略快照与未见回合`,
      operation: "重放基线、单故障、恢复和边界案例",
      output: `${title}的接受、回退或拒绝理由`,
      check: `${title}满足“${specification.invariant}”`,
    },
  ];
}

function enrichProfile(key, specification, role, allCoordinates, unit = null) {
  const target = PATHS[key];
  if (!target) throw new Error(`缺少页面路径：${key}`);
  const [, chapterSlug] = target.split("/");
  const title = specification.title ?? unit?.title;
  if (!title) throw new Error(`缺少标题：${key}`);
  const concepts =
    role === "chapter"
      ? conceptStrings(unit)
      : allCoordinates.filter(
          (value) =>
            /^第[一二三四五六七八九十]+部分/.test(value) ||
            /^第\d+章/.test(value) ||
            /^附录[A-Z]/.test(value),
        );
  const stages = buildStages(title, specification);
  return {
    id: key,
    role,
    officialUnitId: role === "chapter" ? unit.id : null,
    target,
    chapterSlug,
    componentBase: toPascal(chapterSlug),
    title,
    concepts,
    stages,
    ...specification,
    cases: [
      {
        name: `${title} · 基线`,
        setup: `固定${specification.scenario}的环境、策略、种子、预算和对手快照`,
        prediction: `${title}的参考轨迹应持续满足“${specification.invariant}”`,
        boundary: `${title}只回答本页原版坐标和已运行实验合同内的问题`,
      },
      {
        name: `${title} · 单故障`,
        setup: `保持其他条件不变，只注入“${specification.fault}”`,
        prediction: `${title}应出现可定位的首个状态分岔，而不是只在末端回报异常`,
        boundary: `${title}的故障结论不能外推到未运行的环境、策略、对手或部署流量`,
      },
      {
        name: `${title} · 恢复`,
        setup: `撤销故障并从同一快照重放${specification.scenario}`,
        prediction: `${title}的轨迹、独立评估与交付证据应恢复基线`,
        boundary: `${title}若不能复现恢复结果，就不能把异常归因给单一故障`,
      },
    ],
    referenceTrace: stages.map(
      (stage, index) =>
        `${title}参考步骤${index + 1}：${stage.operation}；保存${stage.output}。`,
    ),
    faultTrace: stages.map((stage, index) =>
      index === 1
        ? `${title}故障步骤${index + 1}：只注入“${specification.fault}”，记录首个偏离“${stage.check}”的状态。`
        : `${title}故障步骤${index + 1}：保持${stage.input}不变，检查${stage.output}如何受单一故障传播。`,
    ),
    gates: [
      {
        label: "原版结构与访问边界",
        detail: `${title}区分作者官方代码仓库、发行版目录、独立技术来源与本站重写；仓库没有可据以复用代码或正文的明确许可，所以不复制代码、图表或原文。`,
      },
      {
        label: "环境、轨迹与数据合同",
        detail: `${title}的环境版本、观测/状态、动作、奖励、终止、策略快照、shape和随机性可从同一快照复算。`,
      },
      {
        label: "回报、目标与更新合同",
        detail: `${title}的回报、目标分量、梯度/估计、更新前后参数、行为策略和对手版本已归档。`,
      },
      {
        label: "独立评估与应用边界",
        detail: `${title}用未见种子、冻结策略/对手或独立诊断复核“${specification.invariant}”，并报告“${specification.fault}”的恢复结果。`,
      },
    ],
  };
}

function mechanismFor(concept, profile) {
  const title = stripCoordinate(concept);
  const rules = [
    [
      /部分|机器学习基础|线性|逻辑斯谛|softmax|神经网络|卷积|梯度下降|反向传播/,
      "明确输入/输出shape、损失、局部导数和参数更新",
      "shape、前向值、损失分量、梯度与有限差分",
      "数值可运行却混淆样本轴、动作轴、类别轴或梯度缩放",
    ],
    [
      /蒙特卡洛|随机变量|随机梯度|定积分|期望|面积|π/,
      "声明目标分布、采样分布、估计量和误差诊断",
      "样本流、权重、运行均值、标准误与置信区间",
      "偏置采样或相关样本仍按独立同分布公式解释",
    ],
    [
      /马尔可夫|状态|动作|奖励|转移|策略|回报|折扣|价值函数|OpenAI Gym/,
      "建立环境、轨迹、终止、策略、回报和价值的时间合同",
      "转移记录、策略概率、终止/截断标记、回报与价值残差",
      "混淆状态与观测、终止与截断或行为策略与目标策略",
    ],
    [
      /DQN|Q学习|TD|SARSA|自举|经验回放|高估|目标网络|双Q|对决|噪声/,
      "构造可复算的TD目标并区分同策略、异策略、采样和目标网络角色",
      "回放索引、下一动作、TD目标、误差、优先级和参数快照",
      "目标网络泄漏、策略角色错位或多技巧同时变化",
    ],
    [
      /策略梯度|REINFORCE|actor-critic|基线|advantage|置信域|熵正则/,
      "从轨迹概率、回报、优势、概率比与KL约束推导策略更新",
      "动作对数概率、回报、基线、优势、梯度、KL与接受规则",
      "用新策略重算旧轨迹、动作依赖基线或越过置信域",
    ],
    [
      /连续|DDPG|TD3|高斯|截断双Q|离散化/,
      "对齐连续动作范围、critic目标、双Q、噪声与延迟策略更新",
      "动作缩放、噪声、双Q目标、策略梯度和更新频率",
      "动作尺度、目标噪声或actor/critic更新时序错位",
    ],
    [
      /不完全观测|循环神经网络|RNN|模仿|行为克隆|逆向|IRL|GAIL/,
      "区分状态/观测/记忆或专家/学习者分布并验证闭环偏移",
      "隐藏状态、序列掩码、轨迹级切分、占用分布和闭环回报",
      "隐藏状态错误重置或相邻帧泄漏到训练与测试两侧",
    ],
    [
      /并行|MapReduce|同步|异步|A3C/,
      "跟踪工作器、参数版本、梯度陈旧度、聚合顺序和吞吐代价",
      "工作器时间线、梯度版本、冲突率、吞吐和样本效率",
      "只看墙钟速度，不记录陈旧策略与更新冲突",
    ],
    [
      /多智能体|合作|非合作|中心化|去中心化|MADDPG|注意力|Hanabi|StarCraft|particle/,
      "声明智能体身份、联合轨迹、信息可见性、对手快照与训练/执行架构",
      "身份表、联合动作、奖励归属、可见性矩阵、对战矩阵与掩码",
      "智能体顺序、全局信息、对手版本或padding掩码泄漏",
    ],
    [
      /AlphaGo|围棋|树搜索|MCTS|搜索|SQL|推荐|调度|现实|应用|样本数量|探索|稳定性/,
      "把搜索统计或离线决策证据连接到独立评估、安全门与回滚边界",
      "搜索树、策略快照、行为日志、离线估计、灰度门和回滚预案",
      "训练/模拟回报被直接外推为真实系统安全收益",
    ],
    [
      /贝尔曼|第\d+章|习题答案/,
      "把方程或作答连接到条件变量、策略角色、推导步骤与反例",
      "方程角色表、逐步推导、残差、独立作答与订正记录",
      "交换期望/最大化或先抄答案再反向补推导",
    ],
  ];
  const rule = rules.find(([pattern]) => pattern.test(title));
  return rule
    ? rule.slice(1)
    : [
        `把“${title}”放进${profile.focus}的环境—轨迹—目标—更新链`,
        `${profile.title}的输入角色、中间状态、策略快照、反例与独立评估`,
        `只复述“${title}”名称而没有可观察状态、单一故障和恢复证据`,
      ];
}

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并区分原版目录、作者代码映射、独立技术来源和本站重写
- 能先预测“${profile.question}”会改变哪一个环境、轨迹、回报、目标、策略或评估状态，再操作三类交互证据
- 能只注入“${profile.fault}”，定位首个偏离“${profile.invariant}”的状态，并从同一快照完成恢复

</Objectives>`;
}

function sourceSection(profile) {
  const technicalSources = profile.sources
    .map((url, index) => `[本页独立核对 ${index + 1}](${url})`)
    .join("、");
  return `## 原版书目、272个正式坐标与访问边界

“${profile.title}”以[作者官方代码仓库](${SOURCES.authorRepo})核对王树森、黎彧君、张志华著《深度强化学习》的第1至19章及主要算法—实现映射，以[馆藏书目](${SOURCES.libraryMetadata})核对人民邮电出版社、2022年11月、294页和ISBN 9787115600691，再以[发行数字版完整目录](${SOURCES.issuedDigitalToc})核对5个部分、19章、233个编号节/小节、附录A、附录B与B.1至B.13，合计272个正式目录层级。

作者仓库验证章节和算法实现确实对应，但仓库页面未提供可据以复用代码、图表或书稿的明确许可；发行数字版用于核对目录范围，不作为复制正文的授权。“${profile.title}”不翻译、摘编或改写原书正文，也不复制仓库代码；中文讲解、状态轨迹、反例、交互、练习与答案均为独立教学重写。

${technicalSources}只用于独立核对本页算法、环境接口或实验边界，不能反向证明原书使用本站表述。Gymnasium、PyTorch、PettingZoo等当前API行为按2026-07-30核对并显式视为当前实现，不倒填为2022年原书内容。`;
}

const sentencePatterns = [
  (p, c, m, e, x, i) =>
    `在“${p.title}”的第${i + 1}个正式坐标中，「${c}」通过${m}推进${p.focus}；复核者保存${e}，出现${x}就撤回结论。`,
  (p, c, m, e, x, i) =>
    `围绕“${p.question}”，“${p.title}”在坐标${i + 1}把「${c}」落实为${m}；只有${e}可重放且反例排除${x}，本节点才算掌握。`,
  (p, c, m, e, x, i) =>
    `“${p.title}”的目录节点${i + 1}「${c}」不能停在术语复述：它要${m}，交付${e}，并把${x}设为单一反事实。`,
  (p, c, m, e, x, i) =>
    `对“${p.title}”而言，「${c}」在第${i + 1}次检查中改变可观察状态，因为它负责${m}；${e}必须与“${p.invariant}”对齐，不能接受${x}。`,
];

function conceptsSection(profile) {
  return `## 原版目录层级与可验证机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept, profile);
    const term = termFor(concept, index);
    const safeConcept = mdxText(proseCoordinate(concept));
    const safeTerm = mdxText(term);
    const definition = `${term}对应正式目录坐标“${concept}”，在“${profile.title}”中用于${mechanism}，并受环境、轨迹、策略快照、随机性、评估与版本边界约束。`;
    return `### ${safeConcept}

<Term def=${JSON.stringify(definition)}>${safeTerm}</Term>

**正式坐标 ${index + 1}/${profile.concepts.length}。** 原版目录键 \`${concept}\`。${sentencePatterns[index % sentencePatterns.length](profile, safeConcept, mechanism, evidence, caution, index)}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个章专属实验

<Callout type="info" title="先写出哪个状态会最先变化">
  对“${profile.title}”先冻结${profile.scenario}的环境、轨迹、策略/对手快照、预算、随机性和评估口径，再操作三类实验；结果与预测不同就修改假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 环境与轨迹合同">
    为“${profile.title}”选择正式目录坐标，在参考合同与单一反事实间切换，逐角色核对输入、状态变化、证据与即时裁决。

    <${profile.componentBase}EnvironmentContractLab />
  </Step>
  <Step title="2. 回报、目标与更新轨迹">
    保持“${profile.title}”的${profile.scenario}不变，只注入“${profile.fault}”，逐步定位首个偏离“${profile.invariant}”的位置。

    <${profile.componentBase}ReturnUpdateTraceLab />
  </Step>
  <Step title="3. 异策略与多智能体评估门">
    在“${profile.title}”的基线、单故障和恢复案例间切换，展开结构、环境、更新和独立评估门后再决定是否交付。

    <${profile.componentBase}EvaluationGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页单一故障：${profile.fault}">
  “${profile.title}”遇到该故障时必须保持其余环境、轨迹、策略/对手版本、预算和随机序列不变；训练回报偶尔更高不能替代首个状态分岔与恢复证据。
</Callout>

<Callout type="trap" title="训练回报不等于独立策略价值">
  “${profile.title}”的TD误差、代理目标、训练回报、搜索值或同代对战只回答各自合同；它们不能自动证明未见种子、冻结对手、真实用户或安全部署上的收益。
</Callout>

<Callout type="trap" title="可访问目录与代码映射不等于复用许可">
  “${profile.title}”可以用作者仓库和发行版目录核对范围，但未发现可授权本站复制代码、图表或正文的明确许可；当前内容必须保持独立表达、独立技术核对与时间边界。
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
reset: restore_concept_mode_stage_trace_step_case_gates_and_artifact
\`\`\`

“${profile.title}”要求从同一环境、轨迹、策略/对手版本、预算和随机状态重放参考、故障与恢复路径。重置后若目录选择、合同模式、阶段、轨迹步骤、案例、证据门或交付包没有回到基线，本次比较已经混入状态泄漏。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept, profile);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>检索键 drl-${alphaCode(index)} 对应正式目录坐标「${mdxText(proseCoordinate(concept))}」；在“${profile.title}”中用于${mechanism}，需要连接结构范围、轨迹状态、更新证据、独立评估与不适用边界。</GlossaryItem>`;
    })
    .join("\n");
  const coverageList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept, profile);
      return `${index + 1}. “${profile.title}”的目录项「${mdxText(proseCoordinate(concept))}」：以“${mechanism}”解释作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是背算法名或抄训练循环，而是围绕“${profile.question}”重建环境、轨迹、回报、目标、更新、策略/对手快照与独立评估，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}。

## 练习与答案

<Exercises>

1. **问题 1：实验合同。** “${profile.title}”为什么必须先冻结环境、轨迹、策略/对手版本、预算、随机性和评估口径？

<Answer>
  若同时改变这些条件，相同回报可能来自不同状态分布、行为策略、目标、更新或对手；先冻结合同，才能把观测连接到单一机制并定位首差。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明“${profile.title}”的正式目录坐标已经进入机制、交互和练习？

<Answer>
${coverageList}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一环境、轨迹、策略/对手快照、预算和随机流，重放参考路径后只注入该故障；记录首个偏离，撤销故障再运行。只有环境合同、更新轨迹、独立评估和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="author-official-code-map-plus-issued-edition-detailed-toc"
  workTitle="王树森、黎彧君、张志华著《深度强化学习》"
  adaptedUrl="${SOURCES.authorRepo}"
/>`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    stages: profile.stages,
    cases: profile.cases,
    referenceTrace: profile.referenceTrace,
    faultTrace: profile.faultTrace,
    gates: profile.gates,
  };
  return `"use client";

import {
  RlSystemsEvidenceLab,
  type RlSystemsEvidenceModel,
} from "./rl-systems-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies RlSystemsEvidenceModel;

export function ${profile.componentBase}EnvironmentContractLab() {
  return <RlSystemsEvidenceLab model={model} view="environment-contract" />;
}

export function ${profile.componentBase}ReturnUpdateTraceLab() {
  return <RlSystemsEvidenceLab model={model} view="return-update-trace" />;
}

export function ${profile.componentBase}EvaluationGateLab() {
  return <RlSystemsEvidenceLab model={model} view="evaluation-gate" />;
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
  ${profile.componentBase}EnvironmentContractLab,
  ${profile.componentBase}ReturnUpdateTraceLab,
  ${profile.componentBase}EvaluationGateLab,
} from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";

${objectivesBlock(profile)}

## 为什么从这个问题开始

“${profile.title}”围绕“${profile.question}”建立贯穿任务：${profile.scenario}。先写下哪个环境、轨迹、回报、目标、策略或评估状态会最先变化，再运行参考、故障和恢复路径；运行后补理由不算预测。只有守住“${profile.invariant}”并交付${profile.artifact}，训练回报、策略价值、搜索统计或应用收益才构成机制证据。

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
    description: `${profile.duty}；用环境合同、更新轨迹和独立评估门交付${profile.artifact}`,
    demo: true,
    math: true,
    sourceUrl: SOURCES.authorRepo,
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

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = manifestDocument.books[BOOK];
if (!manifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
for (const unit of manifest.units) {
  unit.chapterPath = PATHS[unit.id];
  if (!unit.chapterPath) throw new Error(`缺少单元页面映射：${unit.id}`);
}

const allCoordinates = bookCoordinates(manifest);
const partHeadings = allCoordinates.filter((item) =>
  /^第[一二三四五六七八九十]+部分/.test(item),
).length;
const chapterHeadings = allCoordinates.filter((item) =>
  /^第\d+章/.test(item),
).length;
const numberedSections = allCoordinates.filter((item) =>
  /^\d+(?:\.\d+)+\s/.test(item),
).length;
const appendixHeadings = allCoordinates.filter((item) =>
  /^附录[A-Z]\s/.test(item),
).length;
const appendixSections = allCoordinates.filter((item) =>
  /^B\.\d+\s/.test(item),
).length;
const formalNodes = allCoordinates.length;
if (
  partHeadings !== 5 ||
  chapterHeadings !== 19 ||
  numberedSections !== 233 ||
  appendixHeadings !== 2 ||
  appendixSections !== 13 ||
  formalNodes !== 272
)
  throw new Error(
    `目录层级计数异常：部分${partHeadings}、章${chapterHeadings}、编号节/小节${numberedSections}、附录${appendixHeadings}、附录答案节${appendixSections}、总计${formalNodes}`,
  );

const profiles = [
  enrichProfile("learningMap", MAP_SPEC, "learning-map", allCoordinates),
  ...manifest.units.map((unit) => {
    const specification = CHAPTER_SPECS[unit.id];
    if (!specification) throw new Error(`缺少章专属画像：${unit.id}`);
    return enrichProfile(
      unit.id,
      specification,
      "chapter",
      allCoordinates,
      unit,
    );
  }),
  enrichProfile("finalReview", REVIEW_SPEC, "final-review", allCoordinates),
];
if (profiles.length !== 23)
  throw new Error(`页面数量异常：应为23，实际${profiles.length}`);

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

manifest.status = "verified-outline-independent-rewrite";
manifest.verifiedAt = "2026-07-30";
manifest.edition =
  "王树森、黎彧君、张志华著《深度强化学习》，人民邮电出版社，2022年11月，294页，ISBN 9787115600691";
manifest.sourceUrl = SOURCES.authorRepo;
manifest.sourceKind =
  "author-official-code-repository-nineteen-chapter-algorithm-map-plus-issued-digital-edition-five-part-nineteen-chapter-two-hundred-thirty-three-numbered-section-two-appendix-detailed-toc";
manifest.sourceAccess = "outline-only";
manifest.defaultSourceMode = "independent-rewrite";
manifest.secondarySourceUrls = [
  SOURCES.libraryMetadata,
  SOURCES.issuedDigitalToc,
];
manifest.disclosureNote =
  "作者官方代码仓库确认第1至19章与主要算法实现映射，馆藏书目核对人民邮电出版社、2022年11月、294页与ISBN 9787115600691，发行数字版完整目录核对5部分、19章、233个编号节/小节、附录A、附录B及B.1至B.13，合计272个正式目录层级。仓库未提供可据以复用代码或书稿的明确许可，本站不复制代码、图表或正文；中文讲解、交互、反例、练习和答案均为独立重写。";
manifest.unitMappingEvidence =
  "21个manifest单元与19章、附录A、附录B页面一一映射；第1、4、7、13、18章同时承载5个部分标题。学习地图与总复习不冒充原版单元。";
manifest.factSourcePolicy =
  "目录和作者代码映射只限定范围；技术事实由作者资料、原始论文或官方框架/环境文档独立核对。当前API按2026-07-30标时，不倒填为2022年原书内容；无法核对时不得写成确定事实。";
manifest.metrics = {
  formalPartHeadings: 5,
  formalChapterHeadings: 19,
  formalNumberedSectionsAndSubsections: 233,
  formalAppendixHeadings: 2,
  formalAppendixAnswerSections: 13,
  formalConceptNodes: 272,
  officialUnits: 21,
  learningMapPages: 1,
  reviewPages: 1,
  totalLearningPages: 23,
  interactiveViews: 69,
  visualKinds: [
    "rl-environment-contract",
    "rl-return-update-trace",
    "rl-evaluation-gate",
  ],
};
manifest.coverageMetrics = {
  targetFormalNodes: 272,
  coveredFormalNodes: 272,
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
  sourceAccess: "outline-only",
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
  `已重建23页，覆盖5部分+19章+233编号节/小节+2附录+13附录答案节=${formalNodes}个正式坐标，生成69个交互视图。`,
);
