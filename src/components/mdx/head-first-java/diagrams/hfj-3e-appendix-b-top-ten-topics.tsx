import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3eAppendixBTopTenTopicsMapLab() {
  return (
    <HfjReferenceMapLab
      title="附录B 未进入正文的十大左右主题 · 对象/执行图"
      focus="补齐 JShell、包、不可变性、访问控制、可变参数、注解、并行流、枚举、var 与 record 的现代 Java 边界"
      stages={stages}
    />
  );
}

export function Hfj3eAppendixBTopTenTopicsExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="附录B 未进入正文的十大左右主题 · 执行实验"
      focus="现代语法决策表、兼容性样例与误用反例集"
      stages={stages}
    />
  );
}

export function Hfj3eAppendixBTopTenTopicsEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="附录B 未进入正文的十大左右主题 · 失败证据"
      focus="把语法便利当作设计改进，或在没有度量和可分割工作负载时启用 parallelStream"
      stages={stages}
    />
  );
}
