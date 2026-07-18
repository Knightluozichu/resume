import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "10. Creating User Interfaces with Layouts and Widgets",
  "Introducing ConstraintLayout",
  "Introducing the Graphical Layout Editor",
  "Using ConstraintLayout",
  "More on Layout Attributes",
  "For the More Curious: Margins vs Padding",
  "For the More Curious: New Developments in ConstraintLayout",
  "Challenge: Formatting the Date"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第10章 Creating User Interfaces with Layouts and Widgets" focus="用ConstraintLayout约束图、测量和属性来源解释界面，而不是只依赖编辑器拖拽" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第10章 Creating User Interfaces with Layouts and Widgets" focus="用ConstraintLayout约束图、测量和属性来源解释界面，而不是只依赖编辑器拖拽" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第10章 Creating User Interfaces with Layouts and Widgets" focus="约束图、动态列表项、边距与内边距对照、日期格式测试" nodes={nodes} />; }
