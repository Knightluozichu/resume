import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "6. Your Second Activity",
  "Setting Up a Second Activity",
  "Starting an Activity",
  "Passing Data Between Activities",
  "How Android Sees Your Activities",
  "Challenge: Closing Loopholes for Cheaters",
  "Challenge: Tracking Cheat Status by Question"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第6章 Your Second Activity" focus="以显式Intent和extra建立Activity边界，正确返回结果并防止作弊状态漏洞" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第6章 Your Second Activity" focus="以显式Intent和extra建立Activity边界，正确返回结果并防止作弊状态漏洞" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第6章 Your Second Activity" focus="双Activity合同、Intent extra表、结果回传与重建测试" nodes={nodes} />; }
