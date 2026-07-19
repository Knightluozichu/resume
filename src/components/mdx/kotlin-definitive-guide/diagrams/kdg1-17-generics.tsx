import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "17. Generics";
const focus =
  "通过泛型类型、函数、多个参数、约束、vararg、get、in/out与reified表达类型安全复用";
const stages = ["建立基线", "注入反例", "定位边界", "修复合同", "同输入复验"];
const nodes = [
  {
    label: "17. Generics",
    stage: "建立基线",
    mechanism:
      "17. Generics服务于通过泛型类型、函数、多个参数、约束、vararg、get、in/out与reified表达类型安全复用。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例是否支持对象不变量。",
    probe:
      "17. Generics使用类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Defining Generic Types",
    stage: "注入反例",
    mechanism:
      "Defining Generic Types服务于通过泛型类型、函数、多个参数、约束、vararg、get、in/out与reified表达类型安全复用。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例是否支持对象不变量。",
    probe:
      "Defining Generic Types使用类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Generic Functions",
    stage: "定位边界",
    mechanism:
      "Generic Functions服务于通过泛型类型、函数、多个参数、约束、vararg、get、in/out与reified表达类型安全复用。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例必须能区分语法缩短与合同改变。",
    probe:
      "Generic Functions使用类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Multiple Generic Type Parameters",
    stage: "修复合同",
    mechanism:
      "Multiple Generic Type Parameters服务于通过泛型类型、函数、多个参数、约束、vararg、get、in/out与reified表达类型安全复用。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例是否支持对象不变量。",
    probe:
      "Multiple Generic Type Parameters使用类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Generic Constraints",
    stage: "同输入复验",
    mechanism:
      "Generic Constraints服务于通过泛型类型、函数、多个参数、约束、vararg、get、in/out与reified表达类型安全复用。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例是否支持对象不变量。",
    probe:
      "Generic Constraints使用类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例完成出现、解释、实验和练习四级核对",
  },
  {
    label: "vararg and get",
    stage: "建立基线",
    mechanism:
      "vararg and get服务于通过泛型类型、函数、多个参数、约束、vararg、get、in/out与reified表达类型安全复用。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例完成独立复核。",
    probe:
      "vararg and get使用类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例完成出现、解释、实验和练习四级核对",
  },
  {
    label: "in and out",
    stage: "注入反例",
    mechanism:
      "in and out服务于通过泛型类型、函数、多个参数、约束、vararg、get、in/out与reified表达类型安全复用。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例是否支持对象不变量。",
    probe:
      "in and out使用类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: The reified Keyword",
    stage: "定位边界",
    mechanism:
      "For the More Curious: The reified Keyword服务于通过泛型类型、函数、多个参数、约束、vararg、get、in/out与reified表达类型安全复用。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例是否支持对象不变量。",
    probe:
      "For the More Curious: The reified Keyword使用类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "通过泛型类型、函数、多个参数、约束、vararg、get、in/out与reified表达类型安全复用的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "忽略方差方向，令可写容器暴露不安全的类型替换",
  evidence:
    "类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例",
  boundary:
    "通过泛型类型、函数、多个参数、约束、vararg、get、in/out与reified表达类型安全复用的最小合法输入与第一个非法输入",
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
