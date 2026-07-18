import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第14章 高级I/O",
  label: "守护进程与高级I/O",
  color: "#1d4ed8",
  soft: "#dbeafe",
  chain: [
    "切换非阻塞",
    "注册兴趣",
    "等待就绪",
    "推进状态机",
    "处理短计数",
    "撤销映射",
  ],
  concepts: [
    "第14章 高级I/O",
    "14.1 引言",
    "14.2 非阻塞I/O",
    "14.3 记录锁",
    "14.4 I/O多路转接",
    "14.4.1 函数select和pselect",
    "14.4.2 函数poll",
    "14.5 异步I/O",
    "14.5.1 System V异步I/O",
    "14.5.2 bsd异步I/O",
    "14.5.3 POSIX异步I/O",
    "14.6 函数readv和writev",
    "14.7 函数readn和writen",
    "14.8 存储映射I/O",
    "14.9 小结",
  ],
} as const;

export function UapAdvancedIoMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapAdvancedIoExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapAdvancedIoEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
