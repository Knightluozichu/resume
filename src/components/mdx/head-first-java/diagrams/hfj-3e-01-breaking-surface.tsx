import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e01BreakingSurfaceMapLab() {
  return (
    <HfjReferenceMapLab
      title="第1章 破开水面：快速潜入 · 对象/执行图"
      focus="从源文件、类、main 方法到编译与运行，形成第一个可解释执行链"
      stages={stages}
    />
  );
}

export function Hfj3e01BreakingSurfaceExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第1章 破开水面：快速潜入 · 执行实验"
      focus="可编译类、字节码检查记录与分支/循环测试表"
      stages={stages}
    />
  );
}

export function Hfj3e01BreakingSurfaceEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第1章 破开水面：快速潜入 · 失败证据"
      focus="把 JVM、JDK 和 Java 语言混成一件事，或只看输出却不能解释控制流"
      stages={stages}
    />
  );
}
