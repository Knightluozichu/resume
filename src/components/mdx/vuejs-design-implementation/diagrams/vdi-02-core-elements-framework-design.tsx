import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "定义用户契约",
  "隔离开发代码",
  "标记纯调用",
  "输出多种产物",
  "统一错误边界",
  "验证类型",
] as const;

export function Vdi02CoreElementsFrameworkDesignMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 2 章 框架设计的核心要素"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi02CoreElementsFrameworkDesignExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 2 章 框架设计的核心要素"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi02CoreElementsFrameworkDesignEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 2 章 框架设计的核心要素"
      nodes={nodes}
      mode="evidence"
    />
  );
}
