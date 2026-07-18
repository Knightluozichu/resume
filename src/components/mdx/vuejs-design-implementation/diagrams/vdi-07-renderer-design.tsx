import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "执行组件effect",
  "生成VNode",
  "识别节点类型",
  "调用宿主操作",
  "保存旧VNode",
  "更新或卸载",
] as const;

export function Vdi07RendererDesignMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 7 章 渲染器的设计"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi07RendererDesignExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 7 章 渲染器的设计"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi07RendererDesignEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 7 章 渲染器的设计"
      nodes={nodes}
      mode="evidence"
    />
  );
}
