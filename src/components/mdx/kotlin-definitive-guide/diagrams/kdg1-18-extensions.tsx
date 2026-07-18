import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "18. Extensions",
  "Defining Extension Functions",
  "Defining an extension on a superclass",
  "Generic Extension Functions",
  "Extension Properties",
  "Extensions on Nullable Types",
  "Extensions, Under the Hood",
  "Extracting to Extensions",
  "Defining an Extensions File",
  "Renaming an Extension",
  "Extensions in the Kotlin Standard Library",
  "For the More Curious: Function Literals with Receivers",
  "Challenge: toDragonSpeak Extension",
  "Challenge: Frame Extension"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="18. Extensions" focus="掌握扩展函数与属性的静态分派、泛型与可空接收者、文件组织、重命名和带接收者函数字面量" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="18. Extensions" focus="认为扩展真正修改了类或可以覆盖成员的动态分派" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="18. Extensions" focus="静态分派实验、可空扩展、导入别名、标准库对照和两个挑战实现" nodes={nodes} />; }
