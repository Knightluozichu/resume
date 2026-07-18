import { OfficialWindowsKernelLab } from "./official-windows-kernel-lab";

const data = {
  title: "《Windows内核编程》全书总复习",
  label: "全书 · 隔离验收",
  color: "#1d4ed8",
  soft: "#eff6ff",
  chain: [
    "恢复干净快照",
    "构建签名驱动",
    "运行控制设备",
    "验证系统通知",
    "运行过滤项目",
    "注入故障并恢复",
  ],
  concepts: [
    "Windows内部基线",
    "开发与调试",
    "内核机制",
    "IRP与用户缓冲",
    "系统通知",
    "过滤、签名与验证",
  ],
} as const;

export function WkpOfficialFinalReviewMapLab() {
  return <OfficialWindowsKernelLab {...data} view="map" />;
}
export function WkpOfficialFinalReviewExperimentLab() {
  return <OfficialWindowsKernelLab {...data} view="experiment" />;
}
export function WkpOfficialFinalReviewEvidenceLab() {
  return <OfficialWindowsKernelLab {...data} view="evidence" />;
}
