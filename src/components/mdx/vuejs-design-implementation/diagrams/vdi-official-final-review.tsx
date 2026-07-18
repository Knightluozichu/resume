import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "触发响应更新",
  "调度组件effect",
  "比较VNode",
  "利用编译提示",
  "服务端输出",
  "客户端激活签发",
] as const;

export function VdiOfficialFinalReviewMapLab() {
  return (
    <VueDesignImplementationLab
      title="《Vue.js设计与实现》全书总复习"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function VdiOfficialFinalReviewExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="《Vue.js设计与实现》全书总复习"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function VdiOfficialFinalReviewEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="《Vue.js设计与实现》全书总复习"
      nodes={nodes}
      mode="evidence"
    />
  );
}
