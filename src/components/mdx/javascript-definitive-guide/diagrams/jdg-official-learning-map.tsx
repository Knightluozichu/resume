import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "锁定中英文第 7 版身份",
  "登记 17 章完整目录",
  "建立语言核心模型",
  "扩展到浏览器和 Node",
  "接入工具流水线",
  "以可运行样本逐章签发"
] as const;

export function JdgOfficialLearningMapMapLab() {
  return <Jdg7MechanismLab title="《JavaScript 权威指南（第 7 版）》权威学习地图 · 机制地图" label="JavaScript: The Definitive Guide, Seventh Edition" nodes={nodes} mode="map" />;
}

export function JdgOfficialLearningMapExperimentLab() {
  return <Jdg7MechanismLab title="《JavaScript 权威指南（第 7 版）》权威学习地图 · 运行时实验" label="JavaScript: The Definitive Guide, Seventh Edition" nodes={nodes} mode="experiment" />;
}

export function JdgOfficialLearningMapEvidenceLab() {
  return <Jdg7MechanismLab title="《JavaScript 权威指南（第 7 版）》权威学习地图 · 恢复证据" label="JavaScript: The Definitive Guide, Seventh Edition" nodes={nodes} mode="evidence" />;
}
