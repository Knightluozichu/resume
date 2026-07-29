import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-07-multiprogramming",
  title: "第7章 多道程序设计：分离进程为独立的功能",
  question: "将抓取、解析、过滤与写入任务划分为可恢复的执行单元",
  nodes: ["任务划分", "IPC 选择", "背压传播", "局部失败", "恢复编排"],
  concepts: [
    "7. Multiprogramming",
    "Separating Complexity Control from Performance Tuning",
    "Taxonomy of Unix IPC Methods",
    "Handing off Tasks to Specialist Programs",
    "Pipes, Redirection, and Filters",
    "Wrappers",
    "Security Wrappers and Bernstein Chaining",
    "Slave Processes",
    "Peer-to-Peer Inter-Process Communication",
    "Problems and Methods to Avoid",
    "Obsolescent Unix IPC Methods",
    "Remote Procedure Calls",
    "Threads — Threat or Menace?",
    "Process Partitioning at the Design Level",
  ],
  actions: [
    {
      label: "收窄进程隔离",
      detail: "只改变进程隔离，保留协议边界与吞吐延迟的原始基线。",
    },
    {
      label: "显式化吞吐延迟",
      detail: "把吞吐延迟的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过失败传播",
      detail: "跳过失败传播直接追求资源所有权，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote: "当通信状态比业务状态更复杂时，应回退到库边界或重新划分职责。",
  faultNote:
    "拒绝原因：为共享内存速度引入线程，却没有为竞态、取消和资源所有权定义协议。",
} as const;

export function TaoupChapter07MultiprogrammingTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupChapter07MultiprogrammingRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupChapter07MultiprogrammingEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
