import { ServerBookEvidenceLab } from "./official-server-evidence-lab";

const nodes = [
  "列出进程线程边界",
  "标记共享可变状态",
  "分配唯一所有者",
  "选择最小同步原语",
  "注入竞态与反向锁序",
  "采集队列锁等待并签发",
] as const;

export function Gsp02MultithreadingMapLab() {
  return <ServerBookEvidenceLab title="第2章 多线程" label="第2章" nodes={nodes} mode="map" />;
}

export function Gsp02MultithreadingExperimentLab() {
  return <ServerBookEvidenceLab title="正常、边界与失败样本" label="第2章" nodes={nodes} mode="experiment" />;
}

export function Gsp02MultithreadingEvidenceLab() {
  return <ServerBookEvidenceLab title="交付证据与阶段门" label="第2章" nodes={nodes} mode="evidence" />;
}
