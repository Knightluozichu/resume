import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "10. Lists and Sets",
  "Lists",
  "Accessing a list’s elements",
  "Index boundaries and safe index access",
  "Checking the contents of a list",
  "Changing a list’s contents",
  "Iteration",
  "Reading a File into a List",
  "Destructuring",
  "Sets",
  "Creating a set",
  "Adding elements to a set",
  "while Loops",
  "The break Expression",
  "Collection Conversion",
  "For the More Curious: Array Types",
  "For the More Curious: Read-Only vs Immutable",
  "Challenge: Formatted Tavern Menu",
  "Challenge: Advanced Formatted Tavern Menu"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="10. Lists and Sets" focus="区分只读接口与不可变对象，掌握索引、遍历、文件读取、解构、集合转换、while与break" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="10. Lists and Sets" focus="把只读引用当作深度不可变，或在遍历期间修改共享集合" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="10. Lists and Sets" focus="集合所有权图、越界实验、去重结果、文件样本和菜单格式断言" nodes={nodes} />; }
