import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第6章 光与影的交汇——Windows游戏动画技术",
  label: "第二篇 · GDI 2D游戏编程",
  color: "#0f766e",
  soft: "#f0fdfa",
  chain: [
    "采样时间",
    "读取输入",
    "更新世界状态",
    "排序与合成",
    "交换完整帧",
    "校验帧间一致性",
  ],
  concepts: [
    "第6章 光与影的交汇——Windows游戏动画技术",
    "6.1 定时器动画显示",
    "6.1.1 创建定时器",
    "6.1.2 WM_TIMER消息响应",
    "6.1.3 删除定时器",
    "6.1.4 示例程序GDIdemo6",
    "6.2 游戏循环动画显示",
    "6.3 透明动画",
    "6.4 排序贴图",
    "6.5 章节小憩",
  ],
} as const;

export function Wj06WindowsAnimationMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj06WindowsAnimationExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj06WindowsAnimationEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
