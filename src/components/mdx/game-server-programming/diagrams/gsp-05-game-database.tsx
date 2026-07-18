import { ServerBookEvidenceLab } from "./official-server-evidence-lab";

const nodes = [
  "声明账号角色经济不变量",
  "设计键约束和索引",
  "划分事务与幂等边界",
  "处理并发版本冲突",
  "批量持久化并观测",
  "断电恢复后签发",
] as const;

export function Gsp05GameDatabaseTechnologyMapLab() {
  return <ServerBookEvidenceLab title="第5章 网络游戏数据库技术" label="第5章" nodes={nodes} mode="map" />;
}

export function Gsp05GameDatabaseTechnologyExperimentLab() {
  return <ServerBookEvidenceLab title="正常、边界与失败样本" label="第5章" nodes={nodes} mode="experiment" />;
}

export function Gsp05GameDatabaseTechnologyEvidenceLab() {
  return <ServerBookEvidenceLab title="交付证据与阶段门" label="第5章" nodes={nodes} mode="evidence" />;
}
