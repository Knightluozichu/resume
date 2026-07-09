import { ReviewQuestion } from "../types";

export const rlcEnvironmentsQuestions: ReviewQuestion[] = [
  {
    id: "rlc-environments-1",
    chapter: "rlc-environments",
    level: 1,
    question: "在C语言中如何设计一个统一的RL环境接口？为什么需要统一接口？",
    answer:
      "统一RL环境接口设计：`typedef struct { void* state; double reward; int done; } EnvStep; typedef struct { int state_dim; int action_dim; void* internal; } Env; void env_reset(Env* e); EnvStep env_step(Env* e, int action);`。reset()将环境重置到初始状态并返回初始state；step()接收动作，执行一步转移，返回新状态、奖励、是否终止。统一接口的原因：①算法解耦——Q-Learning、DQN、Policy Gradient都只需调用reset和step，无需知道环境内部逻辑。换环境只需改Env实现，算法代码不变，实现「一套算法跑多个环境」。②实验对比——同一接口下可公平比较不同算法在相同环境上的表现。③可扩展性——新环境只需实现接口即可接入现有训练框架。C语言中用void* state指向不同环境的状态结构（GridWorld用int索引，CartPole用double[4]数组），或用函数指针实现类似OOP的多态。本书的统一训练循环：`env_reset(&env); while (!done) { a = agent_act(s); step = env_step(&env, a); agent_learn(...); s = step.state; }`，agent和环境完全解耦。",
    tags: ["环境接口", "C语言设计", "解耦"],
  },
  {
    id: "rlc-environments-2",
    chapter: "rlc-environments",
    level: 2,
    question: "GridWorld环境的C语言实现中，状态、动作、奖励如何定义？为什么它是Q-Learning的理想测试环境？",
    answer:
      "GridWorld环境定义：①状态——网格位置 `(row, col)`，可用整数索引 `s = row * n_cols + col` 编码，如4×4网格有16个状态。②动作——4个离散动作 {上(0), 下(1), 左(2), 右(3)}。③状态转移——移动到相邻格子，若碰到墙壁则留在原地。④奖励——到达目标G给+1（或+10），落入陷阱H给-1（或-10），普通移动给小负奖励（如-0.01）鼓励快速到达。⑤终止——到达G或H时done=1。C语言实现：`EnvStep gridworld_step(Env* e, int action) { int* pos = (int*)e->internal; int new_row = pos[0] + dr[action]; int new_col = pos[1] + dc[action]; // 边界检查、奖励计算、终止判断... }`。GridWorld是Q-Learning理想测试环境的原因：①状态空间小且离散——16个状态完全可以用Q表 `double q[16][4]` 存储，无需神经网络。②问题清晰——最短路径问题，有明确最优解，易于验证算法正确性。③可可视化——网格可直接打印到终端，直观看到策略学到了什么。④含关键挑战——有陷阱（负奖励）需要避开，有延迟奖励（到达目标才给正奖励），测试信用分配能力。⑤快速迭代——C语言跑数千episode只需几秒，便于调试和超参数搜索。",
    tags: ["GridWorld", "离散状态", "Q-Learning测试"],
  },
  {
    id: "rlc-environments-3",
    chapter: "rlc-environments",
    level: 2,
    question: "CartPole环境的状态、动作、奖励是什么？为什么它需要DQN而非Q-Learning？",
    answer:
      "CartPole环境（杆车平衡）：①状态——4维连续向量 `[x, ẋ, θ, θ̇]`，分别是小车位置、小车速度、杆的角度、杆的角速度。②动作——2个离散动作 {向左推(0), 向右推(1)}。③奖励——每存活一步给+1。④终止——杆角度超过阈值（如±12°）、小车位置超出范围（如±2.4）、或存活超过500步。需要DQN而非Q-Learning的原因：状态空间连续——`[x, ẋ, θ, θ̇]` 每个维度都是实数，有无穷多个可能状态，Q表无法枚举存储。若强行离散化（如每维分10桶），状态数 `10^4 = 10000`，但离散化丢失精度且维度增长会指数爆炸（维度灾难）。DQN用神经网络 `Q(s,a;θ)` 近似连续状态到Q值的映射，输入4维连续状态，输出2个动作的Q值，只需存储网络参数（几百个浮点数）。这也是为什么CartPole是深度RL的经典入门环境——状态连续但低维（4维），动作离散且少（2个），训练快（几百episode收敛），能清晰展示「NN替代Q表」的价值。C语言实现：环境step做物理模拟（欧拉法积分运动方程），DQN部分用ch5的NeuralNetwork结构体。",
    tags: ["CartPole", "连续状态", "DQN", "维度灾难"],
  },
  {
    id: "rlc-environments-4",
    chapter: "rlc-environments",
    level: 3,
    question: "在RL实验中，如何设计奖励函数？稀疏奖励和密集奖励各有什么优缺点？",
    answer:
      "奖励函数设计原则：①目标对齐——奖励应引导智能体达成真正目标，避免「奖励黑客」（reward hacking，智能体找到漏洞获取高奖励但未完成任务）。②稀疏 vs 密集的权衡。稀疏奖励：只在目标达成时给奖励（如GridWorld只在到达终点给+1），其余为0或小负值。优点：目标明确，不会误导智能体；不需人工设计中间奖励。缺点：学习困难——智能体随机探索很难偶然碰到奖励，无法获得学习信号（尤其大状态空间），训练极慢甚至不收敛。密集奖励：每步都给反馈（如CartPole每步+1，或距离目标的负距离作为奖励）。优点：学习信号丰富，梯度明确，收敛快。缺点：可能引入偏差——如用「距离目标」做奖励，智能体可能学到「原地打转」等非预期行为；人工设计成本高，需领域知识。③奖励塑形（Reward Shaping）——在稀疏奖励基础上加人工设计的中间奖励 `r' = r + γ·Φ(s') - Φ(s)`（势函数法），理论保证不改变最优策略。④实践建议：先从稀疏奖励开始验证环境正确性；若不收敛再逐步加密集奖励或塑形；监控奖励曲线和实际行为（录像/打印轨迹）防止reward hacking。C语言实现中奖励就是env_step返回的double值，改奖励函数只需改几行代码，但影响巨大。",
    tags: ["奖励设计", "稀疏奖励", "密集奖励", "奖励塑形"],
  },
];
