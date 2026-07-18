import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "5. Anonymous Functions and the Function Type",
  "Anonymous Functions",
  "The function type",
  "Implicit returns",
  "Function arguments",
  "The it keyword",
  "Accepting multiple arguments",
  "Type Inference Support",
  "Defining a Function That Accepts a Function",
  "Shorthand syntax",
  "Function Inlining",
  "Function References",
  "Function Type as Return Type",
  "For the More Curious: Kotlin’s Lambdas Are Closures",
  "For the More Curious: Lambdas vs Anonymous Inner Classes"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="5. Anonymous Functions and the Function Type" focus="把函数当值传递，理解函数类型、闭包、内联、引用以及高阶函数的输入输出合同" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="5. Anonymous Functions and the Function Type" focus="闭包意外捕获可变状态，导致调用顺序影响结果" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="5. Anonymous Functions and the Function Type" focus="函数类型标注、捕获变量实验、内联对照、引用调用和多参数测试" nodes={nodes} />; }
