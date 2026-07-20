import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-22-further-reading",
  title: "第22章 扩展阅读",
  concepts: [
    "第22章 扩展阅读",
    "22.1 参考书推荐",
    "22.2 链接、加载相关",
    "22.3 各种编程语言的功能",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "机制缺口阅读路线台",
    boundary: "observed gap → primary reference → reproduction → extension",
    axisA: {
      label: "扩展方向",
      levels: ["前端语言", "优化", "链接加载"],
    },
    axisB: {
      label: "证据深度",
      levels: ["术语", "最小复现", "实现扩展"],
    },
    fault: "按书名堆推荐列表却没有问题和验证产物",
    invariant: "每条阅读路线从cbc现有限制出发，产出可运行的最小扩展和回归",
    probe:
      "gap: choose-one\nprimary_source: specification-or-upstream\nartifact: patch+tests+before-after",
    signal: "问题—资料—实现—回归闭环",
    artifact: "扩展学习实验单",
    trap: "阅读完成不等于实现理解",
    practiceMode: "design",
    task: "第22章 扩展阅读固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变扩展方向或证据深度。",
  },
} as const;

export function Crc22FurtherReadingMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc22FurtherReadingExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc22FurtherReadingEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
