import type { ReviewQuestion } from "./types";

export const drlApplicationsQuestions: ReviewQuestion[] = [
  {
    id: "drl-applications-1",
    chapter: "drl-applications",
    level: 1,
    question: `深度RL在游戏领域有哪些里程碑成就？它们分别使用了什么算法？`,
    answer:
      `深度RL在游戏领域的里程碑：①DQN玩Atari（2015, DeepMind）——用同一个DQN架构在49款Atari游戏上达到人类水平，输入原始像素，输出离散动作。意义：证明深度RL可以处理高维视觉输入，是深度RL的开山之作。②AlphaGo（2016, DeepMind）——击败围棋世界冠军李世石。结合MCTS（蒙特卡洛树搜索）+ 策略网络 + 价值网络，先用人类棋谱监督学习，再用自对弈RL强化。意义：围棋被认为是AI最难攻克的棋类游戏，此突破震惊世界。③AlphaZero（2017, DeepMind）——无需人类棋谱，纯自对弈学习，在围棋、国际象棋、日本将棋三个领域击败最强程序。只用MCTS + RL，证明AI可以「从零自学」超越人类知识。④OpenAI Five（2018, OpenAI）——在Dota2中击败人类职业选手。使用PPO算法，大规模分布式训练（256GPU + 128000 CPU），自对弈数百万局。意义：攻克不完美信息、长horizon、多人合作游戏。⑤AlphaStar（2019, DeepMind）——在星际争霸2中击败职业选手。结合联盟训练（league training）、Transformer、指针网络。意义：攻克实时战略、部分可观测、大规模动作空间。共同特点：游戏是RL的理想试验场——完美仿真、无限数据、明确胜负指标。`,
    tags: ["游戏", "DQN", "AlphaGo", "AlphaZero", "OpenAI Five", "里程碑"],
  },
  {
    id: "drl-applications-2",
    chapter: "drl-applications",
    level: 2,
    question: `机器人RL的核心挑战是什么？sim-to-real迁移如何解决这些问题？`,
    answer:
      `机器人RL的核心挑战：①连续高维动作空间——机器人有多个关节（如7轴机械臂、30+自由度人形），每个关节是连续值，动作空间维度高，探索困难。②样本昂贵——真实机器人每步实验耗时且有风险，不能像游戏那样跑百万局。一个epoch可能需要数小时。③安全约束——真实机器人可能损坏自身或环境，不能随意试错（不能让机器人「撞墙学习」）。④仿真到现实差距（sim-to-real gap）——仿真器的物理模型不完美（摩擦、惯性、传感器噪声等），在仿真中训练好的策略在真实环境中可能失效。sim-to-real迁移解决方案：①域随机化（Domain Randomization）——训练时随机化仿真参数（摩擦系数、质量、阻尼、光照、传感器噪声等），使策略对参数变化鲁棒。真实环境被视为「随机化参数的一种特例」。②域适应（Domain Adaptation）——用少量真实数据微调仿真训练的策略，或学习仿真到真实的映射函数。③系统辨识（System Identification）——用真实数据校准仿真器参数，缩小sim-to-real gap。④渐进式复杂度——先在简单仿真中训练，逐步增加随机性和复杂度。⑤安全RL——在真实环境部署时加安全层（约束策略输出范围、人工监督、紧急停止）。常用算法：SAC（样本效率高）、TD3（精确控制）、PPO（稳定易调）。OpenAI的机械臂解魔方（2019）是sim-to-real的经典成功案例。`,
    tags: ["机器人", "sim-to-real", "域随机化", "安全约束"],
  },
  {
    id: "drl-applications-3",
    chapter: "drl-applications",
    level: 2,
    question: `RLHF如何将强化学习应用于大语言模型对齐？它的三个阶段是什么？`,
    answer:
      `RLHF（Reinforcement Learning from Human Feedback）将RL应用于大语言模型（LLM）对齐，使LLM输出更符合人类偏好。三个阶段：①监督微调（SFT, Supervised Fine-Tuning）——用人工编写的高质量问答对微调预训练模型，得到初始策略 π_SFT。这一步让模型学会「回答问题」的基本格式和能力。②奖励模型训练（Reward Model）——收集人类偏好数据：对同一个问题，让模型生成多个回答，人类标注员对回答排序（A>B>C）。用这些排序数据训练一个奖励模型 r_φ(x, y)（x是问题，y是回答），目标是学习人类的偏好函数。奖励模型通常用LLM架构（去掉解码头换成标量输出）。③RL微调（RL Fine-Tuning）——用PPO优化LLM策略 π_θ，目标最大化奖励模型的评分：max E[r_φ(x, y)]，同时加KL散度惩罚项 β·KL(π_θ || π_SFT)，防止策略偏离SFT太远（避免「奖励hack」——模型学会骗奖励模型但输出垃圾文本）。每步：LLM生成回答→奖励模型打分→PPO更新LLM参数。RLHF的成功：ChatGPT/GPT-4/Claude等均使用RLHF对齐，使LLM从「能生成文本」变为「有用、诚实、无害的助手」。RLHF的核心洞察：人类偏好难以用规则定义，但可以通过比较排序学习——RL天然适合这种「只有反馈信号、没有标准答案」的场景。`,
    tags: ["RLHF", "大语言模型", "对齐", "PPO", "三阶段"],
  },
  {
    id: "drl-applications-4",
    chapter: "drl-applications",
    level: 3,
    question: `工业部署深度RL系统的完整流程是什么？从仿真到上线需要经过哪些步骤？`,
    answer:
      `工业部署深度RL系统的完整流程：①需求分析——明确任务目标（什么算「成功」）、动作空间（离散/连续）、状态空间（传感器数据）、约束条件（安全/延迟/成本）、性能指标（成功率/效率/鲁棒性）。②仿真环境搭建——选择/开发高保真仿真器（如Isaac Gym/MuJoCo/Carla），实现reset/step接口，定义状态编码、动作映射、奖励函数。先实现随机策略验证环境正确性。③算法选择——根据任务特性选算法（离散→PPO/DQN，连续→SAC/TD3/PPO），定义网络结构（MLP/CNN/Transformer）。④大规模训练——并行数据采集（向量化环境/分布式Worker），监控训练曲线（回报、loss、Q值），超参调优（学习率、网络深度、batch size、探索参数）。用TensorBoard/W&B记录。⑤域随机化——随机化仿真参数提升鲁棒性，渐进增加环境复杂度（课程学习）。⑥sim-to-real迁移——域适应/微调，用少量真实数据校准。⑦安全验证——离线评估（在测试集上评估成功率/安全性）、对抗测试（极端场景）、A/B测试（与现有系统对比）。⑧部署——模型压缩（量化/蒸馏）、推理优化（TensorRT）、监控系统（在线性能指标、异常检测）、回滚机制。⑨持续迭代——收集线上数据→发现失败案例→更新奖励/环境→重新训练→验证→部署。关键挑战：仿真保真度、安全保证、在线学习 vs 稳定性、延迟约束（实时控制需<10ms）、可解释性。工业RL不是一次性训练，而是持续的「数据→训练→部署→反馈」循环。`,
    tags: ["工业部署", "完整流程", "sim-to-real", "持续迭代"],
  },
];
