import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "9. Standard Functions",
  "apply",
  "let",
  "run",
  "with",
  "also",
  "takeIf",
  "takeUnless",
  "Using Standard Library Functions"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="9. Standard Functions" focus="按返回接收者还是闭包结果、参数名是this还是it，选择apply、let、run、with、also与takeIf" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="9. Standard Functions" focus="为追求链式写法嵌套作用域函数，令接收者与返回值失去可读性" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="9. Standard Functions" focus="标准函数决策表、等价展开、链路断点、空值实验和副作用审计" nodes={nodes} />; }
