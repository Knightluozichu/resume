import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "比较旧头新头",
  "比较旧尾新尾",
  "比较旧头新尾",
  "比较旧尾新头",
  "处理非理想命中",
  "补挂或卸载",
] as const;

export function Vdi10DoubleEndedDiffMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 10 章 双端Diff算法"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi10DoubleEndedDiffExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 10 章 双端Diff算法"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi10DoubleEndedDiffEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 10 章 双端Diff算法"
      nodes={nodes}
      mode="evidence"
    />
  );
}
