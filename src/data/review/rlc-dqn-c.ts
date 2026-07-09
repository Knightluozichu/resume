import { ReviewQuestion } from "../types";

export const rlcDqnCQuestions: ReviewQuestion[] = [
  {
    id: "rlc-dqn-c-1",
    chapter: "rlc-dqn-c",
    level: 1,
    question: "DQN相比Q-Learning解决了什么问题？核心改进是什么？",
    answer:
      "Q-Learning用Q表存储值函数，只能处理离散且小规模的状态空间（如4×4网格世界只有16个状态）。当状态空间变大（如CartPole的连续状态 `[x, ẋ, θ, θ̇]` 有无穷多个值）或高维（如Atari游戏的像素输入），Q表无法存储所有状态。DQN（Deep Q-Network）的核心改进是用神经网络替代Q表作为函数近似器 `Q(s,a;θ) ≈ Q*(s,a)`，输入状态s，输出每个动作的Q值。这样只需存储网络参数θ（几千到几百万个浮点数），就能覆盖任意大的状态空间。但直接将NN接入Q-Learning会导致训练不稳定（序列数据相关、目标值不断变化），因此DQN引入两个关键技巧：①经验回放（Experience Replay）——将转移 `(s,a,r,s')` 存入缓冲区，训练时随机采样打破时序相关性，且一条经验可多次复用。②目标网络（Target Network）——用独立的网络计算TD目标 `r + γ max Q_target(s',a')`，参数θ⁻定期从主网络复制，使目标值在一段时间内稳定，避免「追着自己影子跑」的震荡。这两点使DQN成为第一个在复杂任务上稳定训练的深度RL算法。",
    tags: ["DQN", "函数近似", "经验回放", "目标网络"],
  },
  {
    id: "rlc-dqn-c-2",
    chapter: "rlc-dqn-c",
    level: 2,
    question: "DQN的损失函数是什么？为什么需要目标网络？目标网络的参数如何更新？",
    answer:
      "DQN损失函数：`L(θ) = E_{(s,a,r,s')~D} [ (y - Q(s,a;θ))² ]`，其中TD目标 `y = r + γ · max_a' Q(s',a';θ⁻)`，θ是主网络参数，θ⁻是目标网络参数，D是经验回放缓冲区。这本质是回归问题——让Q网络的预测逼近TD目标。需要目标网络的原因：如果用同一个网络Q(s,a;θ)同时计算预测值和目标值 `r + γ max Q(s',a';θ)`，每次更新θ后目标值也变了，相当于「追逐移动的靶子」，导致训练发散。目标网络Q(s',a';θ⁻)的参数θ⁻固定不变（一段时间内），使目标值稳定，回归问题可收敛。目标网络参数更新方式：①硬更新（原版DQN）——每隔C步（如1000步）将主网络参数完整复制到目标网络 `θ⁻ ← θ`，中间保持不变。②软更新（DQN改进）——每步小步幅更新 `θ⁻ ← τ·θ + (1-τ)·θ⁻`（τ很小如0.001），平滑过渡。C语言实现：维护两个NeuralNetwork结构体 `Q_net` 和 `target_net`，硬更新就是 `memcpy(target_net.W, Q_net.W, sizeof(...))`，软更新需逐参数加权平均。",
    tags: ["损失函数", "目标网络", "参数更新"],
  },
  {
    id: "rlc-dqn-c-3",
    chapter: "rlc-dqn-c",
    level: 2,
    question: "经验回放缓冲区在C语言中如何实现？为什么需要随机采样？",
    answer:
      "经验回放缓冲区在C语言中通常用环形缓冲区（circular buffer）实现：`typedef struct { int capacity; int size; int idx; double* states; int* actions; double* rewards; double* next_states; int* dones; } ReplayBuffer;`。capacity是最大容量（如10000），idx是下一个写入位置，满了后从头部覆盖旧数据。存入：`buffer->states[idx*state_dim + i] = s[i]`，idx = (idx+1) % capacity。随机采样：生成minibatch个随机索引 `int idx = rand() % size`，取出对应经验。需要随机采样的原因：①打破时序相关性——连续的转移 `(s,a,r,s')` 高度相关（同一个episode内状态相近），直接用序列训练会使网络过拟合到局部轨迹。随机采样使minibatch内的经验来自不同时间步、不同episode，近似独立同分布（i.i.d.），满足SGD的假设。②提高数据效率——一条经验可以被多次采样训练，而非用完即弃。③平滑训练分布——缓冲区混合了旧策略（低ε时）和新策略（高ε时）的经验，防止策略剧烈变化时训练崩溃。C语言实现关键：用 `rand()` 生成随机索引，注意状态是连续的需用一维数组存 `states[idx*dim]` 而非二维数组以方便内存管理。",
    tags: ["经验回放", "环形缓冲区", "随机采样", "C语言实现"],
  },
  {
    id: "rlc-dqn-c-4",
    chapter: "rlc-dqn-c",
    level: 3,
    question: "DQN训练中可能出现Q值过估计（overestimation）问题，原因是什么？如何解决？",
    answer:
      "Q值过估计问题：DQN的TD目标用 `max_a' Q(s',a';θ⁻)`，由于Q值估计有噪声，取max会系统性地偏向高估——即估计的Q值比真实Q*偏大。原因：`E[max(Q_estimates)] ≥ max(E[Q_estimates])`（Jensen不等式），噪声使max操作偏向高估方向。随训练进行，高估的Q值通过贝尔曼方程传播到更多状态，导致Q值持续膨胀发散，策略变差。解决方案：①Double DQN——用主网络选动作、目标网络估值，解耦「选」和「评」。TD目标改为 `y = r + γ · Q_target(s', argmax_a' Q_main(s',a'); θ⁻)`，即用Q_main（最新、更准）选最优动作a*，再用Q_target（稳定）评估该动作的值。这样即使Q_main高估了某个动作，Q_target会给出更保守的评估，缓解过估计。C语言实现：先 `forward(Q_net, s', q_main_out); int best_a = argmax(q_main_out);` 再 `forward(target_net, s', q_target_out); double target_q = q_target_out[best_a];`。②Dueling DQN——将Q值分解为状态值V(s)和优势A(s,a) `Q(s,a) = V(s) + (A(s,a) - mean_a A(s,a))`，使网络分别学习「状态好不好」和「动作比平均好多少」，间接改善估计。③其他：Clipped Double Q-Learning（TD3中用两个Q网络取min）、降低学习率、限制Q值范围等。在C语言实现中，Double DQN只需多一次前向传播，改动小而效果好。",
    tags: ["过估计", "Double DQN", "Jensen不等式"],
  },
];
