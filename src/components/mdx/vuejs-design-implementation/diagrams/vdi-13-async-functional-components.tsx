import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "启动loader",
  "等待延迟",
  "显示Loading",
  "处理超时错误",
  "按策略重试",
  "渲染已加载组件",
] as const;

export function Vdi13AsyncFunctionalComponentsMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 13 章 异步组件与函数式组件"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi13AsyncFunctionalComponentsExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 13 章 异步组件与函数式组件"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi13AsyncFunctionalComponentsEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 13 章 异步组件与函数式组件"
      nodes={nodes}
      mode="evidence"
    />
  );
}
