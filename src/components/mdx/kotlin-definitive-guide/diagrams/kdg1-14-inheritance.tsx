import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "14. Inheritance",
  "Defining the Room Class",
  "Creating a Subclass",
  "Type Checking",
  "The Kotlin Type Hierarchy",
  "Type casting",
  "Smart casting",
  "For the More Curious: Any"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="14. Inheritance" focus="理解默认final、open继承、覆盖、类型检查、类型层次、显式转换与智能转换" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="14. Inheritance" focus="仅为复用代码建立继承，导致子类破坏父类合同" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="14. Inheritance" focus="类型层次图、替换测试、转换失败样例、Any边界和Room子类实验" nodes={nodes} />; }
