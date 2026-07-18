import { ServerBookEvidenceLab } from "./official-server-evidence-lab";

const nodes = [
  "划分客户端与服务器权威",
  "选择 TCP 或 UDP 语义",
  "建立 Socket 生命周期",
  "规范地址与字节序",
  "实现长度帧或数据报",
  "注入半包丢包并签发",
] as const;

export function Gsp01NetworkProgrammingFoundationsMapLab() {
  return <ServerBookEvidenceLab title="第1章 网络编程基础" label="第1章" nodes={nodes} mode="map" />;
}

export function Gsp01NetworkProgrammingFoundationsExperimentLab() {
  return <ServerBookEvidenceLab title="正常、边界与失败样本" label="第1章" nodes={nodes} mode="experiment" />;
}

export function Gsp01NetworkProgrammingFoundationsEvidenceLab() {
  return <ServerBookEvidenceLab title="交付证据与阶段门" label="第1章" nodes={nodes} mode="evidence" />;
}
