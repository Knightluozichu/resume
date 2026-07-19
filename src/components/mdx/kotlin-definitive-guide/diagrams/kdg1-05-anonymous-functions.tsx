import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "5. Anonymous Functions and the Function Type";
const focus =
  "把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同";
const stages = ["声明合同", "建立输入", "执行转换", "观察产物", "断言回归"];
const nodes = [
  {
    label: "5. Anonymous Functions and the Function Type",
    stage: "声明合同",
    mechanism:
      "5. Anonymous Functions and the Function Type服务于把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试必须能区分语法缩短与合同改变。",
    probe:
      "5. Anonymous Functions and the Function Type使用函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Anonymous Functions",
    stage: "建立输入",
    mechanism:
      "Anonymous Functions服务于把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试必须能区分语法缩短与合同改变。",
    probe:
      "Anonymous Functions使用函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "The function type",
    stage: "执行转换",
    mechanism:
      "The function type服务于把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试必须能区分语法缩短与合同改变。",
    probe:
      "The function type使用函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Implicit returns",
    stage: "观察产物",
    mechanism:
      "Implicit returns服务于把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成独立复核。",
    probe:
      "Implicit returns使用函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Function arguments",
    stage: "断言回归",
    mechanism:
      "Function arguments服务于把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试必须能区分语法缩短与合同改变。",
    probe:
      "Function arguments使用函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "The it keyword",
    stage: "声明合同",
    mechanism:
      "The it keyword服务于把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成独立复核。",
    probe:
      "The it keyword使用函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Accepting multiple arguments",
    stage: "建立输入",
    mechanism:
      "Accepting multiple arguments服务于把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成独立复核。",
    probe:
      "Accepting multiple arguments使用函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Type Inference Support",
    stage: "执行转换",
    mechanism:
      "Type Inference Support服务于把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试是否支持对象不变量。",
    probe:
      "Type Inference Support使用函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Defining a Function That Accepts a Function",
    stage: "观察产物",
    mechanism:
      "Defining a Function That Accepts a Function服务于把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试必须能区分语法缩短与合同改变。",
    probe:
      "Defining a Function That Accepts a Function使用函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Shorthand syntax",
    stage: "断言回归",
    mechanism:
      "Shorthand syntax服务于把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成独立复核。",
    probe:
      "Shorthand syntax使用函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Function Inlining",
    stage: "声明合同",
    mechanism:
      "Function Inlining服务于把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试必须能区分语法缩短与合同改变。",
    probe:
      "Function Inlining使用函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Function References",
    stage: "建立输入",
    mechanism:
      "Function References服务于把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试必须能区分语法缩短与合同改变。",
    probe:
      "Function References使用函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Function Type as Return Type",
    stage: "执行转换",
    mechanism:
      "Function Type as Return Type服务于把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试必须能区分语法缩短与合同改变。",
    probe:
      "Function Type as Return Type使用函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Kotlin’s Lambdas Are Closures",
    stage: "观察产物",
    mechanism:
      "For the More Curious: Kotlin’s Lambdas Are Closures服务于把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试必须能区分语法缩短与合同改变。",
    probe:
      "For the More Curious: Kotlin’s Lambdas Are Closures使用函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Lambdas vs Anonymous Inner Classes",
    stage: "断言回归",
    mechanism:
      "For the More Curious: Lambdas vs Anonymous Inner Classes服务于把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试必须能区分语法缩短与合同改变。",
    probe:
      "For the More Curious: Lambdas vs Anonymous Inner Classes使用函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "闭包意外捕获可变状态，导致调用顺序影响结果",
  evidence: "函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试",
  boundary:
    "把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同的最小合法输入与第一个非法输入",
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
