import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "第14章 MFC多线程程序设计",
  label: "第四篇 · 多线程",
  color: "#be123c",
  soft: "#fff1f2",
  chain: [
    "划分线程职责",
    "创建CWinThread",
    "传递不可变输入",
    "同步共享状态",
    "投递UI结果",
    "请求停止并等待",
  ],
  concepts: [
    "第14章 MFC多线程程序设计",
    "从操作系统层面看线程",
    "三个观念：模块、行程和线程",
    "线程优先级（Priority）",
    "线程调度（Scheduling）",
    "Thread Context",
    "从程序设计层面看线程",
    "Worker Threads和UI Threads",
    "错误观念",
    "正确态度",
    "MFC多线程程序设计",
    "探索CWinThread",
    "产生一个Worker Thread",
    "产生一个UI Thread",
    "线程的结束",
    "线程与同步控制",
    "MFC多线程程序例程",
  ],
} as const;

export function Mfc14MultithreadingMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function Mfc14MultithreadingExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function Mfc14MultithreadingEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
