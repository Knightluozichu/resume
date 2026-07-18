import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "27. WorkManager",
  "Creating a Worker",
  "Scheduling Work",
  "Checking for New Photos",
  "Notifying the User",
  "Providing User Control over Polling"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第27章 WorkManager" focus="以Worker、约束、唯一调度、通知和用户控制表达可延期可靠工作" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第27章 WorkManager" focus="以Worker、约束、唯一调度、通知和用户控制表达可延期可靠工作" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第27章 WorkManager" focus="轮询Worker、调度约束、重复任务控制、通知权限与取消测试" nodes={nodes} />; }
