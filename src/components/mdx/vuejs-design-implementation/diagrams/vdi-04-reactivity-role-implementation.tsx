import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "执行effect",
  "读取并track",
  "清理旧依赖",
  "写入并trigger",
  "调度去重",
  "处理过期副作用",
] as const;

export function Vdi04ReactivityRoleImplementationMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 4 章 响应系统的作用与实现"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi04ReactivityRoleImplementationExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 4 章 响应系统的作用与实现"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi04ReactivityRoleImplementationEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 4 章 响应系统的作用与实现"
      nodes={nodes}
      mode="evidence"
    />
  );
}
