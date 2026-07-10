import { ReviewQuestion } from "./types";

export const dlrMonteCarloTdQuestions: ReviewQuestion[] = [
  {
    id: "dlr-monte-carlo-td-1",
    chapter: "dlr-monte-carlo-td",
    level: 1,
    question: `蒙特卡洛（MC）方法和时序差分（TD）方法的核心区别是什么？`,
    answer:
      `核心区别在于如何估计值函数：①蒙特卡洛（MC）——用完整 episode 的实际回报 G_t = r_{t+1} + gamma*r_{t+2} + ... + gamma^(T-t-1)*r_T 来更新值函数：V(s) ← V(s) + alpha[G_t - V(s)]。必须等 episode 结束才能更新，用的是无偏但方差大的完整回报。②时序差分（TD）——用一步实际奖励加下一步的估计值来更新：V(s) ← V(s) + alpha[r_{t+1} + gamma*V(s_{t+1}) - V(s)]。每步即可更新（在线学习），用 r + gamma*V(s') 作为 G_t 的近似（称为 TD 目标），有偏但方差小。关键差异总结：MC 用实际完整回报（无偏、高方差、需等结束），TD 用采样+自举（bootstrapping，有偏、低方差、在线更新）。TD 的自举——用当前 V 的估计值 V(s') 作为目标的一部分，形成「用估计更新估计」的递归结构。这是 TD 方差小的原因（只一步随机性），也是偏差来源（V(s') 可能不准）。`,
    tags: ["MC vs TD", "自举", "偏差与方差"],
  },
  {
    id: "dlr-monte-carlo-td-2",
    chapter: "dlr-monte-carlo-td",
    level: 2,
    question: `什么是 TD 误差（TD Error）？它在 TD 学习中起什么作用？`,
    answer:
      `TD 误差 delta_t = r_{t+1} + gamma * V(s_{t+1}) - V(s_t)。它衡量「新估计（r + gamma*V(s')）与旧估计 V(s) 的差值」，即当前值函数与新观测之间的偏差。TD 误差的作用：①学习信号——TD 更新公式 V(s) ← V(s) + alpha*delta_t，用 delta_t 作为梯度方向调整值函数。如果 delta_t > 0，说明实际比预期好（V 被低估），应增大 V(s)；如果 delta_t < 0，说明实际比预期差（V 被高估），应减小 V(s)。②无需等 episode 结束——delta_t 只需当前步的 r 和 s' 即可计算，使 TD 能在线学习。③自举结构——delta_t 中含 V(s_{t+1})（旧估计），形成递归传播：当 V(s_{t+1}) 更新后，后续访问 s_t 时 delta_t 也会变化，值信息逐步从终止状态向后传播。④控制算法的基础——Q 学习和 SARSA 的更新都基于 TD 误差：delta = r + gamma*Q(s',a') - Q(s,a)（SARSA）或 delta = r + gamma*max_a' Q(s',a') - Q(s,a)（Q学习）。TD 误差是连接预测与控制的桥梁。`,
    tags: ["TD误差", "学习信号", "自举"],
  },
  {
    id: "dlr-monte-carlo-td-3",
    chapter: "dlr-monte-carlo-td",
    level: 2,
    question: `什么是 n 步回报和 TD(lambda)？它们如何统一 MC 和 TD？`,
    answer:
      `n 步回报 G_t^(n) = r_{t+1} + gamma*r_{t+2} + ... + gamma^(n-1)*r_{t+n} + gamma^n * V(s_{t+n})——前 n 步用实际奖励，第 n 步之后用值函数估计。n 步 TD 更新：V(s_t) ← V(s_t) + alpha[G_t^(n) - V(s_t)]。统一关系：①n=1 → TD(0)：G_t^(1) = r_{t+1} + gamma*V(s_{t+1})，就是标准 TD。②n → episode 长度 → MC：G_t^(inf) = G_t（完整实际回报），就是蒙特卡洛。③中间的 n 在偏差与方差之间权衡——n 越大越接近 MC（无偏但方差大），n 越小越接近 TD（有偏但方差小）。TD(lambda)：不选单一 n，而是用 lambda 加权混合所有 n 步回报（lambda 在 [0,1]）。lambda=0 等价 TD(0)，lambda=1 等价 MC。TD(lambda) 的前向视角用 lambda-回报 G_t^lambda = (1-lambda)*sum_{n=1}^T lambda^(n-1) * G_t^(n)；后向视角用资格迹（eligibility traces）高效实现，每步增量更新。TD(lambda) 是 MC 和 TD 的连续统一体，实践中 lambda=0 或接近 0 最常用（简单有效），但资格迹在需要快速信用传播的任务中有优势。`,
    tags: ["n步回报", "TD(lambda)", "偏差方差权衡"],
  },
  {
    id: "dlr-monte-carlo-td-4",
    chapter: "dlr-monte-carlo-td",
    level: 3,
    question: `为什么 TD 方法在实践中比 MC 更常用？MC 在什么情况下更有优势？`,
    answer:
      `TD 比 MC 更常用的原因：①在线学习——TD 每步即可更新，无需等 episode 结束。在连续任务（无终止）或长 episode 中，MC 无法更新而 TD 可以。②低方差——TD 目标只含一步随机性（r 和 s'），MC 回报含整个 episode 的随机性累积，方差大导致学习慢。③自举加速——TD 用 V(s') 估计传播信息，即使 V(s') 尚未收敛也提供了有用的归纳偏置，通常收敛更快。④数据效率——TD 可在每步复用后续状态的信息，MC 每个 (s,a) 只用其对应的 G_t。MC 更有优势的情况：①Episode 必须完整才有意义——如棋类游戏的胜负只在结束时确定，中间奖励为零或误导性，TD 的自举可能传播错误值（V(s') 对胜负无预测力）。②不满足马尔可夫性质——MC 不自举（不依赖 V(s')），对非马尔可夫环境更鲁棒；TD 依赖 V(s') 的准确性，马尔可夫性被破坏时偏差更大。③离策略评估——某些 MC 变体（如重要性采样）在离策略设置下更灵活。实践中：TD（尤其 TD(0) 和 Q 学习）是主流，但 MC 在 episodic 任务、稀疏奖励、非马尔可夫场景中仍有价值。`,
    tags: ["TD优势", "MC优势", "实践选择"],
  },
];
