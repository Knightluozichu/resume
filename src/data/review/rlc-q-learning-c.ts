import { ReviewQuestion } from "../types";

export const rlcQLearningCQuestions: ReviewQuestion[] = [
  {
    id: "rlc-q-learning-c-1",
    chapter: "rlc-q-learning-c",
    level: 1,
    question: "Q-Learning中Q表的数据结构是什么？在C语言中如何表示？Q(s,a)的物理含义是什么？",
    answer:
      "Q表是一个二维表，行索引是状态s，列索引是动作a，表项Q(s,a)表示「在状态s下执行动作a后，遵循最优策略能获得的期望累积折扣回报」。在C语言中用二维数组表示：`double q_table[N_STATES][N_ACTIONS];`，其中N_STATES是状态总数，N_ACTIONS是动作总数。初始化通常全置零或小随机值。物理含义：Q值越大说明该状态-动作对越「好」，智能体在状态s选择 `argmax_a Q(s,a)` 即贪心策略。Q表是Q-Learning的「记忆」，随着训练不断更新，最终收敛到最优Q值 `Q*`，此时贪心策略就是最优策略。Q表的局限：只能处理离散且规模有限的状态/动作空间，因为表的大小是 `N_STATES × N_ACTIONS`，状态空间一大就会「维度灾难」，这正是DQN（ch5）用神经网络替代Q表的原因。",
    tags: ["Q表", "C语言数据结构", "维度灾难"],
  },
  {
    id: "rlc-q-learning-c-2",
    chapter: "rlc-q-learning-c",
    level: 2,
    question: "写出Q-Learning的更新公式，解释每个符号的含义和更新流程。",
    answer:
      "Q-Learning更新公式：`Q(s,a) ← Q(s,a) + α [ r + γ · max_a' Q(s',a') - Q(s,a) ]`。符号含义：①Q(s,a)——当前Q值（待更新）。②α——学习率 `∈ (0,1]`，控制更新步长。③r——执行动作a后获得的即时奖励。④γ——折扣因子 `∈ [0,1)`，权衡未来回报。⑤max_a' Q(s',a')——下一状态s'中所有动作的最大Q值（注意用的是下一状态的最优估计，而非实际采取的动作，这是Q-Learning off-policy的关键）。⑥中括号内 `r + γ max Q(s',a') - Q(s,a)` 称为TD误差（时序差分误差），即「TD目标 - 当前估计」。更新流程：①观察当前状态s。②用ε-贪心策略选动作a（ε概率随机探索，1-ε概率取max Q）。③执行动作a，环境返回r和s'。④计算TD目标 = r + γ max_a' Q(s',a')。⑤按公式更新Q(s,a)。⑥s ← s'，回到步骤①。Q-Learning是off-policy算法：更新用的是max（最优策略的估计），而实际行为用ε-贪心（探索策略），两者解耦。",
    tags: ["更新公式", "TD误差", "off-policy"],
  },
  {
    id: "rlc-q-learning-c-3",
    chapter: "rlc-q-learning-c",
    level: 2,
    question: "ε-贪心策略的作用是什么？为什么不直接用纯贪心策略？ε值应如何设置？",
    answer:
      "ε-贪心策略：以ε概率随机选择一个动作（探索 exploration），以1-ε概率选择Q值最大的动作（利用 exploitation）。作用是平衡「探索与利用」这一RL核心权衡。不能直接用纯贪心（ε=0）的原因：纯贪心会陷入局部最优——如果初始Q值不准确，智能体只会反复选当前看似最好的动作，永远不去尝试其他动作，可能错过真正更优的策略。例如GridWorld中若初始Q值全0，纯贪心会一直走第一个尝试到的方向。ε值设置：①通常从较大值（如0.3-1.0）开始，鼓励早期探索。②随训练逐渐衰减到较小值（如0.01-0.05），后期转向利用已学知识。③衰减方式可以是线性（`ε = ε * decay`）或指数衰减。④不能衰减到0，需保留少量探索防止环境非平稳时策略僵化。C语言实现：`if ((double)rand()/RAND_MAX < epsilon) a = rand() % n_actions; else a = argmax(q_table[s]);`",
    tags: ["ε-贪心", "探索与利用", "衰减策略"],
  },
  {
    id: "rlc-q-learning-c-4",
    chapter: "rlc-q-learning-c",
    level: 3,
    question: "Q-Learning是off-policy算法，这与on-policy（如SARSA）有什么区别？对收敛性有什么影响？",
    answer:
      "off-policy与on-policy的区别在于「更新Q值时用的动作」与「实际执行的动作」是否一致：①Q-Learning（off-policy）——更新目标用 `max_a' Q(s',a')`，即假设下一步会采取最优动作，但实际行为用ε-贪心（可能随机）。更新目标来自「目标策略（贪心）」，行为来自「行为策略（ε-贪心）」，两者解耦。优点是能用旧经验（经验回放的基础），收敛到最优Q*。②SARSA（on-policy）——更新目标用 `Q(s',a')`，其中a'是实际执行的下一动作（ε-贪心选的）。更新目标来自「行为策略本身」。区别的核心影响：Q-Learning更激进（学最优），SARSA更保守（学当前行为策略的值）。在含陷阱的环境中（如Cliff Walking），Q-Learning学到最优路径（贴崖边走，但ε探索时可能掉崖，训练期间回报低），SARSA学到安全路径（离崖远走，考虑了探索风险，训练期间回报高）。收敛性：在表格情况下两者都收敛（Q-Learning到Q*，SARSA到当前策略的Q^π）；但Q-Learning方差更大（max操作过估计），SARSA更稳定。C语言实现差异仅在更新公式一行：Q-Learning用 `max_a' Q(s',a')`，SARSA用实际next_action的 `Q(s',next_a)`。",
    tags: ["off-policy", "on-policy", "收敛性", "SARSA对比"],
  },
];
