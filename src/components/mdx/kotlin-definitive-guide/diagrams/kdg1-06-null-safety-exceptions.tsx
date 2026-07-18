import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "6. Null Safety and Exceptions",
  "Nullability",
  "Kotlin’s Explicit Null Type",
  "Compile Time vs Runtime",
  "Null Safety",
  "Option one: the safe call operator",
  "Using safe calls with let",
  "Option two: the double-bang operator",
  "Option three: checking whether a value is null with if",
  "The null coalescing operator",
  "Exceptions",
  "Throwing an exception",
  "Custom exceptions",
  "Handling exceptions",
  "Preconditions",
  "Null: What Is It Good For?",
  "For the More Curious: Checked vs Unchecked Exceptions",
  "For the More Curious: How Is Nullability Enforced?"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="6. Null Safety and Exceptions" focus="用可空类型、安全调用、let、Elvis、先决条件与异常把缺失值和失败路径显式化" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="6. Null Safety and Exceptions" focus="用双感叹号绕过类型系统，或吞掉异常后伪装成功" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="6. Null Safety and Exceptions" focus="可空数据流图、三种处理策略、异常分类、失败测试和平台类型边界" nodes={nodes} />; }
