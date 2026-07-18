import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "5. Debugging Android Apps",
  "Exceptions and Stack Traces",
  "Android-Specific Debugging",
  "Challenge: Exploring the Layout Inspector",
  "Challenge: Exploring the Profiler"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第5章 Debugging Android Apps" focus="从症状、异常栈和最后可信边界定位问题，并组合断点、Lint、Layout Inspector与Profiler" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第5章 Debugging Android Apps" focus="从症状、异常栈和最后可信边界定位问题，并组合断点、Lint、Layout Inspector与Profiler" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第5章 Debugging Android Apps" focus="故障复现步骤、最小失败输入、栈帧解释和修复回归测试" nodes={nodes} />; }
