import { OfficialWindowsKernelLab } from "./official-windows-kernel-lab";

const data = {
  title: "第8章 进程和线程通知",
  label: "第8章 · 进程线程映像",
  color: "#4d7c0f",
  soft: "#f7fee7",
  chain: [
    "注册通知回调",
    "捕获创建退出",
    "复制稳定字段",
    "写入有界队列",
    "客户端读取",
    "注销并排空",
  ],
  concepts: [
    "第8章 进程和线程通知",
    "8.1 进程通知",
    "8.2 实现进程通知",
    "8.2.1 DriverEntry例程",
    "8.2.2 处理进程退出通知",
    "8.2.3 处理进程创建通知",
    "8.3 将数据提供给用户模式",
    "8.4 线程通知",
    "8.5 映像加载通知",
    "8.7 总结",
  ],
} as const;

export function Wkp08ProcessThreadNotificationsMapLab() {
  return <OfficialWindowsKernelLab {...data} view="map" />;
}
export function Wkp08ProcessThreadNotificationsExperimentLab() {
  return <OfficialWindowsKernelLab {...data} view="experiment" />;
}
export function Wkp08ProcessThreadNotificationsEvidenceLab() {
  return <OfficialWindowsKernelLab {...data} view="evidence" />;
}
