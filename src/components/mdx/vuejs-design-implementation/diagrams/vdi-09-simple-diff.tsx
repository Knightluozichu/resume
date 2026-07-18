import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "遍历新子序列",
  "按key查旧节点",
  "patch复用节点",
  "比较旧索引",
  "移动或新增",
  "清理旧节点",
] as const;

export function Vdi09SimpleDiffMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 9 章 简单Diff算法"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi09SimpleDiffExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 9 章 简单Diff算法"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi09SimpleDiffEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 9 章 简单Diff算法"
      nodes={nodes}
      mode="evidence"
    />
  );
}
