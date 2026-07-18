import { ServerBookEvidenceLab } from "./official-server-evidence-lab";

const nodes = [
  "定义连接状态机",
  "选择阻塞就绪或完成语义",
  "提交读写并绑定代际",
  "处理部分完成和背压",
  "取消关闭并排空完成",
  "注入陈旧事件后签发",
] as const;

export function Gsp03EfficientCommunicationModelsMapLab() {
  return <ServerBookEvidenceLab title="第3章 高效通信模型" label="第3章" nodes={nodes} mode="map" />;
}

export function Gsp03EfficientCommunicationModelsExperimentLab() {
  return <ServerBookEvidenceLab title="正常、边界与失败样本" label="第3章" nodes={nodes} mode="experiment" />;
}

export function Gsp03EfficientCommunicationModelsEvidenceLab() {
  return <ServerBookEvidenceLab title="交付证据与阶段门" label="第3章" nodes={nodes} mode="evidence" />;
}
