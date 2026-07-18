import { OfficialAdae15BookLab } from "./official-adae15-book-lab";

const nodes = [
  "第1章 Activity的生命周期和启动模式",
  "1.1 Activity的生命周期全面分析",
  "1.1.1 典型情况下的生命周期分析",
  "1.1.2 异常情况下的生命周期分析",
  "1.2 Activity的启动模式",
  "1.2.1 Activity的LaunchMode",
  "1.2.2 Activity的Flags",
  "1.3 IntentFilter的匹配规则"
];

export function AdaeFlowLab() { return <OfficialAdae15BookLab mode="flow" unitTitle="第1章 Activity的生命周期和启动模式" focus="从典型与异常生命周期、LaunchMode、Flags和IntentFilter建立Activity任务栈与状态恢复模型" nodes={nodes} />; }
export function AdaeFailureLab() { return <OfficialAdae15BookLab mode="failure" unitTitle="第1章 Activity的生命周期和启动模式" focus="把onDestroy当作必然回调，或把启动模式与Intent Flags混为同一层配置" nodes={nodes} />; }
export function AdaeEvidenceLab() { return <OfficialAdae15BookLab mode="evidence" unitTitle="第1章 Activity的生命周期和启动模式" focus="生命周期轨迹、任务栈快照、重建状态、启动矩阵和Intent匹配测试" nodes={nodes} />; }
