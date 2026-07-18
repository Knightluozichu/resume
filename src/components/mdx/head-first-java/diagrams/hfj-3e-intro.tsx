import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3eIntroMapLab() {
  return (
    <HfjReferenceMapLab
      title="使用说明：让大脑真正学会 Java · 对象/执行图"
      focus="建立主动预测、运行、解释和纠错的学习回路，并锁定 Java 17 工具边界"
      stages={stages}
    />
  );
}

export function Hfj3eIntroExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="使用说明：让大脑真正学会 Java · 执行实验"
      focus="学习合同、JDK 17 环境证据与错题回放记录"
      stages={stages}
    />
  );
}

export function Hfj3eIntroEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="使用说明：让大脑真正学会 Java · 失败证据"
      focus="只阅读答案而不先预测，或环境并非 JDK 17 却把版本差异误判成概念错误"
      stages={stages}
    />
  );
}
