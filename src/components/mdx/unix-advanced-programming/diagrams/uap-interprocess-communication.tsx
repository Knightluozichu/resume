import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第15章 进程间通信",
  label: "进程间通信",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain: [
    "选择IPC语义",
    "创建端点",
    "交换消息",
    "施加背压",
    "模拟崩溃",
    "删除对象",
  ],
  concepts: [
    "第15章 进程间通信",
    "15.1 引言",
    "15.2 管道",
    "15.3 函数popen和pclose",
    "15.4 协同进程",
    "15.5 FIFO",
    "15.6 XSI IPC",
    "15.6.1 标识符和键",
    "15.6.2 权限结构",
    "15.6.3 结构限制",
    "15.6.4 优点和缺点",
    "15.7 消息队列",
    "15.8 信号量",
    "15.9 共享存储",
    "15.10 POSIX信号量",
    "15.11 客户进程-服务器进程属性",
    "15.12 小结",
  ],
} as const;

export function UapInterprocessCommunicationMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapInterprocessCommunicationExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapInterprocessCommunicationEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
