import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "同步前缀",
  "同步后缀",
  "建立key索引",
  "填充source",
  "计算LIS",
  "逆序挂载移动",
] as const;

export function Vdi11FastDiffMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 11 章 快速Diff算法"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi11FastDiffExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 11 章 快速Diff算法"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi11FastDiffEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 11 章 快速Diff算法"
      nodes={nodes}
      mode="evidence"
    />
  );
}
