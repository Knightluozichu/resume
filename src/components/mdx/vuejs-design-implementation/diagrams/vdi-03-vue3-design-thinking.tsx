import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "声明模板",
  "编译render",
  "执行组件",
  "生成VNode",
  "渲染宿主节点",
  "响应状态更新",
] as const;

export function Vdi03Vue3DesignThinkingMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 3 章 Vue.js 3的设计思路"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi03Vue3DesignThinkingExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 3 章 Vue.js 3的设计思路"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi03Vue3DesignThinkingEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 3 章 Vue.js 3的设计思路"
      nodes={nodes}
      mode="evidence"
    />
  );
}
