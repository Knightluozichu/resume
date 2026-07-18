import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "23. More About Intents and Tasks",
  "Setting Up NerdLauncher",
  "Resolving an Implicit Intent",
  "Creating Explicit Intents at Runtime",
  "Tasks and the Back Stack",
  "Using NerdLauncher as a Home Screen",
  "For the More Curious: Processes vs Tasks",
  "For the More Curious: Concurrent Documents",
  "Challenge: Icons"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="第23章 More About Intents and Tasks" focus="从隐式Intent解析到运行时显式Intent，观察任务、返回栈、Home角色和进程的不同边界" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="第23章 More About Intents and Tasks" focus="从隐式Intent解析到运行时显式Intent，观察任务、返回栈、Home角色和进程的不同边界" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="第23章 More About Intents and Tasks" focus="NerdLauncher、解析结果、任务栈轨迹、Home恢复和图标挑战" nodes={nodes} />; }
