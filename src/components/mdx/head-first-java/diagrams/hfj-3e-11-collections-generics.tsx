import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e11CollectionsGenericsMapLab() {
  return (
    <HfjReferenceMapLab
      title="第11章 数据结构：集合与泛型 · 对象/执行图"
      focus="按顺序、唯一性和键值查询选择集合，以泛型、Comparable、Comparator、equals 与 hashCode 维持合同"
      stages={stages}
    />
  );
}

export function Hfj3e11CollectionsGenericsExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第11章 数据结构：集合与泛型 · 执行实验"
      focus="Jukebox 集合迁移、排序策略对照与相等性性质测试"
      stages={stages}
    />
  );
}

export function Hfj3e11CollectionsGenericsEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第11章 数据结构：集合与泛型 · 失败证据"
      focus="只按示例规模选集合，或覆写 equals 却不保持 hashCode 一致"
      stages={stages}
    />
  );
}
