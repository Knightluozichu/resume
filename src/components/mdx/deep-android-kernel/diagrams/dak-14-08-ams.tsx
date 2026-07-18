import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第8章 管理Activity和组件运行状态的系统进程——ActivityManagerService（AMS）",
  "8.1 AMS功能概述",
  "8.2 管理当前系统中Activity状态——Activity Stack",
  "8.3 startActivity流程",
  "8.4 完成同一任务的集合——Activity Task",
  "8.4.1 后进先出——Last In, First Out",
  "8.4.2 管理Activity Task"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第8章 ActivityManagerService（AMS）" focus="从AMS职责进入Activity Stack、startActivity和Activity Task的状态管理" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第8章 ActivityManagerService（AMS）" focus="把startActivity视作单进程函数调用，忽略任务匹配、Binder往返与进程尚未存在的分支" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第8章 ActivityManagerService（AMS）" focus="Intent输入、Binder调用、ActivityRecord、栈顶变化、任务身份、LIFO与失败返回" nodes={nodes}/>;}
