import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "13. Dialogs",
  "Creating a DialogFragment",
  "Passing Data Between Two Fragments",
  "Challenge: More Dialogs"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第13章 Dialogs" focus="用DialogFragment托管对话框生命周期，并通过明确目标和结果合同在Fragment间传值" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第13章 Dialogs" focus="用DialogFragment托管对话框生命周期，并通过明确目标和结果合同在Fragment间传值" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第13章 Dialogs" focus="日期对话框、返回值协议、旋转恢复和更多对话框挑战" nodes={nodes} />; }
