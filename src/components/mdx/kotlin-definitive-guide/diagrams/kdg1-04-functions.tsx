import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "4. Functions";
const focus =
  "以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图";
const stages = ["声明合同", "建立输入", "执行转换", "观察产物", "断言回归"];
const nodes = [
  {
    label: "4. Functions",
    stage: "声明合同",
    mechanism:
      "4. Functions服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "4. Functions使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Extracting Code to Functions",
    stage: "建立输入",
    mechanism:
      "Extracting Code to Functions服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "Extracting Code to Functions使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Anatomy of a Function",
    stage: "执行转换",
    mechanism:
      "Anatomy of a Function服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "Anatomy of a Function使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Function header",
    stage: "观察产物",
    mechanism:
      "Function header服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "Function header使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Visibility modifier",
    stage: "断言回归",
    mechanism:
      "Visibility modifier服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以函数合同、调用样例、边界测试、作用域图和重构前后对照完成独立复核。",
    probe:
      "Visibility modifier使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Function name declaration",
    stage: "声明合同",
    mechanism:
      "Function name declaration服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "Function name declaration使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Function parameters",
    stage: "建立输入",
    mechanism:
      "Function parameters服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "Function parameters使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Function return type",
    stage: "执行转换",
    mechanism:
      "Function return type服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "Function return type使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Function body",
    stage: "观察产物",
    mechanism:
      "Function body服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "Function body使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Function scope",
    stage: "断言回归",
    mechanism:
      "Function scope服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "Function scope使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Calling a Function",
    stage: "声明合同",
    mechanism:
      "Calling a Function服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "Calling a Function使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Refactoring to Functions",
    stage: "建立输入",
    mechanism:
      "Refactoring to Functions服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "Refactoring to Functions使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Writing Your Own Functions",
    stage: "执行转换",
    mechanism:
      "Writing Your Own Functions服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "Writing Your Own Functions使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Default Arguments",
    stage: "观察产物",
    mechanism:
      "Default Arguments服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以函数合同、调用样例、边界测试、作用域图和重构前后对照完成独立复核。",
    probe:
      "Default Arguments使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Single-Expression Functions",
    stage: "断言回归",
    mechanism:
      "Single-Expression Functions服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "Single-Expression Functions使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Unit Functions",
    stage: "声明合同",
    mechanism:
      "Unit Functions服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "Unit Functions使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Named Function Arguments",
    stage: "建立输入",
    mechanism:
      "Named Function Arguments服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "Named Function Arguments使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: The Nothing Type",
    stage: "执行转换",
    mechanism:
      "For the More Curious: The Nothing Type服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查函数合同、调用样例、边界测试、作用域图和重构前后对照是否支持对象不变量。",
    probe:
      "For the More Curious: The Nothing Type使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: File-Level Functions in Java",
    stage: "观察产物",
    mechanism:
      "For the More Curious: File-Level Functions in Java服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "For the More Curious: File-Level Functions in Java使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Function Overloading",
    stage: "断言回归",
    mechanism:
      "For the More Curious: Function Overloading服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "For the More Curious: Function Overloading使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Function Names in Backticks",
    stage: "声明合同",
    mechanism:
      "For the More Curious: Function Names in Backticks服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数合同、调用样例、边界测试、作用域图和重构前后对照必须能区分语法缩短与合同改变。",
    probe:
      "For the More Curious: Function Names in Backticks使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Single-Expression Functions",
    stage: "建立输入",
    mechanism:
      "Challenge: Single-Expression Functions服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是函数合同、调用样例、边界测试、作用域图和重构前后对照，不是一次示例输出。",
    probe:
      "Challenge: Single-Expression Functions使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Fireball Inebriation Level",
    stage: "执行转换",
    mechanism:
      "Challenge: Fireball Inebriation Level服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是函数合同、调用样例、边界测试、作用域图和重构前后对照，不是一次示例输出。",
    probe:
      "Challenge: Fireball Inebriation Level使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Inebriation Status",
    stage: "观察产物",
    mechanism:
      "Challenge: Inebriation Status服务于以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是函数合同、调用样例、边界测试、作用域图和重构前后对照，不是一次示例输出。",
    probe:
      "Challenge: Inebriation Status使用函数合同、调用样例、边界测试、作用域图和重构前后对照完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "用默认参数隐藏必填业务事实，或让Unit函数承担不可见副作用",
  evidence: "函数合同、调用样例、边界测试、作用域图和重构前后对照",
  boundary:
    "以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图的最小合法输入与第一个非法输入",
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
