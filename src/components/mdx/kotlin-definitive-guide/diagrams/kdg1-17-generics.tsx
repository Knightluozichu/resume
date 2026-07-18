import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "17. Generics",
  "Defining Generic Types",
  "Generic Functions",
  "Multiple Generic Type Parameters",
  "Generic Constraints",
  "vararg and get",
  "in and out",
  "For the More Curious: The reified Keyword"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="17. Generics" focus="通过泛型类型、函数、多个参数、约束、vararg、get、in/out与reified表达类型安全复用" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="17. Generics" focus="忽略方差方向，令可写容器暴露不安全的类型替换" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="17. Generics" focus="类型参数角色表、约束失败、生产者消费者实验、运行时类型检查和调用样例" nodes={nodes} />; }
