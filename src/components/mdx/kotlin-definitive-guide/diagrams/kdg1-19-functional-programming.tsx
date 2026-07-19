import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "19. Functional Programming Basics";
const focus =
  "用变换、过滤、合并和惰性Sequence构造透明数据管线，并通过评估定位代价";
const stages = ["固定初态", "施加动作", "推进状态", "观察差异", "复位重放"];
const nodes = [
  {
    label: "19. Functional Programming Basics",
    stage: "固定初态",
    mechanism:
      "19. Functional Programming Basics服务于用变换、过滤、合并和惰性Sequence构造透明数据管线，并通过评估定位代价。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试必须能区分语法缩短与合同改变。",
    probe:
      "19. Functional Programming Basics使用输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Function Categories",
    stage: "施加动作",
    mechanism:
      "Function Categories服务于用变换、过滤、合并和惰性Sequence构造透明数据管线，并通过评估定位代价。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试必须能区分语法缩短与合同改变。",
    probe:
      "Function Categories使用输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Transforms",
    stage: "推进状态",
    mechanism:
      "Transforms服务于用变换、过滤、合并和惰性Sequence构造透明数据管线，并通过评估定位代价。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试完成独立复核。",
    probe:
      "Transforms使用输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Filters",
    stage: "观察差异",
    mechanism:
      "Filters服务于用变换、过滤、合并和惰性Sequence构造透明数据管线，并通过评估定位代价。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试完成独立复核。",
    probe:
      "Filters使用输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Combines",
    stage: "复位重放",
    mechanism:
      "Combines服务于用变换、过滤、合并和惰性Sequence构造透明数据管线，并通过评估定位代价。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试完成独立复核。",
    probe:
      "Combines使用输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Why Functional Programming?",
    stage: "固定初态",
    mechanism:
      "Why Functional Programming?服务于用变换、过滤、合并和惰性Sequence构造透明数据管线，并通过评估定位代价。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试必须能区分语法缩短与合同改变。",
    probe:
      "Why Functional Programming?使用输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Sequences",
    stage: "施加动作",
    mechanism:
      "Sequences服务于用变换、过滤、合并和惰性Sequence构造透明数据管线，并通过评估定位代价。固定集合或数值样本，记录索引、类型、转换和求值次数，仅改变一个边界条件；由输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试判断只读、不可变、精度或惰性结论是否成立。",
    probe:
      "Sequences使用输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Profiling",
    stage: "推进状态",
    mechanism:
      "For the More Curious: Profiling服务于用变换、过滤、合并和惰性Sequence构造透明数据管线，并通过评估定位代价。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试完成独立复核。",
    probe:
      "For the More Curious: Profiling使用输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Arrow.kt",
    stage: "观察差异",
    mechanism:
      "For the More Curious: Arrow.kt服务于用变换、过滤、合并和惰性Sequence构造透明数据管线，并通过评估定位代价。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试完成独立复核。",
    probe:
      "For the More Curious: Arrow.kt使用输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Reversing the Values in a Map",
    stage: "复位重放",
    mechanism:
      "Challenge: Reversing the Values in a Map服务于用变换、过滤、合并和惰性Sequence构造透明数据管线，并通过评估定位代价。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试，不是一次示例输出。",
    probe:
      "Challenge: Reversing the Values in a Map使用输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Applying Functional Programming to Tavern.kt",
    stage: "固定初态",
    mechanism:
      "Challenge: Applying Functional Programming to Tavern.kt服务于用变换、过滤、合并和惰性Sequence构造透明数据管线，并通过评估定位代价。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试，不是一次示例输出。",
    probe:
      "Challenge: Applying Functional Programming to Tavern.kt使用输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Sliding Window",
    stage: "施加动作",
    mechanism:
      "Challenge: Sliding Window服务于用变换、过滤、合并和惰性Sequence构造透明数据管线，并通过评估定位代价。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试，不是一次示例输出。",
    probe:
      "Challenge: Sliding Window使用输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "用变换、过滤、合并和惰性Sequence构造透明数据管线，并通过评估定位代价的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "把链式调用等同函数式设计，却在lambda中修改外部状态",
  evidence: "输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试",
  boundary:
    "用变换、过滤、合并和惰性Sequence构造透明数据管线，并通过评估定位代价的最小合法输入与第一个非法输入",
} satisfies KdgCausalModel;
const props = { title, focus, stages, nodes, model };

export function KdgModelLab() {
  return <KdgCoverageLab {...props} />;
}

export function KdgFailureLab() {
  return <KdgContractLab {...props} />;
}

export function KdgEvidenceLab() {
  return <KdgRecoveryLab {...props} />;
}
