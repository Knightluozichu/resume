import { ServerBookEvidenceLab } from "./official-server-evidence-lab";

const nodes = [
  "认证操作者和设备",
  "授权命令与目标作用域",
  "校验参数并生成预览",
  "高风险命令获得审批",
  "幂等执行并记录结果",
  "补偿演练与审计签发",
] as const;

export function Gsp07GmToolDesignMapLab() {
  return <ServerBookEvidenceLab title="第7章 GM工具的设计与实现" label="第7章" nodes={nodes} mode="map" />;
}

export function Gsp07GmToolDesignExperimentLab() {
  return <ServerBookEvidenceLab title="正常、边界与失败样本" label="第7章" nodes={nodes} mode="experiment" />;
}

export function Gsp07GmToolDesignEvidenceLab() {
  return <ServerBookEvidenceLab title="交付证据与阶段门" label="第7章" nodes={nodes} mode="evidence" />;
}
