import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "识别内建类型",
  "缓存或选目标",
  "注入渲染钩子",
  "移动宿主节点",
  "协调过渡阶段",
  "清理缓存资源",
] as const;

export function Vdi14BuiltInComponentsModulesMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 14 章 内建组件和模块"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi14BuiltInComponentsModulesExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 14 章 内建组件和模块"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi14BuiltInComponentsModulesEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 14 章 内建组件和模块"
      nodes={nodes}
      mode="evidence"
    />
  );
}
