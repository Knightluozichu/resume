import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "1. Your First Kotlin Application",
  "Installing IntelliJ IDEA",
  "Your First Kotlin Project",
  "Creating your first Kotlin file",
  "Running your Kotlin file",
  "Compilation and execution of Kotlin/JVM code",
  "The Kotlin REPL",
  "For the More Curious: Why Use IntelliJ?",
  "For the More Curious: Targeting the JVM",
  "Challenge: REPL Arithmetic"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="1. Your First Kotlin Application" focus="从IntelliJ项目、Kotlin文件、main入口和REPL贯通源码、字节码与JVM执行" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="1. Your First Kotlin Application" focus="只依赖IDE绿色运行按钮而不知道编译产物与目标JVM" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="1. Your First Kotlin Application" focus="IDE与JDK指纹、源码、编译命令、字节码检查和REPL记录" nodes={nodes} />; }
