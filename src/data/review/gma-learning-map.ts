import type { ReviewQuestion } from "./types";

export const gmaLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "gma-learning-map-1",
    chapter: "gma-learning-map",
    level: 1,
    question: "《游戏机制：高级游戏设计技术》全书的核心结构是什么？",
    answer: "全书围绕「机制设计 → Machinations 框架 → 模拟系统 → 经济与概率 → 谜题设计 → 机制调优」展开。呈「理解机制结构 → 可视化反馈 → 模拟验证 → 数值调优」的递进结构。核心主线：从机制到涌现行为再到可调平衡。",
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "gma-learning-map-2",
    chapter: "gma-learning-map",
    level: 2,
    question: "Machinations 框架在全书中的角色是什么？为什么它是核心工具？",
    answer: "Machinations 是一种可视化游戏内部经济和反馈结构的图表语言。它是全书的核心工具，因为它让设计师能「看见」机制如何产生动态行为——资源如何流动、反馈如何形成。通过 Machinations 图，设计师可以在写代码前就分析游戏的反馈结构，预测潜在的滚雪球或停滞问题，并用模拟快速验证设计假设。",
    tags: ["Machinations", "核心工具"],
  },
  {
    id: "gma-learning-map-3",
    chapter: "gma-learning-map",
    level: 3,
    question: "为什么不能跳过模拟直接学调优？",
    answer: "调优需要数据支撑。没有模拟就无法快速获取大量对局数据（如胜率分布、策略使用率、游戏时长），只能靠人肉试玩——慢且样本量不足。模拟让你在改一个参数后立刻跑 1000 局看效果，将调优从「凭感觉」变成「数据驱动」。跳过模拟学调优，等于没有尺子就开始裁衣服。",
    tags: ["学习路径", "模拟", "调优"],
  },
  {
    id: "gma-learning-map-4",
    chapter: "gma-learning-map",
    level: 4,
    question: "用全书的工具链分析一个 ARPG 的经济系统，说明从机制到调优的完整流程。",
    answer: "1. 识别机制：金币掉落（水龙头）、装备升级消耗（水槽）、材料合成（转换器）。2. 画 Machinations 图：水龙头→玩家资源池→转换器（材料→装备）→水槽（升级消耗），标注产出率和消耗率。3. 模拟：跑 1000 局，观察金币积累曲线是否通货膨胀（产出&gt;消耗）或通货紧缩（消耗&gt;产出）。4. 分析数据：如果 80% 玩家在第 5 关金币溢出，说明水龙头过强。5. 调优：降低掉落率 15%，重新模拟，观察金币曲线是否收敛到合理区间。6. 迭代直到产出≈消耗，且不同玩法路线（刷怪流/任务流）的金币收入相近。",
    tags: ["综合分析", "经济系统", "Machinations", "调优"],
  },
];
