import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "核对18章",
  "设计响应系统",
  "实现渲染器",
  "建立组件模型",
  "编译模板",
  "完成同构激活",
] as const;

export function VdiOfficialLearningMapMapLab() {
  return (
    <VueDesignImplementationLab
      title="《Vue.js设计与实现》权威学习地图"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function VdiOfficialLearningMapExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="《Vue.js设计与实现》权威学习地图"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function VdiOfficialLearningMapEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="《Vue.js设计与实现》权威学习地图"
      nodes={nodes}
      mode="evidence"
    />
  );
}
