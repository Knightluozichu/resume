import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "21. Styles and Themes",
  "Color Resources",
  "Styles",
  "Themes",
  "Adding Theme Colors",
  "Overriding Theme Attributes",
  "Modifying Button Attributes",
  "For the More Curious: More on Style Inheritance",
  "For the More Curious: Accessing Theme Attributes"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第21章 Styles and Themes" focus="分清局部Style、层级继承、Theme与theme attribute的解析链" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第21章 Styles and Themes" focus="分清局部Style、层级继承、Theme与theme attribute的解析链" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第21章 Styles and Themes" focus="颜色与样式资源图、主题覆盖测试、按钮属性差异和继承追踪" nodes={nodes} />; }
