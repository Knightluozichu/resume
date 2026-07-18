import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "代理对象",
  "按操作track",
  "区分ADD与SET",
  "代理数组语义",
  "封装集合方法",
  "阻止原始污染",
] as const;

export function Vdi05NonPrimitiveReactivityMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 5 章 非原始值的响应式方案"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi05NonPrimitiveReactivityExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 5 章 非原始值的响应式方案"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi05NonPrimitiveReactivityEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 5 章 非原始值的响应式方案"
      nodes={nodes}
      mode="evidence"
    />
  );
}
