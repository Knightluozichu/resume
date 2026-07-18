import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "30. Custom Views and Touch Events",
  "Setting Up the DragAndDraw Project",
  "Creating a Custom View",
  "Handling Touch Events",
  "Rendering Inside onDraw(Canvas)",
  "For the More Curious: GestureDetector",
  "Challenge: Saving State",
  "Challenge: Rotating Boxes",
  "Challenge: Accessibility Support"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第30章 Custom Views and Touch Events" focus="把测量、触摸事件序列、Canvas绘制、手势和状态保存组织成自定义View合同" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第30章 Custom Views and Touch Events" focus="把测量、触摸事件序列、Canvas绘制、手势和状态保存组织成自定义View合同" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第30章 Custom Views and Touch Events" focus="DragAndDraw事件轨迹、绘制快照、旋转状态与无障碍测试" nodes={nodes} />; }
