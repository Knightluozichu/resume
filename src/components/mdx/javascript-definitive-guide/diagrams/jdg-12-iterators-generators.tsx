import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "取得迭代器",
  "请求下一项",
  "执行到 yield 暂停",
  "向生成器传回值或异常",
  "关闭迭代器",
  "以 done 和 value 收敛"
] as const;

export function Jdg12IteratorsGeneratorsMapLab() {
  return <Jdg7MechanismLab title="第 12 章 迭代器与生成器 · 机制地图" label="Iterators and Generators" nodes={nodes} mode="map" />;
}

export function Jdg12IteratorsGeneratorsExperimentLab() {
  return <Jdg7MechanismLab title="第 12 章 迭代器与生成器 · 运行时实验" label="Iterators and Generators" nodes={nodes} mode="experiment" />;
}

export function Jdg12IteratorsGeneratorsEvidenceLab() {
  return <Jdg7MechanismLab title="第 12 章 迭代器与生成器 · 恢复证据" label="Iterators and Generators" nodes={nodes} mode="evidence" />;
}
