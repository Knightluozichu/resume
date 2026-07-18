import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第8章 进程控制",
  label: "进程模型",
  color: "#1d4ed8",
  soft: "#dbeafe",
  chain: [
    "创建子进程",
    "区分父子分支",
    "替换映像",
    "等待状态",
    "检查凭证",
    "回收子进程",
  ],
  concepts: [
    "第8章 进程控制",
    "8.1 引言",
    "8.2 进程标识",
    "8.3 函数fork",
    "8.4 函数vfork",
    "8.5 函数exit",
    "8.6 函数wait和waitpid",
    "8.7 函数waitid",
    "8.8 函数wait3和wait4",
    "8.9 竞争条件",
    "8.10 函数exec",
    "8.11 更改用户ID和更改组ID",
    "8.12 解释器文件",
    "8.13 函数system",
    "8.14 进程会计",
    "8.15 用户标识",
    "8.16 进程调度",
    "8.17 进程时间",
    "8.18 小结",
  ],
} as const;

export function UapProcessControlMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapProcessControlExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapProcessControlEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
