import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "《逐梦旅程》全书总复习",
  label: "全书验收",
  color: "#0f766e",
  soft: "#f0fdfa",
  chain: [
    "启动并创建设备",
    "接收输入消息",
    "更新游戏状态",
    "提交场景绘制",
    "呈现并记录",
    "销毁逆序清理",
  ],
  concepts: [
    "工具链与Win32",
    "GDI 2D原型",
    "Direct3D基础",
    "三维效果",
    "完整场景",
    "引擎与进阶路线",
  ],
} as const;

export function WjOfficialFinalReviewMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function WjOfficialFinalReviewExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function WjOfficialFinalReviewEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
