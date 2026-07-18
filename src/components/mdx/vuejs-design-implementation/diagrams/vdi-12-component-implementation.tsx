import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "创建实例",
  "解析props与slots",
  "执行setup",
  "运行render effect",
  "patch子树",
  "触发生命周期",
] as const;

export function Vdi12ComponentImplementationMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 12 章 组件的实现原理"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi12ComponentImplementationExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 12 章 组件的实现原理"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi12ComponentImplementationEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 12 章 组件的实现原理"
      nodes={nodes}
      mode="evidence"
    />
  );
}
