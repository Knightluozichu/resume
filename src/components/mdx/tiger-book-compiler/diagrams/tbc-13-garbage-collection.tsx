import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第13章 垃圾收集",
  label: "第13章 垃圾收集",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "定义根集合",
    "追踪对象图",
    "回收或复制",
    "维护写屏障",
    "更新导出指针",
    "测量停顿吞吐",
  ],
  concepts: [
    "第二部分 高级主题",
    "第13章 垃圾收集",
    "13.1 标记-清扫式收集",
    "13.2 引用计数",
    "13.3 复制式收集",
    "13.4 分代收集",
    "13.5 增量式收集",
    "13.6 Baker算法",
    "13.7 编译器接口",
    "13.7.1 快速分配",
    "13.7.2 数据布局的描述",
    "13.7.3 导出指针",
    "程序设计：描述字",
    "程序设计：垃圾收集",
  ],
} as const;

export function Tbc13GarbageCollectionMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc13GarbageCollectionExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc13GarbageCollectionEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
