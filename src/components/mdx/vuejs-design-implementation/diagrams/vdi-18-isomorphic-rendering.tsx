import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "创建请求实例",
  "服务端渲染VNode",
  "转义HTML",
  "发送状态快照",
  "客户端激活",
  "验证请求隔离",
] as const;

export function Vdi18IsomorphicRenderingMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 18 章 同构渲染"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi18IsomorphicRenderingExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 18 章 同构渲染"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi18IsomorphicRenderingEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 18 章 同构渲染"
      nodes={nodes}
      mode="evidence"
    />
  );
}
