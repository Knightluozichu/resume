import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "包装原始值",
  "读取value",
  "追踪依赖",
  "映射对象属性",
  "代理脱ref",
  "写回来源",
] as const;

export function Vdi06PrimitiveReactivityMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 6 章 原始值的响应式方案"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi06PrimitiveReactivityExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 6 章 原始值的响应式方案"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi06PrimitiveReactivityEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 6 章 原始值的响应式方案"
      nodes={nodes}
      mode="evidence"
    />
  );
}
