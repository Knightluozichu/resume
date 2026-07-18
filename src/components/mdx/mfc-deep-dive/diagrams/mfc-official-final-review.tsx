import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "《深入浅出MFC（第二版）》全书总复习",
  label: "全书 · 综合验收",
  color: "#1d4ed8",
  soft: "#eff6ff",
  chain: [
    "重建Win32基线",
    "验证框架生命线",
    "运行Scribble主线",
    "注入消息持久化故障",
    "加入线程与组件",
    "审计附录项目",
  ],
  concepts: [
    "对象与生命期",
    "运行时类与动态创建",
    "序列化",
    "消息映射与命令路由",
    "Document/View与打印",
    "线程、组件与DBWIN",
  ],
} as const;

export function MfcOfficialFinalReviewMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function MfcOfficialFinalReviewExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function MfcOfficialFinalReviewEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
