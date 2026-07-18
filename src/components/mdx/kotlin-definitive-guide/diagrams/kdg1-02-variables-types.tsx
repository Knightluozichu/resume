import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "2. Variables, Constants, and Types",
  "Types",
  "Declaring a Variable",
  "Kotlin’s Built-In Types",
  "Read-Only Variables",
  "Type Inference",
  "Compile-Time Constants",
  "Inspecting Kotlin Bytecode",
  "For the More Curious: Java Primitive Types in Kotlin",
  "Challenge: hasSteed",
  "Challenge: The Unicorn’s Horn",
  "Challenge: Magic Mirror"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="2. Variables, Constants, and Types" focus="用val、var、显式类型、类型推断与const建立编译期可检查的状态边界" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="2. Variables, Constants, and Types" focus="把val误解为对象深度不可变，或把类型推断误解为动态类型" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="2. Variables, Constants, and Types" focus="类型表、可变性表、编译失败样例、常量字节码与推断记录" nodes={nodes} />; }
