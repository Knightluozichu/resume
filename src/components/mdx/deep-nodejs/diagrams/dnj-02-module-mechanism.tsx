import { DeepNodeOfficialLab } from "./official-deep-node-lab";

const chain = [
  "解析模块标识",
  "检查缓存",
  "定位文件或核心模块",
  "包装并编译",
  "建立导出契约",
  "验证包分发",
] as const;
const concepts = [
  "第2章 模块机制",
  "2.1 CommonJS规范",
  "2.1.1 CommonJS的出发点",
  "2.1.2 CommonJS的模块规范",
  "2.2 Node的模块实现",
  "2.2.1 优先从缓存加载",
  "2.2.2 路径分析和文件定位",
  "2.2.3 模块编译",
  "2.3 核心模块",
  "2.3.1 JavaScript核心模块的编译过程",
  "2.3.2 C/C++核心模块的编译过程",
  "2.3.3 核心模块的引入流程",
  "2.3.4 编写核心模块",
  "2.4 C/C++扩展模块",
  "2.4.1 前提条件",
  "2.4.2 C/C++扩展模块的编写",
  "2.4.3 C/C++扩展模块的编译",
  "2.4.4 C/C++扩展模块的加载",
  "2.5 模块调用栈",
  "2.6 包与npm",
  "2.6.1 包结构",
  "2.6.2 包描述文件与npm",
  "2.6.3 npm常用功能",
  "2.6.4 局域npm",
  "2.6.5 npm潜在问题",
  "2.7 前后端共用模块",
  "2.7.1 模块的侧重点",
  "2.7.2 AMD规范",
  "2.7.3 CMD规范",
  "2.7.4 兼容多种模块规范",
  "2.8 总结",
  "2.9 参考资源",
] as const;

export function Dnj02ModuleMechanismMapLab() {
  return (
    <DeepNodeOfficialLab
      title="第 2 章 模块机制 · 运行地图"
      label="Deep Node / Map"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Dnj02ModuleMechanismExperimentLab() {
  return (
    <DeepNodeOfficialLab
      title="第 2 章 模块机制 · 边界实验"
      label="Deep Node / Experiment"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Dnj02ModuleMechanismEvidenceLab() {
  return (
    <DeepNodeOfficialLab
      title="第 2 章 模块机制 · 关闭证据"
      label="Deep Node / Evidence"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
