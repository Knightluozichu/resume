import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "2. Variables, Constants, and Types";
const focus = "用val、var、显式类型、类型推断与const建立编译期可检查的状态边界";
const stages = ["声明合同", "建立输入", "执行转换", "观察产物", "断言回归"];
const nodes = [
  {
    label: "2. Variables, Constants, and Types",
    stage: "声明合同",
    mechanism:
      "2. Variables, Constants, and Types服务于用val、var、显式类型、类型推断与const建立编译期可检查的状态边界。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查类型表、可变性表、编译失败样例、常量字节码与推断记录是否支持对象不变量。",
    probe:
      "2. Variables, Constants, and Types使用类型表、可变性表、编译失败样例、常量字节码与推断记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Types",
    stage: "建立输入",
    mechanism:
      "Types服务于用val、var、显式类型、类型推断与const建立编译期可检查的状态边界。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查类型表、可变性表、编译失败样例、常量字节码与推断记录是否支持对象不变量。",
    probe:
      "Types使用类型表、可变性表、编译失败样例、常量字节码与推断记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Declaring a Variable",
    stage: "执行转换",
    mechanism:
      "Declaring a Variable服务于用val、var、显式类型、类型推断与const建立编译期可检查的状态边界。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以类型表、可变性表、编译失败样例、常量字节码与推断记录完成独立复核。",
    probe:
      "Declaring a Variable使用类型表、可变性表、编译失败样例、常量字节码与推断记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Kotlin’s Built-In Types",
    stage: "观察产物",
    mechanism:
      "Kotlin’s Built-In Types服务于用val、var、显式类型、类型推断与const建立编译期可检查的状态边界。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查类型表、可变性表、编译失败样例、常量字节码与推断记录是否支持对象不变量。",
    probe:
      "Kotlin’s Built-In Types使用类型表、可变性表、编译失败样例、常量字节码与推断记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Read-Only Variables",
    stage: "断言回归",
    mechanism:
      "Read-Only Variables服务于用val、var、显式类型、类型推断与const建立编译期可检查的状态边界。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以类型表、可变性表、编译失败样例、常量字节码与推断记录完成独立复核。",
    probe:
      "Read-Only Variables使用类型表、可变性表、编译失败样例、常量字节码与推断记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Type Inference",
    stage: "声明合同",
    mechanism:
      "Type Inference服务于用val、var、显式类型、类型推断与const建立编译期可检查的状态边界。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查类型表、可变性表、编译失败样例、常量字节码与推断记录是否支持对象不变量。",
    probe:
      "Type Inference使用类型表、可变性表、编译失败样例、常量字节码与推断记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Compile-Time Constants",
    stage: "建立输入",
    mechanism:
      "Compile-Time Constants服务于用val、var、显式类型、类型推断与const建立编译期可检查的状态边界。保存工具链版本、源码、编译命令、产物和退出状态，使IDE按钮之外仍能解释源码如何进入JVM；类型表、可变性表、编译失败样例、常量字节码与推断记录承担复现责任。",
    probe:
      "Compile-Time Constants使用类型表、可变性表、编译失败样例、常量字节码与推断记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Inspecting Kotlin Bytecode",
    stage: "执行转换",
    mechanism:
      "Inspecting Kotlin Bytecode服务于用val、var、显式类型、类型推断与const建立编译期可检查的状态边界。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以类型表、可变性表、编译失败样例、常量字节码与推断记录完成独立复核。",
    probe:
      "Inspecting Kotlin Bytecode使用类型表、可变性表、编译失败样例、常量字节码与推断记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Java Primitive Types in Kotlin",
    stage: "观察产物",
    mechanism:
      "For the More Curious: Java Primitive Types in Kotlin服务于用val、var、显式类型、类型推断与const建立编译期可检查的状态边界。画出类型关系、状态拥有者、初始化时刻和允许替换，再用编译失败或替身实现挑战边界；验收时检查类型表、可变性表、编译失败样例、常量字节码与推断记录是否支持对象不变量。",
    probe:
      "For the More Curious: Java Primitive Types in Kotlin使用类型表、可变性表、编译失败样例、常量字节码与推断记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: hasSteed",
    stage: "断言回归",
    mechanism:
      "Challenge: hasSteed服务于用val、var、显式类型、类型推断与const建立编译期可检查的状态边界。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是类型表、可变性表、编译失败样例、常量字节码与推断记录，不是一次示例输出。",
    probe:
      "Challenge: hasSteed使用类型表、可变性表、编译失败样例、常量字节码与推断记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: The Unicorn’s Horn",
    stage: "声明合同",
    mechanism:
      "Challenge: The Unicorn’s Horn服务于用val、var、显式类型、类型推断与const建立编译期可检查的状态边界。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是类型表、可变性表、编译失败样例、常量字节码与推断记录，不是一次示例输出。",
    probe:
      "Challenge: The Unicorn’s Horn使用类型表、可变性表、编译失败样例、常量字节码与推断记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: Magic Mirror",
    stage: "建立输入",
    mechanism:
      "Challenge: Magic Mirror服务于用val、var、显式类型、类型推断与const建立编译期可检查的状态边界。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是类型表、可变性表、编译失败样例、常量字节码与推断记录，不是一次示例输出。",
    probe:
      "Challenge: Magic Mirror使用类型表、可变性表、编译失败样例、常量字节码与推断记录完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "用val、var、显式类型、类型推断与const建立编译期可检查的状态边界的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "把val误解为对象深度不可变，或把类型推断误解为动态类型",
  evidence: "类型表、可变性表、编译失败样例、常量字节码与推断记录",
  boundary:
    "用val、var、显式类型、类型推断与const建立编译期可检查的状态边界的最小合法输入与第一个非法输入",
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
