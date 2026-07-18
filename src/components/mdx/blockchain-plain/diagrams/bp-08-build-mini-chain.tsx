import { OfficialBpBookLab } from "./official-bp-book-lab";

const concepts = [
  "动手做个实验：搭建微链",
  "微链是什么",
  "开发环境准备",
  "设计一个简单的结构",
  "源码解析",
  "目录结构",
] as const;

export function Bp08BuildMiniChainFlowLab() {
  return (
    <OfficialBpBookLab
      title="第8章 动手做个实验：搭建微链"
      concepts={concepts}
      accent="#0369a1"
      view="ledger"
    />
  );
}

export function Bp08BuildMiniChainExperimentLab() {
  return (
    <OfficialBpBookLab
      title="第8章 动手做个实验：搭建微链"
      concepts={concepts}
      accent="#047857"
      view="consensus"
    />
  );
}

export function Bp08BuildMiniChainEvidenceLab() {
  return (
    <OfficialBpBookLab
      title="第8章 动手做个实验：搭建微链"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
