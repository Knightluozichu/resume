import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "18. Accessibility",
  "TalkBack",
  "Making Non-Text Elements Readable by TalkBack",
  "Creating a Comparable Experience",
  "For the More Curious: Using Accessibility Scanner",
  "Challenge: Improving the List",
  "Challenge: Providing Enough Context for Data Entry",
  "Challenge: Announcing Events"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第18章 Accessibility" focus="从TalkBack探索、焦点顺序、内容描述和等价任务完成度验证无障碍体验" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第18章 Accessibility" focus="从TalkBack探索、焦点顺序、内容描述和等价任务完成度验证无障碍体验" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第18章 Accessibility" focus="TalkBack操作脚本、Scanner问题单、列表与表单上下文修复、事件播报测试" nodes={nodes} />; }
