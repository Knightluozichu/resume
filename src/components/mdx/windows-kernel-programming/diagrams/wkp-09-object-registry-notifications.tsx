import { OfficialWindowsKernelLab } from "./official-windows-kernel-lab";

const data = {
  title: "第9章 对象和注册表通知",
  label: "第9章 · 对象与注册表",
  color: "#7e22ce",
  soft: "#faf5ff",
  chain: [
    "注册对象回调",
    "管理保护集合",
    "过滤句柄权限",
    "注册表前后观察",
    "客户端更新策略",
    "注销并等待回调",
  ],
  concepts: [
    "第9章 对象和注册表通知",
    "9.1 对象通知",
    "9.1.1 操作前回调",
    "9.1.2 操作后回调",
    "9.2 进程保护驱动程序",
    "9.2.1 对象通知注册",
    "9.2.2 管理受保护的进程",
    "9.2.3 操作前回调",
    "9.2.4 客户应用",
    "9.3 注册表通知",
    "9.3.1 处理操作前通知",
    "9.3.2 处理操作后回调",
    "9.3.3 性能考虑",
    "9.4 实现注册表通知",
    "9.4.1 处理注册表回调",
    "9.4.2 修改后的客户代码",
    "9.6 总结",
  ],
} as const;

export function Wkp09ObjectRegistryNotificationsMapLab() {
  return <OfficialWindowsKernelLab {...data} view="map" />;
}
export function Wkp09ObjectRegistryNotificationsExperimentLab() {
  return <OfficialWindowsKernelLab {...data} view="experiment" />;
}
export function Wkp09ObjectRegistryNotificationsEvidenceLab() {
  return <OfficialWindowsKernelLab {...data} view="evidence" />;
}
