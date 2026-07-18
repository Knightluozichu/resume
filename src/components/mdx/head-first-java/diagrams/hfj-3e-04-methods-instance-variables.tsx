import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3e04MethodsInstanceVariablesMapLab() {
  return (
    <HfjReferenceMapLab
      title="第4章 对象如何行动：方法使用实例变量 · 对象/执行图"
      focus="用参数、返回值和封装建立对象合同，并精确解释 Java 的按值传递"
      stages={stages}
    />
  );
}

export function Hfj3e04MethodsInstanceVariablesExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="第4章 对象如何行动：方法使用实例变量 · 执行实验"
      focus="方法合同、封装前后对照与值传递轨迹"
      stages={stages}
    />
  );
}

export function Hfj3e04MethodsInstanceVariablesEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="第4章 对象如何行动：方法使用实例变量 · 失败证据"
      focus="把按值传递误写成按引用传递，或公开字段让非法状态绕过验证"
      stages={stages}
    />
  );
}
