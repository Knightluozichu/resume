import { ServerBookEvidenceLab } from "./official-server-evidence-lab";

const nodes = [
  "发布并签名版本清单",
  "验证版本和兼容范围",
  "分块下载到临时目录",
  "逐文件校验哈希",
  "原子激活并健康检查",
  "断电篡改回滚后签发",
] as const;

export function Gsp08AutoUpdateSystemMapLab() {
  return <ServerBookEvidenceLab title="第8章 自动更新系统的设计与实现" label="第8章" nodes={nodes} mode="map" />;
}

export function Gsp08AutoUpdateSystemExperimentLab() {
  return <ServerBookEvidenceLab title="正常、边界与失败样本" label="第8章" nodes={nodes} mode="experiment" />;
}

export function Gsp08AutoUpdateSystemEvidenceLab() {
  return <ServerBookEvidenceLab title="交付证据与阶段门" label="第8章" nodes={nodes} mode="evidence" />;
}
