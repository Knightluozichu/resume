import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "分析动态绑定",
  "写入PatchFlags",
  "打开Block",
  "收集动态节点",
  "提升静态内容",
  "运行时快速patch",
] as const;

export function Vdi17CompilerOptimizationMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 17 章 编译优化"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi17CompilerOptimizationExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 17 章 编译优化"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi17CompilerOptimizationEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 17 章 编译优化"
      nodes={nodes}
      mode="evidence"
    />
  );
}
