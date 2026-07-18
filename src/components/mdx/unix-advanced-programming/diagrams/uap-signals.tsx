import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第10章 信号",
  label: "信号与线程",
  color: "#b45309",
  soft: "#fef3c7",
  chain: [
    "安装处置",
    "阻塞信号",
    "制造未决",
    "原子等待",
    "处理有效载荷",
    "恢复掩码",
  ],
  concepts: [
    "第10章 信号",
    "10.1 引言",
    "10.2 信号概念",
    "10.3 函数signal",
    "10.4 不可靠的信号",
    "10.5 中断的系统调用",
    "10.6 可重入函数",
    "10.7 SIGCLD语义",
    "10.8 可靠信号术语和语义",
    "10.9 函数kill和raise",
    "10.10 函数alarm和pause",
    "10.11 信号集",
    "10.12 函数sigprocmask",
    "10.13 函数sigpending",
    "10.14 函数sigaction",
    "10.15 函数sigsetjmp和siglongjmp",
    "10.16 函数sigsuspend",
    "10.17 函数abort",
    "10.18 函数system",
    "10.19 函数sleep、nanosleep和clock_nanosleep",
    "10.20 函数sigqueue",
    "10.21 作业控制信号",
    "10.22 信号名和编号",
    "10.23 小结",
  ],
} as const;

export function UapSignalsMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapSignalsExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapSignalsEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
