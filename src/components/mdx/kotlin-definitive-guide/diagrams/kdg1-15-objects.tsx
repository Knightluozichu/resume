import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "15. Objects",
  "The object Keyword",
  "Object declarations",
  "Object expressions",
  "Companion objects",
  "Nested Classes",
  "Data Classes",
  "toString",
  "equals",
  "copy",
  "Destructuring declarations",
  "Enumerated Classes",
  "Operator Overloading",
  "Exploring the World of NyetHack",
  "For the More Curious: Defining Structural Comparison",
  "For the More Curious: Algebraic Data Types",
  "Challenge: “Quit” Command",
  "Challenge: Implementing a World Map",
  "Challenge: Ring the Bell"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="15. Objects" focus="比较对象声明、对象表达式、伴生对象、嵌套类、数据类、枚举、解构与运算符重载" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="15. Objects" focus="把全局对象变成隐式可变状态，或重载运算符却违背读者直觉" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="15. Objects" focus="实例数量图、生成方法检查、equals合同、copy实验、命令模型和世界地图" nodes={nodes} />; }
