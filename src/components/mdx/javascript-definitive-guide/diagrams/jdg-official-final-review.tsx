import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "冻结源码与运行环境",
  "预测值和控制流",
  "追踪对象与异步状态",
  "观察宿主 I/O",
  "注入边界与失败",
  "恢复并签发全链路"
] as const;

export function JdgOfficialFinalReviewMapLab() {
  return <Jdg7MechanismLab title="《JavaScript 权威指南（第 7 版）》全书总复习 · 机制地图" label="Seventh Edition Final Review" nodes={nodes} mode="map" />;
}

export function JdgOfficialFinalReviewExperimentLab() {
  return <Jdg7MechanismLab title="《JavaScript 权威指南（第 7 版）》全书总复习 · 运行时实验" label="Seventh Edition Final Review" nodes={nodes} mode="experiment" />;
}

export function JdgOfficialFinalReviewEvidenceLab() {
  return <Jdg7MechanismLab title="《JavaScript 权威指南（第 7 版）》全书总复习 · 恢复证据" label="Seventh Edition Final Review" nodes={nodes} mode="evidence" />;
}
