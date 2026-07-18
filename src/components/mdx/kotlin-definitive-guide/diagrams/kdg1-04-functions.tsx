import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "4. Functions",
  "Extracting Code to Functions",
  "Anatomy of a Function",
  "Function header",
  "Visibility modifier",
  "Function name declaration",
  "Function parameters",
  "Function return type",
  "Function body",
  "Function scope",
  "Calling a Function",
  "Refactoring to Functions",
  "Writing Your Own Functions",
  "Default Arguments",
  "Single-Expression Functions",
  "Unit Functions",
  "Named Function Arguments",
  "For the More Curious: The Nothing Type",
  "For the More Curious: File-Level Functions in Java",
  "For the More Curious: Function Overloading",
  "For the More Curious: Function Names in Backticks",
  "Challenge: Single-Expression Functions",
  "Challenge: Fireball Inebriation Level",
  "Challenge: Inebriation Status"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="4. Functions" focus="以签名、参数、返回类型、作用域和可见性设计可组合函数，并用默认值与命名参数表达调用意图" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="4. Functions" focus="用默认参数隐藏必填业务事实，或让Unit函数承担不可见副作用" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="4. Functions" focus="函数合同、调用样例、边界测试、作用域图和重构前后对照" nodes={nodes} />; }
