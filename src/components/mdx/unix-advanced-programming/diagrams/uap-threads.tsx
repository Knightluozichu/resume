import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第11章 线程",
  label: "信号与线程",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: [
    "创建线程",
    "声明共享状态",
    "选择同步原语",
    "等待条件",
    "跨越屏障",
    "终止回收",
  ],
  concepts: [
    "第11章 线程",
    "11.1 引言",
    "11.2 线程概念",
    "11.3 线程标识",
    "11.4 线程创建",
    "11.5 线程终止",
    "11.6 线程同步",
    "11.6.1 互斥量",
    "11.6.2 避免死锁",
    "11.6.3 函数pthread_mutex_timedlock",
    "11.6.4 读写锁",
    "11.6.5 带有超时的读写锁",
    "11.6.6 条件变量",
    "11.6.7 自旋锁",
    "11.6.8 屏障",
    "11.7 小结",
  ],
} as const;

export function UapThreadsMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapThreadsExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapThreadsEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
