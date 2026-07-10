import { ReviewQuestion } from "./types";

export const dltOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "dlt-optimization-1",
    chapter: "dlt-optimization",
    level: 1,
    question: `SGD 与全批量梯度下降的区别是什么？为什么深度学习用 mini-batch SGD？`,
    answer:
      `区别：全批量梯度下降每步用全部 N 个样本计算精确梯度，方向准确但每步计算量大。SGD 每步用 1 个样本估计梯度，快但噪声极大。Mini-batch SGD 每步用 m 个样本（通常 32-256）估计梯度，在精度和速度间平衡。深度学习用 mini-batch SGD 的原因：①计算效率——每步只需处理 m 个样本而非全部 N 个，速度快 N/m 倍，可利用 GPU 并行。②噪声有益——mini-batch 梯度是全梯度的噪声估计，帮助跳出鞍点和尖锐局部最小值（尖锐最小值泛化差，平坦最小值泛化好）。③内存效率——全批量需将所有数据加载到内存/GPU。④收敛性好——在凸问题中有收敛保证，在非凸深度学习中实践中效果好。batch size 通常 32-256。`,
    tags: ["SGD", "mini-batch", "梯度下降", "噪声"],
  },
  {
    id: "dlt-optimization-2",
    chapter: "dlt-optimization",
    level: 2,
    question: `动量法的原理是什么？它与普通 SGD 相比有什么优势？`,
    answer:
      `动量法在 SGD 基础上累积历史梯度方向：v = mu*v - eta*grad，theta = theta + v。动量系数 mu（通常 0.9）控制历史信息的保留比例，v 是历史梯度的指数加权移动平均。与普通 SGD 的优势：①加速收敛——在一致梯度方向上，动量累积使有效步长增大（最多 1/(1-mu)=10 倍），加速通过平坦区域。②减少振荡——在梯度反复振荡的方向（如病态曲面的窄沟方向），动量的累积平均使正负梯度部分抵消，有效步长减小。③更稳定的路径——动量平滑了梯度方向的剧烈变化，像物理中的惯性使小球滚动更平稳。直觉：普通 SGD 每步只看当前坡度（无记忆），动量法像有惯性的小球——在长坡上加速，在沟壑中振荡减弱。Nesterov 动量是变体，先沿动量方向前瞻一步再计算梯度。`,
    tags: ["动量法", "SGD", "Nesterov", "指数加权平均"],
  },
  {
    id: "dlt-optimization-3",
    chapter: "dlt-optimization",
    level: 3,
    question: `Adam 优化器结合了哪些思想？它为什么成为最常用的优化器？`,
    answer:
      `Adam 结合了动量法和 RMSProp 的思想：①动量——维护梯度的一阶矩 s = beta1*s + (1-beta1)*grad，累积历史梯度方向。②自适应学习率——维护梯度的二阶矩 r = beta2*r + (1-beta2)*grad^2，根据梯度大小自适应调节每个参数的学习率。③偏差校正——s_hat = s/(1-beta1^t), r_hat = r/(1-beta2^t)，补偿初始零矩的偏差。更新公式 theta <- theta - eta * s_hat / (sqrt(r_hat) + epsilon)。成为最常用优化器的原因：①效果好——自适应学习率+动量的组合兼顾速度和稳定性。②对超参数不敏感——默认 beta1=0.9, beta2=0.999 在大多数场景适用。③可扩展——适用于从小模型到大模型的各种规模。AdamW 是修正版，正确解耦权重衰减和自适应学习率，在现代大模型训练中更常用。`,
    tags: ["Adam", "动量", "RMSProp", "自适应学习率", "AdamW"],
  },
  {
    id: "dlt-optimization-4",
    chapter: "dlt-optimization",
    level: 4,
    question: `为什么深度学习使用一阶方法而非二阶方法？学习率调度为什么重要？`,
    answer:
      `用一阶方法而非二阶方法的原因：①计算不可行——二阶方法需计算 Hessian 矩阵（N×N，N 是参数量），深度网络参数量百万到千亿级，Hessian 有 10^12 到 10^20 个元素无法存储。②求逆不可行——牛顿法需求逆 Hessian（O(N^3)），计算量天文数字。③非凸不适用——二阶方法理论保证主要在凸优化中，深度学习损失非凸，二阶方法可能收敛到鞍点（Hessian 不正定）。④一阶已足够——SGD/Adam 每步只需 O(N) 计算，配合 GPU 并行效果很好。学习率调度重要的原因：学习率是最重要的超参数——太大训练发散（梯度爆炸），太小收敛缓慢。好的策略是先用较大学习率快速下降（穿越平坦区域和跳出鞍点），再逐步减小精细调整（在最小值附近精细收敛）。Warmup + 余弦退火是现代大模型训练的标准组合。`,
    tags: ["一阶方法", "二阶方法", "Hessian", "学习率调度", "Warmup"],
  },
];
