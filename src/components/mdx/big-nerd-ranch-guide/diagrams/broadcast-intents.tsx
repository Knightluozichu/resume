import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "28. Broadcast Intents",
  "Regular Intents vs Broadcast Intents",
  "Filtering Foreground Notifications",
  "Receivers and Long-Running Tasks",
  "For the More Curious: Local Events",
  "For the More Curious: Limitations on Broadcast Receivers",
  "For the More Curious: Detecting the Visibility of Your Fragment"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第28章 Broadcast Intents" focus="比较普通Intent和广播，验证静态/动态Receiver、私有权限、有序结果与长任务限制" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第28章 Broadcast Intents" focus="比较普通Intent和广播，验证静态/动态Receiver、私有权限、有序结果与长任务限制" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第28章 Broadcast Intents" focus="前台通知过滤、广播权限表、有序结果轨迹、Receiver时限测试" nodes={nodes} />; }
