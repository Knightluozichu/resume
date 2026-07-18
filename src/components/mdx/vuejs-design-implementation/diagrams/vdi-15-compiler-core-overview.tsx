import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "读取模板",
  "状态机解析",
  "构造模板AST",
  "插件化转换",
  "生成JS AST",
  "输出render代码",
] as const;

export function Vdi15CompilerCoreOverviewMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 15 章 编译器核心技术概览"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi15CompilerCoreOverviewExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 15 章 编译器核心技术概览"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi15CompilerCoreOverviewEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 15 章 编译器核心技术概览"
      nodes={nodes}
      mode="evidence"
    />
  );
}
