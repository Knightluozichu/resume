import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第13章 守护进程",
  label: "守护进程与高级I/O",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "派生并脱离",
    "重设环境",
    "关闭描述符",
    "获取实例锁",
    "记录服务状态",
    "终止清理",
  ],
  concepts: [
    "第13章 守护进程",
    "13.1 引言",
    "13.2 守护进程的特征",
    "13.3 编程规则",
    "13.4 出错记录",
    "13.5 单实例守护进程",
    "13.6 守护进程的惯例",
    "13.7 客户进程-服务器进程模型",
    "13.8 小结",
  ],
} as const;

export function UapDaemonProcessesMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapDaemonProcessesExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapDaemonProcessesEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
