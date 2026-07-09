import { ReviewQuestion } from "../types";

export const rlcPracticalApplicationsQuestions: ReviewQuestion[] = [
  {
    id: "rlc-practical-applications-1",
    chapter: "rlc-practical-applications",
    level: 1,
    question: "Q-Learning、DQN、Policy Gradient、Actor-Critic四种方法分别适合什么场景？简述选型原则。",
    answer:
      "四种方法适用场景与选型原则：①Q-Learning——适合状态空间小且离散的场景（如GridWorld、简单棋盘游戏）。选型信号：状态可用整数索引枚举，动作离散且少。优点是简单稳定、实现容易（C语言几十行代码），缺点是无法扩展到大状态空间。②DQN——适合状态连续或高维但动作离散的场景（如CartPole、Atari游戏）。选型信号：状态是连续向量或图像，动作可枚举。优点是能处理大状态空间，缺点是训练不稳定需调参（经验回放、目标网络、学习率）。③Policy Gradient——适合动作连续的场景（如机器人关节控制、自动驾驶方向盘角度）。选型信号：动作是连续值或高维。优点是天然支持连续动作、能学随机策略，缺点是方差大收敛慢、on-policy样本效率低。④Actor-Critic——适合需要兼顾连续动作和训练稳定性的复杂场景（如MuJoCo机器人、复杂控制）。选型信号：动作连续且任务复杂，纯PG方差太大。优点是优势函数降方差收敛快，缺点是实现复杂（需同时训练两个网络）。选型决策树：状态离散小→Q-Learning；状态连续+动作离散→DQN；动作连续→PG（简单任务）或Actor-Critic/PPO（复杂任务）。",
    tags: ["方法选型", "适用场景", "决策树"],
  },
  {
    id: "rlc-practical-applications-2",
    chapter: "rlc-practical-applications",
    level: 2,
    question: "在C语言实现RL算法时，内存管理有哪些关键注意事项？如何用固定大小数组替代动态分配？",
    answer:
      "C语言RL实现的内存管理注意事项：①固定大小数组优先——教学和嵌入式场景中，用编译时常量定义数组大小 `#define MAX_STATES 1000 #define MAX_ACTIONS 10 double q_table[MAX_STATES][MAX_ACTIONS];`，避免动态分配的开销和内存泄漏风险。缺点是浪费空间，但现代内存充足可接受。②环形缓冲区实现经验回放——`#define BUFFER_SIZE 10000`，用 `int idx = 0; idx = (idx + 1) % BUFFER_SIZE;` 循环写入，无需malloc/free。③神经网络参数用静态三维数组——`#define MAX_LAYERS 5 #define MAX_NEURONS 100 double W[MAX_LAYERS][MAX_NEURONS][MAX_NEURONS]; double b[MAX_LAYERS][MAX_NEURONS];`，虽然浪费空间（大部分未用），但避免指针间接寻址，缓存友好、访问快。④状态存储用一维数组——`double states[BUFFER_SIZE * STATE_DIM]`，而非二维数组 `double states[BUFFER_SIZE][STATE_DIM]`，因为C语言二维数组在函数传参时退化为指针，维度信息丢失，一维数组用 `states[i * STATE_DIM + j]` 索引更可控。⑤避免碎片化——RL训练是长时间运行的过程，频繁malloc/free会导致内存碎片。用预分配的固定数组从源头避免。⑥数值类型统一用double——C语言中float精度可能不足（Q值累积、梯度连乘），double更安全。⑦初始化——所有数组必须显式初始化（`memset`或循环置零），C语言不保证自动清零。",
    tags: ["C语言内存管理", "固定数组", "环形缓冲区"],
  },
  {
    id: "rlc-practical-applications-3",
    chapter: "rlc-practical-applications",
    level: 2,
    question: "如何评估一个RL算法的训练效果？需要监控哪些指标？",
    answer:
      "RL算法评估指标与监控：①平均回报（Average Return）——最核心指标，每N个episode计算平均累积奖励，应随训练单调上升并收敛。C语言：每episode累加reward，每100episode打印平均值。注意：训练时用ε-贪心（含探索），评估时应关闭探索（ε=0）看真实策略表现。②收敛速度——达到目标回报所需的episode数或环境交互步数，衡量样本效率。对比算法时固定环境，看谁更快达标。③稳定性——收敛后回报的方差/标准差。好的算法收敛后回报稳定在高值；差的算法可能剧烈震荡。可用滑动窗口标准差衡量。④学习曲线形状——理想曲线平滑上升后平稳；若剧烈震荡可能是学习率过大；若长期不涨可能是探索不足或奖励稀疏；若先涨后降可能是过拟合或Q值发散。⑤Q值/策略熵监控——DQN中监控max Q值是否异常膨胀（过估计）；PG中监控策略熵是否过早坍缩（丧失探索）。⑥行为可视化——定期打印/保存策略轨迹，在GridWorld中打印每步位置，在CartPole中打印杆角度，直观判断策略是否合理。⑦泛化能力——在未见过的初始状态上测试，评估是否过拟合训练分布。⑧对比基线——与随机策略、固定策略对比，确认学到的策略确实优于基线。C语言实现：用文件输出日志 `fprintf(log, "%d %f %f\\n", episode, avg_return, std_return);`，后期用Python/gnuplot画图。",
    tags: ["评估指标", "学习曲线", "监控", "收敛性"],
  },
  {
    id: "rlc-practical-applications-4",
    chapter: "rlc-practical-applications",
    level: 3,
    question: "用C语言从零实现RL/DL相比用Python框架（PyTorch），在工程和教育上各有什么优劣？何时该用哪种？",
    answer:
      "C语言从零实现 vs Python框架的优劣：工程优势（Python框架）：①自动微分——PyTorch自动算梯度，C语言需手动推导+实现每层梯度公式，易出错。②GPU加速——PyTorch一行 `.cuda()` 用GPU，C语言需手写CUDA或OpenCL。③生态丰富——预置优化器（Adam）、层类型（Conv/LSTM）、数据加载器。④调试工具——张量监控、可视化集成。工程优势（C语言）：①无依赖——编译后独立运行，适合嵌入式/边缘设备（机器人、IoT）。②内存可控——固定大小数组，无GC停顿，实时性保证。③性能透明——缓存命中率、分支预测可优化到极致。④代码量小——教学版DQN可能几百行C vs PyTorch也几百行但依赖庞大。教育优势（C语言）：①强制理解底层——手动实现矩阵乘法、梯度计算、Q表更新，无黑盒，真正理解「算法在算什么」。②暴露数值问题——溢出、梯度消失/爆炸 firsthand体验，理解为什么需要各种trick。③建立直觉——「神经网络就是一堆矩阵乘法和激活函数」「反向传播就是链式法则的循环」，去掉框架的抽象层。④可迁移——理解C语言实现后，用PyTorch时每个API都知道底层在做什么。教育优势（Python框架）：①快速原型——几行代码跑通复杂模型，关注算法设计而非实现细节。②前沿复现——论文代码基本都是PyTorch。何时用哪种：学习阶段（本书目标）用C语言打地基，建立底层直觉；研究/生产阶段用Python框架快速迭代和规模化部署。理想路径是先C后Python——「知其然且知其所以然」。",
    tags: ["C语言 vs Python", "工程优劣", "教育价值", "选型建议"],
  },
];
