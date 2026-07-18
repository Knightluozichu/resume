import { OfficialWindowsKernelLab } from "./official-windows-kernel-lab";

const data = {
  title: "《Windows内核编程》权威学习地图",
  label: "全书 · 软件内核驱动",
  color: "#155e75",
  soft: "#ecfeff",
  chain: [
    "核对版本目录",
    "建立隔离环境",
    "完成基础驱动",
    "追踪IRP机制",
    "实现系统通知",
    "交付过滤项目",
  ],
  concepts: [
    "Introduction读者与样例",
    "Windows内部与开发起步",
    "基础驱动与调试",
    "内核机制与IRP",
    "通知回调",
    "文件系统过滤与验证",
  ],
} as const;

export function WkpOfficialLearningMapMapLab() {
  return <OfficialWindowsKernelLab {...data} view="map" />;
}
export function WkpOfficialLearningMapExperimentLab() {
  return <OfficialWindowsKernelLab {...data} view="experiment" />;
}
export function WkpOfficialLearningMapEvidenceLab() {
  return <OfficialWindowsKernelLab {...data} view="evidence" />;
}
