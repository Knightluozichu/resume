import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "创建稠密或稀疏数组",
  "按索引读写元素",
  "维护 length 与空槽",
  "选择迭代策略",
  "执行变换、搜索或排序",
  "检查原数组是否被修改"
] as const;

export function Jdg07ArraysMapLab() {
  return <Jdg7MechanismLab title="第 7 章 数组 · 机制地图" label="Arrays" nodes={nodes} mode="map" />;
}

export function Jdg07ArraysExperimentLab() {
  return <Jdg7MechanismLab title="第 7 章 数组 · 运行时实验" label="Arrays" nodes={nodes} mode="experiment" />;
}

export function Jdg07ArraysEvidenceLab() {
  return <Jdg7MechanismLab title="第 7 章 数组 · 恢复证据" label="Arrays" nodes={nodes} mode="evidence" />;
}
