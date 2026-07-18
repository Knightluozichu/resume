import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "12. Defining Classes",
  "Defining a Class",
  "Constructing Instances",
  "Class Functions",
  "Visibility and Encapsulation",
  "Class Properties",
  "Property getters and setters",
  "Property visibility",
  "Computed properties",
  "Refactoring NyetHack",
  "Using Packages",
  "For the More Curious: A Closer Look at var and val Properties",
  "For the More Curious: Guarding Against Race Conditions",
  "For the More Curious: Package Private"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="12. Defining Classes" focus="通过类、实例、函数、可见性、属性访问器、计算属性和包建立封装边界" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="12. Defining Classes" focus="把数据暴露为可变公共属性，再期待调用者自行维护不变量" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="12. Defining Classes" focus="对象职责表、属性不变量、可见性测试、包结构和竞态条件说明" nodes={nodes} />; }
