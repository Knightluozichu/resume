import {
  KdgContractLab,
  KdgCoverageLab,
  KdgRecoveryLab,
  type KdgCausalModel,
  type KdgCoverageNode,
} from "./official-kdg1-book-lab";

const title = "1. Your First Kotlin Application";
const focus =
  "从IntelliJ项目、Kotlin文件、main入口和REPL贯通源码、字节码与JVM执行";
const stages = ["声明合同", "建立输入", "执行转换", "观察产物", "断言回归"];
const nodes = [
  {
    label: "1. Your First Kotlin Application",
    stage: "声明合同",
    mechanism:
      "1. Your First Kotlin Application服务于从IntelliJ项目、Kotlin文件、main入口和REPL贯通源码、字节码与JVM执行。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录完成独立复核。",
    probe:
      "1. Your First Kotlin Application使用IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Installing IntelliJ IDEA",
    stage: "建立输入",
    mechanism:
      "Installing IntelliJ IDEA服务于从IntelliJ项目、Kotlin文件、main入口和REPL贯通源码、字节码与JVM执行。保存工具链版本、源码、编译命令、产物和退出状态，使IDE按钮之外仍能解释源码如何进入JVM；IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录承担复现责任。",
    probe:
      "Installing IntelliJ IDEA使用IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Your First Kotlin Project",
    stage: "执行转换",
    mechanism:
      "Your First Kotlin Project服务于从IntelliJ项目、Kotlin文件、main入口和REPL贯通源码、字节码与JVM执行。保存工具链版本、源码、编译命令、产物和退出状态，使IDE按钮之外仍能解释源码如何进入JVM；IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录承担复现责任。",
    probe:
      "Your First Kotlin Project使用IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Creating your first Kotlin file",
    stage: "观察产物",
    mechanism:
      "Creating your first Kotlin file服务于从IntelliJ项目、Kotlin文件、main入口和REPL贯通源码、字节码与JVM执行。保存工具链版本、源码、编译命令、产物和退出状态，使IDE按钮之外仍能解释源码如何进入JVM；IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录承担复现责任。",
    probe:
      "Creating your first Kotlin file使用IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Running your Kotlin file",
    stage: "断言回归",
    mechanism:
      "Running your Kotlin file服务于从IntelliJ项目、Kotlin文件、main入口和REPL贯通源码、字节码与JVM执行。把接收者、参数、返回值、捕获状态和副作用逐项展开，再判断简写是否保持相同求值顺序；IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录必须能区分语法缩短与合同改变。",
    probe:
      "Running your Kotlin file使用IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Compilation and execution of Kotlin/JVM code",
    stage: "声明合同",
    mechanism:
      "Compilation and execution of Kotlin/JVM code服务于从IntelliJ项目、Kotlin文件、main入口和REPL贯通源码、字节码与JVM执行。保存工具链版本、源码、编译命令、产物和退出状态，使IDE按钮之外仍能解释源码如何进入JVM；IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录承担复现责任。",
    probe:
      "Compilation and execution of Kotlin/JVM code使用IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "The Kotlin REPL",
    stage: "建立输入",
    mechanism:
      "The Kotlin REPL服务于从IntelliJ项目、Kotlin文件、main入口和REPL贯通源码、字节码与JVM执行。保存工具链版本、源码、编译命令、产物和退出状态，使IDE按钮之外仍能解释源码如何进入JVM；IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录承担复现责任。",
    probe:
      "The Kotlin REPL使用IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Why Use IntelliJ?",
    stage: "执行转换",
    mechanism:
      "For the More Curious: Why Use IntelliJ?服务于从IntelliJ项目、Kotlin文件、main入口和REPL贯通源码、字节码与JVM执行。把这个目录坐标翻译成一个可执行或可判定合同，明确输入、状态变化、可见结果和反例，并以IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录完成独立复核。",
    probe:
      "For the More Curious: Why Use IntelliJ?使用IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "For the More Curious: Targeting the JVM",
    stage: "观察产物",
    mechanism:
      "For the More Curious: Targeting the JVM服务于从IntelliJ项目、Kotlin文件、main入口和REPL贯通源码、字节码与JVM执行。保存工具链版本、源码、编译命令、产物和退出状态，使IDE按钮之外仍能解释源码如何进入JVM；IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录承担复现责任。",
    probe:
      "For the More Curious: Targeting the JVM使用IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录完成出现、解释、实验和练习四级核对",
  },
  {
    label: "Challenge: REPL Arithmetic",
    stage: "断言回归",
    mechanism:
      "Challenge: REPL Arithmetic服务于从IntelliJ项目、Kotlin文件、main入口和REPL贯通源码、字节码与JVM执行。先把题目改写成输入、输出、约束和失败样例，再运行正常、边界与非法三组断言；挑战完成的证据是IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录，不是一次示例输出。",
    probe:
      "Challenge: REPL Arithmetic使用IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录完成出现、解释、实验和练习四级核对",
  },
] satisfies KdgCoverageNode[];
const model = {
  historicalLabel: "Kotlin 1.2 / JVM 时代基线",
  currentLabel: "当前 Kotlin 迁移对照",
  invariant:
    "从IntelliJ项目、Kotlin文件、main入口和REPL贯通源码、字节码与JVM执行的输入、类型边界、求值结果和失败路径都能由独立读者重放",
  fault: "只依赖IDE绿色运行按钮而不知道编译产物与目标JVM",
  evidence: "IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录",
  boundary:
    "从IntelliJ项目、Kotlin文件、main入口和REPL贯通源码、字节码与JVM执行的最小合法输入与第一个非法输入",
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
